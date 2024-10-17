import React from 'react'
//import { ethers } from 'ethers'
//import { readContracts } from '@wagmi/core'
//import { useAccount } from 'wagmi'
import OPMallT1 from  './OP-Mall-T1'

//const { ethereum } = window

const OPMall = ({ setisLoading, txupdate, setTxupdate, setisError, setErrMsg, cmdaoAmmNpcABI, erc20Abi, erc721Abi, uniNftBridgeABI, multichainMallABI }) => {
    //const { address } = useAccount()

    const [mode, setMode] = React.useState(0)

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px"}}>
                    <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Mall</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}} className="pixel">Automated Buy & Sell</div>
                </div>
                <div style={{margin: "30px 100px"}}>
                    <img src="../background/malllogo.png" width="150" alt="Mall_Logo" />
                </div>
            </div>

            <div className="collection">
                {mode === 0 &&
                    <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                        <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                        <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Multichain Mall</div>
                        <a style={{width: "380px", margin: "40px 20px 20px 20px", border: "1px solid #4637a9", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f", textDecoration: "none"}} className="pixel hashtag" href="https://form.typeform.com/to/kbCUqHna" target="_blank" rel="noreferrer">✏️&nbsp;Permissionless listing your NFT project</a>
                        <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                            <div className="nftCard" style={{justifyContent: "center", margin: "20px"}}>
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
                    <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                        <div className='hashtag' onClick={() => setMode(0)}>BACK</div>
                        <OPMallT1 setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc721Abi={erc721Abi} uniNftBridgeABI={uniNftBridgeABI} multichainMallABI={multichainMallABI} />
                    </div>
                }
            </div>
        </>
    )
}

export default OPMall