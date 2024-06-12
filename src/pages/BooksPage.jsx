import React, { useState, useEffect } from 'react';
import { getAll } from '../service/bookApi';
import { rentBook } from '../service/rentApi';  // 确保你已经正确地导入了 rentBook 函数

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [dates, setDates] = useState({}); // 使用对象存储每本书的日期

    const fetchBooks = (page) => {
        getAll(page - 1)
            .then(response => {
                const data = response.data.data;
                setBooks(data.content);
                setTotalPages(data.totalPages);
                setCurrentPage(data.number + 1);
                let newDates = {};
                data.content.forEach(book => {
                    newDates[book.id] = '';
                });
                setDates(newDates);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    const handleRent = (bookId) => {
        const date = dates[bookId];
        if (!date) {
            alert("请选择你要借书的日期.");
            return;
        }
        const formattedDate = new Date(date).toISOString();  // 格式化日期为 ISO 字符串
        rentBook(bookId, formattedDate)
            .then(response => {
                console.log(response);
                alert(` ${response.data.data}`);
            })
            .catch(error => {
                console.error("Error processing rent operation:", error);
                alert(`Rent operation failed: ${error.response?.data?.data || 'Unable to process your request.'}`);
            });
    };

    const handleDateChange = (bookId, value) => {
        setDates(prevDates => ({
            ...prevDates,
            [bookId]: value
        }));
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
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px',
        },
        button: {
            padding: '5px 10px',
            margin: '0 5px',
            cursor: 'pointer',
        }
    };

    return (
        <div style={styles.container}>
            <h1>Books</h1>
            <div style={{ width: '100%' }}>
                {books.map(book => (
                    <div key={book.id} style={styles.bookContainer}>
                        <h3>{book.bookName}</h3>
                        <p>{book.disc}</p>
                        <p>库存: {book.account}</p>
                        <input
                            type="date"
                            value={dates[book.id] || ''}
                            onChange={(e) => handleDateChange(book.id, e.target.value)}
                        />
                        <button onClick={() => handleRent(book.id)}>借书</button>
                    </div>
                ))}
            </div>
            <div style={styles.pagination}>
                <button 
                    style={styles.button}
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    上一页
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button 
                    style={styles.button}
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    下一页
                </button>
            </div>
        </div>
    );
};

export default BooksPage;
