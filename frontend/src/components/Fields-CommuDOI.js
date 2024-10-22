import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const cmdao = '0x20724dc1d37e67b7b69b52300fdba85e558d8f9a'
const cmdoiField = '0xAe8cdc88D74b090894Dca46fc87C4FFBa6630E8e'
const doijib = '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const CommuDOIField = ({ config, intrasubModetext, navigate, callMode, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20Abi, erc721Abi, cmdoiFieldABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const [addr, setAddr] = React.useState(address)
    const { open } = useAppKit()
    const [nft, setNft] = React.useState([])
    const [allDaily, setAllDaily] = React.useState(0)
    const [allReward, setAllReward] = React.useState(0)
    const [doijibBalance, setDoijibBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const cmdaonftSC = new ethers.Contract(cmdao, erc721Abi, providerJBC)
        if (intrasubModetext === undefined) {
            navigate('/fields/commudoi/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext)
        } else if (address === undefined) {
            navigate('/fields/commudoi/null')
        } else {
            navigate('/fields/commudoi/' + address)
        }
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            let stakeRemoveDup = []
            if (addr !== null) {
                const stakeFilter = await cmdaonftSC.filters.Transfer(addr, cmdoiField, null)
                const stakeEvent = await cmdaonftSC.queryFilter(stakeFilter, 4174711, "latest")
                const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
                stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            }
            const data0 = addr !== null ? await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: cmdoiField,
                        abi: cmdoiFieldABI,
                        functionName: 'nftOwner',
                        args: [String(item)],
                    }
                ))
            }) : null
            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && addr !== null; i++) {
                if (data0[i].status === 'success' && data0[i].result.toUpperCase() === addr.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }
            const data1 = addr !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: cmdao,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : null
            const _allReward = addr !== null ? await readContract(config, {
                address: cmdoiField,
                abi: cmdoiFieldABI,
                functionName: 'calculateRewards',
                args: [addr],
            }) : 0
            let _allDaily = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = data1[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}
                let _reward = Number(yournftstake[i].Id.slice(-5))
                _allDaily += Number(_reward * 0.00001 * 86400)

                nfts.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name + " [" + yournftstake[i].Id + "]",
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: _reward * 0.00001 * 86400,
                    isStaked: true,
                })
            }

            let walletRemoveDup = []
            if (addr !== null) {
                const walletFilter = await cmdaonftSC.filters.Transfer(null, addr, null)
                const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj, index) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdao,
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
                        address: cmdao,
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
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                    nft.image = nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/")
                } catch {}
                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: yournftwallet[i].Id.slice(-5) * 0.00001 * 86400,
                    isStaked: false,
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            const doijibBal = addr !== null ? await readContract(config, {
                address: doijib,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [addr],
            }) : 0

            return [nfts, _allReward, _allDaily, doijibBal, ]
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
            setAllReward(ethers.utils.formatEther(String(result[1])))
            setAllDaily(result[2])
            setDoijibBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [config, address, addr, intrasubModetext, navigate, chain, txupdate, erc20Abi, erc721Abi, cmdoiFieldABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: cmdao,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== cmdoiField.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: cmdao,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [cmdoiField, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                address: cmdoiField,
                abi: cmdoiFieldABI,
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

    const unstakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: cmdoiField,
                abi: cmdoiFieldABI,
                functionName: 'unstake',
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

    const unstakeNftAll = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: cmdoiField,
                abi: cmdoiFieldABI,
                functionName: 'harvest',
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

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner">
                    <div className="pixel" style={{padding: "5px", width: "fit-content", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>CommuDOI</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" height="150" alt="$DOIJIB"/>
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
                <div style={{margin: "0", paddingTop: "30px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px"}} className="collection pixel">
                    <div style={{width: "82%", minHeight: "120px", height: "fit-content", margin: "30px 10px 50px 10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>NFT IN WALLET</div>
                            <div style={{fontSize: "24px", marginBottom: "20px"}}>{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                            <div style={{fontSize: "24px", marginBottom: "20px", display: "flex", justifyContent: "center"}}>
                                {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                                <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="30" alt="$DOIJIB"/>
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                            <div style={{fontSize: "24px", marginBottom: "20px", display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "center"}}>
                                {nft.length > 0 && nft[0] !== null ? Number(allReward).toLocaleString('en-US', {maximumFractionDigits:2}) : 0}
                                <img style={{margin: "0 10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="30" alt="$DOIJIB"/>
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
                            <div style={{fontSize: "24px", marginBottom: "20px", display: "flex", justifyContent: "center"}}>
                                {nft.length > 0 ? Number(doijibBalance).toLocaleString('en-US', {maximumFractionDigits:2}) : 0}
                                <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="30" alt="$DOIJIB"/>
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
                                                <img
                                                    src={item.Image}
                                                    width="150"
                                                    alt="nftpic"
                                                />
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
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    <>Earn: {String(item.RewardPerSec)}</>&nbsp;
                                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="12" alt="$DOIJIB"/>&nbsp;
                                                    <>DOIJIB/DAY</>
                                                </div>
                                                {item.isStaked ?
                                                    <div style={{background: "gray"}} className="button" onClick={() => {unstakeNft(item.Id)}}>UNSTAKE</div> :
                                                    <div className="button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
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

export default CommuDOIField