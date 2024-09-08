const WeatherIcon = {
	1: "weather-sunny",
	2: "weather-partly-cloudy",
	3: "weather-cloudy",
	4: "weather-cloudy",
	9: "weather-pouring",
	10: "weather-rainy",
	11: "weather-lightning-rainy",
	13: "weather-snowy",
	50: "weather-fog"
};

const WeatherIconFull = {
	// Group 2xx: Thunderstorm
	200: 'weather-lightning',			// thunderstorm with light rain
	201: 'weather-lightning-rainy',		// thunderstorm with rain
	202: 'weather-lightning-rainy',		// thunderstorm with rain
	210: 'weather-partly-lightning',	// light thunderstorm
	211: 'weather-lightning',			// thunderstorm
	212: 'weather-lightning',			// heavy thunderstorm
	221: 'weather-lightning',			// ragged thunderstorm
	230: 'weather-lightning',			// thunderstorm with light drizzle
	231: 'weather-lightning-rainy',		// thunderstorm with drizzle
	232: 'weather-lightning-rainy',		// thunderstorm with heavy drizzle
	
	// Group 3xx: Drizzle
	300: 'weather-partly-rainy',		// light intensity drizzle
	301: 'weather-rainy',				// drizzle
	302: 'weather-rainy',				// heavy intensity drizzle
	310: 'weather-rainy',				// light intensity drizzle rain
	311: 'weather-rainy',				// drizzle rain
	312: 'weather-pouring',				// heavy intensity drizzle rain
	313: 'weather-pouring',				// shower rain and drizzle
	314: 'weather-pouring',				// heavy shower rain and drizzle
	321: 'weather-pouring',				// shower drizzle
	
	// Group 5xx: Rain
	500: 'weather-partly-rainy',		// light rain
	501: 'weather-rainy',				// moderate rain
	502: 'weather-pouring',				// heavy intensity rain
	503: 'weather-pouring',				// very heavy rain
	504: 'weather-pouring',				// extreme rain
	511: 'weather-snowy-rainy',			// freezing rain
	520: 'weather-rainy',				// light intensity shower rain
	521: 'weather-pouring',				// shower rain
	522: 'weather-pouring',				// heavy intensity shower rain
	531: 'weather-pouring',				// ragged shower rain
	
	// Group 6xx: Snow
	600: 'weather-partly-snowy',		// light snow
	601: 'weather-snowy',				// snow
	602: 'weather-snowy-heavy',			// heavy snow
	611: 'weather-snowy',				// sleet
	612: 'weather-snowy',				// light shower sleet
	613: 'weather-snowy-heavy',			// shower sleet
	615: 'weather-snowy-rainy',			// light rain and snow
	616: 'weather-snowy-rainy',			// rain and snow
	620: 'weather-snowy',				// light shower snow
	621: 'weather-snowy-heavy',			// shower snow
	622: 'weather-snowy-heavy',			// heavy shower snow
	
	// Group 7xx: Atmosphere
	701: 'weather-hazy',				// mist
	711: 'weather-hazy',				// smoke
	721: 'weather-hazy',				// haze
	731: 'weather-fog',					// sand / dust whirls
	741: 'weather-fog',					// fog
	751: 'weather-fog',					// sand
	761: 'weather-fog',					// dust
	762: 'weather-fog',					// volcanic ash
	771: 'weather-windy-variant',		// squalls
	781: 'weather-tornado',				// tornado
	
	// Group 800: Clear
	800: 'weather-sunny',				// clear sky
	
	// Group 80x: Clouds
	801: 'weather-partly-cloudy',		// few clouds: 11-25%
	802: 'weather-partly-cloudy',		// scattered clouds: 25-50%
	803: 'weather-cloudy',				// broken clouds: 51-84%
	804: 'weather-cloudy'				// overcast clouds: 85-100%
}

export const getWeatherIcon = (icon: number, condition: number): string => {
	if(WeatherIconFull.hasOwnProperty(condition))
		return WeatherIconFull[condition];
	
	if(WeatherIcon.hasOwnProperty(icon))
		return WeatherIcon[icon];
	
	return '';
}
