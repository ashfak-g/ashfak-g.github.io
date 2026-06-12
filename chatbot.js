// ----------------------------------------------------
// Ashfak.dev Portfolio Client-Side AI Chatbot
// Simulates an AI assistant replying on your behalf
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

    if (typeof PORTFOLIO_DATA === 'undefined') return;
    const answers = PORTFOLIO_DATA.chatbotAnswers;

    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatOptions = document.getElementById('chatOptions');

    if (!chatBubble || !chatWindow || !chatClose || !chatBody) return;

    const badge = chatBubble.querySelector('.chat-badge');

    // 1. Toggle Chat Window
    chatBubble.addEventListener('click', () => {
        chatWindow.classList.add('open');
        if (badge) badge.style.display = 'none'; // Hide notification badge on click
        scrollToBottom();
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    // 2. Click Option Chip
    chatOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('chat-chip')) {
            const questionType = e.target.getAttribute('data-question');
            const questionText = e.target.textContent;
            
            handleUserMessage(questionText, questionType);
        }
    });

    // 3. Submit Message (Send Button / Enter Key)
    chatSendBtn.addEventListener('click', () => {
        submitInput();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitInput();
        }
    });

    function submitInput() {
        const text = chatInput.value.trim();
        if (text === '') return;
        
        chatInput.value = '';
        handleUserMessage(text);
    }

    // 4. Handle sending and receiving flow
    function handleUserMessage(messageText, preSetType = null) {
        // Render User Bubble
        appendBubble(messageText, 'user-message');
        scrollToBottom();

        // Show AI Typing Indicator
        const typingEl = appendTypingIndicator();
        scrollToBottom();

        // Simulated AI thinking delay
        setTimeout(() => {
            // Remove typing indicator
            typingEl.remove();

            // Find matching response
            let replyText = '';
            if (preSetType) {
                replyText = answers[preSetType] || answers.default;
            } else {
                replyText = matchKeywordResponse(messageText);
            }

            // Render AI Bubble
            appendBubble(replyText, 'bot-message');
            scrollToBottom();
        }, 1000 + Math.random() * 500); // 1.0s to 1.5s delay
    }

    // Append standard message bubble to body
    function appendBubble(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = text;
        chatBody.appendChild(msgDiv);
        return msgDiv;
    }

    // Append simulated typing dots
    function appendTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = `
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        `;
        chatBody.appendChild(indicator);
        return indicator;
    }

    // Auto scroll chat to bottom
    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Simple natural language processing (NLP) keyword matching
    function matchKeywordResponse(input) {
        const query = input.toLowerCase();

        // 1. Greet / হ্যালো
        if (query.includes('hi') || query.includes('hello') || query.includes('hey') || 
            query.includes('হ্যালো') || query.includes('হাই') || query.includes('কেমন আছ')) {
            return answers.greeting;
        }

        // 2. Projects / প্রজেক্ট
        if (query.includes('project') || query.includes('projects') || query.includes('work') || 
            query.includes('প্রজেক্ট') || query.includes('কাজ') || query.includes('পোর্টফোলিও')) {
            return answers.projects;
        }

        // 3. Skills / স্কিল
        if (query.includes('skill') || query.includes('skills') || query.includes('expert') || 
            query.includes('দক্ষতা') || query.includes('পারি') || query.includes('জানি') || 
            query.includes('python') || query.includes('sql') || query.includes('ml')) {
            return answers.skills;
        }

        // 4. Resume / সিভি
        if (query.includes('resume') || query.includes('cv') || query.includes('biodata') || 
            query.includes('রিজিউমি') || query.includes('সিভি') || query.includes('ডাউনলোড')) {
            return answers.resume;
        }

        // 5. Contact / যোগাযোগ
        if (query.includes('contact') || query.includes('email') || query.includes('phone') || 
            query.includes('যোগাযোগ') || query.includes('ইমেইল') || query.includes('ঠিকানা') || 
            query.includes('নম্বর')) {
            return answers.contact;
        }

        // Default fallback
        return answers.default;
    }
});
