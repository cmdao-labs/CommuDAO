import React from 'react'
import { ethers } from 'ethers'
import { readContracts } from '@wagmi/core'
import { useAccount } from 'wagmi'

const { ethereum } = window

const OPMall = ({ setisLoading, txupdate, setTxupdate, cmdaoAmmNpcABI, erc20ABI }) => {
    const { address } = useAccount()



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
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Multichain Mall</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                </div>     
            </div>
        </div>
    </>
    )
}

export default OPMall