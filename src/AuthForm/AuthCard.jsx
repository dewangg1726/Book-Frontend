export const AuthCard = ({ title, children, onSubmit, loading }) => (
    <div className="flex items-center justify-center bg-zinc-100 w-full h-screen p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-semibold text-sky-700">{title}</h1>
        <form onSubmit={onSubmit} className="space-y-4" disabled={loading}>
          {children}
        </form>
      </div>
    </div>
  );