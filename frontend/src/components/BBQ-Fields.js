import React from 'react'

const BBQFields = ({ callMode, navigate }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner" style={{flexDirection: "column"}}>
                    <div style={{fontSize: "65px", width: "fit-content"}} className="pixel">Fields</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel">Stake NFTs to earn resources.</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="../background/fieldlogo.png" width="150" alt="Fields_Logo" />
                </div>
            </div>

            <div style={{width: "92.5%", borderBottom: "1px solid #dddade", marginTop: "60px"}}></div>
            <div style={{width: "95%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">CommuDAO Fields</div>
            <div style={{width: "95%", marginBottom: "80px", minHeight: "0", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <div className="nftCard" style={{justifyContent: "center", margin: "10px", position: "relative", borderRadius: "5px", boxShadow: "none", border: "none", background: "rgba(0,0,0,.05)", fontSize: "12px"}}>
                    <img src="https://gateway.commudao.xyz/ipfs/bafkreig4zuhnfry34cycnxx36d6im4qknip35rfp773yrpy6pjozhpkjya" height="230" alt="Field_AncientForest" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="light">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                            Eligible NFTs
                        </div>
                        <div style={{color: "#000", borderBottom: "1px dashed"}} className="pixel">CommuDAO Servant</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="light">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                            Earn
                        </div>
                        <div style={{borderBottom: "1px dashed"}} className="pixel">
                            <img src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="18" alt="$WOOD"/>
                        </div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px",  border: "1px dashed #4637a9", justifyContent: "center"}} className="pixel hashtag" onClick={() => {callMode(10001); navigate('/fields/ancient-forest-bbqchain');}}>Go to Ancient Forest</div>
                </div>
            </div>           
        </>
    )
}

export default BBQFields