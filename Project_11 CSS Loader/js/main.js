const loader = document.querySelector('.loader');
const main = document.querySelector('.main');

function init() {
    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.display = 'none';

        main.style.display = 'block';
        setTimeout(() => main.style.opacity = 1, 500); /* Why doesn't the transition proverty(style.css > .main) work when we don't have this setTimeout? */
    }, 4000)
}

init();