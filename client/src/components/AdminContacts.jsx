import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
function AdminContacts({ onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const handleUnauthorized = (response) => {
    if (response.status === 401) {
      onLogout();
      return true;
    }

    return false;
  };
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (handleUnauthorized(response)) {
          return;
        }

        if (!response.ok) {
          setError(data.message);
          return;
        }

        setError("");
        setContacts(data);
      } catch (error) {
        setError("No se pudo conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Seguro que querés eliminar este contacto?",
    );

    if (!confirmed) {
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (handleUnauthorized(response)) {
        return;
      }

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setError("");

      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      setError("No se pudo conectar con el servidor.");
    }
  };
  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editName,
            email: editEmail,
            message: editMessage,
          }),
        },
      );
      const data = await response.json();

      if (handleUnauthorized(response)) {
        return;
      }
      if (!response.ok) {
        setError(data.message);
        return;
      }

      setError("");
      setContacts(
        contacts.map((contact) => (contact.id === id ? data : contact)),
      );

      setEditingId(null);
    } catch (error) {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <section>
      <div className="admin-header">
        <h2>Contactos</h2>

        <button className="admin-logout-button" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
      {error && <p className="admin-error">{error}</p>}
      {loading && <p className="admin-status">Cargando contactos...</p>}

      {!loading && !error && contacts.length === 0 && (
        <p className="admin-status">No hay contactos todavía.</p>
      )}
      {!loading &&
        contacts.map((contact) => (
          <div key={contact.id}>
            <ContactCard
              contact={contact}
              onDelete={() => handleDelete(contact.id)}
              onEdit={() => {
                setEditingId(contact.id);
                setEditName(contact.name);
                setEditEmail(contact.email);
                setEditMessage(contact.message);
              }}
              isEditing={editingId === contact.id}
              editName={editName}
              editEmail={editEmail}
              editMessage={editMessage}
              setEditName={setEditName}
              setEditEmail={setEditEmail}
              setEditMessage={setEditMessage}
              onSave={() => handleUpdate(contact.id)}
              onCancel={() => setEditingId(null)}
            />
          </div>
        ))}
    </section>
  );
}

export default AdminContacts;
