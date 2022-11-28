const form=document.getElementById('form'); 
form.addEventListener('submit',write);

function write(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const message = document.getElementById('msg').value;
    const userId = localStorage.getItem('userid')

    const data = {userId,username,message}

    fetch(`https://kind-blue-penguin-boot.cyclic.app/api/users/testimonial/${localStorage.getItem("userid")}`,{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-type': 'application/json',
            'token' : `Bearer ${localStorage.getItem("accessToken")}`
        },
        body:JSON.stringify(data)
    }).then((res)=>res.json())
      .then(data=>{
        console.log(data)
        window.location.assign('../Hero+Navbar/hero.html')
        alert("Thankyou for writing to us..we'll surely improve in future")
      })
    
    
}