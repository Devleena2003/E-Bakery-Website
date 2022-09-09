const form=document.getElementById('form'); 
form.addEventListener('submit',loginUser);

async function loginUser(event){
    event.preventDefault();
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // console.log(username,password);
    const data = {username,password};
    // console.log(data);

    const result = await fetch('https://evening-refuge-31987.herokuapp.com/api/auth/login/',{
        method: 'POST',
        mode:'cors',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res)=>res.json());

    // console.log(result.success);
    
    if(result.success){
        window.location.assign("./Landing/landing.html");  //next.html will be the redirect page if login is succesfull
    }
}

 