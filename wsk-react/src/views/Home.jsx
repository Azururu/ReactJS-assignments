import MediaRow from '../components/MediaRow.jsx';
import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData.js';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      // Step 1: Fetch media list
      const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
      const media = await fetchData(mediaUrl);
      const mediaWithUsers = await Promise.all(
        media.map(async (item) => {
          const userUrl =
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id;
          const user = await fetchData(userUrl);
          return {
            ...item,
            username: user.username,
          };
        })
      );

      // Step 4: Save to state
      setMediaArray(mediaWithUsers);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMedia();
  });

  return (
    <>
      <h2>My media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
        {mediaArray.map(media => (
          <MediaRow key={media.media_id} item={media} />
        ))}
        </tbody>
      </table>
    </>
  )
  };

export default Home;
