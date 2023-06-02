// キャンバスの初期化
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// キャンバスのサイズをウィンドウサイズに合わせる
canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.8;

// パーティクルの設定
const particleCount = 6;  // パーティクルの数
const particles = [];

// マウスやタッチの位置を追跡する変数
let mouseX = 0;
let mouseY = 0;

// パーティクルオブジェクトの定義
class Particle {
  constructor(x, y, size, spriteURL, shinySpriteURL, name) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;  // パーティクルの密度
    this.spriteURL = spriteURL;
    this.isShiny = Math.random() < 0.05;  // 30%の確率で色違いになる
    this.sprite = new Image();
    this.sprite.src = this.isShiny ? shinySpriteURL : spriteURL;
    this.name = name;
    this.showName = false;  // 名前を表示するかどうかのフラグ
    this.nameTimeout = null;  // 名前表示のタイムアウトの参照
  }

  // ポケモンの名前を表示する
  displayName() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000000';  // 名前の色
    ctx.textAlign = 'center';
    ctx.fillText(this.name, this.x, this.y + this.size / 2 + 20);
  }

  calculateDistance(otherParticle) {
    const dx = otherParticle.x - this.x;
    const dy = otherParticle.y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  // 名前の表示を開始する
  startNameTimeout() {
    if (this.nameTimeout) {
      clearTimeout(this.nameTimeout);
    }
    this.showName = true;
    this.nameTimeout = setTimeout(() => {
      this.showName = false;
    }, 3000);  // 3秒後に名前の表示を終了する
  }

  update() {
    particles.forEach(otherParticle => {
      if (otherParticle !== this) {
        const distance = this.calculateDistance(otherParticle);
        const minDistance = this.size + otherParticle.size;  // パーティクル同士の最小距離

        if (distance < minDistance) {
          const dx = otherParticle.x - this.x;
          const dy = otherParticle.y - this.y;
          const angle = Math.atan2(dy, dx);
          const targetX = this.x + Math.cos(angle) * minDistance;
          const targetY = this.y + Math.sin(angle) * minDistance;
          const offsetX = (targetX - otherParticle.x) * 0.1;  // 調整係数
          const offsetY = (targetY - otherParticle.y) * 0.1;  // 調整係数

          this.x -= offsetX;
          this.y -= offsetY;
          otherParticle.x += offsetX;
          otherParticle.y += offsetY;
        }
      }
    });

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const maxDistance = 30;
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
    if (this.isShiny) {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');  // 黄色 (RGBA値: 255, 255, 0)
      gradient.addColorStop(0.2, 'rgba(255, 255, 0, 0.4)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
  
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  
    ctx.drawImage(this.sprite, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
  
}

// パーティクルの初期化
async function init() {
  for (let i = 0; i < particleCount; i++) {
    const size = 80; // パーティクルのサイズ
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;

    let pokemonData = null;
    let spriteURL = null;
    let shinySpriteURL = null;
    let name = null;

    // ランダムなポケモンのデータを取得し、画像のURLと名前を設定
    while (!spriteURL) {
      pokemonData = await getRandomPokemon();
      spriteURL = pokemonData.sprites.front_default;
      shinySpriteURL = pokemonData.sprites.front_shiny;
      name = pokemonData.name;
    }

    const particle = new Particle(x, y, size, spriteURL, shinySpriteURL, name);
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

    if (particle.showName) {
      particle.displayName();
    }
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

// パーティクルのクリックイベントを追加
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  particles.forEach(particle => {
    if (x > particle.x - particle.size / 2 &&
        x < particle.x + particle.size / 2 &&
        y > particle.y - particle.size / 2 &&
        y < particle.y + particle.size / 2) {
      particle.startNameTimeout();
    }
  });
});
