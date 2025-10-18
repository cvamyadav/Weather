


// const express = require('express');
// const cors = require('cors'); 
// const fetch = require('node-fetch');

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello from the backend!');
// });



// app.use(cors({
//    origin: [
//     'http://localhost:3001',
//     'http://localhost:3000',
//     'https://weather-sogz.vercel.app/',
//     'https://weather-pied-mu-54.vercel.app',
//     'https://weather-lovat-xi-38.vercel.app/',
//     /\.vercel\.app$/
//   ],
//   credentials: true,
// }));

// app.use(express.json());

// app.get('/api/weatherdaily/:city', async (req, res) => { 
//   try { 
//     const city = req.params.city || req.query.city || "varanasi"; 
//     const weatherData = await getWeatherByCity(city);
//     if (!weatherData) {
//       return res.status(404).json({ error: 'Weather data not found' });   
//     }
//     res.json(weatherData);
//   } catch (error) {
//     console.log('Error fetching weather:', error);
   
//   }
// });


// async function getWeather(latitude, longitude) {
//   const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  
//   try {
//     const response = await fetch(url);
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching weather:", error);
//     return null;
//   }
// }

// async function getWeatherByCity(city) {
//   const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`;
  
//   try {
//     const geoResponse = await fetch(geocodeUrl);
//     const geoData = await geoResponse.json();
    
//     if (geoData.length === 0) {
//       throw new Error("City not found");
//     }

//     const { lat, lon } = geoData[0];
//     return await getWeather(lat, lon);
//   } catch (error) {
//     console.error("Error getting city coordinates:", error);

//     return null;
//   }
// }

// module.exports = app;


// app.listen(4000, () => {
//   console.log('Server is running on port 4000');
// });  


/**
 * Vercel-compatible serverless handler replacing the Express app.
 * Exposes:
 *  - GET /                 -> plain text hello
 *  - GET /api/weatherdaily/:city  -> JSON weather for city (or ?city=)
 *
 * NOTE: Remove any app.listen / Express usage when deploying to Vercel.
 */

const fetch = require('node-fetch');

const ALLOWED_ORIGINS = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://weather-sogz.vercel.app',
  'https://weather-pied-mu-54.vercel.app',
  'https://weather-lovat-xi-38.vercel.app',
  /\.vercel\.app$/
];

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  let allowed = false;
  if (origin) {
    for (const o of ALLOWED_ORIGINS) {
      if (typeof o === 'string' && o === origin) {
        allowed = true;
        break;
      }
      if (o instanceof RegExp && o.test(origin)) {
        allowed = true;
        break;
      }
    }
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '600');
  res.setHeader('Vary', 'Origin');

  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}

async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Open-Meteo returned ${r.status}`);
  return r.json();
}

async function getWeatherByCity(city) {
  const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
  const geoResponse = await fetch(geocodeUrl, {
    headers: { 'User-Agent': 'vercel-weather-app/1.0 (+https://vercel.com)' }
  });
  if (!geoResponse.ok) throw new Error(`Geocoding returned ${geoResponse.status}`);
  const geoData = await geoResponse.json();
  if (!Array.isArray(geoData) || geoData.length === 0) {
    return null;
  }
  const { lat, lon } = geoData[0];
  return getWeather(lat, lon);
}

module.exports = async (req, res) => {
  try {
    setCorsHeaders(req, res);

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      return res.end();
    }

    const base = `http://${req.headers.host || 'localhost'}`;
    const url = new URL(req.url, base);
    const pathname = url.pathname;

    if (req.method === 'GET' && pathname === '/') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.statusCode = 200;
      return res.end('Hello from the backend!');
    }

    // Match /api/weatherdaily/:city
    const weatherPrefix = '/api/weatherdaily/';
    if (req.method === 'GET' && pathname.startsWith(weatherPrefix)) {
      const cityFromPath = decodeURIComponent(pathname.slice(weatherPrefix.length)) || null;
      const city = cityFromPath || url.searchParams.get('city') || 'varanasi';

      try {
        const data = await getWeatherByCity(city);
        if (!data) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 404;
          return res.end(JSON.stringify({ error: 'City not found or no weather data' }));
        }
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        return res.end(JSON.stringify(data));
      } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 502;
        return res.end(JSON.stringify({ error: 'Upstream service error', details: err.message }));
      }
    }

    // Not found
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: 'Not Found' }));
  } catch (err) {
    console.error('Server error:', err);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'Internal Server Error', details: err.message }));
  }
};