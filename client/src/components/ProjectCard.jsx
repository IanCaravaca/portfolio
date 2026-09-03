function ProjectCard({
  title,
  description,
  image,
  link,
  technologies,
  github,
}) {
  return (
    <div className="project-card">
      {image && <img src={image} alt={title} />}

      <div className="project-card-content">
        <h3>{title}</h3>

        <p>{description}</p>

        <div className="project-technologies">
          {technologies &&
            technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
        </div>

        <div className="project-links">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-primary"
            >
              Ver proyecto
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-secondary"
            >
              Ver código
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
