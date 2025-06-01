import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/NavBar.jsx';

const ChatInput = ({ onSendMessage, placeholder = "Message Dr Sree..." }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [conversation, setConversation] = useState([]); //

  const textareaRef = useRef(null);

  const messagesEndRef = useRef(null); // Add this for auto-scrolling

  // Add this useEffect for auto-scrolling
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);


  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '24px';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.min(scrollHeight, 200) + 'px';
    }
  }, [message]);

  // Modify handleSubmit to call your Flask API
  const handleSubmit = async () => {
    if (message.trim() && !isTyping) {
      // Add user message to conversation
      setConversation(prev => [...prev, { sender: 'user', text: message.trim() }]);
      setMessage('');
      setIsTyping(true);
      
      try {
        const response = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message.trim() })
        });
        
        const data = await response.json();
        // Add bot response to conversation
        setConversation(prev => [...prev, { sender: 'bot', text: data.response }]);
      } catch (error) {
        console.error('Error:', error);
        setConversation(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting to Dr. Sree." }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Navbar />

      <div className="messages-container">
      {conversation.map((msg, index) => (
        <div key={index} className={`message-bubble ${msg.sender}`}>
          {msg.text}
        </div>
      ))}
      {isTyping && (
        <div className="message-bubble bot typing-indicator">
          Dr. Sree is typing...
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
    
    <div className="chat-input-container"></div>
      
      
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <div className="input-field-container">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="chat-textarea"
              rows="1"
              disabled={isTyping}
            />
            
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || isTyping}
              className="send-button"
            >
              {isTyping ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="send-icon">
                  <path
                    d="M7 11L12 6L17 11M12 18V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
          
          <div className="input-footer">
            <span className="helper-text">
              Press Enter to send, Shift + Enter for new line
            </span>
          </div>
        </div>

        <style jsx>{`
          .chat-input-container {
            width: 100%;
            max-width: 768px;
            margin: 0 auto;
            padding: 20px;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: transparent;
          }

          .chat-input-wrapper {
            position: relative;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            border: 2px solid transparent;
            background-clip: padding-box;
            box-shadow: 
              0 0 30px rgba(0, 255, 255, 0.2),
              0 0 60px rgba(255, 0, 255, 0.1),
              inset 0 0 30px rgba(255, 255, 255, 0.05);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: neonGlow 4s ease-in-out infinite alternate;
          }

          .chat-input-wrapper::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, 
              #00ffff,rgb(136, 195, 228),rgb(86, 120, 159),rgb(63, 133, 204), 
              #ff0080, #8000ff, #00ffff);
            background-size: 300% 300%;
            border-radius: 26px;
            z-index: -1;
            animation: gradientShift 3s ease-in-out infinite;
            opacity: 0.7;
          }

          .chat-input-wrapper:hover::before {
            opacity: 1;
            animation: gradientShift 1.5s ease-in-out infinite;
          }

          .chat-input-wrapper:focus-within {
            box-shadow: 
              0 0 40px rgba(0, 255, 255, 0.4),
              0 0 80px rgba(190, 133, 190, 0.2),
              inset 0 0 40px rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
          }

          .chat-input-wrapper:focus-within::before {
            opacity: 1;
            background-size: 200% 200%;
            animation: gradientShift 1s ease-in-out infinite;
          }

          .input-field-container {
            display: flex;
            align-items: flex-end;
            padding: 12px 16px;
            gap: 12px;
            position: relative;
          }

          .chat-textarea {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #ffffff;
            font-size: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 24px;
            resize: none;
            min-height: 24px;
            max-height: 200px;
            padding: 8px 0;
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 255, 255, 0.5) transparent;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }

          .chat-textarea::placeholder {
            color: rgba(255, 255, 255, 0.6);
            text-shadow: none;
          }

          .chat-textarea::-webkit-scrollbar {
            width: 4px;
          }

          .chat-textarea::-webkit-scrollbar-track {
            background: transparent;
          }

          .chat-textarea::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #00ffff, #ff00ff);
            border-radius: 2px;
          }

          .send-button {
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 12px;
            background: linear-gradient(135deg, #00ffff, #ff00ff);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
          }

          .send-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0.4), 
              transparent);
            transition: left 0.5s ease;
          }

          .send-button:hover:not(:disabled)::before {
            left: 100%;
          }

          .send-button:hover:not(:disabled) {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 
              0 8px 25px rgba(0, 255, 255, 0.4),
              0 0 30px rgba(255, 0, 255, 0.3);
            background: linear-gradient(135deg, #00ffff, #ff00ff, #ffff00);
          }

          .send-button:active:not(:disabled) {
            transform: translateY(0) scale(0.98);
          }

          .send-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
            box-shadow: 0 2px 8px rgba(0, 255, 255, 0.2);
          }

          .send-icon {
            width: 20px;
            height: 20px;
            transition: transform 0.2s ease;
          }

          .send-button:hover:not(:disabled) .send-icon {
            transform: translateY(-1px);
          }

          .loading-spinner {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          .input-footer {
            padding: 8px 16px 12px;
            text-align: center;
          }

          .helper-text {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
          }

          /* Animations */
          @keyframes neonGlow {
            0% {
              box-shadow: 
                0 0 30px rgba(0, 255, 255, 0.2),
                0 0 60px rgba(255, 0, 255, 0.1),
                inset 0 0 30px rgba(255, 255, 255, 0.05);
            }
            100% {
              box-shadow: 
                0 0 40px rgba(0, 255, 255, 0.3),
                0 0 80px rgba(255, 0, 255, 0.2),
                inset 0 0 40px rgba(255, 255, 255, 0.08);
            }
          }

          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            25% {
              background-position: 50% 0%;
            }
            50% {
              background-position: 100% 50%;
            }
            75% {
              background-position: 50% 100%;
            }
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }


          .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    margin-bottom: 120px; /* Adjust based on your input height */
  }

  .message-bubble {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 18px;
    margin-bottom: 12px;
    line-height: 1.4;
    word-wrap: break-word;
  }

  .message-bubble.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #3f51b5, #2196f3);
    color: white;
  }

  .message-bubble.bot {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    backdrop-filter: blur(10px);
  }

  .typing-indicator {
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
  }

  /* Keep all your existing styles below */
  .chat-input-container {
    /* ... existing styles ... */
    position: fixed;
    bottom: 0;
    /* ... rest of existing styles ... */
  }
  /* ... rest of your existing styles ... */




          /* Responsive Design */
          @media (max-width: 768px) {
            .chat-input-container {
              padding: 15px;
            }

            .chat-textarea {
              font-size: 16px;
            }

            .helper-text {
              font-size: 11px;
            }

            .send-button {
              width: 36px;
              height: 36px;
            }

            .send-icon {
              width: 18px;
              height: 18px;
            }
          }

          @media (max-width: 480px) {
            .chat-input-container {
              padding: 12px;
            }

            .input-field-container {
              padding: 10px 12px;
              gap: 10px;
            }

            .chat-input-wrapper {
              border-radius: 20px;
            }

            .chat-input-wrapper::before {
              border-radius: 22px;
            }
          }

          /* Dark theme support */
          @media (prefers-color-scheme: dark) {
            .chat-input-wrapper {
              background: rgba(255, 255, 255, 0.08);
            }
          }

          /* High contrast mode */
          @media (prefers-contrast: high) {
            .chat-input-wrapper::before {
              opacity: 1;
            }
            
            .chat-textarea {
              text-shadow: none;
            }
          }

          /* Reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .chat-input-wrapper,
            .send-button,
            .chat-input-wrapper::before {
              animation: none;
              transition: none;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default ChatInput;