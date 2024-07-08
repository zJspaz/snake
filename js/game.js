(function () {
  const FPS = 10;
  const SIZE = 40;

  let pause = false;
  let intervalId;
  let board;
  let snake;
  let food;

  console.log(food);

  function init() {
    board = new Board(SIZE);
    snake = new Snake([
      [4, 4],
      [4, 5],
      [4, 6],
    ]);
    food = new Food();
    intervalId = setInterval(run, 1000 / FPS);
  }

  function reset() {
    const table = document.getElementById("board");
    alert("Game Over!");
    // table.remove();
    clearInterval(intervalId);
    // init();
  }

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snake.direction !== 2 && snake.changeDirection(0);
        break;
      case "ArrowRight":
        snake.direction !== 3 && snake.changeDirection(1);
        break;
      case "ArrowDown":
        snake.direction !== 0 && snake.changeDirection(2);
        break;
      case "ArrowLeft":
        snake.direction !== 1 && snake.changeDirection(3);
        break;
      case "r":
        reset();
        break;
      case "p":
        pause = !pause;
        pause ? alert("Pause!") : alert("Retornando!");
        break;
      default:
        break;
    }
  });

  class Board {
    constructor(size) {
      this.element = document.createElement("table");
      this.element.setAttribute("id", "board");
      this.color = "#ccc";
      document.body.appendChild(this.element);
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field);
        }
      }
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
      this.body.forEach(
        (field) =>
          (document.querySelector(
            `#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`
          ).className = "snake")
      );
    }
    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]];
          break;
        case 1:
          newHead = [head[0], head[1] + 1];
          break;
        case 2:
          newHead = [head[0] + 1, head[1]];
          break;
        case 3:
          newHead = [head[0], head[1] - 1];
          break;
        default:
          break;
      }

      console.log("a");
      if (
        newHead[0] < 0 ||
        newHead[0] > SIZE ||
        newHead[1] < 0 ||
        newHead[1] > SIZE
      ) {
        reset();
      }

      this.body.push(newHead);
      const oldTail = this.body.shift();
      document.querySelector(
        `#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`
      ).className = "snake";

      document.querySelector(
        `#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`
      ).className = null;

      if (
        this.body[this.body.length - 1][0] === food.position[0] &&
        this.body[this.body.length - 1][1] === food.position[1]
      ) {
        // Increase snake size
        this.body.unshift([...this.body[0]]);
        
        document.querySelector(
          `#board tr:nth-child(${food.position[0]}) td:nth-child(${food.position[1]})`
        ).id = null;
        
        // Update food position
        food.position = food.generateRandomPosition();
      }
    }
    changeDirection(direction) {
      this.direction = direction;
    }
  }

  class Food {
    constructor() {
      this.position = this.generateRandomPosition();
    }

    generateRandomPosition() {
      const x = Math.floor(Math.random() * SIZE);
      const y = Math.floor(Math.random() * SIZE);

      document.querySelector(
        `#board tr:nth-child(${x}) td:nth-child(${y})`
      ).id = "food";

      return [x, y];
    }
  }

  function run() {
    !pause && snake.walk();
  }
  init();
})();
