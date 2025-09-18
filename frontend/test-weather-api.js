// Simple test script for OpenWeatherMap API
// Run with: node test-weather-api.js

const API_KEY = "a78b36acd4ea468406922f6b99c9ed96"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function testWeatherAPI() {
  try {
    console.log("🧪 Testing OpenWeatherMap API...\n");

    // Test 1: Search for Prenzlau
    console.log('📍 Test 1: Searching for "Prenzlau"');
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=Prenzlau&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.ok) {
      throw new Error(`Geo API error: ${geoResponse.statusText}`);
    }

    const geoData = await geoResponse.json();
    console.log("✅ Found locations:", geoData);

    if (geoData.length === 0) {
      console.log("❌ No locations found for Prenzlau");
      return;
    }

    const { lat, lon, name, country } = geoData[0];
    console.log(`📍 Using: ${name}, ${country} (${lat}, ${lon})\n`);

    // Test 2: Get current weather
    console.log("🌤️  Test 2: Getting current weather");
    const weatherResponse = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!weatherResponse.ok) {
      throw new Error(`Weather API error: ${weatherResponse.statusText}`);
    }

    const weatherData = await weatherResponse.json();
    console.log("✅ Current weather:");
    console.log(`   Temperature: ${Math.round(weatherData.main.temp)}°C`);
    console.log(`   Condition: ${weatherData.weather[0].description}`);
    console.log(`   Feels like: ${Math.round(weatherData.main.feels_like)}°C`);
    console.log(`   Humidity: ${weatherData.main.humidity}%\n`);

    // Test 3: Get forecast
    console.log("📅 Test 3: Getting 5-day forecast");
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!forecastResponse.ok) {
      throw new Error(`Forecast API error: ${forecastResponse.statusText}`);
    }

    const forecastData = await forecastResponse.json();
    console.log("✅ Forecast data received:");
    console.log(`   ${forecastData.list.length} forecast entries`);
    console.log(
      `   City: ${forecastData.city.name}, ${forecastData.city.country}`
    );

    // Show next 3 days
    const dailyForecasts = {};
    forecastData.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(item);
    });

    console.log("\n📊 Next 3 days:");
    Object.entries(dailyForecasts)
      .slice(0, 3)
      .forEach(([date, forecasts]) => {
        const temps = forecasts.map((f) => f.main.temp);
        const maxTemp = Math.round(Math.max(...temps));
        const minTemp = Math.round(Math.min(...temps));
        const condition = forecasts[0].weather[0].description;
        console.log(`   ${date}: ${minTemp}°C - ${maxTemp}°C, ${condition}`);
      });

    console.log("\n🎉 All tests passed! Your API key is working correctly.");
    console.log("\n📝 Next steps:");
    console.log("1. Copy your API key to .env.local file");
    console.log('2. Replace "your_api_key_here" with your actual key');
    console.log("3. Restart the development server (npm run dev)");
  } catch (error) {
    console.error("❌ API Test failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Check if your API key is correct");
    console.log(
      "2. Make sure your API key is activated (can take 10-60 minutes)"
    );
    console.log("3. Verify you have internet connection");
    console.log("4. Check OpenWeatherMap service status");
  }
}

// Run the test
testWeatherAPI();
