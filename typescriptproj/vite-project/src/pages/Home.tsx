import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <Helmet>
          <title>Домашняя страница</title>
          <meta name="description" content="Домашняя страница нашего сайта." />
          <meta property="og:title" content="Домашняя страница" />
          <meta property="og:description" content="Домашняя страница нашего сайта." />
          <meta name="keywords" content="home, main page, welcome" />
        </Helmet>

        <h1 className="text-4xl font-bold mb-6">Домашняя страница</h1>
        <div className="content">
          <p className="text-lg mb-4">
            Домашняя страница нашего сайта.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;