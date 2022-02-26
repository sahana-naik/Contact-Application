import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import AddContact from './component/AddContact';
import ContactList from './component/ContactList';
import EditContact from './EditContact/Edit';
import Toast from './component/Toast';

function App() {
  return (
   <React.Fragment>
     <Router>
       <Routes>
       <Route exact path="/" element={<ContactList />} />
       <Route exact path="/add-contact" element={<AddContact />} />
       <Route exact path="/edit-contact/:id" element={<EditContact />} />
       
       </Routes>
       <Toast/>
     </Router>
   </React.Fragment>
  );
}

export default App;
