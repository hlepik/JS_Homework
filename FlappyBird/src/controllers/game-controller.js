
export default class GameController {

    constructor(model, viewContainer) {
        this.viewContainer = viewContainer;
        this.model = model;
        this.isRunning = false;
        this.score = 0;
        this.isGameOver = false;
        this.gravity = 16;
        this.gameTimerId;
        this.timerIdPipes;
        this.birdHeight = Math.ceil(window.innerHeight / 3);
        this.birdPosition = Math.ceil(window.innerWidth / 3);
        this.birdWidth = Math.ceil(window.innerWidth / 20);
        this.birdHeight = Math.ceil(window.innerHeight / 3);
        this.birdInnerHeight = Math.ceil(window.innerHeight / 20);
     
      
    }

    
    run() {
      
        this.isRunning = true;
        this.viewContainer.innerHTML = '';
        console.log(this);

        this.viewContainer.append(this.getBoardHtml(this.model));

        let startButton = document.getElementById('startButton');
    

        startButton.addEventListener('click', () => {
         
           
            let sky = document.getElementById('sky');
            sky.removeChild(startButton);


            this.gameTimerId = setInterval( () => {
                this.startGame();
              }, 100);

         
            this.timerIdPipes = setInterval( () => {
                this.Pipes();
            
            }, 3500);
          
        });
        if(this.isGameOver){
            startButton.removeEventListener();
        }


        document.addEventListener('keyup', () => {
            this.jump();
        });
       
    }
    stop(){
        this.isRunning = false;
    }

    resizeUi(){
        if (this.isRunning){
            this.viewContainer.innerHTML = '';
            this.viewContainer.append(this.getBoardHtml(this.model));
        
        }
    }

    getBoardHtml() {

        const button = document.querySelector('#game');
        button.disabled = true;

        let content = document.createElement('div');
        content.id = "gameboard";
        let sky = document.createElement('div');
        sky.id = 'sky';

        sky.style.minWidth  = window.innerWidth + 'px';
        sky.style.minHeight = window.innerHeight  - 26+ 'px';

        sky.style.background = '#B0E0E6';
        content.append(sky);
        
        let ground = document.createElement('div');
        ground.id = 'ground';
    
        ground.style.minWidth  = window.innerWidth + 'px';
        ground.style.minHeight= 50 + 'px';
        ground.style.bottom = '0px';
        ground.style.background = '#8FBC8F';
        ground.style.position = 'absolute';

        let edge = document.createElement('div');
        edge.id = 'edge';
        ground.append(edge);
        sky.append(ground);

        edge.style.minWidth  = window.innerWidth + 'px';
        edge.style.minHeight= '15px';
        edge.style.background = '#4D1357';
        edge.style.zIndex = 1;
        edge.style.bottom = '0px';
        edge.style.position = 'absolute';


        console.log('content', content);

        let bird = document.createElement('div');
        bird.id = "bird";
        
        bird.style.width = this.birdWidth + 'px';
        bird.style.height = this.birdInnerHeight + 'px';


        const image = document.createElement('img');
        image.style.width = this.birdWidth + 'px';
        image.style.height = this.birdInnerHeight + 'px';
        image.src = './../linnuke.png';

        bird.appendChild(image);

        bird.style.position = 'absolute';
        bird.style.bottom  = this.birdHeight + 'px';
        bird.style.left = this.birdPosition + 'px';
        bird.style.borderRadius = '3px';
        sky.appendChild(bird);

        let startButton = document.createElement('button');
        startButton.id = 'startButton';
        startButton.innerText='Start';
        startButton.style.top  = (window.innerHeight / 2)- 50 + 'px';
        startButton.style.left = (window.innerWidth / 2) + 'px';
        startButton.style.position = 'absolute';
        startButton.style.fontSize = '2rem';
        startButton.style.borderRadius = '8px'; 
        startButton.style.backgroundColor = '#B0E0E6';
        startButton.style.color = '#FF1493';
        sky.append(startButton);


        let gameScore = document.createElement('h1');
        gameScore.id = 'gameScore';
        gameScore.innerHTML = "Score: " + this.score;
        gameScore.style.color = '#FFFFFF';
        gameScore.style.fontSize = window.innerWidth / 25 + 'px';
        gameScore.style.left = '20px';
        gameScore.style.position = 'absolute';
        gameScore.style.top = '10px';
        sky.append(gameScore);
        return content;
    }
 

    startGame() {
        
        let bird  = document.getElementById('bird');

        this.birdHeight -= this.gravity
        bird.style.bottom = this.birdHeight + 'px'
        bird.style.left = this.birdPosition + 'px'

        if(this.birdHeight <= 8){
            this.gameOver();
        }
    
    }
        
          
    jump() {

        let bird = document.getElementById('bird');
        if(this.birdHeight < window.innerHeight - 110 && !this.isGameOver){
            this.birdHeight += 70
            bird.style.bottom = this.birdHeight + 'px'
        } 
    }
      
    Pipes(){
 
        let pipe = document.createElement('div');
        pipe.id = "pipe";

        let topPipe = document.createElement('div');
        topPipe.id = "topPipe";

        let gap = 5 * this.birdInnerHeight;
        let pipeWidth = Math.ceil(window.innerWidth / 15); 
        let pipePosition = Math.ceil(window.innerWidth);
        let viewPortHeight = Math.ceil(window.innerHeight);
        let pipeHeight = viewPortHeight - gap -  Math.ceil(Math.random()* 400);
        let pipeTopHeight = viewPortHeight - pipeHeight - gap;


        const image2 = document.createElement('img');
        image2.style.width = pipeWidth + 'px';
        image2.style.height = pipeHeight+ 'px';
        image2.src = './../post3.png';
        
        pipe.appendChild(image2);
        pipe.style.position = 'absolute';


        const image3 = document.createElement('img');
        image3.style.width = pipeWidth + 'px';
        image3.style.height = pipeTopHeight+ 'px';
        image3.src = './../post3.png';
      
        image3.style.transform = 'rotate(180deg) scaleX(-1)';
      
        topPipe.appendChild(image3);
        topPipe.style.position = 'absolute';
      
        pipe.style.left = pipePosition + 10 + 'px';
        pipe.style.bottom ='0px';

        topPipe.style.left = pipePosition + 'px';
        topPipe.style.borderTop = '0px';


        let sky = document.getElementById('sky');

        let bird = document.getElementById('bird');
    

        if(!this.isGameOver){
            sky.appendChild(pipe);
            sky.appendChild(topPipe);
        }
    
        let timerId = setInterval( () => {
           
            if(!this.isGameOver){
                pipePosition -= 2;
                pipe.style.left = pipePosition + 'px'
                topPipe.style.left = pipePosition + 'px'
            }

            if (pipePosition === -70) {
                sky.removeChild(pipe)
                sky.removeChild(topPipe)
            }


            if(pipePosition == this.birdPosition || pipePosition + 1 == this.birdPosition){
            
                this.score += 1;
             
                let gameScore = document.getElementById('gameScore');
                gameScore.innerHTML = "Score: " + this.score;
                sky.append(gameScore);
                
            }
          
            if(this.birdHeight <=  10 || 
                (pipePosition - this.birdWidth < this.birdPosition && pipePosition + pipeWidth > this.birdPosition  && 
                    (this.birdHeight <= pipeHeight  || this.birdHeight + this.birdInnerHeight + 20 >= pipeHeight + gap))){
               
                clearInterval(timerId);
                sky.removeChild(bird);
                this.gameOver();
                }
            
            }, 14);

    }
    
    gameOver() {
    
        clearInterval(this.gameTimerId);
        clearInterval(this.timerIdPipes);
        this.isGameOver = true;
        document.removeEventListener('keyup', control);
        setTimeout(this.textGameOver(), 100);
    }
    

    textGameOver(){

        let sky = document.getElementById('sky');
        let text = document.createElement('h1');
        sky.appendChild(text);
        
        text.innerHTML = "Game Over"
        text.style.color = '#FFFFFF'
        text.style.left= (window.innerWidth / 2)- 85 + 'px';
        text.style.position = 'absolute';
        text.style.top = (window.innerHeight / 2) - 50 + 'px';

  
        let nameForm = document.getElementById('form');
    
        nameForm.style.display = "block";
        nameForm.style.top = (window.innerHeight / 2) + 20 + 'px';
        nameForm.style.left= (window.innerWidth / 2) - 80 + 'px';
        nameForm.style.position = 'absolute';
        nameForm.style.zIndex = 1;

        let score = document.getElementById('score');
        score.value = this.score;

      
        sky.append(nameForm);
     
    } 

}

