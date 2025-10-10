import React from 'react';
import { Program } from '../types';
import ProgramRow from './ProgramRow';

interface ProgramTableProps {
  programs: Program[];
}

const ProgramTable: React.FC<ProgramTableProps> = ({ programs }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-x divide-slate-200 table-fixed border border-slate-200">
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '45%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="sticky top-0 z-10 bg-slate-50 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="sticky top-0 z-10 bg-slate-50 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Specialty
            </th>
            <th scope="col" className="sticky top-0 z-10 bg-slate-50 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Overview
            </th>
            <th scope="col" className="sticky top-0 z-10 bg-slate-50 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Funding
            </th>
            <th scope="col" className="sticky top-0 z-10 bg-slate-50 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Contact
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {programs.length > 0 ? (
            programs.map((program, index) => <ProgramRow key={`${program.title}-${index}`} program={program} />)
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                No programs found. Try adjusting your search or filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramTable;