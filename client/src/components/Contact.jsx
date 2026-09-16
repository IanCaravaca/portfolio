import { useState } from "react";
import Container from "../layouts/Container";
import "./contact.css";
import Button from "./Button";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name);
    console.log(email);
    console.log(message);
    const formData = {
      name,
      email,
      message,
    };

    console.log(formData);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setSuccess(false);
        setError(data.message);
        return;
      }

      setError("");

      console.log(data);

      setName("");
      setEmail("");
      setMessage("");
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setError("No se pudo conectar con el servidor.");
    }
  };
  return (
    <section id="contact" className="contact">
      <Container>
        <h2>Contacto</h2>

        <p>
          ¿Querés trabajar conmigo o tenés alguna consulta? Podés contactarme
          por los siguientes medios.
        </p>
        <div className="contact-links">
          <a href="mailto:tuemail@gmail.com?subject=Contacto desde tu portfolio">
            Email
          </a>

          <a
            href="https://github.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSuccess(false);
            }}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSuccess(false);
            }}
          />

          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setSuccess(false);
            }}
          />

          <Button type="submit">Enviar mensaje</Button>
        </form>
        {success && (
          <p className="success-message">Mensaje recibido correctamente.</p>
        )}
        {error && <p className="error-message">{error}</p>}
      </Container>
    </section>
  );
}

export default Contact;
