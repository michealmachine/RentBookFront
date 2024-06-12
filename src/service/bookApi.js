import api from './api'
export const getAll = (page, size = 10) => {
    return api.get(`findAll?page=${page}&size=${size}`);
};
// 查找书籍通过名称
export const findBooksByName = (bookName) => {
    return api.get('/findByName', {
        params: { bookName }
    });
};

// 更新书籍
export const updateBook = (book) => {
    return api.put('/updateBook', book);
};

// 添加书籍
export const addBook = (booksDto) => {
    return api.post('/addBook', booksDto);
};

export const deleteBook = (bookId) => {
    return api.delete('/delete', {  params: { bookId } });
};
//通过ID搜索书
export const getBookById = (bookId) => {
    return api.get('/getById', {
        params: { bookId }
    });
};

const bookApiFunctions = {
    getAll,
    findBooksByName,
    updateBook,
    addBook,
    deleteBook,
    getBookById
};

export default bookApiFunctions;