import logo from './logo.svg';
import './App.css';

function App() {
  return<div className='container my-5'>
    <form>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email address
        </label>
        <input 
          type='email' 
          id='email' 
          className='form-control'/>
      </div>
    </form>
  </div>
}

export default App;
