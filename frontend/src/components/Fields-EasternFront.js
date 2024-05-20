import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const acNft = '0x526A70be985EB234c3f2c4933aCB59F6EB595Ed7'
const vabag = '0x495d66c9Fd7c63807114d06802A48BdAA60a0426'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')
const providerIPFS = "https://cloudflare-ipfs.com/ipfs/"

const EasternFront = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc20ABI, erc721ABI, fieldEfABI }) => {
    let { address } = useAccount()
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/fields/eastern-front/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/fields/eastern-front/' + address)
    }

    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState("")

    const [nft, setNft] = React.useState([])
    const [allDaily, setAllDaily] = React.useState("0.000")
    const [allReward, setAllReward] = React.useState("0.000")
    const [vabagBalance, setVaBagBalance] = React.useState("0.000")

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
                address: acNft,
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

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const acNftSC = new ethers.Contract(acNft, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            const stakeFilter = await acNftSC.filters.Transfer(address, vabag, null)
            const stakeEvent = await acNftSC.queryFilter(stakeFilter, 2260250, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data0 = address !== null && address !== undefined ? await readContracts({
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: vabag,
                        abi: fieldEfABI,
                        functionName: 'nftStake',
                        args: [String(item)],
                    }
                ))
            }) : [Array(stakeRemoveDup.length).fill({tokenOwnerOf: ''})]

            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data0[i].status === 'success' && data0[i].result[0].toUpperCase() === address.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }

            const data1 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: acNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill('')]

            const data11 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: vabag,
                        abi: fieldEfABI,
                        functionName: 'calculateRewards',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill(0)]

            let _allDaily = 0
            let _allReward = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = data1[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", providerIPFS))
                    nft = await response.json()
                } catch {}

                let _reward = 0
                if (yournftstake[i].Id.slice(0, 3) === '101') {
                    _reward = 100
                } else if (yournftstake[i].Id.slice(0, 3) === '102') {
                    _reward = 1000
                } else if (yournftstake[i].Id.slice(0, 3) === '103') {
                    _reward = 2000
                } else if (yournftstake[i].Id.slice(0, 3) === '104') {
                    _reward = 3000
                } else if (yournftstake[i].Id.slice(0, 3) === '105') {
                    _reward = 4000
                } else if (yournftstake[i].Id.slice(0, 3) === '201') {
                    _reward = 5000
                } else if (yournftstake[i].Id.slice(0, 3) === '202') {
                    _reward = 6000
                } else if (yournftstake[i].Id.slice(0, 3) === '203') {
                    _reward = 7000
                } else if (yournftstake[i].Id.slice(0, 3) === '204') {
                    _reward = 8000
                } else if (yournftstake[i].Id.slice(0, 3) === '205') {
                    _reward = 9000
                } else if (yournftstake[i].Id.slice(0, 3) === '301') {
                    _reward = 10000
                } else if (yournftstake[i].Id.slice(0, 3) === '302') {
                    _reward = 11000
                } else if (yournftstake[i].Id.slice(0, 3) === '303') {
                    _reward = 12000
                } else if (yournftstake[i].Id.slice(0, 3) === '304') {
                    _reward = 13000
                } else if (yournftstake[i].Id.slice(0, 3) === '305') {
                    _reward = 14000
                } else if (yournftstake[i].Id.slice(0, 3) === '401') {
                    _reward = 15000
                }

                _allDaily += Number(ethers.utils.formatEther(String(_reward * 3171296000 * 86400)))
                _allReward += Number(ethers.utils.formatEther(String(data11[i].result)))

                nfts.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name + " [" + yournftstake[i].Id + "]",
                    Image: nft.image.replace("ipfs://", providerIPFS),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(_reward * 3171296000 * 86400))),
                    isStaked: true,
                    Reward: String(data11[i].result),
                })
            }

            const walletFilter = await acNftSC.filters.Transfer(null, address, null)
            const walletEvent = await acNftSC.queryFilter(walletFilter, 2260250, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: acNft,
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
                        address: acNft,
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

                let _reward = 0
                if (yournftwallet[i].Id.slice(0, 3) === '101') {
                    _reward = 100
                } else if (yournftwallet[i].Id.slice(0, 3) === '102') {
                    _reward = 1000
                } else if (yournftwallet[i].Id.slice(0, 3) === '103') {
                    _reward = 2000
                } else if (yournftwallet[i].Id.slice(0, 3) === '104') {
                    _reward = 3000
                } else if (yournftwallet[i].Id.slice(0, 3) === '105') {
                    _reward = 4000
                } else if (yournftwallet[i].Id.slice(0, 3) === '201') {
                    _reward = 5000
                } else if (yournftwallet[i].Id.slice(0, 3) === '202') {
                    _reward = 6000
                } else if (yournftwallet[i].Id.slice(0, 3) === '203') {
                    _reward = 7000
                } else if (yournftwallet[i].Id.slice(0, 3) === '204') {
                    _reward = 8000
                } else if (yournftwallet[i].Id.slice(0, 3) === '205') {
                    _reward = 9000
                } else if (yournftwallet[i].Id.slice(0, 3) === '301') {
                    _reward = 10000
                } else if (yournftwallet[i].Id.slice(0, 3) === '302') {
                    _reward = 11000
                } else if (yournftwallet[i].Id.slice(0, 3) === '303') {
                    _reward = 12000
                } else if (yournftwallet[i].Id.slice(0, 3) === '304') {
                    _reward = 13000
                } else if (yournftwallet[i].Id.slice(0, 3) === '305') {
                    _reward = 14000
                } else if (yournftwallet[i].Id.slice(0, 3) === '401') {
                    _reward = 15000
                }

                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + " [" + yournftwallet[i].Id + "]",
                    Image: nft.image.replace("ipfs://", providerIPFS),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(_reward * 3171296000 * 86400))),
                    isStaked: false,
                    Reward: 0,
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            const vaBal = address !== null && address !== undefined ? await readContract({
                address: vabag,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            return [nfts, _allDaily, _allReward, vaBal]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            result[0].length > 0 && address !== undefined ? setNft(result[0]) : setNft([null])
            setAllDaily(result[1])
            setAllReward(result[2])
            setVaBagBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [address, txupdate, erc20ABI, erc721ABI, fieldEfABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: acNft,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== vabag.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: acNft,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [vabag, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }        
            const config2 = await prepareWriteContract({
                address: vabag,
                abi: fieldEfABI,
                functionName: 'stake',
                args: [_nftid],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    
    const unstakeNft = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            const config2 = await prepareWriteContract({
                address: vabag,
                abi: fieldEfABI,
                functionName: 'unstake',
                args: [_nftid, _unstake],
            })
            const { hash: hash12 } = await writeContract(config2)
            await waitForTransaction({ hash: hash12 })
            setTxupdate(hash12)
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
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left",  backgroundImage: "url('" + providerIPFS + "bafybeig67s2zxistu3b3eco5dshwweicqe6olnwng7o2n6qqzoaawtsag4')", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content", padding: "0 10px"}}>Eastern Front</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake Adventurer Card to earn $Valuables-Bag.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src={providerIPFS + "bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re"} height="150" alt="$VABAG"/>
                </div>
            </div>

            <div style={{margin: "0", paddingTop: "40px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px", flexFlow: "row wrap"}} className="collection pixel">
                <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>AP-AC ON WALLET</div>
                        <div style={{fontSize: "24px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}} className="emp">
                            {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                            <img style={{marginLeft: "10px"}} src={providerIPFS + "bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re"} width="24" alt="$VABAG"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {nft.length > 0 && nft[0] !== null ? allReward.toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src={providerIPFS + "bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re"} width="24" alt="$VABAG"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>VABAG BALANCE</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {nft.length > 0 && nft[0] !== null ? Number(vabagBalance).toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src={providerIPFS + "bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re"} width="24" alt="$VABAG"/>
                        </div>
                    </div>
                </div>
                <div style={{margin: "40px 0 80px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                    {nft.length > 0 ?
                        <>
                        {nft[0] !== null ?
                            <>
                            {nft.map((item, index) => (
                                <div className="nftCard" style={{margin: "20px 10px", padding: "30px 20px"}} key={index}>
                                    <video autoPlay muted loop width="150">
                                        <source src={item.Image} type="video/mp4" />
                                    </video>
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
                                        Earn: {Number(item.RewardPerSec).toFixed(4)}
                                        &nbsp;
                                        <img src={providerIPFS + "bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re"} width="12" alt="$VABAG"/>
                                        &nbsp;VABAG/DAY
                                    </div>
                                    <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                        <div style={{lineHeight: 1.5, fontSize: "12px", textAlign: "left"}}>
                                            Pending Rewards<br></br>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <img src={providerIPFS + "bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re"} width="12" alt="$VABAG"/>
                                                &nbsp;{ethers.utils.formatEther(String(item.Reward))}
                                            </div>
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
                            <div className="nftCard" style={{justifyContent: "center"}}>
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
                        </> :
                        <div className="nftCard" style={{justifyContent: "center"}}>
                            <ThreeDots fill="#5f6476" />
                            <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default EasternFront