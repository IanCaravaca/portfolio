import { useEffect, useState } from "react";

function AdminContacts({ onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const handleUnauthorized = (response) => {
    if (response.status === 401) {
      onLogout();
      return true;
    }

    return false;
  };
  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (handleUnauthorized(response)) {
        return;
      }
      if (!response.ok) {
        console.log(data.message);
        return;
      }
      setContacts(data);
    };

    fetchContacts();
  }, []);
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/contact/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (handleUnauthorized(response)) {
      return;
    }
    if (!response.ok) {
      console.log(data.message);
      return;
    }
    setContacts(contacts.filter((contact) => contact.id !== id));
  };
  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/contact/${id}`, {
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
    });
    const data = await response.json();

    if (handleUnauthorized(response)) {
      return;
    }
    if (!response.ok) {
      console.log(data.message);
      return;
    }
    setContacts(
      contacts.map((contact) => (contact.id === id ? data : contact)),
    );

    setEditingId(null);
  };

  return (
    <section>
      <h2>Contactos</h2>
      <button onClick={onLogout}>Cerrar sesión</button>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <p>Nombre: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Mensaje: {contact.message}</p>
          {editingId === contact.id && (
            <div>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <textarea
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
              />
              <button onClick={() => handleUpdate(contact.id)}>Guardar</button>
              <button onClick={() => setEditingId(null)}>Cancelar</button>
            </div>
          )}
          <button
            onClick={() => {
              setEditingId(contact.id);
              setEditName(contact.name);
              setEditEmail(contact.email);
              setEditMessage(contact.message);
            }}
          >
            Editar
          </button>

          <button onClick={() => handleDelete(contact.id)}>Eliminar</button>
        </div>
      ))}
    </section>
  );
}

export default AdminContacts;
