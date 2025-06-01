import { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import api from '../api/Axios';
import Pagination from '../utils/Pagination';
export default function HomePage() {
  const nav = useNavigate();
  const [books, setBooks] = useState([]);
  const [totalBooks,setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage,setCurrentPage] = useState(1);
  const [booksPerPage] = useState(9);  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      nav('/login');
      return;
    }
   const offset = (currentPage-1)*booksPerPage;
    (async () => {
      try {
        const { data } = await api.get(`/books/fetch?limit=${booksPerPage}&offset=${offset}`);
        setBooks(data.books);
        setTotalBooks(data.total);
      } catch (err) {
        if (err.response?.status === 401) nav('/login');
        else setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    })();
  }, [nav,currentPage,booksPerPage]);



  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading…</div>;
  if (error)   return <div className="flex min-h-screen items-center justify-center text-rose-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white px-6 py-8 mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-sky-50">
          <div>
            <h1 className="text-3xl font-bold text-sky-900 font-[Inter]">My Library</h1>
            <p className="text-sm text-sky-500 mt-1">{totalBooks} books collected</p>
          </div>
          <button
            className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition-all 
              transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center gap-2"
            onClick={() => nav('/books/new')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Book
          </button>
        </header>

        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 rounded-2xl bg-white/50 backdrop-blur-sm border-2 border-dashed border-sky-100">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-sky-900">No books in your collection</h3>
              <p className="mt-1 text-sm text-sky-500">Get started by adding your first book</p>
            </div>
          </div>
        ) : (
          <>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {books.map((b) => (
              <li 
                key={b._id} 
                className="group relative rounded-xl bg-white p-5 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1.5
                          border border-sky-50 hover:border-sky-100"
              >
                <div className="absolute inset-x-4 -top-3.5">
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="rounded-lg bg-sky-100/80 px-2.5 py-1.5 text-xs font-medium text-sky-600 hover:bg-sky-200/80 backdrop-blur-sm
                                transition-colors flex items-center gap-1"
                      onClick={() => nav(`/books/${b._id}/edit`)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      className="rounded-lg bg-rose-100/80 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-200/80 backdrop-blur-sm
                                transition-colors flex items-center gap-1"
                      onClick={async () => {
                        // if (!window.confirm('Delete this book?')) return;
                         //toast.confirm("I was being triggered")
                      const checker=  await api.delete(`/books/${b._id}`);
                      if(checker) {
                        console.log("I was being  hit ")
                      }
                        toast.success('Book Deleted');
                        setBooks((prev) => prev.filter((x) => x._id !== b._id));
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-sky-900 truncate pr-6">{b.title}</h2>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sky-600">
                      <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm font-medium">{b.author}</span>
                    </div>
                    {b.year && (
                      <div className="flex items-center gap-2 text-sky-500">
                        <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">{b.year}</span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
            

          </ul>
          </>
        )}
                  <Pagination totalBooks ={totalBooks} booksPerPage = {booksPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} className="table-footer-group" />

      </div>
    </>
  );
}

