import React from 'react'
import { readContract, readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { ThreeDots } from 'react-loading-icons'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const osToken = '0xAc5299D92373E9352636559cca497d7683A47655'

const hexajibjib = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const enchantN1 = '0xc272A216B90483dAcb823213134D12ee11eF91fA'
const enchantR = '0xeA32261d199a9C0458F431a885a1F1600bB58dEd'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const Npcblacksmith = ({ setisLoading, txupdate, setTxupdate, enchantNABI, enchantRABI, osABI, erc721ABI, erc20ABI }) => {
    const { address } = useAccount()

    const [nft, setNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [jaspBalance, setJaspBalance] = React.useState(0)
    const [cuBalance, setCuBalance] = React.useState(0)
    const [osBalance, setOsBalance] = React.useState(0)

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
                        address: dunJasper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunCopper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: osToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    }
                ],
            }) : [0, 0, 0, 0, 0, ]

            const cmjBal = data[1]
            const jaspBal = data[2]
            const cuBal = data[3]
            const osBal = data[4]

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

            return [nfts, cmjBal, jaspBal, cuBal, osBal]
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
            setOsBalance(ethers.utils.formatEther(String(result[4])))
        })

    }, [address, erc20ABI, erc721ABI, txupdate])

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
            abi: erc721ABI,
            functionName: 'getApproved',
            args: [_nftid],
        })
        if (nftAllow.toUpperCase() !== enchantN1.toUpperCase()) {
            try {
                const config3 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
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
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== enchantN1.toUpperCase()) {
                const config3 = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
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
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantR],
            })
            if (cmjAllow < (550 * 10**18)) {
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
            if (jdaoAllow < (35 * 10**18)) {
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
            if (jaspAllow < (4 * 10**9)) {
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
    }
    const enchantRHandle2 = async (_nftid, _enchantindex) => {
        setisLoading(true)
        try {
            const cmjAllow = await readContract({
                address: cmjToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, enchantR],
            })
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
            if (jdaoAllow < (25 * 10**18)) {
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
            if (cuAllow < (12500 * 10**18)) {
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
    }

    const enchantRHandle3 = async (_nftid, _enchantindex) => {
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
    }

    const extractHandle = async (_nftid) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: hexajibjib,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== enchantN1.toUpperCase()) {
                const config = await prepareWriteContract({
                    address: hexajibjib,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [osToken, _nftid],
                })
                const approvetx = await writeContract(config)
                await approvetx.wait()
            }
            const config = await prepareWriteContract({
                address: osToken,
                abi: osABI,
                functionName: 'extract',
                args: [_nftid]
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}        
        setisLoading(false)
    }

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>Blacksmith House</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel"></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="https://nftstorage.link/ipfs/bafybeiaovfcdl3edviln3dyucsmm57ciafqurxtnrdtfjhqsywh43mgmdy" height="200" alt="Blacksmith" />
                </div>
            </div>

            <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                <div style={{textAlign: "left", marginTop: "50px", minHeight: "600px", width: "250px", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{width: "250px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Tokens</div>
                    <div className="pixel">
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                            <div style={{marginLeft: "10px"}}>{Number(cmjBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" width="22" alt="$CU"/>
                            <div style={{marginLeft: "10px"}}>{Number(cuBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" width="22" alt="$JASP"/>
                            <div style={{marginLeft: "10px"}}>{Number(jaspBalance).toFixed(3)}</div>
                        </div>
                        <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                            <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" width="22" alt="$OS"/>
                            <div style={{marginLeft: "10px"}}>{Number(osBalance).toFixed(3)}</div>
                        </div>
                    </div>
                </div>

                <div style={{textAlign: "left", margin: "50px 0 80px 0", minHeight: "600px", width: "70%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <div style={{fontSize: "16px", letterSpacing: "1px"}} className="bold">Upgradable NFTs <a className="emp" style={{textDecoration: "underline", marginLeft: "20px"}} href="https://demontocoshi.gitbook.io/commudao/functions/the-blacksmith-house" target="_blank" rel="noreferrer">📖 The Blacksmith Guidebook</a></div>
                    {nft !== undefined && nft.length > 0 ?
                        <>
                            {nft[0] !== null ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                    {nft.map((item, index) => (
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                            {String(item.Id).slice(0, 3) === "210" && Number(item.Id) % 100000 !== 1950 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        {Number(item.Id) % 100000 <= 400 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">
                                                                    {Number(item.Id) % 100000 === 250 ? <>{item.Name} +1</> : <></>}
                                                                    {Number(item.Id) % 100000 === 300 ? <>{item.Name.slice(0, -1)}2</> : <></>}
                                                                    {Number(item.Id) % 100000 === 400 ? <>{item.Name.slice(0, -1)}3</> : <></>}
                                                                </div>
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
                                                        {Number(item.Id) % 100000 === 1150 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}5</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 1550 ?
                                                            <div>
                                                                <img src="https://bafybeicehlhjgcqjgtfeke7kuroe32td37tpo3nkflbhc2gfrjykcapnqe.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}6</div>
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
                                                        {Number(item.Id) % 100000 === 1150 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 4</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 5</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 400} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 1550 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 5</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 6 [MAX]</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 400} cmpow per sec</div>
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
                                                            <img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="18" alt="$CU"/>
                                                            {Number(item.Id) % 100000 === 250 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>500</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 300 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>1000</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 400 ? 
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>1500</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 500 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>2500</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>5</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>150</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 550 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>3000</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>6</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 650 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>4000</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>8</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 750 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>5000</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>10</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 950 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>7500</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>15</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 1150 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>10000</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>20</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 1550 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>12500</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>25</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
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
                                                                {Number(item.Id) % 100000 === 550 || Number(item.Id) % 100000 === 750 || Number(item.Id) % 100000 === 1150 ? <>1/2</> : <></>}
                                                                {Number(item.Id) % 100000 === 650 || Number(item.Id) % 100000 === 950 || Number(item.Id) % 100000 === 1550 ? <>1/3</> : <></>}
                                                            </div>
                                                            <div className="pixel">depend on parent blockhash calculation</div>
                                                        </div> :
                                                        <></>
                                                    }
                                                    <div
                                                        style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
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
                                                            } else if (Number(item.Id) % 100000 === 1150) {
                                                                enchantRHandle2(item.Id, 36)
                                                            } else if (Number(item.Id) % 100000 === 1550) {
                                                                enchantRHandle2(item.Id, 37)
                                                            }
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
                                                </div> :
                                                <></>
                                            }
                                            
                                            {String(item.Id).slice(0, 3) === "410" && Number(item.Id) % 100000 !== 1850 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        {Number(item.Id) % 100000 === 150 ?
                                                            <div>
                                                                <img src="https://bafkreibnnijprwt4zgmwe2zhzikpr7svq4iyz4lsilbefimxqtqcyjdjue.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name} N +1</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 200 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 300 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}3</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 400 ?
                                                            <div>
                                                                <img src="https://bafkreieemul5cpbiijd7v7w4wbrbbyjonoddiyyoz6ziqowggrjpu2cgye.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -4)}R</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 450 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name} +1</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 550 ?
                                                            <div>
                                                                <img src="https://bafybeibg6zvac6eqgieocjfx3bz2tz3tb6lsduq2pz4hd6a3sqz455sau4.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 650 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}3</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 850 ?
                                                            <div>
                                                                <img src="https://bafybeigrfawkbvdnvalhjjmf44veea5hi7t37ltaqrd5fg63ey4wflynrm.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}4</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 1050 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}5</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 1450 ?
                                                            <div>
                                                                <img src="https://bafybeidyvcsmrzmtnwascngcxaeyoysgi645jz3buis3ilorbdslr63cwu.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}6</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        {Number(item.Id) % 100000 === 150 ?
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
                                                        {Number(item.Id) % 100000 === 200 ?
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
                                                        {Number(item.Id) % 100000 === 300 ?
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
                                                        {Number(item.Id) % 100000 === 400 ?
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
                                                        {Number(item.Id) % 100000 === 450 ?
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
                                                        {Number(item.Id) % 100000 === 550 ?
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
                                                        {Number(item.Id) % 100000 === 650 ?
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
                                                        {Number(item.Id) % 100000 === 850 ?
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
                                                        {Number(item.Id) % 100000 === 1050 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 4</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 5</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 400} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 1450 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 5</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 6</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 400} cmpow per sec</div>
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
                                                            <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                            {Number(item.Id) % 100000 === 150 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>0.1 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 200 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>0.2 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 300 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>0.3 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>50</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 400 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>0.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>5</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>150</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 450 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>0.6 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>6</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 550 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>0.8 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>8</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 650 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>1 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>10</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 850 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>1.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>15</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 1050 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>2 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>20</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 1450 ?
                                                                <>
                                                                    <div style={{margin: "0 5px"}}>2.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>25</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>100</div>
                                                                </> :
                                                                <></>
                                                            }
                                                        </div>
                                                    </div>
                                                    {Number(item.Id) % 100000 === 450 || Number(item.Id) % 100000 === 650 || Number(item.Id) % 100000 === 1050 ?
                                                        <div style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/2
                                                            </div>
                                                            <div className="pixel">(depend on parent blockhash calculation)</div>
                                                        </div> :
                                                        <></>
                                                    }
                                                    {Number(item.Id) % 100000 === 550 || Number(item.Id) % 100000 === 850 || Number(item.Id) % 100000 === 1450 ?
                                                        <div style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/3
                                                            </div>
                                                            <div className="pixel">(depend on parent blockhash calculation)</div>
                                                        </div> :
                                                        <></>
                                                    }
                                                    <div
                                                        style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                        className="pixel button"
                                                        onClick={() => {
                                                            if (Number(item.Id) % 100000 === 150) {
                                                                enchantNHandle(item.Id, 1)
                                                            } else if (Number(item.Id) % 100000 === 200) {
                                                                enchantNHandle(item.Id, 2)
                                                            } else if (Number(item.Id) % 100000 === 300) {
                                                                enchantNHandle(item.Id, 3)
                                                            } else if (Number(item.Id) % 100000 === 400) {
                                                                enchantRHandle(item.Id, 1)
                                                            } else if (Number(item.Id) % 100000 === 450) {
                                                                enchantRHandle(item.Id, 2)
                                                            } else if (Number(item.Id) % 100000 === 550) {
                                                                enchantRHandle(item.Id, 3)
                                                            } else if (Number(item.Id) % 100000 === 650) {
                                                                enchantRHandle(item.Id, 4)
                                                            } else if (Number(item.Id) % 100000 === 850) {
                                                                enchantRHandle(item.Id, 5)
                                                            } else if (Number(item.Id) % 100000 === 1050) {
                                                                enchantRHandle(item.Id, 6)
                                                            } else if (Number(item.Id) % 100000 === 1450) {
                                                                enchantRHandle(item.Id, 7)
                                                            }
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
                                                </div> :
                                                <></>
                                            }
                                            {/*
                                            ██████╗░░██████╗  ░█████╗░██╗░░░░░░█████╗░██╗░░░██╗███╗░░░███╗░█████╗░██████╗░███████╗
                                            ██╔══██╗██╔════╝  ██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝████╗░████║██╔══██╗██╔══██╗██╔════╝
                                            ██████╦╝╚█████╗░  ██║░░╚═╝██║░░░░░███████║░╚████╔╝░██╔████╔██║██║░░██║██████╔╝█████╗░░
                                            ██╔══██╗░╚═══██╗  ██║░░██╗██║░░░░░██╔══██║░░╚██╔╝░░██║╚██╔╝██║██║░░██║██╔══██╗██╔══╝░░
                                            ██████╦╝██████╔╝  ╚█████╔╝███████╗██║░░██║░░░██║░░░██║░╚═╝░██║╚█████╔╝██║░░██║███████╗
                                            ╚═════╝░╚═════╝░  ░╚════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝
                                            */}
                                            {String(item.Id).slice(0, 3) === "710" && Number(item.Id) % 100000 !== 4250 && Number(item.Id) % 100000 !== 14800 && Number(item.Id) % 100000 !== 25700 &&
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard pixel">
                                                    <div className="emp" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}}>{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px", color: "#5f6476"}} className="fa fa-caret-right"></i>
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
                                                                <img src="https://bafybeihlewrgj25x3p6nvqa7rrxh54j66c7lc3azkda2tds6wshhsslipu.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 1000 &&
                                                            <div>
                                                                <img src={"https://nftstorage.link/ipfs/bafybeia7eeifiowqnq6tkm37u6wk4lm7jizlxb2i6sndggdathomvbezoy"} width="120" alt="Can not load metadata." />
                                                                {item.Name.slice(-4, -1) === "N +" && <div style={{width: "150px"}}>{item.Name.slice(0, -4)}R +2</div>}
                                                                {item.Name.slice(-4, -1) === "R +" && <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>}
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
                                                                <img src="https://bafybeia6v737yn3r7knak2yxwqz3yhj4idldhstpen5qavsy7lk3zze3d4.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 2650 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3400 &&
                                                            <div>
                                                                <img src="https://bafybeibvhkaneonaxrnhbc7zbpxjrezjkp4xszrugtpq6cs2dwouizzwt4.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 1800 &&
                                                            <div>
                                                                <img src="https://bafybeid6ov5ip3oqbmgo7jzbpii42u67kqlhlm33jdfntokt5hgalsynzq.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 2750 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3900 &&
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafybeig4snhfyunadwnppx6uvfcqevwhfqqkddjcxd64txmnbbh3sdtjpm" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 5250 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 6800 &&
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafybeihv5zwkzxpopuhxhzriwq72alnt7epssujj4tzom22y6iwltfomke" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 8550 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 10500 &&
                                                            <div>
                                                                <img src="https://bafybeig2i4khmr5m3zt4nplxrspylpebts47l7dg2l237txlvngowvspcy.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3450 &&
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafybeiezbycb4fvrvdyoxbgi5xhybu3rsu42n73bzosplun455g3piev5u" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 4600 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 5950 &&
                                                            <div>
                                                                <img src="https://bafybeifrjh6icoz3szmzuurwcf3wr3p32idzfy5dxza42ieo2tryj5mjli.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 7500 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 9250 &&
                                                            <div>
                                                                <img src="https://bafybeibuv5a4sdapkp7ncpsn3yzlk2kit3jliwxp6sd5clphd7xia4xky4.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 11200 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 13350 &&
                                                            <div>
                                                                <img src="https://bafybeifeshgxjiddolfuttdsgspbzdp7y7zjws4eoctklyi2wzjlbg74eu.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 18050 &&
                                                            <div>
                                                                <img src="https://bafybeibfhaxkxp5z634v6rvhcymrcl2mtfl7keiecmbsgg5ygi7ofv2xsa.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}9</div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
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
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 450} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 1000 &&
                                                            <>
                                                                {item.Name.slice(-4, -1) === "N +" &&
                                                                    <>
                                                                        <div>
                                                                            <div>Level 3</div>
                                                                            <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                        </div>
                                                                        <div>
                                                                            <div>Level 2</div>
                                                                            <div style={{width: "150px"}}>{item.RewardPerSec + 450} cmpow per sec</div>
                                                                        </div>
                                                                    </>
                                                                }
                                                                {item.Name.slice(-4, -1) === "R +" &&
                                                                    <>
                                                                        <div>
                                                                            <div>Level 1</div>
                                                                            <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                        </div>
                                                                        <div>
                                                                            <div>Level 2</div>
                                                                            <div style={{width: "150px"}}>{item.RewardPerSec + 450} cmpow per sec</div>
                                                                        </div>
                                                                    </>
                                                                }
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
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 2150} cmpow per sec</div>
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
                                                        <div>
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}}>
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
                                                            {Number(item.Id) % 100000 === 1000 &&
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
                                                        <div style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/2
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                    }
                                                    {(Number(item.Id) % 100000 === 1000 || Number(item.Id) % 100000 === 2000 || Number(item.Id) % 100000 === 3400 || Number(item.Id) % 100000 === 1800 || Number(item.Id) % 100000 === 3900 || Number(item.Id) % 100000 === 6800 || Number(item.Id) % 100000 === 10500 || Number(item.Id) % 100000 === 3450 || Number(item.Id) % 100000 === 5950 || Number(item.Id) % 100000 === 9250 || Number(item.Id) % 100000 === 13350) &&
                                                        <div style={{margin: "10px 0", width: "350px"}}>
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
                                                        className="button"
                                                        onClick={() => {
                                                            if (Number(item.Id) % 100000 === 250) {
                                                                enchantNHandle(item.Id, 4)
                                                            } else if (Number(item.Id) % 100000 === 500) {
                                                                enchantNHandle(item.Id, 5)
                                                            } else if (Number(item.Id) % 100000 === 750) {
                                                                enchantNHandle(item.Id, 6)
                                                            } else if (Number(item.Id) % 100000 === 550) {
                                                                enchantRHandle(item.Id, 12)
                                                            } else if (Number(item.Id) % 100000 === 1000) {
                                                                enchantRHandle(item.Id, 13)
                                                            } else if (Number(item.Id) % 100000 === 1450) {
                                                                enchantRHandle(item.Id, 14)
                                                            } else if (Number(item.Id) % 100000 === 2000) {
                                                                enchantRHandle(item.Id, 15)
                                                            } else if (Number(item.Id) % 100000 === 2650) {
                                                                enchantRHandle(item.Id, 16)
                                                            } else if (Number(item.Id) % 100000 === 3400) {
                                                                enchantRHandle(item.Id, 17)
                                                            } else if (Number(item.Id) % 100000 === 1050) {
                                                                enchantRHandle3(item.Id, 8)
                                                            } else if (Number(item.Id) % 100000 === 1800) {
                                                                enchantRHandle3(item.Id, 9)
                                                            } else if (Number(item.Id) % 100000 === 2750) {
                                                                enchantRHandle3(item.Id, 10)
                                                            } else if (Number(item.Id) % 100000 === 3900) {
                                                                enchantRHandle3(item.Id, 11)
                                                            } else if (Number(item.Id) % 100000 === 5250) {
                                                                enchantRHandle3(item.Id, 110)
                                                            } else if (Number(item.Id) % 100000 === 6800) {
                                                                enchantRHandle3(item.Id, 111)
                                                            } else if (Number(item.Id) % 100000 === 8550) {
                                                                enchantRHandle3(item.Id, 112)
                                                            } else if (Number(item.Id) % 100000 === 10500) {
                                                                enchantRHandle3(item.Id, 113)
                                                            } else if (Number(item.Id) % 100000 === 2550) {
                                                                enchantRHandle3(item.Id, 18)
                                                            } else if (Number(item.Id) % 100000 === 3450) {
                                                                enchantRHandle3(item.Id, 19)
                                                            } else if (Number(item.Id) % 100000 === 4600) {
                                                                enchantRHandle3(item.Id, 20)
                                                            } else if (Number(item.Id) % 100000 === 5950) {
                                                                enchantRHandle3(item.Id, 21)
                                                            } else if (Number(item.Id) % 100000 === 7500) {
                                                                enchantRHandle3(item.Id, 114)
                                                            } else if (Number(item.Id) % 100000 === 9250) {
                                                                enchantRHandle3(item.Id, 115)
                                                            } else if (Number(item.Id) % 100000 === 11200) {
                                                                enchantRHandle3(item.Id, 116)
                                                            } else if (Number(item.Id) % 100000 === 13350) {
                                                                enchantRHandle3(item.Id, 117)
                                                            } else if (Number(item.Id) % 100000 === 18050) {
                                                                enchantRHandle3(item.Id, 118)
                                                            }
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
                                                </div>
                                            }
                                            {/*
                                            ███████╗██╗░░░██╗██╗░░░░░██╗░░░░░  ██████╗░██╗░░░░░░█████╗░████████╗███████╗  ██╗░░░██╗██╗░░██╗
                                            ██╔════╝██║░░░██║██║░░░░░██║░░░░░  ██╔══██╗██║░░░░░██╔══██╗╚══██╔══╝██╔════╝  ██║░░░██║██║░██╔╝
                                            █████╗░░██║░░░██║██║░░░░░██║░░░░░  ██████╔╝██║░░░░░███████║░░░██║░░░█████╗░░  ╚██╗░██╔╝█████═╝░
                                            ██╔══╝░░██║░░░██║██║░░░░░██║░░░░░  ██╔═══╝░██║░░░░░██╔══██║░░░██║░░░██╔══╝░░  ░╚████╔╝░██╔═██╗░
                                            ██║░░░░░╚██████╔╝███████╗███████╗  ██║░░░░░███████╗██║░░██║░░░██║░░░███████╗  ░░╚██╔╝░░██║░╚██╗
                                            ╚═╝░░░░░░╚═════╝░╚══════╝╚══════╝  ╚═╝░░░░░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝  ░░░╚═╝░░░╚═╝░░╚═╝
                                            */}
                                            {String(item.Id).slice(0, 3) === "310" && Number(item.Id) % 100000 !== 4250 && Number(item.Id) % 100000 !== 14800 && Number(item.Id) % 100000 !== 25700 &&
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard pixel">
                                                    <div className="emp" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
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
                                                                <img src="https://bafybeibuck4l6j3qla3jwbvwh3c3nonb3vww5oytn76m4fohs3qpfxlt54.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 1000 &&
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafybeibtmtw43bbjgorck6z7qlks5fd6aoaufgk5uhyaz7q67dtdixmkh4" width="120" alt="Can not load metadata." />
                                                                {item.Name.slice(-4, -1) === "N +" && <div style={{width: "150px"}}>{item.Name.slice(0, -4)}R +2</div>}
                                                                {item.Name.slice(-4, -1) === "R +" && <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>}
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
                                                                <img src="https://bafybeibydefy4t6bckzi3dawzdxjh666pawc3nujp4vhat5ocohc4nfcl4.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 2650 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3400 &&
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafybeicahliaa3ro3os2mgiutbjlkp7mjciatrwysqxkvun3ecfx5rjw4y" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 1800 &&
                                                            <div>
                                                                <img src="https://bafybeigpvswa6bv3lfssrhjoqdq3hz5nrnazc6uagii3w25jj6d4j7qtr4.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 2750 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3900 &&
                                                            <div>
                                                                <img src="https://bafybeig4nyptfau2oml6vaylhs3hxeub7xiltd3hx5f7bd4jzi2xtwfbfy.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 5250 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 6800 &&
                                                            <div>
                                                                <img src="https://bafybeiasbwb2x6ra47eeqp6fy4hhrrdc7ioxadnjo2soqbgklnl35axgmy.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 8550 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 10500 &&
                                                            <div>
                                                                <img src="https://bafybeihp5kptccspluqo3scdb6zvzgelhfdi2xjr2vpx4sytevj4zd346i.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3450 &&
                                                            <div>
                                                                <img src="https://bafybeicyt57mra3mm52zwuoekvaw6z4y7mgjo6tqpt6xhdyaec6hbjsnhy.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 4600 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 5950 &&
                                                            <div>
                                                                <img src="https://bafybeibck5qgu6nhnukiyqf66ojvxez3uputpaami6c5nxthbaswh6ac6e.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 7500 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 9250 &&
                                                            <div>
                                                                <img src="https://bafybeid6xhc4dizecrnvnfbodjxefj37sk6zufdrzylnvc27mroulqq6ge.ipfs.nftstorage.link/" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 11200 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 13350 &&
                                                            <div>
                                                                <img src="https://bafybeiaw2jmyd27tntntjdt2zb3gkqnyu4mqjf4v75wxn5h7yyo6ayj23e.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 18050 &&
                                                            <div>
                                                                <img src="https://bafybeihv2y6c7lmwbr3dsskyfzzxw7blmfjxi7xyz6s7tifwi4433eeeba.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}9</div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
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
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 450} cmpow per sec</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {Number(item.Id) % 100000 === 1000 &&
                                                            <>
                                                                {item.Name.slice(-4, -1) === "N +" &&
                                                                    <>
                                                                        <div>
                                                                            <div>Level 3</div>
                                                                            <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                        </div>
                                                                        <div>
                                                                            <div>Level 2</div>
                                                                            <div style={{width: "150px"}}>{item.RewardPerSec + 450} cmpow per sec</div>
                                                                        </div>
                                                                    </>
                                                                }
                                                                {item.Name.slice(-4, -1) === "R +" &&
                                                                    <>
                                                                        <div>
                                                                            <div>Level 1</div>
                                                                            <div style={{width: "150px"}}>{item.RewardPerSec} cmpow per sec</div>
                                                                        </div>
                                                                        <div>
                                                                            <div>Level 2</div>
                                                                            <div style={{width: "150px"}}>{item.RewardPerSec + 450} cmpow per sec</div>
                                                                        </div>
                                                                    </>
                                                                }
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
                                                                    <div style={{width: "150px"}}>{item.RewardPerSec + 2150} cmpow per sec</div>
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
                                                        <div>
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}}>
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
                                                            {Number(item.Id) % 100000 === 1000 &&
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
                                                        <div style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/2
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                    }
                                                    {(Number(item.Id) % 100000 === 1000 || Number(item.Id) % 100000 === 2000 || Number(item.Id) % 100000 === 3400 || Number(item.Id) % 100000 === 1800 || Number(item.Id) % 100000 === 3900 || Number(item.Id) % 100000 === 6800 || Number(item.Id) % 100000 === 10500 || Number(item.Id) % 100000 === 3450 || Number(item.Id) % 100000 === 5950 || Number(item.Id) % 100000 === 9250 || Number(item.Id) % 100000 === 13350) &&
                                                        <div style={{margin: "10px 0", width: "350px"}}>
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
                                                        className="button"
                                                        onClick={() => {
                                                            if (Number(item.Id) % 100000 === 250) {
                                                                enchantNHandle(item.Id, 7)
                                                            } else if (Number(item.Id) % 100000 === 500) {
                                                                enchantNHandle(item.Id, 8)
                                                            } else if (Number(item.Id) % 100000 === 750) {
                                                                enchantNHandle(item.Id, 9)
                                                            } else if (Number(item.Id) % 100000 === 550) {
                                                                enchantRHandle(item.Id, 22)
                                                            } else if (Number(item.Id) % 100000 === 1000) {
                                                                enchantRHandle(item.Id, 23)
                                                            } else if (Number(item.Id) % 100000 === 1450) {
                                                                enchantRHandle(item.Id, 24)
                                                            } else if (Number(item.Id) % 100000 === 2000) {
                                                                enchantRHandle(item.Id, 25)
                                                            } else if (Number(item.Id) % 100000 === 2650) {
                                                                enchantRHandle(item.Id, 26)
                                                            } else if (Number(item.Id) % 100000 === 3400) {
                                                                enchantRHandle(item.Id, 27)
                                                            } else if (Number(item.Id) % 100000 === 1050) {
                                                                enchantRHandle3(item.Id, 38)
                                                            } else if (Number(item.Id) % 100000 === 1800) {
                                                                enchantRHandle3(item.Id, 39)
                                                            } else if (Number(item.Id) % 100000 === 2750) {
                                                                enchantRHandle3(item.Id, 40)
                                                            } else if (Number(item.Id) % 100000 === 3900) {
                                                                enchantRHandle3(item.Id, 119)
                                                            } else if (Number(item.Id) % 100000 === 5250) {
                                                                enchantRHandle3(item.Id, 120)
                                                            } else if (Number(item.Id) % 100000 === 6800) {
                                                                enchantRHandle3(item.Id, 121)
                                                            } else if (Number(item.Id) % 100000 === 8550) {
                                                                enchantRHandle3(item.Id, 122)
                                                            } else if (Number(item.Id) % 100000 === 10500) {
                                                                enchantRHandle3(item.Id, 123)
                                                            } else if (Number(item.Id) % 100000 === 2550) {
                                                                enchantRHandle3(item.Id, 65)
                                                            } else if (Number(item.Id) % 100000 === 3450) {
                                                                enchantRHandle3(item.Id, 66)
                                                            } else if (Number(item.Id) % 100000 === 4600) {
                                                                enchantRHandle3(item.Id, 67)
                                                            } else if (Number(item.Id) % 100000 === 5950) {
                                                                enchantRHandle3(item.Id, 68)
                                                            } else if (Number(item.Id) % 100000 === 7500) {
                                                                enchantRHandle3(item.Id, 69)
                                                            } else if (Number(item.Id) % 100000 === 9250) {
                                                                enchantRHandle3(item.Id, 70)
                                                            } else if (Number(item.Id) % 100000 === 11200) {
                                                                enchantRHandle3(item.Id, 71)
                                                            } else if (Number(item.Id) % 100000 === 13350) {
                                                                enchantRHandle3(item.Id, 72)
                                                            } else if (Number(item.Id) % 100000 === 18050) {
                                                                enchantRHandle3(item.Id, 73)
                                                            }
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
                                                </div>
                                            }
                                            {/*
                                            ███╗░░░███╗██╗░░░██╗████████╗  ██████╗░░█████╗░░█████╗░██╗░░██╗██████╗░░█████╗░░█████╗░██╗░░██╗
                                            ████╗░████║██║░░░██║╚══██╔══╝  ██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝
                                            ██╔████╔██║╚██╗░██╔╝░░░██║░░░  ██████╦╝███████║██║░░╚═╝█████═╝░██████╔╝███████║██║░░╚═╝█████═╝░
                                            ██║╚██╔╝██║░╚████╔╝░░░░██║░░░  ██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔═══╝░██╔══██║██║░░██╗██╔═██╗░
                                            ██║░╚═╝░██║░░╚██╔╝░░░░░██║░░░  ██████╦╝██║░░██║╚█████╔╝██║░╚██╗██║░░░░░██║░░██║╚█████╔╝██║░╚██╗
                                            ╚═╝░░░░░╚═╝░░░╚═╝░░░░░░╚═╝░░░  ╚═════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝
                                            */}
                                            {String(item.Id).slice(0, 3) === "511" && Number(item.Id) % 100000 !== 1000 && Number(item.Id) % 100000 !== 4250 && Number(item.Id) % 100000 !== 14800 && Number(item.Id) % 100000 !== 4600 &&
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
                                                                <img src="https://bafybeigfjtubf2bkbtfux4frxakg2lhldh466vgqdsqokfmna4s4ny5plu.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 950 &&
                                                            <div>
                                                                <img src="https://bafybeia3g7in5n7qfdutd7ans4rdutljxyvo4o4wvbnwsoau6szulovw44.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
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
                                                                <img src="https://bafybeigtwkpxh4n4ubs53xczlqkoyu5tbgfst2coolbiypdodhxotyp4iu.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 2650 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3400 &&
                                                            <div>
                                                                <img src="https://bafybeierwfw25hyasoyujef67avzoqu7zhhlj72jlk4gzekhscrmzj2ax4.ipfs.nftstorage.link/" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 1800 &&
                                                            <div>
                                                                <img src="https://bafybeibglvexzr4rrslgzeeyyc4oanfyyudijupwwchcx2bqtyitjt7qxe.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 2750 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3900 &&
                                                            <div>
                                                                <img src="https://bafybeifc3k3ze3tspj4skhu5fh3sjaaz7b2hvwzwmtl7yza7zmra75qluy.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 5250 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 6800 &&
                                                            <div>
                                                                <img src={"https://bafybeigurgdws327lktb24p5d6rkhori6zkkqwtiojwa6b4pj7l34r3vze.ipfs.nftstorage.link/"} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 8550 &&
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 10500 &&
                                                            <div>
                                                                <img src={"https://bafybeihthekv3rdnhoy6q27ly44o3n2axcwq4hfe6rgzda3jhf5pi4sqdm.ipfs.nftstorage.link"} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                            </div>
                                                        }
                                                        {Number(item.Id) % 100000 === 3450 &&
                                                            <div>
                                                                <img src={"https://bafybeifavcwgollo2lkh6x2lhz5yakxxjqd5jkcbrqmk2pcw4srxsxxbsq.ipfs.nftstorage.link"} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
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
                                                    </div>
                                                    <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                    <div className="pixel" style={{marginTop: "10px", width: "350px"}}>
                                                        <div>
                                                            <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                            Enchanted resource
                                                        </div>
                                                        <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}}>
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
                                                        </div>
                                                    </div>
                                                    {(Number(item.Id) % 100000 === 550 || Number(item.Id) % 100000 === 1450 || Number(item.Id) % 100000 === 1050 || Number(item.Id) % 100000 === 2650 || Number(item.Id) % 100000 === 2750 || Number(item.Id) % 100000 === 5250 || Number(item.Id) % 100000 === 8550 || Number(item.Id) % 100000 === 2550) &&
                                                        <div className="pixel" style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/2
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                    }
                                                    {(Number(item.Id) % 100000 === 950 || Number(item.Id) % 100000 === 2000 || Number(item.Id) % 100000 === 3400 || Number(item.Id) % 100000 === 1800 || Number(item.Id) % 100000 === 3900 || Number(item.Id) % 100000 === 6800 || Number(item.Id) % 100000 === 10500 || Number(item.Id) % 100000 === 3450) &&
                                                        <div className="pixel" style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/3
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                    }
                                                    <div
                                                        style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                        className="pixel button"
                                                        onClick={() => {
                                                            if (Number(item.Id) % 100000 === 250) {
                                                                enchantNHandle(item.Id, 13)
                                                            } else if (Number(item.Id) % 100000 === 500) {
                                                                enchantNHandle(item.Id, 14)
                                                            } else if (Number(item.Id) % 100000 === 750) {
                                                                enchantNHandle(item.Id, 15)
                                                            } else if (Number(item.Id) % 100000 === 550) {
                                                                enchantRHandle(item.Id, 28)
                                                            } else if (Number(item.Id) % 100000 === 950) {
                                                                enchantRHandle(item.Id, 29)
                                                            } else if (Number(item.Id) % 100000 === 1450) {
                                                                enchantRHandle(item.Id, 30)
                                                            } else if (Number(item.Id) % 100000 === 2000) {
                                                                enchantRHandle(item.Id, 48)
                                                            } else if (Number(item.Id) % 100000 === 2650) {
                                                                enchantRHandle(item.Id, 49)
                                                            } else if (Number(item.Id) % 100000 === 3400) {
                                                                enchantRHandle(item.Id, 50)
                                                            } else if (Number(item.Id) % 100000 === 1050) {
                                                                enchantRHandle3(item.Id, 74)
                                                            } else if (Number(item.Id) % 100000 === 1800) {
                                                                enchantRHandle3(item.Id, 75)
                                                            } else if (Number(item.Id) % 100000 === 2750) {
                                                                enchantRHandle3(item.Id, 76)
                                                            } else if (Number(item.Id) % 100000 === 3900) {
                                                                enchantRHandle3(item.Id, 77)
                                                            } else if (Number(item.Id) % 100000 === 5250) {
                                                                enchantRHandle3(item.Id, 78)
                                                            } else if (Number(item.Id) % 100000 === 6800) {
                                                                enchantRHandle3(item.Id, 79)
                                                            } else if (Number(item.Id) % 100000 === 8550) {
                                                                enchantRHandle3(item.Id, 80)
                                                            } else if (Number(item.Id) % 100000 === 10500) {
                                                                enchantRHandle3(item.Id, 81)
                                                            } else if (Number(item.Id) % 100000 === 2550) {
                                                                enchantRHandle3(item.Id, 83)
                                                            } else if (Number(item.Id) % 100000 === 3450) {
                                                                enchantRHandle3(item.Id, 82)
                                                            }
                                                        }}
                                                    >
                                                        UPGRADE
                                                    </div>
                                                </div>
                                            }

                                            {String(item.Id).slice(0, 3) === "611" && Number(item.Id) % 100000 !== 1000 && Number(item.Id) % 100000 !== 4250 && Number(item.Id) % 100000 !== 1800 && Number(item.Id) % 100000 !== 3450 ?
                                                <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                    <div style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                        <div>
                                                            <img src={item.Image} width="120" alt="Can not load metadata." />
                                                            <div style={{width: "150px"}} className="emp pixel">{item.Name}</div>
                                                        </div>
                                                        <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                        {Number(item.Id) % 100000 === 250 || Number(item.Id) % 100000 === 550 || Number(item.Id) % 100000 === 1050 || Number(item.Id) % 100000 === 2550 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name} +1</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 500 ?
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 750 ?
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafybeiggh5665adov665f3or3d4kleulouwc5hwtexhekmp3oo2p5u3ise" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}3</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 950 ?
                                                            <div>
                                                                <img src="https://bafybeih43snads6rama5e6zhsl5v6k5z3rtjmzdvhxsvnsgxi355k4frmu.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}2</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 1450 ?
                                                            <div>
                                                                <img src="https://bafybeih43snads6rama5e6zhsl5v6k5z3rtjmzdvhxsvnsgxi355k4frmu.ipfs.nftstorage.link" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}3</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 2000 ?
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafybeifj4bqs5obxqkscst5d4egmdv6al6exsdrko3pptrsi6jqjbpq6re" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}4</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 2650 ?
                                                            <div>
                                                                <img src="https://nftstorage.link/ipfs/bafybeifj4bqs5obxqkscst5d4egmdv6al6exsdrko3pptrsi6jqjbpq6re" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}5</div>
                                                            </div> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 3400 ?
                                                            <div>
                                                                <img src="https://bafybeieubrsdnfy5weskvt45tarpyhsqtt4a7mhqb3f6h4tjafex4hll3a.ipfs.nftstorage.link/" width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}} className="emp pixel">{item.Name.slice(0, -1)}6</div>
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
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 250} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 500 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 1</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 2</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 250} cmpow per sec</div>
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
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 250} cmpow per sec</div>
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
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 400} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 950 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 1</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 2</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 500} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 1450 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 2</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 3</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 550} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 2000 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 3</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 4</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 650} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 2650 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 4</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 5</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 750} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 3400 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 5</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 6</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 850} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 1050 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 0</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 1</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 750} cmpow per sec</div>
                                                                </div>
                                                            </> :
                                                            <></>
                                                        }
                                                        {Number(item.Id) % 100000 === 2550 ?
                                                            <>
                                                                <div>
                                                                    <div className="pixel">Level 0</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                                </div>
                                                                <div>
                                                                    <div className="pixel">Level 1</div>
                                                                    <div style={{width: "150px"}} className="pixel">{item.RewardPerSec + 900} cmpow per sec</div>
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
                                                            {Number(item.Id) % 100000 === 250 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>0.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>150</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 500 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>1.0 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>300</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 750 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>1.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>450</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 550 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>1.0 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>10</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>300</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 950 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>1.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>15</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>350</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 1450 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>2.0 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>20</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>400</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 2000 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>2.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>25</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>450</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 2650 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>3.0 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>30</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>500</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 3400 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="18" alt="$JASP"/>
                                                                    <div style={{margin: "0 5px"}}>3.5 GWEI</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>35</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>550</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 1050 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>130</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>15</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>350</div>
                                                                </> :
                                                                <></>
                                                            }
                                                            {Number(item.Id) % 100000 === 2550 ?
                                                                <>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                                    <div style={{margin: "0 5px"}}>180</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                                                    <div style={{margin: "0 5px"}}>20</div>
                                                                    <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                    <img src="https://nftstorage.link/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                    <div style={{margin: "0 5px"}}>400</div>
                                                                </> :
                                                                <></>
                                                            }
                                                        </div>
                                                    </div>
                                                    {Number(item.Id) % 100000 === 550 || Number(item.Id) % 100000 === 1450 || Number(item.Id) % 100000 === 2650 || Number(item.Id) % 100000 === 1050 || Number(item.Id) % 100000 === 2550 ?
                                                        <div style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/2
                                                            </div>
                                                            <div className="pixel">(depend on parent blockhash calculation)</div>
                                                        </div> :
                                                        <></>
                                                    }
                                                    {Number(item.Id) % 100000 === 950 || Number(item.Id) % 100000 === 2000 || Number(item.Id) % 100000 === 3400 ?
                                                        <div style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/3
                                                            </div>
                                                            <div className="pixel">(depend on parent blockhash calculation)</div>
                                                        </div> :
                                                        <></>
                                                    }
                                                    <div
                                                        style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                        className="pixel button"
                                                        onClick={() => {
                                                            if (Number(item.Id) % 100000 === 250) {
                                                                enchantNHandle(item.Id, 16)
                                                            } else if (Number(item.Id) % 100000 === 500) {
                                                                enchantNHandle(item.Id, 17)
                                                            } else if (Number(item.Id) % 100000 === 750) {
                                                                enchantNHandle(item.Id, 18)
                                                            } else if (Number(item.Id) % 100000 === 550) {
                                                                enchantRHandle(item.Id, 41)
                                                            } else if (Number(item.Id) % 100000 === 950) {
                                                                enchantRHandle(item.Id, 42)
                                                            } else if (Number(item.Id) % 100000 === 1450) {
                                                                enchantRHandle(item.Id, 43)
                                                            } else if (Number(item.Id) % 100000 === 2000) {
                                                                enchantRHandle(item.Id, 44)
                                                            } else if (Number(item.Id) % 100000 === 2650) {
                                                                enchantRHandle(item.Id, 45)
                                                            } else if (Number(item.Id) % 100000 === 3400) {
                                                                enchantRHandle(item.Id, 46)
                                                            } else if (Number(item.Id) % 100000 === 1050) {
                                                                enchantRHandle3(item.Id, 92)
                                                            } else if (Number(item.Id) % 100000 === 2550) {
                                                                enchantRHandle3(item.Id, 101)
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
                    <div style={{marginTop: "40px", width: "100%", borderBottom: "1px solid #dddade"}}></div>
                    <div style={{marginTop: "20px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Extractable NFTs</div>
                    {nft !== undefined && nft.length > 0 ?
                        <>
                            {nft[0] !== null ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                    {nft.map((item, index) => (
                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                            <div style={{justifyContent: "space-between", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                <div style={{width: "350px", marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                                                    <img src={item.Image} width="120" alt="Can not load metadata." />
                                                    <div style={{marginTop: "15px", width: "200px"}} className="emp pixel">{item.Name}</div>
                                                </div>
                                                <div style={{width: "100%", textAlign: "left"}} className="pixel">{item.RewardPerSec} cmpow per sec</div>
                                                <div style={{width: "100%", borderBottom: "1px solid #dddade"}}></div>
                                                <div style={{margin: "10px 0", width: "350px"}}>
                                                    <div className="pixel">
                                                        <i style={{fontSize: "18px", marginRight: "5px"}} className="fas fa-hammer"></i>
                                                        Break down to
                                                    </div>
                                                    <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                        <img src="https://nftstorage.link/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                                        <div style={{margin: "0 5px"}}>{item.RewardPerSec}</div>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", marginTop: "7.5px", width: "120px"}}
                                                    className="pixel button"
                                                    onClick={() => {extractHandle(item.Id)}}
                                                >
                                                    OS EXTRACT
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div> :
                                <>
                                    {address !== undefined ?
                                        <div className="nftCard" style={{justifyContent: "center"}}>
                                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fas fa-scroll"></i>
                                            <div className="bold">No NFTs equipment to extract.</div>
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

export default Npcblacksmith