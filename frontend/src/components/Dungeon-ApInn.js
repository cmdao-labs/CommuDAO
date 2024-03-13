import React from 'react'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { ThreeDots } from 'react-loading-icons'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const dunANGB = '0x59c1C2f5FA76DB933B97b7c54223129e2A398534'
const starLab = '0x7A7Bc613e93aD729141D4BbB94375b5aD19d0Cbf'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const enchantR = '0xeA32261d199a9C0458F431a885a1F1600bB58dEd'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const ApInn = ({ setisLoading, txupdate, setTxupdate, enchantNABI, enchantRABI, osABI, erc721ABI, erc20ABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [angbBalance, setAngbBalance] = React.useState(0)
    const [starBalance, setStarBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)    
        const cmdaonftSC = new ethers.Contract(hexajibjib, erc721ABI, providerJBC)

        const thefetch = async () => {
            const walletFilter = await cmdaonftSC.filters.Transfer(null, address, null)
            const walletEvent = await cmdaonftSC.queryFilter(walletFilter, 335000, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj, index) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunANGB,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: starLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [0, 0, 0, 0, ]

            const cmjBal = data[1]
            const angbBal = data[2]
            const starBal = data[3]

            const nftbal = data[0]
            let count = 0
            let nfts = []
            let yournft = []

            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: hexajibjib,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [item],
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            for (let i = 0; i <= walletRemoveDup.length - 1 && count < nftbal; i++) {
                if (data2[i].toUpperCase() === address.toUpperCase()) {
                    yournft.push({Id: String(walletRemoveDup[i])})
                    count++
                }
            }

            console.log(yournft)
            for (let i = 0; i <= yournft.length - 1; i++) {
                const nftipfs = await readContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'tokenURI',
                    args: [yournft[i].Id],
                })
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                const bonus = Number(String(yournft[i].Id).slice(-5))

                nfts.push({Id: Number(yournft[i].Id), Name: nft.name, Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"), Description: nft.description, Attribute: nft.attributes, RewardPerSec: bonus, Onsell: false, Count: null})
            }
            if (nfts.length === 0) { nfts.push(null) }

            return [nfts, cmjBal, angbBal, starBal]
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
            setAngbBalance(ethers.utils.formatEther(String(result[2])))
            setStarBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [address, erc20ABI, erc721ABI, txupdate])

    /*const enchantRHandle3 = async (_nftid, _enchantindex) => {
        setisLoading(true)
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantR],
            })
            if (cmjAllow < (800 * 10**18)) {
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
            if (jdaoAllow < (60 * 10**18)) {
                const config2 = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantR, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const osAllow = await readContract({
                address: osToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantR],
            })
            if (osAllow < (3850 * 10**18)) {
                const config3 = await prepareWriteContract({
                    address: osToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [enchantR, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx3 = await writeContract(config3)
                await approvetx3.wait()
            }
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== enchantR.toUpperCase()) {
                const config4 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
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
                args: [_enchantindex, _nftid],
                overrides: {
                    gasLimit: 3000000,
                },
            })
            const tx = await writeContract(config5)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }*/

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>AP INN</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel"></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeifrqslsoes7swzc3bnjl72x6sgsewcnx2w3zjsm5pzma7ku2onr6a" height="200" alt="AP-INN" />
                </div>
            </div>

            <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "250px", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{width: "250px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Tokens</div>
                    <div className="pixel">
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                            <div style={{marginLeft: "10px"}}>{Number(cmjBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" width="22" alt="$ANGB"/>
                            <div style={{marginLeft: "10px"}}>{Number(angbBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafybeideve73vg6mtnwzjjmrol66idxoe3orfxrjbdairhwbumyj3a46eu" width="22" alt="$STAR"/>
                            <div style={{marginLeft: "10px"}}>{Number(starBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                        </div>
                    </div>
                </div>

                <div style={{textAlign: "left", margin: "50px 0 80px 0", minHeight: "600px", width: "70%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{padding: "50px", margin: "50px 0", backdropFilter: "blur(20px)", border: "none", minWidth: "940px", width: "80%", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", fontSize: "14px"}} className="nftCard">
                        <div style={{fontSize: "40px"}}>March 2024 Prize Pool 🎁</div>
                        <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                            <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Top $ANGB Holder</div>
                                <div>5 STAR</div>
                            </div>
                            <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Top $ANGB Farmer</div>
                                <div>5 STAR</div>
                            </div>
                            <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Top $VABAG Burner</div>
                                <div>5 STAR</div>
                            </div>
                            <div style={{width: "220px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Top Spender</div>
                                <div>5 STAR</div>
                            </div>
                        </div>
                        <div>Snapshot on the last block of the month before 0.00 AM.<br></br>Rewards will allocated to top 20 for each leaderboard.</div>
                        <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                            <div style={{width: "300px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                <div>Become Top 1-5</div>
                                <div>To win prize pool</div>
                            </div>
                        </div>
                    </div>

                    <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                        <div style={{padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $ANGB Holder</div>
                            {false ?
                                <>
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    
                                </div>
                            }
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $ANGB Farmer</div>
                            {false ?
                                <>
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>

                                </div>
                            }
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $VABAG Buner</div>
                            {false ?
                                <>
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>

                                </div>
                            }
                        </div>

                        <div style={{padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "420px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Spender</div>
                            {false ?
                                <>
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>

                                </div>
                            }
                        </div>
                    </div>

                    <div style={{marginTop: "20px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Upgradable NFTs <a className="emp" style={{textDecoration: "underline", marginLeft: "20px"}} href="https://nft-angel-plus.gitbook.io/nft-angel-plus/nft-blockchain-project/gamefi-nft-angel-plus-the-dungeon/nft-upgrade-mining-power" target="_blank" rel="noreferrer">📖 The Angel Plus NFTs Guidebook</a></div>
                    {nft !== undefined && nft.length > 0 ?
                        <>
                            {nft[0] !== null ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                    {/*nft.map((item, index) => (
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                            {

                                            }
                                            {String(item.Id).slice(0, 3) === "711" && Number(item.Id) % 100000 !== 1000 && Number(item.Id) % 100000 !== 4250 && Number(item.Id) % 100000 !== 6800 && Number(item.Id) % 100000 !== 2550 &&
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                    <div className="emp pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}}>{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        {(Number(item.Id) % 100000 === 250 || Number(item.Id) % 100000 === 550 || Number(item.Id) % 100000 === 1050 || Number(item.Id) % 100000 === 2550) &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name} +1</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 500 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 750 &&
                                                            <div>
                                                                <img width="120" src='https://bafybeigjavmefqw7riwrwtqyr25jgdq2jknhzdhwitokvuwbolxngss6i4.ipfs.nftstorage.link/' alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 950 &&
                                                            <div>
                                                                <img width="120" src='https://bafybeidobsibdxnnb5wwdcm3an3g556rl7chvmne3lcpnpnzxumggejcba.ipfs.nftstorage.link/' alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 1450 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 2000 &&
                                                            <div>
                                                                <img width="120" src='https://bafybeidstkkedjjloah4h7mvzn2px3najodjwc5cltc2b7rp5tefemyelq.ipfs.nftstorage.link/' alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {(Number(item.Id) % 100000 === 2650 || Number(item.Id) % 100000 === 5250 || Number(item.Id) % 100000 === 7500) &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3400 &&
                                                            <div>
                                                                <img width="120" src='https://bafybeid7h2iwscqsj57pozjlli3mhly3zaociswe7cu65rml3pv736e34q.ipfs.nftstorage.link/' alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 1800 &&
                                                            <div>
                                                                <img width="120" src='https://bafybeia5ja2bqysgayvaybjwoxc5l2waay7jv4xye3l5ogbupsz557kjs4.ipfs.nftstorage.link/' alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {(Number(item.Id) % 100000 === 2750 && Number(item.Id) % 100000 === 4600) &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3900 &&
                                                            <div>
                                                                <img width="120" src='https://bafybeihecvtntvs6ks5nmt3od4noaa4g3xgilhysmkjd4qnea6ze5wzdhu.ipfs.nftstorage.link/' alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 6800 &&
                                                            <div>
                                                                <img width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {(Number(item.Id) % 100000 === 8550 || Number(item.Id) % 100000 === 11200) &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 10500 &&
                                                            <div>
                                                                <img width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3450 &&
                                                            <div>
                                                                <img width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 5950 &&
                                                            <div>
                                                                <img width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 9250 &&
                                                            <div>
                                                                <img width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 13350 &&
                                                            <div>
                                                                <img width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 18050 &&
                                                            <div>
                                                                <img width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}9</div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        {Number(item.Id) % 100000 === 250 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 0</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 1</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 250} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 500 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 1</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 2</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 250} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 750 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 2</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 3</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 250} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 550 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 0</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 1</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 400} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 950 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 1</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 2</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 500} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 1450 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 2</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 3</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 550} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 2000 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 3</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 4</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 650} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 2650 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 4</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 5</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 750} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 3400 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 5</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 6</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 850} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 1050 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 0</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 1</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 750} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 1800 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 1</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 2</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 950} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 2750 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 2</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 3</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1150} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 3900 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 3</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 4</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1350} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 5250 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 4</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 5</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1550} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 6800 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 5</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 6</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1750} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 8550 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 6</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 7</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1950} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 10500 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 7</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 8</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 4300} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 2550 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 0</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 1</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 900} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 3450 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 1</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 2</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1150} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 4600 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 2</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 3</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1350} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 5950 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 3</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 4</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1550} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 7500 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 4</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 5</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1750} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 9250 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 5</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 6</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 1950} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 11200 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 6</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 7</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 2050} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 13350 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 7</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 8</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 4700} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 18050 &&
                                                            <>
                                                                <div>
                                                                    <div>Level 8</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div>Level 9</div>
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 7650} cmpow per sec</div>
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
                                                            {Number(item.Id) % 100000 === 250 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>0.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>150</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 500 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>1.0 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>300</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 750 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>1.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>450</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 550 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>1.0 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>10</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>300</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 950 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>1.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>15</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>350</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 1450 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>2.0 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>20</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>400</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 2000 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>2.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>25</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>450</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 2650 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>3.0 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>30</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>500</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 3400 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>3.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>35</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>550</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 1050 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>130</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>15</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>350</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 1800 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>200</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>20</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>400</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 2750 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>290</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>25</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>450</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 3900 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>440</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>30</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>500</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 5250 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>650</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>35</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>550</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 6800 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>970</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>40</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>600</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 8550 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>1450</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>45</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>650</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 10500 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>2170</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>700</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 2550 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>180</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>20</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>400</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 3450 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>260</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>25</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>450</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 4600 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>380</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>30</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>500</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 5950 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>560</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>35</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>550</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 7500 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>830</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>40</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>600</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 9250 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>1240</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>45</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>650</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 11200 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>1850</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>700</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 13350 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>2770</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>55</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>750</div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 === 18050 &&
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>3850</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>60</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>800</div>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                    {(Number(item.Id) % 100000 === 550 || Number(item.Id) % 100000 === 1450 || Number(item.Id) % 100000 === 2650 || Number(item.Id) % 100000 === 1050 || Number(item.Id) % 100000 === 2750 || Number(item.Id) % 100000 === 5250 || Number(item.Id) % 100000 === 8550 || Number(item.Id) % 100000 === 2550 || Number(item.Id) % 100000 === 4600 || Number(item.Id) % 100000 === 7500 || Number(item.Id) % 100000 === 11200) &&
                                                        <div className="pixel" style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/2
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                    }
                                                    {(Number(item.Id) % 100000 === 950 || Number(item.Id) % 100000 === 2000 || Number(item.Id) % 100000 === 3400 || Number(item.Id) % 100000 === 1800 || Number(item.Id) % 100000 === 3900 || Number(item.Id) % 100000 === 6800 || Number(item.Id) % 100000 === 10500 || Number(item.Id) % 100000 === 3450 || Number(item.Id) % 100000 === 5950 || Number(item.Id) % 100000 === 9250 || Number(item.Id) % 100000 === 13350) &&
                                                        <div className="pixel" style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/3
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                    }
                                                    {(Number(item.Id) % 100000 === 18050) &&
                                                        <div style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/4
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                    }
                                                    <div
                                                        style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                        className="pixel button"
                                                        onClick={() => {
                                                            if (Number(item.Id) % 100000 === 250) {
                                                                enchantNHandle(item.Id, 19)
                                                            } else if (Number(item.Id) % 100000 === 500) {
                                                                enchantNHandle(item.Id, 20)
                                                            } else if (Number(item.Id) % 100000 === 750) {
                                                                enchantNHandle(item.Id, 21)
                                                            } else if (Number(item.Id) % 100000 === 550) {
                                                                enchantRHandle(item.Id, 124)
                                                            } else if (Number(item.Id) % 100000 === 950) {
                                                                enchantRHandle(item.Id, 125)
                                                            } else if (Number(item.Id) % 100000 === 1450) {
                                                                enchantRHandle(item.Id, 126)
                                                            } else if (Number(item.Id) % 100000 === 2000) {
                                                                enchantRHandle(item.Id, 127)
                                                            } else if (Number(item.Id) % 100000 === 2650) {
                                                                enchantRHandle(item.Id, 128)
                                                            } else if (Number(item.Id) % 100000 === 3400) {
                                                                enchantRHandle(item.Id, 129)
                                                            } else if (Number(item.Id) % 100000 === 1050) {
                                                                enchantRHandle3(item.Id, 130)
                                                            } else if (Number(item.Id) % 100000 === 1800) {
                                                                enchantRHandle3(item.Id, 131)
                                                            } else if (Number(item.Id) % 100000 === 2750) {
                                                                enchantRHandle3(item.Id, 132)
                                                            } else if (Number(item.Id) % 100000 === 3900) {
                                                                enchantRHandle3(item.Id, 133)
                                                            } else if (Number(item.Id) % 100000 === 5250) {
                                                                enchantRHandle3(item.Id, 134)
                                                            } else if (Number(item.Id) % 100000 === 6800) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 8550) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 10500) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 2550) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 3450) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 4600) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 5950) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 7500) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 9250) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 11200) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 13350) {
                                                                enchantRHandle3(item.Id, null)
                                                            } else if (Number(item.Id) % 100000 === 18050) {
                                                                enchantRHandle3(item.Id, null)
                                                            }
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
                                                </div>
                                            }
                                            
                                        </div>
                                    ))*/}
                                </div> :
                                <>
                                    {address !== undefined ?
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
        </>
    )
}

export default ApInn