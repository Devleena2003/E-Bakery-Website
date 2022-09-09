const form=document.getElementById('form'); 
form.addEventListener('submit',loginUser);

async function loginUser(event){
    event.preventDefault();
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(username,password);
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

    console.log(result);
    // console.log(result.accessToken)


    //storing the json web access token in local storage

    localStorage.setItem("accessToken",result.accessToken)
    // console.log(localStorage.getItem("accessToken"))
    
    
    //if login succesfull redirect to next page

    if(result.success){
        window.location.assign("./Landing/landing.html"); 
    }
}

 