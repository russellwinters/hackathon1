//function creates a card and populates it for every object of the array that is passed through it
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
    let companySymbolValue = document.createTextNode(
      `Company Symbol: ${arr[i]["symbol"]}`
    ); //creating text node and appending symbol value for arr[i]
    companySymbol.appendChild(companySymbolValue);
    let companyIDValue = document.createTextNode(`iexID: ${arr[i]["iexId"]}`); //creating text node and appending iexID value for arr[i]
    companyID.appendChild(companyIDValue);
  }
}

// Function filters on the key up event
function filterFunction() {
  let searchInput = document.querySelector("#my-input");
  let filter = searchInput.value.toUpperCase();
  let cardSection = document.querySelector(".card-container");
  let card = cardSection.getElementsByClassName("card-container__card");

  for (i = 0; i < card.length; i++) {
    let symbol = card[i].getElementsByClassName(
      "card-container__card-symbol"
    )[0];
    let name = card[i].getElementsByClassName("card-container__card-name")[0];
    let symbolContent = symbol.innerText;
    let nameContent = name.innerText;
    if (
      symbolContent.toUpperCase().indexOf(filter) > -1 ||
      nameContent.toUpperCase().indexOf(filter) > -1
    ) {
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

  while (returnArray.length !== 100) {
    let random = Math.floor(Math.random() * filteredData.length);
    if (returnArray.indexOf(filteredData[random]) === -1) {
      returnArray.push(filteredData[random]);
    }
  }
  console.log(returnArray);
  return returnArray;
}

getData("https://api.iextrading.com/1.0/ref-data/symbols");
