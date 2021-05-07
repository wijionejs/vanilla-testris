import Game from './src/Game.js'
import View from './src/View.js'

const root = document.getElementById('root');

const game = new Game();
const view = new View(root, 350, 500, 10, 20);

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      game.rotatePiece();
      view.renderMainScreen(game.getState());
      break;
    case 'ArrowRight':
      game.movePieceRight();
      view.renderMainScreen(game.getState());
      break;
    case 'ArrowDown':
      game.movePieceDown();
      view.renderMainScreen(game.getState());
      break;
    case 'ArrowLeft':
      game.movePieceLeft();
      view.renderMainScreen(game.getState());
      break;
  }
})

view.renderStartScreen();
