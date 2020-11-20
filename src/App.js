import logo from './logo.svg';
import './App.css';
import Posts from './Posts.js';
import Header from './Header.js';


function App() {
  return (
    <div>
      <Header heading="Qwitter" subHeading="Confess your excesses anonymously"/>
      <Posts/>
    </div>
  );
}

export default App;
