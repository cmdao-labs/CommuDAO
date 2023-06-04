import React from 'react'
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const evolutionary = '0x99dfECfB91CC6C37C16a6D95A0A8935eb05A33fb'

const NpcEvolutionary = ({ setisLoading, txupdate, setTxupdate, evolutionaryABI, hexa721ABI, erc20ABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [bbqBalance, setBbqBalance] = React.useState(0)

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
            const bbqBal = address !== null && address !== undefined ? await readContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [address],
            }) : 0

            return [nfts, cmjBal, bbqBal]
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
            setBbqBalance(ethers.utils.formatEther(String(result[2])))
        })

    }, [address, erc20ABI, txupdate])

    const evolutionHandle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        const cmjAllow = await readContract({
            address: cmjToken,
            abi: erc20ABI,
            functionName: 'allowance',
            args: [address, evolutionary],
        })
        try {
            if (cmjAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: cmjToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [evolutionary, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, evolutionary],
            })
            if (jdaoAllow < (1 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [evolutionary, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, evolutionary],
            })
            if (bbqAllow < (10000 * 10**18)) {
                const config3 = await prepareWriteContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [evolutionary, ethers.utils.parseEther(String(10**8))],
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
            if (nftAllow.toUpperCase() !== evolutionary.toUpperCase()) {
                const config4 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: hexa721ABI,
                    functionName: 'approve',
                    args: [evolutionary, _nftid],
                })
                const approvetx4 = await writeContract(config4)
                await approvetx4.wait()
            }
            const config5 = await prepareWriteContract({
                address: evolutionary,
                abi: evolutionaryABI,
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
                    <div className="pixel" style={{fontSize: "95px", width: "fit-content"}}>Evotionary Planet</div>
                    <div style={{fontSize: "22.5px", width: "fit-content", marginTop: "30px"}} className="pixel">Evolution of your NFTs main character.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
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
                            <img src="../items/bbq.png" width="22" alt="$BBQ"/>
                            <div style={{marginLeft: "10px"}}>{Number(bbqBalance).toFixed(3)}</div>
                        </div>
                    </div>
                </div>

                <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "70%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{fontSize: "18px"}} className="bold">Your Upgradable NFTs</div>
                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
                    {nft !== undefined && nft.length > 0 ?
                        <>
                            {nft[0] !== null ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                    {nft.map((item, index) => (
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                            {String(item.Id).slice(0, 4) === "1001" && String(item.Id).slice(5, 7) <= 500 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px", boxShadow: "none", border: "1px solid rgb(227, 227, 227)"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name} [Lv.1]</div>
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
                                                            Evolution resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                            <img src="../items/bbq.png" height="18" alt="$BBQ"/>
                                                            <div style={{margin: "0 5px"}}>10,000</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/jdao.png" height="18" alt="$JDAO"/>
                                                            <div style={{margin: "0 5px"}}>1</div>
                                                            <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                            <img src="../tokens/cmj.png" height="18" alt="$CMJ"/>
                                                            <div style={{margin: "0 5px"}}>10</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                        className="pixel button"
                                                        onClick={() => {
                                                            if (Number(item.Id) <= 100110000100) {
                                                                evolutionHandle(item.Id, 1)
                                                            } else if (Number(item.Id) <= 100110000200) {
                                                                evolutionHandle(item.Id, 2)
                                                            } else if (Number(item.Id) <= 100110000300) {
                                                                evolutionHandle(item.Id, 3)
                                                            } else if (Number(item.Id) <= 100110000400) {
                                                                evolutionHandle(item.Id, 4)
                                                            }
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
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

export default NpcEvolutionary