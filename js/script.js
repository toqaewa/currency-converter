const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");


for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_code) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        }else if (i == 1) {
            selected = currency_code == "RUB" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://countryflagsapi.com/png/${country_code[code]}`
        }
    }
}

window.addEventListener("load", () =>{
    getExchangeRateOnLoad();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () =>{
    let tempCode  = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    if(amountVal == "" || amountVal <= "0"){
        exchangeRateTxt.innerText = "Please, enter a valid amount";
    }else{
        exchangeRateTxt.innerText = "Getting exchange rate...";
        let url = `https://api.exchangerate.host/convert?from=${fromCurrency.value}&to=${toCurrency.value}&amount=${amountVal}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.result;
        if(exchangeRate >= 0.01){
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${exchangeRate.toFixed(2)} ${toCurrency.value}`;
        }else{
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${exchangeRate} ${toCurrency.value}`;
        }
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong, please, refresh the page";
    });
    }    
}

function getExchangeRateOnLoad(){
    let amountVal = 1;
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://api.exchangerate.host/convert?from=${fromCurrency.value}&to=${toCurrency.value}&amount=${amountVal}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.result;
        if(exchangeRate >= 0.01){
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${exchangeRate.toFixed(2)} ${toCurrency.value}`;
        }else{
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${exchangeRate} ${toCurrency.value}`;
        }
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong, please, refresh the page";
    });
}