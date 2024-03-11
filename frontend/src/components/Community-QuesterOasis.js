import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { Oval } from 'react-loading-icons'

const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'

const jaspToken = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const quest01 = '0x3eB35884e8811188CCe3653fc67A3876d810E582'
const kyc = '0xfB046CF7dBA4519e997f1eF3e634224a9BFf5A2E'
const jusdtToken = '0x24599b658b57f91E7643f4F154B16bcd2884f9ac'
const pvp01 = '0x11af8eD1783Be1a0Eb6Da5C3Bc11Fb5Cc29C9463'
const questAmbass = '0x467eF538C90434D4F69cF8A8F40cd71a96e8424e'
const questBBQ = '0x26504b691f702a2CB4D5Df89243eB5fccf76B982'
const bbqLab = '0x9D73C97edC9489935B2dF250a097917d4860C60e'
const ender = '0x44C846780E6c36bA26a33D121F9069AF967937e4'
const farmJdao = "0x6B25033c2B4F5594809cBEf9F625771a2574C1a6"

const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const QuesterOasis = ({ setisLoading, txupdate, setTxupdate, erc20ABI, kycABI, quest01ABI, pvp01ABI, questBBQABI, questAmbassABI, bbqLab01ABI, enderPotteryABI, dunCopperABI, dunJasperABI, farmJdaoABI, cmdaoNameABI }) => {
    const { address } = useAccount()

    const [canClaimSIL, setCanClaimSIL] = React.useState(null)
    const [rewardSIL, setRewardSIL] = React.useState(0)

    const [isKYC, setIsKYC] = React.useState(null)
    const [ambass, setAmbass] = React.useState("")
    const [frens, setFrens] = React.useState(0)
    const [isJoin, setIsJoin] = React.useState(null)

    const [canClaimBBQ, setCanClaimBBQ] = React.useState(null)
    const [nextClaimBBQ, setNextClaimBBQ] = React.useState(null)
    const [gmStreak, setGmStreak] = React.useState(0)

    const [rank, setRank] = React.useState([])
    const [rank2, setRank2] = React.useState([])
    const [rank3, setRank3] = React.useState([])
    const [rank4, setRank4] = React.useState([])

    React.useEffect(() => {      
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const jusdtSC = new ethers.Contract(jusdtToken, erc20ABI, providerJBC)
        const enderSC = new ethers.Contract(ender, enderPotteryABI, providerJBC)
        
        const thefetch = async () => {
            const spend1Filter = await jusdtSC.filters.Transfer(null, "0x39C623C4B3f11D38f06Adca9B794CFb2d37581e3", null)
            const spend1Event = await jusdtSC.queryFilter(spend1Filter, 2814066, 'latest')
            const spend1Map = await Promise.all(spend1Event.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))

            const spend2Filter = await jusdtSC.filters.Transfer(null, "0x87A612709b36b575103C65a90cB3B16Cac2BC898", null)
            const spend2Event = await jusdtSC.queryFilter(spend2Filter, 2814066, 'latest')
            const spend2Map = await Promise.all(spend2Event.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))

            const spend3Filter = await jusdtSC.filters.Transfer(null, "0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D", null)
            const spend3Event = await jusdtSC.queryFilter(spend3Filter, 2814066, 'latest')
            const spend3Map = await Promise.all(spend3Event.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))

            const spend4Filter = await jusdtSC.filters.Transfer(null, "0xb8Cc909AD8245eD551bC359b721f3748dA814A33", null)
            const spend4Event = await jusdtSC.queryFilter(spend4Filter, 2814066, 'latest')
            const spend4Map = await Promise.all(spend4Event.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value) * 0.1)}}))

            const spend5Filter = await jusdtSC.filters.Transfer(null, "0x87BAC0BCBaadF9B7d24385b1AaaEbeDEb60a1A0a", null)
            const spend5Event = await jusdtSC.queryFilter(spend5Filter, 2814066, 'latest')
            const spend5Map = await Promise.all(spend5Event.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))

            const spend6Filter = await jusdtSC.filters.Transfer(null, "0x8E4D620a85807cBc588C2D6e8e7229968C69E1C5", null)
            const spend6Event = await jusdtSC.queryFilter(spend6Filter, 2814066, 'latest')
            const spend6Map = await Promise.all(spend6Event.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))

            const spend7Filter = await jusdtSC.filters.Transfer(null, "0x09e6a0A03afa27438c3f507de82b5f6061Ae1643", null)
            const spend7Event = await jusdtSC.queryFilter(spend7Filter, 2814066, 'latest')
            const spend7Map = await Promise.all(spend7Event.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))

            const spendAllMerged = spend1Map.concat(spend2Map, spend3Map, spend4Map, spend5Map, spend6Map, spend7Map).reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                   prev[curr.from.toUpperCase()].value += curr.value
                } else {
                   prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: jaspToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: pvp01,
                        abi: pvp01ABI,
                        functionName: 'userInfo',
                        args: [address],
                    },
                    {
                        address: quest01,
                        abi: quest01ABI,
                        functionName: 'questComplete',
                        args: [address],
                    },
                    {
                        address: kyc,
                        abi: kycABI,
                        functionName: 'kyc',
                        args: [0, address],
                    },
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'frenCount',
                        args: [address],
                    },
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'registIndex',
                        args: [address],
                    },
                    {
                        address: questBBQ,
                        abi: questBBQABI,
                        functionName: 'questComplete',
                        args: [address],
                    },
                    {
                        address: questBBQ,
                        abi: questBBQABI,
                        functionName: 'questLastStamp',
                        args: [address],
                    },
                    {
                        address: bbqLab,
                        abi: bbqLab01ABI,
                        functionName: 'supplier',
                        args: [address],
                    },
                ],
            }) : [0, {win: 0}, 0, false, 0, 0, 0, 0, {laststamp: 0},  ]
            
            const jaspBal = data[0]
            const reward = data[1].win - data[2]
            const _isKYC = data[3]
            const _frens = Number(data[4])
            const _isJoin = Number(data[5]) !== 0 ? true : false
            const _gmStreak = Number(data[6])

            const _canClaimSIL = ethers.utils.formatUnits(jaspBal, "gwei") >= 0.1 ? true : false
            const _canClaimBBQ = Date.now() > (data[7] * 1000) + (3600 * 24 * 1000) ? true : false
            const _nextClaimBBQ = new Date((data[7] * 1000) + (3600 * 24 * 1000))

            const data2_0 = await readContract({
                address: questAmbass,
                abi: questAmbassABI,
                functionName: 'registCount',
            })
            const rankerDummy = []
            for (let i = 1; i <= Number(data2_0); i++) {
                rankerDummy.push(null)
            }

            const data2_00 = await readContracts({
                contracts: rankerDummy.map((item, i) => (
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'referalData',
                        args: [i+1]
                    }
                ))
            })
            const data2_001 = await readContracts({
                contracts: data2_00.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item.fren]
                    }
                ))
            })
            const data2_002 = await readContracts({
                contracts: data2_00.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item.ambassador]
                    }
                ))
            })
            const data2_0011 = await readContracts({
                contracts: data2_001.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item]
                    }
                ))
            })
            const data2_0022 = await readContracts({
                contracts: data2_002.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item]
                    }
                ))
            })
            const ranker = []
            const mover = []
            for (let i = 0; i <= data2_00.length - 1; i++) {
                ranker.push(data2_00[i].fren)
                mover.push(data2_00[i].ambassador)
            }

            const data2_01 = await readContracts({
                contracts: ranker.map((item) => (
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [1, item],
                    }
                )),
            })
            const data2_02 = await readContracts({
                contracts: ranker.map((item) => (
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [3, item],
                    }
                )),
            })
            const data2_1 = await readContracts({
                contracts: ranker.map((item) => (
                    {
                        address: quest01,
                        abi: quest01ABI,
                        functionName: 'questComplete',
                        args: [item],
                    }
                )),
            })
            const data2_2 = await readContracts({
                contracts: ranker.map((item) => (
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'frenCount',
                        args: [item],
                    }
                )),
            })
            const data2_3 = await readContracts({
                contracts: ranker.map((item) => (
                    {
                        address: questBBQ,
                        abi: questBBQABI,
                        functionName: 'questComplete',
                        args: [item],
                    }
                )),
            })
            const enderFilter = await enderSC.filters.Participants(null, null, null)
            const enderEvent = await enderSC.queryFilter(enderFilter, 200737, 'latest')
            const enderMap = await Promise.all(enderEvent.map(async (obj, index) => {return {from: String(obj.args.participant), value: 1}}))
            const enderAllMerged = spend1Map.concat(enderMap).reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                   prev[curr.from.toUpperCase()].value += curr.value
                } else {
                   prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})
            const enderRemoveDup = ranker.map((item) => ({from: item, value: 0}))
            for (let i = 0; i <= enderRemoveDup.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(enderAllMerged).length -1; i2++) {
                    if (enderRemoveDup[i].from.toUpperCase() === Object.values(enderAllMerged)[i2].from.toUpperCase()) {
                        enderRemoveDup[i] = Object.values(enderAllMerged)[i2]
                    }
                }
            }
            const data2 = ranker.map((item, i) => {return {addr: item, name: data2_0011[i] === null ? item.slice(0, 4) + "..." + item.slice(-4) : data2_0011[i], cmxp: ((data2_1[i] * 100) + (data2_2[i] * 500) + (data2_3[i] * 5) + (enderRemoveDup[i].value * 5) + (Number(ethers.utils.formatEther(data2_01[i].amount)).toFixed(0) * 500) + (Number(ethers.utils.formatEther(data2_02[i].amount)).toFixed(0) * 1000))}})

            const data3_1 = await readContracts({
                contracts: ranker.map((item) => (
                    {
                        address: dunCopper,
                        abi: dunCopperABI,
                        functionName: 'nftEquip',
                        args: [item],
                    }
                )),
            })
            const data3_2 = await readContracts({
                contracts: ranker.map((item) => (
                    {
                        address: dunJasper,
                        abi: dunJasperABI,
                        functionName: 'nftEquip',
                        args: [item],
                    }
                )),
            })
            const data3 = ranker.map((item, i) => {return {addr: item, name: data2_0011[i] === null ? item.slice(0, 4) + "..." + item.slice(-4) : data2_0011[i], cmpow: Number(data3_1[i].allPow) + Number(data3_2[i].allPow)}})

            const spendRemoveDup = []
            for (let i = 0; i <= ranker.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(spendAllMerged).length -1; i2++) {
                    if (ranker[i].toUpperCase() === Object.values(spendAllMerged)[i2].from.toUpperCase()) {
                        Object.values(spendAllMerged)[i2].name = data2_0011[i] === null ? Object.values(spendAllMerged)[i2].from.slice(0, 4) + "..." + Object.values(spendAllMerged)[i2].from.slice(-4) : data2_0011[i]
                        console.log(Object.values(spendAllMerged)[i2])
                        spendRemoveDup.push(Object.values(spendAllMerged)[i2])
                    }
                }
            }

            const moverVal = []
            for (let i = 0; i <= spendRemoveDup.length - 1; i++) {
                for (let i2 = 0; i2 <= ranker.length -1; i2++) {
                    if (spendRemoveDup[i].from.toUpperCase() === ranker[i2].toUpperCase()) {
                        moverVal.push({addr: mover[i2], name: data2_0022[i2] === null ? mover[i2].slice(0, 4) + "..." + mover[i2].slice(-4) : data2_0022[i2], value: spendRemoveDup[i].value})
                    }
                }
            }

            const moverValMerged = moverVal.reduce((prev, curr) => {
                if (prev[curr.addr.toUpperCase()]) {
                   prev[curr.addr.toUpperCase()].value += curr.value
                } else {
                   prev[curr.addr.toUpperCase()] = curr
                }
                return prev
            }, {})

            return [
                _canClaimSIL, reward, _isKYC, _frens, _isJoin, _canClaimBBQ, _nextClaimBBQ, _gmStreak, data2, data3, spendRemoveDup, Object.values(moverValMerged),
            ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setCanClaimSIL(result[0])
            setRewardSIL(result[1])
            setIsKYC(result[2])
            setFrens(result[3])
            setIsJoin(result[4])
            setCanClaimBBQ(result[5])
            setNextClaimBBQ(result[6])
            setGmStreak(result[7])
            setRank(result[8])
            setRank2(result[9])
            setRank3(result[10])
            setRank4(result[11])
        })

    }, [address, txupdate, erc20ABI, kycABI, quest01ABI, questAmbassABI, questBBQABI, pvp01ABI, bbqLab01ABI, enderPotteryABI, dunCopperABI, dunJasperABI, farmJdaoABI, cmdaoNameABI])

    const claimSILHandle = async () => {
        setisLoading(true)
        try {
            const jaspAllow = await readContract({
                address: jaspToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, quest01],
            })
            if (jaspAllow < 100000000) {
                const config = await prepareWriteContract({
                    address: jaspToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [quest01, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config2 = await prepareWriteContract({
                address: quest01,
                abi: quest01ABI,
                functionName: 'claim',
            })
            const tx = await writeContract(config2)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const joinHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: questAmbass,
                abi: questAmbassABI,
                functionName: 'regist',
                args: [ambass],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const gmHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: questBBQ,
                abi: questBBQABI,
                functionName: 'claim',
                args: [0, 0, address],
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
        <>
            <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>Quester Oasis</div>
                    <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">QUEST BOARD IS NOW LIVE ON CMDAO CITY!</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                </div>
            </div>

            <div style={{background: "rgb(0, 19, 33)", width: "100%", padding: "25px 0 75px 0", minHeight: "inherit", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll pixel">
                <div style={{padding: "50px", margin: "50px 0", background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(20px)", border: "none", minWidth: "880px", width: "70%", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", fontSize: "16px"}} className="nftCard">
                    <div style={{fontSize: "40px", color: "#fff"}}>March 2024 Prize Pool 🎁</div>
                    <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                        <div style={{width: "220px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                            <div>Top Questers</div>
                            <div>7,954.00 CMJ</div>
                        </div>
                        <div style={{width: "220px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                            <div>Top Strongest</div>
                            <div>7,954.00 CMJ</div>
                        </div>
                        <div style={{width: "220px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                            <div>Top Spender</div>
                            <div>7,954.00 CMJ</div>
                        </div>
                        <div style={{width: "220px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                            <div>Top Money Mover</div>
                            <div>7,954.00 CMJ</div>
                        </div>
                    </div>
                    <div style={{color: "#fff"}}>Snapshot on the last block of the month before 0.00 AM.<br></br>Rewards will allocated to top 20 for each leaderboard.</div>
                    <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                        <div style={{width: "250px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                            <div>Top 1-3</div>
                            <div>40% of prize pool</div>
                        </div>
                        <div style={{width: "250px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                            <div>Top 4-10</div>
                            <div>30% of prize pool</div>
                        </div>
                        <div style={{width: "250px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                            <div>Top 11-20</div>
                            <div>30% of prize pool</div>
                        </div>
                    </div>
                </div>

                <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                    <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "350px", width: "20%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                        <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Questers 🗺️</div>
                        {rank.length > 0 ?
                            <>
                                {rank[0] !== null ?
                                    <div style={{width: "100%"}}>
                                        {rank.slice(0).sort((a, b) => {return b.cmxp-a.cmxp}).map((item, index) => (
                                            <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                    <div>{index+1}</div>
                                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.addr} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                </div>
                                                <div>{item.cmxp} CMXP</div>
                                            </div>
                                        ))}
                                    </div> :
                                    <></>
                                }
                            </> :
                            <div style={{width: "100%", height: "inherit"}}>
                                <Oval stroke="#ff007a" strokeWidth="5px" />
                            </div>
                        }
                    </div>

                    <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "350px", width: "20%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                        <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Strongest 💥</div>
                        {rank2.length > 0 ?
                            <>
                                {rank2[0] !== null ?
                                    <div style={{width: "100%"}}>
                                        {rank2.slice(0).sort((a, b) => {return b.cmpow-a.cmpow}).map((item, index) => (
                                            <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                    <div>{index+1}</div>
                                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.addr} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                </div>
                                                <div>{item.cmpow} CMPOW</div>
                                            </div>
                                        ))}
                                    </div> :
                                    <></>
                                }
                            </> :
                            <div style={{width: "100%", height: "inherit"}}>
                                <Oval stroke="#ff007a" strokeWidth="5px" />
                            </div>
                        }
                    </div>

                    <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "350px", width: "20%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                        <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Spender 💰</div>
                        {rank3.length > 0 ?
                            <>
                                {rank3[0] !== null ?
                                    <div style={{width: "100%", height: "inherit"}}>
                                        {rank3.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                            <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                    <div>{index+1}</div>
                                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.from} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                </div>
                                                <div>{Number(item.value).toFixed(2)} USDT</div>
                                            </div>
                                        ))}
                                    </div> :
                                    <></>
                                }
                            </> :
                            <div style={{width: "100%", height: "inherit"}}>
                                <Oval stroke="#ff007a" strokeWidth="5px" />
                            </div>
                        }
                    </div>

                    <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "350px", width: "20%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                        <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Money Mover 💸</div>
                        {rank4.length > 0 ?
                            <>
                                {rank4[0] !== null ?
                                    <div style={{width: "100%", height: "inherit"}}>
                                        {rank4.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                            <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                    <div>{index+1}</div>
                                                    <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.addr} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                </div>
                                                <div>{Number(item.value).toFixed(2)} USDT</div>
                                            </div>
                                        ))}
                                    </div> :
                                    <></>
                                }
                            </> :
                            <div style={{width: "100%", height: "inherit"}}>
                                <Oval stroke="#ff007a" strokeWidth="5px" />
                            </div>
                        }
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", marginTop: "50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "450px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "140px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>5 CMXP</div>
                        <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>Daily</div>
                    </div>
                    <div style={{width: "100%", paddingBottom: "10px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">Let's Cook BBQ!</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{height: "320px", marginRight: "40px"}}>
                            <img src="https://nftstorage.link/ipfs/bafybeiafc4qxgwqackmdqif6eboyffg356rtwtpil7frz4m3ren3b7ztim" height="300" alt="GM_Quest"/>
                        </div>
                        <div style={{width: "65%", height: "300px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <div className="bold">REWARDS</div>
                                <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                    <div style={{marginRight: "10px", color: "#fff"}}>5</div>
                                    <img src="https://nftstorage.link/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="30px" alt="$BBQ"/>
                                </div>
                            </div>
                            <div>
                                <div className="bold">QUEST DETAIL</div>
                                <div style={{marginTop: "10px", color: "#fff", fontSize: "16px"}} className="bold">Craft a $BBQ in LABS and say GM!</div>
                                <div style={{marginTop: "20px", fontSize: "16px"}} className="bold">GM STREAKS: {gmStreak}</div>
                            </div>
                            {canClaimBBQ ?
                                <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={gmHandle}>GM</div> :
                                <div style={{color: "rgb(0, 227, 180)"}} className="bold emp">Next to say GM in {nextClaimBBQ !== null ? nextClaimBBQ.toLocaleString('es-CL') : "..."}</div>
                            }
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", marginTop: "50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "450px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "190px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>5 CMXP</div>
                        <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>Repeatable</div>
                    </div>
                    <div style={{width: "100%", paddingBottom: "10px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">Play Ender Pottery</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{height: "320px", marginRight: "40px"}}>
                            <img src="https://nftstorage.link/ipfs/bafybeic7noacvyhmlrca7g3sdiu2rgwxvdnp6zflrgukz2d3uizi727o4i" height="300" alt="Ender_Quest"/>
                        </div>
                        <div style={{width: "65%", height: "300px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                            </div>
                            <div>
                                <div className="bold">QUEST DETAIL</div>
                                <div style={{marginTop: "10px", color: "#fff", fontSize: "16px"}} className="bold">Insert 1 JBC to be a participants of each epoch on <a style={{textDecoration: "none", color: "red"}} href="https://enderapp.vercel.app/" target="_blank" rel="noreferrer">Ender Pottery</a></div>
                            </div>
                            <div style={{color: "rgb(0, 227, 180)"}} className="bold emp"></div>
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "450px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "200px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>100 CMXP</div>
                        <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>Repeatable</div>
                    </div>
                    <div style={{width: "100%", paddingBottom: "10px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">The Strongest That Survive</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{height: "320px", marginRight: "40px"}}>
                            <img src="https://nftstorage.link/ipfs/bafybeidezamomag3kp3guyisqe3qihrvydkdbt5et3zsxtep5cgtb3lqqu" height="300" alt="PVP_Quest"/>
                        </div>
                        <div style={{width: "65%", height: "300px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <div className="bold">REWARDS</div>
                                <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                    <div style={{marginRight: "10px", color: "#fff"}}>1,500</div>
                                    <img src="https://nftstorage.link/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" height="30px" alt="$SILL"/>
                                </div>
                            </div>
                            <div>
                                <div className="bold">QUEST DETAIL</div>
                                <div style={{marginTop: "10px", color: "#fff", fontSize: "16px"}} className="bold">Win in one-hit fight to any challenger in Dungeon Arena</div>
                                <div style={{marginTop: "10px", color: "#fff", fontSize: "16px"}} className="bold">(Required 0.1 GWEI $JASP for each claim)</div>
                                <div style={{marginTop: "20px", fontSize: "16px"}} className="bold">Your Claimable Rewards : {1500 * rewardSIL} $SIL</div>
                            </div>
                            {canClaimSIL ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                    <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={claimSILHandle}>CLAIM REWARD</div>
                                </div> :
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} className="bold emp">You are not eligible to claim</div>
                            }
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "450px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "160px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>500 CMXP</div>
                        <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>Once</div>
                    </div>
                    <div style={{width: "100%", paddingBottom: "10px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">How To Win Frens!</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{height: "320px", marginRight: "40px"}}>
                            <img src="https://nftstorage.link/ipfs/bafybeih32r7vflml3gjxeblqucqrkhj4lzwr3ngv6cocaucctfdb4ttupa" height="300" alt="PVP_Quest"/>
                        </div>
                        <div style={{width: "65%", height: "300px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <div className="bold">Your Invited Frens</div>
                                <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                    <div style={{marginRight: "10px", color: "#fff"}}>{frens} 👽</div>
                                </div>
                            </div>
                            <div>
                                <div className="bold">QUEST DETAIL</div>
                                <div style={{marginTop: "10px", color: "#fff", fontSize: "16px"}} className="bold">Invite your friends to join and get reward!</div>
                            </div>
                            {isJoin ?
                                <div style={{width: "fit-content", color: "rgb(0, 227, 180)", borderRadius: "12px", border: "1px solid rgb(0, 227, 180)", padding: "15px 40px"}} className="bold">You have already joined CMDAO club 🎉</div> :
                                <>
                                    {isKYC ?
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                            <input style={{width: "250px", padding: "10px 40px", fontSize: "18px"}} className="bold" type="string" placeholder="Enter Your Referer" value={ambass} onChange={(event) => {setAmbass(event.target.value)}}></input>
                                            <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={joinHandle}>Join CMDAO Club</div>
                                        </div> :
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} className="emp bold">You must KYC first!</div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuesterOasis