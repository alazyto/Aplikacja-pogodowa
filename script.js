/*TESTY JEDNOSTKOWE*/
describe("checkWeather function", () => {
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = jest.spyOn(window, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("Wyświetla komunikat o błędzie, gdy zwrócony zostanie status 404", async () => {
    const cityName = "unknown";
    fetchSpy.mockResolvedValueOnce({
      status: 404,
    });

    document.body.innerHTML = `
      <div class="error" style="display: none">
        <p>Niepoprawna nazwa miasta</p>
      </div>
      <div class="weather" style="display: block">
        <img src="images/rain.png" class="weather-icon">
        <h1 class="temp">...°C</h1>
        <h2 class="city">Miasto</h2>
        <div class="details">
          <div class="col">
            <img src="images/humidity.png">
            <div>
              <p class="humidity">...%</p>
              <p>Wilgotność</p>
            </div>
          </div>
          <div class="col">
            <img src="images/wind.png">
            <div>
              <p class="wind">... km/h</p>
              <p>Wiatr</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const searchBox = document.querySelector(".search input");
    searchBox.value = cityName;
    const searchBtn = document.querySelector(".search button");
    searchBtn.click();

    await Promise.resolve();

    expect(fetchSpy).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=52cd0cd995005ee8bdfb10d4893672c3`
    );
    expect(document.querySelector(".error").style.display).toBe("block");
    expect(document.querySelector(".weather").style.display).toBe("none");
  });

  it("Wyświetla dane pogodowe, gdy zwrócony zostanie status inny niż 404", async () => {
    const cityName = "Kraków";
    const mockData = {
      name: cityName,
      main: {
        temp: 10,
        humidity: 70,
      },
      wind: {
        speed: 10,
      },
      weather: [
        {
          main: "Clouds",
        },
      ],
    };
    fetchSpy.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    document.body.innerHTML = `
      <div class="error" style="display: block">
        <p>Niepoprawna nazwa miasta</p>
      </div>
      <div class="weather" style="display: none">
        <img src="images/rain.png" class="weather-icon">
        <h1 class="temp">...°C</h1>
        <h2 class="city">Miasto</h2>
        <div class="details">
          <div class="col">
            <img src="images/humidity.png">
            <div>
              <p class="humidity">...%</p>
              <p>Wilgotność</p>
            </div>
          </div>
          <div class="col">
            <img src="images/wind.png">
            <div>
              <p class="wind">... km/h</p>
              <p>Wiatr</p>
            </div>

/*Za pomocą dowolnego narzędzia zamockuj serwer jsonplaceholder dla testów jednostkowych.*/

const axios = require('axios');
const nock = require('nock');

//zamockuj zapytanie GET do serwera jsonplaceholder
nock('https://jsonplaceholder.typicode.com')
  .get('/todos/1')
  .reply(200, {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  });

//wywołaj zapytanie GET przy użyciu axios
axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });


 // zamockuj zapytanie POST do innego adresu URL
mock.onPost('https://jsonplaceholder.typicode.com', { data: { foo: 'baz' } }).reply(201, { success: true });

// wywołaj zapytanie POST przy użyciu biblioteki axios
axios.post('https://jsonplaceholder.typicode.com', { data: { foo: 'baz' } })
  .then(response => {
    console.log(response.data); // { success: true }
  })
  .catch(error => {
    console.error(error);
  });



  /*TESTY INTEGRACYJNE*/

  describe('checkWeather', () => {
  it('powinno wyświetlić dane pogodowe dla poprawnej nazwy miasta', async () => {
    // arrange
    document.body.innerHTML = `
      <div class="city"></div>
      <div class="temp"></div>
      <div class="humidity"></div>
      <div class="wind"></div>
      <img class="weather-icon">
      <div class="error"></div>
    `;
    const city = 'Warsaw';

    // act
    await checkWeather(city);

    // assert
    expect(document.querySelector('.city').textContent).toContain('Warsaw');
    expect(document.querySelector('.temp').textContent).toMatch(/-?\d+°C/);
    expect(document.querySelector('.humidity').textContent).toMatch(/\d+%$/);
    expect(document.querySelector('.wind').textContent).toMatch(/\d+(\.\d+)? km\/h/);
    expect(document.querySelector('.error').style.display).toBe('none');
  });

  it('powinien wyświetlić komunikat o błędzie dla nieprawidłowej nazwy miasta', async () => {
    // arrange
    document.body.innerHTML = `
      <div class="city"></div>
      <div class="temp"></div>
      <div class="humidity"></div>
      <div class="wind"></div>
      <img class="weather-icon">
      <div class="error" style="display: none;"></div>
    `;
    const city = 'InvalidCityName';

    // act
    await checkWeather(city);

    // assert
    expect(document.querySelector('.city').textContent).toBe('Miasto');
    expect(document.querySelector('.temp').textContent).toBe('...°C');
    expect(document.querySelector('.humidity').textContent).toBe('...%');
    expect(document.querySelector('.wind').textContent).toBe('... km/h');
    expect(document.querySelector('.error').style.display).toBe('block');
  });
});


// zdarzenie click
describe('Zdarzenie kliknięcia na przycisk szukania', () => {
  beforeEach(() => {
    // Render the HTML code in a test environment
    document.body.innerHTML = `
      <div class="card">
        <div class="search">
          <input type="text" placeholder="Wprowadź nazwę miasta"
          spellcheck="false">
          <button><img src="images/search.png"></button>
        </div>
        <div class="error">
          <p>Niepoprawna nazwa miasta</p>
        </div>
        <div class="weather">
          <img src="images/rain.png" class="weather-icon">
          <h1 class="temp">...°C</h1>
          <h2 class="city">Miasto</h2>
          <div class="details">
            <div class="col">
              <img src="images/humidity.png">
              <div>
                <p class="humidity">...%</p>
                <p>Wilgotność</p>
              </div>
            </div>
            <div class="col">
              <img src="images/wind.png">
              <div>
                <p class="wind">... km/h</p>
                <p>Wiatr</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;


// Ładuj skrypt obsługujący zdarzenie kliknięcia
const script = document.createElement('script');
script.src = 'app.js';
document.head.appendChild(script);

test('Powinno wywołać funkcję checkWeather po kliknięciu', () => {
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const checkWeather = jest.fn();

// Zastąp oryginalną funkcję funkcją-mockiem
window.checkWeather = checkWeather;

// Symuluj zdarzenie kliknięcia na przycisk szukania
searchBtn.dispatchEvent(new Event('click'));

expect(checkWeather).toHaveBeenCalledWith(searchBox.value);
});

test('To zdarzenie dotyczy wyświetlania komunikatu o błędzie, gdy API zwraca kod 404', async () => {
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const errorDiv = document.querySelector('.error');
const weatherDiv = document.querySelector('.weather');

// Udawaj odpowiedź API, aby zwrócić kod 404
jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
Promise.resolve({
status: 404,
json: () => Promise.resolve({})
})
);

// Symuluj zdarzenie kliknięcia na przycisk szukania
searchBtn.dispatchEvent(new Event('click'));

// Oczekuj na zakończenie funkcji asynchronicznej
await Promise.resolve();

expect(errorDiv.style.display).toBe('block');
expect(weatherDiv.style.display).toBe('none');
});

test('Powinna wyświetlać informacje o pogodzie, gdy API zwraca poprawne dane', async () => {
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const errorDiv = document.querySelector('.error');
const weatherDiv = document.querySelector('.weather');

// Udawaj odpowiedź API, aby zwrócić poprawne dane
jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
Promise.resolve({
status: 200,
json: () =>
Promise.resolve({
name: 'Warszawa',
main: {
temp: 10,
humidity: 50
},
wind: {
speed: 20
},
weather: [
{
main: 'Rain',
icon: '10n'
}
]
})
})
);

// Symuluj zdarzenie kliknięcia na przycisk szukania
searchBtn.dispatchEvent(new Event('click'));

// Oczekuj na zakończenie funkcji asynchronicznej
await Promise.resolve();

expect(errorDiv.style.display).toBe('none');
expect(weatherDiv.style.display).toBe('block');
});