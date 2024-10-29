import React from 'react'

const OPDungeon = ({ callMode, navigate }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner" style={{flexDirection: "column"}}>
                    <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Dungeon</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="../background/dungeonlogo.png" width="150" alt="Dungeon_Logo" />
                </div>
            </div>
            
            <div style={{width: "92.5%", marginTop: "60px", borderBottom: "1px solid #dddade"}}></div>
            <div style={{width: "95%", marginTop: "20px", textAlign: "left", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommuDAO Dungeon</div>
            <div style={{marginBottom: "80px", width: "95%", minHeight: "0", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "10px", borderRadius: "5px", boxShadow: "none", border: "none", background: "rgba(0,0,0,.05)", fontSize: "12px"}}>
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
                    <div style={{width: "220px", margin: "40px 130px 0px 40px", border: "1px dashed #4637a9", justifyContent: "center"}} className="pixel hashtag" onClick={() => {callMode(31001); navigate('/dungeon/abandoned-temple-vault');}}>Go to Abondoned Temple Vault</div>
                </div>
            </div>
        </>
    )
}

export default OPDungeon