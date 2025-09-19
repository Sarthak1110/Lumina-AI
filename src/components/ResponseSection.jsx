function ResponseSection({ answer }) {
  if (!answer) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">✨ AI Response</h3>
              <p className="text-sm text-gray-500">Generated just for you</p>
            </div>
          </div>
          
          {/* Response Content */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base font-medium break-words">
                  {answer}
                </div>
              </div>
            </div>
            
            {/* Copy Button */}
            <button 
              onClick={() => navigator.clipboard.writeText(answer)}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="Copy response"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponseSection;
