export type SchoolInfo = {
  id: string
  name: string
  shortName: string
  region?: string
  color?: string
}

export const POPULAR_PH_SCHOOLS: SchoolInfo[] = [
  // Big 4 & UAAP
  { id: 'up-diliman', name: 'University of the Philippines Diliman', shortName: 'UP Diliman', color: '#7b1113' },
  { id: 'up-manila', name: 'University of the Philippines Manila', shortName: 'UP Manila', color: '#7b1113' },
  { id: 'up-losbanos', name: 'University of the Philippines Los Baños', shortName: 'UPLB', color: '#7b1113' },
  { id: 'ateneo-manila', name: 'Ateneo de Manila University', shortName: 'ADMU', color: '#0038a8' },
  { id: 'dlsu-manila', name: 'De La Salle University Manila', shortName: 'DLSU', color: '#00703c' },
  { id: 'ust', name: 'University of Santo Tomas', shortName: 'UST', color: '#fdb913' },
  { id: 'pup-manila', name: 'Polytechnic University of the Philippines', shortName: 'PUP', color: '#880000' },
  { id: 'feu-manila', name: 'Far Eastern University', shortName: 'FEU', color: '#005a36' },
  { id: 'mapua', name: 'Mapúa University', shortName: 'Mapúa', color: '#c41230' },
  { id: 'adamson', name: 'Adamson University', shortName: 'Adamson', color: '#002b49' },
  { id: 'nu-manila', name: 'National University', shortName: 'NU', color: '#27348b' },
  { id: 'ue-manila', name: 'University of the East', shortName: 'UE', color: '#d81e05' },

  // NCAA & Major Private / State Colleges
  { id: 'san-beda', name: 'San Beda University', shortName: 'San Beda', color: '#c00000' },
  { id: 'csb', name: 'De La Salle - College of Saint Benilde', shortName: 'DLS-CSB', color: '#005a36' },
  { id: 'letran', name: 'Colegio de San Juan de Letran', shortName: 'Letran', color: '#002060' },
  { id: 'plm', name: 'Pamantasan ng Lungsod ng Maynila', shortName: 'PLM', color: '#c29b38' },
  { id: 'tup-manila', name: 'Technological University of the Philippines', shortName: 'TUP', color: '#800000' },
  { id: 'rtu', name: 'Rizal Technological University', shortName: 'RTU', color: '#003366' },
  { id: 'ceu-manila', name: 'Centro Escolar University', shortName: 'CEU', color: '#d94781' },
  { id: 'san-sebastian', name: 'San Sebastian College - Recoletos', shortName: 'San Sebastian', color: '#b81237' },
  { id: 'uap', name: 'University of Asia and the Pacific', shortName: 'UA&P', color: '#8b0000' },
  { id: 'miriam', name: 'Miriam College', shortName: 'Miriam', color: '#006633' },
  { id: 'tip', name: 'Technological Institute of the Philippines', shortName: 'TIP', color: '#ffcc00' },

  // Luzon, Visayas & Mindanao Major Universities
  { id: 'slu-baguio', name: 'Saint Louis University (Baguio)', shortName: 'SLU', color: '#003399' },
  { id: 'hau-pampanga', name: 'Holy Angel University', shortName: 'HAU', color: '#7a1f3d' },
  { id: 'usc-cebu', name: 'University of San Carlos', shortName: 'USC', color: '#006837' },
  { id: 'cit-cebu', name: 'Cebu Institute of Technology - University', shortName: 'CIT-U', color: '#8b0000' },
  { id: 'usjr-cebu', name: 'University of San Jose-Recoletos', shortName: 'USJ-R', color: '#00502f' },
  { id: 'silliman', name: 'Silliman University', shortName: 'Silliman', color: '#990000' },
  { id: 'wvsu', name: 'West Visayas State University', shortName: 'WVSU', color: '#003366' },
  { id: 'cpu-iloilo', name: 'Central Philippine University', shortName: 'CPU', color: '#ffcc00' },
  { id: 'addu-davao', name: 'Ateneo de Davao University', shortName: 'AdDU', color: '#002060' },
  { id: 'usep-davao', name: 'University of Southeastern Philippines', shortName: 'USeP', color: '#800000' },
  { id: 'xu-cagayan', name: 'Xavier University - Ateneo de Cagayan', shortName: 'Xavier Ateneo', color: '#002244' },
  { id: 'msu-iit', name: 'Mindanao State University - IIT', shortName: 'MSU-IIT', color: '#8b0000' },
  { id: 'ustp', name: 'Univ. of Science and Technology of Southern PH', shortName: 'USTP', color: '#003366' },
]

export const MATCH_PREFERENCES = [
  {
    id: 'any',
    label: '🎲 Anyone (Any School)',
    description: 'Match with any student currently online in the Philippines',
  },
  {
    id: 'same',
    label: '🏫 Same School',
    description: 'Match strictly with students from your campus',
  },
  {
    id: 'different',
    label: '⚔️ Different School',
    description: 'Meet batchmates from other colleges & universities',
  },
] as const

export type MatchPreference = (typeof MATCH_PREFERENCES)[number]['id']

