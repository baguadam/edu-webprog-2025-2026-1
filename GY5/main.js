class Entity {
  constructor(x, y, icon, cssClass) {
    this.x = x;
    this.y = y;
    this.icon = icon;
    this.cssClass = cssClass;
  }

  setPosition(x, y) {
    if (x <= 0) {
      this.x = 0;
    }
    if (y <= 0) {
      this.y = 0;
    }
    this.x = x;
    this.y = y;
  }
}

class Player extends Entity {
  constructor(x, y) {
    super(x, y, "🙀", "player");
  }
}

class Cop extends Entity {
  constructor(x, y) {
    super(x, y, "🚨", "cop");
  }
}

class Collectible extends Entity {
  constructor(x, y) {
    super(x, y, "🍯", "collectible");
  }
}

class Grid {
  constructor(size, root) {
    this.size = size;
    this.rootElem = root;
    this.cells = Array.from({ length: size }, () => Array(this.size));
    this.generate();
  }

  generate() {
    this.rootElem.innerHTML = "";
    this.rootElem.style.gridTemplateColumns = `repeat(${this.size}, 30px)`;
    this.rootElem.style.gridTemplateRows = `repeat(${this.size}, 30px)`;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        this.rootElem.appendChild(div);
        this.cells[x][y] = div;
      }
    }
  }

  clearCell() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const cell = this.cells[x][y];
        cell.textContent = "";
        cell.className = "cell";
      }
    }
  }

  setCell(x, y, icon, cssClass) {
    this.cells[x][y].innerText = icon;
    this.cells[x][y].classList.add(cssClass);
  }

  getCell() {
    return this.cells[x][y];
  }
}

class Game {
  constructor(size, root, statusEl, numOfCollectibles) {
    this.size = size;
    this.statusEl = statusEl;
    this.numOfCollectibles = numOfCollectibles;

    this.grid = new Grid(size, root);
    this.player = null;
    this.cop = null;
    this.collectibles = new Map();

    this.running = false;
    this._copTimer = null;
  }

  // *****************************************************
  // Fő metódusok: játék indítása, játék vége, renderelés
  // *****************************************************
  start() {
    // this.stopCop();
    this.running = true;
    this.collectibles.clear();

    this.player = new Player(...this.getRandomPositon());
    this.cop = new Cop(...this.getRandomPositon());
    for (let i = 0; i < this.numOfCollectibles; i++) {
      const [x, y] = this.getRandomPositon();
      this.collectibles.set(`${x}${y}`, new Collectible(x, y));
    }

    this._copTimer = setInterval(() => this.moveCop(), 2000);

    window.addEventListener("keydown", this._onKeyDown);
    if (this.statusEl) {
      this.statusEl.textContent = "A játék elkezdődött!";
    }
    this.render();
  }

  endGame(win) {
    this.statusEl.textContent = win ? "Győzelem" : "Vereség";
    this.running = false;
    clearInterval(this._copTimer);
    window.removeEventListener("keydown", this._onKeyDown);
  }

  render() {
    this.grid.clearCell();
    for (const object of this.collectibles.values()) {
      this.grid.setCell(object.x, object.y, object.icon, object.cssClass);
    }
    this.grid.setCell(
      this.player.x,
      this.player.y,
      this.player.icon,
      this.player.cssClass
    );
    this.grid.setCell(this.cop.x, this.cop.y, this.cop.icon, this.cop.cssClass);
  }

  // *****************************************************
  // Mozgás
  // *****************************************************
  movePlayer(dx, dy) {
    if (!this.running) {
      return;
    }

    const newX = this.player.x + dx;
    const newY = this.player.y + dy;
    if (this.isBound(newX, newY)) {
      return;
    }

    this.player.setPosition(newX, newY);

    if (this.collectibles.has(`${newX}${newY}`)) {
      this.collectibles.delete(`${newX}${newY}`);
      if (this.statusEl) {
        this.statusEl.textContent = `${this.collectibles.size}`;
      }
    }

    // Győzelem vagy vereség kezelése
    if (this.collectibles.size === 0) {
      this.render();
      this.endGame(true);
      return;
    }
    if (this.player.x === this.cop.x && this.player.y === this.cop.y) {
      this.render();
      this.endGame(false);
      return;
    }

    this.render();
  }

  moveCop() {
    if (!this.running) {
      return;
    }

    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    const options = dirs
      .map(([dx, dy]) => [this.cop.x + dx, this.cop.y + dy])
      .filter(([nx, ny]) => !this.isBound(nx, ny));
    if (options.length) {
      const [nx, ny] = options[Math.floor(Math.random() * options.length)];
      this.cop.setPosition(nx, ny);
    }

    if (this.player.x === this.cop.x && this.player.y === this.cop.y) {
      this.endGame(false);
    }
    this.render();
  }

  // *****************************************************
  // Helper metódusok
  // *****************************************************
  isOccupied(x, y) {
    if (this.player && x === this.player.x && this.player.y === y) {
      return true;
    }
    if (this.cop && this.cop.x === x && this.cop.y === y) {
      return true;
    }
    return this.collectibles.has(`${x}${y}`);
  }

  getRandomPositon() {
    while (true) {
      const x = Math.floor(Math.random() * this.size);
      const y = Math.floor(Math.random() * this.size);

      if (!this.isOccupied(x, y)) {
        return [x, y];
      }
    }
  }

  isBound(x, y) {
    return x < 0 || x >= this.size || y < 0 || y >= this.size;
  }

  // *****************************************************
  // Event handler metódusok
  // *****************************************************
  _onKeyDown = (e) => {
    const keyMap = new Map([
      ["ArrowUp", [-1, 0]], // egyet felfelé lépünk, stb, mivel tömbök tömbje van, az első koordináta a sor
      ["ArrowDown", [1, 0]],
      ["ArrowLeft", [0, -1]],
      ["ArrowRight", [0, 1]],
    ]);
    if (keyMap.has(e.key)) {
      const [dx, dy] = keyMap.get(e.key);
      this.movePlayer(dx, dy);
    }
  };
}

const gridRoot = document.querySelector("#grid");
const startButton = document.querySelector("#start-btn");
const statusElement = document.querySelector("#status");

const game = new Game(10, gridRoot, statusElement, 5);
startButton.addEventListener("click", () => game.start());
