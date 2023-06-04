import React from 'react'
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const enchantN1 = '0xc272A216B90483dAcb823213134D12ee11eF91fA'
const enchantR = '0xeA32261d199a9C0458F431a885a1F1600bB58dEd'

const Npcblacksmith = ({ setisLoading, txupdate, setTxupdate, enchantNABI, enchantRABI, hexa721ABI, erc20ABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [jaspBalance, setJaspBalance] = React.useState(0)
    const [cuBalance, setCuBalance] = React.useState(0)

    React.useEffect(() => {      
        const thefetch = async () => {
            let nfts = []

            const res = address !== null && address !== undefined ? await (await fetch("https://graph.jibchain.net/subgraphs/name/jbc/all", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    query: `{
                        account(id: "` + address + `") {
                            ERC721tokens(where: {contract: "` + hexajibjib + `"}) {
                                id
                                uri
                            }
                        }
                    }`
                })
            })).json() : null
            const _res = res !== null && res.data.account !== null ? res.data.account.ERC721tokens : []
            let yournft = []
            for (let i = 0; i <= _res.length - 1 && address !== null && address !== undefined ; i++) {
                yournft.push({Id: Number((_res[i].id).slice(43)), URI: _res[i].uri})
            }

            for (let i = 0; i <= yournft.length - 1; i++) {
                const nftipfs = yournft[i].URI
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(yournft[i].Id).slice(-4))

                nfts.push({Id: Number(yournft[i].Id), Name: nft.name, Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"), Description: nft.description, Attribute: nft.attributes, RewardPerSec: bonus, Onsell: false, Count: null})
            }
            if (nfts.length === 0) { nfts.push(null) }

            const cmjBal = address !== null && address !== undefined ? await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0
            const jaspBal = address !== null && address !== undefined ? await readContract({
                address: dunJasper,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0
            const cuBal = address !== null && address !== undefined ? await readContract({
                address: dunCopper,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            return [nfts, cmjBal, jaspBal, cuBal]
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
            setJaspBalance(ethers.utils.formatUnits(String(result[2]), "gwei"))
            setCuBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [address, erc20ABI, txupdate])

    const enchantNHandle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        const cmjAllow = await readContract({
            address: cmjToken,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, enchantN1],
        })
        if (cmjAllow < (450 * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantN1, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            } catch {}
        }
        const jaspAllow = await readContract({
            address: dunJasper,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, enchantN1],
        })
        if (jaspAllow < (2 * 10**9)) {
            try {
                const config2 = await prepareWriteContract({
                    address: dunJasper,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantN1, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            } catch {}
        }
        const nftAllow = await readContract({
            address: hexajibjib,
            abi: hexa721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== enchantN1.toUpperCase()) {
            try {
                const config3 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: hexa721ABI,
                    functionName: 'approve',
                    args: [enchantN1, _nftid],
                })
                const approvetx3 = await writeContract(config3)
                await approvetx3.wait()
            } catch {}
        }
        try {
            const config4 = await prepareWriteContract({
                address: enchantN1,
                abi: enchantNABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid]
            })
            const tx = await writeContract(config4)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }
    
    const enchantNHandle2 = async (_nftid, _enchantindex) => {
        setisLoading(true)
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantN1],
            })
            if (cmjAllow < (150 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantN1, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const cuAllow = await readContract({
                address: dunCopper,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantN1],
            })
            if (cuAllow < (1500 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: dunCopper,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantN1, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: hexa721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== enchantN1.toUpperCase()) {
                const config3 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: hexa721ABI,
                    functionName: 'approve',
                    args: [enchantN1, _nftid],
                })
                const approvetx3 = await writeContract(config3)
                await approvetx3.wait()
            }
            const config4 = await prepareWriteContract({
                address: enchantN1,
                abi: enchantNABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid]
            })
            const tx = await writeContract(config4)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    const enchantRHandle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        const cmjAllow = await readContract({
            address: cmjToken,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, enchantR],
        })
        try {
            if (cmjAllow < (350 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantR, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantR],
            })
            if (jdaoAllow < (15 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantR, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const jaspAllow = await readContract({
                address: dunJasper,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantR],
            })
            if (jaspAllow < (15 * 10**9)) {
                const config3 = await prepareWriteContract({
                    address: dunJasper,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantR, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx3 = await writeContract(config3)
                await approvetx3.wait()
            }
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: hexa721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== enchantR.toUpperCase()) {
                const config4 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: hexa721ABI,
                    functionName: 'approve',
                    args: [enchantR, _nftid],
                })
                const approvetx4 = await writeContract(config4)
                await approvetx4.wait()
            }
            const config5 = await prepareWriteContract({
                address: enchantR,
                abi: enchantRABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid]
            })
            const tx = await writeContract(config5)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }
    const enchantRHandle2 = async (_nftid, _enchantindex) => {
        setisLoading(true)
        const cmjAllow = await readContract({
            address: cmjToken,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, enchantR],
        })
        try {
            if (cmjAllow < (150 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantR, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantR],
            })
            if (jdaoAllow < (8 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantR, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const cuAllow = await readContract({
                address: dunCopper,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantR],
            })
            if (cuAllow < (4000 * 10**18)) {
                const config3 = await prepareWriteContract({
                    address: dunCopper,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantR, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx3 = await writeContract(config3)
                await approvetx3.wait()
            }
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: hexa721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== enchantR.toUpperCase()) {
                const config4 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: hexa721ABI,
                    functionName: 'approve',
                    args: [enchantR, _nftid],
                })
                const approvetx4 = await writeContract(config4)
                await approvetx4.wait()
            }
            const config5 = await prepareWriteContract({
                address: enchantR,
                abi: enchantRABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid]
            })
            const tx = await writeContract(config5)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }


    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div className="pixel" style={{fontSize: "95px", width: "fit-content"}}>Blacksmith House</div>
                    <div style={{fontSize: "22.5px", width: "fit-content", marginTop: "30px"}} className="pixel">Upgrade your NFTs equipment.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="../elements/blacksmith.png" height="200" alt="Blacksmith" />
                </div>
            </div>

            <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "400px", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{fontSize: "18px"}} className="bold">Your Tokens</div>
                    <div style={{width: "60%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
                    <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                        <div style={{width: "600px", padding: "0 20px", margin: "40px 20px", display: "flex", justifyContent: "flex-start", boxShadow: "none", background: "#fff"}} className="items bold">
                            <img src="../tokens/cmj.png" width="22" alt="$CMJ"/>
                            <div style={{marginLeft: "10px"}}>{Number(cmjBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "600px", padding: "0 20px", margin: "40px 20px", display: "flex", justifyContent: "flex-start", boxShadow: "none", background: "#fff"}} className="items bold">
                            <img src="../items/copper.png" width="22" alt="$CU"/>
                            <div style={{marginLeft: "10px"}}>{Number(cuBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "600px", padding: "0 20px", margin: "40px 20px", display: "flex", justifyContent: "flex-start", boxShadow: "none", background: "#fff"}} className="items bold">
                            <img src="../items/jasper.png" width="22" alt="$JASP"/>
                            <div style={{marginLeft: "10px"}}>{Number(jaspBalance).toFixed(3)} GWEI</div>
                        </div>
                    </div>
                </div>

                <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "70%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{fontSize: "18px"}} className="bold">Your Upgradable NFTs (<a className="emp" style={{textDecoration: "none"}} href="https://demontocoshi.gitbook.io/commudao/functions/the-blacksmith-house" target="_blank" rel="noreferrer">The Blacksmith Guidebook</a>)</div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
                    {nft !== undefined && nft.length > 0 ?
                        <>
                            {nft[0] !== null ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                    {nft.map((item, index) => (
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                            {String(item.Id).slice(0, 3) === "210" && Number(item.Id) % 100000 !== 1150 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        {Number(item.Id) % 100000 === 250 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name} +1</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 300 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 400 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}3</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 500 ?
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafkreig3tupkgt4gj3upvi3q2pajoe34s4xfuzp77omcke7pjb6mb2crla" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -4)}R</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 550 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name} +1</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 650 ?
                                                            <div>
                                                                <img src="https://bafybeifevcy5ov5yx2cg77qyuz4xjrj6rmgexzib2w72wgxs5kyw2latcu.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 750 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}3</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 950 ?
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafybeiavi27onvy2x7u4mt3no4ntps2f5katwuoi5a5rm6pbck6fheteb4" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}4</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        {Number(item.Id) % 100000 === 250 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 0</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 1</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 50} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 300 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 1</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 2</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 100} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 400 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 2</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 3</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 100} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 500 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 3</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 0</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 50} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 550 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 0</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 1</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 100} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 650 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 1</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 2</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 100} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 750 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 2</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 3</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 200} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 950 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 3</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 4</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 200} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/copper.png" height="18" alt="$CU"/>
                                                            {Number(item.Id) % 100000 === 250 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>500</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 300 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>1000</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 400 ? 
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>1500</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 500 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>2500</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>5</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>150</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 550 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>3000</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>6</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 650 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>4000</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>8</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 750 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>5000</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>10</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 950 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>7500</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>15</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                        </div>
                                                    </div>
                                                    {Number(item.Id) % 100000 >= 500 ?
                                                        <div style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate :&nbsp;
                                                                {Number(item.Id) % 100000 === 500 ? <>1/1</> : <></>}
                                                                {Number(item.Id) % 100000 === 550 ? <>1/2</> : <></>}
                                                                {Number(item.Id) % 100000 === 650 ? <>1/3</> : <></>}
                                                                {Number(item.Id) % 100000 === 750 ? <>1/2</> : <></>}
                                                                {Number(item.Id) % 100000 === 950 ? <>1/3</> : <></>}
                                                            </div>
                                                            <div className="pixel">depend on parent blockhash calculation</div>
                                                        </div> :
                                                        <></>
                                                    }
                                                    <div
                                                        style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                        className="pixel button"
                                                        onClick={() => {
                                                            if (Number(item.Id) % 100000 === 250) {
                                                                enchantNHandle2(item.Id, 12)
                                                            } else if (Number(item.Id) % 100000 === 300) {
                                                                enchantNHandle2(item.Id, 10)
                                                            } else if (Number(item.Id) % 100000 === 400) {
                                                                enchantNHandle2(item.Id, 11)
                                                            } else if (Number(item.Id) % 100000 === 500) {
                                                                enchantRHandle2(item.Id, 31)
                                                            } else if (Number(item.Id) % 100000 === 550) {
                                                                enchantRHandle2(item.Id, 32)
                                                            } else if (Number(item.Id) % 100000 === 650) {
                                                                enchantRHandle2(item.Id, 33)
                                                            } else if (Number(item.Id) % 100000 === 750) {
                                                                enchantRHandle2(item.Id, 34)
                                                            } else if (Number(item.Id) % 100000 === 950) {
                                                                enchantRHandle2(item.Id, 35)
                                                            }
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
                                                </div> :
                                                <></>
                                            }
                                            

                                            {String(item.Id).slice(0, 3) === "410" && Number(item.Id) % 100000 === 150 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src="https://bafkreibnnijprwt4zgmwe2zhzikpr7svq4iyz4lsilbefimxqtqcyjdjue.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name} N +1</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 0</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 50} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>0.1 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>50</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantNHandle(item.Id, 1)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "410" && Number(item.Id) % 100000 === 200 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 2</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 100} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>0.2 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>50</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantNHandle(item.Id, 2)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "410" && Number(item.Id) % 100000 === 300 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}3</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 2</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 3</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 100} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>0.3 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>50</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantNHandle(item.Id, 3)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "410" && Number(item.Id) % 100000 === 400 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src="https://bafkreieemul5cpbiijd7v7w4wbrbbyjonoddiyyoz6ziqowggrjpu2cgye.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -4)}R</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 3</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 0</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 50} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>0.5 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                            <div style={{margin: "0 5px"}}>5</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>150</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantRHandle(item.Id, 1)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "410" && Number(item.Id) % 100000 === 450 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name} +1</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 0</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 100} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>0.6 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                            <div style={{margin: "0 5px"}}>6</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>100</div>
                                                        </div>
                                                    </div>
                                                    <div style={{margin: "10px 0", width: "350px"}}>
                                                        <div className="emp pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                            Success rate : 1/2
                                                        </div>
                                                        <div className="pixel">(depend on parent blockhash calculation)</div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantRHandle(item.Id, 2)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "410" && Number(item.Id) % 100000 === 550 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src="https://bafybeibg6zvac6eqgieocjfx3bz2tz3tb6lsduq2pz4hd6a3sqz455sau4.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 2</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 100} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>0.8 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                            <div style={{margin: "0 5px"}}>8</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>100</div>
                                                        </div>
                                                    </div>
                                                    <div style={{margin: "10px 0", width: "350px"}}>
                                                        <div className="emp pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                            Success rate : 1/3
                                                        </div>
                                                        <div className="pixel">(depend on parent blockhash calculation)</div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantRHandle(item.Id, 3)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }


                                            {String(item.Id).slice(0, 3) === "710" && Number(item.Id) % 100000 === 250 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name} +1</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 0</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 250} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>0.5 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>150</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantNHandle(item.Id, 4)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "710" && Number(item.Id) % 100000 === 500 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 2</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 250} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>1.0 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>300</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantNHandle(item.Id, 5)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "710" && Number(item.Id) % 100000 === 750 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src="https://bafybeihlewrgj25x3p6nvqa7rrxh54j66c7lc3azkda2tds6wshhsslipu.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}3</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 2</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 3</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 250} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>1.5 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>450</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantNHandle(item.Id, 6)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "710" && Number(item.Id) % 100000 === 550 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name} +1</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 0</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 450} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>1.0 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                            <div style={{margin: "0 5px"}}>10</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>300</div>
                                                        </div>
                                                    </div>
                                                    <div style={{margin: "10px 0", width: "350px"}}>
                                                        <div className="emp pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                            Success rate : 1/2
                                                        </div>
                                                        <div className="pixel">(depend on parent blockhash calculation)</div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantRHandle(item.Id, 12)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "710" && Number(item.Id) % 100000 === 1000 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={"https://nftstorage.link/ipfs/bafybeia7eeifiowqnq6tkm37u6wk4lm7jizlxb2i6sndggdathomvbezoy"} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 2</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 450} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>1.5 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                            <div style={{margin: "0 5px"}}>15</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>350</div>
                                                        </div>
                                                    </div>
                                                    <div style={{margin: "10px 0", width: "350px"}}>
                                                        <div className="emp pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                            Success rate : 1/3
                                                        </div>
                                                        <div className="pixel">(depend on parent blockhash calculation)</div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantRHandle(item.Id, 13)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }


                                            {String(item.Id).slice(0, 3) === "310" && Number(item.Id) % 100000 === 250 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name} +1</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 0</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 250} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>0.5 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>150</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantNHandle(item.Id, 7)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "310" && Number(item.Id) % 100000 === 500 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 2</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 250} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>1.0 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>300</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantNHandle(item.Id, 8)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "310" && Number(item.Id) % 100000 === 750 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src="https://bafybeibuck4l6j3qla3jwbvwh3c3nonb3vww5oytn76m4fohs3qpfxlt54.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}3</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 2</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 3</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 250} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>1.5 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>450</div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantNHandle(item.Id, 9)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "310" && Number(item.Id) % 100000 === 550 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name} +1</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 0</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 450} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>1.0 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                            <div style={{margin: "0 5px"}}>10</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>300</div>
                                                        </div>
                                                    </div>
                                                    <div style={{margin: "10px 0", width: "350px"}}>
                                                        <div className="emp pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                            Success rate : 1/2
                                                        </div>
                                                        <div className="pixel">(depend on parent blockhash calculation)</div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantRHandle(item.Id, 22)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                            {String(item.Id).slice(0, 3) === "310" && Number(item.Id) % 100000 === 1000 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src="https://nftstorage.link/ipfs/bafybeibtmtw43bbjgorck6z7qlks5fd6aoaufgk5uhyaz7q67dtdixmkh4" width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                        </div>
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <div className="pixel">Level 1</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                        </div>
                                                        <div>
                                                            <div className="pixel">Level 2</div>
                                                            <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 450} cmpow per sec</div>
                                                        </div>
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div style={{marginTop: "10px", width: "350px"}}>
                                                        <div className="pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/jasper.png" height="18" alt="$JASP"/>
                                                            <div style={{margin: "0 5px"}}>1.5 GWEI</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                            <div style={{margin: "0 5px"}}>15</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>350</div>
                                                        </div>
                                                    </div>
                                                    <div style={{margin: "10px 0", width: "350px"}}>
                                                        <div className="emp pixel">
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                            Success rate : 1/3
                                                        </div>
                                                        <div className="pixel">(depend on parent blockhash calculation)</div>
                                                    </div>
                                                    <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button" onClick={() => {enchantRHandle(item.Id, 23)}}>UPGRADE</div>
                                                </div> :
                                                <></>
                                            }
                                        </div>
                                    ))}
                                </div> :
                                <>
                                {address !== undefined ?
                                    <div className="nftCard" style={{justifyContent: "center", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fas fa-scroll"></i>
                                        <div className="bold">No NFTs equipment to upgrade.</div>
                                    </div> :
                                    <div className="nftCard" style={{justifyContent: "center", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}}>
                                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                        <div className="bold">Please connect wallet to view your NFTs.</div>
                                    </div>
                                }
                                </>
                            }
                        </> :
                        <div style={{width: "300px", padding: "20px", margin: "20px"}}>
                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-spinner"></i>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Npcblacksmith