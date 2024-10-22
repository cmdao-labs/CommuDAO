import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const ory = '0xD492E20Ecf3Ae85Fe3E3159BB064442b86D6DC02'
const fieldMice = '0x09DE640ecd50e1c81bCB266279e3ffC2719873df'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const OldWarehouse = ({ config, intrasubModetext, callMode, navigate, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, aurora721ABI, tunaFieldABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    const [addr, setAddr] = React.useState(address)
    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState("")
    const [nft, setNft] = React.useState([])
    const [nftStaked, setNftStaked] = React.useState([])
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
            let { request } = await simulateContract(config, {
                address: ory,
                abi: aurora721ABI,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const orynftSC = new ethers.Contract(ory, aurora721ABI, providerJBC)
        console.log("Connected to " + address)
        if (intrasubModetext === undefined) {
            navigate('/fields/old-warehouse/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext)
        } else if (address === undefined) {
            navigate('/fields/old-warehouse/null')
        } else {
            navigate('/fields/old-warehouse/' + address)
        }
        setNft([])
        
        const thefetch = async () => {
            let stakeRemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const stakeFilter = await orynftSC.filters.Transfer(addr, fieldMice, null)
                const stakeEvent = await orynftSC.queryFilter(stakeFilter, 515000, "latest")
                const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
                stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            }
            const data = addr !== null ? await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: fieldMice,
                        abi: tunaFieldABI,
                        functionName: 'nftStake',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let nfts = []
            let nftstaked = []
            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && addr !== null ; i++) {
                if (data[i].result[0].toUpperCase() === addr.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }
            const data2 = addr !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: fieldMice,
                        abi: tunaFieldABI,
                        functionName: 'calculateRewards',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            let _allDaily = 0
            let _allReward = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftid = yournftstake[i].Id
                let bonus = 0
                if (Number(nftid) >= 400) {
                    bonus = 4
                } else if (Number(nftid) >= 180 && Number(nftid) < 400) {
                    bonus = 10
                } else if (Number(nftid) >= 60 && Number(nftid) < 180) {
                    bonus = 20
                } else if (Number(nftid) >= 20 && Number(nftid) < 60) {
                    bonus = 50
                } else if (Number(nftid) >= 2 && Number(nftid) < 20) {
                    bonus = 100
                } else if (Number(nftid) === 1) {
                    bonus = 400
                }
                _allDaily += Number(ethers.utils.formatEther(String(bonus * 10**14)))
                _allReward += Number(ethers.utils.formatEther(String(data2[i].result)))
                nfts.push({
                    Id: nftid,
                    Name: "CM Cat Meaw Ory JIBJIB #" + nftid,
                    Image: "https://gateway.pinata.cloud/ipfs/bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu/" + nftid + ".png",
                    Bonus: ethers.utils.formatEther(String(bonus * 10**14)),
                    Reward: ethers.utils.formatEther(String(data2[i].result)),
                    isStaked: true
                })
                nftstaked.push({Id: nftid})
            }

            let walletRemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const walletFilter = await orynftSC.filters.Transfer(null, addr, null)
                const walletEvent = await orynftSC.queryFilter(walletFilter, 515000, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data3 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: ory,
                        abi: aurora721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1; i++) {
                if (data3[i].result.toUpperCase() === addr.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftid = Number(yournftwallet[i].Id)
                let bonus;
                if (Number(nftid) >= 400) {
                    bonus = 4;
                } else if (Number(nftid) >= 180 && Number(nftid) < 400) {
                    bonus = 10;
                } else if (Number(nftid) >= 60 && nftid < 180) {
                    bonus = 20;
                } else if (Number(nftid) >= 20 && Number(nftid) < 60) {
                    bonus = 50;
                } else if (Number(nftid) >= 2 && Number(nftid) < 20) {
                    bonus = 100;
                } else if (Number(nftid) === 1) {
                    bonus = 400;
                }
                nfts.push({
                    Id: nftid,
                    Name: "CM Cat Meaw Ory JIBJIB #" + nftid,
                    Image: "https://gateway.pinata.cloud/ipfs/bafybeid7j5by6pensqrh3v353cwnw7kdcbenf4rqwjrktvy2qodbxqrbuu/" + nftid + ".png",
                    Bonus: ethers.utils.formatEther(String(bonus * 10**14)), 
                    Reward: "0.000",
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            const miceBal = chain !== undefined && chain.id === 8899 && addr !== null ? await readContract(config, {
                address: fieldMice,
                abi: tunaFieldABI,
                functionName: 'balanceOf',
                args: [addr],
                chainId: 8899
            }) : 0

            return [nfts, _allDaily, _allReward, miceBal, nftstaked, ]
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
            setMiceBalance(ethers.utils.formatEther(result[3]))
            setNftStaked(result[4])
        })
    }, [config, address, addr, intrasubModetext, navigate, chain, txupdate, aurora721ABI, tunaFieldABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: ory,
                abi: aurora721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== fieldMice.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: ory,
                    abi: aurora721ABI,
                    functionName: 'approve',
                    args: [fieldMice, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: fieldMice,
                abi: tunaFieldABI,
                functionName: 'stake',
                args: [_nftid],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const unstakeNft = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: fieldMice,
                abi: tunaFieldABI,
                functionName: 'unstake',
                args: [_nftid, _unstake],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const unstakeNftAll = async () => {
        setisLoading(true)
        try {
            for (let i = 0; i <= nftStaked.length - 1; i++) {
                let { request } = await simulateContract(config, {
                    address: fieldMice,
                    abi: tunaFieldABI,
                    functionName: 'unstake',
                    args: [nftStaked[i].Id, false],
                })
                if (i === nftStaked.length - 1) {
                    let h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                    setTxupdate(h)
                } else {
                    await writeContract(config, request)
                }
            }
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <>
            {isTransferModal &&
                <div className="centermodal">
                    <div className="wrapper">
                        <div className="bold" style={{width: "500px", height: "250px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", fontSize: "40px", letterSpacing: "3px"}}>
                            <div style={{fontSize: "20px"}}>{transferName}</div>
                            <input style={{width: "80%", padding: "10px", fontSize: "20px"}} value={transferTo} onChange={transferToHandle} placeholder="Enter 0x..."></input>
                            <div className="button" style={{width: "50%"}} onClick={transferNFTConfirm}>TRANSFER</div>
                            <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsTransferModal(false)}>CLOSE</div>
                        </div>
                    </div>
                </div>
            }
        
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiertqhm4rnoxp63hrz6g6rzama54pryx3dypv5fkizgfnukxv5dsu')", overflow: "scroll"}}>
                <div className="SubfieldBanner">
                    <div className="pixel" style={{padding: "5px", width: "fit-content", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Old Warehouse</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="150" alt="$MICE" />
                </div>
            </div>
            {address !== null && chain !== undefined && chain.id !== 8899 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to JIBCHAIN L1.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{margin: "0", paddingTop: "30px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start"}} className="collection">
                    <div style={{width: "82%", minHeight: "120px", height: "fit-content", margin: "30px 10px 50px 10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>NFT IN WALLET</div>
                            <div style={{fontSize: "24px", marginBottom: "20px"}}>{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                            <div style={{fontSize: "24px", marginBottom: "20px", padding: "2px 20px"}}>
                                {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                                <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="24" alt="$MICE"/>
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                            <div style={{fontSize: "24px", marginBottom: "20px", display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "center"}}>
                                {nft.length > 0 && nft[0] !== null ? allReward.toFixed(3) : 0}
                                <img style={{margin: "0 10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="24" alt="$MICE"/>
                                {address !== null && intrasubModetext !== undefined ?
                                    <>
                                        {address.toUpperCase() === intrasubModetext.toUpperCase() && allReward > 0 ?
                                            <div style={{lineHeight: 2, padding: "2px 20px"}} className="button" onClick={unstakeNftAll}>HARVEST ALL</div> :
                                            <div style={{lineHeight: 2, padding: "2px 20px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST ALL</div>
                                        }
                                    </> :
                                    <div style={{lineHeight: 2, padding: "2px 20px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST ALL</div>
                                }
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>BALANCE</div>
                            <div style={{fontSize: "24px", marginBottom: "20px"}}>
                                {nft.length > 0 ? Number(miceBalance).toFixed(3) : 0}
                                <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="24" alt="$MICE"/>
                            </div>
                        </div>
                    </div>
                    <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
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
                                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="12" alt="micepic"/>
                                                    &nbsp;MICE/DAY
                                                </div>
                                                <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                                    <div style={{lineHeight: 2, textAlign: "left"}}>
                                                        Pending Rewards<br></br>
                                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" width="12" alt="$MICE"/>
                                                        &nbsp;{item.Reward}
                                                    </div>
                                                    {address !== null && intrasubModetext !== undefined ?
                                                        <>
                                                            {address.toUpperCase() === intrasubModetext.toUpperCase() && item.Reward > 0 ?
                                                                <div style={{lineHeight: 2}} className="button" onClick={() => {unstakeNft(item.Id, false)}}>HARVEST</div> :
                                                                <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                                            }
                                                        </> :
                                                        <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                                    }
                                                </div>
                                                {address !== null && intrasubModetext !== undefined && 
                                                    <>
                                                        {address.toUpperCase() === intrasubModetext.toUpperCase() &&
                                                            <>
                                                                {item.isStaked ?
                                                                    <div style={{background: "gray"}} className="button" onClick={() => {unstakeNft(item.Id, true)}}>UNSTAKE</div> :
                                                                    <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                                                        <div className="button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
                                                                        <div style={{alignSelf: "center", background: "gray"}} className="button" onClick={() => transferNFT(item.Id)}>TRANSFER</div>
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </div>
                                        ))}
                                    </> :
                                    <div className="nftCard" style={{margin: "10px", padding: "30px 20px", justifyContent: "center"}}>
                                        {address !== null ?
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
            }
        </>
    )
}

export default OldWarehouse