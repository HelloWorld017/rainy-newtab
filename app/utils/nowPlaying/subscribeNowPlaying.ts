import { ZNowPlayingUpdate } from '@/schemas/NowPlaying';
import type { NowPlaying } from '@/schemas/NowPlaying';

export const subscribeNowPlaying = (onUpdate: (data: NowPlaying) => void) => {
	const onMessage = ({ data }: { data: unknown }) => {
		const parsed = ZNowPlayingUpdate.safeParse(data);
		if (parsed.success) {
			onUpdate(parsed.data.player);
		}
	};

	window.addEventListener('message', onMessage);
	window.postMessage({ type: 'wnp-info', subscribe: true }, '*');

	return () => {
		window.removeEventListener('message', onMessage);
		window.postMessage({ type: 'wnp-info', subscribe: false }, '*');
	};
};
