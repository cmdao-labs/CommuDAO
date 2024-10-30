import React from 'react'
import OPMallT1 from  './OP-Mall-T1'

const OPMall = ({ config, setisLoading, callMode, navigate, txupdate, setTxupdate, setisError, setErrMsg, cmdaoAmmNpcABI, erc20Abi, erc721Abi, uniNftBridgeABI, multichainMallABI }) => {
    const [mode, setMode] = React.useState(0)

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner" style={{flexDirection: "column"}}>
                    <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Mall</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}} className="pixel">Automated Buy & Sell</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="../background/malllogo.png" width="150" alt="Mall_Logo" />
                </div>
            </div>

            <div style={{width: "92.5%", borderBottom: "1px solid #dddade", marginTop: "60px"}}></div>
            <div style={{width: "95%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">Multichain Labs</div>
            <div style={{width: "95%", minHeight: 0, justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <a style={{width: "380px", border: "1px solid #4637a9", padding: "20px 50px", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f", textDecoration: "none"}} className="pixel hashtag" href="https://form.typeform.com/to/kbCUqHna" target="_blank" rel="noreferrer">✏️&nbsp;Permissionless create your NFT project</a> 
            </div>
            <div className="collection">
                {mode === 0 &&
                    <div style={{textAlign: "left", height: "fit-content", width: "94%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                        <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                            <div className="nftCard" style={{justifyContent: "center", margin: "10px"}}>
                                <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmYzsLujATTRCW59ByddhxubEDXPtAb2fdtNvGYXutL2RC" height="230" alt="T1_BKC" />
                                <div style={{marginTop: "30px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                    <div className="pixel">
                                        NFT Collection
                                    </div>
                                    <div className="emp pixel">Thai League</div>
                                </div>
                                <div style={{marginTop: "10px", width: "340px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px"}}>
                                    <div className="pixel">
                                        Source Chain
                                    </div>
                                    <div style={{display: "flex", flexDirection: "row"}} className="emp pixel">
                                        Bitkub Chain
                                    </div>                    
                                </div>
                                <div style={{width: "220px", margin: "40px 130px 0 40px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel hashtag" onClick={() => setMode(1)}>Go to The T1 Mall</div>
                            </div>
                        </div>     
                    </div>
                }
                {mode === 1 && 
                    <div style={{textAlign: "left", height: "fit-content", width: "94%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                        <div className='hashtag' onClick={() => setMode(0)}>BACK</div>
                        <OPMallT1 config={config} setisLoading={setisLoading} callMode={callMode} navigate={navigate} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} uniNftBridgeABI={uniNftBridgeABI} multichainMallABI={multichainMallABI} />
                    </div>
                }
            </div>
        </>
    )
}

export default OPMall