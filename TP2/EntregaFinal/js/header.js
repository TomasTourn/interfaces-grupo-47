const menuButton = document.querySelector('.menu-button');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.querySelector('.icon-cruz');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});

closeBtn.addEventListener('click', ()=>{
    sidebar.classList.toggle('show');
});