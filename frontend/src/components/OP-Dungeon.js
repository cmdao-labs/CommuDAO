import React from 'react'

const OPDungeon = ({ callMode, navigate }) => {
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
                    <div style={{height: "230px"}}></div>
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-gamepad"></i>Difficulty</div>
                        <div className="emp">Hard</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>Eligible NFT Collection</div>
                        <div className="emp">CommuDAO NFTs + variable</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div><i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>Earn</div>
                        <div className="emp"><img style={{marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6" width="12" alt="$INF.POW"/>INFINITY POWER</div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0px 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(31001); navigate('/dungeon/abandoned-temple-vault');}}>Go to Abondoned Temple Vault</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default OPDungeon