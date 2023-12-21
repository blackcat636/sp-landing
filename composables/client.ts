import { createPublicClient, http,createWalletClient, custom  } from 'viem'
import {bsc,bscTestnet } from 'viem/chains'

export const publicClient = createPublicClient({
    chain: bsc,
    transport: http()
})
// export const walletClient = createWalletClient({
//     chain: bscTestnet,
//     transport: custom(window.ethereum)
// })
