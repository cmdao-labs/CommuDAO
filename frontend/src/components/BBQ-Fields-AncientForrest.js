import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const CMDS = '0x11EEB4A41d54522e1F4FF296a48215f7fc7F3e5D'
const uplevelCMDS = '0xc50Aac569834896c18c60623Ebe81cF3D5BCeF78'
const fieldWood = '0xc71AEB41A444AFdB4BfA28b4Ed1c1B5E1cB6d958'
const missionBaseCmd = '0x5222342bF1B94E5b65618b9e6c8e4D9b627AB518'
const party = '0xd5E660a33Ce6D17Aa6584bF1a4DA50B495962df0'
// const missionWood_v1 = '0x722f3afA275Ce7e063e02Ef04A1B3cA3c58a917e'
// const missionWood_v105 = '0x6ed6f83192e224780B853E2c9A7d1930Cc8f075a'
const missionWood = '0x2D083C753b527083a4710323Afe92028Ab33c43e'

const BBQFieldsAncientForrest = ({ config, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, cmdsV2ABI, uplevelCMDSABI, fieldWoodBBQABI, partyABI, missionCMDBaseABI, missionWoodABI }) => {
    const { address } = useAccount()
    const [inputName, setInputName] = React.useState("")
    const [nft, setNft] = React.useState([])
    const [woodBalance, setWoodBalance] = React.useState(0)
    const [missionAmount, setMissionAmount] = React.useState(0)

    const [partySelected, setPartySelected] = React.useState(0)
    const [isBaseCmdDelegate1, setIsBaseCmdDelegate1] = React.useState(null)
    const [woodCap1, setWoodCap1] = React.useState(0)
    const [party1Fee, setParty1Fee] = React.useState(0)
    const [nextDayParty1, setNextDayParty1] = React.useState(0)
    const [isBaseCmdDelegate2, setIsBaseCmdDelegate2] = React.useState(null)
    const [woodCap2, setWoodCap2] = React.useState(0)
    const [party2Fee, setParty2Fee] = React.useState(0)
    const [nextDayParty2, setNextDayParty2] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        setNft([])

        const thefetch = async () => {
            const nftGenesis = address !== null && address !== undefined ? await readContract(config, {
                address: CMDS,
                abi: cmdsV2ABI,
                functionName: 'mynft',
                args: [address],
            }) : 0
            const nftIndex = Number(ethers.BigNumber.from(String(nftGenesis)).mod(ethers.BigNumber.from(String(10000000000000000000))))

            const data = address !== null && address !== undefined ? await readContracts(config, {
                contracts: [
                    {
                        address: CMDS,
                        abi: cmdsV2ABI,
                        functionName: 'ownerOf',
                        args: [String(ethers.BigNumber.from(String(10000000000000000000)).add(ethers.BigNumber.from(String(nftIndex))))],
                    },
                    {
                        address: CMDS,
                        abi: cmdsV2ABI,
                        functionName: 'ownerOf',
                        args: [String(ethers.BigNumber.from(String(10000010000000000000)).add(ethers.BigNumber.from(String(nftIndex))))],
                    },
                    {
                        address: CMDS,
                        abi: cmdsV2ABI,
                        functionName: 'ownerOf',
                        args: [String(ethers.BigNumber.from(String(10000020000000000000)).add(ethers.BigNumber.from(String(nftIndex))))],
                    },
                    {
                        address: CMDS,
                        abi: cmdsV2ABI,
                        functionName: 'ownerOf',
                        args: [String(ethers.BigNumber.from(String(10000030000000000000)).add(ethers.BigNumber.from(String(nftIndex))))],
                    },
                    {
                        address: CMDS,
                        abi: cmdsV2ABI,
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
                const data2 = await readContracts(config, {
                    contracts: [
                        {
                            address: CMDS,
                            abi: cmdsV2ABI,
                            functionName: 'tokenURI',
                            args: [String(yournftstake[i].Id)],
                        },
                        {
                            address: CMDS,
                            abi: cmdsV2ABI,
                            functionName: 'nftData',
                            args: [String(nftGenesis)],
                        },
                        {
                            address: fieldWood,
                            abi: fieldWoodBBQABI,
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
                    expMax = 30
                    hashRate = 10
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000001) {
                    level = 1
                    expMax = 900
                    hashRate = 15
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000002) {
                    level = 2
                    expMax = 3200
                    hashRate = 20
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000003) {
                    level = 3
                    expMax = 10800
                    hashRate = 25
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000004) {
                    level = 4
                    expMax = 28800
                    hashRate = 30
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
                const data3 = await readContracts(config, {
                    contracts: [
                        {
                            address: CMDS,
                            abi: cmdsV2ABI,
                            functionName: 'tokenURI',
                            args: [yournftwallet[i].Id],
                        },
                        {
                            address: CMDS,
                            abi: cmdsV2ABI,
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
                    expMax = 30
                    hashRate = 10
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000001) {
                    level = 1
                    expMax = 900
                    hashRate = 15
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000002) {
                    level = 2
                    expMax = 3200
                    hashRate = 20
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000003) {
                    level = 3
                    expMax = 10800
                    hashRate = 25
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000004) {
                    level = 4
                    expMax = 28800
                    hashRate = 30
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
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            const woodBal = address !== null && address !== undefined ? await readContract(config, {
                address: fieldWood,
                abi: fieldWoodBBQABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            const dataParty = await readContracts(config, {
                contracts: [
                    {
                        address: missionBaseCmd,
                        abi: missionCMDBaseABI,
                        functionName: 'startBlock',
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'partyBody',
                        args: [1],
                    },
                    {
                        address: party,
                        abi: partyABI,
                        functionName: 'partyBody',
                        args: [2],
                    },
                    {
                        address: missionWood,
                        abi: missionWoodABI,
                        functionName: 'routerState',
                        args: [1],
                    },
                    {
                        address: missionWood,
                        abi: missionWoodABI,
                        functionName: 'routerState',
                        args: [2],
                    },
                    {
                        address: missionWood,
                        abi: missionWoodABI,
                        functionName: 'baseCapacity',
                        args: [1],
                    },
                    {
                        address: missionWood,
                        abi: missionWoodABI,
                        functionName: 'baseCapacity',
                        args: [2],
                    },
                ],
            })

            const isParty1Delegate = Number(dataParty[1].result[5]) - Number(dataParty[0].result) > 0
            const party1Router = dataParty[3].result
            const party1FullCap = dataParty[5].status === 'success' ? dataParty[5].result : 0
            const isParty2Delegate = Number(dataParty[2].result[5]) - Number(dataParty[0].result) > 0
            const party2Router = dataParty[4].result
            const party2FullCap = dataParty[6].status === 'success' ? dataParty[6].result : 0

            return [nfts, woodBal, isParty1Delegate, party1Router, party1FullCap, isParty2Delegate, party2Router, party2FullCap, ]
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
            setWoodBalance(ethers.utils.formatEther(String(result[1])))
            setIsBaseCmdDelegate1(result[2])
            const _nextDayParty1 = new Date((Number(result[3][0]) * 1000) + (86400 * 1000))
            if (Date.now() <= _nextDayParty1 && Number(result[3][0]) !== 0) {
                setNextDayParty1(_nextDayParty1.toLocaleString('es-CL'))
                setWoodCap1(Number(ethers.utils.formatEther(String(result[3][2]))))
            } else {
                setNextDayParty1('now')
                setWoodCap1(Number(ethers.utils.formatEther(String(result[4]))))
            }
            setParty1Fee(Number(result[3][1]) / 100);

            setIsBaseCmdDelegate2(result[5])
            const _nextDayParty2 = new Date((Number(result[6][0]) * 1000) + (86400 * 1000))
            if (Date.now() <= _nextDayParty2 && Number(result[6][0]) !== 0) {
                setNextDayParty2(_nextDayParty2.toLocaleString('es-CL'))
                setWoodCap2(Number(ethers.utils.formatEther(String(result[6][2]))))
            } else {
                setNextDayParty2('now')
                setWoodCap2(Number(ethers.utils.formatEther(String(result[7]))))
            }
            setParty2Fee(Number(result[6][1]) / 100)
        })

    }, [config, address, txupdate, cmdsV2ABI, uplevelCMDSABI, fieldWoodBBQABI, partyABI, missionCMDBaseABI, missionWoodABI ])

    const mintServant = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: CMDS,
                abi: cmdsV2ABI,
                functionName: 'mintServant',
                args: [1, inputName],
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

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: CMDS,
                abi: cmdsV2ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== fieldWood.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: CMDS,
                    abi: cmdsV2ABI,
                    functionName: 'approve',
                    args: [fieldWood, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: fieldWood,
                abi: fieldWoodBBQABI,
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

    const unstakeNft = async (_nftid, _uplevel, _toLv) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: fieldWood,
                abi: fieldWoodBBQABI,
                functionName: 'unstake',
                args: [_nftid, true],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
            setisLoading(false)
            if (_uplevel) {
                uplevelNft(_nftid, _toLv)
            }
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const missionHarvestHandle = async (_nftid) => {
        setisLoading(true)
        try {
            const woodAllow = await readContract(config, {
                address: fieldWood,
                abi: fieldWoodBBQABI,
                functionName: 'allowance',
                args: [address, missionWood],
            })
            if (woodAllow < ethers.utils.parseEther(String(10**12))) {
                let { request } = await simulateContract(config, {
                    address: fieldWood,
                    abi: fieldWoodBBQABI,
                    functionName: 'approve',
                    args: [missionWood, ethers.utils.parseEther(String(10**12))],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: missionWood,
                abi: missionWoodABI,
                functionName: 'mintViaGCS',
                args: [partySelected, _nftid, true],
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

    const uplevelNft = async (_nftid, _toLv) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: CMDS,
                abi: cmdsV2ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== uplevelCMDS.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: CMDS,
                    abi: cmdsV2ABI,
                    functionName: 'approve',
                    args: [uplevelCMDS, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: uplevelCMDS,
                abi: uplevelCMDSABI,
                functionName: 'uplevelServant',
                args: [_toLv, _nftid],
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
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeib5stifg5jcqqxsy4kbwwb6xovei5biyspuzhlwrsng4i62ppwpwy')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                <div className="pixel" style={{fontSize: "65px", width: "fit-content", padding: "0 10px"}}>Ancient Forest</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake CommuDAO Servant to earn $WOOD</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="150" alt="$WOOD" />
            </div>
        </div>

        <div style={{margin: "0", paddingTop: "30px", alignItems: "flex-start", justifyContent: 'space-between'}} className="collection">
            <div style={{width: "95%", minHeight: "120px", height: "fit-content", margin: "10px", padding: "20px", fontSize: "10px", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}} className="nftCard">                
                <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around"}} className="bold">
                    <div style={{marginBottom: "20px"}}>WOOD [BBQ-CHAIN] BALANCE</div>
                    <div style={{fontSize: "24px"}}>
                        {nft.length > 0 ? Number(woodBalance).toLocaleString('en-US', {maximumFractionDigits:1}) : 0}
                        <img style={{marginLeft: "10px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="24" alt="$WOOD"/>
                    </div>
                </div>
            </div>
            <div style={{minWidth: '50%', margin: "40px 0 80px 0", display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap"}}>
                {nft.length > 0 ?
                    <>
                        {nft[0] !== null ?
                            <>
                                {nft.map((item, index) => (
                                    <>
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
                                                    <div>EXP : {Number(item.Exp >= 1 ? item.Exp - 1 : 0).toLocaleString('en-US', {maximumFractionDigits:0})}/{item.ExpMax} ({(((item.Exp >= 1 ? item.Exp - 1 : 0) * 100) / item.ExpMax) >= 100 ? "MAX" : (((item.Exp >= 1 ? item.Exp - 1 : 0) * 100) / item.ExpMax).toFixed(3).concat("%")})</div>
                                                </div>
                                                {item.isStaked ?
                                                    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                                                        {(((item.Exp - 1) * 100) / item.ExpMax) >= 100 && item.ExpMax !== 28800 ?
                                                            <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#67BAA7", fontSize: "16px"}} className="pixel button" onClick={() => {unstakeNft(item.Id, true, item.Level + 1)}}>LEVEL UP</div> :
                                                            <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", fontSize: "16px"}} className="pixel button">LEVEL UP</div>
                                                        }
                                                    </div> :
                                                    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                                                        <div style={{lineHeight: 2, height: "fit-content", textAlign: "center"}} className="pixel button" onClick={() => {stakeNft(item.Id)}}>STAKE</div>
                                                        {(((item.Exp - 1) * 100) / item.ExpMax) >= 100 && item.ExpMax !== 28800 ?
                                                            <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#67BAA7", fontSize: "16px"}} className="pixel button" onClick={() => {uplevelNft(item.Id, item.Level + 1)}}>LEVEL UP</div> :
                                                            <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", fontSize: "16px"}} className="pixel button">LEVEL UP</div>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                            <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                                                <div style={{lineHeight: 2, fontSize: "12px", textAlign: "left",}} className="bold">
                                                    Pending Rewards
                                                    <div style={{fontSize: "10px"}} className="emp">EXP: +{Number(item.RewardWood).toLocaleString('en-US', {maximumFractionDigits:1})}</div>
                                                    <div style={{fontSize: "10px"}} className="emp"><img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="12" alt="$WOOD"/> {Number(item.RewardWood).toLocaleString('en-US')}</div>
                                                </div>
                                                {item.RewardWood > 0 ?
                                                    <div style={{lineHeight: 2, height: "fit-content", marginTop: "5px"}} className="pixel button" onClick={() => {unstakeNft(item.Id, false, 0)}}>HARVEST</div> :
                                                    <div style={{lineHeight: 2, height: "fit-content", marginTop: "5px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">HARVEST</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px", height: "500px"}}>
                                            <div style={{width: "100%", textAlign: "left"}} className='pixel emp'>
                                                SELECT DEDICATED PARTY TO MISSION HARVEST
                                            </div>
                                            <div style={{height: "80%", overflow: "scroll"}} className="pixel">
                                                <div 
                                                    style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: partySelected === 1 ? "rgb(0, 227, 180)" : "transparent"}} 
                                                    onClick={() => {
                                                        setPartySelected(1) 
                                                        if (Number(item.RewardWood) > Number(woodCap1)) {
                                                            setMissionAmount(woodCap1)
                                                        } else {
                                                            setMissionAmount(item.RewardWood * 100)
                                                        }
                                                    }}
                                                >
                                                    <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df" }}>
                                                        <div>{(woodCap1 > 0 && isBaseCmdDelegate1) ? <>🟢</> : <>⚪️</>} <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmbhy3KWwCqhR83636HHhbkuG9Csr8CEZZoeteySmGjmTq" width="12" alt="Can not load metadata."/> CMD Hunter</div>
                                                        <div>FEE: {party1Fee}%</div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                                        <div></div>
                                                        <div>REMAIN CAP: <span style={{color: "#000"}}>{Number(woodCap1).toLocaleString('en-US', {maximumFractionDigits:1})}</span> $WOOD</div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                                        <div></div>
                                                        <div>RESET ON: {nextDayParty1}</div>
                                                    </div>
                                                </div>
                                                <div 
                                                    style={{marginTop: "10px", padding: "10px", border: "1px solid", cursor: "pointer", background: partySelected === 2 ? "rgb(0, 227, 180)" : "transparent"}} 
                                                    onClick={() => {
                                                        setPartySelected(2) 
                                                        if (Number(item.RewardWood) > Number(woodCap2)) {
                                                            setMissionAmount(woodCap2)
                                                        } else {
                                                            setMissionAmount(item.RewardWood * 100)
                                                        }
                                                    }}
                                                >
                                                    <div style={{width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                                        <div>{(woodCap2 > 0 && isBaseCmdDelegate2) ? <>🟢</> : <>⚪️</>} <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qmd2VSk22fKTBvx7oWQVBzGbPdANuacfrLSBFTHMMiTgWJ" width="12" alt="Can not load metadata."/> CAPY-Party</div>
                                                        <div>FEE: {party2Fee}%</div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                                        <div></div>
                                                        <div>REMAIN CAP: <span style={{color: "#000"}}>{Number(woodCap2).toLocaleString('en-US', {maximumFractionDigits:1})}</span> $WOOD</div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "320px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                                        <div></div>
                                                        <div>RESET ON: {nextDayParty2}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pixel" style={{width: "100%", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                <div className='emp'>
                                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="12" alt="$WOOD"/> + EXP
                                                    &nbsp;{partySelected === 1 && Number((missionAmount *  party1Fee) / 100).toLocaleString('en-US', {maximumFractionDigits:1})}{partySelected === 2 && Number((missionAmount *  party2Fee) / 100).toLocaleString('en-US', {maximumFractionDigits:1})}
                                                </div>
                                                {Number(missionAmount) > 0 && address !== null && address !== undefined ? 
                                                    <div style={{maxHeight: "10px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", borderRadius: "0", fontSize: "12px"}} className="button" onClick={() => missionHarvestHandle(item.Id)}>MISSION HARVEST</div> : 
                                                    <div style={{maxHeight: "10px", maxWidth: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", background: "rgb(206, 208, 207)", border: "2px solid", borderColor: "rgb(255, 255, 255) rgb(5, 6, 8) rgb(5, 6, 8) rgb(255, 255, 255)", textShadow: "rgb(255, 255, 255) 1px 1px", borderRadius: "0", color: "rgb(136, 140, 143)", cursor: "not-allowed", fontSize: "12px"}} className="button">MISSION HARVEST</div>
                                                }
                                            </div>
                                        </div>
                                    </>
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