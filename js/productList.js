document.addEventListener("DOMContentLoaded", async() => {
    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        return response.data;
    }

    async function  fetchProductByCategory(category){
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        return response.data;
    }
    async function fetchCategories(){
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = response.json();
       return data;
    }
    const downloadProducts = await fetchProducts();

    async function populateProducts(flag,customproducts) {
       const queryParams = new URLSearchParams(window.location.search);
       const queryParamsObject = Object.fromEntries(queryParams.entries());     
        let products = customproducts;
            if(flag==false){
                if(queryParamsObject['category']){
                  products = await fetchProductByCategory(queryParamsObject['category'])
                }
                else{

                    products= await fetchProducts();
                }
            }
        const productList = document.getElementById("productList");
        productList.innerHTML = ""; 
        products.forEach(product => {
            const productItem = document.createElement("a");
            productItem.target = "_blank";
            productItem.classList.add(...["product-item", "text-decoration-none", "d-inline-block"]);
            productItem.href = `productDetails.html?id=${product.id}`;

            const productImage = document.createElement("div");
            const productName = document.createElement("div");
            const productPrice = document.createElement("div");

            productImage.classList.add("product-img");
            productName.classList.add("product-name", "text-center");
            productPrice.classList.add("product-price", "text-center");

            productName.textContent = product.title.substring(0, 12);
            productPrice.innerHTML = `&#8377; ${product.price}`;

            const insideProductImage = document.createElement("img");
            insideProductImage.src = product.image;

            productImage.appendChild(insideProductImage);
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);
            productList.appendChild(productItem);
        });
    }

    async function populateCategories(){
        const categories = await fetchCategories();
        const categoryList = document.getElementById("categoryList");
        categories.forEach(category=>{
          
            const categoryLink = document.createElement("a");
            categoryLink.textContent=category
            categoryLink.href=`productList.html?category=${category}`;
            categoryLink.classList.add("d-flex", "text-decoration-none");
           categoryList.appendChild(categoryLink);
        })

    }

    async function downloadContentAndPopulate(){
        Promise.all([ populateProducts(false,downloadProducts), populateCategories()        ])
       .then(()=>{
        const loaderBackdrop = document.getElementById("loader-backdrop");
        loaderBackdrop.style.display="none";
       })
       
    }
    downloadContentAndPopulate();

   

    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener("click", async () => {
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);
        const products = downloadProducts;
        const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        populateProducts(true,filteredProducts);
    });
    const clearfilter = document.getElementById("clear");
    clearfilter.addEventListener("click",()=>{
        window.location.reload();
    })
});
