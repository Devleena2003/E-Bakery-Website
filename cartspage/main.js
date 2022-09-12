
const prodtemp = document.querySelector('[productcard]')
const maincontainer = document.querySelector('[product-item-container]')

const pdata = []
let amount = 0
let payementid = 0

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
            amount+=proditem.price

            const prodcard = prodtemp.content.cloneNode(true).children[0]
            // console.log(prodcard)

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

    // const productId = e.path[3].children[0].classList[1]
    // console.log(e.path[2].children[1].children[0].classList[1])

    const productId = e.path[2].children[1].children[0].classList[1]
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

async function payement(e){
    // console.log(totalcartvalue)
    
    fetch(`https://evening-refuge-31987.herokuapp.com/api/getorder/${amount}`,{
        method:'GET',
        mode:'cors',
        headers:{
            'Content-type': 'application/json'
        }
    }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        paybtn = document.getElementById('rzp-button1').classList.remove('hide')
        document.getElementById('rzp-button1').onclick = function(e){
            rzp1.open();
            e.preventDefault();
        }


        let options = {
            "key": "rzp_test_rKi8JpdWmJnrAU", 
            "amount": amount*100, 
            "currency": "INR",
            "name": "E-Bakery",
            "description": "Test Transaction",
            "image": "../Cake Pics/logo.png",
            "order_id": data.order_id,
            "handler": function (response){
                // console.log(response.razorpay_payment_id);
                payementid = response.razorpay_payment_id;
                console.log(payementid);
                if(payementid.length > 1){
                    fetch(`https://evening-refuge-31987.herokuapp.com/api/carts/${localStorage.getItem("userid")}`,{
                        method:'DELETE',
                        mode:'cors',
                        headers:{
                            'Content-type': 'application/json',
                            'token': `Bearer ${localStorage.getItem("accessToken")}`
                        },
                    }).then(res=>res.json())
                      .then(data=>{
                        console.log(data)
                        window.location.assign('../Shop/shop.html')
                    })
                }
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature)
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
    })
}