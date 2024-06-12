import React, { useState, useEffect } from 'react';
import { findBooksByUser } from '../service/rentApi'; // 导入获取用户借阅书籍的方法
import { returnBook } from '../service/rentApi'; // 导入归还书籍的方法

const UserBooksPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchUserBooks();
    }, []);

    const fetchUserBooks = () => {
        findBooksByUser()
            .then(response => {
                setBooks(response.data.data); // 假设数据在 response.data.data 中
            })
            .catch(error => {
                console.error('Error fetching user books:', error);
            });
    };

    const handleReturnBook = (bookId) => {
        returnBook(bookId)
            .then((response) => {
                alert(response.data.data);
                // 重新获取更新后的书籍列表
                fetchUserBooks();
            })
            .catch(error => {
                console.error('Error returning book:', error);
                alert("Failed to return book");
            });
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px',
            fontFamily: 'Arial, sans-serif'
        },
        bookContainer: {
            textAlign: 'left',
            padding: '10px',
            marginBottom: '10px',
            width: '100%',
            borderBottom: '1px solid #ddd',
        },
        button: {
            padding: '5px 10px',
            margin: '0 5px',
            cursor: 'pointer',
        }
    };

    return (
        <div style={styles.container}>
            <h1>User's Borrowed Books</h1>
            <div style={{ width: '100%' }}>
                {books.map(book => (
                    <div key={book.id} style={styles.bookContainer}>
                        <h3>{book.bookName}</h3>
                        <p>{book.disc}</p>
                        <p>库存: {book.account}</p>
                        <button  onClick={() => handleReturnBook(book.id)}>
                            还书
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBooksPage;
