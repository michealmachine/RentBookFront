import api from './api';  

// 借书
export const rentBook = (bookId, date) => {
    return api.post(`/borrow/rent?bookId=${bookId}`, date, {
        headers: {
            'Content-Type': 'application/json' // 确保内容类型正确设置为 JSON
        }
    });
};

// 归还书籍
export const returnBook = (bookId) => {
    return api.delete('/borrow/return', {
        params: { bookId }
    });
};

// 查找用户借阅的书籍
export const findBooksByUser = () => {
    return api.get('/borrow/find');
};
const apiFunctions = {
    rentBook,
    returnBook,
    findBooksByUser
};

export default apiFunctions;