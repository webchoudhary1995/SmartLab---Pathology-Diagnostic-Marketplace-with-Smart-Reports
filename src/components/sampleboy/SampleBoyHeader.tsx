'use client';

import { Droplets, LogOut } from 'lucide-react';

export default function SampleBoyHeader() {
  return (
    <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold">SmartLab</span>
              <span className="text-xs block text-green-100">Sample Collection</span>
            </div>
          </div>
          
          <button className="p-2 hover:bg-white/10 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}