import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useContractEvent, useAccount } from 'wagmi'
import { ThreeDots, Oval } from 'react-loading-icons'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const CMDS = '0xAF17Dc881204488d929a5D377eBCF3256130b335'
const starterCMDS = '0x936322111e1c9dCa38a721C1E07b9ec553BF2f04'
const uplevelCMDS = '0x5fCf6Bd82Bd156Ef4DBef47f2997F91bD3E214BB'
const fieldWood = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'

const BBQFieldsAncientForrest = ({ setisLoading, txupdate, setTxupdate, erc721ABI, aurora721ABI, starterCMDSABI, uplevelCMDSABI, woodFieldABI }) => {
    const { address } = useAccount()
    const [inputName, setInputName] = React.useState("")
    const [nft, setNft] = React.useState([])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        setNft([])

        const thefetch = async () => {
            const nftGenesis = address !== null && address !== undefined ? await readContract({
                address: starterCMDS,
                abi: starterCMDSABI,
                functionName: 'mynft',
                args: [address],
            }) : 0
            const nftIndex = Number(ethers.BigNumber.from(String(nftGenesis)).mod(ethers.BigNumber.from(String(10000000000000000000))))

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: CMDS,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(ethers.BigNumber.from(String(10000000000000000000)).add(ethers.BigNumber.from(String(nftIndex))))],
                    },
                    {
                        address: CMDS,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(ethers.BigNumber.from(String(10000010000000000000)).add(ethers.BigNumber.from(String(nftIndex))))],
                    },
                    {
                        address: CMDS,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(ethers.BigNumber.from(String(10000020000000000000)).add(ethers.BigNumber.from(String(nftIndex))))],
                    },
                    {
                        address: CMDS,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(ethers.BigNumber.from(String(10000030000000000000)).add(ethers.BigNumber.from(String(nftIndex))))],
                    },
                    {
                        address: CMDS,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(ethers.BigNumber.from(String(10000040000000000000)).add(ethers.BigNumber.from(String(nftIndex))))],
                    },
                ],
            }) : ['', '', '', '', '', ]

            let nfts = []
            let yournftstake = []

            for (let i = 0; i <= data.length - 1 ; i++) {
                if (data[i].status === 'success' && data[i].result.toUpperCase() === fieldWood.toUpperCase()) {
                    yournftstake.push({Id: String(ethers.BigNumber.from(String('100000' + i + '0000000000000')).add(ethers.BigNumber.from(String(nftIndex))))})
                }
            }

            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const data2 = await readContracts({
                    contracts: [
                        {
                            address: CMDS,
                            abi: erc721ABI,
                            functionName: 'tokenURI',
                            args: [String(yournftstake[i].Id)],
                        },
                        {
                            address: starterCMDS,
                            abi: starterCMDSABI,
                            functionName: 'nftData',
                            args: [String(nftGenesis)],
                        },
                        {
                            address: fieldWood,
                            abi: woodFieldABI,
                            functionName: 'calculateRewards',
                            args: [String(yournftstake[i].Id)],
                        }
                    ],
                })

                const nftipfs = data2[0].result
                const nftData = data2[1].result
                const reward = data2[2].result

                const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                const nft = await response.json()

                let level = 0
                let expMax = 0
                let hashRate = 0
                let theClass = 'Novice'
                if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000000) {
                    level = 0
                    expMax = 3
                    hashRate = 1
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000001) {
                    level = 1
                    expMax = 90
                    hashRate = 2
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000002) {
                    level = 2
                    expMax = 320
                    hashRate = 3
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000003) {
                    level = 3
                    expMax = 1080
                    hashRate = 5
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000004) {
                    level = 4
                    expMax = 2880
                    hashRate = 10
                }

                nfts.push({
                    Id: String(yournftstake[i].Id),
                    Name: nftData[0],
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Class: theClass,
                    Level: level,
                    Exp: ethers.utils.formatEther(String(nftData[1])),
                    ExpMax: expMax,
                    Hashrate: hashRate,
                    RewardWood: ethers.utils.formatEther(String(reward)),
                    RewardCmj: ethers.utils.formatEther(String(ethers.BigNumber.from(reward).div(ethers.BigNumber.from(1e12)))),
                    isStaked: true
                })
            }

            let yournftwallet = []

            for (let i = 0; i <= data.length - 1 ; i++) {
                if (data[i].status === 'success' && data[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(ethers.BigNumber.from(String('100000' + i + '0000000000000')).add(ethers.BigNumber.from(String(nftIndex))))})
                }
            }

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const data3 = await readContracts({
                    contracts: [
                        {
                            address: CMDS,
                            abi: erc721ABI,
                            functionName: 'tokenURI',
                            args: [yournftwallet[i].Id],
                        },
                        {
                            address: starterCMDS,
                            abi: starterCMDSABI,
                            functionName: 'nftData',
                            args: [String(nftGenesis)],
                        }
                    ],
                })

                const nftipfs = data3[0].result
                const nftData = data3[1].result

                const response = await fetch(nftipfs.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"))
                const nft = await response.json()

                let level = 0
                let expMax = 0
                let hashRate = 0
                let theClass = 'Novice'
                if (Number(((yournftwallet[i].Id) / 1e13).toFixed(0)) === 1000000) {
                    level = 0
                    expMax = 3
                    hashRate = 1
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000001) {
                    level = 1
                    expMax = 90
                    hashRate = 2
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000002) {
                    level = 2
                    expMax = 320
                    hashRate = 3
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000003) {
                    level = 3
                    expMax = 1080
                    hashRate = 5
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000004) {
                    level = 4
                    expMax = 2880
                    hashRate = 10
                }

                nfts.push({
                    Id: String(yournftwallet[i].Id),
                    Name: nftData[0],
                    Image: nft.image.replace("ipfs://", "https://apricot-secure-ferret-190.mypinata.cloud/ipfs/"),
                    Class: theClass,
                    Level: level,
                    Exp: ethers.utils.formatEther(String(nftData[1])),
                    ExpMax: expMax,
                    Hashrate: hashRate,
                    RewardWood: "0.000",
                    RewardCmj: "0.000",
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            return [nfts]
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
        })

    }, [address, txupdate, erc721ABI, starterCMDSABI, uplevelCMDSABI, woodFieldABI, ])

    const mintServant = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: starterCMDS,
                abi: starterCMDSABI,
                functionName: 'mintServant',
                args: [1, inputName],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        const nftAllow = await readContract({
            address: CMDS,
            abi: aurora721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== fieldWood.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: CMDS,
                    abi: aurora721ABI,
                    functionName: 'approve',
                    args: [fieldWood, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: fieldWood,
                abi: woodFieldABI,
                functionName: 'stake',
                args: [_nftid],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const unstakeNft = async (_nftid, _uplevel, _toLv) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: fieldWood,
                abi: woodFieldABI,
                functionName: 'unstake',
                args: [_nftid, true],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
            setisLoading(false)
            if (_uplevel) {
                uplevelNft(_nftid, _toLv)
            }
        } catch {setisLoading(false)}
    }

    const uplevelNft = async (_nftid, _toLv) => {
        setisLoading(true)
        const nftAllow = await readContract({
            address: CMDS,
            abi: aurora721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== uplevelCMDS.toUpperCase()) {
            try {
                const config = await prepareWriteContract({
                    address: CMDS,
                    abi: aurora721ABI,
                    functionName: 'approve',
                    args: [uplevelCMDS, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            } catch {}
        }
        try {
            const config = await prepareWriteContract({
                address: uplevelCMDS,
                abi: uplevelCMDSABI,
                functionName: 'uplevelServant',
                args: [_toLv, _nftid],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeib5stifg5jcqqxsy4kbwwb6xovei5biyspuzhlwrsng4i62ppwpwy')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                <div className="pixel" style={{fontSize: "65px", width: "fit-content", padding: "0 10px"}}>Ancient Forest</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake CommuDAO Servant to earn $WOOD & $CMJ.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="150" alt="$WOOD" />
            </div>
        </div>

        <div style={{margin: "0", paddingTop: "30px", alignItems: "flex-start", justifyContent: 'space-between'}} className="collection">
            <div style={{minWidth: '50%', display: 'flex', justifyContent: 'flex-start', flexWrap: "wrap"}}>
                {nft.length > 0 ?
                    <>
                        {nft[0] !== null ?
                            <>
                                {nft.map((item, index) => (
                                    <div style={{justifyContent: "space-around", height: "500px", margin: "20px"}} className="nftCard" key={index}>
                                        <img src={item.Image} width="175" alt="Can not load metadata." />
                                        <div style={{width: 300, padding: "10px 20px", border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between", textAlign: "left"}} className="pixel">
                                            <div style={{lineHeight: 2, fontSize: "14px", textAlign: "left",}}>
                                                <div style={{color: "black"}}>{item.Name} [Lv. {item.Level}]</div>
                                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                                    {item.isStaked ?
                                                        <>
                                                            <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                                            <div>On Staking</div>
                                                        </> :
                                                        <>
                                                            <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, borderRadius: "50%", marginRight: 7}}></div>
                                                            <div>Available for stake</div>
                                                        </>
                                                    }
                                                </div>
                                                <div>Class : {item.Class}</div>
                                                <div>Hash rate : {item.Hashrate}</div>
                                                <div>EXP : {Number(item.Exp >= 1 ? item.Exp - 1 : 0).toFixed(0)}/{item.ExpMax} ({(((item.Exp >= 1 ? item.Exp - 1 : 0) * 100) / item.ExpMax) >= 100 ? "MAX" : (((item.Exp >= 1 ? item.Exp - 1 : 0) * 100) / item.ExpMax).toFixed(3).concat("%")})</div>
                                            </div>
                                            {item.isStaked ?
                                                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                                                    {(((item.Exp - 1) * 100) / item.ExpMax) >= 100 && item.ExpMax !== 2880 ?
                                                        <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#67BAA7", fontSize: "16px"}} className="pixel button" onClick={() => {unstakeNft(item.Id, true, item.Level + 1)}}>LEVEL UP</div> :
                                                        <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", fontSize: "16px"}} className="pixel button">LEVEL UP</div>
                                                    }
                                                </div> :
                                                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                                                    <div style={{lineHeight: 2, height: "fit-content", textAlign: "center"}} className="pixel button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
                                                    {(((item.Exp - 1) * 100) / item.ExpMax) >= 100 && item.ExpMax !== 2880 ?
                                                        <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#67BAA7", fontSize: "16px"}} className="pixel button" onClick={() => {uplevelNft(item.Id, item.Level + 1)}}>LEVEL UP</div> :
                                                        <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", fontSize: "16px"}} className="pixel button">LEVEL UP</div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                            <div style={{lineHeight: 2, fontSize: "12px", textAlign: "left",}} className="bold">
                                                Pending Rewards
                                                <div style={{fontSize: "10px"}} className="emp">EXP: +{Number(item.RewardWood).toFixed(0)}</div>
                                                <div style={{fontSize: "10px"}} className="emp"><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="12" alt="$WOOD"/> {item.RewardWood}</div>
                                                <div style={{fontSize: "10px"}} className="emp"><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="12" alt="$CMJ"/> {item.RewardCmj}</div>
                                            </div>
                                            {item.RewardWood > 0 ?
                                                <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px"}} className="pixel button" onClick={() => {unstakeNft(item.Id, false, 0)}}>HARVEST</div> :
                                                <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">HARVEST</div>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </> :
                            <>
                                {address !== undefined ?
                                    <div className="nftCard" style={{justifyContent: "flex-start", height: "500px", margin: '20px'}}>
                                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiaqwsxafpj3acgdjmvn4hfodrhj5vdeq4cdiqtaaekpjiuamzcbhq" width="150" alt="Can not load metadata." />
                                        <div style={{margin: "20px 0", fontSize: "18px"}} className="emp pixel">CommuDAO Servant Incubator</div>
                                        <input
                                            style={{width: "90%", padding: "5px 10px", marginBottom: "20px", border: "1px solid #dddade", fontSize: "18px"}}
                                            className="bold"
                                            type="string"
                                            placeholder="Input Servant Name (max 32 chars)"
                                            onChange={(event) => {if (event.target.value.length <= 32) { setInputName(event.target.value)} }}
                                            value={inputName}
                                        ></input>
                                        <div className="pixel button" onClick={mintServant}>MINT SERVANT</div>
                                    </div> :
                                    <div className="nftCard" style={{justifyContent: "center", height: "500px", margin: '20px'}}>
                                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                        <div className="bold">Please connect wallet to view your servant.</div>
                                    </div>
                                }
                            </>
                        }
                    </> :
                    <div className="nftCard" style={{justifyContent: "center", height: "500px", margin: '20px'}}>
                        <ThreeDots fill="#5f6476" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading Servant...</div>
                    </div>
                }
            </div>
        </div>
    </>
    )
}

export default BBQFieldsAncientForrest