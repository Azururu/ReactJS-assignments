import MediaRow from '../components/MediaRow.jsx';
import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData.js';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const json = await fetchData('test.json');
      setMediaArray(json);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMedia();
  }, []);
  console.log(mediaArray);
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
