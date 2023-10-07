 params = new URLSearchParams(window.location.search)
 id = params.get("id")
 col = document.querySelector("main")


prew = document.querySelector(".preview")
  NameProduct = document.querySelector("#name")
  DescriptionProduct = document.querySelector("#description")
  BrandProduct = document.querySelector("#brand")
  ImageProduct = document.querySelector("#image")
  PriceProduct = document.querySelector("#price")
  PrevieWbutton = document.querySelector(".PreviewButton")
 const SpanProductName = document.querySelectorAll(".product-title")

 
 window.onload = async () => {
    const data = await GetProduct();
    ShowForm(data);

}


async function ShowForm(data) {

    SpanProductName.forEach(title => {
        title.innerHTML = `${data.name}`
    })


  document.querySelector(".form").innerHTML = /*html*/

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
                                id="description" value="${data.description}"></textarea>

                        </div>
                        <div class="col-12">
                            <label for="brand" class="form-label">Brand</label>
                            <input required type="text" class="form-control" id="brand" placeholder="Product Brand" value="${data.brand}">

                        </div>
                        <div class="col-12">
                            <label for="image" class="form-label">Image Url</label>
                            <input required type="text" class="form-control" id="image"
                                placeholder="https://bit.ly/3CExjRa" value="${data.imageUrl}">

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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE"
            },
            body: JSON.stringify(ModificatedProduct)
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

