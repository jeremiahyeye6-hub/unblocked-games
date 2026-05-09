/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  X, 
  Maximize2, 
  Navigation, 
  Trophy, 
  Flame, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(gamesData.map(g => g.category)))];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen gradient-mesh selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setSelectedGame(null)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
              <Gamepad2 size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              APEX<span className="text-blue-500">GAMES</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6">
             {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
              <Trophy size={16} />
              Leaderboard
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/20 shadow-lg shadow-blue-500/20" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Banner */}
              <div className="relative rounded-3xl overflow-hidden mb-12 h-64 md:h-80 bg-zinc-900 border border-white/5 shadow-2xl flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
                  alt="Feature banner"
                />
                <div className="relative z-20 px-8 md:px-12 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-4">
                    <Flame size={14} /> TRENDING NOW
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
                    Level up your <br />
                    <span className="text-blue-500">Unblocked</span> experience.
                  </h1>
                  <p className="text-white/60 text-lg mb-8 max-w-md hidden sm:block">
                    Play the best web games directly in your browser. No downloads, no blocks, just pure fun.
                  </p>
                  <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                    Start Playing
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                        : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedGame(game)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-xs font-bold text-blue-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-transform">
                          {game.category.toUpperCase()}
                        </div>
                        <h3 className="font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors">
                          {game.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <div className="flex items-center gap-2 text-white/40 text-sm mb-0.5">
                    <span>Games</span>
                    <ChevronRight size={14} />
                    <span>{selectedGame.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedGame.title}</h2>
                </div>
              </div>

              {/* Game Viewport */}
              <div className="bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-video relative group">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allow="fullscreen"
                />
                
                {/* Controls overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 text-white">
                    <Maximize2 size={18} />
                  </button>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Game Info Panel */}
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h3 className="text-xl font-bold mb-3">About {selectedGame.title}</h3>
                    <p className="text-white/60 leading-relaxed">
                      {selectedGame.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl">
                    <h4 className="font-bold flex items-center gap-2 mb-4">
                      <Navigation size={18} className="text-blue-400" />
                      Controls
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/60">Move</span>
                        <span className="px-2 py-1 bg-white/10 border border-white/10 rounded font-mono text-[10px]">WASD / ARROW</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/60">Select</span>
                        <span className="px-2 py-1 bg-white/10 border border-white/10 rounded font-mono text-[10px]">ENTER</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/60">Pause</span>
                        <span className="px-2 py-1 bg-white/10 border border-white/10 rounded font-mono text-[10px]">ESC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-12 pb-8 mt-12 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
             <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              APEX<span className="text-blue-500">GAMES</span>
            </span>
            <p className="text-white/40 mt-4 text-sm max-w-xs">
              Built for gamers by gamers. The ultimate collection of unblocked web applications and games.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">DCMA</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <div className="flex gap-4">
              {['Discord', 'Twitter', 'YouTube'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-white/20 text-xs">
          © 2024 Apex Unblocked. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
