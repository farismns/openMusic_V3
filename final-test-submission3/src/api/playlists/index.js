import routes from './routes.js';
import PlaylistsHandler from './handler.js';
import PlaylistsService from '../../services/PlaylistsService.js';
import PlaylistActsService from '../../services/PlaylistActsService.js';
import TokenManager from '../../services/TokenManager.js';
import auth from '../_middlewares/auth.js';

const playlistsPlugin = (app) => {
  const activitiesService = new PlaylistActsService();
  const service = new PlaylistsService(activitiesService);
  const tokenManager = new TokenManager();
  const authMiddleware = auth(tokenManager);
  const handler = new PlaylistsHandler(service);

  app.use('/playlists', routes(handler, authMiddleware));
};

export default playlistsPlugin;
