opencart = document.querySelector('.viewcart')

opencart.addEventListener("click",()=>{
    window.location.assign('../cartspage/index.html')
})


subbtn = document.querySelector('.updatebtn')

subbtn.addEventListener('click',(e)=>{
    e.preventDefault();

    let pass = 0
    let confpass = 0
    let email = 0

    email = document.getElementById('email').value
    pass = document.getElementById('password').value
    confpass = document.getElementById('confpass').value
    
    console.log(email,pass.length,confpass.length)

    if(email.length && (!confpass.length && !pass.length)){
        console.log("email")
        data = {email}
        fetch(`https://kind-blue-penguin-boot.cyclic.app/api/users/${localStorage.getItem("userid")}`,{
            method:'PUT',
            mode:'cors',
            headers:{
                'Content-type': 'application/json',
                'token': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body:JSON.stringify(data)
        }).then(res=>res.json())
          .then(data=>{
            console.log(data)
            window.location.assign('./index.html')
          })
    }else if(email.length && ((confpass.length > 0 && pass.length > 0) && (confpass === pass))){
        password = confpass
        data = {email,password}
        fetch(`https://kind-blue-penguin-boot.cyclic.app/api/users/${localStorage.getItem("userid")}`,{
            method:'PUT',
            mode:'cors',
            headers:{
                'Content-type': 'application/json',
                'token': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body:JSON.stringify(data)
        }).then(res=>res.json())
          .then(data=>{
            console.log(data)
            window.location.assign('./index.html')
          })
    }else if(!email.length && ((confpass.length > 0 && pass.length > 0) && (confpass === pass))){
        password = confpass
        data = {password}
        fetch(`https://kind-blue-penguin-boot.cyclic.app/api/users/${localStorage.getItem("userid")}`,{
            method:'PUT',
            mode:'cors',
            headers:{
                'Content-type': 'application/json',
                'token': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body:JSON.stringify(data)
        }).then(res=>res.json())
          .then(data=>{
            console.log(data)
            window.location.assign('./index.html')
          })
    }
})


const cartBagBtn = document.querySelector('.right .bag')

user = document.querySelector('.user')
user.addEventListener('click',()=>{
    window.location.assign('../userProfilePage/index.html')
})

loginbtn = document.querySelector('.login')
signupbtn = document.querySelector('.signup')
rightsec = document.querySelector('.right')

// cartBagBtn.addEventListener('click',()=>{
//     window.location.assign('../cartspage/index.html')
// })

// window.onload = function(){
//     const incre = document.querySelector('.bag')
    
//     if(localStorage.getItem("accessToken") != null){
//         loginbtn.classList.add('hide')
//         signupbtn.classList.add('hide')
//         incre.setAttribute('data-count',localStorage.getItem("cartvalue"))
//         const userprof = userProf.content.cloneNode(true).children[0]
//         rightsec.append(userprof)
//     }
// }











    // window.onload = function(){
    //     prof = document.querySelector('.profileImg')
    //     // console.log(prof)
    //     fetch(`http://localhost:5000/api/users/profile/${localStorage.getItem("userid")}`,{
    //         method:'GET',
    //         mode:'cors',
    //         headers:{
    //             'Content-type': 'application/json',
    //             'token': `Bearer ${localStorage.getItem("accessToken")}`
    //         }
    //     }).then(res=>res.json())
    //       .then(data=>{
    //         console.log(data.profusr.image)
    //         imgurl = data.profusr.image
    //         if(imgurl){prof.src = imgurl}
    //       })
    // }

    // document.getElementById('addimg').addEventListener('change',(e)=>{

    //     console.log(e.target.files[0])
    //     const formdata = new FormData()

    //     formdata.append('userId',localStorage.getItem("userid"))
    //     formdata.append('image',e.target.files[0])

    //     fetch(`http://localhost:5000/api/users/profile/${localStorage.getItem("userid")}`,{
    //         method:'POST',
    //         mode:'cors',
    //         headers:{
    //             'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    //             'token': `Bearer ${localStorage.getItem("accessToken")}`
    //         },
    //         body:formdata
    //     }).then(res=>res.json())
    //       .then(data=>{
    //         console.log(data)
    //         // window.location.assign('./index.html')
    //       })
        
    // })