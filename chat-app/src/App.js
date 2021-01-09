import './App.css';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className='app'>
      <div className='app__body'>
        {/* sidebar */}
        <Sidebar />
        {/* chat */}
      </div>
    </div>
  );
}

export default App;