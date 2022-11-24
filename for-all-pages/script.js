//search bar
const searchBar = document.querySelector(".search-bar");
const searchResult = document.querySelector(".search-result");

searchBar.oninput = function(){
    let result = [];

    const inputValue = this.value;

    searchResult.innerHTML = "";
    if(inputValue.length > 0){
        result = getResult(inputValue);
        
        for (i = 0; i < result.length; i++) {
            searchResult.innerHTML += "<li>" + result[i] + "</li>";
            searchResult.style.display = "block";
          }
    } 
} ;

function getResult(x) {
    const result = [];
    for (i = 0; i < autofill.length; i++) {
      if (x === autofill[i].toLowerCase().slice(0, x.length)) {
        result.push(autofill[i]);
      } else{
        searchResult.style.display = "none";
      }
    }
    return result;
}

searchResult.onclick = function (event) {
    const setValue = event.target.innerText;
    searchBar.value = setValue;
    this.innerHTML = "";
    searchResult.style.display = "none";
};


//clock

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



