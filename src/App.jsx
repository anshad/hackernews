import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import routes from './routes';

const App = (props) => {
  return (
    <>
      <header>Hackernews</header>
      <main>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Switch>
      </main>
    </>
  );
};

export default App;
