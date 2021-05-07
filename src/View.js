export default class View {
  constructor (element, width, height, columns, rows) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d');

    this.blockWidth = width / columns;
    this.blockHeight = height / rows;

    this.element.appendChild(this.canvas);
  }

  render({ playfield }) {
    this.clearCanvas();
    this.renderPlayfield(playfield);
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderPlayfield(playfield) {
    for (let y = 0; y < playfield.length; y++) {
      for (let x = 0; x < playfield[y].length; x ++) {
        if (playfield[y][x]) {
          this.drawBlock(x * this.blockWidth, y * this.blockHeight, 'red');
        }
      }
    }
  }

  drawBlock(x, y, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = '#333';
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, this.blockWidth, this.blockHeight);
    this.context.strokeRect(x, y, this.blockWidth, this.blockHeight);
  }
}
