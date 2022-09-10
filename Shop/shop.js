const productContainer = document.getElementById('prodcontainer')
const userCard = document.querySelector("[data-user-card]")

loginbtn = document.querySelector('.login')
signupbtn = document.querySelector('.signup')
rightsec = document.querySelector('.right')
userProf = document.querySelector('[userp]')


window.onload = function(){
    if(localStorage.getItem("accessToken") != null){
        loginbtn.classList.add('hide')
        signupbtn.classList.add('hide')
        const userprof = userProf.content.cloneNode(true).children[0]
        rightsec.append(userprof)
    }
}

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


fetch('https://evening-refuge-31987.herokuapp.com/api/products')
   .then((res) => res.json())
   .then((data) =>{
    // console.log(data);
    // console.log(data['product']);
    product_data = data['product'].map(prod =>{
        // console.log(prod); 
        const card = userCard.content.cloneNode(true).children[0]
        // console.log(card);
        const imgc = card.querySelector('[image]')
        const header = card.querySelector('[data-title]')
        const body = card.querySelector('[data-description]')
        const vbtn = card.querySelector('[viewButton]')
        imgc.src = prod['image']
        header.textContent = prod['title'];
        body.textContent = prod['description'];
        vbtn.classList.add(prod['_id']);
        productContainer.append(card);
        return {title: prod.title,element:card}
    })
});
