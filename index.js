const Row = document.querySelector(".row")



async function GetProducts() {
    Row.innerHTML = /*html*/ 

    `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`

    try {const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",
                                { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE" }}  )
        const data = await response.json()
        console.log(data)
        return data}
    catch {
        alert("oh oh");
    }
    finally {
        Row.querySelector(".lds-ring").remove();
      }
}

function text(data) { //funzione che aggiorna il dom in base all'input value search
    
    const value = document.querySelector("input").value
    
         
    let ArrayProductSearch = data.filter(product => 
             product.toLowerCase().includes(value.toLowerCase())
         )
        
         DisplayProducts(ArrayProductSearch)
}

    
        
    
window.onload = async () => {

    
        const data = await GetProducts();
        DisplayProducts(data);
        text(data);
     
}

function DisplayProducts(data) {
    
    Row.innerHTML = data.map(product => /*html*/ 
        
     `<div class=" col-6 card mb-3 border-0">
     <div class="row g-0 my-auto border-radius-black">
         <div class="col-6">
         <a href="" class="position-relative">
            <img src="${product.imageUrl}" class="card-img-top border-radius-img" alt="..." style="height: 100%; aspect-ratio: 0.8; object-fit: cover;">
             <i class="bi bi-plus-circle more fs-2"></i>
         </a>
           
         </div>
         <div class="col-6">
             <div class="card-body d-flex flex-column" style= "height: 100%;">
                 <div>
                     <h5 class="card-title card-title-inbody pb-3 m-0 border-bottom border-secondary-subtle">${product.name}</h5>
                     <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Prezzo:  </span>${product.price}€</p>
                     <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Brand:  </span>${product.brand}</p>
                 </div> 
                 <span class="fw-bolder py-3">Description:</span>
                 <p class="card-text my-auto mb-2 border overflow-auto" style= "max-height: 130px;">${product.description}</p>
                 <div class="pt-2"><button type="button" class="border-0 btn btn-primary bg-success border-0 fs-5 text-light"><span><i class="bi bi-cart cart-main"></i></span>
                  </button></div>
             </div>
         </div>
      </div>
   </div>`
    ).join("")
    }