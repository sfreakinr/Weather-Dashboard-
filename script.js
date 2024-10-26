const apiKey = 'befd984de4d3c050671d4eb935e6c660';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherDetails = document.getElementById('weatherDetails');
  const errorMessage = document.getElementById('errorMessage');
  const loadingSpinner = document.getElementById('loadingSpinner');

  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  // Reset infos
  weatherDetails.style.display = 'none';
  errorMessage.style.display = 'none';
  loadingSpinner.style.display = 'block';

  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error('City not found.');
    }
    const data = await response.json();

    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('weather').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('windSpeed').textContent = data.wind.speed;

    weatherDetails.style.display = 'block';
  } catch (error) {
    showError(error.message);
  } finally {
    loadingSpinner.style.display = 'none';
  }
}

function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}
