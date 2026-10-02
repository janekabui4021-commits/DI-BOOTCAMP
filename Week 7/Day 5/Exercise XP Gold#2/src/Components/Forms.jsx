import { useState } from 'react';

const emptyBook = {
  title: '',
  author: '',
  genre: '',
  year: '',
};

const emptyContact = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

function Forms() {
  const [bookData, setBookData] = useState(emptyBook);
  const [submittedBook, setSubmittedBook] = useState(null);
  const [contactData, setContactData] = useState(emptyContact);
  const [submittedContact, setSubmittedContact] = useState(null);

  const handleBookChange = (event) => {
    const { name, value } = event.target;
    setBookData((currentBook) => ({ ...currentBook, [name]: value }));
  };

  const handleBookSubmit = (event) => {
    event.preventDefault();
    const submittedData = { ...bookData, year: Number(bookData.year) };
    setSubmittedBook(submittedData);
    console.log(submittedData);
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactData((currentContact) => ({ ...currentContact, [name]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setSubmittedContact({ ...contactData });
  };

  const resetContact = () => {
    setContactData({ ...emptyContact });
    setSubmittedContact(null);
  };

  return (
    <div className="exercise-list">
      <section className="lesson" aria-labelledby="book-heading">
        <div className="lesson-heading">
          <span className="lesson-number">01</span>
          <h2 id="book-heading">Book submission</h2>
        </div>

        {submittedBook ? (
          <div className="success-panel" role="status">
            <h3>Book added successfully</h3>
            <p><strong>{submittedBook.title}</strong> by {submittedBook.author}</p>
            <p>{submittedBook.genre} · {submittedBook.year}</p>
            <button type="button" onClick={() => {
              setBookData({ ...emptyBook });
              setSubmittedBook(null);
            }}>Add another book</button>
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleBookSubmit}>
            <label htmlFor="book-title">Title</label>
            <input id="book-title" name="title" value={bookData.title} onChange={handleBookChange} required />

            <label htmlFor="book-author">Author</label>
            <input id="book-author" name="author" value={bookData.author} onChange={handleBookChange} required />

            <label htmlFor="book-genre">Genre</label>
            <input id="book-genre" name="genre" value={bookData.genre} onChange={handleBookChange} required />

            <label htmlFor="book-year">Year published</label>
            <input id="book-year" name="year" type="number" min="1" max="2100" value={bookData.year} onChange={handleBookChange} required />

            <button type="submit">Submit book</button>
          </form>
        )}
      </section>

      <section className="lesson" aria-labelledby="contact-heading">
        <div className="lesson-heading">
          <span className="lesson-number">02</span>
          <h2 id="contact-heading">Contact details</h2>
        </div>

        {submittedContact ? (
          <div className="contact-result" aria-live="polite">
            <h3>Submitted information</h3>
            <dl>
              <div><dt>First name</dt><dd>{submittedContact.firstName}</dd></div>
              <div><dt>Last name</dt><dd>{submittedContact.lastName}</dd></div>
              <div><dt>Phone</dt><dd>{submittedContact.phone}</dd></div>
              <div><dt>Email</dt><dd>{submittedContact.email}</dd></div>
            </dl>
            <button type="button" className="secondary-button" onClick={resetContact}>Reset</button>
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleContactSubmit}>
            <label htmlFor="first-name">First name</label>
            <input id="first-name" name="firstName" autoComplete="given-name" value={contactData.firstName} onChange={handleContactChange} required />

            <label htmlFor="last-name">Last name</label>
            <input id="last-name" name="lastName" autoComplete="family-name" value={contactData.lastName} onChange={handleContactChange} required />

            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" pattern="[0-9+() .-]{7,20}" title="Enter a valid phone number." value={contactData.phone} onChange={handleContactChange} required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={contactData.email} onChange={handleContactChange} required />

            <button type="submit">Submit</button>
          </form>
        )}
      </section>
    </div>
  );
}

export default Forms;