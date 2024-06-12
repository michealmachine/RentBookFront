import './App.css';
import BooksPage from './pages/BooksPage.jsx';
import DashBoard from './pages/Dashboard.jsx';
import ManageBooksPage from './pages/ManageBooks.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserBooks from './pages/UserBooks.jsx';
import AddBookPage from './pages/AddBook.jsx';
import UpdateBookPage from './pages/UpdateBookPage.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path='books' element={<BooksPage />} />
          <Route path='userBooks' element={<UserBooks />} />
          <Route path="manage_books" element={<ManageBooksPage />}/>
          <Route path="update/:bookId" element={<UpdateBookPage />} />
          <Route path="addBook" element={<AddBookPage />} /> 
        </Route>
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>

    </Router>
  );
}

export default App;
