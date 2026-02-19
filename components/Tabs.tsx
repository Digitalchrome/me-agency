'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
  className?: string;
}

/**
 * Composant d'onglets avec style brutaliste
 * Tabs component with brutalist styling
 */
export default function Tabs({ tabs, defaultTab = 0, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={cn('w-full', className)}>
      {/* Tab headers / En-têtes d'onglets */}
      <div
        className="flex gap-0 border-b-3 border-black dark:border-white mb-8"
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index ? 'true' : 'false'}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            onClick={() => setActiveTab(index)}
            className={cn(
              'px-6 py-3 font-mono uppercase text-sm tracking-wider',
              'border-r-3 border-black dark:border-white last:border-r-0',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-electric-blue',
              activeTab === index
                ? 'bg-black dark:bg-white text-white dark:text-black font-bold'
                : 'bg-white dark:bg-dark-grey text-black dark:text-white hover:bg-light-grey dark:hover:bg-gray-800'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content / Contenu des onglets */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={activeTab !== index}
          className={cn(
            'animate-fade-in',
            activeTab === index ? 'block' : 'hidden'
          )}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
