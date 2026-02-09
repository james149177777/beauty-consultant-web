// 聊天状态
let isChatStarted = false;

// 开始聊天
function startChat() {
    isChatStarted = true;
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('chatMessages').classList.add('active');
    document.getElementById('inputArea').classList.add('active');
    
    // 显示欢迎消息
    setTimeout(() => {
        addBotMessage(`嗨，亲爱的你好呀！🌸\n\n我是小美，你的美丽顾问～很高兴认识你！✨\n\n宝贝今天有什么想聊的或者想了解的吗？😊\n\n我可以帮你：\n💉 介绍医美项目\n💧 解答肌肤问题\n🎁 分享优惠活动\n❤️ 术后护理建议\n\n期待能帮到你，一起变得更美更自信！💖`);
    }, 500);
}

// 快捷问题
function askQuestion(question) {
    document.getElementById('messageInput').value = question;
    sendMessage();
}

// 插入表情
function insertTag(tag) {
    const input = document.getElementById('messageInput');
    input.value += tag;
    input.focus();
}

// 发送消息
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // 添加用户消息
    addUserMessage(message);
    input.value = '';
    
    // 显示打字指示器
    showTypingIndicator();
    
    // 发送到 AI
    sendToAI(message);
}

// 键盘发送
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// 添加用户消息
function addUserMessage(message) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-content">${formatMessage(message)}</div>
        <div class="message-avatar">👤</div>
    `;
    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
}

// 添加机器人消息
function addBotMessage(message) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `
        <div class="message-avatar">🎀</div>
        <div class="message-content">${formatMessage(message)}</div>
    `;
    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
}

// 格式化消息
function formatMessage(text) {
    // 换行处理
    text = text.replace(/\n/g, '<br>');
    
    // 加粗处理
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 列表 = text.replace(/• /处理
    textg, '• ');
    
    return text;
}

// 显示打字指示器
function showTypingIndicator() {
    const messagesDiv = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🎀</div>
        <div class="typing-indicator">
            <span></span><span></span><span></span>
        </div>
    `;
    messagesDiv.appendChild(typingDiv);
    scrollToBottom();
}

// 隐藏打字指示器
function hideTypingIndicator() {
    const typingDiv = document.getElementById('typingIndicator');
    if (typingDiv) {
        typingDiv.remove();
    }
}

// 滚动到底部
function scrollToBottom() {
    const messagesDiv = document.getElementById('chatMessages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 发送到 AI
async function sendToAI(message) {
    try {
        // 这里连接到你的 AI Agent
        const response = await callAI(message);
        
        hideTypingIndicator();
        addBotMessage(response);
    } catch (error) {
        hideTypingIndicator();
        addBotMessage('哎呀，亲爱的～小美刚才走神了 😔\n\n你可以再说一遍吗？或者有什么其他问题，小美随时为你服务！💕');
    }
}

// 调用 AI API（需要连接你的 Agent）
async function callAI(message) {
    // 实际实现：发送到你的 Agent API
    // 这里是一个示例返回值
    
    const responses = {
        '玻尿酸': `💉 **玻尿酸填充**\n\n亲爱的，玻尿酸真的是个很棒的选择呢！✨\n\n**它可以改善：**\n• 法令纹、泪沟\n• 苹果肌、太阳穴\n• 下巴、嘴唇\n• 鼻梁塑形\n\n**优点：**\n✅ 立即见效\n✅ 可代谢恢复\n✅ 午餐式美容\n✅ 效果自然\n\n**维持时间：**6-18个月不等\n\n亲爱的，你想了解哪个部位的填充呢？或者我帮你预约个面诊，让专业医生给你最合适的建议？💕`,
        
        '水光针': `💧 **水光针**\n\n哇，水光针真的是补水神器呢！🌟\n\n**主要功效：**\n• 深層補水保濕\n• 改善乾燥暗沉\n• 收縮毛孔\n• 提亮膚色\n\n**適合人群：**\n• 皮膚乾燥缺水\n• 妝容不服帖\n• 毛孔粗大\n• 想要素顏美\n\n**療程建議：**\n每月一次，連續3-6次效果最佳！\n\n現在天氣比較乾燥，很適合做水光針呢！親愛的有興趣嗎？😊`,
        
        '雙眼皮': `👁️ **雙眼皮手術**\n\n親愛的，雙眼皮真的是改變最大的項目呢！✨\n\n**手術方式：**\n• 埋線法：無痕、恢復快\n• 切開法：效果永久、適合所有人\n• 微創三點：自然、疤痕小\n\n**適合眼型：**\n• 單眼皮\n• 內雙\n• 眼皮鬆弛\n• 想要更明顯的雙眼皮\n\n**恢復期：**\n• 埋線：3-5天\n• 切開：1-2週\n\n親愛的，你想做什麼樣的雙眼皮呢？我們可以先預約諮詢，讓醫生幫你設計最適合的眼型！💕`,
        
        '優惠': `🎁 **最新優惠活動**\n\n親愛的，現在正好有很不錯的優惠呢！🌸\n\n**本月特惠：**\n✅ 水光針限時體驗價\n✅ 玻尿酸買二送一\n✅ 雙眼皮手術88折\n✅ 會員專屬85折\n\n**新年煥新顏套餐：**\n全面部水光針 + 術後護理套装\n只要 $XXX（原价 $XXX）\n\n親愛的，要不要我幫你預約？或者你有什麼想做的項目，我帮你查詢最新優惠！😊`,
        
        'default': `哎呀，親愛的問了個好問題呢！🌸\n\n小美這裡有好多醫美知識可以分享～\n\n**我可以幫你：**\n💉 介紹各種醫美項目\n💧 解答肌膚護理疑問\n🎁 分享優惠活動\n❤️ 術後護理建議\n\n親愛的具體想了解什麼呀？😊\n\n或者告訴我你的困擾，小美帮你推荐最适合的方案！💕`
    };
    
    // 簡單的關鍵詞匹配
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('玻尿酸') || lowerMessage.includes('填充')) {
        return responses['玻尿酸'];
    } else if (lowerMessage.includes('水光')) {
        return responses['水光針'];
    } else if (lowerMessage.includes('雙眼皮') || lowerMessage.includes('雙眼')) {
        return responses['雙眼皮'];
    } else if (lowerMessage.includes('優惠') || lowerMessage.includes('活動') || lowerMessage.includes('便宜')) {
        return responses['優惠'];
    } else {
        return responses['default'];
    }
}

// 生成二维码
function generateQRCode(url) {
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = '';
    
    // 使用 qrcode.js 生成二维码
    const qrcode = new QRCode(qrcodeContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#ff6b8a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // 显示弹窗
    document.getElementById('qrModal').classList.add('active');
}

// 关闭弹窗
function closeModal() {
    document.getElementById('qrModal').classList.remove('active');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎀 小美客服系统已启动');
    
    // 检查 URL 参数，自动显示二维码
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('qr') === 'show') {
        const currentUrl = window.location.href.split('?')[0];
        generateQRCode(currentUrl);
    }
    
    // 点击头部显示二维码
    document.querySelector('.header-info').addEventListener('click', function() {
        const currentUrl = window.location.href.split('?')[0];
        generateQRCode(currentUrl);
    });
});
