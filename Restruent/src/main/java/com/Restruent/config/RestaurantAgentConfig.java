package com.Restruent.config;

import com.Restruent.agent.RestaurantAssistant;
import com.Restruent.tool.RestaurantTool;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.service.tool.ToolArgumentsErrorHandler;
import dev.langchain4j.service.tool.ToolExecutionErrorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RestaurantAgentConfig {

    @Bean
    public RestaurantAssistant restaurantAssistant(ChatModel chatModel, RestaurantTool restaurantTool) {
        return AiServices.builder(RestaurantAssistant.class)
                .chatModel(chatModel)
                .tools(restaurantTool)
                .toolArgumentsErrorHandler(ToolArgumentsErrorHandler.sendExceptionMessageToLlm())
                .toolExecutionErrorHandler(ToolExecutionErrorHandler.sendExceptionMessageToLlm())
                .chatMemoryProvider(memoryId -> MessageWindowChatMemory.withMaxMessages(20))
                .build();
    }
}
