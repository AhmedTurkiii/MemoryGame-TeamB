let duration = 1000;
let blocksContainer = document.querySelector(".container-game-blocks");
let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());
 
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

shuffle(orderRange)

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function () {
        Flip(block);
    });

});

function Flip(selectBlock) {
    selectBlock.classList.add('flipped');

    let Flippeing = blocks.filter(Flipped => Flipped.classList.contains('flipped'));
    if (Flippeing.length === 2) {
        Stop();
        checkMatchedBlocks(Flippeing[0], Flippeing[1]);
    }
}

function Stop() {
    blocksContainer.classList.add('no-click');
    setTimeout(() => {
        blocksContainer.classList.remove('no-click');
    }, duration);
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

        document.getElementById('fail').play();

    }

}

