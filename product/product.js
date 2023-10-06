const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const col = document.querySelector(".col-12")

async function GetProduct() {
    col.innerHTML = /*html*/

        `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,
            { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE" } })
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

    `<div class="d-flex">
        <div>
            <img src="${data.imageUrl}" class="border-radius-black" style="max-width: 600px; max-height: 450px;">
        </div>
        <div class=" ms-5 px-3 border-radius-black d-flex flex-column justify-content-evenly">
            <div class="border-bottom border-secondary-subtle">
                <h2>${data.name}</h2>
            </div>
            <div class="border-bottom border-secondary-subtle"><h4>Brand:</h4>
                <p>${data.brand}</p>
            </div>
            <div class="border-bottom border-secondary-subtle"><h4>Descrizione:</h4>
                <p>${data.description}</p>
            </div>
            <div><h4>Prezzo:</h4>
                <p>${data.price}</p>
            </div>
        </div>    
    </div>`
}

window.onload = async () => {


    const data = await GetProduct();
    DisplayProduct(data);

}