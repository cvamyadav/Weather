

// "use client"
// import { useEffect, useState, Suspense } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// interface WeatherData {
//   latitude: number;
//   longitude: number;
//   generationtime_ms: number;
//   utc_offset_seconds: number;
//   timezone: string;
//   timezone_abbreviation: string;
//   elevation: number;
//   current_units: {
//     time: string;
//     interval: string;
//     temperature_2m: string;
//     relative_humidity_2m: string;
//     apparent_temperature: string;
//     is_day: string;
//     precipitation: string;
//     rain: string;
//     showers: string;
//     snowfall: string;
//     weather_code: string;
//     cloud_cover: string;
//     pressure_msl: string;
//     surface_pressure: string;
//     wind_speed_10m: string;
//     wind_direction_10m: string;
//     wind_gusts_10m: string;
//   };
//   current: {
//     time: string;
//     interval: number;
//     temperature_2m: number;
//     relative_humidity_2m: number;
//     apparent_temperature: number;
//     is_day: number;
//     precipitation: number;
//     rain: number;
//     showers: number;
//     snowfall: number;
//     weather_code: number;
//     cloud_cover: number;
//     pressure_msl: number;
//     surface_pressure: number;
//     wind_speed_10m: number;
//     wind_direction_10m: number;
//     wind_gusts_10m: number;
//   };
//   daily_units?: {
//     time: string;
//     weather_code: string;
//     temperature_2m_max: string;
//     temperature_2m_min: string;
//     apparent_temperature_max: string;
//     apparent_temperature_min: string;
//     sunrise: string;
//     sunset: string;
//     daylight_duration: string;
//     sunshine_duration: string;
//     uv_index_max: string;
//     precipitation_sum: string;
//   };
//   daily?: {
//     time: string[];
//     weather_code: number[];
//     temperature_2m_max: number[];
//     temperature_2m_min: number[];
//     apparent_temperature_max: number[];
//     apparent_temperature_min: number[];
//     sunrise: string[];
//     sunset: string[];
//     daylight_duration: number[];
//     sunshine_duration: number[];
//     uv_index_max: number[];
//     precipitation_sum: number[];
//   };
// }

// function WeatherDetailContent() {
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   const city = searchParams.get('city') || localStorage.getItem("searchHistory");

//   useEffect(() => {
//     if (!city) {
//       setError("No city specified");
//       setLoading(false);
//       return;
//     }

//     const fetchWeather = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         const response = await fetch(
//           `https://weather-x79z.vercel.app/api/weatherdaily/${city}`
//         );
        
//         if (!response.ok) {
//           throw new Error("Failed to fetch weather data");
//         }
        
//         const data = await response.json();
//         setWeather(data);
//       } catch (err: any) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, [city]);

//   const getWeatherDescription = (code: number) => {
//     const descriptions: Record<number, string> = {
//       0: "Clear sky",
//       1: "Mainly clear",
//       2: "Partly cloudy",
//       3: "Overcast",
//       45: "Fog",
//       48: "Depositing rime fog",
//       51: "Light drizzle",
//       53: "Moderate drizzle",
//       55: "Dense drizzle",
//       56: "Light freezing drizzle",
//       57: "Dense freezing drizzle",
//       61: "Slight rain",
//       63: "Moderate rain",
//       65: "Heavy rain",
//       66: "Light freezing rain",
//       67: "Heavy freezing rain",
//       71: "Slight snow",
//       73: "Moderate snow",
//       75: "Heavy snow",
//       77: "Snow grains",
//       80: "Slight rain showers",
//       81: "Moderate rain showers",
//       82: "Violent rain showers",
//       85: "Slight snow showers",
//       86: "Heavy snow showers",
//       95: "Thunderstorm",
//       96: "Thunderstorm with slight hail",
//       99: "Thunderstorm with heavy hail",
//     };
    
//     return descriptions[code] || `Weather code: ${code}`;
//   };

//   const formatTime = (timeString: string) => {
//     return new Date(timeString).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatDuration = (seconds: number) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     return `${hours}h ${minutes}m`;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-900">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 mb-6">
//             <h2 className="text-xl font-bold mb-2">Error</h2>
//             <p className="text-red-300">{error}</p>
//           </div>
//           <Link 
//             href="/" 
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
//           >
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold">
//             Weather Details for <span className="capitalize text-blue-400">{city}</span>
//           </h1>
//           <Link 
//             href="/" 
//             className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium"
//           >
//             Back to Home
//           </Link>
//         </div>
        
//         {weather && (
//           <div className="space-y-8">
//             <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
//               <h2 className="text-xl font-bold mb-4">Current Weather</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {Object.entries(weather.current).map(([key, value]) => (
//                   <div key={key} className="bg-gray-700/50 p-4 rounded-lg">
//                     <h3 className="text-gray-400 text-sm mb-1 capitalize">
//                       {key.replace(/_/g, ' ')}
//                     </h3>
//                     <p className="text-lg font-medium">
//                       {key === 'time' ? formatTime(value as string) :
//                        key === 'is_day' ? (value === 1 ? 'Day' : 'Night') :
//                        key === 'weather_code' ? getWeatherDescription(value as number) :
//                        typeof value === 'number' ? value.toFixed(2) : value}
//                       {weather.current_units[key as keyof typeof weather.current_units] && (
//                         <span className="text-sm text-gray-400 ml-1">
//                           {weather.current_units[key as keyof typeof weather.current_units]}
//                         </span>
//                       )}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {weather.daily && weather.daily_units && (
//               <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
//                 <h2 className="text-xl font-bold mb-4">7-Day Forecast</h2>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-700">
//                         <th className="p-3 text-left">Day</th>
//                         {weather.daily.time.map((date, index) => (
//                           <th key={index} className="p-3 text-center">
//                             {new Date(date).toLocaleDateString([], { weekday: 'short' })}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {Object.entries(weather.daily).map(([key, values]) => (
//                         key !== 'time' && (
//                           <tr key={key} className="border-b border-gray-700/50">
//                             <td className="p-3 text-gray-400 capitalize">
//                               {key.replace(/_/g, ' ')}
//                               {weather.daily_units && weather.daily_units[key as keyof typeof weather.daily_units] && (
//                                 <span className="text-xs ml-1">({weather.daily_units[key as keyof typeof weather.daily_units]})</span>
//                               )}
//                             </td>
//                             {(values as any[]).map((value, index) => (
//                               <td key={index} className="p-3 text-center">
//                                 {key.includes('sunrise') || key.includes('sunset') ? formatTime(value) :
//                                  key.includes('duration') ? formatDuration(value) :
//                                  key === 'weather_code' ? getWeatherDescription(value) :
//                                  typeof value === 'number' ? value.toFixed(2) : value}
//                               </td>
//                             ))}
//                           </tr>
//                         )
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
//               <h2 className="text-xl font-bold mb-4">Location Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-gray-700/50 p-4 rounded-lg">
//                   <h3 className="text-gray-400 text-sm">Latitude</h3>
//                   <p className="text-lg font-medium">{weather.latitude}</p>
//                 </div>
//                 <div className="bg-gray-700/50 p-4 rounded-lg">
//                   <h3 className="text-gray-400 text-sm">Longitude</h3>
//                   <p className="text-lg font-medium">{weather.longitude}</p>
//                 </div>
//                 <div className="bg-gray-700/50 p-4 rounded-lg">
//                   <h3 className="text-gray-400 text-sm">Elevation</h3>
//                   <p className="text-lg font-medium">{weather.elevation} meters</p>
//                 </div>
//                 <div className="bg-gray-700/50 p-4 rounded-lg">
//                   <h3 className="text-gray-400 text-sm">Timezone</h3>
//                   <p className="text-lg font-medium">{weather.timezone}</p>
//                 </div>
//                 <div className="bg-gray-700/50 p-4 rounded-lg">
//                   <h3 className="text-gray-400 text-sm">Timezone Abbreviation</h3>
//                   <p className="text-lg font-medium">{weather.timezone_abbreviation}</p>
//                 </div>
//                 <div className="bg-gray-700/50 p-4 rounded-lg">
//                   <h3 className="text-gray-400 text-sm">UTC Offset</h3>
//                   <p className="text-lg font-medium">{weather.utc_offset_seconds / 3600} hours</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function DetailPage() {
//   return (
//     <Suspense fallback={
//       <div className="flex justify-center items-center min-h-screen bg-gray-900">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     }>
//       <WeatherDetailContent />
//     </Suspense>
//   );
// }




"use client"
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

function WeatherDetailContent() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cityName, setCityName] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get city from URL parameters or localStorage
    const urlCity = searchParams.get('city');
    const savedHistory = localStorage.getItem("searchHistory");
    
    let city = urlCity;
    
    if (!city && savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        city = history[0]; // Get the most recent search
      } catch (err) {
        console.error("Error parsing search history:", err);
      }
    }

    if (!city) {
      setError("No city specified");
      setLoading(false);
      return;
    }

    setCityName(city);
    fetchWeatherData(city);
  }, [searchParams]);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://weather-x79z.vercel.app/api/weatherdaily/${city}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching weather data");
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (code: number) => {
    const descriptions: Record<number, string> = {
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
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };
    
    return descriptions[code] || `Weather code: ${code}`;
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timeString: string) => {
    return new Date(timeString).toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="text-red-300">{error}</p>
          </div>
          <Link 
            href="/" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Weather Details for <span className="capitalize text-blue-400">{cityName}</span>
            </h1>
            {weather && weather.current_weather && (
              <p className="text-gray-400 mt-2">
                Last updated: {formatDate(weather.current_weather.time)} at {formatTime(weather.current_weather.time)}
              </p>
            )}
          </div>
          <Link 
            href="/" 
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium whitespace-nowrap"
          >
            Back to Home
          </Link>
        </div>
        
        {weather && weather.current_weather && (
          <div className="space-y-8">
            {/* Current Weather Card */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Current Weather</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-700/50 p-6 rounded-lg text-center">
                  <h3 className="text-gray-400 text-sm mb-2">Temperature</h3>
                  <p className="text-3xl font-bold text-white">
                    {weather.current_weather.temperature}°
                    <span className="text-lg text-gray-400 ml-1">{weather.current_weather_units.temperature}</span>
                  </p>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg text-center">
                  <h3 className="text-gray-400 text-sm mb-2">Wind Speed</h3>
                  <p className="text-3xl font-bold text-white">
                    {weather.current_weather.windspeed}
                    <span className="text-lg text-gray-400 ml-1">{weather.current_weather_units.windspeed}</span>
                  </p>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg text-center">
                  <h3 className="text-gray-400 text-sm mb-2">Wind Direction</h3>
                  <p className="text-3xl font-bold text-white">
                    {weather.current_weather.winddirection}°
                    <span className="text-lg text-gray-400 ml-1">{weather.current_weather_units.winddirection}</span>
                  </p>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg text-center">
                  <h3 className="text-gray-400 text-sm mb-2">Conditions</h3>
                  <p className="text-xl font-bold text-white capitalize">
                    {getWeatherDescription(weather.current_weather.weathercode)}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {weather.current_weather.is_day === 1 ? '☀️ Day' : '🌙 Night'}
                  </p>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            {weather.hourly && weather.hourly.time.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-blue-400">24-Hour Forecast</h2>
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 pb-4 min-w-max">
                    {weather.hourly.time.slice(0, 24).map((time, index) => (
                      <div key={time} className="bg-gray-700/50 p-4 rounded-lg text-center min-w-[120px]">
                        <div className="text-gray-400 text-sm mb-2">
                          {new Date(time).getHours()}:00
                        </div>
                        <div className="text-xl font-bold text-white mb-2">
                          {weather.hourly.temperature_2m[index]}°
                        </div>
                        <div className="text-gray-400 text-sm mb-1">
                          💧 {weather.hourly.relative_humidity_2m[index]}%
                        </div>
                        <div className="text-gray-400 text-sm">
                          💨 {weather.hourly.wind_speed_10m[index]} {weather.hourly_units.wind_speed_10m}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Location Information */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Location Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm mb-1">Coordinates</h3>
                  <p className="text-lg font-medium text-white">
                    {weather.latitude.toFixed(4)}°N, {weather.longitude.toFixed(4)}°E
                  </p>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm mb-1">Elevation</h3>
                  <p className="text-lg font-medium text-white">
                    {weather.elevation} meters
                  </p>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm mb-1">Timezone</h3>
                  <p className="text-lg font-medium text-white">
                    {weather.timezone} ({weather.timezone_abbreviation})
                  </p>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm mb-1">UTC Offset</h3>
                  <p className="text-lg font-medium text-white">
                    {weather.utc_offset_seconds / 3600} hours
                  </p>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-gray-400 text-sm mb-1">Data Processing Time</h3>
                  <p className="text-lg font-medium text-white">
                    {weather.generationtime_ms.toFixed(2)} ms
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Map Link */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">View on Map</h3>
              <a
                href={`https://www.openstreetmap.org/?mlat=${weather.latitude}&mlon=${weather.longitude}#map=10/${weather.latitude}/${weather.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              >
                🗺️ Open in OpenStreetMap
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WeatherDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <WeatherDetailContent />
    </Suspense>
  );
}