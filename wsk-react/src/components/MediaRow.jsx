import PropTypes from 'prop-types';

const MediaRow = ({ item, setSelectedItem }) => {
  return (
    <>
      <tr key={item.media_id}>
        <td>
          <img src={item.thumbnail} alt={item.title}/>
        </td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td>{item.filesize}</td>
        <td>{item.media_type}</td>
      </tr>
      <td>
        <button onClick={() => setSelectedItem(item)}>View</button>
      </td>
    </>
  )
}

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
}

export default MediaRow;
