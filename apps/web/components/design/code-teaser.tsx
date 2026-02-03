"use client"
import React, { useState } from 'react';

type PackageManager = 'npm' | 'yarn' | 'pnpm';
const CodeTeaser = () => {
  const [activeTab, setActiveTab] = useState<PackageManager>('npm');

  const commands: Record<PackageManager, string> = {
    npm: 'npm install @coming/soon',
    yarn: 'yarn add @coming/soon',
    pnpm: 'pnpm add @coming/soon'
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <div className="relative bg-white border border-zinc-400 rounded-lg overflow-hidden shadow-sm">

        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-gray-100">
          <div className="flex gap-1.5 sm:gap-2">
            {(['npm', 'yarn', 'pnpm'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-2 sm:px-3 py-1 text-xs font-medium font-fragment-mono rounded transition-colors
                  ${activeTab === tab
                    ? 'bg-black text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative p-3 sm:p-4 font-mono text-xs sm:text-sm bg-gray-50/50">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-gray-400 flex-shrink-0">$</span>

            <div className="relative flex-1 min-w-0">
              <code className="text-gray-800 blur select-none opacity-100 bg-zinc-200 block truncate sm:whitespace-normal">
                {commands[activeTab]}
              </code>
            </div>
            <button
              disabled
              className="p-1 sm:p-1.5 text-gray-300 cursor-not-allowed flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                className="sm:w-4 sm:h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTeaser;