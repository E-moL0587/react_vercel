document.addEventListener("DOMContentLoaded", function() {
    var countdownElement = document.getElementById("countdown2");
    var count = 60; // カウントダウンの秒数
  
    function updateCountdown() {
      countdownElement.innerHTML = count + "秒";
  
      if (count === 0) {
        // カウントダウン終了時の処理
        window.location.href = "finish.html";
      } else {
        count--;
        setTimeout(updateCountdown, 1000);
      }
    }
  
    updateCountdown();
  });
