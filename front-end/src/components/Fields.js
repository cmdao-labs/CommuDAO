const Fields = ({ callMode, navigate }) => {
    return (
    <>
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "95px", width: "fit-content"}} className="pixel">Fields</div>
                <div style={{fontSize: "22.5px", width: "fit-content", marginTop: "30px"}} className="pixel">Stake NFTs to earn resources.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="./background/fieldlogo.png" width="175" alt="Fields_Logo" />
            </div>
        </div>

        <div style={{width: "95%", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
            <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                <div style={{position: "absolute", top: -15, right: -15, padding: "10px 20px", borderRadius: 25, background: "#67BAA7", color: "#fff", letterSpacing: 1}} className="bold">FREE MINT</div>
                <div style={{height: "230px", display: "flex", alignItems: "center"}}>
                    <i style={{fontSize: "150px"}} className="fa fa-tree"></i>
                </div>
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
                        <img src="./items/wood.png" height="18" alt="$WOOD"/>
                        <div style={{margin: "0 5px"}}>WOOD & </div>
                        <img src="./tokens/cmj.png" height="18" alt="$CMJ"/>
                        <div style={{margin: "0 5px"}}>CMJ</div>
                    </div>
                </div>
                <div style={{width: "200px", marginTop: "40px"}} className="pixel button" onClick={() => {callMode(13); navigate('/fields/ancient-forrest');}}>Go to Ancient Forrest</div>
            </div>
            <div className="nftCard" style={{justifyContent: "center", margin: "20px"}}>
                <img src="../background/tunalake.png" height="230" alt="Field_TunaLake" />
                <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                    <div className="pixel">
                        <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                        Eligible NFT Collection
                    </div>
                    <div className="emp pixel bold">CM Hexa Cat Meaw JIB JIB</div>
                </div>
                <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                    <div className="pixel">
                        <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                        Earn
                    </div>
                    <div className="emp pixel"><img src="../items/tuna.png" width="12" alt="$TUNA"/>TUNA</div>
                </div>
                <div style={{width: "200px", marginTop: "40px"}} className="pixel button" onClick={() => {callMode(11); navigate('/fields/tuna-lake');}}>Go to Tuna Lake</div>
            </div>
            <div className="nftCard" style={{justifyContent: "center", margin: "20px"}}>
                <img src="../background/oldwarehouse.png" height="230" alt="Fields_OldWarehouse" />
                <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                    <div className="pixel">
                        <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                        Eligible NFT Collection
                    </div>
                    <div className="emp pixel">CM Hexa Cat Meaw ORY</div>
                </div>
                <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                    <div className="pixel">
                        <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                        Earn
                    </div>
                    <div className="emp pixel"><img src="../items/mice.png" width="12" alt="$MICE"/> MICE</div>
                </div>
                <div style={{width: "200px", marginTop: "40px"}} className="pixel button" onClick={() => {callMode(12); navigate('/fields/old-warehouse');}}>Go to Old Warehouse</div>
            </div>
        </div>
    </>
    )
}

export default Fields