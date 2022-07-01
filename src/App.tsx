import routesConfig from './route/routes-config';
import createRoutes from './route/create-routes';

function App() {
  return createRoutes(routesConfig);
}

export default App;
