import React from 'react';

interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({ itemsPerPage, setItemsPerPage }) => {
  const options = [25, 50, 75, { label: 'All', value: 0 }];

  return (
    <div>
      <label htmlFor="items-per-page" className="block text-sm font-medium text-slate-700 mb-1">
        Entries per Page
      </label>
      <select
        id="items-per-page"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className="block rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out bg-slate-100"
      >
        {options.map((option) => (
          <option
            key={typeof option === 'number' ? option : option.label}
            value={typeof option === 'number' ? option : option.value}
          >
            {typeof option === 'number' ? option : option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;