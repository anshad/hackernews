import NewsList from './components/NewsList';
import { fetchStories } from './api';

const routes = [
  {
    path: '/',
    exact: true,
    component: NewsList,
    loadData: fetchStories,
  },
];

export default routes;
