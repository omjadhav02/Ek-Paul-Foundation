import React from 'react';

export default function SiteNavbar({ navigate, current }) {
  const go = (e, path) => {
    e.preventDefault();
    navigate(path);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a className="navbar-brand" href="/" onClick={(e)=>go(e,'/')}><strong>Ek Paul Foundation</strong></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className={'nav-link ' + (current==='/'||current==='/home' ? 'active':'' )} href="/" onClick={(e)=>go(e,'/')} >Home</a></li>
            <li className="nav-item"><a className={'nav-link ' + (current==='/about' ? 'active':'')} href="/about" onClick={(e)=>go(e,'/about')}>About Us</a></li>
            <li className="nav-item"><a className={'nav-link ' + (current==='/events' ? 'active':'')} href="/events" onClick={(e)=>go(e,'/events')}>Events</a></li>
            <li className="nav-item"><a className={'nav-link ' + (current==='/donation' ? 'active':'')} href="/donation" onClick={(e)=>go(e,'/donation')}>Donation</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
