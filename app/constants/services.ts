const url = (template: TemplateStringsArray, ...parts: unknown[]) =>
	String.raw(template, ...parts.map(part => encodeURIComponent(String(part))));

export const WEATHER_SERVER = (location: string, apiToken: string) =>
	url`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiToken}`;
