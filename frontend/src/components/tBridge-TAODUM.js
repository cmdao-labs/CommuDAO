import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const taodumBKC = '0x165DCCB59F0aaE80a0C20c8CF2b536BE6E120be9'
const taodumJBC = '0x2036186F6d5287FcB05C56C38374AC5236d8A61d'
const jbcBridge = '0xf51F20D135b1Aa8A6d27eA61Bba47A453c8ee6D2'
const bkcBridge = '0x519fF534E58A226c11566b0546f900766664B705'
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const TBridgeTAODUM = ({ config, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc721Abi, tbridgeNFTABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const [nft, setNft] = React.useState([])
    const [nft2, setNft2] = React.useState([])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const taodumBkcSC = new ethers.Contract(taodumBKC, erc721Abi, providerBKC)
        const taodumJbcSC = new ethers.Contract(taodumJBC, erc721Abi, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            let walletRemoveDup = []
            if (address !== null) {
                const walletFilter = await taodumBkcSC.filters.Transfer(null, address, null)
                const walletEvent = await taodumBkcSC.queryFilter(walletFilter, 15323522, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data = address !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: taodumBKC,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 96
                    }
                ))
            }) : null
            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null; i++) {
                if (data[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }
            const data2 = address !== null ? await readContracts(config, {
                contracts: yournftwallet.map((item) => (
                    {
                        address: taodumBKC,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 96
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data2[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + ' #' + yournftwallet[i].Id,
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            let nfts2 = []
            let wallet2RemoveDup = []
            if (address !== null) {
                const wallet2Filter = await taodumJbcSC.filters.Transfer(null, address, null)
                const wallet2Event = await taodumJbcSC.queryFilter(wallet2Filter, 2725554, "latest")
                const wallet2Map = await Promise.all(wallet2Event.map(async (obj) => String(obj.args.tokenId)))
                wallet2RemoveDup = wallet2Map.filter((obj, index) => wallet2Map.indexOf(obj) === index)
            }
            const data3 = address !== null ? await readContracts(config, {
                contracts: wallet2RemoveDup.map((item) => (
                    {
                        address: taodumJBC,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : null
            let yournftwallet2 = []
            for (let i = 0; i <= wallet2RemoveDup.length - 1 && address !== null; i++) {
                if (data3[i].result.toUpperCase() === address.toUpperCase()) {
                    yournftwallet2.push({Id: String(wallet2RemoveDup[i])})
                }
            }
            const data4 = address !== null ? await readContracts(config, {
                contracts: yournftwallet2.map((item) => (
                    {
                        address: taodumJBC,
                        abi: erc721Abi,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : null
            for (let i = 0; i <= yournftwallet2.length - 1; i++) {
                const nftipfs = data4[i].result
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}
                nfts2.push({
                    Id: yournftwallet2[i].Id,
                    Name: nft.name + ' #' + yournftwallet2[i].Id,
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                })
            }
            if (nfts2.length === 0) { nfts2.push(null) }
            
            return [ nfts, nfts2 ]
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
            setNft2(result[1])
        })

    }, [config, address, txupdate, erc721Abi])

    const depositTaoHandle = async (_nftId) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: taodumBKC,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftId],
            })
            if (nftAllow.toUpperCase() !== bkcBridge.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: taodumBKC,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [bkcBridge, _nftId],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }        
            let { request } = await simulateContract(config, {
                address: bkcBridge,
                abi: tbridgeNFTABI,
                functionName: 'receiveNFTs',
                args: [_nftId],
                value: ethers.utils.parseEther('1'),
                chainId: 96,
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
    const withdrawTaoHandle = async (_nftId) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: taodumJBC,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftId],
            })
            if (nftAllow.toUpperCase() !== jbcBridge.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: taodumJBC,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [jbcBridge, _nftId],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }       
            let { request } = await simulateContract(config, {
                address: jbcBridge,
                abi: tbridgeNFTABI,
                functionName: 'receiveNFTs',
                args: [_nftId],
                value: ethers.utils.parseEther('10'),
                chainId: 8899,
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
            <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                    <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                    <div style={{fontSize: "22px"}}>1 KUB/TX (BITKUB CHAIN)</div>
                    <div style={{fontSize: "22px"}}>10 JBC/TX (JIBCHAIN)</div>
                </div>
            </div>
            <div style={{width: "90%", marginBottom: "40px", textIndent: "20px", fontSize: "14px", letterSpacing: "1px", textAlign: "left", color: "rgb(189, 194, 196)"}} className="bold">My BITKUB CHAIN NFTs</div>
            {nft.length > 0 ?
                <div style={{width: "90%", marginBottom: "80px", padding: "20px", border: "1px dashed #fff", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                            {nft.map((item, index) => (
                                <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "15px", margin: "10px"}} className="nftCard" key={index}>
                                    <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                        <img src={item.Image} height="100%" alt="Can not load metadata." />
                                    </div>
                                    <div className="emp bold">{item.Name}</div>
                                    <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                    {(chain !== undefined && address !== null) ? 
                                        <>
                                            {chain.id === 96 ?
                                                <div style={{alignSelf: "center"}} className="pixel button" onClick={() => depositTaoHandle(item.Id)}>BRIDGE TO JBC</div> :
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BRIDGE TO JBC</div>
                                            }
                                        </> :
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BRIDGE TO JBC</div>
                                    }
                                </div>
                            ))}
                        </> :
                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "15px", margin: "10px"}} className="nftCard">
                            {address !== null ?
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
                <div style={{width: "90%", marginBottom: "80px", padding: "20px", border: "1px dashed #fff", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                    <div className="nftCard" style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "15px", margin: "10px"}}>
                        <ThreeDots fill="#fff" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
            <div style={{width: "90%", marginBottom: "40px", textIndent: "20px", fontSize: "14px", letterSpacing: "1px", textAlign: "left", color: "rgb(189, 194, 196)"}} className="bold">My JIBCHAIN NFTs</div>
            {nft2.length > 0 ?
                <div style={{width: "90%", marginBottom: "80px", padding: "20px", border: "1px dashed #fff", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft2[0] !== null ?
                        <>
                            {nft2.map((item, index) => (
                                <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "15px", margin: "10px"}} className="nftCard" key={index}>
                                    <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                        <img src={item.Image} height="100%" alt="Can not load metadata." />
                                    </div>
                                    <div className="emp bold">{item.Name}</div>
                                    <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                    {(chain !== undefined && address !== null) ? 
                                        <>
                                            {chain.id === 8899 ?
                                                <div style={{alignSelf: "center"}} className="pixel button" onClick={() => withdrawTaoHandle(item.Id)}>BRIDGE TO BKC</div> :
                                                <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BRIDGE TO BKC</div>
                                            }
                                        </> :
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BRIDGE TO BKC</div>
                                    }
                                </div>
                            ))}
                        </> :
                        <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "15px", margin: "10px"}} className="nftCard">
                            {address !== null ?
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
                <div style={{width: "90%", marginBottom: "80px", padding: "20px", border: "1px dashed #fff", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                    <div className="nftCard" style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center", padding: "15px", margin: "10px"}}>
                        <ThreeDots fill="#fff" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
        </>
    )
}
    
export default TBridgeTAODUM