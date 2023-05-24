document.addEventListener("DOMContentLoaded", function() {
    var restartButton = document.getElementById("restartButton");
    var endButton = document.getElementById("endButton");
  
    restartButton.addEventListener("click", function() {
      // もう一度ボタンがクリックされた時の処理
      window.location.href = "countdown.html";
    });
  
    endButton.addEventListener("click", function() {
      // おわるボタンがクリックされた時の処理
      window.location.href = "index.html"; // ここではindex.htmlにリダイレクトしていますが、適宜変更してください。
    });
  });

// スコアの取得
const totalScore = localStorage.getItem('totalScore');

// スコアを表示する要素を取得
const scoreElement = document.getElementById('score');

// スコアを要素に反映
scoreElement.textContent = `総ポイントは ${totalScore}p です！`;