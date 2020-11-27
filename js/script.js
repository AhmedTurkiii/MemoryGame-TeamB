let signup_form = document.querySelector('.control-button .sign_up')
let signin_form = document.querySelector('.control-button .sign_in')
let go_back = document.querySelector('.go_back')
 
function goBack() {
    window.location.reload();
}

document.querySelector('.control-button #signup_btn').onclick = function () {
    signup_form.style.display = "block";
    signin_form.style.display = "none";
    this.style.display = "none";
    document.querySelector('.control-button #signin_btn').style.display = "none"
}

document.querySelector('.control-button #signin_btn').onclick = function () {
    signin_form.style.display = "block";
    signup_form.style.display = "none";
    this.style.display = "none";
    document.querySelector('.control-button #signup_btn').style.display = "none";
}
var Uname = document.getElementById('Uname'),
    pw = document.getElementById('pw'),
    repaet_pw = document.getElementById('repeat_pw');


function store_user() {
    if(Uname.value == '' || Uname.value == null || pw.value == '' || pw.value == null || repaet_pw.value != pw.value ) {
        alert('username or password is Uncorrect!');
    }else {
        localStorage.setItem('name', Uname.value);
        localStorage.setItem('pw', pw.value);
        alert('Good, account created.. try login agian!');
        window.location.reload();
    }
}

function check_user() {

    var storedName = localStorage.getItem('name'),
        storedPw = localStorage.getItem('pw'),
        userName = document.getElementById('userName'),
        userPw = document.getElementById('userPw');

    if(userName.value !== storedName || userPw.value !== storedPw) {
        alert('username or password not correct!');
    }else {
        document.querySelector('.control-button').remove();
        document.querySelector('.info .hi_name span').innerHTML = userName.value;
    }
}
///////////////////////////////////////////////////////
let duration = 1000;
let blocksContainer = document.querySelector('.container-game-blocks'),
    blocks = Array.from(blocksContainer.children),
    orderRange = [...Array(blocks.length).keys()];
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
shuffle(orderRange);
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function () {
        flipping(block);
    });
});
function flipping(selectBlock) {
    selectBlock.classList.add('flipped');
    let allFlippedBlock = blocks.filter(filippedBlock => filippedBlock.classList.contains('flipped'));
    if (allFlippedBlock.length === 2) {
        stopClick();
        cheak(allFlippedBlock[0], allFlippedBlock[1]);
    }
}
function stopClick() {
    blocksContainer.classList.add('no-click');
    setTimeout(() => {
        blocksContainer.classList.remove('no-click');
    }, duration);
}
function cheak(firstBlock, secondBlock) {
    let tries = document.querySelector('.tries span');
    if (firstBlock.getAttribute('data-tech') === secondBlock.getAttribute('data-tech')) {
        firstBlock.classList.remove('flipped');
        secondBlock.classList.remove('flipped');
        firstBlock.classList.add('mached');
        secondBlock.classList.add('mached');
        document.getElementById('success').play();
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('flipped');
            secondBlock.classList.remove('flipped');
        }, duration);
        document.getElementById('fail').play();
    }
}
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
        firstBlock.classList.remove('flipped');
        secondBlock.classList.remove('flipped');
        firstBlock.classList.add('mached');
        secondBlock.classList.add('mached');
        document.getElementById('success').play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('flipped');
            secondBlock.classList.remove('flipped');
        }, duration);
    }
}

document.querySelector(".restart span").onclick = function(){
    shuffle(orderRange);
    blocks.forEach((block, index) => {
        block.classList.remove('mached');
        block.classList.remove('flipped');
        block.style.order = orderRange[index];
        document.querySelector('.tries span').innerHTML = 0;
    });
}
