const SingleView = (props) => {
  const {item, setSelectedItem} = props;
  return (
    <>
      <dialog open={Boolean(item)}>
        <p>{item.title}</p>
        <p>{item.description}</p>
        {item.media_type === 'image' && (
          <img src={item.thumbnail} alt={item.title}/>
        )}
        {item.media_type === 'jpeg' && (
          <video src={item.thumbnail}/>
        )}
        <button onClick={() => setSelectedItem(null)}>Close</button>
      </dialog>
    </>
  )
}
export default SingleView;
