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
                    <div style={{letterSpacing: "1px", color: "rgb(39, 56, 82)"}} className="bold motto">Collect<br></br>Play<br></br>Build<br></br><span className="emp">CommuDAO</span></div>
                    <div style={{marginTop: "20px"}} className='bold motto2'>The Web3 Multiverse of Crypto-community</div>
                    <div style={{padding: "30px 0", marginTop: "30px", flexDirection: "column"}} className="items" id="showoff">
                        <div style={{fontSize: "40px", backgroundImage: "linear-gradient(270deg, #ff0420, #d9029d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "1px"}} className="bold">59,000,000+</div>
                        <div style={{fontSize: "14px", marginTop: "10px", color: "#000"}} className="light">Transactions on CommuDAO Ecosystem</div>
                    </div>
                    {chain !== undefined ?
                        <>
                            {chain.id === 8899 &&
                                <>
                                    <div className='typed-out' style={{padding: "2px 8px"}}>Explore the CommuDAO-verse now!</div>
                                    <div style={{margin: "20px 0", maxWidth: "550px", display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                        <div className="hashtag" onClick={() => {callMode(13); navigate('/fields/ancient-forrest');}}>
                                            <img src="https://gateway.pinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="20" alt="$WOOD"/>
                                            &nbsp;Ancient Forest
                                        </div>
                                        <div className="hashtag" onClick={() => {callMode(11); navigate('/fields/tuna-lake');}}>
                                            <img src="https://gateway.pinata.cloud/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe" height="20" alt="$TUNA"/>
                                            &nbsp;Tuna Lake
                                        </div>
                                        <div className="hashtag" onClick={() => {callMode(12); navigate('/fields/old-warehouse');}}>
                                            <img src="https://gateway.pinata.cloud/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" height="20" alt="$MICE"/>
                                            &nbsp;Old Warehouse
                                        </div>
                                        <div className="hashtag" onClick={() => {callMode(33); navigate('/dungeons/copper-mine');}}>
                                            <img src="https://gateway.pinata.cloud/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="20" alt="$COPPER"/>
                                            &nbsp;Copper Mine
                                        </div>
                                        <div className="hashtag" onClick={() => {callMode(31); navigate('/dungeons/jasper-cave');}}>
                                            <img src="https://gateway.pinata.cloud/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="20" alt="$JASPER"/>
                                            &nbsp;Jasper Cave
                                        </div>
                                    </div>
                                </>
                            }
                        </> :
                        <div style={{height: "215px", width: "410px", margin: "20px 0"}}>
                            <div className='typed-out' style={{padding: "2px 8px"}}>PRESS CONNECT WALLET...</div>
                        </div>
                    }
                </div>
            </div>
            <div className='half'>
                <div className='nftCard nftControl' style={{height: "fit-content", background: "#fff", margin: "80px 0", padding: 0, overflow: "hidden"}}>
                    <img src="https://gateway.pinata.cloud/ipfs/bafkreiccasyhwimnwvkzdgxksjw7z5qr4eo5p4bsikg4osrqszemwtjxee" width="100%" alt="Show-Off-NFT" />
                    <div style={{width: "90%", height: "fit-content", margin: "15px 0"}}>CRYPTO SULTAN PEPE JA - MEME Main Character NFTs</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Home