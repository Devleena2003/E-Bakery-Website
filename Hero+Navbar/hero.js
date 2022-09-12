cartbtn = document.querySelector('.bag');
loginbtn = document.querySelector('.login')
signupbtn = document.querySelector('.signup')
ordernow = document.querySelector('.order')
rightsec = document.querySelector('.right')
userProf = document.querySelector('[userp]')



cartbtn.addEventListener('click',()=>{
    //if there si no accesToken get the user to login first

    if(localStorage.getItem("accessToken") == null){
        window.location.assign('../index.html')
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
    if(localStorage.getItem("accessToken") != null){
        loginbtn.classList.add('hide')
        signupbtn.classList.add('hide')
        const userprof = userProf.content.cloneNode(true).children[0]
        rightsec.append(userprof)

        const incre = document.querySelector('.bag')
        incre.setAttribute('data-count',localStorage.getItem("cartvalue"))
    }
}