import React from 'react'
import { ethers } from 'ethers'
import { createPublicClient, http } from 'viem'
import { jbc } from 'viem/chains' 
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react';
import { Oval } from 'react-loading-icons'

const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const jaspToken = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const quest01 = '0x3eB35884e8811188CCe3653fc67A3876d810E582'
const questPlat01 = '0xd5EAb9A65b977a576c9a40a56c6C1dFFB750bF6b'
const kyc = '0xfB046CF7dBA4519e997f1eF3e634224a9BFf5A2E'
const jusdtToken = '0x24599b658b57f91E7643f4F154B16bcd2884f9ac'
const pvp01 = '0x11af8eD1783Be1a0Eb6Da5C3Bc11Fb5Cc29C9463'
const questAmbass = '0x467eF538C90434D4F69cF8A8F40cd71a96e8424e'
const questBBQ = '0x26504b691f702a2CB4D5Df89243eB5fccf76B982'
const bbqLab = '0x9D73C97edC9489935B2dF250a097917d4860C60e'
const ender = '0x44C846780E6c36bA26a33D121F9069AF967937e4'
const farmJdao = "0x6B25033c2B4F5594809cBEf9F625771a2574C1a6"
const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'
const dunMo = '0xD30F5d6ABc3dBd9Df01eC0FE891114914Ee1360A'
const cmdaoNft = '0x20724DC1D37E67B7B69B52300fDbA85E558d8F9A'
const slot1 = '0x171b341FD1B8a2aDc1299f34961e19B552238cb5'
const houseStaking = '0xc4dB6374EeCa3743F8044ae995892827B62b14fe'
const weaponDepotStaking = '0xeC661f744637778029C1EC61c39976d75Fb080b6'
const publicClient = createPublicClient({ chain: jbc, transport: http() })
const startblockmonth = 5393724n

const QuesterOasis = ({ config, setisLoading, callMode, navigate, txupdate, setTxupdate, setisError, setErrMsg, erc20Abi, kycABI, quest01ABI, pvp01ABI, questBBQABI, questAmbassABI, bbqLab01ABI, enderPotteryABI, dunCopperABI, dunJasperABI, dunMoABI, cmdaoNameABI, houseStakingABI, slot1ABI, erc721Abi, constructionStakingABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    /*const [canClaimSIL, setCanClaimSIL] = React.useState(null)
    const [rewardSIL, setRewardSIL] = React.useState(0)
    const [canClaimPLAT, setCanClaimPLAT] = React.useState(null)*/
    const [isKYC, setIsKYC] = React.useState(null)
    const [ambass, setAmbass] = React.useState("")
    const [frens, setFrens] = React.useState(0)
    const [isJoin, setIsJoin] = React.useState(null)
    const [canClaimBBQ, setCanClaimBBQ] = React.useState(null)
    const [nextClaimBBQ, setNextClaimBBQ] = React.useState(null)
    const [gmStreak, setGmStreak] = React.useState(0)
    const [rank, setRank] = React.useState([])
    const [rank2, setRank2] = React.useState([])
    const [rank3, setRank3] = React.useState([])
    const [rank4, setRank4] = React.useState([])
    const [sumArrRank1, setSumArrRank1] = React.useState(0)
    const [sumArrRank2, setSumArrRank2] = React.useState(0)
    const [sumArrRank3, setSumArrRank3] = React.useState(0)
    const [sumArrRank4, setSumArrRank4] = React.useState(0)

    React.useEffect(() => {      
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        
        const thefetch = async () => {
            const jdaofarmfilter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88', eventName: 'Transfer', args: { from: farmJdao }, fromBlock: startblockmonth, toBlock: "latest" })
            const jdaofarmlog = publicClient.getFilterLogs({ filter: jdaofarmfilter })
            const enderfilter = await publicClient.createContractEventFilter({ abi: enderPotteryABI, address: ender, eventName: 'Participants', fromBlock: startblockmonth, toBlock: "latest" })
            const enderlog = publicClient.getFilterLogs({ filter: enderfilter })
            const stakefilter = await publicClient.createContractEventFilter({ abi: erc721Abi, address: cmdaoNft, eventName: 'Transfer', args: { to: houseStaking }, fromBlock: 3700385n, toBlock: "latest" })
            const stakelog = publicClient.getFilterLogs({ filter: stakefilter })
            const stakewdfilter = await publicClient.createContractEventFilter({ abi: erc721Abi, address: cmdaoNft, eventName: 'Transfer', args: { to: weaponDepotStaking }, fromBlock: 3660870n, toBlock: "latest" })
            const stakewdlog = publicClient.getFilterLogs({ filter: stakewdfilter })

            const jdaofarmdata = await jdaofarmlog
            const jdaofarmMap = await Promise.all(jdaofarmdata.map(async (obj) => {return {to: String(obj.args.to), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const jdaoFarmAllMerged = jdaofarmMap.reduce((prev, curr) => {
                if (prev[curr.to.toUpperCase()]) {
                    prev[curr.to.toUpperCase()].value += curr.value
                } else {
                    prev[curr.to.toUpperCase()] = curr
                }
                return prev
            }, {})
            const enderdata = await enderlog
            const enderMap = await Promise.all(enderdata.map(async (obj) => {return {from: String(obj.args.participant), value: 1}}))
            const enderAllMerged = enderMap.reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                    prev[curr.from.toUpperCase()].value += curr.value
                } else {
                    prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})
            const stakedata = await stakelog 
            const stakeMap = await Promise.all(stakedata.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDup = stakeMap.filter((obj, index) => stakeMap.indexOf(obj) === index)
            const stakewddata = await stakewdlog 
            const stakeMapWD = await Promise.all(stakewddata.map(async (obj) => String(obj.args.tokenId)))
            const stakeRemoveDupWD = stakeMapWD.filter((obj, index) => stakeMapWD.indexOf(obj) === index)

            const data2_0 = await readContract(config, {
                address: questAmbass,
                abi: questAmbassABI,
                functionName: 'registCount',
                chainId: 8899,
            })
            const rankerDummy = []
            for (let i = 1; i <= Number(data2_0); i++) {
                rankerDummy.push(null)
            }
            const data2_00 = await readContracts(config, {
                contracts: rankerDummy.map((item, i) => (
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'referalData',
                        args: [i+1],
                        chainId: 8899,
                    }
                ))
            })
            const _ambassArr = []
            for (let i = 0; i <= Number(data2_00.length - 1); i++) {
                _ambassArr.push(data2_00[i].result[0])
            }
            const _ambass2Arr = []
            for (let i = 0; i <= Number(data2_00.length - 1); i++) {
                _ambass2Arr.push(data2_00[i].result[1])
            }
            const ambass2Arr = []
            const dekyc = ['0xee95ab10EEa1ec932a8541E478d5a63F12e82457', '0x500Fca064b8Eed97d0b2581904f3264408438423', '0xfCe0959Ddcc52210c2ade9bae64b8DD0a09770C3', '0x6562e421dAA15d48AD1072B7a15611E2B3E34238', '0x56E1aF963606983C74E41267e71cD19e7c86ae3E', '0x79B949415bADf6c050cf4e3c56114619C28a9Df2', '0x7ec9932e7De1Ca2dC93A4EdF382ddF2e5D50a1E3', '0x5f3760471fed0E232a86B2026b3236B1EeC2B697', '0x2089dc77c29fDa025622d7281e8F36c0b0b43ee6', '0xB462F623cC1F4b28cdFCA706FdF7402d185b8181', '0x553D1D355A6Aa0Eb64cd5F2F06D0cD733CD95e1d', '0xB073ce42FF2BF382774171f6d9Ca4718564c62A9', '0xED64Cc3083236AE043ed5be4B6673a5226EF78Bf', '0x0DE460035Fa8db0eFb01ad3eC442c2d901B8984C', '0x124AE673A82450489C122d8cBD408acfd23eddB2', '0x1C3Bd4A2E0cAEf1FB502cb3425c33D4A8A6Fd16F', '0x5d7111D9d7B4f82EFA8b0f01bb78d1c43855d3Db', '0x7EB3Bb6e039ebD8DF4801c93e44DA8A7a0BA180d', '0x6dDAd73CF2132981EdEcf9eDB2f4d6b74c081e31', '0xC07a9d01d2ffF30118343b4C7851212d7057a2bE', '0x9B4FBC71543d2320E1C111fcc62823A4Abeb7435', '0xb7872272Af0472A204FE7Fc263912580afdf7f44', '0x923D403a323cCF1b818017478d8ECa7163ab70E4', '0xBEE42C26397496e95eFcfeb5Bbc61f390F392f09', '0x6420295933eF61CA185a836C7C83eAd68c9345E2', '0x6b20125175Fbadb1d09CBc55Fb5604bcA1d159C3', '0xB601bBfaE6A33fb9af6Cd1A4d6642F1CAbb51aCe', '0xced763248D42c453bDdEb3C0480F1D487b600665', '0x803a1d956A526067afaAd0EDCb9f82D864FE7b0e', '0x267234Ce76034D7F707E9b4A67112F03FbE33fBB', '0x759BB243e5e8EA9beD084bC713cF93237182e4D1', '0x801033605EE87DF6ceb88f73c18687520d3c1528', '0xf7db393fBCb87857e81B5CA34cF5F81F27ffaF1d', '0x76F7285973756fAcFe111e06d3C0646988AAd0a4', '0x4E3f662fE793eEB956ebB515E690fF3ca8b859f7', '0xED4ba5a3C6fD95678ae91524Ba310a50840E81b5', '0xcDF72B378B17c3D40D3C3750b21AC613AD9899fd', '0x1005244a4794b2c9911d6fA65678b670d6bc141b', '0xb30904B1eBe5FCE3816fEA8d94E919C0854A7286', '0xd60Cae6AeA8a74CC3eF7505B24a40cE94233d977', '0xA71CF5B79a5aa95e923c2fD8aE62D08d2BCbA39A', '0x1253A3D7fFbedb4D408CF26Ac567f6090f5cdb41', '0x21bBFf900D09d8e3110fFB1A8504662a97cC3763', '0x729370Cb6B64d5d27Ba73Dc52a884c5CBf896f8f', '0xf65f98794798fDB65BD65aB67485Fc9bca4F1fa1', '0x32c47F2989Aa97977540Be786601466C18794820', '0xdA29b8b038F55BE6Fa6Fe670Fa897147b9a48Fa6', '0xf347471df7B7C14608f7b27Caf2E5cf83162d3eD', '0x4C4BC3a884171b208Fe80A105D3Be90D5B4a9688', '0xB367AD17c133e9D80F9B1bD72efB8C2aeA53DF12', '0x3a0d50FdF839275Ec66d336edb1fD666DF538eA0', '0x89B37eB684D8e475aA9246a46387bc2e67790D26', '0x5A4170baD389E8cC44c454F4495EFA1e5C2F14eC', '0xc0f8c2b6D8af5FA2204469A00EAa4F4b8b93aE8b', '0x440A35c9c33038c645c80E2D1Dc69a4Bb428aBaD', '0xc8B812318E2E390539727da2B308218da6330689', '0xc6a0ef7843Cac4ae37C1770A575ce7D4f5990017', '0xBf39FAB586A0A4cdD175cFe96b32fAdD8d8478Bf', '0x0e3b6bBf54F6ED5a3922f765443AE22767FFa570', '0x0AF7ECab093507568da3e372bCe683B7b1f41f64', '0xF6f6A67fF04a763e1C431e830ab37428c5648572', '0x5c77bc7e658af87F920D12975d9EEC9cf9F00100', '0x93F18e78df8c2c96CBF114EDf082Bb41Ca1D6233', '0x1854E30786ceb0964E46A82383cb170f4474E1e9', '0xFc11279dfDa70F180614588789aa553573FB59A5', '0xfC14D4866b642153c7a28Afdaf313419682f902F', '0x4d15f333F2E2029B0f4611e9e205aF0411489eAe', '0xAbCBa9ba55a0701f9E5211604DC6723e585d0e03', '0x325c6dfacb3f146EF82FAF89AC5A4e7B1Ea5baFB', '0xd80Eb72cC2e3C6Ce5037a06dFd0637c2D4feE013', '0x057a35f02F77a8DEDfe8313771164381242DEa3A', '0x36E31B975363ACe0e9E07Fe1d4bd9974B6d6ede2', '0xd68d77f16c61cD1712aD884DFCd3cd13bAAFcFC3', '0xbcB4be032f6Ba5d9Aa051817D29e172972462EC8', '0x14E00591A18f317FCB3310579c33231F6Af5b09D', '0x4482E983863159c4d8d7eecBdecB62dCEd4e2A4D', '0xF49CA788432C07DBc223505Cc23550a74feb8c37', '0x5359aBbBA2f73078Bb15eF6f73362f00accB7a4F', '0x30f564A4960FE3F191f4c9821314c6bD515b6656', '0xD32B045E805D224578E4f6D2f2a4A65739598b05', '0x8C279902D7cFD3c822ee7413C75A27b7159C3598', '0xDDf6FA0dE3D5f5b1C413fc82A762d559D8e713D3', '0x43f591061e0c77f6cc4B2f6539c4e8A1f9aFFaa9', '0x8Db409ca4D11aE7855e73f4f0E48EdF37E957183', '0x7B1dc39AfB909964Cea5D6652d0468625CCA781F', '0xdC221e1acAB5cFdFFeE5B34b9024f9F03147e20d', '0xdcEA2FD2fc80559DC5D2DcB1C66e437591e5b9A6', '0x98dB84A93cf9E69eA09806777386f07d70CD069a', '0xDDe8436124F63992B384dDdf4f98888a12022786', '0x1CA3089936E69dcA47d5814f8073D4935369444F', '0x17A61477977FD1dAd570BF164924Cab27f4f70DC', '0x09438B9cd1E4CfD3E207b5Bc0adF649711b3bbaE', '0x7568D7E7598adA3BE09241e5DCBcaf5835047436', '0x9af7C542A5cdd53CB9A632D5579551Ce70A093e4', '0x647CF1233d1a3974715946Ec39bb1DD74B0Dc260', '0xecC07c826437eCdc940963f636Ca8319D3a59296', '0xEA4C844d2769dFd1F5D5906BDac6Aaa343127F1D', '0x4ED36b0EACB6E48FB78b89b035d6f83C60Cce366', '0x96eD5193A3563FeA53b690B0f157FB3e761203Dd', '0x8aA0ABF59c013297A03cFc2d94364Eae9747C977', '0xF7898BA2a40c6e07d0e931bB385f2071ffD7084A', '0x7aa6402e57916a1Eaff3D424538D189789254B23', '0x668bd67c282C88eCba09c16b5201c83E6F6C6384', '0xC6dA021547A9f81fb1189657f5F3c1557FEc3550', '0xd781CE26451E85C4C4F39BB65136334C7Ed176E4', '0x106184b6f2E6BBfA8d20a9cCFFa13444c638a1d4', '0xfC35Bf976ccfdccFbaa4F8E4e3d64E74cB66D083', '0xCF2b1538D3Bee72aA27900DB00e614e08944d2ab', '0xe1D7f39558A2b96E50ECd69436DB8A7dA8b48830', '0x57Cc121074c19E6fbF0259d625a4E7a18443E21B', '0x496b30Bc28DaF49d156562790db98340e0da8eB8', '0x34aE4283541aB7491f0992cEA0F7F42839257850', '0x8cEC4Da5857b6FD1eEdd805A7399f5c4210021C9', '0xB45329c18566A5f6443278FeA04B0FF8a01f12a1', '0x03b7532dc393d1aF619B498B64B2C8Cb790B874E', '0xDCC9025AFC70c72026d50F0D6F27CcCE31C8dbcf', '0xA11bb45f8A406698A209E6c48AfA7720E970366F', '0xdB943eC07B2F49469cC8121BB5b268eA5D62887B', '0x22a45031870028df27253655D1dA9e9688fF6890', '0xb2eC09e7B04E63C8544d100b365CD924B6E36f2c', '0x0B5F72057f3D5e9d89c11C8bF9791fCdD4eAb14E', '0x2742b7062e9a3b63F16b6736A9B64b668B2bed39', '0xdC7C483c42a9ba50350C9f7b116808ac474Bb146', '0xfF22F618f2aFc6C353E949fCDE473a694e188bc8', '0xE438208D4B40414374BC1F7430c54e41680D56A5', '0x206c4C84c3c625Ed1d055fFe66f4bCeb012B0AdB', '0xEE16583d9d73f6584Aa677D037797C0078486Ae2', '0x50A69432b87aE3Ad1e3d413EDd1775F9F6Df3384', '0x0127C0c2AB5Af1100Ac6D4ac3C51972039cc010F', '0xf47090681CD5FAD47f6257D2a7565c4Db2BDF75E', '0x67cB6d54187E6496632dd501E3FdDb388329F4Ef', '0xf0C7C69d6F1c388cc507eE045c09f8F80b7B5CCb', '0x0dEf5e4A392e9eE0C81506c29A290607c146CA20', '0x64115AcA8c0223C0F8dB9E66e6470016A5481Db6', '0xdD47d3e65F6d7a5098474Ad3Aaab06CB441C3A3E', '0xD0157eF87E81fD44ceFa1F4874a244E42097D3a2', '0x087720BA0729dECF5AcB2B73cC77F403657A29ed', '0x0404533532636F6B142715b601edFbC9122ed91C', '0xbaa641685B87d3F79e3E267ac50743581aF15B42', '0x34b6940bfEf39B834A0715354b2032B9958e90aD', '0x62e76F5aEDA165776f17e466f7b20250b4db344D', '0xba91D40585B3714C74D0C48FcabEe59Cd1b26C8B', '0x075356b8DF870dBc05e1A848b934C6B27D47f7f8', '0x7CA2d9c2926204ac685665DD4d6FAB58DfF1ce89', '0x3379Ec9C2636376F07fF7CF8BF741EcA2A4B8913', '0x2E0AF8bb3133dE12Beb67980305bEd35D69A9d9b', '0x6CaE3746E425441F1Edb8d6fc563EA5B74517e2F', '0x0422bcA7A631Cbc260Bca2975A1AB40ceB0318E7', '0x042e630eB2A2F17F23006900ffF72515A66C34E8', '0xBFC9a9f1965a484451f05cecE780567df7D30cb6', '0x422753f23638fCEB97B220b2c78f702B91C26119', '0xa5e862a3745FBD8F31782bBCAC7a8B8930d838cF', '0x0dE9072c4a0Bf6bF66C0C194Bf8a88a6DcD71C8A', '0x594eAE3B79411Eb807b6B82661B8cAbbC455313B', '0x4C20178fd965983981a4Dc9640131415FB1511B0', '0xF3C5eCaca13C25BdD911E0a09ec9F48387eF1E46', '0xC014AE12556A4E22Dd74E81D7321EA299c7f8B67', '0xe5C40d9566966220965C58A07b327B39315C2a20', '0x489716ea77e27C9B8640E5e46cBcACe0f9c6c8dF', '0xa7e88d7662ddFD494b572938F75997134c670C35', '0x666f19299A0b7E1EF6cd1B42a25B0a22449872e7', '0x16E724bDc099C331F85a52E7132D5E539201691B', '0x682EC22c7De223db7BC498f0B13a311857137447', '0x2564443EcE12e7cd1d9338f932F0277E4C5f45af', '0x09aE7328dCb157B068acf8703e0c76090FDF5048', '0x334939e42a67Ad44367F3fAa6a288e15fe7A8D05', '0x710Ca14740eE62D03b554a0cB9fBdA48bE0DCF78', '0x246708D27a14ADf36f8513C08d2AD81EB109947F', '0x842734b5E9B819f1b7b4047D408f2e6E74fecE60', '0x7b136808D0f6d325466Df1008109120a56D236e6', '0x3e0742c729Ba551E101dA4FC5DFfF36D5F9c1b68', '0x9C59d4B591aE4216876B89b4687f199Ea5dfD0E0', '0x419EDE85e70166fF9CDc53c5507689f591536b4e', '0x7e5980a62D227D62C212C1409184d258F14e00b3', '0x2E8C63c9b13a4b014B19454f87d11f17F4E568B3', '0x87F997783AA4fE57A0f2Bf4829AfEDF85f003BEa', '0x0E84d9cB07cD9AA33635c3153Bc95FBE68703E81', '0x9cC2507D7Dc790977E30CAa3982C7884550044D1', '0x58a1d72ec8E6f0F03f93c0f475377a198A235A9C', '0x5053d4260D763DC07f7B8049cf0014E64E5F1EF6', '0x89764F12bA0028a1614e64c87d5892c2E94087D6', '0x4Cf1ab474F02A69D07EBd3EB58237b204caFFAd2', '0x22763079241E75C52192c52d694beaFD3e09C6a3', '0xb0436C372bF140cdd89AC8d2ad9522a9308CB4a0', '0x74F1430c9E42e2DCE649da6432107572a78D56D8', '0xf2be4F198F3E2D4aAC6C251c796F2Fad406e1A77', '0xc7656628e4aFeb00979f9F4832bA9d1C31F3A3BD', '0x5f1804ed99C638BDeE7ccd361f054646EDAfdD05', '0x17eD2B61e2F30Cbe7CD1bD8e1Aa0A1D6643c8Ae7', '0x896467f7F66655DB3762c653618a76B68f4b8fAC', '0x3c46f4b4363bd1ea1ccB4E929661F9c9F0eD1185', '0x44e5C9f323060ae1577c64732a7A64292f642630', '0xd444BD1fd5c0529328d5a1f830A1E68d9798F9f7', '0xF1FCf1CCE851818b5cD9dB3659fDAa9c0b59Ba59', '0x034B9D8f27Ee1595ee8B371Cf759F3233EAEee63', '0x6591D7eaF58cBEc5De3e7236c36Fe788A46c7E94', '0x85aA4A56352AD5Dd204F896201d2c58eF134929e', '0x4456dbF88059E45c6F8420EE1622166CE86d054b', '0x45df0966127CC340937cbF326D86cd4c9D7EbAE2', '0x46548e91ef64F3a5a6d026330f768af700017589', '0xA3E08Ac16ea8cC815E9da9dD9B10A4885F91e091', '0x163f53Cc363C354A1162A1e3054053eA6b370D60', '0x7aaCCDfF97a6f70e5272CD071549959D6eCb673A', '0xFf896233087760aa3069D15423BE90a50fa1b38A', '0x5c6BbaEd7B94Dc2aFF7734802A305088e2135765', '0x2cd323EC24B567FfFC52c88d8Ab53Ad603224f9D', '0x849410D3D1089ece96dCe513EE1944Df7b56E06c', '0x97A7592AA1047c3f52894593378237b3303ac086', '0xfEd824C62b357d7d9c62591EB938B0e446b6C3e8', '0x746559E229FC5BF21F99667Cc3393f0824E1d9A9', '0x87279c3b2198F4a2a8Bdb3f52B3E72EcBD490d87', '0x0ee32f3cbf9CFE2289172A216D2E4ffa8Eeabdd0', '0xF7EAa37D9004271A3f0037ff671693D07FBea928', '0x69c5dB1f35a952Ec58eAA975AC9a4f2Abb1CBa24', '0x5E953b2BB1aCff907CBf96A8840F77Bc51094c5e', '0x9269bb85E87e402F35D92b266E9C9A6Cbc2B2aB8', '0x775B259397a27AcFC518D9c28BEF47E025EdaF4e', '0xeb19BFB054173101087390C35DE06eb1eFf4C1e4', '0xB1f638f35C514912d1C53F9c277f2EE918a3AC2C', '0xB6CA015dd09B5Cf04a20e103bE5AAE341a4e8Eed', '0xF8E20228a9CC29a95185404360cdCDe56a0F26ca', '0xa4b353a345EAd25B94D1C15CA91a1397f6045e03', '0xe43E950184F24b72bc780C99F6B8E880B38A9F26', '0x8c26761B47aA22C8B0A5DCc8aFCEfceacdA0839a', '0x0caF678C8AF4F2723ca2114277cF77A854d5b77C', '0xf8E29D7d2cf6943a7eD612454b54D448d5A2b928', '0xc976Bccc886973B752152512FF5179aD5DFd7184', '0x5758028A349FE654e6d44fD44A01d8e9501e53ae', '0x76476BE9299460aCC58a728222d6709f245cFA10', '0x2334438FA00F20287b821262463745b053B6bEaC', '0xcE325668076A146EFB1e2207C490FcEFd890398f', '0x7Cc1B8a23778C44380dB749ca2D35173EDc02707', '0xbC69F4618B4cd750aFEF04c8d0B44fD77d09A536', '0x089606083aa3a3e69917f4a89b0334De8d6f49Fe', '0x04633c858237eb7E6985bb182Dc4eE7e07e6B774', '0xFF7704494604c985CC311A83A0BC4DCFcbA0ecD3', '0xb3b97A72c83d599948ecC8151FBfDA19aAb6290e', '0xd36Ab05dcF3Cbc74c64957db6cE6367733e995d7', '0xCB5A26088B19A4C52569FddbF40d808ae4a5d89f', '0xEb45BE31956Bf575F4C9383Aaec11E042DD52868', '0xA7Ab3187B4C144869192D93C50DB3cB8067Cf9CD', '0x775A48372fb47D25382C4C9729234f647EF644D2', '0xe57327d85b6d171DfdD86C55d47216923A530e93', '0x3Bb31129bE10950F8396BB3755a193941590E07c', '0x6fb1777e3D5cD57373f9a2324231af773A4Fcb7c', '0x5C3615423E9c6Dd0D436983349c5Ca0Cab5D1393', '0xCACab90B7A4C527b38E72777c07E251E60e564D6', '0x3203aBfA54F6bA7E9566970f8D46198F320E0432', '0xc39086Dd91eB17e806b81445A539edf23bA50A9F', '0x4f61a02c19C25210AD01A91B920125c163c39fd6', '0x20b8F803B1727Cb11CBc92B3949d86E4a079da92', '0x6eDEB7E495d5D4397eB9bB00F70558ABAAAfacB3', '0xbD179b14D4E55d470BF3e104110AF0B88398E69a', '0xe08F1070Bc209c72BD500D3b6a6d4076134cF6dE', '0x5cd54F166222490c185be57f95478386c0A352C7', '0xabEfE6093E5d3D1D1455D4E33a608d4Fb1B8CC8F', '0xbdd795E66bcc857313b21e5df460294367dA63c5', '0xb6Bbf2815dCE1CC192c8e2e554C62fa326Bee809', '0x06F82FE06032328A268812b01f9A0AcfFB9F653D', '0x98DDD47DC20A1a19f3511Acf2834B64512661364', '0xb5B9292156490338fEC1C91E277d7305BB3F60ac', '0x68B11b29EfeF6946EB5B1C5223b24822cB31fE58', '0x929D02e927FDa0B249BD6fc0Ea4a1915Cfa5AAcB', '0x21b16Ba1eD4D94c66682cD6Aac43a482eA57022C', '0x6E68F64f8754344e0082cF00a299a2d237B95014', '0xBf4850E4e8d6CD2319B8808b65bEdf7Cb15358d4', '0x622B2cc5fb114650c7293FEc01c3C732395E3268', '0x6D8732C5c9E466674274fcbe9F3CE330963CEE16', '0x7a40f4df5343E1d02d7DbABF2B6415669860D606']
            const ambassArr = []
            for (let i = 0; i <= _ambassArr.length - 1; i++) {
                let isDekyc = false
                let demover = _ambass2Arr[i]
                for (let ii = 0; ii <= dekyc.length - 1; ii++) {
                    if (_ambassArr[i].toUpperCase() === dekyc[ii].toUpperCase()) {
                        isDekyc = true
                        break
                    }
                    if (_ambass2Arr[i].toUpperCase() === dekyc[ii].toUpperCase()) {
                        demover = '0x1BeedD97fCD4E21754465d21c757A9DF43733187'
                    }
                }
                if (!isDekyc) {
                    ambassArr.push(_ambassArr[i])
                    ambass2Arr.push(demover)
                }
            }
            const data2_001 = await readContracts(config, {
                contracts: ambassArr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item],
                        chainId: 8899,
                    }
                ))
            })
            const ambass10Arr = []
            for (let i = 0; i <= Number(data2_001.length - 1); i++) {
                ambass10Arr.push(data2_001[i].result)
            }
            const data2_0011 = await readContracts(config, {
                contracts: ambass10Arr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item],
                        chainId: 8899,
                    }
                ))
            })
            const ambass100Arr = []
            for (let i = 0; i <= Number(data2_0011.length - 1); i++) {
                ambass100Arr.push(data2_0011[i].result)
            }
            const data2_002 = await readContracts(config, {
                contracts: ambass2Arr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item],
                        chainId: 8899,
                    }
                ))
            })
            const ambass20Arr = []
            for (let i = 0; i <= Number(data2_002.length - 1); i++) {
                ambass20Arr.push(data2_002[i].result)
            }
            const data2_0022 = await readContracts(config, {
                contracts: ambass20Arr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item],
                        chainId: 8899,
                    }
                ))
            })
            const ambass200Arr = []
            for (let i = 0; i <= Number(data2_0022.length - 1); i++) {
                ambass200Arr.push(data2_0022[i].result)
            }
            const ranker = []
            const mover = []
            for (let i = 0; i <= ambassArr.length - 1; i++) {
                ranker.push(ambassArr[i])
            }
            for (let i = 0; i <= ambass2Arr.length - 1; i++) {
                mover.push(ambass2Arr[i])
            }

            const jdaoFarmRemoveDup = ranker.map((item) => ({to: item, value: 0}))
            for (let i = 0; i <= jdaoFarmRemoveDup.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(jdaoFarmAllMerged).length -1; i2++) {
                    if (jdaoFarmRemoveDup[i].to.toUpperCase() === Object.values(jdaoFarmAllMerged)[i2].to.toUpperCase()) {
                        jdaoFarmRemoveDup[i] = Object.values(jdaoFarmAllMerged)[i2]
                    }
                }
            }

            const data2_1 = await readContracts(config, {
                contracts: ranker.map((item) => (
                    {
                        address: quest01,
                        abi: quest01ABI,
                        functionName: 'questComplete',
                        args: [item],
                        chainId: 8899,
                    }
                )),
            })
            const questArr = []
            for (let i = 0; i <= Number(data2_1.length - 1); i++) {
                questArr.push(data2_1[i].result)
            }
            const data2_2 = await readContracts(config, {
                contracts: ranker.map((item) => (
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'frenCount',
                        args: [item],
                        chainId: 8899,
                    }
                )),
            })
            const quest2Arr = []
            for (let i = 0; i <= Number(data2_2.length - 1); i++) {
                quest2Arr.push(data2_2[i].result)
            }
            const data2_3 = await readContracts(config, {
                contracts: ranker.map((item) => (
                    {
                        address: questBBQ,
                        abi: questBBQABI,
                        functionName: 'questComplete',
                        args: [item],
                        chainId: 8899,
                    }
                )),
            })
            const quest3Arr = []
            for (let i = 0; i <= Number(data2_3.length - 1); i++) {
                quest3Arr.push(data2_3[i].result)
            }
            const data2_4 = await readContracts(config, {
                contracts: ranker.map((item) => (
                    {
                        address: questPlat01,
                        abi: quest01ABI,
                        functionName: 'questComplete',
                        args: [item],
                        chainId: 8899,
                    }
                )),
            })
            const quest4Arr = []
            for (let i = 0; i <= Number(data2_4.length - 1); i++) {
                quest4Arr.push(data2_4[i].result)
            }

            const enderRemoveDup = ranker.map((item) => ({from: item, value: 0}))
            for (let i = 0; i <= enderRemoveDup.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(enderAllMerged).length -1; i2++) {
                    if (enderRemoveDup[i].from.toUpperCase() === Object.values(enderAllMerged)[i2].from.toUpperCase()) {
                        enderRemoveDup[i] = Object.values(enderAllMerged)[i2]
                    }
                }
            }

            const dataOP = await readContracts(config, {
                contracts: ranker.map((item) => (
                    {
                        address: '0x51f97e67b2ff5ed064dc2b27b7a745e0d4c47ee0',
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [item],
                        chainId: 10,
                    }
                )),
            })
            const opLpArr = []
            for (let i = 0; i <= Number(dataOP.length - 1); i++) {
                opLpArr.push(ethers.utils.formatEther(dataOP[i].result))
            }
            const data2 = ranker.map((item, i) => {
                return {
                    addr: item,
                    name: ambass100Arr[i] !== undefined ? ambass100Arr[i] : item.slice(0, 4) + "..." + item.slice(-4),
                    cmxp: ((Number(questArr[i]) * 100) + (Number(quest2Arr[i]) * 500) + (Number(quest3Arr[i]) * 5) + (enderRemoveDup[i].value * 5) + (jdaoFarmRemoveDup[i].value * 1000000) + (Number(quest4Arr[i]) * 200) + (Number(opLpArr[i]) * 100000))
                }
            })

            const data3_1 = await readContracts(config, {
                contracts: ranker.map((item) => (
                    {
                        address: dunCopper,
                        abi: dunCopperABI,
                        functionName: 'nftEquip',
                        args: [item],
                        chainId: 8899
                    }
                )),
            })
            const powCuArr = []
            for (let i = 0; i <= Number(data3_1.length - 1); i++) {
                powCuArr.push(data3_1[i].result[3])
            }
            const data3_2 = await readContracts(config, {
                contracts: ranker.map((item) => (
                    {
                        address: dunJasper,
                        abi: dunJasperABI,
                        functionName: 'nftEquip',
                        args: [item],
                        chainId: 8899
                    }
                )),
            })
            const powJaspArr = []
            for (let i = 0; i <= Number(data3_2.length - 1); i++) {
                powJaspArr.push(data3_2[i].result[7])
            }
            const dataHouse = await readContracts(config, {
                contracts: [
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10026010'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10026002'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001001'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001002'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001003'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001004'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001005'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001006'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001007'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001008'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001009'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001010'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10001011'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10026006'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002001'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002002'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002003'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002004'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002005'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002006'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002007'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002008'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002009'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002010'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10002011'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10026011'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003001'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003002'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003003'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003004'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003005'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003006'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003007'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003008'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003009'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003010'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003011'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003012'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003013'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003014'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003015'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003016'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003017'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003018'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003019'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003020'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003021'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotOwner', args: ['10003022'], chainId: 8899, },
                ],
            })
            const dataHouseLv = await readContracts(config, {
                contracts: [
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026010'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026002'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001001'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001002'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001003'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001004'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001005'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001006'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001007'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001008'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001009'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001010'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10001011'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026006'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002001'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002002'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002003'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002004'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002005'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002006'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002007'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002008'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002009'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002010'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10002011'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10026011'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003001'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003002'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003003'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003004'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003005'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003006'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003007'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003008'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003009'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003010'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003011'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003012'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003013'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003014'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003015'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003016'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003017'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003018'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003019'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003020'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003021'], chainId: 8899, },
                    { address: slot1, abi: slot1ABI, functionName: 'slotLevel', args: ['10003022'], chainId: 8899, },
                ],
            }) 

            const data0 = await readContracts(config, {
                contracts: stakeRemoveDup.map((item) => (
                    {
                        address: houseStaking,
                        abi: houseStakingABI,
                        functionName: 'nftStake',
                        args: [1, String(item)],
                        chainId: 8899,
                    }
                ))
            })
            let dataHouse2 = new Array(4 + 11 + 11 + 22).fill(0)
            for (let i = 0; i <= stakeRemoveDup.length - 1; i++) {
                if (data0[i].result[0].toUpperCase() === dataHouse[1].result.toUpperCase()) {
                    dataHouse2[1] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[2].result.toUpperCase()) {
                    dataHouse2[2] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[3].result.toUpperCase()) {
                    dataHouse2[3] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[4].result.toUpperCase()) {
                    dataHouse2[4] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[5].result.toUpperCase()) {
                    dataHouse2[5] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[6].result.toUpperCase()) {
                    dataHouse2[6] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[7].result.toUpperCase()) {
                    dataHouse2[7] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[8].result.toUpperCase()) {
                    dataHouse2[8] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[9].result.toUpperCase()) {
                    dataHouse2[9] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[10].result.toUpperCase()) {
                    dataHouse2[10] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[11].result.toUpperCase()) {
                    dataHouse2[11] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[12].result.toUpperCase()) {
                    dataHouse2[12] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[13].result.toUpperCase()) {
                    dataHouse2[13] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[0].result.toUpperCase()) {
                    dataHouse2[0] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[14].result.toUpperCase()) {
                    dataHouse2[14] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[15].result.toUpperCase()) {
                    dataHouse2[15] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[16].result.toUpperCase()) {
                    dataHouse2[16] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[17].result.toUpperCase()) {
                    dataHouse2[17] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[18].result.toUpperCase()) {
                    dataHouse2[18] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[19].result.toUpperCase()) {
                    dataHouse2[19] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[20].result.toUpperCase()) {
                    dataHouse2[20] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[21].result.toUpperCase()) {
                    dataHouse2[21] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[22].result.toUpperCase()) {
                    dataHouse2[22] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[23].result.toUpperCase()) {
                    dataHouse2[23] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[24].result.toUpperCase()) {
                    dataHouse2[24] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[25].result.toUpperCase()) {
                    dataHouse2[25] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[26].result.toUpperCase()) {
                    dataHouse2[26] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[27].result.toUpperCase()) {
                    dataHouse2[27] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[28].result.toUpperCase()) {
                    dataHouse2[28] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[29].result.toUpperCase()) {
                    dataHouse2[29] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[30].result.toUpperCase()) {
                    dataHouse2[30] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[31].result.toUpperCase()) {
                    dataHouse2[31] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[32].result.toUpperCase()) {
                    dataHouse2[32] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[33].result.toUpperCase()) {
                    dataHouse2[33] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[34].result.toUpperCase()) {
                    dataHouse2[34] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[35].result.toUpperCase()) {
                    dataHouse2[35] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[36].result.toUpperCase()) {
                    dataHouse2[36] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[37].result.toUpperCase()) {
                    dataHouse2[37] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[38].result.toUpperCase()) {
                    dataHouse2[38] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[39].result.toUpperCase()) {
                    dataHouse2[39] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[40].result.toUpperCase()) {
                    dataHouse2[40] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[41].result.toUpperCase()) {
                    dataHouse2[41] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[42].result.toUpperCase()) {
                    dataHouse2[42] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[43].result.toUpperCase()) {
                    dataHouse2[43] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[44].result.toUpperCase()) {
                    dataHouse2[44] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[45].result.toUpperCase()) {
                    dataHouse2[45] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[46].result.toUpperCase()) {
                    dataHouse2[46] += Number(String(stakeRemoveDup[i]).slice(-5))
                } else if (data0[i].result[0].toUpperCase() === dataHouse[47].result.toUpperCase()) {
                    dataHouse2[47] += Number(String(stakeRemoveDup[i]).slice(-5))
                }
            }
            let powHouse = new Array(ranker.length).fill(0)
            for (let i = 0; i <= ranker.length -1; i++) {
                for (let i2 = 0; i2 <= dataHouse.length -1; i2++) {
                    if (ranker[i].toUpperCase() === dataHouse[i2].result.toUpperCase()) {
                        powHouse[i] += dataHouse2[i2]
                    }
                }
            }

            const data0WD = await readContracts(config, {
                contracts: stakeRemoveDupWD.map((item) => (
                    {
                        address: weaponDepotStaking,
                        abi: constructionStakingABI,
                        functionName: 'nftStake',
                        args: [1, String(item)],
                        chainId: 8899,
                    }
                ))
            })
            let dataHouse2WD = new Array(4 + 11 + 11 + 22).fill(0)
            for (let i = 0; i <= stakeRemoveDupWD.length - 1; i++) {
                if (data0WD[i].result[0].toUpperCase() === dataHouse[1].result.toUpperCase()) {
                    dataHouse2WD[1] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[2].result.toUpperCase()) {
                    dataHouse2WD[2] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[3].result.toUpperCase()) {
                    dataHouse2WD[3] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[4].result.toUpperCase()) {
                    dataHouse2WD[4] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[5].result.toUpperCase()) {
                    dataHouse2WD[5] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[6].result.toUpperCase()) {
                    dataHouse2WD[6] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[7].result.toUpperCase()) {
                    dataHouse2WD[7] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[8].result.toUpperCase()) {
                    dataHouse2WD[8] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[9].result.toUpperCase()) {
                    dataHouse2WD[9] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[10].result.toUpperCase()) {
                    dataHouse2WD[10] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[11].result.toUpperCase()) {
                    dataHouse2WD[11] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[12].result.toUpperCase()) {
                    dataHouse2WD[12] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 10
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[13].result.toUpperCase()) {
                    dataHouse2WD[13] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[0].result.toUpperCase()) {
                    dataHouse2WD[0] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[14].result.toUpperCase()) {
                    dataHouse2WD[14] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[15].result.toUpperCase()) {
                    dataHouse2WD[15] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[16].result.toUpperCase()) {
                    dataHouse2WD[16] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[17].result.toUpperCase()) {
                    dataHouse2WD[17] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[18].result.toUpperCase()) {
                    dataHouse2WD[18] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[19].result.toUpperCase()) {
                    dataHouse2WD[19] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[20].result.toUpperCase()) {
                    dataHouse2WD[20] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[21].result.toUpperCase()) {
                    dataHouse2WD[21] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[22].result.toUpperCase()) {
                    dataHouse2WD[22] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[23].result.toUpperCase()) {
                    dataHouse2WD[23] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[24].result.toUpperCase()) {
                    dataHouse2WD[24] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 5
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[25].result.toUpperCase()) {
                    dataHouse2WD[25] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[26].result.toUpperCase()) {
                    dataHouse2WD[26] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[27].result.toUpperCase()) {
                    dataHouse2WD[27] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[28].result.toUpperCase()) {
                    dataHouse2WD[28] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[29].result.toUpperCase()) {
                    dataHouse2WD[29] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[30].result.toUpperCase()) {
                    dataHouse2WD[30] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[31].result.toUpperCase()) {
                    dataHouse2WD[31] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[32].result.toUpperCase()) {
                    dataHouse2WD[32] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[33].result.toUpperCase()) {
                    dataHouse2WD[33] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[34].result.toUpperCase()) {
                    dataHouse2WD[34] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[35].result.toUpperCase()) {
                    dataHouse2WD[35] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[36].result.toUpperCase()) {
                    dataHouse2WD[36] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[37].result.toUpperCase()) {
                    dataHouse2WD[37] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[38].result.toUpperCase()) {
                    dataHouse2WD[38] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[39].result.toUpperCase()) {
                    dataHouse2WD[39] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[40].result.toUpperCase()) {
                    dataHouse2WD[40] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[41].result.toUpperCase()) {
                    dataHouse2WD[41] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[42].result.toUpperCase()) {
                    dataHouse2WD[42] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[43].result.toUpperCase()) {
                    dataHouse2WD[43] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[44].result.toUpperCase()) {
                    dataHouse2WD[44] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[45].result.toUpperCase()) {
                    dataHouse2WD[45] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[46].result.toUpperCase()) {
                    dataHouse2WD[46] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                } else if (data0WD[i].result[0].toUpperCase() === dataHouse[47].result.toUpperCase()) {
                    dataHouse2WD[47] += Number(String(stakeRemoveDupWD[i]).slice(-5)) * 1
                }
            }
            let powHouseWD = new Array(ranker.length).fill(0)
            for (let i = 0; i <= ranker.length -1; i++) {
                for (let i2 = 0; i2 <= dataHouse.length -1; i2++) {
                    if (ranker[i].toUpperCase() === dataHouse[i2].result.toUpperCase()) {
                        powHouseWD[i] += dataHouse2WD[i2]
                    }
                }
            }
            let powMO = await readContracts(config, {
                contracts: ranker.map((item) => (
                    {
                        address: dunMo,
                        abi: dunMoABI,
                        functionName: 'nftStatus',
                        args: [item],
                        chainId: 8899
                    }
                ))
            })
            for (let i = 0; i <= ranker.length - 1; i++) {
                if (ranker[i].toUpperCase() === dataHouse[1].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[1].result)
                } else if (ranker[i].toUpperCase() === dataHouse[2].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[2].result)
                } else if (ranker[i].toUpperCase() === dataHouse[3].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[3].result)
                } else if (ranker[i].toUpperCase() === dataHouse[4].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[4].result)
                } else if (ranker[i].toUpperCase() === dataHouse[5].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[5].result)
                } else if (ranker[i].toUpperCase() === dataHouse[6].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[6].result)
                } else if (ranker[i].toUpperCase() === dataHouse[7].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[7].result)
                } else if (ranker[i].toUpperCase() === dataHouse[8].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[8].result)
                } else if (ranker[i].toUpperCase() === dataHouse[9].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[9].result)
                } else if (ranker[i].toUpperCase() === dataHouse[10].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[10].result)
                } else if (ranker[i].toUpperCase() === dataHouse[11].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[11].result)
                } else if (ranker[i].toUpperCase() === dataHouse[12].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 10 * Number(dataHouseLv[12].result)
                } else if (ranker[i].toUpperCase() === dataHouse[13].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[13].result)
                } else if (ranker[i].toUpperCase() === dataHouse[0].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[0].result)
                } else if (ranker[i].toUpperCase() === dataHouse[14].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[14].result)
                } else if (ranker[i].toUpperCase() === dataHouse[15].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[15].result)
                } else if (ranker[i].toUpperCase() === dataHouse[16].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[16].result)
                } else if (ranker[i].toUpperCase() === dataHouse[17].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[17].result)
                } else if (ranker[i].toUpperCase() === dataHouse[18].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[18].result)
                } else if (ranker[i].toUpperCase() === dataHouse[19].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[19].result)
                } else if (ranker[i].toUpperCase() === dataHouse[20].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[20].result)
                } else if (ranker[i].toUpperCase() === dataHouse[21].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[21].result)
                } else if (ranker[i].toUpperCase() === dataHouse[22].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[22].result)
                } else if (ranker[i].toUpperCase() === dataHouse[23].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[23].result)
                } else if (ranker[i].toUpperCase() === dataHouse[24].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 5 * Number(dataHouseLv[24].result)
                } else if (ranker[i].toUpperCase() === dataHouse[25].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[25].result)
                } else if (ranker[i].toUpperCase() === dataHouse[26].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[26].result)
                } else if (ranker[i].toUpperCase() === dataHouse[27].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[27].result)
                } else if (ranker[i].toUpperCase() === dataHouse[28].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[28].result)
                } else if (ranker[i].toUpperCase() === dataHouse[29].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[29].result)
                } else if (ranker[i].toUpperCase() === dataHouse[30].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[30].result)
                } else if (ranker[i].toUpperCase() === dataHouse[31].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[31].result)
                } else if (ranker[i].toUpperCase() === dataHouse[32].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[32].result)
                } else if (ranker[i].toUpperCase() === dataHouse[33].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[33].result)
                } else if (ranker[i].toUpperCase() === dataHouse[34].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[34].result)
                } else if (ranker[i].toUpperCase() === dataHouse[35].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[35].result)
                } else if (ranker[i].toUpperCase() === dataHouse[36].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[36].result)
                } else if (ranker[i].toUpperCase() === dataHouse[37].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[37].result)
                } else if (ranker[i].toUpperCase() === dataHouse[38].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[38].result)
                } else if (ranker[i].toUpperCase() === dataHouse[39].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[39].result)
                } else if (ranker[i].toUpperCase() === dataHouse[40].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[40].result)
                } else if (ranker[i].toUpperCase() === dataHouse[41].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[41].result)
                } else if (ranker[i].toUpperCase() === dataHouse[42].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[42].result)
                } else if (ranker[i].toUpperCase() === dataHouse[43].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[43].result)
                } else if (ranker[i].toUpperCase() === dataHouse[44].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[44].result)
                } else if (ranker[i].toUpperCase() === dataHouse[45].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[45].result)
                } else if (ranker[i].toUpperCase() === dataHouse[46].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[46].result)
                } else if (ranker[i].toUpperCase() === dataHouse[47].result.toUpperCase()) {
                    powMO[i].result[0] = Number(powMO[i].result[0]) * 1 * Number(dataHouseLv[47].result)
                }
            }
            const data3 = ranker.map((item, i) => {
                return {
                    addr: item,
                    name: ambass100Arr[i] !== undefined ? ambass100Arr[i] : item.slice(0, 4) + "..." + item.slice(-4),
                    cmpow: Number(powCuArr[i]) + Number(powJaspArr[i]) + Number(powHouse[i]) + Number(powHouseWD[i] + Number(powMO[i].result[0]))
                }
            })

            return [ data2, data3, ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setRank(result[0])
            setRank2(result[1])
            const arrRank1 = result[0].slice(0).sort((a, b) => {return b.cmxp-a.cmxp}).slice(0, 20)
            let _sumArrRank1 = 0
            for (let i = 0; i <= arrRank1.length - 1; i++) { _sumArrRank1 += Number(arrRank1[i].cmxp) }
            setSumArrRank1(_sumArrRank1)
            const arrRank2 = result[1].slice(0).sort((a, b) => {return b.cmpow-a.cmpow}).slice(0, 20)
            let _sumArrRank2 = 0
            for (let i = 0; i <= arrRank2.length - 1; i++) { _sumArrRank2 += Number(arrRank2[i].cmpow) }
            setSumArrRank2(_sumArrRank2)
        })
    }, [config, address, txupdate, erc20Abi, kycABI, quest01ABI, questAmbassABI, questBBQABI, pvp01ABI, bbqLab01ABI, enderPotteryABI, dunCopperABI, dunJasperABI, dunMoABI, cmdaoNameABI, houseStakingABI, slot1ABI, erc721Abi, constructionStakingABI])

    React.useEffect(() => {      
        const thefetch = async () => {
            const data = address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: jaspToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: pvp01,
                        abi: pvp01ABI,
                        functionName: 'userInfo',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: quest01,
                        abi: quest01ABI,
                        functionName: 'questComplete',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: kyc,
                        abi: kycABI,
                        functionName: 'kyc',
                        args: [0, address],
                        chainId: 8899,
                    },
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'frenCount',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'registIndex',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: questBBQ,
                        abi: questBBQABI,
                        functionName: 'questComplete',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: questBBQ,
                        abi: questBBQABI,
                        functionName: 'questLastStamp',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: bbqLab,
                        abi: bbqLab01ABI,
                        functionName: 'supplier',
                        args: [address],
                        chainId: 8899,
                    },
                    {
                        address: '0x399fe73bb0ee60670430fd92fe25a0fdd308e142',
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 10,
                    },
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, {result: false}, {result: 0}, {result: 0}, {result: 0}, {result: 0} ]
            //const jaspBal = data[0].result
            const reward = /*data[1].result[1] - data[2].result*/0
            const _isKYC = data[3].result
            const _frens = Number(data[4].result)
            const _isJoin = Number(data[5].result) !== 0 ? true : false
            const _gmStreak = Number(data[6].result)
            const _canClaimSIL = /*ethers.utils.formatUnits(jaspBal, "gwei") >= 0.1 ? true : */false
            const _canClaimPlat = /*ethers.utils.formatUnits(jaspBal, "gwei") >= 1 && Number(data[1].result[0]) >= 2 ? true : */false
            const _canClaimBBQ = Date.now() > (Number(data[7].result) * 1000) + (3600 * 24 * 1000) ? true : false
            const _nextClaimBBQ = new Date((Number(data[7].result) * 1000) + (3600 * 24 * 1000))

            const spendfilter1 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jusdtToken, eventName: 'Transfer', args: { to: '0x39C623C4B3f11D38f06Adca9B794CFb2d37581e3' }, fromBlock: startblockmonth, toBlock: "latest" })
            const spendlog1 = publicClient.getFilterLogs({ filter: spendfilter1 })
            const spendfilter2 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jusdtToken, eventName: 'Transfer', args: { to: '0x87A612709b36b575103C65a90cB3B16Cac2BC898' }, fromBlock: startblockmonth, toBlock: "latest" })
            const spendlog2 = publicClient.getFilterLogs({ filter: spendfilter2 })
            const spendfilter3 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jusdtToken, eventName: 'Transfer', args: { to: '0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D' }, fromBlock: startblockmonth, toBlock: "latest" })
            const spendlog3 = publicClient.getFilterLogs({ filter: spendfilter3 })
            const spendfilter4 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jusdtToken, eventName: 'Transfer', args: { to: '0xb8Cc909AD8245eD551bC359b721f3748dA814A33' }, fromBlock: startblockmonth, toBlock: "latest" })
            const spendlog4 = publicClient.getFilterLogs({ filter: spendfilter4 })
            const spendfilter5 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jusdtToken, eventName: 'Transfer', args: { to: '0x87BAC0BCBaadF9B7d24385b1AaaEbeDEb60a1A0a' }, fromBlock: startblockmonth, toBlock: "latest" })
            const spendlog5 = publicClient.getFilterLogs({ filter: spendfilter5 })
            const spendfilter6 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jusdtToken, eventName: 'Transfer', args: { to: '0x8E4D620a85807cBc588C2D6e8e7229968C69E1C5' }, fromBlock: startblockmonth, toBlock: "latest" })
            const spendlog6 = publicClient.getFilterLogs({ filter: spendfilter6 })
            const spendfilter7 = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jusdtToken, eventName: 'Transfer', args: { to: '0x09e6a0A03afa27438c3f507de82b5f6061Ae1643' }, fromBlock: startblockmonth, toBlock: "latest" })
            const spendlog7 = publicClient.getFilterLogs({ filter: spendfilter7 })
            const spenddata1 = await spendlog1
            const spend1Map = await Promise.all(spenddata1.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const spenddata2 = await spendlog2
            const spend2Map = await Promise.all(spenddata2.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const spenddata3 = await spendlog3
            const spend3Map = await Promise.all(spenddata3.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const spenddata4 = await spendlog4
            const spend4Map = await Promise.all(spenddata4.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const spenddata5 = await spendlog5
            const spend5Map = await Promise.all(spenddata5.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const spenddata6 = await spendlog6
            const spend6Map = await Promise.all(spenddata6.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const spenddata7 = await spendlog7
            const spend7Map = await Promise.all(spenddata7.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const spendAllMerged = spend1Map.concat(spend2Map, spend3Map, spend4Map, spend5Map, spend6Map, spend7Map).reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                    prev[curr.from.toUpperCase()].value += curr.value
                } else {
                    prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})
            const data2_0 = await readContract(config, {
                address: questAmbass,
                abi: questAmbassABI,
                functionName: 'registCount',
                chainId: 8899,
            })
            const rankerDummy = []
            for (let i = 1; i <= Number(data2_0); i++) {
                rankerDummy.push(null)
            }
            const data2_00 = await readContracts(config, {
                contracts: rankerDummy.map((item, i) => (
                    {
                        address: questAmbass,
                        abi: questAmbassABI,
                        functionName: 'referalData',
                        args: [i+1],
                        chainId: 8899,
                    }
                ))
            })
            const _ambassArr = []
            for (let i = 0; i <= Number(data2_00.length - 1); i++) {
                _ambassArr.push(data2_00[i].result[0])
            }
            const _ambass2Arr = []
            for (let i = 0; i <= Number(data2_00.length - 1); i++) {
                _ambass2Arr.push(data2_00[i].result[1])
            }
            const ambass2Arr = []
            const dekyc = ['0xee95ab10EEa1ec932a8541E478d5a63F12e82457', '0x500Fca064b8Eed97d0b2581904f3264408438423', '0xfCe0959Ddcc52210c2ade9bae64b8DD0a09770C3', '0x6562e421dAA15d48AD1072B7a15611E2B3E34238', '0x56E1aF963606983C74E41267e71cD19e7c86ae3E', '0x79B949415bADf6c050cf4e3c56114619C28a9Df2', '0x7ec9932e7De1Ca2dC93A4EdF382ddF2e5D50a1E3', '0x5f3760471fed0E232a86B2026b3236B1EeC2B697', '0x2089dc77c29fDa025622d7281e8F36c0b0b43ee6', '0xB462F623cC1F4b28cdFCA706FdF7402d185b8181', '0x553D1D355A6Aa0Eb64cd5F2F06D0cD733CD95e1d', '0xB073ce42FF2BF382774171f6d9Ca4718564c62A9', '0xED64Cc3083236AE043ed5be4B6673a5226EF78Bf', '0x0DE460035Fa8db0eFb01ad3eC442c2d901B8984C', '0x124AE673A82450489C122d8cBD408acfd23eddB2', '0x1C3Bd4A2E0cAEf1FB502cb3425c33D4A8A6Fd16F', '0x5d7111D9d7B4f82EFA8b0f01bb78d1c43855d3Db', '0x7EB3Bb6e039ebD8DF4801c93e44DA8A7a0BA180d', '0x6dDAd73CF2132981EdEcf9eDB2f4d6b74c081e31', '0xC07a9d01d2ffF30118343b4C7851212d7057a2bE', '0x9B4FBC71543d2320E1C111fcc62823A4Abeb7435', '0xb7872272Af0472A204FE7Fc263912580afdf7f44', '0x923D403a323cCF1b818017478d8ECa7163ab70E4', '0xBEE42C26397496e95eFcfeb5Bbc61f390F392f09', '0x6420295933eF61CA185a836C7C83eAd68c9345E2', '0x6b20125175Fbadb1d09CBc55Fb5604bcA1d159C3', '0xB601bBfaE6A33fb9af6Cd1A4d6642F1CAbb51aCe', '0xced763248D42c453bDdEb3C0480F1D487b600665', '0x803a1d956A526067afaAd0EDCb9f82D864FE7b0e', '0x267234Ce76034D7F707E9b4A67112F03FbE33fBB', '0x759BB243e5e8EA9beD084bC713cF93237182e4D1', '0x801033605EE87DF6ceb88f73c18687520d3c1528', '0xf7db393fBCb87857e81B5CA34cF5F81F27ffaF1d', '0x76F7285973756fAcFe111e06d3C0646988AAd0a4', '0x4E3f662fE793eEB956ebB515E690fF3ca8b859f7', '0xED4ba5a3C6fD95678ae91524Ba310a50840E81b5', '0xcDF72B378B17c3D40D3C3750b21AC613AD9899fd', '0x1005244a4794b2c9911d6fA65678b670d6bc141b', '0xb30904B1eBe5FCE3816fEA8d94E919C0854A7286', '0xd60Cae6AeA8a74CC3eF7505B24a40cE94233d977', '0xA71CF5B79a5aa95e923c2fD8aE62D08d2BCbA39A', '0x1253A3D7fFbedb4D408CF26Ac567f6090f5cdb41', '0x21bBFf900D09d8e3110fFB1A8504662a97cC3763', '0x729370Cb6B64d5d27Ba73Dc52a884c5CBf896f8f', '0xf65f98794798fDB65BD65aB67485Fc9bca4F1fa1', '0x32c47F2989Aa97977540Be786601466C18794820', '0xdA29b8b038F55BE6Fa6Fe670Fa897147b9a48Fa6', '0xf347471df7B7C14608f7b27Caf2E5cf83162d3eD', '0x4C4BC3a884171b208Fe80A105D3Be90D5B4a9688', '0xB367AD17c133e9D80F9B1bD72efB8C2aeA53DF12', '0x3a0d50FdF839275Ec66d336edb1fD666DF538eA0', '0x89B37eB684D8e475aA9246a46387bc2e67790D26', '0x5A4170baD389E8cC44c454F4495EFA1e5C2F14eC', '0xc0f8c2b6D8af5FA2204469A00EAa4F4b8b93aE8b', '0x440A35c9c33038c645c80E2D1Dc69a4Bb428aBaD', '0xc8B812318E2E390539727da2B308218da6330689', '0xc6a0ef7843Cac4ae37C1770A575ce7D4f5990017', '0xBf39FAB586A0A4cdD175cFe96b32fAdD8d8478Bf', '0x0e3b6bBf54F6ED5a3922f765443AE22767FFa570', '0x0AF7ECab093507568da3e372bCe683B7b1f41f64', '0xF6f6A67fF04a763e1C431e830ab37428c5648572', '0x5c77bc7e658af87F920D12975d9EEC9cf9F00100', '0x93F18e78df8c2c96CBF114EDf082Bb41Ca1D6233', '0x1854E30786ceb0964E46A82383cb170f4474E1e9', '0xFc11279dfDa70F180614588789aa553573FB59A5', '0xfC14D4866b642153c7a28Afdaf313419682f902F', '0x4d15f333F2E2029B0f4611e9e205aF0411489eAe', '0xAbCBa9ba55a0701f9E5211604DC6723e585d0e03', '0x325c6dfacb3f146EF82FAF89AC5A4e7B1Ea5baFB', '0xd80Eb72cC2e3C6Ce5037a06dFd0637c2D4feE013', '0x057a35f02F77a8DEDfe8313771164381242DEa3A', '0x36E31B975363ACe0e9E07Fe1d4bd9974B6d6ede2', '0xd68d77f16c61cD1712aD884DFCd3cd13bAAFcFC3', '0xbcB4be032f6Ba5d9Aa051817D29e172972462EC8', '0x14E00591A18f317FCB3310579c33231F6Af5b09D', '0x4482E983863159c4d8d7eecBdecB62dCEd4e2A4D', '0xF49CA788432C07DBc223505Cc23550a74feb8c37', '0x5359aBbBA2f73078Bb15eF6f73362f00accB7a4F', '0x30f564A4960FE3F191f4c9821314c6bD515b6656', '0xD32B045E805D224578E4f6D2f2a4A65739598b05', '0x8C279902D7cFD3c822ee7413C75A27b7159C3598', '0xDDf6FA0dE3D5f5b1C413fc82A762d559D8e713D3', '0x43f591061e0c77f6cc4B2f6539c4e8A1f9aFFaa9', '0x8Db409ca4D11aE7855e73f4f0E48EdF37E957183', '0x7B1dc39AfB909964Cea5D6652d0468625CCA781F', '0xdC221e1acAB5cFdFFeE5B34b9024f9F03147e20d', '0xdcEA2FD2fc80559DC5D2DcB1C66e437591e5b9A6', '0x98dB84A93cf9E69eA09806777386f07d70CD069a', '0xDDe8436124F63992B384dDdf4f98888a12022786', '0x1CA3089936E69dcA47d5814f8073D4935369444F', '0x17A61477977FD1dAd570BF164924Cab27f4f70DC', '0x09438B9cd1E4CfD3E207b5Bc0adF649711b3bbaE', '0x7568D7E7598adA3BE09241e5DCBcaf5835047436', '0x9af7C542A5cdd53CB9A632D5579551Ce70A093e4', '0x647CF1233d1a3974715946Ec39bb1DD74B0Dc260', '0xecC07c826437eCdc940963f636Ca8319D3a59296', '0xEA4C844d2769dFd1F5D5906BDac6Aaa343127F1D', '0x4ED36b0EACB6E48FB78b89b035d6f83C60Cce366', '0x96eD5193A3563FeA53b690B0f157FB3e761203Dd', '0x8aA0ABF59c013297A03cFc2d94364Eae9747C977', '0xF7898BA2a40c6e07d0e931bB385f2071ffD7084A', '0x7aa6402e57916a1Eaff3D424538D189789254B23', '0x668bd67c282C88eCba09c16b5201c83E6F6C6384', '0xC6dA021547A9f81fb1189657f5F3c1557FEc3550', '0xd781CE26451E85C4C4F39BB65136334C7Ed176E4', '0x106184b6f2E6BBfA8d20a9cCFFa13444c638a1d4', '0xfC35Bf976ccfdccFbaa4F8E4e3d64E74cB66D083', '0xCF2b1538D3Bee72aA27900DB00e614e08944d2ab', '0xe1D7f39558A2b96E50ECd69436DB8A7dA8b48830', '0x57Cc121074c19E6fbF0259d625a4E7a18443E21B', '0x496b30Bc28DaF49d156562790db98340e0da8eB8', '0x34aE4283541aB7491f0992cEA0F7F42839257850', '0x8cEC4Da5857b6FD1eEdd805A7399f5c4210021C9', '0xB45329c18566A5f6443278FeA04B0FF8a01f12a1', '0x03b7532dc393d1aF619B498B64B2C8Cb790B874E', '0xDCC9025AFC70c72026d50F0D6F27CcCE31C8dbcf', '0xA11bb45f8A406698A209E6c48AfA7720E970366F', '0xdB943eC07B2F49469cC8121BB5b268eA5D62887B', '0x22a45031870028df27253655D1dA9e9688fF6890', '0xb2eC09e7B04E63C8544d100b365CD924B6E36f2c', '0x0B5F72057f3D5e9d89c11C8bF9791fCdD4eAb14E', '0x2742b7062e9a3b63F16b6736A9B64b668B2bed39', '0xdC7C483c42a9ba50350C9f7b116808ac474Bb146', '0xfF22F618f2aFc6C353E949fCDE473a694e188bc8', '0xE438208D4B40414374BC1F7430c54e41680D56A5', '0x206c4C84c3c625Ed1d055fFe66f4bCeb012B0AdB', '0xEE16583d9d73f6584Aa677D037797C0078486Ae2', '0x50A69432b87aE3Ad1e3d413EDd1775F9F6Df3384', '0x0127C0c2AB5Af1100Ac6D4ac3C51972039cc010F', '0xf47090681CD5FAD47f6257D2a7565c4Db2BDF75E', '0x67cB6d54187E6496632dd501E3FdDb388329F4Ef', '0xf0C7C69d6F1c388cc507eE045c09f8F80b7B5CCb', '0x0dEf5e4A392e9eE0C81506c29A290607c146CA20', '0x64115AcA8c0223C0F8dB9E66e6470016A5481Db6', '0xdD47d3e65F6d7a5098474Ad3Aaab06CB441C3A3E', '0xD0157eF87E81fD44ceFa1F4874a244E42097D3a2', '0x087720BA0729dECF5AcB2B73cC77F403657A29ed', '0x0404533532636F6B142715b601edFbC9122ed91C', '0xbaa641685B87d3F79e3E267ac50743581aF15B42', '0x34b6940bfEf39B834A0715354b2032B9958e90aD', '0x62e76F5aEDA165776f17e466f7b20250b4db344D', '0xba91D40585B3714C74D0C48FcabEe59Cd1b26C8B', '0x075356b8DF870dBc05e1A848b934C6B27D47f7f8', '0x7CA2d9c2926204ac685665DD4d6FAB58DfF1ce89', '0x3379Ec9C2636376F07fF7CF8BF741EcA2A4B8913', '0x2E0AF8bb3133dE12Beb67980305bEd35D69A9d9b', '0x6CaE3746E425441F1Edb8d6fc563EA5B74517e2F', '0x0422bcA7A631Cbc260Bca2975A1AB40ceB0318E7', '0x042e630eB2A2F17F23006900ffF72515A66C34E8', '0xBFC9a9f1965a484451f05cecE780567df7D30cb6', '0x422753f23638fCEB97B220b2c78f702B91C26119', '0xa5e862a3745FBD8F31782bBCAC7a8B8930d838cF', '0x0dE9072c4a0Bf6bF66C0C194Bf8a88a6DcD71C8A', '0x594eAE3B79411Eb807b6B82661B8cAbbC455313B', '0x4C20178fd965983981a4Dc9640131415FB1511B0', '0xF3C5eCaca13C25BdD911E0a09ec9F48387eF1E46', '0xC014AE12556A4E22Dd74E81D7321EA299c7f8B67', '0xe5C40d9566966220965C58A07b327B39315C2a20', '0x489716ea77e27C9B8640E5e46cBcACe0f9c6c8dF', '0xa7e88d7662ddFD494b572938F75997134c670C35', '0x666f19299A0b7E1EF6cd1B42a25B0a22449872e7', '0x16E724bDc099C331F85a52E7132D5E539201691B', '0x682EC22c7De223db7BC498f0B13a311857137447', '0x2564443EcE12e7cd1d9338f932F0277E4C5f45af', '0x09aE7328dCb157B068acf8703e0c76090FDF5048', '0x334939e42a67Ad44367F3fAa6a288e15fe7A8D05', '0x710Ca14740eE62D03b554a0cB9fBdA48bE0DCF78', '0x246708D27a14ADf36f8513C08d2AD81EB109947F', '0x842734b5E9B819f1b7b4047D408f2e6E74fecE60', '0x7b136808D0f6d325466Df1008109120a56D236e6', '0x3e0742c729Ba551E101dA4FC5DFfF36D5F9c1b68', '0x9C59d4B591aE4216876B89b4687f199Ea5dfD0E0', '0x419EDE85e70166fF9CDc53c5507689f591536b4e', '0x7e5980a62D227D62C212C1409184d258F14e00b3', '0x2E8C63c9b13a4b014B19454f87d11f17F4E568B3', '0x87F997783AA4fE57A0f2Bf4829AfEDF85f003BEa', '0x0E84d9cB07cD9AA33635c3153Bc95FBE68703E81', '0x9cC2507D7Dc790977E30CAa3982C7884550044D1', '0x58a1d72ec8E6f0F03f93c0f475377a198A235A9C', '0x5053d4260D763DC07f7B8049cf0014E64E5F1EF6', '0x89764F12bA0028a1614e64c87d5892c2E94087D6', '0x4Cf1ab474F02A69D07EBd3EB58237b204caFFAd2', '0x22763079241E75C52192c52d694beaFD3e09C6a3', '0xb0436C372bF140cdd89AC8d2ad9522a9308CB4a0', '0x74F1430c9E42e2DCE649da6432107572a78D56D8', '0xf2be4F198F3E2D4aAC6C251c796F2Fad406e1A77', '0xc7656628e4aFeb00979f9F4832bA9d1C31F3A3BD', '0x5f1804ed99C638BDeE7ccd361f054646EDAfdD05', '0x17eD2B61e2F30Cbe7CD1bD8e1Aa0A1D6643c8Ae7', '0x896467f7F66655DB3762c653618a76B68f4b8fAC', '0x3c46f4b4363bd1ea1ccB4E929661F9c9F0eD1185', '0x44e5C9f323060ae1577c64732a7A64292f642630', '0xd444BD1fd5c0529328d5a1f830A1E68d9798F9f7', '0xF1FCf1CCE851818b5cD9dB3659fDAa9c0b59Ba59', '0x034B9D8f27Ee1595ee8B371Cf759F3233EAEee63', '0x6591D7eaF58cBEc5De3e7236c36Fe788A46c7E94', '0x85aA4A56352AD5Dd204F896201d2c58eF134929e', '0x4456dbF88059E45c6F8420EE1622166CE86d054b', '0x45df0966127CC340937cbF326D86cd4c9D7EbAE2', '0x46548e91ef64F3a5a6d026330f768af700017589', '0xA3E08Ac16ea8cC815E9da9dD9B10A4885F91e091', '0x163f53Cc363C354A1162A1e3054053eA6b370D60', '0x7aaCCDfF97a6f70e5272CD071549959D6eCb673A', '0xFf896233087760aa3069D15423BE90a50fa1b38A', '0x5c6BbaEd7B94Dc2aFF7734802A305088e2135765', '0x2cd323EC24B567FfFC52c88d8Ab53Ad603224f9D', '0x849410D3D1089ece96dCe513EE1944Df7b56E06c', '0x97A7592AA1047c3f52894593378237b3303ac086', '0xfEd824C62b357d7d9c62591EB938B0e446b6C3e8', '0x746559E229FC5BF21F99667Cc3393f0824E1d9A9', '0x87279c3b2198F4a2a8Bdb3f52B3E72EcBD490d87', '0x0ee32f3cbf9CFE2289172A216D2E4ffa8Eeabdd0', '0xF7EAa37D9004271A3f0037ff671693D07FBea928', '0x69c5dB1f35a952Ec58eAA975AC9a4f2Abb1CBa24', '0x5E953b2BB1aCff907CBf96A8840F77Bc51094c5e', '0x9269bb85E87e402F35D92b266E9C9A6Cbc2B2aB8', '0x775B259397a27AcFC518D9c28BEF47E025EdaF4e', '0xeb19BFB054173101087390C35DE06eb1eFf4C1e4', '0xB1f638f35C514912d1C53F9c277f2EE918a3AC2C', '0xB6CA015dd09B5Cf04a20e103bE5AAE341a4e8Eed']
            const ambassArr = []
            for (let i = 0; i <= _ambassArr.length - 1; i++) {
                let isDekyc = false
                let demover = _ambass2Arr[i]
                for (let ii = 0; ii <= dekyc.length - 1; ii++) {
                    if (_ambassArr[i].toUpperCase() === dekyc[ii].toUpperCase()) {
                        isDekyc = true
                        break
                    }
                    if (_ambass2Arr[i].toUpperCase() === dekyc[ii].toUpperCase()) {
                        demover = '0x1BeedD97fCD4E21754465d21c757A9DF43733187'
                    }
                }
                if (!isDekyc) {
                    ambassArr.push(_ambassArr[i])
                    ambass2Arr.push(demover)
                }
            }
            const data2_001 = await readContracts(config, {
                contracts: ambassArr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item],
                        chainId: 8899,
                    }
                ))
            })
            const ambass10Arr = []
            for (let i = 0; i <= Number(data2_001.length - 1); i++) {
                ambass10Arr.push(data2_001[i].result)
            }
            const data2_0011 = await readContracts(config, {
                contracts: ambass10Arr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item],
                        chainId: 8899,
                    }
                ))
            })
            const ambass100Arr = []
            for (let i = 0; i <= Number(data2_0011.length - 1); i++) {
                ambass100Arr.push(data2_0011[i].result)
            }
            const data2_002 = await readContracts(config, {
                contracts: ambass2Arr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item],
                        chainId: 8899,
                    }
                ))
            })
            const ambass20Arr = []
            for (let i = 0; i <= Number(data2_002.length - 1); i++) {
                ambass20Arr.push(data2_002[i].result)
            }
            const data2_0022 = await readContracts(config, {
                contracts: ambass20Arr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item],
                        chainId: 8899,
                    }
                ))
            })
            const ambass200Arr = []
            for (let i = 0; i <= Number(data2_0022.length - 1); i++) {
                ambass200Arr.push(data2_0022[i].result)
            }
            const ranker = []
            const mover = []
            for (let i = 0; i <= ambassArr.length - 1; i++) {
                ranker.push(ambassArr[i])
            }
            for (let i = 0; i <= ambass2Arr.length - 1; i++) {
                mover.push(ambass2Arr[i])
            }
            const spendRemoveDup = []
            for (let i = 0; i <= ranker.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(spendAllMerged).length -1; i2++) {
                    if (ranker[i].toUpperCase() === Object.values(spendAllMerged)[i2].from.toUpperCase()) {
                        Object.values(spendAllMerged)[i2].name = ambass100Arr[i] !== undefined ? ambass100Arr[i] : Object.values(spendAllMerged)[i2].from.slice(0, 4) + "..." + Object.values(spendAllMerged)[i2].from.slice(-4)
                        spendRemoveDup.push(Object.values(spendAllMerged)[i2])
                    }
                }
            }
            const moverVal = []
            for (let i = 0; i <= spendRemoveDup.length - 1; i++) {
                for (let i2 = 0; i2 <= ranker.length -1; i2++) {
                    if (spendRemoveDup[i].from.toUpperCase() === ranker[i2].toUpperCase()) {
                        moverVal.push({
                            addr: mover[i2],
                            name: ambass200Arr[i2] !== undefined ? ambass200Arr[i2] : mover[i2].slice(0, 4) + "..." + mover[i2].slice(-4), 
                            value: spendRemoveDup[i].value
                        })
                    }
                }
            }
            const moverValMerged = moverVal.reduce((prev, curr) => {
                if (prev[curr.addr.toUpperCase()]) {
                   prev[curr.addr.toUpperCase()].value += curr.value
                } else {
                   prev[curr.addr.toUpperCase()] = curr
                }
                return prev
            }, {})

            return [
                _canClaimSIL, reward, _isKYC, _frens, _isJoin, _canClaimBBQ, _nextClaimBBQ, _gmStreak, _canClaimPlat, 
               spendRemoveDup, Object.values(moverValMerged),
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
            //setCanClaimSIL(result[0])
            //setRewardSIL(result[1])
            setIsKYC(result[2])
            setFrens(result[3])
            setIsJoin(result[4])
            setCanClaimBBQ(result[5])
            setNextClaimBBQ(result[6])
            setGmStreak(result[7])
            //setCanClaimPLAT(result[8])
            setRank3(result[9])
            setRank4(result[10])
            const arrRank3 = result[9].slice(0).sort((a, b) => {return b.value-a.value}).slice(0, 20)
            let _sumArrRank3 = 0
            for (let i = 0; i <= arrRank3.length - 1; i++) { _sumArrRank3 += Number(arrRank3[i].value) }
            setSumArrRank3(_sumArrRank3)
            const arrRank4 = result[10].slice(0).sort((a, b) => {return b.value-a.value}).slice(0, 20)
            let _sumArrRank4 = 0
            for (let i = 0; i <= arrRank4.length - 1; i++) { _sumArrRank4 += Number(arrRank4[i].value) }
            setSumArrRank4(_sumArrRank4)
        })
    }, [config, address, txupdate, erc20Abi, kycABI, quest01ABI, questAmbassABI, questBBQABI, pvp01ABI, bbqLab01ABI, enderPotteryABI, dunCopperABI, dunJasperABI, dunMoABI, cmdaoNameABI, houseStakingABI, slot1ABI, erc721Abi, constructionStakingABI])
    /*const claimSILHandle = async () => {
        setisLoading(true)
        try {
            const jaspAllow = await readContract(config, {
                address: jaspToken,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, quest01],
            })
            if (jaspAllow < 100000000) {
                let { request } = await simulateContract(config, {
                    address: jaspToken,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [quest01, ethers.utils.parseEther(String(10**8))],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: quest01,
                abi: quest01ABI,
                functionName: 'claim',
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }
    const claimPLATHandle = async () => {
        setisLoading(true)
        try {
            const jaspAllow = await readContract(config, {
                address: jaspToken,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, questPlat01],
            })
            if (jaspAllow < 1000000000) {
                let { request } = await simulateContract(config, {
                    address: jaspToken,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [questPlat01, ethers.utils.parseEther(String(10**8))],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: questPlat01,
                abi: quest01ABI,
                functionName: 'claim',
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }*/
    const joinHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: questAmbass,
                abi: questAmbassABI,
                functionName: 'regist',
                args: [ambass],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    const gmHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: questBBQ,
                abi: questBBQABI,
                functionName: 'claim',
                args: [0, 0, address],
            })
            let h = await writeContract(config, request)
            await waitForTransactionReceipt(config, { hash: h })
            setTxupdate(h)
        } catch (e) {
            setisError(true)
            setErrMsg(String(e))
        }
        setisLoading(false)
    }

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner">
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>Quester Oasis</div>
                </div>
                <div className="SubfieldBanner">
                </div>
            </div>

            {address !== null && chain !== undefined && chain.id !== 8899 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to JIBCHAIN.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{background: "rgb(0, 19, 33)", width: "100%", padding: "20px 0 80px 0", minHeight: "inherit", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll"}} className="collection noscroll pixel">
                    <div style={{width: "98%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "350px", width: "20%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Questers 🗺️</div>
                            {rank.length > 0 ?
                                <>
                                    {rank[0] !== null &&
                                        <div style={{width: "100%"}}>
                                            {rank.slice(0).sort((a, b) => {return b.cmxp-a.cmxp}).map((item, index) => (
                                                <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted", fontSize: "14px"}} key={index}>
                                                    <div style={{width: "150px", display: "flex", flexDirection: "row"}}>
                                                        <div>{index+1}</div>
                                                        <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.addr} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                    </div>
                                                    <div style={{display: "flex"}}>{Number(item.cmxp).toLocaleString('en-US', {maximumFractionDigits:0})} CMXP {index <= 19 && <span style={{color: "#fff", marginLeft: "5px"}}>({Number((item.cmxp / sumArrRank1) * 100).toFixed(2)}%)</span>}</div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    <Oval stroke="#ff007a" strokeWidth="5px" />
                                </div>
                            }
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "350px", width: "20%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Strongest 💥</div>
                            {rank2.length > 0 ?
                                <>
                                    {rank2[0] !== null &&
                                        <div style={{width: "100%"}}>
                                            {rank2.slice(0).sort((a, b) => {return b.cmpow-a.cmpow}).map((item, index) => (
                                                <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted", fontSize: "14px"}} key={index}>
                                                    <div style={{width: "150px", display: "flex", flexDirection: "row"}}>
                                                        <div>{index+1}</div>
                                                        <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.addr} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                    </div>
                                                    <div>{Number(item.cmpow).toLocaleString('en-US', {maximumFractionDigits:0})} CMPOW {index <= 19 && <span style={{color: "#fff", marginLeft: "5px"}}>({Number((item.cmpow / sumArrRank2) * 100).toFixed(2)}%)</span>}</div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    <Oval stroke="#ff007a" strokeWidth="5px" />
                                </div>
                            }
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "350px", width: "20%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Spender 💰</div>
                            {rank3.length > 0 ?
                                <>
                                    {rank3[0] !== null &&
                                        <div style={{width: "100%", height: "inherit"}}>
                                            {rank3.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                                <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted", fontSize: "14px"}} key={index}>
                                                    <div style={{width: "150px", display: "flex", flexDirection: "row"}}>
                                                        <div>{index+1}</div>
                                                        <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.from} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                    </div>
                                                    <div>{Number(item.value).toLocaleString('en-US', {minimumFractionDigits:2})} USDT {index <= 19 && <span style={{color: "#fff", marginLeft: "5px"}}>({Number((item.value / sumArrRank3) * 100).toFixed(2)}%)</span>}</div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    <Oval stroke="#ff007a" strokeWidth="5px" />
                                </div>
                            }
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "350px", width: "20%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                            <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Money Mover 💸</div>
                            {rank4.length > 0 ?
                                <>
                                    {rank4[0] !== null &&
                                        <div style={{width: "100%", height: "inherit"}}>
                                            {rank4.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                                <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted", fontSize: "14px"}} key={index}>
                                                    <div style={{width: "150px", display: "flex", flexDirection: "row"}}>
                                                        <div>{index+1}</div>
                                                        <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/jasper-cave/" + item.addr} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                    </div>
                                                    <div>{Number(item.value).toLocaleString('en-US', {minimumFractionDigits:2})} USDT {index <= 19 && <span style={{color: "#fff", marginLeft: "5px"}}>({Number((item.value / sumArrRank4) * 100).toFixed(2)}%)</span>}</div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </> :
                                <div style={{width: "100%", height: "inherit"}}>
                                    <Oval stroke="#ff007a" strokeWidth="5px" />
                                </div>
                            }
                        </div>
                    </div>
                    
                    <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", flexWrap: "wrap"}}>
                        <div style={{background: "rgb(0, 26, 44)", padding: "20px 30px", margin: "10px", border: "1px solid rgb(54, 77, 94)", minWidth: "320px", height: "fit-content", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                            <div style={{width: "140px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>5 CMXP</div>
                                <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>Daily</div>
                            </div>
                            <div style={{width: "100%", padding: "10px 0", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">Let's Cook BBQ!</div>
                            <div style={{width: "100%", margin: "20px 0", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap"}}>
                                <div style={{height: "320px"}}>
                                    <img src="https://gateway.commudao.xyz/ipfs/bafybeiafc4qxgwqackmdqif6eboyffg356rtwtpil7frz4m3ren3b7ztim" height="300" alt="GM_Quest"/>
                                </div>
                                <div style={{height: "240px", width: "400px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between", flexFlow: "column wrap", fontSize: "14px"}}>
                                    {/*<div>
                                        <div className="bold">REWARDS</div>
                                        <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "24px"}} className="bold">
                                            <div style={{marginRight: "10px", color: "#fff"}}>5</div>
                                            <img src="https://gateway.commudao.xyz/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="30px" alt="$BBQ"/>
                                        </div>
                                    </div>*/}
                                    <div>
                                        <div className="bold">QUEST DETAIL</div>
                                        <div style={{marginTop: "10px", color: "#fff"}} className="bold">Just say GM and go to craft BBQ!</div>
                                        <div style={{marginTop: "10px"}} className="bold">GM STREAKS: {gmStreak}</div>
                                    </div>
                                    {address !== null ?
                                        <>
                                            {canClaimBBQ ?
                                                <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={gmHandle}>GM</div> :
                                                <div style={{color: "rgb(0, 227, 180)"}} className="bold emp">Next to say GM in {nextClaimBBQ !== null ? nextClaimBBQ.toLocaleString('es-CL') : "..."}</div>
                                            }
                                        </> :
                                        <div style={{color: "rgb(0, 227, 180)"}} className="bold emp">Please connect wallet!</div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "20px 30px", margin: "10px", border: "1px solid rgb(54, 77, 94)", minWidth: "320px", height: "fit-content", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                            <div style={{width: "190px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>5 CMXP</div>
                                <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>Repeatable</div>
                            </div>
                            <div style={{width: "100%", padding: "10px 0", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">Play Ender Pottery</div>
                            <div style={{width: "100%", margin: "20px 0", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap"}}>
                                <div style={{height: "320px"}}>
                                    <img src="https://gateway.commudao.xyz/ipfs/bafybeic7noacvyhmlrca7g3sdiu2rgwxvdnp6zflrgukz2d3uizi727o4i" height="300" alt="Ender_Quest"/>
                                </div>
                                <div style={{height: "240px", width: "400px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between", flexFlow: "column wrap", fontSize: "14px"}}>
                                    <div>
                                        <div className="bold">QUEST DETAIL</div>
                                        <div style={{marginTop: "10px", color: "#fff"}} className="bold">Insert 1 JBC to be a participants of each epoch on <a style={{textDecoration: "none", color: "red"}} href="https://enderapp.vercel.app/" target="_blank" rel="noreferrer">Ender Pottery</a></div>
                                    </div>
                                    <div style={{color: "rgb(0, 227, 180)"}} className="bold emp"></div>
                                </div>
                            </div>
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "20px 30px", margin: "10px", border: "1px solid rgb(54, 77, 94)", minWidth: "320px", height: "fit-content", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                            <div style={{width: "160px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>500 CMXP</div>
                                <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>Once</div>
                            </div>
                            <div style={{width: "100%", padding: "10px 0", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">How To Win Frens!</div>
                            <div style={{width: "100%", margin: "20px 0", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap"}}>
                                <div style={{height: "320px"}}>
                                    <img src="https://gateway.commudao.xyz/ipfs/bafybeih32r7vflml3gjxeblqucqrkhj4lzwr3ngv6cocaucctfdb4ttupa" height="300" alt="PVP_Quest"/>
                                </div>
                                <div style={{height: "240px", width: "400px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between", flexFlow: "column wrap", fontSize: "14px"}}>
                                    <div>
                                        <div className="bold">Your Invited Frens</div>
                                        <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "24px"}} className="bold">
                                            <div style={{marginRight: "10px", color: "#fff"}}>{frens} 👽</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bold">QUEST DETAIL</div>
                                        <div style={{marginTop: "10px", color: "#fff"}} className="bold">Invite your friends to join and get reward!</div>
                                    </div>
                                    {address !== null ?
                                        <>
                                            {isJoin ?
                                                <div style={{width: "fit-content", color: "rgb(0, 227, 180)", borderRadius: "12px", border: "1px solid rgb(0, 227, 180)", padding: "15px 40px"}} className="bold">You have already joined CMDAO club 🎉</div> :
                                                <>
                                                    {isKYC ?
                                                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                                            <input style={{width: "250px", padding: "10px 40px", marginBottom: "20px"}} className="bold" type="string" placeholder="Enter Your Referer" value={ambass} onChange={(event) => {setAmbass(event.target.value)}}></input>
                                                            <div style={{background: "rgb(0, 227, 180)", display: "flex", justifyContent: "center", width: "170px", borderRadius: "12px", padding: "15px 40px", color: "rgb(0, 26, 44)"}} className="bold button" onClick={joinHandle}>Join CMDAO Club</div>
                                                        </div> :
                                                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} className="emp bold">You must KYC first!</div>
                                                    }
                                                </>
                                            }
                                        </> :
                                        <div style={{color: "rgb(0, 227, 180)"}} className="bold emp">Please connect wallet!</div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "20px 30px", margin: "10px", border: "1px solid rgb(54, 77, 94)", minWidth: "320px", height: "fit-content", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                            <div style={{width: "200px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>Sunset</div>
                            </div>
                            <div style={{width: "100%", padding: "10px 0", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">The Strongest That Survive</div>
                            <div style={{width: "100%", margin: "20px 0", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap"}}>
                                <div style={{height: "320px"}}>
                                    <img src="https://gateway.commudao.xyz/ipfs/bafybeidezamomag3kp3guyisqe3qihrvydkdbt5et3zsxtep5cgtb3lqqu" height="300" alt="PVP_Quest"/>
                                </div>
                                <div style={{height: "240px", width: "400px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between", flexFlow: "column wrap", fontSize: "14px"}}>
                                    <div>
                                        <div className="bold">REWARDS</div>
                                        <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                            <div style={{marginRight: "10px", color: "#fff"}}>Sunset</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bold">QUEST DETAIL</div>
                                        <div style={{marginTop: "10px", color: "#fff"}} className="bold">Win in one-hit fight to any challenger in Dungeon Arena</div>
                                        <div style={{marginTop: "10px", color: "#fff"}} className="bold">(Required 0.1 GWEI $JASP for each claim)</div>
                                    </div>
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} className="bold emp">Stay tuned for more quest!</div>
                                </div>
                            </div>
                        </div>

                        <div style={{background: "rgb(0, 26, 44)", padding: "20px 30px", margin: "10px", border: "1px solid rgb(54, 77, 94)", minWidth: "320px", height: "fit-content", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap"}} className="nftCard">
                            <div style={{width: "200px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <div className="pixel" style={{padding: "5px 10px", borderRadius: "16px", border: "1px solid #fff", color: "#fff"}}>Sunset</div>
                            </div>
                            <div style={{width: "100%", padding: "10px 0", borderBottom: "1px solid rgb(54, 77, 94)", textAlign: "left", color: "#fff", fontSize: "22px"}} className="bold">Guardian Of The Multiverse</div>
                            <div style={{width: "100%", margin: "20px 0", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap"}}>
                                <div style={{height: "320px"}}>
                                    <img src="https://gateway.commudao.xyz/ipfs/bafybeicszhyqiwqf7hg5ztvqpt2w7kfkvq2pq5m4jph4alraqu2qyg3t6i" height="300" alt="PVP_Quest2"/>
                                </div>
                                <div style={{height: "240px", width: "400px", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "space-between", flexFlow: "column wrap", fontSize: "14px"}}>
                                    <div>
                                        <div className="bold">REWARDS</div>
                                        <div style={{marginTop: "10px", width: "fit-content", display: "flex", flexDirection: "row", fontSize: "28px"}} className="bold">
                                            <div style={{marginRight: "10px", color: "#fff"}}>Sunset</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bold">QUEST DETAIL</div>
                                        <div style={{marginTop: "10px", color: "#fff"}} className="bold">Keep your bounty $JDAO higher than 20 as long as you can in Dungeon Arena</div>
                                        <div style={{marginTop: "10px", color: "#fff"}} className="bold">(Required 1.0 GWEI $JASP for each claim)</div>
                                    </div>
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} className="bold emp">Stay tuned for more quest!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default QuesterOasis