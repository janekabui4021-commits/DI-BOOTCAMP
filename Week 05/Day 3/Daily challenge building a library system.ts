// 1. Interface Book
interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; // Optional property
}

// 2. Class Library
class Library {
  protected books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  
  public getBookDetails(isbn: string): Book | string {
    const book = this.books.find((b) => b.isbn === isbn);
    return book ? book : `Book with ISBN ${isbn} not found.`;
  }
}

// 3. Class DigitalLibrary
class DigitalLibrary extends Library {
  readonly website: string;

  constructor(website: string) {
    super();
    this.website = website;
  }

  public listBooks(): string[] {
    return this.books.map((book) => book.title);
  }
}

const myDigitalLibrary = new DigitalLibrary("https://mytechlibrary.com");

myDigitalLibrary.addBook({
  title: "The Pragmatic Programmer",
  author: "Andrew Hunt, David Thomas",
  isbn: "978-0201616224",
  publishedYear: 1999,
  genre: "Software Engineering"
});

myDigitalLibrary.addBook({
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "978-0132350884",
  publishedYear: 2008
});


console.log("--- Book Details ---");
console.log(myDigitalLibrary.getBookDetails("978-0201616224"));

console.log("\n--- All Book Titles ---");
console.log(myDigitalLibrary.listBooks());

console.log("\n--- Library Website ---");
console.log(myDigitalLibrary.website);