import styles from './project.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import TaskColumn from '../task-column/task-column';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { updateProjectData } from '../../redux/slices/projectsDataSlice';

function Project() {
  const { projectId } = useParams();
  const projectData = useAppSelector((state) => state.projectsDataSlice);
  const userData = useAppSelector((state) => state.userDataSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // extracting the project data from the projectData state
  const projectIndex = projectData.projects.findIndex(
    (project) => project.projectId === projectId
  );
  const projectName = projectData.projects[projectIndex]?.projectName ?? 'N/A';
  const projectDescription =
    projectData.projects[projectIndex]?.projectDescription ?? 'N/A';

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    dispatch(
      updateProjectData({
        destinationColumnId: result.destination.droppableId,
        sourceColumnId: result.source.droppableId,
        destinationIndex: result.destination.index,
        projectIndex: projectIndex,
        sourceIndex: result.source.index,
      })
    );
  };

  useEffect(() => {
    if (!userData.isLoggedIn) {
      navigate('/login', { replace: true });
    }

    if (!projectId || projectIndex === -1) {
      navigate('/', {
        replace: true,
      });
    }
  }, [projectId, navigate, projectIndex, userData]);

  return (
    <div className={styles.main_container}>
      <div className={styles.project_info}>
        <div className={styles.project_text}>
          <h2>{projectName}</h2>
          <p>{projectDescription}</p>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.task_columns}>
          {projectId &&
            projectIndex !== -1 &&
            projectData.projects[projectIndex].statusColumns.map((column) => (
              <TaskColumn
                key={column.columnId}
                columnData={column}
                projectId={projectId}
              />
            ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Project;
