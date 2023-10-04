const Row = document.querySelector(".row")


async function GetProducts() {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",
                                { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE" }}  )
    const data = await response.json()
    console.log(data)
    return data
}
 function DisplayProducts(data) {

    Row.innerHTML = data.map(product => /*html*/ 
        
     `<div class="col-6">
        <div class="card mb-3 border-0">
          <div class="row g-0 my-auto border-radius-black">
              <div class="col-6">
                <img src="${product.imageUrl}" class="card-img-top border-radius" alt="..." style="height: 100%; aspect-ratio: 0.8; object-fit: cover;">
              </div>
              <div class="col-6">
                  <div class="card-body d-flex flex-column" style= "height: 100%;">
                      <div>
                          <h5 class="card-title card-title-inbody pb-3 m-0 border-bottom border-secondary-subtle">${product.name}</h5>
                          <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Prezzo:  </span>${product.price}€</p>
                          <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Brand:  </span>${product.brand}</p>
                      </div> 
                      <span class="fw-bolder">Description:</span>
                      <p class="card-text my-auto pt-2" style= "max-height: 200px; overflow: auto;">${product.description}</p>
                  </div>
              </div>
           </div>
           </div>  
        </div>`
    ).join("")
    }


window.onload = async () => {
    const data = await GetProducts()
    DisplayProducts(data)
}