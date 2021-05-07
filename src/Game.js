export default class Game {
  static points = {
    '1': 40,
    '2': 100,
    '3': 300,
    '4': 1200,
  };

  score = 0;
  lines = 0;
  playfield = this.createPlayfield();
  activePiece = this.createPiece();
  nextPiece = this.createPiece();

  get level() {
    return Math.floor(this.lines * 0.1);
  }

  getState() {
    const playfield = this.createPlayfield();

    for (let y = 0; y < this.playfield.length; y++) {
      for (let x = 0; x < this.playfield[y].length; x++) {
        playfield[y][x] = this.playfield[y][x];
      }
    }

    for (let y = 0; y < this.activePiece.blocks.length; y++) {
      for (let x = 0; x < this.activePiece.blocks[y].length; x++) {
        if (this.activePiece.blocks[y][x]) {
          playfield[y + this.activePiece.y][x + this.activePiece.x] = this.activePiece.blocks[y][x];
        }
      }
    }

    return {
      playfield,
      score: this.score,
      level: this.level,
      lines: this.lines,
      nextPiece: this.nextPiece,
    }
  }

  createPlayfield() {
    const playfield = [];

    for (let y = 0; y < 20; y++) {
      playfield[y] = [];
      for (let x = 0; x < 10; x++) {
        playfield[y][x] = 0;
      }
    }

    return playfield;
  }

  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.isCollision()) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    if (this.isCollision()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    this.activePiece.y += 1;

    if (this.isCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      const deletedLines = this.deleteLines();
      this.updateScore(deletedLines);
      this.updatePieces();
    }
  }

  rotatePiece() {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;

    const temp = [];
    for (let i = 0; i < length; i++) {
      temp[i] = new Array(length).fill(0);
    }

    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        temp[x][y] = blocks[length - 1 - y][x];
      }
    }

    this.activePiece.blocks = temp;

    if (this.isCollision()) {
      this.activePiece.blocks = blocks;
    }
  }

  isCollision() {
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          (
            (this.playfield[y + pieceY] === undefined || this.playfield[y + pieceY][x + pieceX] === undefined) ||
            this.playfield[y + pieceY][x + pieceX]
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  lockPiece() {
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playfield[y + pieceY][x + pieceX] = blocks[y][x];
        }
      }
    }
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }

  createPiece() {
    const piece = {};
    const index = Math.floor(Math.random() * 7);
    const type = 'IJLOSTZ'[index];

    switch (type) {
      case 'I':
        piece.blocks = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]
        break;
      case 'J':
        piece.blocks = [
          [0, 0, 0],
          [2, 2, 2],
          [0, 0, 2],
        ];
        break;
      case 'L':
        piece.blocks = [
          [0, 0, 0],
          [3, 3, 3],
          [3, 0, 0],
        ];
        break;
      case 'O':
        piece.blocks = [
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [0, 4, 4, 0],
          [0, 0, 0, 0],
        ]
        break;
      case 'S':
        piece.blocks = [
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0],
        ];
        break;
      case 'Z':
        piece.blocks = [
          [0, 0, 0],
          [6, 6, 0],
          [0, 6, 6],
        ];
        break;
      case 'T':
        piece.blocks = [
          [0, 0, 0],
          [7, 7, 7],
          [0, 7, 0],
        ];
        break;
      default:
        throw new Error('Неизвестный тип фигуры');
    }

    piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
    piece.y = -1;

    return piece;
  }

  deleteLines() {
    const lines = [];

    for (let y = this.playfield.length - 1; y >= 0; y--) {
      if (this.playfield[y].every(b => b === 0)) {
        break;
      } else if (this.playfield[y].every(b => !!b)) {
        lines.unshift(y);
      }
    }

    for (let line of lines) {
      this.playfield.splice(line, 1);
      this.playfield.unshift(new Array(10).fill(0));
    }

    return lines.length;
  }

  updateScore(deletedLines) {
    if (deletedLines) {
      this.score += Game.points[deletedLines] * (this.level + 1);
      this.lines += deletedLines;
    }
  }
}
