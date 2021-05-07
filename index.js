import Game from './src/Game.js'
import View from './src/View.js'

const root = document.getElementById('root');

const game = new Game();
const view = new View(root, 250, 500, 10, 20);

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      game.rotatePiece();
      view.render(game.getState());
      break;
    case 'ArrowRight':
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 'ArrowDown':
      game.movePieceDown();
      view.render(game.getState());
      break;
    case 'ArrowLeft':
      game.movePieceLeft();
      view.render(game.getState());
      break;
  }
})
