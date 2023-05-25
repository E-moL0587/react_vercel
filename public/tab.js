// タブ
const tabList = document.querySelectorAll('.tab-list-item');
// タブコンテンツ
const tabContent = document.querySelectorAll('.tab-contents-item');
 
//DOMが読み込み終わったら
document.addEventListener('DOMContentLoaded', function(){
  // タブに対してクリックイベントを適用
  for(let i = 0; i < tabList.length; i++) {
    tabList[i].addEventListener('click', tabSwitch);
  }
  // タブをクリックすると実行する関数
  function tabSwitch(){
    // activeクラスを削除
    document.querySelectorAll('.active')[0].classList.remove('active');
    // クリックしたタブにactiveクラスを付与    
    this.classList.add('active');
    // showクラスを削除
    document.querySelectorAll('.show')[0].classList.remove('show');
    // タブを配列風オブジェクトとして定義
    const aryTabs = Array.prototype.slice.call(tabList);
    // クリックしたタブの配列番号を取得     
    const index = aryTabs.indexOf(this);
    // クリックしたタブと同じ配列番号のタブコンテンツにshowクラスを付与    
    tabContent[index].classList.add('show');
  };
});








const tabItems = document.querySelectorAll('.tab-list-item');
const tabContents = document.querySelectorAll('.tab-contents-item');
let currentTab = 0;
let touchStartX = 0;
let codeEnabled = true; // JavaScriptのコードの有効/無効を管理するフラグ

function handleTabClick(index) {
  if (index === currentTab) return;

  tabItems[currentTab].classList.remove('active');
  tabItems[index].classList.add('active');

  tabContents[currentTab].classList.remove('show');
  tabContents[index].classList.add('show');

  currentTab = index;
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  if (!codeEnabled) return; // コードが無効化されている場合、処理を終了

  const touchEndX = event.changedTouches[0].clientX;
  const touchDiffX = touchEndX - touchStartX;

  if (touchDiffX > 50 && currentTab > 0) {
    handleTabClick(currentTab - 1); // 左にスワイプした場合、前のタブを表示
  } else if (touchDiffX < -50 && currentTab < tabItems.length - 1) {
    handleTabClick(currentTab + 1); // 右にスワイプした場合、次のタブを表示
  }
}

// タブのクリックイベントを追加
tabItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (codeEnabled) {
      handleTabClick(index);
    }
  });
});

// タッチイベントを追加
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);

// 設定ボタンのクリックイベントを追加
const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', () => {
  codeEnabled = !codeEnabled; // コードの有効/無効を切り替える

  if (codeEnabled) {
    toggleButton.textContent = '無効化';
  } else {
    toggleButton.textContent = '有効化';
  }
});
