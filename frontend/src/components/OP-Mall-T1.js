import React from 'react'
import { ethers } from 'ethers'
import { readContracts } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { Oval } from 'react-loading-icons'

const t1BKC = '0xfb0f31373fe7e12607c398565314483cde06b492'
const providerBKC = new ethers.getDefaultProvider('https://rpc.bitkubchain.io')

const { ethereum } = window

const OPMallT1 = ({ setisLoading, txupdate, setTxupdate, erc721ABI }) => {
    const { address } = useAccount()

    const [bkcNft, setBkcNft] = React.useState([])

    React.useEffect(() => {     
        window.scrollTo(0, 0) 
        const bkcnftSC = new ethers.Contract(t1BKC, erc721ABI, providerBKC)

        const thefetch = async () => {    
            let nfts = []        
            const walletFilter = await bkcnftSC.filters.Transfer(null, address, null)
            const walletEvent = await bkcnftSC.queryFilter(walletFilter, 4347206, "latest")
            const walletMap = await Promise.all(walletEvent.map(async (obj, index) => String(obj.args.tokenId)))
            const walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            const data2 = address !== null && address !== undefined ? await readContracts({
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: t1BKC,
                        abi: erc721ABI,
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
            const data3 = address !== null && address !== undefined ? await readContracts({
                contracts: yournftwallet.map((item) => (
                    {
                        address: t1BKC,
                        abi: erc721ABI,
                        functionName: 'tokenURI',
                        args: [String(item.Id)],
                    }
                ))
            }) : [Array(yournftwallet.length).fill('')]

            for (let i = 0; i <= yournftwallet.length - 1; i++) {
                const nftipfs = data3[i].result
                const response = await fetch(nftipfs)
                const nft = await response.json()

                nfts.push({
                    Id: yournftwallet[i].Id,
                    Name: nft.name + " #" + yournftwallet[i].Id,
                    Image: nft.image,
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: null,
                    Onsell: false,
                    Count: null
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            return [nfts]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setBkcNft(result[0])
        })

    }, [address, txupdate, erc721ABI])
    console.log(bkcNft)

    return (
        <>
            <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
            <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "25px", letterSpacing: "1px"}} className="bold">Thai League - Multichain Mall</div>
            <div style={{width: "100%", padding: "0 45px 0 0", margin: "10px 0", background: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", flexWrap: "wrap", fontSize: "16px"}}>
                <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                    <div style={{width: "300px", marginBottom: "10px", textAlign: "initial", color: "#bdc2c4"}}>Bridging Fee</div>
                    <div style={{fontSize: "22px"}}>1 KUB/TX (BITKUB CHAIN)</div>
                    <div style={{fontSize: "22px"}}>0.0003 ETH/TX (OP MAINNET)</div>
                </div>
                <div style={{height: "80%", padding: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                    <div style={{width: "300px", marginBottom: "10px", textAlign: "initial", color: "#bdc2c4"}}>Mall Fee</div>
                    <div style={{fontSize: "22px"}}>20% FEE (SOLD ON MALL)</div>
                    <div style={{fontSize: "22px"}}>0.0003 ETH (REDEEM TO YOURSELF)</div>
                </div>
            </div>
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Listing On Mall</div>
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Your OP Mainnet Wallet</div>
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Your Bitkub Chain Wallet</div>
                {bkcNft.length > 0 ?
                    <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                        <div style={{textAlign: "left", margin: "50px 0 80px 0", minHeight: "600px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {bkcNft[0] !== null ?
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                    {bkcNft.map((item, index) => (
                                        <div style={{justifyContent: "space-around", padding: "20px", width: "270px", margin: "20px 28px 15px 0px"}} className="nftCard" key={index}>
                                            <div style={{width: "95%", overflow: "hidden", display: "flex", justifyContent: "center"}}>
                                                <img src={item.Image} height="200" alt="Can not load metadata." />
                                            </div>
                                            <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                <div style={{height: "100px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                                                    <div style={{fontSize: "14px"}} className="emp bold">{item.Name}</div>
                                                    <div style={{fontSize: "16px", margin: "5px 0 12px 0"}} className="pixel">
                                                        {item.RewardPerSec} bonus per sec 
                                                    </div>
                                                    {!item.Onsell ?
                                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}} className="pixel button">BRIDGE NFT</div> :
                                                        <div style={{textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "120px", background: "gray"}} className="pixel button">REMOVE SELL</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div> :
                                <>
                                {address !== undefined ?
                                    <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                        <img src="https://l3img.b-cdn.net/ipfs/QmUmf3MEZg99qqLJ6GsewESVum8sm72gfH3wyiVPZGH6HA" width="150" alt="No_NFTs" />
                                        <div style={{marginTop: "30px"}} className="bold">This wallet doesn't have NFTs.</div>
                                    </div> :
                                    <div style={{justifyContent: "center", padding: "20px", margin: "10px 28px 15px 0px"}} className="nftCard">
                                        <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                        <div className="bold">Please connect wallet to view your NFTs.</div>
                                    </div>
                                }
                                </>
                            }
                        </div>
                    </div> :
                    <div style={{padding: "20px", width: "800px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}} className="pixel">
                        <Oval stroke="#ff007a" strokeWidth="5px" />
                    </div>
                }
            </div>
        </>
    )
}

export default OPMallT1