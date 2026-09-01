const planets = [
  { name: 'Mercury', color: 'gray', moons: 0 },
  { name: 'Venus', color: 'goldenrod', moons: 0 },
  { name: 'Earth', color: 'deepskyblue', moons: 1 },
  { name: 'Mars', color: 'orangered', moons: 2 },
  { name: 'Jupiter', color: 'orange', moons: 5 },
  { name: 'Saturn', color: 'khaki', moons: 4 },
  { name: 'Uranus', color: 'lightblue', moons: 3 },
  { name: 'Neptune', color: 'dodgerblue', moons: 2 },
];

if (typeof document !== 'undefined') {
  const section = document.querySelector('.listPlanets');

  if (!section) {
    console.error('The .listPlanets section was not found in the HTML.');
  } else {
    planets.forEach((planet) => {
      const planetDiv = document.createElement('div');
      planetDiv.classList.add('planet');
      planetDiv.textContent = planet.name;
      planetDiv.style.backgroundColor = planet.color;
      planetDiv.style.color = 'white';
      planetDiv.style.fontWeight = 'bold';
      planetDiv.style.display = 'inline-block';
      planetDiv.style.margin = '20px';
      planetDiv.style.position = 'relative';

      for (let i = 0; i < planet.moons; i++) {
        const moonDiv = document.createElement('div');
        moonDiv.classList.add('moon');
        moonDiv.style.position = 'absolute';
        moonDiv.style.width = '20px';
        moonDiv.style.height = '20px';
        moonDiv.style.borderRadius = '50%';
        moonDiv.style.backgroundColor = 'white';
        moonDiv.style.border = '2px solid #d0d0d0';
        moonDiv.style.left = `${30 + i * 20}px`;
        moonDiv.style.top = `${15 + (i % 2) * 14}px`;
        planetDiv.appendChild(moonDiv);
      }

      section.appendChild(planetDiv);
    });
  }
}