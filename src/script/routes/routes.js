import exploreResto from '../views/pages/explore';
import favoriteResto from '../views/pages/favorite';
import detailResto from '../views/pages/detail';

const routes = {
  '/': exploreResto,
  '/explore': exploreResto,
  '/favorite': favoriteResto,
  '/detail/:id': detailResto,
};

export default routes;
