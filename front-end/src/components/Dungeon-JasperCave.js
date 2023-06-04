import React from 'react'
import { ethers } from 'ethers'
import { fetchBalance, readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const beasts = '0x999999999AB9BC4F6EaA79a980Ba9c5AaD4FB868'

const ctunaLab = '0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0'
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const dunJasperL2 = '0xDe5770c72cEEE0d73503E827973cfD200431ABd4'

const Jaspercave = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, hexa721ABI, erc20ABI, dunJasperABI, dunJasperL2ABI }) => {
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
    const [hatSlot, setHatSlot] = React.useState(null)
    const [hatSlotLevel, setHatSlotLevel] = React.useState(null)
    const [clothSlot, setClothSlot] = React.useState(null)
    const [clothSlotLevel, setClothSlotLevel] = React.useState(null)
    const [accSlot, setAccSlot] = React.useState(null)
    const [accSlotLevel, setAccSlotLevel] = React.useState(null)
    const [backSlot, setBackSlot] = React.useState(null)
    const [shoesSlot, setShoesSlot] = React.useState(null)
    const [weaponSlot, setWeaponSlot] = React.useState(null)
    const [wpSlotLevel, setWpSlotLevel] = React.useState(null)
    const [l2FollowerSlot, setL2FollowerSlot] = React.useState(null)

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [gasselected, setGasselected] = React.useState("SX31")
    const [jasperPending, setJasperPending] = React.useState(0)
    const [isStakeL2Now, setIsStakeL2Now] = React.useState(null)
    const [jbcPool, setJbcPool] = React.useState(0)
    const [jbcPend, setJbcPend] = React.useState('0.0')
    const [yourL2CMPOW, setYourL2CMPOW] = React.useState(0)
    const [l2CMPOW, setL2CMPOW] = React.useState(0)

    const [jbcBalance, setJbcBalance] = React.useState(0)
    const [ctunaBalance, setCTunaBalance] = React.useState(0)
    const [sx31Balance, setSx31Balance] = React.useState(0)
    const [jaspBalance, setJaspBalance] = React.useState(0)

    React.useEffect(() => {
        setNft([])
        
        const thefetch = async () => {
            let nfts = []

            const res = await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + dunJasper + `") {
                            ERC721tokens(first: 1000) {
                                id
                                uri
                                transfers(orderBy: timestamp, orderDirection: desc, first: 2) {
                                    to {
                                        id
                                    }
                                }
                            }
                        }
                    }`
                })
            })).json()
            const _res = res !== null ? res.data.account.ERC721tokens : []
            let yournftstake = []
            for (let i = 0; i <= _res.length - 1 && address !== null && address !== undefined ; i++) {
                if ((_res[i].transfers[0].to.id).toUpperCase() === dunJasper.toUpperCase()) {
                    if ((_res[i].transfers[1].to.id).toUpperCase() === address.toUpperCase()) {
                        yournftstake.push({Id: Number((_res[i].id).slice(43)), URI: _res[i].uri})
                    }
                }
            }

            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = yournftstake[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(yournftstake[i].Id).slice(-4))

                nfts.push({
                    Col: 1,
                    Id: Number(yournftstake[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: bonus,
                    isStaked: true
                })
            }

            const resL2 = await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + dunJasperL2 + `") {
                            ERC721tokens(where: {contract: "` + beasts + `"}, first: 1000) {
                                id
                                uri
                                transfers(orderBy: timestamp, orderDirection: desc, first: 2) {
                                    to {
                                        id
                                    }
                                }
                            }
                        }
                    }`
                })
            })).json()
            const _resL2 = resL2 !== null && resL2.data.account !== null ? resL2.data.account.ERC721tokens : []
            let yournftstakeL2 = []
            for (let i = 0; i <= _resL2.length - 1 && address !== null && address !== undefined ; i++) {
                if ((_resL2[i].transfers[0].to.id).toUpperCase() === dunJasperL2.toUpperCase()) {
                    if ((_resL2[i].transfers[1].to.id).toUpperCase() === address.toUpperCase()) {
                        yournftstakeL2.push({Id: Number((_resL2[i].id).slice(43)), URI: _resL2[i].uri})
                    }
                }
            }

            for (let i = 0; i <= yournftstakeL2.length - 1; i++) {
                const nftipfs = yournftstakeL2[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"))
                const nft = await response.json()

                nfts.push({
                    Col: 2,
                    Id: Number(yournftstakeL2[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0,
                    isStaked: true
                })
            }

            const res2 = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + address + `") {
                            ERC721tokens(where: {contract: "` + hexajibjib + `"}) {
                                id
                                uri
                            }
                        }
                    }`
                })
            })).json() : null
            const _res2 = res2 !== null && res2.data.account !== null ? res2.data.account.ERC721tokens : []
            let yournft = []
            for (let i = 0; i <= _res2.length - 1 && address !== null && address !== undefined ; i++) {
                yournft.push({Id: Number((_res2[i].id).slice(43)), URI: _res2[i].uri})
            }

            for (let i = 0; i <= yournft.length - 1; i++) {
                const nftipfs = yournft[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(yournft[i].Id).slice(-4))

                nfts.push({
                    Col: 1,
                    Id: Number(yournft[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: bonus,
                    isStaked: false
                })
            }

            const resyour2 = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + address + `") {
                            ERC721tokens(where: {contract: "` + beasts + `"}) {
                                id
                                uri
                            }
                        }
                    }`
                })
            })).json() : null
            const _resyour2 = resyour2 !== null && resyour2.data.account !== null ? resyour2.data.account.ERC721tokens : []
            let yournft2 = []
            for (let i = 0; i <= _resyour2.length - 1 && address !== null && address !== undefined ; i++) {
                yournft2.push({Id: Number((_resyour2[i].id).slice(43)), URI: _resyour2[i].uri})
            }

            for (let i = 0; i <= yournft2.length - 1; i++) {
                const nftipfs = yournft2[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"))
                const nft = await response.json()

                nfts.push({
                    Col: 2,
                    Id: Number(yournft2[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://ipfs.8api.sh/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0,
                    isStaked: false
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            const nftEQ = address !== null && address !== undefined ? await readContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'nftEquip',
                args: [address],
            }) : 0

            let nftEQ_1 = null
            let nftEQ_1_Name = null
            let nftEQ_2_Img = null
            let nftEQ_2_Name = null
            let nftEQ_3 = null
            let nftEQ_4 = null
            let nftEQ_5 = null
            let nftEQ_5_Name = null
            let nftEQ_6 = null
            let nftEQ_6_Name = null
            let nftEQ_7 = null
            let nftEQ_7_Name = null
            for (let i = 0; i <= nfts.length - 1; i++) {
                if (yournftstake.length > 0) {
                    if (nfts[i].Id === Number(nftEQ.characterId)) {
                        nftEQ_1 = nfts[i].Image
                        nftEQ_1_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(nftEQ.accessoriesId)) {
                        nftEQ_2_Img = nfts[i].Image
                        nftEQ_2_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(nftEQ.backId)) {
                        nftEQ_3 = nfts[i].Image
                    } else if (nfts[i].Id === Number(nftEQ.shoesId)) {
                        nftEQ_4 = nfts[i].Image
                    } else if (nfts[i].Id === Number(nftEQ.weaponId)) {
                        nftEQ_5 = nfts[i].Image
                        nftEQ_5_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(nftEQ.clothId)) {
                        nftEQ_6 = nfts[i].Image
                        nftEQ_6_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(nftEQ.hatId)) {
                        nftEQ_7 = nfts[i].Image
                        nftEQ_7_Name = nfts[i].Name
                    }
                }
            }

            const nftEQ_L2 = address !== null && address !== undefined ? await readContract({
                address: dunJasperL2,
                abi: dunJasperL2ABI,
                functionName: 'userInfo',
                args: [1, address],
            }) : 0
            let nftEQ_L2_Follower = null;
            for (let i = 0; i <= nfts.length - 1; i++) {
                if (yournftstakeL2.length > 0) {
                    if (nfts[i].Id === Number(nftEQ_L2.followerId)) {
                        nftEQ_L2_Follower = nfts[i].Image
                    }
                }
            }

            const allPow = address !== null && address !== undefined ? Number(nftEQ.allPow) : 0
            const isStaked = address !== null && address !== undefined ? nftEQ.isStaked : null
            const refuelAt = isStaked === true ? Number(nftEQ.refuelAt) : 0
            const rewardPending = address !== null && address !== undefined && isStaked === true ? await readContract({
                address: dunJasper,
                abi: dunJasperABI,
                functionName: 'calculateRewards',
                args: [address],
            }) : 0

            const isStakeL2 = nftEQ_L2.cmpow > 0
            const jbcPend = address !== null && address !== undefined && isStakeL2 ? await readContract({
                address: dunJasperL2,
                abi: dunJasperL2ABI,
                functionName: 'pendingReward',
                args: [1, address],
            }) : 0
            const jbcPool = await fetchBalance({ address: dunJasperL2, })
            const l2Pool = await readContract({
                address: dunJasperL2,
                abi: dunJasperL2ABI,
                functionName: 'poolInfo',
                args: [1],
            })
            const l2PoolCMPOW = Number(l2Pool.cmpowAll)
            const cmpow_L2 = Number(nftEQ_L2.cmpow);

            const jbcBal = address !== null && address !== undefined ? await fetchBalance({ address: address, }) : {formatted: 0}
            const ctunaBal = address !== null && address !== undefined ? await readContract({
                address: ctunaLab,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0
            const sx31Bal = address !== null && address !== undefined ? await readContract({
                address: sx31Lab,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0
            const jaspBal = address !== null && address !== undefined ? await readContract({
                address: dunJasper,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            return [
                nfts, nftEQ_1, nftEQ_1_Name, nftEQ_2_Img, nftEQ_2_Name, nftEQ_3, nftEQ_4, nftEQ_5, nftEQ_5_Name, nftEQ_6, nftEQ_6_Name, nftEQ_7, nftEQ_7_Name, nftEQ_L2_Follower,
                allPow, isStaked, refuelAt, rewardPending, isStakeL2, jbcPool, jbcPend, l2PoolCMPOW, cmpow_L2,
                jbcBal, ctunaBal, sx31Bal, jaspBal
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
            result[2] !== null && Number(result[2].slice(-2, -1)) > 0 ? setCharacterSlotLevel(result[2].slice(-2, -1)) : setCharacterSlotLevel(null)
            setAccSlot(result[3])
            result[4] !== null && Number(result[4].slice(-1)) > 0 ? setAccSlotLevel(result[4].slice(-1)) : setAccSlotLevel(null)
            setBackSlot(result[5])
            setShoesSlot(result[6])
            setWeaponSlot(result[7])
            result[8] !== null && Number(result[8].slice(-1)) > 0 ? setWpSlotLevel(result[8].slice(-1)) : setWpSlotLevel(null)
            setClothSlot(result[9])
            result[10] !== null && Number(result[10].slice(-1)) > 0 ? setClothSlotLevel(result[10].slice(-1)) : setClothSlotLevel(null)
            setHatSlot(result[11])
            result[12] !== null && Number(result[12].slice(-1)) > 0 ? setHatSlotLevel(result[12].slice(-1)) : setHatSlotLevel(null)
            setL2FollowerSlot(result[13])

            setAllPower(result[14])
            setIsStakeNow(result[15])
            const gasOut = new Date((result[16] * 1000) + (86400 * 1000))
            result[16] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[16] !== 0 && Date.now() - (result[16] * 1000) > (86400 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setJasperPending(ethers.utils.formatUnits(String(result[17]), "gwei"))
            setIsStakeL2Now(result[18])
            setJbcPool(result[19].formatted)
            setJbcPend(ethers.utils.formatEther(String(result[20])))
            setL2CMPOW(result[21])
            setYourL2CMPOW(result[22])

            setJbcBalance(result[23].formatted)
            setCTunaBalance(ethers.utils.formatEther(String(result[24])))
            setSx31Balance(ethers.utils.formatEther(String(result[25])))
            setJaspBalance(ethers.utils.formatUnits(String(result[26]), "gwei"))
        })

    }, [address, txupdate, hexa721ABI, erc20ABI, dunJasperABI, dunJasperL2ABI])

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
                abi: hexa721ABI,
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
            address: hexajibjib,
            abi: hexa721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== dunJasper.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: hexajibjib,
                    abi: hexa721ABI,
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

    const stakeFollowerL2 = async (_nftid) => {
        setisLoading(true)
        try {
            if (_nftid !== 0) {
                const nftAllow = await readContract({
                    address: beasts,
                    abi: hexa721ABI,
                    functionName: 'getApproved',
                    args: [_nftid],
                })
                if (nftAllow.toUpperCase() !== dunJasperL2.toUpperCase()) {
                    const config = await prepareWriteContract({
                        address: beasts,
                        abi: hexa721ABI,
                        functionName: 'approve',
                        args: [dunJasperL2, _nftid],
                    })
                    const approvetx = await writeContract(config)
                    await approvetx.wait()
                }
            }
            const config2 = await prepareWriteContract({
                address: dunJasperL2,
                abi: dunJasperL2ABI,
                functionName: 'stakeL2',
                args: [1, _nftid, 0]
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const unstakeL2 = async (_isUnstakeFollower) => {
        setisLoading(true)
        try {
            const config2 = await prepareWriteContract({
                address: dunJasperL2,
                abi: dunJasperL2ABI,
                functionName: 'unstakeL2',
                args: [1, _isUnstakeFollower, false]
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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('/../background/dungeonbg.png')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "95px", color: "#fff", width: "fit-content"}}>Jasper Cave</div>
                <div style={{fontSize: "22.5px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">Exploring exotic cave to collect a rare token, $Jasper.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="/../items/jasper.png" width="200" alt="$JASP" />
            </div>
        </div>

        <div style={{background: "#28145A", margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "370px", height: "360px", borderRadius: "16px", border: "1px solid gray", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                        <div style={{fontSize: "22px", lineHeight: "15px"}}>LAYER 1 STAKING</div>
                            {isStakeNow ?
                                <>
                                {isRunout ?
                                    <div style={{display: "flex", flexDirection: "row"}} className="emp">
                                        <div style={{backgroundColor: "red", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                        <div>Run Out of Gas</div>
                                    </div> :
                                    <div style={{display: "flex", flexDirection: "row"}} className="emp">
                                        <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                        <div>On Staking</div>
                                    </div>
                                }
                                </> :
                                <>
                                {isStakeNow === false ?
                                    <div style={{display: "flex", flexDirection: "row"}} className="emp">
                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                        <div>Available for stake</div>
                                    </div> :
                                    <></>
                                }
                                </>
                            }
                        </div>
                        {address !== undefined ?
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>ADDRESS: <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></div> :
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>ADDRESS: <div>-</div></div>
                        }
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>TOTAL CMPOW PER SEC: <div>{allPower}</div></div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            JASP BALANCE (GWEI UNIT):
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="/../items/jasper.png" height="20" alt="$JASP"/>
                                <div style={{marginLeft: "5px"}}>{Number(jaspBalance).toFixed(3).toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            JASP PENDING (GWEI UNIT):
                            <div style={{display: "flex", flexDirection: "row", color: timeToRunout !== 0 && timeToRunout !== null  ? "#ff007a" : "#5f6476"}}>
                                <img src="/../items/jasper.png" height="20" alt="$JASP"/>
                                <div style={{marginLeft: "5px"}}>{jasperPending.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            DAILY GAS USAGE:
                            <select style={{padding: "5px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                <option value="CTUNA">$CTUNA</option>
                                <option value="SX31">$SX31</option>
                            </select>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {gasselected === "CTUNA" ?
                                    <>
                                        <img src="/../items/cannedtuna.png" height="20" alt="$CTUNA"/>
                                        <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toFixed(0)}</div>
                                    </> :
                                    <></>
                                }
                                {gasselected === "SX31" ?
                                    <>
                                        <img src="/../items/sx31.png" height="20" alt="$SX31"/>
                                        <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toFixed(0)}</div>
                                    </> :
                                    <></>
                                }
                                <div style={{marginLeft: "5px"}}>/500</div>
                            </div>
                        </div>
                        {timeToRunout !== null ?
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>GAS RUN OUT AT: <div>{timeToRunout}</div></div>
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
                                        {isStakeNow !== null && ((gasselected === "CTUNA" && Number(ctunaBalance) >= 500) || (gasselected === "SX31" && Number(sx31Balance) >= 500)) ?
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
                    </div>
                    <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT</div>
                        {characterSlot !== null ?
                            <img src={characterSlot} width="300px" alt="Can not load metadata."></img> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                        {characterSlotLevel !== null ?
                            <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px", fontSize: "25px"}}>Lv.{characterSlotLevel}</div> :
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

            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", marginBottom: "100px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "370px", height: "360px", borderRadius: "16px", border: "1px solid gray", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                            <div style={{fontSize: "22px", lineHeight: "15px"}}>LAYER 2 STAKING</div>
                            {isStakeL2Now ?
                                <div style={{display: "flex", flexDirection: "row"}} className="emp">
                                    <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                    <div>On Staking</div>
                                </div> :
                                <>
                                {isStakeL2Now === false ?
                                    <div style={{display: "flex", flexDirection: "row"}} className="emp">
                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                        <div>Available for stake</div>
                                    </div> :
                                    <></>
                                }
                                </>
                            }
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            TOTAL CMPOW PER BLOCK:
                            <div style={{display: "flex", flexDirection: "row"}}>{yourL2CMPOW}</div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            POOL SHARE :
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div style={{marginLeft: "5px"}}>{isStakeL2Now ? Number((yourL2CMPOW * 100) / l2CMPOW).toFixed(6) : 0}%</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            JBC BALANCE :
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="/../tokens/jbc.png" height="20" alt="$JBC"/>
                                <div style={{marginLeft: "5px"}}>{Number(jbcBalance).toFixed(3)}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            JBC PENDING :
                            <div style={{display: "flex", flexDirection: "row"}} className={isStakeL2Now ? "emp" : ""}>
                                <img src="/../tokens/jbc.png" height="20" alt="$JBC"/>
                                <div style={{marginLeft: "5px"}}>{Number(jbcPend).toFixed(9)}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            AVAILABLE JBC IN POOL  :
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="/../tokens/jbc.png" height="20" alt="$JBC"/>
                                <div style={{marginLeft: "5px"}}>{Number(jbcPool).toFixed(3)}</div>
                            </div>
                        </div>
                        <div style={{height: "95px", width: "100%", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", letterSpacing: 1}} className="bold">
                            {address !== undefined && address === youraddr && isStakeNow && l2FollowerSlot !== null ?
                                <>
                                {Number(jbcPool) > 0 ?
                                    <>
                                    {isStakeL2Now ?
                                        <div style={{width: "200px", alignSelf: "center"}} className="button" onClick={() => unstakeL2(false)}>UNSTAKE L2</div> :
                                        <div style={{width: "200px", alignSelf: "center"}} className="button" onClick={() => stakeFollowerL2(0)}>STAKE L2</div>
                                    }
                                    </> :
                                    <div style={{width: "fit-content", alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">Reward has been depleted!</div>
                                }
                                </> :
                                <>
                                {isStakeL2Now ?
                                    <div style={{width: "200px", alignSelf: "center"}} className="button" onClick={() => unstakeL2(false)}>UNSTAKE L2</div> :
                                    <div style={{width: "200px", alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">STAKE L2</div>
                                }
                                </>
                            }
                            <div style={{width: "100%", margin: "20px 0 10px 0", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">**In order to earn $JBC by staking Follower NFT,<br></br>Layer 1 staking is requisite.**</div>
                            <div style={{width: "100%", textAlign: "left", letterSpacing: 0.5, fontSize: "10px"}} className="light">Unlike Layer 1, staking in Layer 2 is gas-independent, enabling to stake once and claim all rewards at a later time, even after a prolonged period of dormancy.</div>
                            
                        </div>
                    </div>
                    <div style={{margin: "0 20px", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Follower NFT</div>
                        {l2FollowerSlot !== null ?
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                <img src={l2FollowerSlot} height="100%" alt="Can not load metadata."></img>
                            </div> :
                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                        }
                    </div>
                    <div style={{margin: "0 20px", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                    <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Servant NFT</div>
                        <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                    </div>
                </div>
            </div>
            
            {nft.length > 0 ?
                <div style={{width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                        {nft.map((item, index) => (
                            <div style={{justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard" key={index}>
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
                                            {item.Col === 2 ?
                                                <>
                                                {isStakeL2Now ?
                                                    <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeL2(true)}>UNEQUIP & UNSTAKE L2</div> :
                                                    <></>
                                                }
                                                </>:
                                                <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft(Number(item.Id / 100000000000).toFixed(0))}>UNEQUIP</div>
                                            }
                                            </> :
                                            <>
                                                {isStakeNow ?
                                                <>
                                                {item.Col === 2 ?
                                                    <div style={{alignSelf: "center"}} className="pixel button" onClick={() => stakeFollowerL2(item.Id)}>STAKE L2</div> :
                                                    <></>
                                                }
                                                </> :
                                                <>
                                                {item.Col === 2 ?
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
                        <>
                        {address !== undefined ?
                            <div style={{justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-file-image-o"></i>
                                <div className="emp bold">This wallet doesn't have NFTs.</div>
                            </div> :
                            <div style={{justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                <div className="emp bold">Please connect wallet to view your NFTs.</div>
                            </div>
                        }
                        </>
                    }
                </div> :
                <div style={{width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                    <div className="nftCard" style={{justifyContent: "center"}}>
                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-spinner"></i>
                        <div className="emp bold">Loading NFTs...</div>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default Jaspercave