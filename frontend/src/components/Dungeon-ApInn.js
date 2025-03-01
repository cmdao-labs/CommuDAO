import React from 'react'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { ethers } from 'ethers'
import { ThreeDots, Oval } from 'react-loading-icons'

const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const dunANGB = '0x59c1C2f5FA76DB933B97b7c54223129e2A398534'
const starLab = '0x7A7Bc613e93aD729141D4BbB94375b5aD19d0Cbf'
const acNft = '0x526A70be985EB234c3f2c4933aCB59F6EB595Ed7'
const acUpgrade = '0x58AE9c64F0367cAcE006438af2E9E889F69051c4'
const apDunNft = '0x853beB37aBAfA021818B9f66e5333E657Ceb29d0'
const uniEnchanter = '0x2A7F88d4eACD6dbE8C255B54F8015eF40F5cfDE2'
const cmdaoName = '0x9f3adB20430778f52C2f99c4FBed9637a49509F2'
const questAmbass = '0x467eF538C90434D4F69cF8A8F40cd71a96e8424e'
const vabagToken = '0x495d66c9Fd7c63807114d06802A48BdAA60a0426'
const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')

const ApInn = ({ config, setisLoading, navigate, callMode, txupdate, setTxupdate, setisError, setErrMsg, acUpgradeABI, uniEnchanterABI, erc721Abi, erc20Abi, questAmbassABI, cmdaoNameABI, dunAngbABI }) => {
    let { address, chain } = useAccount()
    if (address === undefined) {
        address = null
    }
    const { open } = useAppKit()
    const [nft, setNft] = React.useState([])
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [angbBalance, setAngbBalance] = React.useState(0)
    const [starBalance, setStarBalance] = React.useState(0)
    const [rank, setRank] = React.useState([])
    const [rank2, setRank2] = React.useState([])
    const [rank3, setRank3] = React.useState([])
    const [rank4, setRank4] = React.useState([])

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)
        const acnftSC = new ethers.Contract(acNft, erc721Abi, providerJBC)
        const apDunSC = new ethers.Contract(apDunNft, erc721Abi, providerJBC)
        const angbFarmSC = new ethers.Contract(dunANGB, dunAngbABI, providerJBC)
        const vabagUsageSC = new ethers.Contract(vabagToken, erc20Abi, providerJBC)

        const thefetch = async () => {
            const data = address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: acNft,
                        abi: erc721Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: cmjToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: dunANGB,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: starLab,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: apDunNft,
                        abi: erc721Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                ],
            }) : [{result: 0}, {result: 0}, {result: 0}, {result: 0}, {result: 0}, ]

            const cmjBal = data[1].result
            const angbBal = data[2].result
            const starBal = data[3].result
            const nftbal = data[0].result
            let count = 0
            let nfts = []
            let yournft = []
            let walletRemoveDup = []
            if (address !== null) {
                const walletFilter = await acnftSC.filters.Transfer(null, address, null)
                const walletEvent = await acnftSC.queryFilter(walletFilter, 2337707, "latest")
                const walletMap = await Promise.all(walletEvent.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup = walletMap.filter((obj, index) => walletMap.indexOf(obj) === index)
            }
            const data2 = address !== null ? await readContracts(config, {
                contracts: walletRemoveDup.map((item) => (
                    {
                        address: acNft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [item],
                        chainId: 8899
                    }
                ))
            }) : null
            for (let i = 0; i <= walletRemoveDup.length - 1 && count < nftbal && address !== null; i++) {
                if (data2[i].result.toUpperCase() === address.toUpperCase()) {
                    yournft.push({Id: String(walletRemoveDup[i])})
                    count++
                }
            }
            for (let i = 0; i <= yournft.length - 1; i++) {
                const nftipfs = await readContract(config, {
                    address: acNft,
                    abi: erc721Abi,
                    functionName: 'tokenURI',
                    args: [yournft[i].Id],
                    chainId: 8899
                })
                const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                const nft = await response.json()
                nfts.push({
                    Col: 1,
                    Id: Number(yournft[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: null,
                    Count: null
                })
            }
            const nftbal2 = data[4].result
            let yournft2 = []
            let count2 = 0
            let walletRemoveDup2 = []
            if (address !== null) {
                const walletFilter2 = await apDunSC.filters.Transfer(null, address, null)
                const walletEvent2 = await apDunSC.queryFilter(walletFilter2, 2768084, "latest")
                const walletMap2 = await Promise.all(walletEvent2.map(async (obj) => String(obj.args.tokenId)))
                walletRemoveDup2 = walletMap2.filter((obj, index) => walletMap2.indexOf(obj) === index)
            }
            const data3 = address !== null ? await readContracts(config, {
                contracts: walletRemoveDup2.map((item) => (
                    {
                        address: apDunNft,
                        abi: erc721Abi,
                        functionName: 'ownerOf',
                        args: [item],
                        chainId: 8899
                    }
                ))
            }) : null
            for (let i = 0; i <= walletRemoveDup2.length - 1 && count2 < nftbal2 && address !== null; i++) {
                if (data3[i].result.toUpperCase() === address.toUpperCase()) {
                    yournft2.push({Id: String(walletRemoveDup2[i])})
                    count2++
                }
            }
            for (let i = 0; i <= yournft2.length - 1; i++) {
                const nftipfs = await readContract(config, {
                    address: apDunNft,
                    abi: erc721Abi,
                    functionName: 'tokenURI',
                    args: [yournft2[i].Id],
                    chainId: 8899
                })
                const response = await fetch(nftipfs.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"))
                const nft = await response.json()
                nfts.push({
                    Col: 2,
                    Id: Number(yournft2[i].Id),
                    Name: nft.name,
                    Image: nft.image.replace("ipfs://", "https://gateway.commudao.xyz/ipfs/"),
                    Description: nft.description,
                    Attribute: nft.attributes,
                    RewardPerSec: null,
                    Count: null
                })
            }
            if (nfts.length === 0) { nfts.push(null) }

            const data2_0 = await readContract(config, {
                address: questAmbass,
                abi: questAmbassABI,
                functionName: 'registCount',
                chainId: 8899
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
                        chainId: 8899
                    }
                ))
            })
            const dekyc = ['0xee95ab10EEa1ec932a8541E478d5a63F12e82457', '0x500Fca064b8Eed97d0b2581904f3264408438423', '0xfCe0959Ddcc52210c2ade9bae64b8DD0a09770C3', '0x6562e421dAA15d48AD1072B7a15611E2B3E34238', '0x56E1aF963606983C74E41267e71cD19e7c86ae3E', '0x79B949415bADf6c050cf4e3c56114619C28a9Df2', '0x7ec9932e7De1Ca2dC93A4EdF382ddF2e5D50a1E3', '0x5f3760471fed0E232a86B2026b3236B1EeC2B697', '0x2089dc77c29fDa025622d7281e8F36c0b0b43ee6', '0xB462F623cC1F4b28cdFCA706FdF7402d185b8181', '0x553D1D355A6Aa0Eb64cd5F2F06D0cD733CD95e1d', '0xB073ce42FF2BF382774171f6d9Ca4718564c62A9', '0xED64Cc3083236AE043ed5be4B6673a5226EF78Bf', '0x0DE460035Fa8db0eFb01ad3eC442c2d901B8984C', '0x124AE673A82450489C122d8cBD408acfd23eddB2', '0x1C3Bd4A2E0cAEf1FB502cb3425c33D4A8A6Fd16F', '0x5d7111D9d7B4f82EFA8b0f01bb78d1c43855d3Db', '0x7EB3Bb6e039ebD8DF4801c93e44DA8A7a0BA180d', '0x6dDAd73CF2132981EdEcf9eDB2f4d6b74c081e31', '0xC07a9d01d2ffF30118343b4C7851212d7057a2bE', '0x9B4FBC71543d2320E1C111fcc62823A4Abeb7435', '0xb7872272Af0472A204FE7Fc263912580afdf7f44', '0x923D403a323cCF1b818017478d8ECa7163ab70E4', '0xBEE42C26397496e95eFcfeb5Bbc61f390F392f09', '0x6420295933eF61CA185a836C7C83eAd68c9345E2', '0x6b20125175Fbadb1d09CBc55Fb5604bcA1d159C3', '0xB601bBfaE6A33fb9af6Cd1A4d6642F1CAbb51aCe', '0xced763248D42c453bDdEb3C0480F1D487b600665', '0x803a1d956A526067afaAd0EDCb9f82D864FE7b0e', '0x267234Ce76034D7F707E9b4A67112F03FbE33fBB', '0x759BB243e5e8EA9beD084bC713cF93237182e4D1', '0x801033605EE87DF6ceb88f73c18687520d3c1528', '0xf7db393fBCb87857e81B5CA34cF5F81F27ffaF1d', '0x76F7285973756fAcFe111e06d3C0646988AAd0a4', '0x4E3f662fE793eEB956ebB515E690fF3ca8b859f7', '0xED4ba5a3C6fD95678ae91524Ba310a50840E81b5', '0xcDF72B378B17c3D40D3C3750b21AC613AD9899fd', '0x1005244a4794b2c9911d6fA65678b670d6bc141b', '0xb30904B1eBe5FCE3816fEA8d94E919C0854A7286', '0xd60Cae6AeA8a74CC3eF7505B24a40cE94233d977', '0xA71CF5B79a5aa95e923c2fD8aE62D08d2BCbA39A', '0x1253A3D7fFbedb4D408CF26Ac567f6090f5cdb41', '0x21bBFf900D09d8e3110fFB1A8504662a97cC3763', '0x729370Cb6B64d5d27Ba73Dc52a884c5CBf896f8f', '0xf65f98794798fDB65BD65aB67485Fc9bca4F1fa1', '0x32c47F2989Aa97977540Be786601466C18794820', '0xdA29b8b038F55BE6Fa6Fe670Fa897147b9a48Fa6', '0xf347471df7B7C14608f7b27Caf2E5cf83162d3eD', '0x4C4BC3a884171b208Fe80A105D3Be90D5B4a9688', '0xB367AD17c133e9D80F9B1bD72efB8C2aeA53DF12', '0x3a0d50FdF839275Ec66d336edb1fD666DF538eA0', '0x89B37eB684D8e475aA9246a46387bc2e67790D26', '0x5A4170baD389E8cC44c454F4495EFA1e5C2F14eC', '0xc0f8c2b6D8af5FA2204469A00EAa4F4b8b93aE8b', '0x440A35c9c33038c645c80E2D1Dc69a4Bb428aBaD', '0xc8B812318E2E390539727da2B308218da6330689', '0xc6a0ef7843Cac4ae37C1770A575ce7D4f5990017', '0xBf39FAB586A0A4cdD175cFe96b32fAdD8d8478Bf', '0x0e3b6bBf54F6ED5a3922f765443AE22767FFa570', '0x0AF7ECab093507568da3e372bCe683B7b1f41f64', '0xF6f6A67fF04a763e1C431e830ab37428c5648572', '0x5c77bc7e658af87F920D12975d9EEC9cf9F00100', '0x93F18e78df8c2c96CBF114EDf082Bb41Ca1D6233', '0x1854E30786ceb0964E46A82383cb170f4474E1e9', '0xFc11279dfDa70F180614588789aa553573FB59A5', '0xfC14D4866b642153c7a28Afdaf313419682f902F', '0x4d15f333F2E2029B0f4611e9e205aF0411489eAe', '0xAbCBa9ba55a0701f9E5211604DC6723e585d0e03', '0x325c6dfacb3f146EF82FAF89AC5A4e7B1Ea5baFB', '0xd80Eb72cC2e3C6Ce5037a06dFd0637c2D4feE013', '0x057a35f02F77a8DEDfe8313771164381242DEa3A', '0x36E31B975363ACe0e9E07Fe1d4bd9974B6d6ede2', '0xd68d77f16c61cD1712aD884DFCd3cd13bAAFcFC3', '0xbcB4be032f6Ba5d9Aa051817D29e172972462EC8', '0x14E00591A18f317FCB3310579c33231F6Af5b09D', '0x4482E983863159c4d8d7eecBdecB62dCEd4e2A4D', '0xF49CA788432C07DBc223505Cc23550a74feb8c37', '0x5359aBbBA2f73078Bb15eF6f73362f00accB7a4F', '0x30f564A4960FE3F191f4c9821314c6bD515b6656', '0xD32B045E805D224578E4f6D2f2a4A65739598b05', '0x8C279902D7cFD3c822ee7413C75A27b7159C3598', '0xDDf6FA0dE3D5f5b1C413fc82A762d559D8e713D3', '0x43f591061e0c77f6cc4B2f6539c4e8A1f9aFFaa9', '0x8Db409ca4D11aE7855e73f4f0E48EdF37E957183', '0x7B1dc39AfB909964Cea5D6652d0468625CCA781F', '0xdC221e1acAB5cFdFFeE5B34b9024f9F03147e20d', '0xdcEA2FD2fc80559DC5D2DcB1C66e437591e5b9A6', '0x98dB84A93cf9E69eA09806777386f07d70CD069a', '0xDDe8436124F63992B384dDdf4f98888a12022786', '0x1CA3089936E69dcA47d5814f8073D4935369444F', '0x17A61477977FD1dAd570BF164924Cab27f4f70DC', '0x09438B9cd1E4CfD3E207b5Bc0adF649711b3bbaE', '0x7568D7E7598adA3BE09241e5DCBcaf5835047436', '0x9af7C542A5cdd53CB9A632D5579551Ce70A093e4', '0x647CF1233d1a3974715946Ec39bb1DD74B0Dc260', '0xecC07c826437eCdc940963f636Ca8319D3a59296', '0xEA4C844d2769dFd1F5D5906BDac6Aaa343127F1D', '0x4ED36b0EACB6E48FB78b89b035d6f83C60Cce366', '0x96eD5193A3563FeA53b690B0f157FB3e761203Dd', '0x8aA0ABF59c013297A03cFc2d94364Eae9747C977', '0xF7898BA2a40c6e07d0e931bB385f2071ffD7084A', '0x7aa6402e57916a1Eaff3D424538D189789254B23', '0x668bd67c282C88eCba09c16b5201c83E6F6C6384', '0xC6dA021547A9f81fb1189657f5F3c1557FEc3550', '0xd781CE26451E85C4C4F39BB65136334C7Ed176E4', '0x106184b6f2E6BBfA8d20a9cCFFa13444c638a1d4', '0xfC35Bf976ccfdccFbaa4F8E4e3d64E74cB66D083', '0xCF2b1538D3Bee72aA27900DB00e614e08944d2ab', '0xe1D7f39558A2b96E50ECd69436DB8A7dA8b48830', '0x57Cc121074c19E6fbF0259d625a4E7a18443E21B', '0x496b30Bc28DaF49d156562790db98340e0da8eB8', '0x34aE4283541aB7491f0992cEA0F7F42839257850', '0x8cEC4Da5857b6FD1eEdd805A7399f5c4210021C9', '0xB45329c18566A5f6443278FeA04B0FF8a01f12a1', '0x03b7532dc393d1aF619B498B64B2C8Cb790B874E', '0xDCC9025AFC70c72026d50F0D6F27CcCE31C8dbcf', '0xA11bb45f8A406698A209E6c48AfA7720E970366F', '0xdB943eC07B2F49469cC8121BB5b268eA5D62887B', '0x22a45031870028df27253655D1dA9e9688fF6890', '0xb2eC09e7B04E63C8544d100b365CD924B6E36f2c', '0x0B5F72057f3D5e9d89c11C8bF9791fCdD4eAb14E', '0x2742b7062e9a3b63F16b6736A9B64b668B2bed39', '0xdC7C483c42a9ba50350C9f7b116808ac474Bb146', '0xfF22F618f2aFc6C353E949fCDE473a694e188bc8', '0xE438208D4B40414374BC1F7430c54e41680D56A5', '0x206c4C84c3c625Ed1d055fFe66f4bCeb012B0AdB', '0xEE16583d9d73f6584Aa677D037797C0078486Ae2', '0x50A69432b87aE3Ad1e3d413EDd1775F9F6Df3384', '0x0127C0c2AB5Af1100Ac6D4ac3C51972039cc010F', '0xf47090681CD5FAD47f6257D2a7565c4Db2BDF75E', '0x67cB6d54187E6496632dd501E3FdDb388329F4Ef', '0xf0C7C69d6F1c388cc507eE045c09f8F80b7B5CCb', '0x0dEf5e4A392e9eE0C81506c29A290607c146CA20', '0x64115AcA8c0223C0F8dB9E66e6470016A5481Db6', '0xdD47d3e65F6d7a5098474Ad3Aaab06CB441C3A3E', '0xD0157eF87E81fD44ceFa1F4874a244E42097D3a2', '0x087720BA0729dECF5AcB2B73cC77F403657A29ed', '0x0404533532636F6B142715b601edFbC9122ed91C', '0xbaa641685B87d3F79e3E267ac50743581aF15B42', '0x34b6940bfEf39B834A0715354b2032B9958e90aD', '0x62e76F5aEDA165776f17e466f7b20250b4db344D', '0xba91D40585B3714C74D0C48FcabEe59Cd1b26C8B', '0x075356b8DF870dBc05e1A848b934C6B27D47f7f8', '0x7CA2d9c2926204ac685665DD4d6FAB58DfF1ce89', '0x3379Ec9C2636376F07fF7CF8BF741EcA2A4B8913', '0x2E0AF8bb3133dE12Beb67980305bEd35D69A9d9b', '0x6CaE3746E425441F1Edb8d6fc563EA5B74517e2F', '0x0422bcA7A631Cbc260Bca2975A1AB40ceB0318E7', '0x042e630eB2A2F17F23006900ffF72515A66C34E8', '0xBFC9a9f1965a484451f05cecE780567df7D30cb6', '0x422753f23638fCEB97B220b2c78f702B91C26119', '0xa5e862a3745FBD8F31782bBCAC7a8B8930d838cF', '0x0dE9072c4a0Bf6bF66C0C194Bf8a88a6DcD71C8A', '0x594eAE3B79411Eb807b6B82661B8cAbbC455313B', '0x4C20178fd965983981a4Dc9640131415FB1511B0', '0xF3C5eCaca13C25BdD911E0a09ec9F48387eF1E46', '0xC014AE12556A4E22Dd74E81D7321EA299c7f8B67', '0xe5C40d9566966220965C58A07b327B39315C2a20', '0x489716ea77e27C9B8640E5e46cBcACe0f9c6c8dF', '0xa7e88d7662ddFD494b572938F75997134c670C35', '0x666f19299A0b7E1EF6cd1B42a25B0a22449872e7', '0x16E724bDc099C331F85a52E7132D5E539201691B', '0x682EC22c7De223db7BC498f0B13a311857137447', '0x2564443EcE12e7cd1d9338f932F0277E4C5f45af', '0x09aE7328dCb157B068acf8703e0c76090FDF5048', '0x334939e42a67Ad44367F3fAa6a288e15fe7A8D05', '0x710Ca14740eE62D03b554a0cB9fBdA48bE0DCF78', '0x246708D27a14ADf36f8513C08d2AD81EB109947F', '0x842734b5E9B819f1b7b4047D408f2e6E74fecE60', '0x7b136808D0f6d325466Df1008109120a56D236e6', '0x3e0742c729Ba551E101dA4FC5DFfF36D5F9c1b68', '0x9C59d4B591aE4216876B89b4687f199Ea5dfD0E0', '0x419EDE85e70166fF9CDc53c5507689f591536b4e', '0x7e5980a62D227D62C212C1409184d258F14e00b3', '0x2E8C63c9b13a4b014B19454f87d11f17F4E568B3', '0x87F997783AA4fE57A0f2Bf4829AfEDF85f003BEa', '0x0E84d9cB07cD9AA33635c3153Bc95FBE68703E81', '0x9cC2507D7Dc790977E30CAa3982C7884550044D1', '0x58a1d72ec8E6f0F03f93c0f475377a198A235A9C', '0x5053d4260D763DC07f7B8049cf0014E64E5F1EF6', '0x89764F12bA0028a1614e64c87d5892c2E94087D6', '0x4Cf1ab474F02A69D07EBd3EB58237b204caFFAd2', '0x22763079241E75C52192c52d694beaFD3e09C6a3', '0xb0436C372bF140cdd89AC8d2ad9522a9308CB4a0', '0x74F1430c9E42e2DCE649da6432107572a78D56D8', '0xf2be4F198F3E2D4aAC6C251c796F2Fad406e1A77', '0xc7656628e4aFeb00979f9F4832bA9d1C31F3A3BD', '0x5f1804ed99C638BDeE7ccd361f054646EDAfdD05', '0x17eD2B61e2F30Cbe7CD1bD8e1Aa0A1D6643c8Ae7', '0x896467f7F66655DB3762c653618a76B68f4b8fAC', '0x3c46f4b4363bd1ea1ccB4E929661F9c9F0eD1185', '0x44e5C9f323060ae1577c64732a7A64292f642630', '0xd444BD1fd5c0529328d5a1f830A1E68d9798F9f7', '0xF1FCf1CCE851818b5cD9dB3659fDAa9c0b59Ba59', '0x034B9D8f27Ee1595ee8B371Cf759F3233EAEee63', '0x6591D7eaF58cBEc5De3e7236c36Fe788A46c7E94', '0x85aA4A56352AD5Dd204F896201d2c58eF134929e', '0x4456dbF88059E45c6F8420EE1622166CE86d054b', '0x45df0966127CC340937cbF326D86cd4c9D7EbAE2', '0x46548e91ef64F3a5a6d026330f768af700017589', '0xA3E08Ac16ea8cC815E9da9dD9B10A4885F91e091', '0x163f53Cc363C354A1162A1e3054053eA6b370D60', '0x7aaCCDfF97a6f70e5272CD071549959D6eCb673A', '0xFf896233087760aa3069D15423BE90a50fa1b38A', '0x5c6BbaEd7B94Dc2aFF7734802A305088e2135765', '0x2cd323EC24B567FfFC52c88d8Ab53Ad603224f9D', '0x849410D3D1089ece96dCe513EE1944Df7b56E06c', '0x97A7592AA1047c3f52894593378237b3303ac086', '0xfEd824C62b357d7d9c62591EB938B0e446b6C3e8', '0x746559E229FC5BF21F99667Cc3393f0824E1d9A9', '0x87279c3b2198F4a2a8Bdb3f52B3E72EcBD490d87', '0x0ee32f3cbf9CFE2289172A216D2E4ffa8Eeabdd0', '0xF7EAa37D9004271A3f0037ff671693D07FBea928', '0x69c5dB1f35a952Ec58eAA975AC9a4f2Abb1CBa24', '0x5E953b2BB1aCff907CBf96A8840F77Bc51094c5e', '0x9269bb85E87e402F35D92b266E9C9A6Cbc2B2aB8', '0x775B259397a27AcFC518D9c28BEF47E025EdaF4e', '0xeb19BFB054173101087390C35DE06eb1eFf4C1e4', '0xB1f638f35C514912d1C53F9c277f2EE918a3AC2C', '0xB6CA015dd09B5Cf04a20e103bE5AAE341a4e8Eed', '0xF8E20228a9CC29a95185404360cdCDe56a0F26ca', '0xa4b353a345EAd25B94D1C15CA91a1397f6045e03', '0xe43E950184F24b72bc780C99F6B8E880B38A9F26', '0x8c26761B47aA22C8B0A5DCc8aFCEfceacdA0839a', '0x0caF678C8AF4F2723ca2114277cF77A854d5b77C', '0xf8E29D7d2cf6943a7eD612454b54D448d5A2b928', '0xc976Bccc886973B752152512FF5179aD5DFd7184', '0x5758028A349FE654e6d44fD44A01d8e9501e53ae', '0x76476BE9299460aCC58a728222d6709f245cFA10', '0x2334438FA00F20287b821262463745b053B6bEaC', '0xcE325668076A146EFB1e2207C490FcEFd890398f', '0x7Cc1B8a23778C44380dB749ca2D35173EDc02707', '0xbC69F4618B4cd750aFEF04c8d0B44fD77d09A536', '0x089606083aa3a3e69917f4a89b0334De8d6f49Fe', '0x04633c858237eb7E6985bb182Dc4eE7e07e6B774', '0xFF7704494604c985CC311A83A0BC4DCFcbA0ecD3', '0xb3b97A72c83d599948ecC8151FBfDA19aAb6290e', '0xd36Ab05dcF3Cbc74c64957db6cE6367733e995d7', '0xCB5A26088B19A4C52569FddbF40d808ae4a5d89f', '0xEb45BE31956Bf575F4C9383Aaec11E042DD52868', '0xA7Ab3187B4C144869192D93C50DB3cB8067Cf9CD', '0x775A48372fb47D25382C4C9729234f647EF644D2', '0xe57327d85b6d171DfdD86C55d47216923A530e93', '0x3Bb31129bE10950F8396BB3755a193941590E07c', '0x6fb1777e3D5cD57373f9a2324231af773A4Fcb7c', '0x5C3615423E9c6Dd0D436983349c5Ca0Cab5D1393', '0xCACab90B7A4C527b38E72777c07E251E60e564D6', '0x3203aBfA54F6bA7E9566970f8D46198F320E0432', '0xc39086Dd91eB17e806b81445A539edf23bA50A9F', '0x4f61a02c19C25210AD01A91B920125c163c39fd6', '0x20b8F803B1727Cb11CBc92B3949d86E4a079da92', '0x6eDEB7E495d5D4397eB9bB00F70558ABAAAfacB3', '0xbD179b14D4E55d470BF3e104110AF0B88398E69a', '0xe08F1070Bc209c72BD500D3b6a6d4076134cF6dE', '0x5cd54F166222490c185be57f95478386c0A352C7', '0xabEfE6093E5d3D1D1455D4E33a608d4Fb1B8CC8F', '0xbdd795E66bcc857313b21e5df460294367dA63c5', '0xb6Bbf2815dCE1CC192c8e2e554C62fa326Bee809', '0x06F82FE06032328A268812b01f9A0AcfFB9F653D', '0x98DDD47DC20A1a19f3511Acf2834B64512661364', '0xb5B9292156490338fEC1C91E277d7305BB3F60ac', '0x68B11b29EfeF6946EB5B1C5223b24822cB31fE58', '0x929D02e927FDa0B249BD6fc0Ea4a1915Cfa5AAcB', '0x21b16Ba1eD4D94c66682cD6Aac43a482eA57022C', '0x6E68F64f8754344e0082cF00a299a2d237B95014', '0xBf4850E4e8d6CD2319B8808b65bEdf7Cb15358d4', '0x622B2cc5fb114650c7293FEc01c3C732395E3268', '0x6D8732C5c9E466674274fcbe9F3CE330963CEE16', '0x7a40f4df5343E1d02d7DbABF2B6415669860D606']
            const nameArr = []
            for (let i = 0; i <= data2_00.length - 1; i++) {
                let isDekyc = false
                for (let ii = 0; ii <= dekyc.length - 1; ii++) {
                    if (data2_00[i].result[0].toUpperCase() === dekyc[ii].toUpperCase()) {
                        isDekyc = true
                        break
                    }
                }
                if (!isDekyc) {
                    nameArr.push(data2_00[i].result[0])
                }
            }
            const data2_001 = await readContracts(config, {
                contracts: nameArr.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'yourName',
                        args: [item],
                        chainId: 8899
                    }
                ))
            })
            const nameArr2 = []
            for (let i = 0; i <= Number(nameArr.length - 1); i++) {
                nameArr2.push(Number(data2_001[i].result))
            }
            const data2_0011 = await readContracts(config, {
                contracts: nameArr2.map(item => (
                    {
                        address: cmdaoName,
                        abi: cmdaoNameABI,
                        functionName: 'tokenURI',
                        args: [item],
                        chainId: 8899
                    }
                ))
            })
            const nameArr3 = []
            for (let i = 0; i <= Number(nameArr.length - 1); i++) {
                nameArr3.push(data2_0011[i].result)
            }
            const data2_1 = await readContracts(config, {
                contracts: nameArr.map((item) => (
                    {
                        address: dunANGB,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [item],
                        chainId: 8899
                    }
                )),
            })
            const angbtotal = []
            for (let i = 0; i <= Number(nameArr.length - 1); i++) {
                angbtotal.push(data2_1[i].result)
            }
            const dataANGB = nameArr.map((item, i) => {
                return {
                    addr: item,
                    name: nameArr3[i] !== undefined ? nameArr3[i] : item.slice(0, 4) + "..." + item.slice(-4),
                    apxp: Number(ethers.utils.formatEther(angbtotal[i])).toFixed(3)
                }
            })
            const spend1Filter = await angbFarmSC.filters.Claimed(null, null, null)
            const spend1Event = await angbFarmSC.queryFilter(spend1Filter, 4985367, 'latest')
            const spend1Map = await Promise.all(spend1Event.map(async (obj) => {return {from: String(obj.args.staker), value: Number(ethers.utils.formatEther(obj.args.rewardAmount))}}))
            const spend1Merged = spend1Map.reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                   prev[curr.from.toUpperCase()].value += curr.value
                } else {
                   prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})
            const spend1RemoveDup = []
            for (let i = 0; i <= nameArr.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(spend1Merged).length -1; i2++) {
                    if (nameArr[i].toUpperCase() === Object.values(spend1Merged)[i2].from.toUpperCase()) {
                        Object.values(spend1Merged)[i2].name = nameArr3[i] !== undefined ? nameArr3[i] : Object.values(spend1Merged)[i2].from.slice(0, 4) + "..." + Object.values(spend1Merged)[i2].from.slice(-4)
                        spend1RemoveDup.push(Object.values(spend1Merged)[i2])
                    }
                }
            }

            const spend2Filter = await vabagUsageSC.filters.Transfer(null, '0x0000000000000000000000000000000000000001', null)
            const spend2Event = await vabagUsageSC.queryFilter(spend2Filter, 4985367, 'latest')
            const spend2Map = await Promise.all(spend2Event.map(async (obj) => {return {from: String(obj.args.from), value: Number(ethers.utils.formatEther(obj.args.value))}}))
            const spend2Merged = spend2Map.reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                   prev[curr.from.toUpperCase()].value += curr.value
                } else {
                   prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})

            const spend2RemoveDup = []
            for (let i = 0; i <= nameArr.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(spend2Merged).length -1; i2++) {
                    if (nameArr[i].toUpperCase() === Object.values(spend2Merged)[i2].from.toUpperCase() && Object.values(spend2Merged)[i2].from.toUpperCase() !== ('0x0Da584E836542Fc58E7c09725cF6dbDfeA22f427').toUpperCase()) {
                        Object.values(spend2Merged)[i2].name = nameArr3[i] !== undefined ? nameArr3[i] : Object.values(spend2Merged)[i2].from.slice(0, 4) + "..." + Object.values(spend2Merged)[i2].from.slice(-4)
                        spend2RemoveDup.push(Object.values(spend2Merged)[i2])
                    }
                }
            }

            const spend31Filter = await acnftSC.filters.Transfer('0x87BAC0BCBaadF9B7d24385b1AaaEbeDEb60a1A0a', null, null)
            const spend31Event = await acnftSC.queryFilter(spend31Filter, 4985367, 'latest')
            const spend31Map = await Promise.all(spend31Event.map(async (obj) => {return {from: String(obj.args.to), value: 10}}))
            const spend32Filter = await apDunSC.filters.Transfer('0x09e6a0A03afa27438c3f507de82b5f6061Ae1643', null, null)
            const spend32Event = await apDunSC.queryFilter(spend32Filter, 4985367, 'latest')
            const spend32Map = await Promise.all(spend32Event.map(async (obj) => {return {from: String(obj.args.to), value: 10}}))
            const spend33Filter = await apDunSC.filters.Transfer('0x87A612709b36b575103C65a90cB3B16Cac2BC898', null, null)
            const spend33Event = await apDunSC.queryFilter(spend33Filter, 4985367, 'latest')
            const spend33Map = await Promise.all(spend33Event.map(async (obj) => {return {from: String(obj.args.to), value: 20}}))
            const spend3Merged = spend31Map.concat(spend32Map, spend33Map).reduce((prev, curr) => {
                if (prev[curr.from.toUpperCase()]) {
                   prev[curr.from.toUpperCase()].value += curr.value
                } else {
                   prev[curr.from.toUpperCase()] = curr
                }
                return prev
            }, {})
            const spend3RemoveDup = []
            for (let i = 0; i <= nameArr.length -1; i++) {
                for (let i2 = 0; i2 <= Object.values(spend3Merged).length -1; i2++) {
                    if (nameArr[i].toUpperCase() === Object.values(spend3Merged)[i2].from.toUpperCase()) {
                        Object.values(spend3Merged)[i2].name = nameArr3[i] !== undefined ? nameArr3[i] : Object.values(spend3Merged)[i2].from.slice(0, 4) + "..." + Object.values(spend3Merged)[i2].from.slice(-4)
                        spend3RemoveDup.push(Object.values(spend3Merged)[i2])
                    }
                }
            }
            if (dataANGB.length === 0) { dataANGB.push(null) }
            if (spend1RemoveDup.length === 0) { spend1RemoveDup.push(null) }
            if (spend2RemoveDup.length === 0) { spend2RemoveDup.push(null) }
            if (spend3RemoveDup.length === 0) { spend3RemoveDup.push(null) }

            return [nfts, cmjBal, angbBal, starBal, dataANGB, spend1RemoveDup, spend2RemoveDup, spend3RemoveDup ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then(result => {
            setNft(result[0])
            setCmjBalance(ethers.utils.formatEther(String(result[1])))
            setAngbBalance(ethers.utils.formatEther(String(result[2])))
            setStarBalance(ethers.utils.formatEther(String(result[3])))
            setRank(result[4])
            setRank2(result[5])
            setRank3(result[6])
            setRank4(result[7])
        })

    }, [config, address, erc20Abi, erc721Abi, questAmbassABI, cmdaoNameABI, dunAngbABI, txupdate])

    const enchantAcHandle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        try {
            const starAllow = await readContract(config, {
                address: starLab,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, acUpgrade],
            })
            if (Number(ethers.utils.formatEther(starAllow)) < 1) {
                let { request } = await simulateContract(config, {
                    address: starLab,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [acUpgrade, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const nftAllow = await readContract(config, {
                address: acNft,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== acUpgrade.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: acNft,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [acUpgrade, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: acUpgrade,
                abi: acUpgradeABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid],
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

    const enchantHandle = async (_nftid, _enchantindex) => {
        setisLoading(true)
        let token1 = '0x0000000000000000000000000000000000000000'
        let token2 = '0x0000000000000000000000000000000000000000'
        let token1Amount = 0
        let token2Amount = 0
        if (_enchantindex >= 100000 && _enchantindex <= 100009) {
            token1 = dunANGB
            token1Amount = 1
        } else {
            token1 = dunANGB
            token1Amount = 0.25
        }
        try {
            const cmjAllow = await readContract(config, {
                address: cmjToken,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, uniEnchanter],
            })
            if (Number(ethers.utils.formatEther(cmjAllow)) < 1) {
                let { request } = await simulateContract(config, {
                    address: cmjToken,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [uniEnchanter, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            const token1Allow = await readContract(config, {
                address: token1,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [address, uniEnchanter],
            })
            if (Number(ethers.utils.formatEther(token1Allow)) < token1Amount) {
                let { request } = await simulateContract(config, {
                    address: token1,
                    abi: erc20Abi,
                    functionName: 'approve',
                    args: [uniEnchanter, ethers.constants.MaxUint256],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            if (token2Amount !== 0) {
                const token2Allow = await readContract(config, {
                    address: token2,
                    abi: erc20Abi,
                    functionName: 'allowance',
                    args: [address, uniEnchanter],
                })
                if (Number(ethers.utils.formatEther(token2Allow)) < token2Amount) {
                    let { request } = await simulateContract(config, {
                        address: token2,
                        abi: erc20Abi,
                        functionName: 'approve',
                        args: [uniEnchanter, ethers.constants.MaxUint256],
                    })
                    let h = await writeContract(config, request)
                    await waitForTransactionReceipt(config, { hash: h })
                }
            }
            const nftAllow = await readContract(config, {
                address: apDunNft,
                abi: erc721Abi,
                functionName: 'getApproved',
                args: [_nftid],
            })
            if (nftAllow.toUpperCase() !== uniEnchanter.toUpperCase()) {
                let { request } = await simulateContract(config, {
                    address: apDunNft,
                    abi: erc721Abi,
                    functionName: 'approve',
                    args: [uniEnchanter, _nftid],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: uniEnchanter,
                abi: uniEnchanterABI,
                functionName: 'enchant',
                args: [_enchantindex, _nftid],
                gas: 3000000,
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
                    <div className="pixel" style={{fontSize: "75px", width: "fit-content"}}>AP INN</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="https://gateway.commudao.xyz/ipfs/bafybeifrqslsoes7swzc3bnjl72x6sgsewcnx2w3zjsm5pzma7ku2onr6a" height="200" alt="AP-INN" />
                </div>
            </div>

            {address !== null && chain !== undefined && chain.id !== 8899 ?
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                        <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "fit-content", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "36px"}} className="emp">MISMATCH CHAIN!</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px"}}>Please switch your network to JIBCHAIN L1.</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => open({ view: 'Networks' })}>SWITCH NETWORK</div>
                        <div className="button" style={{marginTop: "10px", width: "50%", background: "gray"}} onClick={() => {callMode(0); navigate('/');}}>BACK TO HOME</div>
                        </div>
                    </div>
                </div> :
                <div style={{width: "90%", display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", overflow: "scroll"}} className="noscroll">
                    <div style={{maxWidth: "100%", textAlign: "left", marginTop: "50px", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <div style={{width: "250px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Tokens</div>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll pixel">
                            <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                                <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" width="22" alt="$CMJ"/>
                                <div style={{marginLeft: "10px"}}>{Number(cmjBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                            <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                                <img src="https://gateway.commudao.xyz/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" width="22" alt="$ANGB"/>
                                <div style={{marginLeft: "10px"}}>{Number(angbBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                            <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px 20px 0", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                                <img src="https://gateway.commudao.xyz/ipfs/bafybeideve73vg6mtnwzjjmrol66idxoe3orfxrjbdairhwbumyj3a46eu" width="22" alt="$STAR"/>
                                <div style={{marginLeft: "10px"}}>{Number(starBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: "left", margin: "20px 0 80px 0", minHeight: "600px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <div style={{padding: "50px", backdropFilter: "blur(20px)", border: "none", width: "940px", maxWidth: "75%", height: "300px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", fontSize: "14px"}} className="nftCard">
                            <div style={{width: "98%", fontSize: "30px"}}>March 2025 Prize Pool 🎁</div>
                            <div style={{width: "98%", marginTop: "10px", display: "flex", flexFlow: "column wrap", justifyContent: "space-between"}}>
                                <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                    <div>Top $ANGB Holder</div>
                                    <div>5 STAR</div>
                                </div>
                                <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                    <div>Top $ANGB Farmer</div>
                                    <div>5 STAR</div>
                                </div>
                                <div style={{width: "220px", marginRight: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                    <div>Top $VABAG Burner</div>
                                    <div>5 STAR</div>
                                </div>
                                <div style={{width: "220px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                    <div>Top Spender</div>
                                    <div>5 STAR</div>
                                </div>
                            </div>
                            <div style={{width: "98%", marginTop: "10px"}}>Snapshot on the last block of the month before 0.00 AM.<br></br>Rewards will allocated to top 5 for each leaderboard.</div>
                            <div style={{width: "98%", marginTop: "10px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                                <div style={{width: "300px", marginRight: "50px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderBottom: "1px dotted"}}>
                                    <div>Become Top 1-5</div>
                                    <div>To win prize pool</div>
                                </div>
                            </div>
                        </div>
                        <div style={{width: "98%", marginBottom: "40px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                            <div style={{padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "335px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                                <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $ANGB Holder</div>
                                {rank.length > 0 ?
                                    <>
                                        {rank[0] !== null ?
                                            <div style={{width: "100%", minHeight: "550px"}}>
                                                {rank.slice(0).sort((a, b) => {return b.apxp-a.apxp}).map((item, index) => (
                                                    <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                        <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                            <div>{index+1}</div>
                                                            <a style={{textDecoration: "none", color: "#000", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/daemon-world/" + item.addr} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                        </div>
                                                        <div>{item.apxp} $ANGB</div>
                                                    </div>
                                                ))}
                                            </div> :
                                            <></>
                                        } 
                                    </> :
                                    <div style={{width: "100%", height: "inherit"}}>
                                        <Oval stroke="#ff007a" strokeWidth="5px" />
                                    </div>
                                }
                            </div>
                            <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "335px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                                <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $ANGB Farmer of the month</div>
                                {rank2.length > 0 ?
                                    <>
                                        {rank2[0] !== null ?
                                            <div style={{width: "100%", minHeight: "550px"}}>
                                                {rank2.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                                    <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                        <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                            <div>{index+1}</div>
                                                            <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/daemon-world/" + item.from} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                        </div>
                                                        <div>{Number(item.value).toFixed(3)} $ANGB</div>
                                                    </div>
                                                ))}
                                            </div> :
                                            <></>
                                        }
                                    </> :
                                    <div style={{width: "100%", height: "inherit"}}>
                                        <Oval stroke="#ff007a" strokeWidth="5px" />
                                    </div>
                                }
                            </div>
                            <div style={{background: "rgb(0, 26, 44)", padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "335px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                                <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top $VABAG Burner</div>
                                {rank3.length > 0 ?
                                    <>
                                        {rank3[0] !== null ?
                                            <div style={{width: "100%", minHeight: "550px"}}>
                                                {rank3.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                                    <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                        <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                            <div>{index+1}</div>
                                                            <a style={{textDecoration: "none", color: "#fff", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/daemon-world/" + item.from} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                        </div>
                                                        <div>{Number(item.value).toFixed(3)} $VABAG</div>
                                                    </div>
                                                ))}
                                            </div> :
                                            <></>
                                        }
                                    </> :
                                    <div style={{width: "100%", height: "inherit"}}>
                                        <Oval stroke="#ff007a" strokeWidth="5px" />
                                    </div>
                                }
                            </div>
                            <div style={{padding: "25px", border: "1px solid rgb(54, 77, 94)", minWidth: "335px", width: "25%", height: "500px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                                <div style={{width: "100%", fontSize: "22.5px", color: "rgb(0, 227, 180)", marginBottom: "30px"}} className="pixel emp">Top Spender</div>
                                {rank4.length > 0 ?
                                    <>
                                        {rank4[0] !== null ?
                                            <div style={{width: "100%", minHeight: "550px"}}>
                                                {rank4.slice(0).sort((a, b) => {return b.value-a.value}).map((item, index) => (
                                                    <div style={{width: "350px", marginRight: "50px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px dotted"}} key={index}>
                                                        <div style={{width: "200px", display: "flex", flexDirection: "row"}}>
                                                            <div>{index+1}</div>
                                                            <a style={{textDecoration: "none", color: "#000", marginLeft: "10px"}} href={"https://commudao.xyz/dungeon/daemon-world/" + item.from} target="_blank" rel="noreferrer"><div className="bold">{item.name}</div></a>
                                                        </div>
                                                        <div>{Number(item.value).toFixed(2)} $JUSDT</div>
                                                    </div>
                                                ))}
                                            </div> :
                                            <></>
                                        }
                                    </> :
                                    <div style={{width: "100%", height: "inherit"}}>
                                        <Oval stroke="#ff007a" strokeWidth="5px" />
                                    </div>
                                }
                            </div>
                        </div>

                        <div style={{marginTop: "20px", fontSize: "16px", letterSpacing: "1px"}} className="bold">Upgradable NFTs <a className="emp" style={{textDecoration: "underline", marginLeft: "20px"}} href="https://nft-angel-plus.gitbook.io/nft-angel-plus/nft-blockchain-project/gamefi-nft-angel-plus-the-dungeon/nft-upgrade-mining-power" target="_blank" rel="noreferrer">📖 The Angel Plus NFTs Guidebook</a></div>
                        {nft !== undefined && nft.length > 0 ?
                            <>
                                {nft[0] !== null ?
                                    <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                                        {nft.map((item, index) => (
                                            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}} key={index}>
                                                {/*
                                                ░█████╗░░█████╗░
                                                ██╔══██╗██╔══██╗
                                                ███████║██║░░╚═╝
                                                ██╔══██║██║░░██╗
                                                ██║░░██║╚█████╔╝
                                                ╚═╝░░╚═╝░╚════╝░
                                                */}
                                                {item.Col === 1 && String(item.Id).slice(0, 3) !== "401" &&
                                                    <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                        <div className="emp pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                    <source src={item.Image} type="video/mp4" />
                                                                </video>
                                                                <div style={{width: "150px"}}>{item.Name}</div>
                                                            </div>
                                                            <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                            {String(item.Id).slice(0, 3) === "101" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeifsfdjwelvtzg6nurhgterfyfw6fyvoessptriej4yip4vq3xt6ze' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}1</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "102" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeig6nfhwxb6apgwjpina3w3ltlfss2vgmn7e6loguf3db7z6yp6ofe' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "103" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeidvfdvw6mc2pln5wo7hstyl2pa6mwkvpdqi2onuam3uht6fnt23ui' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "104" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeiesy2tb3rk2xfnhe6sxpeoerwqfpelrjmeypisgr23ci7ifokjm5q' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "105" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeifqigkbjup3auor6puownvf2myhsxgogvp2rypacgpwi75juvqsae' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -4)}C +0</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "201" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeigso6gthqx37ok66bhtn4iwva5a3dvfummbdgfj5kjfosusqohfpu' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}1</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "202" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeidfn7btigokkuont2mjbwk377hp3ipgdffkqwp7etwhghvb7opspq' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "203" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeid37zvuwqumg45v4saisweceuxo7ukw4pa7rineghonfcndaa3yju' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "204" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeig3ilnnbbu5leurojtvtj44md6vt7paubqcgzddggmvnrj2qs7pzy' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "205" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeia22spf73265h7zwq3rlydayzhmksbmhpjn2ppncnpbuswigadj2e' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -4)}B +0</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "301" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeihs2ydvod22xncp3264pvybcxi6njid7ncqbrz2e4qkl6mresb6yq' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}1</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "302" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeifc7ffb7n2ytc7lfohcy3k6qgkfsz5t5jwbwpd552pkztamm7uuli' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "303" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeid2jukb33diwjv4p6ia4sg6zkdrd6rhbcy6nemlvnqhel3zesoqni' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "304" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeigvvbgvxsluftnkedcw2vwfaw5rarbhyonrwsvqh2rr3du7ndxzwa' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                                </div>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "305" &&
                                                                <div>
                                                                    <video muted loop width="120" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                                                                        <source src='https://gateway.commudao.xyz/ipfs/bafybeigvqwas5ph2qwfmlo5riqvnul7stnw5fbg2igqto55fgkqijciezi' type="video/mp4" />
                                                                    </video>
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -4)}A +0</div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            {String(item.Id).slice(0, 3) === "101" &&
                                                                <>
                                                                    <div>
                                                                        <div>D0</div>
                                                                        <div style={{width: "150px"}}>100 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>D1</div>
                                                                        <div style={{width: "150px"}}>1000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "102" &&
                                                                <>
                                                                    <div>
                                                                        <div>D1</div>
                                                                        <div style={{width: "150px"}}>1000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>D2</div>
                                                                        <div style={{width: "150px"}}>2000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "103" &&
                                                                <>
                                                                    <div>
                                                                        <div>D2</div>
                                                                        <div style={{width: "150px"}}>2000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>D3</div>
                                                                        <div style={{width: "150px"}}>3000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "104" &&
                                                                <>
                                                                    <div>
                                                                        <div>D3</div>
                                                                        <div style={{width: "150px"}}>3000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>D4</div>
                                                                        <div style={{width: "150px"}}>4000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "105" &&
                                                                <>
                                                                    <div>
                                                                        <div>D4</div>
                                                                        <div style={{width: "150px"}}>4000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>C0</div>
                                                                        <div style={{width: "150px"}}>5000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "201" &&
                                                                <>
                                                                    <div>
                                                                        <div>C0</div>
                                                                        <div style={{width: "150px"}}>5000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>C1</div>
                                                                        <div style={{width: "150px"}}>6000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "202" &&
                                                                <>
                                                                    <div>
                                                                        <div>C1</div>
                                                                        <div style={{width: "150px"}}>6000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>C2</div>
                                                                        <div style={{width: "150px"}}>7000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "203" &&
                                                                <>
                                                                    <div>
                                                                        <div>C2</div>
                                                                        <div style={{width: "150px"}}>7000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>C3</div>
                                                                        <div style={{width: "150px"}}>8000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "204" &&
                                                                <>
                                                                    <div>
                                                                        <div>C3</div>
                                                                        <div style={{width: "150px"}}>8000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>C4</div>
                                                                        <div style={{width: "150px"}}>9000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "205" &&
                                                                <>
                                                                    <div>
                                                                        <div>C4</div>
                                                                        <div style={{width: "150px"}}>9000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>B0</div>
                                                                        <div style={{width: "150px"}}>10000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "301" &&
                                                                <>
                                                                    <div>
                                                                        <div>B0</div>
                                                                        <div style={{width: "150px"}}>10000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>B1</div>
                                                                        <div style={{width: "150px"}}>11000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "302" &&
                                                                <>
                                                                    <div>
                                                                        <div>B1</div>
                                                                        <div style={{width: "150px"}}>11000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>B2</div>
                                                                        <div style={{width: "150px"}}>12000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "303" &&
                                                                <>
                                                                    <div>
                                                                        <div>B2</div>
                                                                        <div style={{width: "150px"}}>12000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>B3</div>
                                                                        <div style={{width: "150px"}}>13000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "304" &&
                                                                <>
                                                                    <div>
                                                                        <div>B3</div>
                                                                        <div style={{width: "150px"}}>13000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>B4</div>
                                                                        <div style={{width: "150px"}}>14000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {String(item.Id).slice(0, 3) === "305" &&
                                                                <>
                                                                    <div>
                                                                        <div>B4</div>
                                                                        <div style={{width: "150px"}}>14000 pow</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>A0</div>
                                                                        <div style={{width: "150px"}}>15000 pow</div>
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                        <div style={{marginTop: "10px", width: "350px"}}>
                                                            <div className="pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                                Enchanted resource
                                                            </div>
                                                            <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafybeideve73vg6mtnwzjjmrol66idxoe3orfxrjbdairhwbumyj3a46eu" height="18" alt="$STAR"/>
                                                                <div style={{margin: "0 5px"}}>1</div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                            className="pixel button"
                                                            onClick={() => {
                                                                let arg = 0
                                                                if (String(item.Id).slice(0, 3) === "101") {
                                                                    arg = 1
                                                                } else if (String(item.Id).slice(0, 3) === "102") {
                                                                    arg = 2
                                                                } else if (String(item.Id).slice(0, 3) === "103") {
                                                                    arg = 3
                                                                } else if (String(item.Id).slice(0, 3) === "104") {
                                                                    arg = 4
                                                                } else if (String(item.Id).slice(0, 3) === "105") {
                                                                    arg = 5
                                                                } else if (String(item.Id).slice(0, 3) === "201") {
                                                                    arg = 6
                                                                } else if (String(item.Id).slice(0, 3) === "202") {
                                                                    arg = 7
                                                                } else if (String(item.Id).slice(0, 3) === "203") {
                                                                    arg = 8
                                                                } else if (String(item.Id).slice(0, 3) === "204") {
                                                                    arg = 9
                                                                } else if (String(item.Id).slice(0, 3) === "205") {
                                                                    arg = 10
                                                                } else if (String(item.Id).slice(0, 3) === "301") {
                                                                    arg = 11
                                                                } else if (String(item.Id).slice(0, 3) === "302") {
                                                                    arg = 12
                                                                } else if (String(item.Id).slice(0, 3) === "303") {
                                                                    arg = 13
                                                                } else if (String(item.Id).slice(0, 3) === "304") {
                                                                    arg = 14
                                                                } else if (String(item.Id).slice(0, 3) === "305") {
                                                                    arg = 15
                                                                }
                                                                enchantAcHandle(item.Id, arg)
                                                            }}
                                                        >
                                                            UPGRADE
                                                        </div>
                                                    </div>
                                                }

                                                {/*
                                                ██╗░░██╗███████╗██████╗░░█████╗░
                                                ██║░░██║██╔════╝██╔══██╗██╔══██╗
                                                ███████║█████╗░░██████╔╝██║░░██║
                                                ██╔══██║██╔══╝░░██╔══██╗██║░░██║
                                                ██║░░██║███████╗██║░░██║╚█████╔╝
                                                ╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░
                                                */}
                                                {item.Col === 2 && String(item.Id).slice(0, 3) === "100" && Number(item.Id) % 100000 !== 1100 &&
                                                    <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                        <div className="emp pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name}</div>
                                                            </div>
                                                            <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                            {Number(item.Id) % 100000 === 100 &&
                                                                <div>
                                                                    <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name} +1</div>
                                                                </div>
                                                            }
                                                            {(Number(item.Id) % 100000 === 200 || Number(item.Id) % 100000 === 400 || Number(item.Id) % 100000 === 600 || Number(item.Id) % 100000 === 800 || Number(item.Id) % 100000 === 1000) &&
                                                                <div>
                                                                    <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}{(Number(item.Id) % 100000) / 100}</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 300 &&
                                                                <div>
                                                                    <img src='https://gateway.commudao.xyz/ipfs/bafybeia5odwzbuvz2obwvrau5jasz4vdalveei4vjypohy6hghy3i5py6i' width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 500 &&
                                                                <div>
                                                                    <img src='https://gateway.commudao.xyz/ipfs/bafybeiaoaneuefkfhvx4rhn4dclohrwettfn2amuedykhuc5o2t4dtpohu' width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 700 &&
                                                                <div>
                                                                    <img src='https://gateway.commudao.xyz/ipfs/bafybeiej4wn5irshklfurszij65hwzquap7xh2lzvx46fxkkjhcryz6zua' width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 900 &&
                                                                <div>
                                                                    <img src='https://gateway.commudao.xyz/ipfs/bafybeift6v2ao2t4uyj6lghhnjh4xb7glphvmloyqdkeie2nu3hisf2pf4' width="120" alt="Can not load metadata." />
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}9</div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <div>+{((Number(item.Id) % 100000) / 100) - 1}</div>
                                                                <div style={{width: "150px"}}>{Number(item.Id) % 100000} power</div>
                                                            </div>
                                                            <div>
                                                                <div>+{(Number(item.Id) % 100000) / 100}</div>
                                                                <div style={{width: "150px"}}>{(Number(item.Id) % 100000) + 100} power</div>
                                                            </div>
                                                        </div>
                                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                        <div style={{marginTop: "10px", width: "350px"}}>
                                                            <div className="pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                                Enchanted resource
                                                            </div>
                                                            <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" height="18" alt="$ANGB"/>
                                                                <div style={{margin: "0 5px"}}>{(Number(item.Id) % 100000) / 1000}</div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                <div style={{margin: "0 5px"}}>1</div>
                                                            </div>
                                                        </div>
                                                        <div className="pixel" style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate : 1/1
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                        <div
                                                            style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                            className="pixel button"
                                                            onClick={() => {
                                                                let arg = null
                                                                if (Number(item.Id) % 100000 === 100) {
                                                                    arg = 0
                                                                } else if (Number(item.Id) % 100000 === 200) {
                                                                    arg = 1
                                                                } else if (Number(item.Id) % 100000 === 300) {
                                                                    arg = 2
                                                                } else if (Number(item.Id) % 100000 === 400) {
                                                                    arg = 3
                                                                } else if (Number(item.Id) % 100000 === 500) {
                                                                    arg = 4
                                                                } else if (Number(item.Id) % 100000 === 600) {
                                                                    arg = 5
                                                                } else if (Number(item.Id) % 100000 === 700) {
                                                                    arg = 6
                                                                } else if (Number(item.Id) % 100000 === 800) {
                                                                    arg = 7
                                                                } else if (Number(item.Id) % 100000 === 900) {
                                                                    arg = 8
                                                                } else if (Number(item.Id) % 100000 === 1000) {
                                                                    arg = 9
                                                                }
                                                                enchantHandle(item.Id, 100000 + arg)
                                                            }}
                                                        >
                                                            UPGRADE
                                                        </div>
                                                    </div>         
                                                }

                                                {/*
                                                ░█████╗░██████╗░  ████████╗██╗░░██╗███████╗  ██████╗░██╗░░░██╗███╗░░██╗░██████╗░███████╗░█████╗░███╗░░██╗
                                                ██╔══██╗██╔══██╗  ╚══██╔══╝██║░░██║██╔════╝  ██╔══██╗██║░░░██║████╗░██║██╔════╝░██╔════╝██╔══██╗████╗░██║
                                                ███████║██████╔╝  ░░░██║░░░███████║█████╗░░  ██║░░██║██║░░░██║██╔██╗██║██║░░██╗░█████╗░░██║░░██║██╔██╗██║
                                                ██╔══██║██╔═══╝░  ░░░██║░░░██╔══██║██╔══╝░░  ██║░░██║██║░░░██║██║╚████║██║░░╚██╗██╔══╝░░██║░░██║██║╚████║
                                                ██║░░██║██║░░░░░  ░░░██║░░░██║░░██║███████╗  ██████╔╝╚██████╔╝██║░╚███║╚██████╔╝███████╗╚█████╔╝██║░╚███║
                                                ╚═╝░░╚═╝╚═╝░░░░░  ░░░╚═╝░░░╚═╝░░╚═╝╚══════╝  ╚═════╝░░╚═════╝░╚═╝░░╚══╝░╚═════╝░╚══════╝░╚════╝░╚═╝░░╚══╝
                                                */}
                                                {item.Col === 2 && (String(item.Id).slice(0, 3) === "700" || String(item.Id).slice(0, 3) === "500" || String(item.Id).slice(0, 3) === "300" || String(item.Id).slice(0, 3) === "600" || String(item.Id).slice(0, 3) === "200" || String(item.Id).slice(0, 3) === "400") && Number(item.Id) % 100000 !== 1100 &&
                                                    <div style={{justifyContent: "space-around", padding: "30px", marginRight: "50px"}} className="nftCard">
                                                        <div className="emp pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            <div>
                                                                <img src={item.Image} width="120" alt="Can not load metadata." />
                                                                <div style={{width: "150px"}}>{item.Name}</div>
                                                            </div>
                                                            <i style={{marginTop: "10px", fontSize: "30px", margin: "2.5px 10px 2.5px 5px"}} className="fa fa-caret-right"></i>
                                                            {Number(item.Id) % 100000 === 250 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafybeidxnerdssvoads33qf5klz2gxx6c5f3pjkwleyyasxkr4d2fhddo4' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiavljudr364wnbra3glwvxx63emaawoti7o7uvdkfq6byre33k3by' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeifo6h2grxkhkhezqjpqj72dmwjwjumpglb75epnhkg5kmukkaegxa' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeidkwd67x7cuggzykl2s7az7adadu657hjq3rthvkb7wtjqyno4sxq' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeibwn7pyxxduc54giiujmc2lm2kv7twwcbxkmyrtm24d74wz4auryu' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeigzllo7efbaroebrlp6uyi7j6xobyolgreimecdz2zumk5ft5scjy' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name} +1</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 300 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafkreib5o6ewz4uyjs4tnnwrwmc65phsro6iqkjo5zfny56huw76ew4jwu' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeid57rinqklnxolfiro5yq2izqgr43k7tpo5trmewstp6h7aurp3ma' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeidex5aijsbmwidybwzjpbbnyxwmdpebehgmp2r5wlw3brg3c7zoeq' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeihal22c662yiosvtnrh7fsoqpie3jusfsqmpeo4jhwthineclx7q4' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeieh2jb2d527n4uummwxe7t36vjfhspv2opoxoqfrmxvzhziiukbs4' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeihnkzlzlddkvsdgbcq2umejivaznqmdohng3vccvauwyc2bu7vt4q' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}2</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 400 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafkreicfuyvprncafvvus4e7mpuqcmkqujznohke222tz5vzdqsnlqdvdu' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafkreifd45rhblhwe5qvkvpctaamqjdviijt4olae3266gosuw4mqgx7su' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeidwsyrf52coy3xxqlpw5thnqaaztsx7cdrwr2lwogzkp4gd4cbuwi' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafkreia4n6c2srsjbqv555tewpo5hjt575fw2l4cjfwk64sqcwcvpdrebe' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafkreieo765chiflk5msgydn5wxcmtqlf2sjfw5cuwpegnzzllyqhzcyci' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafkreiftgfwgvdmbluidz5umixhvx5epxqpprtx3tq2dr2qh3gouoscgku' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}3</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 500 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafkreictz33nfdbozdf67456m6ulo2mrcmsldpree744tyj7gsary42mge' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafkreihezeecmvuj6cgse2rnc2tbzqrzeadxliuc3zzy2wxpfog5yv3cau' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeicjghxuvreknriwduid7zw6zfsxj6px7te6m3ybpxhjglktldh5q4' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafkreiedkyysocf56q2ykmmkismzvmlsp73b3e4wnxn2usmpislxvbfdue' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafkreigutlmirjgjy6nwgluv3sk4y6noqmxkqbmf5qk4zoh4tayz42rqzq' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafkreiepekxjkzsd3xg425mcgnktf4m3y2d7xcqenzhkh7quawxhjnycxi' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}4</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 600 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafybeia52i47ftizdlnx77ekw7a3ncs2ahxiegxrlmci37a75vqcyyru6a' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeibbakqgfnshw3jyyvbmymkuf5pylzrzseksfoo2rdhry6p7rrcbaq' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiglsjsqn6bibwx6s2ehtawhqwroxsmasguayvdl7tlujmvkvgks2q' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiho3m6yi3t45ljtufnlmq6xnkeeb4oz5lwjt5okwt5xkgwegb36v4' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeidmncmt75ansjbsrkvk3ujhquemej5nlime3cn2rmpsdwb7zrzi3e' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeibg7nlydlf6wv5ar7fzxuevqxwnzt3m7hzh3bta3z5khfz34wna3e' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}5</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 700 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafybeibvhepypdky2enzjzlbqozpmwiq7wvuda2hah5g2umhefxudmn5iu' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiercameocvi6xiw5yuwvbhagk2ut7xa4pr3delbqg2fpfhsnwxwgu' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeidgpxrzly3nqltvc4j6u4erni444th65szq2wsjrv66mas5qmcm34' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeigk3yjgpmtlbwrj7wwd6wnaamzym6lzmbogorb7wpgfkhxvr3auw4' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeic25z3kgp4qkqnkuyohof5vwj5hmdace5d2acqfk5tcw3qt2wtfiq' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeigsluheodrvsyvrdwqpuyhabyicazpr5cb3zjrv3k4twj6awxnl2y' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}6</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 800 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafybeif7siidbof5pzqmnpd337sksfaqhxd3f5iazcvne2nxv6rsoh2zum' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeihzcpnug3w4jpqmoznarvxbpdjdpnzibj7a2bzvh2af3js3lk4ani' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeifjnuyqckv6aalnd6mocxx6537gfrfixx2cswdq5oyqnyflm6qyuu' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeibo5f5ceohspkwbgflpwcas5qfemgqtknpf4msuktkyaq7cxgvtji' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeifvnvbsb5ou7b2tijqag2hxbfyrum6kdywe4hq7eea3cx34vr5j34' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeigtt4qt7q2v4fyp6slkrl547aucsitljj6rpwcub5bhv237tp6zhu' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}7</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 900 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiaxzem2d65p43oy2l53jkmcycwmdrqerglw2qvu2otmzmkve2uw3a' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiacng6l2biwvphdlz3dqh6rknnjppanxdx2srvbrgfv67do3mi7wq' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeihmyw5fcjxcwv3afaefsv4twlkgmovozluiqiq3xvdr2tod6cztbi' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeicxcwrqutvfyjegcextgfq67txs7sg7dx33ck3huffeuq4x5ktmou' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeigevydzpebgfubwxoitzii5kfn64zma7npqd55j3cwnjp6w3hbm64' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeibwk3ijxpynuu2lar6vea2xf2ixh6nj2knbf5v62xqelak4k4hbxu' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}8</div>
                                                                </div>
                                                            }
                                                            {Number(item.Id) % 100000 === 1000 &&
                                                                <div>
                                                                    {String(item.Id).slice(0, 3) === "700" && <img src='https://gateway.commudao.xyz/ipfs/bafybeicqf3zmvxmazfgmgcxyuv64t2mckpgfzz6pc4mnplltb2pvv7ez7u' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "500" && <img src='https://gateway.commudao.xyz/ipfs/bafybeifkfw2p65zmr3gop3p2uegldghj6vk455ezg33pelyl7jc3kuca3y' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "300" && <img src='https://gateway.commudao.xyz/ipfs/bafybeic7c6pjxrge36iwwsvhiw4rdzy6z3exlea3mnnsjkupzfvcqojdk4' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "200" && <img src='https://gateway.commudao.xyz/ipfs/bafybeib5wpqecdu2s65k4gktw7gdqgyxgrlpv44pszxxzyo65knnjwbwqi' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "600" && <img src='https://gateway.commudao.xyz/ipfs/bafybeieg2gz5jgwjqpbihfy4pns6mwkjajcxiy3paxsciriz7wduzghhdq' width="120" alt="Can not load metadata." />}
                                                                    {String(item.Id).slice(0, 3) === "400" && <img src='https://gateway.commudao.xyz/ipfs/bafybeiaxljxw5nxp4gay4k3wtyra2axtird36gap6ekadxd2o5zaeqhx6i' width="120" alt="Can not load metadata." />}
                                                                    <div style={{width: "150px"}}>{item.Name.slice(0, -1)}9</div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="pixel" style={{marginTop: "10px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                                            {Number(item.Id) % 100000 === 250 &&
                                                                <>
                                                                    <div>
                                                                        <div>+0</div>
                                                                        <div style={{width: "150px"}}>250 power</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>+1</div>
                                                                        <div style={{width: "150px"}}>300 power</div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {Number(item.Id) % 100000 >= 300 &&
                                                                <>
                                                                    <div>
                                                                        <div>+{((Number(item.Id) % 100000) / 100) - 2}</div>
                                                                        <div style={{width: "150px"}}>{Number(item.Id) % 100000} power</div>
                                                                    </div>
                                                                    <div>
                                                                        <div>+{((Number(item.Id) % 100000) / 100) - 1}</div>
                                                                        <div style={{width: "150px"}}>{(Number(item.Id) % 100000) + 100} power</div>
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                        <div style={{width: "100%", borderBottom: "1px solid #dddade", marginTop: "10px"}}></div>
                                                        <div style={{marginTop: "10px", width: "350px"}}>
                                                            <div className="pixel">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-flask"></i>
                                                                Enchanted resource
                                                            </div>
                                                            <div style={{marginTop: "10px", display: "flex", flexDirection: "row"}} className="pixel">
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m" height="18" alt="$ANGB"/>
                                                                <div style={{margin: "0 5px"}}>
                                                                    {(Number(item.Id) % 100000 === 250 || Number(item.Id) % 100000 === 300) && '0.05'}
                                                                    {(Number(item.Id) % 100000 === 400 || Number(item.Id) % 100000 === 500) && '0.10'}
                                                                    {(Number(item.Id) % 100000 === 600 || Number(item.Id) % 100000 === 700) && '0.15'}
                                                                    {(Number(item.Id) % 100000 === 800 || Number(item.Id) % 100000 === 900) && '0.20'}
                                                                    {(Number(item.Id) % 100000 === 1000) && '0.25'}
                                                                </div>
                                                                <i style={{fontSize: "12px", margin: "5px 10px 5px 5px"}} className="fa fa-plus"></i>
                                                                <img src="https://gateway.commudao.xyz/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" height="18" alt="$CMJ"/>
                                                                <div style={{margin: "0 5px"}}>1</div>
                                                            </div>
                                                        </div>
                                                        <div className="pixel" style={{margin: "10px 0", width: "350px"}}>
                                                            <div className="emp">
                                                                <i style={{fontSize: "18px", marginRight: "5px"}} className="fa fa-gavel"></i>
                                                                Success rate :&nbsp;
                                                                {(Number(item.Id) % 100000 === 250 || Number(item.Id) % 100000 === 300 || Number(item.Id) % 100000 === 400) && '1/1'}
                                                                {(Number(item.Id) % 100000 === 500 || Number(item.Id) % 100000 === 600 || Number(item.Id) % 100000 === 700) && '1/2'}
                                                                {(Number(item.Id) % 100000 === 800 || Number(item.Id) % 100000 === 900) && '1/3'}
                                                                {(Number(item.Id) % 100000 === 1000) && '1/4'}
                                                            </div>
                                                            <div>(depend on parent blockhash calculation)</div>
                                                        </div>
                                                        <div
                                                            style={{background: "#67BAA7", textAlign: "center", borderRadius: "12px", padding: "10px 20px", width: "80px"}}
                                                            className="pixel button"
                                                            onClick={() => {
                                                                let arg = null
                                                                if (Number(item.Id) % 100000 === 250) {
                                                                    arg = 0
                                                                } else if (Number(item.Id) % 100000 === 300) {
                                                                    arg = 1
                                                                } else if (Number(item.Id) % 100000 === 400) {
                                                                    arg = 2
                                                                } else if (Number(item.Id) % 100000 === 500) {
                                                                    arg = 3
                                                                } else if (Number(item.Id) % 100000 === 600) {
                                                                    arg = 4
                                                                } else if (Number(item.Id) % 100000 === 700) {
                                                                    arg = 5
                                                                } else if (Number(item.Id) % 100000 === 800) {
                                                                    arg = 6
                                                                } else if (Number(item.Id) % 100000 === 900) {
                                                                    arg = 7
                                                                } else if (Number(item.Id) % 100000 === 1000) {
                                                                    arg = 8
                                                                }
                                                                let ind = null
                                                                if (String(item.Id).slice(0, 3) === "700") {
                                                                    ind = 0
                                                                } else if (String(item.Id).slice(0, 3) === "500") {
                                                                    ind = 100
                                                                } else if (String(item.Id).slice(0, 3) === "200") {
                                                                    ind = 200
                                                                } else if (String(item.Id).slice(0, 3) === "300") {
                                                                    ind = 300
                                                                } else if (String(item.Id).slice(0, 3) === "600") {
                                                                    ind = 400
                                                                } else if (String(item.Id).slice(0, 3) === "400") {
                                                                    ind = 500
                                                                }
                                                                enchantHandle(item.Id, 101000 + ind + arg)
                                                            }}
                                                        >
                                                            UPGRADE
                                                        </div>
                                                    </div>         
                                                }                                      
                                            </div>
                                        ))}
                                    </div> :
                                    <>
                                        {address !== null ?
                                            <div className="nftCard" style={{justifyContent: "center"}}>
                                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fas fa-scroll"></i>
                                                <div className="bold">No NFTs equipment to upgrade.</div>
                                            </div> :
                                            <div className="nftCard" style={{justifyContent: "center"}}>
                                                <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-sign-in"></i>
                                                <div className="bold">Please connect wallet to view your NFTs.</div>
                                            </div>
                                        }
                                    </>
                                }
                            </> :
                            <div style={{width: "300px", padding: "20px", margin: "20px"}}>
                                <ThreeDots fill="#5f6476" />
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default ApInn