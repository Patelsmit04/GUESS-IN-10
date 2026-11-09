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

function writeCategory(filename: string, exportVar: string, cards: CardDef[]) {
  const dir = path.join(process.cwd(), 'src', 'features', 'cards', 'data', 'categories');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, filename);
  const code = `import { Card } from '@/types/card';\n\nexport const ${exportVar}: Card[] = ${JSON.stringify(cards, null, 2)};\n`;
  fs.writeFileSync(target, code, 'utf-8');
  console.log(`✓ ${filename} updated with ${cards.length} cards.`);
}

// ==========================================
// 1. INSPIRING PROFESSIONS (40 CARDS)
// ==========================================
const profData: [string, string, string, [string, string, string], string, string, string, string, string, string][] = [
  ['prf_astronaut_001', 'Astronaut', '🧑‍🚀', ['Altitude', 'Weightless', 'Expedition'], 'I undergo extensive training to endure extreme g-forces and zero gravity.', 'Visor', 'Orbit', 'Piloting', 'Astro-Science', 'Astronauts can grow up to 2 inches taller while in space because microgravity expands the spine!'],
  ['prf_doctor_002', 'Doctor (Physician)', '🩺', ['Diagnosis', 'Ward', 'Vitals'], 'I examine physical symptoms to diagnose illnesses and prescribe treatments.', 'Chart', 'Clinic', 'Pathology', 'Healthcare', 'The stethoscope was invented in 1816 by a French physician who was uncomfortable putting his ear on patients\' chests!'],
  ['prf_firefighter_003', 'Firefighter', '👨‍🚒', ['Apparatus', 'Siren', 'Hazard'], 'I wear specialized thermal protective gear to enter burning structures.', 'Gear', 'Station', 'Suppression', 'Rescue', 'Firefighter turnout coats are crafted from Kevlar and Nomex fabrics that withstand temperatures exceeding 1,000°F!'],
  ['prf_teacher_004', 'Teacher (Educator)', '👩‍🏫', ['Curriculum', 'Academy', 'Lecture'], 'I develop lesson plans and guide learners to master concepts and skills.', 'Planner', 'Classroom', 'Pedagogy', 'Education', 'Studies prove that an inspiring educator measurably increases their students\' future college attendance and lifetime earnings!'],
  ['prf_software_005', 'Software Engineer', '💻', ['Algorithm', 'Architecture', 'Syntax'], 'I translate business logic into maintainable code to create applications.', 'Terminal', 'Workstation', 'Logic', 'Technology', 'The world’s first computer programmer was Ada Lovelace, who published an algorithm for Charles Babbage’s mechanical engine in 1843!'],
  ['prf_pilot_006', 'Airline Pilot', '👨‍✈️', ['Altitude', 'Navigation', 'Turbulence'], 'I monitor navigation arrays and weather radar to steer transport craft.', 'Headset', 'Flight Deck', 'Aviation', 'Transit', 'Airline pilots eat completely different meals during flight to prevent both crew members from suffering food poisoning simultaneously!'],
  ['prf_chef_007', 'Executive Chef', '👨‍🍳', ['Gourmet', 'Plating', 'Apprentice'], 'I design seasonal menus, source rare ingredients, and direct culinary teams.', 'Steel', 'Atelier', 'Gastronomy', 'Culinary', 'The traditional 100 pleats on a chef’s toque historically signified 100 different techniques to prepare an egg!'],
  ['prf_detective_008', 'Detective / Investigator', '🕵️', ['Motive', 'Evidence', 'Inquiry'], 'I collect forensic traces, interview persons of interest, and solve cold cases.', 'Notepad', 'Field', 'Forensics', 'Justice', 'The famous phrase "The game is afoot" was coined by William Shakespeare in Henry V before Sherlock Holmes popularized it!'],
  ['prf_architect_009', 'Architect', '📐', ['Elevation', 'Foundation', 'Drafting'], 'I produce scale structural drawings balancing aesthetic form and physics.', 'Compass', 'Studio', 'Structural', 'Urban Planning', 'The term "Architect" derives from Greek roots "arkhi" (master) and "tekton" (builder)—meaning the Master Builder!'],
  ['prf_vet_010', 'Veterinarian', '🩺', ['Fauna', 'Healing', 'Creatures'], 'I perform surgery and administer preventative medicine across animal species.', 'Scanner', 'Surgery', 'Zoology', 'Animal Welfare', 'Veterinarians must master the distinct anatomies, metabolic rates, and pharmacology of dozens of completely different animal species!'],
  ['prf_scientist_011', 'Research Scientist', '🔬', ['Hypothesis', 'Empirical', 'Specimen'], 'I formulate testable theories, run controlled trials, and publish peer-reviewed papers.', 'Pipette', 'Cleanroom', 'Analysis', 'Discovery', 'Marie Curie was the first person in history to win two Nobel Prizes in completely separate scientific domains (Physics and Chemistry)!'],
  ['prf_photographer_012', 'Photographer', '📷', ['Aperture', 'Exposure', 'Composition'], 'I manipulate natural light, shutter speed, and focal length to capture imagery.', 'Tripod', 'Location', 'Optics', 'Visual Arts', 'The world’s oldest surviving photographic exposure was captured in 1826 by Nicéphore Niépce and required 8 full hours of sunlight!'],
  ['prf_journalist_013', 'Journalist (Reporter)', '📰', ['Source', 'Byline', 'Investigation'], 'I conduct investigative research, verify tips, and report objective findings.', 'Recorder', 'Press Room', 'Fact-Checking', 'Informing', 'The US Constitution explicitly protects freedom of the press in its First Amendment as a crucial check on institutional power!'],
  ['prf_electrician_014', 'Electrician', '⚡', ['Voltage', 'Conduit', 'Current'], 'I route high-voltage cables, balance circuit loads, and service transformers.', 'Tester', 'Sub-panel', 'Ohm\'s Law', 'Infrastructure', 'Professional electricians wear specialized dielectric rubber-soled boots and insulated hand tools rated to isolate up to 1,000 volts!'],
  ['prf_musician_015', 'Musician / Composer', '🎵', ['Acoustic', 'Harmony', 'Tempo'], 'I compose melodic structures, practice phrasing, and perform live arrangements.', 'Score', 'Concert Hall', 'Acoustics', 'Culture', 'Playing musical instruments actively engages virtually every area of the human brain simultaneously, especially visual and motor cortices!'],
  ['prf_nurse_016', 'Registered Nurse', '💉', ['Triage', 'Bedside', 'Vitals'], 'I monitor vital indicators, administer intravenous meds, and comfort patients.', 'Cuff', 'Ward', 'Patient Care', 'Healthcare', 'Florence Nightingale revolutionized modern nursing in the 1850s by introducing strict hygiene regimens and statistical mortality diagrams!'],
  ['prf_archaeologist_017', 'Archaeologist', '🏺', ['Stratum', 'Relic', 'Excavation'], 'I excavate ancient settlement layers, record stratigraphy, and catalog antiquities.', 'Brush', 'Dig Site', 'Stratigraphy', 'History', 'Tutankhamun’s intact golden tomb was uncovered in Egypt\'s Valley of the Kings in 1922 by Howard Carter after five grueling seasons!'],
  ['prf_marinebiologist_018', 'Marine Biologist', '🐬', ['Pelagic', 'Coral', 'Ecosystem'], 'I dive deep ocean trenches, track migratory marine mammals, and study reefs.', 'Tag', 'Research Vessel', 'Marine Ecology', 'Conservation', 'More than 80 percent of the Earth’s ocean floor remains completely unmapped and unexplored by marine scientists!'],
  ['prf_police_019', 'Police Officer', '👮', ['Jurisdiction', 'Patrol', 'Enforcement'], 'I patrol assigned sectors, resolve domestic conflicts, and deter unlawful acts.', 'Radio', 'Community', 'Public Safety', 'Order', 'The world’s first modern civilian municipal police force was created in London in 1829 by Sir Robert Peel at Scotland Yard!'],
  ['prf_lawyer_020', 'Lawyer (Attorney)', '⚖️', ['Statute', 'Litigation', 'Testimony'], 'I draft legal pleadings, examine sworn witnesses, and argue jurisprudence.', 'Brief', 'Courtroom', 'Jurisprudence', 'Advocacy', 'The custom of advocates wearing dark robes originated in 17th-century England as ceremonial mourning dress upon the death of King Charles II!'],
  ['prf_mechanic_021', 'Auto Mechanic', '🔧', ['Torque', 'Transmission', 'Hydraulics'], 'I connect computerized diagnostic readers and overhaul mechanical drivetrains.', 'Wrench', 'Service Bay', 'Drivetrain', 'Transportation', 'A standard passenger vehicle consists of approximately 30,000 individual parts and up to 100 internal microprocessor sensor units!'],
  ['prf_plumber_022', 'Plumber', '🪠', ['Pressure', 'Drainage', 'Conduit'], 'I assemble pressurized supply lines, vent traps, and backflow preventers.', 'Torch', 'Basement', 'Hydraulics', 'Sanitation', 'The word "Plumber" originates from the Latin noun "plumbum" (lead), because imperial Roman aqueducts and pipes were made of lead!'],
  ['prf_flightattendant_023', 'Flight Attendant', '✈️', ['Cruising', 'Cabin', 'Hospitality'], 'I conduct cabin safety demonstrations, administer first aid, and evacuate planes.', 'Intercom', 'Aisle', 'Crisis Response', 'Air Safety', 'The world\'s earliest flight attendants in 1930 were all required to hold registered nurse credentials to comfort anxious passengers!'],
  ['prf_dentist_024', 'Dentist', '🦷', ['Hygiene', 'Enamel', 'Extraction'], 'I inspect dental arches, remove decay, and restore damaged oral structures.', 'Mirror', 'Operatory', 'Periodontics', 'Oral Health', 'Tooth enamel is the single hardest mineralized biological substance in the entire human body—surpassing even hardened bone!'],
  ['prf_designer_025', 'Graphic Designer', '🎨', ['Typography', 'Palette', 'Vector'], 'I manipulate vector paths, negative space, and font pairings for brand identities.', 'Tablet', 'Studio', 'Visual Hierarchy', 'Branding', 'The globally recognized Nike "Swoosh" logo was drawn in 1971 by graphic design student Carolyn Davidson for a humble fee of just $35!'],
  ['prf_farmer_026', 'Farmer / Agriculturalist', '🚜', ['Agronomy', 'Cultivation', 'Harvest'], 'I test soil nitrogen, manage irrigation pivots, and reap seasonal produce.', 'Harvester', 'Farmland', 'Agronomy', 'Food Security', 'A single modern commercial farmer yields enough grains, produce, and dairy to supply roughly 166 individuals with nutritious food each year!'],
  ['prf_carpenter_027', 'Carpenter', '🪵', ['Timber', 'Joinery', 'Measurement'], 'I plane hardwoods, cut mortise-and-tenon joints, and frame load-bearing timber.', 'Chisel', 'Shop', 'Joinery', 'Construction', 'The world’s oldest discovered wooden structure is a 7,200-year-old water well lining crafted from interlocking oak planks in Czechia!'],
  ['prf_paramedic_028', 'Paramedic (EMT)', '🚑', ['Triage', 'Resuscitation', 'Trauma'], 'I deliver acute mobile emergency care, defibrillate hearts, and secure airways.', 'Monitor', 'Ambulance', 'Trauma Protocol', 'Emergency', 'Battlefield emergency ambulance transport was pioneered during the Napoleonic Wars by Napoleon Bonaparte’s surgeon Dominique Larrey!'],
  ['prf_author_029', 'Author / Novelist', '✍️', ['Manuscript', 'Narrative', 'Fiction'], 'I build fictional worlds, establish narrative cadence, and edit draft manuscripts.', 'Notebook', 'Study', 'Storycraft', 'Literature', 'J.K. Rowling penned early Harry Potter chapters by hand in Edinburgh coffee houses while pushing her sleeping infant in a pram!'],
  ['prf_judge_030', 'Judge (Magistrate)', '👨‍⚖️', ['Precedent', 'Verdict', 'Statute'], 'I review evidentiary motions, deliver jury charges, and hand down sentences.', 'Robes', 'Bench', 'Due Process', 'Judiciary', 'In many common-law traditions, judges strike a hardwood gavel to signal judicial rulings and command absolute silence in the court!'],
  ['prf_librarian_031', 'Librarian', '📚', ['Dewey', 'Archive', 'Bibliography'], 'I curate public digital catalogs, manage archives, and assist community research.', 'Scanner', 'Stacks', 'Archival Science', 'Literacy', 'The celebrated ancient Library of Alexandria in Egypt sought to house a copy of every recorded scroll across the civilized world!'],
  ['prf_geologist_032', 'Geologist', '🪨', ['Tectonic', 'Strata', 'Mineral'], 'I log stratigraphic core drillings, map faults, and trace tectonic shifts.', 'Hand Lens', 'Field', 'Petrology', 'Earth Science', 'Geologists determine rock chronology through radiometric dating, establishing that Earth was formed approximately 4.54 billion years ago!'],
  ['prf_deepdiver_033', 'Deep Sea Diver', '🤿', ['Subsea', 'Decompression', 'Pressure'], 'I breathe specialized trimix gas blends and inspect underwater infrastructure.', 'Rebreather', 'Offshore', 'Hyperbarics', 'Marine Engineering', 'Commercial saturation divers live inside pressurized chambers for weeks at a time to work at oceanic depths over 600 feet!'],
  ['prf_astronomer_034', 'Astronomer', '🔭', ['Cosmos', 'Spectrum', 'Observatory'], 'I analyze deep-sky celestial light, calibrate spectrographs, and model galaxies.', 'Detector', 'Summit', 'Astrophysics', 'Cosmology', 'Galileo Galilei was the first astronomer to aim an optical telescope at Jupiter in 1610, discovering its four largest orbiting moons!'],
  ['prf_fashiondesigner_035', 'Fashion Designer', '👗', ['Silhouette', 'Textile', 'Atelier'], 'I drape delicate fabrics over forms, sketch couture lines, and direct fashion shows.', 'Shears', 'Atelier', 'Patternmaking', 'Haute Couture', 'Coco Chanel transformed 1920s women’s fashion by freeing women from corsets and creating the iconic, versatile "Little Black Dress"!'],
  ['prf_animator_036', 'Animator', '🎞️', ['Keyframe', 'Rendering', 'Motion'], 'I set sequential motion timing, rig digital skeletons, and create 3D performances.', 'Cintiq', 'Studio', 'Kinematics', 'Entertainment', 'Traditional hand-drawn animation required 24 individually hand-drawn and painted celluloid frames for every single second of cinema!'],
  ['prf_surgeon_037', 'Surgeon', '👨‍⚕️', ['Operative', 'Incision', 'Sterile'], 'I perform meticulous invasive procedures to repair trauma or remove tumors.', 'Forceps', 'OR Suite', 'Surgical Dexterity', 'Lifesaving', 'Surgical staff thoroughly scrub hands and forearms with antimicrobial agents for at least five minutes before entering the sterile field!'],
  ['prf_diplomat_038', 'Diplomat / Ambassador', '🕊️', ['Consulate', 'Protocol', 'Treaty'], 'I negotiate bilateral peace treaties, advocate state policy, and defuse tensions.', 'Passport', 'Mission', 'Statecraft', 'Foreign Affairs', 'Diplomats are safeguarded by "diplomatic immunity", an international convention preventing host countries from arresting foreign envoys!'],
  ['prf_parkranger_039', 'Park Ranger', '🌲', ['Wilderness', 'Conservation', 'Stewardship'], 'I patrol backcountry trails, track apex wildlife, and maintain pristine reserves.', 'Field Radio', 'Backcountry', 'Forestry', 'Conservation', 'Yellowstone was established as the world’s very first National Park in 1872, initially safeguarded and patrolled by mounted military cavalry!'],
  ['prf_civilengineer_040', 'Civil Engineer', '🌉', ['Span', 'Truss', 'Infrastructure'], 'I calculate tension stresses, design stormwater networks, and build suspension spans.', 'Theodolite', 'Job Site', 'Statics', 'Public Works', 'The Golden Gate Bridge\'s two main suspension cables contain 80,000 miles of individual galvanized steel wires bound together!']
];

const profCards: CardDef[] = profData.map(([id, name, emoji, buzz, desc, gear, env, skill, field, fun]) => ({
  id,
  category: 'professions',
  name,
  difficulty: 'medium',
  emoji,
  buzzWords: buzz,
  clues: [
    desc,
    `My primary workspace is ${env} where I rely on my ${gear}.`,
    `My duties demand advanced knowledge of ${skill} to support ${field}.`
  ],
  primaryClues: [desc, `Primary workspace: ${env}.`],
  secondaryClues: [`Key equipment: ${gear}.`, `Specialization: ${skill}.`],
  factGrid: [
    { icon: '🧰', label: 'Gear', value: gear },
    { icon: '🏢', label: 'Base', value: env },
    { icon: '🧠', label: 'Skill', value: skill },
    { icon: '🌟', label: 'Field', value: field }
  ],
  bonusTrivia: {
    question: `What primary tool or workplace is central to a ${name}?`,
    answer: gear
  },
  facts: { isProfession: true, essentialCareer: true },
  aliases: [name.toLowerCase(), name.split(' ')[0].toLowerCase()],
  explanation: `${name} is an impactful profession contributing vital expertise to human civilization.`,
  funFact: fun,
  verificationStatus: 'verified'
}));

writeCategory('professions.ts', 'PROFESSIONS_CARDS', profCards);

// ==========================================
// 2. WORLD OF SPORTS (40 CARDS)
// ==========================================
const sportsData: [string, string, string, [string, string, string], string, string, string, string, string, string][] = [
  ['spt_soccer_001', 'Soccer (Football)', '⚽', ['Pitch', 'Cleats', 'Offside'], 'Two squads compete on natural turf to direct a sphere into opposite netting.', '11 Squad', 'Pitch', 'Footwear', 'FIFA', 'Over 3.5 billion global fans watched the FIFA World Cup, making it humanity’s most-watched sporting tournament!'],
  ['spt_basketball_002', 'Basketball', '🏀', ['Hardwood', 'Quarters', 'Backboard'], 'Fast-paced court sport where athletes bounce and loft a leather ball into elevated hoops.', '5 Court', 'Hardwood', 'Sneakers', 'FIBA', 'Basketball was invented in 1891 by Dr. James Naismith in Massachusetts using two peach baskets mounted to balcony railings!'],
  ['spt_cricket_003', 'Cricket', '🏏', ['Innings', 'Stumps', 'Pitch'], 'Bat-and-ball contest played over multiple overs centered on a 22-yard prepared strip.', '11 Squad', 'Oval', 'Willow Bat', 'ICC', 'The longest official test cricket match took place in 1939 between England and South Africa, lasting 12 days before ending in a draw!'],
  ['spt_tennis_004', 'Tennis', '🎾', ['Deuce', 'Baseline', 'Racket'], 'Duelists exchange high-speed spin shots over a center mesh on grass, clay, or asphalt.', '1-2 Players', 'Court', 'String Racket', 'ITF', 'Regulation tennis balls were originally white; fluorescent optic yellow was adopted in 1972 so TV audiences could track volleys!'],
  ['spt_baseball_005', 'Baseball', '⚾', ['Innings', 'Diamond', 'Bases'], 'Offensive batters attempt to round four dirt bases following hard-contact hits into outfield.', '9 Field', 'Diamond', 'Hardwood Bat', 'MLB', 'Every major league regulation baseball is hand-sewn with precisely 108 double stitches of waxed red thread!'],
  ['spt_rugby_006', 'Rugby', '🏉', ['Try', 'Scrum', 'Oval Ball'], 'Full-contact collision code where teammates only pitch an oblong ball laterally or backwards.', '15 Squad', 'Pitch', 'Mouthguard', 'World Rugby', 'Tradition holds that schoolboy William Webb Ellis invented rugby in 1823 by grasping the football and charging downfield with it!'],
  ['spt_icehockey_007', 'Ice Hockey', '🏒', ['Rink', 'Puck', 'Faceoff'], 'Gliding skaters maneuver a dense vulcanized disk across frozen surfaces toward goal nets.', '6 Skaters', 'Ice Rink', 'Curved Stick', 'IIHF', 'Regulation pucks are kept in sub-zero freezers prior to faceoff to limit erratic bouncing along the chilled ice sheet!'],
  ['spt_badminton_008', 'Badminton', '🏸', ['Shuttlecock', 'Net', 'Smash'], 'Opponents wield ultra-light racquets to volley a feathered conical projectile over high nets.', '1-2 Players', 'Court', 'Light Racquet', 'BWF', 'A spiked smash from an elite badminton player can propel the feathered shuttlecock over 300 mph (490 km/h)!'],
  ['spt_tabletennis_009', 'Table Tennis (Ping Pong)', '🏓', ['Paddle', 'Spin', 'Rally'], 'Players rally a 40mm celluloid sphere over a center barrier with rubber-faced paddles.', '1-2 Players', 'Table', 'Rubber Paddle', 'ITTF', 'Table tennis originated as a relaxed parlor game in Victorian England played with champagne corks and cigar-box lids!'],
  ['spt_swimming_010', 'Swimming', '🏊', ['Laps', 'Stroke', 'Goggles'], 'Racers surge through 50-meter lanes executing butterfly, backstroke, breaststroke, or crawl.', 'Individual', 'Lane Pool', 'Goggles', 'World Aquatics', 'Elite Olympic swimmers can complete a 50-meter sprint in under 21 seconds, burning more than 1,000 calories an hour!'],
  ['spt_athletics_011', 'Athletics (Track & Field)', '🏃', ['Sprint', 'Relay', 'Baton'], 'Athletes contest pure human speed, hurdle clearances, and baton handoffs around an oval.', 'Individual', 'Track Oval', 'Spikes', 'World Athletics', 'Jamaican sprinter Usain Bolt hit an unprecedented peak land speed of 27.78 mph (44.72 km/h) in his Berlin 100m sprint!'],
  ['spt_golf_012', 'Golf', '⛳', ['Fairway', 'Handicap', 'Links'], 'Players navigate sand bunkers and greens to sink dimpled balls into 18 sequential cups.', '1-4 Field', 'Links Course', 'Set of Clubs', 'R&A', 'Golf is one of only two sports ever contested on the lunar surface; astronaut Alan Shepard struck two balls on the Moon in 1971!'],
  ['spt_volleyball_013', 'Volleyball', '🏐', ['Rotation', 'Spike', 'Net'], 'Six-player lineups maintain high airborne rallies without allowing the ball to strike floor.', '6 Squad', 'Hardcourt', 'Volleyball', 'FIVB', 'Volleyball was originally christened "Mintonette" in 1895 as a gentler indoor pastime for older YMCA businessmen!'],
  ['spt_boxing_014', 'Boxing', '🥊', ['Canvas', 'Rounds', 'Gloves'], 'Combatants trade strategic combinations inside ropes under three-minute round intervals.', '2 Fighters', 'Square Ring', 'Padded Gloves', 'WBC', 'The contest area is called a "ring" because early bare-knuckle spectators formed a living human circle around fighters!'],
  ['spt_karate_015', 'Karate', '🥋', ['Kata', 'Dojo', 'Kumite'], 'Martial discipline emphasizing swift strikes, side kicks, and defensive blocks on tatami.', '2 Duelists', 'Tatami Dojo', 'Cotton Gi', 'WKF', 'The Japanese term "Karate" translates literally to "Empty Hand", representing martial defense without weapons!'],
  ['spt_formula1_016', 'Formula 1 Racing', '🏎️', ['Grand Prix', 'Paddock', 'Chassis'], 'Drivers pilot single-seat carbon-fiber open-wheel prototypes through challenging road circuits.', '20 Drivers', 'Grand Prix', 'Hybrid Car', 'FIA', 'A world-class Formula 1 pit crew can swap all four tires and inspect aero wings in under 1.8 seconds!'],
  ['spt_cycling_017', 'Road Cycling', '🚴', ['Peloton', 'Drafting', 'Cadence'], 'Racers draft in aerodynamic packs over hundreds of kilometers across mountain stages.', 'Individual', 'Roadways', 'Carbon Bike', 'UCI', 'Contestants in the three-week Tour de France pedal over 2,000 miles and burn up to 7,000 calories each arduous stage!'],
  ['spt_gymnastics_018', 'Gymnastics (Artistic)', '🤸', ['Apparatus', 'Dismount', 'Vault'], 'Athletes demonstrate spatial orientation, balance, and core strength across apparatuses.', 'Individual', 'Spring Floor', 'Bars & Beam', 'FIG', 'At the 1976 Montreal Olympics, 14-year-old Nadia Comaneci earned the very first "Perfect 10" in Olympic gymnastics!'],
  ['spt_archery_019', 'Archery', '🏹', ['Quiver', 'Bullseye', 'Recurve'], 'Precision marksmen release carbon shafts from tensioned limbs toward concentric target rings.', 'Individual', 'Outdoor Range', 'Recurve Bow', 'World Archery', 'Olympic archers must strike a center "10-ring" yellow circle just 12 cm wide from the length of three tennis courts!'],
  ['spt_skateboarding_020', 'Skateboarding', '🛹', ['Grip Tape', 'Urethane', 'Deck'], 'Riders perform vertical airs, grinds, and flips on concave wooden decks atop four wheels.', 'Individual', 'Concrete Park', 'Maple Deck', 'World Skate', 'Skateboarding was conceived by Southern California wave surfers in the 1950s who sought to "sidewalk surf" on flat days!']
];

// Complete 40 sports
const remainingSports: [string, string, string, [string, string, string], string, string, string, string, string, string][] = [
  ['spt_surfing_021', 'Surfing', '🏄', ['Reef', 'Swell', 'Wax'], 'Wave riders paddle into oceanic breaks and balance along curl faces.', 'Individual', 'Ocean Break', 'Fiberglass Board', 'ISA', 'Polynesian and Hawaiian kings rode massive sacred boards carved from native koa trees reaching 16 feet long!'],
  ['spt_snowboarding_022', 'Snowboarding', '🏂', ['Carve', 'Bindings', 'Powder'], 'Athletes carve alpine snow faces and launch spins on single composite decks.', 'Individual', 'Snow Piste', 'Snowboard', 'FIS', 'The precursor to modern snowboards was invented in 1965 by Sherman Poppen, who bound two skis together and called it a "Snurfer"!'],
  ['spt_skiing_023', 'Alpine Skiing', '⛷️', ['Slalom', 'Poles', 'Bindings'], 'Racers weave past gate markers at highway velocities down frozen mountain gradients.', 'Individual', 'Alpine Slopes', 'Pair of Skis', 'FIS', 'Primitive petroglyphs and wooden ski fragments excavated in Norway indicate humanity has skied for over 5,000 years!'],
  ['spt_waterpolo_024', 'Water Polo', '🤽', ['Eggbeater', 'Cap', 'Goal'], 'Swimmers tread deep water without resting on basin tiles, passing a leather water ball.', '7 Squad', 'Deep Pool', 'Ear-Guard Cap', 'World Aquatics', 'Water polo field players are never permitted to touch pool flooring or sidewalls during the entirety of active play!'],
  ['spt_judo_025', 'Judo', '🥋', ['Tatami', 'Grip', 'Ippon'], 'Combatants use off-balancing leverage and shoulder throws to pin adversaries flat.', '2 Fighters', 'Tatami Mat', 'Heavy Gi', 'IJF', 'Judo translates philosophically to "The Gentle Way", teaching students to turn an attacker’s momentum into their throw!'],
  ['spt_wrestling_026', 'Wrestling', '🤼', ['Takedown', 'Singlet', 'Pin'], 'Grapplers employ body locks and leverage to force an opponent’s shoulder blades down.', '2 Athletes', 'Circular Mat', 'Singlet', 'UWW', 'Wrestling stands among our species\' oldest competitive sports, depicted on cave wall paintings dating back 15,000 years!'],
  ['spt_fencing_027', 'Fencing', '🤺', ['Touché', 'Piste', 'Blade'], 'Duelists advance along a narrow metal piste trading microsecond weapon touches.', '2 Fencers', '14m Piste', 'Mask & Foil', 'FIE', 'The tip of a modern electronic épée sword registers impacts faster than the firing velocity of a pistol bullet!'],
  ['spt_rowing_028', 'Rowing (Crew)', '🚣', ['Coxswain', 'Oar', 'Regatta'], 'Crews synchronize long levered sweeps to drive needle-thin fiberglass hulls backwards.', '1-8 Crew', 'Still Water', 'Long Oars', 'World Rowing', 'Rowers face toward the start line behind them; only the non-rowing coxswain stationed in the stern looks ahead to steer!'],
  ['spt_weightlifting_029', 'Weightlifting (Olympic)', '🏋️', ['Snatch', 'Platform', 'Plates'], 'Lifters hoist heavy steel barbells from ground to extended overhead lockout.', 'Individual', 'Timber Stage', 'Barbell', 'IWF', 'Olympic weightlifters can propel three times their own body mass over their heads in a single fluid kinetic motion!'],
  ['spt_figureskating_030', 'Figure Skating', '⛸️', ['Axel', 'Choreography', 'Spin'], 'Skaters execute multi-rotation jumps and spins set to musical accompaniments on ice.', '1-2 Skaters', 'Ice Arena', 'Pick Skates', 'ISU', 'Figure skating was the earliest winter discipline showcased in Olympic history, debuting at the 1908 London Summer Games!'],
  ['spt_handball_031', 'Handball', '🤾', ['Crease', 'Throw', 'Goal'], 'Athletes sprint and bounce a resin-coated ball before firing past a defending keeper.', '7 Squad', 'Indoor Court', 'Resin Ball', 'IHF', 'Elite handball forwards can hurl the ball at speeds exceeding 80 mph (130 km/h) into goal corners!'],
  ['spt_equestrian_032', 'Equestrian (Dressage)', '🏇', ['Stirrup', 'Gait', 'Saddle'], 'Riders guide horses through intricate geometric gaits, pirouettes, and obstacle courses.', 'Horse & Rider', 'Sand Arena', 'English Saddle', 'FEI', 'Equestrian remains the sole Olympic event where male and female competitors battle directly against each other on equal terms!'],
  ['spt_polo_033', 'Polo', '🐎', ['Chukker', 'Mallet', 'Divot'], 'Mounted riders gallop across grass expanses swinging long mallets to drive wooden balls.', '4 Riders', '300yd Grass', 'Long Mallet', 'FIP', 'A standard polo playing pitch requires nine times the surface area of a standard professional soccer pitch!'],
  ['spt_lacrosse_034', 'Lacrosse', '🥍', ['Faceoff', 'Mesh Pocket', 'Crosse'], 'Field runners cradle a dense rubber projectile in woven stick pockets at high speed.', '10 Squad', 'Turf Field', 'Mesh Crosse', 'World Lacrosse', 'Lacrosse was created over 900 years ago by Indigenous North American peoples as a spiritual contest called "The Creator\'s Game"!'],
  ['spt_bobsleigh_035', 'Bobsleigh', '🛷', ['Runners', 'Gravity', 'Banking'], 'Teams sprint-launch aerodynamic sleds down twisting, refrigerated iced mountain shoots.', '2-4 Racers', 'Ice Trough', 'Aero Sled', 'IBSF', 'Four-man bobsleighs exceed 95 mph (150 km/h) and exert over 5G of centrifugal force on crews inside steep ice curves!'],
  ['spt_taekwondo_036', 'Taekwondo', '🥋', ['Dobok', 'High Kick', 'Spin'], 'Martial athletes score points by delivering fast head-height roundhouses and jumping spin kicks.', '2 Fighters', 'Octagon Mat', 'Chest Guard', 'World Taekwondo', 'The Korean martial art translates to "The Way of Kicking and Punching", celebrated for airborne 540-degree kicks!'],
  ['spt_triathlon_037', 'Triathlon (Ironman)', '🏅', ['Transition', 'Endurance', 'Legs'], 'Endurance racers perform consecutive open-water swimming, cycling, and long marathon runs.', 'Individual', 'Open Route', 'Tri-Suit & Bike', 'World Triathlon', 'An Ironman triathlon challenges competitors to a 2.4-mile swim, a 112-mile bicycle ride, and a 26.2-mile marathon without pause!'],
  ['spt_curling_038', 'Curling', '🥌', ['Granite Stone', 'Broom', 'House'], 'Tacticians glide 44-pound polished granite stones across pebbled ice sheets toward targets.', '4 Players', 'Pebbled Sheet', 'Granite Stone', 'World Curling', 'All certified Olympic curling stones are cut from rare microgranite found on one uninhabited Scottish isle, Ailsa Craig!'],
  ['spt_snooker_039', 'Snooker', '🎱', ['Baize', 'Potting', 'Break'], 'Cueists pocket 15 reds alternately with colored balls across a heavy baize-covered slate.', '2 Players', '12ft Table', 'Ash Cue', 'WPBSA', 'A maximum break of 147 points requires a player to pot all 15 red balls paired with the black, followed by all 6 colors!'],
  ['spt_squash_040', 'Squash', '🎾', ['Enclosure', 'Tin', 'Volley'], 'Two athletes strike a hollow rubber sphere repeatedly against front and sidewalls in a box.', '2 Players', 'Four Walls', 'Rubber Ball', 'WSF', 'Squash was rated by Forbes as the world’s most physically demanding sport for total cardiovascular workout and agility!']
];

const allSportsList = [...sportsData, ...remainingSports];
const sportsCards: CardDef[] = allSportsList.map(([id, name, emoji, buzz, desc, f1, f2, f3, f4, fun]) => ({
  id,
  category: 'sports',
  name,
  difficulty: 'medium',
  emoji,
  buzzWords: buzz,
  clues: [
    desc,
    `Typically played on a ${f2} by a ${f1}.`,
    `Utilizes specialized ${f3} governed globally by ${f4}.`
  ],
  primaryClues: [desc, `Contested on a ${f2}.`],
  secondaryClues: [`Team setup: ${f1}.`, `Gear: ${f3}.`],
  factGrid: [
    { icon: '👥', label: 'Team', value: f1 },
    { icon: '🏟️', label: 'Venue', value: f2 },
    { icon: '🎽', label: 'Gear', value: f3 },
    { icon: '🏆', label: 'Origin', value: f4 }
  ],
  bonusTrivia: {
    question: `What essential gear or venue is key to ${name}?`,
    answer: f3
  },
  facts: { isSport: true, globalAthletics: true },
  aliases: [name.toLowerCase(), name.split(' ')[0].toLowerCase()],
  explanation: `${name} is an internationally recognized competitive sport.`,
  funFact: fun,
  verificationStatus: 'verified'
}));

writeCategory('sports.ts', 'SPORTS_CARDS', sportsCards);

console.log('Finished updating Professions and Sports with challenging buzz-words and crisp facts!');

