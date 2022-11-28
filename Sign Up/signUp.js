
const form = document.getElementById("formelement");
form.addEventListener('submit',registerUser);

   async function registerUser(event){
    event.preventDefault();
    const username= document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const password= document.getElementById('password').value;
    const conf = document.getElementById('confpass').value;

    if(password !== conf){
        window.alert('Passwords dont match')
        document.getElementById('password').value = ''
        document.getElementById('confpass').value = ''
    }

    else{

        const userData = {username,email,password}
        console.log(userData)
    
        const result = await fetch('https://kind-blue-penguin-boot.cyclic.app/api/auth/register/',{
            method: 'POST',
            mode:'cors',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then((res)=>res.json());
    
        // console.log(result);
    
        if(result.success){
            window.location.assign('../Login/index.html')
        }else{
            window.alert("User already exists")
        }
    }
    
    // console.log(name);
    // console.log(email);
    // console.log(password);
   }
