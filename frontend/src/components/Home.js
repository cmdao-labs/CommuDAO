import React from 'react'
import { useNetwork } from 'wagmi'

const Home = ({ callMode, navigate }) => {
    const { chain } = useNetwork()

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
    <>
        <div style={{overflow: "scroll", padding: 0, margin: 0, textAlign: "left", fontSize: "22px", flexFlow: "row wrap"}} className="collection noscroll welcome pixel">
            <div className="half welcomeText">
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <div style={{letterSpacing: "1px", color: "#000"}} className="bold motto">Multiverse<br></br>for all crypto<br></br>community</div>
                    <div style={{padding: "30px 0", marginTop: "30px", flexDirection: "column"}} className="items" id="showoff">
                        <div style={{fontSize: "38px", backgroundImage: "linear-gradient(270deg, #ff0420, #d9029d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "1px"}} className="bold">70,000,000+</div>
                        <div style={{fontSize: "14px", marginTop: "10px", color: "#000"}} className="light">Transactions on CommuDAO Ecosystem</div>
                    </div>
                    <div className='typed-out' style={{padding: "2px 8px"}}>Explore the CommuDAO Ecosystem!</div>
                    <div style={{margin: "20px 0", maxWidth: "600px", display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                        <a className="hashtag" style={{textDecoration: "none"}} href="https://line.me/ti/g/TyuETEymmH" target="_blank" rel="noreferrer">
                            <img src="https://cloudflare-ipfs.com/ipfs/bafkreihiezpvelzflcvavljsgzlwh27zfy4njqmcoidzz23ldtajdeo3vi" height="30" alt=""/>
                            &nbsp;CMDAO Alert
                        </a>
                        <a className="hashtag" style={{textDecoration: "none"}} href="https://meowneon.app" target="_blank" rel="noreferrer">
                            <img src="https://cloudflare-ipfs.com/ipfs/bafkreifzs54ll7ckvhuvkp3v35yx4qyqpthia56r37cgqlnzlfplrfv7hm" height="30" alt=""/>
                            &nbsp;Meow Neon
                        </a>
                        <a className="hashtag" style={{textDecoration: "none"}} href="https://cmdaa.lazyplayerone.xyz" target="_blank" rel="noreferrer">
                            <img src="https://cloudflare-ipfs.com/ipfs/bafkreidlnozzbqrxqtdf54b32u3u7ri4svu7lcdpxujcnoa5x5biqcufpy" height="30" alt=""/>
                            &nbsp;Auto Web3 Tool
                        </a>
                        <a className="hashtag" style={{textDecoration: "none"}} href="https://daobuddy.xyz" target="_blank" rel="noreferrer">
                            <img src="https://cloudflare-ipfs.com/ipfs/bafkreictqeaxecodh6wogk4eihkvyhzhk3hnyyftfvsjxi6m4yf4sm4nta" height="30" alt=""/>
                            &nbsp;DaoBuddy
                        </a>
                    </div>
                </div>
            </div>
            <div className='half'>
                <div className='nftCard nftControl' style={{height: "fit-content", background: "#fff", margin: "80px 0", padding: 0, overflow: "hidden"}}>
                    <img src="https://cloudflare-ipfs.com/ipfs/bafkreiccasyhwimnwvkzdgxksjw7z5qr4eo5p4bsikg4osrqszemwtjxee" width="100%" alt="Show-Off-NFT" />
                    <div style={{width: "90%", height: "fit-content", margin: "15px 0"}}>CRYPTO SULTAN PEPE JA - Main Character NFTs</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Home