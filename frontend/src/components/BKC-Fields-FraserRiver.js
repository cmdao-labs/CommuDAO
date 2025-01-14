import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { ThreeDots } from 'react-loading-icons'

const cmnft = '0x2F022D4Ef37847304eCd167303aeaA9699F73663'
const fraserField = '0xBc57A8D5456c145a09557e0aD0C5959948e0cf7E'
const salmToken = '0xBc57A8D5456c145a09557e0aD0C5959948e0cf7E'
const cmmToken = '0x9B005000A10Ac871947D99001345b01C1cEf2790'
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const FraserRiver = ({ config, intrasubModetext, navigate, callMode, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc20Abi, erc721Abi, salmFieldABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const [addr, setAddr] = React.useState(address)
    const { open } = useAppKit()
    const [nft, setNft] = React.useState([])
    const [nftStaked, setNftStaked] = React.useState([])
    const [allDaily1, setAllDaily1] = React.useState("0.000")
    const [allReward1, setAllReward1] = React.useState("0.000")
    const [allReward2, setAllReward2] = React.useState("0.000")
    const [cmmBalance, setCmmBalance] = React.useState("0.000")
    const [salmBalance, setSalmBalance] = React.useState("0.000")

    React.useEffect(() => {
        console.log("Connected to " + address)
        const cmnftSC = new ethers.Contract(cmnft, erc721Abi, providerBKC)
        if (intrasubModetext === undefined) {
            navigate('/fields/bkc-fraser-river/' + address)
        } else if (intrasubModetext.length === 42) {
            setAddr(intrasubModetext)
        } else if (address === undefined) {
            navigate('/fields/bkc-fraser-river/null')
        } else {
            navigate('/fields/bkc-fraser-river/' + address)
        }
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            let nftstaked = []
            let stakeRemoveDup = []
            if (chain !== undefined && chain.id === 96 && addr !== null) {
                const stakeFilter = await cmnftSC.filters.Transfer(addr, fraserField, null)
                const stakeEvent = await cmnftSC.queryFilter(stakeFilter, 15727711, "latest")
                const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
                stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            }
            const data0 = addr !== null ? await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'nftStake',
                        args: [1, String(item)],
                    }
                ))
            }) : null
            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1 && addr !== null; i++) {
                if (data0[i].result[0].toUpperCase() === addr.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }
            const data1 = addr !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: cmnft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : null

            const data10 = addr !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'power',
                        args: [String(item.Id)],
                    }
                ))
            }) : null
            const data11 = addr !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'calculateRewards',
                        args: [1, String(item.Id)],
                    }
                ))
            }) : null
            const data12 = addr !== null ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'pendingReward',
                        args: [1, String(item.Id)],
                    }
                ))
            }) : null
            let _allDaily1 = 0
            let _allReward1 = 0
            let _allReward2 = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = data1[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}
                _allDaily1 += Number(ethers.utils.formatEther(String(1 * 10**14)))
                _allReward1 += Number(ethers.utils.formatEther(data11[i].result))
                _allReward2 += Number(ethers.utils.formatEther(data12[i].result))
                nfts.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name + " [" + yournftstake[i].Id + "]",
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(data10[i].result),
                    isStaked: true,
                    Reward: data11[i].result,
                    Reward2: data12[i].result
                })
                nftstaked.push({Id: yournftstake[i].Id})
            }

            let walletRemoveDup = []
            if (chain !== undefined && chain.id === 96 && addr !== null) {
                const walletFilter = await cmnftSC.filters.Transfer(null, addr, null)
                const walletEvent = await cmnftSC.queryFilter(walletFilter, 8248906, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = addr !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmnft,
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
                        address: cmnft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : null
            const data30 = addr !== null ? await readContracts(config, {
                contracts: yournftwallet.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'power',
                        args: [String(item.Id)],
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + " [" + yournftwallet[i].Id + "]",
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(data30[i].result),
                    isStaked: false,
                    Reward: 0,
                    Reward2: 0
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            const dataToken = chain !== undefined && chain.id === 96 && addr !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: cmmToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [addr],
                    },
                    {
                        address: salmToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [addr],
                    }
                ],
            }) : [{result: 0}, {result: 0}]
            const cmmBal = dataToken[0].result
            const salmBal = dataToken[1].result

            return [nfts, _allDaily1, _allReward1, _allReward2, cmmBal, salmBal, nftstaked, ]
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
            setAllDaily1(result[1] * 86400)
            setAllReward1(result[2])
            setAllReward2(result[3])
            setCmmBalance(ethers.utils.formatEther(result[4]))
            setSalmBalance(ethers.utils.formatEther(result[5]))
            setNftStaked(result[6])
        })

    }, [config, address, addr, intrasubModetext, navigate, chain, txupdate, erc20Abi, erc721Abi, salmFieldABI])

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: cmnft,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== fraserField.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: cmnft,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [fraserField, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                address: fraserField,
                abi: salmFieldABI,
                functionName: 'stake',
                args: [1, _nftid],
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
                address: fraserField,
                abi: salmFieldABI,
                functionName: 'unstake',
                args: [1, _nftid, _unstake],
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
                    address: fraserField,
                    abi: salmFieldABI,
                    functionName: 'unstake',
                    args: [1, nftStaked[i].Id, false],
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
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left",  backgroundImage: "url('https://gateway.commudao.xyz/ipfs/bafybeidi7nmlmmlr2zjf3mlqkmnaylvcpucdvx5q22dtimutsdt442jnm4')", overflow: "scroll"}}>
                <div className="SubfieldBanner">
                    <div className="pixel" style={{padding: "5px", width: "fit-content", color: "#fff", background: "rgb(0, 0, 0, 0.6)", backdropFilter: "blur(10px)"}}>Fraser River</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="https://gateway.commudao.xyz/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" width="150" alt="$CMM" />
                    <img src="https://gateway.commudao.xyz/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="150" style={{marginLeft: "-50px"}} alt="$SALM" />
                </div>
            </div>

            {address !== null && chain !== undefined && chain.id !== 96 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to Bitkub Chain.</div>
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
                                {nft.length > 0 && nft[0] !== null ? allDaily1.toFixed(2) : 0}
                                <img style={{marginLeft: "10px"}} src="https://gateway.commudao.xyz/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="24" alt="$SALM"/>
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                            <div style={{fontSize: "24px", marginBottom: "20px"}}>
                                {nft.length > 0 && nft[0] !== null ? allReward1.toFixed(3) : 0}
                                <img style={{marginLeft: "10px"}} src="https://gateway.commudao.xyz/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="24" alt="$SALM"/>
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>BALANCE</div>
                            <div style={{fontSize: "24px", marginBottom: "20px"}}>
                                {nft.length > 0 && nft[0] !== null ? Number(salmBalance).toFixed(3) : 0}
                                <img style={{marginLeft: "10px"}} src="https://gateway.commudao.xyz/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="24" alt="$SALM"/>
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                            <div style={{fontSize: "24px", marginBottom: "20px"}}>
                                {nft.length > 0 && nft[0] !== null ? allReward2.toFixed(3) : 0}
                                <img style={{marginLeft: "10px"}} src="https://gateway.commudao.xyz/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" width="24" alt="$CMM"/>
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}>BALANCE</div>
                            <div style={{fontSize: "24px", marginBottom: "20px"}}>
                                {nft.length > 0 && nft[0] !== null ? Number(cmmBalance).toFixed(3) : 0}
                                <img style={{marginLeft: "10px"}} src="https://gateway.commudao.xyz/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" width="24" alt="$CMM"/>
                            </div>
                        </div>
                        <div className="headfield bold">
                            <div style={{marginBottom: "20px"}}></div>
                            <div style={{fontSize: "24px", marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                {address !== null && intrasubModetext !== undefined ?
                                    <>
                                        {address.toUpperCase() === intrasubModetext.toUpperCase() && (allReward1 > 0 || allReward2 > 0) ?
                                            <div style={{lineHeight: 2, padding: "2px 20px"}} className="button" onClick={unstakeNftAll}>HARVEST ALL</div> :
                                            <div style={{lineHeight: 2, padding: "2px 20px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST ALL</div>
                                        }
                                    </> :
                                    <div style={{lineHeight: 2, padding: "2px 20px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST ALL</div>
                                }
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
                                                <div>Staking Power: {item.RewardPerSec}</div>
                                                <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                                    <div style={{lineHeight: 1.5, fontSize: "12px", textAlign: "left"}}>
                                                        Pending Rewards<br></br>
                                                        <div style={{display: "flex", alignItems: "center"}}>
                                                            <img src="https://gateway.commudao.xyz/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="12" style={{marginRight: "5px"}} alt="$SALM"/>
                                                            {ethers.utils.formatEther(item.Reward)}
                                                        </div>
                                                        <div style={{display: "flex", alignItems: "center"}}>
                                                            <img src="https://gateway.commudao.xyz/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" width="12" style={{marginRight: "5px"}} alt="CMM"/>
                                                            {ethers.utils.formatEther(item.Reward2)}
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
                                                                    <div className="button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
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

export default FraserRiver