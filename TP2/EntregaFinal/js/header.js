document.addEventListener('DOMContentLoaded',()=>{

    const menuBtn = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    const closeMenu = document.querySelector('.icon-cruz-menu');
    
    const profileBtn = document.querySelector('.user-icon');
    const profile = document.querySelector('.user-menu');
    const closeProfile = document.querySelector('.icon-cruz-profile');
    
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });
    
    closeMenu.addEventListener('click', ()=>{
        sidebar.classList.toggle('show');
    });
    
    profileBtn.addEventListener('click', ()=>{
        profile.classList.toggle('show');
    });
    
    closeProfile.addEventListener('click', ()=>{
        profile.classList.toggle('show');
    });
    
    //animacion de carga de pagina

    var percent = document.querySelector('.percent');
    var progress = document.querySelector('.progress');
    var count = 4;
    var per = 16;
    var loading = setInterval(animate, 50);

    function animate(){
    if(count >= 100 && per >= 196){ 
        count = 100; // Aseguramos que count no pase de 100
        per = 196; // Aseguramos que per no pase de 196
        progress.style.width = per + 'px';
        percent.textContent = count + '%';
        text.style.fontSize = "70px";
        text.classList.add("add");
        clearInterval(loading);
    } else {
        per = per + 1.8;
        count = count + 1;
        if(count > 100) count = 100; // Limitar count a 100
        progress.style.width = per + 'px';
        percent.textContent = count + '%';
    }
    }

    setTimeout(function() {
        document.querySelector('.loader-container').style.display = 'none';
    }, 5000); // 5000 ms = 5 segundos
    
    setTimeout(function() {
        document.querySelector('.page-container').style.display = 'block';
    }, 5000);

    })