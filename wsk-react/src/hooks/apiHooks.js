import {useEffect} from 'react';
import {fetchData} from '../utils/fetchData';
import {useState} from 'react';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState(null);

  const postMedia = async (file, inputs, token) => {
    const mediaData = {
      "filename": file.data.filename,
      "filesize": file.data.filesize,
      "media_type": file.data.media_type,
      "title": inputs.title,
      "description": inputs.description,
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(mediaData),
    };

    const response = await fetchData(import.meta.env.VITE_MEDIA_API + '/media', options);
    return response;
  }

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

  return {mediaArray, postMedia};
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
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      body: formData,
    };
    const response = await fetchData(import.meta.env.VITE_UPLOAD_SERVER + '/upload/', options);
    return response;
  }
  return {postFile};
};

export {useMedia, useAuthentication, useUser, useFile};
