import { StatusColumnType } from '../types/types';

export const INITIAL_COLUMNS: StatusColumnType[] = [
  {
    columnId: 'todo',
    columnLabel: 'To Do',
    tasks: [],
  },
  {
    columnId: 'inprogress',
    columnLabel: 'In Progress',
    tasks: [],
  },
  {
    columnId: 'done',
    columnLabel: 'Done',
    tasks: [],
  },
];

export const UNSPLASH_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1697143493202-5eb104789dde?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1695970921584-bb052e24916f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1690802585667-279edcdb32fe',
  'https://images.unsplash.com/photo-1697308034255-1839fce9d30a?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1693786693457-75ba014bc486?auto=format&fit=crop&q=80&w=1937&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export const PLACEHOLDER_IMAGE =
  'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';
