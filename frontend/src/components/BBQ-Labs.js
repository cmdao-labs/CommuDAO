import React from 'react'
import { ethers } from 'ethers'
import { fetchBalance, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
const { ethereum } = window

const bbqToken = '0x87dfDc26ff6e8986e2F773FAE3Bfa51C8f152cF0'
const bbqLab = '0x2D2901B3c1A9770008AA38A095f71FB4e136c0f3'

const cmdaoNft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const houseStaking = '0x2eF9d702c42BC0F8B9D7305C34B4f63526502255'
const transporthub = '0x1c56BC081f50F3da01b3838FC889756B0912E395'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const BBQLabs = ({ setisLoading, txupdate, setTxupdate, bbqLab01ABI, erc20ABI, transportHubABI, houseStakingABI, slot1ABI, erc721ABI }) => {
    const { address } = useAccount()

    const [bbqBalance, setBbqBalance] = React.useState(0)

    const [levelCraftBBQ, setLevelCraftBBQ] = React.useState(0)
    const [isCraftBBQ, setIsCraftBBQ] = React.useState(null)
    const [timetoClaimBBQ, setTimeToClaimBBQ] = React.useState(0)
    const [canCraftBBQ, setCanCraftBBQ] = React.useState(false)

    const [houseSelected, setHouseSelected] = React.useState('')

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
                ],
            }) 

            const stakeFilter = await cmdaonftSC.filters.Transfer(data2[0].result, houseStaking, null)
            const stakeEvent = await cmdaonftSC.queryFilter(stakeFilter, 2549069, "latest")
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
                if (data0[i].result[0].toUpperCase() === data2[3].result.toUpperCase()) {
                    _allPowZ02 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[6].result.toUpperCase()) {
                    _allPowA01 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[9].result.toUpperCase()) {
                    _allPowA02 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[12].result.toUpperCase()) {
                    _allPowA03 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[15].result.toUpperCase()) {
                    _allPowA04 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[18].result.toUpperCase()) {
                    _allPowA05 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[21].result.toUpperCase()) {
                    _allPowA06 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[24].result.toUpperCase()) {
                    _allPowA07 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[27].result.toUpperCase()) {
                    _allPowA08 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[30].result.toUpperCase()) {
                    _allPowA09 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[33].result.toUpperCase()) {
                    _allPowA10 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[36].result.toUpperCase()) {
                    _allPowA11 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[39].result.toUpperCase()) {
                    _allPowZ06 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[0].result.toUpperCase()) {
                    _allPowZ10 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[42].result.toUpperCase()) {
                    _allPowB01 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[45].result.toUpperCase()) {
                    _allPowB02 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[48].result.toUpperCase()) {
                    _allPowB03 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[51].result.toUpperCase()) {
                    _allPowB04 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[54].result.toUpperCase()) {
                    _allPowB05 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[57].result.toUpperCase()) {
                    _allPowB06 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[60].result.toUpperCase()) {
                    _allPowB07 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[63].result.toUpperCase()) {
                    _allPowB08 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[66].result.toUpperCase()) {
                    _allPowB09 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[69].result.toUpperCase()) {
                    _allPowB10 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[72].result.toUpperCase()) {
                    _allPowB11 += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === data2[75].result.toUpperCase()) {
                    _allPowZ11 += Number(String(stakeRemoveDup[i]).slice(-5))
                }
            }

            return [
                bbqBal,
                labLogBBQ, _canCraftBBQ,
                data2[1].result, data2[2].result, _allPowZ10, 
                data2[4].result, data2[5].result, _allPowZ02, data2[7].result, data2[8].result, _allPowA01, data2[10].result, data2[11].result, _allPowA02, data2[13].result, data2[14].result, _allPowA03, data2[16].result, data2[17].result, _allPowA04, data2[19].result, data2[20].result, _allPowA05, data2[22].result, data2[23].result, _allPowA06, data2[25].result, data2[26].result, _allPowA07, data2[28].result, data2[29].result, _allPowA08, data2[31].result, data2[32].result, _allPowA09, data2[34].result, data2[35].result, _allPowA10, data2[37].result, data2[38].result, _allPowA11, 
                data2[40].result, data2[41].result, _allPowZ06, data2[43].result, data2[44].result, _allPowB01, data2[46].result, data2[47].result, _allPowB02, data2[49].result, data2[50].result, _allPowB03, data2[52].result, data2[53].result, _allPowB04, data2[55].result, data2[56].result, _allPowB05, data2[58].result, data2[59].result, _allPowB06, data2[61].result, data2[62].result, _allPowB07, data2[64].result, data2[65].result, _allPowB08, data2[67].result, data2[68].result, _allPowB09, data2[70].result, data2[71].result, _allPowB10, data2[73].result, data2[74].result, _allPowB11,
                data2[76].result, data2[77].result, _allPowZ11,
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
            const _nextDayThubZ10 = new Date((Number(result[3][2]) * 1000) + (86400 * 1000))
            Number(result[3][2]) !== 0 ?
                setNextDayThubZ10(_nextDayThubZ10.toLocaleString('es-CL')) :
                setNextDayThubZ10('not yet initiate')
            setThubFeeZ10(Number(result[3][3]) / 100)
            setThubCapZ10(Number(ethers.utils.formatEther(String(result[4]))))
            setAllPowZ10(Number(result[5]))

            setThubLvZ02(Number(result[6][0]))
            const _nextDayThubZ02 = new Date((Number(result[6][2]) * 1000) + (86400 * 1000))
            Number(result[6][2]) !== 0 ?
                setNextDayThubZ02(_nextDayThubZ02.toLocaleString('es-CL')) :
                setNextDayThubZ02('not yet initiate')
            setThubFeeZ02(Number(result[6][3]) / 100)
            setThubCapZ02(Number(ethers.utils.formatEther(String(result[7]))))
            setAllPowZ02(Number(result[8]))

            setThubLvA01(Number(result[9][0]))
            const _nextDayThubA01 = new Date((Number(result[9][2]) * 1000) + (86400 * 1000))
            Number(result[9][2]) !== 0 ?
                setNextDayThubA01(_nextDayThubA01.toLocaleString('es-CL')) :
                setNextDayThubA01('not yet initiate')
            setThubFeeA01(Number(result[9][3]) / 100)
            setThubCapA01(Number(ethers.utils.formatEther(String(result[10]))))
            setAllPowA01(Number(result[11]))

            setThubLvA02(Number(result[12][0]))
            const _nextDayThubA02 = new Date((Number(result[12][2]) * 1000) + (86400 * 1000))
            Number(result[12][2]) !== 0 ?
                setNextDayThubA02(_nextDayThubA02.toLocaleString('es-CL')) :
                setNextDayThubA02('not yet initiate')
            setThubFeeA02(Number(result[12][3]) / 100)
            setThubCapA02(Number(ethers.utils.formatEther(String(result[13]))))
            setAllPowA02(Number(result[14]))

            setThubLvA03(Number(result[15][0]))
            const _nextDayThubA03 = new Date((Number(result[15][2]) * 1000) + (86400 * 1000))
            Number(result[15][2]) !== 0 ?
                setNextDayThubA03(_nextDayThubA03.toLocaleString('es-CL')) :
                setNextDayThubA03('not yet initiate')
            setThubFeeA03(Number(result[15][3]) / 100)
            setThubCapA03(Number(ethers.utils.formatEther(String(result[16]))))
            setAllPowA03(Number(result[17]))

            setThubLvA04(Number(result[18][0]))
            const _nextDayThubA04 = new Date((Number(result[18][2]) * 1000) + (86400 * 1000))
            Number(result[18][2]) !== 0 ?
                setNextDayThubA04(_nextDayThubA04.toLocaleString('es-CL')) :
                setNextDayThubA04('not yet initiate')
            setThubFeeA04(Number(result[18][3]) / 100)
            setThubCapA04(Number(ethers.utils.formatEther(String(result[19]))))
            setAllPowA04(Number(result[20]))

            setThubLvA05(Number(result[21][0]))
            const _nextDayThubA05 = new Date((Number(result[21][2]) * 1000) + (86400 * 1000))
            Number(result[21][2]) !== 0 ?
                setNextDayThubA05(_nextDayThubA05.toLocaleString('es-CL')) :
                setNextDayThubA05('not yet initiate')
            setThubFeeA05(Number(result[21][3]) / 100)
            setThubCapA05(Number(ethers.utils.formatEther(String(result[22]))))
            setAllPowA05(Number(result[23]))

            setThubLvA06(Number(result[24][0]))
            const _nextDayThubA06 = new Date((Number(result[24][2]) * 1000) + (86400 * 1000))
            Number(result[24][2]) !== 0 ?
                setNextDayThubA06(_nextDayThubA06.toLocaleString('es-CL')) :
                setNextDayThubA06('not yet initiate')
            setThubFeeA06(Number(result[24][3]) / 100)
            setThubCapA06(Number(ethers.utils.formatEther(String(result[25]))))
            setAllPowA06(Number(result[26]))

            setThubLvA07(Number(result[27][0]))
            const _nextDayThubA07 = new Date((Number(result[27][2]) * 1000) + (86400 * 1000))
            Number(result[27][2]) !== 0 ?
                setNextDayThubA07(_nextDayThubA07.toLocaleString('es-CL')) :
                setNextDayThubA07('not yet initiate')
            setThubFeeA07(Number(result[27][3]) / 100)
            setThubCapA07(Number(ethers.utils.formatEther(String(result[28]))))
            setAllPowA07(Number(result[29]))

            setThubLvA08(Number(result[30][0]))
            const _nextDayThubA08 = new Date((Number(result[30][2]) * 1000) + (86400 * 1000))
            Number(result[30][2]) !== 0 ?
                setNextDayThubA08(_nextDayThubA08.toLocaleString('es-CL')) :
                setNextDayThubA08('not yet initiate')
            setThubFeeA08(Number(result[30][3]) / 100)
            setThubCapA08(Number(ethers.utils.formatEther(String(result[31]))))
            setAllPowA08(Number(result[32]))

            setThubLvA09(Number(result[33][0]))
            const _nextDayThubA09 = new Date((Number(result[33][2]) * 1000) + (86400 * 1000))
            Number(result[33][2]) !== 0 ?
                setNextDayThubA09(_nextDayThubA09.toLocaleString('es-CL')) :
                setNextDayThubA09('not yet initiate')
            setThubFeeA09(Number(result[33][3]) / 100)
            setThubCapA09(Number(ethers.utils.formatEther(String(result[34]))))
            setAllPowA09(Number(result[35]))

            setThubLvA10(Number(result[36][0]))
            const _nextDayThubA10 = new Date((Number(result[36][2]) * 1000) + (86400 * 1000))
            Number(result[36][2]) !== 0 ?
                setNextDayThubA10(_nextDayThubA10.toLocaleString('es-CL')) :
                setNextDayThubA10('not yet initiate')
            setThubFeeA10(Number(result[36][3]) / 100)
            setThubCapA10(Number(ethers.utils.formatEther(String(result[37]))))
            setAllPowA10(Number(result[38]))

            setThubLvA11(Number(result[39][0]))
            const _nextDayThubA11 = new Date((Number(result[39][2]) * 1000) + (86400 * 1000))
            Number(result[39][2]) !== 0 ?
                setNextDayThubA11(_nextDayThubA11.toLocaleString('es-CL')) :
                setNextDayThubA11('not yet initiate')
            setThubFeeA11(Number(result[39][3]) / 100)
            setThubCapA11(Number(ethers.utils.formatEther(String(result[40]))))
            setAllPowA11(Number(result[41]))

            setThubLvZ06(Number(result[42][0]))
            const _nextDayThubZ06 = new Date((Number(result[42][2]) * 1000) + (86400 * 1000))
            Number(result[42][2]) !== 0 ?
                setNextDayThubZ06(_nextDayThubZ06.toLocaleString('es-CL')) :
                setNextDayThubZ06('not yet initiate')
            setThubFeeZ06(Number(result[42][3]) / 100)
            setThubCapZ06(Number(ethers.utils.formatEther(String(result[43]))))
            setAllPowZ06(Number(result[44]))

            setThubLvB01(Number(result[45][0]))
            const _nextDayThubB01 = new Date((Number(result[45][2]) * 1000) + (86400 * 1000))
            Number(result[45][2]) !== 0 ?
                setNextDayThubB01(_nextDayThubB01.toLocaleString('es-CL')) :
                setNextDayThubB01('not yet initiate')
            setThubFeeB01(Number(result[45][3]) / 100)
            setThubCapB01(Number(ethers.utils.formatEther(String(result[46]))))
            setAllPowB01(Number(result[47]))

            setThubLvB02(Number(result[48][0]))
            const _nextDayThubB02 = new Date((Number(result[48][2]) * 1000) + (86400 * 1000))
            Number(result[48][2]) !== 0 ?
                setNextDayThubB02(_nextDayThubB02.toLocaleString('es-CL')) :
                setNextDayThubB02('not yet initiate')
            setThubFeeB02(Number(result[48][3]) / 100)
            setThubCapB02(Number(ethers.utils.formatEther(String(result[49]))))
            setAllPowB02(Number(result[50]))

            setThubLvB03(Number(result[51][0]))
            const _nextDayThubB03 = new Date((Number(result[51][2]) * 1000) + (86400 * 1000))
            Number(result[51][2]) !== 0 ?
                setNextDayThubB03(_nextDayThubB03.toLocaleString('es-CL')) :
                setNextDayThubB03('not yet initiate')
            setThubFeeB03(Number(result[51][3]) / 100)
            setThubCapB03(Number(ethers.utils.formatEther(String(result[52]))))
            setAllPowB03(Number(result[53]))

            setThubLvB04(Number(result[54][0]))
            const _nextDayThubB04 = new Date((Number(result[54][2]) * 1000) + (86400 * 1000))
            Number(result[54][2]) !== 0 ?
                setNextDayThubB04(_nextDayThubB04.toLocaleString('es-CL')) :
                setNextDayThubB04('not yet initiate')
            setThubFeeB04(Number(result[54][3]) / 100)
            setThubCapB04(Number(ethers.utils.formatEther(String(result[55]))))
            setAllPowB04(Number(result[56]))

            setThubLvB05(Number(result[57][0]))
            const _nextDayThubB05 = new Date((Number(result[57][2]) * 1000) + (86400 * 1000))
            Number(result[57][2]) !== 0 ?
                setNextDayThubB05(_nextDayThubB05.toLocaleString('es-CL')) :
                setNextDayThubB05('not yet initiate')
            setThubFeeB05(Number(result[57][3]) / 100)
            setThubCapB05(Number(ethers.utils.formatEther(String(result[58]))))
            setAllPowB05(Number(result[59]))

            setThubLvB06(Number(result[60][0]))
            const _nextDayThubB06 = new Date((Number(result[60][2]) * 1000) + (86400 * 1000))
            Number(result[60][2]) !== 0 ?
                setNextDayThubB06(_nextDayThubB06.toLocaleString('es-CL')) :
                setNextDayThubB06('not yet initiate')
            setThubFeeB06(Number(result[60][3]) / 100)
            setThubCapB06(Number(ethers.utils.formatEther(String(result[61]))))
            setAllPowB06(Number(result[62]))

            setThubLvB07(Number(result[63][0]))
            const _nextDayThubB07 = new Date((Number(result[63][2]) * 1000) + (86400 * 1000))
            Number(result[63][2]) !== 0 ?
                setNextDayThubB07(_nextDayThubB07.toLocaleString('es-CL')) :
                setNextDayThubB07('not yet initiate')
            setThubFeeB07(Number(result[63][3]) / 100)
            setThubCapB07(Number(ethers.utils.formatEther(String(result[64]))))
            setAllPowB07(Number(result[65]))

            setThubLvB08(Number(result[66][0]))
            const _nextDayThubB08 = new Date((Number(result[66][2]) * 1000) + (86400 * 1000))
            Number(result[66][2]) !== 0 ?
                setNextDayThubB08(_nextDayThubB08.toLocaleString('es-CL')) :
                setNextDayThubB08('not yet initiate')
            setThubFeeB08(Number(result[66][3]) / 100)
            setThubCapB08(Number(ethers.utils.formatEther(String(result[67]))))
            setAllPowB08(Number(result[68]))

            setThubLvB09(Number(result[69][0]))
            const _nextDayThubB09 = new Date((Number(result[69][2]) * 1000) + (86400 * 1000))
            Number(result[69][2]) !== 0 ?
                setNextDayThubB09(_nextDayThubB09.toLocaleString('es-CL')) :
                setNextDayThubB09('not yet initiate')
            setThubFeeB09(Number(result[69][3]) / 100)
            setThubCapB09(Number(ethers.utils.formatEther(String(result[70]))))
            setAllPowB09(Number(result[71]))

            setThubLvB10(Number(result[72][0]))
            const _nextDayThubB10 = new Date((Number(result[72][2]) * 1000) + (86400 * 1000))
            Number(result[72][2]) !== 0 ?
                setNextDayThubB10(_nextDayThubB10.toLocaleString('es-CL')) :
                setNextDayThubB10('not yet initiate')
            setThubFeeB10(Number(result[72][3]) / 100)
            setThubCapB10(Number(ethers.utils.formatEther(String(result[73]))))
            setAllPowB10(Number(result[74]))

            setThubLvB11(Number(result[75][0]))
            const _nextDayThubB11 = new Date((Number(result[75][2]) * 1000) + (86400 * 1000))
            Number(result[75][2]) !== 0 ?
                setNextDayThubB11(_nextDayThubB11.toLocaleString('es-CL')) :
                setNextDayThubB11('not yet initiate')
            setThubFeeB11(Number(result[75][3]) / 100)
            setThubCapB11(Number(ethers.utils.formatEther(String(result[76]))))
            setAllPowB11(Number(result[77]))

            setThubLvZ11(Number(result[78][0]))
            const _nextDayThubZ11 = new Date((Number(result[78][2]) * 1000) + (86400 * 1000))
            Number(result[78][2]) !== 0 ?
                setNextDayThubZ11(_nextDayThubZ11.toLocaleString('es-CL')) :
                setNextDayThubZ11('not yet initiate')
            setThubFeeZ11(Number(result[78][3]) / 100)
            setThubCapZ11(Number(ethers.utils.formatEther(String(result[79]))))
            setAllPowZ11(Number(result[80]))
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
                                disabled
                            ></input>
                            {false && address !== null && address !== undefined ? 
                                <div style={{maxHeight: "10px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0", fontSize: "12px"}} className="button">TRANSPORT</div> : 
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
