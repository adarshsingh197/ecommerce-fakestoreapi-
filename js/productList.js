document.addEventListener("DOMContentLoaded", () => {
    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        return response.data;
    }

    async function populateProducts(products) {
        console.log(products);
        const productList = document.getElementById("productList");
        productList.innerHTML = ""; // Clear the product list before populating
        products.forEach(product => {
            const productItem = document.createElement("a");
            productItem.target = "_blank";
            productItem.classList.add(...["product-item", "text-decoration-none", "d-inline-block"]);
            productItem.href = "productDetails.html";
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

    async function initialize() {
        const products = await fetchProducts();
        populateProducts(products);
    }

    initialize();

    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener("click", async () => {
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);
        const products = await fetchProducts();
        const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        populateProducts(filteredProducts);
    });
    const clearfilter = document.getElementById("clear");
    clearfilter.addEventListener("click",()=>{
        window.location.reload();
    })
});
