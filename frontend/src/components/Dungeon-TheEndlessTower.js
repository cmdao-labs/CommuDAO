import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const hrmNft = '0x9cD236a18D1792993beCff9E525902a5B6ef4483'

const swarLab = '0x5e18a8B78d5395371308C54719fead810Ce2aCd2'
const dunANGB = '0x59c1C2f5FA76DB933B97b7c54223129e2A398534'

const providerBBQ = new ethers.getDefaultProvider('https://bbqchain-rpc.commudao.xyz')

const TheEndlessTower = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc721ABI, erc20ABI, dunAngbABI }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/dungeon/the-endless-tower/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/dungeon/the-endless-tower/' + address)
    }

    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftCol, setTransferNftCol] = React.useState(null)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState(null)
    const [isSpecialModal, setIsSpecialModal] = React.useState(false)
    const [specialModal, setSpecialModal] = React.useState(0)

    const [nft, setNft] = React.useState([])
    const [characterSlot, setCharacterSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [characterSlotLevel, setCharacterSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [weaponOneSlot, setWeaponOneSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [weaponOneSlotLevel, setWeaponOneSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [weaponTwoSlot, setWeaponTwoSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [weaponTwoSlotLevel, setWeaponTwoSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [shieldSlot, setShieldSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [shieldSlotLevel, setShieldSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [armorSlot, setArmorSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [armorSlotLevel, setArmorSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [headUpperSlot, setHeadUpperSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [headUpperSlotLevel, setHeadUpperSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [headMiddleSlot, setHeadMiddleSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [headMiddleSlotLevel, setHeadMiddleSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [headLowerSlot, setHeadLowerSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [headLowerSlotLevel, setHeadLowerSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [garmentSlot, setGarmentSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [garmentSlotLevel, setGarmentSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [footgearSlot, setFootgearSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [footgearSlotLevel, setFootgearSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [accessorySlot, setAccessorySlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [accessorySlotLevel, setAccessorySlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [talismanOneSlot, setTalismanOneSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [talismanOneSlotLevel, setTalismanOneSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [talismanTwoSlot, setTalismanTwoSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [talismanTwoSlotLevel, setTalismanTwoSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [wingSlot, setWingSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [wingSlotLevel, setWingSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [daemonSlot, setDaemonSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [daemonSlotLevel, setDaemonSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardWeaponSlot, setCardWeaponSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardWeaponSlotLevel, setCardWeaponSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardShieldSlot, setCardShieldSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardShieldSlotLevel, setCardShieldSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardArmorSlot, setCardArmorSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardArmorSlotLevel, setCardArmorSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardHeadUpperSlot, setCardHeadUpperSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardHeadUpperSlotLevel, setCardHeadUpperSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardHeadMiddleSlot, setCardHeadMiddleSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardHeadMiddleSlotLevel, setCardHeadMiddleSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardHeadLowerSlot, setCardHeadLowerSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardHeadLowerSlotLevel, setCardHeadLowerSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardGarmentSlot, setCardGarmentSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardGarmentSlotLevel, setCardGarmentSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardFootgearSlot, setCardFootgearSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardFootgearSlotLevel, setCardFootgearSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardAccessorySlot, setCardAccessorySlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [cardAccessorySlotLevel, setCardAccessorySlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [jewelSlot, setJewelSlot] = React.useState([null, null, null, null, null, null, null, null, null, null])
    const [jewelSlotLevel, setJewelSlotLevel] = React.useState([null, null, null, null, null, null, null, null, null, null])

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [gasselected, setGasselected] = React.useState("ENGY")
    const [angbPending, setAngbPending] = React.useState(0)

    const [swarBalance, setSwarBalance] = React.useState(0)
    const [angbBalance, setAngbBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const hrmnftSC = new ethers.Contract(hrmNft, erc721ABI, providerBBQ)
        setNft([])
        
        const thefetch = async () => {
            const nftEQ = false && address !== null && address !== undefined ? await readContract({
                address: dunANGB,
                abi: dunAngbABI,
                functionName: 'nftEquip',
                args: [address],
            }) : [{characterId: 0, helmetId: 0, armorId: 0, ringId: 0, shieldId: 0, bootsId: 0, swordId: 0, fairyId: 0, allPow: 0, refuelAt: 0, isStaked: null}]

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                    },
                    {
                        address: hrmNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[7])],
                    },
                    {
                        address: swarLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunANGB,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunANGB,
                        abi: dunAngbABI,
                        functionName: 'calculateRewards',
                        args: [address],
                    },
                ],
            }) : ["", "", "", "", "", "", "", "", 0, 0, 0, 0, ]

            let nfts = []

            let response1 = null
            try {
                response1 = data[0].status === 'success' ? await fetch(data[0].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
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
                response2 = data[1].status === 'success' ? await fetch(data[1].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
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
                response3 = data[2].status === 'success' ? await fetch(data[2].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
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
                response4 = data[3].status === 'success' ? await fetch(data[3].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
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
                response5 = data[4].status === 'success' ? await fetch(data[4].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
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
                response6 = data[5].status === 'success' ? await fetch(data[5].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
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
                response7 = data[6].status === 'success' ? await fetch(data[6].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
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

            let response8 = null
            try {
                response8 = data[7].status === 'success' ? await fetch(data[7].result.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")) : null
            } catch {}
            const nft8 = response8 !== null ? await response8.json() : {image: null, name: null}
            const nftEQ_8 = nft8.image !== null ? nft8.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/") : null
            const nftEQ_8_Name = nft8.name
            if (response8 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[7]),
                    Name: nftEQ_8_Name,
                    Image: nftEQ_8,
                    Description: nft8.description,
                    Attribute: nft8.attributes,
                    RewardPerSec: Number(nftEQ[7]) % 100000,
                    isStaked: true
                })
            }

            const allPow = Number(nftEQ[8])
            const isStaked = nftEQ[10]
            const refuelAt = Number(nftEQ[9])

            const swarBal = 0/*data[8].result*/
            const angbBal = 0/*data[9].result*/
            const rewardPending = isStaked === true ? data[10].result : 0
            
            const walletFilter = await hrmnftSC.filters.Transfer(null, address, null)
            const walletEvent = await hrmnftSC.queryFilter(walletFilter, 4664954, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            console.log(walletRemoveDup)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: hrmNft,
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
                        address: hrmNft,
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

            if (nfts.length === 0) { nfts.push(null) }
            
            return [
                nfts, nftEQ_1, nftEQ_1_Name, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3, nftEQ_3_Name, nftEQ_4, nftEQ_4_Name, nftEQ_5, nftEQ_5_Name, nftEQ_6, nftEQ_6_Name, nftEQ_7, nftEQ_7_Name, nftEQ_8, nftEQ_8_Name,
                allPow, isStaked, refuelAt, rewardPending, swarBal, angbBal, 
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
            /*
            setCharacterSlot(result[1])
            result[2] !== null && result[2].slice(-2, -1) === "+" ? setCharacterSlotLevel(result[2].slice(-1)) : setCharacterSlotLevel(null)
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
            setFairySlot(result[15])
            result[16] !== null && result[16].slice(-2, -1) === "+" ? setFairySlotLevel(result[16].slice(-1)) : setFairySlotLevel(null)
            */

            setAllPower(result[17])
            setIsStakeNow(result[18])
            const gasOut = new Date((Number(result[19]) * 1000) + (86400 * 1000))
            result[19] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[19] !== 0 && Date.now() - (Number(result[19]) * 1000) > (86400 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setAngbPending(ethers.utils.formatEther(String(result[20])))
        
            setSwarBalance(ethers.utils.formatEther(String(result[21])))
            setAngbBalance(ethers.utils.formatEther(String(result[22])))
        })

    }, [address, txupdate, erc721ABI, erc20ABI, dunAngbABI])

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
            addr = hrmNft
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
        if (Number(_nftid.slice(0, 7)) >= 8010001 && Number(_nftid.slice(0, 7)) <= 8010050) {
            setSpecialModal(1)
        } else if (Number(_nftid.slice(0, 7)) >= 8010051 && Number(_nftid.slice(0, 7)) <= 8010120) {
            setSpecialModal(2)
        } else if (Number(_nftid.slice(0, 7)) >= 8010121 && Number(_nftid.slice(0, 7)) <= 8010200) {
            setSpecialModal(3)
        }
        setIsSpecialModal(true)
        try {
            const nftAllow = await readContract({
                address: hrmNft,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== dunANGB.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: hrmNft,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [dunANGB, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: dunANGB,
                abi: dunAngbABI,
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
                address: dunANGB,
                abi: dunAngbABI,
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
        if (gasselected === "SWAR") {
            gasAddr = swarLab
            gasIndex = 1
        }
        try {
            const gasAllow = await readContract({
                address: gasAddr,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, dunANGB],
            })
            if (gasAllow < (2 * 10**17)) {
                const config = await prepareWriteContract({
                    address: gasAddr,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [dunANGB, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: dunANGB,
                abi: dunAngbABI,
                functionName: 'refuel',
                args: [gasIndex]
            })
            const { hash: hash1 } = await writeContract(config2)
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
        {isSpecialModal &&
            <div style={{zIndex: "1000"}} className="centermodal">
                <div className="wrapper">
                    <div className="bold" style={{width: "500px", height: "700px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", fontSize: "40px", letterSpacing: "3px"}}>
                        <video autoPlay loop width="400">
                            {specialModal === 1 && <source src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeie2iuhr7m6sd6knivqxev6bzhfbujfnbxtcudgb3jcy3jogjhztfu" type="video/mp4" />}
                            {specialModal === 2 && <source src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibu3cbsmupwfxxni2k525h3gavrjyvtyk6i5xa3wx6k4t4gzk3bae" type="video/mp4" />}
                            {specialModal === 3 && <source src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiawnfpq4e6nxowydbmchi3kx6aq3d7wj76yx35dvz7hbbd3ij67pa" type="video/mp4" />}
                        </video>
                        <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsSpecialModal(false)}>CLOSE</div>
                    </div>
                </div>
            </div>
        }
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmd5r9efGEgrBPRd7UxkGuR4HcTSt3afGeDEa8suEHpoy2')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>The Endless Tower</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">Exploring exotic cave to collect a rare token, $GEMSTONE.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
            </div>
        </div>
    
        <div style={{margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "rgb(230, 250, 54)", border: "none", justifyContent: "space-around", padding: "30px", width: "1560px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "column", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                        <div style={{fontSize: "22px", lineHeight: "15px"}}>LAYER 1 STAKING</div>
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
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            {address !== undefined ?
                                <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                <>ADDRESS <div>-</div></>
                            }
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            TOTAL POWER PER SEC
                            <div>{Number(allPower).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            GEMSTONE BALANCE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div style={{marginLeft: "5px"}}>{Number(angbBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            GEMSTONE PENDING
                            <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                <div style={{marginLeft: "5px"}}>{Number(angbPending).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            GAS USAGE
                            <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                <option value="SWAR">$ENGY</option>
                            </select>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {gasselected === "ENGY" ?
                                    <>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYyCnpA39K7F7iu9BR9YdPJTfXfzzFVhQuu4RT1y7XffB" height="20" alt="$ENGY"/>
                                        <div style={{marginLeft: "5px"}}>{Number(swarBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                    </> :
                                    <></>
                                }
                                <div style={{marginLeft: "5px"}}>/24</div>
                            </div>
                        </div>
                        {isStakeNow ?
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunout}</div></div>
                            : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 day</div></div>
                        }
                        {address !== undefined && address === youraddr ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {isStakeNow ?
                                    <>
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                        <div style={{alignSelf: "center", background: isRunout ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                    </> :
                                    <>
                                        {isStakeNow !== null && ((gasselected === "SWAR" && Number(swarBalance) >= 0.2)) ?
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
                    <div style={{marginTop: "40px", display: "flex", flexFlow: "column wrap"}}>
                        <div style={{display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[0] !== null ?
                                    <img src={cardWeaponSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[0] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[0]}</div>}
                                {jewelSlot[0] !== null ?
                                    <img src={jewelSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[0] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[0]}</div>}
                                {cardShieldSlot[0] !== null ?
                                    <img src={cardShieldSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[0] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[0]}</div>}
                                {daemonSlot[0] !== null ?
                                    <img src={daemonSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[0] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[0]}</div>}
                                {cardAccessorySlot[0] !== null ?
                                    <img src={cardAccessorySlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[0] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[0]}</div>}
                                {talismanTwoSlot[0] !== null ?
                                    <img src={talismanTwoSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[0]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[0] !== null ?
                                    <img src={weaponOneSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[0] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[0]}</div>}
                                {weaponTwoSlot[0] !== null ?
                                    <img src={weaponTwoSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[0] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[0]}</div>}
                                {shieldSlot[0] !== null ?
                                    <img src={shieldSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[0]}</div>}
                                {wingSlot[0] !== null ?
                                    <img src={wingSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[0]}</div>}
                                {accessorySlot[0] !== null ?
                                    <img src={accessorySlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[0]}</div>}
                                {talismanOneSlot[0] !== null ?
                                    <img src={talismanOneSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[0]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 1</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[0] !== null ?
                                            <img src={characterSlot[0]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[0] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[0]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[0] !== null ?
                                    <img src={headUpperSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[0] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[0]}</div>}
                                {headMiddleSlot[0] !== null ?
                                    <img src={headMiddleSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[0] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[0]}</div>}
                                {headLowerSlot[0] !== null ?
                                    <img src={headLowerSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[0]}</div>}
                                {armorSlot[0] !== null ?
                                    <img src={armorSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[0]}</div>}
                                {garmentSlot[0] !== null ?
                                    <img src={garmentSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[0]}</div>}
                                {footgearSlot[0] !== null ?
                                    <img src={footgearSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[0]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[0] !== null ?
                                    <img src={cardHeadUpperSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[0] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[0]}</div>}
                                {cardHeadMiddleSlot[0] !== null ?
                                    <img src={cardHeadMiddleSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[0] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[0]}</div>}
                                {cardHeadLowerSlot[0] !== null ?
                                    <img src={cardHeadLowerSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[0]}</div>}
                                {cardArmorSlot[0] !== null ?
                                    <img src={cardArmorSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[0]}</div>}
                                {cardGarmentSlot[0] !== null ?
                                    <img src={cardGarmentSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[0]}</div>}
                                {cardFootgearSlot[0] !== null ?
                                    <img src={cardFootgearSlot[0]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[0] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[0]}</div>}
                            </div>
                        </div>

                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[1] !== null ?
                                    <img src={cardWeaponSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[1] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[1]}</div>}
                                {jewelSlot[1] !== null ?
                                    <img src={jewelSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[1] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[1]}</div>}
                                {cardShieldSlot[1] !== null ?
                                    <img src={cardShieldSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[1] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[1]}</div>}
                                {daemonSlot[1] !== null ?
                                    <img src={daemonSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[1] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[1]}</div>}
                                {cardAccessorySlot[1] !== null ?
                                    <img src={cardAccessorySlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[1] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[1]}</div>}
                                {talismanTwoSlot[1] !== null ?
                                    <img src={talismanTwoSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[1]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[1] !== null ?
                                    <img src={weaponOneSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[1] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[1]}</div>}
                                {weaponTwoSlot[1] !== null ?
                                    <img src={weaponTwoSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[1] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[1]}</div>}
                                {shieldSlot[1] !== null ?
                                    <img src={shieldSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[1]}</div>}
                                {wingSlot[1] !== null ?
                                    <img src={wingSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[1]}</div>}
                                {accessorySlot[1] !== null ?
                                    <img src={accessorySlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[1]}</div>}
                                {talismanOneSlot[1] !== null ?
                                    <img src={talismanOneSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[1]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 2</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[1] !== null ?
                                            <img src={characterSlot[1]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[1] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[1]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[1] !== null ?
                                    <img src={headUpperSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[1] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[1]}</div>}
                                {headMiddleSlot[1] !== null ?
                                    <img src={headMiddleSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[1] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[1]}</div>}
                                {headLowerSlot[1] !== null ?
                                    <img src={headLowerSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[1]}</div>}
                                {armorSlot[1] !== null ?
                                    <img src={armorSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[1]}</div>}
                                {garmentSlot[1] !== null ?
                                    <img src={garmentSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[1]}</div>}
                                {footgearSlot[1] !== null ?
                                    <img src={footgearSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[1]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[1] !== null ?
                                    <img src={cardHeadUpperSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[1] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[1]}</div>}
                                {cardHeadMiddleSlot[1] !== null ?
                                    <img src={cardHeadMiddleSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[1] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[1]}</div>}
                                {cardHeadLowerSlot[1] !== null ?
                                    <img src={cardHeadLowerSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[1]}</div>}
                                {cardArmorSlot[1] !== null ?
                                    <img src={cardArmorSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[1]}</div>}
                                {cardGarmentSlot[1] !== null ?
                                    <img src={cardGarmentSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[1]}</div>}
                                {cardFootgearSlot[1] !== null ?
                                    <img src={cardFootgearSlot[1]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[1] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[1]}</div>}
                            </div>
                        </div>
                        
                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[2] !== null ?
                                    <img src={cardWeaponSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[2]}</div>}
                                {jewelSlot[2] !== null ?
                                    <img src={jewelSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[2] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[2]}</div>}
                                {cardShieldSlot[2] !== null ?
                                    <img src={cardShieldSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[2]}</div>}
                                {daemonSlot[2] !== null ?
                                    <img src={daemonSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[2]}</div>}
                                {cardAccessorySlot[2] !== null ?
                                    <img src={cardAccessorySlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[2]}</div>}
                                {talismanTwoSlot[2] !== null ?
                                    <img src={talismanTwoSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[2]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[2] !== null ?
                                    <img src={weaponOneSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[2] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[2]}</div>}
                                {weaponTwoSlot[2] !== null ?
                                    <img src={weaponTwoSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[2]}</div>}
                                {shieldSlot[2] !== null ?
                                    <img src={shieldSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[2]}</div>}
                                {wingSlot[2] !== null ?
                                    <img src={wingSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[2]}</div>}
                                {accessorySlot[2] !== null ?
                                    <img src={accessorySlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[2]}</div>}
                                {talismanOneSlot[2] !== null ?
                                    <img src={talismanOneSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[2]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 3</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[2] !== null ?
                                            <img src={characterSlot[2]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[2] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[2]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[2] !== null ?
                                    <img src={headUpperSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[2] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[2]}</div>}
                                {headMiddleSlot[2] !== null ?
                                    <img src={headMiddleSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[2]}</div>}
                                {headLowerSlot[2] !== null ?
                                    <img src={headLowerSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[2]}</div>}
                                {armorSlot[2] !== null ?
                                    <img src={armorSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[2]}</div>}
                                {garmentSlot[2] !== null ?
                                    <img src={garmentSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[2]}</div>}
                                {footgearSlot[2] !== null ?
                                    <img src={footgearSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[2]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[2] !== null ?
                                    <img src={cardHeadUpperSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[2] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[2]}</div>}
                                {cardHeadMiddleSlot[2] !== null ?
                                    <img src={cardHeadMiddleSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[2]}</div>}
                                {cardHeadLowerSlot[2] !== null ?
                                    <img src={cardHeadLowerSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[2]}</div>}
                                {cardArmorSlot[2] !== null ?
                                    <img src={cardArmorSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[2]}</div>}
                                {cardGarmentSlot[2] !== null ?
                                    <img src={cardGarmentSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[2]}</div>}
                                {cardFootgearSlot[2] !== null ?
                                    <img src={cardFootgearSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[2]}</div>}
                            </div>
                        </div>

                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[2] !== null ?
                                    <img src={cardWeaponSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[2]}</div>}
                                {jewelSlot[2] !== null ?
                                    <img src={jewelSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[2] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[2]}</div>}
                                {cardShieldSlot[2] !== null ?
                                    <img src={cardShieldSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[2]}</div>}
                                {daemonSlot[2] !== null ?
                                    <img src={daemonSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[2]}</div>}
                                {cardAccessorySlot[2] !== null ?
                                    <img src={cardAccessorySlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[2]}</div>}
                                {talismanTwoSlot[2] !== null ?
                                    <img src={talismanTwoSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[2]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[2] !== null ?
                                    <img src={weaponOneSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[2] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[2]}</div>}
                                {weaponTwoSlot[2] !== null ?
                                    <img src={weaponTwoSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[2]}</div>}
                                {shieldSlot[2] !== null ?
                                    <img src={shieldSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[2]}</div>}
                                {wingSlot[2] !== null ?
                                    <img src={wingSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[2]}</div>}
                                {accessorySlot[2] !== null ?
                                    <img src={accessorySlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[2]}</div>}
                                {talismanOneSlot[2] !== null ?
                                    <img src={talismanOneSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[2]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 3</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[2] !== null ?
                                            <img src={characterSlot[2]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[2] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[2]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[2] !== null ?
                                    <img src={headUpperSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[2] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[2]}</div>}
                                {headMiddleSlot[2] !== null ?
                                    <img src={headMiddleSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[2]}</div>}
                                {headLowerSlot[2] !== null ?
                                    <img src={headLowerSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[2]}</div>}
                                {armorSlot[2] !== null ?
                                    <img src={armorSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[2]}</div>}
                                {garmentSlot[2] !== null ?
                                    <img src={garmentSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[2]}</div>}
                                {footgearSlot[2] !== null ?
                                    <img src={footgearSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[2]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[2] !== null ?
                                    <img src={cardHeadUpperSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[2] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[2]}</div>}
                                {cardHeadMiddleSlot[2] !== null ?
                                    <img src={cardHeadMiddleSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[2] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[2]}</div>}
                                {cardHeadLowerSlot[2] !== null ?
                                    <img src={cardHeadLowerSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[2]}</div>}
                                {cardArmorSlot[2] !== null ?
                                    <img src={cardArmorSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[2]}</div>}
                                {cardGarmentSlot[2] !== null ?
                                    <img src={cardGarmentSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[2]}</div>}
                                {cardFootgearSlot[2] !== null ?
                                    <img src={cardFootgearSlot[2]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[2] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[2]}</div>}
                            </div>
                        </div>

                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[3] !== null ?
                                    <img src={cardWeaponSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[3] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[3]}</div>}
                                {jewelSlot[3] !== null ?
                                    <img src={jewelSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[3] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[3]}</div>}
                                {cardShieldSlot[3] !== null ?
                                    <img src={cardShieldSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[3] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[3]}</div>}
                                {daemonSlot[3] !== null ?
                                    <img src={daemonSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[3] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[3]}</div>}
                                {cardAccessorySlot[3] !== null ?
                                    <img src={cardAccessorySlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[3] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[3]}</div>}
                                {talismanTwoSlot[3] !== null ?
                                    <img src={talismanTwoSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[3]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[3] !== null ?
                                    <img src={weaponOneSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[3] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[3]}</div>}
                                {weaponTwoSlot[3] !== null ?
                                    <img src={weaponTwoSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[3] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[3]}</div>}
                                {shieldSlot[3] !== null ?
                                    <img src={shieldSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[3]}</div>}
                                {wingSlot[3] !== null ?
                                    <img src={wingSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[3]}</div>}
                                {accessorySlot[3] !== null ?
                                    <img src={accessorySlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[3]}</div>}
                                {talismanOneSlot[3] !== null ?
                                    <img src={talismanOneSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[3]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 4</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[3] !== null ?
                                            <img src={characterSlot[3]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[3] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[3]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[3] !== null ?
                                    <img src={headUpperSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[3] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[3]}</div>}
                                {headMiddleSlot[3] !== null ?
                                    <img src={headMiddleSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[3] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[3]}</div>}
                                {headLowerSlot[3] !== null ?
                                    <img src={headLowerSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[3]}</div>}
                                {armorSlot[3] !== null ?
                                    <img src={armorSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[3]}</div>}
                                {garmentSlot[3] !== null ?
                                    <img src={garmentSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[3]}</div>}
                                {footgearSlot[3] !== null ?
                                    <img src={footgearSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[3]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[3] !== null ?
                                    <img src={cardHeadUpperSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[3] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[3]}</div>}
                                {cardHeadMiddleSlot[3] !== null ?
                                    <img src={cardHeadMiddleSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[3] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[3]}</div>}
                                {cardHeadLowerSlot[3] !== null ?
                                    <img src={cardHeadLowerSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[3]}</div>}
                                {cardArmorSlot[3] !== null ?
                                    <img src={cardArmorSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[3]}</div>}
                                {cardGarmentSlot[3] !== null ?
                                    <img src={cardGarmentSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[3]}</div>}
                                {cardFootgearSlot[3] !== null ?
                                    <img src={cardFootgearSlot[3]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[3] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[3]}</div>}
                            </div>
                        </div>

                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[4] !== null ?
                                    <img src={cardWeaponSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[4] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[4]}</div>}
                                {jewelSlot[4] !== null ?
                                    <img src={jewelSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[4] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[4]}</div>}
                                {cardShieldSlot[4] !== null ?
                                    <img src={cardShieldSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[4] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[4]}</div>}
                                {daemonSlot[4] !== null ?
                                    <img src={daemonSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[4] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[4]}</div>}
                                {cardAccessorySlot[4] !== null ?
                                    <img src={cardAccessorySlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[4] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[4]}</div>}
                                {talismanTwoSlot[4] !== null ?
                                    <img src={talismanTwoSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[4]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[4] !== null ?
                                    <img src={weaponOneSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[4] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[4]}</div>}
                                {weaponTwoSlot[4] !== null ?
                                    <img src={weaponTwoSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[4] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[4]}</div>}
                                {shieldSlot[4] !== null ?
                                    <img src={shieldSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[4]}</div>}
                                {wingSlot[4] !== null ?
                                    <img src={wingSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[4]}</div>}
                                {accessorySlot[4] !== null ?
                                    <img src={accessorySlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[4]}</div>}
                                {talismanOneSlot[4] !== null ?
                                    <img src={talismanOneSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[4]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 5</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[4] !== null ?
                                            <img src={characterSlot[4]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[4] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[4]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[4] !== null ?
                                    <img src={headUpperSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[4] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[4]}</div>}
                                {headMiddleSlot[4] !== null ?
                                    <img src={headMiddleSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[4] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[4]}</div>}
                                {headLowerSlot[4] !== null ?
                                    <img src={headLowerSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[4]}</div>}
                                {armorSlot[4] !== null ?
                                    <img src={armorSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[4]}</div>}
                                {garmentSlot[4] !== null ?
                                    <img src={garmentSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[4]}</div>}
                                {footgearSlot[4] !== null ?
                                    <img src={footgearSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[4]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[4] !== null ?
                                    <img src={cardHeadUpperSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[4] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[4]}</div>}
                                {cardHeadMiddleSlot[4] !== null ?
                                    <img src={cardHeadMiddleSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[4] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[4]}</div>}
                                {cardHeadLowerSlot[4] !== null ?
                                    <img src={cardHeadLowerSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[4]}</div>}
                                {cardArmorSlot[4] !== null ?
                                    <img src={cardArmorSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[4]}</div>}
                                {cardGarmentSlot[4] !== null ?
                                    <img src={cardGarmentSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[4]}</div>}
                                {cardFootgearSlot[4] !== null ?
                                    <img src={cardFootgearSlot[4]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[4] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[4]}</div>}
                            </div>
                        </div>

                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[5] !== null ?
                                    <img src={cardWeaponSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[5] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[5]}</div>}
                                {jewelSlot[5] !== null ?
                                    <img src={jewelSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[5] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[5]}</div>}
                                {cardShieldSlot[5] !== null ?
                                    <img src={cardShieldSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[5] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[5]}</div>}
                                {daemonSlot[5] !== null ?
                                    <img src={daemonSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[5] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[5]}</div>}
                                {cardAccessorySlot[5] !== null ?
                                    <img src={cardAccessorySlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[5] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[5]}</div>}
                                {talismanTwoSlot[5] !== null ?
                                    <img src={talismanTwoSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[5]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[5] !== null ?
                                    <img src={weaponOneSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[5] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[5]}</div>}
                                {weaponTwoSlot[5] !== null ?
                                    <img src={weaponTwoSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[5] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[5]}</div>}
                                {shieldSlot[5] !== null ?
                                    <img src={shieldSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[5]}</div>}
                                {wingSlot[5] !== null ?
                                    <img src={wingSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[5]}</div>}
                                {accessorySlot[5] !== null ?
                                    <img src={accessorySlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[5]}</div>}
                                {talismanOneSlot[5] !== null ?
                                    <img src={talismanOneSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[5]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 6</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[5] !== null ?
                                            <img src={characterSlot[5]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[5] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[5]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[5] !== null ?
                                    <img src={headUpperSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[5] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[5]}</div>}
                                {headMiddleSlot[5] !== null ?
                                    <img src={headMiddleSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[5] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[5]}</div>}
                                {headLowerSlot[5] !== null ?
                                    <img src={headLowerSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[5]}</div>}
                                {armorSlot[5] !== null ?
                                    <img src={armorSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[5]}</div>}
                                {garmentSlot[5] !== null ?
                                    <img src={garmentSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[5]}</div>}
                                {footgearSlot[5] !== null ?
                                    <img src={footgearSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[5]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[5] !== null ?
                                    <img src={cardHeadUpperSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[5] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[5]}</div>}
                                {cardHeadMiddleSlot[5] !== null ?
                                    <img src={cardHeadMiddleSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[5] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[5]}</div>}
                                {cardHeadLowerSlot[5] !== null ?
                                    <img src={cardHeadLowerSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[5]}</div>}
                                {cardArmorSlot[5] !== null ?
                                    <img src={cardArmorSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[5]}</div>}
                                {cardGarmentSlot[5] !== null ?
                                    <img src={cardGarmentSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[5]}</div>}
                                {cardFootgearSlot[5] !== null ?
                                    <img src={cardFootgearSlot[5]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[5] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[5]}</div>}
                            </div>
                        </div>

                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[6] !== null ?
                                    <img src={cardWeaponSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[6] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[6]}</div>}
                                {jewelSlot[6] !== null ?
                                    <img src={jewelSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[6] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[6]}</div>}
                                {cardShieldSlot[6] !== null ?
                                    <img src={cardShieldSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[6] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[6]}</div>}
                                {daemonSlot[6] !== null ?
                                    <img src={daemonSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[6] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[6]}</div>}
                                {cardAccessorySlot[6] !== null ?
                                    <img src={cardAccessorySlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[6] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[6]}</div>}
                                {talismanTwoSlot[6] !== null ?
                                    <img src={talismanTwoSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[6]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[6] !== null ?
                                    <img src={weaponOneSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[6] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[6]}</div>}
                                {weaponTwoSlot[6] !== null ?
                                    <img src={weaponTwoSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[6] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[6]}</div>}
                                {shieldSlot[6] !== null ?
                                    <img src={shieldSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[6]}</div>}
                                {wingSlot[6] !== null ?
                                    <img src={wingSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[6]}</div>}
                                {accessorySlot[6] !== null ?
                                    <img src={accessorySlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[6]}</div>}
                                {talismanOneSlot[6] !== null ?
                                    <img src={talismanOneSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[6]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 7</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[6] !== null ?
                                            <img src={characterSlot[6]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[6] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[6]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[6] !== null ?
                                    <img src={headUpperSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[6] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[6]}</div>}
                                {headMiddleSlot[6] !== null ?
                                    <img src={headMiddleSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[6] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[6]}</div>}
                                {headLowerSlot[6] !== null ?
                                    <img src={headLowerSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[6]}</div>}
                                {armorSlot[6] !== null ?
                                    <img src={armorSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[6]}</div>}
                                {garmentSlot[6] !== null ?
                                    <img src={garmentSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[6]}</div>}
                                {footgearSlot[6] !== null ?
                                    <img src={footgearSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[6]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[6] !== null ?
                                    <img src={cardHeadUpperSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[6] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[6]}</div>}
                                {cardHeadMiddleSlot[6] !== null ?
                                    <img src={cardHeadMiddleSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[6] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[6]}</div>}
                                {cardHeadLowerSlot[6] !== null ?
                                    <img src={cardHeadLowerSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[6]}</div>}
                                {cardArmorSlot[6] !== null ?
                                    <img src={cardArmorSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[6]}</div>}
                                {cardGarmentSlot[6] !== null ?
                                    <img src={cardGarmentSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[6]}</div>}
                                {cardFootgearSlot[6] !== null ?
                                    <img src={cardFootgearSlot[6]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[6] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[6]}</div>}
                            </div>
                        </div>

                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[7] !== null ?
                                    <img src={cardWeaponSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[7] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[7]}</div>}
                                {jewelSlot[7] !== null ?
                                    <img src={jewelSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[7] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[7]}</div>}
                                {cardShieldSlot[7] !== null ?
                                    <img src={cardShieldSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[7] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[7]}</div>}
                                {daemonSlot[7] !== null ?
                                    <img src={daemonSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[7] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[7]}</div>}
                                {cardAccessorySlot[7] !== null ?
                                    <img src={cardAccessorySlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[7] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[7]}</div>}
                                {talismanTwoSlot[7] !== null ?
                                    <img src={talismanTwoSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[7]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[7] !== null ?
                                    <img src={weaponOneSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[7] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[7]}</div>}
                                {weaponTwoSlot[7] !== null ?
                                    <img src={weaponTwoSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[7] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[7]}</div>}
                                {shieldSlot[7] !== null ?
                                    <img src={shieldSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[7]}</div>}
                                {wingSlot[7] !== null ?
                                    <img src={wingSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[7]}</div>}
                                {accessorySlot[7] !== null ?
                                    <img src={accessorySlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[7]}</div>}
                                {talismanOneSlot[7] !== null ?
                                    <img src={talismanOneSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[7]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 8</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[7] !== null ?
                                            <img src={characterSlot[7]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[7] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[7]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[7] !== null ?
                                    <img src={headUpperSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[7] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[7]}</div>}
                                {headMiddleSlot[7] !== null ?
                                    <img src={headMiddleSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[7] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[7]}</div>}
                                {headLowerSlot[7] !== null ?
                                    <img src={headLowerSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[7]}</div>}
                                {armorSlot[7] !== null ?
                                    <img src={armorSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[7]}</div>}
                                {garmentSlot[7] !== null ?
                                    <img src={garmentSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[7]}</div>}
                                {footgearSlot[7] !== null ?
                                    <img src={footgearSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[7]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[7] !== null ?
                                    <img src={cardHeadUpperSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[7] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[7]}</div>}
                                {cardHeadMiddleSlot[7] !== null ?
                                    <img src={cardHeadMiddleSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[7] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[7]}</div>}
                                {cardHeadLowerSlot[7] !== null ?
                                    <img src={cardHeadLowerSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[7]}</div>}
                                {cardArmorSlot[7] !== null ?
                                    <img src={cardArmorSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[7]}</div>}
                                {cardGarmentSlot[7] !== null ?
                                    <img src={cardGarmentSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[7]}</div>}
                                {cardFootgearSlot[7] !== null ?
                                    <img src={cardFootgearSlot[7]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[7] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[7]}</div>}
                            </div>
                        </div>

                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[8] !== null ?
                                    <img src={cardWeaponSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[8] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[8]}</div>}
                                {jewelSlot[8] !== null ?
                                    <img src={jewelSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[8] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[8]}</div>}
                                {cardShieldSlot[8] !== null ?
                                    <img src={cardShieldSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[8] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[8]}</div>}
                                {daemonSlot[8] !== null ?
                                    <img src={daemonSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[8] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[8]}</div>}
                                {cardAccessorySlot[8] !== null ?
                                    <img src={cardAccessorySlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[8] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[8]}</div>}
                                {talismanTwoSlot[8] !== null ?
                                    <img src={talismanTwoSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[8]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[8] !== null ?
                                    <img src={weaponOneSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[8] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[8]}</div>}
                                {weaponTwoSlot[8] !== null ?
                                    <img src={weaponTwoSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[8] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[8]}</div>}
                                {shieldSlot[8] !== null ?
                                    <img src={shieldSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[8]}</div>}
                                {wingSlot[8] !== null ?
                                    <img src={wingSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[8]}</div>}
                                {accessorySlot[8] !== null ?
                                    <img src={accessorySlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[8]}</div>}
                                {talismanOneSlot[8] !== null ?
                                    <img src={talismanOneSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[8]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot 9</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[8] !== null ?
                                            <img src={characterSlot[8]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[8] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[8]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[8] !== null ?
                                    <img src={headUpperSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[8] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[8]}</div>}
                                {headMiddleSlot[8] !== null ?
                                    <img src={headMiddleSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[8] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[8]}</div>}
                                {headLowerSlot[8] !== null ?
                                    <img src={headLowerSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[8]}</div>}
                                {armorSlot[8] !== null ?
                                    <img src={armorSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[8]}</div>}
                                {garmentSlot[8] !== null ?
                                    <img src={garmentSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[8]}</div>}
                                {footgearSlot[8] !== null ?
                                    <img src={footgearSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[8]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[8] !== null ?
                                    <img src={cardHeadUpperSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[8] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[8]}</div>}
                                {cardHeadMiddleSlot[8] !== null ?
                                    <img src={cardHeadMiddleSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[8] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[8]}</div>}
                                {cardHeadLowerSlot[8] !== null ?
                                    <img src={cardHeadLowerSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[8]}</div>}
                                {cardArmorSlot[8] !== null ?
                                    <img src={cardArmorSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[8]}</div>}
                                {cardGarmentSlot[8] !== null ?
                                    <img src={cardGarmentSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[8]}</div>}
                                {cardFootgearSlot[8] !== null ?
                                    <img src={cardFootgearSlot[8]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[8] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[8]}</div>}
                            </div>
                        </div>

                        <div style={{paddingTop: "40px", borderTop: "1px solid", display: "flex"}}>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardWeaponSlot[9] !== null ?
                                    <img src={cardWeaponSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardWeaponSlotLevel[9] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardWeaponSlotLevel[9]}</div>}
                                {jewelSlot[9] !== null ?
                                    <img src={jewelSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {jewelSlotLevel[9] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{jewelSlotLevel[9]}</div>}
                                {cardShieldSlot[9] !== null ?
                                    <img src={cardShieldSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardShieldSlotLevel[9] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardShieldSlotLevel[9]}</div>}
                                {daemonSlot[9] !== null ?
                                    <img src={daemonSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {daemonSlotLevel[9] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{daemonSlotLevel[9]}</div>}
                                {cardAccessorySlot[9] !== null ?
                                    <img src={cardAccessorySlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardAccessorySlotLevel[9] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardAccessorySlotLevel[9]}</div>}
                                {talismanTwoSlot[9] !== null ?
                                    <img src={talismanTwoSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanTwoSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanTwoSlotLevel[9]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {weaponOneSlot[9] !== null ?
                                    <img src={weaponOneSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponOneSlotLevel[9] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponOneSlotLevel[9]}</div>}
                                {weaponTwoSlot[9] !== null ?
                                    <img src={weaponTwoSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {weaponTwoSlotLevel[9] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{weaponTwoSlotLevel[9]}</div>}
                                {shieldSlot[9] !== null ?
                                    <img src={shieldSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {shieldSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel[9]}</div>}
                                {wingSlot[9] !== null ?
                                    <img src={wingSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {wingSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{wingSlotLevel[9]}</div>}
                                {accessorySlot[9] !== null ?
                                    <img src={accessorySlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {accessorySlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{accessorySlotLevel[9]}</div>}
                                {talismanOneSlot[9] !== null ?
                                    <img src={talismanOneSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {talismanOneSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{talismanOneSlotLevel[9]}</div>}
                            </div>
                            <div style={{position: "relative", width: "300px", height: "700px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT Slot X</div>
                                {nft.length > 0 ?
                                    <>
                                        {characterSlot[9] !== null ?
                                            <img src={characterSlot[9]} width="300px" alt="Can not load metadata." style={{marginTop: "30px"}} /> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", marginTop: "30px"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {characterSlotLevel[9] !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel[9]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {headUpperSlot[9] !== null ?
                                    <img src={headUpperSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headUpperSlotLevel[9] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headUpperSlotLevel[9]}</div>}
                                {headMiddleSlot[9] !== null ?
                                    <img src={headMiddleSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headMiddleSlotLevel[9] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headMiddleSlotLevel[9]}</div>}
                                {headLowerSlot[9] !== null ?
                                    <img src={headLowerSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {headLowerSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{headLowerSlotLevel[9]}</div>}
                                {armorSlot[9] !== null ?
                                    <img src={armorSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {armorSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel[9]}</div>}
                                {garmentSlot[9] !== null ?
                                    <img src={garmentSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {garmentSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{garmentSlotLevel[9]}</div>}
                                {footgearSlot[9] !== null ?
                                    <img src={footgearSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {footgearSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{footgearSlotLevel[9]}</div>}
                            </div>
                            <div style={{position: "relative", width: "150px", height: "700px", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                                {cardHeadUpperSlot[9] !== null ?
                                    <img src={cardHeadUpperSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadUpperSlotLevel[9] !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadUpperSlotLevel[9]}</div>}
                                {cardHeadMiddleSlot[9] !== null ?
                                    <img src={cardHeadMiddleSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadMiddleSlotLevel[9] !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadMiddleSlotLevel[9]}</div>}
                                {cardHeadLowerSlot[9] !== null ?
                                    <img src={cardHeadLowerSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardHeadLowerSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardHeadLowerSlotLevel[9]}</div>}
                                {cardArmorSlot[9] !== null ?
                                    <img src={cardArmorSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardArmorSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardArmorSlotLevel[9]}</div>}
                                {cardGarmentSlot[9] !== null ?
                                    <img src={cardGarmentSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardGarmentSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardGarmentSlotLevel[9]}</div>}
                                {cardFootgearSlot[9] !== null ?
                                    <img src={cardFootgearSlot[9]} width="100px" alt="Can not load metadata." /> :
                                    <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                                }
                                {cardFootgearSlotLevel[9] !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{cardFootgearSlotLevel[9]}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {nft.length > 0 ?
                <div style={{width: "1650px", marginBottom: "80px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                        {nft.map((item, index) => (
                            <div style={{background: "rgb(230, 250, 54)", border: 0, justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard" key={index}>
                                <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                    <img src={item.Image} height="100%" alt="Can not load metadata." />
                                </div>
                                <div className="emp bold">{item.Name}</div>
                                <div className="bold">{item.RewardPerSec} power per sec</div>
                                <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                {address === youraddr ?
                                    <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                        {item.isStaked ?
                                            <>
                                                <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft((item.Id / 100000000000) | 0)}>UNEQUIP</div>
                                            </> :
                                            <>
                                                {isStakeNow ?
                                                    <>
                                                    </> :
                                                    <>
                                                        <div style={{alignSelf: "center"}} className="pixel button" onClick={() => equipNft(item.Id)}>EQUIP</div>
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
                        <div style={{background: "rgb(230, 250, 54)", border: 0, justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
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
                <div style={{width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                    <div className="nftCard" style={{background: "rgb(230, 250, 54)", boxShadow: "none", border: 0, justifyContent: "center"}}>
                        <ThreeDots fill="#5f6476" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default TheEndlessTower