// キャンバスの初期化
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// キャンバスのサイズをウィンドウサイズに合わせる
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight;

// パーティクルの設定
const particleCount = 6;  // パーティクルの数
const particles = [];

// マウスやタッチの位置を追跡する変数
let mouseX = 0;
let mouseY = 0;

// パーティクルオブジェクトの定義
class Particle {
  constructor(x, y, size, spriteURL) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;  // パーティクルの密度
    this.spriteURL = spriteURL;
    this.sprite = new Image();
    this.sprite.src = spriteURL;
  }

  update() {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const maxDistance = 100;
    const force = (maxDistance - distance) / maxDistance;
    const directionX = forceDirectionX * force * this.density;
    const directionY = forceDirectionY * force * this.density;

    if (distance < maxDistance) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }

  draw() {
    ctx.drawImage(this.sprite, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
}

// パーティクルの初期化
async function init() {
  for (let i = 0; i < particleCount; i++) {
    const size = 80; // パーティクルのサイズ
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;

    const pokemonData = await getRandomPokemon();
    const spriteURL = pokemonData.sprites.front_default;

    const particle = new Particle(x, y, size, spriteURL);
    particles.push(particle);
  }
}

// PokeAPIからランダムなポケモンのデータを取得
async function getRandomPokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  const pokemonURL = data.results[randomIndex].url;

  const pokemonResponse = await fetch(pokemonURL);
  const pokemonData = await pokemonResponse.json();
  return pokemonData;
}

// マウスやタッチの位置を更新
function updateMousePosition(e) {
  mouseX = e.x;
  mouseY = e.y;
}

// アニメーションの描画
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

// ページの読み込み完了時に初期化とアニメーションを開始
window.addEventListener('load', () => {
  init();
  animate();
});

// マウスやタッチの位置を更新
window.addEventListener('mousemove', updateMousePosition);
window.addEventListener('touchmove', (e) => {
  updateMousePosition(e.touches[0]);
});

