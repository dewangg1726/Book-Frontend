export const TextInput = ({ className = '', ...props }) => (
    <input
      {...props}
      className={`w-full rounded-lg border border-zinc-300 p-3 focus:border-sky-600 focus:outline-none ${className}`}
    />
  );