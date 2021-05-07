export default class View {
  static colors = {
    '1': 'cyan',
    '2': 'blue',
    '3': 'orange',
    '4': 'yellow',
    '5': 'green',
    '6': 'purple',
    '7': 'red',
  }
  constructor (element, width, height, columns, rows) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');

    this.playfieldBorderWidth = 2;
    this.playfieldX = this.playfieldBorderWidth;
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = this.width * 2 / 3;
    this.playfieldHeight = this.height;
    this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
    this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

    this.panelX = this.playfieldWidth + 15;
    this.panelY = 0;

    this.blockWidth = this.playfieldInnerWidth / columns;
    this.blockHeight = this.playfieldInnerHeight / rows;

    this.element.appendChild(this.canvas);
  }

  renderStartScreen() {
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'white';
    this.context.font = '18px "Comic Sans MS, sans-serif"';

    this.context.fillText('Press ENTER to start', this.width / 2, this.height / 2);
  }

  renderPauseScreen() {
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'white';
    this.context.font = '18px "Comic Sans MS, sans-serif"';

    this.context.fillText('Press ENTER to resume', this.width / 2, this.height / 2);
  }

  renderEndScreen({ score }) {
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'white';
    this.context.font = '18px "Comic Sans MS, sans-serif"';

    this.context.fillText('Game Over', this.width / 2, this.height / 2 - 24);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
  }

  renderMainScreen(state) {
    this.clearCanvas();
    this.renderPlayfield(state);
    this.renderPanel(state)
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderPlayfield({ playfield }) {
    for (let y = 0; y < playfield.length; y++) {
      for (let x = 0; x < playfield[y].length; x ++) {
        const block = playfield[y][x];
        if (block) {
          this.drawBlock(
            this.playfieldX + (x * this.blockWidth),
            this.playfieldY + (y * this.blockHeight),
            this.blockWidth,
            this.blockHeight,
            View.colors[block]);
        }
      }
    }

    this.context.strokeStyle = 'white';
    this.context.lineWidth = this.playfieldBorderWidth;
    this.context.strokeRect(0, 0, this.playfieldInnerWidth, this.playfieldInnerHeight);
  }

  renderPanel({ score, level, lines, nextPiece }) {
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    this.context.fillStyle = 'white';
    this.context.font = '16px "Comic Sans MS, sans-serif"';

    this.context.fillText(`Score: ${score}`, this.panelX, this.panelY);
    this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
    this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
    this.context.fillText('Next:', this.panelX, this.panelY + 90);

    for (let y = 0; y < nextPiece.blocks.length; y++) {
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
        const block = nextPiece.blocks[y][x];
        if (block) {
          this.drawBlock(
            this.panelX + (x * this.blockWidth * 0.75),
            110 + (y * this.blockHeight * 0.75),
            this.blockWidth * 0.75,
            this.blockHeight * 0.75 ,
            View.colors[block]
          );
        }
      }
    }
  }

  drawBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = '#333';
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}
