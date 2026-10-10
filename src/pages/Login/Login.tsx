const Login: React.FC = () => {
  return (
    <div className="bg-[var(--color-neutral-0)] p-8 rounded-[var(--radius-md)] shadow-[var(--shadow-card)]">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-[var(--color-neutral-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-[var(--color-neutral-300)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--color-brand-600)] text-[var(--color-neutral-0)] py-2 px-4 rounded-[var(--radius-md)] hover:bg-[var(--color-brand-700)] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
