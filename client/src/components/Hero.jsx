import "./hero.css";
import Container from "../layouts/Container";
import Button from "./Button";
import avatar from "../assets/images/avatar.png";

function Hero() {
  return (
    <section className="hero">
      <Container>
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hola 👋</p>

            <h1>Soy Ian Caravaca</h1>

            <h2>Desarrollador Full Stack en formación</h2>

            <p className="hero-description">
              Me apasiona crear aplicaciones web modernas, aprender nuevas
              tecnologías y construir soluciones que resuelvan problemas reales.
            </p>
            <div className="hero-buttons">
              <Button href="#projects" variant="primary">
                Ver proyectos
              </Button>

              <Button href="#contact" variant="secondary">
                Contactarme
              </Button>
            </div>
          </div>

          <div className="hero-image">
            <img src={avatar} alt="Avatar de Ian" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
