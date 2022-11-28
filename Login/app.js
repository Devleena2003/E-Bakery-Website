const form=document.getElementById('form'); 
form.addEventListener('submit',loginUser);

async function loginUser(event){
    event.preventDefault();
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {username,password};
    // console.log(data);

    const result = await fetch('https://kind-blue-penguin-boot.cyclic.app/api/auth/login/',{
        method: 'POST',
        mode:'cors',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res)=>res.json())

    console.log(result)
    if(result === "NO such user/Wrong Credentials"){
        window.alert("No such User Exists")
        document.getElementById('email').value = ""
        document.getElementById('password').value = ""
    }else if(result === "Wrong credentials"){
        window.alert("Wrong Credentials")
        document.getElementById('password').value = ""
    }

    // console.log(result.others)
    
    if(result.success){
        localStorage.setItem("accessToken",result.accessToken)
        localStorage.setItem("userid",result.others._id)
        fetch(`https://kind-blue-penguin-boot.cyclic.app/api/carts/${result.others._id}`,{
            method: 'GET',
            mode:'cors',
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
            window.location.assign("../Hero+Navbar/hero.html"); 
          })


        }
}

 