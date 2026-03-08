import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, ExternalLink, Shield, Info, LayoutGrid, List, Filter, X } from 'lucide-react';
import { games } from './games';

export default function App() {
  console.log('App component rendering...');
  const [isAuthorized, setIsAuthorized] = useState(() => {
    try {
      return localStorage.getItem('cloaked_access') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [customUrl, setCustomUrl] = useState('');

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1114') {
      setIsAuthorized(true);
      localStorage.setItem('cloaked_access', 'true');
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
      setTimeout(() => setPinError(false), 1000);
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem('cloaked_access');
  };

  const categories = useMemo(() => {
    const cats = new Set(games.map(g => g.category));
    return Array.from(cats);
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const openInCloakedTab = (url: string, title: string = 'Classes') => {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Popup blocked! Please allow popups for this site.');
      return;
    }
    
    const doc = win.document;
    doc.title = title;
    
    // Add a favicon to make it look like a school site
    const link = doc.createElement('link');
    link.rel = 'icon';
    link.href = 'https://ssl.gstatic.com/classroom/favicon.png'; // Google Classroom icon
    doc.head.appendChild(link);

    const iframe = doc.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.style.overflow = 'hidden';
    iframe.style.zIndex = '999999';
    iframe.src = url;
    
    doc.body.appendChild(iframe);
    doc.body.style.margin = '0';
    doc.body.style.padding = '0';
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl) {
      let url = customUrl;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      openInCloakedTab(url, 'Google Docs');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 font-sans selection:bg-[#00ff00] selection:text-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8 text-center"
        >
          <div className="space-y-4">
            <div className="w-20 h-20 bg-[#00ff00] mx-auto flex items-center justify-center transform -rotate-12 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
              <Shield className="text-black w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Cloaked Games</h1>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">System Restricted // Enter Access Key</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className={`w-full bg-white/5 border-2 text-center text-4xl py-6 tracking-[1em] focus:outline-none transition-all font-mono ${
                  pinError ? 'border-red-500 animate-shake' : 'border-white/10 focus:border-[#00ff00]'
                }`}
                autoFocus
              />
              {pinError && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-[10px] uppercase font-mono mt-2"
                >
                  Access Denied // Invalid Key
                </motion.p>
              )}
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-[#00ff00] text-black font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95"
            >
              Authorize Session
            </button>
          </form>

          <div className="pt-12">
            <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Secure Gateway v2.4.0 // Encrypted Connection</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#00ff00] selection:text-black">
      {/* Brutalist Header */}
      <header className="border-b border-white/10 p-6 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#00ff00] flex items-center justify-center rounded-none transform -rotate-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              <Gamepad2 className="text-black w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase italic">Cloaked Games</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">Unblocked & Cloaked</p>
            </div>
          </div>

          <div className="flex flex-1 max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00ff00] transition-colors" />
            <input
              type="text"
              placeholder="SEARCH GAMES..."
              className="w-full bg-white/5 border border-white/10 py-3 pl-12 pr-4 focus:outline-none focus:border-[#00ff00] focus:ring-1 focus:ring-[#00ff00] font-mono text-sm transition-all uppercase"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => openInCloakedTab(window.location.href, 'Google Classroom')}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-[#00ff00] hover:text-black transition-all font-bold uppercase text-xs tracking-widest"
            >
              <Shield className="w-4 h-4" />
              Cloak Page
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 bg-white/5 border border-white/10 hover:bg-red-500 hover:text-white transition-all"
              title="Lock Session"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Custom URL Section */}
        <section className="bg-white/5 border border-white/10 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <ExternalLink className="w-24 h-24" />
          </div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-xl font-black uppercase italic flex items-center gap-2">
              <Shield className="text-[#00ff00] w-5 h-5" />
              Cloak Any Site
            </h2>
            <form onSubmit={handleCustomUrlSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="ENTER URL (e.g. google.com)..."
                className="flex-1 bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-[#00ff00] font-mono text-sm uppercase"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />
              <button 
                type="submit"
                className="px-8 py-3 bg-[#00ff00] text-black font-black uppercase tracking-tighter hover:scale-105 transition-transform active:scale-95"
              >
                Launch Cloaked
              </button>
            </form>
            <p className="text-[10px] text-white/40 font-mono uppercase">Opens in a new about:blank tab disguised as Google Docs</p>
          </div>
        </section>

        {/* Filters & View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                !selectedCategory ? 'bg-[#00ff00] text-black' : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat ? 'bg-[#00ff00] text-black' : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-1 rounded-none border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-[#00ff00] text-black' : 'text-white/40 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-all ${viewMode === 'list' ? 'bg-[#00ff00] text-black' : 'text-white/40 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative ${
                  viewMode === 'grid' 
                    ? 'bg-white/5 border border-white/10 overflow-hidden hover:border-[#00ff00]/50 transition-colors' 
                    : 'bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-[#00ff00]/50 transition-colors'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={game.thumbnail}
                        alt={game.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 text-[8px] font-mono uppercase tracking-widest border border-white/10">
                        {game.category}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-black uppercase italic tracking-tighter group-hover:text-[#00ff00] transition-colors">
                        {game.name}
                      </h3>
                      <p className="text-xs text-white/50 line-clamp-2 font-mono leading-relaxed">
                        {game.description}
                      </p>
                      <button
                        onClick={() => openInCloakedTab(game.url, game.name)}
                        className="w-full py-3 mt-4 bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest group-hover:bg-[#00ff00] group-hover:text-black transition-all flex items-center justify-center gap-2"
                      >
                        Play Now
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-black border border-white/10 overflow-hidden">
                        <img
                          src={game.thumbnail}
                          alt={game.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter group-hover:text-[#00ff00] transition-colors">
                          {game.name}
                        </h3>
                        <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">{game.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => openInCloakedTab(game.url, game.name)}
                      className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest group-hover:bg-[#00ff00] group-hover:text-black transition-all flex items-center gap-2"
                    >
                      Launch
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-24 border border-dashed border-white/10">
            <X className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-black uppercase italic text-white/40">No games found</h3>
            <p className="text-xs font-mono text-white/20 mt-2 uppercase">Try adjusting your search or category</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24 p-12 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gamepad2 className="text-[#00ff00] w-6 h-6" />
              <span className="text-xl font-black uppercase italic tracking-tighter">Cloaked Games</span>
            </div>
            <p className="text-xs text-white/40 font-mono leading-relaxed uppercase">
              The ultimate destination for unblocked browser games. Built with privacy and accessibility in mind.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00ff00]">Security</h4>
            <ul className="space-y-2 text-xs font-mono text-white/60 uppercase">
              <li className="flex items-center gap-2"><Shield className="w-3 h-3" /> about:blank Cloaking</li>
              <li className="flex items-center gap-2"><Shield className="w-3 h-3" /> Tab Disguising</li>
              <li className="flex items-center gap-2"><Shield className="w-3 h-3" /> No Tracking</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00ff00]">Disclaimer</h4>
            <p className="text-[9px] text-white/30 font-mono leading-relaxed uppercase">
              Cloaked Games is for educational and entertainment purposes only. Please follow your institution's guidelines and policies regarding internet usage.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-white/5 flex justify-between items-center">
          <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">© 2026 Cloaked Games // System Operational</p>
          <div className="flex gap-4">
             <Info className="w-4 h-4 text-white/20 cursor-help hover:text-white transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}
