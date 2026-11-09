# GUESS 10 - Digital Yes/No Trivia Card Game 🎴✨

> Inspired by physical Yes/No card deduction games (such as *Guess in 10*), GUESS 10 transforms tabletop trivia into a tactile, responsive web application for children, families, teenagers, and adults.

![GUESS 10 Official Logo](/public/logo.png)

---

## 🌟 Key Features & Improvements

### 1. 10 Curated Categories & 408 Verified Cards
Over **400 verified, hand-curated cards** across 10 distinct categories (40–48 cards each):
1. 🐾 **Animal Kingdom / Animal Planet** (40 cards): Wildlife, mammal species, birds, reptiles, marine life, and animal traits.
2. 🌍 **Countries of the World** (40 cards): Global nations, flags, capitals, currencies, and geographic marvels.
3. 🏙️ **Cities Around the World** (40 cards): World capitals, historic skylines, ports, and cultural hubs.
4. 🇮🇳 **Wonders of India** (48 cards): Architectural masterpieces (*Taj Mahal, Hampi, Konark, Amber Palace, Khajuraho, Rani ki Vav*), rock-cut caves (*Ajanta, Ellora, Kailasa, Elephanta*), spiritual icons (*Golden Temple, Brihadisvara, Shore Temple, Mahabodhi*), and natural wonders (*Pangong Tso, Living Root Bridges, Lonar Crater, Valley of Flowers, Sundarbans*).
5. 🌌 **All About Space** (40 cards): Planets, moons, galaxies, space telescopes (*Hubble, JWST*), black holes, and space missions.
6. ⚽ **World of Sports** (40 cards): International sports, equipment, Olympic disciplines, racing, and athletics.
7. 🏛️ **Legendary Landmarks** (40 cards): World wonders (*Eiffel Tower, Great Wall, Pyramids of Giza, Colosseum, Machu Picchu, Petra*).
8. 🍕 **Foods Around the World** (40 cards): Iconic global delicacies (*Pizza, Sushi, Biryani, Croissant, Pad Thai, Dim Sum, Tacos, Paella*).
9. 🧑‍🚀 **Inspiring Professions** (40 cards): Essential careers, key tools, and community heroes (*Doctor, Astronaut, Firefighter, Software Engineer, Marine Biologist*).
10. 🦖 **Dinosaurs & Prehistoric Life** (40 cards): Prehistoric giants and fossils (*T. rex, Triceratops, Velociraptor, Brachiosaurus, Spinosaurus, Megalodon, Woolly Mammoth*).

---

### 2. Physical Card Layout Fidelity
Each trivia card reproduces the tactile layout of the physical board game card:
- **Bold Card Title Banner**: High-contrast title plaque with drop shadow.
- **Illustration & Artwork Area**: Visual character icon, category badge, and difficulty rating.
- **Buzz-Words Bar**: **3 thematic anchor buzz-words** displayed to guide question deduction without spoiling the answer.
- **3 Numbered Clues**: Step-by-step verified clues with circular numeric badges (1, 2, 3).
- **2x2 Facts Grid**: Quick visual attributes with icons, category labels, and verified properties.
- **Yellow BONUS Box**: Authentic bonus challenge question/answer at the card footer.

---

### 3. Tactile UI & Bug Fixes
- **No Card Flattening / Squishing**: Dedicated fixed-aspect sizing (`w-[310px] h-[460px] min-h-[460px]`) prevents the 3D perspective wrapper from collapsing in flex containers or modals.
- **Zero Host Box Overlap**: Clear container separation between the Mystery Card stand and the Host Question & Answer Box.
- **Guesser Buzz-Words Guide**: The active guesser sees the 3 thematic anchor buzz-words on their screen to help formulate targeted Yes/No questions.
- **Flexible Match Targets**: Choose from **3 (Quick)**, **5 (Fast)**, **7 (Classic - Official)**, **10 (Pro)**, or **15 (Marathon)** cards to win.
- **Web Audio API Sound Effects**: Zero external audio dependencies—crystal-clear procedural chimes for clicks, flips, Yes/No, clues, and victory.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) version 18.17.0 or higher.
- npm, yarn, or pnpm.

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repo-url>
cd guess-in-10
npm install
```

### 2. Run Tests
Verify all 408 cards, category datasets, and the game rules engine:
```bash
npm test
```

### 3. Development Server
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
Verify the production build:
```bash
npm run build
npm start
```

---

## ☁️ Deploying to Vercel

### Method A: One-Click GitHub to Vercel (Recommended)
1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/guess-in-10.git
   git branch -M main
   git push -u origin main
   ```
2. Open [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New... > Project**.
3. Import your `guess-in-10` repository.
4. Keep the default settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Click **Deploy**. Vercel will build and assign a production URL (e.g., `https://guess-in-10.vercel.app`).

### Method B: Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Audio**: Web Audio API (Synthesizer)
- **State Management**: Zustand
- **Storage**: Browser LocalStorage
