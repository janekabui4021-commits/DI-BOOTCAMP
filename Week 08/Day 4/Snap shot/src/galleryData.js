export const categories = [
  { label: 'Mountain', slug: 'mountain', description: 'Higher ground, quieter thoughts.' },
  { label: 'Beaches', slug: 'beaches', description: 'A little salt air and open sky.' },
  { label: 'Birds', slug: 'birds', description: 'Small wings, big worlds.' },
  { label: 'Food', slug: 'food', description: 'Made to be savoured.' },
];

const photo = (id, alt, photographer, tags) => ({
  id,
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`,
  alt,
  photographer,
  tags,
});

export const previewPhotos = [
  photo('photo-1464822759023-fed622ff2c3b', 'Snow-covered mountain peaks beneath a clear sky', 'Simon Berger', ['mountain', 'mountains', 'nature', 'snow']),
  photo('photo-1500530855697-b586d89ba3ee', 'A sunlit mountain landscape with open sky', 'Luca Bravo', ['mountain', 'mountains', 'nature', 'landscape']),
  photo('photo-1464278533981-50106e6176b1', 'Mountain range fading into the distance', 'Simon Berger', ['mountain', 'mountains', 'nature', 'landscape']),
  photo('photo-1519681393784-d120267933ba', 'Mountain under a sky full of stars', 'Luca Bravo', ['mountain', 'mountains', 'night', 'stars']),
  photo('photo-1470770841072-f978cf4d019e', 'Quiet alpine lake surrounded by mountains', 'Luca Bravo', ['mountain', 'mountains', 'lake', 'nature']),
  photo('photo-1506905925346-21bda4d32df4', 'Rugged mountain summit in warm light', 'Sam Bark', ['mountain', 'mountains', 'hiking', 'nature']),
  photo('photo-1497250681960-ef046c08a56e', 'Lush green leaves in soft natural light', 'Annie Spratt', ['nature', 'green', 'plants']),
  photo('photo-1441974231531-c6227db76b6e', 'Sunlight reaching through a forest canopy', 'Luca Bravo', ['nature', 'forest', 'trees']),
  photo('photo-1507525428034-b723cf961d3e', 'Blue waves rolling onto a bright sandy beach', 'Sean Oulashin', ['beaches', 'beach', 'ocean', 'sea']),
  photo('photo-1519046904884-53103b34b206', 'Gentle waves meeting a tropical shoreline', 'Laura Olive', ['beaches', 'beach', 'ocean', 'sea']),
  photo('photo-1493558103817-58b2924bce98', 'Palm trees beside a calm blue beach', 'Fabio Fistarol', ['beaches', 'beach', 'palm', 'tropical']),
  photo('photo-1473116763249-2faaef81ccda', 'Quiet coastline beneath a hazy sky', 'Luca Bravo', ['beaches', 'beach', 'coast', 'ocean']),
  photo('photo-1500375592092-40eb2168fd21', 'Sea foam tracing a pattern across the water', 'Jeremy Bishop', ['beaches', 'beach', 'ocean', 'waves']),
  photo('photo-1518837695005-2083093ee35b', 'Deep blue ocean water in afternoon light', 'Jeremy Bishop', ['beaches', 'ocean', 'sea', 'water']),
  photo('photo-1518495973542-4542c06a5843', 'Sunlight glowing through leaves in a forest', 'Casey Horner', ['nature', 'forest', 'trees']),
  photo('photo-1470252649378-9c29740c9fa8', 'Soft sunrise spreading over a misty horizon', 'Luca Bravo', ['nature', 'sunrise', 'landscape']),
  photo('photo-1444464666168-49d633b86797', 'Wild bird resting among green branches', 'Ray Hennessy', ['birds', 'bird', 'wildlife', 'nature']),
  photo('photo-1552728089-57bdde30beb3', 'Brightly coloured bird perched in the sunlight', 'Zdeněk Macháček', ['birds', 'bird', 'wildlife', 'colorful']),
  photo('photo-1452570053594-1b985d6ea890', 'Small bird perched on a leafy branch', 'Boris Smokrovic', ['birds', 'bird', 'wildlife']),
  photo('photo-1480044965905-02098d419e96', 'Bird in flight over a quiet landscape', 'James Wainscoat', ['birds', 'bird', 'wildlife', 'flight']),
  photo('photo-1501706362039-c06b2d715385', 'Bird perched on a thin branch against the sky', 'Richard Lee', ['birds', 'bird', 'wildlife']),
  photo('photo-1497206365907-f5e630693df0', 'A small bird among soft green leaves', 'Boris Smokrovic', ['birds', 'bird', 'nature', 'wildlife']),
  photo('photo-1549611016-3a70d82b5040', 'Close view of a colourful bird in nature', 'David Clode', ['birds', 'bird', 'wildlife', 'colorful']),
  photo('photo-1520808663317-647b476a81b9', 'Bird perched quietly in a woodland setting', 'Ray Hennessy', ['birds', 'bird', 'forest', 'wildlife']),
  photo('photo-1473093295043-cdd812d0e601', 'Fresh pasta with herbs on a rustic table', 'Jakub Kapusnak', ['food', 'pasta', 'meal']),
  photo('photo-1504674900247-0877df9cc836', 'A colourful meal served at a table', 'Stefan Johnson', ['food', 'meal', 'dinner']),
  photo('photo-1547592180-85f173990554', 'Fresh salad bowl topped with vegetables', 'Anna Pelzer', ['food', 'salad', 'healthy']),
  photo('photo-1565299624946-b28f40a0ae38', 'Freshly baked pizza topped with herbs', 'Ivan Torres', ['food', 'pizza', 'meal']),
  photo('photo-1490645935967-10de6ba17061', 'A balanced plate of fresh ingredients', 'Anna Pelzer', ['food', 'healthy', 'meal']),
  photo('photo-1565958011703-44f9829ba187', 'Berry cake finished with fresh fruit', 'Ruth Georgiev', ['food', 'cake', 'dessert']),
  photo('photo-1482049016688-2d3e1b311543', 'Toast with fresh toppings on a plate', 'Joseph Gonzalez', ['food', 'breakfast', 'meal']),
  photo('photo-1540189549336-e6e99c3679fe', 'Fresh colourful salad with seasonal vegetables', 'Anna Pelzer', ['food', 'salad', 'vegetables']),
];

export function getPreviewPhotos(query) {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return [];
  }

  return previewPhotos.filter((item) =>
    item.tags.some((tag) => tag.includes(normalizedQuery) || normalizedQuery.includes(tag)),
  );
}
