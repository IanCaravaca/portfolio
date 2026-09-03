import "./about.css";
import Container from "../layouts/Container";
function About() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Git",
    "Vite",
  ];
  return (
    <section id="about" className="about">
      <Container>
        <h2>Sobre mí</h2>

        <div className="about-content">
          <p className="about-description">
            Soy desarrollador Full Stack en formación y disfruto aprender nuevas
            tecnologías, construir aplicaciones web y resolver problemas
            mediante código.
          </p>
          <div className="about-skills">
            <h3>Tecnologías</h3>

            <div className="skills-list">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
