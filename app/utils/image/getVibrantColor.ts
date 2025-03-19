import { Vibrant, WorkerPipeline } from 'node-vibrant/worker';
import PipelineWorker from 'node-vibrant/worker.worker?worker';

type TaskWorkerClass = new () => Worker & { id: number; idle: boolean };

Vibrant.use(new WorkerPipeline(PipelineWorker as TaskWorkerClass));

export type VibrantColorPalette = Awaited<ReturnType<Vibrant['getPalette']>>;
export const getVibrantColor = async (image: HTMLImageElement): Promise<VibrantColorPalette> =>
	Vibrant.from(image).getPalette();
