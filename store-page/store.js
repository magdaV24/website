


let bookStore = document.querySelector(".book-store");

let generateStore = () => {
    return (bookStore.innerHTML = storeItems.
        map((book) => {
        let {id, author, title, rating, cover, price, synopsis, category}  = book;
        return `
        <div class="container ${category}" id=id-${id}>
                <div class="book-box">
                    <div class="cover" >
                        <img src=${cover} alt="book-cover" id="cover">
                    </div>
                    <div class="pop-up" id=pop-${id}>
                        <p style="font-size: 1.2rem; color: var(--background); font-weight: bold; padding: 5px" id="synopsis">${synopsis}</p>
                    </div>
                </div>
                <div id="author" style="font-size: 1.5rem; font-weight: bold; padding: 5px">${author}</div>
                <div class="title" id="title" style="font-size: 1.2rem;">${title}</div>
                <div class="rating" id="rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <p id="votes">${rating}</p>
                </div>
                <div class="synopsis" style="font-size: .9rem; color: var(--background); "id=${id}")>Read More</div>
                <div class="bottom-line">
                    <div class="buttons">
                        <div class="heart">
                            <i class="fa-regular fa-heart" style=" font-size: 30px;"></i>
                            <i class="fa-solid fa-heart" style=" font-size: 30px;"></i>
                        </div>
                        <i class="fa-solid fa-cart-shopping" id="cart" style=" font-size: 30px;"></i>
                    </div>
                    <div class="price" style="font-size: 30px;" id="price">${price}</div>
                </div>
            </div>
        `
    }).join(""))
};

generateStore();


let btn = document.querySelectorAll(".synopsis");
let books = document.querySelectorAll(".book-box");
let item = document.querySelectorAll(".container");

let favoriteList = {
    id: this.id,
    cover: this.cover,
    author: this.name,
    title: this.title,
    price: this.price,
    rating: this.rating,
    synopsis: this.synopsis
}

let shoppingList = {
    id: this.id,
    cover: this.cover,
    author: this.name,
    title: this.title,
    price: this.price
}

for(let i = 0;i < storeItems.length; i++){
    btn[i].addEventListener("click", function(){
        books[i].classList.toggle("pop");
    })
}

let heart = document.querySelectorAll(".heart");

let favorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];

let shoppingCart = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];


// favorites

let favoritesPage = document.querySelector(".favorites-page");

for(let i = 0; i < storeItems.length; i++){
    const book = Object.create(favoriteList);
    heart[i].addEventListener("click", function(){

        book.author = item[i].querySelector("#author").innerHTML;
        book.title = item[i].querySelector("#title").innerHTML;
        book.cover = item[i].querySelector("#cover").src;
        book.price = item[i].querySelector("#price").innerHTML;
        book.rating = item[i].querySelector("#votes").innerHTML;
        book.synopsis = item[i].querySelector("#synopsis").innerHTML;
        book.id = "";

        if(favorites.includes(book)){
            let x = favorites.indexOf(book);
            favorites.splice(x, 1);
            heart[i].classList.remove("clicked");
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } else {
            book.id = "id-" + i;
            heart[i].classList.add("clicked");
            favorites.push(book);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    })
}

let heartCounter = document.querySelector("#heart-counter");

let heartIndex = favorites.length;
heartCounter.innerHTML = heartIndex;

let cartCounter = document.querySelector("#cart-counter");

let cartIndex = shoppingCart.length;
cartCounter.innerHTML = cartIndex;


// shopping cart

let buy = document.querySelectorAll("#cart");

for(let i = 0; i < storeItems.length; i++){

    const book = Object.create(shoppingList);
    
    book.author = item[i].querySelector("#author").innerHTML;
    book.title = item[i].querySelector("#title").innerHTML;
    book.cover = item[i].querySelector("#cover").src;
    book.price = item[i].querySelector("#price").innerHTML;

    buy[i].addEventListener("click", function(){
        if(!shoppingCart.includes(book)){
            book.id = `id-${i}`;
            cartIndex += 1;
            buy[i].classList.add("added");
            shoppingCart.push(book);
            cartCounter.innerHTML = cartIndex;
            localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
        } else {
            alert("The product is in the shopping cart! You can change the quantity there!");
        }
    })
}

let addToCart = () => {
    console.log(shoppingCart.id);
}

addToCart();

// random quote machine

var quoteBtn = document.querySelector(".button-random");

let randomQuote = document.querySelector(".text");
let author = document.querySelector(".author");
let title = document.querySelector(".title");

quoteBtn.addEventListener("click", function(){
    let x = Object.keys(quotes).length;
    let i = Math.floor(Math.random()*x);

    randomQuote.innerHTML = quotes[i].quote;
    author.innerHTML = " " + quotes[i].author;
    title.innerHTML =  `${quotes[i].book} by` ;
})

// picking a genere

const pickBtn = document.querySelector(".pick");
let infoTxt = document.querySelector(".info");
const options = document.querySelectorAll("option");

pickBtn.addEventListener("click", function () {

    document.querySelector('.genere').classList.add('clicked');

    for(let i = 0; i < options.length; i++){
        options[i].addEventListener("click", function(){
            let value = options[i].value;
            for(let i = 0; i < storeItems.length; i++){
                if(value === "all"){
                    item[i].classList.remove("hide");
                    document.querySelector('.genere').classList.remove('clicked');
                } else if(item[i].classList.contains(value)){
                    item[i].classList.remove("hide");
                    document.querySelector('.genere').classList.remove('clicked');
                } else{
                    item[i].classList.add("hide");
                    document.querySelector('.genere').classList.remove('clicked');
                }
            }

            if(value === "modern-classic"){
                infoTxt.innerHTML = "Modern classics are generally written after WWI. Amongst the most well known books in this category we find Lilita by Vladimir Nabokov or To kill a mockingbird by Harper Lee"
            } else if(value === "adventure"){
                infoTxt.innerHTML = "Adventure fiction is a genre of fiction in which an adventure, an exciting undertaking involving risk and physical danger, forms the main storyline. Adventure novels and short stories were popular subjects for American pulp magazines, which dominated American popular fiction between the Progressive Era and the 1950s."
            } else if(value === "all"){
                infoTxt.innerHTML = "Look amongst the books of your favorite genere that we have or get out of your comfort zone and pick something new!"
            } else if(value === "science-fiction"){
                infoTxt.innerHTML = "Science fiction is a broad genre of fiction that often involves speculations based on current or future science or technology. "
            } else if(value === "mystery"){
                infoTxt.innerHTML = "Mystery fiction is a loosely-defined term that is often used as a synonym of detective fiction — in other words a novel or short story in which a detective (either professional or amateur) solves a crime."
            } else if(value === "philosophy"){
                infoTxt.innerHTML = "Philosophy is the study of general problems concerning matters such as existence, knowledge, truth, beauty, justice, validity, mind, and language. "
            } else if(value === "retelling"){
                infoTxt.innerHTML = "A new version of an older story. Sometimes, a fairy tale or myth may be reimagined with a modernized setting or retold from a minor character's perspective."
            } else if(value === "thriller"){
                infoTxt.innerHTML = "Thrillers are characterized by fast pacing, frequent action, and resourceful heroes who must thwart the plans of more-powerful and better-equipped villains."
            } else if(value === "horror"){
                infoTxt.innerHTML = "Horror fiction is fiction in any medium intended to scare, unsettle, or horrify the audience. Historically, the cause of the horror experience has often been the intrusion of a supernatural element into everyday human experience."
            } else if(value === "romance"){
                infoTxt.innerHTML = "According to the Romance Writers of America, ''Two basic elements comprise every romance novel: a central love story and an emotionally-satisfying and optimistic ending.'' "
            } else if(value === "classic"){
                infoTxt.innerHTML = "A classic stands the test of time. The work is usually considered to be a representation of the period in which it was written; and the work merits lasting recognition."
            }
        })
    }
})

