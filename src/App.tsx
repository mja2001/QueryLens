import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { Message, QueryResult } from './types';
import { processQuery } from './services/queryService';
import './styles/globals.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 Hello! I'm QueryLens, your AI analytics assistant. Ask me anything about your data, and I'll create beautiful visualizations for you. Try asking: 'Show me sales trends by region'",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      // Process query with AI
      const result = await processQuery(content, messages);

      // Add assistant response with visualization
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: result.explanation,
        timestamp: new Date(),
        visualization: result.visualization,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I encountered an error processing your query. Please try rephrasing your question or check your API connection.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isProcessing={isProcessing}
        />
      </main>
    </div>
  );
}

export default App;
