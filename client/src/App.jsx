import React from 'react';
import SiteNavbar from './components/SiteNavbar';
import SiteFooter from './components/SiteFooter';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Donation from './pages/Donation';

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  const renderRoute = () => {
    if (route === '/about') return <About navigate={navigate} />;
    if (route === '/events') return <Events navigate={navigate} />;
    if (route === '/donation') return <Donation navigate={navigate} />;
    return <Home navigate={navigate} />;
  };

  return (
    <>
      <SiteNavbar navigate={navigate} current={route} />
      <main className="flex-grow">
        {renderRoute()}
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
