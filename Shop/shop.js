const productContainer = document.getElementById('prodcontainer')
const userCard = document.querySelector("[data-user-card]")

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
    const val = e.target.textContent;

    product_data.forEach(prod =>{
        const visible = prod.title.toLowerCase().includes(val)
        if (prod.element.classList.contains('hide')){
            prod.element.classList.remove("hide"    )
        }
        else{
            prod.element.classList.toggle("hide", !visible)
        }
    })
})





window.onload = function(){
    if(localStorage.getItem("accessToken") != null){
        loginbtn.classList.add('hide')
        signupbtn.classList.add('hide')
        const userprof = userProf.content.cloneNode(true).children[0]
        rightsec.append(userprof)
    }
}


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
