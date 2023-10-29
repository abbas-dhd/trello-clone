import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ProjectType,
  TaskType,
  projectsDataSliceType,
} from '../../types/types';
import { RootState } from '../store';
import { INITIAL_COLUMNS, UNSPLASH_IMAGES } from '../../constants/constants';

const initialState: projectsDataSliceType = {
  projects: [],
};

const projectsDataSlice = createSlice({
  initialState,
  name: 'projectsDataSlice',
  reducers: {
    addNewProject: (
      state,
      action: PayloadAction<{ projectName: string; projectDescription: string }>
    ) => {
      const projectName = action.payload.projectName;
      const projectDescription = action.payload.projectDescription;
      const projectID = state.projects.length + 1;
      const projectImageURLIndex = Math.floor(
        Math.random() * Math.random() * UNSPLASH_IMAGES.length
      );

      const newProject: ProjectType = {
        projectName,
        projectDescription,
        projectId: projectID.toString(),
        statusColumns: INITIAL_COLUMNS,
        projectImageURL: UNSPLASH_IMAGES[projectImageURLIndex],
      };

      state.projects.push(newProject);

      return state;
    },
    addTaskToProject: (
      state,
      action: PayloadAction<{
        taskTitle: string;
        taskDescription: string;
        columnId: string;
        projectId: string;
      }>
    ) => {
      const taskTitle = action.payload.taskTitle;
      const taskDescription = action.payload.taskDescription;
      const columnId = action.payload.columnId;
      const projectId = action.payload.projectId;

      const projectIndex = state.projects.findIndex(
        (project) => project.projectId === projectId
      );
      const columnIndex = state.projects[projectIndex].statusColumns.findIndex(
        (column) => column.columnId === columnId
      );
      let taskId = 1; // starting from 1 since we are using this as a unique id

      state.projects[projectIndex].statusColumns.forEach((column) => {
        taskId += column.tasks.length;
      });

      const newTask: TaskType = {
        taskTitle,
        taskDescription,
        taskId: taskId.toString(),
      };

      state.projects[projectIndex].statusColumns[columnIndex].tasks.push(
        newTask
      );

      return state;
    },
    updateProjectData: (
      state,
      action: PayloadAction<{
        sourceColumnId: string;
        sourceIndex: number;
        destinationColumnId: string;
        destinationIndex: number;
        projectIndex: number;
      }>
    ) => {
      const sourceColumnId = action.payload.sourceColumnId;
      const sourceIndex = action.payload.sourceIndex;
      const destinationColumnId = action.payload.destinationColumnId;
      const destinationIndex = action.payload.destinationIndex;
      const projectIndex = action.payload.projectIndex;

      if (
        sourceColumnId === destinationColumnId &&
        sourceIndex === destinationIndex
      ) {
        return state;
      }

      const sourceColumnIndex = state.projects[
        projectIndex
      ].statusColumns.findIndex((column) => column.columnId === sourceColumnId);
      const destinationColumnIndex = state.projects[
        projectIndex
      ].statusColumns.findIndex(
        (column) => column.columnId === destinationColumnId
      );

      if (sourceColumnIndex !== -1 && destinationColumnIndex !== -1) {
        const removedTask = state.projects[projectIndex].statusColumns[
          sourceColumnIndex
        ].tasks.splice(sourceIndex, 1);

        state.projects[projectIndex].statusColumns[
          destinationColumnIndex
        ].tasks.splice(destinationIndex, 0, ...removedTask);
      }

      return state;
    },
    resetProjectData: () => {
      const newState = initialState;
      return newState;
    },
  },
});

export const {
  addNewProject,
  addTaskToProject,
  updateProjectData,
  resetProjectData,
} = projectsDataSlice.actions;

export const promoDetails = (state: RootState) => state.projectsDataSlice;

export default projectsDataSlice.reducer;
