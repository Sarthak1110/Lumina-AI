import { useState } from 'react'
import './App.css'
import axios from 'axios'
import InputSection from './components/InputSection'
import ResponseSection from './components/ResponseSection'

function App() {
  const[question,setQuestion]=useState("");
  const[answer,setAnswer]=useState("");
  const[isLoading,setIsLoading]=useState(false);
  const[messages, setMessages] = useState([]);

  async function GenerateResponse() {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Add user message to chat
    const userMessage = { type: 'user', content: question, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    
    // Add loading message
    const loadingMessage = { type: 'ai', content: 'Thinking...', timestamp: Date.now(), isLoading: true };
    setMessages(prev => [...prev, loadingMessage]);
    
    try {
      const response = await axios({
        url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCBh6oPq1XhUCLD8iRrWyhqSSWtaiHrWZM",
        method:"POST",
        data:{
          "contents": [
            {
              "parts": [
                {
                  "text": question
                }
              ]
            }
          ]
        }
      })  
      
      const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      
      // Replace loading message with actual response
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? { ...msg, content: aiResponse, isLoading: false } : msg
      ));
      
      setAnswer(aiResponse);
    } catch (error) {
      // Replace loading message with error
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? { ...msg, content: "Sorry, there was an error processing your request. Please try again.", isLoading: false } : msg
      ));
      setAnswer("Sorry, there was an error processing your request. Please try again.");
    } finally {
      setIsLoading(false);
      setQuestion(""); // Clear input after sending
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-60 sm:h-60 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-6">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Assistant
              </h1>
              <p className="text-white/70 text-xs sm:text-sm mt-1 font-medium">Powered by Gemini 2.0 Flash • Always Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Messages Area */}
        <div className="min-h-[60vh] max-h-[60vh] overflow-y-auto mb-6 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 sm:space-y-6 animate-fade-in px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/10">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Welcome to AI Assistant</h2>
                  <p className="text-white/60 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
                    Ask me anything! I'm here to help you with questions, creative tasks, problem-solving, and more.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {['Write a story', 'Explain quantum physics', 'Plan a trip', 'Debug my code'].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setQuestion(suggestion)}
                      className="px-3 py-2 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                <div className={`max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-end space-x-2 sm:space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.type === 'user' ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )}
                    </div>
                    <div className={`px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl backdrop-blur-sm border ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-white'
                        : 'bg-white/10 border-white/20 text-white'
                    } shadow-xl`}>
                      <div className="text-xs sm:text-sm font-medium mb-1 opacity-70">
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </div>
                      <div className="leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                        {message.isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
                            </div>
                            <span className="text-white/60 text-sm">Thinking...</span>
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Section */}
        <InputSection 
          question={question}
          setQuestion={setQuestion}
          onGenerateResponse={GenerateResponse}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default App
