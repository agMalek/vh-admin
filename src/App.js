import './App.css';
import { firebaseConfig } from "./firebase";

import Navbar from './components/Navbar/Navbar'
import Users from './components/Users/container'
import Videos from './components/Videos/container'

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FirebaseAppProvider } from "reactfire";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Router>
        <div  className="p-4">
          <Navbar/>
          <Switch>
            <Route path="/users" exact component={Users} />
            <Route path="/videos" exact component={Videos} />
          </Switch>
          <ToastContainer/>   
        </div>
      </Router>
    </FirebaseAppProvider>

  );
}


export default App;




        {/* <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    </FirebaseAppProvider>
    
  */}



  