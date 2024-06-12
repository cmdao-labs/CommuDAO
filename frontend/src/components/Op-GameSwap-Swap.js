import React from 'react'
import Select from 'react-select'
import { fetchBalance, readContract, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { ethers } from 'ethers'

const OpSwap = ({ address, setisLoading, setTxupdate, options, inputStyle, cmdethExchange, veloPoolABI, cmdToken, wethToken, erc20ABI, cmdBalance, wethBalance, wethReserv, cmdReserv, priceTHB }) => {
    const [inputSwap, setInputSwap] = React.useState("")
    const [wethBought, setWethBought] = React.useState("")
    const [cmdBought, setCmdBought] = React.useState("")

    const [swapMode, setSwapMode] = React.useState(0)
    const swapModeChange = () => {
        if (swapMode === 0) { setSwapMode(1) }
        if (swapMode === 1) { setSwapMode(0) }
        setInputSwap("")
        setWethBought("")
        setCmdBought("")
    }
    const swapModeSelect = (option) => {
        setSwapMode(option.value)
        setInputSwap("")
        setCmdBought("")
        setWethBought("")
    }
    const swapModeSelect2 = (option) => {
        if (swapMode === 0 && option.value === 0) { setSwapMode(1) }
        if (swapMode === 1 && option.value === 1) { setSwapMode(0) }
        setInputSwap("")
        setCmdBought("")
        setWethBought("")
    }

    return (
        <>
            <div style={{margin: "20px 0", width: "750px", maxWidth: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <div style={{marginTop: "20px", padding: "20px 0", height: "450px", width: "350px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", textAlign: "left", fontSize: "20px"}} className="bold">Instant Swap</div>
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex"}}>
                            {swapMode === 0 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0x4200000000000000000000000000000000000006/logo.svg" alt="$WETH" /> : <></>}
                            {swapMode === 1 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" /> : <></>}
                            <Select
                                onChange={swapModeSelect}
                                options={options}
                                value={options[swapMode]}
                                styles={inputStyle}
                                isSearchable={false}
                            />
                        </div>
                        {swapMode === 0 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {wethBalance}</div> : <></>}
                        {swapMode === 1 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {cmdBalance}</div> : <></>}
                    </div>
                    {swapMode === 0 || swapMode === 1 ?
                        <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                            <input
                                style={{alignSelf: "flex-start", marginTop: 0, width: "190px", height: "40px", padding: "5px 20px", border: "1px solid #dddade", cursor: "not-allowed"}}
                                placeholder="0.0"
                                type='number'
                                disabled
                            />
                            {swapMode === 0 ?
                                <div style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "not-allowed"}} className="bold">Max</div> :
                                <div style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "not-allowed"}} className="bold">Max</div>}
                        </div> :
                        <></>
                    }
                    <div style={{cursor: "pointer"}} className="fa fa-arrow-down" onClick={swapModeChange}></div>
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex"}}>
                            {swapMode === 0 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" /> : <></>}
                            {swapMode === 1 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0x4200000000000000000000000000000000000006/logo.svg" alt="$WETH" /> : <></>}
                            {swapMode === 0 &&
                                <Select
                                    onChange={swapModeSelect2}
                                    options={options}
                                    value={options[1]}
                                    styles={inputStyle}
                                    isSearchable={false}
                                />
                            }
                            {swapMode === 1 &&
                                <Select
                                    onChange={swapModeSelect2}
                                    options={options}
                                    value={options[0]}
                                    styles={inputStyle}
                                    isSearchable={false}
                                />
                            }
                        </div>
                        {swapMode === 0 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {cmdBalance}</div> : <></>}
                        {swapMode === 1 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {wethBalance}</div> : <></>}
                    </div>
                    {(swapMode === 0 || swapMode === 1) &&
                        <input
                            style={{marginTop: 0, width: "260px", height: "40px", padding: "5px 20px", border: "1px solid #dddade", cursor: "not-allowed"}}
                            placeholder="0.0"
                            readOnly
                            disabled
                        />
                    }
                    {swapMode === 0 &&
                        <>
                            <div style={{width: "80%", lineHeight: 1.5, fontSize: "10px", display: "flex", justifyContent: "space-between"}}>
                                <div>CMD Price :</div>
                                {cmdReserv !== 0 ?
                                    <div>{Number(wethReserv/cmdReserv).toLocaleString('en-US', {maximumFractionDigits:10})} WETH <span className="tokenNormText">(~{(Math.floor((wethReserv/cmdReserv) * priceTHB * 100) / 100).toLocaleString('en-US', {maximumFractionDigits:3})} THB)</span></div> :
                                    <>Loading...</>
                                }
                            </div>
                            <div style={{width: "80%", lineHeight: 1.5, fontSize: "10px", display: "flex", justifyContent: "space-between"}}>
                                <div>Price Impact :</div>
                                {cmdBought !== "" && Number(inputSwap) !== 0 ? 
                                    <div>{Number(((((Number(inputSwap) / (Number(cmdReserv) - ((Number(cmdReserv) * Number(wethReserv)) / (Number(wethReserv) + Number(inputSwap))))) - (Number(wethReserv/cmdReserv))) / (Number(wethReserv/cmdReserv))) * 100)).toFixed(2)}%</div> :
                                    <div>0.00%</div>
                                }
                            </div>
                        </>
                    }
                    {swapMode === 1 &&
                        <>
                            <div style={{width: "80%", lineHeight: 1.5, fontSize: "10px", display: "flex", justifyContent: "space-between"}}>
                                <div>WETH Price :</div>
                                {cmdReserv !== 0 ? 
                                    <div>{Number(cmdReserv/wethReserv).toLocaleString('en-US', {maximumFractionDigits:0})} CMD <span className="tokenNormText">(~{(Math.floor((cmdReserv/wethReserv) * ((wethReserv/cmdReserv) * priceTHB) * 100) / 100).toLocaleString('en-US', {maximumFractionDigits:0})} THB)</span></div> :
                                    <>Loading...</>
                                }
                            </div>
                            <div style={{width: "80%", lineHeight: 1.5, fontSize: "10px", display: "flex", justifyContent: "space-between"}}>
                                <div>Price Impact :</div>
                                {wethBought !== "" && Number(inputSwap) !== 0 ?
                                    <div>{Number(((((Number(inputSwap) / (Number(wethReserv) - ((Number(cmdReserv) * Number(wethReserv)) / (Number(cmdReserv) + Number(inputSwap))))) - (Number(cmdReserv/wethReserv))) / (Number(cmdReserv/wethReserv))) * 100)).toFixed(2)}%</div> :
                                    <div>0.00%</div>
                                }
                            </div>
                        </>
                    }
                    {(swapMode === 0 || swapMode === 1) &&
                        <div style={{letterSpacing: "1px", width: "250px", padding: "15px 30px", height: "fit-content", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "18px", cursor: "not-allowed"}} className="bold">Swap</div>
                    }
                </div>
            </div>
        </>
    )
}

export default OpSwap