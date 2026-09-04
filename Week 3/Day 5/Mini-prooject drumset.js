const drumSounds = [
	{ key: "A", name: "Boom", file: "boom.wav" },
	{ key: "S", name: "Clap", file: "clap.wav" },
	{ key: "D", name: "Hi-hat", file: "hihat.wav" },
	{ key: "F", name: "Kick", file: "kick.wav" },
	{ key: "G", name: "Open hat", file: "openhat.wav" },
	{ key: "H", name: "Ride", file: "ride.wav" },
	{ key: "J", name: "Snare", file: "snare.wav" },
	{ key: "K", name: "Tink", file: "tink.wav" },
	{ key: "L", name: "Tom", file: "tom.wav" },
];

const soundBaseUrl = "https://raw.githubusercontent.com/devtlv/drumset_setup/master/sounds/";

document.body.innerHTML = `
	<main class="drum-app">
		<header class="drum-header">
			<p class="eyebrow">HTML Audio Lab</p>
			<h1>Make some <span>noise.</span></h1>
			<p>Press a key or tap a pad to play.</p>
		</header>
		<section class="drum-machine" aria-label="Drum machine">
			<div class="drum-topline">
				<span class="brand">BEAT / 01</span>
				<span class="live-status" aria-live="polite">Ready</span>
			</div>
			<div class="pads"></div>
		</section>
	</main>
`;

const pads = document.querySelector(".pads");
const liveStatus = document.querySelector(".live-status");

drumSounds.forEach(({ key, name, file }) => {
	const pad = document.createElement("button");
	pad.type = "button";
	pad.className = "drum-pad";
	pad.dataset.key = key;
	pad.innerHTML = `<span class="pad-key">${key}</span><span class="pad-name">${name}</span>`;
	pad.addEventListener("click", () => playSound(key));
	pads.append(pad);

	const audio = document.createElement("audio");
	audio.id = `audio-${key}`;
	audio.src = `${soundBaseUrl}${file}`;
	audio.preload = "auto";
	document.body.append(audio);
});

document.addEventListener("keydown", (event) => {
	if (event.repeat) return;
	playSound(event.key.toUpperCase());
});

function playSound(key) {
	const sound = drumSounds.find((drumSound) => drumSound.key === key);
	if (!sound) return;

	const audio = document.querySelector(`#audio-${key}`);
	const pad = document.querySelector(`[data-key="${key}"]`);
	audio.currentTime = 0;
	audio.play();
	pad.classList.remove("playing");
	void pad.offsetWidth;
	pad.classList.add("playing");
	liveStatus.textContent = `${sound.name} / ${sound.key}`;
	audio.addEventListener("ended", () => pad.classList.remove("playing"), { once: true });
}
