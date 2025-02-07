import { Route, Router, Routes } from 'react-router';
import './App.css';
import Dashboard from "./componants/Products/Dashboard"
import Login from './componants/user/Login';
import Register from './componants/user/Register';

function App() {
  return (
    <div>
      <h1 className='h1'>Inventory Management</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
