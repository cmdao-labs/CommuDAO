import React from 'react'
import Select from 'react-select'
import { readContract, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { ethers } from 'ethers'

const factory = "0xF1046053aa5682b4F9a81b5481394DA16BE5FF5a"
const swapCaller = '0x3C72Fb1658E7A64fd4C88394De4474186A13460A'

const OpSwap = ({ config, address, setisLoading, setTxupdate, setisError, setErrMsg, options, inputStyle, cmdethExchange, veloPoolABI, cmdToken, wethToken, erc20Abi, cmdBalance, ethBalance, ethReserv, cmdReserv, priceTHB, velodromeCallerABI }) => {
    const [inputSwap, setInputSwap] = React.useState("")
    const [ethBought, setEthBought] = React.useState("")
    const [cmdBought, setCmdBought] = React.useState("")
    const [delaySwap, setDelaySwap] = React.useState(false)

    const [swapMode, setSwapMode] = React.useState(0)
    const swapModeChange = () => {
        if (swapMode === 0) { setSwapMode(1) }
        if (swapMode === 1) { setSwapMode(0) }
        setInputSwap("")
        setEthBought("")
        setCmdBought("")
    }
    const swapModeSelect = (option) => {
        setSwapMode(option.value)
        setInputSwap("")
        setCmdBought("")
        setEthBought("")
    }
    const swapModeSelect2 = (option) => {
        if (swapMode === 0 && option.value === 0) { setSwapMode(1) }
        if (swapMode === 1 && option.value === 1) { setSwapMode(0) }
        setInputSwap("")
        setCmdBought("")
        setEthBought("")
    }

    const handleSwap = async (event) => {
        setDelaySwap(true)
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(String(Number(event.target.value * 0.997).toFixed(18))) : 0
        if (swapMode === 0) {
            const _tokenOut = await readContract(config, {
                address: cmdethExchange,
                abi: veloPoolABI,
                functionName: 'getAmountOut',
                args: [_value , wethToken],
            })
            event.target.value !== "" ? setCmdBought(Number(ethers.utils.formatEther(_tokenOut))) : setCmdBought("")
        } else if (swapMode === 1) {
            const _tokenOut = await readContract(config, {
                address: cmdethExchange,
                abi: veloPoolABI,
                functionName: 'getAmountOut',
                args: [_value, cmdToken],
            })
            event.target.value !== "" ? setEthBought(Number(ethers.utils.formatEther(_tokenOut))) : setEthBought("")
        }
        setDelaySwap(false)
    }
    const swapTokenHandle = async () => {
        setisLoading(true)
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
        try {
            if (swapMode === 0) {
                let { request } = await simulateContract(config, {
                    address: swapCaller,
                    abi: velodromeCallerABI,
                    functionName: 'callForToken',
                    args: [ethers.utils.parseEther(String(cmdBought * 0.99)), [[wethToken, cmdToken, false, factory]], deadline],
                    value: ethers.utils.parseEther(inputSwap),
                })
                let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
            } else if (swapMode === 1) {
                const token0Allow = await readContract(config, {
                    address: cmdToken,
                    abi: erc20Abi,
                    functionName: 'allowance',
                    args: [address, swapCaller],
                })
                if (Number(ethers.utils.formatEther(String(token0Allow))) < Number(inputSwap)) {
                    let { request } = await simulateContract(config, {
                        address: cmdToken,
                        abi: erc20Abi,
                        functionName: 'approve',
                        args: [swapCaller, ethers.constants.MaxUint256],
                    })
                    let h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
                let { request } = await simulateContract(config, {
                    address: swapCaller,
                    abi: velodromeCallerABI,
                    functionName: 'callForETH',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(String(cmdBought * 0.99)), [[cmdToken, wethToken, false, factory]], deadline],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            }
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <>
            <div style={{margin: "20px 0", width: "950px", maxWidth: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", height: "450px", width: "350px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", textAlign: "left", fontSize: "20px"}} className="bold">Instant Swap</div>
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex"}}>
                            {swapMode === 0 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" alt="$ETH" /> : <></>}
                            {swapMode === 1 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" /> : <></>}
                            <Select
                                onChange={swapModeSelect}
                                options={options}
                                value={options[swapMode]}
                                styles={inputStyle}
                                isSearchable={false}
                            />
                        </div>
                        {swapMode === 0 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {Number(ethBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div> : <></>}
                        {swapMode === 1 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {Number(cmdBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div> : <></>}
                    </div>
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                        <input
                            style={{alignSelf: "flex-start", marginTop: 0, width: "190px", height: "40px", padding: "5px 20px", border: "1px solid #dddade"}}
                            placeholder="0.0"
                            type='number'
                            onChange={handleSwap}
                            value={inputSwap}
                            readOnly={delaySwap}
                        />
                        <div 
                            style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "pointer"}} 
                            onClick={() => {
                                if (swapMode === 0) {
                                    handleSwap({target: {value: ethBalance}})
                                } else if (swapMode === 1) {
                                    handleSwap({target: {value: cmdBalance}})
                                }
                            }} 
                            className="bold"
                        >
                            Max
                        </div>
                    </div>
                    <div style={{cursor: "pointer"}} className="fa fa-arrow-down" onClick={swapModeChange}></div>
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex"}}>
                            {swapMode === 0 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" alt="$CMD" /> : <></>}
                            {swapMode === 1 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo.svg" alt="$ETH" /> : <></>}
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
                        {swapMode === 0 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {Number(cmdBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div> : <></>}
                        {swapMode === 1 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {Number(ethBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div> : <></>}
                    </div>
                    {(swapMode === 0 || swapMode === 1) &&
                        <input
                            style={{marginTop: 0, width: "260px", height: "40px", padding: "5px 20px", border: "1px solid #dddade", cursor: "not-allowed"}}
                            placeholder="0.0"
                            value={swapMode === 0 ? cmdBought : ethBought}
                            readOnly
                            disabled
                        />
                    }
                    {swapMode === 0 &&
                        <>
                            <div style={{width: "80%", lineHeight: 1.5, fontSize: "10px", display: "flex", justifyContent: "space-between"}}>
                                <div>CMD Price :</div>
                                {cmdReserv !== 0 ?
                                    <div>{Number(ethReserv/cmdReserv).toLocaleString('en-US', {maximumFractionDigits:10})} ETH <span className="tokenNormText">(~{(Math.floor((ethReserv/cmdReserv) * priceTHB * 100) / 100).toLocaleString('en-US', {maximumFractionDigits:3})} THB)</span></div> :
                                    <>Loading...</>
                                }
                            </div>
                            <div style={{width: "80%", lineHeight: 1.5, fontSize: "10px", display: "flex", justifyContent: "space-between"}}>
                                <div>Price Impact :</div>
                                {cmdBought !== "" && Number(inputSwap) !== 0 ? 
                                    <div>{Number(((((Number(inputSwap) / (Number(cmdReserv) - ((Number(cmdReserv) * Number(ethReserv)) / (Number(ethReserv) + Number(inputSwap))))) - (Number(ethReserv/cmdReserv))) / (Number(ethReserv/cmdReserv))) * 100)).toFixed(2)}%</div> :
                                    <div>0.00%</div>
                                }
                            </div>
                        </>
                    }
                    {swapMode === 1 &&
                        <>
                            <div style={{width: "80%", lineHeight: 1.5, fontSize: "10px", display: "flex", justifyContent: "space-between"}}>
                                <div>ETH Price :</div>
                                {cmdReserv !== 0 ? 
                                    <div>{Number(cmdReserv/ethReserv).toLocaleString('en-US', {maximumFractionDigits:0})} CMD <span className="tokenNormText">(~{(Math.floor((cmdReserv/ethReserv) * ((ethReserv/cmdReserv) * priceTHB) * 100) / 100).toLocaleString('en-US', {maximumFractionDigits:0})} THB)</span></div> :
                                    <>Loading...</>
                                }
                            </div>
                            <div style={{width: "80%", lineHeight: 1.5, fontSize: "10px", display: "flex", justifyContent: "space-between"}}>
                                <div>Price Impact :</div>
                                {ethBought !== "" && Number(inputSwap) !== 0 ?
                                    <div>{Number(((((Number(inputSwap) / (Number(ethReserv) - ((Number(cmdReserv) * Number(ethReserv)) / (Number(cmdReserv) + Number(inputSwap))))) - (Number(cmdReserv/ethReserv))) / (Number(cmdReserv/ethReserv))) * 100)).toFixed(2)}%</div> :
                                    <div>0.00%</div>
                                }
                            </div>
                        </>
                    }
                    {(swapMode === 0 || swapMode === 1) &&
                        <>
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "250px", padding: "15px 30px", height: "fit-content", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "18px", cursor: "pointer"}} className="bold" onClick={swapTokenHandle}>Swap</div> :
                                <div style={{letterSpacing: "1px", width: "250px", padding: "15px 30px", height: "fit-content", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "18px", cursor: "not-allowed"}} className="bold">Swap</div>
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default OpSwap
