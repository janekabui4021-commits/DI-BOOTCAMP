const API_KEY = "bcda7e07dd5febf24de62bd0";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

const fromSelect = document.querySelector("#from-currency");
const toSelect = document.querySelector("#to-currency");
const amountInput = document.querySelector("#amount");
const convertButton = document.querySelector("#convert-btn");
const switchButton = document.querySelector("#switch-btn");
const result = document.querySelector("#result");

function showResult(message, isError = false) {
  result.textContent = message;
  result.classList.toggle("error", isError);
}

function populateSelects(codes) {
  codes.forEach(([code, name]) => {
    const option = new Option(`${code} - ${name}`, code);
    fromSelect.append(option);
    toSelect.append(option.cloneNode(true));
  });

  fromSelect.value = "USD";
  toSelect.value = "EUR";
}

async function fetchSupportedCurrencies() {
  if (API_KEY === "YOUR_API_KEY") {
    showResult("Add your ExchangeRate-API key to load currencies.", true);
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/codes`);
    if (!response.ok) {
      throw new Error("Currency list unavailable");
    }

    const data = await response.json();
    if (data.result !== "success") {
      throw new Error(data["error-type"] || "Currency list unavailable");
    }

    populateSelects(data.supported_codes);
  } catch (error) {
    showResult("Error loading currency list. Please check your API key.", true);
  }
}

async function convertCurrency() {
  const amount = Number.parseFloat(amountInput.value);

  if (!Number.isFinite(amount) || amount <= 0) {
    showResult("Please enter a valid amount.", true);
    return;
  }

  if (!fromSelect.value || !toSelect.value) {
    showResult("Select both currencies first.", true);
    return;
  }

  showResult("Converting...");

  try {
    const response = await fetch(
      `${BASE_URL}/pair/${fromSelect.value}/${toSelect.value}/${amount}`
    );
    if (!response.ok) {
      throw new Error("Conversion request failed");
    }

    const data = await response.json();
    if (data.result !== "success") {
      throw new Error(data["error-type"] || "Conversion request failed");
    }

    showResult(
      `${amount} ${fromSelect.value} = ${data.conversion_result.toFixed(2)} ${toSelect.value}`
    );
  } catch (error) {
    showResult("An error occurred during conversion.", true);
  }
}

function switchCurrencies() {
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
  convertCurrency();
}

convertButton.addEventListener("click", convertCurrency);
switchButton.addEventListener("click", switchCurrencies);
fetchSupportedCurrencies();
