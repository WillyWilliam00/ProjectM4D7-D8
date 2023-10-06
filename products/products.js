async function deleteproduct() {
  const response = await fetch("https://striveschool-api.herokuapp.com/api/product/6520156b6bbd9a001874b942", {
    method: "DELETE",
    headers: {
    
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjZjIwYzUyYmJmMzAwMTg3OWIxZTgiLCJpYXQiOjE2OTYzOTU3ODgsImV4cCI6MTY5NzYwNTM4OH0.9R7rOYsAE9jENc32hvt3ua7fc2bv2dWkSDK-PGXuOFE"

    }
    
  })
}

deleteproduct()