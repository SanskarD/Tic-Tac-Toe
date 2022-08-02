let form  = document.querySelector('form')
let choiceScreen  = document.querySelector('.choice-screen')
let playingScreen  = document.querySelector('.playing-screen')
let playingArea  = document.querySelector('.playing-area')
let winScreen  = document.querySelector('.win-state')
let playTurn = document.querySelector('#player')
let winnerIcon = document.querySelector('.winner-icon')
let tiles = document.querySelectorAll('.tiles')
let tiesScore = document.querySelectorAll('.ties-score')
let reset = document.querySelector('.reset')
let playAgain = document.querySelector('.play-again')
let currentPlayer 
let nextPlayer
let ties= 0
let playing;


let p1 = {
    name: 'P1',
    icon: '',
    wins:0,
    Score:document.querySelector('.p1-score')
}
let p2 = {
    name: 'P2',
    icon: '',
    wins:0,
    Score:document.querySelector('.p2-score')
}



form.addEventListener('submit',(e)=>{
    e.preventDefault()
    choiceScreen.classList.add('disabled')
    playingScreen.classList.remove('disabled')
    p1.icon= document.querySelector('input[name="choice"]:checked').value;
    p2.icon = p1.icon == "X"?"O":"X"
    if(p1.icon == "X"){
        currentPlayer = p1
        nextPlayer = p2
        play()
    }else{
        currentPlayer = p2
        nextPlayer = p1
        play()
    }
})
function play(){
    playTurn.innerHTML = `${currentPlayer.name}(${currentPlayer.icon})`
}

    for(let tile of tiles){
        let swap
        tile.addEventListener('click',()=>{
            if(tile.getAttribute('data-icon') == ""){
                tile.setAttribute('data-icon',currentPlayer.icon)
                tile.classList.add(`tile-${currentPlayer.icon.toLowerCase()}`,`clr-${currentPlayer.icon.toLowerCase()}`)
                tile.innerHTML = currentPlayer.icon

                if(checkWin()){
                    setTimeout(()=>{
                        winScreen.classList.remove('disabled')
                        winnerIcon.innerHTML = currentPlayer.icon
                        winnerIcon.parentElement.classList.add(`clr-${currentPlayer.icon.toLowerCase()}`)
                        winnerIcon.parentElement.classList.add(`clr-${currentPlayer.icon.toLowerCase()}`)
                    },400)
                }
                else if(fullBoard()){
                    ties+=1
                    tiesScore[0].innerHTML = ties
    
                    setTimeout(()=>{
                        winScreen.classList.remove('disabled')
                        winnerIcon.parentElement.classList.add(`clr-rs`)
                        winnerIcon.parentElement.childNodes[2].data = "IT'S A TIE!!"
                    },400)
                }
                else{
                swap = currentPlayer
                currentPlayer = nextPlayer
                nextPlayer = swap
                play()
                }
            }
        })
    }


function checkWin(){
        if(currentPlayer.icon == tiles[0].getAttribute('data-icon') && currentPlayer.icon == tiles[1].getAttribute('data-icon') && currentPlayer.icon == tiles[2].getAttribute('data-icon')){
                    winChange([tiles[0],tiles[1],tiles[2]],currentPlayer)
                    return 1
        }
            else if(currentPlayer.icon == tiles[3].getAttribute('data-icon') && currentPlayer.icon == tiles[4].getAttribute('data-icon') && currentPlayer.icon == tiles[5].getAttribute('data-icon')){
                winChange([tiles[3],tiles[4],tiles[5]],currentPlayer)
                return 1
            }
            else if(currentPlayer.icon == tiles[6].getAttribute('data-icon') && currentPlayer.icon == tiles[7].getAttribute('data-icon') && currentPlayer.icon == tiles[8].getAttribute('data-icon')){
                winChange([tiles[6],tiles[7],tiles[8]],currentPlayer)
                return 1
            }
            else if(currentPlayer.icon == tiles[0].getAttribute('data-icon') && currentPlayer.icon == tiles[3].getAttribute('data-icon') && currentPlayer.icon == tiles[6].getAttribute('data-icon')){
                winChange([tiles[0],tiles[3],tiles[6]],currentPlayer)
                return 1
            }
            else if(currentPlayer.icon == tiles[1].getAttribute('data-icon') && currentPlayer.icon == tiles[4].getAttribute('data-icon') && currentPlayer.icon == tiles[7].getAttribute('data-icon')){
                winChange([tiles[1],tiles[4],tiles[7]],currentPlayer)
                return 1
            }
            else if(currentPlayer.icon == tiles[2].getAttribute('data-icon') && currentPlayer.icon == tiles[5].getAttribute('data-icon') && currentPlayer.icon == tiles[8].getAttribute('data-icon')){
                winChange([tiles[2],tiles[5],tiles[8]],currentPlayer)
                return 1
            }
            else if(currentPlayer.icon == tiles[0].getAttribute('data-icon') && currentPlayer.icon == tiles[4].getAttribute('data-icon') && currentPlayer.icon == tiles[8].getAttribute('data-icon')){
                winChange([tiles[0],tiles[4],tiles[8]],currentPlayer)
                return 1
            }
            else if(currentPlayer.icon == tiles[2].getAttribute('data-icon') && currentPlayer.icon == tiles[4].getAttribute('data-icon') && currentPlayer.icon == tiles[6].getAttribute('data-icon')){
                winChange([tiles[2],tiles[4],tiles[6]],currentPlayer)
                return 1
            }
            else{
                return 0
            }
    }
   function winChange(tiles){
    currentPlayer.wins+=1
    currentPlayer.Score.innerHTML = currentPlayer.wins
    for(let tile of tiles){
        tile.classList.add(`win-${currentPlayer.icon.toLowerCase()}`)
        tile.classList.add('tile-win')
    }
}

function fullBoard(){
    for( let tile of tiles){
        if(tile.getAttribute('data-icon') == ''){
            return 0
        }
    }
    return 1
}

reset.addEventListener('click',()=>{
    window.location.reload()
})
playAgain.addEventListener('click',()=>{
    tiles.forEach(tile =>{
        tile.removeAttribute('class')
        tile.removeAttribute('data-icon')
        tile.setAttribute('data-icon','')
        tile.setAttribute('class','fw-900 tiles')
        tile.innerHTML = ''
    })

    p1.icon = ''
    p2.icon = ''
    winnerIcon.innerHTML = ""
    winnerIcon.parentElement.classList.remove(`clr-rs`)
    winnerIcon.parentElement.childNodes[2].data = "TAKES THE ROUND"
    playingScreen.classList.add('disabled')
    winScreen.classList.add('disabled')
    choiceScreen.classList.remove('disabled')
})