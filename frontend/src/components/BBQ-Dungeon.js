import React from 'react'

const BBQDungeon = ({ callMode, navigate }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner" style={{flexDirection: "column"}}>
                    <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Dungeon</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel">Hunting rare token to empower your community.</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="../background/dungeonlogo.png" width="150" alt="Dungeon_Logo" />
                </div>
            </div>
            
            <div style={{width: "92.5%", marginTop: "60px", borderBottom: "1px solid #dddade"}}></div>
            <div style={{width: "95%", marginTop: "20px", textAlign: "left", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommuDAO Dungeon</div>
            <div style={{marginBottom: "80px", width: "95%", minHeight: "0", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "10px", borderRadius: "5px", boxShadow: "none", border: "none", background: "rgba(0,0,0,.05)", fontSize: "12px"}}>
                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmUniMaXwLQG8yf6UEGa3bQmwxj9f6HCrQpinUFP9GbnUC" height="230" alt="Endless_Tower" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <div className="light">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-gamepad"></i>
                            Difficulty
                        </div>
                        <div style={{color: "#000", borderBottom: "1px dashed"}} className="pixel">Intermediate</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <div className="light">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                            Eligible NFTs
                        </div>
                        <div style={{color: "#000", borderBottom: "1px dashed"}} className="pixel">HRM NFTs</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <div className="light">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                            Earn
                        </div>
                        <div style={{borderBottom: "1px dashed"}}>
                            <img style={{marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYLecZgsc6hgV931h3VDhvvXKeMjturKRKyGyTNDxX9JV" width="12" alt="$GEM"/>
                        </div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0px 40px", border: "1px dashed #4637a9", justifyContent: "center"}} className="pixel hashtag" onClick={() => {callMode(30001); navigate('/dungeon/the-endless-tower');}}>Go to The Endless Tower</div>
                </div>
            </div>
        </>
    )
}

export default BBQDungeon