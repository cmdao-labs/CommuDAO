import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const bbNft = '0xc304195Ad2F55810EcD1e63d9D975e29138Dbd4E'
const doijib = '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB'
const fieldDJ = '0x7A4359E7FCb6d11A6C628B2aa6f1b5EF19218344'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const DjMining = ({ intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20ABI, erc721ABI, fieldDjABI }) => {
    let { address } = useAccount()
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/fields/doijib-mining/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/fields/doijib-mining/' + address)
    }

    const [isTransferModal, setIsTransferModal] = React.useState(false)
    const [transferNftid, setTransferNftid] = React.useState(null)
    const [transferName, setTransferName] = React.useState("")
    const [transferTo, setTransferTo] = React.useState("")

    const [nft, setNft] = React.useState([])
    const [allDaily, setAllDaily] = React.useState("0.000")
    const [allReward, setAllReward] = React.useState("0.000")
    const [doijibBalance, setDoijibBalance] = React.useState("0.000")

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
                address: bbNft,
                abi: erc721ABI,
                functionName: 'transferFrom',
                args: [address, transferTo, transferNftid],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const bbNftSC = new ethers.Contract(bbNft, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            const stakeFilter = await bbNftSC.filters.Transfer(address, fieldDJ, null)
            const stakeEvent = await bbNftSC.queryFilter(stakeFilter, 3489173, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            stakeRemoveDup.push('100000001', '100000002', '100000004', '100000007', '100000006')
            const data0 = address !== null && address !== undefined ? await readContracts({
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: fieldDJ,
                        abi: fieldDjABI,
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
                        address: bbNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill('')]

            const data11 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: fieldDJ,
                        abi: fieldDjABI,
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
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}

                _allDaily += (0.1929012345 * 86400 * 30) + 500000
                _allReward += Number(ethers.utils.formatEther(String(data11[i].result))) + 500000

                nfts.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name + " [" + yournftstake[i].Id + "]",
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0.1929012345 * 86400 * 30,
                    isStaked: true,
                    Reward: String(data11[i].result),
                })
            }

            const walletFilter = await bbNftSC.filters.Transfer(null, address, null)
            const walletEvent = await bbNftSC.queryFilter(walletFilter, 3478177, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: bbNft,
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
                        address: bbNft,
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
                    const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                    nft = await response.json()
                } catch {}

                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + " [" + yournftwallet[i].Id + "]",
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 0.1929012345 * 86400 * 30,
                    isStaked: false,
                    Reward: 0,
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            const djBal = address !== null && address !== undefined ? await readContract({
                address: doijib,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            return [nfts, _allDaily, _allReward, djBal]
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
            setDoijibBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [address, txupdate, erc20ABI, erc721ABI, fieldDjABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: bbNft,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== fieldDJ.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: bbNft,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [fieldDJ, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }        
            const config2 = await prepareWriteContract({
                address: fieldDJ,
                abi: fieldDjABI,
                functionName: 'stake',
                args: [_nftid],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }
    
    const unstakeNft = async (_nftid, _isNeedHarvest) => {
        setisLoading(true)
        try {
            const config2 = await prepareWriteContract({
                address: fieldDJ,
                abi: fieldDjABI,
                functionName: 'unstake',
                args: [_nftid, _isNeedHarvest],
            })
            const { hash: hash12 } = await writeContract(config2)
            await waitForTransaction({ hash: hash12 })
            setTxupdate(hash12)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
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
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left",  backgroundImage: "url('https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmekYUeTbiArAJWFZUiFi48DdF16qHR2crtJHS6AqqfpcY')", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content", padding: "0 10px"}}>DOIJIB Mining</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake BB to earn $DOIJIB.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" height="150" alt="$DOIJIB"/>
                </div>
            </div>

            <div style={{margin: "0", paddingTop: "40px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px", flexFlow: "row wrap"}} className="collection pixel">
                <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>BB ON WALLET</div>
                        <div style={{fontSize: "24px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL 30 DAYS REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}} className="emp">
                            {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="30" alt="$DOIJIB"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {nft.length > 0 && nft[0] !== null ? allReward.toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="30" alt="$DOIJIB"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>DOIJIB BALANCE</div>
                        <div style={{fontSize: "24px", display: "flex"}}>
                            {nft.length > 0 ? Number(doijibBalance).toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="30" alt="$DOIJIB"/>
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
                                    <img
                                        src={item.Image}
                                        width="150"
                                        alt="Can not load metadata."
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
                                        Earn: {Number(item.RewardPerSec).toFixed(4)}
                                        &nbsp;
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="12" alt="$DOIJIB"/>
                                        &nbsp;DOIJIB/30 DAYS
                                    </div>
                                    <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                        <div style={{lineHeight: 1.5, fontSize: "12px", textAlign: "left"}}>
                                            Pending Rewards<br></br>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="30" alt="$DOIJIB"/>
                                                <div style={{display: "flex", flexDirection: "column", marginLeft: "5px"}}>
                                                    <span>&nbsp;{item.Reward * 0.1929012345}</span>
                                                    <span>+ 500,000 (Burn Reward)</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {!item.isStaked ?
                                        <div style={{width: "85%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                            <div style={{fontSize: "14px", lineHeight: "20px"}} className="button" onClick={() => {stakeNft(item.Id)}}>STAKE 30 DAYS</div>
                                            <div style={{alignSelf: "center", background: "gray"}} className="button" onClick={() => transferNFT(item.Id)}>TRANSFER</div>
                                        </div> :
                                        <>
                                            {Number(item.Reward) >= 86400 * 30 ?
                                                <div style={{fontSize: "14px", lineHeight: "20px"}} className="button" onClick={() => {unstakeNft(item.Id, true)}}>HARVEST & BURN</div> :
                                                <div style={{fontSize: "12px", lineHeight: "20px"}} className="button" onClick={() => {unstakeNft(item.Id, false)}}>BURN NOW (LOSS ALL HARVEST)</div>
                                            }
                                        </>
                                    }
                                </div>
                            ))}
                            </> :
                            <div className="nftCard" style={{justifyContent: "center", margin: "20px 10px", padding: "30px 20px"}}>
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
                        <div className="nftCard" style={{justifyContent: "center", margin: "20px 10px", padding: "30px 20px"}}>
                            <ThreeDots fill="#5f6476" />
                            <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default DjMining