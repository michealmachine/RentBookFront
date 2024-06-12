import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../service/bookApi'; // 确保导入了正确的 API 方法

const UpdateBookPage = () => {
  const { bookId } = useParams();
  const [bookName, setBookName] = useState('');
  const [desc, setDesc] = useState('');
  const [account, setAccount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getBookById(bookId).then(response => {
      if (response.data && response.data.data) {
        const { bookName, disc, account } = response.data.data;
        setBookName(bookName);
        setDesc(disc);
        setAccount(account);
      }
    }).catch(error => {
      console.error('Failed to fetch book details:', error);
    });
  }, [bookId]);

  const handleUpdateBook = () => {
    const bookData = {
      id: bookId,
      bookName,
      disc: desc,
      account
    };
    updateBook(bookData).then((response) => {
      alert(response.data.data);
      navigate('/dashboard/manage_books');
    }).catch(error => {
      console.error('更新失败:', error);
      alert('书籍更新失败');
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
      <h1>更新书籍信息</h1>
      <div style={styles.inputField}>
        <label>书名:</label>
        <input
          type="text"
          value={bookName}
          onChange={e => setBookName(e.target.value)}
          placeholder="输入书名"
        />
      </div>
      <div style={styles.inputField}>
        <label>描述:</label>
        <input
          type="text"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="输入书籍描述"
        />
      </div>
      <div style={styles.inputField}>
        <label>库存:</label>
        <input
          type="number"
          value={account}
          onChange={e => setAccount(e.target.value)}
          placeholder="输入库存数量"
        />
      </div>
      <button style={styles.button} onClick={handleUpdateBook}>更新书籍</button>
    </div>
  );
};

export default UpdateBookPage;
