// import logo from './logo.svg';
import './App.css';
import {GuestRouter} from "./router/GuestRouter";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <GuestRouter/>
      </BrowserRouter>
  );
}

export default App;
