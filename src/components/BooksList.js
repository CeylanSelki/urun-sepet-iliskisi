import React, { useState } from 'react';
import data from '../data/data.json'; 
import Cart from './Cart'; 

function BooksList() {
  const [books, setBooks] = useState(data.books);
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    const updatedBooks = [...books];
    const updatedCart = [...cart];

    const updatedBook = { ...book };
    const bookIndex = updatedBooks.findIndex((b) => b.id === book.id);

    if (bookIndex !== -1 && updatedBook.stock > 0) {
      if (updatedCart.some((item) => item.id === book.id && item.quantity >= book.stock)) {
        alert('Stokta yeterli ürün yok.');
      } else {
        updatedBook.stock -= 1;
        updatedBooks[bookIndex] = updatedBook;

        const cartItem = updatedCart.find((item) => item.id === book.id);
        if (cartItem) {
          const updatedCartItem = { ...cartItem };
          updatedCartItem.quantity += 1;
          const cartItemIndex = updatedCart.findIndex((item) => item.id === book.id);
          updatedCart[cartItemIndex] = updatedCartItem;
        } else {
          updatedCart.push({ ...book, quantity: 1 });
        }

        setBooks(updatedBooks);
        setCart(updatedCart);
      }
    } else {
      alert('Stokta yeterli ürün yok.');
    }
  };

  const removeFromCart = (book) => {
    const updatedCart = cart.filter((item) => item.id !== book.id);

    const updatedBooks = [...books];
    const bookIndex = updatedBooks.findIndex((b) => b.id === book.id);
    updatedBooks[bookIndex].stock += book.quantity;

    setBooks(updatedBooks);
    setCart(updatedCart);
  };

  const increaseQuantity = (book) => {
    const updatedCart = [...cart];
    const cartItem = updatedCart.find((item) => item.id === book.id);
    if (cartItem) {
      const updatedCartItem = { ...cartItem };
      updatedCartItem.quantity += 1;
      const cartItemIndex = updatedCart.findIndex((item) => item.id === book.id);
      updatedCart[cartItemIndex] = updatedCartItem;
      setCart(updatedCart);
    }
  };

  const decreaseQuantity = (book) => {
    const updatedCart = [...cart];
    const cartItem = updatedCart.find((item) => item.id === book.id);
    if (cartItem && cartItem.quantity > 1) {
      const updatedCartItem = { ...cartItem };
      updatedCartItem.quantity -= 1;
      const cartItemIndex = updatedCart.findIndex((item) => item.id === book.id);
      updatedCart[cartItemIndex] = updatedCartItem;
      setCart(updatedCart);
    }
  };

  return (
    <div>
      <h2>Kitap Listesi</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div>
              <strong>{book.title}</strong> - {book.author}
            </div>
            <div>Fiyat: ${book.price}</div>
            <button onClick={() => addToCart(book)}>Sepete Ekle</button>
          </li>
        ))}
      </ul>
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </div>
  );
}

export default BooksList;





