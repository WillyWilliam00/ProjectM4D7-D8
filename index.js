const Row = document.querySelector(".row")


async function GetProducts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users",
                                { headers: { "Authorization": "INSERISCI AUTORIZZAZIONE" }}  )
    const data = await response.json()
    return data
}
async function DisplayProducts(data) {
    
}
window.onload = async () => {
    const data = await GetProducts()
    DisplayProducts(data)
}