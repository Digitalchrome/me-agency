'use client';

import { useState } from 'react';
import { formatHeight, formatMeasurement, formatShoeSize } from '@/lib/utils';
import type { Model } from '@/lib/types';

export interface StatsProps {
  model: Model;
}

/**
 * Composant d'affichage des statistiques du modèle
 * Model statistics display component
 */
export default function Stats({ model }: StatsProps) {
  const [isMetric, setIsMetric] = useState(true);

  return (
    <div className="space-y-6">
      {/* Toggle / Basculer */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsMetric(!isMetric)}
          className="btn-brutal text-sm"
        >
          {isMetric ? 'Switch to Imperial' : 'Switch to Metric'}
        </button>
      </div>

      {/* Stats grid / Grille de statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StatCard
          label="Height"
          value={formatHeight(model.height, isMetric)}
        />
        <StatCard
          label="Bust"
          value={formatMeasurement(model.bust, isMetric)}
        />
        <StatCard
          label="Waist"
          value={formatMeasurement(model.waist, isMetric)}
        />
        <StatCard
          label="Hips"
          value={formatMeasurement(model.hips, isMetric)}
        />
        <StatCard
          label="Shoe"
          value={formatShoeSize(model.shoe, isMetric)}
        />
        <StatCard
          label="Hair"
          value={model.hair}
        />
        <StatCard
          label="Eyes"
          value={model.eyes}
        />
        <StatCard
          label="Gender"
          value={model.gender}
        />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-3 border-black dark:border-white p-6 bg-white dark:bg-dark-grey hover:shadow-brutal transition-all duration-300 hover:-translate-y-1">
      <p className="font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
        {label}
      </p>
      <p className="font-bold text-2xl">{value}</p>
    </div>
  );
}
