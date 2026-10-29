import routes from './routes.js';
import AuthenticationsHandler from './handler.js';
import AuthsService from '../../services/authsService.js';
import UsersService from '../../services/UsersService.js';
import TokenManager from '../../services/tokenManager.js';

const authenticationsPlugin = (app) => {
  const usersService = new UsersService();
  const authenticationsService = new AuthsService();
  const tokenManager = new TokenManager();

  const handler = new AuthenticationsHandler(usersService, authenticationsService, tokenManager);

  app.use('/authentications', routes(handler));
};

export default authenticationsPlugin;
