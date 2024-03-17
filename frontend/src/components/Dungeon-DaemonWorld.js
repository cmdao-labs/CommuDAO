import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const angelplus = '0x853beB37aBAfA021818B9f66e5333E657Ceb29d0'

const swarLab = '0x5e18a8B78d5395371308C54719fead810Ce2aCd2'
const dunANGB = '0x59c1C2f5FA76DB933B97b7c54223129e2A398534'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const Daemonworld = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc721ABI, erc20ABI, dunAngbABI }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/dungeon/daemon-world/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/dungeon/daemon-world/' + address)
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
    const [fairySlot, setFairySlot] = React.useState(null)
    const [fairySlotLevel, setFairySlotLevel] = React.useState(null)

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [gasselected, setGasselected] = React.useState("SWAR")
    const [angbPending, setAngbPending] = React.useState(0)

    const [swarBalance, setSwarBalance] = React.useState(0)
    const [angbBalance, setAngbBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const apnftSC = new ethers.Contract(angelplus, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            const nftEQ = address !== null && address !== undefined ? await readContract({
                address: dunANGB,
                abi: dunAngbABI,
                functionName: 'nftEquip',
                args: [address],
            }) : [{characterId: 0, helmetId: 0, armorId: 0, ringId: 0, shieldId: 0, bootsId: 0, swordId: 0, fairyId: 0, allPow: 0, refuelAt: 0, isStaked: null}]

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.characterId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.ringId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.shieldId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.bootsId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.swordId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.armorId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.helmetId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.fairyId)],
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
            console.log(nftEQ)
            console.log(data)

            let nfts = []

            const response1 = data[0] !== null ? await fetch(data[0].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft1 = response1 !== null ? await response1.json() : {image: null, name: null}
            const nftEQ_1 = nft1.image !== null ? nft1.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
            const nftEQ_1_Name = nft1.name
            if (response1 !== null) {
                nfts.push({
                    Col: 1,
                    Id: String(nftEQ.characterId),
                    Name: nftEQ_1_Name,
                    Image: nftEQ_1,
                    Description: nft1.description,
                    Attribute: nft1.attributes,
                    RewardPerSec: Number(String(nftEQ.characterId).slice(-5)),
                    isStaked: true
                })
            }

            const response2 = data[1] !== null ? await fetch(data[1].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft2 = response2 !== null ? await response2.json() : {image: null, name: null}
            const nftEQ_2_Img = nft2.image !== null ? nft2.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
            const nftEQ_2_Name = nft2.name
            if (response2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: String(nftEQ.ringId),
                    Name: nftEQ_2_Name,
                    Image: nftEQ_2_Img,
                    Description: nft2.description,
                    Attribute: nft2.attributes,
                    RewardPerSec: Number(String(nftEQ.ringId).slice(-5)),
                    isStaked: true
                })
            }
            
            const response3 = data[2] !== null ? await fetch(data[2].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft3 = response3 !== null ? await response3.json() : {image: null, name: null}
            const nftEQ_3 = nft3.image !== null ? nft3.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
            const nftEQ_3_Name = nft3.name
            if (response3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: String(nftEQ.shieldId),
                    Name: nftEQ_3_Name,
                    Image: nftEQ_3,
                    Description: nft3.description,
                    Attribute: nft3.attributes,
                    RewardPerSec: Number(String(nftEQ.shieldId).slice(-5)),
                    isStaked: true
                })
            }

            const response4 = data[3] !== null ? await fetch(data[3].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft4 = response4 !== null ? await response4.json() : {image: null, name: null}
            const nftEQ_4 = nft4.image !== null ? nft4.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
            const nftEQ_4_Name = nft4.name
            if (response4 !== null) {
                nfts.push({
                    Col: 1,
                    Id: String(nftEQ.bootsId),
                    Name: nftEQ_4_Name,
                    Image: nftEQ_4,
                    Description: nft4.description,
                    Attribute: nft4.attributes,
                    RewardPerSec: Number(String(nftEQ.bootsId).slice(-5)),
                    isStaked: true
                })
            }

            const response5 = data[4] !== null ? await fetch(data[4].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft5 = response5 !== null ? await response5.json() : {image: null, name: null}
            const nftEQ_5 = nft5.image !== null ? nft5.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
            const nftEQ_5_Name = nft5.name
            if (response5 !== null) {
                nfts.push({
                    Col: 1,
                    Id: String(nftEQ.swordId),
                    Name: nftEQ_5_Name,
                    Image: nftEQ_5,
                    Description: nft5.description,
                    Attribute: nft5.attributes,
                    RewardPerSec: Number(String(nftEQ.swordId).slice(-5)),
                    isStaked: true
                })
            }

            const response6 = data[5] !== null ? await fetch(data[5].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft6 = response6 !== null ? await response6.json() : {image: null, name: null}
            const nftEQ_6 = nft6.image !== null ? nft6.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
            const nftEQ_6_Name = nft6.name
            if (response6 !== null) {
                nfts.push({
                    Col: 1,
                    Id: String(nftEQ.armorId),
                    Name: nftEQ_6_Name,
                    Image: nftEQ_6,
                    Description: nft6.description,
                    Attribute: nft6.attributes,
                    RewardPerSec: Number(String(nftEQ.armorId).slice(-5)),
                    isStaked: true
                })
            }

            const response7 = data[6] !== null ? await fetch(data[6].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft7 = response7 !== null ? await response7.json() : {image: null, name: null}
            const nftEQ_7 = nft7.image !== null ? nft7.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
            const nftEQ_7_Name = nft7.name
            if (response7 !== null) {
                nfts.push({
                    Col: 1,
                    Id: String(nftEQ.helmetId),
                    Name: nftEQ_7_Name,
                    Image: nftEQ_7,
                    Description: nft7.description,
                    Attribute: nft7.attributes,
                    RewardPerSec: Number(String(nftEQ.helmetId).slice(-5)),
                    isStaked: true
                })
            }

            const response8 = data[7] !== null ? await fetch(data[7].replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/")) : null
            const nft8 = response8 !== null ? await response8.json() : {image: null, name: null}
            const nftEQ_8 = nft8.image !== null ? nft8.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/") : null
            const nftEQ_8_Name = nft8.name
            if (response8 !== null) {
                nfts.push({
                    Col: 1,
                    Id: String(nftEQ.fairyId),
                    Name: nftEQ_8_Name,
                    Image: nftEQ_8,
                    Description: nft8.description,
                    Attribute: nft8.attributes,
                    RewardPerSec: Number(String(nftEQ.fairyId).slice(-5)),
                    isStaked: true
                })
            }


            const allPow = Number(nftEQ.allPow)
            const isStaked = nftEQ.isStaked
            const refuelAt = Number(nftEQ.refuelAt)

            const swarBal = data[8]
            const angbBal = data[9]
            const rewardPending = isStaked === true ? data[10] : 0
            
            const walletFilter = await apnftSC.filters.Transfer(null, address, null)
            const walletEvent = await apnftSC.queryFilter(walletFilter, 2768102, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj, index) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data2[i].toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            console.log(yournftwallet)

            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet.map((item) => (
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i]
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
            setCharacterSlot(result[1])
            result[2] !== null ? setCharacterSlotLevel(result[2].slice(-1)) : setCharacterSlotLevel(null)
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
            setFairySlot(result[15])
            result[16] !== null && Number(result[15].slice(-1)) > 0 ? setFairySlotLevel(result[16].slice(-1)) : setFairySlotLevel(null)

            setAllPower(result[17])
            setIsStakeNow(result[18])
            const gasOut = new Date((result[19] * 1000) + (86400 * 1000))
            result[19] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[19] !== 0 && Date.now() - (result[19] * 1000) > (86400 * 1000) ? setIsRunout(true) : setIsRunout(false)
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
            addr = angelplus
        }
        try {
            const config = await prepareWriteContract({
                address: addr,
                abi: erc721ABI,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const equipNft = async (_nftid) => {
        setisLoading(true)
        const nftAllow = await readContract({
            address: angelplus,
            abi: erc721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== dunANGB.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: angelplus,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [dunANGB, _nftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: dunANGB,
                abi: dunAngbABI,
                functionName: 'equip',
                args: [_nftid],
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
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
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
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
        const gasAllow = await readContract({
            address: gasAddr,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, dunANGB],
        })
        if (gasAllow < (2 * 10**17)) {
            try {
                const config = await prepareWriteContract({
                    address: gasAddr,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [dunANGB, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: dunANGB,
                abi: dunAngbABI,
                functionName: 'refuel',
                args: [gasIndex]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://nftstorage.link/ipfs/bafybeicatk66gnfauhbytqbqbxlbu47hg2j3wzxiatzfs4xjwfhaozvpne')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>Daemon World</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">Exploring exotic cave to collect a rare token, $Angel Blessing.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" width="150" alt="$ANGB" />
            </div>
        </div>
    
        <div style={{margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "rgb(230, 250, 54)", border: "none", justifyContent: "space-around", padding: "30px", width: "1560px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "rgb(194, 155, 231)", color: "#fff", position: "relative", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
                        <div style={{position: "absolute", top: -15, right: -15, padding: "7.5px 20px", width: "100px", background: "#000", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <div className='light' style={{color: "rgb(230, 250, 54)"}}>Reward x10</div>
                        </div>
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
                            ANGB BALANCE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" height="20" alt="$ANGB"/>
                                <div style={{marginLeft: "5px"}}>{Number(angbBalance).toFixed(3).toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            ANGB PENDING
                            <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" height="20" alt="$ANGB"/>
                                <div style={{marginLeft: "5px"}}>{angbPending.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            DAILY GAS USAGE
                            <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                <option value="SWAR">$SWAR</option>
                            </select>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {gasselected === "SWAR" ?
                                    <>
                                        <img src="https://nftstorage.link/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi" height="20" alt="$SWAR"/>
                                        <div style={{marginLeft: "5px"}}>{Number(swarBalance).toFixed(0)}</div>
                                    </> :
                                    <></>
                                }
                                <div style={{marginLeft: "5px"}}>/0.2</div>
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
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {helmetSlot !== null ?
                            <img src={helmetSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {helmetSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{helmetSlotLevel}</div>}
                        {armorSlot !== null ?
                            <img src={armorSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {armorSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{armorSlotLevel}</div>}
                        {bootsSlot !== null ?
                            <img src={bootsSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {bootsSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{bootsSlotLevel}</div>}
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
                        {characterSlotLevel !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{characterSlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Fairy NFT</div>
                        {nft.length > 0 ?
                            <>
                                {fairySlot !== null ?
                                    <img src={fairySlot} width="300px" alt="Can not load metadata." /> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                }
                            </> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                        {fairySlotLevel !== null && <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Lv.{fairySlotLevel}</div>}
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {ringSlot !== null ?
                            <img src={ringSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {ringSlotLevel !== null && <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{ringSlotLevel}</div>}
                        {shieldSlot !== null ?
                            <img src={shieldSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {shieldSlotLevel !== null && <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{shieldSlotLevel}</div>}
                        {swordSlot !== null ?
                            <img src={swordSlot} width="100px" alt="Can not load metadata." /> :
                            <div style={{borderRadius: "16px", border: "1px solid gray", width: "100px", height: "100px"}}></div>
                        }
                        {swordSlotLevel !== null && <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px 8px", fontSize: "25px", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>+{swordSlotLevel}</div>}
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
                                                <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft(Number(item.Id / 100000000000).toFixed(0))}>UNEQUIP</div>
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

export default Daemonworld