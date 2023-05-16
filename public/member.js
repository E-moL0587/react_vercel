var members = [
    {
      name: "E_moL(部長)",
      position: "ピカチュウ",
      introduction: "エモルです。よく顔文字使います。",
      photo: 'https://archives.bulbagarden.net/media/upload/thumb/c/c4/0025Pikachu-Unova.png/150px-0025Pikachu-Unova.png'
    },
    {
      name: "hako(副部長)",
      position: "聞いておきます",
      introduction: "ユナイトマスターです。",
      photo: 'https://archives.bulbagarden.net/media/upload/thumb/b/bb/0025Pikachu-Sinnoh.png/150px-0025Pikachu-Sinnoh.png'
    },
    {
      name: "neko",
      position: "nuko",
      introduction: "neko master desu",
      photo: '00125.gif'
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

    var photoPara = document.createElement("img");
    photoPara.src = member.photo;
    memberDiv.appendChild(photoPara);

    membersContainer.appendChild(memberDiv);
  });