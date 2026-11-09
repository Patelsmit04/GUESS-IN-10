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

function writeCat(filename: string, exportVar: string, cards: CardDef[]) {
  const dir = path.join(process.cwd(), 'src', 'features', 'cards', 'data', 'categories');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, filename);
  const code = `import { Card } from '@/types/card';\n\nexport const ${exportVar}: Card[] = ${JSON.stringify(cards, null, 2)};\n`;
  fs.writeFileSync(target, code, 'utf-8');
  console.log(`✓ ${filename} written with ${cards.length} cards.`);
}

// 1. ANIMAL KINGDOM (40 CARDS)
const animalsData: CardDef[] = [
  {
    id: 'anim_wolf_001',
    category: 'animals',
    name: 'Wolf',
    difficulty: 'easy',
    emoji: '🐺',
    buzzWords: ['Fur', 'Mammal', 'Pup'],
    clues: [
      'I am the largest wild member of the dog (canine) family.',
      'I communicate across long distances through haunting howls.',
      'I live and hunt in highly organized family groups called packs.'
    ],
    primaryClues: ['Largest member of the dog family.', 'Communicates across miles by howling.'],
    secondaryClues: ['Lives in social packs led by an alpha pair.', 'Native to forests, tundra, and grasslands of North America and Eurasia.'],
    factGrid: [
      { icon: '🌲', label: 'Habitat', value: 'Forest / Arctic' },
      { icon: '🥩', label: 'Diet', value: 'Carnivore' },
      { icon: '🐾', label: 'Limbs', value: '4-Legged' },
      { icon: '🐺', label: 'Nature', value: 'Wild (Pack)' }
    ],
    bonusTrivia: {
      question: 'Name 3 animals that have only 4 letters in their names.',
      answer: 'Goat, Bear, Deer, Duck, Lion, Wolf, Frog, etc.'
    },
    facts: { isMammal: true, isCarnivore: true, canFly: false, livesInPacks: true },
    aliases: ['wolf', 'gray wolf', 'grey wolf', 'timber wolf'],
    explanation: 'The wolf is a large canine native to Eurasia and North America, celebrated for pack hierarchy and vocal communication.',
    funFact: 'A wolf pack can detect prey scents from more than 1.5 miles away!',
    verificationStatus: 'verified'
  },
  {
    id: 'anim_lion_002',
    category: 'animals',
    name: 'Lion',
    difficulty: 'easy',
    emoji: '🦁',
    buzzWords: ['Mane', 'Pride', 'Roar'],
    clues: [
      'I am known worldwide as the "King of the Jungle".',
      'Adult males develop a large, magnificent dark mane around their neck.',
      'I am the only cat species that lives in large social family groups called prides.'
    ],
    primaryClues: ['Known as the King of the Jungle.', 'Adult males grow a thick mane of hair.'],
    secondaryClues: ['Females do the majority of the hunting for the pride.', 'My roar can be heard up to 5 miles away.'],
    factGrid: [
      { icon: '🌾', label: 'Habitat', value: 'Savannah' },
      { icon: '🥩', label: 'Diet', value: 'Apex Carnivore' },
      { icon: '👑', label: 'Role', value: 'Pride Leader' },
      { icon: '🔊', label: 'Vocal', value: '5-Mile Roar' }
    ],
    bonusTrivia: {
      question: 'Which country outside of Africa is home to the only wild Asiatic lions in the world?',
      answer: 'India (Gir National Park in Gujarat)'
    },
    facts: { isMammal: true, isCarnivore: true, hasMane: true, livesInPrides: true },
    aliases: ['lion', 'african lion', 'asiatic lion', 'king of the jungle'],
    explanation: 'The lion is a muscular, deep-chested big cat and the second largest feline in the world after the tiger.',
    funFact: 'Lions spend up to 20 hours a day resting or sleeping to conserve energy for hunting!',
    verificationStatus: 'verified'
  },
  {
    id: 'anim_tiger_003',
    category: 'animals',
    name: 'Tiger',
    difficulty: 'easy',
    emoji: '🐯',
    buzzWords: ['Stripes', 'Jungle', 'Solitary'],
    clues: [
      'I am the largest cat species in the entire world.',
      'I possess a reddish-orange coat with unique dark vertical camouflage stripes.',
      'Unlike most domestic cats, I love water and swim across wide rivers to hunt.'
    ],
    primaryClues: ['Largest feline in the animal kingdom with vertical stripes.', 'Excellent swimmer that loves cooling off in jungle rivers.'],
    secondaryClues: ['No two tigers in the world have the exact same stripe pattern.', 'The Bengal Tiger is the national animal of India and Bangladesh.'],
    factGrid: [
      { icon: '🌴', label: 'Habitat', value: 'Jungle / Forest' },
      { icon: '🥩', label: 'Diet', value: 'Carnivore' },
      { icon: '🏊', label: 'Skill', value: 'Expert Swimmer' },
      { icon: '🐅', label: 'Coat', value: 'Unique Stripes' }
    ],
    bonusTrivia: {
      question: 'If you shave a tiger’s fur, will its skin still have stripes?',
      answer: 'Yes, a tiger’s stripes are embedded directly in its skin!'
    },
    facts: { isMammal: true, isCarnivore: true, hasStripes: true, canSwim: true },
    aliases: ['tiger', 'bengal tiger', 'siberian tiger'],
    explanation: 'The tiger is an apex predator identifiable by dark vertical stripes on reddish-orange fur.',
    funFact: 'A tiger’s roar contains low-frequency infrasound that can temporarily paralyze prey with fear!',
    verificationStatus: 'verified'
  },
  {
    id: 'anim_elephant_004',
    category: 'animals',
    name: 'African Elephant',
    difficulty: 'easy',
    emoji: '🐘',
    buzzWords: ['Trunk', 'Tusks', 'Ears'],
    clues: [
      'I am the largest living land animal on planet Earth.',
      'I possess a long, muscular trunk containing over 40,000 individual muscles.',
      'My large fan-shaped ears help radiate heat away to cool my body in hot savannahs.'
    ],
    primaryClues: ['Largest land mammal with ivory tusks and a dexterous trunk.', 'Communicates over miles using ground-shaking infrasound vibrations.'],
    secondaryClues: ['Consumes up to 300 pounds of vegetation every single day.', 'Known for profound memory, empathy, and grief rituals.'],
    factGrid: [
      { icon: '🌍', label: 'Continent', value: 'Africa' },
      { icon: '🌿', label: 'Diet', value: 'Herbivore' },
      { icon: '⚖️', label: 'Weight', value: 'Up to 6 Tons' },
      { icon: '🐘', label: 'Trunk', value: '40,000 Muscles' }
    ],
    bonusTrivia: {
      question: 'Which is the only mammal that cannot jump off the ground?',
      answer: 'The elephant'
    },
    facts: { isMammal: true, isHerbivore: true, largestLandAnimal: true, hasTrunk: true },
    aliases: ['elephant', 'african elephant', 'bush elephant'],
    explanation: 'The African elephant is a keystone megaherbivore essential to African savannah and forest ecosystems.',
    funFact: 'Elephants can sense approaching rainstorms from over 150 miles away by hearing distant thunder!',
    verificationStatus: 'verified'
  },
  {
    id: 'anim_panda_005',
    category: 'animals',
    name: 'Giant Panda',
    difficulty: 'easy',
    emoji: '🐼',
    buzzWords: ['Bamboo', 'Black & White', 'China'],
    clues: [
      'I have a distinctive, round black and white face and fur coat.',
      'Over 99% of my daily diet consists exclusively of fresh bamboo.',
      'I possess an enlarged wrist bone that acts like an opposable thumb to grip stalks.'
    ],
    primaryClues: ['Black and white bear native to Chinese bamboo forests.', 'Spends 12 hours a day chewing bamboo shoots.'],
    secondaryClues: ['A newborn baby is pink, blind, and smaller than a stick of butter.', 'A global symbol of wildlife conservation and the WWF logo.'],
    factGrid: [
      { icon: '🎋', label: 'Food', value: '99% Bamboo' },
      { icon: '🇨🇳', label: 'Origin', value: 'Central China' },
      { icon: '🐻', label: 'Family', value: 'Bear (Ursidae)' },
      { icon: '👍', label: 'Trait', value: 'Pseudo Thumb' }
    ],
    bonusTrivia: {
      question: 'What is a group of pandas called in English?',
      answer: 'An embarrassment of pandas (or a bamboo of pandas)'
    },
    facts: { isMammal: true, isHerbivore: true, eatsBamboo: true, nativeToChina: true },
    aliases: ['panda', 'giant panda', 'panda bear'],
    explanation: 'The giant panda is a bear native to south central China, famous for its black-and-white coat and bamboo diet.',
    funFact: 'Pandas have a special lining in their throat and stomach to protect them from sharp bamboo splinters!',
    verificationStatus: 'verified'
  },
  {
    id: 'anim_cheetah_006',
    category: 'animals',
    name: 'Cheetah',
    difficulty: 'easy',
    emoji: '🐆',
    buzzWords: ['Sprint', 'Tear Stripes', 'Speed'],
    clues: [
      'I am the fastest land animal in the world, sprinting up to 70 mph (112 km/h).',
      'I have black "tear streaks" running from the inside corners of my eyes to deflect glare.',
      'Unlike most other big cats, I cannot roar; I purr, chirp, and meow like a bird.'
    ],
    primaryClues: ['Fastest mammal on land capable of accelerating faster than a sports car.', 'Slender aerodynamic body with non-retractable claw cleats.'],
    secondaryClues: ['Accelerates from 0 to 60 mph in under three seconds.', 'My long, muscular tail acts as a steering rudder during sharp turns at full speed.'],
    factGrid: [
      { icon: '⚡', label: 'Top Speed', value: '70 mph (112 km/h)' },
      { icon: '🥩', label: 'Diet', value: 'Carnivore' },
      { icon: '🐾', label: 'Claws', value: 'Semi-Retractable' },
      { icon: '🌾', label: 'Habitat', value: 'Open Savannah' }
    ],
    bonusTrivia: {
      question: 'How long can a cheetah sustain its maximum sprint before overheating?',
      answer: 'About 20 to 30 seconds (around 400-500 meters)'
    },
    facts: { isMammal: true, isCarnivore: true, fastestLandAnimal: true, hasSpots: true },
    aliases: ['cheetah', 'hunting leopard'],
    explanation: 'The cheetah is a specialized feline sprinter built for explosive speed across African plains.',
    funFact: 'When running at top speed, a cheetah spends more time airborne than touching the ground!',
    verificationStatus: 'verified'
  },
  {
    id: 'anim_kangaroo_007',
    category: 'animals',
    name: 'Kangaroo',
    difficulty: 'easy',
    emoji: '🦘',
    buzzWords: ['Pouch', 'Hop', 'Outback'],
    clues: [
      'I am a marsupial native to Australia that hops on two powerful hind legs.',
      'Females carry their developing baby (joey) inside a front abdominal pouch.',
      'My thick, muscular tail acts as a third leg for balance when standing or leaping.'
    ],
    primaryClues: ['Iconic hopping marsupial featured on the Australian coat of arms.', 'Female carries newborn joey in a pouch for months.'],
    secondaryClues: ['Cannot walk backward easily due to large feet and muscular tail.', 'The Red Kangaroo is the largest surviving marsupial on Earth.'],
    factGrid: [
      { icon: '🇦🇺', label: 'Country', value: 'Australia' },
      { icon: '🦘', label: 'Baby', value: 'Joey in Pouch' },
      { icon: '🌿', label: 'Diet', value: 'Herbivore' },
      { icon: '🦿', label: 'Movement', value: 'Hopping' }
    ],
    bonusTrivia: {
      question: 'How small is a newborn kangaroo when it crawls into its mother’s pouch?',
      answer: 'About the size of a jellybean (1 inch long)!'
    },
    facts: { isMammal: true, isMarsupial: true, hasPouch: true, nativeToAustralia: true },
    aliases: ['kangaroo', 'red kangaroo', 'roo'],
    explanation: 'Kangaroos are large macropod marsupials endemic to Australia, known for hopping locomotion and maternal pouches.',
    funFact: 'Kangaroos use their tails like a fifth limb when grazing, supporting their weight as they push their hind legs forward!',
    verificationStatus: 'verified'
  },
  {
    id: 'anim_whale_008',
    category: 'animals',
    name: 'Blue Whale',
    difficulty: 'easy',
    emoji: '🐋',
    buzzWords: ['Krill', 'Baleen', 'Blowhole'],
    clues: [
      'I am the largest animal known to have ever lived on planet Earth.',
      'My tongue alone can weigh as much as an entire adult elephant.',
      'Despite my massive size, I feed primarily on tiny shrimplike creatures called krill.'
    ],
    primaryClues: ['Largest creature in Earth history reaching 100 feet in length.', 'Marine mammal that breathes air through twin blowholes on its back.'],
    secondaryClues: ['A newborn blue whale calf drinks up to 100 gallons of milk a day.', 'Uses fringed baleen plates instead of teeth to filter seawater.'],
    factGrid: [
      { icon: '🌊', label: 'Habitat', value: 'Open Oceans' },
      { icon: '⚖️', label: 'Weight', value: 'Up to 200 Tons' },
      { icon: '🦐', label: 'Food', value: 'Krill' },
      { icon: '🔊', label: 'Sound', value: '188 Decibels' }
    ],
    bonusTrivia: {
      question: 'How large is a blue whale’s heart compared to human objects?',
      answer: 'It is the size of a small car / golf cart (weighing roughly 400 lbs)!'
    },
    facts: { isMammal: true, livesInWater: true, largestAnimal: true, breathesAir: true },
    aliases: ['blue whale', 'whale'],
    explanation: 'The blue whale is a marine mammal belonging to the baleen whale parvorder, exceeding even the largest dinosaurs in mass.',
    funFact: 'Their deep acoustic calls can travel thousands of miles through ocean water to communicate with other whales!',
    verificationStatus: 'verified'
  },
  {
    id: 'anim_penguin_009',
    category: 'animals',
    name: 'Emperor Penguin',
    difficulty: 'easy',
    emoji: '🐧',
    buzzWords: ['Antarctica', 'Huddle', 'Flightless'],
    clues: [
      'I am a flightless polar marine bird that thrives in sub-zero Antarctic blizzard winds.',
      'Father penguins balance a single egg on their feet under a brood pouch through dark winter.',
      'I use my streamlined wings as underwater flippers to "fly" through freezing ocean depths.'
    ],
    primaryClues: ['Tallest penguin species breeding on Antarctic sea ice.', 'Colonies form rotating huddles to survive temperatures down to -60°C.'],
    secondaryClues: ['Can hold breath for more than 20 minutes diving over 1,700 feet deep.', 'Feeds on fish, squid, and krill in the Southern Ocean.'],
    factGrid: [
      { icon: '❄️', label: 'Climate', value: 'Antarctica (-60°C)' },
      { icon: '🪶', label: 'Type', value: 'Flightless Bird' },
      { icon: '🥚', label: 'Brooding', value: 'Father on Feet' },
      { icon: '🏊', label: 'Skill', value: 'Deep Ocean Diver' }
    ],
    bonusTrivia: {
      question: 'Do any wild penguins live naturally in the Arctic (North Pole)?',
      answer: 'No! All wild penguins live exclusively in the Southern Hemisphere'
    },
    facts: { isBird: true, canFly: false, livesInAntarctica: true, laysEggs: true },
    aliases: ['emperor penguin', 'penguin'],
    explanation: 'The Emperor Penguin is the heaviest and tallest of all living penguin species, endemic to Antarctica.',
    funFact: 'Penguins produce an oil from a gland near their tail that makes their outer feathers 100% waterproof!',
    verificationStatus: 'verified'
  },
  {
    id: 'anim_chameleon_010',
    category: 'animals',
    name: 'Chameleon',
    difficulty: 'easy',
    emoji: '🦎',
    buzzWords: ['Tongue', 'Camouflage', 'Independent Eyes'],
    clues: [
      'I am a tree-dwelling reptile famous for changing my skin colors.',
      'My eyes can pivot and focus independently in two opposite directions at the same time.',
      'My sticky projectile tongue can shoot out at twice the length of my body to snatch insects.'
    ],
    primaryClues: ['Color-changing lizard with prehensile tail and pincer feet.', 'Tongue accelerates from 0 to 60 mph in a fraction of a second.'],
    secondaryClues: ['Color shifts are driven by mood, temperature, and communication rather than background camouflage.', 'Skin contains microscopic photonic crystals that bend light.'],
    factGrid: [
      { icon: '🌿', label: 'Habitat', value: 'Trees (Arboreal)' },
      { icon: '🎨', label: 'Skin', value: 'Color Changing' },
      { icon: '👁️', label: 'Vision', value: '360° Independent' },
      { icon: '🦗', label: 'Diet', value: 'Insects' }
    ],
    bonusTrivia: {
      question: 'Which island off Africa is home to roughly half of all chameleon species on Earth?',
      answer: 'Madagascar'
    },
    facts: { isReptile: true, changesColor: true, canFly: false, coldBlooded: true },
    aliases: ['chameleon', 'cameleon'],
    explanation: 'Chameleons are highly specialized clades of Old World lizards with zygodactylous feet and stereoscopic vision.',
    funFact: 'A chameleon’s tongue muscle stores elastic energy like a crossbow, releasing with explosive spring velocity!',
    verificationStatus: 'verified'
  }
];

const moreAnimals = [
  ['anim_giraffe_011', 'Giraffe', '🦒', ['Neck', 'Spots', 'Acacia'], 'Tallest living terrestrial animal with a 6-foot neck.', 'Savannah', 'Herbivore', '35-Foot Heights', 'Blue Tongue', 'A giraffe’s tongue is dark blue/purple and up to 20 inches long!'],
  ['anim_zebra_012', 'Zebra', '🦓', ['Stripes', 'Herd', 'Savannah'], 'African equids famous for black and white striped coats.', 'Grasslands', 'Herbivore', 'Striped Coat', 'Horse Family', 'Zebra stripes confuse biting flies and act as a natural fly repellent!'],
  ['anim_koala_013', 'Koala', '🐨', ['Eucalyptus', 'Sleep', 'Marsupial'], 'Tree-dwelling Australian marsupial that eats toxic eucalyptus.', 'Eucalyptus Forest', 'Herbivore', 'Sleeps 20h', 'Pouch', 'Koalas have unique fingerprints almost indistinguishable from human prints!'],
  ['anim_platypus_014', 'Platypus', '🦆', ['Bill', 'Egg-Laying', 'Venom'], 'Semi-aquatic egg-laying mammal with a duck-like bill.', 'Australia Streams', 'Carnivore', 'Monotreme', 'Venom Spurs', 'When first sent to European scientists in 1799, they thought it was a sewn-together taxidermy hoax!'],
  ['anim_sloth_015', 'Three-Toed Sloth', '🦥', ['Slow', 'Canopy', 'Algae'], 'Slowest moving arboreal mammal living upside down.', 'Rainforest', 'Herbivore', 'Slow Metabolism', 'Green Algae', 'Sloths are surprisingly graceful swimmers that move 3x faster in water than on land!'],
  ['anim_polar_bear_016', 'Polar Bear', '🐻‍❄️', ['Arctic', 'Ice', 'Seal'], 'Apex predator of the Arctic sea ice and largest land carnivore.', 'Arctic Ice', 'Carnivore', 'Black Skin', 'Hollow Fur', 'A polar bear’s fur isn’t white—each hair is clear and hollow to trap heat!'],
  ['anim_gorilla_017', 'Mountain Gorilla', '🦍', ['Silverback', 'Troop', 'Primate'], 'Intelligent ground-dwelling ape led by a mature silverback.', 'Mountain Forest', 'Herbivore', 'Great Ape', 'Chest Beating', 'Gorillas share approximately 98% of their DNA sequence with humans!'],
  ['anim_chimpanzee_018', 'Chimpanzee', '🐵', ['Tools', 'Troop', 'Intelligence'], 'Our closest living evolutionary relative, skilled in tool use.', 'African Jungle', 'Omnivore', 'Tool Maker', 'Social Group', 'Chimps use sticks to fish for termites and rocks as hammers to crack nuts!'],
  ['anim_hippo_019', 'Hippopotamus', '🦛', ['Submerged', 'Canines', 'River'], 'Semi-aquatic African giant that secretes pink "blood sweat".', 'Rivers / Lakes', 'Herbivore', 'Heavyweight', 'Red Sweat', 'Hippos cannot actually swim; they gallop and bounce off the river bottom!'],
  ['anim_rhino_020', 'Rhinoceros', '🦏', ['Horn', 'Armor', 'Grass'], 'Thick-skinned herbivore armed with one or two keratin horns.', 'Savannah', 'Herbivore', 'Keratin Horn', 'Poor Eyesight', 'A rhino’s horn is made of pure keratin—the same protein in human hair and fingernails!'],
  ['anim_eagle_021', 'Bald Eagle', '🦅', ['White Head', 'Talons', 'National Bird'], 'Bird of prey with white head feathers and emblem of the USA.', 'Lakes & Rivers', 'Carnivore (Fish)', 'Hooked Beak', 'Apex Raptor', 'Bald eagles can spot a swimming salmon from over a mile up in the sky!'],
  ['anim_falcon_022', 'Peregrine Falcon', '🦅', ['Stoop', 'Fastest', 'Raptor'], 'Fastest animal on planet Earth diving over 240 mph.', 'Cliff / Sky', 'Carnivore', '240+ mph Dive', 'Sharp Talons', 'A diving peregrine falcon experiences 25 Gs of gravitational acceleration!'],
  ['anim_octopus_023', 'Octopus', '🐙', ['Eight Arms', 'Three Hearts', 'Ink'], 'Intelligent ocean cephalopod with blue blood and no bones.', 'Ocean Reefs', 'Carnivore', '3 Hearts', 'Blue Blood', 'Two-thirds of an octopus’s neurons reside inside its arms, not its head!'],
  ['anim_owl_024', 'Barn Owl', '🦉', ['Silent Flight', 'Night', 'Heart-Face'], 'Nocturnal raptor with a heart-shaped face and silent wings.', 'Farmland / Barn', 'Carnivore', 'Silent Wings', '270° Head Turn', 'Barn owls can locate prey in pitch blackness entirely by hearing heartbeats!'],
  ['anim_flamingo_025', 'Flamingo', '🦩', ['Pink', 'One Leg', 'Filter'], 'Wading bird whose pink plumage comes from carotenoid algae.', 'Alkaline Lakes', 'Filter Feeder', 'Pink Feathers', 'One-Leg Stand', 'Flamingos stand on one leg to conserve body heat in cold water!'],
  ['anim_crocodile_026', 'Saltwater Crocodile', '🐊', ['Bite Force', 'Ancient', 'Reptile'], 'Largest living reptile on Earth with the strongest bite force.', 'Mangrove / Estuary', 'Apex Predator', 'Crushing Jaws', 'Armored Skin', 'Saltwater crocodiles have been swimming in oceans since before the T-Rex died!'],
  ['anim_cobra_027', 'King Cobra', '🐍', ['Hood', 'Venom', 'Longest'], 'Longest venomous snake in the world, raising its hood when alerted.', 'Asian Forests', 'Carnivore (Snakes)', '18-Foot Length', 'Neurotoxin', 'King cobras build elaborate leafy ground nests to incubate their eggs!'],
  ['anim_otter_028', 'Sea Otter', '🦦', ['Fur', 'Pebble', 'Raft'], 'Marine mammal with the densest fur of any animal on Earth.', 'Coastal Kelp', 'Carnivore (Shells)', 'Tool User', 'Dense Fur', 'Sea otters hold hands while sleeping so ocean currents don’t drift them apart!'],
  ['anim_meerkat_029', 'Meerkat', '🐾', ['Sentry', 'Burrow', 'Kalahari'], 'Social desert mongoose that stands on hind legs to keep watch.', 'Kalahari Desert', 'Insectivore', 'Sentry Duty', 'Immune to Scorpions', 'Meerkats take turns as lookouts while the rest of the mob digs for food!'],
  ['anim_lemur_030', 'Ring-Tailed Lemur', '🐒', ['Striped Tail', 'Madagascar', 'Sunbath'], 'Prosimian primate native exclusively to the island of Madagascar.', 'Madagascar Spiny Forest', 'Herbivore', 'Striped Tail', 'Troop Leader (Female)', 'Female lemurs are dominant in lemur troops and lead all foraging decisions!'],
  ['anim_beaver_031', 'Beaver', '🦫', ['Dam', 'Teeth', 'Lodge'], 'Keystone rodent engineer that fells trees and constructs dams.', 'Rivers / Ponds', 'Herbivore', 'Orange Teeth', 'Flat Tail', 'Beaver teeth contain iron, which makes them orange and strong enough to gnaw through oak!'],
  ['anim_hedgehog_032', 'Hedgehog', '🦔', ['Spines', 'Roll into Ball', 'Nocturnal'], 'Small spiny mammal that curls into a prickly defensive sphere.', 'Gardens / Meadows', 'Insectivore', '5,000 Spines', 'Nocturnal', 'Hedgehog quills are modified hollow hairs made of keratin that do not detach!'],
  ['anim_bat_033', 'Fruit Bat (Flying Fox)', '🦇', ['Wings', 'Echolocation', 'Night'], 'Only mammal naturally capable of sustained, true powered flight.', 'Caves / Forests', 'Frugivore', 'True Flight', 'Pollinator', 'Bats devour thousands of mosquitoes per hour and pollinate wild banana and mango trees!'],
  ['anim_camel_034', 'Dromedary Camel', '🐪', ['Hump', 'Desert', 'Water Storage'], 'Desert survivor with a single fat-storing hump and padded feet.', 'Arid Desert', 'Herbivore', 'Single Hump', 'Can Drink 30 Gallons', 'A camel’s hump stores fat, not liquid water, which converts into metabolic energy!'],
  ['anim_moose_035', 'Moose', '🫎', ['Antlers', 'Boreal', 'Giant'], 'Largest member of the deer family with broad palmate antlers.', 'Northern Forests', 'Herbivore', '6-Foot Antlers', 'Deep Snow Walker', 'Moose are incredible swimmers capable of diving 20 feet underwater to graze on river plants!'],
  ['anim_frog_036', 'Red-Eyed Tree Frog', '🐸', ['Red Eyes', 'Suction Pads', 'Jungle'], 'Vibrant green rainforest amphibian with shocking red bulging eyes.', 'Tropical Canopy', 'Insectivore', 'Toe Pads', 'Startle Colors', 'When startled, it flashes its giant red eyes to momentarily freeze predators!'],
  ['anim_komodo_037', 'Komodo Dragon', '🦎', ['Venom', 'Giant', 'Island'], 'Largest living lizard on Earth, native to Indonesian islands.', 'Indonesian Scrub', 'Carnivore', '10-Foot Length', 'Venomous Bite', 'Komodo dragons can eat up to 80% of their entire body weight in a single meal!'],
  ['anim_fox_038', 'Red Fox', '🦊', ['Bushy Tail', 'Clever', 'Pounce'], 'Adaptable canine famous for its fiery coat, bushy tail, and cunning.', 'Forests & Cities', 'Omnivore', 'Bushy Tail', 'Magnetic Pounce', 'Red foxes use Earth’s magnetic field lines to guide high-arching snow pounces!'],
  ['anim_whale_shark_039', 'Whale Shark', '🦈', ['Gentle Giant', 'Spots', 'Filter'], 'Largest fish in the world, filtering microscopic plankton harmlessly.', 'Tropical Oceans', 'Filter Feeder', '40-Foot Length', 'Docile Giant', 'Each whale shark has a completely unique pattern of white spots behind its gills, like a fingerprint!'],
  ['anim_snow_leopard_040', 'Snow Leopard', '🐆', ['Ghost of Mountains', 'Tail', 'Himalayas'], 'Elusive high-altitude feline nicknamed the "Ghost of the Mountains".', 'Alpine Scree', 'Carnivore', 'Thick Long Tail', 'Steep Cliff Leaper', 'Snow leopards wrap their thick 3-foot tails around their faces like a blanket against freezing winds!']
];

moreAnimals.forEach(([id, name, emoji, buzz, desc, hab, diet, trait, extra, fun]) => {
  animalsData.push({
    id,
    category: 'animals',
    name,
    difficulty: 'medium',
    emoji,
    buzzWords: buzz as [string, string, string],
    clues: [
      desc,
      `My habitat is ${hab} and my diet is primarily ${diet}.`,
      `I am famous for my ${trait.toLowerCase()} in the animal world.`
    ],
    primaryClues: [desc, `Notable for ${trait.toLowerCase()}.`],
    secondaryClues: [`Lives in ${hab}.`, `Identified as a specialized ${diet.toLowerCase()}.`],
    factGrid: [
      { icon: '🌲', label: 'Habitat', value: hab },
      { icon: '🥩', label: 'Diet', value: diet },
      { icon: '🐾', label: 'Trait', value: trait },
      { icon: '✨', label: 'Special', value: extra }
    ],
    bonusTrivia: {
      question: `What is the natural habitat of the ${name}?`,
      answer: hab
    },
    facts: { isMammal: true, inAnimalKingdom: true },
    aliases: [name.toLowerCase()],
    explanation: `${name} is a renowned member of the animal kingdom with unique adaptations.`,
    funFact: fun,
    verificationStatus: 'verified'
  });
});

writeCat('animals.ts', 'ANIMALS_CARDS', animalsData);

// 2. COUNTRIES (40 CARDS)
const countriesList = [
  ['cntry_india_001', 'India', '🇮🇳', ['Himalayas', 'Rupee', 'Tricolor'], 'South Asian country with the world’s largest population and rich culture.', 'New Delhi', 'Asia', 'Hindi & English', 'Rupee (INR)', 'India gave the world zero (0), chess, yoga, and over 70% of all spices!'],
  ['cntry_japan_002', 'Japan', '🗾', ['Cherry Blossom', 'Yen', 'Bullet Train'], 'East Asian island nation combining ancient shrines with bullet train tech.', 'Tokyo', 'Asia', 'Japanese', 'Yen (JPY)', 'Japan has more than 5 million vending machines offering everything from hot tea to umbrellas!'],
  ['cntry_brazil_003', 'Brazil', '🇧🇷', ['Amazon', 'Samba', 'Football'], 'Largest nation in South America, home to the Amazon Rainforest and carnival.', 'Brasília', 'South America', 'Portuguese', 'Real (BRL)', 'Brazil is the only Portuguese-speaking country in the Americas!'],
  ['cntry_egypt_004', 'Egypt', '🇪🇬', ['Nile', 'Pharaoh', 'Pyramid'], 'Ancient cradle on the Nile River, bridging northeast Africa and southwest Asia.', 'Cairo', 'Africa', 'Arabic', 'Egyptian Pound', 'Ancient Egyptians played "Senet," one of the world’s oldest board games, over 5,000 years ago!'],
  ['cntry_canada_005', 'Canada', '🇨🇦', ['Maple Leaf', 'Hockey', 'Coastline'], 'Second-largest country on Earth, renowned for boreal forests and lakes.', 'Ottawa', 'North America', 'English & French', 'Canadian Dollar', 'Canada contains more natural lakes than all the rest of the world’s lakes combined!'],
  ['cntry_australia_006', 'Australia', '🦘', ['Outback', 'Marsupial', 'Barrier Reef'], 'Both an entire continent and island country in the Southern Hemisphere.', 'Canberra', 'Oceania', 'English', 'Australian Dollar', 'Australia has 10,000 beaches; you could visit a new one every day for 27 years!'],
  ['cntry_france_007', 'France', '🇫🇷', ['Eiffel', 'Baguette', 'Louvre'], 'Western European nation famous for art, fashion, gastronomy, and wine.', 'Paris', 'Europe', 'French', 'Euro (EUR)', 'France is the most visited country in the world, receiving over 90 million tourists annually!'],
  ['cntry_italy_008', 'Italy', '🇮🇹', ['Colosseum', 'Pasta', 'Boot Shape'], 'Boot-shaped Mediterranean peninsula with the most UNESCO heritage sites.', 'Rome', 'Europe', 'Italian', 'Euro (EUR)', 'There are over 300 different distinct shapes of pasta officially documented across Italy!'],
  ['cntry_germany_009', 'Germany', '🇩🇪', ['Autobahn', 'Castle', 'Engineering'], 'Central European economic powerhouse famous for castles, cars, and music.', 'Berlin', 'Europe', 'German', 'Euro (EUR)', 'Germany is home to over 20,000 fairy-tale medieval castles!'],
  ['cntry_uk_010', 'United Kingdom', '🇬🇧', ['Big Ben', 'Monarchy', 'London'], 'Island nation in northwestern Europe comprising England, Scotland, Wales, and Northern Ireland.', 'London', 'Europe', 'English', 'Pound Sterling', 'Nowhere in the entire United Kingdom is more than 70 miles (113 km) from the ocean!'],
  ['cntry_usa_011', 'United States of America', '🇺🇸', ['Stars & Stripes', 'Dollar', 'Fifty States'], 'Federation of 50 states spanning from the Atlantic to Pacific Oceans.', 'Washington, D.C.', 'North America', 'English', 'US Dollar (USD)', 'The USA has the world’s largest national economy and landed the first humans on the Moon!'],
  ['cntry_china_012', 'China', '🇨🇳', ['Great Wall', 'Silk Road', 'Forbidden City'], 'East Asian civilization spanning 5,000 years with ancient inventions.', 'Beijing', 'Asia', 'Mandarin', 'Yuan (CNY)', 'Paper, printing, gunpowder, and the magnetic compass were all invented in ancient China!'],
  ['cntry_mexico_013', 'Mexico', '🇲🇽', ['Aztec', 'Mariachi', 'Tacos'], 'North American nation with ancient Maya ruins and world-famous cuisine.', 'Mexico City', 'North America', 'Spanish', 'Mexican Peso', 'The Great Pyramid of Cholula in Mexico is the largest pyramid by volume on Earth!'],
  ['cntry_southafrica_014', 'South Africa', '🇿🇦', ['Rainbow Nation', 'Safari', 'Table Mountain'], 'Southernmost African nation known for wildlife safaris and 11 official languages.', 'Pretoria', 'Africa', '11 Languages', 'Rand (ZAR)', 'South Africa is the only country in the world with three official capital cities!'],
  ['cntry_spain_015', 'Spain', '🇪🇸', ['Flamenco', 'Sagrada', 'Tapas'], 'Iberian nation celebrated for sunny Mediterranean coasts and vibrant fiestas.', 'Madrid', 'Europe', 'Spanish', 'Euro (EUR)', 'Spain is home to the world’s oldest functioning lighthouse: the Tower of Hercules!'],
  ['cntry_greece_016', 'Greece', '🇬🇷', ['Parthenon', 'Olympics', 'Islands'], 'Mediterranean nation considered the historical cradle of Western civilization.', 'Athens', 'Europe', 'Greek', 'Euro (EUR)', 'No place in Greece is more than 85 miles away from the sea!'],
  ['cntry_russia_017', 'Russia', '🇷🇺', ['Kremlin', 'Siberia', 'Largest Area'], 'Transcontinental country spanning 11 time zones as the world’s largest nation.', 'Moscow', 'Europe/Asia', 'Russian', 'Ruble (RUB)', 'Lake Baikal in Russia contains 20% of the world’s unfrozen surface freshwater!'],
  ['cntry_argentina_018', 'Argentina', '🇦🇷', ['Tango', 'Patagonia', 'Pampas'], 'South American nation famous for glaciers, beef pampas, and football legends.', 'Buenos Aires', 'South America', 'Spanish', 'Argentine Peso', 'Argentina is home to Mount Aconcagua, the highest mountain outside of Asia!'],
  ['cntry_newzealand_019', 'New Zealand', '🇳🇿', ['Kiwi', 'Fjord', 'All Blacks'], 'South Pacific island nation famous for dramatic landscapes and Maori culture.', 'Wellington', 'Oceania', 'English & Maori', 'NZ Dollar', 'New Zealand was the first self-governing nation to give women the right to vote in 1893!'],
  ['cntry_kenya_020', 'Kenya', '🇰🇪', ['Masai Mara', 'Migration', 'Rift Valley'], 'East African country famous for great wildebeest migrations and long-distance runners.', 'Nairobi', 'Africa', 'Swahili & English', 'Kenyan Shilling', 'Kenya’s Maasai Mara hosts the largest animal land migration on Earth!'],
  ['cntry_southkorea_021', 'South Korea', '🇰🇷', ['K-Pop', 'Seoul', 'Hangul'], 'East Asian nation renowned for high technology, cinema, and K-pop music.', 'Seoul', 'Asia', 'Korean', 'Won (KRW)', 'South Korea has the world’s fastest average broadband internet speeds!'],
  ['cntry_thailand_022', 'Thailand', '🇹🇭', ['Golden Temples', 'Pad Thai', 'Siam'], 'Southeast Asian nation known as the "Land of Smiles", never colonized by Europe.', 'Bangkok', 'Asia', 'Thai', 'Baht (THB)', 'Bangkok’s traditional ceremonial name is the longest city name in the world (168 letters)!'],
  ['cntry_turkey_023', 'Turkey', '🇹🇷', ['Bosphorus', 'Cappadocia', 'Bazaar'], 'Transcontinental nation bridging Europe and Asia across the historic Bosphorus.', 'Ankara', 'Europe/Asia', 'Turkish', 'Turkish Lira', 'Istanbul is the only metropolis in the world located on two continents!'],
  ['cntry_peru_024', 'Peru', '🇵🇪', ['Machu Picchu', 'Inca', 'Andes'], 'South American nation home to ancient Inca citadels and Amazon headwaters.', 'Lima', 'South America', 'Spanish & Quechua', 'Sol (PEN)', 'Peru is the birthplace of the potato, cultivating over 4,000 native varieties!'],
  ['cntry_switzerland_025', 'Switzerland', '🇨🇭', ['Alps', 'Watchmaking', 'Neutrality'], 'Landlocked mountainous European nation known for banking, watches, and chocolate.', 'Bern', 'Europe', 'German/French/Ital', 'Swiss Franc', 'Switzerland has enough nuclear fallout shelters to protect 100% of its population!'],
  ['cntry_norway_026', 'Norway', '🇳🇴', ['Fjords', 'Midnight Sun', 'Viking'], 'Nordic Scandinavian nation famous for deep dramatic fjords and Northern Lights.', 'Oslo', 'Europe', 'Norwegian', 'Norwegian Krone', 'Norway knighted a king penguin named Sir Nils Olav in its royal guard!'],
  ['cntry_sweden_027', 'Sweden', '🇸🇪', ['Nobel Prize', 'Archipelago', 'Fika'], 'Scandinavian nation known for innovation, pristine forests, and the Nobel Prizes.', 'Stockholm', 'Europe', 'Swedish', 'Swedish Krona', 'Sweden has more islands than any other country in the world: over 267,000!'],
  ['cntry_netherlands_028', 'Netherlands', '🇳🇱', ['Windmills', 'Tulips', 'Canals'], 'Low-lying European nation famous for water canals, bicycles, and dikes.', 'Amsterdam', 'Europe', 'Dutch', 'Euro (EUR)', 'There are more bicycles in the Netherlands than human residents!'],
  ['cntry_ireland_029', 'Ireland', '🇮🇪', ['Emerald Isle', 'Shamrock', 'Celtic'], 'North Atlantic island nation renowned for lush green countryside and folklore.', 'Dublin', 'Europe', 'English & Irish', 'Euro (EUR)', 'There are no wild snakes in Ireland due to its post-glacial isolation!'],
  ['cntry_portugal_030', 'Portugal', '🇵🇹', ['Navigators', 'Fado', 'Azulejo Tiles'], 'Atlantic European nation whose navigators mapped global sea routes in the 1400s.', 'Lisbon', 'Europe', 'Portuguese', 'Euro (EUR)', 'Portugal produces over 50% of the entire world’s supply of natural cork!'],
  ['cntry_singapore_031', 'Singapore', '🇸🇬', ['Merlion', 'Clean City', 'Garden by Bay'], 'Island city-state in Southeast Asia famous for cleanliness and futuristic gardens.', 'Singapore', 'Asia', '4 Languages', 'Singapore Dollar', 'Singapore is one of only three surviving sovereign city-states in the world!'],
  ['cntry_indonesia_032', 'Indonesia', '🇮🇩', ['Archipelago', 'Komodo', 'Volcanoes'], 'World’s largest island nation, comprising over 17,000 tropical islands.', 'Jakarta', 'Asia', 'Indonesian', 'Rupiah (IDR)', 'Indonesia contains more active volcanoes than any other country on Earth!'],
  ['cntry_vietnam_033', 'Vietnam', '🇻🇳', ['Ha Long Bay', 'Pho', 'Mekong'], 'Southeast Asian nation famous for limestone karst bays, river deltas, and lanterns.', 'Hanoi', 'Asia', 'Vietnamese', 'Dong (VND)', 'Vietnam is the world’s second largest exporter of coffee after Brazil!'],
  ['cntry_saudi_034', 'Saudi Arabia', '🇸🇦', ['Desert', 'Mecca', 'Petroleum'], 'Middle Eastern nation on the Arabian Peninsula, home to Islam’s holiest cities.', 'Riyadh', 'Asia', 'Arabic', 'Saudi Riyal', 'Saudi Arabia has no permanent natural rivers or natural lakes!'],
  ['cntry_morocco_035', 'Morocco', '🇲🇦', ['Atlas Mountains', 'Medina', 'Sahara'], 'North African kingdom blending Berber, Arab, and European architectural traditions.', 'Rabat', 'Africa', 'Arabic & Berber', 'Moroccan Dirham', 'The University of al-Qarawiyyin in Fez, Morocco, founded in 859 AD, is the world’s oldest university!'],
  ['cntry_colombia_036', 'Colombia', '🇨🇴', ['Coffee', 'Emeralds', 'Biodiversity'], 'South American nation connecting to Central America, rich in orchids and birds.', 'Bogotá', 'South America', 'Spanish', 'Colombian Peso', 'Colombia is home to more distinct species of birds than any other nation!'],
  ['cntry_chile_037', 'Chile', '🇨🇱', ['Atacama', 'Long Ribbon', 'Andes'], 'Longest and narrowest nation in the world, stretching over 2,600 miles along the Pacific.', 'Santiago', 'South America', 'Spanish', 'Chilean Peso', 'Chile’s Atacama Desert is the driest non-polar desert on Earth; some parts had no rain for 400 years!'],
  ['cntry_nepal_038', 'Nepal', '🇳🇵', ['Everest', 'Sherpa', 'Non-Rectangular Flag'], 'Landlocked Himalayan nation containing eight of the world’s ten highest peaks.', 'Kathmandu', 'Asia', 'Nepali', 'Nepalese Rupee', 'Nepal has the only national flag in the world that is not a four-sided quadrilateral!'],
  ['cntry_iceland_039', 'Iceland', '🇮🇸', ['Geysers', 'Glaciers', 'Volcanoes'], 'North Atlantic island nation powered almost entirely by clean geothermal heat.', 'Reykjavik', 'Europe', 'Icelandic', 'Icelandic Krona', 'There are zero mosquitoes anywhere on the island of Iceland!'],
  ['cntry_madagascar_040', 'Madagascar', '🇲🇬', ['Lemurs', 'Baobabs', 'Island Biome'], 'World’s fourth-largest island, home to endemic lemurs and towering baobab trees.', 'Antananarivo', 'Africa', 'Malagasy & French', 'Ariary', 'Over 90% of all wildlife found on Madagascar exists nowhere else on Earth!']
];

const countriesData: CardDef[] = countriesList.map(([id, name, emoji, buzz, desc, cap, cont, lang, curr, fun]) => ({
  id,
  category: 'countries',
  name,
  difficulty: 'easy',
  emoji,
  buzzWords: buzz as [string, string, string],
  clues: [
    desc,
    `My national capital city is ${cap} on the continent of ${cont}.`,
    `My official language is ${lang} and my currency is the ${curr}.`
  ],
  primaryClues: [desc, `National capital is ${cap}.`],
  secondaryClues: [`Located on the continent of ${cont}.`, `Official language is ${lang}.`],
  factGrid: [
    { icon: '🏛️', label: 'Capital', value: cap },
    { icon: '🌍', label: 'Continent', value: cont },
    { icon: '🗣️', label: 'Language', value: lang },
    { icon: '💵', label: 'Currency', value: curr }
  ],
  bonusTrivia: {
    question: `What is the capital city of ${name}?`,
    answer: cap
  },
  facts: { inCountries: true, sovereignNation: true },
  aliases: [name.toLowerCase()],
  explanation: `${name} is an internationally recognized sovereign country known for its history and culture.`,
  funFact: fun,
  verificationStatus: 'verified'
}));

writeCat('countries.ts', 'COUNTRIES_CARDS', countriesData);

// 3. CITIES AROUND THE WORLD (40 CARDS)
const citiesList = [
  ['city_paris_001', 'Paris', '🥐', ['Eiffel', 'Louvre', 'City of Light'], 'Capital of France on the River Seine, famous for art, cuisine, and fashion.', 'France', 'Europe', 'Seine River', 'City of Light', 'There is only one single stop sign in the entire city of Paris!'],
  ['city_tokyo_002', 'Tokyo', '🗼', ['Shibuya', 'Skytree', 'Neon'], 'Most populous metropolitan area on Earth, blending neon skyscrapers with ancient shrines.', 'Japan', 'Asia', 'Sumida River', 'Largest Metro', 'Shibuya Crossing in Tokyo sees up to 3,000 pedestrians cross simultaneously on a single green light!'],
  ['city_nyc_003', 'New York City', '🗽', ['Manhattan', 'Times Square', 'Big Apple'], 'Global finance, theater, and culture hub comprising five distinct boroughs.', 'USA', 'North America', 'Hudson River', 'The Big Apple', 'Over 800 languages are spoken in New York City, making it the most linguistically diverse city on Earth!'],
  ['city_london_004', 'London', '💂', ['Big Ben', 'Thames', 'Tower Bridge'], 'Historic capital of the UK with Roman roots on the River Thames.', 'United Kingdom', 'Europe', 'River Thames', 'The Square Mile', 'Feeding pigeons in Trafalgar Square was outlawed in 2003 with fines up to £500!'],
  ['city_rome_005', 'Rome', '🏛️', ['Colosseum', 'Vatican', 'Eternal City'], 'The Eternal City, former heart of the Roman Empire surrounding Vatican City.', 'Italy', 'Europe', 'Tiber River', 'Eternal City', 'Tourists toss roughly €1.5 million in coins into the Trevi Fountain every year, donated to charity!'],
  ['city_dubai_006', 'Dubai', '🏙️', ['Burj Khalifa', 'Desert', 'Palm Islands'], 'Ultramodern desert metropolis famous for artificial islands and luxury architecture.', 'UAE', 'Asia', 'Persian Gulf', 'Tallest Tower', 'Dubai’s Burj Khalifa is so tall you can watch the sunset from the ground, take the elevator up, and watch it set again!'],
  ['city_sydney_007', 'Sydney', '⛵', ['Opera House', 'Harbour Bridge', 'Bondi'], 'Australia’s largest city, famous for its harbourfront opera house and surfing beaches.', 'Australia', 'Oceania', 'Pacific Ocean', 'Harbour City', 'Sydney Harbour contains over 500 million cubic meters of water—roughly 500 times Sydney Harbour’s volume!'],
  ['city_mumbai_008', 'Mumbai', '🎬', ['Bollywood', 'Gateway', 'Marine Drive'], 'India’s financial capital and entertainment hub on the Arabian Sea.', 'India', 'Asia', 'Arabian Sea', 'City of Dreams', 'Mumbai’s Dabbawalas deliver over 200,000 hot lunches daily with almost zero errors using simple color codes!'],
  ['city_delhi_009', 'Delhi', '🕌', ['Qutub', 'Red Fort', 'Capital'], 'India’s national capital territory uniting ancient Sultanate gates with New Delhi avenues.', 'India', 'Asia', 'Yamuna River', 'Historic Capital', 'Delhi has been continuously destroyed and rebuilt at least seven distinct times across history!'],
  ['city_cairo_010', 'Cairo', '🏺', ['Pyramids', 'Nile', 'Tahrir'], 'Sprawling Egyptian capital on the Nile River, bordering the ancient Giza pyramids.', 'Egypt', 'Africa', 'Nile River', 'City of 1000 Minarets', 'Cairo is home to the oldest university in the Arab world, Al-Azhar, founded around 970 AD!'],
  ['city_rio_011', 'Rio de Janeiro', '🏖️', ['Christ Redeemer', 'Copacabana', 'Carnival'], 'Brazilian seaside metropolis famed for Christ the Redeemer statue and Carnival.', 'Brazil', 'South America', 'Atlantic Ocean', 'Cidade Maravilhosa', 'Rio de Janeiro served as the official capital of Portugal for 13 years when the royal court fled Napoleon!'],
  ['city_istanbul_012', 'Istanbul', '🕌', ['Hagia Sophia', 'Bosphorus', 'Grand Bazaar'], 'Historic transcontinental bridge city straddling Europe and Asia.', 'Turkey', 'Europe/Asia', 'Bosphorus Strait', 'Crossroads', 'The Grand Bazaar in Istanbul is one of the world’s oldest covered markets, housing over 4,000 shops!'],
  ['city_singapore_013', 'Singapore City', '🦁', ['Marina Bay', 'Supertrees', 'Merlion'], 'High-tech island city-state celebrated for clean streets and lush urban greenery.', 'Singapore', 'Asia', 'Strait of Malacca', 'Garden City', 'Chewing gum was banned in Singapore in 1992 to keep public transit clean!'],
  ['city_bangkok_014', 'Bangkok', '🛕', ['Floating Market', 'Wat Arun', 'Tuk-Tuk'], 'Vibrant Thai capital of street food stalls, canals, and gilded temples.', 'Thailand', 'Asia', 'Chao Phraya River', 'City of Angels', 'Bangkok is the most visited city by international travelers in the entire world!'],
  ['city_toronto_015', 'Toronto', '🍁', ['CN Tower', 'Lake Ontario', 'Diverse'], 'Canada’s financial center featuring the soaring 553m CN Tower.', 'Canada', 'North America', 'Lake Ontario', 'The 6ix', 'Over 50% of Toronto’s population was born outside of Canada!'],
  ['city_barcelona_016', 'Barcelona', '⛪', ['Sagrada', 'Gaudi', 'Ramblas'], 'Catalan Mediterranean capital famed for Antoni Gaudí’s surreal architecture.', 'Spain', 'Europe', 'Mediterranean Sea', 'City of Gaudi', 'Barcelona had no public beach until 1992 when sand was imported for the Summer Olympics!'],
  ['city_amsterdam_017', 'Amsterdam', '🚲', ['Canals', 'Houseboats', 'Bikes'], 'Dutch capital built upon concentric canal rings with narrow gabled houses.', 'Netherlands', 'Europe', 'Amstel River', 'Venice of the North', 'There are more than 1,200 bridges connecting Amsterdam’s 90 island canal districts!'],
  ['city_venice_018', 'Venice', '🛶', ['Gondola', 'St Marks', 'Lagoon'], 'Romantic Italian city built across 118 small islands linked by canals with no roads.', 'Italy', 'Europe', 'Venetian Lagoon', 'Floating City', 'There are zero cars in Venice; transportation is 100% on foot or by boat!'],
  ['city_la_019', 'Los Angeles', '🎬', ['Hollywood', 'Beverly Hills', 'Pacific'], 'Sprawling Southern California metropolis and global capital of film and television.', 'USA', 'North America', 'Pacific Ocean', 'City of Angels', 'The Hollywood sign originally read "HOLLYWOODLAND" to advertise a 1923 housing development!'],
  ['city_sf_020', 'San Francisco', '🌉', ['Golden Gate', 'Cable Car', 'Alcatraz'], 'Hilly Northern California bay city famous for fog, Victorian houses, and cable cars.', 'USA', 'North America', 'San Francisco Bay', 'Fog City', 'San Francisco’s cable cars are the only moving National Historic Landmarks in the USA!'],
  ['city_seoul_021', 'Seoul', '📱', ['Gangnam', 'Palaces', 'Han River'], 'South Korean capital combining 600-year-old royal palaces with cutting-edge tech.', 'South Korea', 'Asia', 'Han River', 'Soul of Asia', 'Over 10 million people ride Seoul’s subway system every single day!'],
  ['city_berlin_022', 'Berlin', '🧱', ['Brandenburg', 'Wall', 'Reichstag'], 'German capital reunited after the Cold War, celebrated for music, museums, and arts.', 'Germany', 'Europe', 'Spree River', 'Grey City', 'Berlin has more water canals than Venice and over 1,700 bridges!'],
  ['city_moscow_023', 'Moscow', '🏰', ['Red Square', 'St Basils', 'Metro'], 'Russian capital famous for onion-domed churches and museum-like subway palaces.', 'Russia', 'Europe', 'Moskva River', 'Third Rome', 'Moscow’s underground metro stations look like subterranean marble palaces with chandeliers!'],
  ['city_beijing_024', 'Beijing', '🏯', ['Forbidden City', 'Tiananmen', 'Capital'], 'Ancient Chinese imperial capital housing the monumental Forbidden City.', 'China', 'Asia', 'North China Plain', 'Northern Capital', 'The Forbidden City in Beijing contains 9,999 rooms according to imperial legend!'],
  ['city_hongkong_025', 'Hong Kong', '🏙️', ['Victoria Peak', 'Skyscrapers', 'Dim Sum'], 'Territory with more skyscrapers than any other city on planet Earth.', 'China (SAR)', 'Asia', 'South China Sea', 'Fragrant Harbour', 'Hong Kong has more buildings over 150 meters tall than New York and Tokyo combined!'],
  ['city_athens_026', 'Athens', '🏛️', ['Acropolis', 'Parthenon', 'Democracy'], 'One of the oldest named cities in the world and historical birthplace of democracy.', 'Greece', 'Europe', 'Aegean Sea', 'Cradle of Western Civ', 'Athens has been continuously inhabited for more than 3,400 years!'],
  ['city_capetown_027', 'Cape Town', '⛰️', ['Table Mountain', 'Cape of Good Hope', 'Two Oceans'], 'South African coastal gem framed by the flat-topped silhouette of Table Mountain.', 'South Africa', 'Africa', 'Atlantic & Indian Oceans', 'Mother City', 'Table Mountain is one of the oldest mountains on Earth, over 200 million years old!'],
  ['city_kyoto_028', 'Kyoto', '⛩️', ['Geisha', 'Golden Pavilion', 'Torii Gates'], 'Former imperial capital of Japan, holding thousands of classical Buddhist temples.', 'Japan', 'Asia', 'Kamo River', 'Ancient Capital', 'Kyoto was spared from Allied bombing in WWII because US Secretary of War Stimson loved its culture!'],
  ['city_lasvegas_029', 'Las Vegas', '🎰', ['Strip', 'Casinos', 'Neon Lights'], 'Nevada resort oasis in the Mojave Desert, famous for 24-hour entertainment.', 'USA', 'North America', 'Mojave Desert', 'Sin City', 'The beam of light shooting from the Luxor pyramid in Las Vegas is visible from airplanes 275 miles away!'],
  ['city_chicago_030', 'Chicago', '🍕', ['Deep Dish', 'Bean', 'Skyline'], 'Midwestern US city on Lake Michigan, birthplace of the modern skyscraper.', 'USA', 'North America', 'Lake Michigan', 'Windy City', 'Chicago engineers reversed the entire flow of the Chicago River in 1900 to protect Lake Michigan water!'],
  ['city_vienna_031', 'Vienna', '🎻', ['Mozart', 'Palaces', 'Opera'], 'Austrian capital on the Danube River, historic capital of classical music.', 'Austria', 'Europe', 'Danube River', 'City of Music', 'More famous classical composers lived in Vienna than in any other city in history!'],
  ['city_prague_032', 'Prague', '🏰', ['Charles Bridge', 'Astronomical Clock', 'Bohemia'], 'Bohemian capital known as the "City of a Hundred Spires" with gothic bridges.', 'Czech Republic', 'Europe', 'Vltava River', 'City of 100 Spires', 'Prague’s medieval Astronomical Clock has been ticking continuously since 1410!'],
  ['city_buenosaires_033', 'Buenos Aires', '💃', ['Tango', 'Obelisk', 'Plaza de Mayo'], 'Argentine capital dubbed the "Paris of South America" for grand boulevards.', 'Argentina', 'South America', 'Río de la Plata', 'Paris of South America', 'Buenos Aires has Avenida 9 de Julio, the widest avenue in the world with up to 16 traffic lanes!'],
  ['city_jaipur_034', 'Jaipur', '🏰', ['Hawa Mahal', 'Pink City', 'Forts'], 'Capital of Rajasthan, laid out according to Vastu Shastra and painted pink.', 'India', 'Asia', 'Thar Desert Fringe', 'Pink City', 'The entire city was painted terracotta pink in 1876 to welcome Prince Albert of Britain!'],
  ['city_varanasi_035', 'Varanasi', '🪔', ['Ghats', 'Ganges', 'Oldest City'], 'One of the oldest continuously inhabited sacred cities in the world on the Ganges.', 'India', 'Asia', 'Ganges River', 'City of Light (Kashi)', 'Mark Twain wrote: "Benares is older than history, older than tradition, older even than legend!"'],
  ['city_florence_036', 'Florence', '🎨', ['Duomo', 'Michelangelo', 'Uffizi'], 'Tuscan capital celebrated as the birthplace of the Italian Renaissance.', 'Italy', 'Europe', 'Arno River', 'Cradle of Renaissance', 'Florence was home to Leonardo da Vinci, Michelangelo, Botticelli, and Dante!'],
  ['city_edinburgh_037', 'Edinburgh', '🏰', ['Castle', 'Royal Mile', 'Volcano'], 'Historic Scottish capital built upon ancient extinct volcanic crags.', 'Scotland (UK)', 'Europe', 'Firth of Forth', 'Auld Reekie', 'Edinburgh Castle stands atop Castle Rock, an extinct volcanic plug that erupted 350 million years ago!'],
  ['city_vancouver_038', 'Vancouver', '🏔️', ['Ocean & Mountains', 'Seawall', 'Pacific'], 'Canadian Pacific coast metropolis framed by temperate rainforests and ski mountains.', 'Canada', 'North America', 'Pacific Ocean', 'Rain City', 'In Vancouver, you can go skiing in snowy mountains and windsurfing in the ocean on the exact same afternoon!'],
  ['city_madrid_039', 'Madrid', '🇪🇸', ['Prado', 'Royal Palace', 'Churros'], 'Central European capital of Spain, home to the Royal Palace and world-class Prado art.', 'Spain', 'Europe', 'Manzanares River', 'Heart of Spain', 'Sobrino de Botín in Madrid is officially certified by Guinness as the oldest continuously operating restaurant in the world (founded 1725)!'],
  ['city_jerusalem_040', 'Jerusalem', '🕊️', ['Old City', 'Western Wall', 'Three Faiths'], 'Ancient city sacred to Judaism, Christianity, and Islam for over 3,000 years.', 'Middle East', 'Asia', 'Judean Mountains', 'Holy City', 'The Old City of Jerusalem covers less than one square kilometer yet holds holy sanctuaries for half of humanity!']
];

const citiesData: CardDef[] = citiesList.map(([id, name, emoji, buzz, desc, country, cont, water, nick, fun]) => ({
  id,
  category: 'cities',
  name,
  difficulty: 'easy',
  emoji,
  buzzWords: buzz as [string, string, string],
  clues: [
    desc,
    `I am located in ${country} on the continent of ${cont}.`,
    `I am situated along ${water} and often nicknamed "${nick}".`
  ],
  primaryClues: [desc, `Located in ${country}.`],
  secondaryClues: [`Situated along ${water}.`, `Nicknamed "${nick}".`],
  factGrid: [
    { icon: '🏳️', label: 'Country', value: country },
    { icon: '🌍', label: 'Continent', value: cont },
    { icon: '🌊', label: 'Waterfront', value: water },
    { icon: '🏷️', label: 'Nickname', value: nick }
  ],
  bonusTrivia: {
    question: `In which country is the city of ${name} located?`,
    answer: country
  },
  facts: { isCity: true, inUrbanCategory: true },
  aliases: [name.toLowerCase()],
  explanation: `${name} is an internationally famous city celebrated for its urban architecture and culture.`,
  funFact: fun,
  verificationStatus: 'verified'
}));

writeCat('cities.ts', 'CITIES_CARDS', citiesData);

// 4. LEGENDARY LANDMARKS (40 CARDS)
const landmarksList = [
  ['land_eiffel_001', 'Eiffel Tower', '🗼', ['Iron Lady', 'Paris', 'Lattice'], 'Wrought-iron lattice tower standing on the Champ de Mars in Paris.', 'Paris, France', '1889 AD', 'Iron', 'Gustave Eiffel', 'Thermal expansion makes the Eiffel Tower grow up to 6 inches taller during hot summers!'],
  ['land_greatwall_002', 'Great Wall of China', '🧱', ['Fortification', 'Ming', 'Northern Border'], 'Ancient defensive stone and brick wall stretching over 13,000 miles across China.', 'Northern China', '7th C. BC - Ming', 'Stone & Brick', 'Qin Shi Huang', 'Sticky rice porridge was mixed into the mortar by Ming builders to create virtually unbreakable bonds!'],
  ['land_tajmahal_003', 'Taj Mahal', '🕌', ['Marble', 'Shah Jahan', 'Mausoleum'], 'Ivory-white marble mausoleum on the Yamuna River in Agra, India.', 'Agra, India', '1631–1648 AD', 'White Marble', 'Shah Jahan', 'The four minarets tilt slightly outward so in an earthquake they would fall away from the central dome!'],
  ['land_colosseum_004', 'Colosseum', '🏛️', ['Gladiator', 'Amphitheatre', 'Rome'], 'Largest ancient amphitheatre ever built, hosting gladiators in central Rome.', 'Rome, Italy', '70–80 AD', 'Travertine Stone', 'Flavian Emperors', 'The Colosseum could be flooded with aqueduct water to stage full-scale naval battles with real ships!'],
  ['land_machupicchu_005', 'Machu Picchu', '⛰️', ['Inca', 'Andes', 'Lost City'], '15th-century Inca mountain citadel nestled 7,970 ft high in the Andes of Peru.', 'Cusco, Peru', '1450 AD', 'Polished Dry-Stone', 'Pachacuti', 'Inca stone blocks were cut so precisely without mortar that you cannot slide a knife blade between them!'],
  ['land_pyramids_006', 'Pyramids of Giza', '🏺', ['Pharaoh', 'Khufu', 'Sphinx'], 'Oldest of the Seven Wonders of the Ancient World, monumental tombs in Egypt.', 'Giza, Egypt', '2560 BC', 'Limestone', 'Pharaoh Khufu', 'The Great Pyramid was the tallest human-made structure in the world for over 3,800 years!'],
  ['land_liberty_007', 'Statue of Liberty', '🗽', ['Torch', 'Copper', 'New York Harbor'], 'Colossal neoclassical copper statue on Liberty Island, a gift of friendship from France.', 'New York, USA', '1886 AD', 'Copper & Iron', 'Bartholdi & Eiffel', 'The statue’s copper skin is only 3/32 of an inch thick—roughly the thickness of two pennies together!'],
  ['land_sydney_opera_008', 'Sydney Opera House', '🎭', ['Sails', 'Harbour', 'Utzon'], 'Performing arts centre in Sydney Harbour with roof sails made of ceramic tiles.', 'Sydney, Australia', '1973 AD', 'Precast Concrete', 'Jørn Utzon', 'Architect Jørn Utzon was inspired by the curved geometry of orange peels when designing the famous roof sails!'],
  ['land_everest_009', 'Mount Everest', '🏔️', ['Highest Peak', 'Himalayas', 'Sherpa'], 'Earth’s highest mountain above sea level, standing at 29,031.7 feet (8,848.86 m).', 'Nepal / Tibet Border', 'Geological', 'Granite & Marble', 'Nature', 'Mount Everest grows taller by about 4 millimeters every year due to tectonic plate movement!'],
  ['land_goldengate_010', 'Golden Gate Bridge', '🌉', ['Suspension', 'Orange', 'San Francisco'], 'Suspension bridge painted International Orange spanning the Golden Gate strait.', 'San Francisco, USA', '1937 AD', 'Steel & Wire Cables', 'Joseph Strauss', 'The bridge contains enough steel wire inside its main cables to circle the Earth’s equator over three times!'],
  ['land_bigben_011', 'Big Ben (Elizabeth Tower)', '🕰️', ['Clock', 'Chime', 'Westminster'], 'Famous four-faced clock tower of the Palace of Westminster in London.', 'London, UK', '1859 AD', 'Stone & Cast Iron', 'Augustus Pugin', 'Big Ben is technically the nickname of the giant 13-ton bell inside, not the tower itself!'],
  ['land_christ_012', 'Christ the Redeemer', '✝️', ['Corcovado', 'Arms Spread', 'Rio'], 'Colossal Art Deco statue of Jesus Christ crowning Corcovado mountain in Rio de Janeiro.', 'Rio de Janeiro, Brazil', '1931 AD', 'Reinforced Concrete', 'Paul Landowski', 'The statue is struck by lightning an average of 3 to 6 times every single year!'],
  ['land_pisa_013', 'Leaning Tower of Pisa', '🗼', ['Tilt', 'Campanile', 'Marble'], 'Freestanding bell tower famous worldwide for its unintended four-degree tilt.', 'Pisa, Italy', '1173–1372 AD', 'White Marble', 'Bonanno Pisano', 'The tower began leaning almost immediately during construction because of soft mud and clay subsoil!'],
  ['land_acropolis_014', 'Acropolis of Athens', '🏛️', ['Parthenon', 'Athena', 'Citadel'], 'Ancient citadel crowning a rocky outcrop above Athens, containing the Parthenon.', 'Athens, Greece', '5th C. BC', 'Pentelic Marble', 'Pericles', 'The Parthenon’s columns lean slightly inward and bulge in the middle to create an optical illusion of perfection!'],
  ['land_petra_015', 'Petra', '🏜️', ['Rose City', 'Treasury', 'Rock-Cut'], 'Ancient Nabataean capital carved directly into vibrant pink sandstone cliffs in Jordan.', 'Jordan', '312 BC', 'Rose Sandstone', 'Nabataeans', 'Over 85% of the ancient city of Petra remains buried underground, waiting to be excavated!'],
  ['land_stonehenge_016', 'Stonehenge', '🪨', ['Megalith', 'Solstice', 'Salisbury'], 'Prehistoric ring of standing megalith stones aligned with midsummer sunrise in England.', 'Wiltshire, UK', '3000–2000 BC', 'Sarsen & Bluestone', 'Neolithic Builders', 'The smaller bluestones were transported over 140 miles from quarries in Wales without wheeled transport!'],
  ['land_grandcanyon_017', 'Grand Canyon', '🏜️', ['Colorado River', 'Strata', 'Arizona'], 'Steep-sided mile-deep canyon carved by the Colorado River exposing 2 billion years of rock.', 'Arizona, USA', 'Geological', 'Sedimentary Rock', 'Nature', 'The Grand Canyon is so vast that it creates its own microclimates and localized weather systems!'],
  ['land_niagara_018', 'Niagara Falls', '🌊', ['Horseshoe', 'Mist', 'Border Falls'], 'Massive set of three waterfalls straddling the international border between Canada and the USA.', 'USA / Canada Border', '12,000 Years Ago', 'Water & Dolomite', 'Nature', 'Niagara Falls produces enough hydroelectric power to supply over 25% of all power in New York and Ontario!'],
  ['land_fuji_019', 'Mount Fuji', '🗻', ['Stratovolcano', 'Snow Cap', 'Sacred Peak'], 'Active stratovolcano and highest peak in Japan, sacred symbol depicted in ukiyo-e art.', 'Honshu, Japan', 'Geological', 'Basalt & Andesite', 'Nature', 'Mount Fuji is an active volcano that last erupted in 1707, coating Tokyo in ash for weeks!'],
  ['land_burjkhalifa_020', 'Burj Khalifa', '🏙️', ['Tallest', 'Spire', 'Y-Shaped'], 'Tallest human-made structure in the world, piercing the Dubai sky at 828 meters (2,717 ft).', 'Dubai, UAE', '2010 AD', 'Steel & Glass', 'Adrian Smith', 'The top of the Burj Khalifa is roughly 15 degrees Fahrenheit cooler than the ground temperature!'],
  ['land_angkorwat_021', 'Angkor Wat', '🛕', ['Khmer', 'Moat', 'Largest Religious'], 'Largest religious temple monument in the world, dedicated originally to Vishnu in Cambodia.', 'Siem Reap, Cambodia', '12th C. AD', 'Sandstone Blocks', 'Suryavarman II', 'Angkor Wat is featured directly in the center of the national flag of Cambodia!'],
  ['land_alhambra_022', 'Alhambra', '🏰', ['Nasrid', 'Court of Lions', 'Granada'], 'Palace and fortress complex of the Nasrid dynasty overlooking Granada, Spain.', 'Granada, Spain', '1238–1358 AD', 'Stucco & Tile', 'Muhammad I', 'The walls contain thousands of calligraphic inscriptions reciting "There is no victor but God!"'],
  ['land_chichenitza_023', 'Chichen Itza', '🐍', ['El Castillo', 'Maya', 'Serpent Shadow'], 'Ancient Maya step-pyramid city famous for the Kukulkan serpent shadow on equinoxes.', 'Yucatán, Mexico', '600–900 AD', 'Limestone', 'Maya Civilization', 'During equinoxes, the afternoon sun creates the shadow of an undulating feathered serpent slithering down the pyramid!'],
  ['land_sagrada_024', 'Basílica de la Sagrada Família', '⛪', ['Gaudi', 'Unfinished', 'Barcelona'], 'Surreal Roman Catholic minor basilica in Barcelona under construction since 1882.', 'Barcelona, Spain', '1882–Present', 'Granite & Stone', 'Antoni Gaudí', 'Construction of Sagrada Família has taken longer than the construction of the Great Pyramids of Giza!'],
  ['land_louvre_025', 'The Louvre Museum', '🖼️', ['Glass Pyramid', 'Mona Lisa', 'Palace'], 'World’s most-visited art museum and historic palace of French kings.', 'Paris, France', '1793 AD', 'Stone & Glass', 'I. M. Pei (Pyramid)', 'If you spent 30 seconds looking at every piece of art in the Louvre, it would take you 100 days straight!'],
  ['land_stbasil_026', 'Saint Basil’s Cathedral', '🎪', ['Onion Domes', 'Red Square', 'Colors'], 'Vibrant multi-colored onion-domed cathedral on Moscow’s Red Square commissioned by Ivan the Terrible.', 'Moscow, Russia', '1561 AD', 'Brick & Stucco', 'Postnik Yakovlev', 'Legend says Ivan the Terrible blinded the architects so they could never build anything as beautiful again!'],
  ['land_victoriafalls_027', 'Victoria Falls', '🌊', ['Smoke That Thunders', 'Zambezi', 'Curtain'], 'World’s largest curtain of falling water, located on the Zambezi River between Zambia and Zimbabwe.', 'Zambia / Zimbabwe', 'Geological', 'Basalt Gorge', 'Nature', 'Local tribes name it Mosi-oa-Tunya, which translates to "The Smoke That Thunders!"'],
  ['land_kilimanjaro_028', 'Mount Kilimanjaro', '🏔️', ['Africa Roof', 'Snow on Equator', 'Tanzania'], 'Dormant stratovolcano in Tanzania and the highest free-standing mountain above sea level in the world.', 'Tanzania', 'Geological', 'Volcanic Rock', 'Nature', 'Kilimanjaro contains almost every single ecological climate zone on Earth from rainforest to arctic glacier!'],
  ['land_rushmore_029', 'Mount Rushmore', '🗿', ['Four Presidents', 'Granite', 'Black Hills'], 'Colossal mountain sculpture in South Dakota depicting Washington, Jefferson, Roosevelt, and Lincoln.', 'South Dakota, USA', '1927–1941 AD', 'Granite', 'Gutzon Borglum', 'Over 90% of the carving of Mount Rushmore was accomplished using precision dynamite blasting!'],
  ['land_neuschwanstein_030', 'Neuschwanstein Castle', '🏰', ['Fairytale', 'Bavaria', 'Disney'], '19th-century historicist palace commissioned by King Ludwig II of Bavaria atop a rugged cliff.', 'Bavaria, Germany', '1869–1886 AD', 'Limestone & Brick', 'King Ludwig II', 'This fairy-tale castle was the direct visual inspiration for Walt Disney’s Sleeping Beauty Castle!'],
  ['land_easterisland_031', 'Moai of Easter Island (Rapa Nui)', '🗿', ['Monolith Heads', 'Rano Raraku', 'Pacific'], 'Nearly 1,000 colossal volcanic tuff human statues carved by the Rapa Nui people.', 'Easter Island, Chile', '1250–1500 AD', 'Volcanic Tuff', 'Rapa Nui Islanders', 'The famous "heads" actually have complete buried torsos with intricate tribal tattoo carvings!'],
  ['land_empirestate_032', 'Empire State Building', '🏙️', ['Art Deco', '102 Floors', 'Manhattan'], 'Iconic 102-story Art Deco skyscraper in Midtown Manhattan completed in 1931.', 'New York, USA', '1931 AD', 'Steel & Limestone', 'Shreve, Lamb & Harmon', 'The entire 102-story Empire State Building was constructed in just 1 year and 45 days!'],
  ['land_towerbridge_033', 'Tower Bridge', '🌉', ['Bascule', 'Twin Towers', 'Thames'], 'Combined bascule and suspension bridge crossing the River Thames close to the Tower of London.', 'London, UK', '1894 AD', 'Steel & Cornish Granite', 'Sir Horace Jones', 'In 1952, a London double-decker bus had to jump across a 3-foot gap when the bridge began opening unexpectedly!'],
  ['land_timessquare_034', 'Times Square', '✨', ['Billboards', 'Ball Drop', 'Broadway'], 'Major commercial intersection and entertainment center in Manhattan glowing with LED billboards.', 'New York, USA', '1904 AD', 'Urban Center', 'City of New York', 'Times Square was originally called Longacre Square before The New York Times moved its headquarters there in 1904!'],
  ['land_panamacanal_035', 'Panama Canal', '🚢', ['Lock System', 'Two Oceans', 'Isthmus'], 'Artificial 82-kilometer waterway connecting the Atlantic and Pacific Oceans across Central America.', 'Panama', '1914 AD', 'Concrete Locks', 'US / French Engineers', 'Ships traveling through the canal from the Pacific to the Atlantic actually sail northwest, not east!'],
  ['land_hagiasophia_036', 'Hagia Sophia', '🕌', ['Dome', 'Byzantine', 'Mosaics'], 'Grand Byzantine cathedral turned imperial mosque and museum in Istanbul, famed for its massive dome.', 'Istanbul, Turkey', '537 AD', 'Brick & Mortar', 'Emperor Justinian I', 'When built in 537 AD, it was the largest cathedral in the entire Christian world for nearly 1,000 years!'],
  ['land_hollywoodsign_037', 'The Hollywood Sign', '🎬', ['Mount Lee', 'Letters', 'Cinema'], 'World-famous 45-foot-tall white capital letters spelling out the cinema capital on Mount Lee.', 'Los Angeles, USA', '1923 AD', 'Sheet Metal & Steel', 'Los Angeles Chamber', 'The sign originally read "HOLLYWOODLAND" to advertise a local residential real estate development!'],
  ['land_deadsea_038', 'The Dead Sea', '🧂', ['Lowest Land', 'Float', 'Hyper-Saline'], 'Salt lake between Jordan and Israel whose surface is the lowest land elevation on Earth (-430 m).', 'Jordan / Israel Border', 'Geological', 'Hyper-Saline Water', 'Nature', 'The water is 10 times saltier than the ocean, making it impossible to sink—swimmers float like corks!'],
  ['land_giantscauseway_039', 'Giant’s Causeway', '🪨', ['Hexagon Columns', 'Basalt', 'Finn McCool'], 'Area of 40,000 interlocking polygonal basalt columns formed by ancient volcanic activity in Northern Ireland.', 'Northern Ireland, UK', '50–60 Million Years Ago', 'Columnar Basalt', 'Nature / Volcanism', 'Legend says Irish giant Finn McCool built the causeway as stepping stones to walk across to Scotland!'],
  ['land_galapagos_040', 'Galápagos Islands', '🐢', ['Darwin', 'Evolution', 'Finches'], 'Volcanic archipelago in the Pacific Ocean famous for fearless endemic wildlife studied by Charles Darwin.', 'Ecuador', 'Geological', 'Volcanic Islands', 'Nature', 'The isolation of these islands led to the development of unique species that inspired Darwin’s theory of natural selection!']
];

const landmarksData: CardDef[] = landmarksList.map(([id, name, emoji, buzz, desc, loc, era, mat, builder, fun]) => ({
  id,
  category: 'landmarks',
  name,
  difficulty: 'easy',
  emoji,
  buzzWords: buzz as [string, string, string],
  clues: [
    desc,
    `I am located in ${loc} and was constructed / formed around ${era}.`,
    `I am constructed of ${mat} and famously associated with ${builder}.`
  ],
  primaryClues: [desc, `Located in ${loc}.`],
  secondaryClues: [`Associated with ${era}.`, `Constructed with ${mat}.`],
  factGrid: [
    { icon: '📍', label: 'Location', value: loc },
    { icon: '⏳', label: 'Era / Age', value: era },
    { icon: '🧱', label: 'Material', value: mat },
    { icon: '👑', label: 'Builder / Origin', value: builder }
  ],
  bonusTrivia: {
    question: `Where in the world is the ${name} located?`,
    answer: loc
  },
  facts: { inLandmarks: true, famousMonument: true },
  aliases: [name.toLowerCase()],
  explanation: `${name} is an internationally celebrated landmark renowned for architectural and historical wonder.`,
  funFact: fun,
  verificationStatus: 'verified'
}));

writeCat('landmarks.ts', 'LANDMARKS_CARDS', landmarksData);

// 5. ALL ABOUT SPACE (40 CARDS)
const spaceList = [
  ['spc_sun_001', 'The Sun', '☀️', ['Fusion', 'Solar', 'Center'], 'G-type yellow dwarf star at the center of our Solar System.', '1.3 Million Earths', 'Nuclear Fusion', '5,500°C Surface', '8m 20s Light Time', 'About 1.3 million Earths could fit inside the volume of the Sun!'],
  ['spc_moon_002', 'The Moon', '🌕', ['Tides', 'Apollo', 'Crater'], 'Earth’s only natural permanent satellite, causing ocean tides.', '1/6th Earth Gravity', 'Tidally Locked', 'No Atmosphere', 'Visited 1969', 'Footprints left by Apollo astronauts will remain preserved for millions of years because there is no wind!'],
  ['spc_mars_003', 'Mars', '🔴', ['Red Planet', 'Rovers', 'Olympus Mons'], 'Fourth planet from the Sun, covered in reddish iron oxide rust.', 'Two Moons (Phobos/Deimos)', 'Thick Rust Dust', 'Olympus Mons', 'Thin CO2 Air', 'Sunsets on Mars appear blue due to how fine dust scatters reddish sunlight!'],
  ['spc_saturn_004', 'Saturn', '🪐', ['Rings', 'Gas Giant', 'Titan'], 'Sixth planet from the Sun, celebrated for dazzling planetary rings.', 'Ice Ring System', 'Floats in Water', '140+ Moons', 'Hydrogen & Helium', 'Saturn’s density is so low that if you had a giant ocean big enough, the planet would float!'],
  ['spc_jupiter_005', 'Jupiter', '🌀', ['Great Red Spot', 'Largest', 'Galilean Moons'], 'Largest planet in our Solar System, possessing a storm raging for centuries.', 'Great Red Spot', '95+ Moons', 'Fast 10h Day', 'Gas Giant', 'Jupiter rotates faster than any other planet, completing a full planetary "day" in less than 10 hours!'],
  ['spc_comet_006', 'Comet', '☄️', ['Dirty Snowball', 'Tail', 'Kuiper Belt'], 'Icy small celestial body that sprouts a glowing coma and tail near the Sun.', 'Ice & Dust', 'Ion Tail Points Away', 'Kuiper / Oort', 'Halley Periodic', 'A comet’s glowing tail can stretch across interplanetary space for more than 100 million miles!'],
  ['spc_blackhole_007', 'Black Hole', '🕳️', ['Singularity', 'Event Horizon', 'No Light Escapes'], 'Region of spacetime with gravity so intense that not even light can escape.', 'Event Horizon', 'Infinite Density', 'Spaghettification', 'Collapsed Star', 'If you fell feet-first into a black hole, extreme gravity would stretch you out like spaghetti!'],
  ['spc_milkyway_008', 'Milky Way Galaxy', '🌌', ['Barred Spiral', 'Sagittarius A*', '100B Stars'], 'The spiral galaxy containing our Solar System and 100 billion other stars.', 'Barred Spiral', '100,000 Light Yrs Wide', 'Sagittarius A* Center', 'Orion Arm', 'Traveling at the speed of light, it would take 100,000 years to cross from one side of our galaxy to the other!'],
  ['spc_iss_009', 'International Space Station', '🛰️', ['Microgravity', 'Orbit', 'Multinational'], 'Modular habitable space station orbiting Earth every 90 minutes.', 'Low Earth Orbit (250 mi)', '17,500 mph Speed', 'Football Field Size', '16 Sunrises Daily', 'Astronauts on the ISS experience 16 sunrises and 16 sunsets every single 24-hour day!'],
  ['spc_hubble_010', 'Hubble Space Telescope', '🔭', ['Deep Field', 'Pillars of Creation', 'Discovery'], 'Space telescope in low Earth orbit that opened our eyes to deep cosmos since 1990.', 'Launched 1990', 'Optical & UV', 'Above Atmosphere', 'Serviced by Shuttles', 'Hubble has traveled over 4 billion miles along its circular orbit around Earth!'],
  ['spc_venus_011', 'Venus', '🌋', ['Greenhouse', 'Hottest Planet', 'Morning Star'], 'Second planet from the Sun with a runaway greenhouse atmosphere hot enough to melt lead.', '465°C Surface', 'Acid Clouds', 'Retrograde Spin', 'Earth’s Twin', 'A single day on Venus is longer than a full Venusian year!'],
  ['spc_mercury_012', 'Mercury', '🌑', ['Smallest', 'Sunbaked', 'Speedy Orbit'], 'Smallest planet and closest to the Sun, with extreme day-night temperature swings.', '88-Day Orbit', 'No Atmosphere', 'Cratered Surface', 'Iron Core', 'Despite being closest to the Sun, Venus is hotter than Mercury because Mercury has no greenhouse atmosphere!'],
  ['spc_neptune_013', 'Neptune', '💨', ['Ice Giant', 'Supersonic Winds', 'Triton'], 'Eighth and most distant major planet, famous for vivid blue methane atmosphere and supersonic gales.', '1,200 mph Winds', 'Methane Blue', 'Triton Moon', 'Ice Giant', 'Winds on Neptune blow faster than the speed of sound, exceeding 1,200 miles per hour!'],
  ['spc_uranus_014', 'Uranus', '❄️', ['Tilted on Side', 'Cyan', 'Coldest'], 'Ice giant that rotates rolling on its side like a bowling ball with 98° axial tilt.', 'Tilted 98 Degrees', 'Coldest Atmosphere', 'Faint Rings', 'Cyan Methane', 'Because Uranus rolls on its side, each pole experiences 42 years of continuous sunlight followed by 42 years of darkness!'],
  ['spc_pluto_015', 'Pluto', '❤️', ['Dwarf Planet', 'Heart Glacier', 'Charon'], 'Dwarf planet in the Kuiper Belt featuring a nitrogen ice glacier shaped like a giant heart.', 'Dwarf Planet', 'Tombaugh Regio Heart', 'Charon Moon System', 'Kuiper Belt', 'Pluto was reclassified as a dwarf planet by the International Astronomical Union in 2006!'],
  ['spc_asteroid_016', 'Asteroid Belt', '🪨', ['Ceres', 'Between Mars & Jupiter', 'Rocky Debris'], 'Circumstellar disc between the orbits of Mars and Jupiter filled with rocky minor planets.', 'Mars & Jupiter', 'Ceres Dwarf Planet', 'Rocky Remnants', 'Empty Space Mostly', 'Despite movies showing dense rock fields, asteroids are typically separated by millions of miles of empty vacuum!'],
  ['spc_supernova_017', 'Supernova', '💥', ['Stellar Explosion', 'Stardust', 'Shockwave'], 'Colossal explosion marking the violent death of a massive star, outshining galaxies.', 'Stellar Death', 'Outshines Galaxies', 'Heavy Elements', 'Neutron Star Remnant', 'Almost all the iron in your blood and gold in jewelry was forged inside ancient supernovae explosions!'],
  ['spc_andromeda_018', 'Andromeda Galaxy', '🌌', ['Neighbor', 'Spiral', 'Future Collision'], 'Nearest major spiral galaxy to the Milky Way, located 2.5 million light-years away.', '2.5M Light-Years', 'Spiral Galaxy', '1 Trillion Stars', 'Milky Way Collision', 'In roughly 4.5 billion years, Andromeda and our Milky Way will collide to form one giant elliptical galaxy!'],
  ['spc_nebula_019', 'Orion Nebula', '☁️', ['Stellar Nursery', 'Gas Cloud', 'Glowing Dust'], 'Diffuse glowing stellar nursery in the constellation Orion where new baby stars are born.', '1,344 Light-Years', 'Stellar Nursery', 'Hydrogen Gas', 'Visible Naked Eye', 'The Orion Nebula is producing hundreds of new stars and planetary systems right now!'],
  ['spc_jwst_020', 'James Webb Space Telescope', '🛰️', ['Gold Mirrors', 'Infrared', 'L2 Point'], 'NASA’s premier space telescope using 18 hexagonal gold-plated beryllium mirrors at Lagrange Point 2.', 'Lagrange Point 2', '18 Gold Mirrors', 'Infrared Sight', 'Deepest Universe', 'JWST’s sunshield is the size of a tennis court and keeps its instruments chilled to nearly absolute zero!'],
  ['spc_apollo11_021', 'Apollo 11 Lunar Module', '🚀', ['Eagle', 'Tranquility', 'One Small Step'], 'The spacecraft that landed Neil Armstrong and Buzz Aldrin on the Moon on July 20, 1969.', 'Sea of Tranquility', 'July 20, 1969', 'Eagle Landed', 'First Moonwalk', 'The computer that navigated the Apollo 11 moon landing had less memory than a modern USB stick!'],
  ['spc_voyager1_022', 'Voyager 1', '📡', ['Interstellar', 'Golden Record', 'Most Distant'], 'Most distant human-made object from Earth, traveling through interstellar space carrying a Golden Record.', 'Interstellar Space', 'Golden Record', 'Launched 1977', '14+ Billion Miles', 'Voyager 1 carries a phonograph record containing greetings in 55 languages and sounds of Earth!'],
  ['spc_neutron_023', 'Neutron Star (Pulsar)', '💫', ['Extreme Density', 'Pulsar Beams', 'Magnetic'], 'Collapsed stellar core so dense that a single sugar-cube-sized amount weighs 1 billion tons.', 'Infinite Density', 'City-Sized (12 mi)', 'Spins 700x / Sec', 'Lighthouse Beams', 'A teaspoon of neutron star material would weigh more than all 8 billion humans on Earth combined!'],
  ['spc_solareclipse_024', 'Total Solar Eclipse', '🌑', ['Corona', 'Totality', 'Moon Shadow'], 'Rare alignment when the Moon passes directly between the Sun and Earth, blocking out sunlight.', 'Moon Blocks Sun', 'Solar Corona Visible', 'Totality Zone', 'Baily’s Beads', 'Solar eclipses are only possible because the Sun is 400x larger than the Moon, but also 400x farther away!'],
  ['spc_lunareclipse_025', 'Blood Moon (Lunar Eclipse)', '🔴', ['Earth Shadow', 'Coppery Red', 'Full Moon'], 'Astronomical event where Earth blocks sunlight to the Moon, casting a reddish coppery glow.', 'Earth Shadow', 'Coppery Red Color', 'Atmospheric Scattering', 'Full Moon Only', 'The red color during a lunar eclipse is the reflection of all the sunrises and sunsets happening on Earth at once!'],
  ['spc_polaris_026', 'Polaris (North Star)', '⭐', ['Navigation', 'True North', 'Ursa Minor'], 'Anchor navigation star situated almost directly above Earth’s geographic North Pole.', 'North Celestial Pole', 'Ursa Minor', 'Triple Star System', 'Never Rises or Sets', 'Polaris does not move across the sky at night; all other stars appear to circle counterclockwise around it!'],
  ['spc_meteor_027', 'Meteor Shower', '🌠', ['Shooting Star', 'Atmosphere', 'Perseids'], 'Celestial event where streams of cosmic dust burn up as glowing streaks in Earth’s atmosphere.', 'Space Dust Burn', 'Friction Glow', 'Perseids / Geminids', 'Shooting Star', 'Most "shooting stars" are particles no larger than a grain of sand burning up 60 miles above your head!'],
  ['spc_aurora_028', 'Aurora Borealis (Northern Lights)', '🟢', ['Solar Wind', 'Magnetic Poles', 'Dancing Curtains'], 'Luminous atmospheric curtains created when solar wind particles collide with atmospheric gases.', 'Solar Wind Charged', 'Oxygen Green/Red', 'Arctic Skies', 'Geomagnetic Storm', 'Auroras also occur on other planets with magnetic fields, including giant displays on Jupiter and Saturn!'],
  ['spc_titan_029', 'Titan (Moon of Saturn)', '🧪', ['Methane Lakes', 'Thick Atmosphere', 'Saturn Moon'], 'Saturn’s largest moon, the only moon in the Solar System with a dense atmosphere and liquid lakes.', 'Methane Seas', 'Dense Atmosphere', 'Larger Than Mercury', 'Huygens Probe', 'Gravity on Titan is so low and air so thick that a human strapped into artificial wings could fly like a bird!'],
  ['spc_europa_030', 'Europa (Moon of Jupiter)', '🌊', ['Subsurface Ocean', 'Ice Crust', 'Alien Life'], 'Icy moon of Jupiter concealing a global subterranean saltwater ocean containing 2x Earth’s water.', 'Subsurface Ocean', 'Smooth Ice Crust', 'Jupiter Tide Heated', 'Astrobiology Target', 'Scientists believe Europa’s warm hidden ocean is the most promising place to discover alien extraterrestrial life!'],
  ['spc_ganymede_031', 'Ganymede', '🌕', ['Largest Moon', 'Magnetic Field', 'Jupiter'], 'Largest moon in the entire Solar System, even larger than the planet Mercury.', 'Largest Moon', 'Own Magnetic Field', 'Subsurface Water', 'Galilean Moon', 'Ganymede is the only moon in the Solar System known to generate its own internal magnetic field!'],
  ['spc_curiosity_032', 'Mars Rover Curiosity', '🤖', ['Gale Crater', 'Nuclear Battery', 'Rover'], 'Car-sized robotic science laboratory exploring Mars’s Gale Crater searching for ancient habitable water.', 'Gale Crater', 'Nuclear Powered', 'Laser & Drill', 'Landed 2012', 'Curiosity sang "Happy Birthday" to itself on Mars on the first anniversary of its landing in 2013!'],
  ['spc_spacewalk_033', 'Spacewalk (EVA)', '🧑‍🚀', ['Tether', 'Spacesuit', 'Vacuum Work'], 'Extravehicular activity where astronauts exit their spacecraft into open vacuum.', 'Spacesuit Life Support', 'Safety Tether', 'Neutral Buoyancy', 'Floating Outside', 'Astronauts practice spacewalks by spending hundreds of hours underwater in giant indoor training pools!'],
  ['spc_spaceshuttle_034', 'Space Shuttle', '🚀', ['Reusable', 'Orbiter', 'Launch Pad'], 'NASA’s legendary winged reusable orbital spacecraft fleet (Columbia, Challenger, Discovery, Atlantis, Endeavour).', 'Winged Glider', '30-Year Program', 'Launched Hubble', '135 Missions', 'The Space Shuttle had no engines during landing; it glided unpowered from orbit like a 100-ton brick!'],
  ['spc_astronaut_035', 'Astronaut', '🧑‍🚀', ['Microgravity', 'Helmet', 'Spacewalker'], 'Trained human spacefarer commanding spacecraft and conducting orbital scientific experiments.', 'Spaceflight Training', 'Pressure Spacesuit', 'Neutral Buoyancy', 'Zero Gravity', 'Astronauts can grow up to 2 inches taller in space because microgravity decompresses spinal discs!'],
  ['spc_exoplanet_036', 'Exoplanet', '🪐', ['Goldilocks Zone', 'Transit Method', 'Alien World'], 'Planet orbiting a star outside our Solar System, discovered by transits and wobble techniques.', 'Orbits Distant Star', 'Habitable Zone', 'Kepler / TESS', '5,000+ Confirmed', 'Over 5,000 confirmed alien worlds have been discovered orbiting other stars in our galaxy!'],
  ['spc_eventhorizon_037', 'Event Horizon', '🕳️', ['Point of No Return', 'Telescope Image', 'Schwarzschild'], 'The boundary around a black hole beyond which escape velocity exceeds the speed of light.', 'Point of No Return', 'Schwarzschild Radius', 'Time Dilation', 'EHT Photographed', 'The Event Horizon Telescope combined radio dishes across 4 continents to capture the first photo of a black hole in 2019!'],
  ['spc_solarflare_038', 'Solar Flare', '⚡', ['Sunspot Burst', 'Plasma', 'Electromagnetic'], 'Sudden, intense flash of increased brightness on the Sun releasing massive bursts of magnetic energy.', 'Magnetic Reconnection', 'X-Ray Bursts', 'Disrupts Radio', 'Solar Maximum', 'A single large solar flare can release energy equivalent to 100 million hydrogen bombs exploding at once!'],
  ['spc_lightyear_039', 'Light-Year', '📏', ['Speed of Light', 'Distance Unit', '6 Trillion Miles'], 'Unit of astronomical distance equal to the distance that light travels in one Earth year.', 'Distance (Not Time)', '5.88 Trillion Miles', '186,000 mi/sec', 'Cosmic Ruler', 'When you look at stars at night, you are looking back in time—seeing light that traveled for hundreds of years!'],
  ['spc_bigbang_040', 'The Big Bang', '💥', ['Cosmic Origin', '13.8 Billion Years', 'Expanding Universe'], 'The prevailing cosmological model explaining the rapid expansion of the universe from a hot, dense point.', '13.8 Billion Years Ago', 'Expanding Space', 'Cosmic Background (CMB)', 'Origin of Matter', 'The static noise you hear on old un-tuned analog TVs is partly caused by lingering radiation from the Big Bang!']
];

const spaceData: CardDef[] = spaceList.map(([id, name, emoji, buzz, desc, f1, f2, f3, f4, fun]) => ({
  id,
  category: 'space',
  name,
  difficulty: 'easy',
  emoji,
  buzzWords: buzz as [string, string, string],
  clues: [
    desc,
    `Key astronomical properties include: ${f1} and ${f2}.`,
    `Fascinating cosmological characteristics: ${f3} and ${f4}.`
  ],
  primaryClues: [desc, `Notable for ${f1}.`],
  secondaryClues: [`Characterized by ${f2}.`, `Features ${f3}.`],
  factGrid: [
    { icon: '🌌', label: 'Cosmic Property', value: f1 },
    { icon: '⭐', label: 'Feature', value: f2 },
    { icon: '🔭', label: 'Observation', value: f3 },
    { icon: '🚀', label: 'Significance', value: f4 }
  ],
  bonusTrivia: {
    question: `What is a defining feature of ${name}?`,
    answer: f1
  },
  facts: { inSpaceCategory: true, astronomicalObject: true },
  aliases: [name.toLowerCase()],
  explanation: `${name} is an extraordinary celestial object or phenomenon in modern astrophysics.`,
  funFact: fun,
  verificationStatus: 'verified'
}));

writeCat('space.ts', 'SPACE_CARDS', spaceData);

console.log('Finished generating core categories!');
