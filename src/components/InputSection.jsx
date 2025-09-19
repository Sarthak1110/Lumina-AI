function InputSection({ question, setQuestion, onGenerateResponse, isLoading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerateResponse();
    }
  };

  return (
    <div className="relative">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-end space-x-4">
          {/* Input Area */}
          <div className="flex-1 relative">
            <textarea 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
              className="w-full bg-white/5 text-white placeholder-white/60 border border-white/30 rounded-xl outline-none resize-none text-base leading-relaxed min-h-[60px] max-h-32 py-3 px-4 focus:bg-white/10 focus:border-white/50 transition-all duration-200"
              disabled={isLoading}
              rows={1}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            />
            <style jsx>{`
              textarea::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
          
          {/* Send Button */}
          <button 
            onClick={onGenerateResponse}
            disabled={!question.trim() || isLoading}
            className="group relative w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <svg 
                className="w-5 h-5 text-white transition-transform group-hover:translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Character Counter */}
        <div className="flex justify-between items-center mt-2 px-1">
          <div className="text-xs text-white/40">
            {question.length > 0 && `${question.length} characters`}
          </div>
          <div className="text-xs text-white/40">
            {isLoading ? 'Sending...' : 'Ready to send'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputSection;
