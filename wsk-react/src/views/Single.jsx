import {useLocation, useNavigate} from 'react-router-dom';

const Single = () => {
  const {state} = useLocation();
  const item = state.item;
  const navigate = useNavigate();
  return (
    <>
      <dialog open={Boolean(item)}>
        <p>{item.title}</p>
        <p>{item.description}</p>
        {item.media_type === 'image/jpeg' && (
          <img src={item.thumbnail} alt={item.title}/>
        )}
        {item.media_type === 'video/mp4' && (
          <video src={item.thumbnail}/>
        )}
        <button onClick={() => navigate(-1)}>Go back</button>
      </dialog>
    </>
  )
}

export default Single;
