function calculateTip() {
  const billAmountInput = document.getElementById("billAmt");
  const serviceQualityInput = document.getElementById("serviceQual");
  const numberOfPeopleInput = document.getElementById("numOfPeople");
  const eachLabel = document.getElementById("each");
  const totalTipBox = document.getElementById("totalTip");
  const tipValue = document.getElementById("tip");

  if (!billAmountInput || !serviceQualityInput || !numberOfPeopleInput || !eachLabel || !totalTipBox || !tipValue) {
    return;
  }

  const billAmount = billAmountInput.value.trim();
  const serviceQuality = Number(serviceQualityInput.value);
  let numberOfPeople = Number(numberOfPeopleInput.value);

  if (serviceQuality === 0 || billAmount === "") {
    alert("Please enter the bill amount and service quality.");
    return;
  }

  if (numberOfPeopleInput.value === "" || numberOfPeople < 1) {
    numberOfPeople = 1;
    eachLabel.style.display = "none";
  } else {
    eachLabel.style.display = "block";
  }

  const total = ((Number(billAmount) * serviceQuality) / numberOfPeople).toFixed(2);
  totalTipBox.style.display = "block";
  tipValue.textContent = total;
}

function validateEmailWithoutRegex(email) {
  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");

  if (!email || atIndex <= 0 || dotIndex <= atIndex + 1 || dotIndex === email.length - 1) {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (!localPart || !domain) {
    return false;
  }

  return true;
}

function validateEmailWithRegex(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const calculateButton = document.getElementById("calculate");
  if (calculateButton) {
    calculateButton.onclick = calculateTip;
  }

  const totalTipBox = document.getElementById("totalTip");
  if (totalTipBox) {
    totalTipBox.style.display = "none";
  }

  const emailForm = document.getElementById("emailForm");
  const emailInput = document.getElementById("emailInput");
  const emailMessage = document.getElementById("emailMessage");

  if (emailForm && emailInput) {
    emailForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = emailInput.value.trim();
      const isValid = validateEmailWithRegex(email);

      if (emailMessage) {
        emailMessage.textContent = isValid ? "Valid email address" : "Invalid email address";
        emailMessage.style.color = isValid ? "green" : "red";
      }
    });
  }

  const geolocationButton = document.getElementById("getLocation");
  const locationOutput = document.getElementById("locationOutput");

  if (geolocationButton && locationOutput) {
    geolocationButton.addEventListener("click", () => {
      if (!navigator.geolocation) {
        locationOutput.textContent = "Geolocation is not supported by this browser.";
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          locationOutput.textContent = `Latitude: ${latitude}\nLongitude: ${longitude}`;
        },
        () => {
          locationOutput.textContent = "Unable to retrieve your location.";
        }
      );
    });
  }
});
