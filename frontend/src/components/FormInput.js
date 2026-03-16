export default function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-xs uppercase text-slate-500 font-bold tracking-wider ml-1"
      >
        {label}
      </label>

      <input
        id={id}
        name={id} // Crucial for state mapping in parent components
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
      />
    </div>
  );
}