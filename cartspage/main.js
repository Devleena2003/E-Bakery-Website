
const prodtemp = document.querySelector('[productcard]')
const maincontainer = document.querySelector('[product-item-container]')

const pdata = []

fetch(`https://evening-refuge-31987.herokuapp.com/api/carts/${localStorage.getItem("userid")}`,{
    method: 'GET',
    mode:'cors',
    headers:{
        'Content-type': 'application/json',
        'token' : `Bearer ${localStorage.getItem("accessToken")}`
    },
}).then(res =>res.json())
  .then(data => data.cart.products)
  .then(data => {
    // console.log(data)
    data.forEach(prod =>{
        fetch(`https://evening-refuge-31987.herokuapp.com/api/products/${prod.productId}`)
        .then(res =>res.json())
        .then(data => {
            const proditem = data.product
            console.log(proditem)

            const prodcard = prodtemp.content.cloneNode(true).children[0]
            console.log(prodcard)

            const prodname = prodcard.querySelector('.productname')
            const prodprice = prodcard.querySelector('.productprice')
            const proddesc = prodcard.querySelector('.productdesc')
            const prodimg = prodcard.querySelector('.prodimg')

            prodname.textContent = proditem.title
            prodname.classList.add(proditem._id)
            prodprice.textContent = proditem.price
            proddesc.textContent = proditem.description
            prodimg.src = proditem.image

            maincontainer.append(prodcard)

        })        
    })    
  })  
  
async function removefunc(e){
    // console.log(e)
    // console.log(e.path[3].children[0].classList[1])

    const productId = e.path[3].children[0].classList[1]
    const data = {productId}

    fetch(`https://evening-refuge-31987.herokuapp.com/api/carts/${localStorage.getItem("userid")}`,{
        method:'PUT',
        mode:'cors',
        headers:{
            'Content-type': 'application/json',
            'token' : `Bearer ${localStorage.getItem("accessToken")}`
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        window.location.assign('./index.html')
    })
}