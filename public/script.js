const singleBlock = document.querySelectorAll('ul');

let blockPos = rotate = 0;
let scale = 1;
let fireScroll = false;

window.addEventListener('wheel', (e) => {
    if (!fireScroll) {
        fireScroll = true;
        if (e.deltaY < 0) {
            blockPos = blockPos + singleBlock[0].offsetWidth;
            if (blockPos > 0) {
                blockPos = 0;
            } else {
                rotate = rotate - 90;
                if (blockPos === 0) {
                    scale = scale + 1;
                    if (scale > 1) {
                        scale = 1;
                    }
                    document.querySelector('h1').style.opacity = '1';
                }
            }
        } else if (e.deltaY > 0) {
            blockPos = blockPos - singleBlock[0].offsetWidth;
            if (blockPos < 0 - singleBlock[0].offsetWidth * 4) {
                blockPos = 0 - singleBlock[0].offsetWidth * 4;
            } else {
                rotate = rotate + 90;
                scale = scale - 1;
                if (scale < 0) {
                    scale = 0;
                }
                document.querySelector('h1').style.opacity = '0';
            }
        }
        singleBlock.forEach(block => {
            block.style.setProperty('--rotate', rotate + 'deg')
            block.style.setProperty('--move', blockPos + 'px')
        });
        // document.querySelector('h1').style.setProperty('--move', blockPos + 'px')
        document.querySelector('h1').style.setProperty('--scale', scale);
        setTimeout(() => {
            fireScroll = false
        }, 1000);
    }
});