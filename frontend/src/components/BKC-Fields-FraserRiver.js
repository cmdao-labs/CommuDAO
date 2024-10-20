import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const cmnft = '0x2F022D4Ef37847304eCd167303aeaA9699F73663'
const fraserField = '0xBc57A8D5456c145a09557e0aD0C5959948e0cf7E'
const salmToken = '0xBc57A8D5456c145a09557e0aD0C5959948e0cf7E'
const cmmToken = '0x9B005000A10Ac871947D99001345b01C1cEf2790'
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const FraserRiver = ({ config, intrasubModetext, navigate, setisLoading, txupdate, setTxupdate, erc20Abi, erc721Abi, salmFieldABI }) => {
    let { address } = useAccount()
    const youraddr = address
    if (intrasubModetext === undefined || intrasubModetext.toUpperCase() === "YOURBAG") {
        navigate('/fields/bkc-fraser-river/' + address)
    } else if (intrasubModetext.length === 42) {
        address = intrasubModetext
    } else if (address === undefined) {
    } else {
        navigate('/fields/bkc-fraser-river/' + address)
    }

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
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            let nftstaked = []

            const stakeFilter = await cmnftSC.filters.Transfer(address, fraserField, null)
            const stakeEvent = await cmnftSC.queryFilter(stakeFilter, 15727711, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data0 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'nftStake',
                        args: [1, String(item)],
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
                        address: cmnft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill('')]

            const data10 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'power',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill(0)]

            const data11 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'calculateRewards',
                        args: [1, String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill(0)]

            const data12 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: yournftstake.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'pendingReward',
                        args: [1, String(item.Id)],
                    }
                ))
            }) : [Array(yournftstake.length).fill(0)]

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

            const walletFilter = await cmnftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmnftSC.queryFilter(walletFilter, 8248906, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmnft,
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
                        address: cmnft,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            const data30 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: yournftwallet.map((item) => (
                    {
                        address: fraserField,
                        abi: salmFieldABI,
                        functionName: 'power',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill(0)]

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

            const dataToken = address !== null && address !== undefined ? await readContracts(config, {
                contracts: [
                    {
                        address: cmmToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: salmToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                    }
                ],
            }) : [0, 0]

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
            result[0].length > 0 && address !== undefined ? setNft(result[0]) : setNft([null])
            setAllDaily1(result[1] * 86400)
            setAllReward1(result[2])
            setAllReward2(result[3])
            setCmmBalance(ethers.utils.formatEther(String(result[4])))
            setSalmBalance(ethers.utils.formatEther(String(result[5])))
            setNftStaked(result[6])
        })

    }, [address, txupdate, erc20Abi, erc721Abi, salmFieldABI])

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
        } catch {}
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
        } catch {}
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
        } catch {}
        setisLoading(false)
    }

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left",  backgroundImage: "url('https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeidi7nmlmmlr2zjf3mlqkmnaylvcpucdvx5q22dtimutsdt442jnm4')", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content", padding: "0 10px"}}>Fraser River</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake Cat Meaw NFT to earn $SALM & $CMM.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img
                        src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla"
                        width="150"
                        alt="$CMM"
                    />
                    <img
                        src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34"
                        width="150"
                        style={{marginLeft: "-50px"}}
                        alt="$SALM"
                    />
                </div>
            </div>

            <div style={{margin: "0", paddingTop: "30px", minHeight: "fit-content", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "14px", flexFlow: "row wrap"}} className="collection pixel">
                <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>CAT MEAW AND FRIENDS ON STAKING</div>
                        <div style={{fontSize: "24px"}} className="emp">{nft.length > 0 && nft[0] !== null ? nft.length : 0}</div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL DAILY REWARD</div>
                        <div style={{fontSize: "24px"}} className="emp">
                            {nft.length > 0 && nft[0] !== null ? allDaily1.toFixed(2) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="24" alt="$SALM"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                        <div style={{fontSize: "24px"}}>
                            {nft.length > 0 && nft[0] !== null ? allReward1.toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="24" alt="$SALM"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>SALMON BALANCE</div>
                        <div style={{fontSize: "24px"}}>
                            {nft.length > 0 && nft[0] !== null ? Number(salmBalance).toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="24" alt="$SALM"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>TOTAL PENDING REWARD</div>
                        <div style={{fontSize: "24px"}}>
                            {nft.length > 0 && nft[0] !== null ? allReward2.toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" width="24" alt="$CMM"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}>CMM BALANCE</div>
                        <div style={{fontSize: "24px"}}>
                            {nft.length > 0 && nft[0] !== null ? Number(cmmBalance).toFixed(3) : 0}
                            <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" width="24" alt="$CMM"/>
                        </div>
                    </div>
                    <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                        <div style={{marginBottom: "20px"}}></div>
                        <div style={{fontSize: "24px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                            <>
                                {address !== undefined && address === youraddr && (allReward1 > 0 || allReward2 > 0) ?
                                    <div style={{lineHeight: 2}} className="button" onClick={unstakeNftAll}>HARVEST ALL</div> :
                                    <div style={{lineHeight: 2, background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST ALL</div>
                                }
                            </>
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
                                        <div>Staking Power: {item.RewardPerSec}</div>
                                        <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                            <div style={{lineHeight: 1.5, fontSize: "12px", textAlign: "left"}}>
                                                Pending Rewards<br></br>
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicj63qksujn46s6skyyvqeny2fmptp2eu5u6hcicawalqjhtopm34" width="12" style={{marginRight: "5px"}} alt="$SALM"/>
                                                    {ethers.utils.formatEther(item.Reward)}
                                                </div>
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiaayvrql643lox66vkdfv6uzaoq2c5aa5mq3jjp3c7v4asaxvvzla" width="12" style={{marginRight: "5px"}} alt="CMM"/>
                                                    {ethers.utils.formatEther(item.Reward2)}
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

export default FraserRiver