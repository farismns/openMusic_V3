import routes from './routes.js';
import ExportsHandler from './handler.js';
import ProducerService from '../../services/ProducerService.js';
import PlaylistsService from '../../services/PlaylistsService.js';
import PlaylistActsService from '../../services/PlaylistActsService.js';
import TokenManager from '../../services/TokenManager.js';
import auth from '../_middlewares/auth.js';

const exportsPlugin = (app) => {
  const activitiesService = new PlaylistActsService();
  const playlistsService = new PlaylistsService(activitiesService);
  const producerService = new ProducerService();
  const tokenManager = new TokenManager();
  const authMiddleware = auth(tokenManager);
  const handler = new ExportsHandler(playlistsService, producerService);

  app.use('/export', routes(handler, authMiddleware));
};

export default exportsPlugin;
