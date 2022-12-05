let btnStart = document.querySelector('.btnStart');
let divField = document.querySelector('.gameField');
let divScor = document.querySelector('.currentScores_h1');
let divRecordScores = document.querySelector('.recordScores_h1');
let bodySnake;
let apple;
let derection;
let steps = false;
let interval;
let scor = 0;
let recordScor = 0;
let speed;

showRecord(localStorage.getItem('record'));
recordScor = localStorage.getItem('record')

function start() {
    console.log('+');
    derection = "right";
    scor = 0;
    speed = 500;
    divScor.innerHTML = scor;
    divField.innerHTML = '';
    createField();
    bodySnake = createSnake();
    createApple();
    interval = setInterval(move, speed);
    window.addEventListener('keydown', function (e) {
        if (steps == true) {
            if (e.keyCode == 37 && derection != "right") {
                derection = "left";
                steps = false;
            }
            else if (e.keyCode == 40 && derection != "down") {
                derection = "up";
                steps = false;
            }
            else if (e.keyCode == 39 && derection != "left") {
                derection = "right";
                steps = false;
            }
            else if (e.keyCode == 38 && derection != "up") {
                derection = "down";
                steps = false;
            }
        }
    })
};

function createField() {
    for(let i = 1; i < 11; i++) {
        for(let k = 1; k < 11; k++) {
            divField.innerHTML += `<div class="square" data-coord-X="${k}" data-coord-Y="${i}"></div>`
        }
    }
};

function createSnake() {
    let bodySnake = [document.querySelector("[data-coord-X='5'][data-coord-Y='5']"), document.querySelector("[data-coord-X='4'][data-coord-Y='5']")];
    bodySnake[0].classList.add('head');
    bodySnake[1].classList.add('bodySnake');
    return bodySnake
};

function createApple() {
    function generateApple() {
        let coordX = Math.round(Math.random() * (10 - 1) + 1);
        let coordY = Math.round(Math.random() * (10 - 1) + 1);
        return [coordX, coordY];
    };
    let appleCoord = generateApple();
    apple = document.querySelector('[data-coord-X="' + appleCoord[0] + '"][data-coord-Y="' + appleCoord[0] + '"]');

    if (apple.classList.contains('bodySnake') || apple.classList.contains('head')) {
        createApple();
    } else {
        apple.classList.add('apple');
    };
};

function move() {
    let snakeCoord = [bodySnake[0].getAttribute('data-coord-X'), bodySnake[0].getAttribute('data-coord-Y')];
    bodySnake[0].classList.remove('head');
    bodySnake[bodySnake.length - 1].classList.remove('bodySnake');
    bodySnake.pop();

    if (derection == "right") {
        if (snakeCoord[0] < 10) {
            bodySnake.unshift(document.querySelector('[data-coord-X="' + (+snakeCoord[0] + 1) +'"][data-coord-Y="'+snakeCoord[1]+'"]'));
        } else {bodySnake.unshift(document.querySelector('[data-coord-X="1"][data-coord-Y="'+snakeCoord[1]+'"]'));}
    } else if (derection == "left") {
        if (snakeCoord[0] > 1) {
            bodySnake.unshift(document.querySelector('[data-coord-X="' + (+snakeCoord[0] - 1) +'"][data-coord-Y="'+snakeCoord[1]+'"]'));
        } else {bodySnake.unshift(document.querySelector('[data-coord-X="10"][data-coord-Y="'+snakeCoord[1]+'"]'));}
    } else if (derection == "up") {
        if (snakeCoord[1] < 10) {
            bodySnake.unshift(document.querySelector('[data-coord-X="' + snakeCoord[0] +'"][data-coord-Y="'+(+snakeCoord[1]+1)+'"]'));
        } else {bodySnake.unshift(document.querySelector('[data-coord-X="' + snakeCoord[0] +'"][data-coord-Y="1"]'));}
    } else if (derection == "down") {
        if (snakeCoord[1] > 1) {
            bodySnake.unshift(document.querySelector('[data-coord-X="' + snakeCoord[0] +'"][data-coord-Y="'+(+snakeCoord[1]-1)+'"]'));
        } else {bodySnake.unshift(document.querySelector('[data-coord-X="' + snakeCoord[0] +'"][data-coord-Y="10"]'));}
    };

    if (bodySnake[0].getAttribute('data-coord-X') == apple.getAttribute('data-coord-X') && bodySnake[0].getAttribute('data-coord-Y') == apple.getAttribute('data-coord-Y')) {
        apple.classList.remove('apple');
        let a = bodySnake[bodySnake.length - 1].getAttribute('data-coord-X');
        let b = bodySnake[bodySnake.length - 1].getAttribute('data-coord-Y');
        bodySnake.push(document.querySelector('[data-coord-X="'+a+'"][data-coord-Y="'+b+'"]'));
        createApple();
        scor++;
        speed = speed - 3 * (speed / 100);
        clearInterval(interval);
        interval = setInterval(move, speed);
        divScor.innerHTML = scor;
    };

    if (bodySnake[0].classList.contains('bodySnake')) {
        if (scor > recordScor) {
            localStorage.setItem('record', scor);
            showRecord(scor);
        };
        divField.innerHTML = '<button class="btnStart" onclick="start();">Счет: ' + scor + '. Еще!</button>';
        btnStart = document.querySelector('.btnStart');
        clearInterval(interval);
    };
    bodySnake[0].classList.add('head');
    for (let i = 1; i < bodySnake.length; i++) {
        bodySnake[i].classList.add('bodySnake')
    };
    steps = true;
};

function showRecord(num) {
    divRecordScores.innerHTML = num;
};




