import React from 'react'
import { ethers } from 'ethers'
import { getBalance, readContracts } from '@wagmi/core'

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
const os = '0xAc5299D92373E9352636559cca497d7683A47655'
const jdao = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'

const cmd = '0x399fe73bb0ee60670430fd92fe25a0fdd308e142'
const usdtOP = '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58'

const genesis = '0x0000000000000000000000000000000000000000'
const burn = '0x0000000000000000000000000000000000000001'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const BigBroAnalytica = ({ config, erc20Abi }) => {
    const [cmdBbq, setCmdBbq] = React.useState(0)
    const [cmdGov, setCmdGov] = React.useState(0)
    const [cmdRev, setCmdRev] = React.useState(0)
    const [cmdBurn, setCmdBurn] = React.useState(0)
    const [usdtRev, setUsdtRev] = React.useState(0)
    const [ethRev, setEthRev] = React.useState(0)
    console.log(cmdRev, usdtRev, ethRev)
    const [cmdCirculation, setCmdCirculation] = React.useState(0)

    const [cmjLocked, setCmjLocked] = React.useState(0)
    const [cmjReward, setCmjReward] = React.useState(0)
    const [cmjBurn, setCmjBurn] = React.useState(0)
    const [cmjCirculation, setCmjCirculation] = React.useState(0)

    const [woodSupply, setWoodSupply] = React.useState(0)
    const [woodBurn, setWoodBurn] = React.useState(0)
    const [woodCirculation, setWoodCirculation] = React.useState(0)
    const [woodStat, setWoodStat] = React.useState([0, 0])

    const [bbqSupply, setBbqSupply] = React.useState(0)
    const [bbqBurn, setBbqBurn] = React.useState(0)
    const [bbqCirculation, setBbqCirculation] = React.useState(0)
    const [bbqStat, setBbqStat] = React.useState([0, 0])

    const [pzaSupply, setPzaSupply] = React.useState(0)
    const [pzaBurn, setPzaBurn] = React.useState(0)
    const [pzaCirculation, setPzaCirculation] = React.useState(0)
    const [pzaStat, setPzaStat] = React.useState([0, 0])

    const [ctunaSupply, setCtunaSupply] = React.useState(0)
    const [ctunaBurn, setCtunaBurn] = React.useState(0)
    const [ctunaCirculation, setCtunaCirculation] = React.useState(0)
    const [ctunaStat, setCtunaStat] = React.useState([0, 0])

    const [sx31Supply, setSx31Supply] = React.useState(0)
    const [sx31Burn, setSx31Burn] = React.useState(0)
    const [sx31Circulation, setSx31Circulation] = React.useState(0)
    const [sx31Stat, setSx31Stat] = React.useState([0, 0])

    const [cuSupply, setCuSupply] = React.useState(0)
    const [cuBurn, setCuBurn] = React.useState(0)
    const [cuCirculation, setCuCirculation] = React.useState(0)
    const [cuStat, setCuStat] = React.useState([0, 0])

    const [silSupply, setSilSupply] = React.useState(0)
    const [silLocked, setSilLocked] = React.useState(0)
    const [silBurn, setSilBurn] = React.useState(0)
    const [silCirculation, setSilCirculation] = React.useState(0)
    const [silStat, setSilStat] = React.useState([0, 0])

    const [goldSupply, setGoldSupply] = React.useState(0)
    const [goldBurn, setGoldBurn] = React.useState(0)
    const [goldCirculation, setGoldCirculation] = React.useState(0)
    const [goldStat, setGoldStat] = React.useState([0, 0])

    const [platSupply, setPlatSupply] = React.useState(0)
    const [platLocked, setPlatLocked] = React.useState(0)
    const [platBurn, setPlatBurn] = React.useState(0)
    const [platCirculation, setPlatCirculation] = React.useState(0)
    const [platStat, setPlatStat] = React.useState([0, 0])

    const [jaspSupply, setJaspSupply] = React.useState(0)
    const [jaspBurn, setJaspBurn] = React.useState(0)
    const [jaspCirculation, setJaspCirculation] = React.useState(0)
    const [jaspStat, setJaspStat] = React.useState([0, 0])

    const [plutoSupply, setPlutoSupply] = React.useState(0)
    const [plutoBurn, setPlutoBurn] = React.useState(0)
    const [plutoCirculation, setPlutoCirculation] = React.useState(0)
    const [plutoStat, setPlutoStat] = React.useState([0, 0])

    const [osSupply, setOsSupply] = React.useState(0)
    const [osLocked, setOsLocked] = React.useState(0)
    const [osBurn, setOsBurn] = React.useState(0)
    const [osCirculation, setOsCirculation] = React.useState(0)
    const [osStat, setOsStat] = React.useState([0, 0])

    const [jdaoSupply, setJdaoSupply] = React.useState(0)
    const [jdaoBurn, setJdaoBurn] = React.useState(0)
    const [jdaoCirculation, setJdaoCirculation] = React.useState(0)
    const [jdaoStat, setJdaoStat] = React.useState([0, 0])

    React.useEffect(() => {  
        window.scrollTo(0, 0)
        const woodSC = new ethers.Contract(wood, erc20Abi, providerJBC)
        const bbqSC = new ethers.Contract(bbq, erc20Abi, providerJBC)
        const pzaSC = new ethers.Contract(pza, erc20Abi, providerJBC)
        const ctunaSC = new ethers.Contract(ctuna, erc20Abi, providerJBC)
        const sx31SC = new ethers.Contract(sx31, erc20Abi, providerJBC)
        const cuSC = new ethers.Contract(cu, erc20Abi, providerJBC)
        const silSC = new ethers.Contract(sil, erc20Abi, providerJBC)
        const goldSC = new ethers.Contract(gold, erc20Abi, providerJBC)
        const platSC = new ethers.Contract(plat, erc20Abi, providerJBC)
        const jaspSC = new ethers.Contract(jasp, erc20Abi, providerJBC)
        const plutoSC = new ethers.Contract(pluto, erc20Abi, providerJBC)
        const osSC = new ethers.Contract(os, erc20Abi, providerJBC)
        const jdaoSC = new ethers.Contract(jdao, erc20Abi, providerJBC)
              
        const thefetch = async () => {
            const blockNumber = await providerJBC.getBlockNumber()

            const woodFilter = await woodSC.filters.Transfer(genesis, null, null)
            const woodEvent = await woodSC.queryFilter(woodFilter, blockNumber - 7200, 'latest')
            const woodMap = await Promise.all(woodEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const woodMint = woodMap.reduce((partialSum, a) => partialSum + a, 0)

            const woodFilter2 = await woodSC.filters.Transfer(null, burn, null)
            const woodEvent2 = await woodSC.queryFilter(woodFilter2, blockNumber - 7200, 'latest')
            const woodMap2 = await Promise.all(woodEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const woodBurn = woodMap2.reduce((partialSum, a) => partialSum + a, 0)

            const jdaoFilter = await jdaoSC.filters.Transfer(genesis, null, null)
            const jdaoEvent = await jdaoSC.queryFilter(jdaoFilter, blockNumber - 7200, 'latest')
            const jdaoMap = await Promise.all(jdaoEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const jdaoMint = jdaoMap.reduce((partialSum, a) => partialSum + a, 0)

            const jdaoFilter2 = await jdaoSC.filters.Transfer(null, burn, null)
            const jdaoEvent2 = await jdaoSC.queryFilter(jdaoFilter2, blockNumber - 7200, 'latest')
            const jdaoMap2 = await Promise.all(jdaoEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const jdaoBurn = jdaoMap2.reduce((partialSum, a) => partialSum + a, 0)

            const osFilter = await osSC.filters.Transfer(genesis, null, null)
            const osEvent = await osSC.queryFilter(osFilter, blockNumber - 7200, 'latest')
            const osMap = await Promise.all(osEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const osMint = osMap.reduce((partialSum, a) => partialSum + a, 0)

            const osFilter2 = await osSC.filters.Transfer(null, burn, null)
            const osEvent2 = await osSC.queryFilter(osFilter2, blockNumber - 7200, 'latest')
            const osMap2 = await Promise.all(osEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const osBurn = osMap2.reduce((partialSum, a) => partialSum + a, 0)

            const bbqFilter = await bbqSC.filters.Transfer(genesis, null, null)
            const bbqEvent = await bbqSC.queryFilter(bbqFilter, blockNumber - 7200, 'latest')
            const bbqMap = await Promise.all(bbqEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const bbqMint = bbqMap.reduce((partialSum, a) => partialSum + a, 0)

            const bbqFilter2 = await bbqSC.filters.Transfer(null, burn, null)
            const bbqEvent2 = await bbqSC.queryFilter(bbqFilter2, blockNumber - 7200, 'latest')
            const bbqMap2 = await Promise.all(bbqEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const bbqFilter3 = await bbqSC.filters.Transfer(null, cu, null)
            const bbqEvent3 = await bbqSC.queryFilter(bbqFilter3, blockNumber - 7200, 'latest')
            const bbqMap3 = await Promise.all(bbqEvent3.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const bbqBurn = bbqMap2.concat(bbqMap3).reduce((partialSum, a) => partialSum + a, 0)

            const pzaFilter = await pzaSC.filters.Transfer(genesis, null, null)
            const pzaEvent = await pzaSC.queryFilter(pzaFilter, blockNumber - 7200, 'latest')
            const pzaMap = await Promise.all(pzaEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const pzaMint = pzaMap.reduce((partialSum, a) => partialSum + a, 0)

            const pzaFilter2 = await pzaSC.filters.Transfer(null, jasp, null)
            const pzaEvent2 = await pzaSC.queryFilter(pzaFilter2, blockNumber - 7200, 'latest')
            const pzaMap2 = await Promise.all(pzaEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const pzaBurn = pzaMap2.reduce((partialSum, a) => partialSum + a, 0)

            const ctunaFilter = await ctunaSC.filters.Transfer(genesis, null, null)
            const ctunaEvent = await ctunaSC.queryFilter(ctunaFilter, blockNumber - 7200, 'latest')
            const ctunaMap = await Promise.all(ctunaEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const ctunaMint = ctunaMap.reduce((partialSum, a) => partialSum + a, 0)

            const ctunaFilter2 = await ctunaSC.filters.Transfer(null, burn, null)
            const ctunaEvent2 = await ctunaSC.queryFilter(ctunaFilter2, blockNumber - 7200, 'latest')
            const ctunaMap2 = await Promise.all(ctunaEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const ctunaBurn = ctunaMap2.reduce((partialSum, a) => partialSum + a, 0)

            const sx31Filter = await sx31SC.filters.Transfer(genesis, null, null)
            const sx31Event = await sx31SC.queryFilter(sx31Filter, blockNumber - 7200, 'latest')
            const sx31Map = await Promise.all(sx31Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const sx31Mint = sx31Map.reduce((partialSum, a) => partialSum + a, 0)

            const sx31Filter2 = await sx31SC.filters.Transfer(null, burn, null)
            const sx31Event2 = await sx31SC.queryFilter(sx31Filter2, blockNumber - 7200, 'latest')
            const sx31Map2 = await Promise.all(sx31Event2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const sx31Burn = sx31Map2.reduce((partialSum, a) => partialSum + a, 0)

            const cuFilter = await cuSC.filters.Transfer(genesis, null, null)
            const cuEvent = await cuSC.queryFilter(cuFilter, blockNumber - 7200, 'latest')
            const cuMap = await Promise.all(cuEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const cuMint = cuMap.reduce((partialSum, a) => partialSum + a, 0)

            const cuFilter2 = await cuSC.filters.Transfer(null, burn, null)
            const cuEvent2 = await cuSC.queryFilter(cuFilter2, blockNumber - 7200, 'latest')
            const cuMap2 = await Promise.all(cuEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const cuBurn = cuMap2.reduce((partialSum, a) => partialSum + a, 0)

            const silFilter = await silSC.filters.Transfer(genesis, null, null)
            const silEvent = await silSC.queryFilter(silFilter, blockNumber - 7200, 'latest')
            const silMap = await Promise.all(silEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const silMint = silMap.reduce((partialSum, a) => partialSum + a, 0)

            const silFilter2 = await silSC.filters.Transfer(null, burn, null)
            const silEvent2 = await silSC.queryFilter(silFilter2, blockNumber - 7200, 'latest')
            const silMap2 = await Promise.all(silEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const silBurn = silMap2.reduce((partialSum, a) => partialSum + a, 0)

            const goldFilter = await goldSC.filters.Transfer(genesis, null, null)
            const goldEvent = await goldSC.queryFilter(goldFilter, blockNumber - 7200, 'latest')
            const goldMap = await Promise.all(goldEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const goldMint = goldMap.reduce((partialSum, a) => partialSum + a, 0)

            const goldFilter2 = await goldSC.filters.Transfer(null, burn, null)
            const goldEvent2 = await goldSC.queryFilter(goldFilter2, blockNumber - 7200, 'latest')
            const goldMap2 = await Promise.all(goldEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const goldBurn = goldMap2.reduce((partialSum, a) => partialSum + a, 0)

            const platFilter = await platSC.filters.Transfer(genesis, null, null)
            const platEvent = await platSC.queryFilter(platFilter, blockNumber - 7200, 'latest')
            const platMap = await Promise.all(platEvent.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const platMint = platMap.reduce((partialSum, a) => partialSum + a, 0)

            const platFilter2 = await platSC.filters.Transfer(null, burn, null)
            const platEvent2 = await platSC.queryFilter(platFilter2, blockNumber - 7200, 'latest')
            const platMap2 = await Promise.all(platEvent2.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))}))
            const platBurn = platMap2.reduce((partialSum, a) => partialSum + a, 0)

            const jaspFilter = await jaspSC.filters.Transfer(genesis, null, null)
            const jaspEvent = await jaspSC.queryFilter(jaspFilter, blockNumber - 7200, 'latest')
            const jaspMap = await Promise.all(jaspEvent.map(async (obj) => {return Number(ethers.utils.formatUnits(obj.args.value, 'gwei'))}))
            const jaspMint = jaspMap.reduce((partialSum, a) => partialSum + a, 0)

            const jaspFilter2 = await jaspSC.filters.Transfer(null, burn, null)
            const jaspEvent2 = await jaspSC.queryFilter(jaspFilter2, blockNumber - 7200, 'latest')
            const jaspMap2 = await Promise.all(jaspEvent2.map(async (obj) => {return Number(ethers.utils.formatUnits(obj.args.value, 'gwei'))}))
            const jaspBurn = jaspMap2.reduce((partialSum, a) => partialSum + a, 0)

            const plutoFilter = await plutoSC.filters.Transfer(genesis, null, null)
            const plutoEvent = await plutoSC.queryFilter(plutoFilter, blockNumber - 7200, 'latest')
            const plutoMap = await Promise.all(plutoEvent.map(async (obj) => {return Number(ethers.utils.formatUnits(obj.args.value, 'gwei'))}))
            const plutoMint = plutoMap.reduce((partialSum, a) => partialSum + a, 0)

            const plutoFilter2 = await plutoSC.filters.Transfer(null, burn, null)
            const plutoEvent2 = await plutoSC.queryFilter(plutoFilter2, blockNumber - 7200, 'latest')
            const plutoMap2 = await Promise.all(plutoEvent2.map(async (obj) => {return Number(ethers.utils.formatUnits(obj.args.value, 'gwei'))}))
            const plutoBurn = plutoMap2.reduce((partialSum, a) => partialSum + a, 0)

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
                [plutoMint, plutoBurn], dataPLUTO,
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
        })
    }, [config, erc20Abi])

    return (
        <>
            <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}} className="pixel">
                    <div style={{fontSize: "75px", width: "fit-content"}}>BigBro Analytica</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}></div>
                </div>
                <div style={{margin: "30px 100px"}}>
                </div>
            </div>

            <div style={{background: "rgb(0, 19, 33", width: "100%", margin: "0", padding: "75px 0", minHeight: "fit-content", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "row wrap", overflow: "scroll"}} className="collection noscroll">
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$CMD Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>
                
                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$CMJ Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$JDAO Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$OS Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$WOOD Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$BBQ Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$PZA Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$CTUNA Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$SX31 Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$CU Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$SIL Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$GOLD Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$PLAT Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$JASP Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>

                <div style={{background: "rgb(0, 26, 44)", padding: "25px 50px", margin: "15px", border: "1px solid rgb(54, 77, 94)", width: "400px", height: "300px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                    <div style={{width: "100%", paddingBottom: "20px", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "18px"}} className="bold">$PLUTO Tracker</div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "14px"}}>
                        <div style={{width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BigBroAnalytica