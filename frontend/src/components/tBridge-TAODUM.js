import React from 'react'
import { ethers } from 'ethers'
import { readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount, useNetwork } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const taodumBKC = '0x165DCCB59F0aaE80a0C20c8CF2b536BE6E120be9'
const taodumJBC = '0x2036186F6d5287FcB05C56C38374AC5236d8A61d'
const jbcBridge = '0xf51F20D135b1Aa8A6d27eA61Bba47A453c8ee6D2'
const bkcBridge = '0xdDD9caf2aa09CA75C86e868761A42750363b6e50'

const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const TBridgeTAODUM = ({ setisLoading, txupdate, setTxupdate, erc721ABI, tbridgeNFTABI }) => {
    let { address } = useAccount()
    const { chain } = useNetwork()

    const [nft, setNft] = React.useState([])
    const [nft2, setNft2] = React.useState([])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const taodumBkcSC = new ethers.Contract(taodumBKC, erc721ABI, providerBKC)
        const taodumJbcSC = new ethers.Contract(taodumJBC, erc721ABI, providerJBC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            
            const walletFilter = await taodumBkcSC.filters.Transfer(null, address, null)
            const walletEvent = await taodumBkcSC.queryFilter(walletFilter, 15323522, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: taodumBKC,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 96
                    }
                ))
            }) : [Array(walletRemoveDup.length).fill('')]

            let yournftwallet = []
            for (let i = 0; i <= walletRemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data[i].toUpperCase() === address.toUpperCase()) {
                    yournftwallet.push({Id: String(walletRemoveDup[i])})
                }
            }

            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet.map((item) => (
                    {
                        address: taodumBKC,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 96
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data2[i]
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
            
            const wallet2Filter = await taodumJbcSC.filters.Transfer(null, address, null)
            const wallet2Event = await taodumJbcSC.queryFilter(wallet2Filter, 2725554, "latest")
            const wallet2Map = await Promise.all(wallet2Event.map(async (obj) => String(obj.args.tokenId)))
            const wallet2RemoveDup = wallet2Map.filter((obj, index) => wallet2Map.indexOf(obj) === index)
            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: wallet2RemoveDup.map((item) => (
                    {
                        address: taodumJBC,
                        abi: erc721ABI,
                        functionName: 'ownerOf',
                        args: [String(item)],
                        chainId: 8899
                    }
                ))
            }) : [Array(wallet2RemoveDup.length).fill('')]

            let yournftwallet2 = []
            for (let i = 0; i <= wallet2RemoveDup.length - 1 && address !== null && address !== undefined; i++) {
                if (data3[i].toUpperCase() === address.toUpperCase()) {
                    yournftwallet2.push({Id: String(wallet2RemoveDup[i])})
                }
            }

            const data4 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet2.map((item) => (
                    {
                        address: taodumJBC,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                        chainId: 8899
                    }
                ))
            }) : [Array(yournftwallet2.length).fill('')]

            for (let i = 0; i <= yournftwallet2.length - 1; i++) {
                const nftipfs = data4[i]
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
            
            return [
                nfts, nfts2
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
            setNft2(result[1])
        })

    }, [address, txupdate, erc721ABI])

    const depositTaoHandle = async (_nftId) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: taodumBKC,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftId],
            })
            if (nftAllow.toUpperCase() !== bkcBridge.toUpperCase()) {
                const config0 = await prepareWriteContract({
                    address: taodumBKC,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [bkcBridge, _nftId],
                })
                const approvetx = await writeContract(config0)
                await approvetx.wait()
            }        
            const config = await prepareWriteContract({
                address: bkcBridge,
                abi: tbridgeNFTABI,
                functionName: 'receiveNFTs',
                args: [_nftId],
                overrides: {
                    value: ethers.utils.parseEther('1'),
                },
                chainId: 96,
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }
    const withdrawTaoHandle = async (_nftId) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract({
                address: taodumJBC,
                abi: erc721ABI,
                functionName: 'getApproved',
                args: [_nftId],
            })
            if (nftAllow.toUpperCase() !== jbcBridge.toUpperCase()) {
                const config0 = await prepareWriteContract({
                    address: taodumJBC,
                    abi: erc721ABI,
                    functionName: 'approve',
                    args: [jbcBridge, _nftId],
                })
                const approvetx = await writeContract(config0)
                await approvetx.wait()
            }       
            const config = await prepareWriteContract({
                address: jbcBridge,
                abi: tbridgeNFTABI,
                functionName: 'receiveNFTs',
                args: [_nftId],
                overrides: {
                    value: ethers.utils.parseEther('10'),
                },
                chainId: 8899,
            })
            const tx = await writeContract(config)
            await tx.wait()
            setTxupdate(tx)
        } catch {}
        setisLoading(false)
    }

    return (
        <>
            <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", fontSize: "16px"}}>
                <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                    <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                    <div style={{fontSize: "30px"}}>From BKC 1 KUB/TX; From JBC 10 JBC/TX</div>
                </div>
            </div>
            <div style={{width: "70%", margin: "40px 0", textIndent: "20px", fontSize: "20px", letterSpacing: "1px", textAlign: "left", paddingTop: "40px", borderTop: "1px solid #2e2c35"}} className="bold">BKC NFTs</div>
            {nft.length > 0 ?
                <div style={{width: "1650px", marginBottom: "80px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                            {nft.map((item, index) => (
                                <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard" key={index}>
                                    <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                        <img src={item.Image} height="100%" alt="Can not load metadata." />
                                    </div>
                                    <div className="emp bold">{item.Name}</div>
                                    <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                    {chain.id === 96 ?
                                        <div style={{alignSelf: "center"}} className="pixel button" onClick={() => depositTaoHandle(item.Id)}>BRIDGE TO JBC</div> :
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BRIDGE TO JBC</div>
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
                <div style={{width: "1640px", marginBottom: "80px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                    <div className="nftCard" style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center"}}>
                        <ThreeDots fill="#fff" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
            <div style={{width: "70%", margin: "40px 0", textIndent: "20px", fontSize: "20px", letterSpacing: "1px", textAlign: "left", paddingTop: "40px", borderTop: "1px solid #2e2c35"}} className="bold">JBC NFTs</div>
            {nft2.length > 0 ?
                <div style={{width: "1650px", marginBottom: "80px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft2[0] !== null ?
                        <>
                            {nft2.map((item, index) => (
                                <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "20px", margin: "10px"}} className="nftCard" key={index}>
                                    <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                        <img src={item.Image} height="100%" alt="Can not load metadata." />
                                    </div>
                                    <div className="emp bold">{item.Name}</div>
                                    <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                    {chain.id === 8899 ?
                                        <div style={{alignSelf: "center"}} className="pixel button" onClick={() => withdrawTaoHandle(item.Id)}>BRIDGE TO BKC</div> :
                                        <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BRIDGE TO BKC</div>
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
                <div style={{width: "1640px", marginBottom: "80px", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}> 
                    <div className="nftCard" style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "center"}}>
                        <ThreeDots fill="#fff" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
        </>
    )
}
    
export default TBridgeTAODUM