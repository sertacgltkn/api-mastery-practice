import { UserCreate } from './components/UserCreate';
import { UsersList } from './components/UserList';
import { UserDetail } from './components/UserDetail';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable />
    </>
  )
}

export default App;