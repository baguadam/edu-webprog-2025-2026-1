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
}

const gridRoot = document.querySelector("#grid");
const grid = new Grid(10, gridRoot);
