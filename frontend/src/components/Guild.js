import React from 'react'
import { ethers } from 'ethers'
import { getBalance, readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const cmdaonft = '0xA6B98E5F46e5daD1F0F39bD8678870d39A7D96b1'
const nftSlot = '0xB5fb4a445EE4882c8192680E2EaB0033C30e64BA'
const party = '0xd5E660a33Ce6D17Aa6584bF1a4DA50B495962df0'
const missionBaseCmd = '0x5222342bF1B94E5b65618b9e6c8e4D9b627AB518'
const baseCmdClaimer = '0x4cd3a0F5E4992059f23263aB17F71f2293bb495E'
const statBaseCmd = '0x7b61b5Eb38535A385BEBc137Cbe2F4F5996d3EC0'
const providerOP = new ethers.getDefaultProvider('https://opt-mainnet.g.alchemy.com/v2/0shzCCUF1JEPvKjqoEuftQcYrgIufNzE')
const providerBBQ = new ethers.getDefaultProvider('https://bbqchain-rpc.commudao.xyz')

const Guild = ({ config, intrasubModetext, callMode, navigate, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc721Abi, erc20Abi, nftSlotABI, partyABI, missionCMDBaseABI, statCMDRewardABI, baseCMDClaimerABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    const [addr, setAddr] = React.useState(address)  
    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftCol, setTransferNftCol] = React.useState(null)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState(null)
    const [startBlock, setStartBlock] = React.useState(0)
    const [nft, setNft] = React.useState([])
    const [characterSlot, setCharacterSlot] = React.useState(null)
    const [characterSlotLevel, setCharacterSlotLevel] = React.useState(null)
    const [hatSlot, setHatSlot] = React.useState(null)
    const [hatSlotLevel, setHatSlotLevel] = React.useState(null)
    const [clothSlot, setClothSlot] = React.useState(null)
    const [clothSlotLevel, setClothSlotLevel] = React.useState(null)
    const [accSlot, setAccSlot] = React.useState(null)
    const [accSlotLevel, setAccSlotLevel] = React.useState(null)
    const [backSlot, setBackSlot] = React.useState(null)
    const [backSlotLevel, setBackSlotLevel] = React.useState(null)
    const [shoesSlot, setShoesSlot] = React.useState(null)
    const [shoesSlotLevel, setShoesSlotLevel] = React.useState(null)
    const [weaponSlot, setWeaponSlot] = React.useState(null)
    const [wpSlotLevel, setWpSlotLevel] = React.useState(null)
    const [weaponSlot2, setWeapon2Slot] = React.useState(null)
    const [wpSlot2Level, setWpSlot2Level] = React.useState(null)
    const [accSlot2, setAccSlot2] = React.useState(null)
    const [accSlot2Level, setAccSlot2Level] = React.useState(null)
    const [accSlot3, setAccSlot3] = React.useState(null)
    const [accSlot3Level, setAccSlot3Level] = React.useState(null)
    const [accSlot4, setAccSlot4] = React.useState(null)
    const [accSlot4Level, setAccSlot4Level] = React.useState(null)
    const [accSlot5, setAccSlot5] = React.useState(null)
    const [accSlot5Level, setAccSlot5Level] = React.useState(null)
    const [accSlot6, setAccSlot6] = React.useState(null)
    const [accSlot6Level, setAccSlot6Level] = React.useState(null)
    const [soulSlot, setSoulSlot] = React.useState(null)
    const [soulSlotLevel, setSoulSlotLevel] = React.useState(null)
    const [badgeSlot, setBadgeSlot] = React.useState(null)
    const [badgeSlotLevel, setBadgeSlotLevel] = React.useState(null)
    const [allPower, setAllPower] = React.useState(0)
    const [rewardPending, setRewardPending] = React.useState(0)
    const [scmJBCBalance, setScmJBCBalance] = React.useState(0)
    const [gasBalance, setGasBalance] = React.useState(0)
    const [myParty, setMyParty] = React.useState(null)
    const [myPartyIndex, setMyPartyIndex] = React.useState(null)
    const [myMemberIndex, setMyMemberIndex] = React.useState(null)
    const [myRefuelStatus, setMyRefuelStatus] = React.useState(null)
    const [myPartyRefuelAt, setMyPartyRefuelAt] = React.useState(null)
    const [myAbiltoDelegate, setMyAbiltoDelegate] = React.useState(null)
    const [isBaseCmdDelegate, setIsBaseCmdDelegate] = React.useState(null)
    const [allCmpowMyParty, setAllCmpowMyParty] = React.useState(0)
    const [party1Name, setParty1Name] = React.useState(null)
    const [party1Logo, setParty1Logo] = React.useState(null)
    const [party1DelegateBaseCMD, setParty1DelegateBaseCMD] = React.useState(0)
    const [allCmpowParty1, setAllCmpowParty1] = React.useState(0)
    const [totalRewardParty1, setTotalRewardParty1] = React.useState(0)
    const [party2Name, setParty2Name] = React.useState(null)
    const [party2Logo, setParty2Logo] = React.useState(null)
    const [party2DelegateBaseCMD, setParty2DelegateBaseCMD] = React.useState(0)
    const [allCmpowParty2, setAllCmpowParty2] = React.useState(0)
    const [totalRewardParty2, setTotalRewardParty2] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        if (intrasubModetext === undefined) {
            navigate('/guild/profile/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext)
        } else if (address === undefined) {
            navigate('/guild/profile/null')
        } else {
            navigate('/guild/profile/' + address)
        }
        const cmdaonftSC = new ethers.Contract(cmdaonft, erc721Abi, providerOP)
        const missionBaseCmdSC = new ethers.Contract(missionBaseCmd, missionCMDBaseABI, providerBBQ)
        setNft([])
        
        const thefetch = async () => {
            const cmdBal = addr !== null ?
                await getBalance(config, { address: addr, chainId: 190 }) :
                {formatted: 0}
            const nftEQ = addr !== null ? await readContract(config, {
                address: nftSlot,
                abi: nftSlotABI,
                functionName: 'nftEquip',
                args: [addr],
                chainId: 10,
            }) : null
            const nftEQ2 = addr !== null ? await readContract(config, {
                address: nftSlot,
                abi: nftSlotABI,
                functionName: 'nftEquip2',
                args: [addr],
                chainId: 10,
            }) : null
            const data = addr !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[0])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[1])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[2])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[3])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[4])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[5])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[6])],
                        chainId: 10,
                    },
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ2[7])],
                        chainId: 10,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'baseReward',
                        args: [addr],
                        chainId: 190,
                    },
                    {
                        address: nftSlot,
                        abi: nftSlotABI,
                        functionName: 'nftStatus',
                        args: [addr],
                        chainId: 10,
                    },
                    {
                        address: '0x336C4EaE525948C8EF79b74b549C048f07639315',
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [addr],
                        chainId: 8899,
                    },
                    {
                        address: nftSlot,
                        abi: nftSlotABI,
                        functionName: 'nonTransferSCM',
                        args: [addr],
                        chainId: 10,
                    },
                    {
                        address: baseCmdClaimer,
                        abi: baseCMDClaimerABI,
                        functionName: 'claimedReward',
                        args: [addr],
                        chainId: 190,
                    },
                ],
            }) : [
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'},
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0},
            ]

            const data0 = await readContracts(config, {
                contracts: [
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'partyName',
                        args: [1],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'partyLogo',
                        args: [1],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'partyBody',
                        args: [1],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'partyName',
                        args: [2],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'partyLogo',
                        args: [2],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'partyBody',
                        args: [2],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [1, 0],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [1, 1],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [1, 2],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [1, 3],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [1, 4],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [2, 0],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [2, 1],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [2, 2],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [2, 3],
                        chainId: 190,
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'isAllRefuel',
                        args: [2, 4],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'startBlock',
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'endBlock',
                        chainId: 190,
                    },
                ],
            })
            
            let nfts = []
            let res_main_char = null
            try {
                if (data[0].status === 'success') {
                    if (data[0].result === 'ipfs://QmRq29Y7hCHLEWBvG1rBjSE8noePUbZrY14diTe1xdQLJ4') {
                        res_main_char = await fetch('https://gateway.commudao.xyz/ipfs/QmXVg9vc7meyMH4S4idWFUS7B1tNMgptW5kDBg9Eq4GDco')
                    } else {
                        res_main_char = await fetch(data[0].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    }
                } else {
                    res_main_char = null
                }
            } catch {}
            const nft_main_char = res_main_char !== null ? await res_main_char.json() : {image: null, name: null}
            const nftEQ_main_char_Img = nft_main_char.image !== null ? nft_main_char.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_char_Name = nft_main_char.name
            if (res_main_char !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[0]),
                    Name: nftEQ_main_char_Name,
                    Image: nftEQ_main_char_Img,
                    Description: nft_main_char.description,
                    Attribute: nft_main_char.attributes,
                    RewardPerSec: Number(nftEQ[0]) % 100000,
                    isStaked: true,
                    Slot: 1
                })
            }
            let res_main_acc1 = null
            try {
                res_main_acc1 = data[1].status === 'success' ? await fetch(data[1].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc = res_main_acc1 !== null ? await res_main_acc1.json() : {image: null, name: null}
            const nftEQ_main_acc_Img = nft_main_acc.image !== null ? nft_main_acc.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc_Name = nft_main_acc.name
            if (res_main_acc1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[3]),
                    Name: nftEQ_main_acc_Name,
                    Image: nftEQ_main_acc_Img,
                    Description: nft_main_acc.description,
                    Attribute: nft_main_acc.attributes,
                    RewardPerSec: Number(nftEQ[3]) % 100000,
                    isStaked: true,
                    Slot: 4
                })
            }
            let res_main_back = null
            try {
                res_main_back = data[2].status === 'success' ? await fetch(data[2].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_back = res_main_back !== null ? await res_main_back.json() : {image: null, name: null}
            const nftEQ_main_back_Img = nft_main_back.image !== null ? nft_main_back.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_back_Name = nft_main_back.name
            if (res_main_back !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[4]),
                    Name: nftEQ_main_back_Name,
                    Image: nftEQ_main_back_Img,
                    Description: nft_main_back.description,
                    Attribute: nft_main_back.attributes,
                    RewardPerSec: Number(nftEQ[4]) % 100000,
                    isStaked: true,
                    Slot: 5
                })
            }
            let res_main_shoes = null
            try {
                res_main_shoes = data[3].status === 'success' ? await fetch(data[3].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_shoes = res_main_shoes !== null ? await res_main_shoes.json() : {image: null, name: null}
            const nftEQ_main_shoes_Img = nft_main_shoes.image !== null ? nft_main_shoes.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_shoes_Name = nft_main_shoes.name
            if (res_main_shoes !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[5]),
                    Name: nftEQ_main_shoes_Name,
                    Image: nftEQ_main_shoes_Img,
                    Description: nft_main_shoes.description,
                    Attribute: nft_main_shoes.attributes,
                    RewardPerSec: Number(nftEQ[5]) % 100000,
                    isStaked: true,
                    Slot: 6
                })
            }
            let res_main_wp1 = null
            try {
                res_main_wp1 = data[4].status === 'success' ? await fetch(data[4].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_wp1 = res_main_wp1 !== null ? await res_main_wp1.json() : {image: null, name: null}
            const nftEQ_main_wp1_Img = nft_main_wp1.image !== null ? nft_main_wp1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_wp1_Name = nft_main_wp1.name
            if (res_main_wp1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[6]),
                    Name: nftEQ_main_wp1_Name,
                    Image: nftEQ_main_wp1_Img,
                    Description: nft_main_wp1.description,
                    Attribute: nft_main_wp1.attributes,
                    RewardPerSec: Number(nftEQ[6]) % 100000,
                    isStaked: true,
                    Slot: 7
                })
            }
            let res_main_cloth = null
            try {
                res_main_cloth = data[5].status === 'success' ? await fetch(data[5].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_cloth = res_main_cloth !== null ? await res_main_cloth.json() : {image: null, name: null}
            const nftEQ_main_cloth_Img = nft_main_cloth.image !== null ? nft_main_cloth.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_cloth_Name = nft_main_cloth.name
            if (res_main_cloth !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[2]),
                    Name: nftEQ_main_cloth_Name,
                    Image: nftEQ_main_cloth_Img,
                    Description: nft_main_cloth.description,
                    Attribute: nft_main_cloth.attributes,
                    RewardPerSec: Number(nftEQ[2]) % 100000,
                    isStaked: true,
                    Slot: 3
                })
            }
            let res_main_hat = null
            try {
                res_main_hat = data[6].status === 'success' ? await fetch(data[6].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_hat = res_main_hat !== null ? await res_main_hat.json() : {image: null, name: null}
            const nftEQ_main_hat_Img = nft_main_hat.image !== null ? nft_main_hat.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_hat_Name = nft_main_hat.name
            if (res_main_hat !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[1]),
                    Name: nftEQ_main_hat_Name,
                    Image: nftEQ_main_hat_Img,
                    Description: nft_main_hat.description,
                    Attribute: nft_main_hat.attributes,
                    RewardPerSec: Number(nftEQ[1]) % 100000,
                    isStaked: true,
                    Slot: 2
                })
            }
            let res_main_wp2 = null
            try {
                res_main_wp2 = data[7].status === 'success' ? await fetch(data[7].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_wp2 = res_main_wp2 !== null ? await res_main_wp2.json() : {image: null, name: null}
            const nftEQ_main_wp2_Img = nft_main_wp2.image !== null ? nft_main_wp2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_wp2_Name = nft_main_wp2.name
            if (res_main_wp2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[0]),
                    Name: nftEQ_main_wp2_Name,
                    Image: nftEQ_main_wp2_Img,
                    Description: nft_main_wp2.description,
                    Attribute: nft_main_wp2.attributes,
                    RewardPerSec: Number(nftEQ2[0]) % 100000,
                    isStaked: true,
                    Slot: 14
                })
            }
            let res_main_acc2 = null
            try {
                res_main_acc2 = data[8].status === 'success' ? await fetch(data[8].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc2 = res_main_acc2 !== null ? await res_main_acc2.json() : {image: null, name: null}
            const nftEQ_main_acc2_Img = nft_main_acc2.image !== null ? nft_main_acc2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc2_Name = nft_main_acc2.name
            if (res_main_acc2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[1]),
                    Name: nftEQ_main_acc2_Name,
                    Image: nftEQ_main_acc2_Img,
                    Description: nft_main_acc2.description,
                    Attribute: nft_main_acc2.attributes,
                    RewardPerSec: Number(nftEQ2[1]) % 100000,
                    isStaked: true,
                    Slot: 9
                })
            }
            let res_main_acc3 = null
            try {
                res_main_acc3 = data[9].status === 'success' ? await fetch(data[9].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc3 = res_main_acc3 !== null ? await res_main_acc3.json() : {image: null, name: null}
            const nftEQ_main_acc3_Img = nft_main_acc3.image !== null ? nft_main_acc3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc3_Name = nft_main_acc3.name
            if (res_main_acc3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[2]),
                    Name: nftEQ_main_acc3_Name,
                    Image: nftEQ_main_acc3_Img,
                    Description: nft_main_acc3.description,
                    Attribute: nft_main_acc3.attributes,
                    RewardPerSec: Number(nftEQ2[2]) % 100000,
                    isStaked: true,
                    Slot: 10
                })
            }
            let res_main_acc4 = null
            try {
                res_main_acc4 = data[10].status === 'success' ? await fetch(data[10].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc4 = res_main_acc4 !== null ? await res_main_acc4.json() : {image: null, name: null}
            const nftEQ_main_acc4_Img = nft_main_acc4.image !== null ? nft_main_acc4.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc4_Name = nft_main_acc4.name
            if (res_main_acc4 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[3]),
                    Name: nftEQ_main_acc4_Name,
                    Image: nftEQ_main_acc4_Img,
                    Description: nft_main_acc4.description,
                    Attribute: nft_main_acc4.attributes,
                    RewardPerSec: Number(nftEQ2[3]) % 100000,
                    isStaked: true,
                    Slot: 11
                })
            }
            let res_main_acc5 = null
            try {
                res_main_acc5 = data[11].status === 'success' ? await fetch(data[11].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc5 = res_main_acc5 !== null ? await res_main_acc5.json() : {image: null, name: null}
            const nftEQ_main_acc5_Img = nft_main_acc5.image !== null ? nft_main_acc5.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc5_Name = nft_main_acc5.name
            if (res_main_acc5 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[4]),
                    Name: nftEQ_main_acc5_Name,
                    Image: nftEQ_main_acc5_Img,
                    Description: nft_main_acc5.description,
                    Attribute: nft_main_acc5.attributes,
                    RewardPerSec: Number(nftEQ2[4]) % 100000,
                    isStaked: true,
                    Slot: 12
                })
            }
            let res_main_acc6 = null
            try {
                res_main_acc6 = data[12].status === 'success' ? await fetch(data[12].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_acc6 = res_main_acc6 !== null ? await res_main_acc6.json() : {image: null, name: null}
            const nftEQ_main_acc6_Img = nft_main_acc6.image !== null ? nft_main_acc6.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_acc6_Name = nft_main_acc6.name
            if (res_main_acc6 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[5]),
                    Name: nftEQ_main_acc6_Name,
                    Image: nftEQ_main_acc6_Img,
                    Description: nft_main_acc6.description,
                    Attribute: nft_main_acc6.attributes,
                    RewardPerSec: Number(nftEQ2[5]) % 100000,
                    isStaked: true,
                    Slot: 13
                })
            }
            let res_main_soul = null
            try {
                if (data[13].status === 'success') {
                    if (data[13].result === 'ipfs://QmRq29Y7hCHLEWBvG1rBjSE8noePUbZrY14diTe1xdQLJ4') {
                        res_main_soul = await fetch('https://gateway.commudao.xyz/ipfs/QmXVg9vc7meyMH4S4idWFUS7B1tNMgptW5kDBg9Eq4GDco')
                    } else {
                        res_main_soul = await fetch(data[13].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    }
                } else {
                    res_main_soul = null
                }
            } catch {}
            const nft_main_soul = res_main_soul !== null ? await res_main_soul.json() : {image: null, name: null}
            const nftEQ_main_soul_Img = nft_main_soul.image !== null ? nft_main_soul.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_soul_Name = nft_main_soul.name
            if (res_main_soul !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[6]),
                    Name: nftEQ_main_soul_Name,
                    Image: nftEQ_main_soul_Img,
                    Description: nft_main_soul.description,
                    Attribute: nft_main_soul.attributes,
                    RewardPerSec: Number(nftEQ2[6]) % 100000,
                    isStaked: true,
                    Slot: 15
                })
            }
            let res_main_badge = null
            try {
                res_main_badge = data[14].status === 'success' ? await fetch(data[14].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft_main_badge = res_main_badge !== null ? await res_main_badge.json() : {image: null, name: null}
            const nftEQ_main_badge_Img = nft_main_badge.image !== null ? nft_main_badge.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_main_badge_Name = nft_main_badge.name
            if (res_main_badge !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ2[7]),
                    Name: nftEQ_main_badge_Name,
                    Image: nftEQ_main_badge_Img,
                    Description: nft_main_badge.description,
                    Attribute: nft_main_badge.attributes,
                    RewardPerSec: Number(nftEQ2[7]) % 100000,
                    isStaked: true,
                    Slot: 8
                })
            }
            //const refuelAt = Number(nftStatus[1])
            //const isStaked = nftStatus[2]
            const allPow = Number(data[16].result)
            const scmJBCBal = Number(ethers.utils.formatEther(data[17].result)) + (ethers.utils.formatEther(data[18].result) * 200000)
            const rewardpending = Number(ethers.utils.formatEther(String(data[15].result))) - Number(ethers.utils.formatEther(String(data[19].result)))
            const party1name = data0[0].result
            const party1logo = data0[1].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")
            const party1body = data0[2].result
            const party2name = data0[3].result
            const party2logo = data0[4].result.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")
            const party2body = data0[5].result
            const isMem1Party1Refuel = data0[6].result
            const isMem2Party1Refuel = data0[7].result
            const isMem3Party1Refuel = data0[8].result
            const isMem4Party1Refuel = data0[9].result
            const isMem5Party1Refuel = data0[10].result
            const isMem1Party2Refuel = data0[11].result
            const isMem2Party2Refuel = data0[12].result
            const isMem3Party2Refuel = data0[13].result
            const isMem4Party2Refuel = data0[14].result
            const isMem5Party2Refuel = data0[15].result
            const startblock = Number(data0[16].result)
            const endblock = Number(data0[17].result)

            const delegateParty1Mission1Filter = await missionBaseCmdSC.filters.ConfirmDelegate(1, null, null)
            const delegateParty1Mission1Event = await missionBaseCmdSC.queryFilter(delegateParty1Mission1Filter, 19987208, "latest")
            const delegateParty1Mission1Map = await Promise.all(delegateParty1Mission1Event.map(async (obj) => String(obj.args.endBlock)))
            const isDelegateParty1Mission1 = delegateParty1Mission1Map.indexOf(String(endblock)) !== -1 ? true : false
            const delegateParty2Mission1Filter = await missionBaseCmdSC.filters.ConfirmDelegate(2, null, null)
            const delegateParty2Mission1Event = await missionBaseCmdSC.queryFilter(delegateParty2Mission1Filter, 19987208, "latest")
            const delegateParty2Mission1Map = await Promise.all(delegateParty2Mission1Event.map(async (obj) => String(obj.args.endBlock)))
            const isDelegateParty2Mission1 = delegateParty2Mission1Map.indexOf(String(endblock)) !== -1 ? true : false
            console.log("Party 1: ", isMem1Party1Refuel, isMem2Party1Refuel, isMem3Party1Refuel, isMem4Party1Refuel, isMem5Party1Refuel, isDelegateParty1Mission1)
            console.log("Party 2: ", isMem1Party2Refuel, isMem2Party2Refuel, isMem3Party2Refuel, isMem4Party2Refuel, isMem5Party2Refuel, isDelegateParty2Mission1)

            const data4 = await readContracts(config, {
                contracts: [
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party1body[0]],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party1body[1]],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party1body[2]],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party1body[3]],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party1body[4]],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party2body[0]],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party2body[1]],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party2body[2]],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party2body[3]],
                        chainId: 190,
                    },
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'cmpow',
                        args: [party2body[4]],
                        chainId: 190,
                    },
                    {
                        address: statBaseCmd,
                        abi: statCMDRewardABI,
                        functionName: 'baseReward',
                        args: [1, 1],
                        chainId: 190,
                    },
                    {
                        address: statBaseCmd,
                        abi: statCMDRewardABI,
                        functionName: 'baseReward',
                        args: [2, 1],
                        chainId: 190,
                    },
                ],
            })
            const allcmpowparty1 = isDelegateParty1Mission1 ? Number(data4[0].result) + Number(data4[1].result) + Number(data4[2].result) + Number(data4[3].result) + Number(data4[4].result) : 0
            const allcmpowparty2 = isDelegateParty2Mission1 ? Number(data4[5].result) + Number(data4[6].result) + Number(data4[7].result) + Number(data4[8].result) + Number(data4[9].result) : 0
            const totalrewardparty1 = data4[10].result
            const totalrewardparty2 = data4[11].result
            let myparty = null
            let partyindex = null
            let memberindex = null
            let memberrefuel = null
            let mypartyrefuelat = null
            let abilitytodelegate = false
            let isDelegate1 = null
            let mypartyallcmpow = 0
            if (addr !== null) {
                if (party1body[0].toUpperCase() === addr.toUpperCase()) {
                    myparty = party1name
                    partyindex = 1
                    memberindex = 0
                    memberrefuel = isMem1Party1Refuel
                    mypartyrefuelat = party1body[5]
                    isDelegate1 = isDelegateParty1Mission1
                    mypartyallcmpow = allcmpowparty1
                    // simple validation need to be fixed later
                    abilitytodelegate = isMem1Party1Refuel && isMem2Party1Refuel && isMem3Party1Refuel && isMem4Party1Refuel && isMem5Party1Refuel ? true : false
                } else if (party1body[1].toUpperCase() === addr.toUpperCase()) {
                    myparty = party1name
                    partyindex = 1
                    memberindex = 1
                    memberrefuel = isMem2Party1Refuel
                    mypartyrefuelat = party1body[5]
                    isDelegate1 = isDelegateParty1Mission1
                    mypartyallcmpow = allcmpowparty1
                } else if (party1body[2].toUpperCase() === addr.toUpperCase()) {
                    myparty = party1name
                    partyindex = 1
                    memberindex = 2
                    memberrefuel = isMem3Party1Refuel
                    mypartyrefuelat = party1body[5]
                    isDelegate1 = isDelegateParty1Mission1
                    mypartyallcmpow = allcmpowparty1
                } else if (party1body[3].toUpperCase() === addr.toUpperCase()) {
                    myparty = party1name
                    partyindex = 1
                    memberindex = 3
                    memberrefuel = isMem4Party1Refuel
                    mypartyrefuelat = party1body[5]
                    isDelegate1 = isDelegateParty1Mission1
                    mypartyallcmpow = allcmpowparty1
                } else if (party1body[4].toUpperCase() === addr.toUpperCase()) {
                    myparty = party1name
                    partyindex = 1
                    memberindex = 4
                    memberrefuel = isMem5Party1Refuel
                    mypartyrefuelat = party1body[5]
                    isDelegate1 = isDelegateParty1Mission1
                    mypartyallcmpow = allcmpowparty1
                } else if (party2body[0].toUpperCase() === addr.toUpperCase()) {
                    myparty = party2name
                    partyindex = 2
                    memberindex = 0
                    memberrefuel = isMem1Party2Refuel
                    mypartyrefuelat = party2body[5]
                    isDelegate1 = isDelegateParty2Mission1
                    mypartyallcmpow = allcmpowparty2
                    // simple validation need to be fixed later
                    abilitytodelegate = isMem1Party2Refuel && isMem2Party2Refuel && isMem3Party2Refuel && isMem4Party2Refuel && isMem5Party2Refuel ? true : false
                } else if (party2body[1].toUpperCase() === addr.toUpperCase()) {
                    myparty = party2name
                    partyindex = 2
                    memberindex = 1
                    memberrefuel = isMem2Party2Refuel
                    mypartyrefuelat = party2body[5]
                    isDelegate1 = isDelegateParty2Mission1
                    mypartyallcmpow = allcmpowparty2
                } else if (party2body[2].toUpperCase() === addr.toUpperCase()) {
                    myparty = party2name
                    partyindex = 2
                    memberindex = 2
                    memberrefuel = isMem3Party2Refuel
                    mypartyrefuelat = party2body[5]
                    isDelegate1 = isDelegateParty2Mission1
                    mypartyallcmpow = allcmpowparty2
                } else if (party2body[3].toUpperCase() === addr.toUpperCase()) {
                    myparty = party2name
                    partyindex = 2
                    memberindex = 3
                    memberrefuel = isMem4Party2Refuel
                    mypartyrefuelat = party2body[5]
                    isDelegate1 = isDelegateParty2Mission1
                    mypartyallcmpow = allcmpowparty2
                } else if (party2body[4].toUpperCase() === addr.toUpperCase()) {
                    myparty = party2name
                    partyindex = 2
                    memberindex = 4
                    memberrefuel = isMem5Party2Refuel
                    mypartyrefuelat = party2body[5]
                    isDelegate1 = isDelegateParty2Mission1
                    mypartyallcmpow = allcmpowparty2
                }
            }
            
            let walletRemoveDup = []
            if (addr !== null) {
                const walletFilter = await cmdaonftSC.filters.Transfer(null, addr, null)
                const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 123743421, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 10
                    }
                ))
            }) : null
            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && addr !== null; i++) {
                if (data2[i].result.toUpperCase() === addr.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            const data3 = addr !== null ? await readContracts(config, {
                contracts: yournftwallet.map((item) => (
                    {
                        address: cmdaonft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 10
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    let response
                    if (nftipfs === 'ipfs://QmRq29Y7hCHLEWBvG1rBjSE8noePUbZrY14diTe1xdQLJ4') {
                        response = await fetch('https://gateway.commudao.xyz/ipfs/QmXVg9vc7meyMH4S4idWFUS7B1tNMgptW5kDBg9Eq4GDco')
                    } else {
                        response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    }
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 1,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }
            
            return [
                nfts, 
                nftEQ_main_char_Img, nftEQ_main_char_Name, nftEQ_main_acc_Img, nftEQ_main_acc_Name, nftEQ_main_back_Img, nftEQ_main_back_Name, nftEQ_main_shoes_Img, nftEQ_main_shoes_Name, nftEQ_main_wp1_Img, nftEQ_main_wp1_Name, nftEQ_main_cloth_Img, nftEQ_main_cloth_Name, nftEQ_main_hat_Img, nftEQ_main_hat_Name,
                nftEQ_main_wp2_Img, nftEQ_main_wp2_Name, nftEQ_main_acc2_Img, nftEQ_main_acc2_Name, nftEQ_main_acc3_Img, nftEQ_main_acc3_Name, nftEQ_main_acc4_Img, nftEQ_main_acc4_Name, nftEQ_main_acc5_Img, nftEQ_main_acc5_Name, nftEQ_main_acc6_Img, nftEQ_main_acc6_Name, nftEQ_main_soul_Img, nftEQ_main_soul_Name, nftEQ_main_badge_Img, nftEQ_main_badge_Name,
                allPow, /*refuelAt,*/ rewardpending, scmJBCBal, cmdBal,
                myparty, partyindex, memberindex, memberrefuel, mypartyrefuelat, abilitytodelegate, isDelegate1, mypartyallcmpow,
                party1name, party1logo, isDelegateParty1Mission1, allcmpowparty1, party2name, party2logo, isDelegateParty2Mission1, allcmpowparty2,
                totalrewardparty1, totalrewardparty2,
                startblock,
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
            setNft(result[0])
            setCharacterSlot(result[1])
            if (result[2] !== null && result[2].slice(-1) === "]" && result[2].slice(-3, -2) === ".") {
                setCharacterSlotLevel(result[2].slice(-2, -1))
            } else if (result[2] !== null && result[2].slice(-1) === "]" && result[2].slice(-4, -3) === ".") {
                setCharacterSlotLevel(result[2].slice(-3, -1))
            } else {
                setCharacterSlotLevel(null)
            }
            setAccSlot(result[3])
            result[4] !== null && result[4].slice(-2, -1) === "+" ? setAccSlotLevel(result[4].slice(-1)) : setAccSlotLevel(null)
            setBackSlot(result[5])
            result[6] !== null && result[6].slice(-2, -1) === "+" ? setBackSlotLevel(result[6].slice(-1)) : setBackSlotLevel(null)
            setShoesSlot(result[7])
            result[8] !== null && result[8].slice(-2, -1) === "+" ? setShoesSlotLevel(result[8].slice(-1)) : setShoesSlotLevel(null)
            setWeaponSlot(result[9])
            result[10] !== null && result[10].slice(-2, -1) === "+" ? setWpSlotLevel(result[10].slice(-1)) : setWpSlotLevel(null)
            setClothSlot(result[11])
            result[12] !== null && result[12].slice(-2, -1) === "+" ? setClothSlotLevel(result[12].slice(-1)) : setClothSlotLevel(null)
            setHatSlot(result[13])
            result[14] !== null && result[14].slice(-2, -1) === "+" ? setHatSlotLevel(result[14].slice(-1)) : setHatSlotLevel(null)
            setWeapon2Slot(result[15])
            result[16] !== null && result[16].slice(-2, -1) === "+" ? setWpSlot2Level(result[16].slice(-1)) : setWpSlot2Level(null)
            setAccSlot2(result[17])
            result[18] !== null && result[18].slice(-2, -1) === "+" ? setAccSlot2Level(result[18].slice(-1)) : setAccSlot2Level(null)
            setAccSlot3(result[19])
            result[20] !== null && result[20].slice(-2, -1) === "+" ? setAccSlot3Level(result[20].slice(-1)) : setAccSlot3Level(null)
            setAccSlot4(result[21])
            result[22] !== null && result[22].slice(-2, -1) === "+" ? setAccSlot4Level(result[22].slice(-1)) : setAccSlot4Level(null)
            setAccSlot5(result[23])
            result[24] !== null && result[24].slice(-2, -1) === "+" ? setAccSlot5Level(result[24].slice(-1)) : setAccSlot5Level(null)
            setAccSlot6(result[25])
            result[26] !== null && result[26].slice(-2, -1) === "+" ? setAccSlot6Level(result[26].slice(-1)) : setAccSlot6Level(null)
            setSoulSlot(result[27])
            result[28] !== null && result[28].slice(-2, -1) === "+" ? setSoulSlotLevel(result[28].slice(-1)) : setSoulSlotLevel(null)
            setBadgeSlot(result[29])
            result[30] !== null && result[30].slice(-2, -1) === "+" ? setBadgeSlotLevel(result[30].slice(-1)) : setBadgeSlotLevel(null)
            setAllPower(result[31])
            setRewardPending(result[32])
            setScmJBCBalance(result[33])
            setGasBalance(result[34].formatted)
            setMyParty(result[35])
            setMyPartyIndex(result[36])
            setMyMemberIndex(result[37])
            setMyRefuelStatus(result[38])
            setMyPartyRefuelAt(result[39])
            setMyAbiltoDelegate(result[40])
            setIsBaseCmdDelegate(result[41])
            setAllCmpowMyParty(result[42])
            setParty1Name(result[43])
            setParty1Logo(result[44])
            setParty1DelegateBaseCMD(result[45])
            setAllCmpowParty1(result[46])
            setParty2Name(result[47])
            setParty2Logo(result[48])
            setParty2DelegateBaseCMD(result[49])
            setAllCmpowParty2(result[50])
            setTotalRewardParty1(ethers.utils.formatEther(String(result[51])))
            setTotalRewardParty2(ethers.utils.formatEther(String(result[52])))
            setStartBlock(result[53])
        })

    }, [config, address, addr, intrasubModetext, navigate, txupdate, erc721Abi, erc20Abi, nftSlotABI, partyABI, missionCMDBaseABI, statCMDRewardABI, baseCMDClaimerABI])

    const transferToHandle = (event) => { setTransferTo(event.target.value) }
    const transferNFT = (_col, _nftid) => {
        setIsTransferModal(true)
        setTransferNftCol(_col)
        setTransferNftid(_nftid)
        for (let i = 0; i <= nft.length - 1; i++) {
            if (nft[i].Id === Number(_nftid)) {
                setTransferName(nft[i].Name)
            }
        }
    }
    const transferNFTConfirm = async () => {
        setisLoading(true)
        let addr = ''
        if (transferNftCol === 1) {
            addr = cmdaonft
        }
        try {
            let { request } = await simulateContract(config, {
                address: addr,
                abi: erc721Abi,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
                chainId: 10,
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const equipNft = async (_nftid, slot) => {
        setisLoading(true)
        let nftaddr = cmdaonft
        try {
            const nftAllow = await readContract(config, {
                address: nftaddr,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
                chainId: 10,
            })
            if (nftAllow.toUpperCase() !== nftSlot.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: nftaddr,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [nftSlot, _nftid],
                    chainId: 10,
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: nftSlot,
                abi: nftSlotABI,
                functionName: 'equip',
                args: [_nftid, slot],
                value: ethers.utils.parseEther('0.00005'),
                chainId: 10,
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const unequipNft = async (_slot) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: nftSlot,
                abi: nftSlotABI,
                functionName: 'unstake',
                args: [_slot],
                chainId: 10,
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const refuelGas = async () => {
        setisLoading(true)
        try {
            console.log(myPartyIndex, myMemberIndex)
            let { request } = await simulateContract(config, {
                address: party,
                abi: partyABI,
                functionName: 'refuel',
                args: [myPartyIndex, myMemberIndex],
                value: ethers.utils.parseEther('10'),
                chainId: 190,
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const delegateMission = async () => {
        setisLoading(true)
        try {
            console.log(myPartyIndex)
            let { request } = await simulateContract(config, {
                address: party,
                abi: partyABI,
                functionName: 'delegateMission',
                args: [myPartyIndex, '0x5222342bF1B94E5b65618b9e6c8e4D9b627AB518', 100],
                value: ethers.utils.parseEther('1'),
                chainId: 190,
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const confirmMission = async () => {
        setisLoading(true)
        try {
            console.log(myPartyIndex)
            let { request } = await simulateContract(config, {
                address: missionBaseCmd,
                abi: missionCMDBaseABI,
                functionName: 'confirmDelegate',
                args: [myPartyIndex],
                chainId: 190,
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const claimReward = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: baseCmdClaimer,
                abi: baseCMDClaimerABI,
                functionName: 'claimReward',
                args: [address],
                chainId: 190,
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <>
            {isTransferModal &&
                <div className="centermodal">
                    <div className="wrapper">
                        <div className="bold" style={{width: "500px", height: "250px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", fontSize: "40px", letterSpacing: "3px"}}>
                            <div style={{fontSize: "20px"}}>{transferName}</div>
                            <input style={{width: "80%", padding: "10px", fontSize: "20px"}} value={transferTo} onChange={transferToHandle} placeholder="Enter 0x..."></input>
                            <div className="button" style={{width: "50%"}} onClick={transferNFTConfirm}>TRANSFER</div>
                            <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsTransferModal(false)}>CLOSE</div>
                        </div>
                    </div>
                </div>
            }
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner">
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>Guild</div>
                </div>
                <div className="SubfieldBanner"></div>
            </div>
            
            {address !== null && chain !== undefined && (chain.id !== 10 && chain.id !== 190) ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to OP Mainnet/BBQ Chain.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{margin: "0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1540px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "#FFFFFF99", width: "370px", height: "400px", margin: "10px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-start", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", color: "rgb(0, 209, 255)"}}>
                                        {addr !== null &&
                                            <>
                                                {myPartyRefuelAt >= startBlock ?
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Party Already Delegated</div>
                                                    </> :
                                                    <>
                                                        {myRefuelStatus ?
                                                            <>
                                                                <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                                <div>{myMemberIndex !== null && <>Member {myMemberIndex + 1}: </>}Already Refuel</div>
                                                            </> :
                                                            <>
                                                                <div style={{background: "red", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                                <div>{myMemberIndex !== null && <>Member {myMemberIndex + 1}: </>}Not Refuel</div>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    {intrasubModetext !== null && intrasubModetext !== undefined && intrasubModetext.length === 42 ?
                                        <><div>ADDRESS</div><div>{intrasubModetext.slice(0, 4) + "..." + intrasubModetext.slice(-4)}</div></> :
                                        <><div>ADDRESS</div><div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    PARTY 
                                    {myParty !== null ?
                                        <>
                                            {myParty === party1Name &&
                                                <div style={{display: "flex", flexDirection: "row", alignItems: "flex-end"}}>
                                                    <img src={party1Logo} height="18" alt="Can not load metadata."/>
                                                    <div style={{marginLeft: "5px"}}>{party1Name}</div>
                                                </div>
                                            }
                                            {myParty === party2Name && 
                                                <div style={{display: "flex", flexDirection: "row", alignItems: "flex-end"}}>
                                                    <img src={party2Logo} height="20" alt="Can not load metadata."/>
                                                    <div style={{marginLeft: "5px"}}>{party2Name}</div>
                                                </div>
                                            }
                                        </> :
                                        <div>...</div>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    GUILD 
                                    <div>TBD</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    USER LEVEL 
                                    <div>TBD</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    PARTY LEVEL 
                                    <div>TBD</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    GUILD LEVEL 
                                    <div>TBD</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    CMPOW 
                                    <div>{Number(allPower).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    PARTY BOOSTER
                                    <div>TBD</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    GUILD BOOSTER
                                    <div>TBD</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    SCM POINT BOOSTER
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <div style={{marginLeft: "5px"}}>{Number(scmJBCBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                    DELEGABLE CMPOW 
                                    <div>{Number(allPower) !== 0 ? (Number(allPower) + Number(scmJBCBalance)).toLocaleString('en-US', {maximumFractionDigits:0}) : 0}</div>
                                </div>

                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    PARTY CONCENTRATION 
                                    <div>{allCmpowMyParty !== 0 ? Number((allPower / allCmpowMyParty * 100).toFixed(2)) : '0.00'}%</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    GUILD CONCENTRATION 
                                    <div>TBD</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingBottom: "20px", marginBottom: "10px", borderBottom: "1px solid"}}>
                                    MISSION REWARD 
                                    <div>{Number(rewardPending).toLocaleString('en-US', {maximumFractionDigits:3})} $CMD</div>
                                </div>
                                {address !== null && intrasubModetext !== undefined ?
                                        <>
                                            {address.toUpperCase() === intrasubModetext.toUpperCase() ?
                                                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                                                    {chain.id === 190 ?
                                                        <>
                                                            {Number(allPower) !== 0 && Number(gasBalance) >= 10 && !myRefuelStatus && myPartyRefuelAt < startBlock ?
                                                                <div style={{alignSelf: "center"}} className="button" onClick={refuelGas}>REFUEL GAS</div> :
                                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                            }
                                                            {Number(rewardPending) > 0 ?
                                                                <div style={{marginLeft: "5px", alignSelf: "center", background: "#67BAA7"}} className="button" onClick={claimReward}>CLAIM REWARD</div> :
                                                                <div style={{marginLeft: "5px", alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">CLAIM REWARD</div>
                                                            }
                                                        </> :
                                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">SWITCH TO BBQ CHAIN</div>
                                                    }
                                                </div> :
                                                <div style={{height: "41px"}}></div>
                                            }
                                        </> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div className='slotbox noscroll'>
                                <div style={{position: "relative", width: "150px", height: "400px", margin: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {accSlot !== null ?
                                        <img src={accSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "65px", fontSize: "25px"}}>+{accSlotLevel}</div>}
                                    {accSlot2 !== null ?
                                        <img src={accSlot2} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot2Level !== null && <div className="slotlevel" style={{position: "absolute", top: "217.5px", fontSize: "25px"}}>+{accSlot2Level}</div>}
                                    {accSlot3 !== null ?
                                        <img src={accSlot3} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot3Level !== null && <div className="slotlevel" style={{position: "absolute", top: "365px", fontSize: "25px"}}>+{accSlot3Level}</div>}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", margin: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {hatSlot !== null ?
                                        <img src={hatSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmZvuiGgx38WFMGFtcrfU4NHf17Sg5nHRZRDoVsWufZjC9" width="100px" alt="Can not load metadata." />
                                    }
                                    {hatSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "65px", fontSize: "25px"}}>+{hatSlotLevel}</div>}
                                    {clothSlot !== null ?
                                        <img src={clothSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmPiUeAzB1tbMCY4eYJ1EFNJfq8NxtgNFMidFi9RymiEjh" width="100px" alt="Can not load metadata." />
                                    }
                                    {clothSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "217.5px", fontSize: "25px"}}>+{clothSlotLevel}</div>}
                                    {shoesSlot !== null ?
                                        <img src={shoesSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmeLCpgvRG5AejKn6W1ZtHSMdGmJX14xrpnNYjns1kqQbS" width="100px" alt="Can not load metadata." />
                                    }
                                    {shoesSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "365px", fontSize: "25px"}}>+{shoesSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "300px", height: "450px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                    <div style={{position: "relative", width: "300px", height: "140px", padding: "0 20px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                                        {soulSlot !== null ?
                                            <img src={soulSlot} width="100px" alt="Can not load metadata." /> :
                                            <img src="https://gateway.commudao.xyz/ipfs/QmdSRjFFCUZJiLBxy5JUgVL4vezt4vXnux1JjFbQQgZCpP" width="100px" alt="Can not load metadata." />
                                        }
                                        {soulSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "205px", fontSize: "25px"}}>+{soulSlotLevel}</div>}
                                        {badgeSlot !== null ?
                                            <img src={badgeSlot} width="100px" alt="Can not load metadata." /> :
                                            <img src="https://gateway.commudao.xyz/ipfs/QmQG17rt5uiChPpvHwivdZPX5Cm6PhoGyCYNzPyfs3ohT5" width="100px" alt="Can not load metadata." />
                                        }
                                        {badgeSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "55px", fontSize: "25px"}}>+{badgeSlotLevel}</div>}
                                    </div>
                                    {nft.length > 0 ?
                                        <>
                                            {characterSlot !== null ?
                                                <img src={characterSlot} width="300px" alt="Can not load metadata." /> :
                                                <img src="https://gateway.commudao.xyz/ipfs/Qmdm1Eg3n9aEbJuuYqsMoFex3WUMpHMxnnKmjwjpErCDMC" width="300px" alt="Can not load metadata." />
                                            }
                                        </> :
                                        <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <ThreeDots fill="#5f6476" />
                                        </div>
                                    }
                                    {characterSlotLevel !== null && <div style={{position: "absolute", bottom: "25px", right: "20px", fontSize: "25px"}}>Lv.{characterSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", margin: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {accSlot4 !== null ?
                                        <img src={accSlot4} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot4Level !== null && <div className="slotlevel" style={{position: "absolute", top: "65px", fontSize: "25px"}}>+{accSlot4Level}</div>}
                                    {backSlot !== null ?
                                        <img src={backSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmeJWEps9kHZbcU3bYqbyUfyc8kWYXS5xBi1dnr8Basvk9" width="100px" alt="Can not load metadata." />
                                    }
                                    {backSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "217.5px", fontSize: "25px"}}>+{backSlotLevel}</div>}
                                    {weaponSlot !== null ?
                                        <img src={weaponSlot} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmWYEwdpNYHCp4EZEJATQue72ndN162VTze9WDxzaLEqk9" width="100px" alt="Can not load metadata." />
                                    }
                                    {wpSlotLevel !== null && <div className="slotlevel" style={{position: "absolute", top: "365px", fontSize: "25px"}}>+{wpSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", margin: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {accSlot5 !== null ?
                                        <img src={accSlot5} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot5Level !== null && <div className="slotlevel" style={{position: "absolute", top: "65px", fontSize: "25px"}}>+{accSlot5Level}</div>}
                                    {accSlot6 !== null ?
                                        <img src={accSlot6} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmUCug7hrWCYwLfboWhtNvNAXmrzVfPaptBt2B8htcM7mt" width="100px" alt="Can not load metadata." />
                                    }
                                    {accSlot6Level !== null && <div className="slotlevel" style={{position: "absolute", top: "217.5px", fontSize: "25px"}}>+{accSlot6Level}</div>}
                                    {weaponSlot2 !== null ?
                                        <img src={weaponSlot2} width="100px" alt="Can not load metadata." /> :
                                        <img src="https://gateway.commudao.xyz/ipfs/QmWYEwdpNYHCp4EZEJATQue72ndN162VTze9WDxzaLEqk9" width="100px" alt="Can not load metadata." />
                                    }
                                    {wpSlot2Level !== null && <div className="slotlevel" style={{position: "absolute", top: "365px", fontSize: "25px"}}>+{wpSlot2Level}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1540px", height: "fit-content", marginBottom: "20px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{background: "#FFFFFF99", height: "360px", margin: "10px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-start", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px"}}>
                                    <div style={{fontSize: "22px", lineHeight: "15px"}}>PARTY PANEL</div>
                                </div>
                                <div style={{width: "95%", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                    <div style={{width: "300px"}}>PARTY</div>
                                    <div style={{width: "300px"}}>GUILD</div>
                                    <div style={{width: "150px"}}>NO. OF MEMBER</div>
                                    <div style={{width: "150px"}}>DELEGATED CMPOW</div>
                                    <div style={{width: "150px"}}>CONCENTRATION</div>
                                    <div style={{width: "150px"}}>MISSION DEDICATED</div>
                                    <div style={{width: "200px"}}>REWARD EMISSION</div>
                                </div>
                                <div style={{width: "95%", display: "flex", flexDirection: "row", justifyContent: "flex-start", borderBottom: "1px solid #F7F5F8", padding: "10px 0"}}>
                                    <div style={{width: "300px", display: "flex", flexDirection: "row"}}>
                                        <img src={party1Logo} height="20" alt="Can not load metadata."/>
                                        <div style={{marginLeft: "5px"}}>{party1Name}</div>
                                    </div>
                                    <div style={{width: "300px"}}>TBD</div>
                                    <div style={{width: "150px"}}>5</div>
                                    <div style={{width: "150px"}}>{allCmpowParty1}</div>
                                    <div style={{width: "150px"}}>{allCmpowParty1 !== 0 ? String(Number((allCmpowParty1 / (allCmpowParty1 + allCmpowParty2)) * 100).toFixed(2)) + '%' : 'Not delegate yet'}</div>
                                    <div style={{width: "150px"}}>{Number(party1DelegateBaseCMD)}</div>
                                    <div style={{width: "200px"}}>{Number(totalRewardParty1).toLocaleString('en-US', {maximumFractionDigits:3})} $CMD</div>
                                </div>
                                <div style={{width: "95%", display: "flex", flexDirection: "row", justifyContent: "flex-start", borderBottom: "1px solid #F7F5F8", padding: "10px 0"}}>
                                    <div style={{width: "300px", display: "flex", flexDirection: "row"}}>
                                        <img src={party2Logo} height="20" alt="Can not load metadata."/>
                                        <div style={{marginLeft: "5px"}}>{party2Name}</div>
                                    </div>
                                    <div style={{width: "300px"}}>TBD</div>
                                    <div style={{width: "150px"}}>5</div>
                                    <div style={{width: "150px"}}>{allCmpowParty2}</div>
                                    <div style={{width: "150px"}}>{allCmpowParty2 !== 0 ? String(Number((allCmpowParty2 / (allCmpowParty1 + allCmpowParty2)) * 100).toFixed(2)) + '%' : 'Not delegate yet'}</div>
                                    <div style={{width: "150px"}}>{Number(party2DelegateBaseCMD)}</div>
                                    <div style={{width: "200px"}}>{Number(totalRewardParty2).toLocaleString('en-US', {maximumFractionDigits:3})} $CMD</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "flex-start", padding: "30px", width: "1540px", height: "fit-content", marginBottom: "20px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "#FFFFFF99", width: "370px", height: "400px", margin: "10px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "95%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                    <div style={{fontSize: "22px", lineHeight: "15px"}}>Wood Chopper on Ancient Forest [BBQ Chain]</div>
                                </div>
                                <div className='light' style={{width: "95%", display: "flex", flexDirection: "row", justifyContent: "flex-start", padding: "20px 0", borderBottom: "1px solid", fontSize: "12px"}}>
                                    <div>Please contact on CommuDAO Discord for more information</div>
                                </div>
                                <div style={{width: "95%", display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "20px 0", borderBottom: "1px solid"}}>
                                    <div>CMPOW DEDICATED</div>
                                    <div>{allCmpowParty1 + allCmpowParty2}</div>
                                </div>
                                <div style={{width: "95%", display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "20px 0", borderBottom: "1px solid"}}>
                                    <div>PARTY DEDICATED</div>
                                    <div>{Number(party1DelegateBaseCMD) + Number(party2DelegateBaseCMD)}</div>
                                </div>
                                <div style={{width: "95%", display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "20px 0", borderBottom: "1px solid"}}>
                                    <div>REWARD EMISSION</div>
                                    <div>{Number(Number(totalRewardParty1) + Number(totalRewardParty2)).toLocaleString('en-US', {maximumFractionDigits:3})} $CMD</div>
                                </div>
                                {address !== null && intrasubModetext !== undefined ?
                                    <>
                                        {address.toUpperCase() === intrasubModetext.toUpperCase() ?
                                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                                                {chain.id === 190 ?
                                                    <>
                                                        {(myMemberIndex === null || !myAbiltoDelegate) && <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">DELIGATE</div>}
                                                        {(myAbiltoDelegate && Number(gasBalance) >= 1) && <div style={{alignSelf: "center"}} className="button" onClick={delegateMission}>DELIGATE</div>}
                                                        {(Number(myMemberIndex) === 0 && myPartyRefuelAt >= startBlock && !isBaseCmdDelegate) && <div style={{marginLeft: "5px", alignSelf: "center"}} className="button" onClick={confirmMission}>CONFIRM MISSION</div>}
                                                        {isBaseCmdDelegate && <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">MISSION DELEGATED</div>}
                                                    </> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">SWITCH TO BBQ CHAIN</div>
                                                }
                                            </div> :
                                            <div style={{height: "41px"}}></div>
                                        }
                                    </> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                        </div>
                    </div>
                    
                    {nft.length > 0 ?
                        <div style={{margin: "40px 0 60px 0", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                            {nft[0] !== null ?
                                <>
                                {nft.map((item, index) => (
                                    <>
                                        {(item.Col === 1 && item.Id / 100000000000 <= 8) &&
                                            <div style={{background: "#E9F2FF", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "20px", margin: "10px", height: "450px"}} className="nftCard" key={index}>
                                                <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                                    <img src={item.Image} height="100%" alt="Can not load metadata." />
                                                </div>
                                                <div className="emp bold">{item.Name}</div>
                                                <div className="bold">{item.RewardPerSec} cmpow per sec</div>
                                                <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                                {address !== null && intrasubModetext !== undefined ?
                                                    <>
                                                        {address.toUpperCase() === intrasubModetext.toUpperCase() ?
                                                            <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}}>
                                                                {item.isStaked ?
                                                                    <div style={{background: "gray"}} className="pixel button" onClick={() => unequipNft(item.Slot)}>UNEQUIP L1</div> :
                                                                    <>
                                                                        {item.Col === 1 && 
                                                                            <>
                                                                                {((item.Id / 100000000000) | 0) === 1 && 
                                                                                    <>
                                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 1)}>EQUIP L1 MAIN CHAR</div>
                                                                                        {characterSlot !== null && <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipNft(item.Id, 15)}>EQUIP L1 SOUL</div>}
                                                                                    </>
                                                                                }
                                                                            </>
                                                                        }
                                                                        <div style={{alignSelf: "center", background: "gray", marginTop: "5px"}} className="pixel button" onClick={() => transferNFT(item.Col, item.Id)}>TRANSFER</div>
                                                                    </>
                                                                }
                                                            </div> :
                                                            <div style={{height: "41px"}}></div>
                                                        }
                                                    </> :
                                                    <div style={{height: "41px"}}></div>
                                                }
                                            </div>
                                        }
                                    </>
                                ))}
                                </> :
                                <div style={{background: "#E9F2FF", boxShadow: "none", border: 0, justifyContent: "center", padding: "20px", margin: "10px", height: "450px"}} className="nftCard">
                                    {address !== null ?
                                        <>
                                            <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                        </> :
                                        <>
                                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                            <div className="bold">Please connect wallet to view your NFTs.</div>
                                        </>
                                    }
                                </div>
                            }
                        </div> :
                        <div style={{marginTop: "40px", width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", height: "450px"}}> 
                            <div className="nftCard" style={{background: "#E9F2FF", boxShadow: "none", border: 0, justifyContent: "center"}}>
                                <ThreeDots fill="#fff" />
                                <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Guild