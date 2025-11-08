// Basic JavaScript functionality for the OdeX website
console.log('OdeX JS loaded - Version 2025-10-10-MOBILE');
document.addEventListener('DOMContentLoaded', function() {
    // Clear any cached data that might cause issues
    localStorage.removeItem('partners-section');
    
    // Preloader: show for 3.5s then hide - ONLY on initial page load!
    // Check if preloader has already been shown in this session or if navigating with hash
    const hasShownPreloader = sessionStorage.getItem('preloaderShown');
    const hasHash = window.location.hash && window.location.hash !== '';
    
    // Check navigation type using modern Performance API
    let isNavigation = false;
    try {
        const navEntries = performance.getEntriesByType('navigation');
        if (navEntries.length > 0) {
            const navType = navEntries[0].type;
            // 'navigate' = initial load, 'reload' = refresh, 'back_forward' = back/forward button
            // We only want to show preloader on initial 'navigate' without hash
            isNavigation = (navType === 'reload' || navType === 'back_forward');
        }
    } catch (e) {
        // Fallback for older browsers
        if (window.performance && window.performance.navigation) {
            isNavigation = (window.performance.navigation.type === 1 || window.performance.navigation.type === 2);
        }
    }
    
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Only show preloader if:
        // 1. It hasn't been shown in this session
        // 2. There's no hash in the URL (not navigating to a section)
        // 3. It's not a page reload/navigation
        if (!hasShownPreloader && !hasHash && !isNavigation) {
            sessionStorage.setItem('preloaderShown', 'true');
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => preloader.remove(), 400);
        }, 3500);
        } else {
            // Hide preloader immediately if it shouldn't be shown
            preloader.style.display = 'none';
            preloader.remove();
        }
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Ensure chatbot widget icons are initialized
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);

    // Services section visibility handler
    const servicesSection = document.getElementById('services');
    const servicesLinks = document.querySelectorAll('a[href="#services"], a[href="index.html#services"], a[href*="#services"], a[data-lang="navServices"]');

    // Ensure Services nav item always appears after Key Modules
    const navFeaturesLink = document.querySelector('a[data-lang="navFeatures"]');
    const navServicesLink = document.querySelector('a[data-lang="navServices"]');
    if (navFeaturesLink && navServicesLink) {
        const featuresItem = navFeaturesLink.closest('li');
        const servicesItem = navServicesLink.closest('li');
        const menuList = featuresItem && featuresItem.parentElement;
        if (featuresItem && servicesItem && menuList) {
            const desiredNext = featuresItem.nextElementSibling;
            if (desiredNext !== servicesItem) {
                menuList.insertBefore(servicesItem, desiredNext);
            }
        }
    }

    const ensureNavServicesBadge = () => {
        const serviceAnchors = document.querySelectorAll('a[data-lang="navServices"]');
        serviceAnchors.forEach(anchor => {
            if (!anchor) return;

            anchor.setAttribute('href', 'index.html#services');

            let label = anchor.querySelector('.nav-link-label');
            if (!label) {
                const text = anchor.textContent.trim() || 'Services';
                label = document.createElement('span');
                label.className = 'nav-link-label';
                const textSpan = document.createElement('span');
                textSpan.className = 'nav-link-text';
                textSpan.textContent = text;
                label.appendChild(textSpan);
                anchor.textContent = '';
                anchor.appendChild(label);
            } else {
                let textSpan = label.querySelector('.nav-link-text');
                if (!textSpan) {
                    const existing = label.textContent.trim() || 'Services';
                    label.textContent = '';
                    textSpan = document.createElement('span');
                    textSpan.className = 'nav-link-text';
                    textSpan.textContent = existing;
                    label.appendChild(textSpan);
                }
            }

            let badge = anchor.querySelector('.nav-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'nav-badge nav-badge--new';
                badge.textContent = 'NEW';
                badge.setAttribute('aria-label', 'New services available');
                label.appendChild(badge);
            }
        });
    };

    ensureNavServicesBadge();
    
    function exitServicesFocus() {
        document.body.classList.remove('services-focus');
        if (servicesSection) {
            servicesSection.style.display = 'none';
        }
    }
    
    // Function to show and scroll to Services section
    function showServicesSection(e) {
        if (e) {
            e.preventDefault();
        }
        
        // If we're not on index.html, navigate to it first
        const currentPath = window.location.pathname;
        const currentHref = window.location.href;
        const isIndexPage = currentPath === '/' || 
                           currentPath === '/index.html' || 
                           currentPath.endsWith('/index.html') || 
                           currentPath.endsWith('/') ||
                           currentHref.includes('index.html') ||
                           (!currentPath.includes('.html') && currentPath === '/');
        
        if (!isIndexPage) {
            // Navigate to index.html with services hash
            window.location.href = 'index.html#services';
            return;
        }
        
        if (servicesSection) {
            document.body.classList.add('services-focus');
            // Show the section
            servicesSection.style.display = 'block';
            
            // Re-initialize Lucide icons after showing the section
            if (typeof lucide !== 'undefined') {
                setTimeout(() => {
                    lucide.createIcons();
                }, 100);
            }
            
            // Scroll to the section smoothly
            setTimeout(() => {
                servicesSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 50);
        }
    }
    
    // Add click event listeners to all Services links
    servicesLinks.forEach(link => {
        link.addEventListener('click', showServicesSection);
    });
    
    // Ensure other navigation removes services focus mode
    document.querySelectorAll('a[data-lang]:not([data-lang="navServices"])').forEach(link => {
        link.addEventListener('click', () => {
            exitServicesFocus();
        });
    });
    
    // Also handle direct navigation to index.html#services
    document.querySelectorAll('a[href="index.html#services"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html#services';
        });
    });
    
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#services') {
            showServicesSection();
        } else {
            exitServicesFocus();
        }
    });
    
    // Check if URL hash is #services on page load
    if (window.location.hash === '#services') {
        if (servicesSection) {
            showServicesSection();
        } else {
            // If services section doesn't exist on this page, navigate to index.html
            window.location.href = 'index.html#services';
        }
    }

    // Chatbot Widget Functionality
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotMinimize = document.getElementById('chatbot-minimize');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotBadge = document.querySelector('.chatbot-badge');
    
    let isChatbotOpen = false;
    let conversationContext = []; // Store conversation history for context
    
    // Ensure chatbot widget is visible and icons are initialized
    if (chatbotWidget) {
        chatbotWidget.style.display = 'block';
        chatbotWidget.style.visibility = 'visible';
        chatbotWidget.style.opacity = '1';
        chatbotWidget.style.position = 'fixed';
        chatbotWidget.style.bottom = '20px';
        chatbotWidget.style.right = '20px';
        chatbotWidget.style.zIndex = '1000';
        // Initialize Lucide icons for chatbot
        if (typeof lucide !== 'undefined') {
            setTimeout(() => {
                lucide.createIcons();
            }, 200);
        }
    } else {
        // Log error if chatbot widget not found
        console.warn('Chatbot widget not found on page:', window.location.pathname);
    }
    
    // Toggle chatbot window
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', function() {
            if (!isChatbotOpen) {
                chatbotWindow.style.display = 'flex';
                isChatbotOpen = true;
                if (chatbotBadge) chatbotBadge.style.display = 'none';
                chatbotInput.focus();
                // Re-initialize Lucide icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }
    
    // Minimize chatbot window
    if (chatbotMinimize && chatbotWindow) {
        chatbotMinimize.addEventListener('click', function() {
            chatbotWindow.style.display = 'none';
            isChatbotOpen = false;
        });
    }
    
    // Send message function
    function sendMessage(message) {
        if (!message.trim()) return;
        
        // Store user message in context
        conversationContext.push({ type: 'user', message: message });
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chatbot-message chatbot-message-user';
        userMessage.innerHTML = `
            <div class="chatbot-avatar-small">
                <i data-lucide="user"></i>
            </div>
            <div class="chatbot-message-content">
                <p>${escapeHtml(message)}</p>
            </div>
        `;
        chatbotMessages.appendChild(userMessage);
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Show typing indicator and generate response
        showTypingIndicator();
        generateResponse(message);
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message chatbot-message-bot chatbot-typing';
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="chatbot-avatar-small">
                <i data-lucide="headphones"></i>
            </div>
            <div class="chatbot-message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Generate intelligent response
    function generateResponse(message) {
        const msg = message.toLowerCase().trim();
        let response = '';
        
        // Get recent conversation context
        const recentContext = conversationContext.slice(-3).map(c => c.message.toLowerCase()).join(' ');
        
        // Simulate bot response (you can replace this with actual API call)
        setTimeout(() => {
            removeTypingIndicator();
            
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message chatbot-message-bot';
            
            // Enhanced response logic with better question understanding
            
            // Greetings
            if (msg.match(/^(hello|hi|hey|မင်္ဂလာ|နေကောင်း|ဟေး)/i)) {
                response = currentLang === 'my' 
                    ? 'မင်္ဂလာပါ! OdeX ERP ဝန်ဆောင်မှုများအကြောင်း မေးခွန်းများရှိပါက မေးမြန်းနိုင်ပါသည်။ ကျွန်ုပ်တို့ ဘယ်လို ကူညီပေးနိုင်မလဲ?'
                    : 'Hello! I\'m here to help you with any questions about OdeX ERP services. How can I assist you today?';
            }
            // Pricing questions
            else if (msg.match(/(price|cost|fee|charge|စျေးနှုန်း|ဈေး|ကုန်ကျ)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP ဝန်ဆောင်မှုများ၏ စျေးနှုန်းများသည် သင့်လုပ်ငန်း၏ လိုအပ်ချက်များအပေါ် မူတည်ပါသည်။ စျေးနှုန်းအသေးစိတ်သိရှိလိုပါက 09 754 758 505 သို့ ဖုန်းခေါ်ဆိုပြီး အခမဲ့အကြံဉာဏ်တောင်းဆိုနိုင်ပါသည်။'
                    : 'OdeX ERP service pricing depends on your business requirements. For detailed pricing information, please call us at 09 754 758 505 for a free consultation.';
            }
            // Demo requests
            else if (msg.match(/(demo|trial|test|try|ဒီမို|စမ်းကြည့်|စမ်းသုံး)/i)) {
                response = currentLang === 'my'
                    ? 'အခမဲ့ဒီမိုတောင်းဆိုနိုင်ပါသည်! OdeX ERP စနစ်၏ အင်္ဂါရပ်များကို စမပ်ကြည့်ရှုနိုင်ပါသည်။ ဆက်သွယ်ရန်စာမျက်နှာသို့ သွားရောက်ပြီး ဒီမိုတောင်းဆိုနိုင်ပါသည်။'
                    : 'Yes! You can request a free demo to try out OdeX ERP features. Please visit our contact page to request a demo.';
            }
            // Support/Help questions
            else if (msg.match(/(support|help|assist|problem|issue|error|ကူညီ|ပံ့ပိုး|အခက်အခဲ|ပြဿနာ)/i)) {
                response = currentLang === 'my'
                    ? 'ကျွန်ုပ်တို့၏ ပံ့ပိုးမှုအဖွဲ့သည် ၂၄/၇ ရရှိနိုင်ပါသည်။ နည်းပညာဆိုင်ရာ အခက်အခဲများ၊ မေးခွန်းများရှိပါက 09 754 758 505 သို့ ဖုန်းခေါ်ဆိုနိုင်ပါသည်။ သို့မဟုတ် ဆက်သွယ်ရန်စာမျက်နှာမှတစ်ဆင့် ဆက်သွယ်နိုင်ပါသည်။'
                    : 'Our support team is available 24/7. For technical issues or questions, please call us at 09 754 758 505 or contact us through our contact page.';
            }
            // ERP/System questions
            else if (msg.match(/(erp|system|software|odoo|စနစ်|ဆော့ဖ်ဝဲ|ဆော့ဖ်ဝဲလ်)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP သည် သင့်စီးပွားရေးလုပ်ငန်း၏ အားလုံးကို တစ်နေရာတည်းမှ စီမံခန့်ခွဲနိုင်သော စနစ်ဖြစ်ပါသည်။ ရောင်းအား၊ စာရင်း၊ ဘဏ္ဍာရေး၊ HR နှင့် POS စသည့် မော်ဂျူးများပါဝင်ပါသည်။ ပိုမိုသိရှိလိုပါက "အဓိကမော်ဂျူးများ" စာမျက်နှာသို့ သွားရောက်နိုင်ပါသည်။'
                    : 'OdeX ERP is a comprehensive system that manages all aspects of your business in one place. It includes modules for Sales, Inventory, Accounting, HR, and POS. For more details, please visit our "Key Modules" page.';
            }
            // Features/Modules questions
            else if (msg.match(/(service|အခြားဝန်|additional service|other service)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP Solutions မှ ထပ်မံရရှိနိုင်သော ဝန်ဆောင်မှုများမှာ Digital Assets ရောင်းဝယ်ရေး၊ Web3 & Blockchain ပေါင်းစပ်လုပ်ဆောင်မှုနှင့် စျေးနှုန်းသက်သာသော ဝဘ်/အက်ပ် ဖွံ့ဖြိုးမှုများ ပါဝင်ပါသည်။ အကောင်အထည်ဖော် မေးမြန်းလိုပါက "အခြားဝန်ဆောင်မှုများ" စာမျက်နှာသို့ သွားရောက်နိုင်ပါသည်။'
                    : 'Our additional services include the Digital Assets marketplace, Web3 & Blockchain integrations, and affordable web/app development. Open the "Services" section to review each offering in detail.';
            }
            // Digital Assets Marketplace
            else if (msg.match(/(digital asset|topup|top-up|mlbb|pubg|free fire|hok|steam|blizzard|spotify|telegram|game|diamond|UC|multi digital)/i)) {
                response = currentLang === 'my'
                    ? 'Digital Assets Marketplace တွင် MLBB Diamonds, PUBG UC, Free Fire Diamonds, Honor of Kings Coupons, Steam Wallet, Blizzard Gift Cards, Spotify Premium, Telegram Premium စသည်တို့ကို အချိန်နှင့်တပြေးညီ ဝယ်ယူနိုင်ပါသည်။ Order now ခလုတ်ကို နှိပ်ပြီး ဖုန်း 09 754 758 505၊ Telegram t.me/rueonchain သို့မဟုတ် Messenger m.me/cthu.mr မှတဆင့် အော်ဒါတင်နိုင်ပါသည်။ ငွေပေးချေမှုများအတွက် USDT/USDC, KBZPay, WavePay, AYAPay, UABPay, Visa များကို ပံ့ပိုးထားပါသည်။'
                    : 'Inside our Digital Assets Marketplace you can instantly order MLBB Diamonds, PUBG UC, Free Fire Diamonds, Honor of Kings coupons, Steam Wallet credit, Blizzard Gift Cards, Spotify, Telegram Premium and more. Click the “Order now” button to place an order via phone (09 754 758 505), Telegram (t.me/rueonchain) or Messenger (m.me/cthu.mr). We accept USDT/USDC, KBZPay, WavePay, AYAPay, UABPay, and Visa.';
            }
            // Web3 & Blockchain integrations
            else if (msg.match(/(web3|blockchain|nft|smart contract|token|dao|crypto|metaverse|defi)/i)) {
                response = currentLang === 'my'
                    ? 'Web3 & Blockchain ပေါင်းစပ်လုပ်ဆောင်မှုဝန်ဆောင်မှုတွင် Smart contract ရေးသားခြင်း၊ NFT marketplace တည်ဆောက်ခြင်း၊ Token gated community များ၊ Payment bridge နှင့် On-chain analytics တို့ကို ပေါင်းစပ်ပေးပါသည်။ Proof-of-Concept မှ mainnet launch အထိ OdeX ERP Solutions သည် 24/7 ပံ့ပိုးမှုနှင့် Compliance အားဖြင့် တာဝန်ယူပံ့ပိုးပေးပါသည်။'
                    : 'Our Web3 & Blockchain integrations cover smart-contract engineering, NFT marketplaces, token-gated communities, payment bridges, and on-chain analytics. OdeX ERP Solutions supports you end-to-end—from proof-of-concept through mainnet launch—with 24/7 specialists and compliance guidance.';
            }
            // Features/Modules questions
            else if (msg.match(/(feature|module|function|capability|အင်္ဂါရပ်|မော်ဂျူး|လုပ်ဆောင်ချက်)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP တွင် အဓိကမော်ဂျူးများမှာ - ရောင်းအား (Sales), စာရင်း (Inventory), ဘဏ္ဍာရေး (Accounting), လူ့စွမ်းအင် (HR), POS စနစ် စသည်တို့ပါဝင်ပါသည်။ အသေးစိတ်သိရှိလိုပါက "အဓိကမော်ဂျူးများ" စာမျက်နှာသို့ သွားရောက်နိုင်ပါသည်။'
                    : 'OdeX ERP includes key modules such as Sales, Inventory, Accounting, HR, and POS systems. For detailed information, please visit our "Key Modules" page.';
            }
            // Installation/Setup questions
            else if (msg.match(/(install|setup|configure|start|begin|တပ်ဆင်|စတင်|ပြင်ဆင်)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP စနစ်ကို စတင်အသုံးပြုရန် ကျွန်ုပ်တို့၏ အဖွဲ့သည် သင့်အား အကူအညီပေးပါမည်။ စနစ်တပ်ဆင်ခြင်း၊ ပြင်ဆင်ခြင်းနှင့် လေ့ကျင့်ပေးခြင်းများကို ပံ့ပိုးပေးပါသည်။ 09 754 758 505 သို့ ဖုန်းခေါ်ဆိုပြီး အခမဲ့အကြံဉာဏ်တောင်းဆိုနိုင်ပါသည်။'
                    : 'To get started with OdeX ERP, our team will assist you with installation, configuration, and training. Please call us at 09 754 758 505 for a free consultation.';
            }
            // Contact/Communication questions
            else if (msg.match(/(contact|call|phone|email|reach|ဆက်သွယ်|ဖုန်း|ခေါ်)/i)) {
                response = currentLang === 'my'
                    ? 'ကျွန်ုပ်တို့နှင့် ဆက်သွယ်ရန်:\n• ဖုန်း: 09 754 758 505\n• အီးမေးလ်: odexerp@gmail.com\n• ဆက်သွယ်ရန်စာမျက်နှာ: contact.html\nကျွန်ုပ်တို့၏ အဖွဲ့သည် သင့်အား ကူညီရန် အဆင်သင့်ရှိပါသည်။'
                    : 'To contact us:\n• Phone: 09 754 758 505\n• Email: odexerp@gmail.com\n• Contact Page: contact.html\nOur team is ready to help you.';
            }
            // What is OdeX questions
            else if (msg.match(/(what is|what are|what does|ဘာလဲ|ဘာတွေ|ဘယ်လို)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP သည် မြန်မာနိုင်ငံအတွက် သီးသန့်ဖန်တီးထားသော စီးပွားရေးစီမံခန့်ခွဲမှုစနစ်ဖြစ်ပါသည်။ သင့်လုပ်ငန်း၏ ရောင်းအား၊ စာရင်း၊ ဘဏ္ဍာရေး၊ HR နှင့် POS စသည့် လုပ်ငန်းများကို တစ်နေရာတည်းမှ စီမံခန့်ခွဲနိုင်ပါသည်။ ပိုမိုသိရှိလိုပါက "ERP အကြောင်း" စာမျက်နှာသို့ သွားရောက်နိုင်ပါသည်။'
                    : 'OdeX ERP is a business management system specifically designed for Myanmar businesses. It helps you manage sales, inventory, accounting, HR, and POS all in one place. For more information, please visit our "About ERP" page.';
            }
            // Benefits/Advantages questions
            else if (msg.match(/(benefit|advantage|why|good|better|အကျိုးကျေးဇူး|အားသာချက်|ဘာကြောင့်|ကောင်း)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP ၏ အဓိကအားသာချက်များ:\n• လုပ်ငန်းစဉ်များကို ထိရောက်စွာ စီမံခန့်ခွဲခြင်း\n• အချိန်နှင့် ကုန်ကျစရိတ် ချွေတာခြင်း\n• အချက်အလက်များ တစ်နေရာတည်းတွင် စုစည်းခြင်း\n• မိုဘိုင်းနှင့် အဆင်ပြေမှု\n• မြန်မာနိုင်ငံအတွက် သီးသန့်ဒီဇိုင်းထုတ်ထားခြင်း\nပိုမိုသိရှိလိုပါက "ဘာကြောင့် OdeX ကို ရွေးချယ်ရမလဲ?" စာမျက်နှာသို့ သွားရောက်နိုင်ပါသည်။'
                    : 'Key benefits of OdeX ERP:\n• Efficient business process management\n• Time and cost savings\n• Centralized data management\n• Mobile-friendly access\n• Specifically designed for Myanmar businesses\nFor more details, please visit our "Why Choose OdeX?" section.';
            }
            // Comparison questions
            else if (msg.match(/(compare|comparison|vs|versus|difference|different|နှိုင်းယှဉ်|ကွာခြား|မတူ)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP သည် ပုံမှန် POS စနစ်များထက် ပိုမိုကောင်းမွန်သော အင်္ဂါရပ်များရှိပါသည်:\n• အချက်အလက် စီမံခန့်ခွဲမှု ပြည့်စုံခြင်း\n• အသေးစိတ် အစီရင်ခံစာများ\n• အလိုအလျောက် စာရင်းစီမံခန့်ခွဲမှု\n• မိုဘိုင်းနှင့် အဆင်ပြေမှု\n• စိတ်ကြိုက် ပြုပြင်နိုင်မှု\nပိုမိုသိရှိလိုပါက "နှိုင်းယှဉ်ချက်" စာမျက်နှာသို့ သွားရောက်နိုင်ပါသည်။'
                    : 'OdeX ERP offers superior features compared to traditional POS systems:\n• Complete data management\n• Detailed reporting\n• Automated inventory management\n• Mobile-friendly access\n• Customization options\nFor more details, please visit our "Comparison" page.';
            }
            // Time/Duration questions
            else if (msg.match(/(how long|time|duration|when|ဘယ်လောက်ကြာ|ဘယ်အချိန်|ဘယ်တော့)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP စနစ်ကို စတင်အသုံးပြုရန်:\n• အခမဲ့အကြံဉာဏ်: ချက်ချင်း\n• ဒီမို: ၁-၂ ရက်\n• စနစ်တပ်ဆင်ခြင်း: ၃-၇ ရက်\n• လေ့ကျင့်ပေးခြင်း: ၁-၂ ပတ်\nသင့်လုပ်ငန်း၏ လိုအပ်ချက်များအပေါ် မူတည်ပါသည်။ 09 754 758 505 သို့ ဖုန်းခေါ်ဆိုပြီး အသေးစိတ်သိရှိနိုင်ပါသည်။'
                    : 'To get started with OdeX ERP:\n• Free consultation: Immediately\n• Demo: 1-2 days\n• Installation: 3-7 days\n• Training: 1-2 weeks\nTimeline depends on your business needs. Call us at 09 754 758 505 for details.';
            }
            // Security questions
            else if (msg.match(/(security|safe|secure|protect|privacy|လုံခြုံ|ကာကွယ်|အကာအကွယ်)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP သည် အဆင့်မြင့် လုံခြုံရေးစနစ်များဖြင့် ကာကွယ်ထားပါသည်:\n• SSL encryption\n• Role-based access control\n• Regular security updates\n• Data backup နေ့စဉ်\n• ISO 27001 certified\nသင့်အချက်အလက်များသည် လုံခြုံစွာ သိမ်းဆည်းထားပါသည်။'
                    : 'OdeX ERP is protected with advanced security measures:\n• SSL encryption\n• Role-based access control\n• Regular security updates\n• Daily data backups\n• ISO 27001 certified\nYour data is stored securely.';
            }
            // Training/Education questions
            else if (msg.match(/(train|training|learn|teach|education|လေ့ကျင့်|သင်ယူ|သင်ကြား)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP စနစ်ကို အသုံးပြုရန် လေ့ကျင့်ပေးခြင်းများ:\n• အခမဲ့ လေ့ကျင့်ပေးခြင်း\n• လက်တွေ့ လေ့ကျင့်မှုများ\n• ဗီဒီယို သင်ခန်းစာများ\n• ၂၄/၇ ပံ့ပိုးမှု\n• လေ့ကျင့်ပေးခြင်း စာရွက်စာတမ်းများ\nကျွန်ုပ်တို့၏ အဖွဲ့သည် သင့်အား စနစ်ကို အပြည့်အဝ အသုံးပြုနိုင်အောင် ကူညီပေးပါမည်။'
                    : 'Training provided for OdeX ERP:\n• Free training sessions\n• Hands-on practice\n• Video tutorials\n• 24/7 support\n• Training documentation\nOur team will help you fully utilize the system.';
            }
            // Payment/Billing questions
            else if (msg.match(/(payment|pay|billing|invoice|bill|ပေးငွေ|ပေးချေ|ငွေပေး|ဘေလ်|kbzpay|wavepay|ayapay|uabpay|visa|usdt|usdc)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP Solutions သည် စီးပွားရေးဝန်ဆောင်မှုများအတွက် လစဉ်/နှစ်စဉ် subscription များထပ်မံပေးဆောင်နိုင်ရန် Bank transfer၊ Mobile banking နှင့် Invoice စနစ်များကို ပံ့ပိုးထားပါသည်။ Digital Assets Marketplace အော်ဒါများအတွက် စနစ်တကျ ငွေပေးချေမှုနည်းလမ်းများမှာ USDT/USDC၊ KBZPay၊ WavePay၊ AYAPay၊ UABPay နှင့် Visa ကတ် တို့ဖြစ်ပါသည်။ အကူအညီလိုပါက 09 754 758 505 သို့ ခေါ်ဆိုပြီး ငွေပေးချေမှုအဆင့်မြှင့်ရေးကို တိုင်ပင်နိုင်ပါသည်။'
                    : 'For OdeX ERP service subscriptions we support monthly/annual billing with bank transfers, mobile banking and automated invoices. Digital Assets Marketplace orders can be settled via USDT/USDC, KBZPay, WavePay, AYAPay, UABPay, or Visa. Need help arranging payment? Call 09 754 758 505 and we’ll walk you through the steps.';
            }
            // Integration questions
            else if (msg.match(/(integrate|integration|connect|link|ပေါင်းစပ်|ဆက်သွယ်|လင့်)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP သည် အခြားစနစ်များနှင့် ပေါင်းစပ်နိုင်ပါသည်:\n• Accounting software\n• E-commerce platforms\n• Payment gateways\n• Bank systems\n• Third-party applications\nသင့်လုပ်ငန်း၏ လိုအပ်ချက်များအပေါ် မူတည်၍ ပေါင်းစပ်နိုင်ပါသည်။'
                    : 'OdeX ERP can integrate with other systems:\n• Accounting software\n• E-commerce platforms\n• Payment gateways\n• Bank systems\n• Third-party applications\nIntegration depends on your business needs.';
            }
            // Mobile/App questions
            else if (msg.match(/(mobile|app|application|phone|smartphone|မိုဘိုင်း|အက်ပ်|ဖုန်း)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP သည် မိုဘိုင်းနှင့် အဆင်ပြေပါသည်:\n• Web-based (ဘယ်ဖုန်းမှမဆို အသုံးပြုနိုင်သည်)\n• Responsive design\n• Mobile-optimized interface\n• Offline mode (အချို့လုပ်ဆောင်ချက်များ)\n• Real-time synchronization\nမည်သည့်ကိရိယာမှမဆို သင့်လုပ်ငန်းကို စီမံခန့်ခွဲနိုင်ပါသည်။'
                    : 'OdeX ERP is mobile-friendly:\n• Web-based (works on any phone)\n• Responsive design\n• Mobile-optimized interface\n• Offline mode (some features)\n• Real-time synchronization\nManage your business from any device.';
            }
            // Web & App development services
            else if (msg.match(/(web dev|website|web site|web design|web development|landing page|e[- ]?commerce|ecommerce|frontend|backend|ဝဘ်|ဝဘ်ဆိုဒ်|အက်ပ်ဖွံ့ဖြိုး|application development)/i)) {
                response = currentLang === 'my'
                    ? 'OdeX ERP Solutions ၏ ဝဘ်နှင့် အက်ပ် ဖွံ့ဖြိုးရေးဝန်ဆောင်မှုတွင် အောက်ပါအရာများ ပါဝင်ပါသည်:\n• Standard နှင့် E-commerce ဝဘ်ဆိုဒ်များ\n• iOS/Android မိုဘိုင်းအက်ပ် ဖွံ့ဖြိုးရေး\n• Responsive UI/UX ဒီဇိုင်း\n• Payment gateway ထပ်မံပေါင်းစပ်ခြင်း\n• Launch & post-launch ပံ့ပိုးမှု\nအသေးစိတ်သိရှိလိုပါက web-development.html သို့ သွားရောက်၍ ပိုမိုလေ့လာပါ။'
                    : 'Our web & app development service covers:\n• Standard and E-commerce websites\n• iOS/Android mobile app development\n• Responsive UI/UX design\n• Payment gateway integrations\n• Launch and post-launch support\nVisit web-development.html to explore the full breakdown.';
            }
            // Ordering process
            else if (msg.match(/(order|buy|purchase|how to buy|အော်ဒါ|မှာယူ|ဝယ်ယူ|ယူမလဲ)/i)) {
                response = currentLang === 'my'
                    ? 'Digital Assets Marketplace တွင် အော်ဒါတင်ရန် အဆင့်များ:\n1. digital-assets.html တွင် ဝန်ဆောင်မှုကို ရွေးချယ်ပါ\n2. \"Order now\" ခလုတ်ကို နှိပ်၍ ဖုန်း၊ Telegram သို့မဟုတ် Messenger ဖြင့် ဆက်သွယ်ပါ\n3. သင်လိုအပ်သည့် game ID/UID သို့မဟုတ် account အချက်အလက်များ ပေးပို့ပါ\n4. ငွေပေးချေမှုနည်းလမ်း (USDT/USDC, KBZPay, WavePay, AYAPay, UABPay, Visa) ကို ရွေးချယ်ပါ\n5. Payment အတည်ပြုပြီး 5-15 မိနစ်အတွင်း Digital Asset ကို လက်ခံရရှိပါသည်။'
                    : 'To place a Digital Assets order:\n1. Open digital-assets.html and pick the asset you need\n2. Click “Order now” to contact us via phone, Telegram, or Messenger\n3. Share the required game ID/UID or account details\n4. Choose a payment channel (USDT/USDC, KBZPay, WavePay, AYAPay, UABPay, Visa)\n5. Once confirmed, delivery happens within 5–15 minutes.';
            }
            // Company/Partners questions
            else if (msg.match(/(company|partner|client|customer|who use|ကုမ္ပဏီ|ဖောက်သည်|အသုံးပြု)/i)) {
                response = currentLang === 'my'
                    ? 'Odoo ERP System ကို အသုံးပြုနေသော လုပ်ငန်းများ (ဥပမာ):\n• Autonova (မော်တော်ယာဉ်လုပ်ငန်း)\n• AWBA (အစားအသောက်လုပ်ငန်း)\n• City Properties (အိမ်ခြံမြေလုပ်ငန်း)\n• Citywin (လက်လီလုပ်ငန်း)\n• Season Hotel (ဟိုတယ်လုပ်ငန်း)\n• YIGTL (ပို့ဆောင်ရေးလုပ်ငန်း)\nဤလုပ်ငန်းများသည် Odoo ERP System ကို အသုံးပြုနေသော ဥပမာများဖြစ်ပါသည်။'
                    : 'Companies using Odoo ERP System (Examples):\n• Autonova (Automotive)\n• AWBA (Food & Beverage)\n• City Properties (Real Estate)\n• Citywin (Retail)\n• Season Hotel (Hospitality)\n• YIGTL (Logistics)\nThese are examples of companies using Odoo ERP System.';
            }
            // Thank you responses
            else if (msg.match(/(thank|thanks|appreciate|ကျေးဇူး|ကျေးဇူးတင်ပါ|ကျေးဇူးပါ)/i)) {
                response = currentLang === 'my'
                    ? 'ရပါတယ်! အခြားမေးခွန်းများရှိပါက မေးမြန်းနိုင်ပါသည်။ ပိုမိုအကူအညီလိုအပ်ပါက 09 754 758 505 သို့ ဖုန်းခေါ်ဆိုနိုင်ပါသည်။'
                    : 'You\'re welcome! If you have any other questions, feel free to ask. For further assistance, please call us at 09 754 758 505.';
            }
            // Default response for unrecognized questions
            else {
                // Check if it's a follow-up question based on context
                if (recentContext.includes('price') || recentContext.includes('cost') || recentContext.includes('စျေးနှုန်း')) {
                    response = currentLang === 'my'
                        ? 'စျေးနှုန်းအသေးစိတ်သိရှိလိုပါက 09 754 758 505 သို့ ဖုန်းခေါ်ဆိုပြီး အခမဲ့အကြံဉာဏ်တောင်းဆိုနိုင်ပါသည်။ ကျွန်ုပ်တို့၏ အဖွဲ့သည် သင့်လုပ်ငန်း၏ လိုအပ်ချက်များအပေါ် မူတည်၍ အကောင်းဆုံးစျေးနှုန်းကို ပေးအပ်ပါမည်။'
                        : 'For detailed pricing, please call us at 09 754 758 505 for a free consultation. Our team will provide the best pricing based on your business needs.';
                } else if (recentContext.includes('demo') || recentContext.includes('ဒီမို')) {
                    response = currentLang === 'my'
                        ? 'ဒီမိုတောင်းဆိုရန် ဆက်သွယ်ရန်စာမျက်နှာသို့ သွားရောက်ပြီး ဖောင်ဖြည့်သွင်းနိုင်ပါသည်။ သို့မဟုတ် 09 754 758 505 သို့ ဖုန်းခေါ်ဆိုနိုင်ပါသည်။'
                        : 'To request a demo, please visit our contact page and fill out the form, or call us at 09 754 758 505.';
                } else {
                    response = currentLang === 'my'
                        ? 'ကျေးဇူးပြု၍ မေးခွန်းကို ပိုမိုရှင်းလင်းစွာ မေးမြန်းပေးပါ။ OdeX ERP နှင့် ပတ်သက်သော မေးခွန်းများကို ကူညီပေးနိုင်ပါသည်:\n• စျေးနှုန်းများ\n• အင်္ဂါရပ်များ\n• ဒီမိုတောင်းဆိုခြင်း\n• ပံ့ပိုးမှု\n• စနစ်အကြောင်း\nသို့မဟုတ် 09 754 758 505 သို့ ဖုန်းခေါ်ဆိုပြီး ဆက်သွယ်နိုင်ပါသည်။'
                        : 'Could you please clarify your question? I can help you with questions about:\n• Pricing\n• Features\n• Demo requests\n• Support\n• System information\nOr you can call us at 09 754 758 505 for direct assistance.';
                }
            }
            
            // Format response with line breaks
            const formattedResponse = response.split('\n').map(line => line.trim()).filter(line => line).join('<br>');
            
            botMessage.innerHTML = `
                <div class="chatbot-avatar-small">
                    <i data-lucide="headphones"></i>
                </div>
                <div class="chatbot-message-content">
                    <p>${formattedResponse}</p>
                </div>
            `;
            chatbotMessages.appendChild(botMessage);
            
            // Store bot response in context
            conversationContext.push({ type: 'bot', message: response });
            
            // Keep only last 6 messages in context
            if (conversationContext.length > 6) {
                conversationContext = conversationContext.slice(-6);
            }
            
            // Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 800 + Math.random() * 400); // Random delay between 800-1200ms for more natural feel
    }
    
    // Send button click
    if (chatbotSend && chatbotInput) {
        chatbotSend.addEventListener('click', function() {
            const message = chatbotInput.value.trim();
            if (message) {
                sendMessage(message);
                chatbotInput.value = '';
                chatbotInput.focus();
            }
        });
    }
    
    // Enter key to send
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const message = chatbotInput.value.trim();
                if (message) {
                    sendMessage(message);
                    chatbotInput.value = '';
                    chatbotInput.focus();
                }
            }
        });
    }
    

    // Clean URL if someone lands on /index.html
    try {
        if (window.location.pathname.endsWith('/index.html')) {
            const search = window.location.search || '';
            const hash = window.location.hash || '';
            window.history.replaceState({}, '', '/' + search + hash);
        }
    } catch (_) {}
    // Basic deterrents (not security): disable context menu and some key combos
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'u')) e.preventDefault();
        if (e.key === 'F12') e.preventDefault();
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j' || e.key.toLowerCase() === 'c')) e.preventDefault();
    });
    // Language toggle functionality
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('language') || 'my';
    
    // Language data
    const langData = {
        my: {
            homeTitle: "OdeX",
            heroHeading: "Manual မှ Digital သို့ — အသုံးပြုရလွယ်ကူ၊ စျေးနှုန်းသက်သာသော Odoo ERP ဖြင့်ပြောင်းလဲပါ။",
            heroMotto: "အဆင့်မြင့် နည်းပညာ၊ မဆုံးနိုင်သော အလားအလာများ",
            heroText: "Odoo ERP သည် လုပ်ငန်းဆောင်ရွက်မှုများကို တစ်နေရာတည်းမှ စုစည်းစီမံနိုင်သော စနစ်ဖြစ်ပြီး၊ ရောင်းအား၊ ဘဏ်စာရင်း၊ ဂိုဒေါင်စီမံခန့်ခွဲမှု၊ လူ့စွမ်းအင်စသည်တို့ကို အလွယ်တကူ ပေါင်းစည်းအသုံးပြုနိုင်ပါသည်။ လုပ်ငန်းစဉ်များကို ထိရောက်စွာ စနစ်တကျ ပြောင်းလဲစေပြီး အချိန်နှင့် ကုန်ကျစရိတ်ကို လျော့ချပေးပါသည်။",
            homeBtn1: "အခမဲ့ ဒီမို တောင်းဆိုရန်",
            homeBtn2: "အဓိကမော်ဂျူးများကြည့်ရန်",
            
            // Why Outto section
            whyOuttoTitle: "ဘာကြောင့် OdeX ကို ရွေးချယ်သင့်သနည်း?",
            whyOuttoFeature1: "သတင်းအချက်အလက် စီးပွားရေး ပေါင်းစပ်မှု",
            whyOuttoFeature1Text: "ကိုယ့်မှာရှိသမျှလုပ်ငန်းအားလုံးရဲ့ Process တွေကို တစ်ခုတည်းလိုပေါင်းလုပ်နိုင်တဲ့ စမတ် Platform တစ်ခုဖြစ်ပါတယ်။ အချိန်နှင့်တပြေးညီ အချက်အလက်တွေနဲ့ Insight တွေကိုလည်း တန်းကြည့်ပြီး မဟာဗျူဟာဆိုင်ရာ ဆုံးဖြတ်ချက်တွေ ပိုလွယ်လွယ်နဲ့ ချနိုင်လာမယ်။",
            whyOuttoFeature2: "ကမ္ဘာ့အဆင့် အသုံးပြုနိုင်မှု",
            whyOuttoFeature2Text: "ဖုန်းတစ်လုံးပါတဲ့နေရာတိုင်း လုပ်ငန်းကိစ္စတွေကိုလည်း သင့်နဲ့အတူလိုက်နေမှာ။ ဖုန်းနဲ့ပဲဖြစ်ဖြစ်၊ တက်ဘလက်ဖြစ်ဖြစ်၊ ကွန်ပျူတာဖြစ်ဖြစ် ဘယ် Device မှပဲဖြစ်စေ တစ်လက်စတည်း အသုံးပြုနိုင်လို့ ဘယ်နေရာမှာမဆို စီမံခန့်ခွဲတာအလွယ်တကူ ဖြစ်သွားမယ်။",
            whyOuttoFeature3: "အဆင့်မြင့်တိုးတက်မှု အင်ဂျင်",
            whyOuttoFeature3Text: "ဒေတာအခြေခံထားတဲ့ Insight တွေနဲ့ အလိုအလျောက် အလုပ်လုပ်စေနိုင်တဲ့ System တွေကြောင့် Productive တက်လာပြီး အသီးအသန့်အမြတ်ပိုရတဲ့အထိ လုပ်ငန်းတိုးတက်ဖို့ တကယ်အရှိန်မြှင့်ပေးနိုင်မယ့် Solution ပါ။",
            whyOuttoFeature4: "စိတ်ကြိုက် ပြုပြင်နိုင်သည်",
            whyOuttoFeature4Text: "သင့်လုပ်ငန်းရဲ့ လိုအပ်ချက်တိုင်းကိုစိတ်ကြိုက် Customize လုပ်နိုင်တယ်။ ကိုယ်လိုသလို လိုရင်တိုး ပိုရင်လျော့ ကြိုက်သလိုစီမံနိုင်တဲ့ အတွက် လုံးဝ Flexible ဖြစ်တဲ့ System တစ်ခုဖြစ်တယ်",
            
            // Comparison preview
            comparisonPreviewTitle: "ပုံမှန် POS နှင့် OdeX ERP နှိုင်းယှဉ်ချက်",
            comparisonPreviewText: "OdeX ကို ပုံမှန်သော POS စနစ်များနှင့် ခွဲခြားထားသော ပြောင်းလဲပေးသော အားသာချက်များကို ရှာဖွေပါ။",
            comparisonPreviewBtn: "နှိုင်းယှဉ်ချက်ကိုကြည့်ရန်",
            
            // Features preview
            featuresPreviewTitle: "အဓိကမော်ဂျူးများ",
            featuresPreviewSales: "ရောင်းအား",
            featuresPreviewInventory: "စာရင်း",
            featuresPreviewAccounting: "ဘဏ္ဍာရေး",
            featuresPreviewHR: "လူ့စွမ်းအင်",
            featuresPreviewPOS: "POS",
            featuresPreviewBtn: "အသေးစိတ်ကြည့်ရန်",
            
            // Footer
            footerAbout: "သင့်စီးပွားရေးလုပ်ငန်းကို တိုးတက်စေရန် အကောင်းဆုံး ဖြေရှင်းချက်",
            footerLinks: "Quick Links",
            footerHome: "ပင်မစာမျက်နှာ",
            footerAboutERP: "ERP အကြောင်း",
            footerComparison: "နှိုင်းယှဉ်ချက်",
            footerFeatures: "အဓိကမော်ဂျူးများ",
            footerContact: "ဆက်သွယ်ရန်",
            footerContactInfo: "ဆက်သွယ်ရန်",
            footerEmail: "odexerp@gmail.com",
            footerPhone: "09-754758505",
            footerCopyright: "© 2025 OdeX. All Rights Reserved.",
            
            // Navigation
            navHome: "ပင်မစာမျက်နှာ",
            navAbout: "ERP အကြောင်း",
            navComparison: "နှိုင်းယှဉ်ချက်",
            navFeatures: "အဓိကမော်ဂျူးများ",
            navContact: "ဆက်သွယ်ရန်",
            navServices: "အခြားဝန်ဆောင်မှုများ",
            langToggleText: "English Version",
            
            // Services section
            servicesTitle: "အခြားဝန်ဆောင်မှုများ",
            servicesSubtitle: "OdeX ERP Solutions မှထပ်မံရရှိနိုင်သော ဝန်ဆောင်မှုများ",
            service1Title: "Digital Assets များရောင်းဝယ်ရေး",
            service1Desc: "MLBB Diamonds, PUBG UC, Free Fire Diamonds, Honor of Kings Coupons, Steam Wallet, Blizzard Gift Cards, Telegram Premium, Telegram Stars စတဲ့ Digital Assets များကို စျေးနှုန်းသက်သာ စာရင်းပြုစုထားပြီး ချက်ချင်းဝယ်ယူနိုင်ပါသည်။",
            service2Title: "Web3 & Blockchain ပေါင်းစပ်လုပ်ဆောင်မှု",
            service2Desc: "Smart contract မိတ်ဆက်ခြင်း၊ NFT marketplace များ၊ Token gated community များနှင့် Web3 infrastructure အပြည့်အစုံကို သင့် platform နှင့်တစ်ပြေးညီ ချိတ်ဆက်ပေးပါသည်။",
            service3Title: "စျေးနှုန်းသက်သာသော ဝဘ်ဆိုဒ်နှင့် အက်ပ်ဖွံ့ဖြိုးမှု",
            service3Desc: "စီးပွားရေးလုပ်ငန်းများနှင့် စွန့်ဦးတီထွင်သူများအတွက် အရည်အသွေးမြင့်မားသော၊ အပြည့်အဝတုံ့ပြန်နိုင်သော ဝဘ်ဆိုဒ်များနှင့် မိုဘိုင်းအက်ပ်လီကေးရှင်းများကို အပြိုင်အဆိုင်နှင့် စျေးနှုန်းသက်သာဆုံးဖြင့် ဖွံ့ဖြိုးတည်ဆောက်ပေးခြင်း။",
            service3Badge: "အကြံပြုထားသည်",
            service3Feature1: "Standard မှ E-commerce အထိ",
            service3Feature2: "Mobile App Development",
            service3Feature3: "အကောင်းဆုံး စျေးနှုန်း",
            service3Price: "၃၅၀,၀၀၀ ကျပ် မှ",
            learnMore: "ပိုမိုလေ့လာရန်",
            web3HeroBadge: "On-chain product studio",
            web3HeroTitle: "Web3 & Blockchain integrations",
            web3HeroSubtitle: "NFT marketplace များ၊ Token gated community များ၊ Payment bridge များနှင့် On-chain analytics များကို သင့် platform နှင့်တစ်ပြေးညီ ချိတ်ဆက်ပေးပါသည်။ Smart contract၊ Gas optimization နှင့် Compliance အရ ပြည့်စုံအောင် ကျွန်ုပ်တို့၏ Web3 ပရော်ဖက်ရှင်နယ် အဖွဲ့က စီမံဆောင်ရွက်ပေးနေပါသည်။",
            web3HeroCTA: "ဆက်သွယ်ပြီး Proof-of-Concept စတင်ရန်",
            web3ServicesTitle: "Web3 ဝန်ဆောင်မှုအစုံ",
            web3ServicesSubtitle: "Strategy, tokenomics, smart contract development, UX, compliance မှ စတင်ပြီး mainnet အထိ production-ready အထိ ဝန်ဆောင်မှုများပေးပါသည်။",
            web3Service1Title: "Smart Contract & Token Launch",
            web3Service1Desc: "ERC-20 / BEP-20 / Solana Program များရေးသားခြင်း၊ Token vesting schedule များ တည်ဆောက်ခြင်းနှင့် multi-sig treasury ကာကွယ်မှုများ ထည့်သွင်းပေးခြင်း။",
            web3Service2Title: "NFT Marketplace & Collectibles",
            web3Service2Desc: "Primary/secondary sale mechanics, lazy minting, royalty payout logic နှင့် wallet onboarding UX များပါဝင်သော branded NFT experience များဆောင်ရွက်ပေးခြင်း။",
            web3Service3Title: "Web2 ↔ Web3 ပေါင်းစပ်ခြင်း",
            web3Service3Desc: "Existing ERP, eCommerce, CRM များနှင့် blockchain data များကို API / oracle များဖြင့် ကိုက်ညီသွားစေပြီး real-time syncing ကို ပြုလုပ်ပေးပါသည်။",
            web3Service4Title: "DAO & Community Tooling",
            web3Service4Desc: "Snapshot voting, gated Discord/Telegram integrations, on-chain reputation score များနှင့် incentive automation များ တည်ဆောက်ပေးခြင်း။",
            web3OutcomesTitle: "Web3 တွင်အားသာချက်များ",
            web3OutcomesSubtitle: "OdeX ERP Solutions မှ web3 integrations ၊ GameFi နှင့်သက်ဆိုင်သော အတွေ့အကြုံများအပေါ် အခြေခံထားပြီး မြန်မာလုပ်ငန်း/World Wide သင့်လျော်စေဖို့ ပြင်ဆင်ထားပါသည်။",
            web3Outcome1Title: "Market-ready Launch Kits",
            web3Outcome1Desc: "Branding, tokenomics, whitepaper support စတင်ကာ launch checklist များ၊ go-to-market automation များအထိ တစ်နေရာတည်းမှ ထုတ်ပေးပါသည်။",
            web3Outcome2Title: "Security & Compliance",
            web3Outcome2Desc: "Audit partners, threat modelling, L2 bridge risk mitigation နှင့် regulatory playbook များပါဝင်ပြီး enterprise readiness အထိ prepare လုပ်ပေးပါသည်။",
            web3Outcome3Title: "Real-time Analytics",
            web3Outcome3Desc: "Dune, Flipside, The Graph တို့နှင့် အလုပ်လုပ်သည့် custom dashboard များက အချက်အလက်မှန်ကန်မှု၊ KPI visibility ကို 24/7 ပံ့ပိုးပေးပါသည်။",
            web3ProcessTitle: "Engagement Process",
            web3ProcessSubtitle: "Workshop မှစတင်ပြီး production mainnet deploy အထိ စနစ်တကျ milestone များဖြင့် ဆောင်ရွက်ပေးပါသည်။",
            web3ProcessStep1Title: "Discovery & Architecture",
            web3ProcessStep1Desc: "Requirement workshop, token economy mapping, compliance review နှင့် high-level architecture diagrams ထုတ်ပေးခြင်း။",
            web3ProcessStep2Title: "Prototype & Validation",
            web3ProcessStep2Desc: "Low-code prototype, user testing, security threat modelling နှင့် stakeholder buy-in deck များ ပြင်ဆင်ပေးခြင်း။",
            web3ProcessStep3Title: "Build & Integrate",
            web3ProcessStep3Desc: "Smart contract implementation, frontend/back-office integration, chain monitoring setup နှင့် infrastructure automation။",
            web3ProcessStep4Title: "Launch & Growth",
            web3ProcessStep4Desc: "Audit handover, launch war-room, DAO/community ops playbook နှင့် post-launch analytics iteration များ ထောက်ပံ့ခြင်း။",
            web3CTATitle: "Ready to ship your Web3 experience?",
            web3CTASubtitle: "Token launch, NFT commerce သို့မဟုတ် blockchain payment rails အတွက် proof-of-concept တစ်ခုစတင်လိုက်ပါ။ Dedicated technical lead တစ်ဦး၊ product strategist တစ်ဦးနှင့် compliance advisor တစ်ဦးအပါအဝင် တစ်စုတစ်စည်းဖြင့် ပံ့ပိုးပေးပါမည်။",
            web3CTAPrimary: "Project briefing ပို့ရန်",
            web3CTASecondary: "Telegram တစ်ဆင့် ဆွေးနွေးလိုက်ပါ",
            web3ModalTitle: "Project War-room ကို စတင်လိုက်ပါ",
            web3ModalSubtitle: "24/7 ပံ့ပိုးမှုနဲ့ blockchain integration specialist များက proof-of-concept ထဲမှ mainnet launch အထိ ကူညီပေးပါမည်။",
            web3ModalActionCall: "ဖုန်းခေါ်ရန်",
            web3ModalActionChat: "Chat ဖွင့်ရန်",
            web3ModalActionMessenger: "Messenger ဖြင့် ဆက်သွယ်ရန်",
            web3ModalSupport: "24/7 support • NDA မခေါ်မီ architectural briefing သတ်မှတ်ပေးပါသည်",
            
            // Web Development Page
            webDevHeroBadge: "အကောင်းဆုံး စျေးနှုန်းနှင့် အရည်အသွေး",
            webDevHeroTitle: "သင့်စီးပွားရေးအတွက် ခေတ်မီသော ဝဘ်ဆိုဒ်နှင့် အက်ပ်များ",
            webDevHeroSubtitle: "ကျွန်ုပ်တို့သည် သင့်စီးပွားရေးလုပ်ငန်း၏ လိုအပ်ချက်များကို နားလည်ပြီး၊ ခေတ်မီသော နည်းပညာများဖြင့် ဝဘ်ဆိုဒ်နှင့် မိုဘိုင်းအက်ပ်များကို စျေးနှုန်းသက်သာစွာ ဖွံ့ဖြိုးတည်ဆောက်ပေးပါသည်။ Standard ဝဘ်ဆိုဒ်မှ E-commerce စနစ်အထိ၊ မိုဘိုင်းအက်ပ်များအထိ ကျယ်ပြန့်သော ဝန်ဆောင်မှုများ ပေးအပ်ပါသည်။",
            webDevHeroFeature1: "အရည်အသွေးမြင့် ဒီဇိုင်း",
            webDevHeroFeature2: "စျေးနှုန်းသက်သာ",
            webDevHeroFeature3: "အချိန်မီ ပေးအပ်",
            webDevServicesTitle: "ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုများ",
            webDevServicesSubtitle: "သင့်စီးပွားရေးလုပ်ငန်း၏ လိုအပ်ချက်များကို နားလည်ပြီး၊ သင့်တော်သော ဖြေရှင်းချက်များကို ပေးအပ်ပါသည်။ Standard ဝဘ်ဆိုဒ်မှ စတင်ကာ E-commerce စနစ်များ၊ မိုဘိုင်းအက်ပ်များအထိ ကျယ်ပြန့်သော ဝန်ဆောင်မှုများ ရရှိနိုင်ပါသည်။",
            standardWebTitle: "Standard ဝဘ်ဆိုဒ်",
            standardWebDesc: "သင့်စီးပွားရေးလုပ်ငန်းအတွက် ခေတ်မီသော၊ အသုံးပြုရလွယ်ကူသော ဝဘ်ဆိုဒ်ကို ဖွံ့ဖြိုးတည်ဆောက်ပေးပါသည်။ မိုဘိုင်း၊ တက်ဘလက်၊ ကွန်ပျူတာများတွင် ကောင်းစွာ အလုပ်လုပ်နိုင်သော responsive design ဖြင့် ဖွံ့ဖြိုးတည်ဆောက်ပါသည်။",
            standardWebFeature1: "မိုဘိုင်း၊ တက်ဘလက်၊ ကွန်ပျူတာများတွင် ကောင်းစွာ အလုပ်လုပ်နိုင်သော Responsive Design",
            standardWebFeature2: "ဖောက်သည်များနှင့် ဆက်သွယ်နိုင်သော Contact Form နှင့် Email Integration",
            standardWebFeature3: "Google နှင့် အခြား search engine များတွင် ကောင်းစွာ ရှာဖွေနိုင်သော SEO Optimization",
            standardWebFeature4: "မြန်ဆန်သော loading speed ဖြင့် ဖောက်သည်များ၏ အတွေ့အကြုံကို မြှင့်တင်ပေးခြင်း",
            standardWebFeature5: "အကြောင်းအရာများကို လွယ်ကူစွာ စီမံခန့်ခွဲနိုင်သော CMS System",
            standardWebPrice: "၃၅၀,၀၀၀ ကျပ် မှ",
            standardWebPriceNote: "သင့်လုပ်ငန်းလိုအပ်ချက်အပေါ် မူတည်ပါသည်",
            ecommerceWebTitle: "E-commerce ဝဘ်ဆိုဒ်",
            ecommerceWebBadge: "အကြံပြုထားသည်",
            ecommerceWebDesc: "သင့်ထုတ်ကုန်များကို online မှ ရောင်းချနိုင်သော ပြည့်စုံသော E-commerce စနစ်ကို ဖွံ့ဖြိုးတည်ဆောက်ပေးပါသည်။ ဖောက်သည်များ လွယ်ကူစွာ ဝယ်ယူနိုင်ပြီး၊ သင်လည်း လွယ်ကူစွာ စီမံခန့်ခွဲနိုင်ပါသည်။",
            ecommerceWebFeature1: "ထုတ်ကုန်များကို စနစ်တကျ စီမံခန့်ခွဲနိုင်သော Product Catalog System",
            ecommerceWebFeature2: "ဖောက်သည်များ လွယ်ကူစွာ ဝယ်ယူနိုင်သော Shopping Cart နှင့် Checkout System",
            ecommerceWebFeature3: "ဘဏ်ကတ်နှင့် mobile payment များဖြင့် ငွေပေးချေနိုင်သော Payment Gateway Integration",
            ecommerceWebFeature4: "အော်ဒါများကို အလိုအလျောက် စီမံခန့်ခွဲနိုင်သော Order Management System",
            ecommerceWebFeature5: "အော်ဒါများ၊ ရောင်းအားများကို စောင့်ကြည့်နိုင်သော Admin Dashboard",
            ecommerceWebFeature6: "ကုန်ပစ္စည်းများ၏ လက်ကျန်ကို အလိုအလျောက် စီမံခန့်ခွဲနိုင်သော Inventory System",
            ecommerceWebPrice: "၉၅၀,၀၀၀ ကျပ် မှ",
            ecommerceWebPriceNote: "ထုတ်ကုန်အရေအတွက်နှင့် လုပ်ဆောင်ချက်များအပေါ် မူတည်ပါသည်",
            mobileAppTitle: "မိုဘိုင်းအက်ပ်",
            mobileAppDesc: "သင့်စီးပွားရေးလုပ်ငန်းအတွက် iOS နှင့် Android နှစ်ခုလုံးတွင် အလုပ်လုပ်နိုင်သော မိုဘိုင်းအက်ပ်ကို ဖွံ့ဖြိုးတည်ဆောက်ပေးပါသည်။ ဖောက်သည်များ လွယ်ကူစွာ အသုံးပြုနိုင်သော interface ဖြင့် ဒီဇိုင်းထုတ်ပါသည်။",
            mobileAppFeature1: "iPhone (iOS) နှင့် Android ဖုန်းများတွင် အလုပ်လုပ်နိုင်သော Cross-platform Support",
            mobileAppFeature2: "Native performance နှင့် Cross-platform development နှစ်ခုလုံး ပံ့ပိုးပေးခြင်း",
            mobileAppFeature3: "ဖောက်သည်များ လွယ်ကူစွာ အသုံးပြုနိုင်သော User-friendly Interface Design",
            mobileAppFeature4: "ဖောက်သည်များထံ အချက်အလက်များ ပို့ဆောင်နိုင်သော Push Notification System",
            mobileAppFeature5: "App Store နှင့် Google Play Store တွင် ထုတ်ဝေနိုင်ရန် ကူညီပေးခြင်း",
            mobileAppPrice: "၃၅၀,၀၀၀ ကျပ် မှ",
            mobileAppPriceNote: "လုပ်ဆောင်ချက်များနှင့် platform အပေါ် မူတည်ပါသည်",
            sampleWebsitesTitle: "Our Portfolio",
            sampleWebsitesSubtitle: "ကျွန်ုပ်တို့ ဝန်ဆောင်မှုပေးနိုင်သော Website/App များ",
            sample1Title: "စားသောက်ဆိုင် ဝဘ်ဆိုဒ်",
            sample1Desc: "Online menu၊ စားပွဲကြိုတင်မှာယူမှု system နှင့် အစားအစာ order လုပ်နိုင်သော features များပါဝင်သော ခေတ်မီသော စားသောက်ဆိုင်ဝဘ်ဆိုဒ်။ ဓာတ်ပုံ gallery၊ တည်နေရာ map နှင့် ဖောက်သည်များ၏ review section များ ပါဝင်ပါသည်။",
            sample1Date: "ပြီးစီးခဲ့သော ရက်စွဲ: မတ် ၂၀၂၄",
            sample1Client: "ဖောက်သည်: ဒေသတွင်း စားသောက်ဆိုင်ကွင်းဆက်",
            sample2Title: "E-commerce Store",
            sample2Desc: "ထုတ်ကုန် ၅၀၀+ ပါဝင်သော ပြည့်စုံသော online store၊ payment gateway integration (KBZ Pay, Wave Pay)၊ အလိုအလျောက် inventory management နှင့် order tracking system များ ပါဝင်ပါသည်။",
            sample2Date: "ပြီးစီးခဲ့သော ရက်စွဲ: ဇန်နဝါရီ ၂၀၂၄",
            sample2Client: "ဖောက်သည်: Fashion ရောင်းချသူ",
            sample3Title: "Delivery Mobile App",
            sample3Desc: "iOS နှင့် Android အတွက် cross-platform delivery app။ Real-time order tracking၊ push notifications၊ in-app payment နှင့် driver management system များ ပါဝင်ပါသည်။",
            sample3Date: "ပြီးစီးခဲ့သော ရက်စွဲ: ဖေဖော်ဝါရီ ၂၀၂၄",
            sample3Client: "ဖောက်သည်: အစားအစာ Delivery Service",
            sample4Title: "Corporate Website",
            sample4Desc: "ကုမ္ပဏီ profile၊ services overview၊ team section၊ blog နှင့် contact forms များပါဝင်သော ပရော်ဖက်ရှင်နယ် corporate website။ Multi-language support (မြန်မာ & English) နှင့် SEO optimization ပါဝင်ပါသည်။",
            sample4Date: "ပြီးစီးခဲ့သော ရက်စွဲ: နိုဝင်ဘာ ၂၀၂၃",
            sample4Client: "ဖောက်သည်: ထုတ်လုပ်မှု ကုမ္ပဏီ",
            sample5Title: "Education Platform",
            sample5Desc: "Course management၊ student enrollment၊ video lessons၊ quizzes၊ certificates နှင့် payment integration များပါဝင်သော online learning platform။ Instructors အတွက် admin dashboard ပါဝင်ပါသည်။",
            sample5Date: "ပြီးစီးခဲ့သော ရက်စွဲ: ဧပြီ ၂၀၂၄",
            sample5Client: "ဖောက်သည်: Online Education Institute",
            sample6Title: "Healthcare Website",
            sample6Desc: "ဆရာဝန်များ၏ profile၊ appointment booking system၊ online consultation၊ patient portal နှင့် health blog များပါဝင်သော ဆေးခန်း website။ HIPAA compliance ဖြင့် လုံခြုံသော patient data management ပါဝင်ပါသည်။",
            sample6Date: "ပြီးစီးခဲ့သော ရက်စွဲ: မေ ၂၀၂၄",
            sample6Client: "ဖောက်သည်: ပုဂ္ဂလိက ဆေးခန်း",
            whyChooseUsTitle: "ဘာကြောင့် ကျွန်ုပ်တို့ကို ရွေးချယ်ရမလဲ?",
            why1Title: "စျေးနှုန်းသက်သာ",
            why1Desc: "မြန်မာနိုင်ငံရှိ စီးပွားရေးလုပ်ငန်းများအတွက် သင့်တော်သော စျေးနှုန်းဖြင့် အရည်အသွေးမြင့်မားသော ဝန်ဆောင်မှုများကို ပေးအပ်ပါသည်။ စျေးနှုန်းသည် လုပ်ငန်း၏ အရွယ်အစားနှင့် လိုအပ်ချက်များအပေါ် မူတည်ပါသည်။",
            why2Title: "အရည်အသွေးမြင့်",
            why2Desc: "ခေတ်မီသော နည်းပညာများနှင့် best practices များကို အသုံးပြုပြီး၊ အရည်အသွေးမြင့်မားသော ဝဘ်ဆိုဒ်နှင့် အက်ပ်များကို ဖွံ့ဖြိုးတည်ဆောက်ပေးပါသည်။ သင့်စီးပွားရေးလုပ်ငန်း၏ လိုအပ်ချက်များကို နားလည်ပြီး သင့်တော်သော ဖြေရှင်းချက်များကို ပေးအပ်ပါသည်။",
            why3Title: "မြန်ဆန်သော ဝန်ဆောင်မှု",
            why3Desc: "သင့်စီးပွားရေးလုပ်ငန်း၏ အချိန်ဇယားကို နားလည်ပြီး၊ သတ်မှတ်ထားသော အချိန်အတွင်း ဝဘ်ဆိုဒ် သို့မဟုတ် အက်ပ်ကို ပြီးစီးအောင် ပေးအပ်ပါသည်။ လုပ်ငန်းစဉ်များကို ထိရောက်စွာ စီမံခန့်ခွဲပြီး အချိန်မီ ပေးအပ်ပါသည်။",
            why4Title: "၂၄/၇ ပံ့ပိုးမှု",
            why4Desc: "ဝဘ်ဆိုဒ် သို့မဟုတ် အက်ပ် ဖွံ့ဖြိုးတည်ဆောက်ပြီးနောက်၊ အဆက်မပြတ် ပံ့ပိုးမှုပေးပါသည်။ ပြဿနာများ ပေါ်ပေါက်လာပါက ချက်ချင်း ဖြေရှင်းပေးပြီး၊ လိုအပ်ပါက update များကိုလည်း ပေးအပ်ပါသည်။",
            ctaTitle: "သင့်စီးပွားရေးအတွက် ဝဘ်ဆိုဒ် သို့မဟုတ် အက်ပ်ကို စတင်လိုပါသလား?",
            ctaSubtitle: "ယနေ့ပဲ ကျွန်ုပ်တို့နှင့် ဆက်သွယ်ပြီး အခမဲ့အကြံဉာဏ်တောင်းဆိုပါ။ သင့်စီးပွားရေးလုပ်ငန်း၏ လိုအပ်ချက်များကို နားလည်ပြီး၊ သင့်တော်သော ဖြေရှင်းချက်ကို ပေးအပ်ပါမည်။",
            ctaButton: "ဆက်သွယ်ရန်",
            ctaButton2: "ပိုမိုလေ့လာရန်",
            footerDesc: "မြန်မာနိုင်ငံအတွက် အကောင်းဆုံး ERP နှင့် POS ဝန်ဆောင်မှုများ",
            footerContact: "ဆက်သွယ်ရန်",
            footerLinks: "လင့်ခ်များ",
            
            // Chatbot
            chatbotTitle: "OdeX Support",
            chatbotStatus: "Online",
            chatbotWelcome: "မင်္ဂလာပါ! ယနေ့ ကျွန်ုပ်တို့ ဘယ်လို ကူညီပေးနိုင်မလဲ?",
            chatbotPlaceholder: "မက်ဆေ့ခ်ျရိုက်ထည့်ပါ...",
            
            // About page
            aboutTitle: "OdeX အကြောင်း | OdeX",
            aboutHeroTitle: "OdeX ဆိုသည်မှာ ဘာလဲ?",
            aboutHeroText: "OdeX သည် သင့်စီးပွားရေးလုပ်ငန်း၏ အားလုံးကို စီမံခန့်ခွဲပေးနိုင်သော စွမ်းရည်ပြည့်ဝသော ဆော့ဖ်ဝဲလ်ဖြစ်ပါသည်။",
            whatIsOuttoTitle: "OdeX ဆိုတာဘာလဲ?",
            whatIsOuttoText: "OdeX (Enterprise Resource Planning) ဆိုတာ မိတ်ဆွေတို့လုပ်ငန်းအတွက် အရာရာကို တစ်နေရာတည်းမှာ စုစည်းပြီး စီမံခန့်ခွဲနိုင်တဲ့ Platform ပါ။ ထုတ်လုပ်ရေး၊ အရောင်း၊ Inventory စီမံခန့်ခွဲမှု၊ Accounting စနစ်တွေတည်ဆောက်တာမှစပြီး လူ့စွမ်းအား (HR) အထိ — အားလုံးကို တစ်စုတစ်စည်းတည်းနဲ့ ထိန်းချုပ်နိုင်လို့ အလုပ်ခွဲစရာမရှိတော့ဘူး။",
            outtoBenefitsTitle: "OdeX ၏ အဓိက အားသာချက်များ",
            benefitsSectionTitle: "OdeX ကို အသုံးပြုခြင်းဖြင့် ရရှိသော အကျိုးကျေးဇူးများ",
            benefit1Title: "ထုတ်လုပ်မှု တိုးတက်မှု",
            benefit1Text: "Manual လုပ်နေရတာတွေ Auto အလုပ်လုပ်အောင် ပြောင်းလိုက်ရင် အလုပ်လည်း မြန်လာ Productivity လည်း သက်သက်သာသာ တက်လာမယ်။",
            benefit2Title: "စရိတ် ခြွေတာမှု",
            benefit2Text: "လုပ်ငန်းစဉ်များကို တစ်နေရာတွင် စီမံခန့်ခွဲခြင်းဖြင့် စီမံခန့်ခွဲမှု စရိတ်ကို လျှော့ချပေးပါသည်။",
            benefit3Title: "အချက်အလက်များ ဆက်သွယ်မှု",
            benefit3Text: "အချက်အလက်များသည် မော်ဂျူးအားလုံးတွင် တစ်နေရာတွင် စုစည်းထားသောကြောင့် ဆုံးဖြတ်ချက်များ ပိုမြန်ဆိုနိုင်ပါသည်။",
            benefit4Title: "မိုဘိုင်းလ် အဆင်ပြေမှု",
            benefit4Text: "မည်သည့် ကိရိယာမဆို အသုံးပြုနိုင်ပါသည်။ စမတ်ဖုန်း၊ တက်ဘလက် သို့မဟုတ် ကွန်ပျူတာတွင် အလုပ်လုပ်ပါမည်။",
            aboutCtaText: "OdeX သည် သင့်လုပ်ငန်း၏ လိုအပ်ချက်များကို ဖြေရှင်းပေးနိုင်ပါမည်။",
            
            // Comparison page
            comparisonTitle: "နှိုင်းယှဉ်ချက် | OdeX",
            comparisonHeroTitle: "ပုံမှန် POS နှင့် OdeX ERP နှိုင်းယှဉ်ချက်",
            comparisonHeroText: " OdeX ERP သည် ပုံမှန် POS စနစ်များနှင့် မည်သို့ကွာခြားသည်ကို လေ့လာနိုင်ပါသည်",
            
            // Comparison table headers
            comparisonFeature: "အဓိက အင်္ဂါရပ်များ",
            traditionalPOS: "ပုံမှန် POS",
            outtoPOS: "OdeX ERP",
            
            // Comparison table features
            comparisonFeature1: "အချက်အလက် စီမံခန့်ခွဲမှု",
            traditionalPOSDataManagement: "ခက်ခဲသည်",
            outtoPOSDataManagement: "ပြည့်စုံသည်",
            
            comparisonFeature2: "အစီရင်ခံစာများ",
            traditionalPOSReports: "ကန့်သတ်သည်",
            outtoPOSReports: "အသေးစိတ်",
            
            comparisonFeature3: "စာရင်း စီမံခန့်ခွဲမှု",
            traditionalPOSInventory: "အခက်အခဲရှိသည်",
            outtoPOSInventory: "အလိုအလျောက်",
            
            comparisonFeature4: "စီးပွားရေးဆုံးဖြတ်ချက်များ",
            traditionalPOSBusinessDecisions: "ကန့်သတ်သည်",
            outtoPOSBusinessDecisions: "အသေးစိတ်",
            
            comparisonFeature5: "မိုဘိုင်းလ် အဆင်ပြေမှု",
            traditionalPOSMobile: "ကန့်သတ်သည်",
            outtoPOSMobile: "ပြည့်စုံသည်",
            
            comparisonFeature6: "စိတ်ကြိုက် ပြုပြင်နိုင်မှု",
            traditionalPOSCustomization: "ကန့်သတ်သည်",
            outtoPOSCustomization: "ပြည့်စုံသည်",
            
            comparisonFeature7: "လုပ်ငန်းစဉ် ဆက်သွယ်မှု",
            traditionalPOSIntegration: "နည်းပါးသည်",
            outtoPOSIntegration: "ပြည့်စုံသည်",
            
            comparisonFeature8: "စျေးနှုန်း",
            traditionalPOSCost: "နိမ့်ပါးသည်",
            outtoPOSCost: "နိမ့်ပါးသည်",
            
            comparisonFeature9: "အချက်အလက်လုံခြုံရေး",
            traditionalPOSSecurity: "အခြေခံ (Basic)",
            outtoPOSSecurity: "အဆင့်မြင့် (SSL, Encryption)",
            
            comparisonFeature10: "အမှားအယွင်းများ လျှော့ချမှု",
            traditionalPOSAccuracy: "၈၅% တိကျမှု",
            outtoPOSAccuracy: "၉၈% တိကျမှု",
            
            comparisonFeature11: "အချိန်ချွေတာမှု",
            traditionalPOSTimeSaving: "၃၀% ချွေတာ",
            outtoPOSTimeSaving: "၇၀% ချွေတာ",
            
            comparisonFeature12: "ဖောက်သည်ဆက်ဆံရေး",
            traditionalPOSCustomerService: "ကန့်သတ်",
            outtoPOSCustomerService: "ပြည့်စုံ (CRM ပါဝင်)",
            
            // Comparison CTA
            outtoPOSHeading: "OdeX ERP",
            comparisonCtaText: "OdeX ERP သည် သင့်လုပ်ငန့်၏ လိုအပ်ချက်များကို ပိုကောင်းစွာ ဖြေရှင်းပေးပါမည်။",
            
            // Features page
            featuresTitle: "အဓိကမော်ဂျူးများ | OdeX",
            featuresHeroTitle: "OdeX အဓိကမော်ဂျူးများ",
            featuresHeroText: "OdeX သည် သင့်စီးပွားရေးလုပ်ငန်း၏ လိုအပ်ချက်များကို ဖြေရှင်းပေးနိုင်သော မော်ဂျူးများစွာကို ပိုင်ဆိုင်ထားပါသည်။",
            feature1Title: "ရောင်းအား စီမံခန့်ခွဲမှု (Sales)",
            feature1Text: "ရောင်းအားလုပ်ငန်းစဉ်အားလုံးကို စီမံခန့်ခွဲပေးပါသည်။ ဖောက်သည်များ၊ ကိုက်ညီမှုများ၊ အရောင်းမှာယူမှုများ၊ ပို့ပို့ခများ စသည်တို့ကို စီမံပါသည်။",
            feature2Title: "စာရင်း စီမံခန့်ခွဲမှု (Inventory)",
            feature2Text: "ပစ္စည်းများ၊ ပေးသွင်းမှုများ၊ ထုတ်ယူမှုများကို စီမံခန့်ခွဲပေးပါသည်။ စာရင်းအခြေအနေကို အချိန်နှင့်တပြေးညီ ကြည့်ရှုနိုင်ပါသည်။",
            feature3Title: "ဘဏ္ဍာရေး စီမံခန့်ခွဲမှု (Accounting)",
            feature3Text: "ငွေရေးကြေးရေးလးလုပ်ငန်းစဉ်များကို စီမံပေးပါသည်။ အဝင်၊ အထွက်၊ ငွေကြေးပြောင်းလဲမှုများကို စီမံပါသည်။",
            feature4Title: "လူ့စွမ်းအင် စီမံခန့်ခွဲမှု (HR)",
            feature4Text: "၀န်ထမ်းများ၊ လစာများ၊ အလုပ်အကိုင်များ၊ နာမည်စာရင်းများကို စီမံပေးပါသည်။",
            feature5Title: "POS စနစ်",
            feature5Text: "အရောင်းစနစ်ကို စီမံပေးပါသည်။ ငွေပေးချေမှုများ၊ ပြန်အမ်းမှုများ၊ ကဒ်ပေးမှုများကို စီမံပါသည်။",
            feature6Title: "အစီရင်ခံစာများ",
            feature6Text: "စီးပွားရေးဆုံးဖြတ်ချက်များ ချရန် ကူညီပေးသော အစီရင်ခံစာများကို ထုတ်ပေးပါသည်။",
            
            // Integration section
            integrationTitle: "မော်ဂျူးများ ဆက်သွယ်မှု",
            integrationText: "OdeX ၏ မော်ဂျူးများသည် တစ်ခုနှင့်တစ်ခု ဆက်သွယ်နိုင်ပါသည်။ ထုတ်လုပ်မှုမှ ရောင်းအားအထိ အချက်အလက်များသည် တစ်နေရာတွင် စုစည်းထားသောကြောင့် ဆုံးဖြတ်ချက်များ ပိုမြန်ဆိုနိုင်ပါသည်။",
            manufacturingModule: "ထုတ်လုပ်မှု",
            inventoryModule: "စာရင်း",
            salesModule: "ရောင်းအား",
            hrModule: "လူ့စွမ်းအင်",
            accountingModule: "ဘဏ္ဍာရေး",
            posModule: "POS",
            integrationCenter: "OdeX",
            
            // Features CTA
            featuresCtaText: "OdeX သည် သင့်လုပ်ငန်း၏ လိုအပ်ချက်များကို ဖြေရှင်းပေးနိုင်ပါမည်။",
            
            // Contact page
            contactTitle: "ဆက်သွယ်ရန် | OdeX",
            contactHeroTitle: "ဆက်သွယ်ရန်",
            contactHeroText: "OdeX ကို သင့်စီးပွားရေးအတွက် မည်သို့ အသုံးပြုနိုင်သည်ကို အခမဲ့ ဒီမိုပြသခြင်း တောင်းဆိုပါ။",
            contactFormTitle: "ဒီမို တောင်းဆိုခြင်း သို့မဟုတ် ဆက်သွယ်ရန်",
            nameLabel: "အမည်",
            companyLabel: "ကုမ္ပဏီအမည်",
            emailLabel: "အီးမေးလ်",
            phoneLabel: "ဖုန်းနံပါတ်",
            messageLabel: "မက်ဆေ့ခ်ျ",
            sendButton: "ပေးပို့ရန်",
            contactInfoTitle: "ကျွန်ုပ်တို့နှင့် ဆက်သွယ်ရန်",
            addressTitle: "လိပ်စာ",
            addressText: "ရန်ကုန်၊ မြန်မာ",
            phoneTitle: "ဖုန်းနံပါတ်",
            phone1: "09-754758505",
            phone2: "09-952177102",
            emailTitle: "အီးမေးလ်",
            contactEmail1: "odexerp@gmail.com",
            contactEmail2: "odexerp@gmail.com",
            
            // Language toggle
            langToggleText: "English Version",
            
            // Industry Solutions Section
            industrySolutionsTitle: "လုပ်ငန်းအမျိုးအစားအလိုက် ဖြေရှင်းချက်များ",
            industrySolutionsText: "OdeX သည် မတူညီသော လုပ်ငန်းများအတွက် စိတ်ကြိုက်ပြုပြင်ထားသော ဖြေရှင်းချက်များကို ပေးဆောင်ပါသည်။",
            industryManufacturing: "ထုတ်လုပ်မှု",
            industryManufacturingText: "ထုတ်လုပ်မှုလုပ်ငန်းများအတွက် အထူးပြုလုပ်ထားသော စီမံခန့်ခွဲမှုစနစ်",
            industryRetail: "အရောင်းအဝယ်",
            industryRetailText: "အရောင်းအဝယ်လုပ်ငန်းများအတွက် စာရင်းနှင့် POS စနစ်",
            industryLogistics: "ပို့ဆောင်ရေး",
            industryLogisticsText: "ပို့ဆောင်ရေးလုပ်ငန်းများအတွက် လမ်းကြောင်းစီမံခန့်ခွဲမှု",
            industryHealthcare: "ကျန်းမာရေး",
            industryHealthcareText: "ဆေးရုံများနှင့် ကျန်းမာရေးစင်တာများအတွက် စီမံခန့်ခွဲမှု",
            industryEducation: "ပညာရေး",
            industryEducationText: "ကျောင်းများနှင့် တက္ကသိုလ်များအတွက် ပညာရေးစီမံခန့်ခွဲမှု",
            industryGovernment: "အစိုးရ",
            industryGovernmentText: "အစိုးရဌာနများအတွက် စီမံခန့်ခွဲမှုနှင့် အစီရင်ခံစာစနစ်",
            
            // Security & Compliance Section
            securityComplianceTitle: "လုံခြုံရေးနှင့် စံချိန်များ",
            securityComplianceText: "OdeX သည် သင့်အချက်အလက်များကို အမြင့်ဆုံး လုံခြုံရေးစံချိန်များဖြင့် ကာကွယ်ပေးပါသည်။",
            securityDataSecurity: "အချက်အလက် လုံခြုံရေး",
            securityDataSecurityText: "SSL encryption နှင့် advanced security protocols များဖြင့် သင့်အချက်အလက်များကို ကာကွယ်ပေးပါသည်။",
            securityDataStorage: "အချက်အလက် သိမ်းဆည်းမှု",
            securityDataStorageText: "အချက်အလက်များကို လုံခြုံသော cloud servers များတွင် သိမ်းဆည်းပြီး နေ့စဉ် backup ပြုလုပ်ပေးပါသည်။",
            securityUserManagement: "အသုံးပြုသူ စီမံခန့်ခွဲမှု",
            securityUserManagementText: "Role-based access control နှင့် user permissions များဖြင့် သင့်အချက်အလက်များကို လုံခြုံစွာ စီမံခန့်ခွဲပါသည်။",
            securityStandardsCompliance: "စံချိန်များ လိုက်နာမှု",
            securityStandardsComplianceText: "ISO 27001, GDPR နှင့် အခြားသော နိုင်ငံတကာ လုံခြုံရေးစံချိန်များကို လိုက်နာပါသည်။",
            securityISO27001: "ISO 27001 Certified",
            securityGDPR: "GDPR Compliant",
            securityUptime: "99.9% Uptime SLA"
        },
        en: {
            homeTitle: "OdeX",
            heroHeading: "From Manual to Digital — switch with easy‑to‑use, affordable Odoo ERP",
            heroMotto: "Advanced Technology, Infinite Possibilities",
            heroText: "Odoo ERP centralizes your operations in one place — seamlessly integrating sales, accounting, inventory, and HR. It streamlines processes, improves efficiency, and reduces both time and operating costs.",
            homeBtn1: "Request Free Demo",
            homeBtn2: "View Key Modules",
            
            // Why Outto section
            whyOuttoTitle: "Why Choose OdeX?",
            whyOuttoFeature1: "Unified Business Intelligence",
            whyOuttoFeature1Text: "Integrate all business processes into a single, intelligent platform. Access real-time data and insights that drive strategic decision-making.",
            whyOuttoFeature2: "Universal Accessibility",
            whyOuttoFeature2Text: "Seamless experience across all devices - smartphones, tablets, and desktops. Your business management goes wherever you go.",
            whyOuttoFeature3: "Exponential Growth Engine",
            whyOuttoFeature3Text: "Accelerate business growth with data-driven insights and automated processes that enhance productivity and profitability.",
            whyOuttoFeature4: "Customizable",
            whyOuttoFeature4Text: "Customize according to your business needs. Expand as you need.",
            
            // Comparison preview
            comparisonPreviewTitle: "Traditional POS vs OdeX ERP Comparison",
            comparisonPreviewText: "Discover the transformative advantages that set OdeX apart from conventional POS systems.",
            comparisonPreviewBtn: "View Comparison",
            
            // Features preview
            featuresPreviewTitle: "Key Modules",
            featuresPreviewSales: "Sales",
            featuresPreviewInventory: "Inventory",
            featuresPreviewAccounting: "Accounting",
            featuresPreviewHR: "Human Resources",
            featuresPreviewPOS: "POS",
            featuresPreviewBtn: "View Details",
            
            // Footer
            footerAbout: "The best solution to boost your business",
            footerLinks: "Quick Links",
            footerHome: "Home",
            footerAboutERP: "About ERP",
            footerComparison: "Comparison",
            footerFeatures: "Key Modules",
            footerContact: "Contact",
            footerContactInfo: "Contact Info",
            footerEmail: "odexerp@gmail.com",
            footerPhone: "09-754758505",
            footerCopyright: "© 2025 OdeX. All Rights Reserved.",
            
            // Navigation
            navHome: "Home",
            navAbout: "About ERP",
            navComparison: "Comparison",
            navFeatures: "Key Modules",
            navContact: "Contact",
            navServices: "Services",
            langToggleText: "Myanmar Version",
            
            // Services section
            servicesTitle: "Our Services",
            servicesSubtitle: "Expanded solutions from OdeX ERP Solutions to enhance your operations",
            service1Title: "Digital Assets Marketplace",
            service1Desc: "Affordable top-ups for MLBB Diamonds, PUBG UC, Free Fire Diamonds, Honor of Kings, Steam Wallet, Blizzard Gift Cards, Telegram Premium, Telegram Stars and more — delivered instantly with local MMK pricing.",
            service2Title: "Web3 & Blockchain Integration",
            service2Desc: "Smart contract deployment, NFT marketplaces, token-gated experiences, and blockchain infrastructure integrations tailored to your product roadmap.",
            service3Title: "Affordable Web and App Development",
            service3Desc: "Developing high-quality, fully responsive websites and mobile applications for businesses and entrepreneurs at the most competitive and affordable prices possible.",
            service3Badge: "Recommended",
            service3Feature1: "Standard to E-commerce",
            service3Feature2: "Mobile App Development",
            service3Feature3: "Best Price",
            service3Price: "From 350,000 MMK",
            learnMore: "Learn More",
            web3HeroBadge: "On-chain product studio",
            web3HeroTitle: "Web3 & Blockchain integrations",
            web3HeroSubtitle: "Launch NFT marketplaces, token-gated communities, payment bridges, and on-chain analytics that sync seamlessly with your existing platforms. Our Web3 engineers handle smart contract hardening, gas optimization, and compliance guardrails from day one.",
            web3HeroCTA: "Start a Proof-of-Concept",
            web3ServicesTitle: "Comprehensive Web3 Services",
            web3ServicesSubtitle: "Strategy, tokenomics, smart contract engineering, UX and compliance — all the way through production readiness and mainnet support.",
            web3Service1Title: "Smart Contract & Token Launch",
            web3Service1Desc: "Design and deploy ERC-20 / BEP-20 / Solana programs, configure vesting mechanics, and secure treasuries with multi-sig workflows.",
            web3Service2Title: "NFT Marketplace & Collectibles",
            web3Service2Desc: "Custom branded primary and secondary marketplaces with lazy minting, royalty engines, and wallet onboarding built for mainstream users.",
            web3Service3Title: "Web2 ↔ Web3 Integration",
            web3Service3Desc: "Bridge your ERP, eCommerce, or CRM stack with blockchain data using APIs, oracles, and real-time event listeners.",
            web3Service4Title: "DAO & Community Tooling",
            web3Service4Desc: "Snapshot voting, gated chats, reputation scoring, and incentive automation to activate your community sustainably.",
            web3OutcomesTitle: "Web3 Advantages",
            web3OutcomesSubtitle: "Playbooks refined from OdeX ERP Solutions' Web3 integrations and GameFi engagements—tailored for Myanmar operators and global teams alike.",
            web3Outcome1Title: "Market-ready Launch Kits",
            web3Outcome1Desc: "Branding assets, tokenomics blueprints, launch checklists, and automated go-to-market tooling delivered as one package.",
            web3Outcome2Title: "Security & Compliance",
            web3Outcome2Desc: "Audit partnerships, threat modelling, bridge risk mitigation, and regulatory playbooks to align with enterprise expectations.",
            web3Outcome3Title: "Real-time Analytics",
            web3Outcome3Desc: "Custom dashboards powered by Dune, Flipside, or The Graph to monitor KPIs, retention, and treasury flows in real time.",
            web3ProcessTitle: "Engagement Process",
            web3ProcessSubtitle: "Milestone-based delivery from discovery workshop to mainnet launch and ongoing optimization.",
            web3ProcessStep1Title: "Discovery & Architecture",
            web3ProcessStep1Desc: "Requirements workshop, token economy mapping, compliance reviews, and high-level architecture diagrams.",
            web3ProcessStep2Title: "Prototype & Validation",
            web3ProcessStep2Desc: "Low-code prototypes, user testing, security threat modelling, and stakeholder buy-in materials.",
            web3ProcessStep3Title: "Build & Integrate",
            web3ProcessStep3Desc: "Smart contract development, frontend/back-office integration, chain monitoring, and infrastructure automation.",
            web3ProcessStep4Title: "Launch & Growth",
            web3ProcessStep4Desc: "Audit handover, launch war-room support, DAO/community operations, and analytics-driven iteration.",
            web3CTATitle: "Ready to ship your Web3 experience?",
            web3CTASubtitle: "Kick off a proof-of-concept for token launches, NFT commerce, or blockchain payment rails with a battle-tested cross-functional squad.",
            web3CTAPrimary: "Submit project brief",
            web3CTASecondary: "Chat with us on Telegram",
            web3ModalTitle: "Spin up your project war-room",
            web3ModalSubtitle: "Our blockchain specialists support you from concept validation to mainnet rollout with 24/7 coverage.",
            web3ModalActionCall: "Call now",
            web3ModalActionChat: "Open chat",
            web3ModalActionMessenger: "Message on Messenger",
            web3ModalSupport: "24/7 support • Schedule an architecture briefing before NDA",
            
            // Web Development Page
            webDevHeroBadge: "Best Price & Quality",
            webDevHeroTitle: "Professional Web & App Development Services",
            webDevHeroSubtitle: "Transform your business with custom websites and mobile applications. We deliver high-quality, responsive solutions from standard websites to full e-commerce platforms and mobile apps at competitive prices.",
            webDevHeroFeature1: "Professional Design",
            webDevHeroFeature2: "Competitive Pricing",
            webDevHeroFeature3: "Timely Delivery",
            webDevServicesTitle: "Our Services",
            webDevServicesSubtitle: "We understand your business needs and provide appropriate solutions. From Standard websites to E-commerce systems and mobile apps, comprehensive services are available.",
            standardWebTitle: "Standard Website",
            standardWebDesc: "We develop modern, easy-to-use websites for your business. Built with responsive design that works well on mobile, tablet, and desktop devices.",
            standardWebFeature1: "Responsive Design that works well on Mobile, Tablet, and Desktop devices",
            standardWebFeature2: "Contact Form and Email Integration to connect with customers",
            standardWebFeature3: "SEO Optimization for better search results on Google and other search engines",
            standardWebFeature4: "Fast loading speed to enhance customer experience",
            standardWebFeature5: "CMS System for easy content management",
            standardWebPrice: "From 350,000 MMK",
            standardWebPriceNote: "Depends on your business requirements",
            ecommerceWebTitle: "E-commerce Website",
            ecommerceWebBadge: "Recommended",
            ecommerceWebDesc: "We develop a complete E-commerce system that allows you to sell your products online. Customers can easily purchase, and you can easily manage your business.",
            ecommerceWebFeature1: "Product Catalog System for organized product management",
            ecommerceWebFeature2: "Shopping Cart and Checkout System for easy customer purchases",
            ecommerceWebFeature3: "Payment Gateway Integration with bank cards and mobile payments",
            ecommerceWebFeature4: "Order Management System for automatic order management",
            ecommerceWebFeature5: "Admin Dashboard to monitor orders and sales",
            ecommerceWebFeature6: "Inventory System for automatic stock management",
            ecommerceWebPrice: "From 950,000 MMK",
            ecommerceWebPriceNote: "Depends on number of products and features",
            mobileAppTitle: "Mobile App",
            mobileAppDesc: "We develop mobile apps for your business that work on both iOS and Android. Designed with an interface that customers can easily use.",
            mobileAppFeature1: "Cross-platform Support for iPhone (iOS) and Android phones",
            mobileAppFeature2: "Support for both Native performance and Cross-platform development",
            mobileAppFeature3: "User-friendly Interface Design for easy customer use",
            mobileAppFeature4: "Push Notification System to send information to customers",
            mobileAppFeature5: "Assistance for publishing on App Store and Google Play Store",
            mobileAppPrice: "From 350,000 MMK",
            mobileAppPriceNote: "Depends on features and platform",
            sampleWebsitesTitle: "Our Portfolio",
            sampleWebsitesSubtitle: "Website/App Services We Offer",
            sample1Title: "Restaurant Website",
            sample1Desc: "Modern restaurant website with online menu, table reservation system, and food ordering features. Includes photo gallery, location map, and customer reviews section.",
            sample1Date: "Completed: March 2024",
            sample1Client: "Client: Local Restaurant Chain",
            sample2Title: "E-commerce Store",
            sample2Desc: "Full-featured online store with 500+ products, integrated payment gateway (KBZ Pay, Wave Pay), automated inventory management, and order tracking system.",
            sample2Date: "Completed: January 2024",
            sample2Client: "Client: Fashion Retailer",
            sample3Title: "Delivery Mobile App",
            sample3Desc: "Cross-platform delivery app for iOS and Android. Features include real-time order tracking, push notifications, in-app payment, and driver management system.",
            sample3Date: "Completed: February 2024",
            sample3Client: "Client: Food Delivery Service",
            sample4Title: "Corporate Website",
            sample4Desc: "Professional corporate website with company profile, services overview, team section, blog, and contact forms. Multi-language support (Myanmar & English) with SEO optimization.",
            sample4Date: "Completed: November 2023",
            sample4Client: "Client: Manufacturing Company",
            sample5Title: "Education Platform",
            sample5Desc: "Online learning platform with course management, student enrollment, video lessons, quizzes, certificates, and payment integration. Includes admin dashboard for instructors.",
            sample5Date: "Completed: April 2024",
            sample5Client: "Client: Online Education Institute",
            sample6Title: "Healthcare Website",
            sample6Desc: "Medical clinic website with doctor profiles, appointment booking system, online consultation, patient portal, and health blog. Secure patient data management with HIPAA compliance.",
            sample6Date: "Completed: May 2024",
            sample6Client: "Client: Private Medical Clinic",
            whyChooseUsTitle: "Why Choose Us?",
            why1Title: "Affordable Prices",
            why1Desc: "We provide high-quality services at appropriate prices for businesses in Myanmar. Price depends on business size and requirements.",
            why2Title: "High Quality",
            why2Desc: "We use modern technologies and best practices to develop high-quality websites and apps. We understand your business needs and provide appropriate solutions.",
            why3Title: "Fast Service",
            why3Desc: "We understand your business timeline and deliver the website or app within the specified time. We manage processes efficiently and deliver on time.",
            why4Title: "24/7 Support",
            why4Desc: "After developing the website or app, we provide continuous support. If problems arise, we solve them immediately and provide updates when needed.",
            ctaTitle: "Want to start your website or app for your business?",
            ctaSubtitle: "Contact us today and request a free consultation. We will understand your business needs and provide an appropriate solution.",
            ctaButton: "Contact Us",
            ctaButton2: "Learn More",
            footerDesc: "Best ERP and POS services for Myanmar",
            footerContact: "Contact",
            footerLinks: "Links",
            
            // Chatbot
            chatbotTitle: "OdeX Support",
            chatbotStatus: "Online",
            chatbotWelcome: "Hello! How can I help you today?",
            chatbotPlaceholder: "Type your message...",
            
            // About page
            aboutTitle: "About OdeX",
            aboutHeroTitle: "What is OdeX?",
            aboutHeroText: "OdeX is a comprehensive software that can manage all aspects of your business.",
            whatIsOuttoTitle: "Understanding OdeX",
            whatIsOuttoText: "OdeX (Enterprise Resource Planning) is a platform that can manage all aspects of your business. It can manage processes such as manufacturing, sales, inventory, accounting, and human resources all in one place.",
            outtoBenefitsTitle: "Key Benefits of OdeX",
            benefitsSectionTitle: "Benefits of Using OdeX",
            benefit1Title: "Increased Productivity",
            benefit1Text: "Automating processes helps increase productivity.",
            benefit2Title: "Cost Reduction",
            benefit2Text: "Managing processes in one place reduces management costs.",
            benefit3Title: "Connected Data",
            benefit3Text: "Since data is centralized across all modules, decisions can be made faster.",
            benefit4Title: "Mobile Friendly",
            benefit4Text: "Works on any device. Smartphone, tablet, or computer.",
            aboutCtaText: "OdeX can solve your business needs.",
            
            // Comparison page
            comparisonTitle: "Comparison | OdeX",
            comparisonHeroTitle: "Traditional POS vs OdeX ERP Comparison",
            comparisonHeroText: "See how OdeX ERP surpasses traditional POS systems.",
            
            // Comparison table headers
            comparisonFeature: "Key Features",
            traditionalPOS: "Traditional POS",
            outtoPOS: "OdeX ERP",
            
            // Comparison table features
            comparisonFeature1: "Data Management",
            traditionalPOSDataManagement: "Difficult",
            outtoPOSDataManagement: "Complete",
            
            comparisonFeature2: "Reports",
            traditionalPOSReports: "Limited",
            outtoPOSReports: "Detailed",
            
            comparisonFeature3: "Inventory Management",
            traditionalPOSInventory: "Difficult",
            outtoPOSInventory: "Automated",
            
            comparisonFeature4: "Business Decisions",
            traditionalPOSBusinessDecisions: "Limited",
            outtoPOSBusinessDecisions: "Detailed",
            
            comparisonFeature5: "Mobile Friendly",
            traditionalPOSMobile: "Limited",
            outtoPOSMobile: "Complete",
            
            comparisonFeature6: "Customization",
            traditionalPOSCustomization: "Limited",
            outtoPOSCustomization: "Complete",
            
            comparisonFeature7: "Process Integration",
            traditionalPOSIntegration: "Limited",
            outtoPOSIntegration: "Complete",
            
            comparisonFeature8: "Cost",
            traditionalPOSCost: "Low",
            outtoPOSCost: "Low",
            
            comparisonFeature9: "Data Security",
            traditionalPOSSecurity: "Basic",
            outtoPOSSecurity: "Advanced (SSL, Encryption)",
            
            comparisonFeature10: "Error Reduction",
            traditionalPOSAccuracy: "85% Accuracy",
            outtoPOSAccuracy: "98% Accuracy",
            
            comparisonFeature11: "Time Saving",
            traditionalPOSTimeSaving: "30% Time Saved",
            outtoPOSTimeSaving: "70% Time Saved",
            
            comparisonFeature12: "Customer Management",
            traditionalPOSCustomerService: "Limited",
            outtoPOSCustomerService: "Complete (CRM Included)",
            
            // Comparison CTA
            outtoPOSHeading: "OdeX ERP",
            comparisonCtaText: "OdeX ERP will better solve your business needs.",
            
            // Features page
            featuresTitle: "Key Modules | OdeX",
            featuresHeroTitle: "OdeX Key Modules",
            featuresHeroText: "OdeX has many modules that can solve your business needs.",
            feature1Title: "Sales Management",
            feature1Text: "Manages all sales processes. Customers, agreements, sales orders, shipping costs, etc.",
            feature2Title: "Inventory Management",
            feature2Text: "Manages items, purchases, withdrawals. You can view inventory status in real-time.",
            feature3Title: "Accounting Management",
            feature3Text: "Manages financial processes. Income, expenses, currency exchanges.",
            feature4Title: "Human Resources Management",
            feature4Text: "Manages employees, salaries, jobs, name lists.",
            feature5Title: "POS System",
            feature5Text: "Manages sales system. Payments, returns, card payments.",
            feature6Title: "Reports",
            feature6Text: "Provides reports that help with business decisions.",
            
            // Integration section
            integrationTitle: "Module Integration",
            integrationText: "OdeX modules can connect with each other. From manufacturing to sales, all data is centralized, so decisions can be made faster.",
            manufacturingModule: "Manufacturing",
            inventoryModule: "Inventory",
            salesModule: "Sales",
            hrModule: "Human Resources",
            accountingModule: "Accounting",
            posModule: "POS",
            integrationCenter: "OdeX",
            
            // Features CTA
            featuresCtaText: "OdeX can solve your business needs.",
            
            // Contact page
            contactTitle: "Contact | OdeX",
            contactHeroTitle: "Contact",
            contactHeroText: "Request a free demo to see how OdeX can be used for your business.",
            contactFormTitle: "Request Demo or Contact",
            nameLabel: "Name",
            companyLabel: "Company Name",
            emailLabel: "Email",
            phoneLabel: "Phone Number",
            messageLabel: "Message",
            sendButton: "Send",
            contactInfoTitle: "Contact Us",
            addressTitle: "Address",
            addressText: "Yangon, Myanmar",
            phoneTitle: "Phone Number",
            phone1: "09-754758505",
            phone2: "09-952177102",
            emailTitle: "Email",
            contactEmail1: "odexerp@gmail.com",
            contactEmail2: "odexerp@gmail.com",
            
            // Language toggle
            langToggleText: "Myanmar Version",
            
            // Industry Solutions Section
            industrySolutionsTitle: "Solutions by Industry",
            industrySolutionsText: "OdeX provides customized solutions for different industries.",
            industryManufacturing: "Manufacturing",
            industryManufacturingText: "Specialized management system for manufacturing businesses",
            industryRetail: "Retail",
            industryRetailText: "Inventory and POS system for retail businesses",
            industryLogistics: "Logistics",
            industryLogisticsText: "Route management for logistics businesses",
            industryHealthcare: "Healthcare",
            industryHealthcareText: "Management for hospitals and health centers",
            industryEducation: "Education",
            industryEducationText: "Educational management for schools and universities",
            industryGovernment: "Government",
            industryGovernmentText: "Management and reporting system for government departments",
            
            // Security & Compliance Section
            securityComplianceTitle: "Security & Compliance",
            securityComplianceText: "OdeX protects your data with the highest security standards.",
            securityDataSecurity: "Data Security",
            securityDataSecurityText: "Protect your data with SSL encryption and advanced security protocols.",
            securityDataStorage: "Data Storage",
            securityDataStorageText: "Data is stored on secure cloud servers with daily backups.",
            securityUserManagement: "User Management",
            securityUserManagementText: "Securely manage your data with role-based access control and user permissions.",
            securityStandardsCompliance: "Standards Compliance",
            securityStandardsComplianceText: "Compliant with ISO 27001, GDPR and other international security standards.",
            securityISO27001: "ISO 27001 Certified",
            securityGDPR: "GDPR Compliant",
            securityUptime: "99.9% Uptime SLA"
        }
    };
    
    // Function to update page content based on language
    function updatePageContent() {
        const lang = langData[currentLang];
        console.log('updatePageContent called with currentLang:', currentLang);
        
        // Update common elements
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) langToggle.textContent = lang.langToggleText;
        
        // Update navigation
        const setNavLinkText = (selector, value) => {
            const link = document.querySelector(selector);
            if (!link) return;
            const label = link.querySelector('.nav-link-label');
            if (label) {
                let textSpan = label.querySelector('.nav-link-text');
                if (!textSpan) {
                    textSpan = document.createElement('span');
                    textSpan.className = 'nav-link-text';
                    label.prepend(textSpan);
                }
                textSpan.textContent = value;
            } else {
                link.textContent = value;
            }
        };
        
        setNavLinkText('a[data-lang="navHome"]', lang.navHome);
        setNavLinkText('a[data-lang="navAbout"]', lang.navAbout);
        setNavLinkText('a[data-lang="navComparison"]', lang.navComparison);
        setNavLinkText('a[data-lang="navFeatures"]', lang.navFeatures);
        setNavLinkText('a[data-lang="navContact"]', lang.navContact);
        setNavLinkText('a[data-lang="navServices"]', lang.navServices);
        ensureNavServicesBadge();
        
        // Update footer
        const footerERP = document.querySelector('footer .footer-section h3');
        if (footerERP) footerERP.textContent = 'OdeX';
        
        const footerAbout = document.querySelector('footer .footer-section p');
        if (footerAbout) footerAbout.textContent = lang.footerAbout;
        
        const footerLinks = document.querySelector('footer .footer-section:nth-child(2) h4');
        if (footerLinks) footerLinks.textContent = lang.footerLinks;
        
        const footerHome = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(1) a');
        if (footerHome) footerHome.textContent = currentLang === 'my' ? 'ပင်မစာမျက်နှာ' : 'Home';
        
        const footerAboutERP = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(2) a');
        if (footerAboutERP) footerAboutERP.textContent = currentLang === 'my' ? 'ERP အကြောင်း' : 'About ERP';
        
        const footerComparison = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(3) a');
        if (footerComparison) footerComparison.textContent = currentLang === 'my' ? 'နှိုင်းယှဉ်ချက်' : 'Comparison';
        
        const footerFeatures = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(4) a');
        if (footerFeatures) footerFeatures.textContent = currentLang === 'my' ? 'အဓိကမော်ဂျူးများ' : 'Key Modules';
        
        const footerContact = document.querySelector('footer .footer-section:nth-child(2) ul li:nth-child(5) a');
        if (footerContact) footerContact.textContent = currentLang === 'my' ? 'ဆက်သွယ်ရန်' : 'Contact';
        
        const footerContactInfo = document.querySelector('footer .footer-section:nth-child(3) h4');
        if (footerContactInfo) footerContactInfo.textContent = lang.footerContactInfo;
        // Ensure footer email/phone are correct in both languages
        const footerEmailEl = document.querySelector('footer .footer-section:nth-child(3) p:nth-of-type(1)');
        if (footerEmailEl) footerEmailEl.innerHTML = '<i class="fas fa-envelope"></i> ' + (lang.footerEmail || 'odexerp@gmail.com');
        const footerPhoneEl = document.querySelector('footer .footer-section:nth-child(3) p:nth-of-type(2)');
        if (footerPhoneEl) footerPhoneEl.innerHTML = '<i class="fas fa-phone"></i> ' + (lang.footerPhone || '09-754758505');
        
        const footerCopyright = document.querySelector('.footer-bottom p');
        if (footerCopyright) footerCopyright.textContent = lang.footerCopyright;
        
        // Update contact info
        const contactItems = document.querySelectorAll('.contact-item');
        if (contactItems.length >= 3) {
            contactItems[0].querySelector('p').textContent = lang.addressText || 'Yangon, Myanmar';
            contactItems[1].querySelectorAll('p')[0].innerHTML = '<i class="fas fa-phone"></i> ' + (lang.phone1 || '09-754758505');
            contactItems[1].querySelectorAll('p')[1].innerHTML = '<i class="fas fa-phone"></i> ' + (lang.phone2 || '09-952177102');
            // If more phone number slots exist, fill them with the remaining numbers
            if (contactItems[1].querySelectorAll('p')[2]) contactItems[1].querySelectorAll('p')[2].innerHTML = '<i class="fas fa-phone"></i> 09-788315991';
            if (contactItems[1].querySelectorAll('p')[3]) contactItems[1].querySelectorAll('p')[3].innerHTML = '<i class="fas fa-phone"></i> 09-450049600';
            const emailParagraphs = contactItems[2].querySelectorAll('p');
            if (emailParagraphs[0]) emailParagraphs[0].textContent = lang.contactEmail1 || 'odexerp@gmail.com';
            // Remove any extra email lines beyond the first
            if (emailParagraphs[1]) emailParagraphs[1].remove();
        }
        
        // Update page-specific content
        const pagePath = window.location.pathname;
        
        if (pagePath === '/' || pagePath.endsWith('/')) {
            // Home page
            document.title = lang.homeTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroHeading = document.querySelector('.hero-content h1');
            if (heroHeading) heroHeading.textContent = lang.heroHeading;
            
            const heroMotto = document.querySelector('.hero-content .motto');
            if (heroMotto) heroMotto.textContent = lang.heroMotto;
            
            const heroText = document.querySelector('.hero-content p:not(.motto)');
            if (heroText) heroText.textContent = lang.heroText;

            // Update section headers
            const featurePreviewTitle = document.querySelector('.features-preview .section-header h2');
            if (featurePreviewTitle) featurePreviewTitle.textContent = currentLang === 'my' ? 'အဓိက အားသာချက်များ' : 'Key Features';
            
            const featurePreviewDesc = document.querySelector('.features-preview .section-header p');
            if (featurePreviewDesc) featurePreviewDesc.textContent = currentLang === 'my' ? 'သင့်စီးပွားရေးလုပ်ငန်းကို နောက်တစ်ဆင့်သို့ ပို့ဆောင်ပေးမည့် အင်္ဂါရပ်များ' : 'Features that will take your business to the next level';

            const whyChooseTitle = document.querySelector('.why-choose .section-header h2');
            if (whyChooseTitle) whyChooseTitle.textContent = currentLang === 'my' ? 'ဘာကြောင့် OdeX ကို ရွေးချယ်ရမလဲ?' : 'Why Choose OdeX?';
            
            const whyChooseDesc = document.querySelector('.why-choose .section-header p');
            if (whyChooseDesc) whyChooseDesc.textContent = currentLang === 'my' ? 'မြန်မာနိုင်ငံ၏ စီးပွားရေးလိုအပ်ချက်များကို နားလည်သော ကျွမ်းကျင်ပညာရှင်များ၏ ဝန်ဆောင်မှု' : 'Professional services from experts who understand Myanmar business needs';

            const ctaTitle = document.querySelector('.cta .cta-content h2');
            if (ctaTitle) ctaTitle.textContent = currentLang === 'my' ? 'သင့်စီးပွားရေးလုပ်ငန်းကို ခေတ်မီဆုံးနည်းလမ်းဖြင့် စီမံခန့်ခွဲပါ' : 'Manage Your Business with Modern Solutions';
            
            const ctaDesc = document.querySelector('.cta .cta-content p');
            if (ctaDesc) ctaDesc.textContent = currentLang === 'my' ? 'ယနေ့ပဲ OdeX နှင့်အတူ သင့်စီးပွားရေးလုပ်ငန်း၏ အနာဂတ်ကို စတင်ပါ။' : 'Start your business future with OdeX today.';

            const ctaBtn1 = document.querySelector('.cta .cta-buttons .btn.primary');
            if (ctaBtn1) ctaBtn1.textContent = currentLang === 'my' ? 'အခုပဲ ဆက်သွယ်ပါ' : 'Contact Now';
            
            const ctaBtn2 = document.querySelector('.cta .cta-buttons .btn.secondary');
            if (ctaBtn2) ctaBtn2.textContent = currentLang === 'my' ? 'အင်္ဂါရပ်များ လေ့လာပါ' : 'Explore Features';
            
            // Update Services section
            const servicesTitle = document.querySelector('[data-lang="servicesTitle"]');
            if (servicesTitle) servicesTitle.textContent = lang.servicesTitle;
            
            const servicesSubtitle = document.querySelector('[data-lang="servicesSubtitle"]');
            if (servicesSubtitle) servicesSubtitle.textContent = lang.servicesSubtitle;
            
            const service1Title = document.querySelector('[data-lang="service1Title"]');
            if (service1Title) service1Title.textContent = lang.service1Title;
            
            const service1Desc = document.querySelector('[data-lang="service1Desc"]');
            if (service1Desc) service1Desc.textContent = lang.service1Desc;
            
            const service2Title = document.querySelector('[data-lang="service2Title"]');
            if (service2Title) service2Title.textContent = lang.service2Title;
            
            const service2Desc = document.querySelector('[data-lang="service2Desc"]');
            if (service2Desc) service2Desc.textContent = lang.service2Desc;
            
            const service3Title = document.querySelector('[data-lang="service3Title"]');
            if (service3Title) service3Title.textContent = lang.service3Title;
            
            const service3Desc = document.querySelector('[data-lang="service3Desc"]');
            if (service3Desc) service3Desc.textContent = lang.service3Desc;
            
            const service3Badge = document.querySelector('[data-lang="service3Badge"]');
            if (service3Badge) service3Badge.textContent = lang.service3Badge;
            
            const service3Feature1 = document.querySelector('[data-lang="service3Feature1"]');
            if (service3Feature1) service3Feature1.textContent = lang.service3Feature1;
            
            const service3Feature2 = document.querySelector('[data-lang="service3Feature2"]');
            if (service3Feature2) service3Feature2.textContent = lang.service3Feature2;
            
            const service3Feature3 = document.querySelector('[data-lang="service3Feature3"]');
            if (service3Feature3) service3Feature3.textContent = lang.service3Feature3;
            
            const service3Price = document.querySelector('[data-lang="service3Price"]');
            if (service3Price) service3Price.textContent = lang.service3Price;
            
            const learnMoreElements = document.querySelectorAll('[data-lang="learnMore"]');
            learnMoreElements.forEach(el => {
                if (el) el.textContent = lang.learnMore;
            });
            
            // Update Chatbot
            const chatbotTitle = document.querySelector('[data-lang="chatbotTitle"]');
            if (chatbotTitle) chatbotTitle.textContent = lang.chatbotTitle;
            
            const chatbotStatus = document.querySelector('[data-lang="chatbotStatus"]');
            if (chatbotStatus) chatbotStatus.textContent = lang.chatbotStatus;
            
            const chatbotPlaceholder = document.querySelector('[data-lang="chatbotPlaceholder"]');
            if (chatbotPlaceholder) chatbotPlaceholder.placeholder = lang.chatbotPlaceholder;
            
            const chatbotWelcome = document.querySelector('[data-lang="chatbotWelcome"]');
            if (chatbotWelcome) chatbotWelcome.textContent = lang.chatbotWelcome;
            
            const homeBtn1 = document.querySelector('.cta-buttons .btn.primary');
            if (homeBtn1) homeBtn1.textContent = lang.homeBtn1;
            
            const homeBtn2 = document.querySelector('.cta-buttons .btn.secondary');
            if (homeBtn2) homeBtn2.textContent = lang.homeBtn2;

            // Update feature preview cards
            const featureCards = document.querySelectorAll('.features-preview .feature-card');
            if (featureCards.length >= 4) {
                if (currentLang === 'en') {
                    if (featureCards[0]) {
                        featureCards[0].querySelector('h3').textContent = 'Business Management';
                        featureCards[0].querySelector('p').textContent = 'Manage everything of your business from one place effectively.';
                    }
                    if (featureCards[1]) {
                        featureCards[1].querySelector('h3').textContent = 'Customer Relations';
                        featureCards[1].querySelector('p').textContent = 'Build better relationships with your customers.';
                    }
                    if (featureCards[2]) {
                        featureCards[2].querySelector('h3').textContent = 'POS System';
                        featureCards[2].querySelector('p').textContent = 'Manage sales quickly and easily with our modern POS system.';
                    }
                    if (featureCards[3]) {
                        featureCards[3].querySelector('h3').textContent = 'Mobile Friendly';
                        featureCards[3].querySelector('p').textContent = 'Manage your business from anywhere.';
                    }
                } else {
                    if (featureCards[0]) {
                        featureCards[0].querySelector('h3').textContent = 'စီးပွားရေးစီမံခန့်ခွဲမှု';
                        featureCards[0].querySelector('p').textContent = 'သင့်စီးပွားရေးလုပ်ငန်း၏ အားလုံးကို တစ်နေရာတည်းမှ ထိရောက်စွာ စီမံခန့်ခွဲပါ။';
                    }
                    if (featureCards[1]) {
                        featureCards[1].querySelector('h3').textContent = 'ဖောက်သည်ဆက်ဆံရေး';
                        featureCards[1].querySelector('p').textContent = 'ဖောက်သည်များနှင့် ပိုမိုကောင်းမွန်သော ဆက်ဆံရေးကို တည်ဆောက်ပါ။';
                    }
                    if (featureCards[2]) {
                        featureCards[2].querySelector('h3').textContent = 'POS စနစ်';
                        featureCards[2].querySelector('p').textContent = 'ခေတ်မီဆုံး POS စနစ်ဖြင့် ရောင်းချမှုများကို လွယ်ကူမြန်ဆန်စွာ စီမံပါ။';
                    }
                    if (featureCards[3]) {
                        featureCards[3].querySelector('h3').textContent = 'မိုဘိုင်းအဆင်ပြေမှု';
                        featureCards[3].querySelector('p').textContent = 'မည်သည့်နေရာမှမဆို သင့်စီးပွားရေးကို စီမံခန့်ခွဲနိုင်ပါသည်။';
                    }
                }
            }

            // Update benefit items
            const benefitItems = document.querySelectorAll('.why-choose .benefit-item');
            if (benefitItems.length >= 4) {
                if (currentLang === 'en') {
                    if (benefitItems[0]) {
                        benefitItems[0].querySelector('h3').textContent = 'Made for Myanmar';
                        benefitItems[0].querySelector('p').textContent = 'Designed to understand the needs of local businesses.';
                    }
                    if (benefitItems[1]) {
                        benefitItems[1].querySelector('h3').textContent = '24/7 Support';
                        benefitItems[1].querySelector('p').textContent = 'We provide daily support to keep your business running continuously.';
                    }
                    if (benefitItems[2]) {
                        benefitItems[2].querySelector('h3').textContent = 'Security';
                        benefitItems[2].querySelector('p').textContent = 'Advanced security systems are installed to protect your data.';
                    }
                    if (benefitItems[3]) {
                        benefitItems[3].querySelector('h3').textContent = 'Quick Start';
                        benefitItems[3].querySelector('p').textContent = 'Digitize your business quickly and make operations more efficient.';
                    }
                } else {
                    if (benefitItems[0]) {
                        benefitItems[0].querySelector('h3').textContent = 'မြန်မာနိုင်ငံအတွက် သီးသန့်';
                        benefitItems[0].querySelector('p').textContent = 'ဒေသတွင်း စီးပွားရေးလုပ်ငန်းများ၏ လိုအပ်ချက်များကို နားလည်ကာ ဒီဇိုင်းထုတ်ထားပါသည်။';
                    }
                    if (benefitItems[1]) {
                        benefitItems[1].querySelector('h3').textContent = '၂၄/၇ ပံ့ပိုးမှု';
                        benefitItems[1].querySelector('p').textContent = 'သင့်စီးပွားရေးလုပ်ငန်း အဆက်မပြတ် လည်ပတ်နိုင်စေရန် နေ့စဉ် ပံ့ပိုးမှုပေးပါသည်။';
                    }
                    if (benefitItems[2]) {
                        benefitItems[2].querySelector('h3').textContent = 'လုံခြုံမှု';
                        benefitItems[2].querySelector('p').textContent = 'သင့်အချက်အလက်များကို ကာကွယ်ရန် အဆင့်မြင့် လုံခြုံရေးစနစ်များ တပ်ဆင်ထားပါသည်။';
                    }
                    if (benefitItems[3]) {
                        benefitItems[3].querySelector('h3').textContent = 'အမြန်ဆုံး စတင်နိုင်မှု';
                        benefitItems[3].querySelector('p').textContent = 'သင့်စီးပွားရေးလုပ်ငန်းကို မြန်ဆန်စွာ ဒစ်ဂျစ်တယ်ဖြစ်စေပြီး လုပ်ငန်းများကို ပိုမိုထိရောက်စေပါသည်။';
                    }
                }
            }
            
            const whyOuttoTitle = document.querySelector('.why-odoo h2');
            if (whyOuttoTitle) whyOuttoTitle.textContent = lang.whyOuttoTitle;
            
            const whyOdooCards = document.querySelectorAll('.why-odoo .feature-card');
            if (whyOdooCards.length >= 4) {
                whyOdooCards[0].querySelector('h3').textContent = lang.whyOuttoFeature1;
                whyOdooCards[0].querySelector('p').textContent = lang.whyOuttoFeature1Text;
                whyOdooCards[1].querySelector('h3').textContent = lang.whyOuttoFeature2;
                whyOdooCards[1].querySelector('p').textContent = lang.whyOuttoFeature2Text;
                whyOdooCards[2].querySelector('h3').textContent = lang.whyOuttoFeature3;
                whyOdooCards[2].querySelector('p').textContent = lang.whyOuttoFeature3Text;
                whyOdooCards[3].querySelector('h3').textContent = lang.whyOuttoFeature4;
                whyOdooCards[3].querySelector('p').textContent = lang.whyOuttoFeature4Text;
            }
            
            const comparisonPreviewTitle = document.querySelector('.comparison-preview h2');
            if (comparisonPreviewTitle) comparisonPreviewTitle.textContent = lang.comparisonPreviewTitle;
            
            const comparisonPreviewText = document.querySelector('.comparison-preview p');
            if (comparisonPreviewText) comparisonPreviewText.textContent = lang.comparisonPreviewText;
            
            const comparisonPreviewBtn = document.querySelector('.comparison-preview .btn');
            if (comparisonPreviewBtn) comparisonPreviewBtn.textContent = lang.comparisonPreviewBtn;
            
            const featuresPreviewTitle = document.querySelector('.features-preview h2');
            if (featuresPreviewTitle) featuresPreviewTitle.textContent = lang.featuresPreviewTitle;
            
            const featureIcons = document.querySelectorAll('.feature-icon span');
            if (featureIcons.length >= 5) {
                featureIcons[0].textContent = lang.featuresPreviewSales;
                featureIcons[1].textContent = lang.featuresPreviewInventory;
                featureIcons[2].textContent = lang.featuresPreviewAccounting;
                featureIcons[3].textContent = lang.featuresPreviewHR;
                featureIcons[4].textContent = lang.featuresPreviewPOS;
            }
            
            const featuresPreviewBtn = document.querySelector('.features-preview .btn');
            if (featuresPreviewBtn) featuresPreviewBtn.textContent = lang.featuresPreviewBtn;

            // Ensure hero stat shows latest number
            const heroFirstStat = document.querySelector('.hero-stats .stat .stat-number');
            if (heroFirstStat) heroFirstStat.textContent = '28+';

            // Industry solutions - Always handle for both languages
            const industryTitle = document.querySelector('.industry-solutions h2');
            if (industryTitle) {
                industryTitle.textContent = lang.industrySolutionsTitle || 'Solutions by Industry';
                console.log('Industry Solutions Title updated:', industryTitle.textContent);
            }
            const industrySubtitle = document.querySelector('.industry-solutions p');
            if (industrySubtitle) industrySubtitle.textContent = lang.industrySolutionsText || 'OdeX provides customized solutions for different industries.';
            const industryCards = document.querySelectorAll('.industry-solutions .industry-card');
            if (industryCards.length >= 6) {
                const heads = [
                    lang.industryManufacturing || 'Manufacturing',
                    lang.industryRetail || 'Retail', 
                    lang.industryLogistics || 'Logistics',
                    lang.industryHealthcare || 'Healthcare',
                    lang.industryEducation || 'Education',
                    lang.industryGovernment || 'Government'
                ];
                const descs = [
                    lang.industryManufacturingText || 'Specialized management system for manufacturing businesses',
                    lang.industryRetailText || 'Inventory and POS system for retail businesses',
                    lang.industryLogisticsText || 'Route and operations management for logistics',
                    lang.industryHealthcareText || 'Management for hospitals and health centers',
                    lang.industryEducationText || 'Educational management for schools and universities',
                    lang.industryGovernmentText || 'Management and reporting system for government departments'
                ];
                industryCards.forEach((card, i) => {
                    const h3 = card.querySelector('h3');
                    const p = card.querySelector('p');
                    if (h3) h3.textContent = heads[i] || h3.textContent;
                    if (p) p.textContent = descs[i] || p.textContent;
                });
            }
            
            // Security & compliance - Always handle for both languages
            const secTitle = document.querySelector('.security-compliance h2');
            if (secTitle) secTitle.textContent = lang.securityComplianceTitle || 'Security & Compliance';
            const secSubtitle = document.querySelector('.security-compliance p');
            if (secSubtitle) secSubtitle.textContent = lang.securityComplianceText || 'OdeX protects your data with the highest security standards.';
            const secItems = document.querySelectorAll('.security-compliance .security-item');
            if (secItems.length >= 4) {
                const sHeads = [
                    lang.securityDataSecurity || 'Data Security',
                    lang.securityDataStorage || 'Data Storage',
                    lang.securityUserManagement || 'User Management',
                    lang.securityStandardsCompliance || 'Standards Compliance'
                ];
                const sDescs = [
                    lang.securityDataSecurityText || 'Protect your data with SSL encryption and advanced security protocols.',
                    lang.securityDataStorageText || 'Data stored securely on cloud servers with daily backups.',
                    lang.securityUserManagementText || 'Safely manage your data with role-based access control and user permissions.',
                    lang.securityStandardsComplianceText || 'Compliant with global standards such as ISO 27001 and GDPR.'
                ];
                secItems.forEach((item, i) => {
                    const h3 = item.querySelector('h3');
                    const p = item.querySelector('p');
                    if (h3) h3.textContent = sHeads[i] || h3.textContent;
                    if (p) p.textContent = sDescs[i] || p.textContent;
                });
            }
            
            // Update compliance badges - Always handle for both languages
            const badges = document.querySelectorAll('.compliance-badges .badge span');
            if (badges.length >= 3) {
                if (badges[0]) badges[0].textContent = lang.securityISO27001 || 'ISO 27001 Certified';
                if (badges[1]) badges[1].textContent = lang.securityGDPR || 'GDPR Compliant';
                if (badges[2]) badges[2].textContent = lang.securityUptime || '99.9% Uptime SLA';
            }

            // Company Showcase Section
            const companyShowcaseTitle = document.querySelector('.company-showcase h2');
            if (companyShowcaseTitle) {
                companyShowcaseTitle.textContent = currentLang === 'my' ? 'Odoo ERP System ကို လက်ရှိအသုံးပြုနေကြသော လုပ်ငန်းများ' : 'Businesses Currently Using Odoo ERP System';
            }

            // Update company showcase slides
            const slides = document.querySelectorAll('.company-showcase .slide');
            if (slides.length >= 6) {
                if (currentLang === 'en') {
                    // Slide 1 - Autonova
                    if (slides[0]) {
                        const h3 = slides[0].querySelector('h3');
                        const type = slides[0].querySelector('.company-type');
                        const desc = slides[0].querySelector('.company-description');
                        const stats = slides[0].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'Autonova';
                        if (type) type.textContent = 'Automotive Industry';
                        if (desc) desc.textContent = 'Autonova is a leading automotive distributor in Myanmar, efficiently managing business operations with Odoo ERP.';
                        if (stats[0]) stats[0].textContent = '45% Business Efficiency Increase';
                        if (stats[1]) stats[1].textContent = '60% Time Saved';
                    }
                    // Slide 2 - AWBA
                    if (slides[1]) {
                        const h3 = slides[1].querySelector('h3');
                        const type = slides[1].querySelector('.company-type');
                        const desc = slides[1].querySelector('.company-description');
                        const stats = slides[1].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'AWBA';
                        if (type) type.textContent = 'Food & Beverage Industry';
                        if (desc) desc.textContent = 'AWBA is a top company in the food and beverage industry, using Odoo POS and Inventory Management for faster service.';
                        if (stats[0]) stats[0].textContent = '35% Sales Increase';
                        if (stats[1]) stats[1].textContent = '98% Inventory Accuracy';
                    }
                    // Slide 3 - City Properties
                    if (slides[2]) {
                        const h3 = slides[2].querySelector('h3');
                        const type = slides[2].querySelector('.company-type');
                        const desc = slides[2].querySelector('.company-description');
                        const stats = slides[2].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'City Properties';
                        if (type) type.textContent = 'Real Estate Industry';
                        if (desc) desc.textContent = 'City Properties is a leading real estate company, building better customer relationships with Odoo CRM.';
                        if (stats[0]) stats[0].textContent = '50% Customer Increase';
                        if (stats[1]) stats[1].textContent = '40% Faster Service';
                    }
                    // Slide 4 - Citywin
                    if (slides[3]) {
                        const h3 = slides[3].querySelector('h3');
                        const type = slides[3].querySelector('.company-type');
                        const desc = slides[3].querySelector('.company-description');
                        const stats = slides[3].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'Citywin';
                        if (type) type.textContent = 'Retail Industry';
                        if (desc) desc.textContent = 'Citywin operates top retail outlets and easily manages sales with Odoo POS.';
                        if (stats[0]) stats[0].textContent = '55% Sales Increase';
                        if (stats[1]) stats[1].textContent = '85% Error Reduction';
                    }
                    // Slide 5 - Season
                    if (slides[4]) {
                        const h3 = slides[4].querySelector('h3');
                        const type = slides[4].querySelector('.company-type');
                        const desc = slides[4].querySelector('.company-description');
                        const stats = slides[4].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'Season';
                        if (type) type.textContent = 'Hotel Industry';
                        if (desc) desc.textContent = 'Season Hotel is a top hospitality business, efficiently managing guest services, inventory, and HR with Odoo ERP.';
                        if (stats[0]) stats[0].textContent = '95% Guest Satisfaction';
                        if (stats[1]) stats[1].textContent = '50% Efficiency Increase';
                    }
                    // Slide 6 - YIGTL
                    if (slides[5]) {
                        const h3 = slides[5].querySelector('h3');
                        const type = slides[5].querySelector('.company-type');
                        const desc = slides[5].querySelector('.company-description');
                        const stats = slides[5].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'YIGTL';
                        if (type) type.textContent = 'Logistics Industry';
                        if (desc) desc.textContent = 'YIGTL is a leading logistics company, tracking shipments in real-time with the Odoo Logistics module.';
                        if (stats[0]) stats[0].textContent = '40% Faster Delivery';
                        if (stats[1]) stats[1].textContent = '99% Accuracy';
                    }
                } else {
                    // Myanmar - restore original content
                    // Slide 1 - Autonova
                    if (slides[0]) {
                        const h3 = slides[0].querySelector('h3');
                        const type = slides[0].querySelector('.company-type');
                        const desc = slides[0].querySelector('.company-description');
                        const stats = slides[0].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'Autonova';
                        if (type) type.textContent = 'မော်တော်ယာဉ်လုပ်ငန်း';
                        if (desc) desc.textContent = 'Autonova သည် မြန်မာနိုင်ငံတွင် ထိပ်တန်းမော်တော်ယာဉ် ဖြန့်ဖြူးရောင်းချသူတစ်ဦးဖြစ်ပြီး Odoo ERP ဖြင့် လုပ်ငန်းစီမံခန့်ခွဲမှုကို ထိရောက်စွာ လုပ်ဆောင်လျက်ရှိသည်။';
                        if (stats[0]) stats[0].textContent = 'စီးပွားရေး ထိရောက်မှု 45% တိုးမြင့်';
                        if (stats[1]) stats[1].textContent = 'အချိန် 60% ချွေတာ';
                    }
                    // Slide 2 - AWBA
                    if (slides[1]) {
                        const h3 = slides[1].querySelector('h3');
                        const type = slides[1].querySelector('.company-type');
                        const desc = slides[1].querySelector('.company-description');
                        const stats = slides[1].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'AWBA';
                        if (type) type.textContent = 'အစားအသောက်လုပ်ငန်း';
                        if (desc) desc.textContent = 'AWBA သည် အစားအသောက် လုပ်ငန်းတွင် ထိပ်တန်းကုမ္ပဏီတစ်ခုဖြစ်ပြီး Odoo POS နှင့် Inventory စီမံခန့်ခွဲမှုကို အသုံးပြု၍ ဝန်ဆောင်မှုများ ပိုမိုမြန်ဆန်စေသည်။';
                        if (stats[0]) stats[0].textContent = 'ရောင်းအား 35% တိုးမြင့်';
                        if (stats[1]) stats[1].textContent = 'စာရင်းတိကျမှု 98%';
                    }
                    // Slide 3 - City Properties
                    if (slides[2]) {
                        const h3 = slides[2].querySelector('h3');
                        const type = slides[2].querySelector('.company-type');
                        const desc = slides[2].querySelector('.company-description');
                        const stats = slides[2].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'City Properties';
                        if (type) type.textContent = 'အိမ်ခြံမြေလုပ်ငန်း';
                        if (desc) desc.textContent = 'City Properties သည် အိမ်ခြံမြေလုပ်ငန်းတွင် ဦးဆောင်ကုမ္ပဏီတစ်ခုဖြစ်ပြီး Odoo CRM ဖြင့် ဖောက်သည်များနှင့် ပိုမိုကောင်းမွန်သော ဆက်ဆံရေး တည်ဆောက်ထားသည်။';
                        if (stats[0]) stats[0].textContent = 'ဖောက်သည် 50% တိုးမြင့်';
                        if (stats[1]) stats[1].textContent = 'ဝန်ဆောင်မှု 40% မြန်ဆန်';
                    }
                    // Slide 4 - Citywin
                    if (slides[3]) {
                        const h3 = slides[3].querySelector('h3');
                        const type = slides[3].querySelector('.company-type');
                        const desc = slides[3].querySelector('.company-description');
                        const stats = slides[3].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'Citywin';
                        if (type) type.textContent = 'လက်လီလုပ်ငန်း';
                        if (desc) desc.textContent = 'Citywin သည် လက်လီလုပ်ငန်းတွင် ထိပ်တန်းဆိုင်ခွဲများဖွင့်လှစ်ထားပြီး Odoo POS ဖြင့် အရောင်းများကို လွယ်ကူစွာ စီမံခန့်ခွဲနေသည်။';
                        if (stats[0]) stats[0].textContent = 'ရောင်းချမှု 55% တိုးမြင့်';
                        if (stats[1]) stats[1].textContent = 'မှားယွင်းမှု 85% လျှော့ချ';
                    }
                    // Slide 5 - Season
                    if (slides[4]) {
                        const h3 = slides[4].querySelector('h3');
                        const type = slides[4].querySelector('.company-type');
                        const desc = slides[4].querySelector('.company-description');
                        const stats = slides[4].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'Season';
                        if (type) type.textContent = 'ဟိုတယ်လုပ်ငန်း';
                        if (desc) desc.textContent = 'Season Hotel သည် ဧည့်ဝန်ဆောင်မှုလုပ်ငန်းတွင် ထိပ်တန်းဟိုတယ်တစ်ခုဖြစ်ပြီး Odoo ERP ဖြင့် ဧည့်သည်စီမံခန့်ခွဲမှု၊ စာရင်းနှင့် HR ကို ထိရောက်စွာ လုပ်ဆောင်သည်။';
                        if (stats[0]) stats[0].textContent = 'ဧည့်သည်ကျေနပ်မှု 95%';
                        if (stats[1]) stats[1].textContent = 'လုပ်ငန်းထိရောက်မှု 50% တိုးမြင့်';
                    }
                    // Slide 6 - YIGTL
                    if (slides[5]) {
                        const h3 = slides[5].querySelector('h3');
                        const type = slides[5].querySelector('.company-type');
                        const desc = slides[5].querySelector('.company-description');
                        const stats = slides[5].querySelectorAll('.stat');
                        if (h3) h3.textContent = 'YIGTL';
                        if (type) type.textContent = 'ပို့ဆောင်ရေးလုပ်ငန်း';
                        if (desc) desc.textContent = 'YIGTL သည် ပို့ဆောင်ရေးလုပ်ငန်းတွင် ဦးဆောင်ကုမ္ပဏီတစ်ခုဖြစ်ပြီး Odoo Logistics မော်ဂျူးဖြင့် ပို့ဆောင်မှုများကို အချိန်နှင့်တပြေးညီ ခြေရာခံနိုင်သည်။';
                        if (stats[0]) stats[0].textContent = 'ပို့ဆောင်မှု 40% မြန်ဆန်';
                        if (stats[1]) stats[1].textContent = 'တိကျမှု 99%';
                    }
                }
            }

            // Additional homepage text internationalization
            if (currentLang === 'en') {
                // Statistics section
                const statsTitle = document.querySelector('.statistics h2');
                if (statsTitle) statsTitle.textContent = 'Our Achievements';
                const statLabels = document.querySelectorAll('.statistics .stat-label');
                if (statLabels[0]) statLabels[0].textContent = 'Successful Businesses';
                if (statLabels[1]) statLabels[1].textContent = 'Customer Satisfaction';
                if (statLabels[2]) statLabels[2].textContent = 'Support';
                const stat4 = document.querySelector('.statistics .stats-grid .stat-item:nth-child(4) .stat-label');
                if (stat4) stat4.textContent = '% Business Improvement';
                
                // Testimonials
                const tTitle = document.querySelector('.testimonials h2');
                if (tTitle) tTitle.textContent = 'What Our Clients Say';
                const t1 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(1) p');
                const n1 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(1) h4');
                const t2 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(2) p');
                const n2 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(2) h4');
                const t3 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(3) p');
                const n3 = document.querySelector('.testimonials .testimonials-grid .testimonial:nth-child(3) h4');
                if (t1) t1.textContent = 'OdeX truly transformed our business. Processes became faster and errors decreased.';
                if (n1) n1.textContent = 'Mr. Myat Thu';
                if (t2) t2.textContent = 'Real-time data has made our decisions more precise. Choosing OdeX was the best decision.';
                if (n2) n2.textContent = 'Daw Nini Khine';
                if (t3) t3.textContent = 'Mobile accessibility is crucial. We can manage our business from anywhere. OdeX really changed the way we work.';
                if (n3) n3.textContent = 'U Soe Min';
            } else {
                // Restore Myanmar labels when switching back - using language data
                const myLang = langData.my;
                
                // Statistics section
                const statsTitle = document.querySelector('.statistics h2');
                if (statsTitle) statsTitle.textContent = 'ကျွန်ုပ်တို့၏ အောင်မြင်မှုများ';
                const statLabels = document.querySelectorAll('.statistics .stat-label');
                if (statLabels[0]) statLabels[0].textContent = 'အောင်မြင်သော လုပ်ငန်းများ';
                if (statLabels[1]) statLabels[1].textContent = 'ဖောက်သည်စိတ်ကျေနပ်မှု';
                if (statLabels[2]) statLabels[2].textContent = 'ထောက်ပံ့ပေးမှု';
                const stat4 = document.querySelector('.statistics .stats-grid .stat-item:nth-child(4) .stat-label');
                if (stat4) stat4.textContent = '% လုပ်ငန်းပိုမိုတိုးတက်မှု';
                
                // Testimonials section
                const tTitle = document.querySelector('.testimonials h2');
                if (tTitle) tTitle.textContent = 'ဖောက်သည်များ၏ ထင်မြင်ချက်များ';
            }
        } else if (pagePath.includes('about.html') || pagePath === '/about') {
            // About page
            document.title = lang.aboutTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle) heroTitle.textContent = lang.aboutHeroTitle;
            
            const heroText = document.querySelector('.hero-content p');
            if (heroText) heroText.textContent = lang.aboutHeroText;
            
            const whatIsOuttoTitle = document.querySelector('.what-is-odoo .text-content h2');
            if (whatIsOuttoTitle) whatIsOuttoTitle.textContent = lang.whatIsOuttoTitle;
            
            const whatIsOuttoText = document.querySelector('.what-is-odoo .text-content > p');
            if (whatIsOuttoText) whatIsOuttoText.textContent = lang.whatIsOuttoText;
            
            const outtoBenefitsTitle = document.querySelector('.what-is-odoo .text-content h3');
            if (outtoBenefitsTitle) outtoBenefitsTitle.textContent = lang.outtoBenefitsTitle;
            
            const benefitsSectionTitle = document.querySelector('.benefits h2');
            if (benefitsSectionTitle) benefitsSectionTitle.textContent = lang.benefitsSectionTitle;
            
            const benefitCards = document.querySelectorAll('.benefit-card');
            if (benefitCards.length >= 4) {
                benefitCards[0].querySelector('h3').textContent = lang.benefit1Title;
                benefitCards[0].querySelector('p').textContent = lang.benefit1Text;
                benefitCards[1].querySelector('h3').textContent = lang.benefit2Title;
                benefitCards[1].querySelector('p').textContent = lang.benefit2Text;
                benefitCards[2].querySelector('h3').textContent = lang.benefit3Title;
                benefitCards[2].querySelector('p').textContent = lang.benefit3Text;
                benefitCards[3].querySelector('h3').textContent = lang.benefit4Title;
                benefitCards[3].querySelector('p').textContent = lang.benefit4Text;
            }
            
            const aboutCtaText = document.querySelector('.cta-section p');
            if (aboutCtaText) aboutCtaText.textContent = lang.aboutCtaText;
            
            const aboutCtaBtn = document.querySelector('.cta-section .btn');
            if (aboutCtaBtn) aboutCtaBtn.textContent = lang.homeBtn1;
        } else if (pagePath.includes('web-development.html') || pagePath === '/web-development') {
            // Web Development Page
            document.title = currentLang === 'my' ? 'OdeX | ဝဘ်ဆိုဒ်နှင့် အက်ပ်ဖွံ့ဖြိုးမှု ဝန်ဆောင်မှုများ' : 'OdeX | Web and App Development Services';
            
            // Update all data-lang elements
            const elements = document.querySelectorAll('[data-lang]');
            elements.forEach(el => {
                const key = el.getAttribute('data-lang');
                if (lang[key]) {
                    el.textContent = lang[key];
                }
            });
            
            // Re-initialize Lucide icons after content update
            if (typeof lucide !== 'undefined') {
                setTimeout(() => {
                    lucide.createIcons();
                }, 100);
            }
        } else if (pagePath.includes('comparison.html') || pagePath === '/comparison') {
            // Comparison page
            document.title = lang.comparisonTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle) heroTitle.textContent = lang.comparisonHeroTitle;
            
            const heroText = document.querySelector('.hero-content p');
            if (heroText) heroText.textContent = lang.comparisonHeroText;
            
            // Update comparison table headers
            const tableHeaders = document.querySelectorAll('.comparison-table thead th');
            if (tableHeaders.length >= 3) {
                tableHeaders[0].textContent = lang.comparisonFeature;
                tableHeaders[1].textContent = lang.traditionalPOS;
                tableHeaders[2].textContent = lang.outtoPOS;
            }
            
            // Update comparison table body
            const tableRows = document.querySelectorAll('.comparison-table tbody tr');
            if (tableRows.length >= 8) {
                // Row 1 - Data Management
                tableRows[0].cells[0].textContent = lang.comparisonFeature1 || 'Data Management';
                tableRows[0].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSDataManagement || 'Difficult');
                tableRows[0].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSDataManagement || 'Complete');
                
                // Row 2 - Reports
                tableRows[1].cells[0].textContent = lang.comparisonFeature2 || 'Reports';
                tableRows[1].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSReports || 'Limited');
                tableRows[1].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSReports || 'Detailed');
                
                // Row 3 - Inventory Management
                tableRows[2].cells[0].textContent = lang.comparisonFeature3 || 'Inventory Management';
                tableRows[2].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSInventory || 'Difficult');
                tableRows[2].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSInventory || 'Automated');
                
                // Row 4 - Business Decisions
                tableRows[3].cells[0].textContent = lang.comparisonFeature4 || 'Business Decisions';
                tableRows[3].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSBusinessDecisions || 'Limited');
                tableRows[3].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSBusinessDecisions || 'Detailed');
                
                // Row 5 - Mobile Friendly
                tableRows[4].cells[0].textContent = lang.comparisonFeature5 || 'Mobile Friendly';
                tableRows[4].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSMobile || 'Limited');
                tableRows[4].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSMobile || 'Complete');
                
                // Row 6 - Customization
                tableRows[5].cells[0].textContent = lang.comparisonFeature6 || 'Customization';
                tableRows[5].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSCustomization || 'Limited');
                tableRows[5].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSCustomization || 'Complete');
                
                // Row 7 - Process Integration
                tableRows[6].cells[0].textContent = lang.comparisonFeature7 || 'Process Integration';
                tableRows[6].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSIntegration || 'Limited');
                tableRows[6].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSIntegration || 'Complete');
                
                // Row 8 - Cost
                tableRows[7].cells[0].textContent = lang.comparisonFeature8 || 'Cost';
                tableRows[7].cells[1].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.traditionalPOSCost || 'Low');
                tableRows[7].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSCost || 'Low');
                
                // Row 9 - Data Security
                if (tableRows[8]) {
                    tableRows[8].cells[0].textContent = lang.comparisonFeature9 || 'Data Security';
                    tableRows[8].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSSecurity || 'Basic');
                    tableRows[8].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSSecurity || 'Advanced (SSL, Encryption)');
                }
                
                // Row 10 - Error Reduction
                if (tableRows[9]) {
                    tableRows[9].cells[0].textContent = lang.comparisonFeature10 || 'Error Reduction';
                    tableRows[9].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSAccuracy || '85% Accuracy');
                    tableRows[9].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSAccuracy || '98% Accuracy');
                }
                
                // Row 11 - Time Saving
                if (tableRows[10]) {
                    tableRows[10].cells[0].textContent = lang.comparisonFeature11 || 'Time Saving';
                    tableRows[10].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSTimeSaving || '30% Time Saved');
                    tableRows[10].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSTimeSaving || '70% Time Saved');
                }
                
                // Row 12 - Customer Management
                if (tableRows[11]) {
                    tableRows[11].cells[0].textContent = lang.comparisonFeature12 || 'Customer Management';
                    tableRows[11].cells[1].innerHTML = '<i class="fas fa-times cross"></i> ' + (lang.traditionalPOSCustomerService || 'Limited');
                    tableRows[11].cells[2].innerHTML = '<i class="fas fa-check check"></i> ' + (lang.outtoPOSCustomerService || 'Complete (CRM Included)');
                }
            }
            
            const outtoPOSHeading = document.querySelector('.cta-section h2');
            if (outtoPOSHeading) outtoPOSHeading.textContent = lang.outtoPOSHeading;
            
            const comparisonCtaText = document.querySelector('.cta-section p');
            if (comparisonCtaText) comparisonCtaText.textContent = lang.comparisonCtaText;
            
            const comparisonCtaBtn = document.querySelector('.cta-section .btn');
            if (comparisonCtaBtn) comparisonCtaBtn.textContent = lang.homeBtn1;
        } else if (pagePath.includes('features.html') || pagePath === '/features') {
            // Features page
            document.title = lang.featuresTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle) heroTitle.textContent = lang.featuresHeroTitle;
            
            const heroText = document.querySelector('.hero-content p');
            if (heroText) heroText.textContent = lang.featuresHeroText;
            
            const featureCards = document.querySelectorAll('.feature-card');
            if (featureCards.length >= 6) {
                featureCards[0].querySelector('h3').textContent = lang.feature1Title;
                featureCards[0].querySelector('p').textContent = lang.feature1Text;
                featureCards[1].querySelector('h3').textContent = lang.feature2Title;
                featureCards[1].querySelector('p').textContent = lang.feature2Text;
                featureCards[2].querySelector('h3').textContent = lang.feature3Title;
                featureCards[2].querySelector('p').textContent = lang.feature3Text;
                featureCards[3].querySelector('h3').textContent = lang.feature4Title;
                featureCards[3].querySelector('p').textContent = lang.feature4Text;
                featureCards[4].querySelector('h3').textContent = lang.feature5Title;
                featureCards[4].querySelector('p').textContent = lang.feature5Text;
                featureCards[5].querySelector('h3').textContent = lang.feature6Title;
                featureCards[5].querySelector('p').textContent = lang.feature6Text;
            }
            
            const integrationTitle = document.querySelector('.integration h2');
            if (integrationTitle) integrationTitle.textContent = lang.integrationTitle;
            
            const integrationText = document.querySelector('.integration p');
            if (integrationText) integrationText.textContent = lang.integrationText;
            
            const modules = document.querySelectorAll('.module');
            if (modules.length >= 6) {
                modules[0].textContent = lang.manufacturingModule;
                modules[1].textContent = lang.inventoryModule;
                modules[2].textContent = lang.salesModule;
                modules[3].textContent = lang.hrModule;
                modules[4].textContent = lang.accountingModule;
                modules[5].textContent = lang.posModule;
            }
            
            const integrationCenter = document.querySelector('.center');
            if (integrationCenter) integrationCenter.textContent = lang.integrationCenter;
            
            const featuresCtaText = document.querySelector('.cta-section p');
            if (featuresCtaText) featuresCtaText.textContent = lang.featuresCtaText;
            
            const featuresCtaBtn = document.querySelector('.cta-section .btn');
            if (featuresCtaBtn) featuresCtaBtn.textContent = lang.homeBtn1;
        } else if (pagePath.includes('contact.html') || pagePath === '/contact') {
            // Contact page
            document.title = lang.contactTitle;
            const logo = document.querySelector('.logo h1');
            if (logo) logo.innerHTML = 'Ode<span class="accent-x">X</span>';
            
            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle) heroTitle.textContent = lang.contactHeroTitle;
            
            const heroText = document.querySelector('.hero-content p');
            if (heroText) heroText.textContent = lang.contactHeroText;
            
            const contactFormTitle = document.querySelector('.form-container h2');
            if (contactFormTitle) contactFormTitle.textContent = lang.contactFormTitle;
            
            const nameLabel = document.querySelector('label[for="name"]');
            if (nameLabel) nameLabel.textContent = lang.nameLabel;
            
            const companyLabel = document.querySelector('label[for="company"]');
            if (companyLabel) companyLabel.textContent = lang.companyLabel;
            
            const emailLabel = document.querySelector('label[for="email"]');
            if (emailLabel) emailLabel.textContent = lang.emailLabel;
            
            const phoneLabel = document.querySelector('label[for="phone"]');
            if (phoneLabel) phoneLabel.textContent = lang.phoneLabel;
            
            const messageLabel = document.querySelector('label[for="message"]');
            if (messageLabel) messageLabel.textContent = lang.messageLabel;
            
            const sendButton = document.querySelector('button[type="submit"]');
            if (sendButton) sendButton.textContent = lang.sendButton;
            
            const contactInfoTitle = document.querySelector('.contact-info h2');
            if (contactInfoTitle) contactInfoTitle.textContent = lang.contactInfoTitle;
            
            const addressTitles = document.querySelectorAll('.contact-item h3');
            if (addressTitles.length >= 3) {
                addressTitles[0].textContent = lang.addressTitle;
                addressTitles[1].textContent = lang.phoneTitle;
                addressTitles[2].textContent = lang.emailTitle;
            }
        }
    }
    
    // Set initial language
    updatePageContent();
    
    // Temporary visual indicator for deployment verification
    const body = document.body;
    if (body) {
        // Red border removed for production
    }
    
    // Language toggle event listener
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'my' ? 'en' : 'my';
            localStorage.setItem('language', currentLang);
            updatePageContent();
        });
    }
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            // Show the <nav> container and the <ul> list on mobile
            const navContainer = navMenu.parentElement;
            if (navContainer) navContainer.classList.toggle('show');
            navMenu.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                const navContainer = navMenu.parentElement;
                if (navContainer) navContainer.classList.remove('show');
                navMenu.classList.remove('show');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const navContainer = navMenu.parentElement;
            if (!mobileMenuToggle.contains(e.target) && !(navContainer && navContainer.contains(e.target))) {
                mobileMenuToggle.classList.remove('active');
                if (navContainer) navContainer.classList.remove('show');
                navMenu.classList.remove('show');
            }
        });
    }

    // Animated Statistics Counter
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const suffix = element.getAttribute('data-suffix') || '';
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        }
        updateCounter();
    }

    // Intersection Observer for statistics animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

// Observe statistics section
const statsSection = document.querySelector('.statistics');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Reveal-on-scroll for feature cards with stagger
const featureCards = document.querySelectorAll('.feature-card');
if (featureCards.length) {
    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const index = Array.from(featureCards).indexOf(el);
                setTimeout(() => el.classList.add('in-view'), index * 120);
                featuresObserver.unobserve(el);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

    featureCards.forEach(card => featuresObserver.observe(card));

    // Subtle 3D tilt on hover (desktop)
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            const rotateY = ((x / rect.width) - 0.5) * 4; // -2deg to 2deg
            const rotateX = ((y / rect.height) - 0.5) * -4;
            card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            // Honeypot check
            if ((formData.get('companyWebsite') || '').toString().trim() !== '') {
                return; // silently drop bots
            }
            // Basic client-side length validation
            const name = (formData.get('name') || '').toString().trim();
            const company = (formData.get('company') || '').toString().trim();
            const email = (formData.get('email') || '').toString().trim();
            const phone = (formData.get('phone') || '').toString().trim();
            const message = (formData.get('message') || '').toString().trim();
            if (!name || !email || !message) {
                return showToast(currentLang === 'my' ? 'အမည်၊ အီးမေးလ်၊ မက်ဆေ့ခ်ျ လိုအပ်ပါသည်' : 'Name, email and message are required', 'error');
            }
            if (name.length > 120 || company.length > 120 || email.length > 150 || phone.length > 40 || message.length > 2000) {
                return showToast(currentLang === 'my' ? 'ဖာမ် အချက်အလက်များသည် အလွန်ရှည်လျားနေ합니다' : 'Form fields are too long', 'error');
            }
            const payload = {
                name,
                company,
                email,
                phone,
                message
            };
            function showToast(message, type = 'success') {
                let toast = document.querySelector('.toast');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.className = 'toast';
                    document.body.appendChild(toast);
                }
                toast.classList.remove('success','error');
                toast.classList.add(type);
                toast.textContent = message;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2600);
            }
            try {
                // Submit via serverless function
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
                
                const result = await response.json();
                
                if (result.ok) {
                    showToast(currentLang === 'my' ? 'သင့်မက်ဆေ့ခ်ျအား လက်ခံပြီးပါပြီ။ ကျွန်ုပ်တို့ ဆက်သွယ်ပေးမည်။' : 'Thanks! Your message was sent. We will contact you shortly.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Unknown error');
                }
            } catch (err) {
                showToast((currentLang === 'my' ? 'ပေးပို့ရာတွင် ပြသာနာရှိပါသည်။ ' : 'There was a problem sending your message. ') + (err?.message || ''), 'error');
            }
        });
    }

    // Company Showcase Slider Functionality
    const slides = document.querySelectorAll('.company-showcase .slide');
    const dots = document.querySelectorAll('.company-showcase .dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Initialize slider
    if (slides.length > 0) {
        showSlide(0);
        startSlideShow();
        
        // Add click event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlideShow();
                showSlide(index);
                startSlideShow();
            });
        });
        
        // Pause on hover
        const slider = document.querySelector('.showcase-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlideShow);
            slider.addEventListener('mouseleave', startSlideShow);
        }
    }

    // Stacked cards subtle auto-transition (rotate top to back)
    const stacked = document.querySelector('.stacked-cards');
    if (stacked) {
        let stackedTimer;
        function cycleStack() {
            const cards = stacked.querySelectorAll('.card');
            if (cards.length < 2) return;
            // highlight current top
            cards[0].classList.add('active-top');
            setTimeout(() => {
                cards[0].classList.remove('active-top');
                stacked.appendChild(cards[0]);
            }, 900); // sync with CSS transition
        }
        function startStack() {
            stopStack();
            stackedTimer = setInterval(cycleStack, 2600);
        }
        function stopStack() {
            if (stackedTimer) clearInterval(stackedTimer);
        }
        // If prefers-reduced-motion, don't auto-cycle
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReduced) startStack();
        stacked.addEventListener('mouseenter', stopStack);
        stacked.addEventListener('mouseleave', startStack);

        // Mobile fallback: only show fallback on very small screens
        function checkMobileFallback() {
            const cards = stacked.querySelectorAll('.card');
            const fallback = stacked.querySelector('.fallback-image');
            
            // Show fallback only on very small screens (≤320px)
            if (window.innerWidth <= 320) {
                if (fallback) fallback.style.display = 'block';
                cards.forEach(c => c.style.display = 'none');
            } else {
                // On mobile, tablet, desktop - show animated cards
                if (fallback) fallback.style.display = 'none';
                cards.forEach(c => c.style.display = '');
            }
        }
        
        // Check on load and window resize
        setTimeout(checkMobileFallback, 100);
        window.addEventListener('resize', checkMobileFallback);
    }
});

// Handle page show event (for back/forward navigation)
window.addEventListener('pageshow', function(event) {
    // If page is loaded from cache (back/forward button)
    if (event.persisted) {
        // Force reinitialize stacked cards
        const stacked = document.querySelector('.stacked-cards');
        if (stacked) {
            const cards = stacked.querySelectorAll('.card');
            const fallback = stacked.querySelector('.fallback-image');
            
            // Always show cards on mobile/tablet/desktop (only hide on very small screens)
            if (window.innerWidth > 320) {
                if (fallback) fallback.style.display = 'none';
                cards.forEach(c => c.style.display = '');
            }
        }
        
        // Reinitialize company showcase slider
        const slides = document.querySelectorAll('.company-showcase .slide');
        const dots = document.querySelectorAll('.company-showcase .dot');
        if (slides.length > 0) {
            // Reset to first slide
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === 0);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === 0);
            });
        }
        
        // Reinitialize chatbot widget
        const chatbotWidget = document.getElementById('chatbot-widget');
        if (chatbotWidget) {
            chatbotWidget.style.display = 'block';
            chatbotWidget.style.visibility = 'visible';
            chatbotWidget.style.opacity = '1';
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }
});

// Ensure chatbot widget is initialized on window load as well
window.addEventListener('load', function() {
    const chatbotWidget = document.getElementById('chatbot-widget');
    if (chatbotWidget) {
        chatbotWidget.style.display = 'block';
        chatbotWidget.style.visibility = 'visible';
        chatbotWidget.style.opacity = '1';
        chatbotWidget.style.position = 'fixed';
        chatbotWidget.style.bottom = '20px';
        chatbotWidget.style.right = '20px';
        chatbotWidget.style.zIndex = '1000';
        if (typeof lucide !== 'undefined') {
            setTimeout(() => {
                lucide.createIcons();
            }, 100);
        }
    } else {
        console.warn('Chatbot widget not found on page load:', window.location.pathname);
    }
});

// Additional initialization after a short delay to ensure everything is loaded
setTimeout(function() {
    const chatbotWidget = document.getElementById('chatbot-widget');
    if (chatbotWidget) {
        chatbotWidget.style.display = 'block';
        chatbotWidget.style.visibility = 'visible';
        chatbotWidget.style.opacity = '1';
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}, 500);

// Contact form now uses serverless function at /api/contact
