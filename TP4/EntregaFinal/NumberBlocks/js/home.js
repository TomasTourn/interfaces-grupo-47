document.addEventListener("DOMContentLoaded",()=>{



    window.addEventListener('scroll',()=>{
        let logo=document.querySelector('.logo-img');
        let header=document.querySelector('.nav-header');
        let scrollPosition= window.scrollY;
    
        let scaleFactor=Math.max(0.5,1 - scrollPosition/500);

        if(scrollPosition==0){
            logo.style.transform=`translate(0,0) scale(1)`
            header.style.background= 'transparent';
        }
        else{
         
            logo.style.transform=`translate(0,-50%) scale(${scaleFactor})`
            header.style.background='linear-gradient(180deg, #00D1D5 0%, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0) 100%)';
        }
    })

    let hamburguesa=document.querySelector('.hamburguesa');
        hamburguesa.addEventListener('click',()=>{
            hamburguesa.classList.toggle('open');
            let data=hamburguesa.getAttribute('data-open');
            if(data==false){
                hamburguesa.classList.add('notOpen');
                hamburguesa.classList.remove('Open');
                hamburguesa.setAttribute('data-open', 'true');
            }
            else{
                hamburguesa.classList.add('Open');
                hamburguesa.classList.remove('notOpen');
                hamburguesa.setAttribute('data-open', 'false');
            }
            document.querySelector('.hamburguesa-bg').classList.toggle("change-bg");
        })

    
   
})