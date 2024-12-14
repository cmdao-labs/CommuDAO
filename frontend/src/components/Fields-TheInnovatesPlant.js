import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const taomemenft = '0xB39336b9491547405341eEB8863B020A1302Dd69'
const innovatesplantField = '0xa1Cf30E47B7cfdB2F53332e3E151d9604c3fC8B5'
const ii = '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const TheInnovatesPlantField = ({ config, intrasubModetext, navigate, callMode, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20Abi, erc721Abi, cmdoiFieldABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const [addr, setAddr] = React.useState(address)
    const { open } = useAppKit()
    const [nft, setNft] = React.useState([])
    const [allDaily, setAllDaily] = React.useState(0)
    const [allReward, setAllReward] = React.useState(0)
    const [iiBalance, setIiBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const taomemenftSC = new ethers.Contract(taomemenft, erc721Abi, providerJBC)
        if (intrasubModetext === undefined) {
            navigate('/fields/the-innovates-plant/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext)
        } else if (address === undefined) {
            navigate('/fields/the-innovates-plant/null')
        } else {
            navigate('/fields/the-innovates-plant/' + address)
        }
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            let stakeRemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const stakeFilter = await taomemenftSC.filters.Transfer(addr, innovatesplantField, null)
                const stakeEvent = await taomemenftSC.queryFilter(stakeFilter, 4174711, "latest")
                const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
                stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            }
            const data0 = addr !== null ? await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: innovatesplantField,
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
                        address: taomemenft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : null
            const _allReward = chain !== undefined && chain.id === 8899 && addr !== null ? await readContract(config, {
                address: innovatesplantField,
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
                let _reward = 0
                if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '01') {
                    _reward = 85
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '02') {
                    _reward = 95
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '03') {
                    _reward = 100
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '04') {
                    _reward = 105
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '05') {
                    _reward = 110
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '06') {
                    _reward = 115
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '07') {
                    _reward = 120
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '08') {
                    _reward = 125
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '09') {
                    _reward = 130
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '10') {
                    _reward = 135
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '11') {
                    _reward = 150
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '12') {
                    _reward = 155
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '13') {
                    _reward = 160
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '14') {
                    _reward = 165
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '15') {
                    _reward = 180
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '16') {
                    _reward = 185
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '17') {
                    _reward = 190
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '18') {
                    _reward = 195
                } else if (String(yournftstake[i].Id).padStart(20, '0').slice(0, 2) === '19') {
                    _reward = 250
                }
                _allDaily += Number(_reward * 0.0000002 * 86400).toFixed(2)

                nfts.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name + " [" + yournftstake[i].Id + "]",
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(_reward * 0.0000002 * 86400).toFixed(4),
                    isStaked: true,
                })
            }

            let walletRemoveDup = []
            if (chain !== undefined && chain.id === 8899 && addr !== null) {
                const walletFilter = await taomemenftSC.filters.Transfer(null, addr, null)
                const walletEvent = await taomemenftSC.queryFilter(walletFilter, 2804540, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: taomemenft,
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
                        address: taomemenft,
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
                let _reward = 0
                if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '01') {
                    _reward = 85
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '02') {
                    _reward = 95
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '03') {
                    _reward = 100
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '04') {
                    _reward = 105
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '05') {
                    _reward = 110
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '06') {
                    _reward = 115
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '07') {
                    _reward = 120
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '08') {
                    _reward = 125
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '09') {
                    _reward = 130
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '10') {
                    _reward = 135
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '11') {
                    _reward = 150
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '12') {
                    _reward = 155
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '13') {
                    _reward = 160
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '14') {
                    _reward = 165
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '15') {
                    _reward = 180
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '16') {
                    _reward = 185
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '17') {
                    _reward = 190
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '18') {
                    _reward = 195
                } else if (String(yournftwallet[i].Id).padStart(20, '0').slice(0, 2) === '19') {
                    _reward = 250
                }
                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + " [" + yournftwallet[i].Id + "]",
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(_reward * 0.0000002 * 86400).toFixed(4),
                    isStaked: false,
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            const iiBal = chain !== undefined && chain.id === 8899 && addr !== null ? await readContract(config, {
                address: ii,
                abi: erc20Abi,
                functionName: 'balanceOf',
                args: [addr],
            }) : 0

            return [nfts, _allReward, _allDaily, iiBal, ]
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
            setIiBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [config, address, addr, intrasubModetext, navigate, chain, txupdate, erc20Abi, erc721Abi, cmdoiFieldABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: taomemenft,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== innovatesplantField.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: taomemenft,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [innovatesplantField, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                address: innovatesplantField,
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
                address: innovatesplantField,
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
                address: innovatesplantField,
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
                    <div className="pixel" style={{padding: "5px", width: "fit-content", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>The Innovate's Plant</div>
                </div>
                <div className="SubfieldBanner">
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
                                {nft.length > 0 && nft[0] !== null ? allDaily : 0}
                                <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q?img-height=50" width="30" alt="$II"/>
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                            <div style={{fontSize: "24px", marginBottom: "20px", display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "center"}}>
                                {nft.length > 0 && nft[0] !== null ? Number(allReward).toLocaleString('en-US', {maximumFractionDigits:2}) : 0}
                                <img style={{margin: "0 10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q?img-height=50" width="30" alt="$II"/>
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
                                {nft.length > 0 ? Number(iiBalance).toLocaleString('en-US', {maximumFractionDigits:2}) : 0}
                                <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q?img-height=50" width="30" alt="$II"/>
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
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    <>Earn: {String(item.RewardPerSec)}</>&nbsp;
                                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q?img-height=50" width="12" alt="$II
                                                    "/>&nbsp;
                                                    <>II/DAY</>
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

export default TheInnovatesPlantField