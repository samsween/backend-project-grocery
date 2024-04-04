const fs = require("fs");

const adjectives = [
  "Swift",
  "Urban",
  "Eternal",
  "Mystic",
  "Rebel",
  "Cosmic",
  "Infinite",
  "Stealth",
  "Dynamic",
  "Vortex",
];
const nouns = [
  "Glider",
  "Runner",
  "Stride",
  "Pathfinder",
  "Pioneer",
  "Voyager",
  "Navigator",
  "Champion",
  "Crusader",
  "Explorer",
];

fs.writeFileSync(
  "productstest.json",
  JSON.stringify(
    Array.from({ length: 10 }, (_, index) => ({
      productCode: index + 1,
      productName: `${adjectives[index % 10]} ${nouns[index % 10]}`,
      productQuantity: Math.floor(Math.random() * 10) + 1,
      productPrice: Math.floor(Math.random() * 100) + 1,
      imageName: `${index + 1}.jpg`,
    })),
    null,
    2
  )
);
