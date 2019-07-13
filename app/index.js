const WEATHER_SERVER = "https://wxdata.weather.com/wxdata/weather/local/#LocationCode#?cc=*&unit=m&dayf=1";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.method === 'weather') {
		fetch(WEATHER_SERVER.replace('#LocationCode#', request.locationCode))
			.then(response => response.text())
			.then(text => sendResponse(text))
			.catch(error => sendResponse(''));

		return true;
	}
});
