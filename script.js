const BASE_URL =
   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// All Btn And Input Access
const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector(".exchange-btn");
const msg = document.querySelector(".msg");
const fromCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
   for (let data in countryList) {
      let option = document.createElement("option");
      option.innerText = data;
      option.value = data;
      if (select.name == "from" && option.value == "INR") {
         option.selected = "selected";
      } else if (select.name == "to" && option.value == "USD") {
         option.selected = "selected";
      }
      select.append(option);

      select.addEventListener("change", (evt) => {
         updateFlag(evt.target);
      });
   }
}

const updateExchangeRate = async (evt) => {
   evt.preventDefault();
   const input = document.querySelector(".amount-input");
   let inpVal = input.value;

   if (inpVal == "") {
      inpVal = 1;
      input.value = "1";
   } else if (inpVal < 1) {
      alert("Not Allowed Nagative Value");
      inpVal = 1;
      input.value = "1";
   }

   const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   const response = await fetch(url);
   const data = await response.json();
   const amount = data[toCurr.value.toLowerCase()];

   const finalAmount = inpVal * amount;
   msg.textContent = `${inpVal} ${fromCurr.value} = ${finalAmount.toFixed(3)} ${toCurr.value}`;
};

const updateFlag = (element) => {
   const currCode = element.value;
   const countryCode = countryList[currCode];
   const img = element.parentElement.querySelector("img");
   const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   img.src = newSrc;
};

btn.addEventListener("click", updateExchangeRate);
window.addEventListener("load", updateExchangeRate);
