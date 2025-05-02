import BookForm from './components/BookForm';
import HomePage from './components/HomePage';      // existing
import { LoginPage } from './AuthForm/LoginForm';
import { SignupPage } from './AuthForm/SignupPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

const token = localStorage.getItem('token');

export default function App() {
  return (
    <BrowserRouter>
    <Toaster richColors position="top-right"/>
      <Routes>
        <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login"   element={<LoginPage />} />
        <Route path="/signup"  element={<SignupPage />} />
        <Route path="/books"   element={<HomePage/>}/>
        <Route path="/books/new"        element={<BookForm />} />
        <Route path="/books/:id/edit"   element={<BookForm />} />
      </Routes>
    </BrowserRouter>
  );
}
