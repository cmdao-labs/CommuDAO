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

const chatSC = '0x4c3216151BFb0b2c710B6bA7f86f4A01cEE540a2'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const pve01 = '0xABd4127c8058498A53E690b06a75aFAf0F1d4e86'
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const pzaToken = '0x09DcdCFc6C48803681a3422997c679E773656763'
const osToken = '0xAc5299D92373E9352636559cca497d7683A47655'

const FieldsAncientForrest = ({ setisLoading, txupdate, setTxupdate, erc721ABI, aurora721ABI, starterCMDSABI, uplevelCMDSABI, woodFieldABI, msgABI, cmdaoNameABI, pve01ABI, erc20ABI }) => {
    const { address } = useAccount()

    const [msg, setMsg] = React.useState("")
    const [chat, setChat] = React.useState([])
    const [monInfo01, setMonInfo01] = React.useState([0, 0, 0, 0, 0, 0, 0])
    const [userInfo01, setUserInfo01] = React.useState([])
    const [pzaBalance, setPzaBalance] = React.useState(0)

    const [inputName, setInputName] = React.useState("")
    const [nft, setNft] = React.useState([])

    const messagesEndRef = React.useRef(null);

    useContractEvent({
        address: pve01,
        abi: pve01ABI,
        eventName: 'Fight',
        listener(log) {
            console.log(log)
            let addr = log.slice(-1)[0].args.challenger
            let monindex = Number(log.slice(-1)[0].args.monIndex)
            
            if (addr.toUpperCase() === address.toUpperCase() && monindex === 1) {
                let youratk = Number(log.slice(-1)[0].args.hrate1) * Number(log.slice(-1)[0].args.random1)
                let monatk = Number(log.slice(-1)[0].args.hrate2) * Number(log.slice(-1)[0].args.random2)

                if (youratk > monatk) {
                    alert("You win 🎉 --- Your ATK: " + youratk + " VS. Monster ATK: " + monatk)
                } else if (youratk < monatk) {
                    alert("You lose 😂 --- Your ATK: " + youratk + " VS. Monster ATK: " + monatk)
                } else if (youratk === monatk) {
                    alert("Tie 🤝 --- Your ATK: " + youratk + " VS. Monster ATK: " + monatk)
                }
            }
        },
    })

    useContractEvent({
        address: chatSC,
        abi: msgABI,
        eventName: 'Message',
        listener(log) {
            if (Number(log.slice(-1)[0].args.index) === 1) {
                setTxupdate('yo')
            }
        },
    })

    React.useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth", block: 'end', inline: 'nearest'})
        }
    }, [chat])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        setNft([])
        const chatBox = new ethers.Contract(chatSC, msgABI, providerJBC)

        const thefetch = async () => {
            const block = await providerJBC.getBlockNumber()
            const chatFilter = await chatBox.filters.Message(null, null, 1, null,)
            const chatEvent = await chatBox.queryFilter(chatFilter, block - 5760, "latest")
            const chatMap = await Promise.all(chatEvent.map(async (obj) => {
                return {sender: String(obj.args.sender), message: String(obj.args.message), blockNumber: "@" + String(obj.blockNumber)}
            }))
            const senderArr = []
            for (let i = 0; i <= Number(chatMap.length - 1); i++) {
                senderArr.push(chatMap[i].sender)
            }
            const idName = await readContracts({
                contracts: senderArr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item]
                    }
                ))
            })
            const idArr = []
            for (let i = 0; i <= Number(idName.length - 1); i++) {
                idArr.push(idName[i].result)
            }
            const strName = await readContracts({
                contracts: idArr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item]
                    }
                ))
            })
            const strArr = []
            for (let i = 0; i <= Number(strName.length - 1); i++) {
                strArr.push(strName[i].result)
            }
            const chatFinal = chatMap.map((item, i) => {
                return {
                    sender: strArr[i] !== undefined ? strArr[i] : item.sender.slice(0, 4) + "..." + item.sender.slice(-4),
                    message: item.message,
                    blockNumber: item.blockNumber
                }
            })
            if (chatFinal.length === 0) { chatFinal.push(null) }

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

                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
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
                    hashRate = 10
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000002) {
                    level = 2
                    expMax = 320
                    hashRate = 20
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000003) {
                    level = 3
                    expMax = 1080
                    hashRate = 40
                } else if (Number((yournftstake[i].Id / 1e13).toFixed(0)) === 1000004) {
                    level = 4
                    expMax = 2880
                    hashRate = 80
                }

                nfts.push({
                    Id: String(yournftstake[i].Id),
                    Name: nftData[0],
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
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

                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
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
                    hashRate = 10
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000002) {
                    level = 2
                    expMax = 320
                    hashRate = 20
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000003) {
                    level = 3
                    expMax = 1080
                    hashRate = 40
                } else if (Number((yournftwallet[i].Id / 1e13).toFixed(0)) === 1000004) {
                    level = 4
                    expMax = 2880
                    hashRate = 80
                }

                nfts.push({
                    Id: String(yournftwallet[i].Id),
                    Name: nftData[0],
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
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

            const data3 = await readContracts({
                contracts: [
                    {
                        address: pve01,
                        abi: pve01ABI,
                        functionName: 'monData',
                        args: [1],
                    }
                ],
            })

            const monData01 = data3[0].result

            const data4 = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: pve01,
                        abi: pve01ABI,
                        functionName: 'userInfo',
                        args: [address],
                    },
                    {
                        address: pzaToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [{result: [0, 0]}, {result: 0} ]

            const userData01 = data4[0].result
            const pzaBal = data4[1].result

            return [nfts, chatFinal, monData01, userData01, pzaBal]
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
            setChat(result[1])
            setMonInfo01(result[2])
            setUserInfo01(result[3])
            setPzaBalance(ethers.utils.formatEther(result[4]))
        })

    }, [address, txupdate, erc721ABI, starterCMDSABI, uplevelCMDSABI, woodFieldABI, msgABI, cmdaoNameABI, pve01ABI, erc20ABI])

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

    const sendMsg = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: chatSC,
                abi: msgABI,
                functionName: 'sendMessage',
                args: ['0x0000000000000000000000000000000000000427', 1, msg],
                value: ethers.utils.parseEther('0.01'),
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
            setMsg('')
        } catch {}
        setisLoading(false)
    }

    const respawn01Handle = async (_index) => {
        setisLoading(true)
        try {
            const tokenAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, pve01],
            })
            if (tokenAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [pve01, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: pve01,
                abi: pve01ABI,
                functionName: 'respawn',
                args: [_index],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const hpup01Handle = async () => {
        setisLoading(true)
        try {
            const tokenAllow = await readContract({
                address: osToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, pve01],
            })
            if (tokenAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: osToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [pve01, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: pve01,
                abi: pve01ABI,
                functionName: 'healthPotion',
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const fight01Handle = async (_index) => {
        setisLoading(true)
        try {
            const tokenAllow = await readContract({
                address: pzaToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, pve01],
            })
            if (tokenAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: pzaToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [pve01, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config = await prepareWriteContract({
                address: pve01,
                abi: pve01ABI,
                functionName: 'fight',
                args: [nft[0].Id, _index],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", backgroundImage: "url('https://nftstorage.link/ipfs/bafybeib5stifg5jcqqxsy4kbwwb6xovei5biyspuzhlwrsng4i62ppwpwy')", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                <div className="pixel" style={{fontSize: "65px", width: "fit-content", padding: "0 10px"}}>Ancient Forest</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "15px", padding: "0 10px"}} className="pixel">Stake CommuDAO Servant to earn $WOOD & $CMJ.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="150" alt="$WOOD" />
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
                                                <div style={{fontSize: "10px"}} className="emp"><img src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="12" alt="$WOOD"/> {item.RewardWood}</div>
                                                <div style={{fontSize: "10px"}} className="emp"><img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="12" alt="$CMJ"/> {item.RewardCmj}</div>
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
                                        <img src="https://nftstorage.link/ipfs/bafkreiaqwsxafpj3acgdjmvn4hfodrhj5vdeq4cdiqtaaekpjiuamzcbhq" width="150" alt="Can not load metadata." />
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
                <div style={{justifyContent: "space-around", height: "500px", margin: '20px'}} className="nftCard">
                    <img src='https://bafybeiax35zfioffpmp3tlyjwdrz2dplldgm5qokqi5p3b76cmomtkfri4.ipfs.nftstorage.link/' width="150" alt="Can not load metadata." />
                    <div style={{width: 300, padding: "10px 20px", border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between", textAlign: "left"}} className="pixel">
                        <div style={{lineHeight: 2, fontSize: "14px", textAlign: "left",}}>
                            <div style={{color: "red"}}>Fishmon [Lv. 5]</div>
                            <div>Hash rate : {Number(monInfo01[1])}</div>
                            <div>Spawn : {Number(monInfo01[0])} / 1000</div>
                            <div style={{color: "gray"}}>(10 JDAO / respawn)</div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                            {Number(monInfo01[0]) === 0 ? 
                                <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", fontSize: "16px"}} className="pixel button" onClick={() => respawn01Handle(1)}>RESPAWN</div> :
                                <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", fontSize: "16px"}} className="pixel button">RESPAWN</div>
                            }
                        </div>
                    </div>
                    <div style={{width: 300, padding: "10px 20px", border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between", textAlign: "left"}} className="pixel">
                        <div style={{lineHeight: 2, fontSize: "14px", textAlign: "left",}}>
                            <div style={{color: "#000"}}>Your Status</div>
                            <div>Win : {Number(userInfo01[0])}</div>
                            <div>HP (Added OS) : {Number(userInfo01[1])}</div>
                            <div>Stamina (PZA bal.) : {Number(pzaBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                            <div style={{lineHeight: 2, height: "fit-content", marginTop: "25px", fontSize: "16px"}} className="pixel button" onClick={hpup01Handle}>HP UP</div>
                        </div>
                    </div>
                    <div style={{width: 300, padding: 20, border: "1px solid #dddade", borderRadius: 12, display: "flex", flexDirection: "row", alignItem: "center", justifyContent: "space-between"}}>
                        <div style={{lineHeight: 2, fontSize: "12px", textAlign: "left",}} className="bold">
                            Rewards
                            <div style={{fontSize: "14px"}}><img src="https://nftstorage.link/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa" width="12" alt="$PLAT"/> 1 per defeat</div>
                        </div>
                        {Number(monInfo01[0]) > 0 && Number(userInfo01[1]) > 0?
                            <div style={{lineHeight: 2, height: "fit-content", fontSize: "16px"}} className="pixel button" onClick={() => fight01Handle(1)}>ATTACK</div> :
                            <div style={{lineHeight: 2, height: "fit-content", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed", fontSize: "16px"}} className="pixel button">ATTACK</div>
                        }
                    </div>
                </div>
            </div>
            <div style={{minWidth: '400px', width: '25%', height: "100vh", padding: "20px", textAlign: "left", background: "#f7f5f8", display: "flex", flexDirection: "column", alignItems:"flex-start", justifyContent: "flex-start", fontSize: "16px"}}>
                <div style={{padding: "10px", width: "95%", height: "500px", background: "#fff", overflow: 'scroll'}}>
                    {chat.length > 0 ?
                        <>
                            {chat[0] !== null &&
                                <>
                                    {chat.map((item, index) => (
                                        <div style={{margin: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                    <div className="emp bold">{item.sender}</div>
                                                    <div style={{marginLeft: '10px', fontSize: '12px'}}>{item.blockNumber}</div>
                                                </div>
                                                <div ref={messagesEndRef} style={{padding: "10px", fontSize: "18px"}}>{item.message}</div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }
                        </> :
                        <Oval stroke="#ff007a" strokeWidth="5px" />
                    }
                </div>
                <div style={{width: "95%", marginTop: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <input style={{width: "70%", padding: "10px 20px"}} value={msg} onChange={(event) => setMsg(event.target.value)}></input>
                    <div style={{borderRadius: "12px", color: "#fff", marginLeft: "10px"}} className="bold button" onClick={sendMsg}>SEND</div>
                </div>
               
            </div>
        </div>
    </>
    )
}

export default FieldsAncientForrest