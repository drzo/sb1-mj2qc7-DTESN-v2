import React from 'react';
import { MessageSquare, Network, Share2 } from 'lucide-react';
import { useStore } from '../store';
import { ViewType } from '../types';

export default function Sidebar() {
  const { currentView, setView } = useStore();

  const views: { type: ViewType; icon: React.ReactNode; label: string }[] = [
    { type: 'chat', icon: <MessageSquare className="w-6 h-6" />, label: 'Chat' },
    { type: 'atomspace', icon: <Network className="w-6 h-6" />, label: 'AtomSpace' },
    { type: 'graph', icon: <Share2 className="w-6 h-6" />, label: 'Graph' },
  ];

  return (
    <div className="w-20 bg-gray-900 flex flex-col items-center py-4">
      {views.map(({ type, icon, label }) => (
        <button
          key={type}
          onClick={() => setView(type)}
          className={`w-full p-4 flex flex-col items-center gap-1 ${
            currentView === type
              ? 'text-blue-500'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {icon}
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
}