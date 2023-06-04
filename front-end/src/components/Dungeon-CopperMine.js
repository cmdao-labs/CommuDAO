import React from 'react'
import { ethers } from 'ethers'
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'

const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'

const Coppermine = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, hexa721ABI, erc20ABI, dunCopperABI }) => {
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
    const [hatSlot, setHatSlot] = React.useState(null)
    const [hatSlotLevel, setHatSlotLevel] = React.useState(null)
    const [clothSlot, setClothSlot] = React.useState(null)
    const [clothSlotLevel, setClothSlotLevel] = React.useState(null)

    const [allPower, setAllPower] = React.useState(0)
    const [isStakeNow, setIsStakeNow] = React.useState(null)
    const [timeToRunout, setTimeToRunout] = React.useState(null)
    const [isRunout, setIsRunout] = React.useState(false)
    const [cuPending, setCuPending] = React.useState('0.0')

    const [gasselected, setGasselected] = React.useState("BBQ")
    const [bbqBalance, setBbqBalance] = React.useState(0)
    const [cuBalance, setCuBalance] = React.useState(0)

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
                        account(id: "` + dunCopper + `") {
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
            const _res = res !== null && res.data.account !== null ? res.data.account.ERC721tokens : []
            let yournftstake = []
            for (let i = 0; i <= _res.length - 1 && address !== null && address !== undefined ; i++) {
                if ((_res[i].transfers[0].to.id).toUpperCase() === dunCopper.toUpperCase()) {
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

            if (nfts.length === 0) { nfts.push(null) }

            const nftEQ = address !== null && address !== undefined ? await readContract({
                address: dunCopper,
                abi: dunCopperABI,
                functionName: 'nftEquip',
                args: [address],
            }) : 0

            let nftEQ_1 = null
            let nftEQ_1_Name = null
            let nftEQ_2 = null
            let nftEQ_2_Name = null
            let nftEQ_3 = null
            let nftEQ_3_Name = null
            for (let i = 0; i <= nfts.length - 1; i++) {
                if (yournftstake.length > 0) {
                    if (nfts[i].Id === Number(nftEQ.characterId)) {
                        nftEQ_1 = nfts[i].Image
                        nftEQ_1_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(nftEQ.clothId)) {
                        nftEQ_2 = nfts[i].Image
                        nftEQ_2_Name = nfts[i].Name
                    } else if (nfts[i].Id === Number(nftEQ.hatId)) {
                        nftEQ_3 = nfts[i].Image
                        nftEQ_3_Name = nfts[i].Name
                    }
                }
            }

            const allPow = address !== null && address !== undefined ? Number(nftEQ.allPow) : 0
            const isStaked = address !== null && address !== undefined ? nftEQ.isStaked : null
            const refuelAt = isStaked === true ? Number(nftEQ.refuelAt) : 0
            const rewardPending = address !== null && address !== undefined && isStaked === true ? await readContract({
                address: dunCopper,
                abi: dunCopperABI,
                functionName: 'calculateRewards',
                args: [address],
            }) : 0

            const bbqBal = address !== null && address !== undefined ? await readContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0
            const cuBal = address !== null && address !== undefined ? await readContract({
                address: dunCopper,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            return [
                nfts, nftEQ_1, nftEQ_1_Name, nftEQ_3, nftEQ_3_Name, nftEQ_2, nftEQ_2_Name,
                allPow, isStaked, refuelAt, rewardPending,
                bbqBal, cuBal
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
            setHatSlot(result[3])
            result[4] !== null && Number(result[4].slice(-1)) > 0 ? setHatSlotLevel(result[4].slice(-1)) : setHatSlotLevel(null)
            setClothSlot(result[5])
            result[6] !== null && Number(result[6].slice(-1)) > 0 ? setClothSlotLevel(result[6].slice(-1)) : setClothSlotLevel(null)

            setAllPower(result[7])
            setIsStakeNow(result[8])
            const gasOut = new Date((result[9] * 1000) + (3600 * 1000))
            result[9] !== 0 ?
                setTimeToRunout(gasOut.toLocaleString('es-CL')) :
                setTimeToRunout(null)
            result[9] !== 0 && Date.now() - (result[9] * 1000) > (3600 * 1000) ? setIsRunout(true) : setIsRunout(false)
            setCuPending(ethers.utils.formatEther(String(result[10])))

            setBbqBalance(ethers.utils.formatEther(String(result[11])))
            setCuBalance(ethers.utils.formatEther(String(result[12])))
        })

    }, [address, txupdate, hexa721ABI, erc20ABI, dunCopperABI])

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
        try {
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: hexa721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== dunCopper.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: hexajibjib,
                    abi: hexa721ABI,
                    functionName: 'approve',
                    args: [dunCopper, _nftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: dunCopper,
                abi: dunCopperABI,
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
                address: dunCopper,
                abi: dunCopperABI,
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
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: dunCopper,
                abi: dunCopperABI,
                functionName: 'refuel',
                args: [1]
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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "95px", width: "fit-content"}}>Copper Mine</div>
                <div style={{fontSize: "22.5px", width: "fit-content", marginTop: "30px"}} className="pixel">Exploring mine to collect $Copper.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="/../items/copper.png" width="200" alt="$CU" />
            </div>
        </div>

        <div style={{margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
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
                            COPPER BALANCE:
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <img src="/../items/copper.png" height="20" alt="$COPPER"/>
                                <div style={{marginLeft: "5px"}}>{Number(cuBalance).toFixed(3).toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            COPPER PENDING:
                            <div style={{display: "flex", flexDirection: "row", color: "#5f6476"}}>
                                <img src="/../items/copper.png" height="20" alt="$COPPER"/>
                                <div style={{marginLeft: "5px"}}>{cuPending.toLocaleString()}</div>
                            </div>
                        </div>
                        <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            GAS USAGE PER HOUR:
                            <select style={{padding: "5px", fontSize: "16px"}} className="pixel" value={gasselected} onChange={(event) => {setGasselected(event.target.value)}}>
                                <option value="BBQ">$BBQ</option>
                            </select>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {gasselected === "BBQ" ?
                                    <>
                                        <img src="/../items/bbq.png" height="20" alt="$BBQ"/>
                                        <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toFixed(0)}</div>
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
                            <img src={hatSlot} width="100px" alt="Can not load metadata."></img> :
                            <img src="/../elements/hat.png" width="100px" alt="Hat_slot"></img>
                        }
                        {hatSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{hatSlotLevel}</div> :
                            <></>
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
                    <div style={{position: "relative", width: "150px", height: "400px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                        {clothSlot !== null ?
                            <img src={clothSlot} width="100px" alt="Can not load metadata."></img> :
                            <img src="/../elements/cloth.png" width="100px" alt="Cloth_slot"></img>
                        }
                        {clothSlotLevel !== null ?
                            <div style={{position: "absolute", top: "237.5px", right: "50px", padding: "2px", fontSize: "25px"}}>+{clothSlotLevel}</div> :
                            <></>
                        }
                    </div>
                </div>
            </div>
            
            {nft.length > 0 ?
                <div style={{marginTop: "40px", width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                            {nft.map((item, index) => (
                                <>
                                {String(item.Id).slice(0, 1) === "1" || String(item.Id).slice(0, 1) === "2" || String(item.Id).slice(0, 1) === "3" ?
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
                                                    <div style={{background: "gray"}} className="pixel button" onClick={() => unstakeNft(Number(item.Id / 100000000000).toFixed(0))}>UNEQUIP</div> :
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
                                </>
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
                <div style={{marginTop: "40px", width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
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

export default Coppermine