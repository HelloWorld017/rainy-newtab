import {
	CloudIcon,
	CloudDrizzleIcon,
	CloudFogIcon,
	CloudHailIcon,
	CloudLightningIcon,
	CloudRainIcon,
	CloudRainWindIcon,
	CloudSnowIcon,
	CloudSunIcon,
	CloudSunRainIcon,
	CloudyIcon,
	DropletIcon,
	DropletsIcon,
	HazeIcon,
	SnowflakeIcon,
	SunIcon,
	TornadoIcon,
} from 'lucide-vue-next';

const WeatherIcon = {
	1: SunIcon,
	2: CloudSunIcon,
	3: CloudIcon,
	4: CloudyIcon,
	9: CloudRainIcon,
	10: CloudDrizzleIcon,
	11: CloudLightningIcon,
	13: CloudSnowIcon,
	50: CloudFogIcon,
};

const WeatherIconFull = {
	// Group 2xx: Thunderstorm
	200: CloudLightningIcon, // thunderstorm with light rain
	201: CloudLightningIcon, // thunderstorm with rain
	202: CloudLightningIcon, // thunderstorm with rain
	210: CloudLightningIcon, // light thunderstorm
	211: CloudLightningIcon, // thunderstorm
	212: CloudLightningIcon, // heavy thunderstorm
	221: CloudLightningIcon, // ragged thunderstorm
	230: CloudLightningIcon, // thunderstorm with light drizzle
	231: CloudLightningIcon, // thunderstorm with drizzle
	232: CloudLightningIcon, // thunderstorm with heavy drizzle

	// Group 3xx: Drizzle
	300: CloudSunRainIcon, // light intensity drizzle
	301: DropletIcon, // drizzle
	302: CloudDrizzleIcon, // heavy intensity drizzle
	310: DropletsIcon, // light intensity drizzle rain
	311: CloudDrizzleIcon, // drizzle rain
	312: CloudDrizzleIcon, // heavy intensity drizzle rain
	313: CloudRainIcon, // shower rain and drizzle
	314: CloudRainIcon, // heavy shower rain and drizzle
	321: CloudRainWindIcon, // shower drizzle

	// Group 5xx: Rain
	500: DropletsIcon, // light rain
	501: CloudDrizzleIcon, // moderate rain
	502: CloudRainIcon, // heavy intensity rain
	503: CloudRainWindIcon, // very heavy rain
	504: CloudRainWindIcon, // extreme rain
	511: CloudHailIcon, // freezing rain
	520: CloudDrizzleIcon, // light intensity shower rain
	521: CloudRainIcon, // shower rain
	522: CloudRainWindIcon, // heavy intensity shower rain
	531: CloudRainWindIcon, // ragged shower rain

	// Group 6xx: Snow
	600: SnowflakeIcon, // light snow
	601: SnowflakeIcon, // snow
	602: CloudSnowIcon, // heavy snow
	611: CloudSnowIcon, // sleet
	612: CloudSnowIcon, // light shower sleet
	613: CloudHailIcon, // shower sleet
	615: CloudHailIcon, // light rain and snow
	616: CloudHailIcon, // rain and snow
	620: CloudHailIcon, // light shower snow
	621: CloudHailIcon, // shower snow
	622: CloudHailIcon, // heavy shower snow

	// Group 7xx: Atmosphere
	701: HazeIcon, // mist
	711: HazeIcon, // smoke
	721: HazeIcon, // haze
	731: CloudFogIcon, // sand / dust whirls
	741: CloudFogIcon, // fog
	751: CloudFogIcon, // sand
	761: CloudFogIcon, // dust
	762: CloudFogIcon, // volcanic ash
	771: CloudRainWindIcon, // squalls
	781: TornadoIcon, // tornado

	// Group 800: Clear
	800: SunIcon, // clear sky

	// Group 80x: Clouds
	801: SunIcon, // few clouds: 11-25%
	802: CloudSunIcon, // scattered clouds: 25-50%
	803: CloudIcon, // broken clouds: 51-84%
	804: CloudyIcon, // overcast clouds: 85-100%
};

export const getWeatherIcon = (weatherIcon?: string, weatherId?: number) => {
	if (weatherId && Object.hasOwn(WeatherIconFull, weatherId)) {
		return WeatherIconFull[weatherId as keyof typeof WeatherIconFull];
	}

	const weatherIconNumber = weatherIcon && parseInt(weatherIcon);
	if (weatherIconNumber && Object.hasOwn(WeatherIcon, weatherIconNumber)) {
		return WeatherIcon[weatherIconNumber as keyof typeof WeatherIcon];
	}

	return null;
};
