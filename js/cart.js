document.addEventListener("DOMContentLoaded",()=>{

   

    async function populateCart(){
        const cart = await fetchCardById(1);
        const cartProducts = cart.products;
        const productQuantityMapping={};
        const cartProductDownloadPromise = cartProducts.map(product=>{
            productQuantityMapping[product.productId]=product.quantity;
            return fetchProductById(product.productId);
        })
        const products = await Promise.all(cartProductDownloadPromise);
        let totalPrice=0;
        products.forEach(product=>{
            totalPrice+=product.price;
            console.log(product.title,product.id,productQuantityMapping[product.id]);
        })
        document.getElementById('total-price').textContent=totalPrice;
        document.getElementById('net-price').textContent=totalPrice-10;
        

    
    }
   
    populateCart();
})