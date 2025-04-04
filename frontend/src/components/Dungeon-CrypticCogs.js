import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const cmdaoNft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const narutaNft = '0x5E620D8980335167d9eF36cEf5d9A6Ea6607a8Cb'
const iiLab = '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241'
const dunEE = '0xF663c756b6D57724C3B41c8839aB9c7Af83c9751'
const uiiLab = '0x432ecf003bB9BF4875a75646368b58be796e0830'
const taoPFP = '0xB39336b9491547405341eEB8863B020A1302Dd69'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const CrypticCogs = ({ config, intrasubModetext, navigate, callMode, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc721Abi, erc20Abi, dunEEABI, taoPfpABI, uiiABI }) => {
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
    const [helmetSlot, setHelmetSlot] = React.useState(null)
    const [helmetSlotLevel, setHelmetSlotLevel] = React.useState(null)
    const [armorSlot, setArmorSlot] = React.useState(null)
    const [armorSlotLevel, setArmorSlotLevel] = React.useState(null)
    const [ringSlot, setRingSlot] = React.useState(null)
    const [ringSlotLevel, setRingSlotLevel] = React.useState(null)
    const [shieldSlot, setShieldSlot] = React.useState(null)
    const [shieldSlotLevel, setShieldSlotLevel] = React.useState(null)
    const [bootsSlot, setBootsSlot] = React.useState(null)
    const [bootsSlotLevel, setBootsSlotLevel] = React.useState(null)
    const [swordSlot, setSwordSlot] = React.useState(null)
    const [swordSlotLevel, setSwordSlotLevel] = React.useState(null)
    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [gasselected, setGasselected] = React.useState("II")
    const [angbPending, setAngbPending] = React.useState(0)
    const [iiBalance, setIIBalance] = React.useState(0)
    const [uiiBalance, setUIIBalance] = React.useState(0)
    const [eeBalance, setEEBalance] = React.useState(0)
    const [pfpLevel, setPfpLevel] = React.useState(0)
    const [pfpId, setPfpId] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        if (intrasubModetext === undefined) {
            navigate('/dungeon/cryptic-cogs/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext)
        } else if (address === undefined) {
            navigate('/dungeon/cryptic-cogs/null')
        } else {
            navigate('/dungeon/cryptic-cogs/' + address)
        }
        const cmdaonftSC = new ethers.Contract(cmdaoNft, erc721Abi, providerJBC)
        const nrtnftSC = new ethers.Contract(narutaNft, erc721Abi, providerJBC)
        const pfpnftSC = new ethers.Contract(taoPFP, erc721Abi, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            const nftEQ = addr !== null ? await readContract(config, {
                address: dunEE,
                abi: dunEEABI,
                functionName: 'nftEquip',
                args: [addr],
                chainId: 8899
            }) : [0, 0, 0, 0, 0, 0, 0]

            const nftSTAT = addr !== null ? await readContract(config, {
                address: dunEE,
                abi: dunEEABI,
                functionName: 'nftStatus',
                args: [addr],
                chainId: 8899
            }) : [0, 0, 0, 0, 0, 0, 0, 0, 0, null]

            const data = addr !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                        chainId: 8899
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                        chainId: 8899
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                        chainId: 8899
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                        chainId: 8899
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                        chainId: 8899
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                        chainId: 8899
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                        chainId: 8899
                    },
                    {
                        address: iiLab,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [addr],
                        chainId: 8899
                    },
                    {
                        address: dunEE,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [addr],
                        chainId: 8899
                    },
                    {
                        address: dunEE,
                        abi: dunEEABI,
                        functionName: 'calculateRewards',
                        args: [addr],
                        chainId: 8899
                    },
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                        chainId: 8899
                    },
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                        chainId: 8899
                    },
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                        chainId: 8899
                    },
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                        chainId: 8899
                    },
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                        chainId: 8899
                    },
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                        chainId: 8899
                    },
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                        chainId: 8899
                    },
                    {
                        address: uiiLab,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [addr],
                        chainId: 8899
                    },
                ],
            }) : [
                {result: ''}, {result: ''}, {result: ''}, {result: ''}, {result: ''}, {result: ''}, {result: ''}, {result: 0}, {result: 0}, {result: 0},
                {result: ''}, {result: ''}, {result: ''}, {result: ''}, {result: ''}, {result: ''}, {result: ''}, {result: 0},
            ]

            let nfts = []
            let charIpfs = null
            if (data[0].status === 'success' && Number(nftSTAT[0]) === 1) {
                charIpfs = data[0].result
            } else if (data[10].status === 'success' && Number(nftSTAT[0]) === 2) {
                charIpfs = data[10].result
            }
            let response1 = null
            try {
                response1 = charIpfs !== null ? await fetch(charIpfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft1 = response1 !== null ? await response1.json() : {image: null, name: null}
            const nftEQ_1 = nft1.image !== null ? nft1.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_1_Name = nft1.name
            if (response1 !== null) {
                nfts.push({
                    Col: Number(nftSTAT[0]),
                    Id: Number(nftEQ[0]),
                    Name: nftEQ_1_Name,
                    Image: nftEQ_1,
                    Description: nft1.description,
                    Attribute: nft1.attributes,
                    RewardPerSec: Number(nftEQ[0]) % 100000,
                    isStaked: true
                })
            }
            let accIpfs = null
            if (data[1].status === 'success' && Number(nftSTAT[3]) === 1) {
                accIpfs = data[1].result
            } else if (data[11].status === 'success' && Number(nftSTAT[3]) === 2) {
                accIpfs = data[11].result
            }
            let response2 = null
            try {
                response2 = accIpfs !== null ? await fetch(accIpfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft2 = response2 !== null ? await response2.json() : {image: null, name: null}
            const nftEQ_2_Img = nft2.image !== null ? nft2.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_2_Name = nft2.name
            if (response2 !== null) {
                nfts.push({
                    Col: Number(nftSTAT[3]),
                    Id: Number(nftEQ[3]),
                    Name: nftEQ_2_Name,
                    Image: nftEQ_2_Img,
                    Description: nft2.description,
                    Attribute: nft2.attributes,
                    RewardPerSec: Number(nftEQ[3]) % 100000,
                    isStaked: true
                })
            }  
            let backpfs = null
            if (data[2].status === 'success' && Number(nftSTAT[4]) === 1) {
                backpfs = data[2].result
            } else if (data[12].status === 'success' && Number(nftSTAT[4]) === 2) {
                backpfs = data[12].result
            }
            let response3 = null
            try {
                response3 = backpfs !== null ? await fetch(backpfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft3 = response3 !== null ? await response3.json() : {image: null, name: null}
            const nftEQ_3 = nft3.image !== null ? nft3.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_3_Name = nft3.name
            if (response3 !== null) {
                nfts.push({
                    Col: Number(nftSTAT[4]),
                    Id: Number(nftEQ[4]),
                    Name: nftEQ_3_Name,
                    Image: nftEQ_3,
                    Description: nft3.description,
                    Attribute: nft3.attributes,
                    RewardPerSec: Number(nftEQ[4]) % 100000,
                    isStaked: true
                })
            }
            let shoesIpfs = null
            if (data[3].status === 'success' && Number(nftSTAT[5]) === 1) {
                shoesIpfs = data[3].result
            } else if (data[13].status === 'success' && Number(nftSTAT[5]) === 2) {
                shoesIpfs = data[13].result
            }
            let response4 = null
            try {
                response4 = shoesIpfs !== null ? await fetch(shoesIpfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft4 = response4 !== null ? await response4.json() : {image: null, name: null}
            const nftEQ_4 = nft4.image !== null ? nft4.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_4_Name = nft4.name
            if (response4 !== null) {
                nfts.push({
                    Col: Number(nftSTAT[5]),
                    Id: Number(nftEQ[5]),
                    Name: nftEQ_4_Name,
                    Image: nftEQ_4,
                    Description: nft4.description,
                    Attribute: nft4.attributes,
                    RewardPerSec: Number(nftEQ[5]) % 100000,
                    isStaked: true
                })
            }
            let weaponIpfs = null
            if (data[4].status === 'success' && Number(nftSTAT[6]) === 1) {
                weaponIpfs = data[4].result
            } else if (data[14].status === 'success' && Number(nftSTAT[6]) === 2) {
                weaponIpfs = data[14].result
            }
            let response5 = null
            try {
                response5 = weaponIpfs !== null ? await fetch(weaponIpfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft5 = response5 !== null ? await response5.json() : {image: null, name: null}
            const nftEQ_5 = nft5.image !== null ? nft5.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_5_Name = nft5.name
            if (response5 !== null) {
                nfts.push({
                    Col: Number(nftSTAT[6]),
                    Id: Number(nftEQ[6]),
                    Name: nftEQ_5_Name,
                    Image: nftEQ_5,
                    Description: nft5.description,
                    Attribute: nft5.attributes,
                    RewardPerSec: Number(nftEQ[6]) % 100000,
                    isStaked: true
                })
            }

            let clothIpfs = null
            if (data[5].status === 'success' && Number(nftSTAT[2]) === 1) {
                clothIpfs = data[5].result
            } else if (data[15].status === 'success' && Number(nftSTAT[2]) === 2) {
                clothIpfs = data[15].result
            }
            let response6 = null
            try {
                response6 = clothIpfs !== null ? await fetch(clothIpfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft6 = response6 !== null ? await response6.json() : {image: null, name: null}
            const nftEQ_6 = nft6.image !== null ? nft6.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_6_Name = nft6.name
            if (response6 !== null) {
                nfts.push({
                    Col: Number(nftSTAT[2]),
                    Id: Number(nftEQ[2]),
                    Name: nftEQ_6_Name,
                    Image: nftEQ_6,
                    Description: nft6.description,
                    Attribute: nft6.attributes,
                    RewardPerSec: Number(nftEQ[2]) % 100000,
                    isStaked: true
                })
            }

            let hatIpfs = null
            if (data[6].status === 'success' && Number(nftSTAT[1]) === 1) {
                hatIpfs = data[6].result
            } else if (data[16].status === 'success' && Number(nftSTAT[1]) === 2) {
                hatIpfs = data[16].result
            }
            let response7 = null
            try {
                response7 = hatIpfs !== null ? await fetch(hatIpfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/")) : null
            } catch {}
            const nft7 = response7 !== null ? await response7.json() : {image: null, name: null}
            const nftEQ_7 = nft7.image !== null ? nft7.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/") : null
            const nftEQ_7_Name = nft7.name
            if (response7 !== null) {
                nfts.push({
                    Col: Number(nftSTAT[1]),
                    Id: Number(nftEQ[1]),
                    Name: nftEQ_7_Name,
                    Image: nftEQ_7,
                    Description: nft7.description,
                    Attribute: nft7.attributes,
                    RewardPerSec: Number(nftEQ[1]) % 100000,
                    isStaked: true
                })
            }
            const allPow = Number(nftSTAT[7])
            const isStaked = nftSTAT[9]
            const refuelAt = Number(nftSTAT[8])
            const iiBal = data[7].result
            const uiiBal = data[17].result
            const eeBal = data[8].result
            const rewardPending = isStaked ? data[9].result : 0

            let wallet0RemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const wallet0Filter = await pfpnftSC.filters.Transfer(null, addr, null)
                const wallet0Event = await pfpnftSC.queryFilter(wallet0Filter, 2804540, "latest")
                const wallet0Map = await Promise.all(wallet0Event.map(async (obj) => String(obj.args.tokenId)))
                wallet0RemoveDup = wallet0Map.filter((obj, index) => wallet0Map.indexOf(obj) === index)
            }
            const data0 = addr !== null ? await readContracts(config, {
                contracts: wallet0RemoveDup.map((item) => (
                    {
                        address: taoPFP,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let PFPlv = 0
            let yournftwallet0 = '0'
            for (let i = 0; i <= wallet0RemoveDup.length - 1 && addr !== null; i++) {
                if (data0[i].result.toUpperCase() === addr.toUpperCase()) {
                    if (PFPlv <= 19 && String(wallet0RemoveDup[i]).slice(0, 2) === '19' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 20; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 18 && String(wallet0RemoveDup[i]).slice(0, 2) === '18' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 19; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 17 && String(wallet0RemoveDup[i]).slice(0, 2) === '17' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 18; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 16 && String(wallet0RemoveDup[i]).slice(0, 2) === '16' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 17; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 15 && String(wallet0RemoveDup[i]).slice(0, 2) === '15' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 16; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 14 && String(wallet0RemoveDup[i]).slice(0, 2) === '14' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 15; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 13 && String(wallet0RemoveDup[i]).slice(0, 2) === '13' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 14; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 12 && String(wallet0RemoveDup[i]).slice(0, 2) === '12' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 13; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 11 && String(wallet0RemoveDup[i]).slice(0, 2) === '11' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 12; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 10 && String(wallet0RemoveDup[i]).slice(0, 2) === '10' && String(wallet0RemoveDup[i]).length === 20) {
                        PFPlv = 11; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 9 && String(wallet0RemoveDup[i]).slice(0, 2) === '9' && String(wallet0RemoveDup[i]).length === 19) {
                        PFPlv = 10; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 8 && String(wallet0RemoveDup[i]).slice(0, 2) === '8' && String(wallet0RemoveDup[i]).length === 19) {
                        PFPlv = 9; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 7 && String(wallet0RemoveDup[i]).slice(0, 2) === '7' && String(wallet0RemoveDup[i]).length === 19) {
                        PFPlv = 8; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 6 && String(wallet0RemoveDup[i]).slice(0, 2) === '6' && String(wallet0RemoveDup[i]).length === 19) {
                        PFPlv = 7; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 5 && String(wallet0RemoveDup[i]).slice(0, 2) === '5' && String(wallet0RemoveDup[i]).length === 19) {
                        PFPlv = 6; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 4 && String(wallet0RemoveDup[i]).slice(0, 2) === '4' && String(wallet0RemoveDup[i]).length === 19) {
                        PFPlv = 5; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 3 && String(wallet0RemoveDup[i]).slice(0, 2) === '3' && String(wallet0RemoveDup[i]).length === 19) {
                        PFPlv = 4; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 2 && String(wallet0RemoveDup[i]).slice(0, 2) === '2' && String(wallet0RemoveDup[i]).length === 19) {
                        PFPlv = 3; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv <= 1 && String(wallet0RemoveDup[i]).slice(0, 2) === '1' && String(wallet0RemoveDup[i]).length === 19) {
                        PFPlv = 2; yournftwallet0 = String(wallet0RemoveDup[i])
                    } else if (PFPlv === 0 && String(wallet0RemoveDup[i]).length >= 1) {
                        PFPlv = 1; yournftwallet0 = String(wallet0RemoveDup[i])
                    }
                }
            }

            let walletRemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
                const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335027, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
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
                        address: cmdaoNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
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

            let wallet2RemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const wallet2Filter = await nrtnftSC.filters.Transfer(null, addr, null)
                const wallet2Event = await nrtnftSC.queryFilter(wallet2Filter, 2852393, "latest")
                const wallet2Map = await Promise.all(wallet2Event.map(async (obj) => String(obj.args.tokenId)))
                wallet2RemoveDup = wallet2Map.filter((obj, index) => wallet2Map.indexOf(obj) === index)
            }
            const data4 = addr !== null ? await readContracts(config, {
                contracts: wallet2RemoveDup.map((item) => (
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let yournftwallet2 = []
            for (let i = 0; i <= wallet2RemoveDup.length - 1 && addr !== null; i++) {
                if (data4[i].result.toUpperCase() === addr.toUpperCase()) {
                    yournftwallet2.push({Id: String(wallet2RemoveDup[i])})
                }
            }
            const data5 = addr !== null ? await readContracts(config, {
                contracts: yournftwallet2.map((item) => (
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet2.length - 1; i++) {
                const nftipfs = data5[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 2,
                    Id: yournftwallet2[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet2[i].Id.slice(-5)),
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }
            
            return [
                nfts, nftEQ_1, nftEQ_1_Name, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3, nftEQ_3_Name, nftEQ_4, nftEQ_4_Name, nftEQ_5, nftEQ_5_Name, nftEQ_6, nftEQ_6_Name, nftEQ_7, nftEQ_7_Name,
                allPow, isStaked, refuelAt, rewardPending, iiBal, eeBal, PFPlv, yournftwallet0, uiiBal, 
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
            } else if (result[2] !== null) {
                setCharacterSlotLevel(result[2].slice(-1))
            } else {
                setCharacterSlotLevel(null)
            }
            setRingSlot(result[3])
            result[4] !== null && result[4].slice(-2, -1) === "+" ? setRingSlotLevel(result[4].slice(-1)) : setRingSlotLevel(null)
            setShieldSlot(result[5])
            result[6] !== null && result[6].slice(-2, -1) === "+" ? setShieldSlotLevel(result[6].slice(-1)) : setShieldSlotLevel(null)
            setBootsSlot(result[7])
            result[8] !== null && result[8].slice(-2, -1) === "+" ? setBootsSlotLevel(result[8].slice(-1)) : setBootsSlotLevel(null)
            setSwordSlot(result[9])
            result[10] !== null && result[10].slice(-2, -1) === "+" ? setSwordSlotLevel(result[10].slice(-1)) : setSwordSlotLevel(null)
            setArmorSlot(result[11])
            result[12] !== null && result[12].slice(-2, -1) === "+" ? setArmorSlotLevel(result[12].slice(-1)) : setArmorSlotLevel(null)
            setHelmetSlot(result[13])
            result[14] !== null && result[14].slice(-2, -1) === "+" ? setHelmetSlotLevel(result[14].slice(-1)) : setHelmetSlotLevel(null)
            setAllPower(result[15])
            setIsStakeNow(result[16])
            const gasOut = new Date((Number(result[17]) * 1000) + (86400 * 1000))
            result[17] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[17] !== 0 && Date.now() - (Number(result[17]) * 1000) > (86400 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setAngbPending(ethers.utils.formatEther(String(result[18])))
        
            setIIBalance(ethers.utils.formatEther(String(result[19])))
            setEEBalance(ethers.utils.formatEther(String(result[20])))
            setPfpLevel(result[21])
            setPfpId(result[22])
            setUIIBalance(ethers.utils.formatEther(String(result[23])))
        })

    }, [config, address, addr, intrasubModetext, navigate, chain, txupdate, erc721Abi, erc20Abi, dunEEABI, taoPfpABI])

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
            addr = cmdaoNft
        } else if (transferNftCol === 2) {
            addr = narutaNft
        }
        try {
            let { request } = await simulateContract(config, {
                address: addr,
                abi: erc721Abi,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
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

    const equipNft = async (_index, _nftid) => {
        setisLoading(true)
        let addr = '0x0000000000000000000000000000000000000000'
        try {
            if (_index === 1) {
                addr = cmdaoNft
            } else if (_index === 2) {
                addr = narutaNft
            }
            const nftAllow = await readContract(config, {
                address: addr,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== dunEE.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: addr,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [dunEE, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: dunEE,
                abi: dunEEABI,
                functionName: 'equip',
                args: [_index, _nftid],
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

    const unstakeNft = async (_slot) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: dunEE,
                abi: dunEEABI,
                functionName: 'unstake',
                args: [_slot],
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

    const refuelStake = async () => {
        setisLoading(true)
        let gasAddr = ''
        let gasIndex = 0
        let iiUsage = 0
        let craftIndex = null
        let uAddr = ''
        if (gasselected === "II") {
            gasAddr = iiLab
            uAddr = uiiLab
            gasIndex = 2
            if (pfpLevel === 0) {
                iiUsage = 35
                craftIndex = 0
            } else if (pfpLevel >= 1 && pfpLevel <= 8) {
                iiUsage = 7
                craftIndex = 1
            } else if (pfpLevel >= 9 && pfpLevel <= 19) {
                iiUsage = 4
                craftIndex = 2
            } else if (pfpLevel === 20) {
                iiUsage = 1
                craftIndex = 3
            }
        }
        try {
            if (Number(uiiBalance) === 0) {
                const gasAllow0 = await readContract(config, {
                    address: gasAddr,
                    abi: erc20Abi,
                    functionName: 'allowance',
                    args: [address, uAddr],
                })
                if (Number(ethers.utils.formatEther(gasAllow0)) < iiUsage) {
                    let { request } = await simulateContract(config, {
                        address: gasAddr,
                        abi: erc20Abi,
                        functionName: 'approve',
                        args: [uAddr, ethers.constants.MaxUint256],
                    })
                    let h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
                let { request } = await simulateContract(config, {
                    address: uAddr,
                    abi: uiiABI,
                    functionName: 'craft',
                    args: [craftIndex, pfpId]
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const gasAllow = await readContract(config, {
                address: uAddr,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, dunEE],
            })
            if (Number(ethers.utils.formatEther(gasAllow)) < 1) {
                let { request } = await simulateContract(config, {
                    address: uAddr,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [dunEE, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: dunEE,
                abi: dunEEABI,
                functionName: 'refuel',
                args: [gasIndex]
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
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://gateway.commudao.xyz/ipfs/bafybeiehjcwrzylly7xunlan4xqwe2aynokqkgtj65bwxxqq5wfnz4hcnq?img-quality=50')", overflow: "scroll"}}>
                <div className="SubfieldBanner">
                    <div className="pixel" style={{fontSize: "75px", padding: "10px 20px", width: "fit-content", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Cryptic Cogs</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="https://gateway.commudao.xyz/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm?img-width=150&img-height=150" width="150" alt="$EE" />
                </div>
            </div>
            
            {address !== null && chain !== undefined && chain.id !== 8899 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to JIBCHAIN L1.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{margin: "0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{backdropFilter: "blur(14px)", border: "none", justifyContent: "space-around", padding: "30px", width: "1560px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "#FFFFFF99", width: "370px", height: "360px", margin: "5px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>NFT STAKING</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        {isStakeNow ?
                                            <>
                                                {isRunout ?
                                                    <>
                                                        <div style={{backgroundColor: "red", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Run Out of Gas</div>
                                                    </> :
                                                    <>
                                                        <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>On Staking</div>
                                                    </>
                                                }
                                            </> :
                                            <>
                                                {!isStakeNow &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    {intrasubModetext !== null && intrasubModetext !== undefined && intrasubModetext.length === 42 ?
                                        <><div>ADDRESS</div><div>{intrasubModetext.slice(0, 4) + "..." + intrasubModetext.slice(-4)}</div></> :
                                        <><div>ADDRESS</div><div>-</div></>
                                    }
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    TOTAL POWER PER SEC
                                    <div>{Number(allPower).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    EE BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://gateway.commudao.xyz/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm?img-width=150&img-height=150" height="20" alt="$EE"/>
                                        <div style={{marginLeft: "5px"}}>{Number(eeBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    EE PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://gateway.commudao.xyz/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm?img-width=150&img-height=150" height="20" alt="$EE"/>
                                        <div style={{marginLeft: "5px"}}>{Number(angbPending).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    GAS
                                    <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                        <option value="II">$II</option>
                                    </select>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        {gasselected === "II" &&
                                            <>
                                                <img src="https://gateway.commudao.xyz/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q" height="20" alt="$II"/>
                                                <div style={{marginLeft: "5px"}}>{Number(iiBalance).toLocaleString('en-US', {maximumFractionDigits:1})}</div>
                                            </>
                                        }
                                        <div style={{marginLeft: "5px"}}>/{pfpLevel === 20 && '1 [UR4'}{pfpLevel === 19 && '4 [UR3'}{pfpLevel === 18 && '4 [UR2'}{pfpLevel === 17 && '4 [UR1'}{pfpLevel === 16 && '4 [SSR4'}{pfpLevel === 15 && '4 [SSR3'}{pfpLevel === 14 && '4 [SSR2'}{pfpLevel === 13 && '4 [SSR1'}{pfpLevel === 12 && '4 [SR4'}{pfpLevel === 11 && '4 [SR3'}{pfpLevel === 10 && '4 [SR2'}{pfpLevel === 9 && '4 [SR1'}{pfpLevel === 8 && '7 [R4'}{pfpLevel === 7 && '7 [R3'}{pfpLevel === 6 && '7 [R2'}{pfpLevel === 5 && '7 [R1'}{pfpLevel === 4 && '7 [N4'}{pfpLevel === 3 && '7 [N3'}{pfpLevel === 2 && '7 [N2'}{pfpLevel === 1 && '7 [N1'}{pfpLevel === 0 && '35 [Not The'} PFP Holder]</div> 
                                    </div>
                                </div>
                                {isStakeNow ?
                                    <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunout}</div></div>
                                    : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                                }
                                {address !== null && intrasubModetext !== undefined ?
                                    <>
                                        {address.toUpperCase() === intrasubModetext.toUpperCase() ?
                                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                {isStakeNow ?
                                                    <>
                                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        <div style={{alignSelf: "center", background: isRunout ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                                    </> :
                                                    <>
                                                        {isStakeNow !== null && (gasselected === "II" && ((uiiBalance >= 1) || (pfpLevel === 20 && Number(iiBalance) >= 1) || (pfpLevel >= 9 && pfpLevel <= 19 && Number(iiBalance) >= 4) || (pfpLevel >= 1 && pfpLevel <= 8 && Number(iiBalance) >= 7) || (pfpLevel === 0 && Number(iiBalance) >= 35))) ?
                                                            <>
                                                                {allPower !== 0 ?
                                                                    <div style={{alignSelf: "center"}} className="button" onClick={refuelStake}>REFUEL GAS</div> :
                                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                                }
                                                            </> :
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                                        }
                                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                                    </>
                                                }
                                            </div> :
                                            <div style={{height: "41px"}}></div>
                                        }
                                    </> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div className='slotbox noscroll'>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {helmetSlot !== null ?
                                        <img src={helmetSlot} width="100px" alt="Can not load metadata." /> :
                                        <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                    }
                                    {helmetSlotLevel !== null && <div className='slotlevel2' style={{position: "absolute", top: "85px", padding: "0 6px", fontSize: "25px", color: "#fff"}}>+{helmetSlotLevel}</div>}
                                    {armorSlot !== null ?
                                        <img src={armorSlot} width="100px" alt="Can not load metadata." /> :
                                        <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                    }
                                    {armorSlotLevel !== null && <div className='slotlevel2' style={{position: "absolute", top: "237.5px", fontSize: "25px", color: "#fff"}}>+{armorSlotLevel}</div>}
                                    {bootsSlot !== null ?
                                        <img src={bootsSlot} width="100px" alt="Can not load metadata." /> :
                                        <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                    }
                                    {bootsSlotLevel !== null && <div className='slotlevel2' style={{position: "absolute", top: "385px", fontSize: "25px", color: "#fff"}}>+{bootsSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "300px", height: "440px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                    {nft.length > 0 ?
                                        <>
                                            {characterSlot !== null ?
                                                <img src={characterSlot} width="300px" alt="Can not load metadata." /> :
                                                <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                            }
                                        </> :
                                        <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <ThreeDots fill="#5f6476" />
                                        </div>
                                    }
                                    {characterSlotLevel !== null && <div style={{position: "absolute", top: "335px", right: "10px", fontSize: "25px", color: "#fff"}}>Lv.{characterSlotLevel}</div>}
                                </div>
                                <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                    {ringSlot !== null ?
                                        <img src={ringSlot} width="100px" alt="Can not load metadata." /> :
                                        <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                    }
                                    {ringSlotLevel !== null && <div className='slotlevel' style={{position: "absolute", top: "85px", fontSize: "25px", color: "#fff"}}>+{ringSlotLevel}</div>}
                                    {shieldSlot !== null ?
                                        <img src={shieldSlot} width="100px" alt="Can not load metadata." /> :
                                        <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                    }
                                    {shieldSlotLevel !== null && <div className='slotlevel' style={{position: "absolute", top: "237.5px", fontSize: "25px", color: "#fff"}}>+{shieldSlotLevel}</div>}
                                    {swordSlot !== null ?
                                        <img src={swordSlot} width="100px" alt="Can not load metadata." /> :
                                        <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                    }
                                    {swordSlotLevel !== null && <div className='slotlevel' style={{position: "absolute", top: "385px", fontSize: "25px", color: "#fff"}}>+{swordSlotLevel}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {nft.length > 0 ?
                        <div style={{width: "1650px", margin: "40px 0 80px 0", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                            {nft[0] !== null ?
                                <>
                                    {nft.map((item, index) => (
                                        <>
                                            {item.Id / 100000000000 <= 8 &&
                                                <div style={{backdropFilter: "blur(14px)", border: 0, justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard" key={index}>
                                                    <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                                        <img src={item.Image} height="100%" alt="Can not load metadata." />
                                                    </div>
                                                    <div className="emp bold">{item.Name}</div>
                                                    <div className="bold">{item.RewardPerSec} power</div>
                                                    <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                                    {address !== null && intrasubModetext !== undefined ?
                                                        <>
                                                            {address.toUpperCase() === intrasubModetext.toUpperCase() ?
                                                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                                                    {item.isStaked ?
                                                                        <>
                                                                            <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft(item.Id / 100000000000 | 0)}>UNEQUIP</div>
                                                                        </> :
                                                                        <>
                                                                            {!isStakeNow &&
                                                                                <div style={{alignSelf: "center"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id)}>EQUIP</div>
                                                                            }
                                                                            <div style={{alignSelf: "center", background: "gray"}} className="pixel button" onClick={() => transferNFT(item.Col, item.Id)}>TRANSFER</div>
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
                                <div style={{backdropFilter: "blur(14px)", border: 0, justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
                                    {address !== null ?
                                        <>
                                            <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                            <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                                        </> :
                                        <>
                                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                            <div className="bold">Please connect wallet to view your NFTs.</div>
                                        </>
                                    }
                                </div>
                            }
                        </div> :
                        <div style={{width: "1650px", margin: "40px 0 80px 0", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                            <div className="nftCard" style={{backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "center"}}>
                                <ThreeDots fill="#5f6476" />
                                <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default CrypticCogs