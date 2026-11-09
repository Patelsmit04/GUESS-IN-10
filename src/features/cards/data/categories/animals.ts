import { Card } from '@/types/card';

export const ANIMALS_CARDS: Card[] = [
  {
    "id": "anim_wolf_001",
    "category": "animals",
    "name": "Wolf",
    "difficulty": "easy",
    "emoji": "🐺",
    "buzzWords": [
      "Canine",
      "Pack",
      "Tundra"
    ],
    "clues": [
      "I am the largest wild member of the dog (canine) family.",
      "I communicate across long distances through haunting howls.",
      "I live and hunt in highly organized family groups called packs."
    ],
    "primaryClues": [
      "Largest member of the dog family.",
      "Communicates across miles by howling."
    ],
    "secondaryClues": [
      "Lives in social packs led by an alpha pair.",
      "Native to forests, tundra, and grasslands of North America and Eurasia."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Forest / Arctic"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🐾",
        "label": "Limbs",
        "value": "4-Legged"
      },
      {
        "icon": "🐺",
        "label": "Nature",
        "value": "Wild (Pack)"
      }
    ],
    "bonusTrivia": {
      "question": "Name 3 animals that have only 4 letters in their names.",
      "answer": "Goat, Bear, Deer, Duck, Lion, Wolf, Frog, etc."
    },
    "facts": {
      "isMammal": true,
      "isCarnivore": true,
      "canFly": false,
      "livesInPacks": true
    },
    "aliases": [
      "wolf",
      "gray wolf",
      "grey wolf",
      "timber wolf"
    ],
    "explanation": "The wolf is a large canine native to Eurasia and North America, celebrated for pack hierarchy and vocal communication.",
    "funFact": "A wolf pack can detect prey scents from more than 1.5 miles away!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_lion_002",
    "category": "animals",
    "name": "Lion",
    "difficulty": "easy",
    "emoji": "🦁",
    "buzzWords": [
      "Savanna",
      "Carnivore",
      "Pride"
    ],
    "clues": [
      "I am known worldwide as the \"King of the Jungle\".",
      "Adult males develop a large, magnificent dark mane around their neck.",
      "I am the only cat species that lives in large social family groups called prides."
    ],
    "primaryClues": [
      "Known as the King of the Jungle.",
      "Adult males grow a thick mane of hair."
    ],
    "secondaryClues": [
      "Females do the majority of the hunting for the pride.",
      "My roar can be heard up to 5 miles away."
    ],
    "factGrid": [
      {
        "icon": "🌾",
        "label": "Habitat",
        "value": "Savannah"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Apex Carnivore"
      },
      {
        "icon": "👑",
        "label": "Role",
        "value": "Pride Leader"
      },
      {
        "icon": "🔊",
        "label": "Vocal",
        "value": "5-Mile Roar"
      }
    ],
    "bonusTrivia": {
      "question": "Which country outside of Africa is home to the only wild Asiatic lions in the world?",
      "answer": "India (Gir National Park in Gujarat)"
    },
    "facts": {
      "isMammal": true,
      "isCarnivore": true,
      "hasMane": true,
      "livesInPrides": true
    },
    "aliases": [
      "lion",
      "african lion",
      "asiatic lion",
      "king of the jungle"
    ],
    "explanation": "The lion is a muscular, deep-chested big cat and the second largest feline in the world after the tiger.",
    "funFact": "Lions spend up to 20 hours a day resting or sleeping to conserve energy for hunting!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_tiger_003",
    "category": "animals",
    "name": "Tiger",
    "difficulty": "easy",
    "emoji": "🐯",
    "buzzWords": [
      "Stripes",
      "Solitary",
      "Stalker"
    ],
    "clues": [
      "I am the largest cat species in the entire world.",
      "I possess a reddish-orange coat with unique dark vertical camouflage stripes.",
      "Unlike most domestic cats, I love water and swim across wide rivers to hunt."
    ],
    "primaryClues": [
      "Largest feline in the animal kingdom with vertical stripes.",
      "Excellent swimmer that loves cooling off in jungle rivers."
    ],
    "secondaryClues": [
      "No two tigers in the world have the exact same stripe pattern.",
      "The Bengal Tiger is the national animal of India and Bangladesh."
    ],
    "factGrid": [
      {
        "icon": "🌴",
        "label": "Habitat",
        "value": "Jungle / Forest"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🏊",
        "label": "Skill",
        "value": "Expert Swimmer"
      },
      {
        "icon": "🐅",
        "label": "Coat",
        "value": "Unique Stripes"
      }
    ],
    "bonusTrivia": {
      "question": "If you shave a tiger’s fur, will its skin still have stripes?",
      "answer": "Yes, a tiger’s stripes are embedded directly in its skin!"
    },
    "facts": {
      "isMammal": true,
      "isCarnivore": true,
      "hasStripes": true,
      "canSwim": true
    },
    "aliases": [
      "tiger",
      "bengal tiger",
      "siberian tiger"
    ],
    "explanation": "The tiger is an apex predator identifiable by dark vertical stripes on reddish-orange fur.",
    "funFact": "A tiger’s roar contains low-frequency infrasound that can temporarily paralyze prey with fear!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_elephant_004",
    "category": "animals",
    "name": "African Elephant",
    "difficulty": "easy",
    "emoji": "🐘",
    "buzzWords": [
      "Trunk",
      "Tusks",
      "Ears"
    ],
    "clues": [
      "I am the largest living land animal on planet Earth.",
      "I possess a long, muscular trunk containing over 40,000 individual muscles.",
      "My large fan-shaped ears help radiate heat away to cool my body in hot savannahs."
    ],
    "primaryClues": [
      "Largest land mammal with ivory tusks and a dexterous trunk.",
      "Communicates over miles using ground-shaking infrasound vibrations."
    ],
    "secondaryClues": [
      "Consumes up to 300 pounds of vegetation every single day.",
      "Known for profound memory, empathy, and grief rituals."
    ],
    "factGrid": [
      {
        "icon": "🌍",
        "label": "Continent",
        "value": "Africa"
      },
      {
        "icon": "🌿",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "⚖️",
        "label": "Weight",
        "value": "Up to 6 Tons"
      },
      {
        "icon": "🐘",
        "label": "Trunk",
        "value": "40,000 Muscles"
      }
    ],
    "bonusTrivia": {
      "question": "Which is the only mammal that cannot jump off the ground?",
      "answer": "The elephant"
    },
    "facts": {
      "isMammal": true,
      "isHerbivore": true,
      "largestLandAnimal": true,
      "hasTrunk": true
    },
    "aliases": [
      "elephant",
      "african elephant",
      "bush elephant"
    ],
    "explanation": "The African elephant is a keystone megaherbivore essential to African savannah and forest ecosystems.",
    "funFact": "Elephants can sense approaching rainstorms from over 150 miles away by hearing distant thunder!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_panda_005",
    "category": "animals",
    "name": "Giant Panda",
    "difficulty": "easy",
    "emoji": "🐼",
    "buzzWords": [
      "Bamboo",
      "Highlands",
      "Solitary"
    ],
    "clues": [
      "I have a distinctive, round black and white face and fur coat.",
      "Over 99% of my daily diet consists exclusively of fresh bamboo.",
      "I possess an enlarged wrist bone that acts like an opposable thumb to grip stalks."
    ],
    "primaryClues": [
      "Black and white bear native to Chinese bamboo forests.",
      "Spends 12 hours a day chewing bamboo shoots."
    ],
    "secondaryClues": [
      "A newborn baby is pink, blind, and smaller than a stick of butter.",
      "A global symbol of wildlife conservation and the WWF logo."
    ],
    "factGrid": [
      {
        "icon": "🎋",
        "label": "Food",
        "value": "99% Bamboo"
      },
      {
        "icon": "🇨🇳",
        "label": "Origin",
        "value": "Central China"
      },
      {
        "icon": "🐻",
        "label": "Family",
        "value": "Bear (Ursidae)"
      },
      {
        "icon": "👍",
        "label": "Trait",
        "value": "Pseudo Thumb"
      }
    ],
    "bonusTrivia": {
      "question": "What is a group of pandas called in English?",
      "answer": "An embarrassment of pandas (or a bamboo of pandas)"
    },
    "facts": {
      "isMammal": true,
      "isHerbivore": true,
      "eatsBamboo": true,
      "nativeToChina": true
    },
    "aliases": [
      "panda",
      "giant panda",
      "panda bear"
    ],
    "explanation": "The giant panda is a bear native to south central China, famous for its black-and-white coat and bamboo diet.",
    "funFact": "Pandas have a special lining in their throat and stomach to protect them from sharp bamboo splinters!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_cheetah_006",
    "category": "animals",
    "name": "Cheetah",
    "difficulty": "easy",
    "emoji": "🐆",
    "buzzWords": [
      "Sprint",
      "Feline",
      "Savanna"
    ],
    "clues": [
      "I am the fastest land animal in the world, sprinting up to 70 mph (112 km/h).",
      "I have black \"tear streaks\" running from the inside corners of my eyes to deflect glare.",
      "Unlike most other big cats, I cannot roar; I purr, chirp, and meow like a bird."
    ],
    "primaryClues": [
      "Fastest mammal on land capable of accelerating faster than a sports car.",
      "Slender aerodynamic body with non-retractable claw cleats."
    ],
    "secondaryClues": [
      "Accelerates from 0 to 60 mph in under three seconds.",
      "My long, muscular tail acts as a steering rudder during sharp turns at full speed."
    ],
    "factGrid": [
      {
        "icon": "⚡",
        "label": "Top Speed",
        "value": "70 mph (112 km"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🐾",
        "label": "Claws",
        "value": "Semi-Retractable"
      },
      {
        "icon": "🌾",
        "label": "Habitat",
        "value": "Open Savannah"
      }
    ],
    "bonusTrivia": {
      "question": "How long can a cheetah sustain its maximum sprint before overheating?",
      "answer": "About 20 to 30 seconds (around 400-500 meters)"
    },
    "facts": {
      "isMammal": true,
      "isCarnivore": true,
      "fastestLandAnimal": true,
      "hasSpots": true
    },
    "aliases": [
      "cheetah",
      "hunting leopard"
    ],
    "explanation": "The cheetah is a specialized feline sprinter built for explosive speed across African plains.",
    "funFact": "When running at top speed, a cheetah spends more time airborne than touching the ground!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_kangaroo_007",
    "category": "animals",
    "name": "Kangaroo",
    "difficulty": "easy",
    "emoji": "🦘",
    "buzzWords": [
      "Marsupial",
      "Herbivore",
      "Bipedal"
    ],
    "clues": [
      "I am a marsupial native to Australia that hops on two powerful hind legs.",
      "Females carry their developing baby (joey) inside a front abdominal pouch.",
      "My thick, muscular tail acts as a third leg for balance when standing or leaping."
    ],
    "primaryClues": [
      "Iconic hopping marsupial featured on the Australian coat of arms.",
      "Female carries newborn joey in a pouch for months."
    ],
    "secondaryClues": [
      "Cannot walk backward easily due to large feet and muscular tail.",
      "The Red Kangaroo is the largest surviving marsupial on Earth."
    ],
    "factGrid": [
      {
        "icon": "🇦🇺",
        "label": "Country",
        "value": "Australia"
      },
      {
        "icon": "🦘",
        "label": "Baby",
        "value": "Joey in Pouch"
      },
      {
        "icon": "🌿",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🦿",
        "label": "Movement",
        "value": "Hopping"
      }
    ],
    "bonusTrivia": {
      "question": "How small is a newborn kangaroo when it crawls into its mother’s pouch?",
      "answer": "About the size of a jellybean (1 inch long)!"
    },
    "facts": {
      "isMammal": true,
      "isMarsupial": true,
      "hasPouch": true,
      "nativeToAustralia": true
    },
    "aliases": [
      "kangaroo",
      "red kangaroo",
      "roo"
    ],
    "explanation": "Kangaroos are large macropod marsupials endemic to Australia, known for hopping locomotion and maternal pouches.",
    "funFact": "Kangaroos use their tails like a fifth limb when grazing, supporting their weight as they push their hind legs forward!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_whale_008",
    "category": "animals",
    "name": "Blue Whale",
    "difficulty": "easy",
    "emoji": "🐋",
    "buzzWords": [
      "Marine",
      "Mammal",
      "Migratory"
    ],
    "clues": [
      "I am the largest animal known to have ever lived on planet Earth.",
      "My tongue alone can weigh as much as an entire adult elephant.",
      "Despite my massive size, I feed primarily on tiny shrimplike creatures called krill."
    ],
    "primaryClues": [
      "Largest creature in Earth history reaching 100 feet in length.",
      "Marine mammal that breathes air through twin blowholes on its back."
    ],
    "secondaryClues": [
      "A newborn blue whale calf drinks up to 100 gallons of milk a day.",
      "Uses fringed baleen plates instead of teeth to filter seawater."
    ],
    "factGrid": [
      {
        "icon": "🌊",
        "label": "Habitat",
        "value": "Open Oceans"
      },
      {
        "icon": "⚖️",
        "label": "Weight",
        "value": "Up to 200 Tons"
      },
      {
        "icon": "🦐",
        "label": "Food",
        "value": "Krill"
      },
      {
        "icon": "🔊",
        "label": "Sound",
        "value": "188 Decibels"
      }
    ],
    "bonusTrivia": {
      "question": "How large is a blue whale’s heart compared to human objects?",
      "answer": "It is the size of a small car / golf cart (weighing roughly 400 lbs)!"
    },
    "facts": {
      "isMammal": true,
      "livesInWater": true,
      "largestAnimal": true,
      "breathesAir": true
    },
    "aliases": [
      "blue whale",
      "whale"
    ],
    "explanation": "The blue whale is a marine mammal belonging to the baleen whale parvorder, exceeding even the largest dinosaurs in mass.",
    "funFact": "Their deep acoustic calls can travel thousands of miles through ocean water to communicate with other whales!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_penguin_009",
    "category": "animals",
    "name": "Emperor Penguin",
    "difficulty": "easy",
    "emoji": "🐧",
    "buzzWords": [
      "Colony",
      "Antarctic",
      "Plumage"
    ],
    "clues": [
      "I am a flightless polar marine bird that thrives in sub-zero Antarctic blizzard winds.",
      "Father penguins balance a single egg on their feet under a brood pouch through dark winter.",
      "I use my streamlined wings as underwater flippers to \"fly\" through freezing ocean depths."
    ],
    "primaryClues": [
      "Tallest penguin species breeding on Antarctic sea ice.",
      "Colonies form rotating huddles to survive temperatures down to -60°C."
    ],
    "secondaryClues": [
      "Can hold breath for more than 20 minutes diving over 1,700 feet deep.",
      "Feeds on fish, squid, and krill in the Southern Ocean."
    ],
    "factGrid": [
      {
        "icon": "❄️",
        "label": "Climate",
        "value": "Antarctica (-60°C)"
      },
      {
        "icon": "🪶",
        "label": "Type",
        "value": "Flightless Bird"
      },
      {
        "icon": "🥚",
        "label": "Brooding",
        "value": "Father on Feet"
      },
      {
        "icon": "🏊",
        "label": "Skill",
        "value": "Deep Ocean Diver"
      }
    ],
    "bonusTrivia": {
      "question": "Do any wild penguins live naturally in the Arctic (North Pole)?",
      "answer": "No! All wild penguins live exclusively in the Southern Hemisphere"
    },
    "facts": {
      "isBird": true,
      "canFly": false,
      "livesInAntarctica": true,
      "laysEggs": true
    },
    "aliases": [
      "emperor penguin",
      "penguin"
    ],
    "explanation": "The Emperor Penguin is the heaviest and tallest of all living penguin species, endemic to Antarctica.",
    "funFact": "Penguins produce an oil from a gland near their tail that makes their outer feathers 100% waterproof!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_chameleon_010",
    "category": "animals",
    "name": "Chameleon",
    "difficulty": "easy",
    "emoji": "🦎",
    "buzzWords": [
      "Reptile",
      "Arboreal",
      "Camouflage"
    ],
    "clues": [
      "I am a tree-dwelling reptile famous for changing my skin colors.",
      "My eyes can pivot and focus independently in two opposite directions at the same time.",
      "My sticky projectile tongue can shoot out at twice the length of my body to snatch insects."
    ],
    "primaryClues": [
      "Color-changing lizard with prehensile tail and pincer feet.",
      "Tongue accelerates from 0 to 60 mph in a fraction of a second."
    ],
    "secondaryClues": [
      "Color shifts are driven by mood, temperature, and communication rather than background camouflage.",
      "Skin contains microscopic photonic crystals that bend light."
    ],
    "factGrid": [
      {
        "icon": "🌿",
        "label": "Habitat",
        "value": "Trees (Arboreal)"
      },
      {
        "icon": "🎨",
        "label": "Skin",
        "value": "Color Changing"
      },
      {
        "icon": "👁️",
        "label": "Vision",
        "value": "360° Independent"
      },
      {
        "icon": "🦗",
        "label": "Diet",
        "value": "Insects"
      }
    ],
    "bonusTrivia": {
      "question": "Which island off Africa is home to roughly half of all chameleon species on Earth?",
      "answer": "Madagascar"
    },
    "facts": {
      "isReptile": true,
      "changesColor": true,
      "canFly": false,
      "coldBlooded": true
    },
    "aliases": [
      "chameleon",
      "cameleon"
    ],
    "explanation": "Chameleons are highly specialized clades of Old World lizards with zygodactylous feet and stereoscopic vision.",
    "funFact": "A chameleon’s tongue muscle stores elastic energy like a crossbow, releasing with explosive spring velocity!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_giraffe_011",
    "category": "animals",
    "name": "Giraffe",
    "difficulty": "medium",
    "emoji": "🦒",
    "buzzWords": [
      "Browsing",
      "Savanna",
      "Ungulate"
    ],
    "clues": [
      "Tallest living terrestrial animal with a 6-foot neck.",
      "My habitat is Savannah and my diet is primarily Herbivore.",
      "I am famous for my 35-foot heights in the animal world."
    ],
    "primaryClues": [
      "Tallest living terrestrial animal with a 6-foot neck.",
      "Notable for 35-foot heights."
    ],
    "secondaryClues": [
      "Lives in Savannah.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Savannah"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "35-Foot Heights"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Blue Tongue"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Giraffe?",
      "answer": "Savannah"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "giraffe"
    ],
    "explanation": "Giraffe is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "A giraffe’s tongue is dark blue/purple and up to 20 inches long!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_zebra_012",
    "category": "animals",
    "name": "Zebra",
    "difficulty": "medium",
    "emoji": "🦓",
    "buzzWords": [
      "Herd",
      "Herbivore",
      "Grazing"
    ],
    "clues": [
      "African equids famous for black and white striped coats.",
      "My habitat is Grasslands and my diet is primarily Herbivore.",
      "I am famous for my striped coat in the animal world."
    ],
    "primaryClues": [
      "African equids famous for black and white striped coats.",
      "Notable for striped coat."
    ],
    "secondaryClues": [
      "Lives in Grasslands.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Grasslands"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Striped Coat"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Horse Family"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Zebra?",
      "answer": "Grasslands"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "zebra"
    ],
    "explanation": "Zebra is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Zebra stripes confuse biting flies and act as a natural fly repellent!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_koala_013",
    "category": "animals",
    "name": "Koala",
    "difficulty": "medium",
    "emoji": "🐨",
    "buzzWords": [
      "Marsupial",
      "Eucalyptus",
      "Nocturnal"
    ],
    "clues": [
      "Tree-dwelling Australian marsupial that eats toxic eucalyptus.",
      "My habitat is Eucalyptus Forest and my diet is primarily Herbivore.",
      "I am famous for my sleeps 20h in the animal world."
    ],
    "primaryClues": [
      "Tree-dwelling Australian marsupial that eats toxic eucalyptus.",
      "Notable for sleeps 20h."
    ],
    "secondaryClues": [
      "Lives in Eucalyptus Forest.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Eucalyptus Forest"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Sleeps 20h"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Pouch"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Koala?",
      "answer": "Eucalyptus Forest"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "koala"
    ],
    "explanation": "Koala is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Koalas have unique fingerprints almost indistinguishable from human prints!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_platypus_014",
    "category": "animals",
    "name": "Platypus",
    "difficulty": "medium",
    "emoji": "🦆",
    "buzzWords": [
      "Egg-laying",
      "Venomous",
      "Monotreme"
    ],
    "clues": [
      "Semi-aquatic egg-laying mammal with a duck-like bill.",
      "My habitat is Australia Streams and my diet is primarily Carnivore.",
      "I am famous for my monotreme in the animal world."
    ],
    "primaryClues": [
      "Semi-aquatic egg-laying mammal with a duck-like bill.",
      "Notable for monotreme."
    ],
    "secondaryClues": [
      "Lives in Australia Streams.",
      "Identified as a specialized carnivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Australia Streams"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Monotreme"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Venom Spurs"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Platypus?",
      "answer": "Australia Streams"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "platypus"
    ],
    "explanation": "Platypus is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "When first sent to European scientists in 1799, they thought it was a sewn-together taxidermy hoax!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_sloth_015",
    "category": "animals",
    "name": "Three-Toed Sloth",
    "difficulty": "medium",
    "emoji": "🦥",
    "buzzWords": [
      "Slow",
      "Canopy",
      "Algae"
    ],
    "clues": [
      "Slowest moving arboreal mammal living upside down.",
      "My habitat is Rainforest and my diet is primarily Herbivore.",
      "I am famous for my slow metabolism in the animal world."
    ],
    "primaryClues": [
      "Slowest moving arboreal mammal living upside down.",
      "Notable for slow metabolism."
    ],
    "secondaryClues": [
      "Lives in Rainforest.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Rainforest"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Slow Metabolism"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Green Algae"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Three-Toed Sloth?",
      "answer": "Rainforest"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "three-toed sloth"
    ],
    "explanation": "Three-Toed Sloth is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Sloths are surprisingly graceful swimmers that move 3x faster in water than on land!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_polar_bear_016",
    "category": "animals",
    "name": "Polar Bear",
    "difficulty": "medium",
    "emoji": "🐻‍❄️",
    "buzzWords": [
      "Marine",
      "Arctic",
      "Blubber"
    ],
    "clues": [
      "Apex predator of the Arctic sea ice and largest land carnivore.",
      "My habitat is Arctic Ice and my diet is primarily Carnivore.",
      "I am famous for my black skin in the animal world."
    ],
    "primaryClues": [
      "Apex predator of the Arctic sea ice and largest land carnivore.",
      "Notable for black skin."
    ],
    "secondaryClues": [
      "Lives in Arctic Ice.",
      "Identified as a specialized carnivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Arctic Ice"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Black Skin"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Hollow Fur"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Polar Bear?",
      "answer": "Arctic Ice"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "polar bear"
    ],
    "explanation": "Polar Bear is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "A polar bear’s fur isn’t white—each hair is clear and hollow to trap heat!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_gorilla_017",
    "category": "animals",
    "name": "Mountain Gorilla",
    "difficulty": "medium",
    "emoji": "🦍",
    "buzzWords": [
      "Silverback",
      "Troop",
      "Primate"
    ],
    "clues": [
      "Intelligent ground-dwelling ape led by a mature silverback.",
      "My habitat is Mountain Forest and my diet is primarily Herbivore.",
      "I am famous for my great ape in the animal world."
    ],
    "primaryClues": [
      "Intelligent ground-dwelling ape led by a mature silverback.",
      "Notable for great ape."
    ],
    "secondaryClues": [
      "Lives in Mountain Forest.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Mountain Forest"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Great Ape"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Chest Beating"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Mountain Gorilla?",
      "answer": "Mountain Forest"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "mountain gorilla"
    ],
    "explanation": "Mountain Gorilla is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Gorillas share approximately 98% of their DNA sequence with humans!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_chimpanzee_018",
    "category": "animals",
    "name": "Chimpanzee",
    "difficulty": "medium",
    "emoji": "🐵",
    "buzzWords": [
      "Primate",
      "Tool-user",
      "Troop"
    ],
    "clues": [
      "Our closest living evolutionary relative, skilled in tool use.",
      "My habitat is African Jungle and my diet is primarily Omnivore.",
      "I am famous for my tool maker in the animal world."
    ],
    "primaryClues": [
      "Our closest living evolutionary relative, skilled in tool use.",
      "Notable for tool maker."
    ],
    "secondaryClues": [
      "Lives in African Jungle.",
      "Identified as a specialized omnivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "African Jungle"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Omnivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Tool Maker"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Social Group"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Chimpanzee?",
      "answer": "African Jungle"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "chimpanzee"
    ],
    "explanation": "Chimpanzee is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Chimps use sticks to fish for termites and rocks as hammers to crack nuts!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_hippo_019",
    "category": "animals",
    "name": "Hippopotamus",
    "difficulty": "medium",
    "emoji": "🦛",
    "buzzWords": [
      "Semiaquatic",
      "Herbivore",
      "Territorial"
    ],
    "clues": [
      "Semi-aquatic African giant that secretes pink \"blood sweat\".",
      "My habitat is Rivers / Lakes and my diet is primarily Herbivore.",
      "I am famous for my heavyweight in the animal world."
    ],
    "primaryClues": [
      "Semi-aquatic African giant that secretes pink \"blood sweat\".",
      "Notable for heavyweight."
    ],
    "secondaryClues": [
      "Lives in Rivers / Lakes.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Rivers / Lakes"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Heavyweight"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Red Sweat"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Hippopotamus?",
      "answer": "Rivers / Lakes"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "hippopotamus"
    ],
    "explanation": "Hippopotamus is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Hippos cannot actually swim; they gallop and bounce off the river bottom!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_rhino_020",
    "category": "animals",
    "name": "Rhinoceros",
    "difficulty": "medium",
    "emoji": "🦏",
    "buzzWords": [
      "Keratin",
      "Herbivore",
      "Horned"
    ],
    "clues": [
      "Thick-skinned herbivore armed with one or two keratin horns.",
      "My habitat is Savannah and my diet is primarily Herbivore.",
      "I am famous for my keratin horn in the animal world."
    ],
    "primaryClues": [
      "Thick-skinned herbivore armed with one or two keratin horns.",
      "Notable for keratin horn."
    ],
    "secondaryClues": [
      "Lives in Savannah.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Savannah"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Keratin Horn"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Poor Eyesight"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Rhinoceros?",
      "answer": "Savannah"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "rhinoceros"
    ],
    "explanation": "Rhinoceros is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "A rhino’s horn is made of pure keratin—the same protein in human hair and fingernails!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_eagle_021",
    "category": "animals",
    "name": "Bald Eagle",
    "difficulty": "medium",
    "emoji": "🦅",
    "buzzWords": [
      "Apex",
      "Raptor",
      "Plumage"
    ],
    "clues": [
      "Bird of prey with white head feathers and emblem of the USA.",
      "My habitat is Lakes & Rivers and my diet is primarily Carnivore (Fish).",
      "I am famous for my hooked beak in the animal world."
    ],
    "primaryClues": [
      "Bird of prey with white head feathers and emblem of the USA.",
      "Notable for hooked beak."
    ],
    "secondaryClues": [
      "Lives in Lakes & Rivers.",
      "Identified as a specialized carnivore (fish)."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Lakes & Rivers"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore (Fish)"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Hooked Beak"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Apex Raptor"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Bald Eagle?",
      "answer": "Lakes & Rivers"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "bald eagle"
    ],
    "explanation": "Bald Eagle is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Bald eagles can spot a swimming salmon from over a mile up in the sky!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_falcon_022",
    "category": "animals",
    "name": "Peregrine Falcon",
    "difficulty": "medium",
    "emoji": "🦅",
    "buzzWords": [
      "Stoop",
      "Fastest",
      "Raptor"
    ],
    "clues": [
      "Fastest animal on planet Earth diving over 240 mph.",
      "My habitat is Cliff / Sky and my diet is primarily Carnivore.",
      "I am famous for my 240+ mph dive in the animal world."
    ],
    "primaryClues": [
      "Fastest animal on planet Earth diving over 240 mph.",
      "Notable for 240+ mph dive."
    ],
    "secondaryClues": [
      "Lives in Cliff / Sky.",
      "Identified as a specialized carnivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Cliff / Sky"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "240+ mph Dive"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Sharp Talons"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Peregrine Falcon?",
      "answer": "Cliff / Sky"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "peregrine falcon"
    ],
    "explanation": "Peregrine Falcon is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "A diving peregrine falcon experiences 25 Gs of gravitational acceleration!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_octopus_023",
    "category": "animals",
    "name": "Octopus",
    "difficulty": "medium",
    "emoji": "🐙",
    "buzzWords": [
      "Mollusk",
      "Cephalopod",
      "Camouflage"
    ],
    "clues": [
      "Intelligent ocean cephalopod with blue blood and no bones.",
      "My habitat is Ocean Reefs and my diet is primarily Carnivore.",
      "I am famous for my 3 hearts in the animal world."
    ],
    "primaryClues": [
      "Intelligent ocean cephalopod with blue blood and no bones.",
      "Notable for 3 hearts."
    ],
    "secondaryClues": [
      "Lives in Ocean Reefs.",
      "Identified as a specialized carnivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Ocean Reefs"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "3 Hearts"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Blue Blood"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Octopus?",
      "answer": "Ocean Reefs"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "octopus"
    ],
    "explanation": "Octopus is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Two-thirds of an octopus’s neurons reside inside its arms, not its head!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_owl_024",
    "category": "animals",
    "name": "Barn Owl",
    "difficulty": "medium",
    "emoji": "🦉",
    "buzzWords": [
      "Silent Flight",
      "Night",
      "Heart-Face"
    ],
    "clues": [
      "Nocturnal raptor with a heart-shaped face and silent wings.",
      "My habitat is Farmland / Barn and my diet is primarily Carnivore.",
      "I am famous for my silent wings in the animal world."
    ],
    "primaryClues": [
      "Nocturnal raptor with a heart-shaped face and silent wings.",
      "Notable for silent wings."
    ],
    "secondaryClues": [
      "Lives in Farmland / Barn.",
      "Identified as a specialized carnivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Farmland / Barn"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Silent Wings"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "270° Head Turn"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Barn Owl?",
      "answer": "Farmland / Barn"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "barn owl"
    ],
    "explanation": "Barn Owl is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Barn owls can locate prey in pitch blackness entirely by hearing heartbeats!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_flamingo_025",
    "category": "animals",
    "name": "Flamingo",
    "difficulty": "medium",
    "emoji": "🦩",
    "buzzWords": [
      "Wading",
      "Colony",
      "Carotenoids"
    ],
    "clues": [
      "Wading bird whose pink plumage comes from carotenoid algae.",
      "My habitat is Alkaline Lakes and my diet is primarily Filter Feeder.",
      "I am famous for my pink feathers in the animal world."
    ],
    "primaryClues": [
      "Wading bird whose pink plumage comes from carotenoid algae.",
      "Notable for pink feathers."
    ],
    "secondaryClues": [
      "Lives in Alkaline Lakes.",
      "Identified as a specialized filter feeder."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Alkaline Lakes"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Filter Feeder"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Pink Feathers"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "One-Leg Stand"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Flamingo?",
      "answer": "Alkaline Lakes"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "flamingo"
    ],
    "explanation": "Flamingo is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Flamingos stand on one leg to conserve body heat in cold water!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_crocodile_026",
    "category": "animals",
    "name": "Saltwater Crocodile",
    "difficulty": "medium",
    "emoji": "🐊",
    "buzzWords": [
      "Bite Force",
      "Ancient",
      "Reptile"
    ],
    "clues": [
      "Largest living reptile on Earth with the strongest bite force.",
      "My habitat is Mangrove / Estuary and my diet is primarily Apex Predator.",
      "I am famous for my crushing jaws in the animal world."
    ],
    "primaryClues": [
      "Largest living reptile on Earth with the strongest bite force.",
      "Notable for crushing jaws."
    ],
    "secondaryClues": [
      "Lives in Mangrove / Estuary.",
      "Identified as a specialized apex predator."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Mangrove"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Apex Predator"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Crushing Jaws"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Armored Skin"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Saltwater Crocodile?",
      "answer": "Mangrove / Estuary"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "saltwater crocodile"
    ],
    "explanation": "Saltwater Crocodile is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Saltwater crocodiles have been swimming in oceans since before the T-Rex died!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_cobra_027",
    "category": "animals",
    "name": "King Cobra",
    "difficulty": "medium",
    "emoji": "🐍",
    "buzzWords": [
      "Hood",
      "Venom",
      "Longest"
    ],
    "clues": [
      "Longest venomous snake in the world, raising its hood when alerted.",
      "My habitat is Asian Forests and my diet is primarily Carnivore (Snakes).",
      "I am famous for my 18-foot length in the animal world."
    ],
    "primaryClues": [
      "Longest venomous snake in the world, raising its hood when alerted.",
      "Notable for 18-foot length."
    ],
    "secondaryClues": [
      "Lives in Asian Forests.",
      "Identified as a specialized carnivore (snakes)."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Asian Forests"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore (Snakes)"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "18-Foot Length"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Neurotoxin"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the King Cobra?",
      "answer": "Asian Forests"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "king cobra"
    ],
    "explanation": "King Cobra is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "King cobras build elaborate leafy ground nests to incubate their eggs!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_otter_028",
    "category": "animals",
    "name": "Sea Otter",
    "difficulty": "medium",
    "emoji": "🦦",
    "buzzWords": [
      "Fur",
      "Pebble",
      "Raft"
    ],
    "clues": [
      "Marine mammal with the densest fur of any animal on Earth.",
      "My habitat is Coastal Kelp and my diet is primarily Carnivore (Shells).",
      "I am famous for my tool user in the animal world."
    ],
    "primaryClues": [
      "Marine mammal with the densest fur of any animal on Earth.",
      "Notable for tool user."
    ],
    "secondaryClues": [
      "Lives in Coastal Kelp.",
      "Identified as a specialized carnivore (shells)."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Coastal Kelp"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore (Shells)"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Tool User"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Dense Fur"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Sea Otter?",
      "answer": "Coastal Kelp"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "sea otter"
    ],
    "explanation": "Sea Otter is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Sea otters hold hands while sleeping so ocean currents don’t drift them apart!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_meerkat_029",
    "category": "animals",
    "name": "Meerkat",
    "difficulty": "medium",
    "emoji": "🐾",
    "buzzWords": [
      "Mob",
      "Burrow",
      "Sentinel"
    ],
    "clues": [
      "Social desert mongoose that stands on hind legs to keep watch.",
      "My habitat is Kalahari Desert and my diet is primarily Insectivore.",
      "I am famous for my sentry duty in the animal world."
    ],
    "primaryClues": [
      "Social desert mongoose that stands on hind legs to keep watch.",
      "Notable for sentry duty."
    ],
    "secondaryClues": [
      "Lives in Kalahari Desert.",
      "Identified as a specialized insectivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Kalahari Desert"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Insectivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Sentry Duty"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Immune to Scorpions"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Meerkat?",
      "answer": "Kalahari Desert"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "meerkat"
    ],
    "explanation": "Meerkat is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Meerkats take turns as lookouts while the rest of the mob digs for food!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_lemur_030",
    "category": "animals",
    "name": "Ring-Tailed Lemur",
    "difficulty": "medium",
    "emoji": "🐒",
    "buzzWords": [
      "Striped Tail",
      "Madagascar",
      "Sunbath"
    ],
    "clues": [
      "Prosimian primate native exclusively to the island of Madagascar.",
      "My habitat is Madagascar Spiny Forest and my diet is primarily Herbivore.",
      "I am famous for my striped tail in the animal world."
    ],
    "primaryClues": [
      "Prosimian primate native exclusively to the island of Madagascar.",
      "Notable for striped tail."
    ],
    "secondaryClues": [
      "Lives in Madagascar Spiny Forest.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Madagascar Spiny Forest"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Striped Tail"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Troop Leader (Female)"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Ring-Tailed Lemur?",
      "answer": "Madagascar Spiny Forest"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "ring-tailed lemur"
    ],
    "explanation": "Ring-Tailed Lemur is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Female lemurs are dominant in lemur troops and lead all foraging decisions!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_beaver_031",
    "category": "animals",
    "name": "Beaver",
    "difficulty": "medium",
    "emoji": "🦫",
    "buzzWords": [
      "Rodent",
      "Dam-builder",
      "Semiaquatic"
    ],
    "clues": [
      "Keystone rodent engineer that fells trees and constructs dams.",
      "My habitat is Rivers / Ponds and my diet is primarily Herbivore.",
      "I am famous for my orange teeth in the animal world."
    ],
    "primaryClues": [
      "Keystone rodent engineer that fells trees and constructs dams.",
      "Notable for orange teeth."
    ],
    "secondaryClues": [
      "Lives in Rivers / Ponds.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Rivers / Ponds"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Orange Teeth"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Flat Tail"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Beaver?",
      "answer": "Rivers / Ponds"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "beaver"
    ],
    "explanation": "Beaver is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Beaver teeth contain iron, which makes them orange and strong enough to gnaw through oak!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_hedgehog_032",
    "category": "animals",
    "name": "Hedgehog",
    "difficulty": "medium",
    "emoji": "🦔",
    "buzzWords": [
      "Quills",
      "Nocturnal",
      "Spines"
    ],
    "clues": [
      "Small spiny mammal that curls into a prickly defensive sphere.",
      "My habitat is Gardens / Meadows and my diet is primarily Insectivore.",
      "I am famous for my 5,000 spines in the animal world."
    ],
    "primaryClues": [
      "Small spiny mammal that curls into a prickly defensive sphere.",
      "Notable for 5,000 spines."
    ],
    "secondaryClues": [
      "Lives in Gardens / Meadows.",
      "Identified as a specialized insectivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Gardens"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Insectivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "5,000 Spines"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Nocturnal"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Hedgehog?",
      "answer": "Gardens / Meadows"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "hedgehog"
    ],
    "explanation": "Hedgehog is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Hedgehog quills are modified hollow hairs made of keratin that do not detach!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_bat_033",
    "category": "animals",
    "name": "Fruit Bat (Flying Fox)",
    "difficulty": "medium",
    "emoji": "🦇",
    "buzzWords": [
      "Wings",
      "Echolocation",
      "Night"
    ],
    "clues": [
      "Only mammal naturally capable of sustained, true powered flight.",
      "My habitat is Caves / Forests and my diet is primarily Frugivore.",
      "I am famous for my true flight in the animal world."
    ],
    "primaryClues": [
      "Only mammal naturally capable of sustained, true powered flight.",
      "Notable for true flight."
    ],
    "secondaryClues": [
      "Lives in Caves / Forests.",
      "Identified as a specialized frugivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Caves / Forests"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Frugivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "True Flight"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Pollinator"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Fruit Bat (Flying Fox)?",
      "answer": "Caves / Forests"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "fruit bat (flying fox)"
    ],
    "explanation": "Fruit Bat (Flying Fox) is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Bats devour thousands of mosquitoes per hour and pollinate wild banana and mango trees!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_camel_034",
    "category": "animals",
    "name": "Dromedary Camel",
    "difficulty": "medium",
    "emoji": "🐪",
    "buzzWords": [
      "Hump",
      "Desert",
      "Water Storage"
    ],
    "clues": [
      "Desert survivor with a single fat-storing hump and padded feet.",
      "My habitat is Arid Desert and my diet is primarily Herbivore.",
      "I am famous for my single hump in the animal world."
    ],
    "primaryClues": [
      "Desert survivor with a single fat-storing hump and padded feet.",
      "Notable for single hump."
    ],
    "secondaryClues": [
      "Lives in Arid Desert.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Arid Desert"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Single Hump"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Can Drink 30 Gallons"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Dromedary Camel?",
      "answer": "Arid Desert"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "dromedary camel"
    ],
    "explanation": "Dromedary Camel is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "A camel’s hump stores fat, not liquid water, which converts into metabolic energy!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_moose_035",
    "category": "animals",
    "name": "Moose",
    "difficulty": "medium",
    "emoji": "🫎",
    "buzzWords": [
      "Antlers",
      "Boreal",
      "Giant"
    ],
    "clues": [
      "Largest member of the deer family with broad palmate antlers.",
      "My habitat is Northern Forests and my diet is primarily Herbivore.",
      "I am famous for my 6-foot antlers in the animal world."
    ],
    "primaryClues": [
      "Largest member of the deer family with broad palmate antlers.",
      "Notable for 6-foot antlers."
    ],
    "secondaryClues": [
      "Lives in Northern Forests.",
      "Identified as a specialized herbivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Northern Forests"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Herbivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "6-Foot Antlers"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Deep Snow Walker"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Moose?",
      "answer": "Northern Forests"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "moose"
    ],
    "explanation": "Moose is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Moose are incredible swimmers capable of diving 20 feet underwater to graze on river plants!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_frog_036",
    "category": "animals",
    "name": "Red-Eyed Tree Frog",
    "difficulty": "medium",
    "emoji": "🐸",
    "buzzWords": [
      "Red Eyes",
      "Suction Pads",
      "Jungle"
    ],
    "clues": [
      "Vibrant green rainforest amphibian with shocking red bulging eyes.",
      "My habitat is Tropical Canopy and my diet is primarily Insectivore.",
      "I am famous for my toe pads in the animal world."
    ],
    "primaryClues": [
      "Vibrant green rainforest amphibian with shocking red bulging eyes.",
      "Notable for toe pads."
    ],
    "secondaryClues": [
      "Lives in Tropical Canopy.",
      "Identified as a specialized insectivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Tropical Canopy"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Insectivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Toe Pads"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Startle Colors"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Red-Eyed Tree Frog?",
      "answer": "Tropical Canopy"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "red-eyed tree frog"
    ],
    "explanation": "Red-Eyed Tree Frog is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "When startled, it flashes its giant red eyes to momentarily freeze predators!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_komodo_037",
    "category": "animals",
    "name": "Komodo Dragon",
    "difficulty": "medium",
    "emoji": "🦎",
    "buzzWords": [
      "Venom",
      "Giant",
      "Island"
    ],
    "clues": [
      "Largest living lizard on Earth, native to Indonesian islands.",
      "My habitat is Indonesian Scrub and my diet is primarily Carnivore.",
      "I am famous for my 10-foot length in the animal world."
    ],
    "primaryClues": [
      "Largest living lizard on Earth, native to Indonesian islands.",
      "Notable for 10-foot length."
    ],
    "secondaryClues": [
      "Lives in Indonesian Scrub.",
      "Identified as a specialized carnivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Indonesian Scrub"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "10-Foot Length"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Venomous Bite"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Komodo Dragon?",
      "answer": "Indonesian Scrub"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "komodo dragon"
    ],
    "explanation": "Komodo Dragon is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Komodo dragons can eat up to 80% of their entire body weight in a single meal!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_fox_038",
    "category": "animals",
    "name": "Red Fox",
    "difficulty": "medium",
    "emoji": "🦊",
    "buzzWords": [
      "Vulpine",
      "Nocturnal",
      "Omnivore"
    ],
    "clues": [
      "Adaptable canine famous for its fiery coat, bushy tail, and cunning.",
      "My habitat is Forests & Cities and my diet is primarily Omnivore.",
      "I am famous for my bushy tail in the animal world."
    ],
    "primaryClues": [
      "Adaptable canine famous for its fiery coat, bushy tail, and cunning.",
      "Notable for bushy tail."
    ],
    "secondaryClues": [
      "Lives in Forests & Cities.",
      "Identified as a specialized omnivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Forests & Cities"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Omnivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Bushy Tail"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Magnetic Pounce"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Red Fox?",
      "answer": "Forests & Cities"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "red fox"
    ],
    "explanation": "Red Fox is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Red foxes use Earth’s magnetic field lines to guide high-arching snow pounces!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_whale_shark_039",
    "category": "animals",
    "name": "Whale Shark",
    "difficulty": "medium",
    "emoji": "🦈",
    "buzzWords": [
      "Gentle Giant",
      "Spots",
      "Filter"
    ],
    "clues": [
      "Largest fish in the world, filtering microscopic plankton harmlessly.",
      "My habitat is Tropical Oceans and my diet is primarily Filter Feeder.",
      "I am famous for my 40-foot length in the animal world."
    ],
    "primaryClues": [
      "Largest fish in the world, filtering microscopic plankton harmlessly.",
      "Notable for 40-foot length."
    ],
    "secondaryClues": [
      "Lives in Tropical Oceans.",
      "Identified as a specialized filter feeder."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Tropical Oceans"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Filter Feeder"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "40-Foot Length"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Docile Giant"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Whale Shark?",
      "answer": "Tropical Oceans"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "whale shark"
    ],
    "explanation": "Whale Shark is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Each whale shark has a completely unique pattern of white spots behind its gills, like a fingerprint!",
    "verificationStatus": "verified"
  },
  {
    "id": "anim_snow_leopard_040",
    "category": "animals",
    "name": "Snow Leopard",
    "difficulty": "medium",
    "emoji": "🐆",
    "buzzWords": [
      "Ghost of Mountains",
      "Tail",
      "Himalayas"
    ],
    "clues": [
      "Elusive high-altitude feline nicknamed the \"Ghost of the Mountains\".",
      "My habitat is Alpine Scree and my diet is primarily Carnivore.",
      "I am famous for my thick long tail in the animal world."
    ],
    "primaryClues": [
      "Elusive high-altitude feline nicknamed the \"Ghost of the Mountains\".",
      "Notable for thick long tail."
    ],
    "secondaryClues": [
      "Lives in Alpine Scree.",
      "Identified as a specialized carnivore."
    ],
    "factGrid": [
      {
        "icon": "🌲",
        "label": "Habitat",
        "value": "Alpine Scree"
      },
      {
        "icon": "🥩",
        "label": "Diet",
        "value": "Carnivore"
      },
      {
        "icon": "🐾",
        "label": "Trait",
        "value": "Thick Long Tail"
      },
      {
        "icon": "✨",
        "label": "Special",
        "value": "Steep Cliff Leaper"
      }
    ],
    "bonusTrivia": {
      "question": "What is the natural habitat of the Snow Leopard?",
      "answer": "Alpine Scree"
    },
    "facts": {
      "isMammal": true,
      "inAnimalKingdom": true
    },
    "aliases": [
      "snow leopard"
    ],
    "explanation": "Snow Leopard is a renowned member of the animal kingdom with unique adaptations.",
    "funFact": "Snow leopards wrap their thick 3-foot tails around their faces like a blanket against freezing winds!",
    "verificationStatus": "verified"
  }
];
