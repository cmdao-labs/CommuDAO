import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const bkga = '0x99a763eCBd64fdcCfE06143D405D5DFaf5828ce2'
const badField = '0xded5c3F32bC01C0F451A4FC79a11619eB78bAF5e'
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const BadMuseum = ({ config, intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc721Abi, tunaFieldABI, erc20Abi }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/fields/bkc-bad-museum/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/fields/bkc-bad-museum/' + address)
    }

    const [nft, setNft] = React.useState([])
    const [nftStaked, setNftStaked] = React.useState([])
    const [allDaily, setAllDaily] = React.useState(0)
    const [allReward, setAllReward] = React.useState(0)
    const [bstBalance, setBstBalance] = React.useState(0)

    React.useEffect(() => {
        console.log("Connected to " + address)
        const bkgaSC = new ethers.Contract(bkga, erc721Abi, providerBKC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            let nftstaked = []

            const stakeFilter = await bkgaSC.filters.Transfer(address, badField, null)
            const stakeEvent = await bkgaSC.queryFilter(stakeFilter, 15619908, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data0 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: badField,
                        abi: tunaFieldABI,
                        functionName: 'nftStake',
                        args: [String(item)],
                    }
                ))
            }) : [Array(stakeRemoveDup.length).fill({tokenOwnerOf: ''})]

            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data0[i].result[0].toUpperCase() === address.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }

            const data1 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: bkga,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill('')]

            const data11 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: badField,
                        abi: tunaFieldABI,
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
                _allDaily += Number(ethers.utils.formatEther(String(1 * 10**14)))
                _allReward += Number(ethers.utils.formatEther(String(data11[i].result)))

                nfts.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 1,
                    isStaked: true,
                    Reward: data11[i].result
                })
                nftstaked.push({Id: yournftstake[i].Id})
            }

            const walletFilter = await bkgaSC.filters.Transfer(null, address, null)
            const walletEvent = await bkgaSC.queryFilter(walletFilter, 12767368, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: bkga,
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
                        address: bkga,
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
                } catch {}

                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: 1,
                    isStaked: false,
                    Reward: 0
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            const bstBal = address !== null && address !== undefined ? await readContract(config, {
                address: badField,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            return [nfts, nftstaked, _allReward, _allDaily, bstBal, ]
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
            setNftStaked(result[1])
            setAllReward(result[2])
            setAllDaily(result[3] * 86400)
            setBstBalance(ethers.utils.formatEther(String(result[4])))
        })

    }, [address, txupdate, erc721Abi, tunaFieldABI, erc20Abi])
    
    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: bkga,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== badField.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: bkga,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [badField, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                address: badField,
                abi: tunaFieldABI,
                functionName: 'stake',
                args: [_nftid],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch {}
        setisLoading(false)
    }
    
    const unstakeNft = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: badField,
                abi: tunaFieldABI,
                functionName: 'unstake',
                args: [_nftid, _unstake],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch {}
        setisLoading(false)
    }

    const unstakeNftAll = async () => {
        setisLoading(true)
        try {
            for (let i = 0; i <= nftStaked.length - 1; i++) {
                let { request } = await simulateContract(config, {
                    address: badField,
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
        } catch {}
        setisLoading(false)
    }

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content", padding: "0 10px"}}>Bad Museum</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake BKGA to earn $BST.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img
                        src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm"
                        width="150"
                        alt="$BST"
                    />
                </div>
            </div>

            <div style={{margin: "0", paddingTop: "30px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px", flexFlow: "row wrap"}} className="collection pixel">
                <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>BKGA ON WALLET</div>
                        <div style={{fontSize: "24px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                        <div style={{fontSize: "24px", display: "flex"}} className="emp">
                            {nft.length > 0 && nft[0] !== null ? allDaily.toFixed(2) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" width="24" alt="$BST"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                        <div style={{fontSize: "24px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                            {nft.length > 0 && nft[0] !== null ? allReward.toFixed(3) : 0}
                            <img style={{margin: "0 10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" width="24" alt="$BST"/>
                            <>
                                {address !== undefined && address === youraddr && allReward > 0 ?
                                    <div style={{lineHeight: 2}} className="button" onClick={unstakeNftAll}>HARVEST ALL</div> :
                                    <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST ALL</div>
                                }
                            </>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>BST BALANCE</div>
                        <div style={{fontSize: "24px"}}>
                            {nft.length > 0 ? Number(bstBalance).toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" width="24" alt="$BST"/>
                        </div>
                    </div>
                </div>
                <div style={{margin: "40px 0 80px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                    {nft.length > 0 ?
                        <>
                            {nft[0] !== null ?
                                <>
                                {nft.map((item, index) => (
                                    <div className="nftCard pixel" style={{margin: "10px", padding: "30px 20px", justifyContent: "space-around", fontSize: "14px"}} key={index}>
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
                                            Earn: {ethers.utils.formatEther(String(item.RewardPerSec * 86400 * 10**14))}
                                            &nbsp;
                                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" width="12" style={{marginRight: "5px"}} alt="$BST"/>
                                            BST/DAY
                                        </div>
                                        <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                            <div style={{lineHeight: 2, fontSize: "12px", textAlign: "left"}}>
                                                Pending Rewards<br></br>
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfaoq6ewqfoipdm66wapq4kijjhxdueztpo6tvdhayprueihefrm" width="12" style={{marginRight: "5px"}} alt="$BST"/>
                                                    {ethers.utils.formatEther(item.Reward)}
                                                </div>
                                            </div>
                                            {item.Reward > 0 ?
                                                <div style={{lineHeight: 2}} className="button" onClick={() => {unstakeNft(item.Id, false)}}>HARVEST</div> :
                                                <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                            }
                                        </div>
                                        {item.isStaked ?
                                            <div style={{background: "gray"}} className="button" onClick={() => {unstakeNft(item.Id, true)}}>UNSTAKE</div> :
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

export default BadMuseum