import AdminLogin from "../components/AdminLogin";
import AdminContacts from "../components/AdminContacts";
import "../styles/admin.css";

function AdminPage({ isLoggedIn, onLogin, onLogout }) {
  return (
    <main className="admin-page">
      <div className="admin-container">
        {isLoggedIn ? (
          <AdminContacts onLogout={onLogout} />
        ) : (
          <AdminLogin onLogin={onLogin} />
        )}
      </div>
    </main>
  );
}

export default AdminPage;
