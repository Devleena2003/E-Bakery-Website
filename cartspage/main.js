
const prodtemp = document.querySelector('[productcard]')
const maincontainer = document.querySelector('[product-item-container]')
const usr = document.querySelector('.logo-user')

usr.addEventListener('click',()=>{
    window.location.assign('../userProfilePage/index.html')
})

const pdata = []
let amount = 0
let payementid = 0

fetch(`https://kind-blue-penguin-boot.cyclic.app/api/carts/${localStorage.getItem("userid")}`,{
    method: 'GET',
    mode:'cors',
    headers:{
        'Content-type': 'application/json',
        'token' : `Bearer ${localStorage.getItem("accessToken")}`
    },
}).then(res =>res.json())
  .then(data =>{
    const cck = document.querySelector('.checkout')
    const ordertot = document.querySelector('.ordertotal')
    
    if(data.cart === null){
        cck.classList.add('hide')
        cartxt = document.querySelector('.cart-text')

        cartxt.classList.remove('hide')
    }else if(!data.cart.products.length){
        cck.classList.add('hide')

        cartxt = document.querySelector('.cart-text')

        cartxt.classList.remove('hide')

    }else{data = data.cart.products;
        cck.classList.remove('hide')
        ordertot.classList.remove('hide')
    // console.log(data)
    data.forEach(prod =>{
        // console.log(prod)
        fetch(`https://kind-blue-penguin-boot.cyclic.app/api/products/${prod.productId}`)
        .then(res =>res.json())
        .then(data => {
            const proditem = data.product
            console.log(proditem)
            const nitems = prod.quantity
            // console.log(nitems)
            
            
            amount+=proditem.price*nitems
            const ordertot = document.querySelector('.ordertotal')
            ordertot.textContent = `Order Total : Rs ${amount}`

            const prodcard = prodtemp.content.cloneNode(true).children[0]
            // console.log(prodcard)

            const prodname = prodcard.querySelector('.productname')
            const prodprice = prodcard.querySelector('.productprice')
            const proddesc = prodcard.querySelector('.productdesc')
            const prodimg = prodcard.querySelector('.prodimg')
            const itemcnt = prodcard.querySelector('.itemcount')

            prodname.textContent = proditem.title
            prodname.classList.add(proditem._id)
            itemcnt.textContent = nitems
            prodprice.textContent = proditem.price
            proddesc.textContent = proditem.description
            prodimg.src = proditem.image

            maincontainer.append(prodcard)



            prodcard.querySelector('.minus').addEventListener('click',()=>{

                itemcnt.textContent--
                if(itemcnt.textContent==='0'){

                    const productId = proditem._id
                    console.log({productId})

                    
                    fetch(`https://kind-blue-penguin-boot.cyclic.app/api/carts/${localStorage.getItem("userid")}`,{
                        method:'PUT',
                        mode:'cors',
                        headers:{
                            'Content-type': 'application/json',
                            'token' : `Bearer ${localStorage.getItem("accessToken")}`
                        },
                        body:JSON.stringify({productId})
                    }).then(res=>res.json())
                      .then(data=>{
                        console.log(data)
                        window.location.assign('./index.html')
                    })
                }else{

                    const userId = localStorage.getItem("userid");
                    const productId = proditem._id
                    // console.log({productId})

                    
                    fetch(`https://kind-blue-penguin-boot.cyclic.app/api/carts/${itemcnt.textContent}`,{
                        method:'POST',
                        mode:'cors',
                        headers:{
                            'Content-type': 'application/json',
                            'token' : `Bearer ${localStorage.getItem("accessToken")}`
                        },
                        body:JSON.stringify({userId,productId})
                    }).then(res=>res.json())
                      .then(data=>{
                        console.log(data)
                        window.location.assign('./index.html')
                    })
                    
                }

                // console.log(itemcnt.textContent)
                
            })
            prodcard.querySelector('.plus').addEventListener('click',()=>{

                itemcnt.textContent++

                const userId = localStorage.getItem("userid");
                const products =
                    {
                        "productId" : `${proditem._id}`,
                    }
        
                
                const prodData = {userId,products}
                fetch('https://kind-blue-penguin-boot.cyclic.app/api/carts',{
                method: 'POST',
                mode:'cors',
                headers:{
                    'Content-type': 'application/json',
                    'token' : `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(prodData)
            })
            .then((result) =>result.json())
            .then(data => {
                console.log(data);
                window.location.assign('./index.html')
            })
                


            })

        })        
    })
}    
  })  
  
async function removefunc(e){
    // console.log(e)
    // console.log(e.path[3].children[0].classList[1])

    const productId = e.path[3].children[0].classList[1]
    // console.log(e.path[2].children[1].children[0].classList[1])

    // const productId = e.path[2].children[1].children[0].classList[1]
    const data = {productId}

    // console.log(data)

    fetch(`https://kind-blue-penguin-boot.cyclic.app/api/carts/${localStorage.getItem("userid")}`,{
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

async function storeOrder(data){
    // console.log(data);

    userId = localStorage.getItem("userid")
    orderId = data.id
    amount = data.amount
    amount_due = data.amount_due
    amount_paid = data.amount_paid
    currency = data.currency
    receipt = data.receipt

    orderdata = {userId,orderId,amount,amount_due,amount_paid,currency,receipt}

    const result = await fetch('https://kind-blue-penguin-boot.cyclic.app/api/orders',{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-type': 'application/json',
            'token':`Bearer ${localStorage.getItem("accessToken")}`
        },
        body:JSON.stringify(orderdata)
    })

    console.log(result.json())
}


async function payement(e){
    // console.log(totalcartvalue)
    
    fetch(`https://kind-blue-penguin-boot.cyclic.app/api/getorder/${amount}`,{
        method:'GET',
        mode:'cors',
        headers:{
            'Content-type': 'application/json',
        }
    }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        
        storeOrder(data)
        
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
                    fetch(`https://kind-blue-penguin-boot.cyclic.app/api/carts/${localStorage.getItem("userid")}`,{
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
                // console.log(response.razorpay_order_id);
                // console.log(response.razorpay_signature)
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
                // alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);

                alert("THE PAYEMENT FAILED PLEASE TRY AGIAN..IF MONEY WAS DEDUCTED IT WILL BE RETURED IN 2-3 WORKING DAYS")
        });
    })
}