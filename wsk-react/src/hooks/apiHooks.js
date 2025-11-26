import {useEffect} from 'react';
import {fetchData} from '../utils/fetchData';
import {useState} from 'react';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState(null);

  useEffect(() => {
    try {
      const getMedia = async () => {
        const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
        const media = await fetchData(mediaUrl);
        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const userUrl = import.meta.env.VITE_AUTH_API + '/users/' +
              item.user_id;
            const user = await fetchData(userUrl);
            return {
              ...item,
              username: user.username,
            };
          }),
        );
        setMediaArray(mediaWithUsers);
      };
      getMedia();
    } catch (error) {
      console.log('Error', error);
    }
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const response = await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', options);
    return response
  }
  return {postLogin};
}

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    };
    const response = await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', options);
    return response;
  };

  const postUser = async (user) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const response = await fetchData(import.meta.env.VITE_AUTH_API + '/users', options);
    return response;
  }

  return {getUserByToken, postUser};
}

export {useMedia, useAuthentication, useUser};
