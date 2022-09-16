const form=document.getElementById('form'); 
form.addEventListener('submit',loginUser);

function loginUser(event){
    event.preventDefault();
    const username = document.getElementById('email').value;
    const msg = document.getElementById('msg').value;
    console.log(username);
    console.log(msg);
}