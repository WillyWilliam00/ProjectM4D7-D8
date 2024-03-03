const Row = document.querySelector(".row")
const NavBarCart = document.querySelector('.offcanvas-body')
const NavCart = document.querySelector(".nav-cart")
const ArrayProductCart = []
const CountTot = document.querySelector(".div-animation")
const numberProducts = document.querySelector(".numberProducts")
let result = []



async function GetProducts() {
  Row.innerHTML = /*html*/

    `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`

  try {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",
      { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YWIzZmU3NDZhMDAwMTQ4MTQzMmEiLCJpYXQiOjE3MDkwNDk4MDAsImV4cCI6MTcxMDI1OTQwMH0.Oc34YPNC_iKCwZxPcvu9jlRiqUCZ-tp4q0q5WxLvsyo" } })
    const data = await response.json()
    result = data
    numberProducts.innerHTML = result.length
    return data
  }
  catch {
    alert("oh oh");
  }
  finally {
    Row.querySelector(".lds-ring").remove();
  }
}

function text(event) { 

  const value = event.target.value
  let ArrayProductSearch = result.filter(product =>
    product.name.toLowerCase().includes(value.toLowerCase())
  )
    console.log(value)
  
  DisplayProducts(ArrayProductSearch)
}




window.onload = async () => {
  const data = await GetProducts();
  DisplayProducts(data);
}

function DisplayProducts(data) {
    
  Row.innerHTML = data.map(product => /*html*/ 
      
   `<div class=" col-xs-12 col-md-6 col-lg-4 card mb-3 border-0" style="background: #cbc7c7">
   <div class="row g-0 my-auto border-radius-black" style="background: white">
       <div class="col-6">
       <a href="product/product.html?id=${product._id}" class="position-relative">
          <img src="${product.imageUrl}" class="card-img-top border-radius-img" alt="..." style="height: 100%; aspect-ratio: 0.8; object-fit: cover;">
           <i class="bi bi-plus-circle more fs-2"></i>
       </a>
         
       </div>
       <div class="col-6">
           <div class="card-body d-flex flex-column justify-content-between" style= "height: 100%;">
               <div>
                  <div class="border-bottom border-secondary-subtle d-flex justify-content-between align-items-center pb-3">
                   <p class="fw-bolder m-0" style="font-size: 18px;">${product.name}</p>
                  </div>  
                   <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Prezzo:  </span>${product.price}€</p>
                   <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Brand:  </span>${product.brand}</p>
               </div> 
               <button type="button" id="buttonInbody_${product._id}" class="btn btn-primary bg-aqua border-0 fs-5 text-light hover-button position-relative" onclick="AddCart('${product._id}')"><span></span><i class="bi bi-cart cart-main"></i>
                  </button>
           </div>
       </div>
    </div>
 </div>`
  ).join("")
  }

function AlphabeticOrder() {

  result.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }


    return 0;
  });

  DisplayProducts(result)

}

function IncreasingPrice() {
  result.sort((a, b) => a.price - b.price);
  DisplayProducts(result)
}

function DecreasingPrice() {
  result.sort((a, b) => a.price - b.price).reverse()
  DisplayProducts(result)
}

function AddCart(id) {

  const button = document.querySelector(`#buttonInbody_${id}`)
  button.querySelector("span").classList.add("countQuantity")
  NavCart.classList.replace("bi-cart", "bi-cart-fill")
  animation()

  const CorrentProduct =  result.find(product => product._id === id) 
  if(!ArrayProductCart.includes(CorrentProduct)){
    CorrentProduct.quantity = 1
    ArrayProductCart.push(CorrentProduct)  
    button.querySelector("span").innerHTML  =  1
  } else {
    ArrayProductCart.find(product => product.name === CorrentProduct.name).quantity  = CorrentProduct.quantity + 1
    button.querySelector("span").innerHTML = CorrentProduct.quantity 
  }
  ShowCart()
  total()
}

function RemoveCart(id) {
  const CorrentProduct =  ArrayProductCart.findIndex(product => product._id === id)
  ArrayProductCart.splice(CorrentProduct, 1)

  const button = document.querySelector(`#buttonInbody_${id}`)
  button.querySelector("span").innerHTML = ""
  button.querySelector("span").classList.remove("countQuantity")

  ShowCart()
  total()

}
 

function total() {
  let prezzototale = 0
  let quantitàtotale = 0
  const QuantityinCart =  document.querySelectorAll(".quantity-incart")
  const PriceinCart = document.querySelectorAll(".price-incart")

  PriceinCart.forEach(x => {
    prezzototale = prezzototale + parseFloat(x.innerHTML)
  })
  document.querySelector(".total").innerHTML = `${prezzototale}€`

  QuantityinCart.forEach(x => {
    quantitàtotale = quantitàtotale + parseFloat(x.innerHTML)
  })
  document.querySelector(".quantity").innerHTML = quantitàtotale

  if(prezzototale === 0){
    NavCart.classList.replace("bi-cart-fill", "bi-cart")
    }
}

function ShowCart() {
  NavBarCart.innerHTML = ArrayProductCart.map(product => 
    /*html*/
          `<div class=" d-flex flex-row border-bottom border-2 pb-3 pt-3">
          <img src="${product.imageUrl}" class="col-5" style="objet-fit: cover; height: 10rem">
          <div class="card-body d-flex flex-column justify-content-between ms-2 " id="_${product._id}">
            <h5 class="card-title card-title-incart text-dark nameCart" >${product.name}</h5>
            <div class="d-flex flex-column">
              <p class="card-text text-dark m-0">Prezzo: <span class="price-incart fw-bold">${product.price * product.quantity}€</span></p>
              <p class="card-text text-dark m-0">Quantità: <span class="quantity-incart  fw-bold">${product.quantity}</span></p>
              <button type="button" class="btn bg-danger text-light hover-button" onclick='RemoveCart("${product._id}")'>X</button>
            </div>
          </div>
          </div>`
 ).join("")
}

function animation() {
  document.querySelector(".button-cart").classList.add("Animation-Cart");

  setTimeout(() => {
    document.querySelector(".button-cart").classList.remove("Animation-Cart");
  }, 500) }