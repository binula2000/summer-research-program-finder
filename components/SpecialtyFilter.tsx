import React from 'react';

interface SpecialtyFilterProps {
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  specialties: string[];
  className?: string;
}

const SpecialtyFilter: React.FC<SpecialtyFilterProps> = ({
  selectedSpecialty,
  setSelectedSpecialty,
  specialties,
  className
}) => {
  return (
    <div className={className}>
      <label htmlFor="specialty" className="block text-sm font-medium text-slate-700 mb-1">
        Filter by Specialty
      </label>
      <select
        id="specialty"
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
        className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-slate-100"
      >
        <option value="">All Specialties</option>
        {specialties.map((specialty) => (
          <option key={specialty} value={specialty}>
            {specialty}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SpecialtyFilter;