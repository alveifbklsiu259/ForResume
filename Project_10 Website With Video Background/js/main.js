const showcase = document.querySelector('.showcase');
const menutoggle = document.querySelector('.toggle');

menutoggle.addEventListener('click', () => {
    menutoggle.classList.toggle('active');
    showcase.classList.toggle('active');
});

