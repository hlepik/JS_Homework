export default function controlView(eventHandler) {


    let control = document.createElement('div');
    control.id = 'control';
  
    let statisticsButton = document.createElement('button');
    statisticsButton.id = 'statistics';
    statisticsButton.style.color = '#FF1493';
    statisticsButton.style.fontSize= '1rem';
    statisticsButton.innerText='Statistics';

    let gameButton = document.createElement('button');
    gameButton.id = 'game';
    gameButton.style.color = '#FF1493';
    gameButton.style.fontSize= '1rem';
    gameButton.innerText='Game';

    control.append(statisticsButton);
    control.append(gameButton);


    statisticsButton.addEventListener('click', eventHandler);
 
    gameButton.addEventListener('click', eventHandler);
    
    return control;
}
