import React from 'react';
const eventVideo = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function Events(){
  const events = [
    {id:1, title:'School Inauguration', date:'2025-11-10', desc:'Opening a new classroom in a village.'},
    {id:2, title:'Clothes & Food Drive', date:'2025-12-05', desc:'Collecting essentials for families.'},
  ];
  return (
    <>
      <div className="position-relative" style={{height:'45vh', overflow:'hidden'}}>
        <video className="w-100" autoPlay muted loop playsInline style={{objectFit:'cover', height:'100%'}}>
          <source src={eventVideo} type="video/mp4" />
        </video>
        <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div className="container text-white text-center">
            <h1 className="display-5">Events</h1>
            <p>Join our upcoming events and drives.</p>
          </div>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {events.map(ev=>(
              <div key={ev.id} className="col-md-6">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{ev.title}</h5>
                    <p className="text-muted">{ev.date}</p>
                    <p className="card-text">{ev.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
