function getQueryParams(){
    const queryparams = new URLSearchParams(window.location.search);
    const queryParamsObject = Object.fromEntries(queryparams.entries());
    console.log(queryParamsObject);
    return queryParamsObject
}

async function fetchProductById(id){
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return product.data
}
async function fetchCardById(id){
    const carts = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    return carts.data;

}