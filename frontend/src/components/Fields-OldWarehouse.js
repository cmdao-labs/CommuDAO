import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const ory = '0xD492E20Ecf3Ae85Fe3E3159BB064442b86D6DC02'
const fieldMice = '0x09DE640ecd50e1c81bCB266279e3ffC2719873df'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

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
        const orynftSC = new ethers.Contract(ory, aurora721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            const stakeFilter = await orynftSC.filters.Transfer(address, fieldMice, null)
            const stakeEvent = await orynftSC.queryFilter(stakeFilter, 515000, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj, index) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: fieldMice,
                        abi: tunaFieldABI,
                        functionName: 'nftStake',
                        args: [String(item)],
                    }
                ))
            }) : [Array(stakeRemoveDup.length).fill({tokenOwnerOf: ''})]

            let nfts = []
            let yournftstake = []

            for (let i = 0; i <= stakeRemoveDup.length - 1 && address !== null && address !== undefined ; i++) {
                if (data[i].tokenOwnerOf.toUpperCase() === address.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }
            console.log(yournftstake)

            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: fieldMice,
                        abi: tunaFieldABI,
                        functionName: 'calculateRewards',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill(0)]

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
                _allReward += Number(ethers.utils.formatEther(String(data2[i])))

                nfts.push({
                    Id: nftid,
                    Name: "CM Cat Meaw Ory JIBJIB #" + nftid,
                    Image: "https://bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu.ipfs.nftstorage.link/" + nftid + ".png",
                    Bonus: ethers.utils.formatEther(String(bonus * 10**14)),
                    Reward: ethers.utils.formatEther(String(data2[i])),
                    isStaked: true
                })
            }

            const walletFilter = await orynftSC.filters.Transfer(null, address, null)
            const walletEvent = await orynftSC.queryFilter(walletFilter, 515000, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj, index) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: ory,
                        abi: aurora721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            let yournftwallet = []

            for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data3[i].toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            console.log(yournftwallet)

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftid = Number(yournftwallet[i].Id)

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

        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://nftstorage.link/ipfs/bafybeiertqhm4rnoxp63hrz6g6rzama54pryx3dypv5fkizgfnukxv5dsu')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "65px", color: "#fff", width: "fit-content", padding: "0 10px"}}>Old Warehouse</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake Cat Meaw ORY to earn $MICE.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="150" alt="$MICE" />
            </div>
        </div>

        <div style={{margin: "0", paddingTop: "30px", minHeight: "inherit", alignItems: "flex-start", justifyContent: "flex-start"}} className="collection">
            <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>ORY ON WALLET</div>
                    <div style={{fontSize: "24px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                </div>
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                    <div style={{fontSize: "24px"}} className="emp">
                        {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                        <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="24" alt="$MICE"/>
                    </div>
                </div>
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                    <div style={{fontSize: "24px"}}>
                        {nft.length > 0 && nft[0] !== null ? allReward.toFixed(3) : 0}
                        <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="24" alt="$MICE"/>
                    </div>
                </div>
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>MICE BALANCE</div>
                    <div style={{fontSize: "24px"}}>
                        {nft.length > 0 && nft[0] !== null ? Number(miceBalance).toFixed(3) : 0}
                        <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="24" alt="$MICE"/>
                    </div>
                </div>
            </div>
            <div style={{margin: "20px 0 80px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                {nft.length > 0 ?
                    <>
                    {nft[0] !== null ?
                        <>
                        {nft.map((item, index) => (
                            <div style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "14px"}} className="nftCard pixel" key={index}>
                                <img src={item.Image} width="150" alt="Can not load metadata." />
                                <div>{item.Name}</div>
                                <div style={{width: 300, display: "flex", flexDirection: "row", justifyContent: "center"}}>
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
                                <div>
                                    Earn: {item.Bonus * 86400}
                                    &nbsp;
                                    <img src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="12" alt="micepic"/>
                                    &nbsp;MICE/DAY
                                </div>
                                <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                    <div style={{lineHeight: 2, textAlign: "left"}}>
                                        Pending Rewards<br></br>
                                        <img src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="12" alt="$MICE"/>
                                        &nbsp;{item.Reward}
                                    </div>
                                    {item.Reward > 0 ?
                                        <div style={{lineHeight: 2}} className="button" onClick={() => {unstakeNft(item.Id, false)}}>HARVEST</div> :
                                        <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                    }
                                </div>
                                {item.isStaked ?
                                    <div style={{background: "gray"}} className="button" onClick={() => {unstakeNft(item.Id, true)}}>UNSTAKE</div> :
                                    <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                        <div className="button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
                                        <div style={{alignSelf: "center", background: "gray"}} className="button" onClick={() => transferNFT(item.Id)}>TRANSFER</div>
                                    </div>
                                }
                            </div>
                        ))}
                        </> :
                        <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
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
                    </> :
                    <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
                        <ThreeDots fill="#5f6476" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                }
            </div>
        </div>
    </>
    )
}

export default RatHuntingField