import Container from "../layouts/Container";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";
import "./projects.css";

function Projects() {
  return (
    <section id="projects" className="projects">
      <Container>
        <h2>Proyectos</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;
