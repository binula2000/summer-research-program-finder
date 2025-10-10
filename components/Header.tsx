import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          FCoM - External Research Opportunities (Summer 2026)
        </h1>
        <p className="mt-2 text-slate-600">
          A searchable directory of opportunities for medical students.
        </p>
      </div>
    </header>
  );
};

export default Header;