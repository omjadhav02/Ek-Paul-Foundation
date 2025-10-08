import React from 'react';

const videoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function Home(){ 
  return (
    <>
      <section className="hero-section position-relative overflow-hidden">
        <video className="w-100" autoPlay muted loop playsInline style={{objectFit:'cover', height:'60vh'}}>
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div className="container text-white text-center">
            <h1 className="display-4 fw-bold">Ek Paul Foundation</h1>
            <p className="lead mb-4">Bringing education & essentials to villages across Maharashtra.</p>
            <a className="btn btn-primary btn-lg me-2" href="/donation">Donate</a>
            <a className="btn btn-outline-light btn-lg" href="/events">See Events</a>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">Our Focus Areas</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Build Schools</h5>
                  <p className="card-text">Partnering with government schemes to establish classrooms in underserved villages.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Donate Essentials</h5>
                  <p className="card-text">Collecting money, clothes, and food to support students and families.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Volunteer</h5>
                  <p className="card-text">Join local drives and help with teaching, construction, and logistics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
