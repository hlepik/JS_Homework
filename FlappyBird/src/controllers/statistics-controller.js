
import GameBrain from "../model/gamebrain";

export default class StatisticsController {



    constructor(viewContainer) {
        this.viewContainer = viewContainer;
  
        this.isRunning = false;
        this.brain = new GameBrain();

        this.storage = window.localStorage;
        
    }
  

    run(){

        const button = document.querySelector('#game');
        button.disabled = false;

        this.isRunning = true;
        this.viewContainer.innerHTML = '';

        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('nameInput');
        const score = urlParams.get('score');

        if(name != null){
            this.storage.setItem(name, score);
        }

        this.viewContainer.append(this.getBoardHtml());

    }
   

    stop(){
        this.isRunning = false;
    }
    resizeUi(){
        if (this.isRunning){
    
            this.viewContainer.innerHTML = '';
            this.viewContainer.append(this.getBoardHtml());
        
        }
    }
    getBoardHtml() {

        let leaderBoard = document.createElement('div');
        leaderBoard.style.background = '#F2DBF6';

        let board = document.createElement('div');
        board.innerText = 'Leader board';
        board.style.textAlign = 'center';
        board.style.width = '100%';
        board.style.fontSize = '2rem';
        board.style.color = '#FF1493';
        leaderBoard.append(board);
        

        let table = document.createElement("table");

        table.style.position = 'absolute';
        table.style.width = '35%';
        table.classList.add('center');
        table.style.top  = '13%';
        table.style.left  = '35%';
        table.style.marginLeft= 'auto';
        table.style.marginRight= 'auto';
    

        let tr = document.createElement("tr");
        let col = document.createElement("td");
        col.innerText = "#";
        col.style.fontSize = "22px";
        col.style.color = "#A01FB8";
        col.style.textAlign = 'center';
        col.style.paddingBottom = '2rem';
      
        let col2 = document.createElement("td");
        col2.innerText = "Name";
        col2.style.fontSize = "22px";
        col2.style.color = "#A01FB8";
        col2.style.paddingLeft = '2rem';
        col2.style.paddingBottom = '2rem';
        let col3 = document.createElement("td");
        col3.innerText = "Score";
        col3.style.fontSize = "22px";
        col3.style.color = "#A01FB8";
        col3.style.textAlign = 'center';
        col3.style.paddingBottom = '2rem';

        tr.append(col, col2, col3);
        table.append(tr);
        let counter = 1;

     
        for (let index = 0; index < this.storage.length; index++) {
         
            let tr2 = document.createElement("tr");
            let key = localStorage.key(index);
            let value = localStorage.getItem(key);
            let col = document.createElement("td");
            col.innerText = counter + ".";
            col.style.fontSize = "20px";
            col.style.color = "#43094E";
            col.style.textAlign = 'center';
            let col2 = document.createElement("td");
            col2.innerText = key;
            col2.style.fontSize = "20px";
            col2.style.color = "#43094E";
            col2.style.paddingLeft = '2rem';

            let col3 = document.createElement("td");
            col3.innerText = value;
            col3.style.fontSize = "20px";
            col3.style.color = "#43094E";
            col3.style.textAlign = 'center';
            tr2.append(col, col2, col3);
            counter++;
            table.append(tr2);
        }
       

        leaderBoard.append(table);

        return leaderBoard;
    }
}
