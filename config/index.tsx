import { cookieStorage, createStorage } from 'wagmi'
import {
  getDefaultConfig,
  Chain,
} from '@rainbow-me/rainbowkit';
import {
  
  modeTestnet,
  mode
} from 'wagmi/chains';

export const projectId = process.env.PROJECT_ID || "f9d2f3eb2aa26539c7669a2236db120a";

// Local avax custom chain


// Create wagmiConfig
export const config = getDefaultConfig({
  appName: "App",
  chains: [ mode,modeTestnet],
  ssr: true,
  projectId,
  storage: createStorage({
    storage: cookieStorage
  })
})