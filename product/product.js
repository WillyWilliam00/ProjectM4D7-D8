let params = new URLSearchParams(window.location.search)
let id = params.get("id")
let col = document.querySelector(".col-12")

async function GetProduct() {
    col.innerHTML = /*html*/

        `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,
            { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YWIzZmU3NDZhMDAwMTQ4MTQzMmEiLCJpYXQiOjE3MDkwNDk4MDAsImV4cCI6MTcxMDI1OTQwMH0.Oc34YPNC_iKCwZxPcvu9jlRiqUCZ-tp4q0q5WxLvsyo" } })
        const data = await response.json()

        console.log(data)
        return data
    }
    catch {
        alert("oh oh");
    }
    finally {
        col.querySelector(".lds-ring").remove();
    }
}

function DisplayProduct(data) {

    col.innerHTML =  /*html*/

    `<div class="d-flex justify-content-center align-items-center">
        <div>
            <img src="${data.imageUrl}" class="border-radius-black" style="max-width: 600px; max-height: 450px;">
        </div>
        <div class=" col-6 ms-5 px-3 border-radius-black d-flex flex-column justify-content-evenly "  style="background: white">
            <div class="border-bottom border-secondary-subtle py-2">
                <h2>${data.name}</h2>
            </div>
            <div class="border-bottom border-secondary-subtle"><h4>Brand:</h4>
                <p class="fs-5">${data.brand}</p>
            </div>
            <div class="border-bottom border-secondary-subtle"><h4>Descrizione:</h4>
                <p class="fs-6" >${data.description}</p>
            </div>
            <div class="border-bottom border-secondary-subtle">
                <h4>Prezzo:</h4>
                <p class="fs-6" >${data.price} €</p>
            </div>   
            <div class="mx-auto py-2">
                <button type="button" class=" fs-4 hover-button border-0 btn btn-primary bg-success text-light me-1">
                    <i class="bi bi-cart cart-main"></i>
                </button>
                <a href="../index.html"><button type="button" class=" fs-4 border-0 hover-button btn btn-secondary ms-1"><i class="bi bi-arrow-left"></i> Go Home</button></a>
            </div>
            
        </div>    
    </div>`
    
}

window.onload = async () => {


    const data = await GetProduct();
    DisplayProduct(data);

}