import screen from '../Shop/screen.js';


const router=()=>{
    const section=document.getElementById("products")
  section.innerHTML=screen.render();
};
window.addEventListener('load',router);