import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'

const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'

const mintStOPT_Router = '0x35c4fa3ac13386f67eE6584C2311aBEB19a22636'
const salonRouter = '0x76B6B24BA53042A0e02Cc0e84c875d74EAeFb74a'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')
const providerIPFS = "https://cloudflare-ipfs.com/ipfs/"

const Coppermine = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc721ABI, erc20ABI, dunCopperABI, mintStOPTABI, salonABI }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/dungeon/copper-mine/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/dungeon/copper-mine/' + address)
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

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [cuPending, setCuPending] = React.useState('0.0')
    const [lastedSTOPT, setLastedSTOPT] = React.useState(null)

    const [skinSlot1, setSkinSlot1] = React.useState(null)

    const [gasselected, setGasselected] = React.useState("BBQ")
    const [bbqBalance, setBbqBalance] = React.useState(0)
    const [cuBalance, setCuBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(hexajibjib, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            const nftEQ = address !== null && address !== undefined ? await readContract({
                address: dunCopper,
                abi: dunCopperABI,
                functionName: 'nftEquip',
                args: [address],
            }) : [{characterId: 0, hatId: 0, clothId: 0, allPow: 0, refuelAt: 0, isStaked: null}]

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
                        args: [Number(nftEQ[2])],
                    },
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [Number(nftEQ[1])],
                    },
                    {
                        address: dunCopper,
                        abi: dunCopperABI,
                        functionName: 'calculateRewards',
                        args: [address],
                    },
                    {
                        address: mintStOPT_Router,
                        abi: mintStOPTABI,
                        functionName: 'userTimeStamp',
                        args: [address],
                    },
                    {
                        address: bbqToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunCopper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: salonRouter,
                        abi: salonABI,
                        functionName: 'skin',
                        args: [address, 1],
                    }, 
                ],
            }) : ["", "", "", 0, 0, 0, 0, 0, ]

            let nfts = []

            let response1 = null
            try {
                response1 = data[0].status === 'success' ? await fetch(data[0].result.replace("ipfs://", providerIPFS)) : null
            } catch {}
            const nft1 = response1 !== null ? await response1.json() : {image: null, name: null}
            const nftEQ_1 = nft1.image !== null ? nft1.image.replace("ipfs://", providerIPFS) : null
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
                response2 = data[1].status === 'success' ? await fetch(data[1].result.replace("ipfs://", providerIPFS)) : null
            } catch {}
            const nft2 = response2 !== null ? await response2.json() : {image: null, name: null}
            const nftEQ_2 = nft2.image !== null ? nft2.image.replace("ipfs://", providerIPFS) : null
            const nftEQ_2_Name = nft2.name
            if (response2 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[2]),
                    Name: nftEQ_2_Name,
                    Image: nftEQ_2,
                    Description: nft2.description,
                    Attribute: nft2.attributes,
                    RewardPerSec: Number(nftEQ[2]) % 100000,
                    isStaked: true
                })
            }
            
            let response3 = null
            try {
                response3 = data[2].status === 'success' ? await fetch(data[2].result.replace("ipfs://", providerIPFS)) : null
            } catch {}
            const nft3 = response3 !== null ? await response3.json() : {image: null, name: null}
            const nftEQ_3 = nft3.image !== null ? nft3.image.replace("ipfs://", providerIPFS) : null
            const nftEQ_3_Name = nft3.name
            if (response3 !== null) {
                nfts.push({
                    Col: 1,
                    Id: Number(nftEQ[1]),
                    Name: nftEQ_3_Name,
                    Image: nftEQ_3,
                    Description: nft3.description,
                    Attribute: nft3.attributes,
                    RewardPerSec: Number(nftEQ[1]) % 100000,
                    isStaked: true
                })
            }

            const allPow = Number(nftEQ[3])
            const isStaked = nftEQ[5]
            const refuelAt = Number(nftEQ[4])

            const rewardPending = isStaked ? data[3].result : 0
            const stOPTClaim = isStaked === true ? data[4].result : 0
            const bbqBal = data[5].result
            const cuBal = data[6].result
            const skin1 = data[7].result

            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj, index) => String(obj.args.tokenId)))
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
                    const response = await fetch(nftipfs.replace("ipfs://", providerIPFS))
                    nft = await response.json()
                } catch {}

                nfts.push({
                    Col: 1,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", providerIPFS),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            return [
                nfts, nftEQ_1, nftEQ_1_Name, nftEQ_3, nftEQ_3_Name, nftEQ_2, nftEQ_2_Name,
                allPow, isStaked, refuelAt, rewardPending, stOPTClaim,
                bbqBal, cuBal, skin1, 
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
            setHatSlot(result[3])
            result[4] !== null && result[4].slice(-2, -1) === "+" ? setHatSlotLevel(result[4].slice(-1)) : setHatSlotLevel(null)
            setClothSlot(result[5])
            result[6] !== null && result[6].slice(-2, -1) === "+" ? setClothSlotLevel(result[6].slice(-1)) : setClothSlotLevel(null)

            setAllPower(result[7])
            setIsStakeNow(result[8])
            const gasOut = new Date((Number(result[9]) * 1000) + (3600 * 1000))
            result[9] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[9] !== 0 && Date.now() - (Number(result[9]) * 1000) > (3600 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setCuPending(ethers.utils.formatEther(String(result[10])))
            setLastedSTOPT(Number(result[9]) * 1000 === Number(result[11]) * 1000)

            setBbqBalance(ethers.utils.formatEther(String(result[12])))
            setCuBalance(ethers.utils.formatEther(String(result[13])))
            setSkinSlot1(result[14])
        })

    }, [address, txupdate, erc721ABI, erc20ABI, dunCopperABI, mintStOPTABI, salonABI])

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
        try {
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== dunCopper.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [dunCopper, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: dunCopper,
                abi: dunCopperABI,
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
                address: dunCopper,
                abi: dunCopperABI,
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
        try {
            const gasAllow = await readContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, dunCopper],
            })
            if (gasAllow < (500 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [dunCopper, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: dunCopper,
                abi: dunCopperABI,
                functionName: 'refuel',
                args: [1]
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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('" + providerIPFS + "bafybeiebkzeoydzwinuqixopu4atccmlttr7abpuyfrpjrdvqyzc55lpxi')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>Copper Mine</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel">Exploring mine to collect $Copper.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src={providerIPFS + "bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"} width="150" alt="$CU" />
            </div>
        </div>

        <div style={{margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{background: "#ffeceb", border: "none", justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                    <div style={{background: "#EBDDB8", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "1px solid", boxShadow: "inset -2px -2px 0px 0.25px #00000040"}}>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                        <div style={{fontSize: "22px", lineHeight: "15px"}}>LAYER 1 STAKING</div>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="emp">
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
                            <><div>ADDRESS</div><div>{address.slice(0, 4) + "..." + address.slice(-4)}</div></> :
                            <><div>ADDRESS</div><div>-</div></>
                        }
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            TOTAL CMPOW PER SEC 
                            <div>{Number(allPower).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            COPPER BALANCE
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src={providerIPFS + "bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"} height="20" alt="$COPPER"/>
                                <div style={{marginLeft: "5px"}}>{Number(cuBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            COPPER PENDING
                            <div style={{display: "flex", flexDirection: "row", color: isStakeNow ? "#ff007a" : "#5f6476"}}>
                                <img src={providerIPFS + "bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"} height="20" alt="$COPPER"/>
                                <div style={{marginLeft: "5px"}}>{Number(cuPending).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                            GAS USAGE
                            <select style={{padding: "2.5px 5px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                <option value="BBQ">$BBQ</option>
                            </select>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {gasselected === "BBQ" ?
                                    <>
                                        <img src={providerIPFS + "bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq"} height="20" alt="$BBQ"/>
                                        <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toLocaleString('en-US', {maximumFractionDigits:1})}</div>
                                    </> :
                                    <></>
                                }
                                <div style={{marginLeft: "5px"}}>/500</div>
                            </div>
                        </div>
                        {isStakeNow ?
                            <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT AT <div>{timeToRunout}</div></div>
                            : <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>GAS RUN OUT IN <div>1 hour</div></div>
                        }
                        {address !== undefined && address === youraddr ?
                            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {isStakeNow ?
                                    <>
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">REFUEL GAS</div>
                                        <div style={{alignSelf: "center", background: isRunout ? "#67BAA7" : "#ff007a"}} className="button" onClick={() => unstakeNft(0)}>HARVEST & UNSTAKE</div>
                                    </> :
                                    <>
                                        {isStakeNow !== null && (gasselected === "BBQ" && Number(bbqBalance) >= 500) ?
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
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                        {hatSlot !== null ?
                            <img src={hatSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/hat.png" width="100px" alt="Hat_slot" />
                        }
                        {hatSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevel}</div> :
                            <></>
                        }
                    </div>
                    <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                        <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Character NFT</div>
                        {nft.length > 0 ?
                            <>
                                {characterSlot !== null ?
                                    <>
                                        {Number(skinSlot1) === 0 || (characterSlot !== providerIPFS + "bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && characterSlot !== providerIPFS + "bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia") ?
                                            <img src={characterSlot} width="300px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                        {characterSlot === providerIPFS + "bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" && Number(String(skinSlot1).slice(0, 1)) === 1 ?
                                            <img src={providerIPFS + "bafkreibynd6gqsb7idmhy7xk5qx5cdzmayvns7gfj7dsvpfymg2kjjajtm"} width="300px" alt="Can not load metadata." /> :
                                            <></>
                                        }
                                        {characterSlot === providerIPFS + "bafkreidr4uq5voosuz6v4hqhiempf4a36x5aq6i4uceym2xbje65o5mwia" && Number(String(skinSlot1).slice(0, 1)) === 1 ?
                                            <img src={providerIPFS + "bafkreif5fecf5rqrlixcxtpzplo7frtftt3yh2cmx6oca4l2jxuryjju2m"} width="300px" alt="Can not load metadata." /> :
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
                            <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px", fontSize: "25px"}}>Lv.{characterSlotLevel}</div> :
                            <></>
                        }
                        {isOp && isStakeNow && !lastedSTOPT ?
                            <div style={{position: "absolute", top: "300px", left: 0, border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", borderRadius: 0, background: "rgb(103, 186, 167)", display: "flex", alignItems: "center"}} className="button" onClick={mintStOPT}>Obtain stOPT <img src={providerIPFS + "bafkreibtp4almzmdovhvygxeyykw5fa6pqe76cbdum4quispehlddqgp2e"} height="18" alt="$stOPT"/></div> :
                            <></>
                        }
                    </div>
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                        {clothSlot !== null ?
                            <img src={clothSlot} width="100px" alt="Can not load metadata." /> :
                            <img src="/../elements/cloth.png" width="100px" alt="Cloth_slot" />
                        }
                        {clothSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevel}</div> :
                            <></>
                        }
                    </div>
                </div>
            </div>
            
            {nft.length > 0 ?
                <div style={{marginTop: "40px", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                            {nft.map((item, index) => (
                                <div key={index}>
                                    {String(item.Id).slice(0, 1) === "1" || String(item.Id).slice(0, 1) === "2" || String(item.Id).slice(0, 1) === "3" ?
                                        <div style={{background: "#ffeceb", border: "none", justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard">
                                            <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                                <img src={item.Image} height="100%" alt="Can not load metadata." />
                                            </div>
                                            <div className="emp bold">{item.Name}</div>
                                            <div className="bold">{item.RewardPerSec} cmpow per sec</div>
                                            <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                            {address === youraddr ?
                                                <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                                    {item.isStaked ?
                                                        <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft((item.Id / 100000000000) | 0)}>UNEQUIP</div> :
                                                        <>
                                                            {isStakeNow ?
                                                                <></> :
                                                                <div style={{alignSelf: "center"}} className="pixel button" onClick={() => equipNft(item.Id)}>EQUIP</div>
                                                            }
                                                            <div style={{alignSelf: "center", background: "gray"}} className="pixel button" onClick={() => transferNFT(item.Col, item.Id)}>TRANSFER</div>
                                                        </>
                                                    }
                                                </div> :
                                                <div style={{height: "41px"}}></div>
                                            }
                                        </div> :
                                        <></>
                                    }
                                </div>
                            ))}
                        </> :
                        <div style={{background: "#ffeceb", border: "none", justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
                            {address !== undefined ?
                                <>
                                    <img src={providerIPFS + "QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA"} width="150" alt="No_NFTs" />
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
                    <div className="nftCard" style={{background: "#ffeceb", border: "none", justifyContent: "center"}}>
                        <ThreeDots fill="#5f6476" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
        </div>
    </>
    )
}

export default Coppermine