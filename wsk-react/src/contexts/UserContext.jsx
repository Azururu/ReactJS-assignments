import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router-dom';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      const loginInfo = await postLogin(credentials);
      localStorage.setItem('token', loginInfo.token);
      setUser(loginInfo);
      navigate('/');
    } catch (e) {
      console.log('Login failed:', e.message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const user = await getUserByToken(token);
        setUser(user.user);
        navigate(location.pathname);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      handleLogin,
      handleLogout,
      handleAutoLogin
    }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext}
