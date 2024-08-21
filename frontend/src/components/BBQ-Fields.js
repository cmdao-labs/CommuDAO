import React from 'react'

const BBQFields = ({ callMode, navigate }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div style={{fontSize: "65px", width: "fit-content"}} className="pixel">Fields</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}} className="pixel">Stake NFTs to earn resources.</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="../background/fieldlogo.png" width="150" alt="Fields_Logo" />
                </div>
            </div>

            <div style={{width: "92.5%", borderBottom: "1px solid #dddade", marginTop: "60px"}}></div>
            <div style={{width: "95%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">CommuDAO Fields</div>
            <div style={{width: "95%", marginBottom: "80px", minHeight: "0", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                    <div style={{position: "absolute", top: -15, right: -15, padding: "10px 20px", background: "#67BAA7", color: "#fff", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="bold">FREE MINT</div>
                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreig4zuhnfry34cycnxx36d6im4qknip35rfp773yrpy6pjozhpkjya" height="230" alt="Field_AncientForest" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="pixel">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                            Eligible NFT Collection
                        </div>
                        <div className="emp pixel">CommuDAO Servant</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="pixel">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                            Earn
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}} className="emp pixel">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" height="18" alt="$WOOD"/>
                            <div style={{margin: "0 5px"}}>WOOD</div>
                        </div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" /*onClick={() => {callMode(10001); navigate('/fields/ancient-forest-bbqchain');}}*/>Go to Ancient Forest</div>
                </div>
            </div>           
        </>
    )
}

export default BBQFields