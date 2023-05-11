import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>成蹊大学ポケモンサークル</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          (※成蹊大学ポケモンサークルのwebサイトを作成中です)
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
         新入生の皆様、ご入学おめでとうございます！( ⌯'-'⌯)<br></br>
         成蹊大学ポケモンサークル 蹊モンガ では、<br></br>
         ポケモンに関する研究を中心として、<br></br>
         お互いの意見交換の場として活動していきます。<br></br>
         たくさんの人にポケモンの魅力を伝えていきたいです！
        </p>
        <img src={"mypika.jpg"} alt="gphoto1" width="500" />
        <p>
         <br></br>
        </p>
        <img src={"emol.jpg"} alt="gphoto2" width="500" />
        <p>
         <br></br>
         <br></br>
         <br></br>
        </p>


      </header>
    </div>
  );
}

export default App;
