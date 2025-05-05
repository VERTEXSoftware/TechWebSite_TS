import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div className="home-page">
      <Helmet>
        <title>Домашняя страница | Название сайта</title>
        <meta name="description" content="Добро пожаловать на домашнюю страницу нашего сайта. Мы предлагаем лучшие товары и услуги." />
        <meta name="keywords" content="главная, домашняя страница, начало, приветствие" />
        
        <meta property="og:title" content="Домашняя страница | Название сайта" />
        <meta property="og:description" content="Добро пожаловать на домашнюю страницу нашего сайта" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <main>
        <h1 className="text-4xl font-bold mb-6">Добро пожаловать!</h1>
        <div className="content">
          <p className="text-lg mb-4"> Это главная страница нашего сайта. Здесь вы найдете всю необходимую информацию.</p>
        </div>
      </main>
    </div>
  );
};

export default Home;