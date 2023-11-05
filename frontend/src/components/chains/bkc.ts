import { Chain } from 'wagmi'
 
export const bkc: Chain = {
  id: 96,
  name: 'Bitkub Chain',
  network: 'Bitkub Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'KUB',
    symbol: 'KUB',
  },
  rpcUrls: {
    public: { http: ['https://rpc.bitkubchain.io'] },
    default: { http: ['https://rpc.bitkubchain.io'] },
  },
  blockExplorers: {
    default: { name: 'Bkcscan', url: 'https://www.bkcscan.com/' },
  },
}