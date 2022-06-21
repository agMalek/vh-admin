import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './firebase'
import 'bootswatch/dist/superhero/bootstrap.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




//bloquear el input de number en videoForm cuando edito en lugar de poner warning
//bloquear boton de submit actualizar cuando no hizo cambios o en su defecto que no mande el cartel 
//bloquear boton de submit agregar cuadno esten los cambios vacios en addUser
//sombrear en el navbar el activo
//texto de boton de shoeForm cuando edita/agrega 
//meter un logo en algun lugar
///////// renombrar todos los usestate de las validaciones
///////// reorganizar toda la arquitectura de carpetas
///////// poner try cathc en todas las consultas a firebase
//agregar label en los input
//que tambien se pueda cambiar los puntos del user

// npm i --save reactfire
// npm i  reactfire

