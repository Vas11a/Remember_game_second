const cards = document.querySelectorAll('.card')
const button = document.querySelector('strong')
const loss = document.querySelector('.loss')
const winn = document.querySelector('.winn')
const span = document.querySelector('span')

let level = 1;
let j = 1;
let helper = 0; 
let newLevel = true;
let blockOpenCard = false;

function RandArray(array){
    var rand = Math.random()*array.length | 0;
    var rValue = array[rand];
    return rValue;
}


function play () {
   

    let cardArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

    if (newLevel) {
        for (var i = cards.length - 1; i >= 0; i--) {
            cards[i].setAttribute('name', 'closed')
        } 
        button.innerHTML = level;
        while (helper !== level) {
            let rand = RandArray(cardArray)
            let idxRand = cardArray.indexOf(rand)

            cards[rand].classList.add('green')
            cards[rand].setAttribute('name', 'opened')
            cardArray.splice(idxRand, 1);

            helper += 1;   
        }
        setTimeout(() => {
            for (var i = cards.length - 1; i >= 0; i--) {
               cards[i].classList.remove('green')
            }   
        }, 1000);
         
        level += 1;
        helper = 0;
        newLevel = false;
        
        setTimeout(() => {
             blockOpenCard = true;
        }, 1000);

        if (level == 17) {
            winn.classList.add('add')
        }
    }
}


function openCard(idx) {
    if (blockOpenCard) {
        let openHelper =  cards[idx].getAttribute('name')
        if (openHelper == 'closed') {
            cards[idx].classList.add('red')

            setTimeout(() => {
                cards[idx].classList.remove('red')
            }, 1000)
            blockOpenCard = false;

            loss.classList.add('add')
            span.innerHTML = level - 1;

        } else if(openHelper == 'opened'){
            
            j += 1;
            console.log(level)
            cards[idx].classList.add('green')
            cards[idx].setAttribute('name', 'played')
            setTimeout(() => {
                cards[idx].classList.remove('green')
            }, 1000)

            if (j == level) {
                newLevel = true; 
                j = 1;
            }
        }
    }
}