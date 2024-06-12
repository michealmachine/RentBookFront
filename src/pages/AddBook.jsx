import React, { useState } from 'react';
import { addBook } from '../service/bookApi'; // 确保导入路径正确

const AddBookPage = () => {
    const [bookName, setBookName] = useState('');
    const [desc, setDesc] = useState(''); // 添加描述状态
    const [account, setAccount] = useState('');

    const handleAddBook = () => {
        const bookData = {
            bookName: bookName,
            disc: desc, // 描述字段现在从状态获取
            account: parseInt(account, 10) // 确保account是整数类型
        };

        addBook(bookData)
            .then(response => {
                alert(` ${response.data.data}`);
            })
            .catch(error => {
                console.error('Error adding book:', error);
                alert(`添加失败: ${error.response?.data?.data || '无法处理您的请求。'}`);
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
        inputField: {
            margin: '10px 0',
        },
        button: {
            margin: '10px 0',
            cursor: 'pointer',
        }
    };

    return (
        <div style={styles.container}>
            <h1>添加书籍</h1>
            <div style={styles.inputField}>
                <label>书名:</label>
                <input
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="输入书名"
                />
            </div>
            <div style={styles.inputField}>
                <label>描述:</label>
                <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="输入书籍描述"
                />
            </div>
            <div style={styles.inputField}>
                <label>库存:</label>
                <input
                    type="number"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="输入库存数量"
                />
            </div>
            <button style={styles.button} onClick={handleAddBook}>提交</button>
        </div>
    );
};

export default AddBookPage;
