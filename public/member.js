var members = [
  {
    id: "S212084",
    name: "T_Kaito (部長)",
    position: "理工学部情報科学科3年",
    introduction: "ポケモンサークルの創設者であり、現部長を務めさせて頂いております。ポケモン関連でしたらある程度は分かります。不束者では御座いますが、何卒よろしくお願いいたします。",
    photo: 'image_bw/ピカチュウ.png'
  },
  {
    id: "E221059",
    name: "H_Kouta (副長)",
    position: "経済学部経済数理学科2年",
    introduction: "ポケモンサークルの2代目副部長です。常に責任感を持ち、サークルをより良くしようと考えてくれています！専門はポケモンユナイトとポケモンSVであり、新入生にとっては頼りになる先輩です！",
    photo: 'image_bw/ボルトロスR.png'
  },
  {
    id: "J212114",
    name: "N_Hiraku",
    position: "法学部政治学科3年",
    introduction: "サークルでは唯一の法学部生です。SVのシングル対戦を専門とし、サーフゴーや様々なポケモンを複数匹育成しています！また、対戦や構築に関しては1番詳しく、さらに部員に対してとても優しいのが印象的です！",
    photo: 'image_bw/ウルガモス.png'
  },
  {
    id: "L211043",
    name: "K_Naoki",
    position: "文学部英文学科2年",
    introduction: "4月から新しく入部してくれた文学部の子です。趣味は吉祥寺近辺の美味しいお店を巡ることで、出会った際にはお店を紹介してもらえるかもしれません！",
    photo: 'image_bw/メタモン.png'
  },
  {
    id: "S235036",
    name: "K_Naoto",
    position: "理工学部コンピュータ科学科1年",
    introduction: "4月から新しく入部してくれた理工学部の子です。ポケモンユナイトを専門とし、マスター帯(最高ランク)を目指して日々頑張っております！好きなポケモンはシャンデラで、ユナイトに実装された際にはとても喜んでおりました！",
    photo: 'image_bw/シャンデラ.png'
  },
  {
    id: "E232048",
    name: "K_Kouta",
    position: "経済学部現代経済学科1年",
    introduction: "4月から新しく入部してくれた経済学部の子です。ユナイトではイワパレスをよく使っており、SVのシーズン5では約15000位と猛者がいる環境でも諦めず頑張っております！",
    photo: 'image_bw/サザンドラ.png'
  },
  {
    id: "A000000",
    name: "Name",
    position: "Position",
    introduction: "Profile",
    photo: 'image_bw/イーブイ.png'
  }
  // こちらに他の部員の情報を追加していきます。
];

var members2 = [
  {
    name: "T_Kaito (部長)"
  },
  {
    name: "H_Kouta (副長)"
  },
  {
    name: "N_Hiraku"
  },
  {
    name: "K_Naoki"
  },
  {
    name: "K_Naoto"
  },
  {
    name: "K_Kouta"
  },
  {
    name: "Name"
  }
  // こちらに他の部員の情報を追加していきます。
];

var membersContainer = document.getElementById("members");
var membersButton = document.getElementById("membersButton");

function displayMembers(membersData) {
  // 現在のメンバーをクリア
  membersContainer.innerHTML = "";

  membersData.forEach(function(member) {
    var memberDiv = document.createElement("div");
    memberDiv.className = "member";

    var nameHeading = document.createElement("h2");
    nameHeading.textContent = member.name;
    memberDiv.appendChild(nameHeading);

    if (member.position) {
      var positionPara = document.createElement("p");
      positionPara.textContent = "専攻: " + member.position;
      memberDiv.appendChild(positionPara);
    }

    if (member.introduction) {
      var introductionPara = document.createElement("p");
      introductionPara.textContent = member.introduction;
      memberDiv.appendChild(introductionPara);
    }

    if (member.photo) {
      var photoPara = document.createElement("img");
      photoPara.src = member.photo;
      memberDiv.appendChild(photoPara);
    }

    membersContainer.appendChild(memberDiv);
  });
}

// "members"ボタンの初期表示
displayMembers(members);

// "members2"ボタンのクリックイベントリスナー
membersButton.addEventListener("click", function() {
  if (membersButton.textContent === "簡易表記") {
    membersButton.textContent = "完全表記";
    displayMembers(members2);
  } else {
    membersButton.textContent = "簡易表記";
    displayMembers(members);
  }
});

// 一人のメンバーを表示するボタンのクリックイベントリスナー
var memberButton = document.getElementById("memberButton");
memberButton.addEventListener("click", function() {
  var memberId = document.getElementById("memberIdInput").value;
  var selectedMember = findMemberById(memberId);
  displayMembers([selectedMember]);
});

// メンバーのIDに基づいて対応するメンバーオブジェクトを取得する関数
function findMemberById(id) {
  var selectedMember = null;
  members.forEach(function(member) {
    if (member.id === id) {
      selectedMember = member;
      return; // ループから抜ける
    }
  });
  return selectedMember;
}




const tabItems = document.querySelectorAll('.tab-list-item');
const tabContents = document.querySelectorAll('.tab-contents-item');
let currentTab = 0;
let touchStartX = 0;

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
  item.addEventListener('click', () => handleTabClick(index));
});

// タッチイベントを追加
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);