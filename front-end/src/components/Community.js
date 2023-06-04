const Community = ({ callMode, navigate }) => {
    return (
    <>
        <div className="fieldBanner" style={{background: "rgb(0, 19, 33", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}}>
                <div style={{fontSize: "95px", width: "fit-content"}} className="pixel">Community</div>
                <div style={{fontSize: "22.5px", width: "fit-content", marginTop: "30px"}} className="pixel">Build our decentralized community with DAO token.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/commulogo.png" width="200" alt="Community_Logo" />
            </div>
        </div>

        <div style={{background: "rgb(0, 19, 33", margin: "0", padding: "75px 0", minHeight: "inherit"}} className="collection pixel">
            <div style={{width: "1216px", maxWidth: "78%", marginBottom: "30px", textAlign: "left", fontSize: "22.5px", color: "rgb(0, 227, 180)"}} className="emp">CM CITY - Urban District 8x8 tiles [Construction Phase]</div>
            <div style={{padding: 0, borderRadius: 0, background: "rgb(0, 26, 44)", width: "1216px", maxWidth: "78%", height: "1216px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                <div id="tile1" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile2" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile3" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(41); navigate('/community/cmcity-citycenter');}}>
                    <i style={{fontSize: "65px"}} className="fas fa-place-of-worship"></i>
                    <div style={{marginTop: "10px"}}>City Center<br></br>Level 0</div>
                </div>
                <div id="tile4" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile5" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile6" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile7" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile8" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile9" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile10" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile11" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile12" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile13" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile14" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile15" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile16" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile17" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile18" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile19" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile20" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile21" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile22" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile23" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile24" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile25" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile26" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile27" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile28" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile29" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile30" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile31" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile32" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile33" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile34" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile35" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile36" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile37" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile38" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile39" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile40" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile41" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile42" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile43" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile44" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile45" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile46" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile47" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile48" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile49" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile50" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile51" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile52" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile53" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(42); navigate('/community/dungeon-arena');}}>
                    <i style={{fontSize: "65px"}} className="fas fa-dungeon"></i>
                    <div style={{marginTop: "10px"}}>Dungeon Arena</div>
                </div>
                <div id="tile54" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile55" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile56" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile57" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile58" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile59" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile60" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile61" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile62" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
                <div id="tile63" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center"}}>
                    <i style={{fontSize: "65px"}} className="fas fa-flag"></i>
                    <div style={{marginTop: "10px"}}>Reserved land</div>
                </div>
                <div id="tile64" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} className="pixel">
                    <i style={{fontSize: "65px"}} className="fas fa-map-marker-alt"></i>
                    <div style={{marginTop: "10px"}}>Land for sale</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Community