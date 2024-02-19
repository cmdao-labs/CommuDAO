import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const angelplus = '0x0154fC0e36DA44b215DB355AcfD395350ff166b1'

const ctunaLab = '0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0'
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const pzaLab = '0x09DcdCFc6C48803681a3422997c679E773656763'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const Daemonworld = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc721ABI, erc20ABI, dunJasperABI }) => {
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

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [gasselected, setGasselected] = React.useState("SWAR")
    const [jasperPending, setJasperPending] = React.useState(0)

    const [ctunaBalance, setCTunaBalance] = React.useState(0)
    const [sx31Balance, setSx31Balance] = React.useState(0)
    const [pzaBalance, setPzaBalance] = React.useState(0)
    const [jaspBalance, setJaspBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(angelplus, erc721ABI, providerJBC)
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
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.characterId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.accessoriesId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.backId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.shoesId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.weaponId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.clothId)],
                    },
                    {
                        address: angelplus,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(nftEQ.hatId)],
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
                        address: dunJasper,
                        abi: dunJasperABI,
                        functionName: 'calculateRewards',
                        args: [address],
                    },
                ],
            }) : ["", "", "", "", "", "", "", 0, 0, 0, 0, 0, 0, ]
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
                    Id: String(nftEQ.accessoriesId),
                    Name: nftEQ_2_Name,
                    Image: nftEQ_2_Img,
                    Description: nft2.description,
                    Attribute: nft2.attributes,
                    RewardPerSec: Number(String(nftEQ.accessoriesId).slice(-5)),
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
                    Id: String(nftEQ.backId),
                    Name: nftEQ_3_Name,
                    Image: nftEQ_3,
                    Description: nft3.description,
                    Attribute: nft3.attributes,
                    RewardPerSec: Number(String(nftEQ.backId).slice(-5)),
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
                    Id: String(nftEQ.shoesId),
                    Name: nftEQ_4_Name,
                    Image: nftEQ_4,
                    Description: nft4.description,
                    Attribute: nft4.attributes,
                    RewardPerSec: Number(String(nftEQ.shoesId).slice(-5)),
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
                    Id: String(nftEQ.weaponId),
                    Name: nftEQ_5_Name,
                    Image: nftEQ_5,
                    Description: nft5.description,
                    Attribute: nft5.attributes,
                    RewardPerSec: Number(String(nftEQ.weaponId).slice(-5)),
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
                    Id: String(nftEQ.clothId),
                    Name: nftEQ_6_Name,
                    Image: nftEQ_6,
                    Description: nft6.description,
                    Attribute: nft6.attributes,
                    RewardPerSec: Number(String(nftEQ.clothId).slice(-5)),
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
                    Id: String(nftEQ.hatId),
                    Name: nftEQ_7_Name,
                    Image: nftEQ_7,
                    Description: nft7.description,
                    Attribute: nft7.attributes,
                    RewardPerSec: Number(String(nftEQ.hatId).slice(-5)),
                    isStaked: true
                })
            }

            const allPow = Number(nftEQ.allPow)
            const isStaked = nftEQ.isStaked
            const refuelAt = Number(nftEQ.refuelAt)

            const ctunaBal = data[7]
            const sx31Bal = data[8]
            const pzaBal = data[9]
            const jaspBal = data[10]
            const rewardPending = isStaked === true ? data[11] : 0
            
            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
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
                nfts, nftEQ_1, nftEQ_1_Name, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3, nftEQ_3_Name, nftEQ_4, nftEQ_4_Name, nftEQ_5, nftEQ_5_Name, nftEQ_6, nftEQ_6_Name, nftEQ_7, nftEQ_7_Name,
                allPow, isStaked, refuelAt, rewardPending, ctunaBal, sx31Bal, pzaBal, jaspBal,
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

            setAllPower(result[15])
            setIsStakeNow(result[16])
            const gasOut = new Date((result[17] * 1000) + (86400 * 1000))
            result[17] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[17] !== 0 && Date.now() - (result[17] * 1000) > (86400 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setJasperPending(ethers.utils.formatUnits(String(result[18]), "gwei"))
        
            setCTunaBalance(ethers.utils.formatEther(String(result[19])))
            setSx31Balance(ethers.utils.formatEther(String(result[20])))
            setPzaBalance(ethers.utils.formatEther(String(result[21])))
            setJaspBalance(ethers.utils.formatUnits(String(result[22]), "gwei"))
        })

    }, [address, txupdate, erc721ABI, erc20ABI, dunJasperABI])

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
        if (nftAllow.toUpperCase() !== dunJasper.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: angelplus,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [dunJasper, _nftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: dunJasper,
                abi: dunJasperABI,
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
                address: dunJasper,
                abi: dunJasperABI,
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
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: dunJasper,
                abi: dunJasperABI,
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
                <div style={{background: "#ffeceb", border: "none", justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "#EBDDB8", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", boxShadow: "3px 3px 0 #0d0a1f"}}>
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
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            {address !== undefined ?
                                <>ADDRESS <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                                <>ADDRESS <div>-</div></>
                            }
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>TOTAL CMPOW PER SEC <div>{allPower}</div></div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            JASP BALANCE (GWEI UNIT)
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="20" alt="$JASP"/>
                                <div style={{marginLeft: "5px"}}>{Number(jaspBalance).toFixed(3).toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            JASP PENDING (GWEI UNIT)
                            <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="20" alt="$JASP"/>
                                <div style={{marginLeft: "5px"}}>{jasperPending.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>
                            DAILY GAS USAGE
                            <select style={{padding: "2.5px 5px", fontSize: "16px", background: "transparent"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                <option value="SWAR">$SWAR</option>
                            </select>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {gasselected === "SWAR" ?
                                    <>
                                        <img src="https://nftstorage.link/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi" height="20" alt="$SWAR"/>
                                        <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toFixed(0)}</div>
                                    </> :
                                    <></>
                                }
                                <div style={{marginLeft: "5px"}}>/500</div>
                            </div>
                        </div>
                        {timeToRunout !== null ?
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"}}>GAS RUN OUT AT <div>{timeToRunout}</div></div>
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
                            <img src={hatSlot} width="100px" alt="Can not load metadata."></img> :
                            <img src="/../elements/hat.png" width="100px" alt="Hat_slot"></img>
                        }
                        {hatSlotLevel !== null ?
                            <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevel}</div> :
                            <></>
                        }
                        {clothSlot !== null ?
                            <img src={clothSlot} width="100px" alt="Can not load metadata."></img> :
                            <img src="/../elements/cloth.png" width="100px" alt="Cloth_slot"></img>
                        }
                        {clothSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevel}</div> :
                            <></>
                        }
                        {shoesSlot !== null ?
                            <img src={shoesSlot} width="100px" alt="Can not load metadata."></img> :
                            <img src="/../elements/shoes.png" width="100px" alt="Shoes_slot"></img>
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
                                    <img src={characterSlot} width="300px" alt="Can not load metadata." /> :
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
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                        {accSlot !== null ?
                            <img src={accSlot} width="100px" alt="Can not load metadata."></img> :
                            <img src="/../elements/accessories.png" width="100px" alt="Accessories_slot"></img>
                        }
                        {accSlotLevel !== null ?
                            <div style={{position: "absolute", top: "85px", right: "50px", padding: "2px", fontSize: "25px"}}>+{accSlotLevel}</div> :
                            <></>
                        }
                        {backSlot !== null ?
                            <img src={backSlot} width="100px" alt="Can not load metadata."></img> :
                            <img src="/../elements/back.png" width="100px" alt="Back_slot"></img>
                        }
                        {backSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{backSlotLevel}</div> :
                            <></>
                        }
                        {weaponSlot !== null ?
                            <img src={weaponSlot} width="100px" alt="Can not load metadata."></img> :
                            <img src="/../elements/weapon.png" width="100px" alt="Weapon_slot"></img>
                        }
                        {wpSlotLevel !== null ?
                            <div style={{position: "absolute", top: "385px", right: "50px", padding: "2px", fontSize: "25px"}}>+{wpSlotLevel}</div> :
                            <></>
                        }
                    </div>
                </div>
            </div>
            
            {nft.length > 0 ?
                <div style={{width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                        {nft.map((item, index) => (
                            <div style={{background: "#ffeceb", border: 0, justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard" key={index}>
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
                        <div style={{background: "#ffeceb", border: 0, justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
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
                    <div className="nftCard" style={{background: "#ffeceb", boxShadow: "none", border: 0, justifyContent: "center"}}>
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