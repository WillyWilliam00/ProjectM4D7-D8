 const params = new URLSearchParams(window.location.search)
 const id = params.get("id")
 const form = document.querySelector(".form")
 const prew = document.querySelector(".preview")
 const PrevieWbutton = document.querySelector(".PreviewButton")
 const SpanProductName = document.querySelectorAll(".product-title")


 

 async function GetProduct() {
    form.innerHTML = /*html*/

        `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,
            { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YWIzZmU3NDZhMDAwMTQ4MTQzMmEiLCJpYXQiOjE2OTgxNDcxMzUsImV4cCI6MTY5OTM1NjczNX0.TR1hsSdcexBRjdgceNjq99aPbvXh02T3FgbG1eaML8U" } })
        const data = await response.json()

        console.log(data)
        return data
    }
    catch {
        alert("oh oh");
    }
    finally {
        form.querySelector(".lds-ring").remove();
    }
}

 
 window.onload = async () => {
    const data = await GetProduct();
    ShowForm(data);

}


async function ShowForm(data) {
    

    SpanProductName.forEach(title => {
        title.innerHTML = `${data.name}`
    })


    form.innerHTML = /*html*/

    `
    <h4 class="mb-5">Compila il form e modifica <span class="product-title">${data.name}</span></h4>
                    <form class="row g-3 d-flex flex-column border-radius-black" onsubmit="ModifyProduct(event)">
                        <div class="col-12">
                            <label for="name" class="form-label">Name</label>
                            <input required type="text" class="form-control" id="name" placeholder="Product Name" value="${data.name}">

                        </div>
                        <div class="col-12">
                            <label for="image" class="form-label">Description</label>
                            <textarea required class="form-control" aria-label="With textarea" placeholder="Description"
                                id="description">${data.description}</textarea>

                        </div>
                        <div class="col-12">
                            <label for="brand" class="form-label">Brand</label>
                            <input required type="text" class="form-control" id="brand" placeholder="Product Brand" value="${data.brand}">

                        </div>
                        <div class="col-12">
                            <label for="image" class="form-label">Image Url</label>
                            <input required type="text" class="form-control" id="image"
                                placeholder="https:bit.ly/3CExjRa" value="${data.imageUrl}">

                        </div>

                        <div class="col-12">
                            <label for="price" class="form-label">Price</label>
                            <div class="d-flex">
                                <span class="input-group-text form-price-border-span">€</span>
                                <input required type="text" class="form-control form-price-border-input" id="price" placeholder="5.50" value="${data.price}">
                            </div>

                        </div>

                        <div class="col-12 text-center py-3">
                            <button class="btn btn-primary fw-bolder bg-success border-0 mx-1 fs-4 hover-button" type="submit">Modify Product</button>
                            <button class="btn btn-primary fw-bolder bg-danger border-0 mx-1 fs-4 hover-button" onclick="CleanForm()" type="button">Clean All</button>
                        </div>
                    </form>
    `

    preview()
}

async function preview() {
    const NameProduct = document.querySelector("#name")
    const DescriptionProduct = document.querySelector("#description")
    const BrandProduct = document.querySelector("#brand")
    const ImageProduct = document.querySelector("#image")
    const PriceProduct = document.querySelector("#price")
    
   
    
     FocusInputWithoutValue()
     if ((NameProduct.value !== "") && (DescriptionProduct.value !== "") && (BrandProduct.value !== "") && (ImageProduct.value !== "") && (PriceProduct.value !== "")) {
      
       prew.innerHTML = `
          <div class="card mb-3 border-0">
             <div class="row g-0 my-auto border-radius-black">
                 <div class="col-6">
                    <img src="${ImageProduct.value}" class="card-img-top border-radius-img" alt="..." style="height: 100%; aspect-ratio: 0.8; object-fit: cover;">
                     <i class="bi bi-plus-circle more fs-2"></i>
                
                  
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



async function ModifyProduct(event) {
    event.preventDefault();
    document.querySelector(".waveform").classList.remove("d-none")
    document.documentElement.classList.add("filterBody")

    const ModificatedProduct = {
        name: NameProduct.value,
        description: DescriptionProduct.value,
        brand: BrandProduct.value,
        imageUrl: ImageProduct.value,
        price: PriceProduct.value
    }
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YWIzZmU3NDZhMDAwMTQ4MTQzMmEiLCJpYXQiOjE2OTgxNDcxMzUsImV4cCI6MTY5OTM1NjczNX0.TR1hsSdcexBRjdgceNjq99aPbvXh02T3FgbG1eaML8U"
            },
            body: JSON.stringify(ModificatedProduct)
        })

        if (response.ok) {
            document.querySelector(".waveform").classList.add("d-none")
            ShowModal()
            document.documentElement.classList.remove("filterBody")
            CleanForm()
            
          } else {
            console.error("oh oh")
            document.querySelector(".waveform").classList.add("d-none")
            document.classList.remove("filterBody")
          }

    
}

 function  ShowModal(){
    let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
    myModal.show();
  }
  
  document.addEventListener("click",  function (event) {
    NameProduct = document.querySelector("#name")
    DescriptionProduct = document.querySelector("#description")
    BrandProduct = document.querySelector("#brand")
    ImageProduct = document.querySelector("#image")
    PriceProduct = document.querySelector("#price")
    if(event.target !== PrevieWbutton) {
     
      for (const input of [NameProduct, DescriptionProduct, BrandProduct, ImageProduct, PriceProduct]) {
         input.classList.remove("focus-input")
         
     }
    } 
  })
  
    function CleanForm() {
        NameProduct = document.querySelector("#name")
        DescriptionProduct = document.querySelector("#description")
        BrandProduct = document.querySelector("#brand")
        ImageProduct = document.querySelector("#image")
        PriceProduct = document.querySelector("#price")
    
    prew.innerHTML = ""
    for (const input of [NameProduct, DescriptionProduct, BrandProduct, ImageProduct, PriceProduct]) {
      input.value = ''
    }
  
  }
  async function FocusInputWithoutValue() {
    prew.innerHTML = `<h2 class="text-danger">Compila tutti i campi per procedere!</h2>`
    for (const input of [NameProduct, DescriptionProduct, BrandProduct, ImageProduct, PriceProduct]) {
      if(input.value === "") return input.classList.add("focus-input"), input.focus()
      
   }
  }