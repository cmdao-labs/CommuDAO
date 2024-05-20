import React from 'react'

const providerIPFS = "https://w3storag.lazyplayerone.xyz/ipfs/"

const Fields = ({ callMode, navigate }) => {
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
                    <img src="./background/fieldlogo.png" width="150" alt="Fields_Logo" />
                </div>
            </div>

            <div style={{width: "92.5%", borderBottom: "1px solid #dddade", marginTop: "60px"}}></div>
            <div style={{width: "95%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">CommuDAO Fields</div>
            <div style={{width: "95%", minHeight: "0", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                    <div style={{position: "absolute", top: -15, right: -15, padding: "10px 20px", background: "#67BAA7", color: "#fff", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="bold">FREE MINT</div>
                    <img src={providerIPFS + "bafkreig4zuhnfry34cycnxx36d6im4qknip35rfp773yrpy6pjozhpkjya"} height="230" alt="Field_AncientForest" />
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
                            <img src={providerIPFS + "bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4"} height="18" alt="$WOOD"/>
                            <div style={{margin: "0 5px"}}>WOOD & </div>
                            <img src={providerIPFS + "bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u"} height="18" alt="$CMJ"/>
                            <div style={{marginLeft: "5px"}}>CMJ</div>
                        </div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(13); navigate('/fields/ancient-forrest');}}>Go to Ancient Forest</div>
                </div>
                <div className="nftCard" style={{justifyContent: "center", margin: "20px"}}>
                    <img src={providerIPFS + "bafkreibgjc2bzx42soeevrzn6ohlr44xly4sjhj6k6o2spcsia24qztyki"} height="230" alt="Field_TheHeavenLand" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="pixel">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                            Eligible NFT Collection
                        </div>
                        <div className="emp pixel">The Mythical Guardians</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div className="pixel">
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                            Earn
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}} className="emp pixel">
                            <img src={providerIPFS + "bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm"} height="18" alt="$GOLD"/>
                            <div style={{margin: "0 5px"}}>GOLD & </div>
                            <img src={providerIPFS + "bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq"} height="18" alt="$JBC"/>
                            <div style={{marginLeft: "5px"}}>JBC (LIMITED)</div>
                        </div>                    
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(17); navigate('/fields/the-heaven-land');}}>Go to The Heaven Land</div>
                </div>
            </div>

            <div style={{width: "92.5%", borderBottom: "1px solid #dddade", marginTop: "60px"}}></div>
            <div style={{width: "95%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">Partner Fields</div>
            <div style={{width: "95%", minHeight: 0, justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <div className="nftCard" style={{justifyContent: "center", margin: "20px", position: "relative"}}>
                    <div style={{position: "absolute", top: -25, right: -15, padding: "7.5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center"}} className="bold">
                        <img src={providerIPFS + "bafybeifgqrnqujzsozg56l4wfvqwxgf72kgjjwtwq6aedeywwfmvlg7on4"} width="30px" alt="CM" />
                        <div className='light' style={{marginLeft: "10px"}}>CM Hexa</div>
                    </div>
                    <img src={providerIPFS + "bafkreicoxmgbobc6eockaevaqmk2f7pwnfmtll2wze2npd2nyrxii2dblu"} height="230" alt="Field_TunaLake" />
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
                        <div className="emp pixel"><img src={providerIPFS + "bafkreifqroahbmxgnmsqdot5bzu3xbsa7y27mnlo6k45efgidmqxqrstbe"} width="12" alt="$TUNA"/>TUNA</div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(11); navigate('/fields/tuna-lake');}}>Go to Tuna Lake</div>
                </div>
                <div className="nftCard" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                    <div style={{position: "absolute", top: -25, right: -15, padding: "7.5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center"}} className="bold">
                        <img src={providerIPFS + "bafybeifgqrnqujzsozg56l4wfvqwxgf72kgjjwtwq6aedeywwfmvlg7on4"} width="30px" alt="CM" />
                        <div className='light' style={{marginLeft: "10px"}}>CM Hexa</div>
                    </div>
                    <img src={providerIPFS + "bafkreiaplfqhpcall6mr7swyaqyatfri7p4z56i7ttfvhjmootnett3f3m"} height="230" alt="Fields_OldWarehouse" />
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
                        <div className="emp pixel"><img src={providerIPFS + "bafkreidcakmgzpqytuzlvvok72r2hg2n5tqb25jfwecymelylaysdzkd6i"} width="12" alt="$MICE"/> MICE</div>
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(12); navigate('/fields/old-warehouse');}}>Go to Old Warehouse</div>
                </div>
                <div className="nftCard pixel" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                    <div style={{position: "absolute", top: -25, right: -15, padding: "7.5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center"}} className="bold">
                        <img src={providerIPFS + "bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4"} width="30px" alt="AngelPlus" />
                        <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                    </div>
                    <img src={providerIPFS + "bafybeih4wlopgsgvw73dnjczn6un6sagasx6eyq57hzhj3l7gwlbuin75y"} height="230" alt="Field_EasternFront" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div>
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                            Eligible NFT Collection
                        </div>
                        <div className="emp" style={{fontSize: "12px"}}>Angel Plus: Adventurer Card</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div>
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                            Earn
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}} className="emp">
                            <img src={providerIPFS + "bafkreia6rbj3o47qbw7o3vqd6ogylwjcjay5phsve5pixfvmw7nexwx3re"} height="14" alt="$VABAG"/>
                            <div style={{marginLeft: "5px"}}>Valuable Bag</div>
                        </div>                    
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(19); navigate('/fields/eastern-front');}}>Go to Eastern Front</div>
                </div>
            </div>

            <div style={{width: "95%", minHeight: 0, marginBottom: "80px", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <div className="nftCard pixel" style={{position: "relative", justifyContent: "center", margin: "20px"}}>
                    <div style={{position: "absolute", top: -25, right: -15, padding: "7.5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center"}} className="bold">
                        <img src={providerIPFS + "bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce"} width="30px" alt="TAODUM-TAOMEME" />
                        <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                    </div>
                    <img src={providerIPFS + "bafybeicly2zmib2gwjqv2p752php3ff4pqonllfiyuelcik366gqtsto7e"} height="230" alt="Field_Mech_Harvest_Zone" />
                    <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div>
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-ticket"></i>
                            Eligible Collection
                        </div>
                        <div className="emp" style={{fontSize: "12px"}}>TAODUM NFT & TAOMEME TOKEN</div>
                    </div>
                    <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                        <div>
                            <i style={{fontSize: "14px", marginRight: "5px"}} className="fa fa-trophy"></i>
                            Earn
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}} className="emp">
                            <img src={providerIPFS + "bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4"} height="16" alt="$GEAR"/>
                            <div style={{marginLeft: "5px"}}>Gear</div>
                        </div>                    
                    </div>
                    <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => {callMode(100); navigate('/fields/mech-harvest-zone');}}>Go to Mech Harvest Zone</div>
                </div>
            </div>
        </>
    )
}

export default Fields