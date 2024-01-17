import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const wood = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const cu = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'

const cmdaoNft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'

const land = '0x90B3a1F21D1C0BE9A8B6a6AA129066951AF63B72'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const house = '0xCb3AD565b9c08C4340A7Fe857c38595587843139'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const CmCityLand = ({ setisLoading, txupdate, setTxupdate, navigate, intrasubModetext, erc20ABI, erc721ABI, cmdaoNameABI, slot1ABI, houseABI }) => {
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
    const tokenId = '100' + code + '0' + intrasubModetext.slice(1, 3)
    const [mode, setMode] = React.useState(0)
    const [llAddr, setLlAddr] = React.useState(null)
    const [llName, setLlName] = React.useState('...')
    const [slot1Addr, setSlot1Addr] = React.useState(null)
    const [slot1Owner, setSlot1Owner] = React.useState('...')
    const [slot1Lv, setSlot1Lv] = React.useState(0)
    const [nft, setNft] = React.useState([])

    React.useEffect(() => {        
        window.scrollTo(0, 0)
        const cmdaonftSC = new ethers.Contract(cmdaoNft, erc721ABI, providerJBC)
        
        const thefetch = async () => {
            const data = await readContract({
                address: land,
                abi: erc721ABI,
                functionName: 'ownerOf',
                args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
            })
            const slot1owner = await readContract({
                address: slot1,
                abi: slot1ABI,
                functionName: 'slotOwner',
                args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
            })
            const slot1level = await readContract({
                address: slot1,
                abi: slot1ABI,
                functionName: 'slotLevel',
                args: ['100' + code + '0' + intrasubModetext.slice(1, 3)],
            })
            const id = await readContracts({
                contracts: [
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [data],
                    },
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [slot1owner],
                    }
                ],
            })
            const landlordname = await readContracts({
                contracts: [
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [id[0]],
                    },
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [id[1]],
                    }
                ],
            })

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
                if (data2[i].toUpperCase() === address.toUpperCase()) {
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
                const nftipfs = data3[i]
                const response = await fetch(nftipfs.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"))
                const nft = await response.json()

                nfts.push({
                    Col: 1,
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://").concat(".ipfs.nftstorage.link/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: Number(yournftwallet[i].Id.slice(-5)),
                    isStaked: false
                })
            }

            console.log(nfts)

            return [data, slot1owner, landlordname, slot1level, nfts, ]
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
            result[2] !== undefined && result[2][0] !== null ? setLlName(result[2][0]) : setLlName('Unknown')
            result[2] !== undefined && result[2][1] !== null ? setSlot1Owner(result[2][1]) : setSlot1Owner('Unknown')
            setSlot1Lv(Number(result[3]))
            setNft(result[4])
        })

    }, [code, intrasubModetext, txupdate, erc721ABI, cmdaoNameABI, slot1ABI])

    const upgradeHouseHandle = async (_level) => {
        setisLoading(true)
        try {
            let woodUsage = 0
            let cuUsage = 0
            if (_level === 1) {
                woodUsage = 100000000
                cuUsage = 50000
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
                    args: [house, ethers.utils.parseEther(String(10**8))],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
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
                const approvetx2 = await writeContract(config2)
                await approvetx2.wait()
            }
            const config3 = await prepareWriteContract({
                address: slot1,
                abi: slot1ABI,
                functionName: 'delegateOwner',
                args: [0, address, tokenId]
            })
            const tx = await writeContract(config3)
            await tx.wait()
            const config4 = await prepareWriteContract({
                address: house,
                abi: houseABI,
                functionName: 'upgrade',
                args: [_level, tokenId]
            })
            const tx2 = await writeContract(config4)
            await tx2.wait()
            setTxupdate(tx2)
        } catch {}
        setisLoading(false)
    }

    const registHouseHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: slot1,
                abi: slot1ABI,
                functionName: 'delegateOwner',
                args: [0, address, tokenId]
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
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}} className="pixel">
                    <div style={{fontSize: "75px", width: "fit-content"}}>Land {intrasubModetext.toUpperCase()} of {llName}</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                </div>
            </div>

            {mode === 0 &&
                <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "0", padding: "75px 0", minHeight: "inherit", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll">
                    <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", border: "1px solid rgb(54, 77, 94)", minWidth: "880px", width: "55%", height: "420px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                        <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">{slot1Owner}'S HOUSE LV.{slot1Lv}</div>
                        <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div style={{width: "30%", height: "320px"}}>
                                {slot1Lv === 0 && <img src="https://nftstorage.link/ipfs/bafybeielpogfiry6r54yhzalsu2wmrp37oergq7v7r4w2qoljsesy6eoom" style={{filter: "grayscale(1)"}} height="200" alt="HOUSE.LV.1" />}
                                {slot1Lv === 1 && <img src="https://nftstorage.link/ipfs/bafybeielpogfiry6r54yhzalsu2wmrp37oergq7v7r4w2qoljsesy6eoom" height="200" alt="HOUSE.LV.1" />}
                            </div>
                            <div style={{width: "65%", height: "320px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                <div>
                                    <div className="bold">UPGRADE COSTS</div>
                                    <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                        <img src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="30px" alt="$WOOD"/>
                                        <div style={{margin: "0 30px 0 10px"}}>
                                            {slot1Lv === 0 && '100M'}
                                            {slot1Lv === 1 && '200M'}
                                        </div>
                                        <img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="30px" alt="$CU"/>
                                        <div style={{marginLeft: "10px"}}>
                                            {slot1Lv === 0 && '50,000'}
                                            {slot1Lv === 1 && '100,000'}
                                        </div>
                                        
                                    </div>
                                </div>
                                <div>
                                    <div style={{margin: "20px 0", color: "#fff", fontSize: "12px"}} className="bold">SLEEP TO EARN!... STAKE COMMUDAO NFT TO EARN $OS</div>
                                    {llAddr !== null && String(llAddr).toUpperCase() === address.toUpperCase() &&
                                        <>
                                            {slot1Lv !== 1 ?
                                                <div 
                                                    style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}}
                                                    className="bold button" 
                                                    onClick={
                                                        () => {
                                                            if (slot1Lv === 0) {
                                                                upgradeHouseHandle(1)
                                                            }
                                                        }
                                                    }
                                                >
                                                    CONSTRUCT
                                                </div> :
                                                <>
                                                    {slot1Addr.toUpperCase() === '0X0000000000000000000000000000000000000000' ?
                                                        <div 
                                                            style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)", fontSize: "12px"}}
                                                            className="bold button" 
                                                            onClick={registHouseHandle}
                                                        >
                                                            REGISTER HOUSE'S OWNER
                                                        </div> :
                                                        <div>Coming soon...</div>
                                                    }
                                                </>
                                            }
                                        </>                                   
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", overflow: "scroll"}} className="pixel mainprofile">
                        <div style={{background: "rgb(0, 26, 44)", border: "none", justifyContent: "space-around", padding: "30px", width: "1140px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "row", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                            <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", width: "370px", height: "360px", margin: "20px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "1px solid", boxShadow: "inset -2px -2px 0px 0.25px #00000040"}}>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid"}}>
                                <div style={{fontSize: "22px", lineHeight: "15px"}}>SLEEP TO EARN</div>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} className="emp">
                                        {false /*isStakeNow*/ ?
                                            <>
                                                <div style={{background: "rgb(239, 194, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                <div>On Staking</div>
                                            </> :
                                            <>
                                                {true /*isStakeNow === false*/ &&
                                                    <>
                                                        <div style={{background: "rgb(29, 176, 35)", width: 16, height: 16, border: "3px solid #ddffdb", borderRadius: "50%", marginRight: 7}}></div>
                                                        <div>Available for stake</div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>TOTAL CMPOW PER SEC: <div>{/*allPower*/}</div></div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    OVERSOUL BALANCE
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="20" alt="$OS"/>
                                        <div style={{marginLeft: "5px"}}>{/*Number(cuBalance).toFixed(3).toLocaleString()*/}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    OVERSOUL PENDING
                                    <div style={{display: "flex", flexDirection: "row", color: false/*isStakeNow*/ ? "#ff007a" : "#5f6476"}}>
                                        <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="20" alt="$OS"/>
                                        <div style={{marginLeft: "5px"}}>{/*cuPending.toLocaleString()*/}</div>
                                    </div>
                                </div>
                                <div style={{width: "350px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                    AVAILABLE OVERSOUL IN POOL
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="20" alt="$OS"/>
                                        <div style={{marginLeft: "5px"}}>{/*Number(cuBalance).toFixed(3).toLocaleString()*/}</div>
                                    </div>
                                </div>
                                {false && address !== undefined /*address === youraddr*/ ?
                                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                        {false /*isStakeNow*/ ?
                                            <>
                                                <div style={{alignSelf: "center", background: false/*isRunout*/ ? "#67BAA7" : "#ff007a"}} className="button" onClick={console.log('yo')/*() => unstakeNft(0)*/}>HARVEST & UNSTAKE</div>
                                            </> :
                                            <>
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="button">HARVEST & UNSTAKE</div>
                                            </>
                                        }
                                    </div> :
                                    <div style={{height: "41px"}}></div>
                                }
                            </div>
                            <div style={{position: "relative", width: "300px", height: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{width: "300px", marginBottom: "20px", fontSize: "22px", textAlign: "center"}}>Main Char SLOT1</div>
                                {nft.length > 0 ?
                                    <>
                                        {false /*characterSlot !== null*/ ?
                                            <>
                                                {/*<img src={characterSlot} width="300px" alt="Can not load metadata." />*/}
                                            </> :
                                            <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray"}}></div>
                                        }
                                    </> :
                                    <div style={{width: "300px", height: "300px", borderRadius: "16px", border: "1px solid gray", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <ThreeDots fill="#5f6476" />
                                    </div>
                                }
                                {false /*characterSlotLevel !== null*/ ?
                                    <div style={{position: "absolute", top: "300px", right: "20px", padding: "2px", fontSize: "25px"}}>Lv.{/*characterSlotLevel*/}</div> :
                                    <></>
                                }
                            </div>
                        </div>
                    </div>
                    {address !== null && address !== undefined && slot1Addr !== null && slot1Addr !== undefined &&
                        <>
                            {address.toUpperCase() === slot1Addr.toUpperCase() &&
                                <>
                                    {nft.length > 0 ?
                                        <div style={{width: "1650px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
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
                                                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">STAKE</div>
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