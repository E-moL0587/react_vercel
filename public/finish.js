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

const name = "John";








// Firebaseの初期化
const firebaseConfig = {
  apiKey: "AIzaSyBWi_KKj_5gr4pGrgn-44Z5WtQAitY2ZZo",
  authDomain: "my-quiz-project-3276.firebaseapp.com",
  projectId: "my-quiz-project-3276",
  storageBucket: "my-quiz-project-3276.appspot.com",
  messagingSenderId: "99054183032",
  appId: "1:99054183032:web:648f75961325fcd8e9838d",
  measurementId: "G-S21JNHP3CF"
};
firebase.initializeApp(firebaseConfig);

// データベース参照の作成
var database = firebase.database();

// スコアの取得

// データの保存
var scoreRef = database.ref('scores');
scoreRef.push({
  totalScore: totalScore,
  name: name
});

// ランキングの表示
var rankingRef = database.ref('scores').orderByChild('totalScore').limitToLast(10);
rankingRef.on('value', function(snapshot) {
  var rankingTable = document.getElementById('ranking');
  var rankingBody = rankingTable.querySelector('tbody');

  // ランキングテーブルの内容をリセット
  rankingBody.innerHTML = '';

  // スナップショットからデータを取得してランキングを作成
  var rankingData = [];
  snapshot.forEach(function(childSnapshot) {
    var scoreData = childSnapshot.val();
    rankingData.push(scoreData);
  });

  // ランキングをソートして表示
  rankingData.sort(function(a, b) {
    return b.totalScore - a.totalScore;
  });

  rankingData.forEach(function(score, index) {
    var row = document.createElement('tr');
    var rankCell = document.createElement('td');
    var nameCell = document.createElement('td');
    var scoreCell = document.createElement('td');

    rankCell.textContent = index + 1;
    nameCell.textContent = score.name;
    scoreCell.textContent = score.totalScore;

    row.appendChild(rankCell);
    row.appendChild(nameCell);
    row.appendChild(scoreCell);

    rankingBody.appendChild(row);
  });
});