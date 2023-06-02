document.addEventListener("DOMContentLoaded", function() {
  var loadingScreen = document.getElementById("loading-screen");
  
  // ページの読み込みが完了したらローディング画面を非表示にする
  window.addEventListener("load", function() {
    loadingScreen.style.display = "none";
  });
});
