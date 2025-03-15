import { Vibrant, WorkerPipeline } from 'node-vibrant/worker';
import PipelineWorker from 'node-vibrant/worker.worker?worker';

type TaskWorkerClass = new () => Worker & { id: number; idle: boolean };
type Palette = Awaited<ReturnType<Vibrant['getPalette']>>;

Vibrant.use(new WorkerPipeline(PipelineWorker as TaskWorkerClass));

export const getVibrantColor = async (image: HTMLImageElement): Promise<Palette> =>
	Vibrant.from(image).getPalette();
