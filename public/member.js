var members = [
    {
      name: "T_Kaito",
      position: "理工学部情報科学科3年",
      introduction: "ポケモンサークルの創設者であり、現部長を務めさせて頂いております。ポケモン関連でしたらある程度は分かります。不束者では御座いますが、何卒よろしくお願いいたします。",
      photo: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png'
    },
    {
      name: "H_Kouta",
      position: "経済学部経済数理学科2年",
      introduction: "ポケモンサークルの2代目副部長です。常に責任感を持ち、サークルをより良くしようと考えてくれています！専門はポケモンユナイトとポケモンSVであり、新入生にとっては頼りになる先輩です！",
      photo: 'https://archives.bulbagarden.net/media/upload/8/89/Spr_5b2_133_s.png'
    },
    {
      name: "K_Naoki",
      position: "文学部英文学科2年",
      introduction: "4月から新しく入部してくれた文学部の子です。趣味は吉祥寺近辺の美味しいお店を巡ることで、出会った際にはお店を紹介してもらえるかもしれません！",
      photo: 'https://archives.bulbagarden.net/media/upload/9/90/Spr_5b_132_s.png'
    },
    {
      name: "Name",
      position: "Position",
      introduction: "Profile",
      photo: 'Photo'
    }
    // こちらに他の部員の情報を追加していきます。
  ];
  
  var membersContainer = document.getElementById("members");
  
  members.forEach(function(member) {
    var memberDiv = document.createElement("div");
    memberDiv.className = "member";
  
    var nameHeading = document.createElement("h2");
    nameHeading.textContent = member.name;
    memberDiv.appendChild(nameHeading);
  
    var positionPara = document.createElement("p");
    positionPara.textContent = "専攻: " + member.position;
    memberDiv.appendChild(positionPara);
  
    var introductionPara = document.createElement("p");
    introductionPara.textContent = member.introduction;
    memberDiv.appendChild(introductionPara);

    var photoPara = document.createElement("img");
    photoPara.src = member.photo;
    memberDiv.appendChild(photoPara);

    membersContainer.appendChild(memberDiv);
  });