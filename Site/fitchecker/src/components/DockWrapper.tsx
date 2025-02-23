// src/components/DockWrapper.tsx
'use client';

import React from 'react';
import Dock from '@/components/Dock/Dock'; // Adjust path if necessary
import { VscHome, VscArchive} from 'react-icons/vsc';
import { FaRobot } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";

const dockItems = [
  { icon: <VscHome size={18} />, label: "Home", onClick: () => window.location.href = "/" },
  { icon: <FaBrain size={18} />, label: "Start Measurement", onClick: () => window.location.href = "/results" },
  { icon: <VscArchive size={18} />, label: "Ar Archive", onClick: () => window.location.href = "/ar-preview" },
  { icon: <FaRobot size={18} />, label: "Chat with Swag AI", onClick: () => window.location.href = "/help" },
  
];

export default function DockWrapper() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <Dock 
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
}
