export const PrimaryButton = ({ label }) => (
    <button
      type="submit"
      className="w-full rounded-lg bg-sky-600 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-60"
    >
      {label}
    </button>
  );