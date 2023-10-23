import { Chain } from 'wagmi'
 
export const jbcL1: Chain = {
  id: 8899,
  name: 'JBC L1',
  network: 'JBC L1',
  nativeCurrency: {
    decimals: 18,
    name: 'JBC',
    symbol: 'JBC',
  },
  rpcUrls: {
    public: { http: ['https://rpc-l1.jibchain.net/'] },
    default: { http: ['https://rpc-l1.jibchain.net/'] },
  },
  blockExplorers: {
    default: { name: 'JbcScan', url: 'https://exp-l1.jibchain.net/' },
  },
}