import time

from selenium import webdriver
from selenium.webdriver.common.by import By

# Inicjalizacja przeglądarki
driver = webdriver.Chrome()

# Test wyszukiwania poprawnej nazwy miasta
def test_search_valid_city():
    driver.get("https://alazyto.github.io/Aplikacja-pogodowa/")
    search_box = driver.find_element(By.CSS_SELECTOR, ".search input")
    search_box.send_keys("Warszawa")
    search_btn = driver.find_element(By.CSS_SELECTOR, ".search button")
    search_btn.click()
    time.sleep(2)
    weather_displayed = driver.find_element(By.CSS_SELECTOR, ".weather").is_displayed()
    assert weather_displayed, "Nie wyświetla się informacja o pogodzie dla poprawnego miasta"

# Test wyszukiwania niepoprawnej nazwy miasta
def test_search_invalid_city():
    driver.get("https://alazyto.github.io/Aplikacja-pogodowa/")
    search_box = driver.find_element(By.CSS_SELECTOR, ".search input")
    search_box.send_keys("NieistniejąceMiasto")
    search_btn = driver.find_element(By.CSS_SELECTOR, ".search button")
    search_btn.click()
    time.sleep(2)
    error_displayed = driver.find_element(By.CSS_SELECTOR, ".error").is_displayed()
    assert error_displayed, "Nie wyświetla się komunikat o niepoprawnej nazwie miasta"

# Test wyświetlania ikony pogody dla różnych warunków atmosferycznych
def test_weather_icons():
    driver.get("https://alazyto.github.io/Aplikacja-pogodowa/")
    search_box = driver.find_element(By.CSS_SELECTOR, ".search input")
    search_box.send_keys("Warszawa")
    search_btn = driver.find_element(By.CSS_SELECTOR, ".search button")
    search_btn.click()
    time.sleep(2)
    weather_icon = driver.find_element(By.CSS_SELECTOR, ".weather-icon")
    weather_icon_src = weather_icon.get_attribute("src")

    assert "clouds.png" in weather_icon_src, "Nie wyświetla się ikona dla chmur"

# Powtórz powyższe kroki dla innych warunków atmosferycznych (clear.png, rain.png, drizzle.png, mist.png)

# Uruchomienie testów
test_search_valid_city()
test_search_invalid_city()
test_weather_icons()

# Zamknięcie przeglądarki
driver.quit()
