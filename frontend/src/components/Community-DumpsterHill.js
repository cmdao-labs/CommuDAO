import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const stOPT = '0x435BeAF4B83A6dc57927E9dB194a3Ccf54100F7a'

const wood = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const mice = '0x09DE640ecd50e1c81bCB266279e3ffC2719873df'
const jibLoot = '0x25C06d2B04Bdd7E8cf07CE41c77A68B011b320cC'

const dumpster1 = '0x5ba216159169759a09151Cb017bb5a58a3b44e4c'
const dumpster2 = '0xB6b281D2AB93D31757FF13D42147dF1B55c3dDb5'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const DumpsterHill = ({ config, setisLoading, txupdate, setTxupdate, erc20Abi, erc721Abi, dumpster1ABI, dumpster2ABI }) => {
    const { address } = useAccount()

    const [stOPTBalance, setStOPTBalance] = React.useState(0)

    const [nft, setNft] = React.useState([])

    const [woodHandle, setWoodHandle] = React.useState("")
    const [woodBalance, setWoodBalance] = React.useState(0)
    const [miceHandle, setMiceHandle] = React.useState("")
    const [miceBalance, setMiceBalance] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const lootnftSC = new ethers.Contract(jibLoot, erc721Abi, providerJBC)

        const thefetch = async () => {
            let nfts = []

            const walletFilter = await lootnftSC.filters.Transfer(null, address, null)
            const walletEvent = await lootnftSC.queryFilter(walletFilter, 145354, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: jibLoot,
                        abi: erc721Abi,
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

            const data3 = address !== null && address !== undefined ? await readContracts(config, {
                contracts: yournftwallet.map((item) => (
                    {
                        address: jibLoot,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                const response = await fetch(nftipfs)
                const nft = await response.json()

                const bonus = Number(1000000000)

                nfts.push({
                    Col: 1,
                    Id: Number(yournftwallet[i].Id),
                    Name: nft.name,
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    Reward: bonus,
                })
            }

            if (nfts.length === 0) { nfts.push(null) }

            const data = address !== null && address !== undefined ? await readContracts(config, {
                contracts: [
                    {
                        address: wood,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: stOPT,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: mice,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                    }
                ],
            }) : [0, 0, 0, ]

            const woodBal = data[0].result
            const stOPTBal = data[1].result
            const miceBal = data[2].result

            return [
                nfts, woodBal, stOPTBal, miceBal, 
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
            setNft(result[0])
            setWoodBalance(ethers.utils.formatEther(String(result[1])))
            setStOPTBalance(ethers.utils.formatEther(String(result[2])))
            setMiceBalance(ethers.utils.formatEther(String(result[3])))
        })

    }, [config, address, txupdate, erc20Abi, erc721Abi])

    const dump1 = async (_index) => {
        setisLoading(true)
        let token = ''
        let handle = 0
        if (_index === 1) {
            token = wood
            handle = woodHandle
        } else if (_index === 2) {
            token = mice
            handle = miceHandle
        }
        try {
            const tokenAllow = await readContract(config, {
                address: token,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, dumpster1],
            })
            if (tokenAllow < ethers.utils.parseEther(handle)) {
                let { request } = await simulateContract(config, {
                    address: token,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [dumpster1, ethers.utils.parseEther(String(10**8))],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: dumpster1,
                abi: dumpster1ABI,
                functionName: 'dump',
                args: [_index, ethers.utils.parseEther(handle)],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch {}
        setisLoading(false)
    }

    const dump2 = async (_index, _nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: jibLoot,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== dumpster2.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: jibLoot,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [dumpster2, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: dumpster2,
                abi: dumpster2ABI,
                functionName: 'dump',
                args: [_index, _nftid],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div className="pixel" style={{fontSize: "75px", color: "#fff", width: "fit-content"}}>Dumpster Hill</div>
                <div style={{fontSize: "17px", color: "#fff", width: "fit-content", marginTop: "30px"}} className="pixel">Let make our world cleaner, funding by OPTIMIST!</div>
            </div>
            <div style={{margin: "30px 100px"}}>
            </div>
        </div>

        <div style={{background: "rgb(0, 19, 33", margin: "0", padding: "75px 0", minHeight: "inherit", alignItems: "flex-start"}} className="collection">
            <div style={{width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "scroll"}} className="pixel mainprofile">
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll bold">
                    <div style={{backgroundColor: "rgb(39, 56, 82)", color: "#fff", minWidth: "300px", height: "75px", margin: 0, border: "none", boxShadow: "3px 3px 0 #0d0a1f"}} className="items">
                        <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibtp4almzmdovhvygxeyykw5fa6pqe76cbdum4quispehlddqgp2e" width="22" alt="$stOPT"/>
                        <div style={{marginLeft: "10px"}}>{Number(stOPTBalance).toFixed(5)}</div>
                    </div>
                </div>
                <div className="pixel" style={{fontSize: "22.5px", width: "fit-content", margin: "60px 0 20px 0"}}>Recyclable ERC-20</div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{backgroundColor: "rgb(39, 56, 82)", border: "none", color: "#fff", justifyContent: "space-around", padding: "30px 0", marginRight: "40px", width: "300px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "column", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                        <div>
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="100" alt="$WOOD"/>
                        </div>
                        <div style={{fontSize: "28px", marginTop: "40px"}} className="pixel">{Number(woodBalance).toFixed(0)}</div>
                        <input
                            style={{width: "70%", marginTop: "20px", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                            className="bold"
                            type="number"
                            step="1"
                            min="1"
                            placeholder={"Amount to Dump"}
                            onChange={(event) => {setWoodHandle(event.target.value)}}
                            value={woodHandle}
                        ></input>
                        {address !== null && address !== undefined && woodHandle !== '' && Number(woodHandle) <= Number(woodBalance) ?
                            <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => dump1(1)}>Recycle Now</div> :
                            <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Recycle Now</div>
                        }
                        <div style={{marginTop: "20px", textAlign: "left", fontSize: "16px"}} className="pixel bold">Will get {woodHandle / 1e9} stOPT</div>
                    </div>

                    <div style={{backgroundColor: "rgb(39, 56, 82)", border: "none", color: "#fff", justifyContent: "space-around", padding: "30px 0", marginRight: "40px", width: "300px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "column", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                        <div>
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" height="100" alt="$MICE"/>
                        </div>
                        <div style={{fontSize: "28px", marginTop: "40px"}} className="pixel">{Number(miceBalance).toFixed(0)}</div>
                        <input
                            style={{width: "70%", marginTop: "20px", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                            className="bold"
                            type="number"
                            step="1"
                            min="1"
                            placeholder={"Amount to Dump"}
                            onChange={(event) => {setMiceHandle(event.target.value)}}
                            value={miceHandle}
                        ></input>
                        {address !== null && address !== undefined && miceHandle !== '' && Number(miceHandle) <= Number(miceBalance) ?
                            <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => dump1(2)}>Recycle Now</div> :
                            <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Recycle Now</div>
                        }
                        <div style={{marginTop: "20px", textAlign: "left", fontSize: "16px"}} className="pixel bold">Will get {miceHandle / 1e4} stOPT</div>
                    </div>
                </div>                  
            </div>

            <div style={{width: "90%", marginTop: "60px", display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "scroll"}} className="pixel mainprofile">
                <div className="pixel" style={{fontSize: "22.5px", width: "fit-content", marginBottom: "20px"}}>Recyclable NFTs</div>
                {nft !== undefined && nft.length > 0 ?
                    <>
                    {nft[0] !== null ?
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                            {nft.map((item, index) => (
                                <div style={{backgroundColor: "rgb(39, 56, 82)", border: "none", color: "#fff", justifyContent: "space-around", padding: "30px 0", marginRight: "20px", width: "300px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "column", textAlign: "left", flexWrap: "wrap"}} className="nftCard" key={index}>
                                    <div style={{width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                        <img src={item.Image} height="250" alt="Can not load metadata." />
                                    </div>
                                    <div className="pixel" style={{fontSize: "18px", marginTop: "40px", color: "#fff"}}>{item.Name}</div>
                                    {address !== null && address !== undefined ?
                                        <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px"}} className="pixel button" onClick={() => dump2(1, item.Id)}>Recycle Now</div> :
                                        <div style={{display: "flex", justifyContent: "center", width: "170px", marginTop: "20px", borderRadius: "12px", padding: "15px 40px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Recycle Now</div>
                                    }
                                    <div style={{marginTop: "20px", textAlign: "left", fontSize: "16px"}} className="pixel bold">Will get {item.Reward / 1e9} stOPT</div>
                                </div>
                            ))}
                        </div> :
                        <>
                        {address !== undefined ?
                            <div style={{backgroundColor: "rgb(39, 56, 82)", border: "none", color: "#fff", justifyContent: "space-around", padding: "30px 0", marginRight: "20px", width: "300px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "column", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                                <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                <div style={{marginTop: "80px"}} className="bold">No Recyclable NFTs</div>
                            </div> :
                           <div style={{backgroundColor: "rgb(39, 56, 82)", border: "none", color: "#fff", justifyContent: "space-around", padding: "30px 0", marginRight: "20px", width: "300px", height: "fit-content", marginBottom: "10px", display: "flex", flexDirection: "column", textAlign: "left", flexWrap: "wrap"}} className="nftCard">
                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                <div style={{marginTop: "80px"}} className="bold">Please connect wallet</div>
                            </div>
                        }
                        </>
                    }
                    </> :
                    <div style={{marginTop: "20px", width: "fit-content"}}>
                        <ThreeDots fill="#5f6476" />
                    </div>
                }
            </div>
        </div>
    </>
    )
}

export default DumpsterHill