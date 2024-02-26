import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const taodumNFT = '0x2036186F6d5287FcB05C56C38374AC5236d8A61d'
const taomeme = '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd'
const gear = '0xB85765E3E9f2714d4C2d78CEEC1F6DEfd11D87DF'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const MechHarvestZone = ({ setisLoading, txupdate, setTxupdate, erc20ABI, erc721ABI, tunaFieldABI }) => {
    const { address } = useAccount()

    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState("")

    const [nft, setNft] = React.useState([])
    const [allDaily, setAllDaily] = React.useState("0.000")
    const [allReward, setAllReward] = React.useState("0.000")
    const [gearBalance, setGearBalance] = React.useState("0.000")

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
                address: taodumNFT,
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

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const taodumNFTSC = new ethers.Contract(taodumNFT, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            const stakeFilter = await taodumNFTSC.filters.Transfer(address, gear, null)
            const stakeEvent = await taodumNFTSC.queryFilter(stakeFilter, 2260250, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data0 = address !== null && address !== undefined ? await readContracts({
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: gear,
                        abi: tunaFieldABI,
                        functionName: 'nftStake',
                        args: [String(item)],
                    }
                ))
            }) : [Array(stakeRemoveDup.length).fill({tokenOwnerOf: '', isJbcOut: false})]

            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data0[i].tokenOwnerOf.toUpperCase() === address.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }
            console.log(yournftstake)

            const data1 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: taodumNFT,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill('')]

            const data11 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: gear,
                        abi: tunaFieldABI,
                        functionName: 'calculateRewards',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill(0)]

            let _allDaily = 0
            let _allReward = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = data1[i]
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                    nft = await response.json()
                } catch {}

                let _reward = 0
                if (yournftstake[i].Id.slice(0, 3) === '101') {
                    _reward = 100
                } else if (yournftstake[i].Id.slice(0, 3) === '102') {
                    _reward = 1000
                }

                _allDaily += Number(ethers.utils.formatEther(String(_reward * 3171296000 * 86400)))
                _allReward += Number(ethers.utils.formatEther(String(data11[i])))

                nfts.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name + " [" + yournftstake[i].Id + "]",
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(_reward * 3171296000 * 86400))),
                    isStaked: true,
                    Reward: String(data11[i]),
                })
            }

            const walletFilter = await taodumNFTSC.filters.Transfer(null, address, null)
            const walletEvent = await taodumNFTSC.queryFilter(walletFilter, 2725554, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: taodumNFT,
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
                        address: taodumNFT,
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

                let _reward = 0
                if (yournftwallet[i].Id.slice(0, 3) === '101') {
                    _reward = 100
                } else if (yournftwallet[i].Id.slice(0, 3) === '102') {
                    _reward = 1000
                }

                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + " [" + yournftwallet[i].Id + "]",
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(_reward * 3171296000 * 86400))),
                    isStaked: false,
                    Reward: 0,
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            console.log(nfts)

            const dataToken = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: gear,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    }
                ],
            }) : [0]

            const vaBal = dataToken[0]

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
            setGearBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [address, txupdate, erc20ABI, erc721ABI, tunaFieldABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: taodumNFT,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== gear.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: taodumNFT,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [gear, _nftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }        
            const config2 = await prepareWriteContract({
                address: gear,
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
            const config2 = await prepareWriteContract({
                address: gear,
                abi: tunaFieldABI,
                functionName: 'unstake',
                args: [_nftid, _unstake],
            })
            const tx2 = await writeContract(config2)
            await tx2.wait()
            setTxupdate(tx2)
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
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left",  backgroundImage: "url('https://nftstorage.link/ipfs/bafybeidlzwhqtdrt4dnymhtf3v5vbhfwaczn6i3676iqr2aymrwbqbtw4m')", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content", padding: "0 10px"}}>Mech Harvest Zone</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake TAODUM / TAOMEME to earn $Gear.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="150" alt="$GEAR"/>
                </div>
            </div>

            <div style={{margin: "0", paddingTop: "40px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px", flexFlow: "row wrap"}} className="collection pixel">
                <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TAODUM ON WALLET</div>
                        <div style={{fontSize: "24px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}} className="emp">
                            {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                            <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="26" alt="$GEAR"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {nft.length > 0 && nft[0] !== null ? allReward.toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="26" alt="$GEAR"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>GEAR BALANCE</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {nft.length > 0 && nft[0] !== null ? Number(gearBalance).toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="26" alt="$GEAR"/>
                        </div>
                    </div>
                </div>

                <div style={{width: "95%", borderBottom: "1px solid #dddade", margin: "40px 10px 10px 10px"}}></div>
                <div style={{width: "95%", margin: "20px 10px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">TAOMEME STAKING</div>
                <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                    <div className="nftCard" style={{position: "relative", margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "14px"}}>
                        <div style={{position: "absolute", top: 15, right: 15, padding: "7px 20px", letterSpacing: 1, background: "transparent", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="bold">Multiplier x0</div>
                        <div style={{marginTop: "50px", width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <div>Total JTAO Staking:</div>
                            <div className="bold"></div>
                        </div>
                        <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                            <div style={{lineHeight: 1.5, fontSize: "12px", textAlign: "left"}}>
                                Pending Rewards<br></br>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="12" alt="$GEAR"/>
                                    &nbsp;{}
                                </div>
                            </div>
                            {false ?
                                <div style={{lineHeight: 2}} className="button">HARVEST</div> :
                                <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                            }
                        </div>
                        <div style={{width: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", padding: "15px"}}>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                <div>$JTAO STAKED</div>
                                <div className="bold">{}</div>
                            </div>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                <input
                                    placeholder="0.0"
                                    style={{width: "130px", padding: "5px 20px", border: "1px solid #dddade"}}
                                    value={1}
                                />
                                <div
                                    style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                    className="bold"
                                >
                                    Max
                                </div>
                                <div style={{letterSpacing: "1px", width: "70px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold">Unstake</div>
                            </div>
                        </div>
                        <div style={{width: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #dddade", padding: "15px"}}>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px", textAlign: "left", fontSize: "14px"}}>
                                <div>$JTAO BALANCE</div>
                                <div className="bold">{}</div>
                            </div>
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                                <input
                                    placeholder="0.0"
                                    style={{width: "130px", padding: "5px 20px", border: "1px solid #dddade"}}
                                    value={1}
                                />
                                <div
                                    style={{padding: "10px 10px", border: "1px solid #dddade", cursor: "pointer"}}
                                    className="bold"
                                >
                                    Max
                                </div>
                                <div style={{letterSpacing: "1px", width: "50px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold">Stake</div>
                            </div>
                        </div>
                    </div>
                    <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "18px"}}>
                        <div>TAOMEME PFP N1</div>
                        <img src='https://nftstorage.link/ipfs/bafybeibvvcappbfq4pw7hvtdwsaageoelga5vwpco3qffcrwzzsk2wxoau' width="250" alt="Can not load metadata." />
                        <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <div className="button" style={{fontSize: "14px"}}>MINT [8,888 JTAO]</div>
                            <div style={{alignSelf: "center", background: "gray", fontSize: "14px"}} className="button">UP RARITY</div>
                        </div>
                    </div>
                </div>

                <div style={{width: "95%", borderBottom: "1px solid #dddade", margin: "40px 10px 10px 10px"}}></div>
                <div style={{width: "95%", margin: "20px 10px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">TAODUM STAKING</div>
                <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                    {nft.length > 0 ?
                        <>
                        {nft[0] !== null ?
                            <>
                            {nft.map((item, index) => (
                                <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "14px"}} key={index}>
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
                                        Earn: {Number(item.RewardPerSec).toFixed(4)}
                                        &nbsp;
                                        <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="12" alt="$GEAR"/>
                                        &nbsp;GEAR/DAY
                                    </div>
                                    <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                        <div style={{lineHeight: 1.5, fontSize: "12px", textAlign: "left"}}>
                                            Pending Rewards<br></br>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <img src="https://nftstorage.link/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" width="12" alt="$GEAR"/>
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

export default MechHarvestZone