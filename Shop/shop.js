const productContainer = document.getElementById('prodcontainer')
const userCard = document.querySelector("[data-user-card]")


fetch('https://evening-refuge-31987.herokuapp.com/api/products')
   .then((res) => res.json())
   .then((data) =>{
    // console.log(data);
    console.log(data['product']);
    data['product'].forEach(prod =>{
        console.log(prod); 
        const card = userCard.content.cloneNode(true).children[0]
        console.log(card);
        const imgc = card.querySelector('[image]')
        const header = card.querySelector('[data-title]')
        const body = card.querySelector('[data-description]')
        const vbtn = card.querySelector('[viewButton]')
        imgc.src = prod['image']
        header.textContent = prod['title'];
        body.textContent = prod['description'];
        vbtn.classList.add(prod['_id']);
        productContainer.append(card);
    })
});
