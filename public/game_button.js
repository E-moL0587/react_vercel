document.addEventListener('keydown', function(event) {
    if (event.key === 37) { // 左矢印キー
      document.getElementById('leftButton').click();
    } else if (event.key === 39) { // 右矢印キー
      document.getElementById('rightButton').click();
    }
  });
  