import React, { useState } from 'react';
import './App.css';
import LongPolling from './LongPolling';
import EventSourcing from './EventSourcing';
import WebSocketComponent from './WebSocketComponent';

function App() {
  const [activeTab, setActiveTab] = useState('EventSourcing');

  const renderComponent = () => {
    switch (activeTab) {
      case 'LongPolling':
        return <LongPolling />;
      case 'EventSourcing':
        return <EventSourcing />;
      case 'WebSocket':
        return <WebSocketComponent />;
      default:
        return <LongPolling />;
    }
  };

  return (
    <div className="App">
      <div className="tabs flex justify-center my-4">
        <button
          className={`px-4 py-2 mx-2 ${activeTab === 'LongPolling' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('LongPolling')}
        >
          LongPolling
        </button>
        <button
          className={`px-4 py-2 mx-2 ${activeTab === 'EventSourcing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('EventSourcing')}
        >
          EventSourcing
        </button>
        <button
          className={`px-4 py-2 mx-2 ${activeTab === 'WebSocket' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('WebSocket')}
        >
          WebSocket
        </button>
      </div>
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
