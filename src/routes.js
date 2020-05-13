import NewsList from './components/NewsList';
import { fetchStories } from './api';

const routes = [
  {
    path: '/',
    exact: true,
    component: NewsList,
    loadData: () => fetchStories(1),
  },
  {
    path: '/page/:number',
    component: NewsList,
    loadData: ({ params: { number } }) => fetchStories(number),
  },
];

export default routes;
