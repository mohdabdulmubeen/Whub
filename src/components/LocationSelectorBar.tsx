import React, { useState, useEffect, useMemo } from 'react';
import {
  Globe,
  MapPin,
  Building2,
  Calendar,
  Coffee,
  Check,
  Star,
  Eye,
  Sparkles,
  Layers,
  Sun,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CafeInteriorPreviewModal } from './CafeInteriorPreviewModal';
import { DateRangePicker } from './DateRangePicker';
import { getDaysDifference } from '../utils/dateUtils';

export interface CafePhoto {
  url: string;
  category: 'Atmosphere' | 'Seating' | 'Layout' | 'Barista Counter';
  caption: string;
}

export interface CafeOption {
  id: string;
  name: string;
  area: string;
  address: string;
  rating: string;
  reviewCount?: number;
  atmosphereTag?: string;
  seatingTypes?: string[];
  layoutDescription?: string;
  timing?: string;
  amenities: string[];
  photos?: CafePhoto[];
  coverPhoto?: string;
}

export const CITY_CAFES: Record<string, CafeOption[]> = {
  Warangal: [
    {
      id: 'wgl-1',
      name: 'Heritage Café',
      area: 'Subedari Collectorate Road, Warangal',
      address: 'Subedari Collectorate Road, Warangal',
      rating: '4.9',
      reviewCount: 148,
      atmosphereTag: 'Warm natural timber aesthetics with soft acoustic dampening and ambient warm lighting.',
      seatingTypes: ['Quiet Focus Pods', 'Ergonomic Desk Chairs', 'High-Top Counters', 'Sunlit Window Bay'],
      layoutDescription: 'Zoned quiet area partitioned from the main barista counter, with universal power at all seats.',
      timing: '08:00 AM – 09:30 PM',
      amenities: ['300 Mbps Wi-Fi', 'Power at Desk', 'Quiet Acoustics', 'Coffee Service'],
      coverPhoto: '/images/cafes/ccd-interior.webp',
      photos: [
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Atmosphere',
          caption: 'Warm wooden interior, gentle acoustic panels, and calm ambient lighting'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Seating',
          caption: 'Ergonomic workspace seating with individual universal power sockets'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Spacious floor plan with partitioned quiet pods and team tables'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Artisanal espresso and single-origin pour-over brew bar'
        }
      ]
    },
    {
      id: 'wgl-2',
      name: 'Fort Road Café',
      area: 'Fort Road, Warangal',
      address: 'Station Road near Fort Gate, Warangal',
      rating: '4.8',
      reviewCount: 112,
      atmosphereTag: 'Contemporary industrial design with exposed brickwork, high ceilings, and vibrant creative energy.',
      seatingTypes: ['Team Collaboration Tables', 'Standing Workstations', 'Cushioned Booths', 'Corner Focus Pods'],
      layoutDescription: 'Open central work-floor flanked by acoustic booths and a mezzanine break area.',
      timing: '08:30 AM – 10:00 PM',
      amenities: ['High-Speed Wi-Fi', 'Standing Desks', 'Power Sockets', 'Bakery Menu'],
      coverPhoto: '/images/cafes/roastery-interior.jpg',
      photos: [
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Atmosphere',
          caption: 'Exposed brick walls with contemporary industrial styling and natural airflow'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'Focused pod workstations with adjustable desk lamps and deep surfaces'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Wide collaborative open hall and ergonomic pair-programming desks'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Barista espresso counter with specialty iced beverages'
        }
      ]
    },
    {
      id: 'wgl-3',
      name: 'Urban Roasters',
      area: 'MGM Circle, Warangal',
      address: 'MGM Circle Main Road, Warangal',
      rating: '4.8',
      reviewCount: 94,
      atmosphereTag: 'Minimalist Nordic café aesthetic with Scandinavian oak furniture, plants, and natural daylight.',
      seatingTypes: ['Solid Oak Work Desks', 'Private Call Booths', 'Window Bar Seating', 'Executive Armchairs'],
      layoutDescription: 'Sunlit front bay for quiet thinkers and back lounge for pair programming and discussions.',
      timing: '08:00 AM – 09:00 PM',
      amenities: ['Gigabit Wi-Fi', 'Dual Sockets', 'Natural Lighting', 'Artisan Coffee'],
      coverPhoto: '/images/cafes/starbucks-interior.webp',
      photos: [
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Atmosphere',
          caption: 'Contemporary roastery counter with artisanal single-origin brew station'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'High-top laptop counters and ergonomic task seating with power docks'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Layout',
          caption: 'Acoustic-treated open work zones with dedicated team tables'
        },
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Barista Counter',
          caption: 'Specialty in-house bean roaster and espresso station'
        }
      ]
    },
    {
      id: 'wgl-4',
      name: 'Bhadrakali Lake Café',
      area: 'Bhadrakali Lake, Warangal',
      address: 'Near Temple Promenade, Bhadrakali Lake Road, Warangal',
      rating: '4.9',
      reviewCount: 124,
      atmosphereTag: 'Scenic waterfront panorama with floor-to-ceiling glass, gentle lake breezes, and calm ambiance.',
      seatingTypes: ['Lakeside Window Desks', 'Quiet Outdoor Pods', 'Ergonomic Workstations', 'Pair Tables'],
      layoutDescription: 'Panoramic terrace facing the lake with quiet indoor focus pods and power at all seats.',
      timing: '07:30 AM – 09:30 PM',
      amenities: ['300 Mbps Wi-Fi', 'Lake View', 'Universal Outlets', 'Specialty Teas'],
      coverPhoto: '/images/cafes/niloufer-interior.jpg',
      photos: [
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Atmosphere',
          caption: 'Bright sunlit workspace hall with high ceilings and tranquil ambiance'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Seating',
          caption: 'Comfortable bay seating and cushioned armchairs with garden views'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Layout',
          caption: 'Open-concept layout with spacious collaborative tables'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Specialty cold brew and fresh organic herbal tea station'
        }
      ]
    },
    {
      id: 'wgl-5',
      name: 'Kakatiya Heritage Roasters',
      area: 'Collectorate Chowrasta, Warangal',
      address: 'Opp. District Court Complex, Collectorate Chowrasta, Warangal',
      rating: '4.8',
      reviewCount: 98,
      atmosphereTag: 'Heritage colonial architecture with teakwood beam ceilings, quiet focus, and artisanal roastery aroma.',
      seatingTypes: ['Teakwood Solo Desks', 'Quiet Library Pods', 'Ergonomic Task Chairs', 'Private Call Booth'],
      layoutDescription: 'Colonial vaulted ceiling with individual acoustic study nooks and high-speed fiber.',
      timing: '08:00 AM – 09:00 PM',
      amenities: ['Gigabit Wi-Fi', 'Heritage Ambience', 'Task Reading Lamps', 'Batch Brews'],
      coverPhoto: '/images/cafes/concu-lounge.webp',
      photos: [
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Atmosphere',
          caption: 'Colonial teakwood ceilings with heritage aesthetic and peaceful library vibe'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'Deep solid wood workstations with warm task reading illumination'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Zoned heritage study hall with acoustic wall dampening'
        },
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Barista Counter',
          caption: 'Artisanal espresso and batch brew counter with single-origin beans'
        }
      ]
    },
    {
      id: 'wgl-6',
      name: 'Subedari Tech Lounge',
      area: 'Subedari, Warangal',
      address: 'Near Subedari Police Lines, University Road, Warangal',
      rating: '4.9',
      reviewCount: 156,
      atmosphereTag: 'Sleek tech innovation lounge with dual monitor desks, fiber internet, and developer community vibe.',
      seatingTypes: ['Dual-Screen Workbenches', 'Standing Desks', 'Whiteboard Pods', 'Executive Mesh Chairs'],
      layoutDescription: 'Modern technology workspace with zoned quiet benches and collaboration bays.',
      timing: '08:00 AM – 10:00 PM',
      amenities: ['300 Mbps Wi-Fi', 'Standing Desks', 'Dual Monitors', 'Protein Snacks'],
      coverPhoto: '/images/cafes/ccd-interior.webp',
      photos: [
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Atmosphere',
          caption: 'High-tech workspace with dual-screen developer desks and glass whiteboard walls'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Seating',
          caption: 'Ergonomic mesh chairs and motorized adjustable standing desk options'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Layout',
          caption: 'Open tech lounge with private glass acoustic phone booths'
        },
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Barista Counter',
          caption: 'Nitro coffee on tap and high-protein wholesome snack pantry'
        }
      ]
    }
  ],
  Hanamkonda: [
    {
      id: 'hnk-1',
      name: 'Nakkalagutta Café',
      area: 'Nakkalagutta, Hanamkonda',
      address: 'Near Nakkalagutta Junction, Hanamkonda',
      rating: '4.9',
      reviewCount: 165,
      atmosphereTag: 'Airy modern workspace with acoustic felt dividers, low ambient music, and bright white interior.',
      seatingTypes: ['Acoustic Pods', 'Ergonomic Task Chairs', 'Private Meeting Nook', 'Double Desks'],
      layoutDescription: 'Linear pod configuration ensuring no direct glare on laptop screens.',
      timing: '08:00 AM – 09:30 PM',
      amenities: ['300 Mbps Wi-Fi', 'Acoustic Panels', 'Task Lamps', 'Espresso Bar'],
      coverPhoto: '/images/cafes/concu-lounge.webp',
      photos: [
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Atmosphere',
          caption: 'Crisp architectural interior with acoustic dampening panels'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'Ergonomic task chairs and individual acoustic reading pods'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Linear zoning ensuring glare-free laptop viewing throughout'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Espresso craft bar with single-origin beans'
        }
      ]
    },
    {
      id: 'hnk-2',
      name: 'Kakatiya Café',
      area: 'KU Cross Road, Hanamkonda',
      address: 'Kakatiya University Road, Hanamkonda',
      rating: '4.8',
      reviewCount: 130,
      atmosphereTag: 'Scholarly library café ambiance with book-lined shelves, warm brass reading lamps, and silent nooks.',
      seatingTypes: ['Silent Focus Pods', 'Broad Study Tables', 'Window Lounge Chairs', 'Private Carrels'],
      layoutDescription: 'Library-inspired quiet reading wing with central discussion zone.',
      timing: '08:30 AM – 09:00 PM',
      amenities: ['High-Speed Wi-Fi', 'Book Nook', 'Brass Lamps', 'Power Outlets'],
      coverPhoto: '/images/cafes/starbucks-interior.webp',
      photos: [
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Atmosphere',
          caption: 'Vibrant tech-enabled work café with abundant power points'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'High-top laptop benches and standing desks'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Central collaboration zone flanked by quiet focus pods'
        },
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Barista Counter',
          caption: 'Artisan coffee station with freshly roasted blends'
        }
      ]
    },
    {
      id: 'hnk-3',
      name: 'Public Gardens Café',
      area: 'Public Gardens Road, Hanamkonda',
      address: 'Public Gardens Commercial Strip, Hanamkonda',
      rating: '4.8',
      reviewCount: 88,
      atmosphereTag: 'Lush indoor botanical oasis with potted monsteras, skylights, and garden views.',
      seatingTypes: ['Sunlit Greenery Benches', 'Boutique Lounge Booths', 'Quiet Garden Pods', 'Communal Tables'],
      layoutDescription: 'Indoor botanical atrium with perimeter desks facing verdant garden vistas.',
      timing: '08:00 AM – 09:30 PM',
      amenities: ['High-Speed Wi-Fi', 'Garden View', 'Quiet Bays', 'Coffee Delivery'],
      coverPhoto: '/images/cafes/roastery-interior.jpg',
      photos: [
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Atmosphere',
          caption: 'Heritage brick roastery ambiance with natural timber surfaces'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Seating',
          caption: 'Quiet library-style study booths with warm directional lamps'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Dual-wing layout dividing collaborative and silent work areas'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Manual pour-over bar and specialty batch brews'
        }
      ]
    },
    {
      id: 'hnk-4',
      name: 'Subhash Nagar Lounge',
      area: 'Subhash Nagar, Hanamkonda',
      address: 'Main Commercial Avenue, Subhash Nagar, Hanamkonda',
      rating: '4.8',
      reviewCount: 76,
      atmosphereTag: 'Modern executive lounge with plush ergonomic armchairs and high-speed fiber internet.',
      seatingTypes: ['Executive Armchairs', 'Acoustic Pods', 'Private Desks', 'Collaboration Table'],
      layoutDescription: 'Split floor layout with private phone booths and quiet work zone.',
      timing: '08:00 AM – 09:00 PM',
      amenities: ['300 Mbps Wi-Fi', 'Executive Seating', 'AC', 'Coffee Bar'],
      coverPhoto: '/images/cafes/niloufer-interior.jpg',
      photos: [
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Atmosphere',
          caption: 'Lush botanical indoor greenery and sunlit glass pavilion'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Seating',
          caption: 'Ergonomic wicker and cushioned chairs overlooking garden landscape'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Layout',
          caption: 'Flow-through garden pavilion layout with natural breeze'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Fresh fruit cold press bar and signature botanical teas'
        }
      ]
    },
    {
      id: 'hnk-5',
      name: 'Ashok Nagar Roastery',
      area: 'Ashok Nagar, Hanamkonda',
      address: 'Near Old Bus Stand Road, Ashok Nagar, Hanamkonda',
      rating: '4.7',
      reviewCount: 65,
      atmosphereTag: 'Artisanal micro-roastery with warm brick interior, copper lights, and fresh brew aromas.',
      seatingTypes: ['Oak Desks', 'Barista Counter Seats', 'Window Booths'],
      layoutDescription: 'Cozy work bays with universal sockets and soft background jazz.',
      timing: '08:30 AM – 09:30 PM',
      amenities: ['High-Speed Wi-Fi', 'Power at Desk', 'Artisan Coffee'],
      coverPhoto: '/images/cafes/ccd-interior.webp',
      photos: [
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Atmosphere',
          caption: 'Developer-centric innovation hub with dual-monitor ready workstations'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Seating',
          caption: 'Ergonomic mesh chairs with adjustable lumbar and armrests'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Layout',
          caption: 'Open developer hall with soundproof breakout pods'
        },
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Barista Counter',
          caption: 'Continuous high-caffeine cold brews and wholesome nutrition station'
        }
      ]
    },
    {
      id: 'hnk-6',
      name: 'Balasamudram WorkCafé',
      area: 'Balasamudram, Hanamkonda',
      address: 'Court Road, Balasamudram, Hanamkonda',
      rating: '4.8',
      reviewCount: 92,
      atmosphereTag: 'Professional quiet study workspace with clean Nordic aesthetics and natural daylight.',
      seatingTypes: ['Quiet Pods', 'Window Bay Seats', 'Study Benches'],
      layoutDescription: 'Wide personal desks with acoustic divider panels for uninterrupted work.',
      timing: '08:00 AM – 09:30 PM',
      amenities: ['Fiber Wi-Fi', 'Quiet Pods', 'Power Outlets', 'Coffee Taps'],
      coverPhoto: '/images/cafes/concu-lounge.webp',
      photos: [
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Atmosphere',
          caption: 'Peaceful residential boutique café with warm neighborhood warmth'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'Deep cushioned reading armchairs and private corner desks'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Intimate multi-room cottage layout ensuring quiet privacy'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Hand-poured filter coffee and fresh artisanal snacks'
        }
      ]
    }
  ],
  Kazipet: [
    {
      id: 'kzp-1',
      name: 'Railway Station Café',
      area: 'Station Square, Kazipet',
      address: 'Opp. Railway Station Terminal, Kazipet',
      rating: '4.8',
      reviewCount: 142,
      atmosphereTag: 'Cozy transit lounge featuring soundproof glass windows, warm pendant lights, and swift Wi-Fi.',
      seatingTypes: ['Express Laptop Counters', 'Padded High-Back Booths', 'Silent Pods', 'Power Bench'],
      layoutDescription: 'Streamlined flow with grab-and-go bar and protected deep work lounge.',
      timing: '07:30 AM – 10:00 PM',
      amenities: ['Gigabit Wi-Fi', 'Soundproof Windows', 'Fast Charging', 'Quick Brews'],
      coverPhoto: '/images/cafes/niloufer-interior.jpg',
      photos: [
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Atmosphere',
          caption: 'High-energy junction workspace with real-time transit status displays'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'Ergonomic task chairs and individual power docks at each seat'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Layout',
          caption: 'Zoned quiet lounge partitioned from transit circulation'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Speedy barista counter with specialty filter coffee and breakfast'
        }
      ]
    },
    {
      id: 'kzp-2',
      name: 'NIT Campus Café',
      area: 'NIT Bypass Road, Kazipet',
      address: 'NIT Campus West Corridor, Kazipet',
      rating: '4.9',
      reviewCount: 175,
      atmosphereTag: 'Tech innovation workspace with whiteboard pillars, ergonomic monitor mounts, and focused vibe.',
      seatingTypes: ['Dual-Display Desks', 'Whiteboard Pods', 'Ergonomic Mesh Chairs', 'Group Benches'],
      layoutDescription: 'Spacious tech lab layout with dedicated engineering benches and silent study pods.',
      timing: '08:00 AM – 10:30 PM',
      amenities: ['300 Mbps Wi-Fi', 'Monitor Mounts', 'Whiteboard Walls', 'Coffee Taps'],
      coverPhoto: '/images/cafes/ccd-interior.webp',
      photos: [
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Atmosphere',
          caption: 'Vibrant campus-adjacent innovation lounge with hackathon benches'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Seating',
          caption: 'High-top collaboration benches and adjustable task chairs'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Open central tech floor flanked by private breakout rooms'
        },
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Barista Counter',
          caption: 'Nitro cold brew on tap and student-friendly value snacks'
        }
      ]
    },
    {
      id: 'kzp-3',
      name: 'Diesel Colony Café',
      area: 'Diesel Colony, Kazipet',
      address: 'Diesel Colony Main Road, Kazipet',
      rating: '4.7',
      reviewCount: 78,
      atmosphereTag: 'Tranquil residential setting with gentle acoustic background, leafy garden terrace, and peaceful vibes.',
      seatingTypes: ['Cushioned Window Seats', 'Quiet Individual Desks', 'Garden View Pods', 'Wooden Tables'],
      layoutDescription: 'Compact and peaceful floor plan with private corners for focused solo work.',
      timing: '08:30 AM – 09:00 PM',
      amenities: ['Fiber Wi-Fi', 'Peaceful Ambience', 'Power Outlets', 'Garden Terrace'],
      coverPhoto: '/images/cafes/roastery-interior.jpg',
      photos: [
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Atmosphere',
          caption: 'Historic railway heritage brickwork with high timber truss ceilings'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Seating',
          caption: 'Vintage railway-inspired solo desks with individual reading lamps'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Spacious heritage workshop hall with acoustic quiet pods'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Manual pour-over station and single-origin roast coffee'
        }
      ]
    },
    {
      id: 'kzp-4',
      name: 'Fathimanagar Lounge',
      area: 'Fathimanagar, Kazipet',
      address: 'Fathimanagar Commercial Strip, Kazipet',
      rating: '4.8',
      reviewCount: 68,
      atmosphereTag: 'Modern urban coffee lounge with high-speed internet and quiet work alcoves.',
      seatingTypes: ['Solo Pods', 'Shared Tables', 'Window Benches'],
      layoutDescription: 'Zoned workspace with dedicated laptop charging at all seats.',
      timing: '08:00 AM – 09:30 PM',
      amenities: ['300 Mbps Wi-Fi', 'Quiet Alcoves', 'Power Outlets', 'Espresso Bar'],
      coverPhoto: '/images/cafes/starbucks-interior.webp',
      photos: [
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Atmosphere',
          caption: 'Sunlit garden lounge with potted flora and calming ambient music'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'Ergonomic task chairs facing outdoor garden courtyard'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Layout',
          caption: 'Open-air breezeway layout connecting indoor and patio desks'
        },
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Barista Counter',
          caption: 'Cold-brew coffee and healthy organic breakfast bar'
        }
      ]
    },
    {
      id: 'kzp-5',
      name: 'Babu Camp Roasters',
      area: 'Babu Camp, Kazipet',
      address: 'Babu Camp Bypass Road, Kazipet',
      rating: '4.7',
      reviewCount: 54,
      atmosphereTag: 'Aesthetic open-air garden terrace with shaded workstation tables and fresh air.',
      seatingTypes: ['Terrace Desks', 'Garden Booths', 'Indoor Silent Pods'],
      layoutDescription: 'Blended indoor/outdoor layout with weather-proof power sockets.',
      timing: '08:00 AM – 09:00 PM',
      amenities: ['Fiber Wi-Fi', 'Garden Seating', 'Universal Outlets'],
      coverPhoto: '/images/cafes/concu-lounge.webp',
      photos: [
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Atmosphere',
          caption: 'Modern glass-and-steel IT corridor tech space with 300 Mbps Wi-Fi'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'Motorized standing desks and ergonomic executive seating'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Zoned corporate tech floor with quiet meeting alcoves'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'High-speed espresso bar and healthy protein snacks'
        }
      ]
    },
    {
      id: 'kzp-6',
      name: 'Prashanth Nagar WorkCafé',
      area: 'Prashanth Nagar, Kazipet',
      address: 'Near Old Water Tank, Prashanth Nagar, Kazipet',
      rating: '4.8',
      reviewCount: 72,
      atmosphereTag: 'Quiet neighborhood work café with comfortable oak seating, plants, and fast Wi-Fi.',
      seatingTypes: ['Oak Desks', 'Silent Pods', 'Window Seats'],
      layoutDescription: 'Clean linear desk arrangement with comfortable armchairs.',
      timing: '08:30 AM – 09:30 PM',
      amenities: ['Gigabit Wi-Fi', 'Quiet Ambience', 'Coffee Service'],
      coverPhoto: '/images/cafes/ccd-interior.webp',
      photos: [
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Atmosphere',
          caption: 'Fast-casual commuter work lounge with power sockets at every seat'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Seating',
          caption: 'Quick-stop high-top laptop desks and cushioned banquettes'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Layout',
          caption: 'Linear layout optimized for focused short-duration sessions'
        },
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Barista Counter',
          caption: 'Rapid-dispense South Indian filter coffee and fresh pastries'
        }
      ]
    }
  ],
  Hyderabad: [
    {
      id: 'hyd-1',
      name: 'Starbucks',
      area: 'Jubilee Hills, Hyderabad',
      address: 'Road No. 36, Jubilee Hills, Hyderabad',
      rating: '4.9',
      reviewCount: 380,
      atmosphereTag: 'Signature warm oak and dark green interior, ambient pendant lighting, and relaxed coffeehouse vibe.',
      seatingTypes: ['Plush Lounge Armchairs', 'Solid Oak Communal Table', 'Window Bar Stools', 'Solo Focus Corners'],
      layoutDescription: 'Spacious two-level lounge with expansive barista counter and cozy soft-cushioned nooks.',
      timing: '07:00 AM – 11:00 PM',
      amenities: ['High-Speed Wi-Fi', 'Universal Power Outlets', 'Nitro Cold Brew on Tap', 'Starbucks Rewards'],
      coverPhoto: '/images/cafes/starbucks-interior.webp',
      photos: [
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Signature Starbucks barista counter, green walls, and warm ambient pendant lighting'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Atmosphere',
          caption: 'Solid oak communal worktables with individual laptop power sockets'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Seating',
          caption: 'Open-concept two-story layout with quiet study bays and plush armchairs'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Spacious dining and lounge seating with high ceilings'
        }
      ]
    },
    {
      id: 'hyd-2',
      name: 'Café Coffee Day (CCD)',
      area: 'Banjara Hills, Hyderabad',
      address: 'Road No. 1, Banjara Hills, Hyderabad',
      rating: '4.8',
      reviewCount: 310,
      atmosphereTag: 'Iconic vibrant red and warm mahogany tones, relaxed sofa seating, and casual conversation vibe.',
      seatingTypes: ['Cushioned Booths', 'Lounge Red Sofas', 'Casual High Chairs', 'Study Corners'],
      layoutDescription: 'Cozy booth layout designed for meetings, collaborative brainstorming, and quick coffee breaks.',
      timing: '08:00 AM – 11:30 PM',
      amenities: ['Complimentary Wi-Fi', 'Comfortable Booths', 'All-Day Breakfast', 'Cold Brews & Frappes'],
      coverPhoto: '/images/cafes/ccd-interior.webp',
      photos: [
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Seating',
          caption: 'Signature cushioned booths with deep comfortable seating for work sessions'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Atmosphere',
          caption: 'Vibrant coffeehouse ambiance with warm lighting and comfortable seating'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Layout',
          caption: 'Fresh roasted coffee beans and classic espresso brewing station'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Barista Counter',
          caption: 'Well-partitioned seating zones balancing focus and social coffee chats'
        }
      ]
    },
    {
      id: 'hyd-3',
      name: 'Niloufer Café',
      area: 'Lakdikapul, Hyderabad',
      address: 'Red Hills Road, Lakdikapul, Hyderabad',
      rating: '4.9',
      reviewCount: 520,
      atmosphereTag: 'Legendary Hyderabad heritage institution with ornate chandeliers, marble-top tables, and authentic Irani Chai aroma.',
      seatingTypes: ['Heritage Marble Tables', 'Classic Wooden Chairs', 'Family Banquet Booths', 'Quick Tea Counters'],
      layoutDescription: 'Grand heritage dining hall with high ceilings, vintage Hyderabadi arches, and bustling tea service.',
      timing: '05:30 AM – 12:00 AM',
      amenities: ['World-Famous Irani Chai', 'Osmania Biscuits', 'AC Dining Hall', 'Takeaway Counter'],
      coverPhoto: '/images/cafes/niloufer-interior.jpg',
      photos: [
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Atmosphere',
          caption: 'Grand heritage hall with ornate chandeliers and authentic Hyderabadi charm'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Seating',
          caption: 'Classic marble-top tables and spacious heritage seating'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Layout',
          caption: 'Signature simmering copper samovar and freshly baked Osmania biscuits'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Barista Counter',
          caption: 'Expansive air-conditioned dining halls with rapid table service'
        }
      ]
    },
    {
      id: 'hyd-4',
      name: 'Roastery Coffee House',
      area: 'Banjara Hills, Hyderabad',
      address: 'Road No. 14, Banjara Hills, Hyderabad',
      rating: '4.9',
      reviewCount: 440,
      atmosphereTag: 'Picturesque heritage bungalow café surrounded by lush greenery, tranquil open courtyard, and artisan roastery aroma.',
      seatingTypes: ['Courtyard Garden Tables', 'Veranda Wicker Chairs', 'Indoor AC Focus Desks', 'Bungalow Library Bays'],
      layoutDescription: 'Sprawling indoor-outdoor bungalow floor plan with sunlit courtyards and cozy reading nooks.',
      timing: '08:00 AM – 11:00 PM',
      amenities: ['Specialty Roastery', 'Outdoor Garden', 'Cascara & Cold Brews', 'High-Speed Wi-Fi'],
      coverPhoto: '/images/cafes/roastery-interior.jpg',
      photos: [
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Atmosphere',
          caption: 'Iconic industrial copper coffee roaster, mezzanine staircase, and wooden craft bar'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Seating',
          caption: 'Rustic wooden tables and comfortable garden chairs shaded by trees'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Layout',
          caption: 'Fluid connectivity between the outdoor patio, air-conditioned rooms, and roastery'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Dedicated manual brew bar with Chemex, Aeropress, and specialty single-origins'
        }
      ]
    },
    {
      id: 'hyd-5',
      name: 'Third Wave Coffee',
      area: 'Hitech City, Hyderabad',
      address: 'Near Inorbit Mall, Mindspace, Hitech City, Hyderabad',
      rating: '4.8',
      reviewCount: 295,
      atmosphereTag: 'Sleek Scandinavian minimalist aesthetics with blonde oak wood, clean lines, and tech-friendly work focus.',
      seatingTypes: ['Ergonomic Laptop Desks', 'Quiet Work Pods', 'Communal Standing Tables', 'High-Speed Wi-Fi Benches'],
      layoutDescription: 'Modern technology-focused floor plan with universal power strips at every seat.',
      timing: '07:30 AM – 11:00 PM',
      amenities: ['300 Mbps Wi-Fi', 'Universal Power Outlets', 'Specialty Single Origins', 'Artisan Bagels'],
      coverPhoto: '/images/cafes/ccd-interior.webp',
      photos: [
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Atmosphere',
          caption: 'Bright contemporary tech coffeehouse interior with warm blonde wood finishes'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Seating',
          caption: 'Dedicated workbenches with individual charging sockets and ergonomic seating'
        },
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Layout',
          caption: 'Spacious acoustic design optimized for remote work and video calls'
        },
        {
          url: '/images/cafes/roastery-interior.jpg',
          category: 'Barista Counter',
          caption: 'Specialty manual pour-over bar, cold brew taps, and fresh bakery display'
        }
      ]
    },
    {
      id: 'hyd-6',
      name: 'Conçū',
      area: 'Jubilee Hills, Hyderabad',
      address: 'Plot No. 479/B, Road No. 21, Jubilee Hills, Hyderabad',
      rating: '4.9',
      reviewCount: 360,
      atmosphereTag: 'Chic European glasshouse patisserie with pastel aesthetics, marble bistro tables, and sun-drenched greenery.',
      seatingTypes: ['Marble Bistro Tables', 'Sunlit Veranda Armchairs', 'Quiet Courtyard Nooks', 'Velvet Banquettes'],
      layoutDescription: 'Intimate French bistro layout with glasshouse conservatory and peaceful courtyard seating.',
      timing: '09:00 AM – 10:30 PM',
      amenities: ['French Patisserie', 'Artisanal Coffee', 'Valet Parking', 'Scenic Greenery'],
      coverPhoto: '/images/cafes/concu-lounge.webp',
      photos: [
        {
          url: '/images/cafes/concu-lounge.webp',
          category: 'Atmosphere',
          caption: 'Elegant luxury lounge with sculptural paper lanterns, geometric marble floors, and terracotta chairs'
        },
        {
          url: '/images/cafes/niloufer-interior.jpg',
          category: 'Seating',
          caption: 'Plush banquettes and marble bistro tables surrounded by glasshouse plants'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Layout',
          caption: 'Charming multi-room layout including an indoor conservatory and secluded patio'
        },
        {
          url: '/images/cafes/ccd-interior.webp',
          category: 'Barista Counter',
          caption: 'Artisan dessert display counter and custom espresso beverage station'
        }
      ]
    }
  ]
};

// Always returns cafes with 4K photos for ANY selected city
export const getCafesForCity = (cityName: string): CafeOption[] => {
  if (CITY_CAFES[cityName] && CITY_CAFES[cityName].length >= 3) {
    return CITY_CAFES[cityName];
  }
  return [
    {
      id: `${cityName.toLowerCase().replace(/\s+/g, '-')}-1`,
      name: `${cityName} Central Café`,
      area: `${cityName}`,
      address: `101 Main Avenue, ${cityName}`,
      rating: '4.9',
      reviewCount: 95,
      atmosphereTag: 'Warm natural timber aesthetics with soft acoustic dampening and ambient warm lighting.',
      seatingTypes: ['Quiet Focus Pods', 'Ergonomic Desk Chairs', 'High-Top Counters', 'Sunlit Window Bay'],
      layoutDescription: 'Zoned quiet area partitioned from the main barista counter, with universal power at all seats.',
      timing: '08:00 AM – 09:30 PM',
      amenities: ['300 Mbps Wi-Fi', 'Power at Desk', 'Quiet Acoustics'],
      coverPhoto: '/images/cafes/concu-lounge.webp',
      photos: [
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Atmosphere',
          caption: `${cityName} Central Interior & Work Atmosphere`
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Seating',
          caption: 'Ergonomic workspace seating with power outlets'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Layout',
          caption: 'Open floor plan with quiet pods and team desks'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Artisanal espresso and coffee bar'
        }
      ]
    },
    {
      id: `${cityName.toLowerCase().replace(/\s+/g, '-')}-2`,
      name: `${cityName} Tech Park Café`,
      area: `${cityName}`,
      address: `45 Tech Boulevard, ${cityName}`,
      rating: '4.8',
      reviewCount: 82,
      atmosphereTag: 'Contemporary industrial design with high ceilings and focused developer atmosphere.',
      seatingTypes: ['Team Collaboration Tables', 'Standing Workstations', 'Cushioned Booths'],
      layoutDescription: 'Open central work-floor flanked by acoustic booths and private meeting bays.',
      timing: '08:30 AM – 10:00 PM',
      amenities: ['High-Speed Wi-Fi', 'Standing Desks', 'Power Sockets'],
      coverPhoto: '/images/cafes/concu-lounge.webp',
      photos: [
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Atmosphere',
          caption: 'Modern workspace interior with natural airflow'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Seating',
          caption: 'Focused workstations with deep desk surface area'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Layout',
          caption: 'Collaborative team tables and breakout zones'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Specialty coffee counter and beverage menu'
        }
      ]
    },
    {
      id: `${cityName.toLowerCase().replace(/\s+/g, '-')}-3`,
      name: `${cityName} Station Café`,
      area: `${cityName}`,
      address: `12 Station Square, ${cityName}`,
      rating: '4.8',
      reviewCount: 64,
      atmosphereTag: 'Cozy transit work lounge with acoustic felt dividers, soft background music, and fast Wi-Fi.',
      seatingTypes: ['Solid Oak Work Desks', 'Private Call Booths', 'Window Bar Seating'],
      layoutDescription: 'Sunlit front bay for quiet work and private corners for laptop sessions.',
      timing: '08:00 AM – 09:00 PM',
      amenities: ['Gigabit Wi-Fi', 'Dual Sockets', 'Natural Lighting'],
      coverPhoto: '/images/cafes/concu-lounge.webp',
      photos: [
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Atmosphere',
          caption: 'Minimalist interior with botanical plants and daylight'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Seating',
          caption: 'Oak tables equipped with individual power socket towers'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Layout',
          caption: 'Quiet pod areas separated from discussion corners'
        },
        {
          url: '/images/cafes/starbucks-interior.webp',
          category: 'Barista Counter',
          caption: 'Pour-over and espresso brew bar'
        }
      ]
    }
  ];
};

export const WARANGAL_CAFES = CITY_CAFES['Warangal'].map(c => c.name);

export interface LocationSelection {
  country: string;
  state: string;
  city: string;
  date: string;
  endDate?: string;
  cafe?: string;
  cafeDesk?: string;
}

interface LocationSelectorBarProps {
  initialValues?: Partial<LocationSelection>;
  value?: LocationSelection;
  onChange?: (selection: LocationSelection) => void;
  onSelect?: (selection: LocationSelection) => void;
  className?: string;
  hideCafeGrid?: boolean;
}

export const LocationSelectorBar: React.FC<LocationSelectorBarProps> = ({
  initialValues,
  value,
  onChange,
  onSelect,
  className = '',
  hideCafeGrid = false
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const currentCountry = value?.country || initialValues?.country || 'India';
  const currentState = value?.state || initialValues?.state || 'Telangana';
  const currentCity = value?.city || initialValues?.city || 'Warangal';
  const currentDate = value?.date || initialValues?.date || todayStr;
  const currentEndDate = value?.endDate || initialValues?.endDate || currentDate;
  const initialCafe = value?.cafe || value?.cafeDesk || initialValues?.cafe || initialValues?.cafeDesk || getCafesForCity(currentCity)[0]?.name || 'Heritage Café';

  const [country, setCountry] = useState<string>(currentCountry);
  const [state, setState] = useState<string>(currentState);
  const [city, setCity] = useState<string>(currentCity);
  const [date, setDate] = useState<string>(currentDate);
  const [endDate, setEndDate] = useState<string>(currentEndDate);
  const [selectedCafe, setSelectedCafe] = useState<string>(initialCafe);

  // 4K Interior Preview Modal State
  const [previewCafe, setPreviewCafe] = useState<CafeOption | null>(null);

  // 1-at-a-time Browsing State
  const [cafePageIndex, setCafePageIndex] = useState<number>(0);
  const CAFES_PER_PAGE = 1;

  // States per country
  const stateOptions: Record<string, string[]> = {
    India: ['Telangana', 'Karnataka', 'Maharashtra', 'Delhi NCR'],
    'United States': ['Texas', 'California', 'New York', 'Washington']
  };

  // Cities per state
  const cityOptions: Record<string, string[]> = {
    Telangana: ['Warangal', 'Hanamkonda', 'Kazipet', 'Hyderabad'],
    Karnataka: ['Bengaluru', 'Mysuru', 'Hubballi'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    'Delhi NCR': ['New Delhi', 'Gurugram', 'Noida'],
    Texas: ['Austin', 'Dallas', 'Houston'],
    California: ['San Francisco', 'San Jose', 'Los Angeles'],
    'New York': ['New York City', 'Brooklyn', 'Queens'],
    Washington: ['Seattle', 'Bellevue', 'Redmond']
  };

  // Sync with value prop if provided
  useEffect(() => {
    if (value) {
      if (value.country) setCountry(value.country);
      if (value.state) setState(value.state);
      if (value.city) setCity(value.city);
      if (value.date) setDate(value.date);
      if (value.endDate) setEndDate(value.endDate);
      if (value.cafe) setSelectedCafe(value.cafe);
      else if (value.cafeDesk) setSelectedCafe(value.cafeDesk);
    }
  }, [value]);

  const currentCafes = useMemo(() => {
    return getCafesForCity(city);
  }, [city]);

  // Reset pagination index when city changes
  useEffect(() => {
    setCafePageIndex(0);
  }, [city]);

  const totalPages = Math.ceil(currentCafes.length / CAFES_PER_PAGE);

  // Paginated 3 cafés currently visible
  const displayedCafes = useMemo(() => {
    const start = cafePageIndex * CAFES_PER_PAGE;
    return currentCafes.slice(start, start + CAFES_PER_PAGE);
  }, [currentCafes, cafePageIndex]);

  const handleNextCafePage = () => {
    if (cafePageIndex < totalPages - 1) {
      setCafePageIndex(prev => prev + 1);
    }
  };

  const handlePrevCafePage = () => {
    if (cafePageIndex > 0) {
      setCafePageIndex(prev => prev - 1);
    }
  };

  // When city changes, reset cafe to first available
  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const cafes = getCafesForCity(newCity);
    const firstCafe = cafes[0]?.name || `${newCity} Central Café`;
    setSelectedCafe(firstCafe);
    setCafePageIndex(0);

    const newSelection: LocationSelection = {
      country,
      state,
      city: newCity,
      date,
      cafe: firstCafe,
      cafeDesk: firstCafe
    };
    if (onChange) onChange(newSelection);
    if (onSelect) onSelect(newSelection);
  };

  const handleStateChange = (newState: string) => {
    setState(newState);
    const cities = cityOptions[newState] || ['Warangal'];
    const newCity = cities[0] || 'Warangal';
    setCity(newCity);
    const cafes = getCafesForCity(newCity);
    const firstCafe = cafes[0]?.name || `${newCity} Central Café`;
    setSelectedCafe(firstCafe);
    setCafePageIndex(0);

    const newSelection: LocationSelection = {
      country,
      state: newState,
      city: newCity,
      date,
      cafe: firstCafe,
      cafeDesk: firstCafe
    };
    if (onChange) onChange(newSelection);
    if (onSelect) onSelect(newSelection);
  };

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    const states = stateOptions[newCountry] || ['Telangana'];
    const newState = states[0] || 'Telangana';
    setState(newState);
    const cities = cityOptions[newState] || ['Warangal'];
    const newCity = cities[0] || 'Warangal';
    setCity(newCity);
    const cafes = getCafesForCity(newCity);
    const firstCafe = cafes[0]?.name || `${newCity} Central Café`;
    setSelectedCafe(firstCafe);
    setCafePageIndex(0);

    const newSelection: LocationSelection = {
      country: newCountry,
      state: newState,
      city: newCity,
      date,
      cafe: firstCafe,
      cafeDesk: firstCafe
    };
    if (onChange) onChange(newSelection);
    if (onSelect) onSelect(newSelection);
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    const newSelection: LocationSelection = {
      country,
      state,
      city,
      date: newDate,
      endDate: endDate || newDate,
      cafe: selectedCafe,
      cafeDesk: selectedCafe
    };
    if (onChange) onChange(newSelection);
    if (onSelect) onSelect(newSelection);
  };

  const handleRangeChange = (range: { startDate: string; endDate: string; daysCount: number }) => {
    setDate(range.startDate);
    setEndDate(range.endDate);
    const newSelection: LocationSelection = {
      country,
      state,
      city,
      date: range.startDate,
      endDate: range.endDate,
      cafe: selectedCafe,
      cafeDesk: selectedCafe
    };
    if (onChange) onChange(newSelection);
    if (onSelect) onSelect(newSelection);
  };

  const handleCafeSelect = (cafeName: string) => {
    setSelectedCafe(cafeName);
    const newSelection: LocationSelection = {
      country,
      state,
      city,
      date,
      endDate,
      cafe: cafeName,
      cafeDesk: cafeName
    };
    if (onChange) onChange(newSelection);
    if (onSelect) onSelect(newSelection);
  };

  const currentPageStart = cafePageIndex * CAFES_PER_PAGE;
  const currentPageEnd = Math.min(currentPageStart + CAFES_PER_PAGE, currentCafes.length);

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-xs space-y-5 ${className}`}>
      {/* 4K Interior Preview Modal */}
      <CafeInteriorPreviewModal
        cafe={previewCafe}
        isOpen={!!previewCafe}
        onClose={() => setPreviewCafe(null)}
        onSelectCafe={(cafeName) => handleCafeSelect(cafeName)}
      />

      {/* SECTION 1: Country, State, City, Date Controls */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-4 w-4 text-primary shrink-0" />
          <span className="text-xs font-semibold text-foreground">
            Location &amp; date
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
          {/* Country */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">Country</label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-border/80 bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {Object.keys(stateOptions).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <Globe className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* State */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">State</label>
            <div className="relative">
              <select
                value={state}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-border/80 bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {(stateOptions[country] || []).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <MapPin className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* City */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">City</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-border/80 bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {(cityOptions[state] || []).map((ct) => (
                  <option key={ct} value={ct}>{ct}</option>
                ))}
              </select>
              <Building2 className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Dates Column */}
          <div className="relative col-span-2 md:col-span-1">
            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
              Dates
            </label>
            <DateRangePicker
              startDate={date}
              endDate={endDate || date}
              onChange={handleRangeChange}
              minDate={todayStr}
              mode="range"
              align="right"
              compact={true}
              placeholder="Select Dates"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Select Café (1 at a time with Left & Right Arrow Navigation) */}
      {!hideCafeGrid && currentCafes.length > 0 && (
        <div className="pt-3 border-t border-border/70">
          {/* Header Bar with Proper Alignment & Left/Right Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-primary shrink-0" />
              <span className="text-xs font-semibold text-foreground">
                Select café in {city} ({currentCafes.length} available)
              </span>
            </div>

            {/* Pagination / Arrow Navigation Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              <span className="text-xs font-medium text-muted-foreground">
                Café <span className="font-bold text-foreground">{cafePageIndex + 1}</span> of <span className="font-bold text-foreground">{currentCafes.length}</span>
              </span>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevCafePage}
                  disabled={cafePageIndex === 0}
                  aria-label="Previous café"
                  title="Previous café"
                  className={`h-8 w-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    cafePageIndex === 0
                      ? 'border-border/40 text-muted-foreground/30 bg-muted/20 cursor-not-allowed'
                      : 'border-border bg-card hover:bg-accent text-foreground shadow-xs hover:border-primary/50 active:scale-95'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Page Indicator Dots */}
                <div className="flex items-center gap-1 px-1">
                  {currentCafes.map((c, i) => (
                    <button
                      key={c.id || i}
                      type="button"
                      onClick={() => setCafePageIndex(i)}
                      title={`Go to ${c.name}`}
                      aria-label={`Go to ${c.name}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === cafePageIndex ? 'w-5 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextCafePage}
                  disabled={cafePageIndex >= totalPages - 1}
                  aria-label="Next café"
                  title="Next café"
                  className={`h-8 w-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    cafePageIndex >= totalPages - 1
                      ? 'border-border/40 text-muted-foreground/30 bg-muted/20 cursor-not-allowed'
                      : 'border-border bg-card hover:bg-accent text-foreground shadow-xs hover:border-primary/50 active:scale-95'
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Only 1 Café Displayed at a Time - Full-Width Image with Info Below */}
          <div className="relative">
            {displayedCafes.map((cafe) => {
              const isSelected = selectedCafe === cafe.name;
              return (
                <div
                  key={cafe.id}
                  className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 bg-card ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/25 shadow-md'
                      : 'border-border/80 hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  {/* Full-Width 4K Image Header */}
                  <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden bg-muted">
                    <img
                      src={cafe.coverPhoto || '/images/cafes/starbucks-interior.webp'}
                      alt={cafe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                      {cafe.timing && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-medium text-white/90 shadow-xs">
                          <Sun className="h-3 w-3 text-amber-300" />
                          {cafe.timing}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold shadow-xs">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {cafe.rating}
                        {cafe.reviewCount && (
                          <span className="text-white/70 font-normal ml-0.5">({cafe.reviewCount})</span>
                        )}
                      </span>
                    </div>

                    {/* Floating Left & Right In-Image Navigation Arrows */}
                    <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevCafePage();
                        }}
                        disabled={cafePageIndex === 0}
                        aria-label="Previous café"
                        title="Previous café"
                        className={`pointer-events-auto h-10 w-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                          cafePageIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-85 hover:opacity-100 hover:scale-110 active:scale-95'
                        }`}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextCafePage();
                        }}
                        disabled={cafePageIndex >= totalPages - 1}
                        aria-label="Next café"
                        title="Next café"
                        className={`pointer-events-auto h-10 w-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                          cafePageIndex >= totalPages - 1 ? 'opacity-0 pointer-events-none' : 'opacity-85 hover:opacity-100 hover:scale-110 active:scale-95'
                        }`}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Bottom Overlay: Selected Chip */}
                    {isSelected && (
                      <div className="absolute bottom-3 right-3">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                          <span>Selected</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Down Below the Image: 1. Title/Address, 2. Selected for Booking CTA */}
                  <div className="p-5 sm:p-6 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* 1. Heritage Café, Subedari Collectorate Road, Warangal */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">
                          {cafe.name}
                        </h3>
                      </div>
                      <p className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="font-semibold text-foreground/90">{cafe.address || cafe.area}</span>
                      </p>
                    </div>

                    {/* 2. Selected for Booking CTA */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCafeSelect(cafe.name)}
                        className={`py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                          isSelected
                            ? 'bg-primary text-primary-foreground hover:opacity-95'
                            : 'bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="h-4 w-4 stroke-[3]" />
                            <span>Selected for booking</span>
                          </>
                        ) : (
                          <span>Select this café</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
