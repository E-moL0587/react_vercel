import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          <font face="serif">成蹊大学ポケモンサークル</font><br></br>
          <font size="500" color="yellow">蹊モンガ</font>
        </h2>
        <img src="https://archives.bulbagarden.net/media/upload/6/60/Spr_5b_587_s.png" className="App-logo" alt="logo" />
        <p>
          (※公式webサイトを作成中です)
        </p>

        <a
          className="App-link"
          href="https://twitter.com/seikei_Pokecir"
          target="_blank"
          rel="noopener noreferrer"
        >
          ポケモンサークル公式Twitter
        </a>

        <p>
         新入生の皆様、ご入学おめでとうございます！<br></br><br></br>
         成蹊大学ポケモンサークル 蹊モンガ は、<br></br>
         ポケモンが大好きな人が集まるサークルです！<br></br>
        </p>
        <img src={"mypika.jpg"} alt="gphoto1" width="200" />
         <br></br>
        <img src={"emol.jpg"} alt="gphoto2" width="200" />
         <br></br>

      </header>
    </div>
  );
}

export default App;
