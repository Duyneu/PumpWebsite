import React from 'react';
import { X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { useChatbotEngine } from '../hooks/useChatbotEngine';
import { FormattedMessage } from './chatbot/ChatFormattedMessage';

interface ChatbotProps {
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

export function Chatbot({ onClose, onProductClick }: ChatbotProps) {
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    handleSend,
    handleResetChat,
    formatPrice,
  } = useChatbotEngine();

  return (
    <div className="flex flex-col h-full bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-650 to-blue-700 text-white px-4 py-3.5 flex items-center justify-between border-b border-blue-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 backdrop-blur-xs rounded-full flex items-center justify-center relative border border-white/20 shadow-xs">
            <Bot className="w-5 h-5 text-white" />
            <Sparkles className="w-3 h-3 text-amber-300 absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm sm:text-base text-white tracking-tight">Trợ lý AI VOLTOR</span>
              <span className="text-[10px] bg-white/20 text-blue-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border border-white/20">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                Gemini AI
              </span>
            </div>
            <div className="text-[11px] text-blue-100 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block animate-pulse" />
              <span>Tư vấn kỹ thuật 24/7 • Hotline: 0898 296 336</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            className="p-2 hover:bg-white/15 rounded-lg transition-colors text-blue-100 hover:text-white"
            title="Làm mới cuộc trò chuyện"
            aria-label="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/15 rounded-lg transition-colors text-blue-100 hover:text-white"
            title="Đóng chat"
            aria-label="Đóng chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scroll-smooth">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div
              className={`flex gap-2.5 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs ${
                  message.sender === 'bot'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-white'
                }`}
              >
                {message.sender === 'bot' ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs ${
                  message.sender === 'bot'
                    ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/70'
                    : 'bg-blue-600 text-white rounded-tr-xs'
                }`}
              >
                <FormattedMessage text={message.text} isUser={message.sender === 'user'} />
              </div>
            </div>

            {/* Quick Action Buttons */}
            {message.quickActions && message.quickActions.length > 0 && (
              <div className="ml-9 flex flex-wrap gap-1.5 pt-1">
                {message.quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(action.value)}
                    className="text-xs font-medium bg-white hover:bg-blue-600 text-slate-700 hover:text-white px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-600 transition-all shadow-2xs active:scale-95 cursor-pointer"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Suggested Products */}
            {message.suggestedProducts && message.suggestedProducts.length > 0 && (
              <div className="ml-9 mt-2 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Sản phẩm gợi ý cho bạn:
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {message.suggestedProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => onProductClick(product)}
                      className="w-full bg-white border border-slate-200 hover:border-blue-500 rounded-xl p-2.5 hover:shadow-md transition-all text-left flex items-center gap-3 group cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-13 h-13 object-cover rounded-lg border border-slate-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{product.category}</div>
                        <div className="text-xs font-bold text-blue-600 mt-0.5">{formatPrice(product.price)}</div>
                      </div>
                      <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity pr-1 text-xs font-medium flex items-center gap-0.5">
                        <span>Xem</span>
                        <span>→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5 items-center">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-xs px-3.5 py-2 border border-slate-200/70 shadow-2xs flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Gemini đang soạn câu trả lời...</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-200/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Hỏi về máy bơm, công suất, số tầng..."
            className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs flex-shrink-0 cursor-pointer"
            title="Gửi câu hỏi"
            aria-label="Gửi câu hỏi"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
