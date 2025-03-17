import { reactive } from 'vue';
import { config } from '@/utils/config';

export const useConfig = () => reactive(config);
