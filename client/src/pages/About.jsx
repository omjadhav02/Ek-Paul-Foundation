import React from 'react';

const bg = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1950&q=80";

export default function About(){
  return (
    <section className="about-section">
      <div className="bg-image" style={{
        backgroundImage:`url(${bg})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        padding:'120px 0'
      }}>
        <div className="container text-white">
          <h1 className="display-5">About Ek Paul Foundation</h1>
          <p className="lead">We work to ensure that children in rural Maharashtra have access to a safe school building, basic learning supplies, and nutrition.</p>
        </div>
      </div>

      <div className="container py-5">
        <h3>Our Story</h3>
        <p>Ek Paul Foundation was started to help bridge gaps in rural education. We collaborate with communities and government programs to build infrastructure and provide essential resources.</p>

        <h4 className="mt-4">Team</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=60" className="card-img-top" alt="team"/>
              <div className="card-body">
                <h5 className="card-title">Aditya</h5>
                <p className="card-text">Frontend & Tech</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1545996124-1f9d6c4973a7?auto=format&fit=crop&w=600&q=60" className="card-img-top" alt="team"/>
              <div className="card-body">
                <h5 className="card-title">Team Member</h5>
                <p className="card-text">Field Operations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
