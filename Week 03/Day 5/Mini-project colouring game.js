const palette = [
	{ name: "Cherry", color: "#e85d75" },
	{ name: "Tangerine", color: "#f5a623" },
	{ name: "Sunshine", color: "#f6d365" },
	{ name: "Leaf", color: "#68b984" },
	{ name: "Lagoon", color: "#4fb3bf" },
	{ name: "Sky", color: "#5b8def" },
	{ name: "Violet", color: "#9871d9" },
	{ name: "Ink", color: "#273044" },
	{ name: "Rose", color: "#e89ac7" },
	{ name: "Snow", color: "#f8f6f1" },
];

const gridSize = 15;
let selectedColor = palette[0].color;
let isPainting = false;

document.body.innerHTML = `
	<main class="app-shell">
		<header class="header">
			<div>
				<p class="eyebrow">A tiny pixel studio</p>
				<h1>Colouring <span>Squares</span></h1>
				<p class="intro">Pick a shade, then make something wonderfully yours.</p>
			</div>
			<button class="clear-button" type="button">Clear canvas <span aria-hidden="true">↗</span></button>
		</header>
		<section class="workspace" aria-label="Colouring canvas">
			<aside class="controls">
				<div class="control-heading">
					<h2>Palette</h2>
					<span class="selected-label">Cherry</span>
				</div>
				<div class="palette" role="group" aria-label="Choose a colour"></div>
				<p class="hint">Click or drag across the canvas to paint.</p>
			</aside>
			<div class="canvas-wrap">
				<div class="canvas" role="grid" aria-label="Pixel canvas"></div>
				<div class="canvas-footer">
					<span>15 x 15 squares</span>
					<span class="status" aria-live="polite">Ready to create</span>
				</div>
			</div>
		</section>
	</main>
`;


const paletteElement = document.querySelector(".palette");
const canvas = document.querySelector(".canvas");
const selectedLabel = document.querySelector(".selected-label");
const status = document.querySelector(".status");

palette.forEach(({ name, color }, index) => {
	const button = document.createElement("button");
	button.type = "button";
	button.className = "swatch";
	button.style.setProperty("--swatch-color", color);
	button.setAttribute("aria-label", `Choose ${name}`);
	button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
	button.addEventListener("click", () => {
		selectedColor = color;
		selectedLabel.textContent = name;
		document.querySelectorAll(".swatch").forEach((swatch) => {
			swatch.setAttribute("aria-pressed", String(swatch === button));
		});
	});
	paletteElement.append(button);
});

for (let index = 0; index < gridSize * gridSize; index += 1) {
	const square = document.createElement("button");
	square.type = "button";
	square.className = "square";
	square.setAttribute("role", "gridcell");
	square.setAttribute("aria-label", `Square ${index + 1}`);
	square.addEventListener("pointerdown", (event) => {
		event.preventDefault();
		isPainting = true;
		paint(square);
	});
	square.addEventListener("pointerenter", () => {
		if (isPainting) paint(square);
	});
	canvas.append(square);
}

document.addEventListener("pointerup", () => {
	isPainting = false;
});

function paint(square) {
	square.style.backgroundColor = selectedColor;
	square.classList.add("painted");
	status.textContent = "Canvas in progress";
}

document.querySelector(".clear-button").addEventListener("click", () => {
	document.querySelectorAll(".square").forEach((square) => {
		square.style.backgroundColor = "";
		square.classList.remove("painted");
	});
	status.textContent = "Ready to create";
});
