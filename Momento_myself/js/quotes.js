const quotes = [
    {
        quote : "Oh for a book and a shady nook...",
        author : "John Wilson"
    },
    {
        quote : "Live always in the best company when you read.",
        author : "Sydney Smith"
    },
    {
        quote : "A book that is shut is but a block.",
        author : "Thomas Fuller"
    },
    {
        quote : "This book fills a much-needed gap",
        author : "Moses Hadas"
    },
    {
        quote :" My personal hobbies are reading, listening to music, and silence.",
        author: "Edith Sitwell"
    },
    {
        quote : " Reading is sometimes an ingenious device for avoiding thought.",
        author: "Sir Arthrt Helps"
    },
    {
        quote : "A room without books is like a body without a soul.",
        author : "Cicero"
    },
    {
        quote : "The multitude of books is making us ignorant.",
        author : "Voltaire"
    },
    {
        quote : "I have read your book and much like it.",
        author :"Moses Hadas"
    },
    {
        quote : " Wear the old coat and buy the new book.",
        author :"Austin Phelps"
    }
]

const quote = document.querySelector("#quotes span:first-child");
const author = document.querySelector("#quotes span:last-child");

const todayquote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todayquote.quote;
author.innerText = todayquote.author;