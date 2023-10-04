const prew = document.querySelector(".preview")
const NameProduct = document.querySelector("#name")
const DescriptionProduct = document.querySelector("#description")
const BrandProduct = document.querySelector("#brand")
const ImageProduct = document.querySelector("#image")
const PriceProduct = document.querySelector("#price")


function preview() {
  
  if( (NameProduct.value !== "") &&  (DescriptionProduct.value !== "") &&  (BrandProduct.value !== "") &&  (ImageProduct.value !== "") &&  (PriceProduct.value !== "") ){
    
       prew.innerHTML =  `
       
       <div class="card mb-3">
          <div class="row g-0">
             <div class="col-md-4">
              <img src="${ImageProduct.value}" class="card-img-top " alt="...">
             </div>
              <div class="col-md-8">
                 <div class="card-body d-flex flex-column" style= "height: 100%;">
                  <div>
                     <h5 class="card-title card-title-inbody pb-3 m-0 border-bottom border-secondary-subtle">${NameProduct.value}</h5>
                     <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Prezzo:  </span>${PriceProduct.value}€</p>
                     <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Brand:  </span>${BrandProduct.value}</p>
                  </div> 
                     <p class="card-text my-auto pt-2"> <span class="fw-bolder">Description:</span><br>${DescriptionProduct.value}</p>
                  </div>
              </div>
            </div>
          </div>
        `
    } 
        
}
function CleanForm() {
  
  for (const input of [NameProduct, DescriptionProduct, BrandProduct, ImageProduct, PriceProduct]) {
    input.value = ''
}
  
}

async function AddProduct(event) {
  event.preventDefault()

  const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
           "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE"

      },
      body: JSON.stringify({
          name: NameProduct.value,
          description: NameProduct.value,
          brand: NameProduct.value,
          price: PriceProduct.value,
          image: ImageProduct.value
      })
  })

  if (response.ok) { 
      alert("Yohoo! Added Event")
      

      for (const input of [NameProduct, DescriptionProduct, BrandProduct, ImageProduct, PriceProduct]) {
          input.value = ''
      }
  } else {
      console.error("Cannot send")
  }
}

  

  