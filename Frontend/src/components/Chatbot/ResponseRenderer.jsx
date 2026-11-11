import ChatMenuCard from './ChatMenuCard';

/**
 * Parses inline markdown: **bold**, *italic*, `code`, and plain text.
 * Returns an array of React elements or strings. Immune to XSS.
 */
function renderInlineFormatting(text) {
  if (!text) return '';

  // Regex to match **bold**, *italic*, `code`
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={idx} className="chat-inline-code">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

/**
 * Checks if a table represents dishes (has 'dish'/'item' and 'price'/'cost')
 */
function isDishTable(headerRow) {
  const headers = headerRow.toLowerCase();
  const hasDish = headers.includes('dish') || headers.includes('item') || headers.includes('name');
  const hasPrice = headers.includes('price') || headers.includes('cost') || headers.includes('₹') || headers.includes('rs');
  return hasDish && hasPrice;
}

/**
 * Parse markdown table lines into dish objects
 */
function parseDishTable(lines, currentMealTime) {
  if (lines.length < 2) return [];

  const headerCols = lines[0]
    .split('|')
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);

  const dishIdx = headerCols.findIndex(
    (c) => c.includes('dish') || c.includes('item') || c.includes('name')
  );
  const catIdx = headerCols.findIndex((c) => c.includes('cat'));
  const priceIdx = headerCols.findIndex(
    (c) => c.includes('price') || c.includes('cost') || c.includes('₹') || c.includes('rs')
  );
  const vegIdx = headerCols.findIndex((c) => c.includes('veg'));

  const dishes = [];

  // Line index 1 is separator |---|---|; data rows start at line index 2
  for (let i = 2; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine.includes('|')) continue;

    const rawCols = rawLine.split('|').map((c) => c.trim());
    // Strip leading and trailing empty splits from | col1 | col2 |
    const cols = rawCols.slice(1, rawCols.length - 1);
    if (cols.length < 2) continue;

    const rawName = cols[dishIdx] || '';
    if (!rawName) continue;

    // Clean Markdown markers from name
    const cleanName = rawName
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/⭐/g, '')
      .replace(/\(famous dish\)/gi, '')
      .trim();

    if (!cleanName) continue;

    const isFamous =
      rawName.includes('⭐') ||
      rawName.toLowerCase().includes('famous') ||
      rawLine.toLowerCase().includes('famous dish');

    const category =
      catIdx >= 0 && cols[catIdx] ? cols[catIdx].replace(/\*\*/g, '').trim() : '';

    const rawPrice =
      priceIdx >= 0 && cols[priceIdx] ? cols[priceIdx].replace(/\*\*/g, '').trim() : '';

    const vegCell = vegIdx >= 0 && cols[vegIdx] ? cols[vegIdx].toLowerCase() : '';
    const isVeg = !vegCell.includes('❌') && !vegCell.includes('non');

    dishes.push({
      name: cleanName,
      category,
      price: rawPrice,
      isFamous,
      isVeg,
      mealTime: currentMealTime,
    });
  }

  return dishes;
}

/**
 * Extracts single dish mention with details (e.g. for "Which dish is famous for breakfast?")
 */
function extractSingleDishCard(text) {
  // Check if text has bullet points like - **Price:** ₹150
  const hasPriceBullet = /-\s*\*\*price:?\*\*\s*[:₹\d]+/i.test(text);

  if (!hasPriceBullet) return null;

  // Extract dish name from text like "...famous dish at Bob Restaurant is **Masala Dosa**"
  const nameMatch = text.match(/(?:famous dish|dish|specialty).*?is\s+\*\*([^*]+)\*\*/i) ||
                    text.match(/\*\*([^*]+)\*\*.*?(?:is priced|is famous|costs)/i);

  const priceMatch = text.match(/-\s*\*\*price:?\*\*\s*[:\s]*(₹?\s*\d+)/i);
  const catMatch = text.match(/-\s*\*\*category:?\*\*\s*[:\s]*([^\n\r]+)/i);
  const vegMatch = text.match(/-\s*\*\*vegetarian:?\*\*\s*[:\s]*(yes|no|true|false)/i);
  const mealMatch = text.match(/(breakfast|lunch|dinner)/i);

  if (nameMatch && priceMatch) {
    return {
      name: nameMatch[1].trim(),
      price: priceMatch[1].trim(),
      category: catMatch ? catMatch[1].trim() : '',
      isVeg: vegMatch ? vegMatch[1].toLowerCase().includes('yes') : true,
      isFamous: true,
      mealTime: mealMatch ? mealMatch[1].toUpperCase() : '',
    };
  }

  return null;
}

export default function ResponseRenderer({ content }) {
  if (!content) return null;

  // Check if this message is a single dish highlight
  const singleDish = extractSingleDishCard(content);

  const lines = content.split(/\r?\n/);
  const blocks = [];
  let currentMealTime = '';
  let inTable = false;
  let tableLines = [];
  let inList = false;
  let listItems = [];
  let listOrdered = false;

  const flushList = () => {
    if (listItems.length > 0) {
      if (listOrdered) {
        blocks.push({
          type: 'ol',
          items: [...listItems],
        });
      } else {
        blocks.push({
          type: 'ul',
          items: [...listItems],
        });
      }
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (tableLines.length > 0) {
      if (isDishTable(tableLines[0])) {
        const dishes = parseDishTable(tableLines, currentMealTime);
        if (dishes.length > 0) {
          blocks.push({
            type: 'dish-cards',
            dishes,
            mealTime: currentMealTime,
          });
        }
      } else {
        // Generic styled table
        blocks.push({
          type: 'table',
          lines: [...tableLines],
        });
      }
      tableLines = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 1. Table Detection
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList();
      inTable = true;
      tableLines.push(line);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // 2. Horizontal Divider
    if (line === '---' || line === '***' || line === '___') {
      flushList();
      blocks.push({ type: 'hr' });
      continue;
    }

    // 3. Headings
    if (line.startsWith('#')) {
      flushList();
      const levelMatch = line.match(/^(#{1,6})\s*(.*)$/);
      if (levelMatch) {
        const level = levelMatch[1].length;
        const headingText = levelMatch[2].trim();

        // Track meal category from headings like "## 🍽️ BREAKFAST"
        if (/breakfast/i.test(headingText)) currentMealTime = 'BREAKFAST';
        else if (/lunch/i.test(headingText)) currentMealTime = 'LUNCH';
        else if (/dinner/i.test(headingText)) currentMealTime = 'DINNER';

        blocks.push({
          type: 'heading',
          level,
          text: headingText,
        });
        continue;
      }
    }

    // 4. Unordered Lists (- or *)
    const ulMatch = line.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      if (inList && listOrdered) flushList();
      inList = true;
      listOrdered = false;
      listItems.push(ulMatch[1]);
      continue;
    }

    // 5. Ordered Lists (1. 2.)
    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (inList && !listOrdered) flushList();
      inList = true;
      listOrdered = true;
      listItems.push(olMatch[1]);
      continue;
    }

    // Non-list line, flush pending list items
    if (inList) {
      flushList();
    }

    // 6. Empty Line
    if (line === '') {
      continue;
    }

    // 7. Regular Paragraph
    blocks.push({
      type: 'paragraph',
      text: line,
    });
  }

  // Flush any trailing table or list
  if (inTable) flushTable();
  if (inList) flushList();

  return (
    <div className="chat-response-content">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            const HeadingTag = block.level <= 2 ? 'h3' : 'h4';
            return (
              <HeadingTag key={idx} className={`chat-heading chat-h${block.level}`}>
                {renderInlineFormatting(block.text)}
              </HeadingTag>
            );
          }

          case 'hr':
            return <div key={idx} className="chat-divider" />;

          case 'dish-cards':
            return (
              <div key={idx} className="chat-menu-grid">
                {block.dishes.map((dish, dIdx) => (
                  <ChatMenuCard key={dIdx} dish={dish} />
                ))}
              </div>
            );

          case 'table': {
            const rows = block.lines.map((l) =>
              l.split('|').map((c) => c.trim()).slice(1, -1)
            );
            if (rows.length < 1) return null;
            const headers = rows[0];
            const dataRows = rows.slice(2); // skip separator

            return (
              <div key={idx} className="chat-table-wrapper">
                <table className="chat-table">
                  <thead>
                    <tr>
                      {headers.map((h, hIdx) => (
                        <th key={hIdx}>{renderInlineFormatting(h)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>{renderInlineFormatting(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          case 'ul':
            return (
              <ul key={idx} className="chat-list ul-list">
                {block.items.map((item, iIdx) => (
                  <li key={iIdx}>{renderInlineFormatting(item)}</li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={idx} className="chat-list ol-list">
                {block.items.map((item, iIdx) => (
                  <li key={iIdx}>{renderInlineFormatting(item)}</li>
                ))}
              </ol>
            );

          case 'paragraph':
            return (
              <p key={idx} className="chat-paragraph">
                {renderInlineFormatting(block.text)}
              </p>
            );

          default:
            return null;
        }
      })}

      {/* If a single dish was recognized with structured attributes, show a dedicated highlight card */}
      {singleDish && (
        <div className="chat-single-dish-container">
          <div className="chat-single-dish-intro">
            <span>Signature Recommendation</span>
          </div>
          <div className="chat-menu-grid" style={{ gridTemplateColumns: '1fr' }}>
            <ChatMenuCard dish={singleDish} />
          </div>
        </div>
      )}
    </div>
  );
}
