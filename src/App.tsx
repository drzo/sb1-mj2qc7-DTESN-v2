import React from 'react';
import { useStore } from './store';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import AtomSpaceVisualizer from './components/AtomSpaceVisualizer';
import GitHubProfile from './components/GitHubProfile';

export default function App() {
  const currentView = useStore((state) => state.currentView);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <GitHubProfile />
        {currentView === 'chat' && <ChatInterface />}
        {currentView === 'atomspace' && <AtomSpaceVisualizer />}
        {currentView === 'graph' && (
          <div className="h-full flex items-center justify-center text-gray-500">
            Knowledge Graph view coming soon
          </div>
        )}
      </main>
    </div>
  );
}