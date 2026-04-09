'use client';

import { useState, useEffect } from 'react';
import type { Model } from '@/lib/types';

interface FilterProps {
  models: Model[];
  setFilteredModels: (models: Model[]) => void;
}

const Filter = ({ models, setFilteredModels }: FilterProps) => {
  const [gender, setGender] = useState('all');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');

  const locations = Array.from(new Set(models.map((model) => model.location)));

  useEffect(() => {
    let filtered = models;

    if (gender !== 'all') {
      filtered = filtered.filter((model) => model.gender === gender);
    }

    if (category !== 'all') {
      filtered = filtered.filter((model) => model.category === category);
    }

    if (location !== 'all') {
      filtered = filtered.filter((model) => model.location === location);
    }

    setFilteredModels(filtered);
  }, [gender, category, location, models, setFilteredModels]);

  return (
    <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div>
        <h2 className="text-2xl font-editorial">Filter Models</h2>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-gender" className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            Gender
          </label>
          <select
            id="filter-gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className="bg-white dark:bg-dark-grey border-3 border-black dark:border-white px-4 py-2 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-electric-blue transition-all"
          >
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-category" className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            Category
          </label>
          <select
            id="filter-category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="bg-white dark:bg-dark-grey border-3 border-black dark:border-white px-4 py-2 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-electric-blue transition-all"
          >
            <option value="all">All Categories</option>
            <option value="Mainboard">Mainboard</option>
            <option value="Development">Development</option>
            <option value="Classic">Classic</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-location" className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            Location
          </label>
          <select
            id="filter-location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="bg-white dark:bg-dark-grey border-3 border-black dark:border-white px-4 py-2 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-electric-blue transition-all"
          >
            <option value="all">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
