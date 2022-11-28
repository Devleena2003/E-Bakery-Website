const productContainer = document.getElementById('prodcontainer')
const userCard = document.querySelector("[data-user-card]")
const cartBagBtn = document.querySelector('.right .bag')

const loginbtn = document.querySelector('.login')
const signupbtn = document.querySelector('.signup')
const rightsec = document.querySelector('.right')
const userProf = document.querySelector('[userp]')


const listitem = document.querySelector('.filterlist')
// for(let i=0;i<listitem.length;i++){
//     // console.log("kasjfvbj")
//     listitem[i].addEventListener('click',(e)=>{
//         console.log(e.target.textContent)
//         console.log("ajdvbjh")
//     })
// }


//flter ist functionality

listitem.addEventListener('click',(e)=>{
    // console.log(listitem)
    // console.log(listitem.children[1])
    const val = e.target.textContent.toLowerCase();
    // console.log(val)
    // console.log(product_data)

    if(val === "all"){
        product_data.forEach(prod =>{
            const visible = prod.title.toLowerCase().includes(val)
            prod.element.classList.remove("hide", visible)
        })
    }

    else{

    product_data.forEach(prod =>{
        prod.element.classList.remove("hide")
        const visible = prod.title.toLowerCase().includes(val)
        console.log(visible)
        if (prod.element.classList.contains('hide')){
            prod.element.classList.remove("hide")
        }
        else{
            prod.element.classList.toggle("hide", !visible)
        }
    })
}
})




cartBagBtn.addEventListener('click',()=>{
    if(localStorage.getItem("accessToken") != null)
       window.location.assign('../cartspage/index.html')
    else{
        window.alert("You must be logged in to access cart")
    }
})


window.onload = function(){
    const incre = document.querySelector('.bag')
    
    if(localStorage.getItem("accessToken") != null){
        loginbtn.classList.add('hide')
        signupbtn.classList.add('hide')

        const cartv = fetch(`https://kind-blue-penguin-boot.cyclic.app/api/carts/${localStorage.getItem("userid")}`,{
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
            // else if(!data.cart.products.length || data.cart.products.length)
            //       incre.setAttribute('data-count',data.cart.products.length)
            else if(!data.cart.products.length)
                incre.setAttribute('data-count',0)
            else{
                data = data.cart.products
                data.forEach(d=>{
                    // tot +=d
                    incre.setAttribute('data-count',Number(incre.getAttribute('data-count'))+ d.quantity)
                    console.log(incre.getAttribute('data-count'))
                })
            }
          })

        // incre.setAttribute('data-count',localStorage.getItem("cartvalue"))

        const userprof = userProf.content.cloneNode(true).children[0]
        rightsec.append(userprof)


        user = document.querySelector('.user')
        user.addEventListener('click',()=>{
            window.location.assign('../userProfilePage/index.html')
        })
    }
}

loginbtn.addEventListener('click',()=>{
    if(localStorage.getItem("accessToken") == null){
        window.location.assign('../Login/index.html')
    }
});

signupbtn.addEventListener('click',()=>{
    if(localStorage.getItem("accessToken") == null){
        window.location.assign('../Sign Up/signUp.html')
    }
});


// search function implementation

let product_data = []

const searchInput = document.querySelector("[product-search]")
searchInput.addEventListener("input", (e) =>{
    const val = e.target.value.toLowerCase();
    // console.log(product_data)

    product_data.forEach(prod =>{
        const visible = prod.title.toLowerCase().includes(val)
        prod.element.classList.toggle("hide", !visible)
    })
})


fetch('https://kind-blue-penguin-boot.cyclic.app/api/products')
   .then((res) => res.json())
   .then((data) =>{
    console.log(data);
    // console.log(data['product']);
    product_data = data['product'].map(prod =>{
        // console.log(prod); 
        const card = userCard.content.cloneNode(true).children[0]
        // console.log(card);
        const imgc = card.querySelector('[image]')
        const header = card.querySelector('[data-title]')
        const price = card.querySelector('[data-price]')
        // console.log(header)
        const body = card.querySelector('[data-description]')
        const vbtn = card.querySelector('[viewButton]')
        imgc.src = prod['image']
        header.textContent = prod.title;
        body.textContent = prod.description;
        price.textContent = `Price : ${prod.price}`
        vbtn.classList.add(prod['_id']);
        vbtn.value = prod['_id']
        productContainer.append(card);


        vbtn.addEventListener('click',()=>{
            console.log("sfkjvnjk")
        })
        
        
        return {title: prod.title,element:card}
    })
});



// function opencart(){
//     const cartitem = document.querySelectorAll('.cart-btn')
//     const cart = document.
//     console.log(cartitem)
//     // console.log(cartitem[1])
//     // console.log(cartitem.parentElement.children[0].classList[2])

//     // console.log(cartitem.parentElement.parentElement)
//     // const itemId = cartitem.parentElement.children[0].classList[2];
//     // console.log(itemId)
// }




async function opencart(e){

    const incre = document.querySelector('.bag')

    if(localStorage.getItem("accessToken") == null){
        window.alert("You must be logged in to add items to cart")

    }else{
        let add = Number(incre.getAttribute('data-count') || 0)
        incre.setAttribute('data-count',add+1)
        // incre.classList.add('live')
        localStorage.setItem("cartvalue",add+1);

        const prodId = e.target.value
        console.log(prodId)

        const userId = localStorage.getItem("userid");
        const products =
            {
                "productId" : `${prodId}`,
            }

        prodData = {userId,products};
        // console.log(prodData)

        const result = await fetch('https://kind-blue-penguin-boot.cyclic.app/api/carts',{
            method: 'POST',
            mode:'cors',
            headers:{
                'Content-type': 'application/json',
                'token' : `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(prodData)
        })
        .then((result) =>result.json())

        console.log(result)
}
}
