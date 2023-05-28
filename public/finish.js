const level = localStorage.getItem('level');

document.addEventListener("DOMContentLoaded", function() {
    var restartButton = document.getElementById("restartButton");
    var endButton = document.getElementById("endButton");
  
    restartButton.addEventListener("click", function() {
      if (level === "hard") {
        window.location.href = "question_hard.html";
      } else if (level === "expert") {
        window.location.href = "question_expert.html";
      } else {
        window.location.href = "index.html";
      }
    });

    endButton.addEventListener("click", function() {
      // おわるボタンがクリックされた時の処理
      window.location.href = "index.html";
    });
  });

// スコアの取得
const totalScore = localStorage.getItem('totalScore');

// スコアを表示する要素を取得
const scoreElement = document.getElementById('score');

// スコアを要素に反映
scoreElement.textContent = `総ポイントは ${totalScore}p です！`;