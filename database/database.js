const books = [
  {
    ISBN: 978,
    title: "The Forest of Enchantments",
    pubDate: "2024-03-24",
    language: "en",
    numPage: 360,
    author: [1],
    publication: 1,
    category: ["story", "mythology", "novel"],
  },
  {
    ISBN: 979,
    title: "Rich dad Poor dad",
    pubDate: "2024-03-24",
    language: "en",
    numPage: 360,
    author: [2, 3],
    publication: 1,
    category: ["finance", "education", "novel"],
  },
];

const authors = [
  {
    id: 1,
    name: "Chitra",
    books: ["978-93", "978-95"],
  },
  {
    id: 2,
    name: "Robert",
    books: [979],
  },
  {
    id: 3,
    name: "Robert_kiyosaki",
    books: [979],
  },
];

const publication = [
  {
    id: 1,
    name: "Harper Collins",
    books: [978, 979],
  },
  {
    id: 2,
    name: "Oxford",
    books: [],
  },
];

module.exports = { books, authors, publication };
