import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const cmdaonft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const narutanft = '0x5E620D8980335167d9eF36cEf5d9A6Ea6607a8Cb'
const bbnft = '0xc304195Ad2F55810EcD1e63d9D975e29138Dbd4E'
const doijibToken = '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB'
const silToken = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const mintStOPT_Router = '0xeFb6F6018F5D6c0D1e58F751a57fa716e72d1182'
const salonRouter = '0x76B6B24BA53042A0e02Cc0e84c875d74EAeFb74a'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const Memeticorbit = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc721ABI, erc20ABI, dunJasperABI, mintStOPTABI, salonABI }) => {
    //let { address } = useAccount()
    let address = '0x372191741EEF36a69C489B305632a390e0753101'
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/dungeon/memetic-orbit/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/dungeon/memetic-orbit/' + address)
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

    const [ss1CharacterSlot, setSs1CharacterSlot] = React.useState(null)
    const [ss1CharacterSlotLevel, setSs1CharacterSlotLevel] = React.useState(null)
    const [ss1HatSlot, setSs1HatSlot] = React.useState(null)
    const [ss1HatSlotLevel, setSs1HatSlotLevel] = React.useState(null)
    const [ss1ClothSlot, setSs1ClothSlot] = React.useState(null)
    const [ss1ClothSlotLevel, setSs1ClothSlotLevel] = React.useState(null)
    const [ss1AccSlot, setSs1AccSlot] = React.useState(null)
    const [ss1AccSlotLevel, setSs1AccSlotLevel] = React.useState(null)
    const [ss1BackSlot, setSs1BackSlot] = React.useState(null)
    const [ss1BackSlotLevel, setSs1BackSlotLevel] = React.useState(null)
    const [ss1ShoesSlot, setSs1ShoesSlot] = React.useState(null)
    const [ss1ShoesSlotLevel, setSs1ShoesSlotLevel] = React.useState(null)
    const [ss1WeaponSlot, setSs1WeaponSlot] = React.useState(null)
    const [ss1WpSlotLevel, setSs1WpSlotLevel] = React.useState(null)

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [ss, setSs] = React.useState(1)
    const [jasperPending, setJasperPending] = React.useState(0)
    const [isStakeL2Now, setIsStakeL2Now] = React.useState(null)
    const [yourL2CMPOW, setYourL2CMPOW] = React.useState(0)

    const [lastedSTOPT, setLastedSTOPT] = React.useState(null)

    const [skinSlot1, setSkinSlot1] = React.useState(null)

    const [doijibBalance, setDoijibBalance] = React.useState(0)
    const [silBalance, setSilBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(cmdaonft, erc721ABI, providerJBC)
        const narutanftSC = new ethers.Contract(narutanft, erc721ABI, providerJBC)
        const bbnftSC = new ethers.Contract(bbnft, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            const nftEQ = address !== null && address !== undefined ? await readContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'nftEquip',
                args: [address],
            }) : [{characterId: 0, hatId: 0, clothId: 0, accessoriesId: 0, backId: 0, shoesId: 0, weaponId: 0, allPow: 0, refuelAt: 0, isStaked: null}]

            const data = await readContracts({
                contracts: [
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                    },
                    {
                        address: cmdaonft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                    },
                    {
                        address: doijibToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: silToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: mintStOPT_Router,
                        abi: mintStOPTABI,
                        functionName: 'userTimeStamp',
                        args: [address, 2],
                    },
                    {
                        address: dunJasper,
                        abi: dunJasperABI,
                        functionName: 'calculateRewards',
                        args: [address],
                    },
                    {
                        address: salonRouter,
                        abi: salonABI,
                        functionName: 'skin',
                        args: [address, 1],
                    }, 
                ],
            })

            let nfts = []

            let response1 = null
            try {
                //response1 = data[0].status === 'success' ? await fetch(data[0].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft1 = response1 !== null ? await response1.json() : {image: null, name: null}
            const nftEQ_1 = nft1.image !== null ? nft1.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
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

            let response2 = null
            try {
                //response2 = data[1].status === 'success' ? await fetch(data[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft2 = response2 !== null ? await response2.json() : {image: null, name: null}
            const nftEQ_2_Img = nft2.image !== null ? nft2.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
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
            
            let response3 = null
            try {
                //response3 = data[2].status === 'success' ? await fetch(data[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft3 = response3 !== null ? await response3.json() : {image: null, name: null}
            const nftEQ_3 = nft3.image !== null ? nft3.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
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

            let response4 = null
            try {
                //response4 = data[3].status === 'success' ? await fetch(data[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft4 = response4 !== null ? await response4.json() : {image: null, name: null}
            const nftEQ_4 = nft4.image !== null ? nft4.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
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
            
            let response5 = null
            try {
                //response5 = data[4].status === 'success' ? await fetch(data[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft5 = response5 !== null ? await response5.json() : {image: null, name: null}
            const nftEQ_5 = nft5.image !== null ? nft5.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
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

            let response6 = null
            try {
                //response6 = data[5].status === 'success' ? await fetch(data[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft6 = response6 !== null ? await response6.json() : {image: null, name: null}
            const nftEQ_6 = nft6.image !== null ? nft6.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
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

            let response7 = null
            try {
                //response7 = data[6].status === 'success' ? await fetch(data[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft7 = response7 !== null ? await response7.json() : {image: null, name: null}
            const nftEQ_7 = nft7.image !== null ? nft7.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
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

            const doijibBal = data[7].result
            const silBal = data[8].result
            const stOPTClaim = isStaked === true ? data[9].result : 0
            const rewardPending = isStaked === true ? data[10].result : 0
            const skinslot1 = data[11].result
            
            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdaonft,
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
                        address: cmdaonft,
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
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 1,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            const walletFilter2 = await narutanftSC.filters.Transfer(null, address, null)
            const walletEvent2 = await narutanftSC.queryFilter(walletFilter2, 2852393, "latest")
            const walletMap2 = await Promise.all(walletEvent2.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup2 = walletMap2.filter((obj, index) => walletMap2.indexOf(obj) === index)
            const data4 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup2.map((item) => (
                    {
                        address: narutanft,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup2.length).fill('')]
            let yournftwallet2 = []
            for (let i = 0; i <= walletRemoveDup2.length - 1 && address !== null && address !== undefined; i++) {
                if (data4[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet2.push({Id: String(walletRemoveDup2[i])})
                }
            }
            const data5 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet2.map((item) => (
                    {
                        address: narutanft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet2.length).fill('')]
            for (let i = 0; i <= yournftwallet2.length - 1; i++) {
                const nftipfs = data5[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 2,
                    Id: yournftwallet2[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet2[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            const walletFilter3 = await bbnftSC.filters.Transfer(null, address, null)
            const walletEvent3 = await bbnftSC.queryFilter(walletFilter3, 3478177, "latest")
            const walletMap3 = await Promise.all(walletEvent3.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup3 = walletMap3.filter((obj, index) => walletMap3.indexOf(obj) === index)
            const data6 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup3.map((item) => (
                    {
                        address: bbnft,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup3.length).fill('')]
            let yournftwallet3 = []
            for (let i = 0; i <= walletRemoveDup3.length - 1 && address !== null && address !== undefined; i++) {
                if (data6[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet3.push({Id: String(walletRemoveDup3[i])})
                }
            }
            const data7 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet3.map((item) => (
                    {
                        address: bbnft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet3.length).fill('')]
            for (let i = 0; i <= yournftwallet3.length - 1; i++) {
                const nftipfs = data7[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Col: 3,
                    Id: yournftwallet3[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 100,
                    isStaked: false
                })
            }
            
            return [
                nfts, nftEQ_1, nftEQ_1_Name, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3, nftEQ_3_Name, nftEQ_4, nftEQ_4_Name, nftEQ_5, nftEQ_5_Name, nftEQ_6, nftEQ_6_Name, nftEQ_7, nftEQ_7_Name,
                allPow, isStaked, refuelAt, rewardPending, stOPTClaim,
                doijibBal, silBal,
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

            setAllPower(result[15])
            setIsStakeNow(result[16])
            const gasOut = new Date((Number(result[17]) * 1000) + (86400 * 1000))
            result[17] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[17] !== 0 && Date.now() - (Number(result[17]) * 1000) > (86400 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setJasperPending(ethers.utils.formatUnits(String(result[18]), "gwei"))

            setLastedSTOPT(Number(result[17]) * 1000 === Number(result[19]) * 1000)

            setDoijibBalance(ethers.utils.formatEther(String(result[20])))
            setSilBalance(ethers.utils.formatEther(String(result[21])))
            setSkinSlot1(result[22])
        })

    }, [address, txupdate, erc721ABI, erc20ABI, dunJasperABI, mintStOPTABI, salonABI])

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
            address: cmdaonft,
            abi: erc721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== dunJasper.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: cmdaonft,
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
        if (ss === 1) {
            gasAddr = doijibToken
            gasIndex = 1
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

    const mintStOPT = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: mintStOPT_Router,
                abi: mintStOPTABI,
                functionName: 'mintST',
                args: [2]
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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYeJjdaanuuX27L1RyXLM957MitBQRQ5qr3W4hZJFoGjy')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>Memetic Orbit</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">Exploring exotic orbit to collect a variable rare token.</div>
            </div>
            <div style={{margin: "30px 100px"}}></div>
        </div>

        <div style={{background: "#0a090d", margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1540px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "#2f1a52", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
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
                                        {isStakeNow === false &&
                                            <>
                                                <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                <div>Available for stake</div>
                                            </>
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
                            TOTAL CMPOW 
                            <div>{Number(0).toLocaleString('en-US', {maximumFractionDigits:0})} [land multiplier x{Number(0)}]</div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            REWARD BALANCE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="20" alt="$SIL"/>
                                <div style={{marginLeft: "5px"}}>{Number(silBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            REWARD PENDING
                            <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="20" alt="$SIL"/>
                                <div style={{marginLeft: "5px"}}>{Number(jasperPending).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            GAS USAGE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {ss === 1 &&
                                    <>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" height="20" alt="$DOIJIB"/>
                                        <div style={{marginLeft: "5px"}}>{Number(doijibBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </>
                                }
                                <div style={{marginLeft: "5px"}}>/7,000,000</div>
                            </div>
                        </div>
                        {isStakeNow ?
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT AT <div>{timeToRunout}</div></div>
                            : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT IN <div>7 day</div></div>
                        }
                        {address !== undefined && address === youraddr ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {isStakeNow ?
                                    <>
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                        <div style={{alignSelf: "center", background: isRunout ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                    </> :
                                    <>
                                        {isStakeNow !== null && (ss === 1 && Number(doijibBalance) >= 7000000) ?
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
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot !== null ?
                            <img src={accSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlotLevel}</div>}
                        {accSlot2 !== null ?
                            <img src={accSlot2} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot2Level !== null && <div style={{position: "absolute", top: "237.5px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlot2Level}</div> }
                        {accSlot3 !== null ?
                            <img src={accSlot3} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot3Level !== null && <div style={{position: "absolute", top: "385px", right: "30px", padding: "2px", fontSize: "25px"}}>+{accSlot3Level}</div>}
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {hatSlot !== null ?
                            <img src={hatSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/hat.png" width="100px" alt="Can not load metadata." />
                        }
                        {hatSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevel}</div>}
                        {clothSlot !== null ?
                            <img src={clothSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/cloth.png" width="100px" alt="Can not load metadata." />
                        }
                        {clothSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevel}</div>}
                        {shoesSlot !== null ?
                            <img src={shoesSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/shoes.png" width="100px" alt="Can not load metadata." />
                        }
                        {shoesSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{shoesSlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "300px", height: "450px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{position: "relative", width: "300px", height: "150px", padding: "0 20px 20px 20px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                            {soulSlot !== null ?
                                <img src={soulSlot} width="100px" alt="Can not load metadata." /> :
                                <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                            }
                            {soulSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "200px", padding: "2px", fontSize: "25px"}}>+{soulSlotLevel}</div>}
                            {badgeSlot !== null ?
                                <img src={badgeSlot} width="100px" alt="Can not load metadata." /> :
                                <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                            }
                            {badgeSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{badgeSlotLevel}</div>}
                        </div>
                        {nft.length > 0 ?
                            <>
                                {characterSlot !== null ?
                                    <>
                                        {(Number(skinSlot1) === 0 || (characterSlot !== "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && characterSlot !== "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia")) &&
                                            <img src={characterSlot} width="300px" alt="Can not load metadata." />
                                        }
                                        {characterSlot === "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && Number(String(skinSlot1).slice(0, 1)) === 1 &&
                                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibynd6gqsb7idmhy7xk5qx5cdzmayvns7gfj7dsvpfymg2kjjajtm" width="300px" alt="Can not load metadata." />
                                        }
                                        {characterSlot === "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia" && Number(String(skinSlot1).slice(0, 1)) === 1 &&
                                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif5fecf5rqrlixcxtpzplo7frtftt3yh2cmx6oca4l2jxuryjju2m" width="300px" alt="Can not load metadata." />
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                }
                            </> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                        {characterSlotLevel !== null && <div style={{position: "absolute", bottom: "15px", right: "20px", padding: "2px", fontSize: "25px", color: "#000"}}>Lv.{characterSlotLevel}</div>}
                        {isOp && isStakeNow && !lastedSTOPT && isRunout &&
                            <div style={{position: "absolute", top: "300px", left: 0, border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", borderRadius: 0, background: "rgb(103, 186, 167)"}} className="button" /*onClick={mintStOPT}*/>Obtain stOPT <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibtp4almzmdovhvygxeyykw5fa6pqe76cbdum4quispehlddqgp2e" height="18" alt="$stOPT"/></div>
                        }
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot4 !== null ?
                            <img src={accSlot4} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot4Level !== null && <div style={{position: "absolute", top: "85px", right: "35px", padding: "2px", fontSize: "25px"}}>+{accSlot4Level}</div>}
                        {backSlot !== null ?
                            <img src={backSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/back.png" width="100px" alt="Can not load metadata." />
                        }
                        {backSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "35px", fontSize: "25px"}}>+{backSlotLevel}</div>}
                        {weaponSlot !== null ?
                            <img src={weaponSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/weapon.png" width="100px" alt="Can not load metadata." />
                        }
                        {wpSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "35px", padding: "2px", fontSize: "25px"}}>+{wpSlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot5 !== null ?
                            <img src={accSlot5} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot5Level !== null && <div style={{position: "absolute", top: "85px", right: "35px", padding: "2px", fontSize: "25px"}}>+{accSlot5Level}</div>}
                        {accSlot6 !== null ?
                            <img src={accSlot6} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/accessories.png" width="100px" alt="Can not load metadata." />
                        }
                        {accSlot6Level !== null && <div style={{position: "absolute", top: "237.5px", right: "35px", padding: "2px", fontSize: "25px"}}>+{accSlot6Level}</div>}
                        {weaponSlot2 !== null ?
                            <img src={weaponSlot2} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/weapon.png" width="100px" alt="Can not load metadata." />
                        }
                        {wpSlot2Level !== null && <div style={{position: "absolute", top: "385px", right: "35px", padding: "2px", fontSize: "25px"}}>+{wpSlot2Level}</div>}
                    </div>
                </div>
            </div>

            {<div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "none rgba(255, 255, 255, 0.1)", backdropFilter: "blur(14px)", boxShadow: "none", border: 0, justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", marginBottom: "100px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "#2f1a52", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                            <div style={{fontSize: "22px", lineHeight: "15px"}}>L2 MEME STAKING SS 1<br></br><br></br>D.O.M. THE DOI OLYMPUS MAFIA</div>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", color: "rgb(0, 209, 255)"}}>
                                {isStakeL2Now ?
                                    <>
                                        <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                        <div>On Staking</div>
                                    </> :
                                    <>
                                        {isStakeL2Now === false &&
                                            <>
                                                <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                <div>Available for stake</div>
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            TOTAL CMPOW
                            <div style={{display: "flex", flexDirection: "row"}}>{yourL2CMPOW}</div>
                        </div>
                        <div style={{height: "160px", width: "100%", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", textAlign: "center", letterSpacing: 1}} className="bold">
                            <div style={{width: "100%", margin: "20px 0 10px 0", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">Fulfill all slots to win this season badge. Season will end within 28 + 7 days.</div>
                            <div style={{width: "100px", height: "100px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        </div>
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {ss === 1 && 
                            <>
                                {ss1HatSlot !== null ?
                                    <img src={ss1HatSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmSgooLEbo2MrxT3rNzFKq1fGkweGZJhV2ejPhKpAgoSWr" width="100px" alt="Can not load metadata." />
                                }
                                {ss1HatSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1HatSlotLevel}</div>}
                                {ss1ClothSlot !== null ?
                                    <img src={ss1ClothSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmPY9gNNpai3UGtx8jSsohn3scvsioJM7AvmQLbFnBjvwq" width="100px" alt="Can not load metadata." />
                                }
                                {ss1ClothSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1ClothSlotLevel}</div>}
                                {ss1ShoesSlot !== null ?
                                    <img src={ss1ShoesSlot} width="100px" alt="" /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmT4aYAh5veaM7fawV4MbufZBGWKFcJ4QmXdzNqmHYMxXk" width="100px" alt="Can not load metadata." />
                                }
                                {ss1ShoesSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1ShoesSlotLevel}</div>}
                            </>
                        }
                    </div>
                    <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "300px", height: "65px"}}></div>
                        {nft.length > 0 ?
                            <>
                                {(ss === 1 && ss1ClothSlot !== null) ?
                                    <img src={ss1ClothSlot} width="300px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmViHN4xqFWr9x9t4q1QGMNanm3f7u2fBD6PU9x4ZKdyzk" width="300px" alt="Can not load metadata." />
                                }
                            </> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                        {ss1CharacterSlotLevel !== null && <div style={{position: "absolute", bottom: "40px", right: "10px", padding: "2px", fontSize: "25px", color: "#000"}}>Lv.{ss1CharacterSlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {ss === 1 && 
                            <>
                                {ss1AccSlot !== null ?
                                    <img src={ss1AccSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYYCgcgbqdh59kuyuXSxWom7igRYqPnXLY4DNjL3mJpY8" width="100px" alt="Can not load metadata." />
                                }
                                {ss1AccSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1AccSlotLevel}</div>}
                                {ss1BackSlot !== null ?
                                    <img src={ss1BackSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmRFpQsLUgJPjgXXBeREddUVAEcyJwzqG79VJ7BeYd8LSj" width="100px" alt="Can not load metadata." />
                                }
                                {ss1BackSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", fontSize: "25px"}}>+{ss1BackSlotLevel}</div> }
                                {ss1WeaponSlot !== null ?
                                    <img src={ss1WeaponSlot} width="100px" alt="Can not load metadata." /> :
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmRKTx7BpuUicaecf4bKYSroAvedLGw3mncWAHHSfLszJc" width="100px" alt="Can not load metadata." />
                                }
                                {ss1WpSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{ss1WpSlotLevel}</div>}
                            </>
                        }
                    </div>
                </div>
            </div>}
            
            {nft.length > 0 ?
                <div style={{marginTop: "40px", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                        {nft.map((item, index) => (
                            <>
                                {(item.Col === 1 || 
                                (ss === 1 && 
                                    (
                                        (item.Col === 2 && 
                                            (
                                                (Number(item.Id) >= 700000118800 && Number(item.Id) <= 700025018800) || 
                                                (Number(item.Id) >= 500000118800 && Number(item.Id) <= 500025018800)
                                            )
                                        ) || 
                                        (item.Col === 3 && 
                                            (Number(item.Id) >= 100000001 && Number(item.Id) <= 100001000)
                                        )
                                    )
                                )) &&
                                    <div style={{background: "#2f1a52", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard" key={index}>
                                        <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                            <img src={item.Image} height="100%" alt="Can not load metadata." />
                                        </div>
                                        <div className="emp bold">{item.Name}</div>
                                        <div className="bold">{item.RewardPerSec} cmpow per sec</div>
                                        <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                        {address === youraddr ?
                                            <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}}>
                                                {item.isStaked ?
                                                    <>
                                                        {item.Col === 1 && <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft((item.Id / 100000000000) | 0)}>UNEQUIP L1</div>}
                                                        {(ss === 1 &&
                                                            (
                                                                (item.Col === 1 && 
                                                                    (
                                                                        (Number(item.Id) >= 102000108000 && Number(item.Id) <= 102033308000) || 
                                                                        (Number(item.Id) >= 220010810800 && Number(item.Id) <= 220020910800) || 
                                                                        (Number(item.Id) >= 300010100600 && Number(item.Id) <= 300054800600) || 
                                                                        (Number(item.Id) >= 612000102550 && Number(item.Id) <= 612025600250)
                                                                    )
                                                                ) || 
                                                                item.Col === 2 || 
                                                                item.Col === 3
                                                            )
                                                        ) &&
                                                            <div style={{alignSelf: "center", cursor: "not-allowed", marginTop: "5px"}} className="pixel button">UNEQUIP L2 SS1</div>
                                                        }
                                                    </> :
                                                    <>
                                                        {item.Col === 1 && <div style={{alignSelf: "center", cursor: "not-allowed", marginTop: "5px"}} className="pixel button">EQUIP L1</div>}
                                                        {(ss === 1 &&
                                                            (
                                                                (item.Col === 1 && 
                                                                    (
                                                                        (Number(item.Id) >= 102000108000 && Number(item.Id) <= 102033308000) || 
                                                                        (Number(item.Id) >= 220010810800 && Number(item.Id) <= 220020910800) || 
                                                                        (Number(item.Id) >= 300010100600 && Number(item.Id) <= 300054800600) || 
                                                                        (Number(item.Id) >= 612000102550 && Number(item.Id) <= 612025600250)
                                                                    )
                                                                ) || 
                                                                item.Col === 2 || 
                                                                item.Col === 3
                                                            )
                                                        ) &&
                                                            <div style={{alignSelf: "center", cursor: "not-allowed", marginTop: "5px"}} className="pixel button">EQUIP L2 SS1</div>
                                                        }
                                                        <div style={{alignSelf: "center", background: "gray", marginTop: "5px"}} className="pixel button" onClick={() => transferNFT(item.Col, item.Id)}>TRANSFER</div>
                                                    </>
                                                }
                                            </div> :
                                            <div style={{height: "41px"}}></div>
                                        }
                                    </div>
                                }
                            </>
                        ))}
                        </> :
                        <div style={{background: "#2f1a52", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
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
                    <div className="nftCard" style={{background: "#2f1a52", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center"}}>
                        <ThreeDots fill="#fff" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default Memeticorbit