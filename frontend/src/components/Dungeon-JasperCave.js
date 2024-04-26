import React from 'react'
import { ethers } from 'ethers'
import { /*fetchBalance, */readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const beasts = '0x999999999AB9BC4F6EaA79a980Ba9c5AaD4FB868'
//const CMDS = '0xAF17Dc881204488d929a5D377eBCF3256130b335'

const ctunaLab = '0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0'
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const pzaLab = '0x09DcdCFc6C48803681a3422997c679E773656763'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const dunJasperL2 = '0xDe5770c72cEEE0d73503E827973cfD200431ABd4'

const mintStOPT_Router = '0xC61E48947ec282C44D950B58e89D11AE848AdBc8'

const salonRouter = '0x76B6B24BA53042A0e02Cc0e84c875d74EAeFb74a'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const Jaspercave = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc721ABI, erc20ABI, dunJasperABI, dunJasperL2ABI, mintStOPTABI, salonABI }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/dungeon/jasper-cave/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/dungeon/jasper-cave/' + address)
    }
    
    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftCol, setTransferNftCol] = React.useState(null)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState(null)

    const [nft, setNft] = React.useState([])
    const [characterSlot, setCharacterSlot] = React.useState(null)
    const [characterSlotLevel, setCharacterSlotLevel] = React.useState(null)
    const [isOp, setIsOp] = React.useState(null)
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
    /*const [l2FollowerSlot, setL2FollowerSlot] = React.useState(null)
    const [l2FollowerId, setL2FollowerId] = React.useState(null)
    const [l2ServantSlot, setL2ServantSlot] = React.useState(null)
    const [l2ServantId, setL2ServantId] = React.useState(null)*/

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [gasselected, setGasselected] = React.useState("PIZZA")
    const [jasperPending, setJasperPending] = React.useState(0)
    /*const [isStakeL2Now, setIsStakeL2Now] = React.useState(null)
    const [jbcPool, setJbcPool] = React.useState(0)
    const [jbcPend, setJbcPend] = React.useState('0.0')
    const [yourL2CMPOW, setYourL2CMPOW] = React.useState(0)
    const [l2CMPOW, setL2CMPOW] = React.useState(0)*/

    const [lastedSTOPT, setLastedSTOPT] = React.useState(null)

    const [skinSlot1, setSkinSlot1] = React.useState(null)

    const [jbcBalance, setJbcBalance] = React.useState(0)
    const [ctunaBalance, setCTunaBalance] = React.useState(0)
    const [sx31Balance, setSx31Balance] = React.useState(0)
    const [pzaBalance, setPzaBalance] = React.useState(0)
    const [jaspBalance, setJaspBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(hexajibjib, erc721ABI, providerJBC)
        // const beastnftSC = new ethers.Contract(beasts, erc721ABI, providerJBC)
        // const cmdsnftSC = new ethers.Contract(CMDS, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            const nftEQ = address !== null && address !== undefined ? await readContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'nftEquip',
                args: [address],
            }) : [{characterId: 0, hatId: 0, clothId: 0, accessoriesId: 0, backId: 0, shoesId: 0, weaponId: 0, allPow: 0, refuelAt: 0, isStaked: null}]

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                    },
                    {
                        address: ctunaLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: sx31Lab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: pzaLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunJasper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: mintStOPT_Router,
                        abi: mintStOPTABI,
                        functionName: 'userTimeStamp',
                        args: [address],
                    },
                    {
                        address: dunJasperL2,
                        abi: dunJasperL2ABI,
                        functionName: 'userInfo',
                        args: [1, address],
                    },
                    {
                        address: dunJasper,
                        abi: dunJasperABI,
                        functionName: 'calculateRewards',
                        args: [address],
                    },
                    {
                        address: dunJasperL2,
                        abi: dunJasperL2ABI,
                        functionName: 'pendingReward',
                        args: [1, address],
                    }, 
                    {
                        address: salonRouter,
                        abi: salonABI,
                        functionName: 'skin',
                        args: [address, 1],
                    }, 
                ],
            }) : ["", "", "", "", "", "", "", 0, 0, 0, 0, 0, {followerId: 0, servantId: 0, cmpow: 0, rewardDebt: 0}, 0, 0, 0, ]

            let nfts = []

            const response1 = data[0].status === 'success' ? await fetch(data[0].result.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")) : null
            const nft1 = response1 !== null ? await response1.json() : {image: null, name: null}
            const nftEQ_1 = nft1.image !== null ? nft1.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : null
            const nftEQ_1_Name = nft1.name
            if (response1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[0]),
                    Name: nftEQ_1_Name,
                    Image: nftEQ_1,
                    Description: nft1.description,
                    Attribute: nft1.attributes,
                    RewardPerSec: Number(nftEQ[0]) % 100000,
                    isStaked: true
                })
            }

            const response2 = data[1].status === 'success' ? await fetch(data[1].result.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")) : null
            const nft2 = response2 !== null ? await response2.json() : {image: null, name: null}
            const nftEQ_2_Img = nft2.image !== null ? nft2.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : null
            const nftEQ_2_Name = nft2.name
            if (response2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[3]),
                    Name: nftEQ_2_Name,
                    Image: nftEQ_2_Img,
                    Description: nft2.description,
                    Attribute: nft2.attributes,
                    RewardPerSec: Number(nftEQ[3]) % 100000,
                    isStaked: true
                })
            }
            
            const response3 = data[2].status === 'success' ? await fetch(data[2].result.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")) : null
            const nft3 = response3 !== null ? await response3.json() : {image: null, name: null}
            const nftEQ_3 = nft3.image !== null ? nft3.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : null
            const nftEQ_3_Name = nft3.name
            if (response3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[4]),
                    Name: nftEQ_3_Name,
                    Image: nftEQ_3,
                    Description: nft3.description,
                    Attribute: nft3.attributes,
                    RewardPerSec: Number(nftEQ[4]) % 100000,
                    isStaked: true
                })
            }

            const response4 = data[3].status === 'success' ? await fetch(data[3].result.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")) : null
            const nft4 = response4 !== null ? await response4.json() : {image: null, name: null}
            const nftEQ_4 = nft4.image !== null ? nft4.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : null
            const nftEQ_4_Name = nft4.name
            if (response4 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[5]),
                    Name: nftEQ_4_Name,
                    Image: nftEQ_4,
                    Description: nft4.description,
                    Attribute: nft4.attributes,
                    RewardPerSec: Number(nftEQ[5]) % 100000,
                    isStaked: true
                })
            }

            const response5 = data[4].status === 'success' ? await fetch(data[4].result.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")) : null
            const nft5 = response5 !== null ? await response5.json() : {image: null, name: null}
            const nftEQ_5 = nft5.image !== null ? nft5.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : null
            const nftEQ_5_Name = nft5.name
            if (response5 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[6]),
                    Name: nftEQ_5_Name,
                    Image: nftEQ_5,
                    Description: nft5.description,
                    Attribute: nft5.attributes,
                    RewardPerSec: Number(nftEQ[6]) % 100000,
                    isStaked: true
                })
            }

            const response6 = data[5].status === 'success' ? await fetch(data[5].result.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")) : null
            const nft6 = response6 !== null ? await response6.json() : {image: null, name: null}
            const nftEQ_6 = nft6.image !== null ? nft6.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : null
            const nftEQ_6_Name = nft6.name
            if (response6 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[2]),
                    Name: nftEQ_6_Name,
                    Image: nftEQ_6,
                    Description: nft6.description,
                    Attribute: nft6.attributes,
                    RewardPerSec: Number(nftEQ[2]) % 100000,
                    isStaked: true
                })
            }

            const response7 = data[6].status === 'success' ? await fetch(data[6].result.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")) : null
            const nft7 = response7 !== null ? await response7.json() : {image: null, name: null}
            const nftEQ_7 = nft7.image !== null ? nft7.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : null
            const nftEQ_7_Name = nft7.name
            if (response7 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[1]),
                    Name: nftEQ_7_Name,
                    Image: nftEQ_7,
                    Description: nft7.description,
                    Attribute: nft7.attributes,
                    RewardPerSec: Number(nftEQ[1]) % 100000,
                    isStaked: true
                })
            }

            const allPow = Number(nftEQ[7])
            const isStaked = nftEQ[9]
            const refuelAt = Number(nftEQ[8])

            const ctunaBal = data[7].result
            const sx31Bal = data[8].result
            const pzaBal = data[9].result
            const jaspBal = data[10].result
            const stOPTClaim = isStaked === true ? data[11].result : 0
            const nftEQ_L2 = data[12].result
            const rewardPending = isStaked === true ? data[13].result : 0
            
            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data2[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet.map((item) => (
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}

                nfts.push({
                    Col: 1,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            /*const nftipfs = address !== null && address !== undefined ? await readContract({
                address: beasts,
                abi: erc721ABI,
                functionName: 'tokenURI',
                args: [String(data[12].followerId)],
            }) : null  
            let nft = {name: "", image: "", description: "", attributes: ""}
            try {
                const responsenft = nftipfs !== null ? await fetch(nftipfs.replace("ipfs://", "https://ipfs.8api.sh/ipfs/")) : null
                nft = responsenft !== null ? await responsenft.json() : null
            } catch {}
            if (Number(data[12].followerId) !== 0) {
                nfts.push({
                    Col: 2,
                    Id: Number(data[12].followerId),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0,
                    isStaked: true
                })
            }

            const nftipfs2 = address !== null && address !== undefined ? await readContract({
                address: CMDS,
                abi: erc721ABI,
                functionName: 'tokenURI',
                args: [String(data[12].servantId)],
            }) : null
            const responsenft2 = nftipfs2 !== null ? await fetch(nftipfs2.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")) : null
            const nft02 = responsenft2 !== null ? await responsenft2.json() : null
            if (Number(data[12].servantId) !== 0) {
                nfts.push({
                    Col: 3,
                    Id: Number(data[12].servantId),
                    Name: nft02.name,
                    Image: nft02.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"),
                    Description: nft02.description,
                    Attribute: nft02.attributes,
                    RewardPerSec: 100,
                    isStaked: true
                })
            }
            
            const nft02 = null

            const L2_Follower_Id = Number(data[12].followerId)
            const nftEQ_L2_Follower = Number(data[12].followerId) !== 0 && nft !== null ? nft.image.replace("ipfs://", "https://ipfs.8api.sh/ipfs/") : null
            const L2_Servant_Id = Number(data[12].servantId)
            const nftEQ_L2_Servant = Number(data[12].servantId) !== 0 && nft02 !== null ? nft02.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/") : null
            const isStakeL2 = Number(nftEQ_L2.cmpow) > 0
            const cmpow_L2 = Number(nftEQ_L2.cmpow)
            const jbcPend = isStakeL2 ? data[14] : 0

            const wallet2Filter = await beastnftSC.filters.Transfer(null, address, null)
            const wallet2Event = await beastnftSC.queryFilter(wallet2Filter, 137000, "latest")
            const wallet2Map = await Promise.all(wallet2Event.map(async (obj, index) => String(obj.args.tokenId)))
            const wallet2RemoveDup = wallet2Map.filter((obj, index) => wallet2Map.indexOf(obj) === index)
            const data4 = address !== null && address !== undefined ? await readContracts({
                contracts: wallet2RemoveDup.map((item) => (
                    {
                        address: beasts,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(wallet2RemoveDup.length).fill('')]

            let yournftwallet2 = []
            for (let i = 0; i <= wallet2RemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data4[i].toUpperCase() === address.toUpperCase()) {
                    yournftwallet2.push({Id: String(wallet2RemoveDup[i])})
                }
            }
            console.log(yournftwallet2)

            const data5 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet2.map((item) => (
                    {
                        address: beasts,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet2.length).fill('')]

            for (let i = 0; i <= yournftwallet2.length - 1; i++) {
                const nftipfs = data5[i]
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const responsenft = nftipfs !== null ? await fetch(nftipfs.replace("ipfs://", "https://ipfs.8api.sh/ipfs/")) : null
                    nft = responsenft !== null ? await responsenft.json() : null
                } catch {}

                nfts.push({
                    Col: 2,
                    Id: yournftwallet2[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0,
                    isStaked: false
                })
            }

            const wallet3Filter = await cmdsnftSC.filters.Transfer(null, address, null)
            const wallet3Event = await cmdsnftSC.queryFilter(wallet3Filter, 659239, "latest")
            const wallet3Map = await Promise.all(wallet3Event.map(async (obj, index) => String(obj.args.tokenId)))
            const wallet3RemoveDup = wallet3Map.filter((obj, index) => wallet3Map.indexOf(obj) === index)
            const data6 = address !== null && address !== undefined ? await readContracts({
                contracts: wallet3RemoveDup.map((item) => (
                    {
                        address: CMDS,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(wallet3RemoveDup.length).fill('')]

            let yournftwallet3 = []
            for (let i = 0; i <= wallet3RemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                try {
                    if (data6[i].toUpperCase() === address.toUpperCase()) {
                        yournftwallet3.push({Id: String(wallet3RemoveDup[i])})
                    }
                } catch {}
            }
            console.log(yournftwallet3)

            const data7 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet3.map((item) => (
                    {
                        address: CMDS,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet3.length).fill('')]

            for (let i = 0; i <= yournftwallet3.length - 1 && yournftwallet3[i].Id.slice(0, 7) === "1000004"; i++) {
                const nftipfs = data7[i]
                const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"))
                const nft = await response.json()

                nfts.push({
                    Col: 3,
                    Id: yournftwallet3[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 100,
                    isStaked: false
                })
            }
            */

            if (nfts.length === 0) { nfts.push(null) }
            
            const l2Pool = 0/*await readContract({
                address: dunJasperL2,
                abi: dunJasperL2ABI,
                functionName: 'poolInfo',
                args: [1],
            })*/
            const l2PoolCMPOW = 0/*Number(l2Pool.cmpowAll)*/

            const jbcPool = 0/*await fetchBalance({ address: dunJasperL2, })*/

            const jbcBal = 0/*address !== null && address !== undefined ? await fetchBalance({ address: address, }) : {formatted: 0}*/

            console.log(nftEQ_L2, l2Pool, l2PoolCMPOW, jbcPool, )

            const skinslot1 = data[15].result
            
            return [
                nfts, nftEQ_1, nftEQ_1_Name, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3, nftEQ_3_Name, nftEQ_4, nftEQ_4_Name, nftEQ_5, nftEQ_5_Name, nftEQ_6, nftEQ_6_Name, nftEQ_7, nftEQ_7_Name, /*L2_Follower_Id, nftEQ_L2_Follower, L2_Servant_Id, nftEQ_L2_Servant,*/
                allPow, isStaked, refuelAt, rewardPending, /*isStakeL2, jbcPool, jbcPend, l2PoolCMPOW, cmpow_L2,*/ stOPTClaim,
                jbcBal, ctunaBal, sx31Bal, pzaBal, jaspBal,
                skinslot1
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
            result[2] !== null && result[2].slice(0, 7) === "SAPIENS" ? setIsOp(true) : setIsOp(false)
            setAccSlot(result[3])
            result[4] !== null && Number(result[4].slice(-1)) > 0 ? setAccSlotLevel(result[4].slice(-1)) : setAccSlotLevel(null)
            setBackSlot(result[5])
            result[6] !== null && Number(result[6].slice(-1)) > 0 ? setBackSlotLevel(result[6].slice(-1)) : setBackSlotLevel(null)
            setShoesSlot(result[7])
            result[8] !== null && Number(result[8].slice(-1)) > 0 ? setShoesSlotLevel(result[8].slice(-1)) : setShoesSlotLevel(null)
            setWeaponSlot(result[9])
            result[10] !== null && Number(result[10].slice(-1)) > 0 ? setWpSlotLevel(result[10].slice(-1)) : setWpSlotLevel(null)
            setClothSlot(result[11])
            result[12] !== null && Number(result[12].slice(-1)) > 0 ? setClothSlotLevel(result[12].slice(-1)) : setClothSlotLevel(null)
            setHatSlot(result[13])
            result[14] !== null && Number(result[14].slice(-1)) > 0 ? setHatSlotLevel(result[14].slice(-1)) : setHatSlotLevel(null)
            /*setL2FollowerId(result[15])
            setL2FollowerSlot(result[16])
            setL2ServantId(result[17])
            setL2ServantSlot(result[18])*/

            setAllPower(result[15])
            setIsStakeNow(result[16])
            const gasOut = new Date((Number(result[17]) * 1000) + (86400 * 1000))
            result[17] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[17] !== 0 && Date.now() - (Number(result[17]) * 1000) > (86400 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setJasperPending(ethers.utils.formatUnits(String(result[18]), "gwei"))
            /*setIsStakeL2Now(result[23])
            setJbcPool(result[24].formatted)
            setJbcPend(ethers.utils.formatEther(String(result[25])))
            setL2CMPOW(result[26])
            setYourL2CMPOW(result[27])*/

            setLastedSTOPT(Number(result[17]) * 1000 === Number(result[19]) * 1000)

            setJbcBalance(result[20].formatted)
            setCTunaBalance(ethers.utils.formatEther(String(result[21])))
            setSx31Balance(ethers.utils.formatEther(String(result[22])))
            setPzaBalance(ethers.utils.formatEther(String(result[23])))
            setJaspBalance(ethers.utils.formatUnits(String(result[24]), "gwei"))
            setSkinSlot1(result[25])
        })

    }, [address, txupdate, erc721ABI, erc20ABI, dunJasperABI, dunJasperL2ABI, mintStOPTABI, salonABI])

    console.log(jbcBalance, )

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
            addr = hexajibjib
        } else if (transferNftCol === 2) {
            addr = beasts
        }
        try {
            const config = await prepareWriteContract({
                address: addr,
                abi: erc721ABI,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const equipNft = async (_nftid) => {
        setisLoading(true)
        const nftAllow = await readContract({
            address: hexajibjib,
            abi: erc721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== dunJasper.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [dunJasper, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'equip',
                args: [_nftid],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const unstakeNft = async (_slot) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'unstake',
                args: [_slot],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const refuelStake = async () => {
        setisLoading(true)
        let gasAddr = ''
        let gasIndex = 0
        if (gasselected === "CTUNA") {
            gasAddr = ctunaLab
            gasIndex = 1
        } else if (gasselected === "SX31") {
            gasAddr = sx31Lab
            gasIndex = 2
        } else if (gasselected === "PIZZA") {
            gasAddr = pzaLab
            gasIndex = 3
        }
        const gasAllow = await readContract({
            address: gasAddr,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, dunJasper],
        })
        if (gasAllow < (500 * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: gasAddr,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [dunJasper, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'refuel',
                args: [gasIndex]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const stakeFollowerL2 = async (_nftid) => {/*
        setisLoading(true)
        try {
            if (yourL2CMPOW !== 0) {
                const config0 = await prepareWriteContract({
                    address: dunJasperL2,
                    abi: dunJasperL2ABI,
                    functionName: 'unstakeL2',
                    args: [1, false, false]
                })
                const { hash: hash10 } = await writeContract(config0)
                await waitForTransaction({ hash: hash10 })
            }
            if (_nftid !== 0) {
                const nftAllow = await readContract({
                    address: beasts,
                    abi: erc721ABI,
                    functionName: 'getApproved',
                    args: [_nftid],
                })
                if (nftAllow.toUpperCase() !== dunJasperL2.toUpperCase()) {
                    const config = await prepareWriteContract({
                        address: beasts,
                        abi: erc721ABI,
                        functionName: 'approve',
                        args: [dunJasperL2, _nftid],
                    })
                    const { hash: hash0 } = await writeContract(config)
                    await waitForTransaction({ hash: hash0 })
                }
            }
            const config2 = await prepareWriteContract({
                address: dunJasperL2,
                abi: dunJasperL2ABI,
                functionName: 'stakeL2',
                args: [1, _nftid, 0]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const unstakeL2 = async () => {
        setisLoading(true)
        try {
            const _isUnstakeFollower = l2FollowerId !== null ? true : false
            const _isUnstakeServant = false
            const config2 = await prepareWriteContract({
                address: dunJasperL2,
                abi: dunJasperL2ABI,
                functionName: 'unstakeL2',
                args: [1, _isUnstakeFollower, _isUnstakeServant]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    */}

    const stakeServantL2 = async (_nftid) => {/*
        setisLoading(true)
        try {
            if (l2CMPOW !== 0) {
                const config0 = await prepareWriteContract({
                    address: dunJasperL2,
                    abi: dunJasperL2ABI,
                    functionName: 'unstakeL2',
                    args: [1, false, false]
                })
                const { hash: hash10 } = await writeContract(config0)
                await waitForTransaction({ hash: hash10 })
            }
            if (_nftid !== 0) {
                const nftAllow = await readContract({
                    address: CMDS,
                    abi: erc721ABI,
                    functionName: 'getApproved',
                    args: [_nftid],
                })
                if (nftAllow.toUpperCase() !== dunJasperL2.toUpperCase()) {
                    const config = await prepareWriteContract({
                        address: CMDS,
                        abi: erc721ABI,
                        functionName: 'approve',
                        args: [dunJasperL2, _nftid],
                    })
                    const { hash: hash0 } = await writeContract(config)
                    await waitForTransaction({ hash: hash0 })
                }
            }
            const config2 = await prepareWriteContract({
                address: dunJasperL2,
                abi: dunJasperL2ABI,
                functionName: 'stakeL2',
                args: [1, 0, _nftid]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    */}

    const mintStOPT = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: mintStOPT_Router,
                abi: mintStOPTABI,
                functionName: 'mintST',
                args: []
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        {isTransferModal ?
            <div className="centermodal">
                <div className="wrapper">
                    <div className="bold" style={{width: "500px", height: "250px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{fontSize: "20px"}}>{transferName}</div>
                        <input style={{width: "80%", padding: "10px", fontSize: "20px"}} value={transferTo} onChange={transferToHandle} placeholder="Enter 0x..."></input>
                        <div className="button" style={{width: "50%"}} onClick={transferNFTConfirm}>TRANSFER</div>
                        <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsTransferModal(false)}>CLOSE</div>
                    </div>
                </div>
            </div> :
            <></>
        }
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://gateway.pinata.cloud/ipfs/bafkreiaxkxb6ajdih52bwme2q3ikeedjyrgad6p53njchr6dhopnltimre')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>Jasper Cave</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">Exploring exotic cave to collect a rare token, $Jasper.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="https://gateway.pinata.cloud/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" width="150" alt="$JASP" />
            </div>
        </div>

        <div style={{background: "rgb(14, 5, 47)", margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                        <div style={{fontSize: "22px", lineHeight: "15px"}}>LAYER 1 STAKING</div>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", color: "rgb(0, 209, 255)"}}>
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
                                    {isStakeNow === false ?
                                        <>
                                            <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                            <div>Available for stake</div>
                                        </> :
                                        <></>
                                    }
                                    </>
                                }
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            {address !== undefined ?
                                <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                <>ADDRESS <div>-</div></>
                            }
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            TOTAL CMPOW PER SEC 
                            <div>{Number(allPower).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            JASP BALANCE (GWEI UNIT)
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="https://gateway.pinata.cloud/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="20" alt="$JASP"/>
                                <div style={{marginLeft: "5px"}}>{Number(jaspBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            JASP PENDING (GWEI UNIT)
                            <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                <img src="https://gateway.pinata.cloud/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="20" alt="$JASP"/>
                                <div style={{marginLeft: "5px"}}>{Number(jasperPending).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            GAS USAGE
                            <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent", color: "#fff"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                <option value="CTUNA">$CTUNA</option>
                                <option value="SX31">$SX31</option>
                                <option value="PIZZA">$PZA</option>
                            </select>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {gasselected === "CTUNA" ?
                                    <>
                                        <img src="https://gateway.pinata.cloud/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" height="20" alt="$CTUNA"/>
                                        <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toLocaleString('en-US', {maximumFractionDigits:1})}</div>
                                    </> :
                                    <></>
                                }
                                {gasselected === "SX31" ?
                                    <>
                                        <img src="https://gateway.pinata.cloud/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" height="20" alt="$SX31"/>
                                        <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toLocaleString('en-US', {maximumFractionDigits:1})}</div>
                                    </> :
                                    <></>
                                }
                                {gasselected === "PIZZA" ?
                                    <>
                                        <img src="https://gateway.pinata.cloud/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" height="20" alt="$PZA"/>
                                        <div style={{marginLeft: "5px"}}>{Number(pzaBalance).toLocaleString('en-US', {maximumFractionDigits:1})}</div>
                                    </> :
                                    <></>
                                }
                                <div style={{marginLeft: "5px"}}>/500</div>
                            </div>
                        </div>
                        {isStakeNow ?
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT AT <div>{timeToRunout}</div></div>
                            : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT IN <div>1 day</div></div>
                        }
                        {address !== undefined && address === youraddr ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {isStakeNow ?
                                    <>
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                        <div style={{alignSelf: "center", background: isRunout ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                    </> :
                                    <>
                                        {isStakeNow !== null && ((gasselected === "CTUNA" && Number(ctunaBalance) >= 500) || (gasselected === "SX31" && Number(sx31Balance) >= 500) || (gasselected === "PIZZA" && Number(pzaBalance) >= 500)) ?
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
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {hatSlot !== null ?
                            <img src={hatSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/hat.png" width="100px" alt="Hat_slot" />
                        }
                        {hatSlotLevel !== null ?
                            <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevel}</div> :
                            <></>
                        }
                        {clothSlot !== null ?
                            <img src={clothSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/cloth.png" width="100px" alt="Cloth_slot" />
                        }
                        {clothSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevel}</div> :
                            <></>
                        }
                        {shoesSlot !== null ?
                            <img src={shoesSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/shoes.png" width="100px" alt="Shoes_slot" />
                        }
                        {shoesSlotLevel !== null ?
                            <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{shoesSlotLevel}</div> :
                            <></>
                        }
                    </div>
                    <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT</div>
                        {nft.length > 0 ?
                            <>
                                {characterSlot !== null ?
                                    <>
                                        {Number(skinSlot1) === 0 || (characterSlot !== "https://gateway.pinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && characterSlot !== "https://gateway.pinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia") ?
                                            <img src={characterSlot} width="300px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                        {characterSlot === "https://gateway.pinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && Number(String(skinSlot1).slice(0, 1)) === 1 ?
                                            <img src="https://gateway.pinata.cloud/ipfs/bafkreibynd6gqsb7idmhy7xk5qx5cdzmayvns7gfj7dsvpfymg2kjjajtm" width="300px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                        {characterSlot === "https://gateway.pinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia" && Number(String(skinSlot1).slice(0, 1)) === 1 ?
                                            <img src="https://gateway.pinata.cloud/ipfs/bafkreif5fecf5rqrlixcxtpzplo7frtftt3yh2cmx6oca4l2jxuryjju2m" width="300px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                }
                            </> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                        {characterSlotLevel !== null ?
                            <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px", fontSize: "25px", color: "#000"}}>Lv.{characterSlotLevel}</div> :
                            <></>
                        }
                        {isOp && isStakeNow && !lastedSTOPT ?
                            <div style={{position: "absolute", top: "300px", left: 0, border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", borderRadius: 0, background: "rgb(103, 186, 167)"}} className="button" onClick={mintStOPT}>Obtain stOPT <img src="https://gateway.pinata.cloud/ipfs/bafkreibtp4almzmdovhvygxeyykw5fa6pqe76cbdum4quispehlddqgp2e" height="18" alt="$stOPT"/></div> :
                            <></>
                        }
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot !== null ?
                            <img src={accSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Accessories_slot" />
                        }
                        {accSlotLevel !== null ?
                            <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{accSlotLevel}</div> :
                            <></>
                        }
                        {backSlot !== null ?
                            <img src={backSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/back.png" width="100px" alt="Back_slot" />
                        }
                        {backSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{backSlotLevel}</div> :
                            <></>
                        }
                        {weaponSlot !== null ?
                            <img src={weaponSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/weapon.png" width="100px" alt="Weapon_slot" />
                        }
                        {wpSlotLevel !== null ?
                            <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{wpSlotLevel}</div> :
                            <></>
                        }
                    </div>
                </div>
            </div>

            {/*<div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", marginBottom: "100px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                            <div style={{fontSize: "22px", lineHeight: "15px"}}>LAYER 2 STAKING</div>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", color: "rgb(0, 209, 255)"}}>
                                {isStakeL2Now ?
                                    <>
                                        <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                        <div>On Staking</div>
                                    </> :
                                    <>
                                    {isStakeL2Now === false ?
                                        <>
                                            <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                            <div>Available for stake</div>
                                        </> :
                                        <></>
                                    }
                                    </>
                                }
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            TOTAL CMPOW PER BLOCK
                            <div style={{display: "flex", flexDirection: "row"}}>{yourL2CMPOW}</div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            POOL SHARE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div style={{marginLeft: "5px"}}>{isStakeL2Now ? Number((yourL2CMPOW * 100) / l2CMPOW).toFixed(6) : 0}%</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            JBC BALANCE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="https://gateway.pinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" height="20" alt="$JBC"/>
                                <div style={{marginLeft: "5px"}}>{Number(jbcBalance).toFixed(3)}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            JBC PENDING
                            <div style={{display: "flex", flexDirection: "row", color: isStakeL2Now ? "#ff007a" : "#5f6476"}}>
                                <img src="https://gateway.pinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" height="20" alt="$JBC"/>
                                <div style={{marginLeft: "5px"}}>Reward has been depleted!</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            AVAILABLE JBC IN POOL
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="https://gateway.pinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" height="20" alt="$JBC"/>
                                <div style={{marginLeft: "5px"}}>{Number(jbcPool).toFixed(3)}</div>
                            </div>
                        </div>
                        <div style={{height: "95px", width: "100%", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", letterSpacing: 1}} className="bold">
                            {address !== undefined && address === youraddr && isStakeNow && l2FollowerSlot !== null ?
                                <>
                                    {Number(jbcPool) > 0 ?
                                        <>
                                            {isStakeL2Now ?
                                                <div style={{width: "200px", alignSelf: "center"}} className="pixel button" onClick={unstakeL2}>UNSTAKE L2</div> :
                                                <div style={{width: "200px", alignSelf: "center"}} className="pixel button" onClick={() => stakeFollowerL2(0)}>STAKE L2</div>
                                            }
                                        </> :
                                        <div style={{width: "fit-content", alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Reward has been depleted!</div>
                                    }
                                </> :
                                <>
                                    {isStakeL2Now ?
                                        <div style={{width: "200px", alignSelf: "center"}} className="pixel button" onClick={unstakeL2}>UNSTAKE L2</div> :
                                        <div style={{width: "200px", alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">STAKE L2</div>
                                    }
                                </>
                            }
                            <div style={{width: "100%", margin: "20px 0 10px 0", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">**In order to earn $JBC by staking Follower NFT,<br></br>Layer 1 staking is requisite.**</div>
                            <div style={{width: "100%", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">Unlike Layer 1, staking in Layer 2 is gas-independent, enabling to stake once and claim all rewards at a later time, even after a prolonged period of dormancy.</div>
                            
                        </div>
                    </div>
                    <div style={{margin: "0 20px", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Follower NFT</div>
                        {nft.length > 0 ?
                            <>
                                {l2FollowerSlot !== null ?
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                        <img src={l2FollowerSlot} height="100%" alt="Can not load metadata." />
                                    </div> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                }
                            </> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                    </div>
                    <div style={{margin: "0 20px", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                    <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Pet NFT</div>
                        {l2ServantSlot !== null ?
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                <img src={l2ServantSlot} height="100%" alt="Can not load metadata." />
                            </div> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                    </div>
                </div>
            </div>*/}
            
            {nft.length > 0 ?
                <div style={{marginTop: "40px", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                        {nft.map((item, index) => (
                            <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard" key={index}>
                                <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                    <img src={item.Image} height="100%" alt="Can not load metadata." />
                                </div>
                                <div className="emp bold">{item.Name}</div>
                                <div className="bold">{item.RewardPerSec} cmpow per sec</div>
                                <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                {address === youraddr ?
                                    <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                        {item.isStaked ?
                                            <>
                                                {item.Col === 1 ?
                                                    <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft((item.Id / 100000000000) | 0)}>UNEQUIP</div> :
                                                    <></>
                                                }
                                            </> :
                                            <>
                                                {isStakeNow ?
                                                    <>
                                                        {item.Col === 2 ?
                                                            <div style={{alignSelf: "center"}} className="pixel button" onClick={() => stakeFollowerL2(item.Id)}>STAKE L2</div> :
                                                            <>
                                                                {item.Col === 3 ?
                                                                    <div style={{alignSelf: "center"}} className="pixel button" onClick={() => stakeServantL2(item.Id)}>STAKE L2</div> :
                                                                    <></>
                                                                }
                                                            </>
                                                        }
                                                    </> :
                                                    <>
                                                        {item.Col !== 1 ?
                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">STAKE L2</div> :
                                                            <div style={{alignSelf: "center"}} className="pixel button" onClick={() => equipNft(item.Id)}>EQUIP</div>
                                                        }
                                                    </>
                                                }
                                                <div style={{alignSelf: "center", background: "gray"}} className="pixel button" onClick={() => transferNFT(item.Col, item.Id)}>TRANSFER</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                        ))}
                        </> :
                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
                            {address !== undefined ?
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
                <div style={{marginTop: "40px", width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                    <div className="nftCard" style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center"}}>
                        <ThreeDots fill="#fff" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default Jaspercave