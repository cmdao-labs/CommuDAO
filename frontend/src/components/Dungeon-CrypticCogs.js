import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const cmdaoNft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const narutaNft = '0x5E620D8980335167d9eF36cEf5d9A6Ea6607a8Cb'

const iiLab = '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241'
const dunEE = '0xF663c756b6D57724C3B41c8839aB9c7Af83c9751'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const CrypticCogs = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc721ABI, erc20ABI, dunEEABI }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/dungeon/cryptic-cogs/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/dungeon/cryptic-cogs/' + address)
    }

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
    const [eeBalance, setEEBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(cmdaoNft, erc721ABI, providerJBC)
        const nrtnftSC = new ethers.Contract(narutaNft, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            const nftEQ = address !== null && address !== undefined ? await readContract({
                address: dunEE,
                abi: dunEEABI,
                functionName: 'nftEquip',
                args: [address],
            }) : [{characterId: 0, hatId: 0, clothId: 0, accessoriesId: 0, backId: 0, shoesId: 0, weaponId: 0,}]

            const nftSTAT = address !== null && address !== undefined ? await readContract({
                address: dunEE,
                abi: dunEEABI,
                functionName: 'nftStatus',
                args: [address],
            }) : [{characterIndex: 0, hatIndex: 0, clothIndex: 0, accessoriesIndex: 0, backIndex: 0, shoesIndex: 0, weaponIndex: 0, allPow: 0, refuelAt: 0, isStaked: null}]

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: cmdaoNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                    },
                    {
                        address: cmdaoNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                    },
                    {
                        address: iiLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunEE,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunEE,
                        abi: dunEEABI,
                        functionName: 'calculateRewards',
                        args: [address],
                    },
                    {
                        address: narutaNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[0])],
                    },
                    {
                        address: narutaNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[3])],
                    },
                    {
                        address: narutaNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[4])],
                    },
                    {
                        address: narutaNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[5])],
                    },
                    {
                        address: narutaNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[6])],
                    },
                    {
                        address: narutaNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[2])],
                    },
                    {
                        address: narutaNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                    },
                ],
            }) : ["", "", "", "", "", "", "", 0, 0, 0, "", "", "", "", "", "", "", ]

            let nfts = []

            let charIpfs = null
            if (data[0].status === 'success' && Number(nftSTAT[0]) === 1) {
                charIpfs = data[0].result
            } else if (data[10].status === 'success' && Number(nftSTAT[0]) === 2) {
                charIpfs = data[10].result
            }
            const response1 = charIpfs !== null ? await fetch(charIpfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft1 = response1 !== null ? await response1.json() : {image: null, name: null}
            const nftEQ_1 = nft1.image !== null ? nft1.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
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
            const response2 = accIpfs !== null ? await fetch(accIpfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft2 = response2 !== null ? await response2.json() : {image: null, name: null}
            const nftEQ_2_Img = nft2.image !== null ? nft2.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
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
            const response3 = backpfs !== null ? await fetch(backpfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft3 = response3 !== null ? await response3.json() : {image: null, name: null}
            const nftEQ_3 = nft3.image !== null ? nft3.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
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
            const response4 = shoesIpfs !== null ? await fetch(shoesIpfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft4 = response4 !== null ? await response4.json() : {image: null, name: null}
            const nftEQ_4 = nft4.image !== null ? nft4.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
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
            const response5 = weaponIpfs !== null ? await fetch(weaponIpfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft5 = response5 !== null ? await response5.json() : {image: null, name: null}
            const nftEQ_5 = nft5.image !== null ? nft5.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
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
            const response6 = clothIpfs !== null ? await fetch(clothIpfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft6 = response6 !== null ? await response6.json() : {image: null, name: null}
            const nftEQ_6 = nft6.image !== null ? nft6.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
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
            const response7 = hatIpfs !== null ? await fetch(hatIpfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft7 = response7 !== null ? await response7.json() : {image: null, name: null}
            const nftEQ_7 = nft7.image !== null ? nft7.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
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
            const eeBal = data[8].result
            const rewardPending = isStaked === true ? data[9].result : 0
            
            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335027, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdaoNft,
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
                        address: cmdaoNft,
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
                    const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                    nft = await response.json()
                } catch {}

                nfts.push({
                    Col: 1,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            const wallet2Filter = await nrtnftSC.filters.Transfer(null, address, null)
            const wallet2Event = await nrtnftSC.queryFilter(wallet2Filter, 2852393, "latest")
            const wallet2Map = await Promise.all(wallet2Event.map(async (obj) => String(obj.args.tokenId)))
            const wallet2RemoveDup = wallet2Map.filter((obj, index) => wallet2Map.indexOf(obj) === index)
            const data4 = address !== null && address !== undefined ? await readContracts({
                contracts: wallet2RemoveDup.map((item) => (
                    {
                        address: narutaNft,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(wallet2RemoveDup.length).fill('')]

            let yournftwallet2 = []
            for (let i = 0; i <= wallet2RemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data4[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet2.push({Id: String(wallet2RemoveDup[i])})
                }
            }

            const data5 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet2.map((item) => (
                    {
                        address: narutaNft,
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
                    const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                    nft = await response.json()
                } catch {}

                nfts.push({
                    Col: 2,
                    Id: yournftwallet2[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet2[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            if (nfts.length === 0) { nfts.push(null) }
            
            return [
                nfts, nftEQ_1, nftEQ_1_Name, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3, nftEQ_3_Name, nftEQ_4, nftEQ_4_Name, nftEQ_5, nftEQ_5_Name, nftEQ_6, nftEQ_6_Name, nftEQ_7, nftEQ_7_Name,
                allPow, isStaked, refuelAt, rewardPending, iiBal, eeBal, 
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
            result[4] !== null && Number(result[4].slice(-1)) > 0 ? setRingSlotLevel(result[4].slice(-1)) : setRingSlotLevel(null)
            setShieldSlot(result[5])
            result[6] !== null && Number(result[6].slice(-1)) > 0 ? setShieldSlotLevel(result[6].slice(-1)) : setShieldSlotLevel(null)
            setBootsSlot(result[7])
            result[8] !== null && Number(result[8].slice(-1)) > 0 ? setBootsSlotLevel(result[8].slice(-1)) : setBootsSlotLevel(null)
            setSwordSlot(result[9])
            result[10] !== null && Number(result[10].slice(-1)) > 0 ? setSwordSlotLevel(result[10].slice(-1)) : setSwordSlotLevel(null)
            setArmorSlot(result[11])
            result[12] !== null && Number(result[12].slice(-1)) > 0 ? setArmorSlotLevel(result[12].slice(-1)) : setArmorSlotLevel(null)
            setHelmetSlot(result[13])
            result[14] !== null && Number(result[14].slice(-1)) > 0 ? setHelmetSlotLevel(result[14].slice(-1)) : setHelmetSlotLevel(null)

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
        })

    }, [address, txupdate, erc721ABI, erc20ABI, dunEEABI])

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

    const equipNft = async (_index, _nftid) => {
        setisLoading(true)
        let addr = '0x0000000000000000000000000000000000000000'
        if (_index === 1) {
            addr = cmdaoNft
        } else if (_index === 2) {
            addr = narutaNft
        }
        const nftAllow = await readContract({
            address: addr,
            abi: erc721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== dunEE.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: addr,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [dunEE, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: dunEE,
                abi: dunEEABI,
                functionName: 'equip',
                args: [_index, _nftid],
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
                address: dunEE,
                abi: dunEEABI,
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
        if (gasselected === "II") {
            gasAddr = iiLab
            gasIndex = 1
        }
        const gasAllow = await readContract({
            address: gasAddr,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, dunEE],
        })
        if (gasAllow < (7 * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: gasAddr,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [dunEE, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: dunEE,
                abi: dunEEABI,
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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://nftstorage.link/ipfs/bafybeiehjcwrzylly7xunlan4xqwe2aynokqkgtj65bwxxqq5wfnz4hcnq')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", padding: "10px 20px", width: "fit-content", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Cryptic Cogs</div>
                <div style={{fontSize: "17px", padding: "10px", width: "fit-content", marginTop: "30px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}} className="pixel">Exploring exotic cave to collect a rare token, $Enchant Engine.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="https://nftstorage.link/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm" width="150" alt="$EE" />
            </div>
        </div>
    
        <div style={{margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "rgb(230, 250, 54)", border: "none", justifyContent: "space-around", padding: "30px", width: "1560px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "rgb(194, 155, 231)", color: "#fff", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
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
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>TOTAL POWER PER SEC <div>{allPower}</div></div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            EE BALANCE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="https://nftstorage.link/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm" height="20" alt="$EE"/>
                                <div style={{marginLeft: "5px"}}>{Number(eeBalance).toFixed(3).toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            EE PENDING
                            <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                <img src="https://nftstorage.link/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm" height="20" alt="$EE"/>
                                <div style={{marginLeft: "5px"}}>{angbPending.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            DAILY GAS USAGE
                            <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                <option value="II">$II</option>
                            </select>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {gasselected === "II" ?
                                    <>
                                        <img src="https://nftstorage.link/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q" height="20" alt="$II"/>
                                        <div style={{marginLeft: "5px"}}>{Number(iiBalance).toFixed(0)}</div>
                                    </> :
                                    <></>
                                }
                                <div style={{marginLeft: "5px"}}>/7</div>
                            </div>
                        </div>
                        {timeToRunout !== null ?
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunout}</div></div>
                            : <></>
                        }
                        {address !== undefined && address === youraddr ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {isStakeNow ?
                                    <>
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                        <div style={{alignSelf: "center", background: isRunout ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                    </> :
                                    <>
                                        {isStakeNow !== null && ((gasselected === "II" && Number(iiBalance) >= 7)) ?
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
                        {helmetSlot !== null ?
                            <img src={helmetSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {helmetSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "0 6px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{helmetSlotLevel}</div>}
                        {armorSlot !== null ?
                            <img src={armorSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {armorSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "0 6px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel}</div>}
                        {bootsSlot !== null ?
                            <img src={bootsSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {bootsSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "0 6px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{bootsSlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT</div>
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
                        {characterSlotLevel !== null && <div style={{position: "absolute", top: "300px", right: "10px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {ringSlot !== null ?
                            <img src={ringSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {ringSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "0 6px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{ringSlotLevel}</div>}
                        {shieldSlot !== null ?
                            <img src={shieldSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {shieldSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "0 6px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel}</div>}
                        {swordSlot !== null ?
                            <img src={swordSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {swordSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "0 6px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{swordSlotLevel}</div>}
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
                                                <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft(item.Id / 100000000000 | 0)}>UNEQUIP</div>
                                            </> :
                                            <>
                                                {isStakeNow ?
                                                    <>
                                                    </> :
                                                    <>
                                                        <div style={{alignSelf: "center"}} className="pixel button" onClick={() => equipNft(item.Col, item.Id)}>EQUIP</div>
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

export default CrypticCogs