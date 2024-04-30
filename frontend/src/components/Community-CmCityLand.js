import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const wood = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const cu = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const os = '0xAc5299D92373E9352636559cca497d7683A47655'

const cmdaoNft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'

const land = '0x90B3a1F21D1C0BE9A8B6a6AA129066951AF63B72'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const house = '0xCb3AD565b9c08C4340A7Fe857c38595587843139'
const houseStaking = '0x2eF9d702c42BC0F8B9D7305C34B4f63526502255'

//const jusdt = '0x24599b658b57f91e7643f4f154b16bcd2884f9ac'
//const wlMkp = '0x8E4D620a85807cBc588C2D6e8e7229968C69E1C5'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const CmCityLand = ({ setisLoading, txupdate, setTxupdate, navigate, intrasubModetext, erc20ABI, erc721ABI, cmdaoNameABI, slot1ABI, houseABI, houseStakingABI, wlMkpABI }) => {
    const { address } = useAccount()
    
    let code = ''
    if (intrasubModetext.slice(0, 1).toUpperCase() === 'Z') {
        code = '26'
    } else if (intrasubModetext.slice(0, 1).toUpperCase() === 'A') {
        code = '01'
    } else if (intrasubModetext.slice(0, 1).toUpperCase() === 'B') {
        code = '02'
    } else if (intrasubModetext.slice(0, 1).toUpperCase() === 'C') {
        code = '03'
    }
    const houseId = '100' + code + '0' + intrasubModetext.slice(1, 3)
    const [mode, setMode] = React.useState(0)
    const [llAddr, setLlAddr] = React.useState(null)
    const [llName, setLlName] = React.useState('...')
    const [slot1Addr, setSlot1Addr] = React.useState(null)
    const [slot1Owner, setSlot1Owner] = React.useState('...')
    const [slot1Lv, setSlot1Lv] = React.useState(0)
    const [nft, setNft] = React.useState([])

    const [osPool, setOsPool] = React.useState(null)
    const [allPendingReward, setAllPendingReward] = React.useState(0)
    const [allPow, setAllPow] = React.useState(0)
    const [nftStake, setNftStake] = React.useState([])

    React.useEffect(() => {        
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(cmdaoNft, erc721ABI, providerJBC)
        
        const thefetch = async () => {
            const data = await readContracts({
                contracts: [
                    {
                        address: land,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotOwner',
                        args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
                    },
                    {
                        address: slot1,
                        abi: slot1ABI,
                        functionName: 'slotLevel',
                        args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
                    },
                    {
                        address: os,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [houseStaking],
                    },
                ],
            }) 
            
            const landOwner = data[0].result
            const slot1owner = data[1].result
            const slot1level = data[2].result
            const ospool = data[3].result

            const id = data[0].status === 'success' && data[1].status === 'success' ? await readContracts({
                contracts: [
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [landOwner],
                    },
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [slot1owner],
                    }
                ],
            }) : [0, 0]
            const id0 = id[0].result
            const id1 = id[1].result
            const landlordname = id[0].status === 'success' && id[1].status === 'success' ? await readContracts({
                contracts: [
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [Number(id0)],
                    },
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [Number(id1)],
                    }
                ],
            }) : [0, 0]

            let nftstake = []

            const stakeFilter = await cmdaonftSC.filters.Transfer(slot1owner, houseStaking, null)
            const stakeEvent = await cmdaonftSC.queryFilter(stakeFilter, 2549069, "latest")
            const stakeMap = await Promise.all(stakeEvent.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const data0 = await readContracts({
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: houseStaking,
                        abi: houseStakingABI,
                        functionName: 'nftStake',
                        args: [1, String(item)],
                    }
                ))
            })

            let yournftstake = []
            for (let i = 0; i <= stakeRemoveDup.length - 1; i++) {
                if (data0[i].result[0].toUpperCase() === slot1owner.toUpperCase()) {
                    yournftstake.push({Id: String(stakeRemoveDup[i])})
                }
            }

            const data1 = await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: cmdaoNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            })

            const data12 = await readContracts({
                contracts: yournftstake.map((item) => (
                    {
                        address: houseStaking,
                        abi: houseStakingABI,
                        functionName: 'pendingReward',
                        args: [1, String(item.Id)],
                    }
                ))
            })

            let _allReward1 = 0
            let _allPow = 0
            for (let i = 0; i <= yournftstake.length - 1; i++) {
                const nftipfs = data1[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/"))
                    nft = await response.json()
                } catch {}
                _allReward1 += Number(ethers.utils.formatEther(data12[i].result))
                _allPow += Number(String(yournftstake[i].Id).slice(-5))

                nftstake.push({
                    Id: yournftstake[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerBlock: Number(String(yournftstake[i].Id).slice(-5)),
                    isStaked: true,
                    Reward: Number(ethers.utils.formatEther(data12[i].result)),
                })
            }

            let nfts = []

            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdaoNft,
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
                        address: cmdaoNft,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                const response = await fetch(nftipfs.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/"))
                const nft = await response.json()

                nfts.push({
                    Col: 1,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            return [landOwner, slot1owner, landlordname, slot1level, nfts, ospool, _allReward1, _allPow, nftstake, ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setLlAddr(result[0])
            setSlot1Addr(result[1])
            result[2][0].status === 'success' ? setLlName(result[2][0].result) : setLlName('Unknown')
            result[2][1].status === 'success' ? setSlot1Owner(result[2][1].result) : setSlot1Owner('Unknown')
            setSlot1Lv(Number(result[3]))
            setNft(result[4])
            setOsPool(ethers.utils.formatEther(String(result[5])))
            setAllPendingReward(result[6])
            setAllPow(result[7])
            setNftStake(result[8])
        })

    }, [address, code, intrasubModetext, txupdate, erc20ABI, erc721ABI, cmdaoNameABI, slot1ABI, houseStakingABI])

    const upgradeHouseHandle = async (_level) => {
        setisLoading(true)
        try {
            let woodUsage = 0
            let cuUsage = 0
            if (_level === 1) {
                woodUsage = 100000000
                cuUsage = 50000
            } else if (_level === 2) {
                woodUsage = 200000000
                cuUsage = 100000
            } else if (_level === 3) {
                woodUsage = 400000000
                cuUsage = 200000
            } else if (_level === 4) {
                woodUsage = 800000000
                cuUsage = 400000
            } else if (_level === 5) {
                woodUsage = 1600000000
                cuUsage = 800000
            }
            const woodAllow = await readContract({
                address: wood,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, house],
            })
            if (woodAllow < (woodUsage * 10**18)) {
                const config = await prepareWriteContract({
                    address: wood,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [house, ethers.utils.parseEther(String(10**9))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const cuAllow = await readContract({
                address: cu,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, house],
            })
            if (cuAllow < (cuUsage * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: cu,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [house, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash02 } = await writeContract(config2)
                await waitForTransaction({ hash: hash02 })
            }
            if (_level === 1) {
                const config3 = await prepareWriteContract({
                    address: slot1,
                    abi: slot1ABI,
                    functionName: 'delegateOwner',
                    args: [0, address, houseId]
                })
                const { hash: hash1 } = await writeContract(config3)
                await waitForTransaction({ hash: hash1 })
            }
            const config4 = await prepareWriteContract({
                address: house,
                abi: houseABI,
                functionName: 'upgrade',
                args: [_level, houseId]
            })
            const { hash: hash04 } = await writeContract(config4)
            await waitForTransaction({ hash: hash04 })
            setTxupdate(hash04)
        } catch (e) {console.log(e)}
        setisLoading(false)
    }

    /*const registHouseHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: slot1,
                abi: slot1ABI,
                functionName: 'delegateOwner',
                args: [0, address, houseId]
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }*/

    const stakeNft = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: cmdaoNft,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== houseStaking.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: cmdaoNft,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [houseStaking, _nftid],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }        
            const config2 = await prepareWriteContract({
                address: houseStaking,
                abi: houseStakingABI,
                functionName: 'stake',
                args: [1, _nftid, houseId],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const unstakeNft = async (_nftid, _unstake) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: houseStaking,
                abi: houseStakingABI,
                functionName: 'unstake',
                args: [1, _nftid, houseId, _unstake],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    /*const claimLandHandle = async () => {
        setisLoading(true)
        let id = 0
        if (Number(houseId) === 10026002) {
            id = 4
        } else if (Number(houseId) === 10026006) {
            id = 5
        } else if (Number(houseId) === 10026011) {
            id = 6
        }
        try {
            const jusdtAllow = await readContract({
                address: jusdt,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, wlMkp],
            })
            if (jusdtAllow < (100000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdt,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [wlMkp, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: wlMkp,
                abi: wlMkpABI,
                functionName: 'buyItem',
                args: [id]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }*/

    return (
        <>
            <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}} className="pixel">
                    <div style={{fontSize: "75px", width: "fit-content"}}>Land {intrasubModetext.toUpperCase()} of {llName}</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                </div>
            </div>

            {mode === 0 &&
                <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "0", padding: "75px 0", minHeight: "inherit", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll">
                    <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", maxWidth: "70%", width: "880px", height: "420px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                        <div style={{maxWidth: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold" onClick={() => setMode(0)}>{slot1Owner}'S HOUSE LV.{slot1Lv}</div>
                        <div style={{width: "100%", display: "flex", flexFlow: "column wrap", justifyContent: "space-between"}}>
                            <div style={{width: "320px"}}>
                                {slot1Lv === 0 && <img src="https://cloudflare-ipfs.com/ipfs/bafybeielpogfiry6r54yhzalsu2wmrp37oergq7v7r4w2qoljsesy6eoom" style={{filter: "grayscale(1)"}} height="200" alt="HOUSE.LV.1" />}
                                {slot1Lv >= 1 && <img src="https://cloudflare-ipfs.com/ipfs/bafybeielpogfiry6r54yhzalsu2wmrp37oergq7v7r4w2qoljsesy6eoom" height="200" alt="HOUSE.LV.1" />}
                            </div>
                            <div style={{textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                <div>
                                    <div className="bold">UPGRADE COSTS</div>
                                    <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                        <img src="https://cloudflare-ipfs.com/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="30px" alt="$WOOD"/>
                                        <div style={{margin: "0 30px 0 10px"}}>
                                            {slot1Lv === 0 && '100M'}
                                            {slot1Lv === 1 && '200M'}
                                            {slot1Lv === 2 && '400M'}
                                            {slot1Lv === 3 && '800M'}
                                            {slot1Lv === 4 && '1,600M'}
                                            {slot1Lv === 5 && '3,200M'}
                                        </div>
                                        <img src="https://cloudflare-ipfs.com/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="30px" alt="$CU"/>
                                        <div style={{marginLeft: "10px"}}>
                                            {slot1Lv === 0 && '50,000'}
                                            {slot1Lv === 1 && '100,000'}
                                            {slot1Lv === 2 && '200,000'}
                                            {slot1Lv === 3 && '400,000'}
                                            {slot1Lv === 4 && '800,000'}
                                            {slot1Lv === 5 && '1,600,000'}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {llAddr !== null && String(llAddr).toUpperCase() === address.toUpperCase() &&
                                        <>
                                            {(slot1Lv !== 0 && slot1Lv !== 5)  &&
                                                <div 
                                                    style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", marginTop: "20px", color: "rgb(0, 26, 44)"}}
                                                    className="bold button" 
                                                    onClick={() => upgradeHouseHandle(slot1Lv + 1)}
                                                >
                                                    UPGRADE
                                                </div>
                                            }
                                            {slot1Lv === 0 ?
                                                <div 
                                                    style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", marginTop: "20px", color: "rgb(0, 26, 44)"}}
                                                    className="bold button" 
                                                    onClick={() => upgradeHouseHandle(1)}
                                                >
                                                    CONSTRUCT
                                                </div> :
                                                <>
                                                    {/*{slot1Addr.toUpperCase() !== address.toUpperCase() ?
                                                        <div 
                                                            style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", marginTop: "20px", color: "rgb(0, 26, 44)", fontSize: "12px"}}
                                                            className="bold button" 
                                                            onClick={registHouseHandle}
                                                        >
                                                            REGISTER HOUSE'S OWNER
                                                        </div> :
                                                        <></>
                                                    */}
                                                </>
                                            }
                                        </>                                   
                                    }
                                    {/*Number(houseId) === 10026011 &&
                                        <div 
                                            style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", marginTop: "20px", color: "rgb(0, 26, 44)", fontSize: "12px"}}
                                            className="bold button" 
                                            onClick={claimLandHandle}
                                        >
                                            CLAIM LAND
                                        </div>
                                    */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", height: "fit-content", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{background: "rgb(0, 26, 44)", border: "none", justifyContent: "space-around", padding: "30px", maxWidth: "100%", width: "1140px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "1px solid", boxShadow: "inset -2px -2px 0px 0.25px #00000040"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLEEP TO EARN</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="emp">
                                        {nftStake !== null && nftStake[0] !== undefined &&
                                            <>
                                                {nftStake[0].isStaked ?
                                                    <>
                                                        <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>On Staking</div>
                                                    </> :
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>TOTAL CMPOW PER SEC: <div>{allPow}</div></div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    OVERSOUL PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: "#ff007a"}}>
                                        <img src="https://cloudflare-ipfs.com/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="20" alt="$OS"/>
                                        <div style={{marginLeft: "5px"}}>{allPendingReward.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    AVAILABLE OS IN POOL
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://cloudflare-ipfs.com/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="20" alt="$OS"/>
                                        <div style={{marginLeft: "5px"}}>{Number(osPool).toFixed(3).toLocaleString()}</div>
                                    </div>
                                </div>
                                <div style={{height: "41px"}}></div>
                            </div>
                            <div className="noscroll" style={{position: "relative", width: "80%", height: "400px", display: "flex", flexWrap: "row wrap", alignItems: "center", justifyContent: "flex-start", overflow: "scroll"}}>
                                {nft.length > 0 ?
                                    <>
                                        {slot1Lv >= 1 &&
                                            <div style={{ display: "flex", flexDirection: "column"}}>
                                                {nftStake !== null && nftStake[0] !== undefined ?
                                                    <>
                                                        <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center"}}>{nftStake[0].Name}</div>
                                                        <img src={nftStake[0].Image} width="200px" alt="Can not load metadata." />
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[0].RewardPerBlock} cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[0].Reward).toFixed(4)} Pending $OS</div>
                                                        {address !== null && address !== undefined && slot1Addr !== null && slot1Addr !== undefined &&
                                                            <>
                                                                {address.toUpperCase() === slot1Addr.toUpperCase() &&
                                                                    <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                        {nftStake !== null && nftStake[0] !== undefined &&
                                                                            <>
                                                                                <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[0].Id, 0)}>HARVEST</div>
                                                                                <div className="button" onClick={() => unstakeNft(nftStake[0].Id, 1)}>HARVEST & UNSTAKE</div>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                    </> :
                                                    <>
                                                        <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>Main Char SLOT1</div>
                                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                        <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }
                                        {slot1Lv >= 2 && 
                                            <div style={{marginLeft: "20px", display: "flex", flexDirection: "column"}}>
                                                {nftStake !== null && nftStake[1] !== undefined ?
                                                    <>
                                                        <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center"}}>{nftStake[1].Name}</div>
                                                        <img src={nftStake[1].Image} width="200px" alt="Can not load metadata." />
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[1].RewardPerBlock} cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[1].Reward).toFixed(4)} Pending $OS</div>
                                                        {address !== null && address !== undefined && slot1Addr !== null && slot1Addr !== undefined &&
                                                            <>
                                                                {address.toUpperCase() === slot1Addr.toUpperCase() &&
                                                                    <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                        {nftStake !== null && nftStake[1] !== undefined &&
                                                                            <>
                                                                                <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[1].Id, 0)}>HARVEST</div>
                                                                                <div className="button" onClick={() => unstakeNft(nftStake[1].Id, 1)}>HARVEST & UNSTAKE</div>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                    </> :
                                                    <>
                                                        <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>Main Char SLOT2</div>
                                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                        <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }
                                        {slot1Lv >= 3 && 
                                            <div style={{marginLeft: "20px", display: "flex", flexDirection: "column"}}>
                                                {nftStake !== null && nftStake[2] !== undefined ?
                                                    <>
                                                        <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center"}}>{nftStake[2].Name}</div>
                                                        <img src={nftStake[2].Image} width="200px" alt="Can not load metadata." />
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[2].RewardPerBlock} cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[2].Reward).toFixed(4)} Pending $OS</div>
                                                        {address !== null && address !== undefined && slot1Addr !== null && slot1Addr !== undefined &&
                                                            <>
                                                                {address.toUpperCase() === slot1Addr.toUpperCase() &&
                                                                    <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                        {nftStake !== null && nftStake[2] !== undefined &&
                                                                            <>
                                                                                <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[2].Id, 0)}>HARVEST</div>
                                                                                <div className="button" onClick={() => unstakeNft(nftStake[2].Id, 1)}>HARVEST & UNSTAKE</div>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                    </> :
                                                    <>
                                                        <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>Main Char SLOT3</div>
                                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                        <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }
                                        {slot1Lv >= 4 && 
                                            <div style={{marginLeft: "20px", display: "flex", flexDirection: "column"}}>
                                                {nftStake !== null && nftStake[3] !== undefined ?
                                                    <>
                                                        <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center"}}>{nftStake[3].Name}</div>
                                                        <img src={nftStake[3].Image} width="200px" alt="Can not load metadata." />
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[3].RewardPerBlock} cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[3].Reward).toFixed(4)} Pending $OS</div>
                                                        {address !== null && address !== undefined && slot1Addr !== null && slot1Addr !== undefined &&
                                                            <>
                                                                {address.toUpperCase() === slot1Addr.toUpperCase() &&
                                                                    <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                        {nftStake !== null && nftStake[3] !== undefined &&
                                                                            <>
                                                                                <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[3].Id, 0)}>HARVEST</div>
                                                                                <div className="button" onClick={() => unstakeNft(nftStake[3].Id, 1)}>HARVEST & UNSTAKE</div>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                    </> :
                                                    <>
                                                        <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>Main Char SLOT4</div>
                                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                        <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }
                                        {slot1Lv >= 5 && 
                                            <div style={{marginTop: "20px", display: "flex", flexDirection: "column"}}>
                                                {nftStake !== null && nftStake[4] !== undefined ?
                                                    <>
                                                        <div style={{width: "fit-content", marginBottom: "15px", fontSize: "16px", textAlign: "center"}}>{nftStake[4].Name}</div>
                                                        <img src={nftStake[4].Image} width="200px" alt="Can not load metadata." />
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{nftStake[4].RewardPerBlock} cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>{Number(nftStake[4].Reward).toFixed(4)} Pending $OS</div>
                                                        {address !== null && address !== undefined && slot1Addr !== null && slot1Addr !== undefined &&
                                                            <>
                                                                {address.toUpperCase() === slot1Addr.toUpperCase() &&
                                                                    <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                                        {nftStake !== null && nftStake[4] !== undefined &&
                                                                            <>
                                                                                <div style={{background: "#67BAA7"}} className="button" onClick={() => unstakeNft(nftStake[4].Id, 0)}>HARVEST</div>
                                                                                <div className="button" onClick={() => unstakeNft(nftStake[4].Id, 1)}>HARVEST & UNSTAKE</div>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                    </> :
                                                    <>
                                                        <div style={{width: "200px", marginBottom: "15px", fontSize: "16px"}}>Main Char SLOT5</div>
                                                        <div style={{width: "200px", height: "200px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0 cmpow/block</div>
                                                        <div style={{width: "fit-content", marginTop: "10px", fontSize: "16px", textAlign: "center"}}>0.00 Pending $OS</div>
                                                        <div style={{width: "100%", height: "90px", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST</div>
                                                            <div style={{background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {address !== null && address !== undefined && slot1Addr !== null && slot1Addr !== undefined &&
                        <>
                            {address.toUpperCase() === slot1Addr.toUpperCase() &&
                                <>
                                    {nft.length > 0 ?
                                        <div style={{maxWidth: "100%", width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                            {nft[0] !== null ?
                                                <>
                                                    {nft.map((item, index) => (
                                                        <div key={index}>
                                                            {String(item.Id).slice(0, 1) === "1" && String(item.Id).length !== 13 &&
                                                                <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard">
                                                                    <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                                                        <img src={item.Image} height="100%" alt="Can not load metadata." />
                                                                    </div>
                                                                    <div className="emp bold">{item.Name}</div>
                                                                    <div className="bold">{item.RewardPerSec} cmpow per sec</div>
                                                                    <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                                                    <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                                                        {item.isStaked ?
                                                                            <div style={{background: "gray"}} className="pixel button" onClick={() => console.log('yo')}>UNEQUIP</div>:
                                                                            <div style={{alignSelf: "center"}} className="pixel button" onClick={() => stakeNft(item.Id)}>STAKE</div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    ))}
                                                </> :
                                                <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "20px", margin: "10px"}} className="nftCard">
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
                                        </div> :
                                        <div style={{width: "1640px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                                            <div className="nftCard" style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center"}}>
                                                <ThreeDots fill="#fff" />
                                                <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </>
                    }
                </div>
            }
        </>
    )
}

export default CmCityLand