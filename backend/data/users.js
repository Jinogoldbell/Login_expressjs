// Mock "database" — a static list of users used only for this demo.
// In a real app, never store plaintext passwords like this; use a real
// database and a hashing library such as bcrypt.

const users = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@auralis.io",
    password: "Passw0rd!",
  },
  {
    id: 2,
    name: "Ava Chen",
    email: "ava@auralis.io",
    password: "Sunrise42",
  },
];

module.exports = users;
