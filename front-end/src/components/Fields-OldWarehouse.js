import React from 'react'
import { ethers } from 'ethers'
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

const ory = '0xD492E20Ecf3Ae85Fe3E3159BB064442b86D6DC02'
const fieldMice = '0x09DE640ecd50e1c81bCB266279e3ffC2719873df'

const RatHuntingField = ({ setisLoading, txupdate, setTxupdate, aurora721ABI, tunaFieldABI }) => {
    const { address } = useAccount()

    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState("")

    const [nft, setNft] = React.useState([])
    const [allDaily, setAllDaily] = React.useState(0)
    const [allReward, setAllReward] = React.useState(0)
    const [miceBalance, setMiceBalance] = React.useState(0)

    const transferToHandle = (event) => { setTransferTo(event.target.value) }
    const transferNFT = (_nftid) => {
        setIsTransferModal(true)
        setTransferNftid(_nftid)
        for (let i = 0; i <= nft.length - 1; i++) {
            if (nft[i].Id === Number(_nftid)) {
                setTransferName(nft[i].Name)
            }
        }
    }
    const transferNFTConfirm = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: ory,
                abi: aurora721ABI,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    React.useEffect(() => {
        setNft([])
        
        const thefetch = async () => {
            let nfts = []

            const res = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + fieldMice + `") {
                            ERC721tokens(id: "` + fieldMice + `", first: 1000) {
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
            })).json() : null
            const _res = res !== null ? res.data.account.ERC721tokens : []
            let yournftstake = []
            for (let i = 0; i <= _res.length - 1 && address !== null && address !== undefined ; i++) {
                if ((_res[i].transfers[0].to.id).toUpperCase() === fieldMice.toUpperCase()) {
                    if ((_res[i].transfers[1].to.id).toUpperCase() === address.toUpperCase()) {
                        yournftstake.push({Id: Number((_res[i].id).slice(43))})
                    }
                }
            }

            let _allDaily = 0
            let _allReward = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftid = yournftstake[i].Id

                let bonus;
                if (nftid >= 400) {
                    bonus = 4;
                } else if (nftid >= 180 && nftid < 400) {
                    bonus = 10;
                } else if (nftid >= 60 && nftid < 180) {
                    bonus = 20;
                } else if (nftid >= 20 && nftid < 60) {
                    bonus = 50;
                } else if (nftid >= 2 && nftid < 20) {
                    bonus = 100;
                } else if (nftid === 1) {
                    bonus = 400;
                }
                _allDaily += Number(ethers.utils.formatEther(String(bonus * 10**14)))

                const reward = await readContract({
                    address: fieldMice,
                    abi: tunaFieldABI,
                    functionName: 'calculateRewards',
                    args: [nftid],
                })
                _allReward += Number(ethers.utils.formatEther(String(reward)))

                nfts.push({
                    Id: nftid,
                    Name: "CM Cat Meaw Ory JIBJIB #" + nftid,
                    Image: "https://bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu.ipfs.nftstorage.link/" + nftid + ".png",
                    Bonus: ethers.utils.formatEther(String(bonus * 10**14)),
                    Reward: ethers.utils.formatEther(String(reward)),
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
                            ERC721tokens(where: {contract: "` + ory + `"}, first: 1000) {
                                id
                                uri
                            }
                        }
                    }`
                })
            })).json() : null
            const _res2 = res2 !== null && res2.data.account !== null ? res2.data.account.ERC721tokens : []

            for (let i = 0; i <= _res2.length - 1 && address !== null && address !== undefined; i++) {
                const nftid = Number((_res2[i].id).slice(43))

                let bonus;
                if (nftid >= 400) {
                    bonus = 4;
                } else if (nftid >= 180 && nftid < 400) {
                    bonus = 10;
                } else if (nftid >= 60 && nftid < 180) {
                    bonus = 20;
                } else if (nftid >= 20 && nftid < 60) {
                    bonus = 50;
                } else if (nftid >= 2 && nftid < 20) {
                    bonus = 100;
                } else if (nftid === 1) {
                    bonus = 400;
                }

                nfts.push({
                    Id: nftid,
                    Name: "CM Cat Meaw Ory JIBJIB #" + nftid,
                    Image: "https://bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu.ipfs.nftstorage.link/" + nftid + ".png",
                    Bonus: ethers.utils.formatEther(String(bonus * 10**14)),
                    Reward: "0.000",
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            const miceBal = address !== null && address !== undefined ? await readContract({
                address: fieldMice,
                abi: tunaFieldABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            return [nfts, _allDaily, _allReward, miceBal]
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
            setAllDaily(result[1] * 86400)
            setAllReward(result[2])
            setMiceBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [address, txupdate, aurora721ABI, tunaFieldABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        const nftAllow = await readContract({
            address: ory,
            abi: aurora721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== fieldMice.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: ory,
                    abi: aurora721ABI,
                    functionName: 'approve',
                    args: [fieldMice, _nftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: fieldMice,
                abi: tunaFieldABI,
                functionName: 'stake',
                args: [_nftid],
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const unstakeNft = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: fieldMice,
                abi: tunaFieldABI,
                functionName: 'unstake',
                args: [_nftid, _unstake],
            })
            const tx = await writeContract(config)
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

        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('../background/field2bg.png')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "95px", color: "#fff", width: "fit-content", padding: "0 10px"}}>Old Warehouse</div>
                <div style={{fontSize: "22.5px", color: "#fff", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake Cat Meaw ORY to earn $MICE.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../items/mice.png" width="175" alt="$MICE" />
            </div>
        </div>

        <div style={{background: "#2C1715", margin: "0", paddingTop: "75px", minHeight: "inherit", alignItems: "flex-start", justifyContent: "flex-start"}} className="collection">
            <div style={{width: "100%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "30px 20px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>ORY ON STAKING</div>
                    <div style={{marginBottom: "20px", fontSize: "40px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                </div>
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                    <div style={{marginBottom: "20px", fontSize: "40px"}} className="emp">
                        {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                        <img style={{marginLeft: "10px"}} src="../items/mice.png" width="30" alt="$MICE"/>
                    </div>
                </div>
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                    <div style={{marginBottom: "20px", fontSize: "40px"}}>
                        {nft.length > 0 && nft[0] !== null ? allReward.toFixed(3) : 0}
                        <img style={{marginLeft: "10px"}} src="../items/mice.png" width="30" alt="$MICE"/>
                    </div>
                </div>
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>MICE BALANCE</div>
                    <div style={{marginBottom: "20px", fontSize: "40px"}}>
                        {nft.length > 0 && nft[0] !== null ? Number(miceBalance).toFixed(3) : 0}
                        <img style={{marginLeft: "10px"}} src="../items/mice.png" width="30" alt="$MICE"/>
                    </div>
                </div>
            </div>
            <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                {nft.length > 0 ?
                    <>
                    {nft[0] !== null ?
                        <>
                        {nft.map((item, index) => (
                            <div style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around"}} className="nftCard" key={index}>
                                <img src={item.Image} width="150" alt="Can not load metadata." />
                                <div className="pixel bold">{item.Name}</div>
                                <div style={{width: 300, display: "flex", flexDirection: "row", justifyContent: "center"}} className="pixel">
                                    {item.isStaked ?
                                        <>
                                            <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                            <div style={{color: "black"}}>On Staking</div>
                                        </> :
                                        <>
                                            <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                            <div style={{color: "black"}}>Available for stake</div>
                                        </>
                                    }
                                </div>
                                <div className="emp pixel">
                                    Earn: {item.Bonus * 86400}
                                    &nbsp;
                                    <img src="../items/mice.png" width="12" alt="micepic"/>
                                    &nbsp;MICE/DAY
                                </div>
                                <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                    <div style={{lineHeight: 2, fontSize: "12px", textAlign: "left",}} className="bold">
                                        Pending Rewards<br></br>
                                        <img src="../items/mice.png" width="12" alt="$MICE"/>
                                        &nbsp;{item.Reward}
                                    </div>
                                    {item.Reward > 0 ?
                                        <div style={{lineHeight: 1.5}} className="pixel button" onClick={() => {unstakeNft(item.Id, false)}}>HARVEST</div> :
                                        <div style={{lineHeight: 1.5, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">HARVEST</div>
                                    }
                                </div>
                                {item.isStaked ?
                                    <div style={{background: "gray"}} className="pixel button" onClick={() => {unstakeNft(item.Id, true)}}>UNSTAKE</div> :
                                    <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                        <div className="pixel button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
                                        <div style={{alignSelf: "center", background: "gray"}} className="pixel button" onClick={() => transferNFT(item.Id)}>TRANSFER</div>
                                    </div>
                                }
                            </div>
                        ))}
                        </> :
                        <>
                        {address !== undefined ?
                            <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-file-image-o"></i>
                                <div className="emp bold">This wallet doesn't have NFTs.</div>
                            </div> :
                            <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                <div className="emp bold">Please connect wallet to view your NFTs.</div>
                            </div>
                        }
                        </>
                    }
                    </> :
                    <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-spinner"></i>
                        <div className="emp bold">Loading NFTs...</div>
                    </div>
                }
            </div>
        </div>
    </>
    )
}

export default RatHuntingField