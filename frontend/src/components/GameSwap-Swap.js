import React from 'react'
import Select from 'react-select'
import { getBalance, readContract, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { ethers } from 'ethers'
   
const Swap = ({ config, address, setisLoading, setTxupdate, options, inputStyle, jcExchange, exchangeABI, juExchange, exchangeJulpABI, jcSwap, swapABI, juSwap, swapJulpABI, cmjToken, jusdtToken, erc20Abi, jbcBalance, cmjBalance, jusdtBalance, jbcReserv, cmjReserv, jbcJuReserv, jusdtJuReserv, priceTHB }) => {
    const [inputSwap, setInputSwap] = React.useState("")
    const [jbcBought, setJbcBought] = React.useState("")
    const [cmjBought, setCmjBought] = React.useState("")
    const [jbcJuBought, setJbcJuBought] = React.useState("")
    const [jusdtJuBought, setJusdtJuBought] = React.useState("")
    const [delaySwap, setDelaySwap] = React.useState(false)

    const handleSwap = async (event) => {
        setDelaySwap(true)
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveJbc = await getBalance(config, { address: jcExchange, })
        const _reserveCmj = await readContract(config, {
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'getReserve',
        })
        const tokensBought = await readContract(config, {
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveJbc.value), String(_reserveCmj)],
        })
        event.target.value !== "" ? setCmjBought(ethers.utils.formatEther(tokensBought)) : setCmjBought("")
        setDelaySwap(false)
    }
    const maxHandle1 = async () => {
        const _max = address !== undefined ? await getBalance(config, { address: address, }) : {formatted: 0}
        const maxSubGas = Number(_max.formatted) - 0.009
        setInputSwap(String(maxSubGas))
        const _value = maxSubGas >= 0 ? ethers.utils.parseEther(String(maxSubGas)) : 0
        const _reserveJbc = await getBalance(config, { address: jcExchange, })
        const _reserveCmj = await readContract(config, {
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'getReserve',
        })
        const tokensBought = await readContract(config, {
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveJbc.value), String(_reserveCmj)],
        })
        maxSubGas >= 0 ? setCmjBought(ethers.utils.formatEther(tokensBought)) : setCmjBought("")
    }
    const handleSwap2 = async (event) => {
        setDelaySwap(true)
        setInputSwap(event.target.value)
        
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveJbc = await getBalance(config, { address: jcExchange, })
        const _reserveCmj = await readContract(config, {
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'getReserve',
        })
        const jbcBought = await readContract(config, {
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveJbc.value)],
        })
        event.target.value !== "" ? setJbcBought(ethers.utils.formatEther(jbcBought)) : setJbcBought("")
        setDelaySwap(false)
    }
    const maxHandle2 = async () => {
        const _max = address !== undefined ? await readContract(config, {
            address: cmjToken,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address],
        }) : 0
        setInputSwap(ethers.utils.formatEther(_max))
        const _value = _max >= 0 ? _max : 0
        const _reserveJbc = await getBalance(config, { address: jcExchange, })
        const _reserveCmj = await readContract(config, {
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'getReserve',
        })
        const jbcBought = await readContract(config, {
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveCmj), String(_reserveJbc.value)],
        })
        _max !== "" ? setJbcBought(ethers.utils.formatEther(jbcBought)) : setJbcBought("")
    }
    const handleSwap3 = async (event) => {
        setDelaySwap(true)
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveJbc = await getBalance(config, { address: juExchange, })
        const _reserveJusdt = await readContract(config, {
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'getReserve',
        })
        const tokensBought = await readContract(config, {
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveJbc.value), String(_reserveJusdt)],
        })
        event.target.value !== "" ? setJusdtJuBought(ethers.utils.formatEther(tokensBought)) : setJusdtJuBought("")
        setDelaySwap(false)
    }
    const maxHandle3 = async () => {
        const _max = address !== undefined ? await getBalance(config, { address: address, }) : {formatted: 0}
        const maxSubGas = Number(_max.formatted) - 0.009
        setInputSwap(String(maxSubGas))
        const _value = maxSubGas >= 0 ? ethers.utils.parseEther(String(maxSubGas)) : 0
        const _reserveJbc = await getBalance(config, { address: juExchange, })
        const _reserveJusdt = await readContract(config, {
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'getReserve',
        })
        const tokensBought = await readContract(config, {
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveJbc.value), String(_reserveJusdt)],
        })
        maxSubGas !== "" ? setJusdtJuBought(ethers.utils.formatEther(tokensBought)) : setJusdtJuBought("")
    }
    const handleSwap4 = async (event) => {
        setDelaySwap(true)
        setInputSwap(event.target.value)
        const _value = event.target.value !== "" ? ethers.utils.parseEther(event.target.value) : 0
        const _reserveJbc = await getBalance(config, { address: juExchange, })
        const _reserveJusdt = await readContract(config, {
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'getReserve',
        })
        const jbcBought = await readContract(config, {
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveJusdt), String(_reserveJbc.value)],
        })
        event.target.value !== "" ? setJbcJuBought(ethers.utils.formatEther(jbcBought)) : setJbcJuBought("")
        setDelaySwap(false)
    }
    const maxHandle4 = async () => {
        const _max = address !== undefined ? await readContract(config, {
            address: jusdtToken,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address],
        }) : 0
        setInputSwap(ethers.utils.formatEther(_max))
        const _value = _max >= 0 ? _max : 0
        const _reserveJbc = await getBalance(config, { address: juExchange, })
        const _reserveJusdt = await readContract(config, {
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'getReserve',
        })
        const jbcBought = await readContract(config, {
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'getAmountOfTokens',
            args: [String(_value), String(_reserveJusdt), String(_reserveJbc.value)],
        })
        _max !== "" ? setJbcJuBought(ethers.utils.formatEther(jbcBought)) : setJbcJuBought("")
    }

    const swapTokenHandle = async () => {
        setisLoading(true)
        try {
            if (swapMode === 0) {
                let { request } = await simulateContract(config, {
                    address: jcSwap,
                    abi: swapABI,
                    functionName: 'callJbcToCmj',
                    args: [ethers.utils.parseEther(String(cmjBought * 0.99))],
                    value: ethers.utils.parseEther(inputSwap),
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            } else {
                const cmAllow = await readContract(config, {
                    address: cmjToken,
                    abi: erc20Abi,
                    functionName: 'allowance',
                    args: [address, jcSwap],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (inputSwap > Number(cmAllow) / (10**18)) {
                    let { request } = await simulateContract(config, {
                        address: cmjToken,
                        abi: erc20Abi,
                        functionName: 'approve',
                        args: [jcSwap, bigApprove],
                    })
                    let h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
                let { request } = await simulateContract(config, {
                    address: jcSwap,
                    abi: swapABI,
                    functionName: 'callCmjToJbc',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(String(jbcBought * 0.99))],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            }
        } catch {}
        setisLoading(false)
    }
    const swapTokenHandle2 = async () => {
        setisLoading(true)
        try {
            if (swapMode === 3) {
                let { request } = await simulateContract(config, {
                    address: juSwap,
                    abi: swapJulpABI,
                    functionName: 'callJbcToJusdt',
                    args: [ethers.utils.parseEther(String(jusdtJuBought * 0.99))],
                    value: ethers.utils.parseEther(inputSwap),
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            } else {
                const jusdtAllow = await readContract(config, {
                    address: jusdtToken,
                    abi: erc20Abi,
                    functionName: 'allowance',
                    args: [address, juSwap],
                })
                const bigValue = ethers.BigNumber.from(ethers.utils.parseEther(inputSwap))
                const Hex = ethers.BigNumber.from(10**8)
                const bigApprove = bigValue.mul(Hex)
                if (inputSwap > Number(jusdtAllow) / (10**18)) {
                    let { request } = await simulateContract(config, {
                        address: jusdtToken,
                        abi: erc20Abi,
                        functionName: 'approve',
                        args: [juSwap, bigApprove],
                    })
                    let h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
                let { request } = await simulateContract(config, {
                    address: juSwap,
                    abi: swapJulpABI,
                    functionName: 'callJusdtToJbc',
                    args: [ethers.utils.parseEther(inputSwap), ethers.utils.parseEther(String(jbcJuBought * 0.99))],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
                setTxupdate(h)
            }
        } catch {}
        setisLoading(false)
    }

    const [swapMode, setSwapMode] = React.useState(1)
    const swapModeChange = () => {
        if (swapMode === 0) { setSwapMode(1) }
        if (swapMode === 1) { setSwapMode(0) }
        if (swapMode === 2) { setSwapMode(3) }
        if (swapMode === 3) { setSwapMode(2) }
        setInputSwap("")
        setJbcBought("")
        setCmjBought("")
    }
    const swapModeSelect = (option) => {
        setSwapMode(option.value)
        setInputSwap("")
        setCmjBought("")
        setJbcBought("")
    }
    const swapModeSelect2 = (option) => {
        if (swapMode === 0 && option.value === 1) { setSwapMode(0) }
        if (swapMode === 0 && option.value === 2) { setSwapMode(3) }
        if (swapMode === 3 && option.value === 1) { setSwapMode(0) }
        if (swapMode === 3 && option.value === 2) { setSwapMode(3) }
        setInputSwap("")
        setCmjBought("")
        setJbcBought("")
    }

    return (
        <>
            <div style={{margin: "20px 0", width: "750px", maxWidth: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <div style={{marginTop: "20px", padding: "20px 0", height: "450px", width: "350px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", textAlign: "left", fontSize: "20px"}} className="bold">Instant Swap</div>
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex"}}>
                            {swapMode === 0 || swapMode === 3 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" alt="$JBC" /> : <></>}
                            {swapMode === 1 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" /> : <></>}
                            {swapMode === 2 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" alt="$JUSDT" /> : <></>}
                            {swapMode === 0 || swapMode === 3 ?
                                <Select
                                    options={[]}
                                    value={options[0]}
                                    styles={inputStyle}
                                    isSearchable={false}
                                /> :
                                <>
                                    <Select
                                        onChange={swapModeSelect}
                                        options={options.filter(option => option.value !== 0)}
                                        value={options[swapMode]}
                                        styles={inputStyle}
                                        isSearchable={false}
                                    />
                                </>
                            }
                        </div>
                        {swapMode === 0 || swapMode === 3 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {jbcBalance}</div> : <></>}
                        {swapMode === 1 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {cmjBalance}</div> : <></>}
                        {swapMode === 2 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {jusdtBalance}</div> : <></>}
                    </div>
                    {swapMode === 0 || swapMode === 1 ?
                        <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                            <input
                                style={{alignSelf: "flex-start", marginTop: 0, width: "190px", height: "40px", padding: "5px 20px", border: "1px solid #dddade"}}
                                placeholder="0.0"
                                onChange={swapMode === 0 ? handleSwap : handleSwap2}
                                value={inputSwap}
                                readOnly={delaySwap}
                                type='number'
                            />
                            {swapMode === 0 ?
                                <div style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "pointer"}} className="bold" onClick={maxHandle1}>Max</div> :
                                <div style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "pointer"}} className="bold" onClick={maxHandle2}>Max</div>}
                        </div> :
                        <></>
                    }
                    {swapMode === 2 || swapMode === 3 ?
                        <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                            <input
                                style={{alignSelf: "flex-start", marginTop: 0, width: "190px", height: "40px", padding: "5px 20px", border: "1px solid #dddade"}}
                                placeholder="0.0"
                                onChange={swapMode === 3 ? handleSwap3 : handleSwap4}
                                value={inputSwap}
                                readOnly={delaySwap}
                                type='number'
                            />
                            {swapMode === 3 ? 
                                <div style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "pointer"}} className="bold" onClick={maxHandle3}>Max</div> :
                                <div style={{padding: "15px 10px", border: "1px solid #dddade", cursor: "pointer"}} className="bold" onClick={maxHandle4}>Max</div>
                            }
                        </div> :
                        <></>
                    }
                    <div style={{cursor: "pointer"}} className="fa fa-arrow-down" onClick={swapModeChange}></div>
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex"}}>
                            {swapMode === 0 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" /> : <></>}
                            {swapMode === 1 || swapMode === 2 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" alt="$JBC" /> : <></>}
                            {swapMode === 3 ? <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" alt="$JUSDT" /> : <></>}
                            {swapMode === 0 ?
                                <>
                                    <Select
                                        onChange={swapModeSelect2}
                                        options={options.filter(option => option.value !== 0)}
                                        value={options[1]}
                                        styles={inputStyle}
                                        isSearchable={false}
                                    />
                                </> :
                                <></>
                            }
                            {swapMode === 1 || swapMode === 2 ?
                                <>
                                    <Select
                                        options={[]}
                                        value={options[0]}
                                        styles={inputStyle}
                                        isSearchable={false}
                                    />
                                </> :
                                <></>
                            }
                            {swapMode === 3 ?
                                <>
                                    <Select
                                        onChange={swapModeSelect2}
                                        options={options.filter(option => option.value !== 0)}
                                        value={options[2]}
                                        styles={inputStyle}
                                        isSearchable={false}
                                    />
                                </> :
                                <></>
                            }
                        </div>
                        {swapMode === 0 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {cmjBalance}</div> : <></>}
                        {swapMode === 1 || swapMode === 2 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {jbcBalance}</div> : <></>}
                        {swapMode === 3 ? <div style={{height: "38px", lineHeight: 3, fontSize: "12px"}}>Balance: {jusdtBalance}</div> : <></>}
                    </div>
                    {swapMode === 0 || swapMode === 1 ?
                        <input
                            style={{marginTop: 0, width: "260px", height: "40px", padding: "5px 20px", border: "1px solid #dddade"}}
                            placeholder="0.0"
                            readOnly
                            value={swapMode === 0 ? cmjBought : jbcBought}
                        /> :
                        <></>
                    }
                    {swapMode === 2 || swapMode === 3 ?
                        <input
                            style={{marginTop: 0, width: "260px", height: "40px", padding: "5px 20px", border: "1px solid #dddade"}}
                            placeholder="0.0"
                            readOnly
                            value={swapMode === 3 ? jusdtJuBought : jbcJuBought}
                        /> :
                        <></>
                    }
                    {swapMode === 0 &&
                        <>
                            <div style={{width: "70%", lineHeight: 1.5, fontSize: "12px", display: "flex", justifyContent: "space-between"}}>
                                <div>CMJ Price :</div>
                                {cmjReserv !== 0 ?
                                    <div>{Number(jbcReserv/cmjReserv).toLocaleString('en-US', {minimumFractionDigits:3})} JBC <span className="tokenNormText">(~{(Math.floor((jbcReserv/cmjReserv) * ((jusdtJuReserv/jbcJuReserv) * priceTHB) * 100) / 100).toLocaleString('en-US', {minimumFractionDigits:2})} THB)</span></div> :
                                    <>Loading...</>
                                }
                            </div>
                            <div style={{width: "70%", lineHeight: 1.5, fontSize: "12px", display: "flex", justifyContent: "space-between"}}>
                                <div>Price Impact :</div>
                                {cmjBought !== "" && Number(inputSwap) !== 0 ? 
                                    <div>{Number(((((Number(inputSwap) / (Number(cmjReserv) - ((Number(cmjReserv) * Number(jbcReserv)) / (Number(jbcReserv) + Number(inputSwap))))) - (Number(jbcReserv/cmjReserv))) / (Number(jbcReserv/cmjReserv))) * 100)).toFixed(2)}%</div> :
                                    <div>0.00%</div>
                                }
                            </div>
                        </>
                    }
                    {swapMode === 1 &&
                        <>
                            <div style={{width: "70%", lineHeight: 1.5, fontSize: "12px", display: "flex", justifyContent: "space-between"}}>
                                <div>JBC Price :</div>
                                {cmjReserv !== 0 ? 
                                    <div>{Number(cmjReserv/jbcReserv).toLocaleString('en-US', {minimumFractionDigits:3})} CMJ <span className="tokenNormText">(~{(Math.floor((cmjReserv/jbcReserv) * ((jbcReserv/cmjReserv) * ((jusdtJuReserv/jbcJuReserv) * priceTHB)) * 100) / 100).toLocaleString('en-US', {minimumFractionDigits:2})} THB)</span></div> :
                                    <>Loading...</>
                                }
                            </div>
                            <div style={{width: "70%", lineHeight: 1.5, fontSize: "12px", display: "flex", justifyContent: "space-between"}}>
                                <div>Price Impact :</div>
                                {jbcBought !== "" && Number(inputSwap) !== 0 ?
                                    <div>{Number(((((Number(inputSwap) / (Number(jbcReserv) - ((Number(cmjReserv) * Number(jbcReserv)) / (Number(cmjReserv) + Number(inputSwap))))) - (Number(cmjReserv/jbcReserv))) / (Number(cmjReserv/jbcReserv))) * 100)).toFixed(2)}%</div> :
                                    <div>0.00%</div>
                                }
                            </div>
                        </>
                    }
                    {swapMode === 2 &&
                        <>
                            <div style={{width: "70%", lineHeight: 1.5, fontSize: "12px", display: "flex", justifyContent: "space-between"}}>
                                <div>JBC Price :</div>
                                {jusdtJuReserv !== 0 ?
                                    <div>{Number(jusdtJuReserv/jbcJuReserv).toLocaleString('en-US', {minimumFractionDigits:3})} JUSDT <span className="tokenNormText">(~{(Math.floor((jusdtJuReserv/jbcJuReserv) * priceTHB * 100) / 100).toLocaleString('en-US', {minimumFractionDigits:2})} THB)</span></div> :
                                    <>Loading...</>
                                }
                            </div>
                            <div style={{width: "70%", lineHeight: 1.5, fontSize: "12px", display: "flex", justifyContent: "space-between"}}>
                                <div>Price Impact :</div>
                                {jbcJuBought !== "" && Number(inputSwap) !== 0 ?
                                    <div>{Number(((((Number(inputSwap) / (Number(jbcJuReserv) - ((Number(jusdtJuReserv) * Number(jbcJuReserv)) / (Number(jusdtJuReserv) + Number(inputSwap))))) - (Number(jusdtJuReserv/jbcJuReserv))) / (Number(jusdtJuReserv/jbcJuReserv))) * 100)).toFixed(2)}%</div> :
                                    <div>0.00%</div>
                                }
                            </div>
                        </>
                    }
                    {swapMode === 3 &&
                        <>
                            <div style={{width: "70%", lineHeight: 1.5, fontSize: "12px", display: "flex", justifyContent: "space-between"}}>
                                <div>JUSDT Price :</div>
                                {jusdtJuReserv !== 0 ?
                                    <div>{Number(jbcJuReserv/jusdtJuReserv).toLocaleString('en-US', {minimumFractionDigits:3})} JBC <span className="tokenNormText">(~{(Math.floor(priceTHB * 100) / 100).toLocaleString('en-US', {minimumFractionDigits:2})} THB)</span></div> :
                                    <>Loading...</>
                                }
                            </div>
                            <div style={{width: "70%", lineHeight: 1.5, fontSize: "12px", display: "flex", justifyContent: "space-between"}}>
                                <div>Price Impact :</div>
                                {jusdtJuBought !== "" && Number(inputSwap) !== 0 ?
                                    <div>{Number(((((Number(inputSwap) / (Number(jusdtJuReserv) - ((Number(jusdtJuReserv) * Number(jbcJuReserv)) / (Number(jbcJuReserv) + Number(inputSwap))))) - (Number(jbcJuReserv/jusdtJuReserv))) / (Number(jbcJuReserv/jusdtJuReserv))) * 100)).toFixed(2)}%</div> :
                                    <div>0.00%</div>
                                }
                            </div>
                        </>
                    }
                    {swapMode === 0 || swapMode === 1 ?
                        <div style={{letterSpacing: "1px", width: "250px", padding: "15px 30px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "18px"}} className="bold" onClick={swapTokenHandle}>Swap</div> :
                        <></>
                    }
                    {swapMode === 2 || swapMode === 3 ?
                        <div style={{letterSpacing: "1px", width: "250px", padding: "15px 30px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "18px"}} className="bold" onClick={swapTokenHandle2}>Swap</div> :
                        <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Swap