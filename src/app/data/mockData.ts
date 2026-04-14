export interface Trip {
  id: string;
  name: string;
  category: 'weekend' | 'short' | 'long';
  duration: string;
  image: string;
  description: string;
  overview: string;
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  saved?: boolean;
  completed?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  type: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  cuisine: string;
}

export interface Food {
  id: string;
  name: string;
  image: string;
  description: string;
  type: 'veg' | 'non-veg';
  category?: string;
  locationTag?: string;
}

export interface CombinedDestinationContent {
  premiumStays?: Hotel[];
  restaurants: Restaurant[];
  culinaryDelights: Food[];
}

export interface DiaryPost {
  id: string;
  username: string;
  caption: string;
  image: string;
  timestamp: string;
  location: string;
  userId: string;
}

export const trips: Trip[] = [
  // Weekend Trips (2-3 Days)
  {
    id: '1',
    name: '2 Days in Jaipur',
    category: 'weekend',
    duration: '2 Days',
    image: 'https://images.unsplash.com/photo-1706961121783-4ae6c933983a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBoYXdhJTIwbWFoYWx8ZW58MXx8fHwxNzcxNzc5MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Explore the Pink City - Royal palaces, forts, and vibrant bazaars',
    overview: 'Experience the grandeur of Rajasthan with visits to magnificent forts, palaces, and local markets. Jaipur offers a perfect blend of history, culture, and traditional Rajasthani hospitality.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & City Palace',
        activities: [
          'Arrive in Jaipur and check into heritage hotel',
          'Visit City Palace and Jantar Mantar',
          'Explore Hawa Mahal (Palace of Winds)',
          'Evening at Johari Bazaar for shopping',
          'Traditional Rajasthani dinner with folk dance'
        ]
      },
      {
        day: 2,
        title: 'Amber Fort & Departure',
        activities: [
          'Morning visit to Amber Fort with elephant ride',
          'Stop at Jal Mahal for photos',
          'Visit Nahargarh Fort for city views',
          'Lunch at local restaurant',
          'Last minute shopping at Bapu Bazaar',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  },
  {
    id: '2',
    name: 'Weekend in Rishikesh',
    category: 'weekend',
    duration: '2 Days',
    image: 'https://images.unsplash.com/photo-1701709488066-8d32fe5871b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXNoaWtlc2glMjB5b2dhJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Yoga capital of the world - Spiritual retreat by the Ganges',
    overview: 'Find peace and adventure in Rishikesh with yoga sessions, river rafting, and spiritual experiences along the holy Ganges.',
    itinerary: [
      {
        day: 1,
        title: 'Spiritual Awakening',
        activities: [
          'Early morning yoga session by the Ganges',
          'Visit Laxman Jhula and Ram Jhula',
          'Explore Beatles Ashram',
          'Attend Ganga Aarti at Triveni Ghat',
          'Dinner at a riverside café'
        ]
      },
      {
        day: 2,
        title: 'Adventure & Meditation',
        activities: [
          'White water rafting in the Ganges',
          'Visit Neer Garh Waterfall',
          'Meditation session at ashram',
          'Explore local markets',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },
  {
    id: '3',
    name: '3 Days in Udaipur',
    category: 'weekend',
    duration: '3 Days',
    image: 'https://images.unsplash.com/photo-1622018135960-249abd263aeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwbGFrZSUyMHBhbGFjZXxlbnwxfHx8fDE3NzE4NzI4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'City of Lakes - Romantic palaces and serene waters',
    overview: 'Explore the Venice of the East with its stunning lake palaces, rich history, and royal heritage.',
    itinerary: [
      {
        day: 1,
        title: 'Lake Palace & City Tour',
        activities: [
          'Boat ride on Lake Pichola',
          'Visit Lake Palace and Jag Mandir',
          'City Palace exploration',
          'Sunset at Sajjangarh Fort',
          'Dinner at rooftop restaurant'
        ]
      },
      {
        day: 2,
        title: 'Cultural Experience',
        activities: [
          'Visit Saheliyon Ki Bari gardens',
          'Explore Bagore Ki Haveli Museum',
          'Traditional art and craft shopping',
          'Evening cultural show at Bagore',
          'Lakeside walk'
        ]
      },
      {
        day: 3,
        title: 'Local Exploration',
        activities: [
          'Morning visit to Eklingji Temple',
          'Shilpgram craft village',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  },
  {
    id: '4',
    name: '2 Days in Pondicherry',
    category: 'weekend',
    duration: '2 Days',
    image: 'https://images.unsplash.com/photo-1647193799828-f887e6f49720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb25kaWNoZXJyeSUyMHllbGxvdyUyMGJ1aWxkaW5nJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'French connection - Colonial charm meets Indian culture',
    overview: 'Experience the unique blend of French and Tamil cultures in this charming coastal town.',
    itinerary: [
      {
        day: 1,
        title: 'French Quarter & Beach',
        activities: [
          'Walk through French Quarter',
          'Visit Auroville',
          'Promenade beach walk',
          'French café lunch',
          'Shopping on Rue de la Marine'
        ]
      },
      {
        day: 2,
        title: 'Temples & Departure',
        activities: [
          'Visit Aurobindo Ashram',
          'Matrimandir meditation',
          'Paradise Beach',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },

  // Short Trips (4-5 Days)
  {
    id: '5',
    name: '5 Days in Kerala',
    category: 'short',
    duration: '5 Days',
    image: 'https://images.unsplash.com/photo-1707893013488-51672ef83425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc3MTgyOTc1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'God\'s Own Country - Backwaters, beaches, and hill stations',
    overview: 'Experience the natural beauty of Kerala with houseboat stays, tea plantations, and Ayurvedic wellness.',
    itinerary: [
      {
        day: 1,
        title: 'Cochin Arrival',
        activities: [
          'Arrive in Cochin',
          'Fort Kochi exploration',
          'Chinese fishing nets',
          'Kathakali dance show',
          'Seafood dinner'
        ]
      },
      {
        day: 2,
        title: 'Munnar Hills',
        activities: [
          'Drive to Munnar',
          'Tea plantation visit',
          'Eravikulam National Park',
          'Echo Point',
          'Stay in hill resort'
        ]
      },
      {
        day: 3,
        title: 'Munnar to Alleppey',
        activities: [
          'Morning tea garden walk',
          'Drive to Alleppey',
          'Check into houseboat',
          'Backwater cruise',
          'Overnight on houseboat'
        ]
      },
      {
        day: 4,
        title: 'Backwaters Experience',
        activities: [
          'Village visits from houseboat',
          'Traditional Kerala lunch',
          'Sunset cruise',
          'Ayurvedic massage',
          'Local cuisine dinner'
        ]
      },
      {
        day: 5,
        title: 'Departure',
        activities: [
          'Morning backwater views',
          'Transfer to Cochin',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },
  {
    id: '6',
    name: '4 Days in Himachal',
    category: 'short',
    duration: '4 Days',
    image: 'https://images.unsplash.com/photo-1692718605027-71424c748e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hY2hhbCUyMHByYWRlc2glMjBtb3VudGFpbnN8ZW58MXx8fHwxNzcxODcyODI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Himalayan paradise - Snow peaks, valleys, and adventure',
    overview: 'Discover the scenic beauty of Himachal Pradesh with visits to Manali, Solang Valley, and Rohtang Pass.',
    itinerary: [
      {
        day: 1,
        title: 'Manali Arrival',
        activities: [
          'Arrive in Manali',
          'Check into hotel',
          'Mall Road exploration',
          'Hidimba Devi Temple',
          'Local market shopping'
        ]
      },
      {
        day: 2,
        title: 'Solang Valley Adventure',
        activities: [
          'Visit Solang Valley',
          'Paragliding and zorbing',
          'Cable car ride',
          'Snow activities',
          'Return to Manali'
        ]
      },
      {
        day: 3,
        title: 'Rohtang Pass Excursion',
        activities: [
          'Early morning to Rohtang Pass',
          'Snow activities and photography',
          'Visit Rahala Waterfalls',
          'Hot springs at Vashisht',
          'Evening at Old Manali'
        ]
      },
      {
        day: 4,
        title: 'Local Sightseeing & Departure',
        activities: [
          'Manu Temple visit',
          'Vashisht Village',
          'Shopping for woolens',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  },
  {
    id: '7',
    name: '5 Days in Goa',
    category: 'short',
    duration: '5 Days',
    image: 'https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGluZGlhfGVufDF8fHx8MTc3MTc2ODgxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Beach paradise - Sun, sand, and Portuguese heritage',
    overview: 'Enjoy Goa\'s beaches, Portuguese architecture, water sports, and vibrant nightlife.',
    itinerary: [
      {
        day: 1,
        title: 'North Goa Beaches',
        activities: [
          'Arrive in Goa',
          'Calangute Beach',
          'Baga Beach water sports',
          'Beach shacks dinner',
          'Night market shopping'
        ]
      },
      {
        day: 2,
        title: 'Fort & Churches',
        activities: [
          'Aguada Fort',
          'Basilica of Bom Jesus',
          'Se Cathedral',
          'Old Goa exploration',
          'Panjim heritage walk'
        ]
      },
      {
        day: 3,
        title: 'South Goa Serenity',
        activities: [
          'Colva Beach',
          'Palolem Beach',
          'Cabo de Rama Fort',
          'Sunset at beach',
          'Seafood dinner'
        ]
      },
      {
        day: 4,
        title: 'Island & Spice',
        activities: [
          'Dudhsagar Waterfalls',
          'Spice plantation tour',
          'Traditional Goan lunch',
          'Evening at Anjuna',
          'Flea market'
        ]
      },
      {
        day: 5,
        title: 'Leisure & Departure',
        activities: [
          'Beach relaxation',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: true
  },
  {
    id: '8',
    name: '4 Days in Varanasi & Prayagraj',
    category: 'short',
    duration: '4 Days',
    image: 'https://images.unsplash.com/photo-1653200986939-c1a8e62f96a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXJhbmFzaSUyMGdhbmdlcyUyMHJpdmVyfGVufDF8fHx8MTc3MTg3MjgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Spiritual journey - Ancient ghats and sacred rivers',
    overview: 'Experience the spiritual heart of India with ancient temples, holy Ganges, and timeless traditions.',
    itinerary: [
      {
        day: 1,
        title: 'Varanasi Ghats',
        activities: [
          'Arrive in Varanasi',
          'Evening Ganga Aarti at Dashashwamedh Ghat',
          'Boat ride on Ganges',
          'Walk through old city lanes',
          'Street food tour'
        ]
      },
      {
        day: 2,
        title: 'Temples & Sarnath',
        activities: [
          'Early morning boat ride at sunrise',
          'Kashi Vishwanath Temple',
          'Visit Sarnath (Buddhist site)',
          'Banaras Hindu University',
          'Silk weaving center visit'
        ]
      },
      {
        day: 3,
        title: 'Prayagraj Excursion',
        activities: [
          'Drive to Prayagraj (Allahabad)',
          'Triveni Sangam (confluence of rivers)',
          'Allahabad Fort',
          'Anand Bhawan',
          'Return to Varanasi'
        ]
      },
      {
        day: 4,
        title: 'Local Experience & Departure',
        activities: [
          'Morning yoga by Ganges',
          'Last temple visits',
          'Shopping for Banarasi silk',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },

  // Long Trips (6-7+ Days)
  {
    id: '9',
    name: '7 Days in Rajasthan',
    category: 'long',
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1670687174580-c003b4716959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBjYW1lbHxlbnwxfHx8fDE3NzE3Njg4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Royal heritage tour - Forts, palaces, and desert camps',
    overview: 'Complete Rajasthan circuit covering Jaipur, Jodhpur, Jaisalmer, and Udaipur with royal experiences.',
    itinerary: [
      {
        day: 1,
        title: 'Jaipur - Pink City',
        activities: [
          'Arrive in Jaipur',
          'City Palace and Hawa Mahal',
          'Jantar Mantar',
          'Evening bazaar shopping',
          'Heritage hotel stay'
        ]
      },
      {
        day: 2,
        title: 'Jaipur Forts',
        activities: [
          'Amber Fort with elephant ride',
          'Jal Mahal photo stop',
          'Nahargarh Fort sunset',
          'Chokhi Dhani cultural evening'
        ]
      },
      {
        day: 3,
        title: 'Jodhpur - Blue City',
        activities: [
          'Drive to Jodhpur',
          'Mehrangarh Fort',
          'Jaswant Thada',
          'Clock Tower market',
          'Blue city walk'
        ]
      },
      {
        day: 4,
        title: 'Jaisalmer - Golden City',
        activities: [
          'Drive to Jaisalmer',
          'Jaisalmer Fort exploration',
          'Patwon Ki Haveli',
          'Evening at Gadisar Lake',
          'Heritage hotel check-in'
        ]
      },
      {
        day: 5,
        title: 'Desert Safari',
        activities: [
          'Sam Sand Dunes',
          'Camel safari',
          'Desert camp stay',
          'Cultural program',
          'Stargazing in desert'
        ]
      },
      {
        day: 6,
        title: 'Udaipur - City of Lakes',
        activities: [
          'Drive to Udaipur',
          'Lake Pichola boat ride',
          'City Palace',
          'Jagdish Temple',
          'Sunset at Sajjangarh'
        ]
      },
      {
        day: 7,
        title: 'Udaipur & Departure',
        activities: [
          'Saheliyon Ki Bari',
          'Bagore Ki Haveli',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  },
  {
    id: '10',
    name: '8 Days in Northeast India',
    category: 'long',
    duration: '8 Days',
    image: 'https://images.unsplash.com/photo-1594514335842-8e986a014c98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMG1lZ2hhbGF5YXxlbnwxfHx8fDE3NzE4NzI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Unexplored beauty - Living root bridges and misty mountains',
    overview: 'Discover the hidden gems of Northeast India with Meghalaya\'s natural wonders and tribal culture.',
    itinerary: [
      {
        day: 1,
        title: 'Guwahati Arrival',
        activities: [
          'Arrive in Guwahati',
          'Kamakhya Temple',
          'Brahmaputra river cruise',
          'Assamese dinner',
          'Overnight in Guwahati'
        ]
      },
      {
        day: 2,
        title: 'Shillong - Scotland of East',
        activities: [
          'Drive to Shillong',
          'Elephant Falls',
          'Shillong Peak',
          'Police Bazaar',
          'Check into hotel'
        ]
      },
      {
        day: 3,
        title: 'Cherrapunji',
        activities: [
          'Drive to Cherrapunji',
          'Nohkalikai Falls',
          'Mawsmai Cave',
          'Seven Sisters Falls',
          'Living root bridge trek'
        ]
      },
      {
        day: 4,
        title: 'Double Decker Root Bridge',
        activities: [
          'Trek to Double Decker Living Root Bridge',
          'Natural pool swimming',
          'Village interaction',
          'Return to Cherrapunji'
        ]
      },
      {
        day: 5,
        title: 'Dawki & Mawlynnong',
        activities: [
          'Crystal clear Umngot river at Dawki',
          'Boating experience',
          'Asia\'s cleanest village - Mawlynnong',
          'Sky walk',
          'Return to Shillong'
        ]
      },
      {
        day: 6,
        title: 'Kaziranga National Park',
        activities: [
          'Drive to Kaziranga',
          'Evening safari preparation',
          'Cultural program',
          'Overnight near park'
        ]
      },
      {
        day: 7,
        title: 'Kaziranga Safari',
        activities: [
          'Early morning elephant safari',
          'Jeep safari in central zone',
          'One-horned rhino spotting',
          'Bird watching',
          'Return to Guwahati'
        ]
      },
      {
        day: 8,
        title: 'Departure',
        activities: [
          'Morning leisure',
          'Shopping for tea and handicrafts',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: false
  },
  {
    id: '11',
    name: '7 Days in Kashmir',
    category: 'long',
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXNobWlyJTIwZGFsJTIwbGFrZXxlbnwxfHx8fDE3NzE4NzI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Paradise on Earth - Dal Lake, gardens, and snow peaks',
    overview: 'Experience the breathtaking beauty of Kashmir with houseboat stays, Mughal gardens, and alpine meadows.',
    itinerary: [
      {
        day: 1,
        title: 'Srinagar Arrival',
        activities: [
          'Arrive in Srinagar',
          'Check into houseboat on Dal Lake',
          'Shikara ride',
          'Floating market visit',
          'Mughlai dinner on houseboat'
        ]
      },
      {
        day: 2,
        title: 'Mughal Gardens',
        activities: [
          'Nishat Bagh',
          'Shalimar Bagh',
          'Chashme Shahi',
          'Pari Mahal',
          'Shopping at Lal Chowk'
        ]
      },
      {
        day: 3,
        title: 'Gulmarg - Meadow of Flowers',
        activities: [
          'Drive to Gulmarg',
          'Gondola cable car ride (Asia\'s highest)',
          'Snow activities',
          'Alpine meadow walk',
          'Return to Srinagar'
        ]
      },
      {
        day: 4,
        title: 'Pahalgam - Valley of Shepherds',
        activities: [
          'Drive to Pahalgam',
          'Betaab Valley',
          'Aru Valley',
          'Lidder river activities',
          'Overnight in Pahalgam'
        ]
      },
      {
        day: 5,
        title: 'Pahalgam Exploration',
        activities: [
          'Baisaran meadows (Mini Switzerland)',
          'Horse riding',
          'Nature walks',
          'Return to Srinagar',
          'Houseboat dinner'
        ]
      },
      {
        day: 6,
        title: 'Sonamarg Day Trip',
        activities: [
          'Early morning to Sonamarg (Meadow of Gold)',
          'Thajiwas Glacier visit',
          'Sindh River views',
          'Photography',
          'Return to Srinagar'
        ]
      },
      {
        day: 7,
        title: 'Local Crafts & Departure',
        activities: [
          'Visit carpet weaving centers',
          'Pashmina shawl shopping',
          'Kashmiri handicraft markets',
          'Departure'
        ]
      }
    ],
    saved: false,
    completed: true
  },
  {
    id: '12',
    name: '10 Days Golden Triangle',
    category: 'long',
    duration: '10 Days',
    image: 'https://images.unsplash.com/photo-1551857704-ba9b620ad444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMHN1bnJpc2UlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Classic India tour - Delhi, Agra, Jaipur with extensions',
    overview: 'The most iconic India circuit covering historical monuments, royal palaces, and cultural experiences.',
    itinerary: [
      {
        day: 1,
        title: 'Delhi Arrival & Old Delhi',
        activities: [
          'Arrive in Delhi',
          'Red Fort',
          'Jama Masjid',
          'Chandni Chowk rickshaw ride',
          'Raj Ghat'
        ]
      },
      {
        day: 2,
        title: 'New Delhi Sightseeing',
        activities: [
          'India Gate',
          'Rashtrapati Bhavan drive',
          'Qutub Minar',
          'Humayun\'s Tomb',
          'Lotus Temple',
          'Evening at Connaught Place'
        ]
      },
      {
        day: 3,
        title: 'Delhi to Agra',
        activities: [
          'Drive to Agra',
          'Agra Fort',
          'Mehtab Bagh sunset view of Taj',
          'Local market',
          'Overnight in Agra'
        ]
      },
      {
        day: 4,
        title: 'Taj Mahal & Fatehpur Sikri',
        activities: [
          'Sunrise at Taj Mahal',
          'Detailed Taj exploration',
          'Itimad-ud-Daulah (Baby Taj)',
          'Drive to Fatehpur Sikri',
          'Explore abandoned Mughal city'
        ]
      },
      {
        day: 5,
        title: 'Agra to Jaipur via Abhaneri',
        activities: [
          'Drive to Jaipur',
          'Stop at Abhaneri Stepwell',
          'Arrive in Jaipur',
          'Evening free for rest',
          'Heritage hotel check-in'
        ]
      },
      {
        day: 6,
        title: 'Jaipur - Amber Fort',
        activities: [
          'Amber Fort with elephant ride',
          'Jal Mahal',
          'Nahargarh Fort',
          'Light & sound show at Amber',
          'Rajasthani dinner'
        ]
      },
      {
        day: 7,
        title: 'Jaipur City Tour',
        activities: [
          'City Palace',
          'Jantar Mantar',
          'Hawa Mahal',
          'Albert Hall Museum',
          'Johari and Bapu Bazaar shopping'
        ]
      },
      {
        day: 8,
        title: 'Pushkar Excursion',
        activities: [
          'Drive to Pushkar',
          'Brahma Temple',
          'Pushkar Lake',
          'Camel fair (if season)',
          'Evening aarti',
          'Return to Jaipur'
        ]
      },
      {
        day: 9,
        title: 'Jaipur to Delhi',
        activities: [
          'Drive back to Delhi',
          'Shopping at Delhi Haat',
          'Dilli Haat cultural complex',
          'Farewell dinner',
          'Hotel check-in'
        ]
      },
      {
        day: 10,
        title: 'Departure',
        activities: [
          'Morning leisure',
          'Last minute shopping',
          'Departure'
        ]
      }
    ],
    saved: true,
    completed: false
  }
];

export const combinedDestinationContentByKey: Record<string, CombinedDestinationContent> = {
  'varanasi-prayagraj': {
    premiumStays: [
      {
        id: 'h8-v-1',
        name: 'Taj Ganges',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwcGFsYWNlJTIwaG90ZWx8ZW58MXx8fHwxNzc1ODUxODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Varanasi',
        rating: 4.6,
        type: 'Luxury Heritage'
      },
      {
        id: 'h8-v-2',
        name: 'BrijRama Palace',
        image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Varanasi',
        rating: 4.7,
        type: 'Heritage Riverside'
      },
      {
        id: 'h8-v-3',
        name: 'Radisson Hotel Varanasi',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc3NTg3MjAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Varanasi',
        rating: 4.4,
        type: 'Luxury Stay'
      },
      {
        id: 'h8-p-1',
        name: 'The Legend Hotel',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzc1ODUxNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Prayagraj',
        rating: 4.3,
        type: 'Boutique Luxury'
      },
      {
        id: 'h8-p-2',
        name: 'Grand Continental Hotel',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRpYW4lMjBob3RlbHxlbnwxfHx8fDE3NzU4NTE5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Prayagraj',
        rating: 4.2,
        type: 'City Stay'
      },
      {
        id: 'h8-p-3',
        name: 'Hotel Kanha Shyam',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMHBhbGFjZSUyMGhvdGVsfGVufDF8fHx8MTc3NTg1MTkwOXww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Prayagraj',
        rating: 4.3,
        type: 'Premium Stay'
      }
    ],
    restaurants: [
      {
        id: 'r8-v-1',
        name: 'Kashi Chat Bhandar',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3NTg2MzA1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Varanasi',
        rating: 4.4,
        cuisine: 'Street Food'
      },
      {
        id: 'r8-v-2',
        name: 'Brown Bread Bakery',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYmFrZXJ5fGVufDF8fHx8MTc3NTg2MzA3MHww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Varanasi',
        rating: 4.5,
        cuisine: 'Cafe & Bakery'
      },
      {
        id: 'r8-v-3',
        name: 'Baati Chokha Restaurant',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aCUyMGluZGlhbiUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc1ODYzMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Varanasi',
        rating: 4.3,
        cuisine: 'Traditional North Indian'
      },
      {
        id: 'r8-v-4',
        name: 'Vegan & Raw Restaurant',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGN1aXNpbmV8ZW58MXx8fHwxNzc1ODYzMDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Varanasi',
        rating: 4.6,
        cuisine: 'Healthy / Vegan'
      },
      {
        id: 'r8-p-1',
        name: 'El Chico Restaurant',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWx0aS1jdWlzaW5lJTIwZGluaW5nfGVufDF8fHx8MTc3NTg2MzEwNnww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Prayagraj',
        rating: 4.4,
        cuisine: 'Multi-cuisine'
      },
      {
        id: 'r8-p-2',
        name: 'Indian Coffee House',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBob3VzZXxlbnwxfHx8fDE3NzU4NjMxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Prayagraj',
        rating: 4.2,
        cuisine: 'Cafe'
      },
      {
        id: 'r8-p-3',
        name: 'Netram Mulchand & Sons',
        image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldHMlMjBhbmQlMjBzbmFja3N8ZW58MXx8fHwxNzc1ODYzMTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Prayagraj',
        rating: 4.5,
        cuisine: 'Sweets & Snacks'
      },
      {
        id: 'r8-p-4',
        name: 'Eden by Connoisseur',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc3NTg2MzE0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        location: 'Prayagraj',
        rating: 4.3,
        cuisine: 'Fine Dining'
      }
    ],
    culinaryDelights: [
      {
        id: 'f8-v-1',
        name: 'Banarasi Paan',
        image: 'https://mrmukhwas.in/wp-content/uploads/2024/12/product-jpeg-500x500-1.png',
        description: 'A fragrant leaf-wrapped mouth freshener and cultural specialty from Varanasi lanes.',
        type: 'veg',
        category: 'Veg',
        locationTag: 'Varanasi'
      },
      {
        id: 'f8-v-2',
        name: 'Kachori Sabzi',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWNob3JpfGVufDF8fHx8MTc3NTg2MzE3NXww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Crispy kachori served with spiced potato curry, a beloved breakfast choice.',
        type: 'veg',
        category: 'Veg',
        locationTag: 'Varanasi'
      },
      {
        id: 'f8-v-3',
        name: 'Tamatar Chaat',
        image: 'https://www.bigbasket.com/media/uploads/recipe/w-l/4512_2_1.jpg',
        description: 'Tangy tomato-based street chaat topped with spices, sev, and crunchy textures.',
        type: 'veg',
        category: 'Veg',
        locationTag: 'Varanasi'
      },
      {
        id: 'f8-v-4',
        name: 'Malaiyyo',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkZXNzZXJ0fGVufDF8fHx8MTc3NTg2MzIwOHww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'A delicate saffron-infused winter dessert with airy milk froth and nuts.',
        type: 'veg',
        category: 'Dessert',
        locationTag: 'Varanasi'
      },
      {
        id: 'f8-p-1',
        name: 'Bedai & Aloo Sabzi',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW5kaWFuJTIwYnJlYWtmYXN0JTIwdGhhbGl8ZW58MXx8fHwxNzc1ODYzMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Fluffy fried bread paired with flavorful potato curry, a classic breakfast plate.',
        type: 'veg',
        category: 'Veg',
        locationTag: 'Prayagraj'
      },
      {
        id: 'f8-p-2',
        name: 'Jalebi',
        image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWxlYml8ZW58MXx8fHwxNzc1ODYzMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Golden syrup-soaked spirals served warm and crisp, a timeless Indian sweet.',
        type: 'veg',
        category: 'Dessert',
        locationTag: 'Prayagraj'
      },
      {
        id: 'f8-p-3',
        name: 'Samosa',
        image: 'https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800',
        description: 'Crispy pastry triangles filled with spiced potatoes and served with chutneys.',
        type: 'veg',
        category: 'Snack',
        locationTag: 'Prayagraj'
      },
      {
        id: 'f8-p-4',
        name: 'Rabri',
        image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2020/10/rabri-rabdi.jpg',
        description: 'Thickened sweetened milk dessert flavored with cardamom and topped with nuts.',
        type: 'veg',
        category: 'Dessert',
        locationTag: 'Prayagraj'
      }
    ]
  }
};

export const tripCombinedDestinationMap: Record<string, string> = {
  '8': 'varanasi-prayagraj'
};

export const hotels: { [tripId: string]: Hotel[] } = {
  '1': [
    {
      id: 'h1',
      name: 'Rambagh Palace',
      image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur, Rajasthan',
      rating: 4.9,
      type: 'Heritage Palace'
    },
    {
      id: 'h2',
      name: 'Alsisar Haveli',
      image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur, Rajasthan',
      rating: 4.7,
      type: 'Heritage Haveli'
    },
    {
      id: 'h3',
      name: 'Samode Haveli',
      image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur, Rajasthan',
      rating: 4.8,
      type: 'Boutique Heritage'
    }
  ],
  '2': [
    {
      id: 'h2-1',
      name: 'The Sitting Elephant Stay',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzc1ODUxNzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Rishikesh, Uttarakhand',
      rating: 4.5,
      type: 'Luxury'
    },
    {
      id: 'h2-2',
      name: 'Freedom Retreat Stay',
      image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsfGVufDF8fHx8MTc3NTg1MTc1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Tapovan, Rishikesh',
      rating: 4.6,
      type: 'Boutique'
    },
    {
      id: 'h2-3',
      name: 'Ganga View Residency',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsfGVufDF8fHx8MTc3NTg1MTc1OHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Rishikesh, Uttarakhand',
      rating: 4.3,
      type: 'Heritage'
    }
  ],
  '3': [
    {
      id: 'h3-1',
      name: 'Taj Lake Palace',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwcGFsYWNlJTIwaG90ZWx8ZW58MXx8fHwxNzc1ODUxODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur, Rajasthan',
      rating: 4.8,
      type: 'Luxury Lake View'
    },
    {
      id: 'h3-2',
      name: 'The Oberoi Udaivilas',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRpYW4lMjBob3RlbHxlbnwxfHx8fDE3NzU4NTE5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur, Rajasthan',
      rating: 4.9,
      type: 'Luxury Heritage'
    },
    {
      id: 'h3-3',
      name: 'Jagat Niwas Palace',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMHBhbGFjZSUyMGhvdGVsfGVufDF8fHx8MTc3NTg1MTkwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur, Rajasthan',
      rating: 4.6,
      type: 'Boutique Lake View'
    }
  ],
  '4': [
    {
      id: 'h4-1',
      name: 'Le Pondy Resort',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NzU4NTIyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pondicherry, India',
      rating: 4.5,
      type: 'Beach Resort'
    },
    {
      id: 'h4-2',
      name: 'Palais de Mahe',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhlcml0YWdlJTIwaG90ZWx8ZW58MXx8fHwxNzc1ODUyMjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pondicherry, India',
      rating: 4.6,
      type: 'Boutique Heritage'
    },
    {
      id: 'h4-3',
      name: 'Villa Shanti',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBjb2xvbmlhbCUyMGhvdGVsfGVufDF8fHx8MTc3NTg1MjIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pondicherry, India',
      rating: 4.4,
      type: 'French Colonial Boutique'
    }
  ],
  '5': [
    {
      id: 'h5-1',
      name: 'Kumarakom Lake Resort',
      image: 'https://cdn.audleytravel.com/1050/750/79/16032636-the-vembanad-restaurant-at-kumarakom-lake-resort.webp',
      location: 'Kerala, India',
      rating: 4.7,
      type: 'Luxury Backwater'
    },
    {
      id: 'h5-2',
      name: 'Taj Bekal Resort & Spa',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGluZGlhfGVufDF8fHx8MTc3NTg1Mjc2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Kerala, India',
      rating: 4.6,
      type: 'Beach Resort'
    },
    {
      id: 'h5-3',
      name: 'Spice Village, Thekkady',
      image: 'https://www.keralatourism.org/images/service-providers/photos/property-2587-profile-4192-20180704153755.jpg',
      location: 'Kerala, India',
      rating: 4.5,
      type: 'Eco Resort'
    }
  ],
  '6': [
    {
      id: 'h6-1',
      name: 'The Oberoi Cecil (Shimla)',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGhpbWFjaGFsfGVufDF8fHx8MTc3NTg1Nzk0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Shimla, Himachal Pradesh',
      rating: 4.7,
      type: 'Luxury Heritage'
    },
    {
      id: 'h6-2',
      name: 'Span Resort & Spa (Manali)',
      image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlcmZyb250JTIwcmVzb3J0fGVufDF8fHx8MTc3NTg1Nzk0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Manali, Himachal Pradesh',
      rating: 4.6,
      type: 'Riverfront Resort'
    },
    {
      id: 'h6-3',
      name: 'Snow Valley Resorts (Manali)',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJlc29ydHxlbnwxfHx8fDE3NzU4NTc5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Manali, Himachal Pradesh',
      rating: 4.4,
      type: 'Mountain View'
    }
  ],
  '7': [
    {
      id: 'h7-1',
      name: 'Taj Exotica Resort & Spa',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NzU4NTg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Goa, India',
      rating: 4.7,
      type: 'Luxury Beach Resort'
    },
    {
      id: 'h7-2',
      name: 'W Goa',
      image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlYWNofGVufDF8fHx8MTc3NTg1ODQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Goa, India',
      rating: 4.6,
      type: 'Luxury Lifestyle'
    },
    {
      id: 'h7-3',
      name: 'Zuri White Sands',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/309284975.jpg?k=db9f18915337dbe32061796ef225edfd1172d659a4187aa93892086fe19e02e9&o=',
      location: 'Goa, India',
      rating: 4.5,
      type: 'Beach Resort'
    }
  ],
  '9': [
    {
      id: 'h9-1',
      name: 'Taj Lake Palace',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwcGFsYWNlJTIwaG90ZWx8ZW58MXx8fHwxNzc1ODUxODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur, Rajasthan',
      rating: 4.8,
      type: 'Luxury Lake View'
    },
    {
      id: 'h9-2',
      name: 'The Oberoi Udaivilas',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRpYW4lMjBob3RlbHxlbnwxfHx8fDE3NzU4NTE5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur, Rajasthan',
      rating: 4.9,
      type: 'Ultra Luxury Heritage'
    },
    {
      id: 'h9-3',
      name: 'Rambagh Palace',
      image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur, Rajasthan',
      rating: 4.7,
      type: 'Royal Heritage'
    },
    {
      id: 'h9-4',
      name: 'Umaid Bhawan Palace',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwaGVyaXRhZ2UlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NTg2MzgyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jodhpur, Rajasthan',
      rating: 4.8,
      type: 'Palace Luxury'
    }
  ],
  '10': [
    {
      id: 'h10-1',
      name: 'Radisson Blu Hotel',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc3NTg2OTAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Guwahati',
      rating: 4.5,
      type: 'Luxury City Stay'
    },
    {
      id: 'h10-2',
      name: 'Ri Kynjai Resort',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwcmVzb3J0fGVufDF8fHx8MTc3NTg2OTAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Shillong',
      rating: 4.6,
      type: 'Lake View Resort'
    },
    {
      id: 'h10-3',
      name: 'Jiva Resort',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjByZXRyZWF0JTIwaG90ZWx8ZW58MXx8fHwxNzc1ODY5MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Cherrapunji',
      rating: 4.5,
      type: 'Nature Retreat'
    },
    {
      id: 'h10-4',
      name: 'Polo Orchid Resort',
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWxsdG9wJTIwcmVzb3J0fGVufDF8fHx8MTc3NTg2OTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Cherrapunji',
      rating: 4.4,
      type: 'Hilltop Resort'
    },
    {
      id: 'h10-5',
      name: 'Iora - The Retreat',
      image: 'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMHJlc29ydHxlbnwxfHx8fDE3NzU4NjkwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Kaziranga',
      rating: 4.6,
      type: 'Wildlife Resort'
    }
  ],
  '11': [
    {
      id: 'h11-1',
      name: 'The Lalit Grand Palace',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb3VudGFpbiUyMGhvdGVsfGVufDF8fHx8MTc3NTg3MDAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Srinagar',
      rating: 4.6,
      type: 'Luxury Heritage'
    },
    {
      id: 'h11-2',
      name: 'Khyber Himalayan Resort',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxnYXJnJTIwcmVzb3J0fGVufDF8fHx8MTc3NTg3MDAwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Gulmarg',
      rating: 4.7,
      type: 'Mountain Luxury'
    },
    {
      id: 'h11-3',
      name: 'Vivanta Dal View',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWwlMjBsYWtlJTIwaG90ZWx8ZW58MXx8fHwxNzc1ODcwMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Srinagar',
      rating: 4.5,
      type: 'Lake View Luxury'
    },
    {
      id: 'h11-4',
      name: 'WelcomHotel Pine N Peak',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWxsJTIwcmVzb3J0fGVufDF8fHx8MTc3NTg3MDAyMXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pahalgam',
      rating: 4.6,
      type: 'Hill Resort'
    },
    {
      id: 'h11-5',
      name: "Butt's Clermont Houseboats",
      image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZWJvYXQlMjBraGFzaG1pcnx8ZW58MXx8fHwxNzc1ODcwMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Srinagar',
      rating: 4.4,
      type: 'Houseboat Stay'
    }
  ],
  '12': [
    {
      id: 'h12-1',
      name: 'The Imperial',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc3NTg3MjAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Delhi',
      rating: 4.7,
      type: 'Luxury Heritage'
    },
    {
      id: 'h12-2',
      name: 'The Leela Palace',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxhY2UlMjBob3RlbCUyMGluZGlhfGVufDF8fHx8MTc3NTg3MjAwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Delhi',
      rating: 4.8,
      type: 'Ultra Luxury'
    },
    {
      id: 'h12-3',
      name: 'ITC Mughal',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZXJpdGFnZSUyMGhvdGVsfGVufDF8fHx8MTc3NTg3MjAxNnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Agra',
      rating: 4.6,
      type: 'Luxury Heritage'
    },
    {
      id: 'h12-4',
      name: 'Trident Hotel',
      image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHBvb2x8ZW58MXx8fHwxNzc1ODcyMDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Agra',
      rating: 4.5,
      type: 'Luxury Stay'
    },
    {
      id: 'h12-5',
      name: 'Rambagh Palace',
      image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhvdGVsJTIwaW5kaWF8ZW58MXx8fHwxNzcxODcyODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur',
      rating: 4.7,
      type: 'Royal Palace'
    },
    {
      id: 'h12-6',
      name: 'Samode Haveli',
      image: 'https://images.unsplash.com/photo-1720070143795-52e5f5ed7eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGhhdmVsaXxlbnwxfHx8fDE3NzU4NzIwMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur',
      rating: 4.6,
      type: 'Boutique Heritage'
    },
    {
      id: 'h12-7',
      name: 'The Westin Pushkar Resort & Spa',
      image: 'https://assets.cntraveller.in/photos/60ba0938e1b212c19a81732b/16:9/w_1920,h_1080,c_limit/westin-pushkar-lead.jpg',
      location: 'Pushkar',
      rating: 4.5,
      type: 'Resort Luxury'
    }
  ]
};

export const restaurants: { [tripId: string]: Restaurant[] } = {
  '1': [
    {
      id: 'r1',
      name: 'Suvarna Mahal',
      image: 'https://images.unsplash.com/photo-1764314108477-f026172e32a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTg3MjgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Rambagh Palace, Jaipur',
      rating: 4.9,
      cuisine: 'Royal Rajasthani'
    },
    {
      id: 'r2',
      name: 'Chokhi Dhani',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3MTgyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Tonk Road, Jaipur',
      rating: 4.7,
      cuisine: 'Traditional Thali'
    },
    {
      id: 'r3',
      name: 'Laxmi Mishtan Bhandar',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3MTgyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Johari Bazaar, Jaipur',
      rating: 4.6,
      cuisine: 'Rajasthani Snacks'
    }
  ],
  '2': [
    {
      id: 'r2-1',
      name: 'The Sitting Elephant',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwY2FmZXxlbnwxfHx8fDE3NzU4NTE3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Laxman Jhula, Rishikesh',
      rating: 4.5,
      cuisine: 'Rooftop Cafe'
    },
    {
      id: 'r2-2',
      name: 'Little Buddha Cafe',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc3NTg1MTc3MHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Tapovan, Rishikesh',
      rating: 4.3,
      cuisine: 'Cafe and Breakfast'
    },
    {
      id: 'r2-3',
      name: 'Freedom Cafe',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwY2FmZXxlbnwxfHx8fDE3NzU4NTE3NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Laxman Jhula Road, Rishikesh',
      rating: 4.6,
      cuisine: 'Healthy and Vegan'
    },
    {
      id: 'r2-4',
      name: 'Chotiwala Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NTg1MTc4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Swarg Ashram, Rishikesh',
      rating: 4.0,
      cuisine: 'Traditional Indian'
    }
  ],
  '3': [
    {
      id: 'r3-1',
      name: 'Ambrai Restaurant',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwcmVzdGF1cmFudCUyMGxha2V8ZW58MXx8fHwxNzc1ODUxOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur, Rajasthan',
      rating: 4.6,
      cuisine: 'Rooftop Lake View'
    },
    {
      id: 'r3-2',
      name: 'Upre by 1559 AD',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc3NTg1MTkyNHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur, Rajasthan',
      rating: 4.5,
      cuisine: 'Fine Dining'
    },
    {
      id: 'r3-3',
      name: 'Natraj Dining Hall',
      image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW5pJTIwdGhhbGl8ZW58MXx8fHwxNzc1ODUxOTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur, Rajasthan',
      rating: 4.4,
      cuisine: 'Traditional Rajasthani Thali'
    },
    {
      id: 'r3-4',
      name: "Jheel's Ginger Coffee Bar",
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJlYWtmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NzU4NTE5Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur, Rajasthan',
      rating: 4.3,
      cuisine: 'Cafe and Breakfast'
    }
  ],
  '4': [
    {
      id: 'r4-1',
      name: 'Cafe des Arts',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBjYWZlfGVufDF8fHx8MTc3NTg1MjI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pondicherry, India',
      rating: 4.5,
      cuisine: 'French Cafe'
    },
    {
      id: 'r4-2',
      name: 'Surguru Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGluZGlhbiUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc1ODUyMjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pondicherry, India',
      rating: 4.4,
      cuisine: 'South Indian Vegetarian'
    },
    {
      id: 'r4-3',
      name: 'Villa Shanti Restaurant',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU4NTIyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pondicherry, India',
      rating: 4.6,
      cuisine: 'Fine Dining'
    },
    {
      id: 'r4-4',
      name: 'Baker Street',
      image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBjYWZlfGVufDF8fHx8MTc3NTg1MjI2MXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pondicherry, India',
      rating: 4.3,
      cuisine: 'Bakery and Cafe'
    }
  ],
  '5': [
    {
      id: 'r5-1',
      name: 'Dhe Puttu (Kochi)',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NTg1Mjc5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Kochi, Kerala, India',
      rating: 4.4,
      cuisine: 'Traditional Kerala'
    },
    {
      id: 'r5-2',
      name: 'Kashi Art Cafe',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwZnVzaW9ufGVufDF8fHx8MTc3NTg1MjgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Fort Kochi, Kerala, India',
      rating: 4.5,
      cuisine: 'Cafe and Fusion'
    },
    {
      id: 'r5-3',
      name: 'Grand Pavilion',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU4NTI4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Ernakulam, Kerala, India',
      rating: 4.3,
      cuisine: 'South Indian and Seafood'
    },
    {
      id: 'r5-4',
      name: 'Paragon Restaurant (Kozhikode)',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiaXJ5YW5pfGVufDF8fHx8MTc3NTg1MjgzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Kozhikode, Kerala, India',
      rating: 4.6,
      cuisine: 'Famous Kerala Cuisine'
    }
  ],
  '6': [
    {
      id: 'r6-1',
      name: "Johnson's Cafe (Manali)",
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwY29udGluZW50YWx8ZW58MXx8fHwxNzc1ODU3OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Manali, Himachal Pradesh',
      rating: 4.5,
      cuisine: 'Cafe & Continental'
    },
    {
      id: 'r6-2',
      name: 'Cafe 1947 (Manali)',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlcnNpZGUlMjBjYWZlfGVufDF8fHx8MTc3NTg1Nzk3MHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Manali, Himachal Pradesh',
      rating: 4.6,
      cuisine: 'Riverside Cafe'
    },
    {
      id: 'r6-3',
      name: 'Wake & Bake Cafe (Shimla)',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc3NTg1Nzk3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Shimla, Himachal Pradesh',
      rating: 4.4,
      cuisine: 'Cafe & Breakfast'
    },
    {
      id: 'r6-4',
      name: 'Il Forno (Shimla)',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzU4NTc5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Shimla, Himachal Pradesh',
      rating: 4.5,
      cuisine: 'Italian & Fine Dining'
    }
  ],
  '7': [
    {
      id: 'r7-1',
      name: 'Thalassa',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjByZXN0YXVyYW50JTIwYmVhY2h8ZW58MXx8fHwxNzc1ODU4NTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Goa, India',
      rating: 4.5,
      cuisine: 'Greek & Sunset View'
    },
    {
      id: 'r7-2',
      name: "Fisherman's Wharf",
      image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwZGluaW5nfGVufDF8fHx8MTc3NTg1ODUyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Goa, India',
      rating: 4.4,
      cuisine: 'Seafood'
    },
    {
      id: 'r7-3',
      name: 'Vinayak Family Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2FuJTIwZm9vZCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc1ODU4NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Goa, India',
      rating: 4.3,
      cuisine: 'Goan Local Food'
    },
    {
      id: 'r7-4',
      name: 'Pousada by the Beach',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaHNpZGUlMjBkaW5pbmd8ZW58MXx8fHwxNzc1ODU4NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Goa, India',
      rating: 4.6,
      cuisine: 'Beachside Dining'
    }
  ],
  '9': [
    {
      id: 'r9-1',
      name: 'Chokhi Dhani (Jaipur)',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW5pJTIwZm9vZHxlbnwxfHx8fDE3NzU4NjM3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur',
      rating: 4.5,
      cuisine: 'Traditional Rajasthani'
    },
    {
      id: 'r9-2',
      name: '1135 AD Restaurant (Jaipur)',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3lhbCUyMGZpbmUlMjBkaW5pbmd8ZW58MXx8fHwxNzc1ODYzNzk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur',
      rating: 4.6,
      cuisine: 'Royal Fine Dining'
    },
    {
      id: 'r9-3',
      name: 'Ambrai Restaurant (Udaipur)',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdmlldyUyMGRpbmluZ3xlbnwxfHx8fDE3NzU4NjM4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Udaipur',
      rating: 4.6,
      cuisine: 'Lake View Dining'
    },
    {
      id: 'r9-4',
      name: 'Indique Restaurant (Jodhpur)',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwaGVyaXRhZ2UlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NTg2MzgyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jodhpur',
      rating: 4.4,
      cuisine: 'Rooftop & Heritage View'
    }
  ],
  '10': [
    {
      id: 'r10-1',
      name: 'Paradise Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NhbWVzZSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc1ODY5MDQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Guwahati',
      rating: 4.5,
      cuisine: 'Assamese Cuisine'
    },
    {
      id: 'r10-2',
      name: 'Khorikaa',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc1ODY5MDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Guwahati',
      rating: 4.4,
      cuisine: 'Traditional Assamese'
    },
    {
      id: 'r10-3',
      name: 'Cafe Shillong',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1ODY5MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Shillong',
      rating: 4.6,
      cuisine: 'Cafe & Continental'
    },
    {
      id: 'r10-4',
      name: "Dylan's Cafe",
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNhZmV8ZW58MXx8fHwxNzc1ODY5MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Shillong',
      rating: 4.5,
      cuisine: 'Music Cafe'
    },
    {
      id: 'r10-5',
      name: 'Orange Roots',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU4NjkwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Shillong',
      rating: 4.4,
      cuisine: 'Organic & Local Food'
    }
  ],
  '11': [
    {
      id: 'r11-1',
      name: 'Mughal Darbar',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbGFzaG1pcmklMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NTg3MDAzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Srinagar',
      rating: 4.5,
      cuisine: 'Kashmiri Cuisine'
    },
    {
      id: 'r11-2',
      name: 'Ahdoos Restaurant',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGRpbmluZ3xlbnwxfHx8fDE3NzU4NzAwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Srinagar',
      rating: 4.4,
      cuisine: 'Traditional Kashmiri'
    },
    {
      id: 'r11-3',
      name: 'Stream Restaurant',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWx0aS1jdWlzaW5lJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU4NzAwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Srinagar',
      rating: 4.3,
      cuisine: 'Multi-cuisine'
    },
    {
      id: 'r11-4',
      name: 'Bakshi Restaurant',
      image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGRpbmluZ3xlbnwxfHx8fDE3NzU4NzAwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pahalgam',
      rating: 4.2,
      cuisine: 'Local Dining'
    },
    {
      id: 'r11-5',
      name: 'Hotel Highlands Restaurant',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZpZXclMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NTg3MDA2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Gulmarg',
      rating: 4.3,
      cuisine: 'Mountain View Dining'
    }
  ],
  '12': [
    {
      id: 'r12-1',
      name: "Karim's",
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWdobGFpJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU4NzIwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Delhi',
      rating: 4.4,
      cuisine: 'Mughlai'
    },
    {
      id: 'r12-2',
      name: 'Indian Accent',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzU4NzIwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Delhi',
      rating: 4.7,
      cuisine: 'Fine Dining'
    },
    {
      id: 'r12-3',
      name: 'Pinch of Spice',
      image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aCUyMGluZGlhbiUyMGRpbmluZ3xlbnwxfHx8fDE3NzU4NzIwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Agra',
      rating: 4.5,
      cuisine: 'North Indian'
    },
    {
      id: 'r12-4',
      name: 'Esphahan - ITC Mughal',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JhJTIwZmluZSUyMGRpbmluZ3xlbnwxfHx8fDE3NzU4NzIwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Agra',
      rating: 4.6,
      cuisine: 'Fine Dining'
    },
    {
      id: 'r12-5',
      name: 'Chokhi Dhani',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW5pJTIwZm9vZHxlbnwxfHx8fDE3NzU4NjM3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur',
      rating: 4.5,
      cuisine: 'Traditional Rajasthani'
    },
    {
      id: 'r12-6',
      name: 'Handi Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGN1aXNpbmUlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3NTg3MjA4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Jaipur',
      rating: 4.4,
      cuisine: 'Local Cuisine'
    },
    {
      id: 'r12-7',
      name: 'Out of the Blue',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1ODY5MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Pushkar',
      rating: 4.3,
      cuisine: 'Cafe & International'
    }
  ]
};

export const traditionalFoods: { [tripId: string]: Food[] } = {
  '1': [
    {
      id: 'f1',
      name: 'Dal Baati Churma',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMHRyYWRpdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NzE4NzI4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Rajasthan\'s signature dish - lentil curry with baked wheat balls and sweet churma',
      type: 'veg'
    },
    {
      id: 'f2',
      name: 'Laal Maas',
      image: 'https://images.unsplash.com/photo-1764314108477-f026172e32a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTg3MjgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Fiery red mutton curry with authentic Rajasthani spices',
      type: 'non-veg'
    },
    {
      id: 'f3',
      name: 'Ghewar',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3MTgyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Traditional Rajasthani sweet made with flour and soaked in sugar syrup',
      type: 'veg'
    },
    {
      id: 'f4',
      name: 'Pyaaz Kachori',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3MTgyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Crispy fried pastry filled with spiced onion filling',
      type: 'veg'
    }
  ],
  '2': [
    {
      id: 'f2-1',
      name: 'Aloo Puri',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBicmVha2Zhc3R8ZW58MXx8fHwxNzc1ODUxNzg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A comforting North Indian breakfast served hot with mildly spiced potato curry.',
      type: 'veg'
    },
    {
      id: 'f2-2',
      name: 'Garhwali Rajma Chawal',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWptYSUyMGNoYXdhbHxlbnwxfHx8fDE3NzU4NTE3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Local hill-style kidney bean curry served with steamed rice and fresh herbs.',
      type: 'veg'
    },
    {
      id: 'f2-3',
      name: 'Kafuli',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWclMjBjdXJyeXxlbnwxfHx8fDE3NzU4NTE4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A signature Uttarakhand spinach and fenugreek dish with earthy mountain flavors.',
      type: 'veg'
    },
    {
      id: 'f2-4',
      name: 'River Trout Curry',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwY3Vycnl8ZW58MXx8fHwxNzc1ODUxODA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Fresh trout cooked in aromatic local spices, a classic from Himalayan riverside kitchens.',
      type: 'non-veg'
    }
  ],
  '3': [
    {
      id: 'f3-1',
      name: 'Dal Baati Churma',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMHRyYWRpdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NzE4NzI4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A Rajasthani signature plate of baked wheat dumplings, lentils, and sweet churma.',
      type: 'veg'
    },
    {
      id: 'f3-2',
      name: 'Gatte ki Sabzi',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHZlZ3xlbnwxfHx8fDE3NzU4NTE5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Gram flour dumplings cooked in a rich yogurt gravy, a Udaipur home-style favorite.',
      type: 'veg'
    },
    {
      id: 'f3-3',
      name: 'Laal Maas',
      image: 'https://images.unsplash.com/photo-1764314108477-f026172e32a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTg3MjgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A bold mutton curry made with Mathania chilies and aromatic Rajasthani spices.',
      type: 'non-veg'
    },
    {
      id: 'f3-4',
      name: 'Ghewar',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc3MTgyNDgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A honeycomb-like festive sweet soaked in syrup and topped with dry fruits.',
      type: 'veg'
    }
  ],
  '4': [
    {
      id: 'f4-1',
      name: 'French Pastries',
      image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnl8ZW58MXx8fHwxNzc1ODUyMjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Buttery, flaky delights inspired by Pondicherry\'s French culinary heritage.',
      type: 'veg',
      category: 'French Dessert'
    },
    {
      id: 'f4-2',
      name: 'Crepes',
      image: 'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVwZXN8ZW58MXx8fHwxNzc1ODUyMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Thin French pancakes served sweet or savory, popular in White Town cafes.',
      type: 'veg',
      category: 'Cafe Special'
    },
    {
      id: 'f4-3',
      name: 'South Indian Thali',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaXxlbnwxfHx8fDE3NzU4NTIyODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A complete vegetarian meal featuring rice, sambar, rasam, poriyal, and chutneys.',
      type: 'veg',
      category: 'Local Meal'
    },
    {
      id: 'f4-4',
      name: 'Seafood Curry',
      image: 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwY3Vycnl8ZW58MXx8fHwxNzc1ODUyMjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Fresh coastal catch simmered in a spiced coconut-tamarind gravy with local flavors.',
      type: 'non-veg',
      category: 'Coastal Special'
    }
  ],
  '5': [
    {
      id: 'f5-1',
      name: 'Kerala Sadya',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMHRyYWRpdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NzE4NzI4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A festive vegetarian platter served on banana leaf with a variety of classic Kerala sides.',
      type: 'veg',
      category: 'Veg'
    },
    {
      id: 'f5-2',
      name: 'Appam & Stew',
      image: 'https://images.unsplash.com/photo-1665660710687-b44c50751054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGluZGlhbiUyMGRvc2F8ZW58MXx8fHwxNzcxODI3MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Soft lace-edged rice pancakes paired with aromatic stew available in veg or chicken styles.',
      type: 'veg',
      category: 'Veg/Non-Veg'
    },
    {
      id: 'f5-3',
      name: 'Malabar Biryani',
      image: 'https://www.recipesaresimple.com/wp-content/uploads/2015/06/MALABAR-CHICKEN-BIRYANI.jpg',
      description: 'Fragrant rice cooked with spiced meat and fried onions, a signature dish from north Kerala.',
      type: 'non-veg',
      category: 'Non-Veg'
    },
    {
      id: 'f5-4',
      name: 'Karimeen Pollichathu',
      image: 'https://images.unsplash.com/photo-1764314108477-f026172e32a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MTg3MjgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Pearl spot fish marinated in spices, wrapped in banana leaf, and pan-roasted to perfection.',
      type: 'non-veg',
      category: 'Fish'
    }
  ],
  '6': [
    {
      id: 'f6-1',
      name: 'Siddu',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGJyZWFkfGVufDF8fHx8MTc3NTg1Nzk5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Steamed Himachali wheat bread stuffed with savory filling and served with ghee.',
      type: 'veg',
      category: 'Traditional Bread'
    },
    {
      id: 'f6-2',
      name: 'Madra',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja3BlYSUyMGN1cnJ5fGVufDF8fHx8MTc3NTg1ODAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A rich chickpea curry cooked in yogurt and whole spices, central to Himachali feasts.',
      type: 'veg',
      category: 'Chickpea Curry'
    },
    {
      id: 'f6-3',
      name: 'Dham',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZlJTIwbWVhbCUyMHRoYWxpfGVufDF8fHx8MTc3NTg1ODAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A traditional festive meal featuring rice, lentils, rajma, and local curries.',
      type: 'veg',
      category: 'Festive Meal'
    },
    {
      id: 'f6-4',
      name: 'Trout Fish',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm91dCUyMGZpc2h8ZW58MXx8fHwxNzc1ODU4MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Fresh Himalayan trout pan-fried or grilled with herbs and mountain spices.',
      type: 'non-veg',
      category: 'Non-Veg'
    }
  ],
  '7': [
    {
      id: 'f7-1',
      name: 'Goan Fish Curry',
      image: 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwY3Vycnl8ZW58MXx8fHwxNzc1ODU4NTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Tangy coconut-based fish curry with kokum and coastal spices, a Goa staple.',
      type: 'non-veg',
      category: 'Seafood'
    },
    {
      id: 'f7-2',
      name: 'Prawn Balchao',
      image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF3biUyMGN1cnJ5fGVufDF8fHx8MTc3NTg1ODU1OHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Spicy and tangy prawn pickle-style curry packed with Goan vinegar and chilies.',
      type: 'non-veg',
      category: 'Seafood'
    },
    {
      id: 'f7-3',
      name: 'Bebinca',
      image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwc2xpY2V8ZW58MXx8fHwxNzc1ODU4NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Goa\'s iconic layered coconut milk dessert, slow-baked to caramelized perfection.',
      type: 'veg',
      category: 'Dessert'
    },
    {
      id: 'f7-4',
      name: 'Pork Vindaloo',
      image: 'https://assets.cntraveller.in/photos/60ba2039a1a415b43b10bfc8/1:1/w_768,h_768,c_limit/Goan-vindaloo-1366x768.jpg',
      description: 'Fiery pork curry marinated in vinegar, garlic, and spices with Portuguese influence.',
      type: 'non-veg',
      category: 'Non-Veg'
    }
  ],
  '9': [
    {
      id: 'f9-1',
      name: 'Dal Baati Churma',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaXxlbnwxfHx8fDE3NzU4NjM4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Traditional Rajasthani meal with baked wheat balls and lentils.',
      type: 'veg',
      category: 'Veg'
    },
    {
      id: 'f9-2',
      name: 'Gatte ki Sabzi',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMHZlZ3xlbnwxfHx8fDE3NzU4NjM4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Gram flour dumplings in spicy curry.',
      type: 'veg',
      category: 'Veg'
    },
    {
      id: 'f9-3',
      name: 'Laal Maas',
      image: 'https://images.unsplash.com/photo-1764314108477-f026172e32a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMG11dHRvbiUyMGN1cnJ5fGVufDF8fHx8MTc3NTg2Mzg1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Spicy mutton curry, famous in Rajasthan.',
      type: 'non-veg',
      category: 'Non-Veg'
    },
    {
      id: 'f9-4',
      name: 'Ghewar',
      image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW5pJTIwZGVzc2VydHxlbnwxfHx8fDE3NzU4NjM4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Sweet dish popular during festivals.',
      type: 'veg',
      category: 'Dessert'
    }
  ],
  '10': [
    {
      id: 'f10-1',
      name: 'Assamese Thali',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaXxlbnwxfHx8fDE3NzU4NjkwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Traditional meal with rice, dal, fish or meat, and local herbs.',
      type: 'veg',
      category: 'Veg/Non-Veg',
      locationTag: 'Guwahati'
    },
    {
      id: 'f10-2',
      name: 'Khar',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWclMjBjdXJyeXxlbnwxfHx8fDE3NzU4NjkwODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Unique Assamese dish made with raw papaya and alkaline extract.',
      type: 'veg',
      category: 'Veg',
      locationTag: 'Guwahati'
    },
    {
      id: 'f10-3',
      name: 'Jadoh',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWF0JTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzc1ODY5MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Khasi rice dish cooked with meat and spices.',
      type: 'non-veg',
      category: 'Non-Veg',
      locationTag: 'Shillong'
    },
    {
      id: 'f10-4',
      name: 'Tungrymbai',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3liZWFuJTIwZGlzaHxlbnwxfHx8fDE3NzU4NjkwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Fermented soybean dish, rich in flavor.',
      type: 'veg',
      category: 'Veg',
      locationTag: 'Shillong'
    },
    {
      id: 'f10-5',
      name: 'Smoked Pork',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9rZWQlMjBtZWF0JTIwZGlzaHxlbnwxfHx8fDE3NzU4NjkxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Pork cooked with bamboo shoots and spices.',
      type: 'non-veg',
      category: 'Non-Veg',
      locationTag: 'Northeast'
    }
  ],
  '11': [
    {
      id: 'f11-1',
      name: 'Rogan Josh',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXR0b24lMjBjdXJyeXxlbnwxfHx8fDE3NzU4NzAwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Traditional Kashmiri lamb curry with rich spices.',
      type: 'non-veg',
      category: 'Non-Veg',
      locationTag: 'Srinagar'
    },
    {
      id: 'f11-2',
      name: 'Yakhni',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBjdXJyeXxlbnwxfHx8fDE3NzU4NzAwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Yogurt-based mutton curry, mild and aromatic.',
      type: 'non-veg',
      category: 'Non-Veg',
      locationTag: 'Srinagar'
    },
    {
      id: 'f11-3',
      name: 'Dum Aloo (Kashmiri Style)',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW0lMjBhbG9vfGVufDF8fHx8MTc3NTg3MDA4NXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Baby potatoes cooked in spicy gravy.',
      type: 'veg',
      category: 'Veg',
      locationTag: 'Pahalgam'
    },
    {
      id: 'f11-4',
      name: 'Kahwa',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHRlYXxlbnwxfHx8fDE3NzU4NzAwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Traditional green tea with saffron, almonds, and spices.',
      type: 'veg',
      category: 'Beverage',
      locationTag: 'Gulmarg'
    }
  ],
  '12': [
    {
      id: 'f12-1',
      name: 'Butter Chicken',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBjaGlja2VufGVufDF8fHx8MTc3NTg3MjA4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Creamy tomato-based chicken curry.',
      type: 'non-veg',
      category: 'Non-Veg',
      locationTag: 'Delhi'
    },
    {
      id: 'f12-2',
      name: 'Chole Bhature',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiSLB7zfxFCFag7Pt9CHnH3wk61PILgDo5CCTxT01YjSmEKOVY6uskLp8qEnLi8sIsAAMBOWo4AGXHUavOeuWowkrR4u4QtSlryJKCwcR837ajLT906ZOcBhwQuomU453tC8azJe5SikPUleEkJhz-FmTQKa8frlxB7tir-_0V97PqF89QHvQfh5iNH/s1080/IMG_20220904_210330.jpg',
      description: 'Spicy chickpeas with deep-fried bread.',
      type: 'veg',
      category: 'Veg',
      locationTag: 'Delhi'
    },
    {
      id: 'f12-3',
      name: 'Petha',
      image: 'https://thecentrum.in/wp-content/uploads/2025/04/Agras-Petha-and-Beyond-Exploring-the-Citys-Culinary-Side-img.webp',
      description: 'Famous sweet made from ash gourd.',
      type: 'veg',
      category: 'Dessert',
      locationTag: 'Agra'
    },
    {
      id: 'f12-4',
      name: 'Bedai & Aloo Sabzi',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW5kaWFuJTIwYnJlYWtmYXN0JTIwdGhhbGl8ZW58MXx8fHwxNzc1ODYzMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Spicy breakfast dish.',
      type: 'veg',
      category: 'Veg',
      locationTag: 'Agra'
    },
    {
      id: 'f12-5',
      name: 'Dal Baati Churma',
      image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaXxlbnwxfHx8fDE3NzU4NjM4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Traditional Rajasthani meal.',
      type: 'veg',
      category: 'Veg',
      locationTag: 'Jaipur'
    },
    {
      id: 'f12-6',
      name: 'Laal Maas',
      image: 'https://images.unsplash.com/photo-1764314108477-f026172e32a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMG11dHRvbiUyMGN1cnJ5fGVufDF8fHx8MTc3NTg2Mzg1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Spicy mutton curry.',
      type: 'non-veg',
      category: 'Non-Veg',
      locationTag: 'Jaipur'
    },
    {
      id: 'f12-7',
      name: 'Malpua',
      image: 'https://www.sugarfree-india.com/wp-content/uploads/2026/02/sugar-free-malpua-recipe.webp',
      description: 'Sweet pancake soaked in syrup.',
      type: 'veg',
      category: 'Dessert',
      locationTag: 'Pushkar'
    }
  ]
};

export const diaryPosts: DiaryPost[] = [
  {
    id: 'p1',
    username: 'travel_priya',
    caption: 'Mesmerized by the beauty of Taj Mahal at sunrise! 🌅 A symbol of eternal love.',
    image: 'https://images.unsplash.com/photo-1551857704-ba9b620ad444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMHN1bnJpc2UlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '2 hours ago',
    location: 'Agra, Uttar Pradesh',
    userId: 'user1'
  },
  {
    id: 'p2',
    username: 'wanderer_raj',
    caption: 'Pink City vibes! The architecture of Jaipur never fails to amaze 🏰',
    image: 'https://images.unsplash.com/photo-1706961121783-4ae6c933983a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBoYXdhJTIwbWFoYWx8ZW58MXx8fHwxNzcxNzc5MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '5 hours ago',
    location: 'Jaipur, Rajasthan',
    userId: 'user2'
  },
  {
    id: 'p3',
    username: 'foodie_arjun',
    caption: 'Heaven in a plate! Kerala Sadya is pure bliss 🍛',
    image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMHRyYWRpdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NzE4NzI4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '1 day ago',
    location: 'Kerala',
    userId: 'user3'
  },
  {
    id: 'p4',
    username: 'mountain_nik',
    caption: 'The Himalayas are calling and I must go! ⛰️',
    image: 'https://images.unsplash.com/photo-1676718912572-b3ebcff192e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '2 days ago',
    location: 'Himachal Pradesh',
    userId: 'user4'
  },
  {
    id: 'p5',
    username: 'beach_neha',
    caption: 'Goa state of mind! 🏖️ Sun, sand, and endless vibes',
    image: 'https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGluZGlhfGVufDF8fHx8MTc3MTc2ODgxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '3 days ago',
    location: 'Goa',
    userId: 'user5'
  },
  {
    id: 'p6',
    username: 'spiritual_amit',
    caption: 'Witnessing the divine Ganga Aarti in Varanasi 🙏✨',
    image: 'https://images.unsplash.com/photo-1653200986939-c1a8e62f96a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXJhbmFzaSUyMGdhbmdlcyUyMHJpdmVyfGVufDF8fHx8MTc3MTg3MjgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '4 days ago',
    location: 'Varanasi, Uttar Pradesh',
    userId: 'user6'
  },
  {
    id: 'p7',
    username: 'desert_karan',
    caption: 'Sunset in the Thar Desert - magical moments! 🐪',
    image: 'https://images.unsplash.com/photo-1670687174580-c003b4716959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBjYW1lbHxlbnwxfHx8fDE3NzE3Njg4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '5 days ago',
    location: 'Jaisalmer, Rajasthan',
    userId: 'user7'
  },
  {
    id: 'p8',
    username: 'backwater_sara',
    caption: 'Houseboat life in Kerala backwaters 🛶 Pure serenity',
    image: 'https://images.unsplash.com/photo-1707893013488-51672ef83425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc3MTgyOTc1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    timestamp: '1 week ago',
    location: 'Alleppey, Kerala',
    userId: 'user8'
  }
];

// Current user for demo purposes
export const currentUser = {
  id: 'user1',
  username: 'travel_priya',
  email: 'priya@example.com'
};
