
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

            prodname.textContent = proditem.title
            prodprice.textContent = proditem.price
            proddesc.textContent = proditem.description

            maincontainer.append(prodcard)

        })
    })
    
  })