export default class StatisticsController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
    }

    run(){
        this.isRunning = true;
        this.viewContainer.innerHTML = 'stats';
    }

    stop(){
        this.isRunning = false;
    }
    resizeUi(){
        if (this.isRunning){
            console.log(window.innerWidth, window.innerHeight);
            // redraw
        }
    }
}
