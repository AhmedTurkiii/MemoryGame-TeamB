// Effect Duration
let duration = 1000;
// Select Blocks Container
let blocksContainer = document.querySelector(".container-game-blocks");
// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);


// Check Matched Block
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

function Flip(selectBlock) {
    selectBlock.classList.add('flipped');

    let Flippeing = blocks.filter(Flipped => Flipped.classList.contains('flipped'));
    if (Flippeing.length === 2) {
        Stop();
        cheak(Flippeing[0], Flippeing[1]);
    }
}

function Stop() {
    blocksContainer.classList.add('no-click');
    setTimeout(() => {
        blocksContainer.classList.remove('no-click');
    }, duration);
}