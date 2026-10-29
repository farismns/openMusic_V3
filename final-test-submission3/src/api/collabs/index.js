import routes from './routes.js';
import CollaborationsHandler from './handler.js';
import CollabsService from '../../services/CollabsService.js';
import PlaylistsService from '../../services/PlaylistsService.js';
import TokenManager from '../../services/tokenManager.js';
import auth from '../_middlewares/auth.js';

const collaborationsPlugin = (app) => {
  const collaborationsService = new CollabsService();
  const playlistsService = new PlaylistsService();
  const tokenManager = new TokenManager();
  const authMiddleware = auth(tokenManager);

  const handler = new CollaborationsHandler(collaborationsService, playlistsService);

  app.use('/collaborations', routes(handler, authMiddleware));
};

export default collaborationsPlugin;
