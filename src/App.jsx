import React from 'react';
import Container from './components/Container';
import Header from './components/Header';
import NewsList from './components/NewsList';

const App = () => {
  return (
    <Container>
      <Header>
        <h3>Hackernews</h3>
      </Header>
      <NewsList></NewsList>
    </Container>
  );
};

export default App;
