// tamagui.config.ts
import { config } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

// Esto es necesario para que TypeScript reconozca los tipos de Tamagui
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;