import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainLayout = (props) => {
  return (
    <Container className={`app_container mb-5`}>
      {console.log('in main container', props.children)}
      {props.children}
      <ToastContainer />
    </Container>
  );
};
export default MainLayout;
