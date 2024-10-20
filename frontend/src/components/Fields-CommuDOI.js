import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const cmdao = '0x20724dc1d37e67b7b69b52300fdba85e558d8f9a'
const cmdoiField = '0xAe8cdc88D74b090894Dca46fc87C4FFBa6630E8e'
const doijib = '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const CommuDOIField = ({ config, intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20Abi, erc721Abi, cmdoiFieldABI }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/fields/commudoi/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/fields/commudoi/' + address)
    }

    const [nft, setNft] = React.useState([])
    const [allDaily, setAllDaily] = React.useState(0)
    const [allReward, setAllReward] = React.useState(0)
    const [doijibBalance, setDoijibBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const cmdaonftSC = new ethers.Contract(cmdao, erc721Abi, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []

            const stakeFilter = await cmdaonftSC.filters.Transfer(address, cmdoiField, null)
            const stakeEvent = await cmdaonftSC.queryFilter(stakeFilter, 4174711, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data0 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: cmdoiField,
                        abi: cmdoiFieldABI,
                        functionName: 'nftOwner',
                        args: [String(item)],
                    }
                ))
            }) : [Array(stakeRemoveDup.length).fill({tokenOwnerOf: ''})]

            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data0[i].status === 'success' && data0[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }

            const data1 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: cmdao,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill('')]

            const _allReward = address !== null && address !== undefined ? await readContract(config, {
                address: cmdoiField,
                abi: cmdoiFieldABI,
                functionName: 'calculateRewards',
                args: [address],
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

            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj, index) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdao,
                        abi: erc721Abi,
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

            const data3 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: yournftwallet.map((item) => (
                    {
                        address: cmdao,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

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

            const doijibBal = address !== null && address !== undefined ? await readContract(config, {
                address: doijib,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [address],
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
            result[0].length > 0 && address !== undefined ? setNft(result[0]) : setNft([null])
            setAllReward(ethers.utils.formatEther(String(result[1])))
            setAllDaily(result[2])
            setDoijibBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [address, txupdate, erc20Abi, erc721Abi, cmdoiFieldABI])

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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", width: "fit-content", padding: "0 10px"}}>CommuDOI</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake CommuDAO NFT to earn $DOIJIB.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" height="150" alt="$DOIJIB"/>
            </div>
        </div>

        <div style={{margin: "0", paddingTop: "30px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px"}} className="collection pixel">
            <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>CMDAO NFT IN WALLET</div>
                    <div style={{fontSize: "24px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                </div>
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                    <div style={{fontSize: "24px"}} className="emp">
                        {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                        <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="24" alt="$DOIJIB"/>
                    </div>
                </div>
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                    <div style={{fontSize: "24px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        {nft.length > 0 && nft[0] !== null ? Number(allReward).toLocaleString('en-US', {maximumFractionDigits:2}) : 0}
                        <img style={{margin: "0 10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="24" alt="$DOIJIB"/>
                        <>
                            {address !== undefined && address === youraddr && allReward > 0 ?
                                <div style={{lineHeight: 2}} className="button" onClick={unstakeNftAll}>HARVEST ALL</div> :
                                <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST ALL</div>
                            }
                        </>
                    </div>
                </div>
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>DOIJIB BALANCE</div>
                    <div style={{fontSize: "24px"}}>
                        {nft.length > 0 ? Number(doijibBalance).toLocaleString('en-US', {maximumFractionDigits:2}) : 0}
                        <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="24" alt="$DOIJIB"/>
                    </div>
                </div>
            </div>
            <div style={{margin: "40px 0 80px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
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
                                    <div>
                                        Earn: {String(item.RewardPerSec)}
                                        &nbsp;
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="12" alt="$DOIJIB"/>
                                        &nbsp;DOIJIB/DAY
                                    </div>
                                    {item.isStaked ?
                                        <div style={{background: "gray"}} className="button" onClick={() => {unstakeNft(item.Id)}}>UNSTAKE</div> :
                                        <div className="button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
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

export default CommuDOIField