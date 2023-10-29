import { Link } from 'react-router-dom';
import styles from './project-card.module.scss';

type ProjectCardProps = {
  projectName: string;
  projectDescription: string;
  projectImageSrc: string;
  projectId: string;
  onClick?: () => void;
};

const ProjectCard = ({
  projectId,
  projectName,
  projectDescription,
  projectImageSrc,
  onClick,
}: ProjectCardProps): React.JSX.Element => {
  return (
    <Link to={`/project/${projectId}`} className={styles.link}>
      <div className={styles.project_card} onClick={onClick}>
        <div className={styles.projectImage}>
          <img src={projectImageSrc} />
        </div>
        <div className={styles.project_info_container}>
          <h4>{projectName}</h4>
          <p>{projectDescription}</p>
        </div>
        {!(projectName && projectDescription) && <div>This is a project</div>}
      </div>
    </Link>
  );
};

export default ProjectCard;
