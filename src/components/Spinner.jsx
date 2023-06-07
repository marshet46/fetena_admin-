import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <>
    <div className='container p-20 h1 w-100'>

      <Spinner className='h1' style={{fontSize:"400px"}} animation="border" variant="success" />
     <Spinner className='h1' style={{fontSize:"400px"}} animation="border" variant="danger" />

        <Spinner  className='h1' style={{fontSize:"400px"}} animation="grow" variant="success" />
      <Spinner className='h1' style={{fontSize:"400px"}} animation="grow" variant="danger" />

      </div>
    </>
  );
}

export default Loader;