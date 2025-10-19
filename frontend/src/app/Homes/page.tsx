// "use client"
// import { useState, useEffect } from "react";
// import Link from "next/link";




// interface CurrentWeather {
//   temperature: number;
//   windspeed: number;
//   humidity: number;
//   weather_descriptions?: string[];
// }

// interface WeatherData {
//   latitude: number;
//   longitude: number;
//   generationtime_ms: number;
//   timezone: string;
//   current_units: CurrentWeather;
//   current: {
//     time: string,
//     interval: number,
//     temperature_2m: number,
//     wind_speed_10m: number,
//   };
// }

// export default function Homes() {
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchHistory, setSearchHistory] = useState<string[]>([]);

//   useEffect(() => {
//     const savedHistory = localStorage.getItem("searchHistory");
//     if (savedHistory) {
//       setSearchHistory(JSON.parse(savedHistory));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
//   }, [searchHistory]);

//   let lastRequest = Promise.resolve();
//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;
    
//     setLoading(true);
//     setError(null);


//     try {

//       const response = await fetch(
//         `https://weather-x79z.vercel.app/api/weatherdaily/${searchQuery}`
//       );
//       console.log("Fetch response:", response);
//       if (!response.ok) {
//         throw new Error("Search again");
//       }
      
//       const data = await response.json();
//       setWeather(data);
      
//       setSearchHistory(prev => {
//         if (!prev.includes(searchQuery.trim())) {
//           return [...prev, searchQuery.trim()];
//         }
//         return prev;
//       });
      
//     } catch (err) {
//       setError("An error occurred");
//       console.error("Error fetching weather data:", err);
//     } finally {
//       setLoading(false);
//     }
//       return lastRequest; 
//   };


//   return (
//     <div className="w-full min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto mb-8">
//         <form onSubmit={handleSearch} className="w-full">
//           <div className="flex flex-col sm:flex-row gap-2">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for a city..."
//               className="flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//             />
//             <button
//               type="submit"
//               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-medium"
//             >
//               Search
//             </button> 

//             <Link 
//               href="/Weatherdetail" 
//               className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-bold whitespace-nowrap flex items-center justify-center"
//             >
//               View History
//             </Link>
//           </div>
//         </form>
//       </div>

//       <main className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">Current Weather</h1>
        
//         {loading && (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         )}
        
//         {error && (
//           <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
//             <p className="text-red-300">Error: {error}</p>
//           </div>
//         )}
        
//         {weather && (
//           <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <h2 className="text-xl font-semibold capitalize">
//                  {searchQuery}
//                 </h2>
//                 <p className="text-gray-400 text-sm">Current conditions</p>
//               </div>
              
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Temperature</span>
//                   <span className="text-xl font-medium">
//                     {weather.current.temperature_2m}°C
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Wind Speed</span>
//                   <span className="text-lg">
//                     {weather.current.wind_speed_10m} km/h
//                   </span>
//                 </div>
                
//                 {weather.current.time && (
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400">Last Updated</span>
//                     <span className="text-sm">{new Date(weather.current.time).toLocaleTimeString()}</span>
//                   </div>
//                 )}
//               </div>
//             </div> 
//           </div>
//         )}
//       </main>

//       <footer className="max-w-4xl mx-auto mt-8 text-center text-gray-500 text-xs">
//         <p>Weather data provided API</p>
//         <p className="text-2xl text-bold ">Once the page get Mount the local storage get deleted</p>
//         <p className="text-bold">Nominatim has a strict usage policy limiting requests to a maximum of 1 per second per application. Take pause for second search .</p>
//       </footer>
//     </div>
//   );

// }


"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: {
    time: string;
    interval: string;
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
    weathercode: string;
  };
  current_weather: {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState("");

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://weather-x79z.vercel.app/api/weatherdaily/${searchQuery}`
      );
      
      console.log("Fetch response:", response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
      }
      
      const data = await response.json();
      setWeather(data);
      setCurrentCity(searchQuery.trim());
      
      // Update search history
      setSearchHistory(prev => {
        const newHistory = prev.filter(city => city !== searchQuery.trim());
        return [searchQuery.trim(), ...newHistory].slice(0, 10); // Keep last 10 searches
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching weather data");
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (weathercode: number): string => {
    const weatherCodes: { [key: number]: string } = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      95: "Thunderstorm"
    };
    return weatherCodes[weathercode] || "Unknown";
  };

  const getDayNightStatus = (is_day: number): string => {
    return is_day === 1 ? "Day" : "Night";
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a city..."
              className="flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-colors rounded-lg font-medium"
            >
              {loading ? "Searching..." : "Search"}
            </button> 

            <Link 
              href="/Weatherdetail" 
              className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium whitespace-nowrap flex items-center justify-center"
            >
              View History
            </Link>
          </div>
        </form>
      </div>

      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Current Weather</h1>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-300">Error: {error}</p>
          </div>
        )}
        
        {weather && weather.current_weather && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Weather Section */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold capitalize mb-2">
                    {currentCity || "Unknown Location"}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {weather.timezone} • Elevation: {weather.elevation}m
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-white mb-2">
                      {weather.current_weather.temperature}°C
                    </div>
                    <div className="text-lg text-gray-300">
                      {getWeatherDescription(weather.current_weather.weathercode)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {getDayNightStatus(weather.current_weather.is_day)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-gray-400">Wind Speed</div>
                      <div className="text-white font-medium">{weather.current_weather.windspeed} km/h</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400">Wind Direction</div>
                      <div className="text-white font-medium">{weather.current_weather.winddirection}°</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Weather Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Coordinates</span>
                      <span className="text-white">
                        {weather.latitude.toFixed(2)}°N, {weather.longitude.toFixed(2)}°E
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Last Updated</span>
                      <span className="text-white text-sm">
                        {new Date(weather.current_weather.time).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Timezone</span>
                      <span className="text-white">{weather.timezone_abbreviation}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Data Age</span>
                      <span className="text-white">
                        {weather.generationtime_ms.toFixed(2)} ms
                      </span>
                    </div>
                  </div>
                </div>

                {/* Next 3 Hours Preview */}
                {weather.hourly && weather.hourly.time.length > 0 && (
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3">Next 3 Hours</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {weather.hourly.time.slice(0, 3).map((time, index) => (
                        <div key={time} className="text-center">
                          <div className="text-gray-400">
                            {new Date(time).getHours()}:00
                          </div>
                          <div className="text-white font-medium">
                            {weather.hourly.temperature_2m[index]}°C
                          </div>
                          <div className="text-xs text-gray-400">
                            {weather.hourly.relative_humidity_2m[index]}% humidity
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search History Preview */}
        {searchHistory.length > 0 && (
          <div className="mt-6 bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.slice(0, 5).map((city, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(city);
                    // Auto-search when clicking on history item
                    const event = new Event('submit', { bubbles: true, cancelable: true });
                    document.querySelector('form')?.dispatchEvent(event);
                  }}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto mt-8 text-center text-gray-500 text-xs">
        <p>Weather data provided by Open-Meteo API</p>
        <p className="mt-2 text-gray-400">
          Nominatim has a strict usage policy limiting requests to a maximum of 1 per second per application.
        </p>
      </footer>
    </div>
  );
}