// ChatGPT APIのエンドポイントURL
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// OpenAI APIキー
// const apiKey = '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';

// ユーザー入力と応答のログを保持する変数
let chatLog = [];

// メッセージを送信する関数
async function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  appendMessage('user', userInput);

  // ChatGPT APIへのリクエストペイロードの設定
  const payload = {
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: userInput },
    ],
  };

  try {
    // ChatGPT APIへのPOSTリクエストの送信
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const modelReply = data.choices[0].message.content;
    appendMessage('assistant', modelReply);
  } catch (error) {
    console.error('Error:', error);
  }
}

// メッセージをログに追加し、チャットウィンドウに表示する関数
function appendMessage(role, content) {
  const chatLogContainer = document.getElementById('chat-log');
  const messageElement = document.createElement('div');
  messageElement.classList.add(role);
  messageElement.innerText = content;
  chatLogContainer.appendChild(messageElement);
}

// ユーザー入力フィールドでEnterキーが押されたときにメッセージを送信する処理
document.getElementById('user-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

