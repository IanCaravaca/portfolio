function ContactCard({
  contact,
  onDelete,
  onEdit,
  isEditing,
  editName,
  editEmail,
  editMessage,
  setEditName,
  setEditEmail,
  setEditMessage,
  onSave,
  onCancel,
}) {
  return (
    <div className="contact-card">
      <div className="contact-info">
        <p>Nombre: {contact.name}</p>
        <p>Email: {contact.email}</p>
        <p>Mensaje: {contact.message}</p>
      </div>
      {isEditing && (
        <div className="contact-edit-form">
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
          <div className="edit-actions">
            <button className="admin-save-button" onClick={onSave}>
              Guardar
            </button>

            <button className="admin-cancel-button" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {!isEditing && (
        <div className="contact-actions">
          <button className="admin-edit-button" onClick={onEdit}>
            Editar
          </button>

          <button className="admin-delete-button" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default ContactCard;
