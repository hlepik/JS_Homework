export default class GameController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
   
    }
    
    run() {
        this.isRunning = true;
        // draw the initial game board, start the game
        this.viewContainer.innerHTML = '';
        console.log(this);

        this.viewContainer.append(this.getBoardHtml(this.model));

        this.getPipes(this.model);
      
             
        // start countdown

        // start game-loop
    }
    stop(){
        this.isRunning = false;
    }

    resizeUi(){
        if (this.isRunning){
            // redraw
            this.viewContainer.innerHTML = '';
            this.viewContainer.append(this.getBoardHtml(this.model));
        
        }
    }

    
    
    getBoardHtml() {
    let content = document.createElement('div');
    content.id = "gameboard";

    let rowHeight = 20;

    let sky = document.createElement('div');
    sky.id = 'sky';

    sky.style.minWidth  = window.innerWidth + 'px';
    let height = window.innerHeight - 100;
    sky.style.minHeight= height + 'px';
    sky.style.background = '#B0E0E6';
    content.append(sky);

    let ground = document.createElement('div');
    ground.id = 'ground';
    content.append(ground);
    
    ground.style.minWidth  = window.innerWidth + 'px';
    ground.style.minHeight= window.innerHeight - height  - rowHeight + 'px';
    ground.style.top = 100 + '%';
    ground.style.background = '#8FBC8F';

    
   
    console.log('content', content);
   
    return content;
    
    }

    getPipes(){

    
     function Pipes(){
   
        let viewPortWidth = window.innerWidth;
        let viewPortHeight = window.innerHeight;
        let gap = viewPortHeight / 4;

        let pipeHeight = viewPortHeight - gap -  Math.ceil(Math.random()* 400);


        let sky = document.querySelector('#sky');
        let pipe = document.createElement('div');
        pipe.id = "pipe";

        let topPipe = document.createElement('div');
        topPipe.id = "topPipe";

        sky.appendChild(pipe);
        sky.appendChild(topPipe);

        pipe.style.width = viewPortWidth / 15 + 'px';
        pipe.style.height = pipeHeight + 'px';
        pipe.style.backgroundColor = '#FF1493';
        pipe.style.position = 'absolute';

      
        topPipe.style.width = viewPortWidth / 15 + 'px';
        topPipe.style.height = viewPortHeight - pipeHeight - gap + 'px';
        topPipe.style.backgroundColor = '#FF1493';
        topPipe.style.position = 'absolute';

        pipe.style.left = viewPortWidth + 'px';
        pipe.style.bottom = 0 + 'px';

        topPipe.style.left = viewPortWidth + 'px';
        topPipe.style.borderTop = 0 + 'px';

    function movePipes(){
        viewPortWidth -= 2;
        pipe.style.left = viewPortWidth + 'px';
        topPipe.style.left = viewPortWidth + 'px';
        if(viewPortWidth === -70){
            clearInterval(timerId);
            sky.removeChild(pipe);
            sky.removeChild(topPipe);
        }
    }
    let timerId = setInterval(movePipes, 15);

    setTimeout(Pipes, 2500);

    }
    Pipes();
    }
  
}