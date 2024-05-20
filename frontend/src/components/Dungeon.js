import React from 'react'

const providerIPFS = "https://cloudflare-ipfs.com/ipfs/"

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
            <div style={{width: "97.5%", marginTop: "40px", borderBottom: "1px solid #dddade"}}></div>
            <div style={{width: "100%", marginTop: "20px", textAlign: "left", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommuDAO Dungeon</div>
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                <div className="nftCard pixel" style={{justifyContent: "center", margin: "20px"}}>
                    <img src={providerIPFS + "bafkreig5qnhdcfhtk54gmc6grtce5islfq7xfkyx4l6utr3ckwol4xj4iu"} height="230" alt="Copper_Mine" />
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
                        <div className="emp"><img style={{marginRight: "5px"}} src={providerIPFS + "bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"} width="12" alt="$COPPER"/>COPPER</div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0px 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(33); navigate('/dungeon/copper-mine');}}>Go to Copper Mine</div>
                </div>

            
                <div className="nftCard pixel" style={{justifyContent: "center", margin: "20px"}}>
                    <img src={providerIPFS + "bafkreify5cxbaerycclmyyjnrxkt3abrtdjftxvqucuxac4kovhuan4cei"} height="230" alt="Jasper_Cave" />
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
                        <div className="emp"><img style={{marginRight: "2px"}} src={providerIPFS + "bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy"} width="12" alt="$JASP"/>JASPER</div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0px 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(31); navigate('/dungeon/jasper-cave');}}>Go to Jasper Cave</div>
                </div>
            </div>

            <div style={{width: "97.5%", marginTop: "40px", borderBottom: "1px solid #dddade"}}></div>
            <div style={{width: "100%", marginTop: "20px", textAlign: "left", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommuDAO NFTs Upgrade</div>
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                <div className="nftCard pixel" style={{justifyContent: "flex-start", margin: "20px"}}>
                    <div style={{width: "345px", height: "230px", background: "linear-gradient(139.73deg,#e5fdff,#f3efff)", overflow: "hidden"}}>
                        <img src={providerIPFS + "bafybeiaovfcdl3edviln3dyucsmm57ciafqurxtnrdtfjhqsywh43mgmdy"} height="230" alt="Blacksmith" />
                    </div>
                    <div style={{marginTop: "50px", fontSize: "12px", textAlign: "left"}} className="pixel">"Looking to upgrade your equipment? I've got you covered! Let's get started on taking your setup to the next level - no time to waste!"</div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(32); navigate('/dungeon/blacksmith-house');}}>Enter Blacksmith House</div>
                </div>

                <div className="nftCard pixel" style={{justifyContent: "flex-start", margin: "20px"}}>
                    <div style={{width: "345px", height: "230px", background: "linear-gradient(139.73deg,#e5fdff,#f3efff)", overflow: "hidden"}}>
                        <img src={providerIPFS + "bafybeibb6sv46fa4as36s5pvb5lihvgdhry7jlsifnzca4qbgbvkej3cae"} height="230" alt="Evo_Planet" />
                    </div>
                    <div style={{marginTop: "50px", width: "100%", fontSize: "12px", textAlign: "left"}} className="pixel"><br></br>"Are you ready to level up"<br></br><br></br></div>
                    <div style={{width: "220px", margin: "40px 170px 0px 80px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(34); navigate('/dungeon/evolutionary-planet');}}>Enter Evolutionary Planet</div>
                </div>
            </div>

            <div style={{width: "97.5%", marginTop: "40px", borderBottom: "1px solid #dddade"}}></div>
            <div style={{width: "100%", marginTop: "20px", textAlign: "left", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Partner Dungeon</div>
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                <div className="nftCard pixel" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                    <div style={{position: "absolute", top: -15, right: -15, padding: "7.5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                        <img src={providerIPFS + "bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4"} width="30px" alt="AngelPlus" />
                        <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                    </div>
                    <img src={providerIPFS + "bafybeibghshz6fd6vsc2is5egipg2wqwafpwztea4tfdbi6ajw6zxwfgfe"} height="230" alt="Daemon_World" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-gamepad"></i>Difficulty</div>
                        <div className="emp">Intermediate</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>Eligible NFT Collection</div>
                        <div className="emp">Angel Plus NFTs</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>Earn</div>
                        <div className="emp"><img style={{marginRight: "5px"}} src={providerIPFS + "bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m"} width="12" alt="$ANGB"/>ANGEL BLESSING</div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0px 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(35); navigate('/dungeon/daemon-world');}}>Go to Daemon World</div>
                </div>

                <div className="nftCard pixel" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                    <div style={{position: "absolute", top: -15, right: -15, padding: "7.5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                        <img src={providerIPFS + "bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce"} width="30px" alt="TAODUM-TAOMEME" />
                        <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                    </div>
                    <img src={providerIPFS + "bafybeiehky27iaain3y76xwcrgy3vyvrojzexi3alts5ybdf7gqjbh3yua"} height="230" alt="Cryptic-Cogs" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-gamepad"></i>Difficulty</div>
                        <div className="emp">Intermediate</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>Eligible NFT Collection</div>
                        <div className="emp">CommuDAO, Naruta NFTs</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>Earn</div>
                        <div className="emp"><img style={{marginRight: "5px"}} src={providerIPFS + "bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm"} width="12" alt="$EE"/>Enchant Engine</div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0px 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(36); navigate('/dungeon/cryptic-cogs');}}>Go to Cryptic Cogs</div>
                </div>
            </div>

            <div style={{width: "97.5%", marginTop: "40px", borderBottom: "1px solid #dddade"}}></div>
            <div style={{width: "100%", marginTop: "20px", textAlign: "left", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Partner NFTs Upgrade</div>
            <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                <div className="nftCard pixel" style={{position: "relative", justifyContent: "flex-start", margin: "20px"}}>
                    <div style={{position: "absolute", top: -15, right: -15, padding: "7.5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                        <img src={providerIPFS + "bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4"} width="30px" alt="AngelPlus" />
                        <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                    </div>
                    <div style={{width: "345px", height: "230px", background: "linear-gradient(139.73deg,#e5fdff,#f3efff)", overflow: "hidden"}}>
                        <img src={providerIPFS + "bafybeifrqslsoes7swzc3bnjl72x6sgsewcnx2w3zjsm5pzma7ku2onr6a"} height="230" alt="AP-INN" />
                    </div>
                    <div style={{marginTop: "50px", fontSize: "12px", textAlign: "left"}} className="pixel">"If you're looking for a place to prepare for an adventure,Hero, stop by INN!!!"</div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(37); navigate('/dungeon/ap-inn');}}>Enter AP INN</div>
                </div>

                <div className="nftCard pixel" style={{position: "relative", justifyContent: "flex-start", margin: "20px"}}>
                <div style={{position: "absolute", top: -15, right: -15, padding: "7.5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                        <img src={providerIPFS + "bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce"} width="30px" alt="TAODUM-TAOMEME" />
                        <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                    </div>
                    <div style={{width: "345px", height: "230px", background: "linear-gradient(139.73deg,#e5fdff,#f3efff)", overflow: "hidden"}}>
                        <img style={{position: "relative", zIndex: 2}} src={providerIPFS + "bafybeigac5ws4lgz5pqdt45bdyiqrhsbohguyqng6d7jxsed2c5m3dehe4"} height="220" alt="TDM-ROBOTICS-INC" />
                    </div>
                    <div style={{marginTop: "35px", fontSize: "12px", textAlign: "left"}} className="pixel">"An advanced hub for upgrading machines to be stronger and more efficient, vital for resource gathering and defending against alien creatures."</div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(38); navigate('/dungeon/tdm-robotics-inc');}}>Enter TDM Robotics Inc.</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Dungeon