import data from '../Cart/data.js';

fetch('https://evening-refuge-31987.herokuapp.com/api/products')
   .then((res) => res.json())
   .then((data) =>{
    console.log(data);
    console.log(data['product']);
   })
const screen={
    render:()=>{
        const {products}=data;
        return `
        <ul class="products">
        ${products.map(products=>`
        <li>
        <div class="product-box">
        <div class="products-img">
          <img
            src="${products.image}"
            alt=""
          />
        </div>
        <div class="products-info">
          <div class="product-text">
            <h2>"${products.name}"</h2>
            <p>
             ${products.weight} <br />
             ${products.ingredients} <br />
             ${products.price}
            </p>
          </div>
          <div class="cart">
            <a href="#">
              <button>
                <h4>
                  Add to Cart
                  <i class="fa-sharp fa-solid fa-cart-shopping"></i>
                </h4>
              </button>
            </a>
          </div>
        </div>
      </div>

        </li>
        `).join('\n')}
        `
    },
};
export default screen;