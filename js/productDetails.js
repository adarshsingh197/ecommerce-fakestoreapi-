document.addEventListener("DOMContentLoaded",async()=>{

  async function populateproduct(){
    const querparams= getQueryParams();
    if(querparams['id']){
        const productId = querparams['id'];
        const product = await fetchProductById(productId);
        console.log(product);
        console.log(typeof product)
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");
        const productDesc= document.getElementById("product-description-data");
        const productImg = document.getElementById("product-img");
        console.log(productName.textContent)
        productName.textContent=product.title;
        productDesc.textContent=product.description;
        productImg.src=product.image;
        productPrice.textContent=product.price

    }

   }
   populateproduct();


})