class Utils {
  static getKey(x, y) {
    return `${x}-${y}`;
  }
}

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

  clearCells() {
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

  isOccupied(x, y) {
    if (this.player && x === this.player.x && this.player.y === y) {
      return true;
    }
    if (this.cop && this.cop.x === x && this.cop.y === y) {
      return true;
    }
    return this.collectibles.has(Utils.getKey(x, y));
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

  render() {
    this.grid.clearCells();
    this.grid.setCell(
      this.player.x,
      this.player.y,
      this.player.icon,
      this.player.cssClass
    );
    this.grid.setCell(this.cop.x, this.cop.y, this.cop.icon, this.cop.cssClass);
    for (let collectible of this.collectibles.values()) {
      this.grid.setCell(
        collectible.x,
        collectible.y,
        collectible.icon,
        collectible.cssClass
      );
    }
  }

  start() {
    this.running = true;
    this.collectibles.clear();
    this.player = new Player(...this.getRandomPositon());
    this.cop = new Cop(...this.getRandomPositon());
    for (let i = 0; i < this.numOfCollectibles; i++) {
      const [x, y] = this.getRandomPositon();
      this.collectibles.set(Utils.getKey(x, y), new Collectible(x, y));
    }

    this._copTimer = setInterval(() => this.moveCop(), 1000);
    window.addEventListener("keydown", this._onKeyDown);

    this.statusEl.textContent = "A játék elkezdődött!";
    this.render();
  }

  isValidPosition(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  moveCop() {
    if (!this.running) {
      return;
    }

    const directions = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ];

    const idx = Math.floor(Math.random() * directions.length); // 0-3
    const [dx, dy] = directions[idx];

    const newX = this.cop.x + dx;
    const newY = this.cop.y + dy;
    if (
      this.isValidPosition(newX, newY) &&
      !this.collectibles.has(Utils.getKey(newX, newY))
    ) {
      this.cop.setPosition(newX, newY);
      if (newX === this.player.x && newY === this.player.y) {
        this.endGame(false);
      }
    }

    this.render();
  }

  endGame(win) {
    this.statusEl.textContent = win ? "Győzelem" : "Vereség";
    this.running = false;
    clearInterval(this._copTimer);
    window.removeEventListener("keydown", this._onKeyDown);
  }

  _onKeyDown = (e) => {
    if (!this.running) {
      return;
    }

    let dx = 0;
    let dy = 0;
    switch (e.key) {
      case "ArrowUp":
        dx = -1;
        break;
      case "ArrowDown":
        dx = 1;
        break;
      case "ArrowLeft":
        dy = -1;
        break;
      case "ArrowRight":
        dy = 1;
        break;
    }

    const newX = this.player.x + dx;
    const newY = this.player.y + dy;
    if (this.isValidPosition(newX, newY)) {
      this.player.setPosition(newX, newY);

      if (this.collectibles.has(Utils.getKey(newX, newY))) {
        this.collectibles.delete(Utils.getKey(newX, newY));
        this.statusEl.textContent = `Maradék objektumok: ${this.collectibles.size}`;

        if (this.collectibles.size === 0) {
          this.endGame(true);
          this.render();
          return;
        }
      }

      if (newX === this.cop.x && newY === this.cop.y) {
        this.endGame(false);
        this.render();
        return;
      }
    }

    this.render();
  };
}

const gridRoot = document.querySelector("#grid");
const startButton = document.querySelector("#start-btn");
const statusEl = document.querySelector("#status");

const game = new Game(10, gridRoot, statusEl, 5);
startButton.addEventListener("click", () => game.start());
