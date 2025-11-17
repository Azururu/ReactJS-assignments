import propTypes from 'prop-types';
import PropTypes from 'prop-types';

const Greeting = (props) => {
  console.log(props);
  const {name, age, isTeacher} = props;
  let teacherText = '';
  if (isTeacher) {
    teacherText = "opettaja";
  } else {
    teacherText = "et ole opettaja"
  }
  return (
    <>
      <p>Moikka, nimesi on {name} ja ikäsi on {age} {teacherText}</p>
    </>
  );
};

// kevyt tyyppitarkastus
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  isTeacher: PropTypes.bool.isRequired,
}

export default Greeting;
