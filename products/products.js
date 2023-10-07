result = []


 window.onload = async () => {
   const data = await GetProducts();
   DisplayMyProducts(data);

 }

async function deleteproduct(name, id) {
  
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
    return}

    document.querySelector(".waveform").classList.remove("d-none")
    document.documentElement.classList.add("filterBody")
    
  const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE"
    }})
    if (response.ok) {
      document.querySelector(".waveform").classList.add("d-none")
      alert(`Prodotto ${name} eliminato!`)
      document.documentElement.classList.remove("filterBody")
      DisplayMyProducts(data)
    } else {
      alert("Oh Oh, riprova!")
      document.querySelector(".waveform").classList.add("d-none")
      document.classList.remove("filterBody")
            
  }
   
}

async function DisplayMyProducts(data) {

  Row.innerHTML= data.map(product => /*html*/
  `
  <div class="col-12 d-flex border-radius-black p-2">
    <div>
        <img src="${product.imageUrl}"
            class="border-radius-img" alt="..." style="width: 250px; height: 250px; object-fit: cover;">
    </div>
    <div class="ps-4 d-flex flex-column justify-content-evenly">
        <h5 class="m-0">${product.name}</h5>
        <p  class="m-0"><span class="fw-bolder">Prezzo: </span>${product.price}€</p>
        <p  class="m-0"><span class="fw-bolder">Brand: </span>${product.brand}</p>
        <span class="fw-bolder">Description:</span>
        <p  class="m-0">${product.description}</p>
     </div>
     <div class="d-flex align-items-start pt-1 pe-1">
        <a href="ModifyProduct/ModifyProduct.html?id=${product._id}"><button type="button" class="btn btn-warning hover-button" ><i class="bi bi-pencil-square"></i></button>
        <button type="button" class="btn btn-danger ms-1 hover-button" onclick="deleteproduct('${product.name}', '${product._id}')"><i class="bi bi-trash"></i></button>
     </div>
  
  </div>`).join("")
  
}
