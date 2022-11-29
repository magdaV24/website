function clock(){
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


let shoppingCart = localStorage.getItem("shopping-cart")
? JSON.parse(localStorage.getItem("shopping-cart"))
: [];

let favorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];

let cartPage = document.querySelector(".shop-cart");


let addToCart = () => {
    localStorage.getItem("shopping-cart", JSON.stringify(shoppingCart));
    return (cartPage.innerHTML = shoppingCart.
        map((book) => {
            let { id, author, title, cover, price} = book;
            return `
            <div class="container-shop" id=id-${id}>
            <div class="item-box">
                <div class="cover">
                    <img src=${cover} alt="cover-photo">
                </div>
                <div class="br"></div>
                <div class="about">
                    <div class="title" style="font-size: 25px">${title}</div>
                    <div class="author" style="font-size: 18px">${author}</div>
                </div>
                <div class="br"></div>
            </div>
        <div class="actions">
            <div class="add-remove">
                <div id="decrease" class="btn"><i class="fa-solid fa-circle-minus"></i></div>
                <div class="quantity"></div>
                <div id="increase" class="btn"><i class="fa-solid fa-circle-plus"></i></div>
            </div>
            <div class="br"></div>
            <div class="total">Total: <div id="price">${price}</div></div>
        </div>
        </div>
        `
        }).join(""))
}

addToCart();

const minus = document.querySelectorAll("#decrease");
const plus = document.querySelectorAll("#increase");
let sum = document.querySelectorAll("#price");

let totalSum = document.querySelector("#total");


let qnt = document.querySelectorAll(".quantity");

let cartItem = document.querySelectorAll(".container-shop");
let arr = [];
let indexSum = 0;

for(let i = 0; i < shoppingCart.length; i++){
    arr[i] = sum[i].innerHTML;
    arr[i] = Number(arr[i].replace("$",""));
    indexSum += arr[i];
}

totalSum.innerHTML = `$${indexSum}`;

let shoppingList = {
    id: this.id,
    author: this.name,
    title: this.title,
}

for(let i = 0; i < shoppingCart.length; i++){
    const book = Object.create(shoppingList);

    arr[i] = sum[i].innerHTML;
    arr[i] = Number(arr[i].replace("$",""));
    let qntIndex = 1;
    qnt[i].innerHTML = qntIndex;
    let total;
    minus[i].addEventListener("click", function(){
        
        book.author = cartItem[i].querySelector(".author").innerHTML;
        book.title = cartItem[i].querySelector(".title").innerHTML;
        book.id = "id-" + i;

        qntIndex--;
        if(qntIndex < 1){
            //let x = shoppingCart.indexOf(book[i]);
            console.log(shoppingCart)
            shoppingCart.splice(i, 1);
            console.log(shoppingCart)
            localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
            cartItem[i].parentNode.removeChild(cartItem[i]);
            total = arr[i] * qntIndex;
            total = total.toFixed(2);
            indexSum = Number(indexSum);
            sum[i].innerHTML = `$ ${total}`;
            indexSum = indexSum - arr[i];
            indexSum = indexSum.toFixed(2);
            totalSum.innerHTML = `$${indexSum}`;
        
        } else {
            qnt[i].innerHTML = qntIndex;
            total = arr[i] * qntIndex;
            total = total.toFixed(2);
            sum[i].innerHTML = `$ ${total}`;
            indexSum = Number(indexSum);
            indexSum -= arr[i];
            indexSum = indexSum.toFixed(2);
            totalSum.innerHTML = `$${indexSum}`;
        }
    })

    plus[i].addEventListener("click", function(){
        qntIndex++;
        qnt[i].innerHTML = qntIndex;
        total = arr[i] * qntIndex;
        total = total.toFixed(2);
        sum[i].innerHTML = `$ ${total}`;
        indexSum = Number(indexSum);
        indexSum += arr[i];
        indexSum = indexSum.toFixed(2);
        totalSum.innerHTML = `$${indexSum}`;
    })
}


const deleteCart = document.querySelector(".empty-cart");

deleteCart.addEventListener("click", function(){
    delete localStorage["shopping-cart"];
})

let heartCounter = document.querySelector("#heart-counter");

let heartIndex = favorites.length;
heartCounter.innerHTML = heartIndex;

let cartCounter = document.querySelector("#cart-counter");

let cartIndex = shoppingCart.length;
cartCounter.innerHTML = cartIndex;
