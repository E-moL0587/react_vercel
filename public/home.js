// スライダー要素を取得
var slider = document.querySelector('.slider');
var slides = document.querySelector('.slides');
var slideCount = slides.children.length;
var currentIndex = 0;
var interval = 3000; // スライドが切り替わるまでの時間（ミリ秒）

function nextSlide() {
  currentIndex = (currentIndex + 1) % slideCount;
  slides.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
}

setInterval(nextSlide, interval);

    // 楕円のパラメータ
    var centerX = 135;  // 楕円の中心のX座標
    var centerY = 450;  // 楕円の中心のY座標
    var radiusX = 100;  // X軸方向の半径
    var radiusY = 50;  // Y軸方向の半径
    var speed = 0.01;   // 点の移動速度

    // ポイントの要素を取得
    var points = document.getElementsByClassName('point');

    // アニメーションを開始
    var angle = 0;
    var intervalId = setInterval(function() {
      for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var x = centerX + Math.cos(angle) * radiusX;
        var y = centerY + Math.sin(angle) * radiusY;
        point.style.left = x + 'px';
        point.style.top = y + 'px';
        angle += speed;
      }
    }, 10); // アニメーションの更新間隔（ミリ秒）
