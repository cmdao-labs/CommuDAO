import React from 'react'
import { ethers } from 'ethers'
import { readContracts, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount, useNetwork } from 'wagmi'
import { ThreeDots } from 'react-loading-icons'

const taodumBKC = '0x165DCCB59F0aaE80a0C20c8CF2b536BE6E120be9'
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const TBridgeTAODUM = ({ setisLoading, txupdate, setTxupdate, erc721ABI }) => {
    let address = '0x7d6319e0B978516a3E09366da3fcF62128b5385B'
    const { chain } = useNetwork()

    const [nft, setNft] = React.useState([])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        const taodumBkcSC = new ethers.Contract(taodumBKC, erc721ABI, providerBKC)
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
            console.log(yournftwallet)

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

            console.log(data2)

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data2[i]
                let nft = {name: "", image: "", description: "", attributes: ""}
                try {
                    const response = await fetch(nftipfs)
                    nft = await response.json()
                } catch {}

                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name,
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                })
            }

            if (nfts.length === 0) { nfts.push(null) }
            
            return [
                nfts
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
           
        })

    }, [address, txupdate, erc721ABI])

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
                                    {false && chain.id === 96 ?
                                        <div style={{alignSelf: "center"}} className="pixel button">BRIDGE TO JBC</div> :
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
        </>
    )
}
    
export default TBridgeTAODUM