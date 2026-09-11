const form = document.getElementById("sunrise-form");
const result = document.getElementById("result");

async function getSunrise(latitude, longitude) {
	const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Sunrise request failed: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();

	if (data.status !== "OK") {
		throw new Error(`Sunrise API error: ${data.status}`);
	}

	return data.results.sunrise;
}

form.addEventListener("submit", async event => {
	event.preventDefault();

	const parisLatitude = document.getElementById("paris-latitude").value;
	const parisLongitude = document.getElementById("paris-longitude").value;
	const newYorkLatitude = document.getElementById("new-york-latitude").value;
	const newYorkLongitude = document.getElementById("new-york-longitude").value;

	result.textContent = "Loading sunrise times...";

	try {
		const [parisSunrise, newYorkSunrise] = await Promise.all([
			getSunrise(parisLatitude, parisLongitude),
			getSunrise(newYorkLatitude, newYorkLongitude)
		]);

		result.innerHTML = `
			<p>Paris sunrise: ${new Date(parisSunrise).toLocaleTimeString()}</p>
			<p>New York sunrise: ${new Date(newYorkSunrise).toLocaleTimeString()}</p>
		`;
	} catch (error) {
		result.textContent = `Unable to retrieve sunrise times: ${error.message}`;
	}
});
