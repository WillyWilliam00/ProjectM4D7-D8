const Row = document.querySelector(".row")


async function GetProducts() {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",
                                { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE" }}  )
    const data = await response.json()
    console.log(data)
    return data
}
// function DisplayProducts(data) {
    
// }
window.onload = async () => {
    const data = await GetProducts()
    DisplayProducts(data)
}