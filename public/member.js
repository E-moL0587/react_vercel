var members = [
    {
      name: "E_moL(部長)",
      position: "ピカチュウ",
      introduction: "エモルです。よく顔文字を使います。"
    },
    {
      name: "hako(副部長)",
      position: "聞いておきます",
      introduction: "ユナイトマスターです。"
    },
    {
      name: "neko",
      position: "neko",
      introduction: "neko master desu"
    },
    // 他の部員の情報も追加できます
  ];
  
  var membersContainer = document.getElementById("members");
  
  members.forEach(function(member) {
    var memberDiv = document.createElement("div");
    memberDiv.className = "member";
  
    var nameHeading = document.createElement("h2");
    nameHeading.textContent = member.name;
    memberDiv.appendChild(nameHeading);
  
    var positionPara = document.createElement("p");
    positionPara.textContent = "好きなポケモン: " + member.position;
    memberDiv.appendChild(positionPara);
  
    var introductionPara = document.createElement("p");
    introductionPara.textContent = member.introduction;
    memberDiv.appendChild(introductionPara);
  
    membersContainer.appendChild(memberDiv);
  });