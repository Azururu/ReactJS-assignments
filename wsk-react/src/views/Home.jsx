import MediaRow from '../components/MediaRow.jsx';
import {useState} from 'react';
import {useMedia} from '../hooks/apiHooks.js';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const {mediaArray} = useMedia();
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
        {mediaArray?.map(media => (
          <MediaRow key={media.media_id} item={media}/>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
