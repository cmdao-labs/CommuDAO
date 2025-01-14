import React from 'react'
import { ethers } from 'ethers'
import { createPublicClient, http } from 'viem'
import { jbc } from 'viem/chains' 
import { getBalance, readContracts } from '@wagmi/core'
import { ThreeDots } from 'react-loading-icons'

const cmj = '0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b'
const wood = '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd'
const bbq = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const pza = '0x09DcdCFc6C48803681a3422997c679E773656763'
const ctuna = '0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0'
const sx31 = '0xd431d826d7a4380b9259612176f00528b88840a7'
const cu = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const sil = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const gold = '0x7d5346E33889580528e6F79f48BdEE94D8A9E144'
const plat = '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD'
const jasp = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const pluto = '0x70a74ec50bcceae43dd16f48492552a8b25403ea'
const fbtc = '0x8656268C82cffda9062387F8F117166F01e8Ef2E'
const x4 = '0x0DF9D160489440D630a247fBC830DA74779928b1'
const infpow = '0xCCbb477D6c28892d6311ebb729b4c242C92f70FD'
const os = '0xAc5299D92373E9352636559cca497d7683A47655'
const jdao = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const cmd = '0x399fe73bb0ee60670430fd92fe25a0fdd308e142'
const usdtOP = '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58'
const genesis = '0x0000000000000000000000000000000000000000'
const burn = '0x0000000000000000000000000000000000000001'
const publicClient = createPublicClient({ chain: jbc, transport: http() })

const BigBroAnalytica = ({ config, erc20Abi }) => {
    const [cmdBbq, setCmdBbq] = React.useState(null)
    const [cmdGov, setCmdGov] = React.useState(null)
    const [cmdRev, setCmdRev] = React.useState(null)
    const [cmdBurn, setCmdBurn] = React.useState(null)
    const [usdtRev, setUsdtRev] = React.useState(null)
    const [ethRev, setEthRev] = React.useState(null)
    console.log(cmdRev, usdtRev, ethRev)
    const [cmdCirculation, setCmdCirculation] = React.useState(null)
    const [cmjLocked, setCmjLocked] = React.useState(null)
    const [cmjReward, setCmjReward] = React.useState(null)
    const [cmjBurn, setCmjBurn] = React.useState(null)
    const [cmjCirculation, setCmjCirculation] = React.useState(null)
    const [woodSupply, setWoodSupply] = React.useState(null)
    const [woodBurn, setWoodBurn] = React.useState(null)
    const [woodCirculation, setWoodCirculation] = React.useState(null)
    const [woodStat, setWoodStat] = React.useState([null, null])
    const [bbqSupply, setBbqSupply] = React.useState(null)
    const [bbqBurn, setBbqBurn] = React.useState(null)
    const [bbqCirculation, setBbqCirculation] = React.useState(null)
    const [bbqStat, setBbqStat] = React.useState([null, null])
    const [pzaSupply, setPzaSupply] = React.useState(null)
    const [pzaBurn, setPzaBurn] = React.useState(null)
    const [pzaCirculation, setPzaCirculation] = React.useState(null)
    const [pzaStat, setPzaStat] = React.useState([null, null])
    const [ctunaSupply, setCtunaSupply] = React.useState(null)
    const [ctunaBurn, setCtunaBurn] = React.useState(null)
    const [ctunaCirculation, setCtunaCirculation] = React.useState(null)
    const [ctunaStat, setCtunaStat] = React.useState([null, null])
    const [sx31Supply, setSx31Supply] = React.useState(null)
    const [sx31Burn, setSx31Burn] = React.useState(null)
    const [sx31Circulation, setSx31Circulation] = React.useState(null)
    const [sx31Stat, setSx31Stat] = React.useState([null, null])
    const [cuSupply, setCuSupply] = React.useState(null)
    const [cuBurn, setCuBurn] = React.useState(null)
    const [cuCirculation, setCuCirculation] = React.useState(null)
    const [cuStat, setCuStat] = React.useState([null, null])
    const [silSupply, setSilSupply] = React.useState(null)
    const [silLocked, setSilLocked] = React.useState(null)
    const [silBurn, setSilBurn] = React.useState(null)
    const [silCirculation, setSilCirculation] = React.useState(null)
    const [silStat, setSilStat] = React.useState([null, null])
    const [goldSupply, setGoldSupply] = React.useState(null)
    const [goldBurn, setGoldBurn] = React.useState(null)
    const [goldCirculation, setGoldCirculation] = React.useState(null)
    const [goldStat, setGoldStat] = React.useState([null, null])
    const [platSupply, setPlatSupply] = React.useState(null)
    const [platLocked, setPlatLocked] = React.useState(null)
    const [platBurn, setPlatBurn] = React.useState(null)
    const [platCirculation, setPlatCirculation] = React.useState(null)
    const [platStat, setPlatStat] = React.useState([null, null])
    const [jaspSupply, setJaspSupply] = React.useState(null)
    const [jaspBurn, setJaspBurn] = React.useState(null)
    const [jaspCirculation, setJaspCirculation] = React.useState(null)
    const [jaspStat, setJaspStat] = React.useState([null, null])
    const [plutoSupply, setPlutoSupply] = React.useState(null)
    const [plutoBurn, setPlutoBurn] = React.useState(null)
    const [plutoCirculation, setPlutoCirculation] = React.useState(null)
    const [plutoStat, setPlutoStat] = React.useState([null, null])
    const [fbtcSupply, setFbtcSupply] = React.useState(null)
    const [fbtcBurn, setFbtcBurn] = React.useState(null)
    const [fbtcCirculation, setFbtcCirculation] = React.useState(null)
    const [fbtcStat, setFbtcStat] = React.useState([null, null])
    const [x4Supply, setX4Supply] = React.useState(null)
    const [x4Burn, setX4Burn] = React.useState(null)
    const [x4Circulation, setX4Circulation] = React.useState(null)
    const [x4Stat, setX4Stat] = React.useState([null, null])
    const [infpowSupply, setInfpowSupply] = React.useState(null)
    const [infpowBurn, setInfpowBurn] = React.useState(null)
    const [infpowCirculation, setInfpowCirculation] = React.useState(null)
    const [infpowStat, setInfpowStat] = React.useState([null, null])
    const [osSupply, setOsSupply] = React.useState(null)
    const [osLocked, setOsLocked] = React.useState(null)
    const [osBurn, setOsBurn] = React.useState(null)
    const [osCirculation, setOsCirculation] = React.useState(null)
    const [osStat, setOsStat] = React.useState([null, null])
    const [jdaoSupply, setJdaoSupply] = React.useState(null)
    const [jdaoBurn, setJdaoBurn] = React.useState(null)
    const [jdaoCirculation, setJdaoCirculation] = React.useState(null)
    const [jdaoStat, setJdaoStat] = React.useState([null, null])

    React.useEffect(() => {  
        window.scrollTo(0, 0)
              
        const thefetch = async () => {            
            const blocknumber = await publicClient.getBlockNumber()
            const woodfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: wood, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const woodlog = publicClient.getFilterLogs({ filter: woodfilter })
            const woodfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: wood, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const woodlog2 = publicClient.getFilterLogs({ filter: woodfilter2 })
            const jdaofilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jdao, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const jdaolog = publicClient.getFilterLogs({ filter: jdaofilter })
            const jdaofilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jdao, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const jdaolog2 = publicClient.getFilterLogs({ filter: jdaofilter2 })
            const osfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: os, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const oslog = publicClient.getFilterLogs({ filter: osfilter })
            const osfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: os, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const oslog2 = publicClient.getFilterLogs({ filter: osfilter2 })
            const bbqfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: bbq, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const bbqlog = publicClient.getFilterLogs({ filter: bbqfilter })
            const bbqfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: bbq, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const bbqlog2 = publicClient.getFilterLogs({ filter: bbqfilter2 })
            const bbqfilter3 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: bbq, eventName: 'Transfer', args: { to: cu }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const bbqlog3 = publicClient.getFilterLogs({ filter: bbqfilter3 })
            const pzafilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: pza, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const pzalog = publicClient.getFilterLogs({ filter: pzafilter })
            const pzafilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: pza, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const pzalog2 = publicClient.getFilterLogs({ filter: pzafilter2 })
            const ctunafilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: ctuna, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const ctunalog = publicClient.getFilterLogs({ filter: ctunafilter })
            const ctunafilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: ctuna, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const ctunalog2 = publicClient.getFilterLogs({ filter: ctunafilter2 })
            const sx31filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: sx31, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const sx31log = publicClient.getFilterLogs({ filter: sx31filter })
            const sx31filter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: sx31, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const sx31log2 = publicClient.getFilterLogs({ filter: sx31filter2 })
            const cufilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cu, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const culog = publicClient.getFilterLogs({ filter: cufilter })
            const cufilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cu, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const culog2 = publicClient.getFilterLogs({ filter: cufilter2 })
            const silfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: sil, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const sillog = publicClient.getFilterLogs({ filter: silfilter })
            const silfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: sil, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const sillog2 = publicClient.getFilterLogs({ filter: silfilter2 })
            const goldfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: gold, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const goldlog = publicClient.getFilterLogs({ filter: goldfilter })
            const goldfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: gold, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const goldlog2 = publicClient.getFilterLogs({ filter: goldfilter2 })
            const platfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: plat, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const platlog = publicClient.getFilterLogs({ filter: platfilter })
            const platfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: plat, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const platlog2 = publicClient.getFilterLogs({ filter: platfilter2 })
            const jaspfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jasp, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const jasplog = publicClient.getFilterLogs({ filter: jaspfilter })
            const jaspfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jasp, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const jasplog2 = publicClient.getFilterLogs({ filter: jaspfilter2 })
            const plutofilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: pluto, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const plutolog = publicClient.getFilterLogs({ filter: plutofilter })
            const plutofilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: pluto, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const plutolog2 = publicClient.getFilterLogs({ filter: plutofilter2 })
            const fbtcfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: fbtc, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const fbtclog = publicClient.getFilterLogs({ filter: fbtcfilter })
            const fbtcfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: fbtc, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const fbtclog2 = publicClient.getFilterLogs({ filter: fbtcfilter2 })
            const x4filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: x4, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const x4log = publicClient.getFilterLogs({ filter: x4filter })
            const x4filter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: x4, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const x4log2 = publicClient.getFilterLogs({ filter: x4filter2 })
            const infpowfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: infpow, eventName: 'Transfer', args: { from: genesis }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const infpowlog = publicClient.getFilterLogs({ filter: infpowfilter })
            const infpowfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: infpow, eventName: 'Transfer', args: { to: burn }, fromBlock: blocknumber - 7200n, toBlock: "latest" })
            const infpowlog2 = publicClient.getFilterLogs({ filter: infpowfilter2 })
            
            const wooddata = await woodlog
            const woodmap = await Promise.all(wooddata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const woodMint = woodmap.reduce((partialSum, a) => partialSum + a, 0)
            const wooddata2 = await woodlog2
            const woodmap2 = await Promise.all(wooddata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const woodBurn = woodmap2.reduce((partialSum, a) => partialSum + a, 0)
            const jdaodata = await jdaolog
            const jdaomap = await Promise.all(jdaodata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const jdaoMint = jdaomap.reduce((partialSum, a) => partialSum + a, 0)
            const jdaodata2 = await jdaolog2
            const jdaomap2 = await Promise.all(jdaodata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const jdaoBurn = jdaomap2.reduce((partialSum, a) => partialSum + a, 0)
            const osdata = await oslog
            const osmap = await Promise.all(osdata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const osMint = osmap.reduce((partialSum, a) => partialSum + a, 0)
            const osdata2 = await oslog2
            const osmap2 = await Promise.all(osdata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const osBurn = osmap2.reduce((partialSum, a) => partialSum + a, 0)
            const bbqdata = await bbqlog
            const bbqmap = await Promise.all(bbqdata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const bbqMint = bbqmap.reduce((partialSum, a) => partialSum + a, 0)
            const bbqdata2 = await bbqlog2
            const bbqmap2 = await Promise.all(bbqdata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const bbqdata3 = await bbqlog3
            const bbqmap3 = await Promise.all(bbqdata3.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const bbqBurn = bbqmap2.concat(bbqmap3).reduce((partialSum, a) => partialSum + a, 0)
            const pzadata = await pzalog
            const pzamap = await Promise.all(pzadata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const pzaMint = pzamap.reduce((partialSum, a) => partialSum + a, 0)
            const pzadata2 = await pzalog2
            const pzamap2 = await Promise.all(pzadata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const pzaBurn = pzamap2.reduce((partialSum, a) => partialSum + a, 0)
            const ctunadata = await ctunalog
            const ctunamap = await Promise.all(ctunadata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const ctunaMint = ctunamap.reduce((partialSum, a) => partialSum + a, 0)
            const ctunadata2 = await ctunalog2
            const ctunamap2 = await Promise.all(ctunadata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const ctunaBurn = ctunamap2.reduce((partialSum, a) => partialSum + a, 0)
            const sx31data = await sx31log
            const sx31map = await Promise.all(sx31data.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const sx31Mint = sx31map.reduce((partialSum, a) => partialSum + a, 0)
            const sx31data2 = await sx31log2
            const sx31map2 = await Promise.all(sx31data2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const sx31Burn = sx31map2.reduce((partialSum, a) => partialSum + a, 0)
            const cudata = await culog
            const cumap = await Promise.all(cudata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const cuMint = cumap.reduce((partialSum, a) => partialSum + a, 0)
            const cudata2 = await culog2
            const cumap2 = await Promise.all(cudata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const cuBurn = cumap2.reduce((partialSum, a) => partialSum + a, 0)
            const sildata = await sillog
            const silmap = await Promise.all(sildata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const silMint = silmap.reduce((partialSum, a) => partialSum + a, 0)
            const sildata2 = await sillog2
            const silmap2 = await Promise.all(sildata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const silBurn = silmap2.reduce((partialSum, a) => partialSum + a, 0)
            const golddata = await goldlog
            const goldmap = await Promise.all(golddata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const goldMint = goldmap.reduce((partialSum, a) => partialSum + a, 0)
            const golddata2 = await goldlog2
            const goldmap2 = await Promise.all(golddata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const goldBurn = goldmap2.reduce((partialSum, a) => partialSum + a, 0)
            const platdata = await platlog
            const platmap = await Promise.all(platdata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const platMint = platmap.reduce((partialSum, a) => partialSum + a, 0)
            const platdata2 = await platlog2
            const platmap2 = await Promise.all(platdata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const platBurn = platmap2.reduce((partialSum, a) => partialSum + a, 0)
            const jaspdata = await jasplog
            const jaspmap = await Promise.all(jaspdata.map(async (obj) => {return Number(ethers.utils.formatUnits(obj.args.value, 'gwei'))}))
            const jaspMint = jaspmap.reduce((partialSum, a) => partialSum + a, 0)
            const jaspdata2 = await jasplog2
            const jaspmap2 = await Promise.all(jaspdata2.map(async (obj) => {return Number(ethers.utils.formatUnits(obj.args.value, 'gwei'))}))
            const jaspBurn = jaspmap2.reduce((partialSum, a) => partialSum + a, 0)
            const plutodata = await plutolog
            const plutomap = await Promise.all(plutodata.map(async (obj) => {return Number(ethers.utils.formatUnits(obj.args.value, 'gwei'))}))
            const plutoMint = plutomap.reduce((partialSum, a) => partialSum + a, 0)
            const plutodata2 = await plutolog2
            const plutomap2 = await Promise.all(plutodata2.map(async (obj) => {return Number(ethers.utils.formatUnits(obj.args.value, 'gwei'))}))
            const plutoBurn = plutomap2.reduce((partialSum, a) => partialSum + a, 0)
            const fbtcdata = await fbtclog
            const fbtcmap = await Promise.all(fbtcdata.map(async (obj) => {return Number(obj.args.value)}))
            const fbtcMint = fbtcmap.reduce((partialSum, a) => partialSum + a, 0)
            const fbtcdata2 = await fbtclog2
            const fbtcmap2 = await Promise.all(fbtcdata2.map(async (obj) => {return Number(obj.args.value)}))
            const fbtcBurn = fbtcmap2.reduce((partialSum, a) => partialSum + a, 0)
            const x4data = await x4log
            const x4map = await Promise.all(x4data.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const x4Mint = x4map.reduce((partialSum, a) => partialSum + a, 0)
            const x4data2 = await x4log2
            const x4map2 = await Promise.all(x4data2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const x4Burn = x4map2.reduce((partialSum, a) => partialSum + a, 0)
            const infpowdata = await infpowlog
            const infpowmap = await Promise.all(infpowdata.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const infpowMint = infpowmap.reduce((partialSum, a) => partialSum + a, 0)
            const infpowdata2 = await infpowlog2
            const infpowmap2 = await Promise.all(infpowdata2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const infpowBurn = infpowmap2.reduce((partialSum, a) => partialSum + a, 0)
            console.log(infpowBurn)

            const dataCMJ = await readContracts(config, {
                contracts: [
                    {
                        address: cmj,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xA6d974BD59F97e49465c6995a11022CA044c001A'],
                        chainId: 8899,
                    },
                    {
                        address: cmj,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x94EaDb7e678Ba7A78CADe66A1ABfa5c12dc8Cd7b'],
                        chainId: 8899,
                    },
                    {
                        address: cmj,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x0000000000000000000000000000000000000042'],
                        chainId: 8899,
                    },
                    {
                        address: cmj,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xFF19990569739e79aFF8549d8dE087Ab79De8dc7'],
                        chainId: 8899,
                    },
                ],
            })
            const dataWOOD = await readContracts(config, {
                contracts: [
                    {
                        address: wood,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: wood,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: wood,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x000000000000000000000000000000000000dEaD'],
                        chainId: 8899,
                    },
                    {
                        address: wood,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                ],
            })
            const dataJDAO = await readContracts(config, {
                contracts: [
                    {
                        address: jdao,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: jdao,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: jdao,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                    {
                        address: jdao,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xABd4127c8058498A53E690b06a75aFAf0F1d4e86'],
                        chainId: 8899,
                    },
                ],
            })
            const dataBBQ = await readContracts(config, {
                contracts: [
                    {
                        address: bbq,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: bbq,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: bbq,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                    {
                        address: bbq,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'],
                        chainId: 8899,
                    },
                ],
            })
            const dataPZA = await readContracts(config, {
                contracts: [
                    {
                        address: pza,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: pza,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: pza,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                    {
                        address: pza,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'],
                        chainId: 8899,
                    },
                    {
                        address: pza,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xABd4127c8058498A53E690b06a75aFAf0F1d4e86'],
                        chainId: 8899,
                    },
                ],
            })
            const dataCTUNA = await readContracts(config, {
                contracts: [
                    {
                        address: ctuna,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: ctuna,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: ctuna,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                ],
            })
            const dataSX31 = await readContracts(config, {
                contracts: [
                    {
                        address: sx31,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: sx31,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: sx31,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    }
                ],
            })
            const dataCU = await readContracts(config, {
                contracts: [
                    {
                        address: cu,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: cu,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: cu,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    }
                ],
            })
            const dataSIL = await readContracts(config, {
                contracts: [
                    {
                        address: sil,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: sil,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: sil,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                    {
                        address: sil,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xD30F5d6ABc3dBd9Df01eC0FE891114914Ee1360A'],
                        chainId: 8899,
                    }
                ],
            })
            const dataGOLD = await readContracts(config, {
                contracts: [
                    {
                        address: gold,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: gold,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: gold,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    }
                ],
            })
            const dataPLAT = await readContracts(config, {
                contracts: [
                    {
                        address: plat,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: plat,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: plat,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                    {
                        address: plat,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xABd4127c8058498A53E690b06a75aFAf0F1d4e86'],
                        chainId: 8899,
                    },
                ],
            })
            const dataJASP = await readContracts(config, {
                contracts: [
                    {
                        address: jasp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: jasp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: jasp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                ],
            })
            const dataPLUTO = await readContracts(config, {
                contracts: [
                    {
                        address: pluto,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: pluto,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: pluto,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                ],
            })
            const dataFBTC = await readContracts(config, {
                contracts: [
                    {
                        address: fbtc,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: fbtc,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: fbtc,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                ],
            })
            const dataX4 = await readContracts(config, {
                contracts: [
                    {
                        address: x4,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: x4,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: x4,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                ],
            })
            const dataINFPOW = await readContracts(config, {
                contracts: [
                    {
                        address: infpow,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: infpow,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: infpow,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                ],
            })
            const dataOS = await readContracts(config, {
                contracts: [
                    {
                        address: os,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        chainId: 8899,
                    },
                    {
                        address: os,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [burn],
                        chainId: 8899,
                    },
                    {
                        address: os,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'],
                        chainId: 8899,
                    },
                    {
                        address: os,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xABd4127c8058498A53E690b06a75aFAf0F1d4e86'],
                        chainId: 8899,
                    },
                    {
                        address: os,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xc4dB6374EeCa3743F8044ae995892827B62b14fe'],
                        chainId: 8899,
                    },
                ],
            })
            const dataCMD = await readContracts(config, {
                contracts: [
                    {
                        address: cmd,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x84bbfa70a60bB31fB00F2E2241E3a87C63F8734f'],
                        chainId: 10,
                    },
                    {
                        address: cmd,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xaA3Caad9e335a133d96EA3D5D73df2dcF9e360d4'],
                        chainId: 10,
                    },
                    {
                        address: cmd,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0xA41F70B283b8f097112ca3Bb63cB2718EE662e49'],
                        chainId: 10,
                    },
                    {
                        address: cmd,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x3C72Fb1658E7A64fd4C88394De4474186A13460A'],
                        chainId: 10,
                    },
                    {
                        address: usdtOP,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x1BeedD97fCD4E21754465d21c757A9DF43733187'],
                        chainId: 10,
                    },
                    {
                        address: cmd,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: ['0x000000000000000000000000000000000000dead'],
                        chainId: 10,
                    },
                ],
            })
            const bbqCmdBal1 = await getBalance(config, { address: '0x1BeedD97fCD4E21754465d21c757A9DF43733187', chainId: 190 })
            const ethBal1 = await getBalance(config, { address: '0x3C72Fb1658E7A64fd4C88394De4474186A13460A', chainId: 10 })

            return [
                dataCMJ, dataWOOD, dataJDAO, dataBBQ, dataPZA, dataCTUNA, dataSX31, dataCU, dataSIL, dataGOLD, dataPLAT, dataJASP, dataOS, dataCMD, 
                (Number(bbqCmdBal1.formatted) + Number(ethers.utils.formatEther(String(dataCMD[3].result)))), ethBal1.formatted, [woodMint, woodBurn], [jdaoMint, jdaoBurn], [osMint, osBurn], [bbqMint, bbqBurn], [pzaMint, pzaBurn], [ctunaMint, ctunaBurn], [sx31Mint, sx31Burn], [cuMint, cuBurn], [silMint, silBurn], [goldMint, goldBurn], [platMint, platBurn], [jaspMint, jaspBurn],
                [plutoMint, plutoBurn], dataPLUTO, [fbtcMint, fbtcBurn], dataFBTC, [x4Mint, x4Burn], dataX4, [infpowMint, infpowBurn], dataINFPOW,
            ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setCmjLocked(ethers.utils.formatEther(String(result[0][0].result)))
            setCmjReward(ethers.utils.formatEther(String(result[0][1].result)))
            setCmjBurn(Number(ethers.utils.formatEther(String(result[0][2].result))) + Number(ethers.utils.formatEther(String(result[0][3].result))))
            setCmjCirculation(1000000 - (Number(ethers.utils.formatEther(String(result[0][0].result))) + Number(ethers.utils.formatEther(String(result[0][2].result))) + Number(ethers.utils.formatEther(String(result[0][3].result)))))
            setWoodSupply(ethers.utils.formatEther(String(result[1][0].result)))
            setWoodBurn(Number(ethers.utils.formatEther(String(result[1][1].result))) + Number(ethers.utils.formatEther(String(result[1][2].result))) + Number(ethers.utils.formatEther(String(result[1][3].result))))
            setWoodCirculation(Number(ethers.utils.formatEther(String(result[1][0].result))) - (Number(ethers.utils.formatEther(String(result[1][1].result))) + Number(ethers.utils.formatEther(String(result[1][2].result))) + Number(ethers.utils.formatEther(String(result[1][3].result)))))
            setJdaoSupply(ethers.utils.formatEther(String(result[2][0].result)))
            setJdaoBurn(Number(ethers.utils.formatEther(String(result[2][1].result))) + Number(ethers.utils.formatEther(String(result[2][2].result))) + Number(ethers.utils.formatEther(String(result[2][3].result))))
            setJdaoCirculation(Number(ethers.utils.formatEther(String(result[2][0].result))) - (Number(ethers.utils.formatEther(String(result[2][1].result))) + Number(ethers.utils.formatEther(String(result[2][2].result))) + Number(ethers.utils.formatEther(String(result[2][3].result)))))
            setBbqSupply(ethers.utils.formatEther(String(result[3][0].result)))
            setBbqBurn(Number(ethers.utils.formatEther(String(result[3][1].result))) + Number(ethers.utils.formatEther(String(result[3][2].result)))  + Number(ethers.utils.formatEther(String(result[3][3].result))))
            setBbqCirculation(Number(ethers.utils.formatEther(String(result[3][0].result))) - (Number(ethers.utils.formatEther(String(result[3][1].result))) + Number(ethers.utils.formatEther(String(result[3][2].result))) + Number(ethers.utils.formatEther(String(result[3][3].result)))))
            setPzaSupply(ethers.utils.formatEther(String(result[4][0].result)))
            setPzaBurn(Number(ethers.utils.formatEther(String(result[4][1].result))) + Number(ethers.utils.formatEther(String(result[4][2].result))) + Number(ethers.utils.formatEther(String(result[4][3].result))) + Number(ethers.utils.formatEther(String(result[4][4].result))))
            setPzaCirculation(Number(ethers.utils.formatEther(String(result[4][0].result))) - (Number(ethers.utils.formatEther(String(result[4][1].result))) + Number(ethers.utils.formatEther(String(result[4][2].result))) + Number(ethers.utils.formatEther(String(result[4][3].result))) + Number(ethers.utils.formatEther(String(result[4][4].result)))))
            setCtunaSupply(ethers.utils.formatEther(String(result[5][0].result)))
            setCtunaBurn(Number(ethers.utils.formatEther(String(result[5][1].result))) + Number(ethers.utils.formatEther(String(result[5][2].result))))
            setCtunaCirculation(Number(ethers.utils.formatEther(String(result[5][0].result))) - (Number(ethers.utils.formatEther(String(result[5][1].result))) + Number(ethers.utils.formatEther(String(result[5][2].result)))))
            setSx31Supply(ethers.utils.formatEther(String(result[6][0].result)))
            setSx31Burn(Number(ethers.utils.formatEther(String(result[6][1].result))) + Number(ethers.utils.formatEther(String(result[6][2].result))))
            setSx31Circulation(Number(ethers.utils.formatEther(String(result[6][0].result))) - (Number(ethers.utils.formatEther(String(result[6][1].result))) + Number(ethers.utils.formatEther(String(result[6][2].result)))))
            setCuSupply(ethers.utils.formatEther(String(result[7][0].result)))
            setCuBurn(Number(ethers.utils.formatEther(String(result[7][1].result))) + Number(ethers.utils.formatEther(String(result[7][2].result))))
            setCuCirculation(Number(ethers.utils.formatEther(String(result[7][0].result))) - (Number(ethers.utils.formatEther(String(result[7][1].result)))  + Number(ethers.utils.formatEther(String(result[7][2].result)))))
            setSilSupply(ethers.utils.formatEther(String(result[8][0].result)))
            setSilLocked(ethers.utils.formatEther(String(result[8][3].result)))
            setSilBurn(Number(ethers.utils.formatEther(String(result[8][1].result))) + Number(ethers.utils.formatEther(String(result[8][2].result))))
            setSilCirculation(Number(ethers.utils.formatEther(String(result[8][0].result))) - (Number(ethers.utils.formatEther(String(result[8][1].result))) + Number(ethers.utils.formatEther(String(result[8][2].result))) + Number(ethers.utils.formatEther(String(result[8][3].result)))))
            setGoldSupply(ethers.utils.formatEther(String(result[9][0].result)))
            setGoldBurn(Number(ethers.utils.formatEther(String(result[9][1].result))) + Number(ethers.utils.formatEther(String(result[9][2].result))))
            setGoldCirculation(Number(ethers.utils.formatEther(String(result[9][0].result))) - (Number(ethers.utils.formatEther(String(result[9][1].result))) + Number(ethers.utils.formatEther(String(result[9][2].result)))))
            setPlatSupply(ethers.utils.formatEther(String(result[10][0].result)))
            setPlatLocked(ethers.utils.formatEther(String(result[10][3].result)))
            setPlatBurn(Number(ethers.utils.formatEther(String(result[10][1].result))) + Number(ethers.utils.formatEther(String(result[10][2].result))))
            setPlatCirculation(Number(ethers.utils.formatEther(String(result[10][0].result))) - (Number(ethers.utils.formatEther(String(result[10][1].result))) + Number(ethers.utils.formatEther(String(result[10][2].result))) + Number(ethers.utils.formatEther(String(result[10][3].result)))))
            setJaspSupply(ethers.utils.formatUnits(String(result[11][0].result), "gwei"))
            setJaspBurn(Number(ethers.utils.formatUnits(String(result[11][1].result), "gwei")) + Number(ethers.utils.formatUnits(String(result[11][2].result), "gwei")))
            setJaspCirculation(Number(ethers.utils.formatUnits(String(result[11][0].result), "gwei")) - (Number(ethers.utils.formatUnits(String(result[11][1].result), "gwei")) + Number(ethers.utils.formatUnits(String(result[11][2].result), "gwei"))))
            setOsSupply(ethers.utils.formatEther(String(result[12][0].result)))
            setOsLocked(ethers.utils.formatEther(String(result[12][4].result)))
            setOsBurn(Number(ethers.utils.formatEther(String(result[12][1].result))) + Number(ethers.utils.formatEther(String(result[12][2].result))) + Number(ethers.utils.formatEther(String(result[12][3].result))))
            setOsCirculation(Number(ethers.utils.formatEther(String(result[12][0].result))) - (Number(ethers.utils.formatEther(String(result[12][1].result))) + Number(ethers.utils.formatEther(String(result[12][2].result))) + Number(ethers.utils.formatEther(String(result[12][3].result))) + Number(ethers.utils.formatEther(String(result[12][4].result)))))
            setCmdBbq(ethers.utils.formatEther(String(result[13][1].result)))
            setCmdGov(ethers.utils.formatEther(String(result[13][2].result)))
            setCmdRev((Number(result[14]) - 10) * 0.60)
            setUsdtRev(Number(result[13][4].result) / 1e6)
            setEthRev((Number(result[15])) * 0.60)
            setCmdCirculation(100000000 - Number(ethers.utils.formatEther(String(result[13][5].result))) - Number(ethers.utils.formatEther(String(result[13][0].result))))
            setCmdBurn(ethers.utils.formatEther(String(result[13][5].result)))
            setWoodStat(result[16])
            setJdaoStat(result[17])
            setOsStat(result[18])
            setBbqStat(result[19])
            setPzaStat(result[20])
            setCtunaStat(result[21])
            setSx31Stat(result[22])
            setCuStat(result[23])
            setSilStat(result[24])
            setGoldStat(result[25])
            setPlatStat(result[26])
            setJaspStat(result[27])
            setPlutoStat(result[28])
            setPlutoSupply(ethers.utils.formatUnits(String(result[29][0].result), "gwei"))
            setPlutoBurn(Number(ethers.utils.formatUnits(String(result[29][1].result), "gwei")) + Number(ethers.utils.formatUnits(String(result[29][2].result), "gwei")))
            setPlutoCirculation(Number(ethers.utils.formatUnits(String(result[29][0].result), "gwei")) - (Number(ethers.utils.formatUnits(String(result[29][1].result), "gwei")) + Number(ethers.utils.formatUnits(String(result[29][2].result), "gwei"))))
            setFbtcStat(result[30])
            setFbtcSupply(String(result[31][0].result))
            setFbtcBurn(Number((result[31][1].result)) + Number(result[31][2].result))
            setFbtcCirculation(Number(result[31][0].result) - (Number(result[31][1].result) + Number(result[31][2].result)))
            setX4Stat(result[32])
            setX4Supply(ethers.utils.formatEther(String(result[33][0].result)))
            setX4Burn(Number(ethers.utils.formatEther(String(result[33][1].result))) + Number(ethers.utils.formatEther(String(result[33][2].result))))
            setX4Circulation(Number(ethers.utils.formatEther(String(result[33][0].result))) - (Number(ethers.utils.formatEther(String(result[33][1].result))) + Number(ethers.utils.formatEther(String(result[33][2].result)))))
            setInfpowStat(result[34])
            setInfpowSupply(ethers.utils.formatEther(String(result[35][0].result)))
            setInfpowBurn(Number(ethers.utils.formatEther(String(result[35][1].result))) + Number(ethers.utils.formatEther(String(result[35][2].result))))
            setInfpowCirculation(Number(ethers.utils.formatEther(String(result[35][0].result))) - (Number(ethers.utils.formatEther(String(result[35][1].result))) + Number(ethers.utils.formatEther(String(result[35][2].result)))))
        })
    }, [config, erc20Abi])

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner pixel">
                    <div style={{fontSize: "75px", width: "fit-content"}}>BigBro Analytica</div>
                </div>
                <div className="SubfieldBanner">
                </div>
            </div>

            <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "0", padding: "75px 0", minHeight: "fit-content", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "row wrap", overflow: "scroll"}} className="collection noscroll">
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreidm3tpt3xpcmypzeaqicyxvihmygzu5mw3v74o6b2wve6ar5pdbs4" height="25" alt="$CMD"/>
                        &nbsp;$CMD Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {cmdCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Max Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(100000000 - Number(cmdBurn)).toLocaleString('en-US', {maximumFractionDigits:2})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(cmdCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmdCirculation/1000000).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>On BBQ-chain:</div>
                                        <div style={{color: "#fff"}}>{Number(cmdBbq).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmdBbq/1000000).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>In CMDAO Gov (CMD-ETH LP):</div>
                                        <div style={{color: "#fff"}}>{Number(cmdGov).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmdGov/1000000).toFixed(2)}%)</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="25" alt="$CMJ" />
                        &nbsp;$CMJ Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {cmjCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Max Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(1000000).toLocaleString('en-US', {maximumFractionDigits:2})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Locked:</div>
                                        <div style={{color: "#fff"}}>{Number(cmjLocked).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmjLocked/10000).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(cmjBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmjBurn/10000).toFixed(2)}%)</div>
                                    </div>                            
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(cmjCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmjCirculation/10000).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Leaderboard Reward:</div>
                                        <div style={{color: "#fff"}}>{Number(cmjReward).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(cmjReward/10000).toFixed(2)}%)</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" width="25" alt="$JDAO" />
                        &nbsp;$JDAO Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {jdaoCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(jdaoSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(jdaoBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((jdaoBurn/jdaoSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(jdaoCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((jdaoCirculation/jdaoSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(jdaoStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(jdaoStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(jdaoStat[0] - jdaoStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((jdaoStat[0] - jdaoStat[1])/jdaoSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((jdaoStat[0] - jdaoStat[1]) * 365)/jdaoCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" width="25" alt="$OS" />
                        &nbsp;$OS Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {osCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(osSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(osBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((osBurn/osSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Reward Locked:</div>
                                        <div style={{color: "#fff"}}>{Number(osLocked).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((osLocked/osSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(osCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((osCirculation/osSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(osStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(osStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(osStat[0] - osStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((osStat[0] - osStat[1])/osCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((osStat[0] - osStat[1]) * 365)/osCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }    
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" width="25" alt="$WOOD" />
                        &nbsp;$WOOD Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {woodCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(woodSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(woodBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((woodBurn/woodSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(woodCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((woodCirculation/woodSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(woodStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(woodStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(woodStat[0] - woodStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((woodStat[0] - woodStat[1])/woodCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((woodStat[0] - woodStat[1]) * 365)/woodCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" width="25" alt="$BBQ" />
                        &nbsp;$BBQ Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {bbqCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(bbqSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(bbqBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((bbqBurn/bbqSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(bbqCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((bbqCirculation/bbqSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(bbqStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(bbqStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(bbqStat[0] - bbqStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((bbqStat[0] - bbqStat[1])/bbqCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((bbqStat[0] - bbqStat[1]) * 365)/bbqCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" width="25" alt="$PZA" />
                        &nbsp;$PZA Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {pzaCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(pzaSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(pzaBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((pzaBurn/pzaSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(pzaCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((pzaCirculation/pzaSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(pzaStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(pzaStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(pzaStat[0] - pzaStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((pzaStat[0] - pzaStat[1])/pzaCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((pzaStat[0] - pzaStat[1]) * 365)/pzaCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" width="25" alt="$CTUNA" />
                        &nbsp;$CTUNA Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {ctunaCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(ctunaSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(ctunaBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((ctunaBurn/ctunaSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(ctunaCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((ctunaCirculation/ctunaSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(ctunaStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(ctunaStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(ctunaStat[0] - ctunaStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((ctunaStat[0] - ctunaStat[1])/ctunaCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((ctunaStat[0] - ctunaStat[1]) * 365)/ctunaCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" width="25" alt="$SX31" />
                        &nbsp;$SX31 Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {sx31Circulation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(sx31Supply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(sx31Burn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((sx31Burn/sx31Supply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(sx31Circulation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((sx31Circulation/sx31Supply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(sx31Stat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(sx31Stat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(sx31Stat[0] - sx31Stat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((sx31Stat[0] - sx31Stat[1])/sx31Circulation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((sx31Stat[0] - sx31Stat[1]) * 365)/sx31Circulation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" width="25" alt="$CU" />
                        &nbsp;$CU Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {cuCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(cuSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(cuBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((cuBurn/cuSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(cuCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((cuCirculation/cuSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(cuStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(cuStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(cuStat[0] - cuStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((cuStat[0] - cuStat[1])/cuCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((cuStat[0] - cuStat[1]) * 365)/cuCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" width="25" alt="$SIL" />
                        &nbsp;$SIL Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {silCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(silSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(silBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((silBurn/silSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Reward Locked:</div>
                                        <div style={{color: "#fff"}}>{Number(silLocked).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((silLocked/silSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(silCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((silCirculation/silSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(silStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(silStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(silStat[0] - silStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((silStat[0] - silStat[1])/silCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((silStat[0] - silStat[1]) * 365)/silCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" width="25" alt="$GOLD" />
                        &nbsp;$GOLD Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {goldCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(goldSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(goldBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((goldBurn/goldSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(goldCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((goldCirculation/goldSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(goldStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(goldStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(goldStat[0] - goldStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((goldStat[0] - goldStat[1])/goldCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((goldStat[0] - goldStat[1]) * 365)/goldCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa" width="25" alt="$PLAT" />
                        &nbsp;$PLAT Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {platCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(platSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(platBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((platBurn/platSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Reward Locked:</div>
                                        <div style={{color: "#fff"}}>{Number(platLocked).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((platLocked/platSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(platCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((platCirculation/platSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(platStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(platStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(platStat[0] - platStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((platStat[0] - platStat[1])/platCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((platStat[0] - platStat[1]) * 365)/platCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" width="25" alt="$JASP" />
                        &nbsp;$JASP Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {jaspCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(jaspSupply).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(jaspBurn).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI ({Number((jaspBurn/jaspSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(jaspCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI ({Number((jaspCirculation/jaspSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(jaspStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(jaspStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(jaspStat[0] - jaspStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI ({Number(((jaspStat[0] - jaspStat[1])/jaspCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((jaspStat[0] - jaspStat[1]) * 365)/jaspCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/QmSd6B1WnUtzVqJPmEXqFSEudrdqCAE3LPkU64tttYeFPw" width="25" alt="$PLUTO" />
                        &nbsp;$PLUTO Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {plutoCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(plutoSupply).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(plutoBurn).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI ({Number((plutoBurn/plutoSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(plutoCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI ({Number((plutoCirculation/plutoSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(plutoStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(plutoStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(plutoStat[0] - plutoStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} GWEI ({Number(((plutoStat[0] - plutoStat[1])/plutoCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((plutoStat[0] - plutoStat[1]) * 365)/plutoCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/QmPieCpfHoce19DSB5Mv5GZmZeGHAUerJfgjX6NhgLYUVC" width="25" alt="$F.BTC" />
                        &nbsp;$F.BTC Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {fbtcCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(fbtcSupply).toLocaleString('en-US', {maximumFractionDigits:0})} SAT (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(fbtcBurn).toLocaleString('en-US', {maximumFractionDigits:0})} SAT ({Number((fbtcBurn/fbtcSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(fbtcCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} SAT ({Number((fbtcCirculation/fbtcSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(fbtcStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})} SAT</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(fbtcStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} SAT</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(fbtc[0] - fbtcStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} SAT ({Number(((fbtcStat[0] - fbtcStat[1])/fbtcCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((fbtcStat[0] - fbtcStat[1]) * 365)/fbtcCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/Qma5JyeNz8ME6H1XFxJCF4HmduDSC8mqLqmUs3SaMJbwzh" width="25" alt="$X4" />
                        &nbsp;$X4 Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {x4Circulation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(x4Supply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(x4Burn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((x4Burn/x4Supply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(x4Circulation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((x4Circulation/x4Supply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(x4Stat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(x4Stat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(x4Stat[0] - x4Stat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((x4Stat[0] - x4Stat[1])/x4Circulation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((x4Stat[0] - x4Stat[1]) * 365)/x4Circulation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", fontSize: "18px", display: "flex", alignItems: "center"}} className="bold">
                        <img src="https://gateway.commudao.xyz/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6" width="25" alt="$INF.POW" />
                        &nbsp;$INF.POW Tracker
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            {infpowCirculation !== null ?
                                <>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(infpowSupply).toLocaleString('en-US', {maximumFractionDigits:0})} (100%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Total Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(infpowBurn).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((infpowBurn/infpowSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px dotted"}}>
                                        <div>Circulating Supply:</div>
                                        <div style={{color: "#fff"}}>{Number(infpowCirculation).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number((infpowCirculation/infpowSupply)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Supply Growth:</div>
                                        <div style={{color: "#fff"}}>{Number(infpowStat[0]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Burn:</div>
                                        <div style={{color: "#fff"}}>{Number(infpowStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>1D Issurance:</div>
                                        <div style={{color: "#fff"}}>{Number(infpowStat[0] - infpowStat[1]).toLocaleString('en-US', {maximumFractionDigits:0})} ({Number(((infpowStat[0] - infpowStat[1])/infpowCirculation)*100).toFixed(2)}%)</div>
                                    </div>
                                    <div className="bold" style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                                        <div>Annual Inflation Rate:</div>
                                        <div style={{color: "#fff"}}>{Number((((infpowStat[0] - infpowStat[1]) * 365)/infpowCirculation)*100).toFixed(4)}%</div>
                                    </div>
                                </> :
                                <div style={{width: "100%", height: "100px", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <ThreeDots fill="#5f6476" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BigBroAnalytica