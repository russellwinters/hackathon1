let testArr = [
  {
    name: "Boulder",
    symbol: "AAA",
    iexID: "$152.53"
  },
  {
    name: "Liberty INT",
    symbol: "SHI",
    iexID: "$532.53"
  },
  {
    name: "Newark",
    symbol: "POO",
    iexID: "$12.53"
  },
  {
    name: "Dunno",
    symbol: "jgk",
    iexID: "$976.53"
  },
  {
    name: "Kingston",
    symbol: "ygk",
    iexID: "$1000.53"
  },
  {
    name: "Vancouver",
    symbol: "YVR",
    iexID: "$365.53"
  }
];

function createCards(arr) {
  let container = document.querySelector(".card-container");

  for (i = 0; i < arr.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card-container__card");
    container.appendChild(card);

    //Create span for name, symbol and iexID
    let companyName = document.createElement("span");
    companyName.classList.add("card-container__card-name");
    card.appendChild(companyName);
    let companySymbol = document.createElement("span");
    companySymbol.classList.add("card-container__card-symbol");
    card.appendChild(companySymbol);
    let companyID = document.createElement("span");
    companyID.classList.add("card-container__card-ID");
    card.appendChild(companyID);
    //Create textnode for name, symbol and iexID
    let companyNameValue = document.createTextNode(arr[i]["name"]); //Creating text node and appending name value for arr[i]
    companyName.appendChild(companyNameValue);
    let companySymbolValue = document.createTextNode(arr[i]["symbol"]); //creating text node and appending symbol value for arr[i]
    companySymbol.appendChild(companySymbolValue);
    let companyIDValue = document.createTextNode(arr[i]["iexId"]); //creating text node and appending iexID value for arr[i]
    companyID.appendChild(companyIDValue);
  }
}

function filterFunction() {
  let searchInput = document.querySelector("#my-input");
  let filter = searchInput.value.toUpperCase();
  let cardSection = document.querySelector(".card-container");
  let card = cardSection.getElementsByClassName("card-container__card");

  for (i = 0; i < card.length; i++) {
    let symbol = card[i].getElementsByClassName(
      "card-container__card-symbol"
    )[0];
    let textContent = symbol.innerText;
    if (textContent.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}

//function that will access API Data

function getData(url) {
  axios.get(url).then(response => {
    let companyArr = getCompanies(response.data);
    createCards(companyArr);
  });
}

//function to check arrays for a name
function checkName(item) {
  return item.name !== "";
}

//function to get random companies from the api data
function getCompanies(data) {
  //filter out objects without a name
  let filteredData = data.filter(checkName);
  let returnArray = [];

  //Get 100 companies through a loop
  for (i = 0; i < 100; i++) {
    let random = Math.floor(Math.random() * filteredData.length);
    returnArray.push(filteredData[random]);
  }
  console.log(returnArray);
  return returnArray;
}

getData("https://api.iextrading.com/1.0/ref-data/symbols");
