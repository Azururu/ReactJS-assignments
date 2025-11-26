import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const {getUserByToken} = useUser();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getUserByToken(token);
        setUser(response.user);
      } catch (error) {
        console.log('getUserData error', error);
        setError(error.message);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <h2>User profile</h2>
      {user ? (
        <>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <p>Registered: {user.created_at}</p>
        </>
      ) : (
        <p>Loading</p>
      )}
      {error && (
        <p>
          Failed loading profile details. ({error})
        </p>
      )}
    </>
  );
};

Profile.propTypes = {};

export default Profile;
