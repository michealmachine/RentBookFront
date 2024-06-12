import React, { useState, useEffect } from 'react';
import bookApi from '../service/bookApi'; // 确保API路径正确
import { useNavigate } from 'react-router-dom';

const ManageBooksPage = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    const fetchBooks = (page) => {
        bookApi.getAll(page - 1) // 假设后端页码是从0开始的
            .then(response => {
                const data = response.data.data; // 确保数据结构正确
                setBooks(data.content);
                setTotalPages(data.totalPages);
                setCurrentPage(data.number + 1);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    const handleDeleteBook = (bookId) => {
        bookApi.deleteBook(bookId)
            .then((response) => {
                alert(response.data.data);
                fetchBooks(currentPage); // 重新获取当前页的书籍列表
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                alert("Failed to delete book");
            });
    };

    const handleUpdateBook = (bookId) => {
        navigate(`/dashboard/update/${bookId}`); // 导航到更新书籍页面，并附带书籍ID
    };

    const handleAddBook = () => {
        navigate("/dashboard/addBook"); // 导航到添加书籍页面
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
            <h1>Manage Books</h1>
            <button style={styles.button} onClick={handleAddBook}>
                添加书籍
            </button>
            <div style={{ width: '100%' }}>
                {books.map(book => (
                    <div key={book.id} style={styles.bookContainer}>
                        <h3>{book.bookName}</h3>
                        <p>{book.disc}</p>
                        <p>库存: {book.account}</p>
                        <button style={styles.button} onClick={() => handleUpdateBook(book.id)}>
                            更新书籍
                        </button>
                        <button style={styles.button} onClick={() => handleDeleteBook(book.id)}>
                            删除书籍
                        </button>
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

export default ManageBooksPage;
