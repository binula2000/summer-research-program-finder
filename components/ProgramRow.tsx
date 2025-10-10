import React from 'react';
import { Program } from '../types';

interface ProgramRowProps {
  program: Program;
}

const renderContact = (contact: string) => {
  if (!contact) return <span className="text-slate-400">N/A</span>;

  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  const parts = contact.split(emailRegex);

  return parts.map((part, i) => {
    if (part.match(emailRegex)) {
      return (
        <a key={i} href={`mailto:${part}`} className="text-indigo-600 hover:text-indigo-800 transition-colors duration-150">
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
    // FIX: Explicitly type the accumulator `acc` as `React.ReactNode[] | null` to fix errors with spread syntax and `.length` property access.
  }).reduce((acc: React.ReactNode[] | null, elem) => acc === null ? [elem] : [...acc, <br key={`br-${acc.length}`} />, elem], null);
};

const SPECIALTY_COLORS = [
  // Reds & Pinks
  '#CD5C5C', '#F08080', '#DC143C', '#FF69B4', '#FF1493',
  // Oranges & Yellows
  '#FF4500', '#FF8C00', '#FFD700', '#F0E68C', '#FFDAB9',
  // Greens
  '#32CD32', '#228B22', '#6B8E23', '#2E8B57', '#20B2AA',
  // Cyans & Teals
  '#008B8B', '#008080', '#00FFFF', '#00CED1', '#5F9EA0',
  // Blues
  '#4682B4', '#1E90FF', '#4169E1', '#191970', '#6495ED',
  // Purples, Violets & Magentas
  '#6A5ACD', '#9370DB', '#4B0082', '#8B008B', '#DA70D6',
];

const getTextColorForBg = (hexColor: string): string => {
  const cleanHex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  // Using the YIQ formula to determine brightness
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
};

const getSpecialtyStyle = (specialty: string): React.CSSProperties => {
  let hash = 0;
  for (let i = 0; i < specialty.length; i++) {
    hash = specialty.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % SPECIALTY_COLORS.length);
  const backgroundColor = SPECIALTY_COLORS[index];
  const color = getTextColorForBg(backgroundColor);

  return { backgroundColor, color };
};


const ProgramRow: React.FC<ProgramRowProps> = ({ program }) => {
  const specialtyStyle = getSpecialtyStyle(program.specialty);

  return (
    <tr className="hover:bg-slate-50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-normal text-sm font-medium text-slate-900 align-top">
        {program.url ? (
          <a href={program.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline">
            {program.title}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        ) : (
          program.title
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 align-top">
        <span 
          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
          style={specialtyStyle}
        >
          {program.specialty}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-normal text-sm text-slate-600 align-top leading-relaxed">
        {program.overview}
      </td>
      <td className="px-6 py-4 whitespace-normal text-sm text-slate-600 align-top">
        {program.funding}
      </td>
      <td className="px-6 py-4 whitespace-normal text-sm text-slate-600 align-top">
        {renderContact(program.contact)}
      </td>
    </tr>
  );
};

export default ProgramRow;