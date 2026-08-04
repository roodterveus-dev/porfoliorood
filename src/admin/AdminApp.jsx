import { AuthProvider, useAuth } from "../context/AuthContext";
import { ADMIN_EMAIL } from "../firebase";
import Login from "./Login";
import Dashboard from "./Dashboard";

function Gate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (user.email !== ADMIN_EMAIL) {
    return <Unauthorized />;
  }

  return <Dashboard />;
}

function Unauthorized() {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg text-text px-6">
      <p>This account isn't authorized for admin access.</p>
      <button
        onClick={logout}
        className="rounded-lg border border-border text-sm px-4 py-2"
      >
        Log out
      </button>
    </div>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
