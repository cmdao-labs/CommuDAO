import { Chain } from 'wagmi'
 
export const bbqchain: Chain = {
  id: 190,
  name: 'CMDAO BBQ Chain',
  network: 'CMDAO BBQ Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'CMD',
    symbol: 'CMD',
  },
  rpcUrls: {
    public: { http: ['https://bbqchain-rpc.commudao.xyz'] },
    default: { http: ['https://bbqchain-rpc.commudao.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Bqqscan', url: 'https://bbqchain-exp.commudao.xyz' },
  },
}