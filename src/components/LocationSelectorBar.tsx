import React, { useState, useEffect, useMemo } from 'react';
import { Globe, MapPin, Building2, Calendar, Coffee, Check, Star } from 'lucide-react';

export interface CafeOption {
  id: string;
  name: string;
  area: string;
  address: string;
  rating: string;
  amenities: string[];
}

export const CITY_CAFES: Record<string, CafeOption[]> = {
  Warangal: [
    {
      id: 'wgl-1',
      name: 'Celpin Heritage Café',
      area: 'Subedari, Warangal',
      address: 'Subedari Collectorate Road, Warangal',
      rating: '4.9',
      amenities: ['Fiber Wi-Fi', 'Quiet Pods', 'Espresso Bar']
    },
    {
      id: 'wgl-2',
      name: 'Celpin Fort Road WorkCafé',
      area: 'Station Road, Warangal',
      address: 'Station Road near Fort Gate, Warangal',
      rating: '4.8',
      amenities: ['Standing Desks', 'Artisan Bakery', 'Meeting Pod']
    },
    {
      id: 'wgl-3',
      name: 'Celpin Urban Roasters',
      area: 'MGM Circle, Warangal',
      address: 'MGM Hospital Road, Warangal',
      rating: '4.8',
      amenities: ['Power at All Seats', 'Cold Brew Bar', 'Outdoor Bay']
    }
  ],
  Hanamkonda: [
    {
      id: 'hnk-1',
      name: 'Celpin Premium Lounge',
      area: 'Nakkalagutta, Hanamkonda',
      address: 'Near Nakkalagutta Junction, Hanamkonda',
      rating: '4.9',
      amenities: ['Ergonomic Chairs', 'Specialty Pour-Over', 'Phone Booth']
    },
    {
      id: 'hnk-2',
      name: 'Celpin Kakatiya Café',
      area: 'KU Cross Road, Hanamkonda',
      address: 'Kakatiya University Road, Hanamkonda',
      rating: '4.8',
      amenities: ['High-Speed Wi-Fi', 'Study Pods', 'Nitro Coffee']
    },
    {
      id: 'hnk-3',
      name: 'Celpin High-Street Café',
      area: 'Public Gardens Road, Hanamkonda',
      address: 'Public Gardens Commercial Strip, Hanamkonda',
      rating: '4.8',
      amenities: ['Team Tables', 'Conference Display', 'Gourmet Bistro']
    }
  ],
  Kazipet: [
    {
      id: 'kzp-1',
      name: 'Celpin Junction Express',
      area: 'Station Square, Kazipet',
      address: 'Opp. Railway Station Terminal, Kazipet',
      rating: '4.8',
      amenities: ['24/7 Power Backup', 'Acoustic Pods', 'Quick Brews']
    },
    {
      id: 'kzp-2',
      name: 'Celpin Tech Junction',
      area: 'NIT Bypass Road, Kazipet',
      address: 'NIT Campus West Corridor, Kazipet',
      rating: '4.9',
      amenities: ['Dual Monitor Docks', 'Fiber Internet', 'Snack Lounge']
    },
    {
      id: 'kzp-3',
      name: 'Celpin Botanical Roastery',
      area: 'Babu Camp Outer, Kazipet',
      address: 'Diesel Colony Main Road, Kazipet',
      rating: '4.7',
      amenities: ['Garden Patio', 'Quiet Workstations', 'Artisanal Roastery']
    }
  ],
  Hyderabad: [
    {
      id: 'hyd-1',
      name: 'Celpin Cyber Towers Bay',
      area: 'Hitech City, Hyderabad',
      address: 'Hitech City Main Road, Madhapur, Hyderabad',
      rating: '4.9',
      amenities: ['Gigabit Wi-Fi', 'Private Cabins', 'Barista Lounge']
    },
    {
      id: 'hyd-2',
      name: 'Celpin Financial District Lounge',
      area: 'Gachibowli, Hyderabad',
      address: 'ISB Road, Financial District, Hyderabad',
      rating: '4.9',
      amenities: ['Executive Suites', 'Soundproof Pods', 'Gourmet Kitchen']
    },
    {
      id: 'hyd-3',
      name: 'Celpin Jubilee Hills Retreat',
      area: 'Road No. 36, Jubilee Hills, Hyderabad',
      address: 'Road No. 36, Jubilee Hills, Hyderabad',
      rating: '4.8',
      amenities: ['Terrace Workspace', 'Specialty Coffee', 'Creative Studios']
    }
  ]
};

// Always returns at least 3 dummy cafes for ANY selected city
export const getCafesForCity = (cityName: string): CafeOption[] => {
  if (CITY_CAFES[cityName] && CITY_CAFES[cityName].length >= 3) {
    return CITY_CAFES[cityName];
  }
  return [
    {
      id: `${cityName.toLowerCase().replace(/\s+/g, '-')}-1`,
      name: `Celpin ${cityName} Central Café`,
      area: `Downtown, ${cityName}`,
      address: `101 Main Avenue, ${cityName}`,
      rating: '4.9',
      amenities: ['Fiber Wi-Fi', 'Ergonomic Desks', 'Specialty Espresso']
    },
    {
      id: `${cityName.toLowerCase().replace(/\s+/g, '-')}-2`,
      name: `Celpin ${cityName} Tech Park Lounge`,
      area: `Innovation Corridor, ${cityName}`,
      address: `45 Tech Boulevard, ${cityName}`,
      rating: '4.8',
      amenities: ['High-Speed Internet', 'Quiet Focus Pods', 'Artisan Bakery']
    },
    {
      id: `${cityName.toLowerCase().replace(/\s+/g, '-')}-3`,
      name: `Celpin ${cityName} Metro Roastery`,
      area: `Transit Circle, ${cityName}`,
      address: `12 Station Square, ${cityName}`,
      rating: '4.8',
      amenities: ['Power at Every Seat', 'Meeting Spaces', 'Cold Brew Bar']
    }
  ];
};

export const WARANGAL_CAFES = CITY_CAFES['Warangal'].map(c => c.name);

export interface LocationSelection {
  country: string;
  state: string;
  city: string;
  date: string;
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
  const initialCafe = value?.cafe || value?.cafeDesk || initialValues?.cafe || initialValues?.cafeDesk || getCafesForCity(currentCity)[0]?.name || 'Celpin Heritage Café';

  const [country, setCountry] = useState<string>(currentCountry);
  const [state, setState] = useState<string>(currentState);
  const [city, setCity] = useState<string>(currentCity);
  const [date, setDate] = useState<string>(currentDate);
  const [selectedCafe, setSelectedCafe] = useState<string>(initialCafe);

  // States per country
  const stateOptions: Record<string, string[]> = {
    India: ['Telangana', 'Karnataka', 'Maharashtra', 'Delhi NCR'],
    'United States': ['Texas', 'California', 'New York', 'Washington']
  };

  // Cities per state
  const cityOptions: Record<string, string[]> = {
    Telangana: ['Warangal', 'Hanamkonda', 'Kazipet', 'Hyderabad'],
    Karnataka: ['Bengaluru', 'Mysuru'],
    Maharashtra: ['Mumbai', 'Pune'],
    'Delhi NCR': ['New Delhi', 'Gurugram', 'Noida'],
    Texas: ['Austin', 'Dallas', 'Houston'],
    California: ['San Francisco', 'San Jose', 'Los Angeles'],
    'New York': ['New York City', 'Brooklyn'],
    Washington: ['Seattle', 'Bellevue']
  };

  // Synchronize with external value prop
  useEffect(() => {
    if (value) {
      if (value.country) setCountry(value.country);
      if (value.state) setState(value.state);
      if (value.city) setCity(value.city);
      if (value.date) setDate(value.date);
      if (value.cafe || value.cafeDesk) setSelectedCafe(value.cafe || value.cafeDesk || '');
    }
  }, [value]);

  const currentCafes = useMemo(() => {
    return getCafesForCity(city);
  }, [city]);

  // When city changes or currentCafes change, make sure a valid cafe is chosen
  useEffect(() => {
    const cafeExists = currentCafes.some(c => c.name === selectedCafe);
    if (!cafeExists && currentCafes.length > 0) {
      const defaultCafe = currentCafes[0].name;
      setSelectedCafe(defaultCafe);
      notifyChange(country, state, city, date, defaultCafe);
    }
  }, [city, currentCafes]);

  const notifyChange = (newCountry: string, newState: string, newCity: string, newDate: string, newCafe: string) => {
    const updated: LocationSelection = {
      country: newCountry,
      state: newState,
      city: newCity,
      date: newDate,
      cafe: newCafe,
      cafeDesk: newCafe
    };
    if (onChange) onChange(updated);
    if (onSelect) onSelect(updated);
  };

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    const defaultState = stateOptions[newCountry]?.[0] || '';
    setState(defaultState);
    const defaultCity = cityOptions[defaultState]?.[0] || '';
    setCity(defaultCity);
    const cafes = getCafesForCity(defaultCity);
    const defaultCafe = cafes[0]?.name || '';
    setSelectedCafe(defaultCafe);
    notifyChange(newCountry, defaultState, defaultCity, date, defaultCafe);
  };

  const handleStateChange = (newState: string) => {
    setState(newState);
    const defaultCity = cityOptions[newState]?.[0] || '';
    setCity(defaultCity);
    const cafes = getCafesForCity(defaultCity);
    const defaultCafe = cafes[0]?.name || '';
    setSelectedCafe(defaultCafe);
    notifyChange(country, newState, defaultCity, date, defaultCafe);
  };

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const cafes = getCafesForCity(newCity);
    const defaultCafe = cafes[0]?.name || '';
    setSelectedCafe(defaultCafe);
    notifyChange(country, state, newCity, date, defaultCafe);
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    notifyChange(country, state, city, newDate, selectedCafe);
  };

  const handleCafeSelect = (cafeName: string) => {
    setSelectedCafe(cafeName);
    notifyChange(country, state, city, date, cafeName);
  };

  return (
    <div className={`w-full rounded-2xl bg-card border border-border p-5 shadow-sm space-y-5 transition-all ${className}`}>
      {/* SECTION 1: City & Booking Date Controls */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">
              Select City &amp; Booking Date
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            Tricity Cafés Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Country Selector */}
          <div className="flex flex-col gap-1.5 px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/60 hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <label htmlFor="loc-country-select" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
              Country
            </label>
            <select
              id="loc-country-select"
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="bg-transparent font-semibold text-foreground text-sm focus:outline-none cursor-pointer w-full"
            >
              <option value="India" className="bg-card text-foreground">🇮🇳 India</option>
              <option value="United States" className="bg-card text-foreground">🇺🇸 United States (US)</option>
            </select>
          </div>

          {/* State Selector */}
          <div className="flex flex-col gap-1.5 px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/60 hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <label htmlFor="loc-state-select" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
              State
            </label>
            <select
              id="loc-state-select"
              value={state}
              onChange={(e) => handleStateChange(e.target.value)}
              className="bg-transparent font-semibold text-foreground text-sm focus:outline-none cursor-pointer w-full"
            >
              {(stateOptions[country] || ['Telangana']).map((st) => (
                <option key={st} value={st} className="bg-card text-foreground">
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* City Selector (Changed from City / Hub to City) */}
          <div className="flex flex-col gap-1.5 px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/60 hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <label htmlFor="loc-city-select" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
              City
            </label>
            <select
              id="loc-city-select"
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-transparent font-semibold text-foreground text-sm focus:outline-none cursor-pointer w-full"
            >
              {(cityOptions[state] || ['Warangal', 'Hanamkonda', 'Kazipet', 'Hyderabad']).map((ct) => (
                <option key={ct} value={ct} className="bg-card text-foreground">
                  {ct}
                </option>
              ))}
            </select>
          </div>

          {/* Booking Date Selector */}
          <div className="flex flex-col gap-1.5 px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/60 hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <label htmlFor="loc-date-input" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
              Booking Date
            </label>
            <input
              id="loc-date-input"
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-transparent font-semibold text-foreground text-sm focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Select Café (At least 3 Cafes linked to the selected City) */}
      {!hideCafeGrid && (
        <div className="pt-2 border-t border-border/70">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-primary shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Select Café in {city} ({currentCafes.length} Available)
              </span>
            </div>
            <span className="text-xs text-primary font-semibold">
              Step 1: Choose Your Café
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {currentCafes.map((cafe) => {
              const isSelected = selectedCafe === cafe.name;
              return (
                <div
                  key={cafe.id}
                  onClick={() => handleCafeSelect(cafe.name)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-sm'
                      : 'border-border/80 bg-card hover:border-primary/40 hover:bg-muted/30 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-sm text-foreground leading-tight">
                        {cafe.name}
                      </h4>
                      {isSelected ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0 shadow-xs">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500 shrink-0">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {cafe.rating}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-primary mb-1">
                      {cafe.area}
                    </p>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mb-2.5">
                      {cafe.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-border/50">
                    {cafe.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted/60 text-muted-foreground"
                      >
                        {amenity}
                      </span>
                    ))}
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
