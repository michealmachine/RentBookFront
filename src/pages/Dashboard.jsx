import { Link, Outlet } from "react-router-dom";

export default function DashBoard() {
    return (
        <>
            <nav style={{
                textAlign: 'center', // 水平居中
                padding: '10px 0', // 添加一些填充
                backgroundColor: '#f0f0f0' // 轻微的背景色
            }}>
                <Link to="books">查看书籍</Link>{" | "}
                <Link to="userBooks">借书管理</Link>{" | "}
                <Link to="manage_books">书籍管理</Link>{" | "}
                <Link to="/login">登出</Link>
            </nav>
            <Outlet/>
        </>
    );
}
