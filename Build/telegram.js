class TelegramBot { 
  constructor(token) {
    this.token = token;
  }

  setUserInfo(userId, messageId){
    this.user_id = userId;
    this.message_id = messageId;    
  }

  async sendGame(chatId, gameShortName){
    const response = await fetch(`https://api.telegram.org/bot${this.token}/sendGame`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        game_short_name: gameShortName
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return await response.json();
  }

  async sendMessage(chatId, message) {
    const response = await fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return await response.json();
  }

  async setGameScore(userId, score, chatId, messageId) {
    const response = await fetch(`https://api.telegram.org/bot${this.token}/setGameScore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        score: score,
        chat_id: chatId,
        message_id: messageId
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to set game score: ${response.statusText}`);
    }

    return await response.json();
  }

  async getGameHighScores(userId, chatId, messageId){
    //const response = await fetch(`https://api.telegram.org/bot${this.token}/getGameHighScores?user_id=${userId}&chat_id=${chatId}&message_id=${messageId}`, {
    const response = await fetch(`https://api.telegram.org/bot${this.token}/getGameHighScores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        chat_id: chatId,
        message_id: messageId
      })
    });
    if (!response.ok) {
      throw new Error(`Failed to get game high score: ${response.statusText}`);
    }
    return await response.json();
  }

  inviteFriend(gameShortName){
    //const gameInviteUrl = `https://t.me/${botUserName}?game=${gameShortName}&user=${userId}`;
    const gameInviteUrl = `https://t.me/${this.token}?start=${gameShortName}`;
    
    window.open(gameInviteUrl, '_blank');
  }
}

// Ensure the class is available globally
window.TelegramBot = TelegramBot;