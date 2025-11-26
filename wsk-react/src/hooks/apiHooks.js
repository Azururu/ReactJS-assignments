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

export {useMedia};
