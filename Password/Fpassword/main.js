
const sub  = document.querySelector('.subbtn')


window.onload= ()=>{
    const passo = document.getElementById('password')
    const cpass = document.getElementById('confirmpass')
    const svg1p = document.querySelector('[pass-svg]')
    const svg1cp = document.querySelector('[cpass-svg]')

    passo.classList.add('hide')
    cpass.classList.add('hide')
    svg1p.classList.add('hide')
    svg1cp.classList.add('hide')
}

sub.addEventListener('click',async (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    // console.log(email);
    
    const res = await (await fetch(`https://kind-blue-penguin-boot.cyclic.app/api/users/verify/${email}`)).json();
    console.log(res)

    if(res.success){

        const passo = document.getElementById('password')
        const cpass = document.getElementById('confirmpass')
        const svg1p = document.querySelector('[pass-svg]')
        const svg1cp = document.querySelector('[cpass-svg]')
        const sub  = document.querySelector('.subbtn')

        passo.classList.remove('hide')
        cpass.classList.remove('hide')
        svg1p.classList.remove('hide')
        svg1cp.classList.remove('hide')
        sub.classList.add('confirm')

        cnf = document.querySelector('.confirm')

        cnf.textContent = "Confirm"

        cnf.addEventListener("click",async ()=>{
            const password = document.getElementById('password').value;

            const res = await fetch('https://kind-blue-penguin-boot.cyclic.app/api/users/changepass/pass',{
                method: 'PUT',
                mode:'cors',
                headers:{
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({email,password})
            })

            if(res.ok){
                window.location.assign("../../Login/index.html")
            }   
        } )
    }else{
        window.alert("No such user found")
    }
})