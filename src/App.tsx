import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todo_List_UI } from './todo-list-ui/todo-list-ui';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Timer_Page } from './timer-page/timer-page';


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <BrowserRouter>
     <Routes>
       <Route path='/' element={ <Todo_List_UI />} />
       <Route path='timer' element={ <Timer_Page />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
