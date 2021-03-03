import mainView from './views/mainview.js';
import controlView from './views/controlview.js';
import gameView from './views/gameview.js';

import GameBrain from './model/gamebrain.js';
import GameController from './controllers/game-controller.js';
import StatisticsController from './controllers/statistics-controller.js';

let brain = new GameBrain();
let game_view = gameView();
let gameController = new GameController(brain, game_view);
let statisticsController = new StatisticsController(brain, game_view);

let view = mainView();
document.body.append(view);
let ctrl_view = controlView(gameControlClick);
view.append(ctrl_view);
view.append(game_view);

function gameControlClick(e) {
    console.log(e);
  
    switch (e.target.id) {
        case 'game':
            statisticsController.stop();
            gameController.run();
            break;
        case 'statistics':
            gameController.stop();
            statisticsController.run();
            break;

        default:
            break;
    }
}

statisticsController.run();
window.addEventListener('game', () => {
    gameController.getPipes();
});


window.addEventListener('resize', () => {
    gameController.resizeUi();
    statisticsController.resizeUi();
});





