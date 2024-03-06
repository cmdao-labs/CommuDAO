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
            <div className="halfone">
                <div className="welcomeText">
                    <div style={{letterSpacing: "1px", color: "rgb(39, 56, 82)"}} className="bold motto">Collect,<br></br>Play,<br></br>Build<br></br><span className="emp">CommuDAO</span></div>
                    <div style={{marginTop: "20px"}}>The Web3 Multiverse of Crypto-community is now ALPHA!</div>
                    <div style={{padding: "30px 0", marginTop: "30px", flexDirection: "column"}} className="items" id="showoff">
                        <div style={{fontSize: "36px", backgroundImage: "linear-gradient(270deg, #ff0420, #d9029d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "1px"}} className="bold">45M+</div>
                        <div style={{fontSize: "16px", marginTop: "5px"}} className="light">Transactions on CommuDAO Ecosystem</div>
                    </div>
                    {chain !== undefined && chain.id === 8899 &&
                        <>
                            <div>Explore the world of CommuDAO</div>
                            <div style={{margin: "20px 0", width: "700px", maxWidth: "90%", display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                <div className="hashtag" onClick={() => {callMode(13); navigate('/fields/ancient-forrest');}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="20" alt="$WOOD"/>
                                    &nbsp;Ancient Forest
                                </div>
                                <div className="hashtag" onClick={() => {callMode(11); navigate('/fields/tuna-lake');}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe" height="20" alt="$TUNA"/>
                                    &nbsp;Tuna Lake
                                </div>
                                <div className="hashtag" onClick={() => {callMode(12); navigate('/fields/old-warehouse');}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i" height="20" alt="$MICE"/>
                                    &nbsp;Old Warehouse
                                </div>
                                <div className="hashtag" onClick={() => {callMode(33); navigate('/dungeons/copper-mine');}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" height="20" alt="$COPPER"/>
                                    &nbsp;Copper Mine
                                </div>
                                <div className="hashtag" onClick={() => {callMode(31); navigate('/dungeons/jasper-cave');}}>
                                    <img src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" height="20" alt="$JASPER"/>
                                    &nbsp;Jasper Cave
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className='halftwo'>
                <div style={{width: "500px", height: "fit-content", background: "#fff", margin: "80px 0", padding: 0, overflow: "hidden"}} className="nftCard">
                    <img src="https://bafybeidmedlvbae3t7gffvgakbulid4zpr7eqenx2rdsbbvkb6ol3xplpq.ipfs.nftstorage.link/23.png" width="100%" alt="NFT_GENESIS" />
                    <div style={{width: "90%", height: "fit-content", margin: "15px 0"}}>CM Hexa Cat Meaw JIB JIB, The OG NFT</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Home