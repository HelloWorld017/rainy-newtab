type NowPlaying = {
	artist: string;
	album: string;
	cover: string;
	duration: number;
	position: number;
	title: string;
};

type NowPlayingUpdate = {
	type: 'wnp-info',
	player: NowPlaying;
};

const isNowPlayingUpdate = (data: unknown): data is NowPlayingUpdate =>
	!!data &&
	typeof data === 'object' &&
	'type' in data &&
	data.type === 'wnp-info' &&
	'player' in data &&
	!!data.player;

export const subscribeNowPlaying = (onUpdate: (data: NowPlaying) => void) => {
	const onMessage = ({ data }: { data: unknown }) => {
		if (!isNowPlayingUpdate(data)) {
			return;
		}

		onUpdate(data.player);
	};

	window.addEventListener('message', onMessage);
	window.postMessage({ type: 'wnp-info', subscribe: true }, '*');

	return () => {
		window.removeEventListener('message', onMessage);
		window.postMessage({ type: 'wnp-info', subscribe: false }, '*');
	};
};
