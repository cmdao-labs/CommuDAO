import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const acNft = '0x526A70be985EB234c3f2c4933aCB59F6EB595Ed7'
const vabag = '0x495d66c9Fd7c63807114d06802A48BdAA60a0426'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const EasternFront = ({ config, intrasubModetext, navigate, callMode, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20Abi, erc721Abi, fieldEfABI }) => {
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
            let { request } = await simulateContract(config, {
                address: acNft,
                abi: erc721Abi,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch {}
        setisLoading(false)
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const acNftSC = new ethers.Contract(acNft, erc721Abi, providerJBC)
        if (intrasubModetext === undefined) {
            navigate('/fields/eastern-front/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext)
        } else if (address === undefined) {
            navigate('/fields/eastern-front/null')
        } else {
            navigate('/fields/eastern-front/' + address)
        }
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            let nftstaked = []
            let stakeRemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const stakeFilter = await acNftSC.filters.Transfer(addr, vabag, null)
                const stakeEvent = await acNftSC.queryFilter(stakeFilter, 2260250, "latest")
                const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
                stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            }
            const data0 = addr !== null ? await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: vabag,
                        abi: fieldEfABI,
                        functionName: 'nftStake',
                        args: [String(item)],
                    }
                ))
            }) : null
            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && addr !== null; i++) {
                if (data0[i].status === 'success' && data0[i].result[0].toUpperCase() === addr.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }
            const data1 = addr !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: acNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : null
            const data11 = addr !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: vabag,
                        abi: fieldEfABI,
                        functionName: 'calculateRewards',
                        args: [String(item.Id)],
                    }
                ))
            }) : null
            let _allDaily = 0
            let _allReward = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = data1[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
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
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(_reward * 3171296000 * 86400))),
                    isStaked: true,
                    Reward: String(data11[i].result),
                })
                nftstaked.push({Id: yournftstake[i].Id})
            }

            let walletRemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const walletFilter = await acNftSC.filters.Transfer(null, addr, null)
                const walletEvent = await acNftSC.queryFilter(walletFilter, 2260250, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: acNft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                    }
                ))
            }) : null
            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && addr !== null; i++) {
                if (data2[i].result.toUpperCase() === addr.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            const data3 = addr !== null ? await readContracts(config, {
                contracts: yournftwallet.map((item) => (
                    {
                        address: acNft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
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
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(ethers.utils.formatEther(String(_reward * 3171296000 * 86400))),
                    isStaked: false,
                    Reward: 0,
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            const vaBal = chain !== undefined && chain.id === 8899 && addr !== null ? await readContract(config, {
                address: vabag,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [addr],
            }) : 0

            return [nfts, _allDaily, _allReward, vaBal, nftstaked, ]
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
            setAllDaily(result[1])
            setAllReward(result[2])
            setVaBagBalance(ethers.utils.formatEther(String(result[3])))
            setNftStaked(result[4])
        })

    }, [config, address, addr, intrasubModetext, navigate, chain, txupdate, erc20Abi, erc721Abi, fieldEfABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: acNft,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== vabag.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: acNft,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [vabag, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                address: vabag,
                abi: fieldEfABI,
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
                address: vabag,
                abi: fieldEfABI,
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
                    address: vabag,
                    abi: fieldEfABI,
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
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left",  backgroundImage: "url('https://gateway.commudao.xyz/ipfs/bafybeig67s2zxistu3b3eco5dshwweicqe6olnwng7o2n6qqzoaawtsag4')", overflow: "scroll"}}>
                <div className="SubfieldBanner">
                    <div className="pixel" style={{padding: "5px", width: "fit-content", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Eastern Front</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="https://gateway.commudao.xyz/ipfs/bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re" height="150" alt="$VABAG"/>
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
                <div style={{margin: "0", paddingTop: "30px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px", flexFlow: "row wrap"}} className="collection pixel">
                    <div style={{width: "82%", minHeight: "120px", height: "fit-content", margin: "30px 10px 50px 10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>NFT IN WALLET</div>
                            <div style={{fontSize: "24px", marginBottom: "20px"}}>{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                            <div style={{fontSize: "24px", marginBottom: "20px"}}>
                                {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                                <img style={{marginLeft: "10px"}} src="https://gateway.commudao.xyz/ipfs/bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re" width="24" alt="$VABAG"/>
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                            <div style={{fontSize: "24px", marginBottom: "20px", display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "center"}}>
                                {nft.length > 0 && nft[0] !== null ? allReward.toFixed(3) : 0}
                                <img style={{margin: "0 10px"}} src="https://gateway.commudao.xyz/ipfs/bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re" width="24" alt="$VABAG"/>
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
                                {nft.length > 0 ? Number(vabagBalance).toFixed(3) : 0}
                                <img style={{marginLeft: "10px"}} src="https://gateway.commudao.xyz/ipfs/bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re" width="24" alt="$VABAG"/>
                            </div>
                        </div>
                    </div>
                    <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                        {nft.length > 0 ?
                            <>
                                {nft[0] !== null ?
                                    <>
                                        {nft.map((item, index) => (
                                            <div className="nftCard pixel" style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "14px"}} key={index}>
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
                                                    <img src="https://gateway.commudao.xyz/ipfs/bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re" width="12" alt="$VABAG"/>
                                                    &nbsp;VABAG/DAY
                                                </div>
                                                <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                                    <div style={{lineHeight: 1.5, fontSize: "12px", textAlign: "left"}}>
                                                        Pending Rewards<br></br>
                                                        <div style={{display: "flex", alignItems: "center"}}>
                                                            <img src="https://gateway.commudao.xyz/ipfs/bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re" width="12" alt="$VABAG"/>
                                                            &nbsp;{ethers.utils.formatEther(String(item.Reward))}
                                                        </div>
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

export default EasternFront