import './App.css';
import Greeting from './componenets/Greeting';
import Footer from './componenets/Footer';
import Pizzamenu from './componenets/Pizzamenu';
const App = () => {
  const sitename = 'WSK';
  const style = {
    backgroundColor: 'grey',
    color: 'white',
  }

  return (
    <>
      <h1 style={style}>{sitename} sivusto</h1>
      <div style={{color: 'red'}}>APP</div>
      <Greeting name="Arttu" age={21} isTeacher={false}/>
      <Greeting name="idk" age={38} isTeacher={true}/>
      <ul>
        <li>jkfdalfa</li>
        <li>dafkladjfl</li>
      </ul>
      <Pizzamenu/>
      <Footer/>
    </>
  );
};
export default App;
