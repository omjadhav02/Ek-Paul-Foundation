import React from 'react';

export default function SiteFooter(){
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} Ek Paul Foundation</p>
        <small>Working to bring schools and basic resources to rural Maharashtra.</small>
      </div>
    </footer>
  );
}
