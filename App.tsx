import React, { useState, useMemo, useEffect, useRef } from 'react';
import { programs } from './data/programs';
import SearchBar from './components/SearchBar';
import SpecialtyFilter from './components/SpecialtyFilter';
import ProgramTable from './components/ProgramTable';
import ItemsPerPageSelector from './components/ItemsPerPageSelector';
import PageNavigator from './components/PageNavigator';
import Header from './components/Header';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const specialties = useMemo(() => {
    const specialtySet = new Set<string>();
    programs.forEach(program => {
      if (program.specialty) {
        specialtySet.add(program.specialty);
      }
    });
    return Array.from(specialtySet).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const matchesSpecialty = selectedSpecialty ? program.specialty === selectedSpecialty : true;

      const matchesSearch = searchTerm
        ? program.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          program.overview.toLowerCase().includes(lowerCaseSearchTerm) ||
          program.funding.toLowerCase().includes(lowerCaseSearchTerm) ||
          program.specialty.toLowerCase().includes(lowerCaseSearchTerm) ||
          program.contact.toLowerCase().includes(lowerCaseSearchTerm)
        : true;

      return matchesSpecialty && matchesSearch;
    });
  }, [searchTerm, selectedSpecialty]);
  
  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSpecialty, itemsPerPage]);


  const paginatedPrograms = useMemo(() => {
    if (itemsPerPage === 0) { // "All" is selected
      return filteredPrograms;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPrograms.slice(startIndex, endIndex);
  }, [filteredPrograms, currentPage, itemsPerPage]);

  const totalPages = itemsPerPage === 0 ? 1 : Math.ceil(filteredPrograms.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col font-sans text-slate-800">
      <Header />
      <main className="flex-grow p-6 flex flex-col overflow-y-hidden">
        <div className="flex-shrink-0">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6 mb-6 items-end">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <SpecialtyFilter
                selectedSpecialty={selectedSpecialty}
                setSelectedSpecialty={setSelectedSpecialty}
                specialties={specialties}
              />
              <ItemsPerPageSelector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
            </div>
        </div>
        
        <div className="flex-grow overflow-y-auto" ref={scrollContainerRef}>
          <ProgramTable programs={paginatedPrograms} />
          {totalPages > 1 && (
              <PageNavigator 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
              />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;