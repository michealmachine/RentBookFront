import { useState } from "react";
import { loginCheck } from "../service/loginApi";
import { saveToken } from "../service/auth";
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg'; // 确保路径正确

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };
  let handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  let login = async () => {
    const data = await loginCheck(username, password);
    if (data.data.length > 8) {
      saveToken(data.data);
      alert("登录成功");
      navigate('/dashboard')
    } else alert(data.data);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    logo: {
      height: '5vmin', // 调整为较小的大小
      marginBottom: '20px', // 为 logo 和表单之间提供一些间距
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '300px',
    },
    inputField: {
      width: '100%',
      margin: '10px 0'
    },
    label: {
      textAlign: 'left',
      width: '100%'
    },
    input: {
      width: '100%',
      padding: '8px',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '10px 0',
      margin: '20px 0'
    }
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="React Logo" style={styles.logo} />
      <div style={styles.card}>
        <h2>登录页面</h2>
        <div style={styles.inputField}>
          <label style={styles.label} htmlFor="username">用户名：</label>
          <input
            style={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div style={styles.inputField}>
          <label style={styles.label} htmlFor="password">密码：</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button style={styles.button} onClick={login}>登录</button>
      </div>
    </div>
  );
}
