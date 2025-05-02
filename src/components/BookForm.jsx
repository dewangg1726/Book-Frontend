import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { Toaster, toast } from "sonner";
import api from "../api/Axios";

// /* local axios */
// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   timeout: 10_000,
// });
// api.interceptors.request.use((c) => {
//   const t = localStorage.getItem("token");
//   if (t) c.headers.Authorization = `Bearer ${t}`;
//   return c;
// });

export default function BookForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const nav = useNavigate();

  const [form, setForm] = useState({ title: "", author: "", year: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await api.get(`/books`);
        const book = data.find((b) => b._id === id);
        if (!book) throw new Error("Book not found");
        setForm({
          title: book.title,
          author: book.author,
          year: book.year ?? "",
        });
      } catch (err) {
        setError("Failed to load book");
      } finally {
        setLoading(false);
      }
    })();
  }, [editing, id]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        title: form.title,
        author: form.author,
        year: form.year ? Number(form.year) : undefined,
      };
      if (editing) {await api.put(`/books/${id}`, payload);
      toast.success('Book updated');
    }
      else {await api.post("/books", payload);
        toast.success('Book Added')
      }

      nav("/books");
    } catch (err) {
      toast.error('Something went wrong')
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading…
      </div>
    );
  return (
    <div className="m-ato">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
        <form
          onSubmit={submit}
          className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-lg"
        >
          <h1 className="text-center text-2xl font-semibold text-sky-700">
            {editing ? "Edit Book" : "Add Book"}
          </h1>

          <input
            name="title"
            required
            placeholder="Title"
            value={form.title}
            onChange={handle}
            className="w-full rounded-lg border border-zinc-300 p-3 focus:border-sky-600 focus:outline-none"
          />
          <input
            name="author"
            required
            placeholder="Author"
            value={form.author}
            onChange={handle}
            className="w-full rounded-lg border border-zinc-300 p-3 focus:border-sky-600 focus:outline-none"
          />
          <input
            name="year"
            type="number"
            placeholder="Year (optional)"
            value={form.year}
            onChange={handle}
            className="w-full rounded-lg border border-zinc-300 p-3 focus:border-sky-600 focus:outline-none"
          />

          {error && <p className="text-sm text-rose-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-600 py-3 font-medium text-white hover:bg-sky-700 disabled:opacity-60"
          >
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
