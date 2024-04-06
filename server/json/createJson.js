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

const firstNames = [
  "John",
  "Jane",
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
];
const lastNames = [
  "Doe",
  "Smith",
  "Johnson",
  "Brown",
  "Williams",
  "Jones",
  "Garcia",
  "Martinez",
  "Hernandez",
  "Lopez",
];
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

const descriptions = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
];

const length = 10;

const PRODUCTS = Array.from({ length }, (_, index) => ({
  name: `${adjectives[randomNumber(adjectives.length)]} ${randomNumber(
    length
  )}`,
  description: descriptions[randomNumber(descriptions.length)],
  image: `${index + 1}.jpg`,
  price: Math.floor(Math.random() * 100) + 1,
  stockQuantity: Math.floor(Math.random() * 10) + 1,
}));

const USERS = Array.from({ length }, (_, index) => {
  const firstName = firstNames[randomNumber(firstNames.length)];
  const lastName = lastNames[randomNumber(lastNames.length)];
  return {
    username: `${firstName}${lastName}${index}`,
    firstName,
    lastName,
    email: `${
      firstName.toLowerCase() + lastName.toLowerCase()
    }${index}@example.com`,
    password: "password",
    role: "customer",
    cart: [],
  };
});

fs.writeFileSync("products.json", JSON.stringify(PRODUCTS, null, 2));
fs.writeFileSync("users.json", JSON.stringify(USERS, null, 2));
