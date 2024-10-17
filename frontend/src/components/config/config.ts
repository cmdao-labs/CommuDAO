import { http, createConfig } from '@wagmi/core'
import { optimism, bsc, jbc } from '@wagmi/core/chains'
import { bkc } from '../chains/bkc.ts'
import { bbqchain } from '../chains/bbqchain.ts'
import { createClient } from 'viem'

export const config = createConfig({
    chains: [jbc, bkc, optimism, bsc, bbqchain],
    /*transports: {
        [bbqchain.id]: http('https://bbqchain-rpc.commudao.xyz'),
        [bkc.id]: http('https://rpc.bitkubchain.io'),
    },*/
    client({ chain }) {
        return createClient({ chain, transport: http() })
    },
})