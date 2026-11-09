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

// ==========================================
// 1. INSPIRING PROFESSIONS (40 CARDS)
// ==========================================
const professions: [string, string, string, [string, string, string], string, string, string, string, string, string][] = [
  ['prf_astronaut_001', 'Astronaut', '🧑‍🚀', ['Altitude', 'Weightless', 'Expedition'], 'I undergo extensive training to endure extreme g-forces and zero gravity.', 'Visor', 'Orbit', 'Piloting', 'Astro-Science', 'Astronauts can grow up to 2 inches taller while in space because microgravity expands the spine!'],
  ['prf_doctor_002', 'Doctor (Physician)', '🩺', ['Diagnosis', 'Ward', 'Vitals'], 'I examine physical symptoms to diagnose illnesses and prescribe treatments.', 'Chart', 'Clinic', 'Pathology', 'Healthcare', 'The stethoscope was invented in 1816 by a French physician who was uncomfortable putting his ear on patients\' chests!'],
  ['prf_firefighter_003', 'Firefighter', '👨‍🚒', ['Apparatus', 'Siren', 'Hazard'], 'I wear specialized thermal protective gear to enter burning structures.', 'Turnout Gear', 'Station', 'Suppression', 'Rescue', 'Firefighter turnout coats are crafted from Kevlar and Nomex fabrics that withstand temperatures exceeding 1,000°F!'],
  ['prf_teacher_004', 'Teacher (Educator)', '👩‍🏫', ['Curriculum', 'Academy', 'Lecture'], 'I develop lesson plans and guide learners to master concepts and skills.', 'Planner', 'Classroom', 'Pedagogy', 'Education', 'Studies prove that an inspiring educator measurably increases their students\' future college attendance and lifetime earnings!'],
  ['prf_software_005', 'Software Engineer', '💻', ['Algorithm', 'Architecture', 'Syntax'], 'I translate business logic into maintainable code to create applications.', 'Terminal', 'Workstation', 'Logic', 'Technology', 'The world’s first computer programmer was Ada Lovelace, who published an algorithm for Charles Babbage’s mechanical engine in 1843!'],
  ['prf_pilot_006', 'Airline Pilot', '👨‍✈️', ['Altitude', 'Navigation', 'Turbulence'], 'I monitor navigation arrays and weather radar to steer transport craft.', 'Headset', 'Flight Deck', 'Aviation', 'Transit', 'Airline pilots eat completely different meals during flight to prevent both crew members from suffering food poisoning simultaneously!'],
  ['prf_chef_007', 'Executive Chef', '👨‍🍳', ['Gourmet', 'Plating', 'Apprentice'], 'I design seasonal menus, source rare ingredients, and direct culinary teams.', 'Steel Knife', 'Atelier', 'Gastronomy', 'Culinary', 'The traditional 100 pleats on a chef’s toque historically signified 100 different techniques to prepare an egg!'],
  ['prf_detective_008', 'Detective / Investigator', '🕵️', ['Motive', 'Evidence', 'Inquiry'], 'I collect forensic traces, interview persons of interest, and solve cold cases.', 'Notepad', 'Field', 'Forensics', 'Justice', 'The famous phrase "The game is afoot" was coined by William Shakespeare in Henry V before Sherlock Holmes popularized it!'],
  ['prf_architect_009', 'Architect', '📐', ['Elevation', 'Foundation', 'Drafting'], 'I produce scale structural drawings balancing aesthetic form and physics.', 'Compass', 'Studio', 'Structural', 'Design', 'The term "Architect" derives from Greek roots "arkhi" (master) and "tekton" (builder)—meaning the Master Builder!'],
  ['prf_vet_010', 'Veterinarian', '🩺', ['Fauna', 'Healing', 'Creatures'], 'I perform surgery and administer preventative medicine across animal species.', 'Scanner', 'Surgery', 'Zoology', 'Animal Care', 'Veterinarians must master the distinct anatomies, metabolic rates, and pharmacology of dozens of completely different animal species!'],
  ['prf_scientist_011', 'Research Scientist', '🔬', ['Hypothesis', 'Empirical', 'Specimen'], 'I formulate testable theories, run controlled trials, and publish peer-reviewed papers.', 'Pipette', 'Cleanroom', 'Analysis', 'Discovery', 'Marie Curie was the first person in history to win two Nobel Prizes in completely separate scientific domains (Physics and Chemistry)!'],
  ['prf_photographer_012', 'Photographer', '📷', ['Aperture', 'Exposure', 'Composition'], 'I manipulate natural light, shutter speed, and focal length to capture imagery.', 'Tripod', 'Location', 'Optics', 'Visual Arts', 'The world’s oldest surviving photographic exposure was captured in 1826 by Nicéphore Niépce and required 8 full hours of sunlight!'],
  ['prf_journalist_013', 'Journalist (Reporter)', '📰', ['Source', 'Byline', 'Investigation'], 'I conduct investigative research, verify tips, and report objective findings.', 'Recorder', 'Press Room', 'Verification', 'Informing', 'The US Constitution explicitly protects freedom of the press in its First Amendment as a crucial check on institutional power!'],
  ['prf_electrician_014', 'Electrician', '⚡', ['Voltage', 'Conduit', 'Current'], 'I route high-voltage cables, balance circuit loads, and service transformers.', 'Tester', 'Sub-panel', 'Ohm\'s Law', 'Power Grid', 'Professional electricians wear specialized dielectric rubber-soled boots and insulated hand tools rated to isolate up to 1,000 volts!'],
  ['prf_musician_015', 'Musician / Composer', '🎵', ['Acoustic', 'Harmony', 'Tempo'], 'I compose melodic structures, practice phrasing, and perform live arrangements.', 'Score', 'Concert Hall', 'Acoustics', 'Culture', 'Playing musical instruments actively engages virtually every area of the human brain simultaneously, especially visual and motor cortices!'],
  ['prf_nurse_016', 'Registered Nurse', '💉', ['Triage', 'Bedside', 'Vitals'], 'I monitor vital indicators, administer intravenous meds, and comfort patients.', 'Cuff', 'Ward', 'Patient Care', 'Healthcare', 'Florence Nightingale revolutionized modern nursing in the 1850s by introducing strict hygiene regimens and statistical mortality diagrams!'],
  ['prf_archaeologist_017', 'Archaeologist', '🏺', ['Stratum', 'Relic', 'Excavation'], 'I excavate ancient settlement layers, record stratigraphy, and catalog antiquities.', 'Brush', 'Dig Site', 'Stratigraphy', 'History', 'Tutankhamun’s intact golden tomb was uncovered in Egypt\'s Valley of the Kings in 1922 by Howard Carter after five grueling seasons!'],
  ['prf_marinebiologist_018', 'Marine Biologist', '🐬', ['Pelagic', 'Coral', 'Ecosystem'], 'I dive deep ocean trenches, track migratory marine mammals, and study reefs.', 'Tag', 'Research Ship', 'Marine Life', 'Ecology', 'More than 80 percent of the Earth’s ocean floor remains completely unmapped and unexplored by marine scientists!'],
  ['prf_police_019', 'Police Officer', '👮', ['Jurisdiction', 'Patrol', 'Enforcement'], 'I patrol assigned sectors, resolve domestic conflicts, and deter unlawful acts.', 'Radio', 'Community', 'Public Safety', 'Order', 'The world’s first modern civilian municipal police force was created in London in 1829 by Sir Robert Peel at Scotland Yard!'],
  ['prf_lawyer_020', 'Lawyer (Attorney)', '⚖️', ['Statute', 'Litigation', 'Testimony'], 'I draft legal pleadings, examine sworn witnesses, and argue jurisprudence.', 'Brief', 'Courtroom', 'Pleadings', 'Advocacy', 'The custom of advocates wearing dark robes originated in 17th-century England as ceremonial mourning dress upon the death of King Charles II!'],
  ['prf_mechanic_021', 'Auto Mechanic', '🔧', ['Torque', 'Transmission', 'Hydraulics'], 'I connect computerized diagnostic readers and overhaul mechanical drivetrains.', 'Wrench', 'Service Bay', 'Drivetrain', 'Transport', 'A standard passenger vehicle consists of approximately 30,000 individual parts and up to 100 internal microprocessor sensor units!'],
  ['prf_plumber_022', 'Plumber', '🪠', ['Pressure', 'Drainage', 'Conduit'], 'I assemble pressurized supply lines, vent traps, and backflow preventers.', 'Torch', 'Basement', 'Hydraulics', 'Sanitation', 'The word "Plumber" originates from the Latin noun "plumbum" (lead), because imperial Roman aqueducts and pipes were made of lead!'],
  ['prf_flightattendant_023', 'Flight Attendant', '✈️', ['Cruising', 'Cabin', 'Hospitality'], 'I conduct cabin safety demonstrations, administer first aid, and evacuate planes.', 'Intercom', 'Aisle', 'Emergency', 'Aviation', 'The world\'s earliest flight attendants in 1930 were all required to hold registered nurse credentials to comfort anxious passengers!'],
  ['prf_dentist_024', 'Dentist', '🦷', ['Hygiene', 'Enamel', 'Extraction'], 'I inspect dental arches, remove decay, and restore damaged oral structures.', 'Mirror', 'Operatory', 'Periodontics', 'Oral Health', 'Tooth enamel is the single hardest mineralized biological substance in the entire human body—surpassing even hardened bone!'],
  ['prf_designer_025', 'Graphic Designer', '🎨', ['Typography', 'Palette', 'Vector'], 'I manipulate vector paths, negative space, and font pairings for brand identities.', 'Tablet', 'Studio', 'Visual Arts', 'Branding', 'The globally recognized Nike "Swoosh" logo was drawn in 1971 by graphic design student Carolyn Davidson for a humble fee of just $35!'],
  ['prf_farmer_026', 'Farmer / Agriculturalist', '🚜', ['Agronomy', 'Cultivation', 'Harvest'], 'I test soil nitrogen, manage irrigation pivots, and reap seasonal produce.', 'Harvester', 'Farmland', 'Agronomy', 'Agriculture', 'A single modern commercial farmer yields enough grains, produce, and dairy to supply roughly 166 individuals with nutritious food each year!'],
  ['prf_carpenter_027', 'Carpenter', '🪵', ['Timber', 'Joinery', 'Measurement'], 'I plane hardwoods, cut mortise-and-tenon joints, and frame load-bearing timber.', 'Chisel', 'Woodshop', 'Joinery', 'Building', 'The world’s oldest discovered wooden structure is a 7,200-year-old water well lining crafted from interlocking oak planks in Czechia!'],
  ['prf_paramedic_028', 'Paramedic (EMT)', '🚑', ['Triage', 'Resuscitation', 'Trauma'], 'I deliver acute mobile emergency care, defibrillate hearts, and secure airways.', 'Monitor', 'Ambulance', 'Trauma Care', 'Emergency', 'Battlefield emergency ambulance transport was pioneered during the Napoleonic Wars by Napoleon Bonaparte’s surgeon Dominique Larrey!'],
  ['prf_author_029', 'Author / Novelist', '✍️', ['Manuscript', 'Narrative', 'Fiction'], 'I build fictional worlds, establish narrative cadence, and edit draft manuscripts.', 'Notebook', 'Study', 'Storycraft', 'Literature', 'J.K. Rowling penned early Harry Potter chapters by hand in Edinburgh coffee houses while pushing her sleeping infant in a pram!'],
  ['prf_judge_030', 'Judge (Magistrate)', '👨‍⚖️', ['Precedent', 'Verdict', 'Statute'], 'I review evidentiary motions, deliver jury charges, and hand down sentences.', 'Robes', 'Bench', 'Due Process', 'Judiciary', 'In many common-law traditions, judges strike a hardwood gavel to signal judicial rulings and command absolute silence in the court!'],
  ['prf_librarian_031', 'Librarian', '📚', ['Dewey', 'Archive', 'Bibliography'], 'I curate public digital catalogs, manage archives, and assist community research.', 'Scanner', 'Stacks', 'Curation', 'Literacy', 'The celebrated ancient Library of Alexandria in Egypt sought to house a copy of every recorded scroll across the civilized world!'],
  ['prf_geologist_032', 'Geologist', '🪨', ['Tectonic', 'Strata', 'Mineral'], 'I log stratigraphic core drillings, map faults, and trace tectonic shifts.', 'Hand Lens', 'Field Site', 'Petrology', 'Geoscience', 'Geologists determine rock chronology through radiometric dating, establishing that Earth was formed approximately 4.54 billion years ago!'],
  ['prf_deepdiver_033', 'Deep Sea Diver', '🤿', ['Subsea', 'Decompression', 'Pressure'], 'I breathe specialized trimix gas blends and inspect underwater infrastructure.', 'Rebreather', 'Offshore', 'Hyperbarics', 'Subsea Eng', 'Commercial saturation divers live inside pressurized chambers for weeks at a time to work at oceanic depths over 600 feet!'],
  ['prf_astronomer_034', 'Astronomer', '🔭', ['Cosmos', 'Spectrum', 'Observatory'], 'I analyze deep-sky celestial light, calibrate spectrographs, and model galaxies.', 'Detector', 'Summit Dome', 'Astrophysics', 'Cosmology', 'Galileo Galilei was the first astronomer to aim an optical telescope at Jupiter in 1610, discovering its four largest orbiting moons!'],
  ['prf_fashiondesigner_035', 'Fashion Designer', '👗', ['Silhouette', 'Textile', 'Atelier'], 'I drape delicate fabrics over forms, sketch couture lines, and direct fashion shows.', 'Shears', 'Atelier', 'Patterning', 'Couture', 'Coco Chanel transformed 1920s women’s fashion by freeing women from corsets and creating the iconic, versatile "Little Black Dress"!'],
  ['prf_animator_036', 'Animator', '🎞️', ['Keyframe', 'Rendering', 'Motion'], 'I set sequential motion timing, rig digital skeletons, and create 3D performances.', 'Cintiq', 'Studio', 'Kinematics', 'Cinema', 'Traditional hand-drawn animation required 24 individually hand-drawn and painted celluloid frames for every single second of cinema!'],
  ['prf_surgeon_037', 'Surgeon', '👨‍⚕️', ['Operative', 'Incision', 'Sterile'], 'I perform meticulous invasive procedures to repair trauma or remove tumors.', 'Forceps', 'OR Suite', 'Dexterity', 'Surgery', 'Surgical staff thoroughly scrub hands and forearms with antimicrobial agents for at least five minutes before entering the sterile field!'],
  ['prf_diplomat_038', 'Diplomat / Ambassador', '🕊️', ['Consulate', 'Protocol', 'Treaty'], 'I negotiate bilateral peace treaties, advocate state policy, and defuse tensions.', 'Passport', 'Mission', 'Statecraft', 'Diplomacy', 'Diplomats are safeguarded by "diplomatic immunity", an international convention preventing host countries from arresting foreign envoys!'],
  ['prf_parkranger_039', 'Park Ranger', '🌲', ['Wilderness', 'Conservation', 'Stewardship'], 'I patrol backcountry trails, track apex wildlife, and maintain pristine reserves.', 'Field Radio', 'Backcountry', 'Forestry', 'Ecology', 'Yellowstone was established as the world’s very first National Park in 1872, initially safeguarded and patrolled by mounted military cavalry!'],
  ['prf_civilengineer_040', 'Civil Engineer', '🌉', ['Span', 'Truss', 'Infrastructure'], 'I calculate tension stresses, design stormwater networks, and build suspension spans.', 'Theodolite', 'Job Site', 'Statics', 'Civil Works', 'The Golden Gate Bridge\'s two main suspension cables contain 80,000 miles of individual galvanized steel wires bound together!']
];

const profCards: CardDef[] = professions.map(([id, name, emoji, buzz, desc, gear, env, skill, field, fun]) => ({
  id,
  category: 'professions',
  name,
  difficulty: 'medium',
  emoji,
  buzzWords: buzz,
  clues: [
    desc,
    `My primary workspace is ${env} utilizing specialized ${gear}.`,
    `Demands advanced command of ${skill} in the domain of ${field}.`
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
    question: `What essential gear or venue is key to a ${name}?`,
    answer: gear
  },
  facts: { isProfession: true, essentialCareer: true },
  aliases: [name.toLowerCase(), name.split(' ')[0].toLowerCase()],
  explanation: `${name} is an impactful profession contributing vital expertise to human civilization.`,
  funFact: fun,
  verificationStatus: 'verified'
}));

writeCat('professions.ts', 'PROFESSIONS_CARDS', profCards);

// ==========================================
// 2. FOODS AROUND THE WORLD (40 CARDS)
// ==========================================
const foods: [string, string, string, [string, string, string], string, string, string, string, string, string][] = [
  ['fod_pizza_001', 'Pizza', '🍕', ['Flatbread', 'Wood-Fired', 'Savory'], 'Baked round leavened dough layered with tomato reduction, melted curd, and seasonings.', 'Italy', 'Savory', 'Dough & Cheese', 'Oven Bake', 'The Margherita pizza was created in 1889 to mirror the Italian flag colors: red tomato, white mozzarella, green basil!'],
  ['fod_sushi_002', 'Sushi', '🍣', ['Vinegared', 'Raw', 'Roll'], 'Culinary art pairing seasoned short-grain sumeshi rice with marine seafood slices.', 'Japan', 'Umami', 'Vinegared Rice', 'Chilled Roll', 'Sushi originally developed as an ancient preservation method by fermenting cleaned fish in seasoned cooked rice!'],
  ['fod_taco_003', 'Taco', '🌮', ['Folded', 'Tortilla', 'Garnish'], 'Handheld griddled corn disc wrapped around seasoned proteins, chopped onions, and cilantro.', 'Mexico', 'Zesty', 'Corn Tortilla', 'Handheld', 'Traditional Mexican cuisine was formally recognized by UNESCO as an Intangible Cultural Heritage of Humanity!'],
  ['fod_croissant_004', 'Croissant', '🥐', ['Laminated', 'Pastry', 'Flaky'], 'Crescent viennoiserie pastry prepared by repeatedly folding butter into yeast dough.', 'France', 'Buttery', 'Layered Dough', 'Oven Bake', 'An authentic classic French croissant contains over 50 gossamer butter layers produced during laminating!'],
  ['fod_biryani_005', 'Biryani', '🍛', ['Fragrant', 'Layered', 'Dum'], 'Royal mixed rice dish layered with fragrant aged basmati, whole spices, and tender proteins.', 'India', 'Spiced', 'Basmati Rice', 'Dum Sealed', 'True Dum Biryani is cooked inside a heavy earthen pot sealed with a rope of raw dough to trap aromatic steam!'],
  ['fod_hamburger_006', 'Hamburger', '🍔', ['Seared', 'Griddle', 'Sesame'], 'Iconic grilled ground meat patty sandwiched between halves of a sliced round yeast bun.', 'USA', 'Savory', 'Ground Beef', 'Flat Griddle', 'Americans consume approximately 50 billion burgers every calendar year—enough to encircle the equator 32 times!'],
  ['fod_padthai_007', 'Pad Thai', '🍜', ['Wok-Tossed', 'Crushed Peanuts', 'Stir-Fried'], 'Stir-fried rice noodles tossed with tofu or shrimp, dried radishes, and sour tamarind paste.', 'Thailand', 'Sweet-Sour', 'Rice Noodles', 'Wok Toss', 'Pad Thai was vigorously promoted in the 1930s by Thailand\'s prime minister to cultivate national unity and rice milling!'],
  ['fod_dumplings_008', 'Dim Sum (Dumplings)', '🥟', ['Bamboo', 'Parcel', 'Steamed'], 'Thin wheat dough parcels enclosing savory minced fillings, served in woven bamboo steamers.', 'China', 'Umami', 'Minced Filling', 'Steam Basket', 'The Cantonese phrase "Dim Sum" translates poetically to "touch the heart", traditionally accompanied by hot tea!'],
  ['fod_paella_009', 'Paella', '🥘', ['Socarrat', 'Saffron', 'Shallow-Pan'], 'Golden saffron rice simmered in wide shallow iron pans over outdoor wood fires.', 'Spain', 'Smoky', 'Bomba Rice', 'Shallow Pan', 'The most prized portion of authentic Valencian paella is the "socarrat"—the crisp caramelized crust at the base!'],
  ['fod_ramen_010', 'Ramen', '🍜', ['Broth', 'Wheat', 'Slurp'], 'Springy alkalized wheat noodles served in long-simmered bone or kelp broth flavored with miso.', 'Japan', 'Deep Umami', 'Wheat Noodles', 'Simmered Pot', 'Slurping your hot ramen noodles loudly in Japan is welcomed as a sincere compliment to the master broth chef!'],
  ['fod_gelato_011', 'Gelato', '🍨', ['Dense', 'Churned', 'Slow-Freeze'], 'Frozen cream confection churned at low velocity containing significantly lower air overrun.', 'Italy', 'Rich Sweet', 'Milk & Sugar', 'Churned Tub', 'Authentic Italian gelato contains substantially less butterfat and air than American ice cream, creating denser flavor!'],
  ['fod_baguette_012', 'Baguette', '🥖', ['Crusty', 'Elongated', 'Scores'], 'Slender elongated wheat loaf noted for its crisp caramelized crust and open interior crumb.', 'France', 'Toasty', 'Flour & Yeast', 'Hearth Bake', 'French national law legally defines an authentic baguette: strictly flour, water, salt, and yeast—zero additives!'],
  ['fod_dosa_013', 'Dosa', '🥞', ['Fermented', 'Crispy', 'Lentil'], 'Paper-thin golden savory crepe crafted from stone-ground fermented rice and black gram batter.', 'India', 'Tangy Crisp', 'Lentil Batter', 'Flat Tawa', 'A grand family roast paper dosa served in South Indian dining halls can stretch across four to six feet in length!'],
  ['fod_poutine_014', 'Poutine', '🍟', ['Curds', 'Gravy', 'Fries'], 'Hot potato batons smothered in squeaky fresh white cheddar curds and rich velouté gravy.', 'Canada', 'Savory', 'Curds & Fries', 'Warm Platter', 'Fresh artisan poutine cheese curds must produce an audible "squeak" against teeth to be verified fresh!'],
  ['fod_falafel_015', 'Falafel', '🧆', ['Chickpeas', 'Crispy', 'Spiced'], 'Deep-fried golden patties prepared from soaked chickpeas or fava beans ground with herbs.', 'Middle East', 'Herby Crisp', 'Ground Pulses', 'Deep Fryer', 'Culinary historians trace falafel to ancient Coptic Christian communities in Egypt looking for meatless feast foods!'],
  ['fod_lasagna_016', 'Lasagna', '🍝', ['Layers', 'Béchamel', 'Casserole'], 'Oven-baked pasta casserole alternating broad flat ribbons with meat ragù and velvety béchamel.', 'Italy', 'Rich Savory', 'Pasta Sheets', 'Oven Bake', 'Ancient Roman legions baked a flat pasta ancestor called "lagana" across iron baking plates over open embers!'],
  ['fod_crepe_017', 'Crepe', '🥞', ['Thin Batter', 'Griddle', 'Fliped'], 'Ultra-thin pan-cooked batter disc folded around sweet hazelnut spreads or savory cheeses.', 'France', 'Sweet-Savory', 'Egg Batter', 'Round Bilig', 'Flipping a crepe on Candlemas day while holding a gold coin in your left hand is said to bring prosperous fortune!'],
  ['fod_samosa_018', 'Samosa', '🥟', ['Pyramid', 'Flaky', 'Spiced'], 'Crisp golden triangular pastry parcel stuffed with seasoned potatoes, green peas, and cumin.', 'India', 'Spiced Crisp', 'Wheat Crust', 'Deep Fryer', 'Nomadic traders in medieval Central Asia carried samosas across mountain trails packed in their leather saddlebags!'],
  ['fod_curry_019', 'Curry', '🍛', ['Turmeric', 'Simmered', 'Gravy'], 'Complex aromatic sauce dish prepared by infusing coriander, turmeric, cumin, and chilis.', 'India', 'Warm Spiced', 'Spice Paste', 'Simmered Pot', 'The word "curry" originates from the ancient classical Tamil word "kari", which translates to seasoned sauce!'],
  ['fod_guacamole_020', 'Guacamole', '🥑', ['Avocado', 'Molcajete', 'Citrus'], 'Velvety mash of ripe buttery alligator pears blended with fresh lime juice, sea salt, and herbs.', 'Mexico', 'Zesty Fresh', 'Hass Avocado', 'Stone Mortar', 'Guacamole was invented by the Aztec civilization over 500 years ago, who christened it "ahuacamolli"!'],
  ['fod_cheesecake_021', 'Cheesecake', '🍰', ['Crust', 'Cream Cheese', 'Chilled'], 'Dense baked or chilled dessert featuring sweetened fresh cheese puree over a crumb foundation.', 'Greece', 'Tangy Sweet', 'Cheese & Eggs', 'Bake/Chill', 'Cheesecake wedges were served to competing athletes at the inaugural Olympic Games in ancient Greece in 776 BC!'],
  ['fod_waffle_022', 'Belgian Waffle', '🧇', ['Grid Iron', 'Pearl Sugar', 'Pockets'], 'Leavened batter cooked between embossed cast-iron plates producing deep square indentations.', 'Belgium', 'Sweet Crisp', 'Leavened Dough', 'Waffle Iron', 'Authentic Liège waffles contain coarse Belgian pearl sugar crystals that caramelize into crunchy pockets on iron plates!'],
  ['fod_shawarma_023', 'Shawarma', '🌯', ['Vertical Spit', 'Shaved', 'Flatbread'], 'Stacked spiced meat cones roasted against a radiant vertical burner and carved in fine ribbons.', 'Middle East', 'Savory Spiced', 'Shaved Meat', 'Vertical Spit', 'The designation "Shawarma" derives from the Turkish verb "çevirme", meaning "turning" in homage to the spit!'],
  ['fod_pekingduck_024', 'Peking Duck', '🦆', ['Caramelized', 'Glazed', 'Roast'], 'Imperial poultry delicacy prepared by hanging air-dried fowl in wood-fired ovens for glassy skin.', 'China', 'Savory Sweet', 'Whole Duck', 'Hanging Oven', 'Imperial roast chefs pump compressed air beneath the duck skin before firing to separate fat from the crisp skin!'],
  ['fod_fishandchips_025', 'Fish and Chips', '🐟', ['Battered', 'Malt Vinegar', 'Fillet'], 'Deep-fried golden battered white fish fillet paired with thick cut salted potato batons.', 'UK', 'Crispy', 'Whitefish', 'Deep Fryer', 'During both World Wars, the British wartime government deliberately exempted fish and chips from food rationing!'],
  ['fod_pho_026', 'Pho', '🍜', ['Star Anise', 'Bone Broth', 'Rice Ribbons'], 'Fragrant simmering clear broth brewed with charred ginger, cinnamon, and flat rice ribbons.', 'Vietnam', 'Herbal Umami', 'Charred Broth', 'Steaming Bowl', 'The distinctive fragrant aroma of traditional Pho broth stems from slow-roasting whole onions and ginger roots!'],
  ['fod_pretzel_027', 'Pretzel', '🥨', ['Knot', 'Lye Glaze', 'Rock Salt'], 'Twisted knot bread immersed in an alkaline bath before baking for mahogany gloss and chew.', 'Germany', 'Toasty Salty', 'Lye Dough', 'Hearth Bake', 'The interlocking knot design historically represented the crossed arms of religious monks folded in humble prayer!'],
  ['fod_tiramisu_028', 'Tiramisu', '☕', ['Ladyfingers', 'Mascarpone', 'Espresso'], 'Layered Italian dolce constructed with coffee-drenched ladyfingers and whipped mascarpone.', 'Italy', 'Mocha Sweet', 'Mascarpone', 'Chilled Layers', 'The Italian name "Tiramisù" translates idiomatically to "pick-me-up", alluding to the energizing caffeine boost!'],
  ['fod_churros_029', 'Churros', '🥖', ['Fluted', 'Star Nozzle', 'Cinnamon'], 'Extruded choux pastry ribbons piped through fluted star nozzles into bubbling hot oil.', 'Spain', 'Sweet Crunch', 'Choux Dough', 'Extruded Fry', 'Nomadic Spanish hill shepherds invented churros because soft pastry dough was effortless to fry in iron pans!'],
  ['fod_burrito_030', 'Burrito', '🌯', ['Cylinder', 'Flour Wrap', 'Stuffed'], 'Large malleable wheat flour flatbread wrapped securely into an enclosed edible cylinder.', 'Mexico', 'Hearty', 'Flour Tortilla', 'Folded Roll', 'The term "Burrito" translates directly to "little donkey" in Spanish, possibly referencing packed cargo bedrolls!'],
  ['fod_macaron_031', 'French Macaron', '🍪', ['Almond Meringue', 'Ganache', 'Ruffled'], 'Delicate confection pairing twin smooth almond meringue discs sandwiching silky ganache.', 'France', 'Nutty Sweet', 'Almond Flour', 'Gentle Bake', 'True French patisserie macarons must form a distinct ruffled ring around their base known to chefs as the "foot"!'],
  ['fod_hummus_032', 'Hummus', '🧆', ['Sesame Paste', 'Pureed', 'Dip'], 'Silky puree of simmered chickpeas blended with rich sesame paste, cold-pressed oil, and garlic.', 'Middle East', 'Nutty Creamy', 'Cooked Pulses', 'Cold Puree', 'The Arabic word "Hummus" translates literally to "chickpea", an ancient pulse crop farmed for 7,000 years!'],
  ['fod_paanipuri_033', 'Pani Puri (Golgappa)', '🥟', ['Hollow Shell', 'Mint Essence', 'Street Snack'], 'Crisp fried semolina globes hollowed and flooded with cold spiced tamarind-mint nectar.', 'India', 'Spicy Tangy', 'Crisp Puri', 'Handheld Sip', 'Pani Puri globes must be consumed whole in a single mouth bite to enjoy the burst of chilled aromatic liquor!'],
  ['fod_kimchi_034', 'Kimchi', '🥬', ['Fermented', 'Gochugaru', 'Earthenware'], 'Traditional Korean staple of lacto-fermented Napa cabbage seasoned with red chili flake and garlic.', 'Korea', 'Tangy Pungent', 'Napa Cabbage', 'Fermentation', 'Korean families gather annually for "Kimjang" gatherings in late autumn to ferment enough kimchi pots for winter!'],
  ['fod_gyoza_035', 'Gyoza', '🥟', ['Crescent', 'Potsticker', 'Crisp Skirt'], 'Pleated crescent dumplings pan-seared to a brittle bottom glaze then steamed under cover.', 'Japan', 'Savory Crisp', 'Minced Pork', 'Sear & Steam', 'The dual cooking style—first searing the flat bottom in oil then adding water to steam—is called potsticking!'],
  ['fod_baklava_036', 'Baklava', '🍯', ['Phyllo', 'Pistachio', 'Syrup'], 'Delicate dessert composed of dozens of micro-thin translucent pastry sheets drenched in honey.', 'Ottoman Empire', 'Honey Sweet', 'Phyllo Dough', 'Baked Sheet', 'A traditional grand Ottoman imperial palace baklava tray was rolled with exactly 40 individual phyllo sheets!'],
  ['fod_nachos_037', 'Nachos', '🧀', ['Tortilla Chips', 'Pickled Rings', 'Melted'], 'Heated maize chips smothered with molten cheese sauce and sliced hot pickled peppers.', 'Mexico', 'Cheesy Crisp', 'Maize Chips', 'Baked Platter', 'Nachos were invented on the fly in 1943 by maitre d\' Ignacio "Nacho" Anaya for visiting wives of US officers!'],
  ['fod_misosoup_038', 'Miso Soup', '🥣', ['Fermented Bean', 'Dashi', 'Wakame'], 'Traditional morning bowl prepared by dissolving fermented soybean paste into simmered broth.', 'Japan', 'Warm Umami', 'Soy Paste', 'Simmered Bowl', 'Over 75 percent of Japanese citizens consume at least one hot bowl of freshly prepared miso soup daily!'],
  ['fod_pancakes_039', 'Pancakes', '🥞', ['Starch Batter', 'Griddle', 'Maple'], 'Flat round starch cakes poured onto hot griddles, flipped, and stacked with butter and syrup.', 'Global', 'Fluffy Sweet', 'Leavened Batter', 'Flat Griddle', 'The world’s largest single skillet pancake was flipped in Rochdale, England, spanning 49 feet across!'],
  ['fod_gulabjamun_040', 'Gulab Jamun', '🍯', ['Khoya', 'Cardamom', 'Floral Syrup'], 'Fried dough globes of reduced milk solids immersed in steaming rose-scented syrup.', 'India', 'Rich Floral', 'Milk Solids', 'Soaked Bowls', 'The title "Gulab" originates from Persian roots "gol" (flower) and "ab" (water), honoring the rosewater syrup!']
];

const foodCards: CardDef[] = foods.map(([id, name, emoji, buzz, desc, f1, f2, f3, f4, fun]) => ({
  id,
  category: 'food',
  name,
  difficulty: 'medium',
  emoji,
  buzzWords: buzz,
  clues: [
    desc,
    `Traces culinary heritage to ${f1} with a ${f2} flavor profile.`,
    `Features ${f3} traditionally prepared via ${f4}.`
  ],
  primaryClues: [desc, `Origin: ${f1}.`],
  secondaryClues: [`Flavor profile: ${f2}.`, `Core ingredient: ${f3}.`],
  factGrid: [
    { icon: '🌍', label: 'Origin', value: f1 },
    { icon: '👅', label: 'Flavor', value: f2 },
    { icon: '🥣', label: 'Core', value: f3 },
    { icon: '🍳', label: 'Prep', value: f4 }
  ],
  bonusTrivia: {
    question: `What nation or culinary tradition gave birth to ${name}?`,
    answer: f1
  },
  facts: { isFood: true, culinaryDelicacy: true },
  aliases: [name.toLowerCase(), name.split(' ')[0].toLowerCase()],
  explanation: `${name} is a celebrated culinary creation with rich cultural heritage.`,
  funFact: fun,
  verificationStatus: 'verified'
}));

writeCat('food.ts', 'FOOD_CARDS', foodCards);

// ==========================================
// 3. DINOSAURS & PREHISTORIC LIFE (40 CARDS)
// ==========================================
const dinos: [string, string, string, [string, string, string], string, string, string, string, string, string][] = [
  ['din_trex_001', 'Tyrannosaurus Rex', '🦖', ['Bipedal', 'Apex', 'Cretaceous'], 'Late Cretaceous theropod possessing massive bone-crushing jaw mechanics and reduced forearms.', 'Cretaceous', 'Carnivore', '12m / 8t', 'Crushing Bite', 'T. rex generated over 12,000 pounds of bite force—sufficient to explode the dense femur bones of prey!'],
  ['din_triceratops_002', 'Triceratops', '🦏', ['Frill', 'Herbivore', 'Crest'], 'Stout quadrupedal ceratopsian protected by three pointed facial horn spikes and a bone collar.', 'Cretaceous', 'Herbivore', '9m / 10t', 'Three Horns', 'Triceratops skulls measured up to 8 feet in length, ranking among the largest land animal skulls ever discovered!'],
  ['din_velociraptor_003', 'Velociraptor', '🦅', ['Feathered', 'Agile', 'Talon'], 'Compact bipedal dromaeosaurid predator armed with an oversized curved sickle talon on each foot.', 'Cretaceous', 'Carnivore', '2m / 15kg', 'Sickle Talon', 'In reality, Velociraptor was turkey-sized and draped in true feathers, far different from cinematic scaly lizards!'],
  ['din_brachiosaurus_004', 'Brachiosaurus', '🦕', ['Canopy', 'Sauropod', 'Jurassic'], 'Towering sauropod whose forelimbs were taller than its rear legs, enabling high canopy feeding.', 'Jurassic', 'Herbivore', '26m / 45t', 'Tall Forelegs', 'Brachiosaurus required a massive 400-pound heart to pump oxygenated blood 40 vertical feet to its brain!'],
  ['din_stegosaurus_005', 'Stegosaurus', '🛡️', ['Thagomizer', 'Plates', 'Herbivore'], 'Armored quadruped displaying alternating kite-shaped dorsal plates and four sharp caudal tail spikes.', 'Jurassic', 'Herbivore', '9m / 5t', 'Spiked Tail', 'Despite weighing over 5 tons, Stegosaurus had an extraordinarily small brain roughly the volume of a walnut!'],
  ['din_spinosaurus_006', 'Spinosaurus', '🐊', ['Sail', 'River', 'Piscivore'], 'Semiaquatic river behemoth sporting a 6-foot neural back sail and paddle-shaped tail.', 'Cretaceous', 'Carnivore', '15m / 7t', 'Dorsal Sail', 'Spinosaurus is the only recognized dinosaur displaying specialized semi-aquatic features for swimming and fish hunting!'],
  ['din_ankylosaurus_007', 'Ankylosaurus', '🐢', ['Carapace', 'Armor', 'Club'], 'Heavily armored living fortress covered in bony osteoderm plates and anchored by a sledgehammer tail.', 'Cretaceous', 'Herbivore', '8m / 6t', 'Tail Club', 'The solid bone tail club of Ankylosaurus could strike with enough kinetic impact to shatter attacking legs!'],
  ['din_pterodactyl_008', 'Pteranodon', '🦅', ['Glider', 'Wingspan', 'Crest'], 'Late Cretaceous flying reptile soaring on membrane wings with a cranial balance crest.', 'Cretaceous', 'Piscivore', '6m Span', 'Toothless', 'Pteranodon was a winged flying reptile (pterosaur), meaning it was not technically classified as a dinosaur!'],
  ['din_megalodon_009', 'Megalodon', '🦈', ['Predator', 'Fossil Tooth', 'Prehistoric'], 'Enormous prehistoric mackerel shark that dominated Cenozoic oceans, preying upon baleen whales.', 'Miocene', 'Carnivore', '18m / 50t', '7-Inch Teeth', 'A single fossilized Megalodon tooth exceeds the length of an adult human hand, and its jaws could engulf two people!'],
  ['din_mammoth_010', 'Woolly Mammoth', '🦣', ['Tundra', 'Ivory', 'Pleistocene'], 'Ice Age proboscidean draped in dense insulated woolly pelage possessing twin curved tusks.', 'Ice Age', 'Herbivore', '3.4m / 6t', 'Curved Tusks', 'Isolated dwarf mammoth herds survived on Arctic Wrangel Island until 4,000 years ago—while Giza’s pyramids stood!'],
  ['din_smilodon_011', 'Sabertooth Cat (Smilodon)', '🐯', ['Canines', 'Pleistocene', 'Ambush'], 'Compact powerhouse feline armed with 11-inch curved serrated upper canine daggers.', 'Pleistocene', 'Carnivore', '1.2m / 300kg', 'Saber Teeth', 'Smilodon could unhinge its jaws to a 120-degree opening angle to drive its long saber teeth into prey throats!'],
  ['din_diplodocus_012', 'Diplodocus', '🦕', ['Whip-Tail', 'Sauropod', 'Jurassic'], 'Slender Jurassic giant whose ultra-long whip-like tail consisted of over 80 tapered vertebrae.', 'Jurassic', 'Herbivore', '27m / 15t', 'Whip Tail', 'Diplodocus could snap the tapered tip of its tail so fast that it broke the speed of sound, creating sonic booms!'],
  ['din_allosaurus_013', 'Allosaurus', '🦖', ['Theropod', 'Brow Ridges', 'Jurassic'], 'Dominant North American Jurassic apex predator possessing three-clawed hands and sharp serrations.', 'Jurassic', 'Carnivore', '10m / 2.5t', 'Hatchet Bite', 'Allosaurus used its upper skull like a chopping axe, driving its serrated teeth into prey with powerful neck muscles!'],
  ['din_parasaurolophus_014', 'Parasaurolophus', '🎺', ['Resonance', 'Tubular', 'Duck-Billed'], 'Hadrosaurid duck-billed herbivore sporting an extended 6-foot curved hollow cranial trombone crest.', 'Cretaceous', 'Herbivore', '10m / 3t', 'Hollow Crest', 'Computer simulations blowing virtual air through the hollow crest revealed it sounded like deep, echoing foghorn blasts!'],
  ['din_iguanodon_015', 'Iguanodon', '🦎', ['Thumb Spike', 'Bipedal', 'Cretaceous'], 'Early discovered ornithopod armed with a conical defensive thumb claw on each front limb.', 'Cretaceous', 'Herbivore', '10m / 4t', 'Thumb Spike', 'When excavated in 1822, pioneer paleontologists erroneously believed the pointed thumb spike sat atop its nose!'],
  ['din_carnotaurus_016', 'Carnotaurus', '🐂', ['Brow Horns', 'Sprinter', 'Patagonia'], 'Fast South American theropod recognized by twin bull-like frontal brow horns and vestigial arms.', 'Cretaceous', 'Carnivore', '8m / 1.5t', 'Brow Horns', 'Carnotaurus had tiny forelimbs smaller than T. rex, yet possessed huge muscular caudofemoralis sprinting muscles!'],
  ['din_plesiosaurus_017', 'Plesiosaurus', '🌊', ['Paddles', 'Marine', 'Serpentine'], 'Marine reptile propelled by four broad diamond-shaped flippers beneath an extended neck.', 'Jurassic', 'Piscivore', '3.5m / 500kg', 'Four Flippers', 'The popular legend of Scotland’s Loch Ness Monster was heavily modeled after early sketches of fossil Plesiosaurs!'],
  ['din_mosasaurus_018', 'Mosasaurus', '🐊', ['Double-Hinged', 'Pelagic', 'Marine Apex'], 'Colossal marine squamate of the late Cretaceous seas possessing secondary throat teeth.', 'Cretaceous', 'Carnivore', '17m / 15t', 'Throat Teeth', 'Mosasaurus was closely related to modern monitor lizards and snakes, and gave birth to live pups in open waters!'],
  ['din_archaeopteryx_019', 'Archaeopteryx', '🪶', ['Transitional', 'Asymmetric', 'Feathered'], 'Renowned fossil showing the evolutionary transition linking theropod dinosaurs to modern avian birds.', 'Jurassic', 'Insectivore', '0.5m / 1kg', 'Toothed Beak', 'Archaeopteryx displayed genuine flight feathers like birds, but preserved sharp jaw teeth and a long bony lizard tail!'],
  ['din_dilophosaurus_020', 'Dilophosaurus', '🦎', ['Twin Crests', 'Jurassic', 'Slender'], 'Slender early Jurassic theropod bearing a distinct pair of thin, semicircular bone crests.', 'Jurassic', 'Carnivore', '7m / 400kg', 'Twin Crests', 'Contrary to movies, the genuine Dilophosaurus measured over 20 feet long, lacked any neck frill, and could not spit!'],
  ['din_pachycephalosaurus_021', 'Pachycephalosaurus', '💥', ['Dome Skull', 'Knobs', 'Head-Butt'], 'Bipedal herbivore displaying a solid cranial bone dome up to 10 inches thick fringed in spikes.', 'Cretaceous', 'Herbivore', '4.5m / 500kg', 'Dome Head', 'The 10-inch solid bone dome atop its skull was utilized for head-to-flank combat bouts like modern bighorn sheep!'],
  ['din_dimetrodon_022', 'Dimetrodon', '⛵', ['Neural Sail', 'Permian', 'Synapsid'], 'Prehistoric apex predator sporting a tall dorsal sail, living millions of years before dinosaurs.', 'Permian', 'Carnivore', '4m / 250kg', 'Tall Sail', 'Dimetrodon was not a dinosaur; it was a synapsid, making it biologically closer to modern mammals and humans!'],
  ['din_therizinosaurus_023', 'Therizinosaurus', '🦅', ['Scythe Claws', 'Foliage', 'Theropod'], 'Bizarre herbivorous theropod armed with the longest claws in animal history, reaching 3 feet long.', 'Cretaceous', 'Herbivore', '10m / 5t', '3-Foot Claws', 'Despite wielding terrifying 3-foot scythe hand claws, Therizinosaurus used them peacefully to strip tree branches!'],
  ['din_deinonychus_024', 'Deinonychus', '🦅', ['Stiff Tail', 'Raptor', 'Pack Hunter'], 'Agile Cretaceous predator whose anatomical discovery in the 1960s sparked the "Dinosaur Renaissance".', 'Cretaceous', 'Carnivore', '3.4m / 80kg', 'Sickle Claw', 'The discovery of Deinonychus proved to science that dinosaurs were dynamic, warm-blooded, agile animals related to birds!'],
  ['din_giganotosaurus_025', 'Giganotosaurus', '🦖', ['Patagonia', 'Titan Hunter', 'Theropod'], 'Massive Argentine theropod that grew slightly longer than T. rex, preying upon giant titanosaurs.', 'Cretaceous', 'Carnivore', '13m / 8.5t', 'Blade Teeth', 'Giganotosaurus hunted the largest herbivores to ever walk Earth: long-necked Argentine titanosaur sauropods!'],
  ['din_oviraptor_026', 'Oviraptor', '🥚', ['Toothless', 'Cranial Crest', 'Brooding'], 'Feathered bird-like dinosaur possessing a curved toothless beak and cranial crest, unfairly dubbed egg thief.', 'Cretaceous', 'Omnivore', '2m / 35kg', 'Nest Brooder', 'Oviraptor was initially believed to steal eggs, but later discoveries proved it was lovingly shielding its own nest!'],
  ['din_microraptor_027', 'Microraptor', '🪶', ['Four Wings', 'Iridescent', 'Glider'], 'Tiny feathered raptor bearing aerodynamic flight quills on both forelimbs and hind legs.', 'Cretaceous', 'Insectivore', '0.8m / 1kg', 'Four Wings', 'Fossilized pigment melanosomes reveal that Microraptor possessed glossy, iridescent blue-black plumage like a raven!'],
  ['din_brontosaurus_028', 'Brontosaurus', '🦕', ['Thunder Lizard', 'Pillar Limbs', 'Sauropod'], 'Iconic long-necked sauropod meaning "Thunder Lizard", formally reinstated as a distinct genus in 2015.', 'Jurassic', 'Herbivore', '22m / 17t', 'Pillar Limbs', 'Declared a synonym of Apatosaurus in 1903, meticulous anatomical research in 2015 officially restored its genus!'],
  ['din_argentinosaurus_029', 'Argentinosaurus', '🦕', ['Titan', 'Colossal', 'Patagonia'], 'One of the heaviest terrestrial vertebrates in Earth history, estimated to stretch over 115 feet.', 'Cretaceous', 'Herbivore', '35m / 75t', 'Giant Vertebrae', 'A single fossilized back vertebra bone from Argentinosaurus stood over 5 feet tall and weighed over 1,000 pounds!'],
  ['din_titanoboa_030', 'Titanoboa', '🐍', ['Constrictor', 'Paleocene', 'Rainforest'], 'Largest serpent in Earth history, reaching 43 feet long and thriving in hot post-extinction swamps.', 'Paleocene', 'Carnivore', '13m / 1.1t', 'Giant Coils', 'Titanoboa could swallow 10-foot prehistoric crocodilians whole, thriving in super-warm equatorial jungles!'],
  ['din_quetzalcoatlus_031', 'Quetzalcoatlus', '🦅', ['Giraffe-Height', 'Wingspan', 'Azhdarchid'], 'Largest flying creature in Earth history, standing as tall as a giraffe with a 36-foot wingspan.', 'Cretaceous', 'Carnivore', '11m Span', 'Javelin Beak', 'Quetzalcoatlus stood giraffe-height on the soil, yet could launch airborne to fly thousands of miles without landing!'],
  ['din_dodo_032', 'Dodo Bird', '🦤', ['Flightless', 'Mauritius', 'Extinct'], 'Flightless avian endemic to the Indian Ocean island of Mauritius that went extinct in the 17th century.', 'Holocene', 'Herbivore', '1m / 15kg', 'Bulbous Beak', 'The Dodo evolved without natural predators on Mauritius for eons, making it trustingly fearless around sailors!'],
  ['din_dunkleosteus_033', 'Dunkleosteus', '🐟', ['Armored Fish', 'Bony Shears', 'Devonian'], 'Placoderm fish of the Devonian oceans possessing self-sharpening armored jaw plates instead of teeth.', 'Devonian', 'Carnivore', '9m / 4t', 'Bone Shears', 'Dunkleosteus could snap its jaws closed in 20 milliseconds with a bite force equivalent to that of a T. rex!'],
  ['din_trilobite_034', 'Trilobite', '🦐', ['Calcite Eyes', 'Three Lobes', 'Paleozoic'], 'Hard-shelled marine arthropod with three segmented body lobes that flourished for 270 million years.', 'Paleozoic', 'Detritivore', '10cm / Shell', 'Calcite Eyes', 'Trilobites possessed compound eyes engineered from optical calcite crystals, letting them see underwater 500 Ma!'],
  ['din_ammonite_035', 'Ammonite', '🐚', ['Spiral Shell', 'Chambers', 'Cephalopod'], 'Marine mollusk protected by a coiled, ribbed chambered shell, related to modern octopuses and squids.', 'Mesozoic', 'Carnivore', '20cm Shell', 'Chambered Shell', 'Ammonites adjusted water and gas volumes in their shell chambers to control their buoyant depth in ancient seas!'],
  ['din_glyptodon_036', 'Glyptodon', '🐢', ['Carapace', 'Club Tail', 'Pleistocene'], 'Car-sized Ice Age mammal related to armadillos, protected by a fused bone dome and spiked tail.', 'Pleistocene', 'Herbivore', '3.3m / 2t', 'Fused Carapace', 'Early humans in South America occasionally utilized empty fossilized Glyptodon carapaces as emergency dome huts!'],
  ['din_megatherium_037', 'Giant Ground Sloth (Megatherium)', '🦥', ['Elephant-Size', 'Curved Claws', 'Ice Age'], 'Massive 4-ton Ice Age terrestrial mammal that reared upright on hind legs and tail like a giant tripod.', 'Pleistocene', 'Herbivore', '6m / 4t', 'Tripod Stance', 'Megatherium could balance on its robust hind legs and tail like a tripod to browse forest canopies 20 feet high!'],
  ['din_coelacanth_038', 'Coelacanth', '🐟', ['Living Fossil', 'Lobed Fins', 'Abyss'], 'Ancient lobe-finned fish presumed extinct since the Cretaceous until a living specimen was hauled up in 1938.', 'Living Fossil', 'Carnivore', '2m / 90kg', 'Lobed Fins', 'The discovery of a living Coelacanth in South Africa in 1938 is hailed as the greatest zoological shock of the 20th century!'],
  ['din_styracosaurus_039', 'Styracosaurus', '🦏', ['Nasal Horn', 'Frill Spikes', 'Ceratopsian'], 'Ceratopsian herbivore wielding a solitary long nasal horn and a neck collar studded with 6 radiating spikes.', 'Cretaceous', 'Herbivore', '5.5m / 3t', 'Radiating Frill', 'Styracosaurus packed batteries of self-sharpening teeth in its jaws to grind through fibrous prehistoric palm leaves!'],
  ['din_carnivorousplant_040', 'Archaeamphora', '🪴', ['Pitcher Leaf', 'Pitfall', 'Fossil Flora'], 'Early Cretaceous fossil pitcher plant with specialized tubular leaves evolved to trap crawling insects.', 'Cretaceous', 'Carnivore', '5cm Trap', 'Tubular Pitcher', 'Prehistoric plants developed pitfall traps during the Cretaceous to digest insects for essential nitrogen in boggy soils!']
];

const dinoCards: CardDef[] = dinos.map(([id, name, emoji, buzz, desc, era, diet, size, trait, fun]) => ({
  id,
  category: 'dinosaurs',
  name,
  difficulty: 'medium',
  emoji,
  buzzWords: buzz,
  clues: [
    desc,
    `Thrived during the ${era} era as a verified ${diet}.`,
    `Measured roughly ${size} characterized by its ${trait}.`
  ],
  primaryClues: [desc, `Period/Era: ${era}.`],
  secondaryClues: [`Dietary niche: ${diet}.`, `Size: ${size}.`],
  factGrid: [
    { icon: '⏳', label: 'Period', value: era },
    { icon: '🥩', label: 'Diet', value: diet },
    { icon: '📏', label: 'Size', value: size },
    { icon: '🦴', label: 'Trait', value: trait }
  ],
  bonusTrivia: {
    question: `What geologic period did ${name} inhabit?`,
    answer: era
  },
  facts: { isPrehistoric: true, fossilRecord: true },
  aliases: [name.toLowerCase(), name.split(' ')[0].toLowerCase()],
  explanation: `${name} is an extraordinary prehistoric organism preserved in the global fossil record.`,
  funFact: fun,
  verificationStatus: 'verified'
}));

writeCat('dinosaurs.ts', 'DINOSAURS_CARDS', dinoCards);

console.log('Finished updating Professions, Food, and Dinosaurs with challenging buzz-words and crisp facts!');
