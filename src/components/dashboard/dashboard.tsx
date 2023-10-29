import { useEffect, useState } from 'react';
import ProjectCard from '../project-card/project-card';
import styles from './dashboard.module.scss';
import AddProjectModal from '../add-project-modal/add-project-modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNewProject } from '../../redux/slices/projectsDataSlice';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const projectsData = useAppSelector((state) => state.projectsDataSlice);
  const userData = useAppSelector((state) => state.userDataSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addProjectHandler = (
    projectName: string,
    projectDescription: string
  ) => {
    dispatch(addNewProject({ projectName, projectDescription }));
    closeAddProjectModal();
  };

  const openAddProjectModal = () => {
    setIsAddProjectModalOpen(true);
  };
  const closeAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
  };

  useEffect(() => {
    // redirect to login if user is not logged in
    if (!userData.isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [navigate, userData]);

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.upper_container}>
          <h1>Dashboard</h1>
        </div>
        <div className={styles.projects_container}>
          <h2 className={styles.projects_title}>Projects</h2>
          <div className={styles.project_cards}>
            {projectsData.projects.map((project) => {
              return (
                <ProjectCard
                  projectId={project.projectId}
                  projectName={project.projectName}
                  projectDescription={project.projectDescription}
                  projectImageSrc={project.projectImageURL}
                  key={project.projectId}
                />
              );
            })}

            <div onClick={openAddProjectModal}> + Add Project</div>
          </div>
        </div>
      </div>
      {isAddProjectModalOpen && (
        <AddProjectModal
          addProjectHandler={addProjectHandler}
          closeAddProjectModal={closeAddProjectModal}
        />
      )}
    </>
  );
}

export default Dashboard;
