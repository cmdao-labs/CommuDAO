import React from 'react'

const Dungeon = ({ callMode, navigate }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Dungeon</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel">Hunting rare token to empower your community.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/dungeonlogo.png" width="150" alt="Dungeon_Logo" />
            </div>
        </div>
        
        <div style={{width: "95%", flexDirection: "column", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                <div className="nftCard pixel" style={{justifyContent: "center", margin: "20px"}}>
                    <img src="https://nftstorage.link/ipfs/bafkreig5qnhdcfhtk54gmc6grtce5islfq7xfkyx4l6utr3ckwol4xj4iu" height="230" alt="Copper_Mine" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-gamepad"></i>Difficulty</div>
                        <div className="emp">Beginner</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>Eligible NFT Collection</div>
                        <div className="emp">CommuDAO NFTs</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>Earn</div>
                        <div className="emp"><img style={{marginRight: "5px"}} src="https://nftstorage.link/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" width="12" alt="$COPPER"/>COPPER</div>
                    </div>
                    <div style={{width: "fit-content", margin: "40px 170px 0 0", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(33); navigate('/dungeon/copper-mine');}}>Go to Copper Mine</div>
                </div>

                <div className="nftCard pixel" style={{justifyContent: "center", margin: "20px"}}>
                    <img src="https://nftstorage.link/ipfs/bafkreify5cxbaerycclmyyjnrxkt3abrtdjftxvqucuxac4kovhuan4cei" height="230" alt="Jasper_Cave" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-gamepad"></i>Difficulty</div>
                        <div className="emp">Intermediate</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>Eligible NFT Collection</div>
                        <div className="emp">CommuDAO NFTs</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>Earn</div>
                        <div className="emp"><img style={{marginRight: "2px"}} src="https://nftstorage.link/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" width="12" alt="$JASP"/>JASPER</div>
                    </div>
                    <div style={{width: "fit-content", margin: "40px 170px 0 0", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(31); navigate('/dungeon/jasper-cave');}}>Go to Jasper Cave</div>
                </div>
            </div>

            <div style={{width: "97.5%", marginTop: "40px", borderBottom: "1px solid #dddade"}}></div>
            <div style={{width: "100%", marginTop: "20px", textAlign: "left", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">NFTs Upgrade</div>
            <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                <div className="nftCard pixel" style={{justifyContent: "flex-start", margin: "20px"}}>
                    <div style={{width: "345px", height: "230px", background: "linear-gradient(139.73deg,#e5fdff,#f3efff)", overflow: "hidden"}}>
                        <img src="https://nftstorage.link/ipfs/bafybeiaovfcdl3edviln3dyucsmm57ciafqurxtnrdtfjhqsywh43mgmdy" height="230" alt="Blacksmith" />
                    </div>
                    <div style={{marginTop: "50px", fontSize: "12px", textAlign: "left"}} className="pixel">"Looking to upgrade your equipment? I've got you covered! Let's get started on taking your setup to the next level - no time to waste!"</div>
                    <div style={{width: "fit-content", margin: "40px 130px 0 0", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(32); navigate('/dungeon/blacksmith-house');}}>Enter Blacksmith House</div>
                </div>

                <div className="nftCard pixel" style={{justifyContent: "flex-start", margin: "20px"}}>
                    <div style={{width: "345px", height: "230px", background: "linear-gradient(139.73deg,#e5fdff,#f3efff)", overflow: "hidden"}}>
                        <img src="https://nftstorage.link/ipfs/bafybeibb6sv46fa4as36s5pvb5lihvgdhry7jlsifnzca4qbgbvkej3cae" height="230" alt="Evo_Planet" />
                    </div>
                    <div style={{marginTop: "50px", width: "100%", fontSize: "12px", textAlign: "left"}} className="pixel"><br></br>"Are you ready to level up"<br></br><br></br></div>
                    <div style={{width: "fit-content", margin: "40px 100px 0 0", border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(34); navigate('/dungeon/evolutionary-planet');}}>Enter Evolutionary Planet</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Dungeon