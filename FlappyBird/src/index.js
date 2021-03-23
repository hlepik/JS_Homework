import GameController from "./controllers/game-controller";
import StatisticsController from "./controllers/statistics-controller";
import GameBrain from "./model/gamebrain";
import controlView from "./views/controlview";

import gameView from "./views/gameview";
import mainView from "./views/mainview";




let brain = new GameBrain();

let game_view = gameView();
let gameController = new GameController(brain, game_view);

let statisticsController = new StatisticsController(game_view);

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


window.addEventListener('resize', () => {
    gameController.resizeUi();
    statisticsController.resizeUi();
});
