import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const cmdaonft = '0xA6B98E5F46e5daD1F0F39bD8678870d39A7D96b1'
const multinft1 = '0x224dFcCC4e6bFc2c25B0c5ee46D580f3Be77E3B4'
const nftSlot = '0xB5fb4a445EE4882c8192680E2EaB0033C30e64BA'
const multiSlot = '0x8c4672bE4043201Cd8236887C9B43A48046b69EF'
const dunATV = '0x1391a538985f2F897375219573c7F5D61EA33Cdf'
const providerOP = new ethers.getDefaultProvider('https://opt-mainnet.g.alchemy.com/v2/0shzCCUF1JEPvKjqoEuftQcYrgIufNzE')

const AbandonedTempleVault = ({ config, intrasubModetext, navigate, callMode, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc721Abi, erc20Abi, nftSlotABI, multichainSlotABI, dunATVABI }) => {
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
    const [multinft, setMultinft] = React.useState([])
    const [multiSlot1, setmultiSlot1] = React.useState(null)
    const [multiSlot2, setmultiSlot2] = React.useState(null)
    const [multiSlot3, setmultiSlot3] = React.useState(null)
    const [multiSlot4, setmultiSlot4] = React.useState(null)
    const [multiSlot5, setmultiSlot5] = React.useState(null)
    const [allPower, setAllPower] = React.useState(0)
    const [sumPower, setSumPower] = React.useState(0)
    const [stakePower, setStakePower] = React.useState(0)
    const [rewardPending, setRewardPending] = React.useState(0)
    const [rewardBalance, setRewardBalance] = React.useState(0)
    const [timeToSyncAgain, setTimeToSyncAgain] = React.useState(null)
    const [canSync, setCanSync] = React.useState(null)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        if (intrasubModetext === undefined) {
            navigate('/dungeon/abandoned-temple-vault/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext)
        } else if (address === undefined) {
            navigate('/dungeon/abandoned-temple-vault/null')
        } else {
            navigate('/dungeon/abandoned-temple-vault/' + address)
        }
        const cmdaonftSC = new ethers.Contract(cmdaonft, erc721Abi, providerOP)
        const multinft1SC = new ethers.Contract(multinft1, erc721Abi, providerOP)
        setNft([])
        
        const thefetch = async () => {
            const nftEQ = addr !== null ? await readContract(config, {
                address: nftSlot,
                abi: nftSlotABI,
                functionName: 'nftEquip',
                args: [addr],
                chainId: 10,
            }) : [0, 0, 0, 0, 0, 0, 0]
            const nftEQ2 = addr !== null ? await readContract(config, {
                address: nftSlot,
                abi: nftSlotABI,
                functionName: 'nftEquip2',
                args: [addr],
                chainId: 10,
            }) : [0, 0, 0, 0, 0, 0, 0, 0]

            const multidata = addr !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: multiSlot,
                        abi: multichainSlotABI,
                        functionName: 'nftStake',
                        args: [addr, 0],
                        chainId: 10,
                    },
                    {
                        address: multiSlot,
                        abi: multichainSlotABI,
                        functionName: 'nftStake',
                        args: [addr, 1],
                        chainId: 10,
                    },
                    {
                        address: multiSlot,
                        abi: multichainSlotABI,
                        functionName: 'nftStake',
                        args: [addr, 2],
                        chainId: 10,
                    },
                    {
                        address: multiSlot,
                        abi: multichainSlotABI,
                        functionName: 'nftStake',
                        args: [addr, 3],
                        chainId: 10,
                    },
                    {
                        address: multiSlot,
                        abi: multichainSlotABI,
                        functionName: 'nftStake',
                        args: [addr, 4],
                        chainId: 10,
                    },
                ],
            }) : [{result: [0, 0]}, {result: [0, 0]}, {result: [0, 0]}, {result: [0, 0]}, {result: [0, 0]}]

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
                        address: nftSlot,
                        abi: nftSlotABI,
                        functionName: 'nftStatus',
                        args: [addr],
                        chainId: 10,
                    },
                    {
                        address: multiSlot,
                        abi: multichainSlotABI,
                        functionName: 'nftStatus',
                        args: [addr],
                        chainId: 10,
                    },
                    {
                        address: multinft1,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [multidata[0].result[0]],
                        chainId: 10,
                    },
                    {
                        address: multinft1,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [multidata[1].result[0]],
                        chainId: 10,
                    },
                    {
                        address: multinft1,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [multidata[2].result[0]],
                        chainId: 10,
                    },
                    {
                        address: multinft1,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [multidata[3].result[0]],
                        chainId: 10,
                    },
                    {
                        address: multinft1,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [multidata[4].result[0]],
                        chainId: 10,
                    },
                    {
                        address: dunATV,
                        abi: dunATVABI,
                        functionName: 'nftStake',
                        args: [addr],
                        chainId: 10,
                    },
                    {
                        address: dunATV,
                        abi: dunATVABI,
                        functionName: 'calculateRewards',
                        args: [addr],
                        chainId: 10,
                    },
                    {
                        address: dunATV,
                        abi: dunATVABI,
                        functionName: 'balanceOf',
                        args: [addr],
                        chainId: 10,
                    },
                ],
            }) : [
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'},
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'},
                {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'}, {result: 0, status: 'yo'},
            ]
            
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
            let walletRemoveDup = []
            if (chain !== undefined && chain.id === 10 && addr !== null) {
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
            let multinfts = []
            let res_multislot1 = null
            try {
                if (data[17].status === 'success') {
                    res_multislot1 = await fetch(data[17].result)
                } else {
                    res_multislot1 = null
                }
            } catch {}
            const nft_multislot1 = res_multislot1 !== null ? await res_multislot1.json() : {image: null, name: null}
            const nft_multislot1_Img = nft_multislot1.image !== null ? nft_multislot1.image : null
            if (res_multislot1 !== null) {
                multinfts.push({
                    Col: 2,
                    Id: Number(multidata[0].result[0]),
                    Name: nft_multislot1.name,
                    Image: nft_multislot1_Img,
                    Description: nft_multislot1.description,
                    Attribute: nft_multislot1.attributes,
                    RewardPerSec: Number(multidata[0].result[0]) % 100000,
                    isStaked: true,
                    Slot: 1
                })
            }
            let res_multislot2 = null
            try {
                if (data[18].status === 'success') {
                    res_multislot2 = await fetch(data[18].result)
                } else {
                    res_multislot2 = null
                }
            } catch {}
            const nft_multislot2 = res_multislot2 !== null ? await res_multislot2.json() : {image: null, name: null}
            const nft_multislot2_Img = nft_multislot2.image !== null ? nft_multislot2.image : null
            if (res_multislot2 !== null) {
                multinfts.push({
                    Col: 2,
                    Id: Number(multidata[1].result[0]),
                    Name: nft_multislot2.name,
                    Image: nft_multislot2_Img,
                    Description: nft_multislot2.description,
                    Attribute: nft_multislot2.attributes,
                    RewardPerSec: Number(multidata[1].result[0]) % 100000,
                    isStaked: true,
                    Slot: 2
                })
            }
            let res_multislot3 = null
            try {
                if (data[19].status === 'success') {
                    res_multislot3 = await fetch(data[19].result)
                } else {
                    res_multislot3 = null
                }
            } catch {}
            const nft_multislot3 = res_multislot3 !== null ? await res_multislot3.json() : {image: null, name: null}
            const nft_multislot3_Img = nft_multislot3.image !== null ? nft_multislot3.image : null
            if (res_multislot3 !== null) {
                multinfts.push({
                    Col: 2,
                    Id: Number(multidata[2].result[0]),
                    Name: nft_multislot3.name,
                    Image: nft_multislot3_Img,
                    Description: nft_multislot3.description,
                    Attribute: nft_multislot3.attributes,
                    RewardPerSec: Number(multidata[2].result[0]) % 100000,
                    isStaked: true,
                    Slot: 3
                })
            }
            let res_multislot4 = null
            try {
                if (data[20].status === 'success') {
                    res_multislot4 = await fetch(data[20].result)
                } else {
                    res_multislot4 = null
                }
            } catch {}
            const nft_multislot4 = res_multislot4 !== null ? await res_multislot4.json() : {image: null, name: null}
            const nft_multislot4_Img = nft_multislot4.image !== null ? nft_multislot4.image : null
            if (res_multislot4 !== null) {
                multinfts.push({
                    Col: 2,
                    Id: Number(multidata[3].result[0]),
                    Name: nft_multislot4.name,
                    Image: nft_multislot4_Img,
                    Description: nft_multislot4.description,
                    Attribute: nft_multislot4.attributes,
                    RewardPerSec: Number(multidata[3].result[0]) % 100000,
                    isStaked: true,
                    Slot: 4
                })
            }
            let res_multislot5 = null
            try {
                if (data[21].status === 'success') {
                    res_multislot5 = await fetch(data[21].result)
                } else {
                    res_multislot5 = null
                }
            } catch {}
            const nft_multislot5 = res_multislot5 !== null ? await res_multislot5.json() : {image: null, name: null}
            const nft_multislot5_Img = nft_multislot5.image !== null ? nft_multislot5.image : null
            if (res_multislot5 !== null) {
                multinfts.push({
                    Col: 2,
                    Id: Number(multidata[4].result[0]),
                    Name: nft_multislot5.name,
                    Image: nft_multislot5_Img,
                    Description: nft_multislot5.description,
                    Attribute: nft_multislot5.attributes,
                    RewardPerSec: Number(multidata[4].result[0]) % 100000,
                    isStaked: true,
                    Slot: 5
                })
            }
            let multi1walletRemoveDup = []
            if (chain !== undefined && chain.id === 10 && addr !== null) {
                const multi1walletFilter = await multinft1SC.filters.Transfer(null, addr, null)
                const multi1walletEvent = await multinft1SC.queryFilter(multi1walletFilter, 125216008, "latest")
                const multi1walletMap = await Promise.all(multi1walletEvent.map(async (obj) => String(obj.args.tokenId)))
                multi1walletRemoveDup = multi1walletMap.filter((obj, index) => multi1walletMap.indexOf(obj) === index)
            }
            const data4 = addr !== null ? await readContracts(config, {
                contracts: multi1walletRemoveDup.map((item) => (
                    {
                        address: multinft1,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 10
                    }
                ))
            }) : null
            let yourmultinft1wallet = []
            for (let i = 0; i <= multi1walletRemoveDup.length - 1 && addr !== null; i++) {
                if (data4[i].result.toUpperCase() === addr.toUpperCase()) {
                    yourmultinft1wallet.push({Id: String(multi1walletRemoveDup[i])})
                }
            }
            const data5 = addr !== null ? await readContracts(config, {
                contracts: yourmultinft1wallet.map((item) => (
                    {
                        address: multinft1,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 10
                    }
                ))
            }) : null
            for (let i = 0; i <= yourmultinft1wallet.length - 1; i++) {
                const nftipfs = data5[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}
                multinfts.push({
                    Col: 2,
                    Id: yourmultinft1wallet[i].Id,
                    Name: nft.name,
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yourmultinft1wallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }
            if (multinfts.length === 0) { multinfts.push(null) }
            const allPow = Number(data[15].result)
            const sumPow = Number(data[15].result) + Number(data[16].result)
            const stakePow = Number(data[22].result[0])
            const syncTime = Number(data[22].result[1])
            const pendingreward = Number(data[23].result)
            const balreward = Number(data[24].result)
            
            return [
                nfts, 
                nftEQ_main_char_Img, nftEQ_main_char_Name, nftEQ_main_acc_Img, nftEQ_main_acc_Name, nftEQ_main_back_Img, nftEQ_main_back_Name, nftEQ_main_shoes_Img, nftEQ_main_shoes_Name, nftEQ_main_wp1_Img, nftEQ_main_wp1_Name, nftEQ_main_cloth_Img, nftEQ_main_cloth_Name, nftEQ_main_hat_Img, nftEQ_main_hat_Name,
                nftEQ_main_wp2_Img, nftEQ_main_wp2_Name, nftEQ_main_acc2_Img, nftEQ_main_acc2_Name, nftEQ_main_acc3_Img, nftEQ_main_acc3_Name, nftEQ_main_acc4_Img, nftEQ_main_acc4_Name, nftEQ_main_acc5_Img, nftEQ_main_acc5_Name, nftEQ_main_acc6_Img, nftEQ_main_acc6_Name, nftEQ_main_soul_Img, nftEQ_main_soul_Name, nftEQ_main_badge_Img, nftEQ_main_badge_Name,
                multinfts, [Number(multidata[0].result[0]) % 100000, nft_multislot1_Img], [Number(multidata[1].result[0]) % 100000, nft_multislot2_Img], [Number(multidata[2].result[0]) % 100000, nft_multislot3_Img], [Number(multidata[3].result[0]) % 100000, nft_multislot4_Img], [Number(multidata[4].result[0]) % 100000, nft_multislot5_Img],
                allPow, sumPow, stakePow, pendingreward, balreward, syncTime,
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
            setMultinft(result[31])
            setmultiSlot1(result[32])
            setmultiSlot2(result[33])
            setmultiSlot3(result[34])
            setmultiSlot4(result[35])
            setmultiSlot5(result[36])
            setAllPower(result[37])
            setSumPower(result[38])
            setStakePower(result[39])
            setRewardPending(ethers.utils.formatEther(String(result[40])))
            setRewardBalance(ethers.utils.formatEther(String(result[41])))
            const syncAgain = new Date((Number(result[42]) * 1000) + (86400 * 1000))
            Number(result[42]) !== 0 ? setTimeToSyncAgain(syncAgain.toLocaleString('es-CL')) : setTimeToSyncAgain('NOW')
            Date.now() - (Number(result[42]) * 1000) > (86400 * 1000) ? setCanSync(true) : setCanSync(false)
        })
    }, [config, address, addr, intrasubModetext, navigate, chain, txupdate, erc721Abi, erc20Abi, nftSlotABI, multichainSlotABI, dunATVABI ])

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

    const equipMultiNft = async (_nftid, _colindex, _slot) => {
        setisLoading(true)
        let nftaddr = '0x'
        if (_colindex === 1) {
            nftaddr = multinft1
        }
        try {
            const nftAllow = await readContract(config, {
                address: nftaddr,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
                chainId: 10,
            })
            if (nftAllow.toUpperCase() !== multiSlot.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: nftaddr,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [multiSlot, _nftid],
                    chainId: 10,
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: multiSlot,
                abi: multichainSlotABI,
                functionName: 'stake',
                args: [_slot, _colindex, _nftid],
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

    const unequipMultiNft = async (_slot) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: multiSlot,
                abi: multichainSlotABI,
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

    const sync = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: dunATV,
                abi: dunATVABI,
                functionName: 'sync',
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
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>Abandoned Temple Vault</div>
                    <div style={{fontSize: "24px", width: "fit-content", marginTop: "30px"}} className="pixel"></div>
                </div>
                <div className="SubfieldBanner">
                    <img src="https://gateway.commudao.xyz/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6" width="150" alt="$INF.POW" />
                </div>
            </div>

            {address !== null && chain !== undefined && chain.id !== 10 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to OP mainnet.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{margin: "0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1540px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "#FFFFFF99", width: "370px", height: "400px", margin: "5px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-start", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", color: "rgb(0, 209, 255)"}}>
                                    
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    {intrasubModetext !== null && intrasubModetext !== undefined && intrasubModetext.length === 42 ?
                                        <><div>ADDRESS</div><div>{intrasubModetext.slice(0, 4) + "..." + intrasubModetext.slice(-4)}</div></> :
                                        <><div>ADDRESS</div><div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    USER LEVEL 
                                    <div>TBD</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    CMDAO NFT CMPOW 
                                    <div>{Number(allPower).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    CURRENT POWER 
                                    <div>{Number(sumPower).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    STAKING POWER 
                                    <div>{Number(stakePower).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    PENDING REWARD 
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://gateway.commudao.xyz/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6" height="20" alt="$INF.POW"/>
                                        <div style={{marginLeft: "5px"}}>{Number(rewardPending).toLocaleString('en-US', {maximumFractionDigits:9})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #F7F5F8"}}>
                                    REWARD BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://gateway.commudao.xyz/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6" height="20" alt="$INF.POW"/>
                                        <div style={{marginLeft: "5px"}}>{Number(rewardBalance).toLocaleString('en-US', {maximumFractionDigits:9})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>SYNC AGAIN AT <div>{timeToSyncAgain}</div></div>
                                {address !== null && intrasubModetext !== undefined ?
                                    <>
                                        {address.toUpperCase() === intrasubModetext.toUpperCase() ?
                                            <div style={{marginTop: "30px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                                                {Number(sumPower) !== 0 && canSync ?
                                                    <div style={{alignSelf: "center"}} className="button" onClick={sync}>SYNC STAKE / CLAIM REWARD</div> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">SYNC STAKE / CLAIM REWARD</div>
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

                    <div style={{width: "1650px", margin: "0 20px", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="pixel mainprofile">
                        {true && 
                            <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>NFT SLOT1</div>
                                {multiSlot1 !== null && multiSlot1[1] !== null ?
                                    <>
                                        <img src={multiSlot1[1]} width="200px" alt="Can not load metadata." />
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{multiSlot1[0]} power</div>
                                    </> :
                                    <>
                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 power</div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}></div>
                                        <div style={{height: "105px"}}></div>
                                    </>
                                }
                            </div>
                        }
                        {true && 
                            <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>NFT SLOT2</div>
                                {multiSlot2 !== null && multiSlot2[1] !== null ?
                                    <>
                                        <img src={multiSlot2[1]} width="200px" alt="Can not load metadata." />
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{multiSlot2[0]} power</div>
                                    </> :
                                    <>
                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 power</div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}></div>
                                        <div style={{height: "105px"}}></div>
                                    </>
                                }
                            </div>
                        }
                        {true && 
                            <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>NFT SLOT3</div>
                                {multiSlot3 !== null && multiSlot3[1] !== null ?
                                    <>
                                        <img src={multiSlot3[1]} width="200px" alt="Can not load metadata." />
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{multiSlot3[0]} power</div>
                                    </> :
                                    <>
                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 power</div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}></div>
                                        <div style={{height: "105px"}}></div>
                                    </>
                                }
                            </div>
                        }
                        {true && 
                            <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>NFT SLOT4</div>
                                {multiSlot4 !== null && multiSlot4[1] !== null ?
                                    <>
                                        <img src={multiSlot4[1]} width="200px" alt="Can not load metadata." />
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{multiSlot4[0]} power</div>
                                    </> :
                                    <>
                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 power</div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}></div>
                                        <div style={{height: "105px"}}></div>
                                    </>
                                }
                            </div>
                        }
                        {true && 
                            <div style={{margin: "20px 20px 0 0", display: "flex", flexDirection: "column"}}>
                                <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>NFT SLOT5</div>
                                {multiSlot5 !== null && multiSlot5[1] !== null ?
                                    <>
                                        <img src={multiSlot5[1]} width="200px" alt="Can not load metadata." />
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{multiSlot5[0]} power</div>
                                    </> :
                                    <>
                                        
                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 power</div>
                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}></div>
                                        <div style={{height: "105px"}}></div>
                                    </>
                                }
                            </div>
                        }
                    </div>
                    
                    {nft.length > 0 ?
                        <div style={{marginTop: "40px", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
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
                    {multinft.length > 0 ?
                        <div style={{margin: "40px 0 60px 0", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                            {multinft[0] !== null ?
                                <>
                                    {multinft.map((item, index) => (
                                        <>
                                            <div style={{background: "#E9F2FF", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "20px", margin: "10px", height: "550px"}} className="nftCard" key={index}>
                                                <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                                    <img src={item.Image} height="100%" alt="Can not load metadata." />
                                                </div>
                                                <div className="emp bold">{item.Name}</div>
                                                <div className="bold">{item.RewardPerSec} cmpow per sec</div>
                                                <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                                {address !== null && intrasubModetext !== undefined ?
                                                    <>
                                                        {address.toUpperCase() === intrasubModetext.toUpperCase() ?
                                                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}}>
                                                                {item.isStaked ?
                                                                    <div style={{background: "gray"}} className="pixel button" onClick={() => unequipMultiNft(item.Slot - 1)}>UNEQUIP SLOT {item.Slot}</div> :
                                                                    <>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipMultiNft(item.Id, item.Col - 1, 0)}>EQUIP SLOT 1</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipMultiNft(item.Id, item.Col - 1, 1)}>EQUIP SLOT 2</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipMultiNft(item.Id, item.Col - 1, 2)}>EQUIP SLOT 3</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipMultiNft(item.Id, item.Col - 1, 3)}>EQUIP SLOT 4</div>
                                                                        <div style={{alignSelf: "center", marginTop: "5px"}} className="pixel button" onClick={() => equipMultiNft(item.Id, item.Col - 1, 4)}>EQUIP SLOT 5</div>
                                                                        <div style={{width: "105px", alignSelf: "center", background: "gray", marginTop: "5px"}} className="pixel button" onClick={() => transferNFT(item.Col, item.Id)}>TRANSFER</div>
                                                                    </>
                                                                }
                                                            </div> :
                                                            <div style={{height: "41px"}}></div>
                                                        }
                                                    </> :
                                                    <div style={{height: "41px"}}></div>
                                                }
                                            </div>
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
                        <div style={{margin: "40px 0 60px 0", width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", height: "450px"}}> 
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

export default AbandonedTempleVault