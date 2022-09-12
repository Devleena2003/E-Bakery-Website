const form=document.getElementById('form'); 
form.addEventListener('submit',loginUser);

async function loginUser(event){
    event.preventDefault();
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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

    console.log(result.others)
    
    if(result.success){
        localStorage.setItem("accessToken",result.accessToken)
        localStorage.setItem("userid",result.others._id)
        fetch(`https://evening-refuge-31987.herokuapp.com/api/carts/${result.others._id}`,{
            method: 'GET',
            moder:'cors',
            headers:{
                'Content-type': 'application/json',
                'token': `Bearer ${result.accessToken}`
            }
        }).then(res => res.json())
          .then(data => {
            if(data.cart === null){
                localStorage.setItem("cartvalue",0)
            }else{
                console.log(data)
                localStorage.setItem("cartvalue",data.cart.products.length)
            }
            window.location.assign("./Landing/landing.html"); 
          })

        // localStorage.setItem("cartvalue",0)
        // window.location.assign("./Landing/landing.html"); 
        }
}

 