const Dungeon = ({ callMode, navigate }) => {

    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "95px", width: "fit-content"}} className="pixel">Dungeon</div>
                <div style={{fontSize: "22.5px", width: "fit-content", marginTop: "30px"}} className="pixel">Hunting rare token to empower your community.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/dungeonlogo.png" width="200" alt="Dungeon_Logo" />
            </div>
        </div>
        
        <div style={{width: "95%", flexDirection: "column", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
            <div style={{width: "100%", marginTop: "35px", textAlign: "left", textIndent: "20px", fontSize: "18px"}} className="bold">Dungeons</div>
            <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                <div className="nftCard pixel" style={{justifyContent: "center", margin: "20px"}}>
                    <div style={{height: "230px", display: "flex", alignItems: "center"}}>
                        <i style={{fontSize: "200px"}} className="fas fa-dungeon"></i>
                    </div>
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
                        <div className="emp"><img style={{marginRight: "5px"}} src="/../items/copper.png" width="12" alt="$COPPER"/>COPPER</div>
                    </div>
                    <div style={{width: "fit-content", marginTop: "30px"}} className="button" onClick={() => {callMode(33); navigate('/dungeon/copper-mine');}}>Go to Copper Mine</div>
                </div>

                <div className="nftCard pixel" style={{justifyContent: "center", margin: "20px"}}>
                    <img src="../background/jaspercave.png" height="230" alt="Jasper_Cave" />
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
                        <div className="emp"><img style={{marginRight: "2px"}} src="../items/jasper.png" width="12" alt="$JASP"/>JASPER</div>
                    </div>
                    <div style={{width: "fit-content", marginTop: "30px"}} className="button" onClick={() => {callMode(31); navigate('/dungeon/jasper-cave');}}>Go to Jasper Cave</div>
                </div>
            </div>

            <div style={{width: "100%", marginTop: "35px", textAlign: "left", textIndent: "20px", fontSize: "18px"}} className="bold">NFTs Upgrade</div>
            <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "20px"}}></div>
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                <div className="nftCard" style={{justifyContent: "flex-start", margin: "20px"}}>
                    <div style={{width: "345px", height: "230px", overflow: "hidden"}}>
                        <img src="../elements/blacksmith.png" height="230" alt="Blacksmith" />
                    </div>
                    <div style={{marginTop: "50px", fontSize: "14px"}} className="light">""Looking to upgrade your equipment? I've got you covered! Let's get started on taking your setup to the next level - no time to waste!"</div>
                    <div style={{width: "fit-content", marginTop: "30px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)"}} className="pixel button" onClick={() => {callMode(32); navigate('/dungeon/blacksmith-house');}}>Enter NPC Blacksmith House</div>
                </div>

                <div className="nftCard" style={{justifyContent: "flex-start", margin: "20px"}}>
                    <div style={{width: "345px", height: "230px", overflow: "hidden"}}>
                    </div>
                    <div style={{marginTop: "50px", fontSize: "14px"}} className="light"><br></br><br></br>"Are you ready to level up"<br></br><br></br></div>
                    <div style={{width: "fit-content", marginTop: "30px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)"}} className="pixel button" onClick={() => {callMode(34); navigate('/dungeon/evolutionary-planet');}}>Enter NPC Evolutionary Planet</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Dungeon