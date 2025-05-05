import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <div className="about-page">
      <Helmet>
        <title>О нас</title>
        <meta name="description" content="Данный сайт тестовый." />
        <meta property="og:title" content="О нас" />
        <meta property="og:description" content="Данный сайт тестовый." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">О нас</h1>
      <div className="prose">
        <p>Данный сайт тестовый.</p>
        
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">О проекте</h2>
          <p>Данный сайт тестовый.</p>
        </section>

      </div>
    </div>
  );
};

export default About;