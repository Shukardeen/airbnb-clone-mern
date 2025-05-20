import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index";
import { Toaster } from "react-hot-toast";
import store from './redux/store.js';
import { Provider } from 'react-redux';
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {  
  return (
    <div className="min-h-screen flex flex-col">
      <Provider store={store}>
        <Header />
        <main className="flex-grow"><Outlet /></main>
        <Footer />
      </Provider>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
