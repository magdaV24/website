const featuredProducts = document.querySelector(".featured-products");

let addToFeaturedProducts = () => {
    return (featuredProducts.innerHTML = featuredProductsList.map(
        (product) => {
                let { id, cover, author, title } = product;
                return`<div class="item" id=id-${id}>
                <div class="box">
                    <div class="cover">
                        <img src=${cover} alt="cover">
                    </div>
                    <div class="autor" style="font-size: 20px; cursor: pointer">${author}</div>
                    <div class="title" style="font-size: 17px; cursor: pointer; margin-top: -10px">${title}</div>
                </div>
            </div>`
            }).join(""))
};

addToFeaturedProducts();

let email = document.querySelector(".email");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    emailValue = email.value.trim();

    if(emailValue === ''){
        isError(email);
    } else if(!validEmail(emailValue)){
        isError(email);
    } else{
        isSuccess(email);
    }
})

function validEmail(email){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function isError(input){
    input.classList.add("error");
}

function isSuccess(input){
    input.classList.add("success");
}

let shoppingCart = localStorage.getItem("shopping-cart")
? JSON.parse(localStorage.getItem("shopping-cart"))
: [];

let favorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];
let heartCounter = document.querySelector("#heart-counter");

let heartIndex = favorites.length;
heartCounter.innerHTML = heartIndex;

let cartCounter = document.querySelector("#cart-counter");

let cartIndex = shoppingCart.length;
cartCounter.innerHTML = cartIndex;