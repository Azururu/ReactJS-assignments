import {useState} from "react";
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  }

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      const upload = await postFile(file, token);
      console.log(upload);
      const mediaUpload = await postMedia(upload, inputs, token);
      console.log(mediaUpload);
      if (mediaUpload) {
        navigate('/');
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  const {inputs ,handleSubmit, handleInputChange} = useForm(doUpload);
  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={"title"}>Title</label>
          <input
            name={"title"}
            type={"text"}
            id={"title"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor={"description"}>Description</label>
          <input
            name={"description"}
            type={"text"}
            id={"description"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor={"file"}>File</label>
          <input
            name={"file"}
            type={"file"}
            id={"file"}
            accept={"image/*, video/*"}
            onChange={handleFileChange}
          />
        </div>
        <img
          src={file ? URL.createObjectURL(file) : 'https://placehold.co/200?text=Choose+image'}
          alt={"preview"}
          width={"200"}
        />
        <button
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  )
}

export default Upload;
