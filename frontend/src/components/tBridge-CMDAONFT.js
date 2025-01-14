import React from 'react'
import { ethers } from 'ethers'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const cmdaoBKC = '0x84bbfa70a60bB31fB00F2E2241E3a87C63F8734f'
const bkcBridge = '0x95cC0C5fDBE5B3d3c2a8cAabc109bcdb67A081dC'
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const TBridgeCMDAONFT = ({ config, setisLoading, txupdate, setTxupdate, setisError, setErrMsg, erc721Abi, tbridgeNFTABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const [nft, setNft] = React.useState([])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const cmdaoBKCSC = new ethers.Contract(cmdaoBKC, erc721Abi, providerBKC)
        setNft([])
        
        const thefetch = async () => {
            let nfts = []
            let walletRemoveDup = []
            if (address !== null) {
                const walletFilter = await cmdaoBKCSC.filters.Transfer(null, address, null)
                const walletEvent = await cmdaoBKCSC.queryFilter(walletFilter, 19246023, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data = address !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: cmdaoBKC,
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
                        address: cmdaoBKC,
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
                    const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                    nft = await response.json()
                } catch {}
                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + ' #' + yournftwallet[i].Id,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                })
            }
            if (nfts.length === 0) { nfts.push(null) }
            
            return [ nfts ]
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
        })

    }, [config, address, txupdate, erc721Abi])

    const depositHandle = async (_nftId) => {
        setisLoading(true)
        try {
            const nftAllow = await readContract(config, {
                address: cmdaoBKC,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftId],
            })
            if (nftAllow.toUpperCase() !== bkcBridge.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: cmdaoBKC,
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

    return (
        <>
            <div style={{width: "70%", padding: "40px 45px 40px 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "scroll", fontSize: "16px"}} className='noscroll'>
                <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                    <div style={{width: "300px", marginBottom: "20px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                    <div style={{fontSize: "30px", textAlign: "left"}}>1 KUB/TX (BITKUB CHAIN)</div>
                </div>
            </div>
            <div style={{width: "90%", marginBottom: "40px", textIndent: "20px", fontSize: "14px", letterSpacing: "1px", textAlign: "left", color: "rgb(189, 194, 196)"}} className="bold">My BITKUB CHAIN NFTs</div>
            {nft.length > 0 ?
                <div style={{width: "90%", marginBottom: "80px", padding: "20px", border: "1px dashed #fff", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    {nft[0] !== null ?
                        <>
                            {nft.map((item, index) => (
                                <>
                                    <div style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", justifyContent: "space-around", padding: "15px", margin: "10px"}} className="nftCard" key={index}>
                                        <div style={{width: "150px", height: "150px", display: "flex", justifyContent: "center", overflow: "hidden"}}>
                                            <img src={item.Image} height="100%" alt="Can not load metadata." />
                                        </div>
                                        <div className="emp bold">{item.Name}</div>
                                        <div style={{fontSize: "12px", textAlign: "left", wordBreak: "break-word"}} className="light">{item.Description}</div>
                                        {(chain !== undefined && address !== null) ? 
                                            <>
                                                {chain.id === 96 ?
                                                    <div style={{alignSelf: "center"}} className="pixel button" onClick={() => depositHandle(item.Id)}>BRIDGE TO JBC</div> :
                                                    <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BRIDGE TO JBC</div>
                                                }
                                            </> :
                                            <div style={{alignSelf: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">BRIDGE TO JBC</div>
                                        }
                                    </div>
                                </>
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
                    <div className="nftCard" style={{background: "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), rgb(11, 11, 34)", boxShadow: "none", border: 0, color: "#fff", padding: "15px", margin: "10px", justifyContent: "center"}}>
                        <ThreeDots fill="#fff" />
                        <div className="bold" style={{marginTop: "80px"}}>Loading NFTs...</div>
                    </div>
                </div>
            }
        </>
    )
}
    
export default TBridgeCMDAONFT