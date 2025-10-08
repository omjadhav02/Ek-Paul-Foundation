import React from 'react';

export default function Donation(){
  const [form, setForm] = React.useState({name:'',email:'',amount:''});
  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = e => {
    e.preventDefault();
    alert('Thank you, ' + form.name + '! We received your donation info (this form is demo-only).');
    setForm({name:'',email:'',amount:''});
  };
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4">Donate</h2>
        <div className="row">
          <div className="col-md-6">
            <p>Your support helps build classrooms and provide essentials. Fill the form to register a donation intent.</p>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input name="name" value={form.name} onChange={onChange} className="form-control" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" value={form.email} onChange={onChange} type="email" className="form-control" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Amount (INR)</label>
                <input name="amount" value={form.amount} onChange={onChange} type="number" className="form-control" required/>
              </div>
              <button className="btn btn-primary">Submit Donation</button>
            </form>
          </div>
          <div className="col-md-6">
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80" alt="donation" className="img-fluid rounded shadow-sm"/>
          </div>
        </div>
      </div>
    </section>
  );
}
