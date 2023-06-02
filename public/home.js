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
