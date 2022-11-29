function clock() {
    var hr = document.querySelector(".hours");
    var min = document.querySelector(".minutes");
    var sec = document.querySelector(".seconds");

    var hour = new Date().getHours();
    var minute = new Date().getMinutes();
    var second = new Date().getSeconds();

    hr.innerHTML = hour;
    min.innerHTML = minute;
    sec.innerHTML = second;
}

var interval = setInterval(clock, 1000);


let favorites = localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [];

let shoppingCart = localStorage.getItem("shopping-cart")
? JSON.parse(localStorage.getItem("shopping-cart"))
: [];

let favoritesPage = document.querySelector(".favorites-page");

let addToFavorites = () => {
    localStorage.getItem("favorites", JSON.stringify(favorites));
    return (favoritesPage.innerHTML = favorites.
        map((book) => {
            let { id, title, cover, price, author} = book;
            return `
        <div class="container-fav" id=${id}>
            <div class="remove"><i class="fa-regular fa-trash-can"></i></div>
            <div class="box">
                <img src=${cover} alt="cover" class="cover">
                <div class="about">
                    <div class="title" style="font-size: 20px">${title}</div>
                     <div class="author" style="font-size: 15px">${author}</div>
                <div class="buy">
                    <div class="button cart-button"><i class="fa-solid fa-basket-shopping"></i></div>
                    <div class="price">${price}</div>
                </div>
            </div>
           </div>
        </div>
        `
        }).join(""))
}

addToFavorites();

let heartCounter = document.querySelector("#heart-counter");

let heartIndex = favorites.length;
heartCounter.innerHTML = heartIndex;

const delFavItem = document.querySelectorAll(".remove");
const favItem = document.querySelectorAll(".container-fav");

for(let i = 0; i < favorites.length; i++){
    delFavItem[i].addEventListener("click", function(){
        favItem[i].parentNode.removeChild(favItem[i]);
        favorites.splice(i, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
}

let cartBtn = document.querySelectorAll(".cart-button");

let cartCounter = document.querySelector("#cart-counter");

let cartIndex = shoppingCart.length;
cartCounter.innerHTML = cartIndex;

let shoppingList = {
    id: this.id,
    cover: this.cover,
    author: this.name,
    title: this.title,
    price: this.price
}

for(let i = 0; i < favorites.length; i++){
    const book = Object.create(shoppingList);
    
    book.author = favItem[i].querySelector(".author").innerHTML;
    book.title = favItem[i].querySelector(".title").innerHTML;
    book.cover = favItem[i].querySelector(".cover").src;
    book.price = favItem[i].querySelector(".price").innerHTML;
    cartBtn[i].addEventListener("click", function(){
        let x = JSON.parse(localStorage.getItem('shopping-list'))
        shoppingCart.push(book);
        localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
        cartIndex++;
        cartCounter.innerHTML = cartIndex;
    })
}


let update = () => {
    heartCounter.innerHTML = heartIndex; 
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

update();
