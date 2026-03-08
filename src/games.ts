export interface Game {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  category: string;
  description: string;
}

export const games: Game[] = [
  {
    id: '2048',
    name: '2048',
    url: 'https://play2048.co/',
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    category: 'Puzzle',
    description: 'Join the numbers and get to the 2048 tile!'
  },
  {
    id: 'hextris',
    name: 'Hextris',
    url: 'https://hextris.io/',
    thumbnail: 'https://picsum.photos/seed/hextris/400/300',
    category: 'Arcade',
    description: 'Fast-paced puzzle game inspired by Tetris.'
  },
  {
    id: 'slope',
    name: 'Slope',
    url: 'https://slopegame.online/',
    thumbnail: 'https://picsum.photos/seed/slope/400/300',
    category: 'Action',
    description: 'Speed down the slope in this endless runner.'
  },
  {
    id: 'cookie-clicker',
    name: 'Cookie Clicker',
    url: 'https://orteil.dashnet.org/cookieclicker/',
    thumbnail: 'https://picsum.photos/seed/cookie/400/300',
    category: 'Idle',
    description: 'Bake an infinite amount of cookies.'
  },
  {
    id: 'tetris',
    name: 'Tetris',
    url: 'https://tetris.com/play-tetris',
    thumbnail: 'https://picsum.photos/seed/tetris/400/300',
    category: 'Puzzle',
    description: 'The classic block-stacking puzzle game.'
  },
  {
    id: 'minecraft-classic',
    name: 'Minecraft Classic',
    url: 'https://classic.minecraft.net/',
    thumbnail: 'https://picsum.photos/seed/minecraft/400/300',
    category: 'Sandbox',
    description: 'Play the original Minecraft in your browser.'
  },
  {
    id: 'paper-io-2',
    name: 'Paper.io 2',
    url: 'https://paper-io.com/',
    thumbnail: 'https://picsum.photos/seed/paper/400/300',
    category: 'IO',
    description: 'Capture as much territory as possible.'
  },
  {
    id: 'hole-io',
    name: 'Hole.io',
    url: 'https://hole-io.com/',
    thumbnail: 'https://picsum.photos/seed/hole/400/300',
    category: 'IO',
    description: 'Control a black hole and consume everything.'
  },
  {
    id: 'shell-shockers',
    name: 'Shell Shockers',
    url: 'https://shellshock.io/',
    thumbnail: 'https://picsum.photos/seed/egg/400/300',
    category: 'Shooter',
    description: 'The world\'s first browser-based Egg Shooter!'
  },
  {
    id: 'krunker',
    name: 'Krunker.io',
    url: 'https://krunker.io/',
    thumbnail: 'https://picsum.photos/seed/krunker/400/300',
    category: 'Shooter',
    description: 'Fast-paced pixelated first-person shooter.'
  }
];
