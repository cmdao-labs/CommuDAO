import React from 'react'
import { ethers } from 'ethers'
import { fetchBalance, readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract, sendTransaction } from '@wagmi/core'
import { useAccount } from 'wagmi'
const { ethereum } = window

const bbqToken = '0x87dfDc26ff6e8986e2F773FAE3Bfa51C8f152cF0'
const bbqLab = '0x2D2901B3c1A9770008AA38A095f71FB4e136c0f3'

const cmdaoNft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const houseStaking = '0xc4dB6374EeCa3743F8044ae995892827B62b14fe'
const transporthub = '0xC673f53b490199AF4BfE17F2d77eBc72Bde3b964'
const sourcethub = '0xf623B7164cb81DCfC3836492fb09Ae005be57322'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const BBQLabs = ({ setisLoading, txupdate, setTxupdate, bbqLab01ABI, erc20ABI, transportHubABI, houseStakingABI, slot1ABI, erc721ABI, sourceThubABI }) => {
    const { address } = useAccount()

    const [bbqBalance, setBbqBalance] = React.useState(0)

    const [levelCraftBBQ, setLevelCraftBBQ] = React.useState(0)
    const [isCraftBBQ, setIsCraftBBQ] = React.useState(null)
    const [timetoClaimBBQ, setTimeToClaimBBQ] = React.useState(0)
    const [canCraftBBQ, setCanCraftBBQ] = React.useState(false)

    const [houseSelected, setHouseSelected] = React.useState('')
    const [transportValue, setTransportValue] = React.useState('')

    const [allPowZ02, setAllPowZ02] = React.useState(0)
    const [thubLvZ02, setThubLvZ02] = React.useState(0)
    const [nextDayThubZ02, setNextDayThubZ02] = React.useState(0)
    const [thubCapZ02, setThubCapZ02] = React.useState(0)
    const [thubFeeZ02, setThubFeeZ02] = React.useState(0)

    const [allPowA01, setAllPowA01] = React.useState(0)
    const [thubLvA01, setThubLvA01] = React.useState(0)
    const [nextDayThubA01, setNextDayThubA01] = React.useState(0)
    const [thubCapA01, setThubCapA01] = React.useState(0)
    const [thubFeeA01, setThubFeeA01] = React.useState(0)

    const [allPowA02, setAllPowA02] = React.useState(0)
    const [thubLvA02, setThubLvA02] = React.useState(0)
    const [nextDayThubA02, setNextDayThubA02] = React.useState(0)
    const [thubCapA02, setThubCapA02] = React.useState(0)
    const [thubFeeA02, setThubFeeA02] = React.useState(0)

    const [allPowA03, setAllPowA03] = React.useState(0)
    const [thubLvA03, setThubLvA03] = React.useState(0)
    const [nextDayThubA03, setNextDayThubA03] = React.useState(0)
    const [thubCapA03, setThubCapA03] = React.useState(0)
    const [thubFeeA03, setThubFeeA03] = React.useState(0)

    const [allPowA04, setAllPowA04] = React.useState(0)
    const [thubLvA04, setThubLvA04] = React.useState(0)
    const [nextDayThubA04, setNextDayThubA04] = React.useState(0)
    const [thubCapA04, setThubCapA04] = React.useState(0)
    const [thubFeeA04, setThubFeeA04] = React.useState(0)

    const [allPowA05, setAllPowA05] = React.useState(0)
    const [thubLvA05, setThubLvA05] = React.useState(0)
    const [nextDayThubA05, setNextDayThubA05] = React.useState(0)
    const [thubCapA05, setThubCapA05] = React.useState(0)
    const [thubFeeA05, setThubFeeA05] = React.useState(0)

    const [allPowA06, setAllPowA06] = React.useState(0)
    const [thubLvA06, setThubLvA06] = React.useState(0)
    const [nextDayThubA06, setNextDayThubA06] = React.useState(0)
    const [thubCapA06, setThubCapA06] = React.useState(0)
    const [thubFeeA06, setThubFeeA06] = React.useState(0)

    const [allPowA07, setAllPowA07] = React.useState(0)
    const [thubLvA07, setThubLvA07] = React.useState(0)
    const [nextDayThubA07, setNextDayThubA07] = React.useState(0)
    const [thubCapA07, setThubCapA07] = React.useState(0)
    const [thubFeeA07, setThubFeeA07] = React.useState(0)

    const [allPowA08, setAllPowA08] = React.useState(0)
    const [thubLvA08, setThubLvA08] = React.useState(0)
    const [nextDayThubA08, setNextDayThubA08] = React.useState(0)
    const [thubCapA08, setThubCapA08] = React.useState(0)
    const [thubFeeA08, setThubFeeA08] = React.useState(0)

    const [allPowA09, setAllPowA09] = React.useState(0)
    const [thubLvA09, setThubLvA09] = React.useState(0)
    const [nextDayThubA09, setNextDayThubA09] = React.useState(0)
    const [thubCapA09, setThubCapA09] = React.useState(0)
    const [thubFeeA09, setThubFeeA09] = React.useState(0)

    const [allPowA10, setAllPowA10] = React.useState(0)
    const [thubLvA10, setThubLvA10] = React.useState(0)
    const [nextDayThubA10, setNextDayThubA10] = React.useState(0)
    const [thubCapA10, setThubCapA10] = React.useState(0)
    const [thubFeeA10, setThubFeeA10] = React.useState(0)

    const [allPowA11, setAllPowA11] = React.useState(0)
    const [thubLvA11, setThubLvA11] = React.useState(0)
    const [nextDayThubA11, setNextDayThubA11] = React.useState(0)
    const [thubCapA11, setThubCapA11] = React.useState(0)
    const [thubFeeA11, setThubFeeA11] = React.useState(0)

    const [allPowZ06, setAllPowZ06] = React.useState(0)
    const [thubLvZ06, setThubLvZ06] = React.useState(0)
    const [nextDayThubZ06, setNextDayThubZ06] = React.useState(0)
    const [thubCapZ06, setThubCapZ06] = React.useState(0)
    const [thubFeeZ06, setThubFeeZ06] = React.useState(0)

    const [allPowZ10, setAllPowZ10] = React.useState(0)
    const [thubLvZ10, setThubLvZ10] = React.useState(0)
    const [nextDayThubZ10, setNextDayThubZ10] = React.useState(0)
    const [thubCapZ10, setThubCapZ10] = React.useState(0)
    const [thubFeeZ10, setThubFeeZ10] = React.useState(0)

    const [allPowB01, setAllPowB01] = React.useState(0)
    const [thubLvB01, setThubLvB01] = React.useState(0)
    const [nextDayThubB01, setNextDayThubB01] = React.useState(0)
    const [thubCapB01, setThubCapB01] = React.useState(0)
    const [thubFeeB01, setThubFeeB01] = React.useState(0)

    const [allPowB02, setAllPowB02] = React.useState(0)
    const [thubLvB02, setThubLvB02] = React.useState(0)
    const [nextDayThubB02, setNextDayThubB02] = React.useState(0)
    const [thubCapB02, setThubCapB02] = React.useState(0)
    const [thubFeeB02, setThubFeeB02] = React.useState(0)

    const [allPowB03, setAllPowB03] = React.useState(0)
    const [thubLvB03, setThubLvB03] = React.useState(0)
    const [nextDayThubB03, setNextDayThubB03] = React.useState(0)
    const [thubCapB03, setThubCapB03] = React.useState(0)
    const [thubFeeB03, setThubFeeB03] = React.useState(0)

    const [allPowB04, setAllPowB04] = React.useState(0)
    const [thubLvB04, setThubLvB04] = React.useState(0)
    const [nextDayThubB04, setNextDayThubB04] = React.useState(0)
    const [thubCapB04, setThubCapB04] = React.useState(0)
    const [thubFeeB04, setThubFeeB04] = React.useState(0)

    const [allPowB05, setAllPowB05] = React.useState(0)
    const [thubLvB05, setThubLvB05] = React.useState(0)
    const [nextDayThubB05, setNextDayThubB05] = React.useState(0)
    const [thubCapB05, setThubCapB05] = React.useState(0)
    const [thubFeeB05, setThubFeeB05] = React.useState(0)

    const [allPowB06, setAllPowB06] = React.useState(0)
    const [thubLvB06, setThubLvB06] = React.useState(0)
    const [nextDayThubB06, setNextDayThubB06] = React.useState(0)
    const [thubCapB06, setThubCapB06] = React.useState(0)
    const [thubFeeB06, setThubFeeB06] = React.useState(0)

    const [allPowB07, setAllPowB07] = React.useState(0)
    const [thubLvB07, setThubLvB07] = React.useState(0)
    const [nextDayThubB07, setNextDayThubB07] = React.useState(0)
    const [thubCapB07, setThubCapB07] = React.useState(0)
    const [thubFeeB07, setThubFeeB07] = React.useState(0)

    const [allPowB08, setAllPowB08] = React.useState(0)
    const [thubLvB08, setThubLvB08] = React.useState(0)
    const [nextDayThubB08, setNextDayThubB08] = React.useState(0)
    const [thubCapB08, setThubCapB08] = React.useState(0)
    const [thubFeeB08, setThubFeeB08] = React.useState(0)

    const [allPowB09, setAllPowB09] = React.useState(0)
    const [thubLvB09, setThubLvB09] = React.useState(0)
    const [nextDayThubB09, setNextDayThubB09] = React.useState(0)
    const [thubCapB09, setThubCapB09] = React.useState(0)
    const [thubFeeB09, setThubFeeB09] = React.useState(0)

    const [allPowB10, setAllPowB10] = React.useState(0)
    const [thubLvB10, setThubLvB10] = React.useState(0)
    const [nextDayThubB10, setNextDayThubB10] = React.useState(0)
    const [thubCapB10, setThubCapB10] = React.useState(0)
    const [thubFeeB10, setThubFeeB10] = React.useState(0)

    const [allPowB11, setAllPowB11] = React.useState(0)
    const [thubLvB11, setThubLvB11] = React.useState(0)
    const [nextDayThubB11, setNextDayThubB11] = React.useState(0)
    const [thubCapB11, setThubCapB11] = React.useState(0)
    const [thubFeeB11, setThubFeeB11] = React.useState(0)

    const [allPowZ11, setAllPowZ11] = React.useState(0)
    const [thubLvZ11, setThubLvZ11] = React.useState(0)
    const [nextDayThubZ11, setNextDayThubZ11] = React.useState(0)
    const [thubCapZ11, setThubCapZ11] = React.useState(0)
    const [thubFeeZ11, setThubFeeZ11] = React.useState(0)

    const [allPowC01, setAllPowC01] = React.useState(0)
    const [thubLvC01, setThubLvC01] = React.useState(0)
    const [nextDayThubC01, setNextDayThubC01] = React.useState(0)
    const [thubCapC01, setThubCapC01] = React.useState(0)
    const [thubFeeC01, setThubFeeC01] = React.useState(0)

    const [allPowC02, setAllPowC02] = React.useState(0)
    const [thubLvC02, setThubLvC02] = React.useState(0)
    const [nextDayThubC02, setNextDayThubC02] = React.useState(0)
    const [thubCapC02, setThubCapC02] = React.useState(0)
    const [thubFeeC02, setThubFeeC02] = React.useState(0)

    const [allPowC03, setAllPowC03] = React.useState(0)
    const [thubLvC03, setThubLvC03] = React.useState(0)
    const [nextDayThubC03, setNextDayThubC03] = React.useState(0)
    const [thubCapC03, setThubCapC03] = React.useState(0)
    const [thubFeeC03, setThubFeeC03] = React.useState(0)

    const [allPowC04, setAllPowC04] = React.useState(0)
    const [thubLvC04, setThubLvC04] = React.useState(0)
    const [nextDayThubC04, setNextDayThubC04] = React.useState(0)
    const [thubCapC04, setThubCapC04] = React.useState(0)
    const [thubFeeC04, setThubFeeC04] = React.useState(0)

    const [allPowC05, setAllPowC05] = React.useState(0)
    const [thubLvC05, setThubLvC05] = React.useState(0)
    const [nextDayThubC05, setNextDayThubC05] = React.useState(0)
    const [thubCapC05, setThubCapC05] = React.useState(0)
    const [thubFeeC05, setThubFeeC05] = React.useState(0)

    const [allPowC06, setAllPowC06] = React.useState(0)
    const [thubLvC06, setThubLvC06] = React.useState(0)
    const [nextDayThubC06, setNextDayThubC06] = React.useState(0)
    const [thubCapC06, setThubCapC06] = React.useState(0)
    const [thubFeeC06, setThubFeeC06] = React.useState(0)

    const [allPowC07, setAllPowC07] = React.useState(0)
    const [thubLvC07, setThubLvC07] = React.useState(0)
    const [nextDayThubC07, setNextDayThubC07] = React.useState(0)
    const [thubCapC07, setThubCapC07] = React.useState(0)
    const [thubFeeC07, setThubFeeC07] = React.useState(0)

    const [allPowC08, setAllPowC08] = React.useState(0)
    const [thubLvC08, setThubLvC08] = React.useState(0)
    const [nextDayThubC08, setNextDayThubC08] = React.useState(0)
    const [thubCapC08, setThubCapC08] = React.useState(0)
    const [thubFeeC08, setThubFeeC08] = React.useState(0)

    const [allPowC09, setAllPowC09] = React.useState(0)
    const [thubLvC09, setThubLvC09] = React.useState(0)
    const [nextDayThubC09, setNextDayThubC09] = React.useState(0)
    const [thubCapC09, setThubCapC09] = React.useState(0)
    const [thubFeeC09, setThubFeeC09] = React.useState(0)

    const [allPowC10, setAllPowC10] = React.useState(0)
    const [thubLvC10, setThubLvC10] = React.useState(0)
    const [nextDayThubC10, setNextDayThubC10] = React.useState(0)
    const [thubCapC10, setThubCapC10] = React.useState(0)
    const [thubFeeC10, setThubFeeC10] = React.useState(0)

    const [allPowC11, setAllPowC11] = React.useState(0)
    const [thubLvC11, setThubLvC11] = React.useState(0)
    const [nextDayThubC11, setNextDayThubC11] = React.useState(0)
    const [thubCapC11, setThubCapC11] = React.useState(0)
    const [thubFeeC11, setThubFeeC11] = React.useState(0)

    const [allPowC12, setAllPowC12] = React.useState(0)
    const [thubLvC12, setThubLvC12] = React.useState(0)
    const [nextDayThubC12, setNextDayThubC12] = React.useState(0)
    const [thubCapC12, setThubCapC12] = React.useState(0)
    const [thubFeeC12, setThubFeeC12] = React.useState(0)

    const [allPowC13, setAllPowC13] = React.useState(0)
    const [thubLvC13, setThubLvC13] = React.useState(0)
    const [nextDayThubC13, setNextDayThubC13] = React.useState(0)
    const [thubCapC13, setThubCapC13] = React.useState(0)
    const [thubFeeC13, setThubFeeC13] = React.useState(0)

    const [allPowC14, setAllPowC14] = React.useState(0)
    const [thubLvC14, setThubLvC14] = React.useState(0)
    const [nextDayThubC14, setNextDayThubC14] = React.useState(0)
    const [thubCapC14, setThubCapC14] = React.useState(0)
    const [thubFeeC14, setThubFeeC14] = React.useState(0)

    const [allPowC15, setAllPowC15] = React.useState(0)
    const [thubLvC15, setThubLvC15] = React.useState(0)
    const [nextDayThubC15, setNextDayThubC15] = React.useState(0)
    const [thubCapC15, setThubCapC15] = React.useState(0)
    const [thubFeeC15, setThubFeeC15] = React.useState(0)

    const [allPowC16, setAllPowC16] = React.useState(0)
    const [thubLvC16, setThubLvC16] = React.useState(0)
    const [nextDayThubC16, setNextDayThubC16] = React.useState(0)
    const [thubCapC16, setThubCapC16] = React.useState(0)
    const [thubFeeC16, setThubFeeC16] = React.useState(0)

    const [allPowC17, setAllPowC17] = React.useState(0)
    const [thubLvC17, setThubLvC17] = React.useState(0)
    const [nextDayThubC17, setNextDayThubC17] = React.useState(0)
    const [thubCapC17, setThubCapC17] = React.useState(0)
    const [thubFeeC17, setThubFeeC17] = React.useState(0)

    const [allPowC18, setAllPowC18] = React.useState(0)
    const [thubLvC18, setThubLvC18] = React.useState(0)
    const [nextDayThubC18, setNextDayThubC18] = React.useState(0)
    const [thubCapC18, setThubCapC18] = React.useState(0)
    const [thubFeeC18, setThubFeeC18] = React.useState(0)

    const [allPowC19, setAllPowC19] = React.useState(0)
    const [thubLvC19, setThubLvC19] = React.useState(0)
    const [nextDayThubC19, setNextDayThubC19] = React.useState(0)
    const [thubCapC19, setThubCapC19] = React.useState(0)
    const [thubFeeC19, setThubFeeC19] = React.useState(0)

    const [allPowC20, setAllPowC20] = React.useState(0)
    const [thubLvC20, setThubLvC20] = React.useState(0)
    const [nextDayThubC20, setNextDayThubC20] = React.useState(0)
    const [thubCapC20, setThubCapC20] = React.useState(0)
    const [thubFeeC20, setThubFeeC20] = React.useState(0)

    const [allPowC21, setAllPowC21] = React.useState(0)
    const [thubLvC21, setThubLvC21] = React.useState(0)
    const [nextDayThubC21, setNextDayThubC21] = React.useState(0)
    const [thubCapC21, setThubCapC21] = React.useState(0)
    const [thubFeeC21, setThubFeeC21] = React.useState(0)

    const [allPowC22, setAllPowC22] = React.useState(0)
    const [thubLvC22, setThubLvC22] = React.useState(0)
    const [nextDayThubC22, setNextDayThubC22] = React.useState(0)
    const [thubCapC22, setThubCapC22] = React.useState(0)
    const [thubFeeC22, setThubFeeC22] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)  
        console.log("Connected to " + address)
        const cmdaonftSC = new ethers.Contract(cmdaoNft, erc721ABI, providerJBC)
        
        const thefetch = async () => {
            const cmdBal = address !== null && address !== undefined ?
                await fetchBalance({ address: address, }) :
                {formatted: 0}
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: bbqToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: bbqLab,
                        abi: bbqLab01ABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                ],
            }) : [{result: 0}, {result: [0, 0, 0]}, ]
            
            const bbqBal = data[0].result
            const labLogBBQ = data[1].result
           
            const _canCraftBBQ = /*Number(ethers.utils.formatEther(String(woodBal))) >= 100 &&*/ Number(cmdBal.formatted) >= 0.01 ? true : false

            const data2 = await readContracts({
                contracts: [
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10026010'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10026010'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10026010'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10026002'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10026002'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10026002'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001001'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001001'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001001'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001002'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001002'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001002'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001003'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001003'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001003'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001004'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001004'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001004'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001005'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001005'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001005'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001006'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001006'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001006'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001007'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001007'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001007'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001008'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001008'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001008'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001009'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001009'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001009'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001010'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001010'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001010'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10001011'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10001011'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10001011'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10026006'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10026006'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10026006'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002001'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002001'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002001'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002002'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002002'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002002'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002003'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002003'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002003'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002004'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002004'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002004'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002005'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002005'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002005'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002006'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002006'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002006'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002007'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002007'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002007'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002008'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002008'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002008'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002009'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002009'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002009'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002010'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002010'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002010'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10002011'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10002011'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10002011'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10026011'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10026011'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10026011'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003001'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003001'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003001'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003002'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003002'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003002'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003003'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003003'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003003'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003004'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003004'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003004'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003005'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003005'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003005'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003006'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003006'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003006'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003007'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003007'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003007'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003008'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003008'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003008'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003009'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003009'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003009'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003010'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003010'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003010'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003011'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003011'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003011'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003012'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003012'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003012'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003013'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003013'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003013'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003014'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003014'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003014'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003015'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003015'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003015'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003016'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003016'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003016'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003017'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003017'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003017'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003018'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003018'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003018'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003019'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003019'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003019'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003020'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003020'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003020'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003021'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003021'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003021'],
                        chainId: 8899,
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['10003022'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'hubState',
                        args: ['10003022'],
                        chainId: 8899,
                    },
                    {
                        address: transporthub,
                        abi: transportHubABI,
                        functionName: 'baseCapacity',
                        args: ['10003022'],
                        chainId: 8899,
                    },
                ],
            }) 

            const stakeFilter = await cmdaonftSC.filters.Transfer(null, houseStaking, null)
            const stakeEvent = await cmdaonftSC.queryFilter(stakeFilter, 3700385, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data0 = await readContracts({
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: houseStaking,
                        abi: houseStakingABI,
                        functionName: 'nftStake',
                        args: [1, String(item)],
                        chainId: 8899,
                    }
                ))
            })
            let _allPowZ02 = 0
            let _allPowA01 = 0
            let _allPowA02 = 0
            let _allPowA03 = 0
            let _allPowA04 = 0
            let _allPowA05 = 0
            let _allPowA06 = 0
            let _allPowA07 = 0
            let _allPowA08 = 0
            let _allPowA09 = 0
            let _allPowA10 = 0
            let _allPowA11 = 0
            let _allPowZ06 = 0
            let _allPowZ10 = 0
            let _allPowB01 = 0
            let _allPowB02 = 0
            let _allPowB03 = 0
            let _allPowB04 = 0
            let _allPowB05 = 0
            let _allPowB06 = 0
            let _allPowB07 = 0
            let _allPowB08 = 0
            let _allPowB09 = 0
            let _allPowB10 = 0
            let _allPowB11 = 0
            let _allPowZ11 = 0
            let _allPowC01 = 0
            let _allPowC02 = 0
            let _allPowC03 = 0
            let _allPowC04 = 0
            let _allPowC05 = 0
            let _allPowC06 = 0
            let _allPowC07 = 0
            let _allPowC08 = 0
            let _allPowC09 = 0
            let _allPowC10 = 0
            let _allPowC11 = 0
            let _allPowC12 = 0
            let _allPowC13 = 0
            let _allPowC14 = 0
            let _allPowC15 = 0
            let _allPowC16 = 0
            let _allPowC17 = 0
            let _allPowC18 = 0
            let _allPowC19 = 0
            let _allPowC20 = 0
            let _allPowC21 = 0
            let _allPowC22 = 0

            for (let i = 0; i <= stakeRemoveDup.length - 1; i++) {
                if (data0[i].result[0].toUpperCase() === data2[3].result.toUpperCase() && Number(data0[i].result[4]) === 10026002) {
                    _allPowZ02 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[6].result.toUpperCase() && Number(data0[i].result[4]) === 10001001) {
                    _allPowA01 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[9].result.toUpperCase() && Number(data0[i].result[4]) === 10001002) {
                    _allPowA02 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[12].result.toUpperCase() && Number(data0[i].result[4]) === 10001003) {
                    _allPowA03 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[15].result.toUpperCase() && Number(data0[i].result[4]) === 10001004) {
                    _allPowA04 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[18].result.toUpperCase() && Number(data0[i].result[4]) === 10001005) {
                    _allPowA05 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[21].result.toUpperCase() && Number(data0[i].result[4]) === 10001006) {
                    _allPowA06 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[24].result.toUpperCase() && Number(data0[i].result[4]) === 10001007) {
                    _allPowA07 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[27].result.toUpperCase() && Number(data0[i].result[4]) === 10001008) {
                    _allPowA08 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[30].result.toUpperCase() && Number(data0[i].result[4]) === 10001009) {
                    _allPowA09 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[33].result.toUpperCase() && Number(data0[i].result[4]) === 10001010) {
                    _allPowA10 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[36].result.toUpperCase() && Number(data0[i].result[4]) === 10001011) {
                    _allPowA11 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[39].result.toUpperCase() && Number(data0[i].result[4]) === 10026006) {
                    _allPowZ06 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[0].result.toUpperCase() && Number(data0[i].result[4]) === 10026010) {
                    _allPowZ10 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[42].result.toUpperCase() && Number(data0[i].result[4]) === 10002001) {
                    _allPowB01 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[45].result.toUpperCase() && Number(data0[i].result[4]) === 10002002) {
                    _allPowB02 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[48].result.toUpperCase() && Number(data0[i].result[4]) === 10002003) {
                    _allPowB03 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[51].result.toUpperCase() && Number(data0[i].result[4]) === 10002004) {
                    _allPowB04 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[54].result.toUpperCase() && Number(data0[i].result[4]) === 10002005) {
                    _allPowB05 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[57].result.toUpperCase() && Number(data0[i].result[4]) === 10002006) {
                    _allPowB06 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[60].result.toUpperCase() && Number(data0[i].result[4]) === 10002007) {
                    _allPowB07 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[63].result.toUpperCase() && Number(data0[i].result[4]) === 10002008) {
                    _allPowB08 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[66].result.toUpperCase() && Number(data0[i].result[4]) === 10002009) {
                    _allPowB09 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[69].result.toUpperCase() && Number(data0[i].result[4]) === 10002010) {
                    _allPowB10 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[72].result.toUpperCase() && Number(data0[i].result[4]) === 10002011) {
                    _allPowB11 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[75].result.toUpperCase() && Number(data0[i].result[4]) === 10026011) {
                    _allPowZ11 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[78].result.toUpperCase() && Number(data0[i].result[4]) === 10003001) {
                    _allPowC01 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[81].result.toUpperCase() && Number(data0[i].result[4]) === 10003002) {
                    _allPowC02 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[84].result.toUpperCase() && Number(data0[i].result[4]) === 10003003) {
                    _allPowC03 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[87].result.toUpperCase() && Number(data0[i].result[4]) === 10003004) {
                    _allPowC04 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[90].result.toUpperCase() && Number(data0[i].result[4]) === 10003005) {
                    _allPowC05 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[93].result.toUpperCase() && Number(data0[i].result[4]) === 10003006) {
                    _allPowC06 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[96].result.toUpperCase() && Number(data0[i].result[4]) === 10003007) {
                    _allPowC07 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[99].result.toUpperCase() && Number(data0[i].result[4]) === 10003008) {
                    _allPowC08 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[102].result.toUpperCase() && Number(data0[i].result[4]) === 10003009) {
                    _allPowC09 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[105].result.toUpperCase() && Number(data0[i].result[4]) === 10003010) {
                    _allPowC10 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[108].result.toUpperCase() && Number(data0[i].result[4]) === 10003011) {
                    _allPowC11 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[111].result.toUpperCase() && Number(data0[i].result[4]) === 10003012) {
                    _allPowC12 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[114].result.toUpperCase() && Number(data0[i].result[4]) === 10003013) {
                    _allPowC13 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[117].result.toUpperCase() && Number(data0[i].result[4]) === 10003014) {
                    _allPowC14 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[120].result.toUpperCase() && Number(data0[i].result[4]) === 10003015) {
                    _allPowC15 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[123].result.toUpperCase() && Number(data0[i].result[4]) === 10003016) {
                    _allPowC16 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[126].result.toUpperCase() && Number(data0[i].result[4]) === 10003017) {
                    _allPowC17 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[129].result.toUpperCase() && Number(data0[i].result[4]) === 10003018) {
                    _allPowC18 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[132].result.toUpperCase() && Number(data0[i].result[4]) === 10003019) {
                    _allPowC19 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[135].result.toUpperCase() && Number(data0[i].result[4]) === 10003020) {
                    _allPowC20 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[138].result.toUpperCase() && Number(data0[i].result[4]) === 10003021) {
                    _allPowC21 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[141].result.toUpperCase() && Number(data0[i].result[4]) === 10003022) {
                    _allPowC22 += Number(String(stakeRemoveDup[i]).slice(-5))
                }
            }

            return [
                bbqBal,
                labLogBBQ, _canCraftBBQ,
                data2[1].result, data2[2].result, _allPowZ10, 
                data2[4].result, data2[5].result, _allPowZ02, data2[7].result, data2[8].result, _allPowA01, data2[10].result, data2[11].result, _allPowA02, data2[13].result, data2[14].result, _allPowA03, data2[16].result, data2[17].result, _allPowA04, data2[19].result, data2[20].result, _allPowA05, data2[22].result, data2[23].result, _allPowA06, data2[25].result, data2[26].result, _allPowA07, data2[28].result, data2[29].result, _allPowA08, data2[31].result, data2[32].result, _allPowA09, data2[34].result, data2[35].result, _allPowA10, data2[37].result, data2[38].result, _allPowA11, 
                data2[40].result, data2[41].result, _allPowZ06, data2[43].result, data2[44].result, _allPowB01, data2[46].result, data2[47].result, _allPowB02, data2[49].result, data2[50].result, _allPowB03, data2[52].result, data2[53].result, _allPowB04, data2[55].result, data2[56].result, _allPowB05, data2[58].result, data2[59].result, _allPowB06, data2[61].result, data2[62].result, _allPowB07, data2[64].result, data2[65].result, _allPowB08, data2[67].result, data2[68].result, _allPowB09, data2[70].result, data2[71].result, _allPowB10, data2[73].result, data2[74].result, _allPowB11,
                data2[76].result, data2[77].result, _allPowZ11, data2[79].result, data2[80].result, _allPowC01, data2[82].result, data2[83].result, _allPowC02, data2[85].result, data2[86].result, _allPowC03, data2[88].result, data2[89].result, _allPowC04, data2[91].result, data2[92].result, _allPowC05, data2[94].result, data2[95].result, _allPowC06, data2[97].result, data2[98].result, _allPowC07, data2[100].result, data2[101].result, _allPowC08, data2[103].result, data2[104].result, _allPowC09, data2[106].result, data2[107].result, _allPowC10, data2[109].result, data2[110].result, _allPowC11,
                data2[112].result, data2[113].result, _allPowC12, data2[115].result, data2[116].result, _allPowC13, data2[118].result, data2[119].result, _allPowC14, data2[121].result, data2[122].result, _allPowC15, data2[124].result, data2[125].result, _allPowC16, data2[127].result, data2[128].result, _allPowC17, data2[130].result, data2[131].result, _allPowC18, data2[133].result, data2[134].result, _allPowC19, data2[136].result, data2[137].result, _allPowC20, data2[139].result, data2[140].result, _allPowC21, data2[142].result, data2[143].result, _allPowC22,
            ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setBbqBalance(ethers.utils.formatEther(result[0]))

            setLevelCraftBBQ(Number(result[1][0]))
            setIsCraftBBQ(Number(result[1][1]) > 0)
            const nextObtainBBQ = new Date((Number(result[1][2]) * 1000) + (60 * 1000))
            Date.now() - (Number(result[1][2]) * 1000) <= (60 * 1000) ?
                setTimeToClaimBBQ(nextObtainBBQ.toLocaleString('es-CL')) :
                setTimeToClaimBBQ(0)
            setCanCraftBBQ(result[2])

            setThubLvZ10(Number(result[3][0]))
            const _nextDayThubZ10 = new Date((Number(result[3][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubZ10 && Number(result[3][2]) !== 0) ?
                setNextDayThubZ10(_nextDayThubZ10.toLocaleString('es-CL')) :
                setNextDayThubZ10('now')
            setThubFeeZ10(Number(result[3][3]) / 100);
            (Date.now() <= _nextDayThubZ10 && Number(result[3][2]) !== 0) ? 
                setThubCapZ10(0) :
                setThubCapZ10(Number(ethers.utils.formatEther(String(result[4]))))
            setAllPowZ10(Number(result[5]))

            setThubLvZ02(Number(result[6][0]))
            const _nextDayThubZ02 = new Date((Number(result[6][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubZ02 && Number(result[6][2]) !== 0) ?
                setNextDayThubZ02(_nextDayThubZ02.toLocaleString('es-CL')) :
                setNextDayThubZ02('now')
            setThubFeeZ02(Number(result[6][3]) / 100);
            (Date.now() <= _nextDayThubZ02 && Number(result[6][2]) !== 0) ?
                setThubCapZ02(0) :
                setThubCapZ02(Number(ethers.utils.formatEther(String(result[7]))))
            setAllPowZ02(Number(result[8]))

            setThubLvA01(Number(result[9][0]))
            const _nextDayThubA01 = new Date((Number(result[9][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA01 && Number(result[6][2]) !== 0) ?
                setNextDayThubA01(_nextDayThubA01.toLocaleString('es-CL')) :
                setNextDayThubA01('now')
            setThubFeeA01(Number(result[9][3]) / 100);
            (Date.now() <= _nextDayThubA01 && Number(result[6][2]) !== 0) ?
                setThubCapA01(0) :
                setThubCapA01(Number(ethers.utils.formatEther(String(result[10]))))
            setAllPowA01(Number(result[11]))

            setThubLvA02(Number(result[12][0]))
            const _nextDayThubA02 = new Date((Number(result[12][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA02 && Number(result[12][2]) !== 0) ?
                setNextDayThubA02(_nextDayThubA02.toLocaleString('es-CL')) :
                setNextDayThubA02('now')
            setThubFeeA02(Number(result[12][3]) / 100);
            (Date.now() <= _nextDayThubA02 && Number(result[12][2]) !== 0) ?
                setThubCapA02(0) :
                setThubCapA02(Number(ethers.utils.formatEther(String(result[13]))))
            setAllPowA02(Number(result[14]))

            setThubLvA03(Number(result[15][0]));
            const _nextDayThubA03 = new Date((Number(result[15][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA03 && Number(result[15][2]) !== 0) ?
                setNextDayThubA03(_nextDayThubA03.toLocaleString('es-CL')) :
                setNextDayThubA03('now')
            setThubFeeA03(Number(result[15][3]) / 100);
            (Date.now() <= _nextDayThubA03 && Number(result[15][2]) !== 0) ?
                setThubCapA03(0) :
                setThubCapA03(Number(ethers.utils.formatEther(String(result[16]))))
            setAllPowA03(Number(result[17]))

            setThubLvA04(Number(result[18][0]))
            const _nextDayThubA04 = new Date((Number(result[18][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA04 && Number(result[18][2]) !== 0) ?
                setNextDayThubA04(_nextDayThubA04.toLocaleString('es-CL')) :
                setNextDayThubA04('now')
            setThubFeeA04(Number(result[18][3]) / 100);
            (Date.now() <= _nextDayThubA04 && Number(result[18][2]) !== 0) ?
                setThubCapA04(0) :
                setThubCapA04(Number(ethers.utils.formatEther(String(result[19]))))
            setAllPowA04(Number(result[20]))

            setThubLvA05(Number(result[21][0]))
            const _nextDayThubA05 = new Date((Number(result[21][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA05 && Number(result[21][2]) !== 0) ?
                setNextDayThubA05(_nextDayThubA05.toLocaleString('es-CL')) :
                setNextDayThubA05('now')
            setThubFeeA05(Number(result[21][3]) / 100);
            (Date.now() <= _nextDayThubA05 && Number(result[21][2]) !== 0) ?
                setThubCapA05(0) :
                setThubCapA05(Number(ethers.utils.formatEther(String(result[22]))))
            setAllPowA05(Number(result[23]))

            setThubLvA06(Number(result[24][0]))
            const _nextDayThubA06 = new Date((Number(result[24][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA06 && Number(result[24][2]) !== 0) ?
                setNextDayThubA06(_nextDayThubA06.toLocaleString('es-CL')) :
                setNextDayThubA06('now')
            setThubFeeA06(Number(result[24][3]) / 100);
            (Date.now() <= _nextDayThubA06 && Number(result[24][2]) !== 0) ?
                setThubCapA06(0) :
                setThubCapA06(Number(ethers.utils.formatEther(String(result[25]))))
            setAllPowA06(Number(result[26]))

            setThubLvA07(Number(result[27][0]))
            const _nextDayThubA07 = new Date((Number(result[27][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA07 && Number(result[27][2]) !== 0) ?
                setNextDayThubA07(_nextDayThubA07.toLocaleString('es-CL')) :
                setNextDayThubA07('now')
            setThubFeeA07(Number(result[27][3]) / 100);
            (Date.now() <= _nextDayThubA07 && Number(result[27][2]) !== 0) ?
                setThubCapA07(0) :
                setThubCapA07(Number(ethers.utils.formatEther(String(result[28]))))
            setAllPowA07(Number(result[29]))

            setThubLvA08(Number(result[30][0]))
            const _nextDayThubA08 = new Date((Number(result[30][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA08 && Number(result[30][2]) !== 0) ?
                setNextDayThubA08(_nextDayThubA08.toLocaleString('es-CL')) :
                setNextDayThubA08('now')
            setThubFeeA08(Number(result[30][3]) / 100);
            (Date.now() <= _nextDayThubA08 && Number(result[30][2]) !== 0) ?
                setThubCapA08(0) :
                setThubCapA08(Number(ethers.utils.formatEther(String(result[31]))))
            setAllPowA08(Number(result[32]))

            setThubLvA09(Number(result[33][0]))
            const _nextDayThubA09 = new Date((Number(result[33][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA09 && Number(result[33][2]) !== 0) ?
                setNextDayThubA09(_nextDayThubA09.toLocaleString('es-CL')) :
                setNextDayThubA09('now')
            setThubFeeA09(Number(result[33][3]) / 100);
            (Date.now() <= _nextDayThubA09 && Number(result[33][2]) !== 0) ?
                setThubCapA09(0) :
                setThubCapA09(Number(ethers.utils.formatEther(String(result[34]))))
            setAllPowA09(Number(result[35]))

            setThubLvA10(Number(result[36][0]))
            const _nextDayThubA10 = new Date((Number(result[36][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA10 && Number(result[36][2]) !== 0) ?
                setNextDayThubA10(_nextDayThubA10.toLocaleString('es-CL')) :
                setNextDayThubA10('now')
            setThubFeeA10(Number(result[36][3]) / 100);
            (Date.now() <= _nextDayThubA10 && Number(result[36][2]) !== 0) ?
                setThubCapA10(0) :
                setThubCapA10(Number(ethers.utils.formatEther(String(result[37]))))
            setAllPowA10(Number(result[38]))

            setThubLvA11(Number(result[39][0]))
            const _nextDayThubA11 = new Date((Number(result[39][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubA11 && Number(result[39][2]) !== 0) ?
                setNextDayThubA11(_nextDayThubA11.toLocaleString('es-CL')) :
                setNextDayThubA11('now')
            setThubFeeA11(Number(result[39][3]) / 100);
            (Date.now() <= _nextDayThubA11 && Number(result[39][2]) !== 0) ?
                setThubCapA11(0) :
                setThubCapA11(Number(ethers.utils.formatEther(String(result[40]))))
            setAllPowA11(Number(result[41]))

            setThubLvZ06(Number(result[42][0]))
            const _nextDayThubZ06 = new Date((Number(result[42][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubZ06 && Number(result[42][2]) !== 0) ?
                setNextDayThubZ06(_nextDayThubZ06.toLocaleString('es-CL')) :
                setNextDayThubZ06('now')
            setThubFeeZ06(Number(result[42][3]) / 100);
            (Date.now() <= _nextDayThubZ06 && Number(result[42][2]) !== 0) ?
                setThubCapZ06(0) :
                setThubCapZ06(Number(ethers.utils.formatEther(String(result[43]))))
            setAllPowZ06(Number(result[44]))

            setThubLvB01(Number(result[45][0]))
            const _nextDayThubB01 = new Date((Number(result[45][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB01 && Number(result[45][2]) !== 0) ?
                setNextDayThubB01(_nextDayThubB01.toLocaleString('es-CL')) :
                setNextDayThubB01('now')
            setThubFeeB01(Number(result[45][3]) / 100);
            (Date.now() <= _nextDayThubB01 && Number(result[45][2]) !== 0) ?
                setThubCapB01(0) :
                setThubCapB01(Number(ethers.utils.formatEther(String(result[46]))))
            setAllPowB01(Number(result[47]))

            setThubLvB02(Number(result[48][0]))
            const _nextDayThubB02 = new Date((Number(result[48][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB02 && Number(result[48][2]) !== 0) ?
                setNextDayThubB02(_nextDayThubB02.toLocaleString('es-CL')) :
                setNextDayThubB02('now')
            setThubFeeB02(Number(result[48][3]) / 100);
            (Date.now() <= _nextDayThubB02 && Number(result[48][2]) !== 0) ?
                setThubCapB02(0) :
                setThubCapB02(Number(ethers.utils.formatEther(String(result[49]))))                
            setAllPowB02(Number(result[50]))

            setThubLvB03(Number(result[51][0]))
            const _nextDayThubB03 = new Date((Number(result[51][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB03 && Number(result[51][2]) !== 0) ?
                setNextDayThubB03(_nextDayThubB03.toLocaleString('es-CL')) :
                setNextDayThubB03('now')
            setThubFeeB03(Number(result[51][3]) / 100);
            (Date.now() <= _nextDayThubB03 && Number(result[51][2]) !== 0) ?
                setThubCapB03(0) :
                setThubCapB03(Number(ethers.utils.formatEther(String(result[52]))))
            setAllPowB03(Number(result[53]))

            setThubLvB04(Number(result[54][0]))
            const _nextDayThubB04 = new Date((Number(result[54][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB04 && Number(result[54][2]) !== 0) ?
                setNextDayThubB04(_nextDayThubB04.toLocaleString('es-CL')) :
                setNextDayThubB04('now')
            setThubFeeB04(Number(result[54][3]) / 100);
            (Date.now() <= _nextDayThubB04 && Number(result[54][2]) !== 0) ?
                setThubCapB04(0) :
                setThubCapB04(Number(ethers.utils.formatEther(String(result[55]))))
            setAllPowB04(Number(result[56]))

            setThubLvB05(Number(result[57][0]))
            const _nextDayThubB05 = new Date((Number(result[57][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB05 && Number(result[57][2]) !== 0) ?
                setNextDayThubB05(_nextDayThubB05.toLocaleString('es-CL')) :
                setNextDayThubB05('now')
            setThubFeeB05(Number(result[57][3]) / 100);
            (Date.now() <= _nextDayThubB05 && Number(result[57][2]) !== 0) ?
                setThubCapB05(0) :
                setThubCapB05(Number(ethers.utils.formatEther(String(result[58]))))               
            setAllPowB05(Number(result[59]))

            setThubLvB06(Number(result[60][0]))
            const _nextDayThubB06 = new Date((Number(result[60][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB06 && Number(result[60][2]) !== 0) ?
                setNextDayThubB06(_nextDayThubB06.toLocaleString('es-CL')) :
                setNextDayThubB06('now')
            setThubFeeB06(Number(result[60][3]) / 100);
            (Date.now() <= _nextDayThubB06 && Number(result[60][2]) !== 0) ?
                setThubCapB06(0) :
                setThubCapB06(Number(ethers.utils.formatEther(String(result[61]))))
            setAllPowB06(Number(result[62]))

            setThubLvB07(Number(result[63][0]))
            const _nextDayThubB07 = new Date((Number(result[63][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB07 && Number(result[63][2]) !== 0) ?
                setNextDayThubB07(_nextDayThubB07.toLocaleString('es-CL')) :
                setNextDayThubB07('now')
            setThubFeeB07(Number(result[63][3]) / 100);
            (Date.now() <= _nextDayThubB07 && Number(result[63][2]) !== 0) ?
                setThubCapB07(0) :
                setThubCapB07(Number(ethers.utils.formatEther(String(result[64]))))
            setAllPowB07(Number(result[65]))

            setThubLvB08(Number(result[66][0]))
            const _nextDayThubB08 = new Date((Number(result[66][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB08 && Number(result[66][2]) !== 0) ?
                setNextDayThubB08(_nextDayThubB08.toLocaleString('es-CL')) :
                setNextDayThubB08('now')
            setThubFeeB08(Number(result[66][3]) / 100);
            (Date.now() <= _nextDayThubB08 && Number(result[66][2]) !== 0) ?
                setThubCapB08(0) :
                setThubCapB08(Number(ethers.utils.formatEther(String(result[67]))))
            setAllPowB08(Number(result[68]))

            setThubLvB09(Number(result[69][0]))
            const _nextDayThubB09 = new Date((Number(result[69][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB09 && Number(result[69][2]) !== 0) ?
                setNextDayThubB09(_nextDayThubB09.toLocaleString('es-CL')) :
                setNextDayThubB09('now')
            setThubFeeB09(Number(result[69][3]) / 100);
            (Date.now() <= _nextDayThubB09 && Number(result[69][2]) !== 0) ?
                setThubCapB09(0) :
                setThubCapB09(Number(ethers.utils.formatEther(String(result[70]))))
            setAllPowB09(Number(result[71]))

            setThubLvB10(Number(result[72][0]))
            const _nextDayThubB10 = new Date((Number(result[72][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB10 && Number(result[72][2]) !== 0) ?
                setNextDayThubB10(_nextDayThubB10.toLocaleString('es-CL')) :
                setNextDayThubB10('now')
            setThubFeeB10(Number(result[72][3]) / 100);
            (Date.now() <= _nextDayThubB10 && Number(result[72][2]) !== 0) ?
                setThubCapB10(0) :
                setThubCapB10(Number(ethers.utils.formatEther(String(result[73]))))
            setAllPowB10(Number(result[74]))

            setThubLvB11(Number(result[75][0]))
            const _nextDayThubB11 = new Date((Number(result[75][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubB11 && Number(result[75][2]) !== 0) ?
                setNextDayThubB11(_nextDayThubB11.toLocaleString('es-CL')) :
                setNextDayThubB11('now')
            setThubFeeB11(Number(result[75][3]) / 100);
            (Date.now() <= _nextDayThubB11 && Number(result[75][2]) !== 0) ?
                setThubCapB11(0) :
                setThubCapB11(Number(ethers.utils.formatEther(String(result[76]))))
            setAllPowB11(Number(result[77]))

            setThubLvZ11(Number(result[78][0]))
            const _nextDayThubZ11 = new Date((Number(result[78][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubZ11 && Number(result[78][2]) !== 0) ?
                setNextDayThubZ11(_nextDayThubZ11.toLocaleString('es-CL')) :
                setNextDayThubZ11('now')
            setThubFeeZ11(Number(result[78][3]) / 100);
            (Date.now() <= _nextDayThubZ11 && Number(result[78][2]) !== 0) ?
                setThubCapZ11(0) :
                setThubCapZ11(Number(ethers.utils.formatEther(String(result[79]))))                
            setAllPowZ11(Number(result[80]))

            setThubLvC01(Number(result[81][0]))
            const _nextDayThubC01 = new Date((Number(result[81][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC01 && Number(result[81][2]) !== 0) ?
                setNextDayThubC01(_nextDayThubC01.toLocaleString('es-CL')) :
                setNextDayThubC01('now')
            setThubFeeC01(Number(result[81][3]) / 100);
            (Date.now() <= _nextDayThubC01 && Number(result[81][2]) !== 0) ?
                setThubCapC01(0) :
                setThubCapC01(Number(ethers.utils.formatEther(String(result[82]))))
            setAllPowC01(Number(result[83]))

            setThubLvC02(Number(result[84][0]))
            const _nextDayThubC02 = new Date((Number(result[84][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC02 && Number(result[84][2]) !== 0) ?
                setNextDayThubC02(_nextDayThubC02.toLocaleString('es-CL')) :
                setNextDayThubC02('now')
            setThubFeeC02(Number(result[84][3]) / 100);
            (Date.now() <= _nextDayThubC02 && Number(result[84][2]) !== 0) ?
                setThubCapC02(0) :
                setThubCapC02(Number(ethers.utils.formatEther(String(result[85]))))
            setAllPowC02(Number(result[86]))

            setThubLvC03(Number(result[87][0]))
            const _nextDayThubC03 = new Date((Number(result[87][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC03 && Number(result[87][2]) !== 0) ?
                setNextDayThubC03(_nextDayThubC03.toLocaleString('es-CL')) :
                setNextDayThubC03('now')
            setThubFeeC03(Number(result[87][3]) / 100);
            (Date.now() <= _nextDayThubC03 && Number(result[87][2]) !== 0) ?
                setThubCapC03(0) :
                setThubCapC03(Number(ethers.utils.formatEther(String(result[88]))))
            setAllPowC03(Number(result[89]))

            setThubLvC04(Number(result[90][0]))
            const _nextDayThubC04 = new Date((Number(result[90][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC04 && Number(result[90][2]) !== 0) ?
                setNextDayThubC04(_nextDayThubC04.toLocaleString('es-CL')) :
                setNextDayThubC04('now')
            setThubFeeC04(Number(result[90][3]) / 100);
            (Date.now() <= _nextDayThubC04 && Number(result[90][2]) !== 0) ?
                setThubCapC04(0) :
                setThubCapC04(Number(ethers.utils.formatEther(String(result[91]))))
            setAllPowC04(Number(result[92]))

            setThubLvC05(Number(result[93][0]))
            const _nextDayThubC05 = new Date((Number(result[93][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC05 && Number(result[93][2]) !== 0) ?
                setNextDayThubC05(_nextDayThubC05.toLocaleString('es-CL')) :
                setNextDayThubC05('now')
            setThubFeeC05(Number(result[93][3]) / 100);
            (Date.now() <= _nextDayThubC05 && Number(result[93][2]) !== 0) ?
                setThubCapC05(0) :
                setThubCapC05(Number(ethers.utils.formatEther(String(result[94]))))
            setAllPowC05(Number(result[95]))

            setThubLvC06(Number(result[96][0]))
            const _nextDayThubC06 = new Date((Number(result[96][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC06 && Number(result[96][2]) !== 0) ?
                setNextDayThubC06(_nextDayThubC06.toLocaleString('es-CL')) :
                setNextDayThubC06('now')
            setThubFeeC06(Number(result[96][3]) / 100);
            (Date.now() <= _nextDayThubC06 && Number(result[96][2]) !== 0) ?
                setThubCapC06(0) :
                setThubCapC06(Number(ethers.utils.formatEther(String(result[97]))))
            setAllPowC06(Number(result[98]))

            setThubLvC07(Number(result[99][0]))
            const _nextDayThubC07 = new Date((Number(result[99][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC07 && Number(result[99][2]) !== 0) ?
                setNextDayThubC07(_nextDayThubC07.toLocaleString('es-CL')) :
                setNextDayThubC07('now')
            setThubFeeC07(Number(result[99][3]) / 100);
            (Date.now() <= _nextDayThubC07 && Number(result[99][2]) !== 0) ?
                setThubCapC07(0) :
                setThubCapC07(Number(ethers.utils.formatEther(String(result[100]))))
            setAllPowC07(Number(result[101]))

            setThubLvC08(Number(result[102][0]))
            const _nextDayThubC08 = new Date((Number(result[102][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC08 && Number(result[102][2]) !== 0) ?
                setNextDayThubC08(_nextDayThubC08.toLocaleString('es-CL')) :
                setNextDayThubC08('now')
            setThubFeeC08(Number(result[102][3]) / 100);
            (Date.now() <= _nextDayThubC08 && Number(result[102][2]) !== 0) ?
                setThubCapC08(0) :
                setThubCapC08(Number(ethers.utils.formatEther(String(result[103]))))
            setAllPowC08(Number(result[104]))

            setThubLvC09(Number(result[105][0]))
            const _nextDayThubC09 = new Date((Number(result[105][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC09 && Number(result[105][2]) !== 0) ?
                setNextDayThubC09(_nextDayThubC09.toLocaleString('es-CL')) :
                setNextDayThubC09('now')
            setThubFeeC09(Number(result[105][3]) / 100);
            (Date.now() <= _nextDayThubC09 && Number(result[105][2]) !== 0) ?
                setThubCapC09(0) :
                setThubCapC09(Number(ethers.utils.formatEther(String(result[106]))))
            setAllPowC09(Number(result[107]))

            setThubLvC10(Number(result[108][0]))
            const _nextDayThubC10 = new Date((Number(result[108][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC10 && Number(result[108][2]) !== 0) ?
                setNextDayThubC10(_nextDayThubC10.toLocaleString('es-CL')) :
                setNextDayThubC10('now')
            setThubFeeC10(Number(result[108][3]) / 100);
            (Date.now() <= _nextDayThubC10 && Number(result[108][2]) !== 0) ?
                setThubCapC10(0) :
                setThubCapC10(Number(ethers.utils.formatEther(String(result[109]))))
            setAllPowC10(Number(result[110]))

            setThubLvC11(Number(result[111][0]))
            const _nextDayThubC11 = new Date((Number(result[111][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC11 && Number(result[111][2]) !== 0) ?
                setNextDayThubC11(_nextDayThubC11.toLocaleString('es-CL')) :
                setNextDayThubC11('now')
            setThubFeeC11(Number(result[111][3]) / 100);
            (Date.now() <= _nextDayThubC11 && Number(result[111][2]) !== 0) ?
                setThubCapC11(0) :
                setThubCapC11(Number(ethers.utils.formatEther(String(result[112]))))
            setAllPowC11(Number(result[113]))

            setThubLvC12(Number(result[114][0]))
            const _nextDayThubC12 = new Date((Number(result[114][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC12 && Number(result[114][2]) !== 0) ?
                setNextDayThubC12(_nextDayThubC12.toLocaleString('es-CL')) :
                setNextDayThubC12('now')
            setThubFeeC12(Number(result[114][3]) / 100);
            (Date.now() <= _nextDayThubC12 && Number(result[114][2]) !== 0) ?
                setThubCapC12(0) :
                setThubCapC12(Number(ethers.utils.formatEther(String(result[115]))))
            setAllPowC12(Number(result[116]))

            setThubLvC13(Number(result[117][0]))
            const _nextDayThubC13 = new Date((Number(result[117][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC13 && Number(result[117][2]) !== 0) ?
                setNextDayThubC13(_nextDayThubC13.toLocaleString('es-CL')) :
                setNextDayThubC13('now')
            setThubFeeC13(Number(result[117][3]) / 100);
            (Date.now() <= _nextDayThubC13 && Number(result[117][2]) !== 0) ?
                setThubCapC13(0) :
                setThubCapC13(Number(ethers.utils.formatEther(String(result[118]))))
            setAllPowC13(Number(result[119]))

            setThubLvC14(Number(result[120][0]))
            const _nextDayThubC14 = new Date((Number(result[120][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC14 && Number(result[120][2]) !== 0) ?
                setNextDayThubC14(_nextDayThubC14.toLocaleString('es-CL')) :
                setNextDayThubC14('now')
            setThubFeeC14(Number(result[120][3]) / 100);
            (Date.now() <= _nextDayThubC14 && Number(result[120][2]) !== 0) ?
                setThubCapC14(0) :
                setThubCapC14(Number(ethers.utils.formatEther(String(result[121]))))
            setAllPowC14(Number(result[122]))

            setThubLvC15(Number(result[123][0]))
            const _nextDayThubC15 = new Date((Number(result[123][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC15 && Number(result[123][2]) !== 0) ?
                setNextDayThubC15(_nextDayThubC15.toLocaleString('es-CL')) :
                setNextDayThubC15('now')
            setThubFeeC15(Number(result[123][3]) / 100);
            (Date.now() <= _nextDayThubC15 && Number(result[123][2]) !== 0) ?
                setThubCapC15(0) :
                setThubCapC15(Number(ethers.utils.formatEther(String(result[124]))))
            setAllPowC15(Number(result[125]))

            setThubLvC16(Number(result[126][0]))
            const _nextDayThubC16 = new Date((Number(result[126][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC16 && Number(result[126][2]) !== 0) ?
                setNextDayThubC16(_nextDayThubC16.toLocaleString('es-CL')) :
                setNextDayThubC16('now')
            setThubFeeC16(Number(result[126][3]) / 100);
            (Date.now() <= _nextDayThubC16 && Number(result[126][2]) !== 0) ?
                setThubCapC16(0) :
                setThubCapC16(Number(ethers.utils.formatEther(String(result[127]))))
            setAllPowC16(Number(result[128]))

            setThubLvC17(Number(result[129][0]))
            const _nextDayThubC17 = new Date((Number(result[129][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC17 && Number(result[129][2]) !== 0) ?
                setNextDayThubC17(_nextDayThubC17.toLocaleString('es-CL')) :
                setNextDayThubC17('now')
            setThubFeeC17(Number(result[129][3]) / 100);
            (Date.now() <= _nextDayThubC17 && Number(result[129][2]) !== 0) ?
                setThubCapC17(0) :
                setThubCapC17(Number(ethers.utils.formatEther(String(result[130]))))
            setAllPowC17(Number(result[131]))

            setThubLvC18(Number(result[132][0]))
            const _nextDayThubC18 = new Date((Number(result[132][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC18 && Number(result[132][2]) !== 0) ?
                setNextDayThubC18(_nextDayThubC18.toLocaleString('es-CL')) :
                setNextDayThubC18('now')
            setThubFeeC18(Number(result[132][3]) / 100);
            (Date.now() <= _nextDayThubC18 && Number(result[132][2]) !== 0) ?
                setThubCapC18(0) :
                setThubCapC18(Number(ethers.utils.formatEther(String(result[133]))))
            setAllPowC18(Number(result[134]))

            setThubLvC19(Number(result[135][0]))
            const _nextDayThubC19 = new Date((Number(result[135][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC19 && Number(result[135][2]) !== 0) ?
                setNextDayThubC19(_nextDayThubC19.toLocaleString('es-CL')) :
                setNextDayThubC19('now')
            setThubFeeC19(Number(result[135][3]) / 100);
            (Date.now() <= _nextDayThubC19 && Number(result[135][2]) !== 0) ?
                setThubCapC19(0) :
                setThubCapC19(Number(ethers.utils.formatEther(String(result[136]))))
            setAllPowC19(Number(result[137]))

            setThubLvC20(Number(result[138][0]))
            const _nextDayThubC20 = new Date((Number(result[138][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC20 && Number(result[138][2]) !== 0) ?
                setNextDayThubC20(_nextDayThubC20.toLocaleString('es-CL')) :
                setNextDayThubC20('now')
            setThubFeeC20(Number(result[138][3]) / 100);
            (Date.now() <= _nextDayThubC20 && Number(result[138][2]) !== 0) ?
                setThubCapC20(0) :
                setThubCapC20(Number(ethers.utils.formatEther(String(result[139]))))
            setAllPowC20(Number(result[140]))

            setThubLvC21(Number(result[141][0]))
            const _nextDayThubC21 = new Date((Number(result[141][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC21 && Number(result[141][2]) !== 0) ?
                setNextDayThubC21(_nextDayThubC21.toLocaleString('es-CL')) :
                setNextDayThubC21('now')
            setThubFeeC21(Number(result[141][3]) / 100);
            (Date.now() <= _nextDayThubC21 && Number(result[141][2]) !== 0) ?
                setThubCapC21(0) :
                setThubCapC21(Number(ethers.utils.formatEther(String(result[142]))))
            setAllPowC21(Number(result[143]))

            setThubLvC22(Number(result[144][0]))
            const _nextDayThubC22 = new Date((Number(result[144][2]) * 1000) + (86400 * 1000));
            (Date.now() <= _nextDayThubC22 && Number(result[144][2]) !== 0) ?
                setNextDayThubC22(_nextDayThubC22.toLocaleString('es-CL')) :
                setNextDayThubC22('now')
            setThubFeeC22(Number(result[144][3]) / 100);
            (Date.now() <= _nextDayThubC22 && Number(result[144][2]) !== 0) ?
                setThubCapC22(0) :
                setThubCapC22(Number(ethers.utils.formatEther(String(result[145]))))
            setAllPowC22(Number(result[146]))
        })
    }, [address, txupdate, erc20ABI, erc721ABI, bbqLab01ABI, slot1ABI, houseStakingABI, transportHubABI])

    const craftBBQHandle = async (_machine) => {
        setisLoading(true)
        try {
            /*const woodAllow = await readContract({
                address: woodField,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, bbqLab],
            })
            if (woodAllow < (100 * 10**18)) {
                const config = await prepareWriteContract({
                    address: woodField,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [bbqLab, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }*/
            const config2 = await prepareWriteContract({
                address: bbqLab,
                abi: bbqLab01ABI,
                functionName: 'craft',
                args: [_machine],
                value: ethers.utils.parseEther('0.01'),
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const obtainBBQHandle = async () => {
        setisLoading(true)
        try {
            const config0 = await prepareWriteContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'approve',
                args: [bbqLab, 0],
            })
            const { hash: hash0 } = await writeContract(config0) // Block updating
            await waitForTransaction({ hash: hash0 })
            const config = await prepareWriteContract({
                address: bbqLab,
                abi: bbqLab01ABI,
                functionName: 'obtain',
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const transportHandle = async () => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                chainId: 190,
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, sourcethub],
            })
            if (bbqAllow < ethers.utils.parseEther(String(transportValue))) {
                const config = await prepareWriteContract({
                    chainId: 190,
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [sourcethub, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            let _target = null
            if (houseSelected === 'Z02') {
                _target = 10026002
            } else if (houseSelected === 'A01') {
                _target = 10001001
            } else if (houseSelected === 'A02') {
                _target = 10001002
            } else if (houseSelected === 'A03') {
                _target = 10001003
            } else if (houseSelected === 'A04') {
                _target = 10001004
            } else if (houseSelected === 'A05') {
                _target = 10001005
            } else if (houseSelected === 'A06') {
                _target = 10001006
            } else if (houseSelected === 'A07') {
                _target = 10001007
            } else if (houseSelected === 'A08') {
                _target = 10001008
            } else if (houseSelected === 'A09') {
                _target = 10001009
            } else if (houseSelected === 'A10') {
                _target = 10001010
            } else if (houseSelected === 'A11') {
                _target = 10001011
            } else if (houseSelected === 'Z06') {
                _target = 10026006
            } else if (houseSelected === 'Z10') {
                _target = 10026010
            } else if (houseSelected === 'B01') {
                _target = 10002001
            } else if (houseSelected === 'B02') {
                _target = 10002002
            } else if (houseSelected === 'B03') {
                _target = 10002003
            } else if (houseSelected === 'B04') {
                _target = 10002004
            } else if (houseSelected === 'B05') {
                _target = 10002005
            } else if (houseSelected === 'B06') {
                _target = 10002006
            } else if (houseSelected === 'B07') {
                _target = 10002007
            } else if (houseSelected === 'B08') {
                _target = 10002008
            } else if (houseSelected === 'B09') {
                _target = 10002009
            } else if (houseSelected === 'B10') {
                _target = 10002010
            } else if (houseSelected === 'B11') {
                _target = 10002011
            } else if (houseSelected === 'Z11') {
                _target = 10026011
            } else if (houseSelected === 'C01') {
                _target = 10003001
            } else if (houseSelected === 'C02') {
                _target = 10003002
            } else if (houseSelected === 'C03') {
                _target = 10003003
            } else if (houseSelected === 'C04') {
                _target = 10003004
            } else if (houseSelected === 'C05') {
                _target = 10003005
            } else if (houseSelected === 'C06') {
                _target = 10003006
            } else if (houseSelected === 'C07') {
                _target = 10003007
            } else if (houseSelected === 'C08') {
                _target = 10003008
            } else if (houseSelected === 'C09') {
                _target = 10003009
            } else if (houseSelected === 'C10') {
                _target = 10003010
            } else if (houseSelected === 'C11') {
                _target = 10003011
            } else if (houseSelected === 'C12') {
                _target = 10003012
            } else if (houseSelected === 'C13') {
                _target = 10003013
            } else if (houseSelected === 'C14') {
                _target = 10003014
            } else if (houseSelected === 'C15') {
                _target = 10003015
            } else if (houseSelected === 'C16') {
                _target = 10003016
            } else if (houseSelected === 'C17') {
                _target = 10003017
            } else if (houseSelected === 'C18') {
                _target = 10003018
            } else if (houseSelected === 'C19') {
                _target = 10003019
            } else if (houseSelected === 'C20') {
                _target = 10003020
            } else if (houseSelected === 'C21') {
                _target = 10003021
            } else if (houseSelected === 'C22') {
                _target = 10003022
            }
            
            const config2 = await prepareWriteContract({
                chainId: 190,
                address: sourcethub,
                abi: sourceThubABI,
                functionName: 'sendBBQ',
                args: [_target, ethers.utils.parseEther(String(transportValue))],
                value: ethers.utils.parseEther('80'),
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)

            const { hash: hash2 } = await sendTransaction({
                chainId: 8899,
                to: '0x336C4EaE525948C8EF79b74b549C048f07639315',
                value: ethers.utils.parseEther(10),
            })
            await waitForTransaction({ hash: hash2 })
        } catch (e) {
            console.log(e)
        }
        setisLoading(false)
    }

    const upgradeBBQHandle = async (_level) => {
        setisLoading(true)
        try {
            /*const woodAllow = await readContract({
                address: woodField,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, bbqLab],
            })
            let woodUsage = 0
            if (_level === 1) {
                woodUsage = 6000
            } else if (_level === 2) {
                woodUsage = 60000
            } else if (_level === 3) {
                woodUsage = 600000
            }
            if (woodAllow < (woodUsage * 10**18)) {
                const config = await prepareWriteContract({
                    address: woodField,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [bbqLab, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }*/
            const config2 = await prepareWriteContract({
                address: bbqLab,
                abi: bbqLab01ABI,
                functionName: 'upgrade',
                args: [_level]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}} className="pixel">
                <div style={{fontSize: "75px", width: "fit-content"}}>Labs</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}}>Craft, Await and Obtain!</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/labslogo.png" width="150" alt="Labs_Logo" />
            </div>
        </div>

        <div className="collection">
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", marginTop: "20px", letterSpacing: "1px"}} className="bold">CommuDAO Resources</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4"
                            width="20"
                            alt="$WOOD"
                        />
                        <div style={{marginLeft: "5px"}}>{Number(0).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                </div>

                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", marginTop: "20px", letterSpacing: "1px"}} className="bold">CommuDAO Craft Products</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq"
                            width="20"
                            alt="$BBQ"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: bbqToken,
                                            symbol: 'BBQ',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                </div>

                <div style={{marginTop: "40px", width: "97.5%", borderBottom: "1px solid #dddade"}}></div>
                <div style={{marginTop: "20px", width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommuDAO Labs & Factories</div>
                <div style={{width: "100%", marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                        {levelCraftBBQ >= 0 ? <div style={{position: "absolute", top: 15, right: 15, padding: "10px 20px", letterSpacing: 1, background: "transparent", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="bold">LEVEL {levelCraftBBQ}</div> : <></>}
                        <div style={{width: "200px", height: "218.18px", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            {levelCraftBBQ < 4 && <img src="../elements/BBQ_factory01_lv0.png" width="200" alt="$BBQ_Factory_lv0"/>}
                        </div>
                        <div style={{marginTop: "30px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i></div>
                            <div style={{display: "flex", flexDirection: "row", fontSize: "15px"}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="18" alt="$WOOD"/>
                                <div style={{margin: "0 5px"}}>0</div>
                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                
                                <div style={{margin: "0 5px"}}>$CMD 0.01</div>
                                <i style={{fontSize: "16px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                <div style={{margin: "0 5px"}}>
                                    {isCraftBBQ !== null ?
                                        <>
                                            50
                                        </> :
                                        "..."
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-clock-o"></i></div>
                            <div>1 minutes</div>
                        </div>
                        {isCraftBBQ ?
                            <>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                    <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-hourglass"></i></div>
                                    <div>{timetoClaimBBQ === 0 ? "now" : timetoClaimBBQ}</div>
                                </div>
                                {timetoClaimBBQ === 0 ?
                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={obtainBBQHandle}>Obtain</div> :
                                    <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "10px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Obtain</div>
                                }
                            </> :
                            <>
                                {address !== null && address !== undefined ?
                                    <>
                                        <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "15px", borderBottom: "1px solid #d9d8df"}} className="pixel">
                                            <div><i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i></div>
                                            <div style={{display: "flex", flexDirection: "row"}}>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="18" alt="$WOOD"/>
                                                <div style={{margin: "0 5px"}}>
                                                    {isCraftBBQ !== null ?
                                                        <>
                                                            {levelCraftBBQ === 0 && "Upgradable soon!"}
                                                        </> :
                                                        "Loading..."
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {isCraftBBQ !== null ?
                                            <div style={{width: "100%", marginTop: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                {canCraftBBQ ?
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={() => craftBBQHandle(levelCraftBBQ + 1)}>Craft Barbeque</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Lack of Raw Mat...</div>
                                                }
                                                {false ?
                                                    <div style={{background: "#67BAA7", display: "flex", justifyContent: "center", width: "100px", borderRadius: "12px", padding: "15px"}} className="pixel button" onClick={() => upgradeBBQHandle(levelCraftBBQ + 1)}>UPGRADE</div> :
                                                    <div style={{display: "flex", justifyContent: "center", width: "100px", borderRadius: "12px", padding: "15px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">UPGRADE</div>
                                                }
                                            </div> :
                                            <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Craft Barbeque</div>
                                        }
                                    </> :
                                    <div style={{display: "flex", justifyContent: "center", width: "185px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                                }
                            </>
                        }
                    </div>
                </div>

                <div style={{marginTop: "40px", width: "97.5%", borderBottom: "1px solid #dddade"}}></div>
                <div style={{marginTop: "20px", width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommuDAO Transport Services</div>
                <div style={{width: "100%", margin: "10px 0 80px 0", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                        <div style={{width: "100%", textAlign: "left"}} className='emp'>
                            SELECT TRANSPORT HUB [ALPHA]
                        </div>
                        <div style={{height: "80%", overflow: "scroll"}} className="pixel">
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'Z02' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('Z02')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapZ02 * allPowZ02 > 0 ? <>🟢</> : <>⚪️</>} T.HUB Z02 Lv.{thubLvZ02}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeZ02}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapZ02 * allPowZ02}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubZ02}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A01' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A01')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA01 * allPowA01 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A01 Lv.{thubLvA01}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA01}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA01 * allPowA01}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA01}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A02' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A02')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA02 * allPowA02 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A02 Lv.{thubLvA02}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA02}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA02 * allPowA02}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA02}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A03' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A03')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA03 * allPowA03 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A03 Lv.{thubLvA03}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA03}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA03 * allPowA03}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA03}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A04' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A04')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA04 * allPowA04 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A04 Lv.{thubLvA04}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA04}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA04 * allPowA04}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA04}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A05' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A05')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA05 * allPowA05 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A05 Lv.{thubLvA05}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA05}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA05 * allPowA05}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA05}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A06' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A06')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA06 * allPowA06 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A06 Lv.{thubLvA06}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA06}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA06 * allPowA06}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA06}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A07' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A07')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA07 * allPowA07 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A07 Lv.{thubLvA07}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA07}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA07 * allPowA07}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA07}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A08' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A08')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA08 * allPowA08 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A08 Lv.{thubLvA08}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA08}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA08 * allPowA08}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA08}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A09' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A09')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA09 * allPowA09 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A09 Lv.{thubLvA09}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA09}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA09 * allPowA09}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA09}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A10' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A10')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA10 * allPowA10 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A10 Lv.{thubLvA10}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA10}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA10 * allPowA10}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA10}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'A11' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('A11')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapA11 * allPowA11 > 0 ? <>🟢</> : <>⚪️</>} T.HUB A11 Lv.{thubLvA11}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeA11}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapA11 * allPowA11}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubA11}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'Z06' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('Z06')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapZ06 * allPowZ06 > 0 ? <>🟢</> : <>⚪️</>} T.HUB Z06 Lv.{thubLvZ06}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeZ06}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapZ06 * allPowZ06}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubZ06}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'Z10' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('Z10')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapZ10 * allPowZ10 > 0 ? <>🟢</> : <>⚪️</>} T.HUB Z10 Lv.{thubLvZ10}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeZ10}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapZ10 * allPowZ10}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubZ10}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B01' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B01')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB01 * allPowB01 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B01 Lv.{thubLvB01}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB01}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB01 * allPowB01}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB01}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B02' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B02')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB02 * allPowB02 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B02 Lv.{thubLvB02}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB02}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB02 * allPowB02}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB02}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B03' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B03')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB03 * allPowB03 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B03 Lv.{thubLvB03}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB03}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB03 * allPowB03}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB03}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B04' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B04')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB04 * allPowB04 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B04 Lv.{thubLvB04}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB04}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB04 * allPowB04}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB04}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B05' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B05')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB05 * allPowB05 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B05 Lv.{thubLvB05}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB05}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB05 * allPowB05}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB05}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B06' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B06')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB06 * allPowB06 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B06 Lv.{thubLvB06}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB06}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB06 * allPowB06}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB06}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B07' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B07')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB07 * allPowB07 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B07 Lv.{thubLvB07}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB07}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB07 * allPowB07}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB07}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B08' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B08')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB08 * allPowB08 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B08 Lv.{thubLvB08}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB08}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB08 * allPowB08}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB08}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B09' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B09')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB09 * allPowB09 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B09 Lv.{thubLvB09}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB09}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB09 * allPowB09}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB09}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B10' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B10')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB10 * allPowB10 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B10 Lv.{thubLvB10}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB10}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB10 * allPowB10}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB10}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'B11' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('B11')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapB11 * allPowB11 > 0 ? <>🟢</> : <>⚪️</>} T.HUB B11 Lv.{thubLvB11}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeB11}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapB11 * allPowB11}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubB11}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'Z11' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('Z11')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapZ11 * allPowZ11 > 0 ? <>🟢</> : <>⚪️</>} T.HUB Z11 Lv.{thubLvZ11}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeZ11}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapZ11 * allPowZ11}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubZ11}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C01' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C01')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC01 * allPowC01 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C01 Lv.{thubLvC01}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC01}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC01 * allPowC01}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC01}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C02' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C02')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC02 * allPowC02 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C02 Lv.{thubLvC02}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC02}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC02 * allPowC02}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC02}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C03' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C03')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC03 * allPowC03 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C03 Lv.{thubLvC03}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC03}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC03 * allPowC03}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC03}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C04' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C04')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC04 * allPowC04 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C04 Lv.{thubLvC04}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC04}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC04 * allPowC04}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC04}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C05' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C05')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC05 * allPowC05 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C05 Lv.{thubLvC05}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC05}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC05 * allPowC05}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC05}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C06' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C06')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC06 * allPowC06 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C06 Lv.{thubLvC06}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC06}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC06 * allPowC06}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC06}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C07' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C07')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC07 * allPowC07 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C07 Lv.{thubLvC07}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC07}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC07 * allPowC07}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC07}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C08' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C08')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC08 * allPowC08 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C08 Lv.{thubLvC08}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC08}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC08 * allPowC08}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC08}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C09' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C09')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC09 * allPowC09 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C09 Lv.{thubLvC09}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC09}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC09 * allPowC09}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC09}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C10' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C10')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC10 * allPowC10 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C10 Lv.{thubLvC10}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC10}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC10 * allPowC10}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC10}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C11' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C11')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC11 * allPowC11 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C11 Lv.{thubLvC11}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC11}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC11 * allPowC11}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC11}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C12' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C12')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC12 * allPowC12 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C12 Lv.{thubLvC12}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC12}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC12 * allPowC12}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC12}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C13' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C13')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC13 * allPowC13 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C13 Lv.{thubLvC13}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC13}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC13 * allPowC13}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC13}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C14' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C14')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC14 * allPowC14 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C14 Lv.{thubLvC14}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC14}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC14 * allPowC14}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC14}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C15' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C15')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC15 * allPowC15 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C15 Lv.{thubLvC15}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC15}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC15 * allPowC15}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC15}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C16' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C16')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC16 * allPowC16 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C16 Lv.{thubLvC16}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC16}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC16 * allPowC16}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC16}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C17' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C17')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC17 * allPowC17 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C17 Lv.{thubLvC17}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC17}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC17 * allPowC17}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC17}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C18' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C18')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC18 * allPowC18 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C18 Lv.{thubLvC18}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC18}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC18 * allPowC18}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC18}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C19' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C19')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC19 * allPowC19 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C19 Lv.{thubLvC19}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC19}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC19 * allPowC19}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC19}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C20' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C20')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC20 * allPowC20 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C20 Lv.{thubLvC20}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC20}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC20 * allPowC20}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC20}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C21' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C21')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC21 * allPowC21 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C21 Lv.{thubLvC21}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC21}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC21 * allPowC21}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC21}</div>
                                </div>
                            </div>
                            <div style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: houseSelected === 'C22' ? "rgb(0, 227, 180)" : "transparent"}} onClick={() => setHouseSelected('C22')}>
                                <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div>{thubCapC22 * allPowC22 > 0 ? <>🟢</> : <>⚪️</>} T.HUB C22 Lv.{thubLvC22}</div>
                                    <div>FEE: <span style={{color: "#000"}}>{thubFeeC22}%</span></div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>REMAIN CAPACITY: <span style={{color: "#000"}}>{thubCapC22 * allPowC22}</span> $BBQ</div>
                                </div>
                                <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    <div></div>
                                    <div>RESET ON: {nextDayThubC22}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{width: "100%", marginTop: "5px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>DESTINATION: <span className='emp'>{houseSelected}</span></div>
                            <div>tBridge fee: 80 CMD</div>
                        </div>
                        <div style={{width: "100%", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <input
                                style={{maxHeight: "10px", width: "180px", padding: "10px", margin: "10px 0", backgroundColor: "#fff", color: "#000", border: "2px solid", borderColor: "rgb(136, 140, 143) rgb(255, 255, 255) rgb(255, 255, 255) rgb(136, 140, 143)"}}
                                type="number"
                                step="1"
                                min="1"
                                placeholder="0.00 $BBQ"
                                value={transportValue}
                                onChange={(event) => setTransportValue(event.target.value)}
                            ></input>
                            {address !== null && address !== undefined ? 
                                <div style={{maxHeight: "10px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0", fontSize: "12px"}} className="button" onClick={transportHandle}>TRANSPORT</div> : 
                                <div style={{maxHeight: "10px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">TRANSPORT</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )

}

export default BBQLabs
