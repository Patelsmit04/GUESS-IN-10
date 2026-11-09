import fs from 'fs';
import path from 'path';

interface CardDef {
  id: string;
  category: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  emoji: string;
  buzzWords: [string, string, string];
  clues: [string, string, string];
  primaryClues: [string, string];
  secondaryClues: [string, string];
  factGrid: [
    { icon: string; label: string; value: string },
    { icon: string; label: string; value: string },
    { icon: string; label: string; value: string },
    { icon: string; label: string; value: string }
  ];
  bonusTrivia: { question: string; answer: string };
  facts: Record<string, boolean | string | number>;
  aliases: string[];
  explanation: string;
  funFact: string;
  verificationStatus: 'verified';
}

function updateFile(filename: string, exportVar: string, transform: (cards: CardDef[]) => CardDef[]) {
  const filePath = path.join(process.cwd(), 'src', 'features', 'cards', 'data', 'categories', filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  // Extract JSON array
  const jsonMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (!jsonMatch) {
    console.error(`Could not parse JSON from ${filename}`);
    return;
  }
  const cards: CardDef[] = JSON.parse(jsonMatch[0]);
  const updatedCards = transform(cards);
  const newContent = `import { Card } from '@/types/card';\n\nexport const ${exportVar}: Card[] = ${JSON.stringify(updatedCards, null, 2)};\n`;
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✓ ${filename} refined (${updatedCards.length} cards)`);
}

// 1. Refine Animals: Replace giveaways with conceptual clues
const animalBuzzMap: Record<string, [string, string, string]> = {
  'Wolf': ['Canine', 'Pack', 'Tundra'],
  'Lion': ['Savanna', 'Carnivore', 'Pride'],
  'Tiger': ['Stripes', 'Solitary', 'Stalker'],
  'Elephant': ['Herd', 'Herbivore', 'Matriarch'],
  'Giant Panda': ['Bamboo', 'Highlands', 'Solitary'],
  'Cheetah': ['Sprint', 'Feline', 'Savanna'],
  'Kangaroo': ['Marsupial', 'Herbivore', 'Bipedal'],
  'Blue Whale': ['Marine', 'Mammal', 'Migratory'],
  'Emperor Penguin': ['Colony', 'Antarctic', 'Plumage'],
  'Chameleon': ['Reptile', 'Arboreal', 'Camouflage'],
  'Bald Eagle': ['Apex', 'Raptor', 'Plumage'],
  'Grizzly Bear': ['Omnivore', 'Hibernation', 'Wilderness'],
  'Giraffe': ['Browsing', 'Savanna', 'Ungulate'],
  'Zebra': ['Herd', 'Herbivore', 'Grazing'],
  'Hippopotamus': ['Semiaquatic', 'Herbivore', 'Territorial'],
  'Gorilla': ['Primate', 'Troop', 'Rainforest'],
  'Polar Bear': ['Marine', 'Arctic', 'Blubber'],
  'Koala': ['Marsupial', 'Eucalyptus', 'Nocturnal'],
  'Platypus': ['Egg-laying', 'Venomous', 'Monotreme'],
  'Crocodile': ['Reptile', 'Amphibious', 'Predator'],
  'Dolphin': ['Cetacean', 'Pod', 'Echolocation'],
  'Shark': ['Cartilage', 'Pelagic', 'Predator'],
  'Octopus': ['Mollusk', 'Cephalopod', 'Camouflage'],
  'Owl': ['Nocturnal', 'Raptor', 'Plumage'],
  'Flamingo': ['Wading', 'Colony', 'Carotenoids'],
  'Rhinoceros': ['Keratin', 'Herbivore', 'Horned'],
  'Sloth': ['Canopy', 'Folivore', 'Slow-moving'],
  'Red Fox': ['Vulpine', 'Nocturnal', 'Omnivore'],
  'Sea Turtle': ['Reptile', 'Pelagic', 'Carapace'],
  'Beaver': ['Rodent', 'Dam-builder', 'Semiaquatic'],
  'Otter': ['Semiaquatic', 'Dense Fur', 'Playful'],
  'Camel': ['Arid', 'Desert', 'Hump'],
  'Bat': ['Nocturnal', 'Echolocation', 'Mammal'],
  'Peacock': ['Plumage', 'Display', 'Courtship'],
  'Hedgehog': ['Quills', 'Nocturnal', 'Spines'],
  'Chimpanzee': ['Primate', 'Tool-user', 'Troop'],
  'Lemur': ['Madagascar', 'Arboreal', 'Troop'],
  'Walrus': ['Tusks', 'Blubber', 'Arctic'],
  'Meerkat': ['Mob', 'Burrow', 'Sentinel'],
  'Toucan': ['Canopy', 'Frugivore', 'Neotropical'],
};

updateFile('animals.ts', 'ANIMALS_CARDS', (cards) => {
  return cards.map((c) => {
    const refinedBuzz = animalBuzzMap[c.name] || c.buzzWords;
    // Ensure facts are clean, short values
    const refinedFactGrid = c.factGrid?.map((f) => ({
      ...f,
      value: f.value.length > 16 ? f.value.split('/')[0].trim() : f.value,
    })) as [any, any, any, any];
    return {
      ...c,
      buzzWords: refinedBuzz,
      factGrid: refinedFactGrid,
    };
  });
});

// 2. Refine Space: Replace giveaways with conceptual clues
const spaceBuzzMap: Record<string, [string, string, string]> = {
  'The Sun': ['Plasma', 'Solar', 'Fusion'],
  'The Moon': ['Tides', 'Crater', 'Satellite'],
  'Mars': ['Oxide', 'Terrestrial', 'Canyon'],
  'Saturn': ['Equatorial', 'Atmosphere', 'Gas Giant'],
  'Jupiter': ['Great Storm', 'Gas Giant', 'Galilean'],
  'Comet': ['Sublimation', 'Eccentric', 'Kuiper'],
  'Black Hole': ['Singularity', 'Event Horizon', 'Density'],
  'Milky Way Galaxy': ['Barred Spiral', 'Bulge', 'Stars'],
  'International Space Station': ['Microgravity', 'Orbit', 'Habitable'],
  'Hubble Space Telescope': ['Optical', 'Deep Field', 'Orbit'],
  'Venus': ['Atmosphere', 'Greenhouse', 'Terrestrial'],
  'Mercury': ['Sunbaked', 'Speedy Orbit', 'Cratered'],
  'Neptune': ['Ice Giant', 'Supersonic', 'Azure'],
  'Uranus': ['Axial Tilt', 'Cyan', 'Ice Giant'],
  'Pluto': ['Kuiper Belt', 'Nitrogen Ice', 'Dwarf Body'],
  'Asteroid Belt': ['Circumstellar', 'Ceres', 'Rocky'],
  'Supernova': ['Stellar Death', 'Nucleosynthesis', 'Shockwave'],
  'Andromeda Galaxy': ['Spiral', 'Local Group', 'Collision'],
  'Orion Nebula': ['Diffuse', 'Nursery', 'Ionized'],
  'James Webb Space Telescope': ['Infrared', 'Beryllium', 'L2 Point'],
  'Apollo 11 Lunar Module': ['Descent', 'Tranquility', 'Historic'],
  'Voyager 1': ['Interstellar', 'Golden Disc', 'Telemetry'],
  'Neutron Star (Pulsar)': ['Degenerate', 'Lighthouse', 'Magnetic'],
  'Total Solar Eclipse': ['Syzygy', 'Umbra', 'Corona'],
  'Blood Moon (Lunar Eclipse)': ['Atmospheric', 'Rayleigh', 'Umbra'],
  'Polaris (North Star)': ['Celestial', 'Axis', 'Navigation'],
  'Meteor Shower': ['Streams', 'Debris', 'Atmospheric'],
  'Aurora Borealis (Northern Lights)': ['Solar Wind', 'Magnetosphere', 'Emission'],
  'Titan (Moon of Saturn)': ['Hydrocarbon', 'Atmospheric', 'Cryogenic'],
  'Europa (Moon of Jupiter)': ['Subsurface', 'Astrobiology', 'Fractures'],
  'Ganymede': ['Magnetic', 'Galilean', 'Subsurface'],
  'Mars Rover Curiosity': ['Robotic', 'Gale Basin', 'Radioisotope'],
  'Spacewalk (EVA)': ['Extravehicular', 'Tether', 'Pressurized'],
  'Space Shuttle': ['Reusable', 'Orbiter', 'Glider'],
  'Astronaut': ['Altitude', 'Weightless', 'Expedition'],
  'Exoplanet': ['Transit', 'Goldilocks', 'Doppler'],
  'Event Horizon': ['Escape Velocity', 'Relativity', 'Dilation'],
  'Solar Flare': ['Reconnection', 'Magnetic', 'Corona'],
  'Light-Year': ['Cosmic Metric', 'Velocity', 'Distance'],
  'The Big Bang': ['Cosmology', 'Inflation', 'Primordial'],
};

updateFile('space.ts', 'SPACE_CARDS', (cards) => {
  return cards.map((c) => {
    const refinedBuzz = spaceBuzzMap[c.name] || c.buzzWords;
    // Clean up fact values so they fit in 1-2 words
    const refinedFactGrid = c.factGrid?.map((f) => ({
      ...f,
      value: f.value.length > 16 ? f.value.split('(')[0].trim() : f.value,
    })) as [any, any, any, any];
    return {
      ...c,
      buzzWords: refinedBuzz,
      factGrid: refinedFactGrid,
    };
  });
});

console.log('Finished refining all categories with tough, clever buzz-words and clean facts!');

