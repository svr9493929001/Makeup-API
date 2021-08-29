const list = document.createElement("section");
list.setAttribute("class", "user-list")
document.body.append(list);


const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter Brand name"
input.setAttribute("class", "user-input");

const productInput = document.createElement("input");
productInput.type = "text";
productInput.placeholder = "Enter Product type"
productInput.setAttribute("class", "product-input");

const button = document.createElement("button");
button.innerText = "Search";
button.addEventListener("click",
    async function search() {
    const inputValue = document.querySelector(".user-input").value;
    const productType = document.querySelector(".product-input").value;
    getProducts(inputValue,productType)
})

const inputs = document.createElement("div");
inputs.setAttribute("class", "inputs");
inputs.append(input,productInput,button);
document.body.append(inputs);

async function getProducts(value,iteam) {
    if (value == null && iteam == null) {
        try {
            const data = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?`);
            products = await data.json()
            document.querySelector(".user-list").innerHTML = "";
            products.forEach((product) => displayProducts(product)); 
            
        } catch (error) {
            console.log("error")
        }
    }

    else if (value != null) {
        const data = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${value}`, 
    ); 
     products = await data.json()
    document.querySelector(".user-list").innerHTML = "";
    products.forEach((product) => displayProducts(product)); 
    }
        
    else if (product != null) {
        const data = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${iteam}`,
        );
         products = await data.json()
    document.querySelector(".user-list").innerHTML = "";
    products.forEach((product) => displayProducts(product)); 
    }
        
    else {
     const data = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${value}&product_type=${iteam}`, 
    ); 
     products = await data.json()
    document.querySelector(".user-list").innerHTML = "";
    products.forEach((product) => displayProducts(product));  
        }
}
getProducts();

function displayProducts({  brand, name, image_link, price, price_sign, description, website_link}) {
    const info = document.createElement('div');
    info.setAttribute("class", "container");
    info.innerHTML = `
    <div>
        <div class="user-container">
        <img src="${image_link}" onerror="this.onerror=null;this.src='https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png';" class="user-pic" width="250px" height="150px">
        
    </div>
        

    <div class="details">
        <h3>Brand: ${brand}</h3>
        <h3>Product name: ${name}</h3>
        <h3>Price: ${price_sign}${price}</h3>
        <p>${description}</p>
        <a href="${website_link}" target="_blank">Click Here</a>
    </div>
    `;
    document.querySelector('.user-list').append(info);
}
