const prew = document.querySelector(".preview")
const NameProduct = document.querySelector("#name")
const DescriptionProduct = document.querySelector("#description")
const BrandProduct = document.querySelector("#brand")
const ImageProduct = document.querySelector("#image")
const PriceProduct = document.querySelector("#price")
const PrevieWbutton = document.querySelector(".PreviewButton")



function preview() {

  FocusInputWithoutValue()
  if ((NameProduct.value !== "") && (DescriptionProduct.value !== "") && (BrandProduct.value !== "") && (ImageProduct.value !== "") && (PriceProduct.value !== "")) {
    
    prew.innerHTML = `
       <div class="card mb-3 border-0">
          <div class="row g-0 my-auto border-radius-black">
              <div class="col-6">
              <a href="" class="position-relative">
                 <img src="${ImageProduct.value}" class="card-img-top border-radius-img" alt="..." style="height: 100%; aspect-ratio: 0.8; object-fit: cover;">
                  <i class="bi bi-plus-circle more fs-2"></i>
              </a>
                
              </div>
              <div class="col-6">
                  <div class="card-body d-flex flex-column" style= "height: 100%;">
                      <div>
                          <h5 class="card-title card-title-inbody pb-3 m-0 border-bottom border-secondary-subtle">${NameProduct.value}</h5>
                          <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Prezzo:  </span>${PriceProduct.value}€</p>
                          <p class="card-text py-3 m-0 border-bottom border-secondary-subtle"><span class="fw-bolder">Brand:  </span>${BrandProduct.value}</p>
                      </div> 
                      <span class="fw-bolder py-3">Description:</span>
                      <p class="card-text my-auto mb-2 border overflow-auto" style= "max-height: 130px;">${DescriptionProduct.value}</p>
                      <div class="pt-2"><button type="button" class="border-0 btn btn-primary bg-success border-0 fs-5 text-light"><span><i class="bi bi-cart cart-main"></i></span>
                       </button></div>
                  </div>
              </div>
           </div>
        </div>
       
     `
  }

}


async function AddProduct(event) {
  event.preventDefault()
  document.querySelector(".waveform").classList.remove("d-none")
  document.documentElement.classList.add("filterBody")

  const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM0MWNiZGJlNDYzZTAwMTgzZTc4MzIiLCJpYXQiOjE2OTc5MTQwNDUsImV4cCI6MTY5OTEyMzY0NX0.XQkiTkrtulHA_bNmfUbAt_Fv6ocYJLaF5P6RUdI4JLY"

    },
    body: JSON.stringify({
      name: NameProduct.value,
      description: DescriptionProduct.value,
      brand: BrandProduct.value,
      price: PriceProduct.value,
      imageUrl: ImageProduct.value,
    })
  })

  if (response.ok) {
    document.querySelector(".waveform").classList.add("d-none")
    ShowModal()
    document.documentElement.classList.remove("filterBody")
    CleanForm()
    
  } else {
    console.error("Cannot send")
    document.querySelector(".waveform").classList.add("d-none")
    document.classList.remove("filterBody")
  }
}



function  ShowModal(){
  let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
  myModal.show();
}

document.addEventListener("click",  function (event) {
  if(event.target !== PrevieWbutton) {
   
    for (const input of [NameProduct, DescriptionProduct, BrandProduct, ImageProduct, PriceProduct]) {
       input.classList.remove("focus-input")
       
   }
  } 
})

function CleanForm() {
  prew.innerHTML = ""
  for (const input of [NameProduct, DescriptionProduct, BrandProduct, ImageProduct, PriceProduct]) {
    input.value = ''
  }

}
function FocusInputWithoutValue() {
  prew.innerHTML = `<h2 class="text-danger">Compila tutti i campi per procedere!</h2>`
  for (const input of [NameProduct, DescriptionProduct, BrandProduct, ImageProduct, PriceProduct]) {
    if(input.value === "") return input.classList.add("focus-input"), input.focus()
    
 }
}