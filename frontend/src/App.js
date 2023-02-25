import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Posts from './components/Posts/Posts'
import NotFound from './components/NotFound/NotFound'
import Layout from './components/Layout/Layout'
import Forget from './components/Forget/Forget'
import ResetPassword from './components/ResetPassword/ResetPassword'
import Post from './components/Post/Post';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Posts />} />
        <Route path="posts/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/forget" element={<Forget />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
