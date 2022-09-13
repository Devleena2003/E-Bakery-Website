cartbtn = document.querySelector('.bag');
loginbtn = document.querySelector('.login')
signupbtn = document.querySelector('.signup')
ordernow = document.querySelector('.order')
rightsec = document.querySelector('.right')
// userProf = document.querySelector('[userp]')



cartbtn.addEventListener('click',()=>{
    //if there si no accesToken get the user to login first

    if(localStorage.getItem("accessToken") == null){
        window.location.assign('../index.html')
    }else{
            window.location.assign('../cartspage/index.html')
    }
})

loginbtn.addEventListener('click',()=>{
    if(localStorage.getItem("accessToken") == null){
        window.location.assign('../index.html')
    }
});

signupbtn.addEventListener('click',()=>{
    if(localStorage.getItem("accessToken") == null){
        window.location.assign('../Sign Up/signUp.html')
    }
});


ordernow.addEventListener('click',()=>{
    window.location.assign('../Shop/shop.html')
})


//if there is an access token hide the login button

window.onload = function(){
    if(localStorage.getItem("accessToken") !== null){
        loginbtn.classList.add('hide')
        signupbtn.classList.add('hide')
        const logout = document.querySelector('#logout-button')
        // const userprof = userProf.content.cloneNode(true).children[0]
        // rightsec.append(userprof)

        const incre = document.querySelector('.bag')
        // incre.setAttribute('data-count',localStorage.getItem("cartvalue"))

        logout.addEventListener('click',()=>{
            console.log("ajhvb")
            localStorage.clear()
            window.location.assign('../Hero+Navbar/hero.html')
        })
        

        const cartv = fetch(`https://evening-refuge-31987.herokuapp.com/api/carts/${localStorage.getItem("userid")}`,{
            method: 'GET',
            mode:'cors',
            headers:{
                'Content-type': 'application/json',
                'token' : `Bearer ${localStorage.getItem("accessToken")}`
            },
        }).then(res =>res.json())
          .then(data =>{
            // console.log(data)
            if(data.cart === null)
                incre.setAttribute('data-count',0)
            else if(!data.cart.products.length || data.cart.products.length)
                  incre.setAttribute('data-count',data.cart.products.length)
          })


        //   .then(data=>{
        //     console.log(data.length)
        //     incre.setAttribute('data-count',data.length)
        //   })

          user = document.querySelector('.user')
          user.addEventListener('click',()=>{
              window.location.assign('../userProfilePage/index.html')
          })      
    }else{
        const logout = document.querySelector('#logout-button')
        logout.classList.add('hide')
        const user = document.querySelector('#userprof')
        user.classList.add('hide')
    }
}