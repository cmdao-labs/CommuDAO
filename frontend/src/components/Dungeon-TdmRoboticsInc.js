import React from 'react'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { ethers } from 'ethers'
import { ThreeDots, Oval } from 'react-loading-icons'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const dunEE = '0xF663c756b6D57724C3B41c8839aB9c7Af83c9751'
const iiLab = '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241'
const narutaNft = '0x5e620d8980335167d9ef36cef5d9a6ea6607a8cb'
const uniEnchanter = '0x2A7F88d4eACD6dbE8C255B54F8015eF40F5cfDE2'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const questAmbass = '0x467eF538C90434D4F69cF8A8F40cd71a96e8424e'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const TdmRoboticsInc = ({ config, setisLoading, navigate, callMode, txupdate, setTxupdate, setisError, setErrMsg, uniEnchanterABI, erc721Abi, erc20Abi, questAmbassABI, cmdaoNameABI, dunEEABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    const [nft, setNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [iiBalance, setIiBalance] = React.useState(0)
    const [eeBalance, setEeBalance] = React.useState(0)
    const [rank, setRank] = React.useState([])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const narutaNftSC = new ethers.Contract(narutaNft, erc721Abi, providerJBC)

        const thefetch = async () => {
            let walletRemoveDup = []
            if (address !== null) {
                const walletFilter = await narutaNftSC.filters.Transfer(null, address, null)
                const walletEvent = await narutaNftSC.queryFilter(walletFilter, 2852393, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data = address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: cmjToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: dunEE,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: iiLab,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, {result: 0}, ]

            const cmjBal = data[1].result
            const eeBal = data[2].result
            const iiBal = data[3].result
            const nftbal = data[0].result
            let count = 0
            let nfts = []
            let yournft = []
            const data2 = address !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: narutaNft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [item],
                        chainId: 8899
                    }
                ))
            }) : null
            for (let i = 0; i <= walletRemoveDup.length - 1 && count < nftbal && address !== null; i++) {
                if (data2[i].result.toUpperCase() === address.toUpperCase()) {
                    yournft.push({Id: String(walletRemoveDup[i])})
                    count++
                }
            }
            for (let i = 0; i <= yournft.length - 1; i++) {
                const nftipfs = await readContract(config, {
                    address: narutaNft,
                    abi: erc721Abi,
                    functionName: 'tokenURI',
                    args: [yournft[i].Id],
                    chainId: 8899
                })
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                const bonus = Number(String(yournft[i].Id).slice(-5))
                nfts.push({
                    Id: Number(yournft[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: bonus,
                    Count: null
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            const data2_0 = await readContract(config, {
                address: questAmbass,
                abi: questAmbassABI,
                functionName: 'registCount',
                chainId: 8899
            })
            const rankerDummy = []
            for (let i = 1; i <= Number(data2_0); i++) {
                rankerDummy.push(null)
            }
            const data2_00 = await readContracts(config, {
                contracts: rankerDummy.map((item, i) => (
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'referalData',
                        args: [i+1],
                        chainId: 8899
                    }
                ))
            })
            const nameArr = []
            for (let i = 0; i <= Number(data2_00.length - 1); i++) {
                nameArr.push(data2_00[i].result[0])
            }
            const data2_001 = await readContracts(config, {
                contracts: nameArr.map((item) => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item],
                        chainId: 8899
                    }
                ))
            })
            const nameArr2 = []
            for (let i = 0; i <= Number(nameArr.length - 1); i++) {
                nameArr2.push(Number(data2_001[i].result))
            }
            const data2_0011 = await readContracts(config, {
                contracts: nameArr2.map((item) => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item],
                        chainId: 8899
                    }
                ))
            })
            const nameArr3 = []
            for (let i = 0; i <= Number(nameArr.length - 1); i++) {
                nameArr3.push(data2_0011[i].result)
            }
            const nftSTAT = await readContracts(config, {
                contracts: nameArr.map((item) => (
                    {
                        address: dunEE,
                        abi: dunEEABI,
                        functionName: 'nftStatus',
                        args: [item],
                        chainId: 8899
                    }
                )),
            })
            const tdmpow = []
            for (let i = 0; i <= Number(nameArr.length - 1); i++) {
                tdmpow.push(Number(nftSTAT[i].result[7]))
            }
            const dataSuperPower = nameArr.map((item, i) => {
                return {
                    addr: item,
                    name: nameArr3[i] !== undefined ? nameArr3[i] : item.slice(0, 4) + "..." + item.slice(-4),
                    tdmxp: tdmpow[i]
                }}
            )
            if (dataSuperPower.length === 0) { dataSuperPower.push(null) }

            return [nfts, cmjBal, iiBal, eeBal, dataSuperPower]
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
            setCmjBalance(ethers.utils.formatEther(String(result[1])))
            setIiBalance(ethers.utils.formatEther(String(result[2])))
            setEeBalance(ethers.utils.formatEther(String(result[3])))

            setRank(result[4])
        })

    }, [config, address, erc20Abi, erc721Abi, questAmbassABI, cmdaoNameABI, dunEEABI, txupdate])

    const enchantHandle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        let token1 = iiLab
        let token2 = dunEE
        let token1Amount = 8888
        let token2Amount = 481800
        try {
            const cmjAllow = await readContract(config, {
                address: cmjToken,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, uniEnchanter],
            })
            if (cmjAllow < (1 * 10**18)) {
                let { request } = await simulateContract(config, {
                    address: cmjToken,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [uniEnchanter, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const token1Allow = await readContract(config, {
                address: token1,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, uniEnchanter],
            })
            if (Number(ethers.utils.formatEther(token1Allow)) < token1Amount) {
                let { request } = await simulateContract(config, {
                    address: token1,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [uniEnchanter, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const token2Allow = await readContract(config, {
                address: token2,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, uniEnchanter],
            })
            if (Number(ethers.utils.formatEther(token2Allow)) < token2Amount) {
                let { request } = await simulateContract(config, {
                    address: token2,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [uniEnchanter, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const nftAllow = await readContract(config, {
                address: narutaNft,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== uniEnchanter.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: narutaNft,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [uniEnchanter, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: uniEnchanter,
                abi: uniEnchanterABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid],
                gas: 3000000,
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
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>TDM Robotics Inc.</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="https://gateway.commudao.xyz/ipfs/bafybeigac5ws4lgz5pqdt45bdyiqrhsbohguyqng6d7jxsed2c5m3dehe4" height="230" alt="TDM-ROBOTICS-INC" />
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
                <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                    <div style={{maxWidth: "100%", textAlign: "left", marginTop: "50px", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <div style={{width: "250px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Tokens</div>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll pixel">
                            <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                                <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                                <div style={{marginLeft: "10px"}}>{Number(cmjBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                            <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                                <img src="https://gateway.commudao.xyz/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q" width="22" alt="$II"/>
                                <div style={{marginLeft: "10px"}}>{Number(iiBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                            <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                                <img src="https://gateway.commudao.xyz/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm" width="22" alt="$EE"/>
                                <div style={{marginLeft: "10px"}}>{Number(eeBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: "left", margin: "20px 0 40px 0", minHeight: "600px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <div style={{padding: "50px", backdropFilter: "blur(20px)", border: "none", width: "940px", maxWidth: "75%", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", fontSize: "14px"}} className="nftCard">
                            <div style={{width: "98%", fontSize: "30px"}}>Leaderboard</div>
                            <div style={{width: "98%", marginTop: "10px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                                <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                    <div>Top TAO Superpower</div>
                                    <div />
                                </div>
                            </div>
                            <div style={{width: "98%", marginTop: "10px"}}>Snapshot on the last block of the month before 0.00 AM.</div>
                        </div>

                        <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                            <div style={{padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "335px", width: "25%", height: "700px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                                <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top TAO Superpower</div>
                                {rank.length > 0 ?
                                    <>
                                        {rank[0] !== null &&
                                            <div style={{width: "100%", minHeight: "550px"}}>
                                                {rank.slice(0).sort((a, b) => {return b.tdmxp-a.tdmxp}).map((item, index) => (
                                                    <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                        <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                            <div>{index+1}</div>
                                                            <a style={{textDecoration: "none", color: "#000", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/cryptic-cogs/" + item.addr} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                        </div>
                                                        <div>{item.tdmxp} CMPOW</div>
                                                    </div>
                                                ))}
                                            </div>
                                        } 
                                    </> :
                                    <div style={{width: "100%", height: "inherit"}}>
                                        <Oval stroke="#ff007a" strokeWidth="5px" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: "left", marginBottom: "80px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <div style={{marginTop: "20px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Upgradable NFTs</div>
                        {nft !== undefined && nft.length > 0 ?
                            <>
                                {nft[0] !== null ?
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                        {nft.map((item, index) => (
                                            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                                {/*
                                                ███╗░░██╗░█████╗░██████╗░██╗░░░██╗████████╗░█████╗░  ░░░██╗░██╗░░█████╗░░░███╗░░
                                                ████╗░██║██╔══██╗██╔══██╗██║░░░██║╚══██╔══╝██╔══██╗  ██████████╗██╔══██╗░████║░░
                                                ██╔██╗██║███████║██████╔╝██║░░░██║░░░██║░░░███████║  ╚═██╔═██╔═╝██║░░██║██╔██║░░
                                                ██║╚████║██╔══██║██╔══██╗██║░░░██║░░░██║░░░██╔══██║  ██████████╗██║░░██║╚═╝██║░░
                                                ██║░╚███║██║░░██║██║░░██║╚██████╔╝░░░██║░░░██║░░██║  ╚██╔═██╔══╝╚█████╔╝███████╗
                                                ╚═╝░░╚══╝╚═╝░░╚═╝╚═╝░░╚═╝░╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝  ░╚═╝░╚═╝░░░░╚════╝░╚══════╝
                                                */}
                                                {(String(item.Id).slice(0, 3) === "100" || String(item.Id).slice(0, 3) === "700" || String(item.Id).slice(0, 3) === "300" || String(item.Id).slice(0, 3) === "200" || String(item.Id).slice(0, 3) === "600" || String(item.Id).slice(0, 3) === "400" || String(item.Id).slice(0, 3) === "500") && Number(item.Id) % 100000 !== 72800 &&
                                                    <div style={{justifyContent: "space-around", padding: "30px", marginRight: "40px"}} className="nftCard">
                                                        <div className="emp pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name}</div>
                                                            </div>
                                                            <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                            {Number(item.Id) % 100000 === 18800 &&
                                                                <div>
                                                                    <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name} +1</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 22800 &&
                                                                <div>
                                                                    <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 26800 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "100" && <img src='https://gateway.commudao.xyz/ipfs/bafybeichx3l6sfsqot3gbk3hzhlbmupsani25zh57dd4ymxwse7mlrfdgy' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiefq2r3t5z7d5yt6gwbckkr2qvrgdgjgd4g764d25nficw2knnrai' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeign7h3qhvt3lgconngdstzlwexyo3hgulntvlygvpqzqbgu3haeem' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeif4amlgguwmct6dkcu6whcrbrz4lxir6tvyvuxp5dwi6vdoft3zgi' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeieljlh4zog6hzjvktizkb6xdswswzxys7rlj4xm7fp47ytizglxpi' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiem3jns3i4lkot6hqe5zxpwj6cnvojukggplenmtsnenqitnk6wki' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeieckgtj7nitlnjoiwgy4bzmnnponwlr2h7delw5pfueruz73ztvy4' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 30800 &&
                                                                <div>
                                                                    <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 36800 &&
                                                                <div>
                                                                    <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 42800 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "100" && <img src='https://gateway.commudao.xyz/ipfs/bafybeidlmxivvz4k3ws2kpanq3nob7himsgzagna7sgxxaopcgigvxyove' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafybeihi5ty2pn5b3hridcszupaelj2lm4y5fctfirrp4f5457puemrdsa' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeidcqi7ca55k67oeslkcrdqvgs4qul63ezjg6mq542buik4kl6vz7q' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeifriz3jssqcl7uzwjexv3chn56awmnmvjklmgdy5uabaovhqlwmwy' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiad4vswhlfjemiylp5r4mlghz4tqag6dn7bimnd5qysnkidlaieai' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeifi34uh6hsohnd47wfcynesrwmxot63c65vj4rnwqsc74sjdb7vke' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeidkvucspmzjq635okuui5raaozne5bsm7i73cynztbwqlc5uso27u' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 48800 &&
                                                                <div>
                                                                    <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 56800 &&
                                                                <div>
                                                                    <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 64800 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "100" && <img src='https://gateway.commudao.xyz/ipfs/bafybeici6yhhom3u4unmxfiquzgp6f5iod46pz6mwsyujnseeu5szhwdfq' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafybeibrg3peklun2ednncyqftjduu64atrckm5qqdx5dlk5io6rjetxei' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeica72phth3kgec4f66t6zla7qu5wgbmezjuvt6ic4sr6zasyy6b6q' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiflj5c5xdevsg5odxepmqrvtpvukntaudqcahrtjwl6fdaeyauiny' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeig5hgcjimmkvjanskq6aofpmkhufarvnthqbddekeuygwpofewh2m' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeienx6ko3j7mptpootmcdt556z5hud5jyq4vgwibmnxvpmlacsvdvq' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeicf6zi22f5nrurejd26qp7vcqq7bjuiil4jya3276qnvpn27mxtwq' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}9</div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            {Number(item.Id) % 100000 === 18800 &&
                                                                <>
                                                                    <div>
                                                                        <div>Level 0</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>Level 1</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec + 4000} cmpow per sec</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 22800 &&
                                                                <>
                                                                    <div>
                                                                        <div>Level 1</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>Level 2</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec + 4000} cmpow per sec</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 26800 &&
                                                                <>
                                                                    <div>
                                                                        <div>Level 2</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>Level 3</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec + 4000} cmpow per sec</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 30800 &&
                                                                <>
                                                                    <div>
                                                                        <div>Level 3</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>Level 4</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec + 6000} cmpow per sec</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 36800 &&
                                                                <>
                                                                    <div>
                                                                        <div>Level 4</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>Level 5</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec + 6000} cmpow per sec</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 42800 &&
                                                                <>
                                                                    <div>
                                                                        <div>Level 5</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>Level 6</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec + 6000} cmpow per sec</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 48800 &&
                                                                <>
                                                                    <div>
                                                                        <div>Level 6</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>Level 7</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec + 8000} cmpow per sec</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 56800 &&
                                                                <>
                                                                    <div>
                                                                        <div>Level 7</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>Level 8</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec + 8000} cmpow per sec</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 64800 &&
                                                                <>
                                                                    <div>
                                                                        <div>Level 8</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>Level 9</div>
                                                                        <div style={{width: "150px"}}>{item.RewardPerSec + 8000} cmpow per sec</div>
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                        <div style={{marginTop: "10px", width: "350px"}}>
                                                            <div className="pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                                Enchanted resource
                                                            </div>
                                                            <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q" height="18" alt="$II"/>
                                                                <div style={{margin: "0 5px"}}>
                                                                    {Number(item.Id) % 100000 === 18800 && '888'}
                                                                    {Number(item.Id) % 100000 === 22800 && '1,888'}
                                                                    {Number(item.Id) % 100000 === 26800 && '2,888'}
                                                                    {Number(item.Id) % 100000 === 30800 && '3,888'}
                                                                    {Number(item.Id) % 100000 === 36800 && '4,888'}
                                                                    {Number(item.Id) % 100000 === 42800 && '5,888'}
                                                                    {Number(item.Id) % 100000 === 48800 && '6,888'}
                                                                    {Number(item.Id) % 100000 === 56800 && '7,888'}
                                                                    {Number(item.Id) % 100000 === 64800 && '8,888'}
                                                                </div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm" height="18" alt="$EE"/>
                                                                <div style={{margin: "0 5px"}}>
                                                                    {Number(item.Id) % 100000 === 18800 && '18,800'}
                                                                    {Number(item.Id) % 100000 === 22800 && '28,800'}
                                                                    {Number(item.Id) % 100000 === 26800 && '42,800'}
                                                                    {Number(item.Id) % 100000 === 30800 && '63,800'}
                                                                    {Number(item.Id) % 100000 === 36800 && '95,800'}
                                                                    {Number(item.Id) % 100000 === 42800 && '142,800'}
                                                                    {Number(item.Id) % 100000 === 48800 && '214,800'}
                                                                    {Number(item.Id) % 100000 === 56800 && '321,800'}
                                                                    {Number(item.Id) % 100000 === 64800 && '481,800'}
                                                                </div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                <div style={{margin: "0 5px"}}>1</div>
                                                            </div>
                                                        </div>
                                                        <div className="pixel" style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate :&nbsp;
                                                                {String(item.Id).slice(0, 3) === "100" && '1/1'}
                                                                {String(item.Id).slice(0, 3) !== "100" && (Number(item.Id) % 100000 === 18800 || Number(item.Id) % 100000 === 22800 || Number(item.Id) % 100000 === 26800) && '1/1'}
                                                                {String(item.Id).slice(0, 3) !== "100" && (Number(item.Id) % 100000 === 30800 || Number(item.Id) % 100000 === 36800 || Number(item.Id) % 100000 === 42800) && '1/2'}
                                                                {String(item.Id).slice(0, 3) !== "100" && (Number(item.Id) % 100000 === 48800 || Number(item.Id) % 100000 === 56800) && '1/3'}
                                                                {String(item.Id).slice(0, 3) !== "100" && (Number(item.Id) % 100000 === 64800) && '1/4'}
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                        <div
                                                            style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                            className="pixel button"
                                                            onClick={() => {
                                                                let arg = null
                                                                if (Number(item.Id) % 100000 === 18800) {
                                                                    arg = 1
                                                                } else if (Number(item.Id) % 100000 === 22800) {
                                                                    arg = 2
                                                                } else if (Number(item.Id) % 100000 === 26800) {
                                                                    arg = 3
                                                                } else if (Number(item.Id) % 100000 === 30800) {
                                                                    arg = 4
                                                                } else if (Number(item.Id) % 100000 === 36800) {
                                                                    arg = 5
                                                                } else if (Number(item.Id) % 100000 === 42800) {
                                                                    arg = 6
                                                                } else if (Number(item.Id) % 100000 === 48800) {
                                                                    arg = 7
                                                                } else if (Number(item.Id) % 100000 === 56800) {
                                                                    arg = 8
                                                                } else if (Number(item.Id) % 100000 === 64800) {
                                                                    arg = 9
                                                                }
                                                                let ind = null
                                                                if (String(item.Id).slice(0, 3) === "100") {
                                                                    ind = 0
                                                                } else if (String(item.Id).slice(0, 3) === "700") {
                                                                    ind = 100
                                                                } else if (String(item.Id).slice(0, 3) === "500") {
                                                                    ind = 200
                                                                } else if (String(item.Id).slice(0, 3) === "200") {
                                                                    ind = 300
                                                                } else if (String(item.Id).slice(0, 3) === "300") {
                                                                    ind = 400
                                                                } else if (String(item.Id).slice(0, 3) === "600") {
                                                                    ind = 500
                                                                } else if (String(item.Id).slice(0, 3) === "400") {
                                                                    ind = 600
                                                                }
                                                                enchantHandle(item.Id, 200000 + ind + arg)
                                                            }}
                                                        >
                                                            UPGRADE
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </div> :
                                    <>
                                        {address !== null ?
                                            <div className="nftCard" style={{justifyContent: "center"}}>
                                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fas fa-scroll"></i>
                                                <div className="bold">No NFTs equipment to upgrade.</div>
                                            </div> :
                                            <div className="nftCard" style={{justifyContent: "center"}}>
                                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                <div className="bold">Please connect wallet to view your NFTs.</div>
                                            </div>
                                        }
                                    </>
                                }
                            </> :
                            <div style={{width: "300px", padding: "20px", margin: "20px"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default TdmRoboticsInc