import React from 'react'
import { ethers } from 'ethers'
import { fetchBalance, readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract, sendTransaction } from '@wagmi/core'
import { useAccount } from 'wagmi'

import Ammmerchant from  './Mall-Ammy'
import Ammmerchant2 from  './Mall-Jazzi'
import Ammmerchant3 from  './Mall-Degeno'
import Ammmerchant4 from  './Mall-Angelo'
import Ammmerchant5 from  './Mall-AutoTaomi'
const { ethereum } = window

const jusdtToken = "0x24599b658b57f91E7643f4F154B16bcd2884f9ac"
const cmjToken = "0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b"
const wjbcToken = '0xC4B7C87510675167643e3DE6EEeD4D2c06A9e747'
const jdaoToken = '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88'
const ctunaLab = "0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0"
const sx31Lab = '0xd431d826d7a4380b9259612176f00528b88840a7'
const swarLab = '0x5e18a8B78d5395371308C54719fead810Ce2aCd2'
const dunAngb = '0x59c1c2f5fa76db933b97b7c54223129e2a398534'
const taomeme = '0xdbCCc9F8920e7274eeC62e695084D3bCe443c3dd'
const iiLab = '0x523AA3aB2371A6360BeC4fEea7bE1293adb32241'
const dunEE = '0xF663c756b6D57724C3B41c8839aB9c7Af83c9751'
const gearToken = '0x0E2610730A3c42fd721B289BEe092D9AD1C76890'
const doijibToken = '0x7414e2D8Fb8466AfA4F85A240c57CB8615901FFB'
const woodToken = "0xc2744Ff255518a736505cF9aC1996D9adDec69Bd"
const bbqToken = '0x7004757e595409568Bd728736e1b0c79FDc94e1c'
const pzaLab = '0x09DcdCFc6C48803681a3422997c679E773656763'
const osToken = '0xAc5299D92373E9352636559cca497d7683A47655'
const dunCopper = '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841'
const silToken = '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f'
const goldToken = '0x7d5346E33889580528e6F79f48BdEE94D8A9E144'
const platToken = '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD'
const dunJasper = '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860'

const cmdaoMerchant = "0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D"
const cmdaoMerchantV105 = '0x09e6a0A03afa27438c3f507de82b5f6061Ae1643'
const cmdaoMerchantV2 = "0x87BAC0BCBaadF9B7d24385b1AaaEbeDEb60a1A0a"
const cmdaoMerchantKYC = "0xF67761e0E72fea7bD176686a242f1535879be8aB"
const cmdaoMerchantWL = '0x010EbE14315F976967E6aE408Af5881617b86E09'
const cmdaoGasha02 = '0x87A612709b36b575103C65a90cB3B16Cac2BC898'
const cmdaoPresale = '0xbf9C07f7223D09899c1BEC25f8Db559828166E78'

const kyc = '0xfB046CF7dBA4519e997f1eF3e634224a9BFf5A2E'

const Mall = ({ setisLoading, txupdate, setTxupdate, kycABI, ctunaLabABI, cmdaoMerchantABI, cmdaoMerchantKYCABI, cmdaoMerchantV2ABI, cmdaoMerchantWLABI, cmdaoGasha02ABI, ammyStdABI, angeloStdABI, cmdaoAmmNpcABI, erc20ABI, wjbcABI, presaleABI }) => {
    const { address } = useAccount()

    const [isWrappedModal, setIsWrappedModal] = React.useState(false)
    const [isSpecialModal, setIsSpecialModal] = React.useState(false)
    const [wrappedValue, setWrappedValue] = React.useState("")
    const [unwrappedValue, setUnwrappedValue] = React.useState("")

    const [sell1Remain, setSell1Remain] = React.useState(37)
    const [canbuy1, setCanBuy1] = React.useState(false)
    const [sell2Remain, setSell2Remain] = React.useState(22)
    const [canbuy2, setCanBuy2] = React.useState(false)

    const [sell4Remain, setSell4Remain] = React.useState(100)
    const [canbuy4, setCanBuy4] = React.useState(false)
    const [sell5Remain, setSell5Remain] = React.useState(100)
    const [canbuy5, setCanBuy5] = React.useState(false)
    const [sell6Remain, setSell6Remain] = React.useState(100)
    const [canbuy6, setCanBuy6] = React.useState(false)
    const [sell7Remain, setSell7Remain] = React.useState(100)
    const [canbuy7, setCanBuy7] = React.useState(false)
    const [sell8Remain, setSell8Remain] = React.useState(333)
    const [canbuy8, setCanBuy8] = React.useState(false)
    const [sell9Remain, setSell9Remain] = React.useState(1000)
    const [canbuy9, setCanBuy9] = React.useState(false)
    const [sell13Remain, setSell13Remain] = React.useState(333)
    const [canbuy13, setCanBuy13] = React.useState(false)
    const [sell15Remain, setSell15Remain] = React.useState(100)
    const [sell16Remain, setSell16Remain] = React.useState(100)
    const [sell17Remain, setSell17Remain] = React.useState(100)
    const [sell18Remain, setSell18Remain] = React.useState(300)
    const [canbuy18, setCanBuy18] = React.useState(false)
    const [sell19Remain, setSell19Remain] = React.useState(100)
    const [sell20Remain, setSell20Remain] = React.useState(100)
    const [sell21Remain, setSell21Remain] = React.useState(100)
    const [sell22Remain, setSell22Remain] = React.useState(100)
    const [sell24Remain, setSell24Remain] = React.useState(250)
    const [sell25Remain, setSell25Remain] = React.useState(250)
    const [sell26Remain, setSell26Remain] = React.useState(250)
    const [sell27Remain, setSell27Remain] = React.useState(250)
    const [sell28Remain, setSell28Remain] = React.useState(250)
    const [sell29Remain, setSell29Remain] = React.useState(250)
    const [sell30Remain, setSell30Remain] = React.useState(250)

    const [sell31Remain, setSell31Remain] = React.useState(55)
    const [sell32Remain, setSell32Remain] = React.useState(55)
    const [sell33Remain, setSell33Remain] = React.useState(55)
    const [sell34Remain, setSell34Remain] = React.useState(55)
    const [sell35Remain, setSell35Remain] = React.useState(55)
    const [sell36Remain, setSell36Remain] = React.useState(55)
    const [canbuy31, setCanBuy31] = React.useState(false)
    const [canbuy32, setCanBuy32] = React.useState(false)
    const [canbuy33, setCanBuy33] = React.useState(false)
    const [isWL6, setIsWL6] = React.useState(false)

    const [roll1Remain, setRoll1Remain] = React.useState(256)
    const [canroll1, setCanRoll1] = React.useState(false)
    const [roll2Remain, setRoll2Remain] = React.useState(256)
    const [roll3Remain, setRoll3Remain] = React.useState(256)
    const [roll4Remain, setRoll4Remain] = React.useState(256)
    const [canroll2, setCanRoll2] = React.useState(false)
    const [roll6Remain, setRoll6Remain] = React.useState(256)
    const [roll7Remain, setRoll7Remain] = React.useState(256)
    const [roll101Remain, setRoll101Remain] = React.useState(200)

    const [ctunaBalance, setCTunaBalance] = React.useState(0)
    const [sx31Balance, setSx31Balance] = React.useState(0)
    const [woodBalance, setWoodBalance] = React.useState(0)
    const [bbqBalance, setBbqBalance] = React.useState(0)
    const [pzaBalance, setPzaBalance] = React.useState(0)
    const [cuBalance, setCuBalance] = React.useState(0)
    const [silBalance, setSilBalance] = React.useState(0)
    const [goldBalance, setGoldBalance] = React.useState(0)
    const [platBalance, setPlatBalance] = React.useState(0)
    const [jaspBalance, setJaspBalance] = React.useState(0)
    const [osBalance, setOsBalance] = React.useState(0)
    const [jusdtBalance, setJusdtBalance] = React.useState(0)
    const [cmjBalance, setCmjBalance] = React.useState(0)
    const [jbcBalance, setJbcBalance] = React.useState(0)
    const [wjbcBalance, setWjbcBalance] = React.useState(0)
    const [swarBalance, setSwarBalance] = React.useState(0)
    const [angbBalance, setAngbBalance] = React.useState(0)
    const [jtaoBalance, setJtaoBalance] = React.useState(0)
    const [iiBalance, setIiBalance] = React.useState(0)
    const [eeBalance, setEeBalance] = React.useState(0)
    const [jdaoBalance, setJdaoBalance] = React.useState(0)
    const [gearBalance, setGearBalance] = React.useState(0)
    const [doijibBalance, setDoijibBalance] = React.useState(0)

    const [tokenselected, setTokenselected] = React.useState("DOIJIB");
    const [inputBuy, setInputBuy] = React.useState("")
    const [doijibRemain, setDoijibRemain] = React.useState(0)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        console.log("Connected to " + address)

        const thefetch = async () => {
            const jbcBal = address !== null && address !== undefined ?
                await fetchBalance({ address: address, }) :
                {formatted: 0}
            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: kyc,
                        abi: kycABI,
                        functionName: 'kyc',
                        args: [0, address],
                    },
                    {
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jusdtToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: ctunaLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: sx31Lab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: bbqToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunCopper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunJasper,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: pzaLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: jdaoToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'bought',
                        args: [address, 1],
                    },
                    {
                        address: osToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'bought',
                        args: [address, 2],
                    },
                    {
                        address: goldToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: wjbcToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: swarLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: silToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunAngb,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: taomeme,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: iiLab,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: dunEE,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: platToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: gearToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: cmdaoMerchantWL,
                        abi: cmdaoMerchantWLABI,
                        functionName: 'wl',
                        args: [address, 6],
                    },
                    {
                        address: doijibToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: woodToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                ],
            }) : [false, 0, 0, 0, 0, 0, 0, 0, 0, 0, true, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {result: 0}, {result: false}, {result: 0}, {result: 0},]
            
            const _isKYC = data[0].result
            const cmjBal = data[1].result
            const jusdtBal = data[2].result
            const ctunaBal = data[3].result
            const sx31Bal = data[4].result
            const bbqBal = data[5].result
            const cuBal = data[6].result
            const jaspBal = data[7].result
            const pzaBal = data[8].result
            const jdaoBal = data[9].result
            const isBought5 = data[10].result
            const osBal = data[11].result
            const isBought2 = data[12].result
            const goldBal = data[13].result
            const wjbcBal = data[14].result
            const swarBal = data[15].result
            const silBal = data[16].result
            const angbBal = data[17].result
            const jtaoBal = data[18].result
            const iiBal = data[19].result
            const eeBal = data[20].result
            const platBal = data[21].result
            const gearBal = data[22].result

            const _isWL6 = data[23].result

            const doijibBal = data[24].result
            const woodBal = data[25].result

            const data2 = await readContracts({
                contracts: [
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'sellList',
                        args: [2],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [3],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [4],
                    },
                    {
                        address: cmdaoMerchantKYC,
                        abi: cmdaoMerchantKYCABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [5],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [1],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [2],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [3],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [4],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [5],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [2],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [6],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [6],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [3],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [4],
                    },
                    {
                        address: cmdaoMerchantV2,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [5],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [8],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [6],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [9],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [2],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [3],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [10],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [4],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [5],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [6],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [7],
                    },
                    {
                        address: cmdaoMerchant,
                        abi: cmdaoMerchantABI,
                        functionName: 'sellList',
                        args: [11],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [8],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [9],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [10],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [11],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [12],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [13],
                    },
                    {
                        address: cmdaoMerchantV105,
                        abi: cmdaoMerchantV2ABI,
                        functionName: 'sellList',
                        args: [14],
                    },
                    {
                        address: cmdaoMerchantWL,
                        abi: cmdaoMerchantWLABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                    {
                        address: cmdaoMerchantWL,
                        abi: cmdaoMerchantWLABI,
                        functionName: 'sellList',
                        args: [2],
                    },
                    {
                        address: cmdaoMerchantWL,
                        abi: cmdaoMerchantWLABI,
                        functionName: 'sellList',
                        args: [3],
                    },
                    {
                        address: cmdaoMerchantWL,
                        abi: cmdaoMerchantWLABI,
                        functionName: 'sellList',
                        args: [4],
                    },
                    {
                        address: cmdaoMerchantWL,
                        abi: cmdaoMerchantWLABI,
                        functionName: 'sellList',
                        args: [5],
                    },
                    {
                        address: cmdaoMerchantWL,
                        abi: cmdaoMerchantWLABI,
                        functionName: 'sellList',
                        args: [6],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [7],
                    },
                    {
                        address: cmdaoGasha02,
                        abi: cmdaoGasha02ABI,
                        functionName: 'colList',
                        args: [101],
                    },
                    {
                        address: cmdaoPresale,
                        abi: presaleABI,
                        functionName: 'sellList',
                        args: [1],
                    },
                ],
            })
            
            const sell1Id = data2[0].result
            const sell2Id = data2[1].result
            const sell4Id = data2[3].result
            const sell5Id = data2[4].result
            const sell6Id = data2[5].result
            const sell7Id = data2[11].result
            const sell8Id = data2[12].result
            const sell9Id = data2[13].result
            // const sell10Id = data2[14].result
            // const sell11Id = data2[15].result
            // const sell12Id = data2[16].result
            const sell13Id = data2[17].result
            // const sell14Id = data2[19].result
            const sell15Id = data2[20].result
            const sell16Id = data2[21].result
            const sell17Id = data2[22].result
            const sell18Id = data2[23].result
            const sell19Id = data2[24].result
            const sell20Id = data2[25].result
            const sell21Id = data2[26].result
            const sell22Id = data2[27].result
            // const sell23Id = data2[28].result
            const sell24Id = data2[29].result
            const sell25Id = data2[30].result
            const sell26Id = data2[31].result
            const sell27Id = data2[32].result
            const sell28Id = data2[33].result
            const sell29Id = data2[34].result
            const sell30Id = data2[35].result

            const sell31Id = data2[36].result
            const sell32Id = data2[37].result
            const sell33Id = data2[38].result
            const sell34Id = data2[39].result
            const sell35Id = data2[40].result
            const sell36Id = data2[41].result

            const roll1 = data2[6].result
            const roll2 = data2[7].result
            const roll3 = data2[8].result
            const roll4 = data2[9].result
            const roll5 = data2[10].result
            const roll6 = data2[18].result
            const roll7 = data2[42].result
            const roll101 = data2[43].result
            const presale01 = data2[44].result

            const sell1remain = (410003800000 - (Number(sell1Id[2]) - 150)) / 100000
            const _canBuy1 = Number(ethers.utils.formatEther(String(ctunaBal))) >= 2500 ? true : false
            const sell2remain = (720061600000 - (Number(sell2Id[4]) - 250)) / 100000
            const _canBuy2 = _isKYC && !isBought2 && Number(ethers.utils.formatEther(String(bbqBal))) >= 40000 ? true : false
            const sell4remain = (130050100000 - (Number(sell4Id[2]) - 500)) / 100000
            const _canBuy4 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 20 ? true : false
            const sell5remain = (100540100000 - (Number(sell5Id[4]) - 100)) / 100000
            const _canBuy5 = _isKYC && !isBought5 && Number(ethers.utils.formatEther(String(bbqBal))) >= 40000 ? true : false
            const sell6remain = (1000010200000 - (Number(sell6Id[2]) - 100)) / 100000
            const _canBuy6 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 1 ? true : false
            const sell7remain = 101000399 - Number(sell7Id[3])
            const _canBuy7 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 10 ? true : false
            const sell8remain = (102033400000 - (Number(sell8Id[2]) - 8000)) / 100000
            const _canBuy8 = Number(ethers.utils.formatEther(String(jdaoBal))) >= 1000 ? true : false
            const sell9remain = 100001001 - Number(sell9Id[3])
            const _canBuy9 = Number(ethers.utils.formatEther(String(wjbcBal))) >= 500 ? true : false
            const _canBuy10 = false
            const sell11remain = 0
            const _canBuy11 = false
            const sell12remain = 0
            const _canBuy12 = false
            const sell13remain = (102100000000 - (Number(sell13Id[2]) - 4500)) / 100000
            const _canBuy13 = Number(ethers.utils.formatEther(String(osBal))) >= 5500 ? true : false
            const sell14remain = 0
            const _canBuy14 = false
            const sell15remain = (100010100000 - (Number(sell15Id[3]) - 100)) / 100000
            const sell16remain = (700010100000 - (Number(sell16Id[3]) - 250)) / 100000
            const sell17remain = (500010100000 - (Number(sell17Id[3]) - 250)) / 100000

            const sell18remain = (730060100000 - (Number(sell18Id[2]) - 10000)) / 100000
            const _canBuy18 = Number(ethers.utils.formatEther(String(bbqBal))) >= 100000000 ? true : false

            const sell19remain = (300010100000 - (Number(sell19Id[3]) - 250)) / 100000
            const sell20remain = (200010100000 - (Number(sell20Id[3]) - 250)) / 100000
            const sell21remain = (600010100000 - (Number(sell21Id[3]) - 250)) / 100000
            const sell22remain = (400010100000 - (Number(sell22Id[3]) - 250)) / 100000

            const sell23remain = 0
            const _canBuy23 = false

            const sell24remain = (100025100000 - (Number(sell24Id[3]) - 18800)) / 100000
            const sell25remain = (700025100000 - (Number(sell25Id[3]) - 18800)) / 100000
            const sell26remain = (300025100000 - (Number(sell26Id[3]) - 18800)) / 100000
            const sell27remain = (200025100000 - (Number(sell27Id[3]) - 18800)) / 100000
            const sell28remain = (500025100000 - (Number(sell28Id[3]) - 18800)) / 100000
            const sell29remain = (400025100000 - (Number(sell29Id[3]) - 18800)) / 100000
            const sell30remain = (600025100000 - (Number(sell30Id[3]) - 18800)) / 100000

            const sell31remain = (790005600000 - (Number(sell31Id[4]) - 45555)) / 100000
            const sell32remain = (390005600000 - (Number(sell32Id[4]) - 45555)) / 100000
            const sell33remain = (290005600000 - (Number(sell33Id[4]) - 45555)) / 100000
            const sell34remain = (490005600000 - (Number(sell34Id[4]) - 45555)) / 100000
            const sell35remain = (590005600000 - (Number(sell35Id[4]) - 45555)) / 100000
            const sell36remain = (690005600000 - (Number(sell36Id[4]) - 45555)) / 100000

            const _canBuy31 = Number(ethers.utils.formatEther(String(eeBal))) >= 444444 ? true : false
            const _canBuy32 = Number(ethers.utils.formatEther(String(iiBal))) >= 22222 ? true : false
            const _canBuy33 = Number(ethers.utils.formatEther(String(gearBal))) >= 999999999 ? true : false

            const roll1remain = Number(roll1[1])
            const roll2remain = Number(roll2[1])
            const roll3remain = Number(roll3[1])
            const roll4remain = Number(roll4[1])
            const roll5remain = Number(roll5[1])
            const roll6remain = Number(roll6[1])
            const roll7remain = Number(roll7[1])
            const roll101remain = Number(roll101[1])

            const _canRoll1 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 15 ? true : false
            const _canRoll2 = Number(ethers.utils.formatEther(String(jusdtBal))) >= 20 ? true : false

            return [
                sell1remain, _canBuy1, sell2remain, _canBuy2, roll7remain, roll101remain, sell4remain, _canBuy4, sell5remain, _canBuy5, sell6remain, 
                _canBuy6, roll1remain, _canRoll1, roll2remain, roll3remain, roll4remain, roll5remain, _canRoll2, sell7remain, _canBuy7, 
                sell8remain, _canBuy8, sell9remain, _canBuy9, jbcBal, _canBuy10, sell11remain, _canBuy11, sell12remain, _canBuy12, 
                sell13remain, _canBuy13, roll6remain, sell14remain, _canBuy14, sell15remain, sell16remain, sell17remain, sell18remain, _canBuy18, 
                sell19remain, sell20remain, sell21remain, sell22remain, sell23remain, _canBuy23, sell24remain, sell25remain, sell26remain, sell27remain, sell28remain, sell29remain, sell30remain,
                ctunaBal, sx31Bal, jusdtBal, cmjBal, bbqBal, pzaBal, cuBal, jaspBal, osBal, goldBal, wjbcBal, swarBal, silBal, jdaoBal, angbBal, jtaoBal, iiBal, eeBal, platBal, gearBal,
                sell31remain, sell32remain, sell33remain, sell34remain, sell35remain, sell36remain, _canBuy31, _canBuy32, _canBuy33, _isWL6, doijibBal, woodBal,
                presale01[3],
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
            setSell1Remain(result[0])
            setCanBuy1(result[1])
            setSell2Remain(result[2])
            setCanBuy2(result[3])

            setSell4Remain(result[6])
            setCanBuy4(result[7])
            setSell5Remain(result[8])
            setCanBuy5(result[9])
            setSell6Remain(result[10])
            setCanBuy6(result[11])
            setSell7Remain(result[19])
            setCanBuy7(result[20])
            setSell8Remain(result[21])
            setCanBuy8(result[22])
            setSell9Remain(result[23])
            setCanBuy9(result[24])
            setJbcBalance(result[25].formatted)
            setSell13Remain(result[31])
            setCanBuy13(result[32])
            
            setSell15Remain(result[36])
            setSell16Remain(result[37])
            setSell17Remain(result[38])
            setSell18Remain(result[39])
            setCanBuy18(result[40])
            setSell19Remain(result[41])
            setSell20Remain(result[42])
            setSell21Remain(result[43])
            setSell22Remain(result[44])

            setSell24Remain(result[47])
            setSell25Remain(result[48])
            setSell26Remain(result[49])
            setSell27Remain(result[50])
            setSell28Remain(result[51])
            setSell29Remain(result[52])
            setSell30Remain(result[53])

            setRoll1Remain(result[12])
            setCanRoll1(result[13])
            setRoll2Remain(result[14])
            setRoll3Remain(result[15])
            setRoll4Remain(result[16])

            setCanRoll2(result[18])
            setRoll6Remain(result[33])
            setRoll7Remain(result[4])
            setRoll101Remain(result[5])

            setCTunaBalance(ethers.utils.formatEther(String(result[54])))
            setSx31Balance(ethers.utils.formatEther(String(result[55])))
            setJusdtBalance(ethers.utils.formatEther(String(result[56])))
            setCmjBalance(ethers.utils.formatEther(String(result[57])))
            setBbqBalance(ethers.utils.formatEther(String(result[58])))
            setPzaBalance(ethers.utils.formatEther(String(result[59])))
            setCuBalance(ethers.utils.formatEther(String(result[60])))
            setJaspBalance(ethers.utils.formatUnits(String(result[61]), "gwei"))
            setOsBalance(ethers.utils.formatEther(String(result[62])))
            setGoldBalance(ethers.utils.formatEther(String(result[63])))
            setWjbcBalance(ethers.utils.formatEther(String(result[64])))
            setSwarBalance(ethers.utils.formatEther(String(result[65])))
            setSilBalance(ethers.utils.formatEther(String(result[66])))
            setJdaoBalance(ethers.utils.formatEther(String(result[67])))
            setAngbBalance(ethers.utils.formatEther(String(result[68])))
            setJtaoBalance(ethers.utils.formatEther(String(result[69])))
            setIiBalance(ethers.utils.formatEther(String(result[70])))
            setEeBalance(ethers.utils.formatEther(String(result[71])))
            setPlatBalance(ethers.utils.formatEther(String(result[72])))
            setGearBalance(ethers.utils.formatEther(String(result[73])))
            setDoijibBalance(ethers.utils.formatEther(String(result[84])))
            setWoodBalance(ethers.utils.formatEther(String(result[85])))

            setSell31Remain(result[74])
            setSell32Remain(result[75])
            setSell33Remain(result[76])
            setSell34Remain(result[77])
            setSell35Remain(result[78])
            setSell36Remain(result[79])
            setCanBuy31(result[80])
            setCanBuy32(result[81])
            setCanBuy33(result[82])
            setIsWL6(result[83])
            setDoijibRemain(ethers.utils.formatEther(String(result[86])))
        })
    }, [address, txupdate, kycABI, ctunaLabABI, cmdaoMerchantABI, cmdaoMerchantV2ABI, cmdaoMerchantKYCABI, cmdaoMerchantWLABI, cmdaoGasha02ABI, erc20ABI, presaleABI])

    const buyHandle = async () => {
        setisLoading(true)
        const ctunaAllow = await readContract({
            address: ctunaLab,
            abi: ctunaLabABI,
            functionName: 'allowance',
            args: [address, cmdaoMerchant],
        })
        if (ctunaAllow < (2500 * 10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: ctunaLab,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [1]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle2 = async () => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantKYC],
            })
            if (bbqAllow < (40000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantKYC, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantKYC,
                abi: cmdaoMerchantKYCABI,
                functionName: 'buy',
                args: [2]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)        
    }

    const buyHandle3 = async (_index) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jusdtAllow < (20 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle4 = async (_index) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantV2],
            })
            if (jusdtAllow < (10 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantV2, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantV2,
                abi: cmdaoMerchantV2ABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle5 = async () => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantKYC],
            })
            if (bbqAllow < (40000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantKYC, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantKYC,
                abi: cmdaoMerchantKYCABI,
                functionName: 'buy',
                args: [1]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle6 = async () => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jusdtAllow < (49000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [5]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle8 = async () => {
        setisLoading(true)
        try {
            const jdaoAllow = await readContract({
                address: jdaoToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (jdaoAllow < (1000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jdaoToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [6]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle9 = async (_index) => {
        setisLoading(true)
        try {
            const wjbcAllow = await readContract({
                address: wjbcToken,
                abi: ctunaLabABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantV2],
            })
            if (wjbcAllow < (500 * 10**18)) {
                const config = await prepareWriteContract({
                    address: wjbcToken,
                    abi: ctunaLabABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantV2, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantV2,
                abi: cmdaoMerchantV2ABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle13 = async () => {
        setisLoading(true)
        try {
            const osAllow = await readContract({
                address: osToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (osAllow < (5500 * 10**18)) {
                const config = await prepareWriteContract({
                    address: osToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [8]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle15 = async (_index) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantV105],
            })
            if (jusdtAllow < (20 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantV105, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantV105,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle18 = async () => {
        setisLoading(true)
        try {
            const bbqAllow = await readContract({
                address: bbqToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchant],
            })
            if (bbqAllow < (100000000 * 10**18)) {
                const config = await prepareWriteContract({
                    address: bbqToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchant, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchant,
                abi: cmdaoMerchantABI,
                functionName: 'buy',
                args: [10]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle31 = async (_index) => {
        setisLoading(true)
        try {
            const tokenAllow = await readContract({
                address: dunEE,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantWL],
            })
            if (tokenAllow < (444444 * 10**18)) {
                const config = await prepareWriteContract({
                    address: dunEE,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantWL, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantWL,
                abi: cmdaoMerchantWLABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle32 = async (_index) => {
        setisLoading(true)
        try {
            const tokenAllow = await readContract({
                address: iiLab,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantWL],
            })
            if (tokenAllow < (22222 * 10**18)) {
                const config = await prepareWriteContract({
                    address: iiLab,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantWL, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantWL,
                abi: cmdaoMerchantWLABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyHandle33 = async (_index) => {
        setisLoading(true)
        try {
            const tokenAllow = await readContract({
                address: gearToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoMerchantWL],
            })
            if (tokenAllow < (10**27)) {
                const config = await prepareWriteContract({
                    address: gearToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoMerchantWL, ethers.utils.parseEther(String(10**9))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoMerchantWL,
                abi: cmdaoMerchantWLABI,
                functionName: 'buy',
                args: [_index]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }


    const rollHandle2 = async (_colIndex) => {
        setisLoading(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoGasha02],
            })
            if (jusdtAllow < (15 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoGasha02, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoGasha02,
                abi: cmdaoGasha02ABI,
                functionName: 'roll',
                args: [_colIndex]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const rollHandle3 = async (_colIndex) => {
        setisLoading(true)
        setIsSpecialModal(true)
        try {
            const jusdtAllow = await readContract({
                address: jusdtToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoGasha02],
            })
            if (jusdtAllow < (20 * 10**18)) {
                const config = await prepareWriteContract({
                    address: jusdtToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoGasha02, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoGasha02,
                abi: cmdaoGasha02ABI,
                functionName: 'roll',
                args: [_colIndex]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const buyPresaleHandle = async (_sellIndex) => {
        setisLoading(true)
        try {
            const tokenAllow = await readContract({
                address: wjbcToken,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [address, cmdaoPresale],
            })
            if (tokenAllow < (inputBuy * 10**18)) {
                const config = await prepareWriteContract({
                    address: wjbcToken,
                    abi: erc20ABI,
                    functionName: 'approve',
                    args: [cmdaoPresale, ethers.utils.parseEther(String(10**8))],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: cmdaoPresale,
                abi: presaleABI,
                functionName: 'buy',
                args: [_sellIndex, ethers.utils.parseEther(inputBuy)]
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const sendHandle = async () => {
        setisLoading(true)
        try {
            const { hash: hash1 } = await sendTransaction({
                to: wjbcToken,
                value: wrappedValue !== "" ? ethers.utils.parseEther(wrappedValue) : undefined,
            })
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const unwrapHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: wjbcToken,
                abi: wjbcABI,
                functionName: 'withdraw',
                args: [ethers.utils.parseEther(unwrappedValue)]
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    return (
    <>
        {isWrappedModal &&
            <div style={{zIndex: "999"}} className="centermodal">
                <div className="wrapper">
                    <div className="bold" style={{width: "500px", height: "250px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", fontSize: "40px", letterSpacing: "1px"}}>
                        <div style={{width: "80%", fontSize: "12px", textAlign: "left"}}>
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                <div style={{height: "30px", padding: "0 5px", lineHeight: "32px"}} className="bold">WRAPPED</div>
                                <div style={{width: "fit-content", height: "30px", margin: 0, border: "none", fontSize: "12px"}} className="items bold">
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="20" alt="$WJBC"/>
                                </div>
                            </div>
                            <div style={{margin: "10px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                <input style={{width: "300px", padding: "10px"}} className="bold" type="number" min="0" step="0.1" placeholder="Enter $JBC to Wrap" value={wrappedValue} onChange={(event) => setWrappedValue(event.target.value)}></input>
                                <div className="button" style={{width: "80px", marginLeft: "10px"}} onClick={sendHandle}>WRAP</div>
                            </div>
                            <div style={{margin: "10px 0", cursor: "pointer"}} onClick={() => setWrappedValue(jbcBalance)}>Balance: {Number(jbcBalance).toFixed(4)}</div>
                            <div style={{margin: "10px 0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                <input style={{width: "300px", padding: "10px"}} className="bold" type="number" min="0" step="0.1" placeholder="Enter $WJBC to Unwrap" value={unwrappedValue} onChange={(event) => setUnwrappedValue(event.target.value)}></input>
                                <div className="button" style={{width: "100px", marginLeft: "10px"}} onClick={unwrapHandle}>UNWRAP</div>
                            </div>
                            <div style={{margin: "10px 0 20px 0", cursor: "pointer"}} onClick={() => setUnwrappedValue(wjbcBalance)}>Balance: {Number(wjbcBalance).toFixed(4)}</div>
                        </div>
                        <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsWrappedModal(false)}>CLOSE</div>
                    </div>
                </div>
            </div>
        }
        {isSpecialModal &&
            <div style={{zIndex: "1000"}} className="centermodal">
                <div className="wrapper">
                    <div className="bold" style={{width: "500px", height: "700px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", fontSize: "40px", letterSpacing: "3px"}}>
                        <video autoPlay loop width="400">
                            <source src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiawnfpq4e6nxowydbmchi3kx6aq3d7wj76yx35dvz7hbbd3ij67pa" type="video/mp4" />
                        </video>
                        <div className="button" style={{width: "50%", background: "gray"}} onClick={() => setIsSpecialModal(false)}>CLOSE</div>
                    </div>
                </div>
            </div>
        }
        <div className="fieldBanner" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px"}}>
                <div style={{fontSize: "75px", width: "fit-content"}} className="pixel">Mall</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}} className="pixel">Automated Buy & Sell</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="./background/malllogo.png" width="150" alt="Mall_Logo" />
            </div>
        </div>

        <div className="collection">
            <div style={{textAlign: "left", height: "fit-content", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}} className="pixel">
                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Cryptocurrency</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq"
                            width="20"
                            alt="$WJBC"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: wjbcToken,
                                            symbol: 'WJBC',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}><div style={{width: "80px", textAlign: "center", fontSize: "16px", padding: "1px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)", borderRadius: "8px", boxShadow: "inset 1px 1px 0 0 hsla(0,0%,100%,.65)"}} className="button pixel" onClick={() => setIsWrappedModal(true)}>WRAPPED</div> {Number(wjbcBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u"
                            width="20"
                            alt="$CMJ"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: cmjToken,
                                            symbol: 'CMJ',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(cmjBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi"
                            width="20"
                            alt="$JUSDT"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: jusdtToken,
                                            symbol: 'JUSDT',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(jusdtBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img 
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifydb6vy2dysudcg6x64p42enym3bhfneal62ctf33oapsmk6qjlm"
                            width="20"
                            alt="$JTAO"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: taomeme,
                                            symbol: 'JTAO',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifydb6vy2dysudcg6x64p42enym3bhfneal62ctf33oapsmk6qjlm',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(jtaoBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                </div>

                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", marginTop: "20px"}} className="bold">CommuDAO Tokens</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4"
                            width="20"
                            alt="$WOOD"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: woodToken,
                                            symbol: 'WOOD',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(woodBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq"
                            width="20"
                            alt="$BBQ"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: bbqToken,
                                            symbol: 'BBQ',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(bbqBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu"
                            width="20"
                            alt="$PZA"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: pzaLab,
                                            symbol: 'PZA',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(pzaBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq"
                            width="20"
                            alt="$CU"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunCopper,
                                            symbol: 'CU',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(cuBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde"
                            width="20"
                            alt="$SIL"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: silToken,
                                            symbol: 'SIL',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(silBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm"
                            width="20"
                            alt="$GOLD"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: goldToken,
                                            symbol: 'GOLD',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(goldBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "0 10px 20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa"
                            width="20"
                            alt="$PLAT"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: platToken,
                                            symbol: 'PLAT',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(platBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "0 10px 20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy"
                            width="20"
                            alt="$JASP"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunJasper,
                                            symbol: 'JASP',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(jaspBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "0 10px 20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e"
                            width="20"
                            alt="$OS"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: osToken,
                                            symbol: 'OS',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(osBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                </div>

                <div style={{width: "100%", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", marginTop: "20px"}} className="bold">Partner Tokens</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i"
                            width="20"
                            alt="$CTUNA"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: ctunaLab,
                                            symbol: 'CTUNA',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(ctunaBalance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4"
                            width="20"
                            alt="$SX31"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: sx31Lab,
                                            symbol: 'SX31',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(sx31Balance).toLocaleString('en-US', {maximumFractionDigits:3})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi"
                            width="20"
                            alt="$SWAR"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: swarLab,
                                            symbol: 'SWAR',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreib4zlmwnydgolgzkfldaz2zsxh6pg3k4wemiigura7gbnj7i36ygi',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(swarBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m"
                            width="20"
                            alt="$ANGB"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunAngb,
                                            symbol: 'ANGB',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiev2kbirflwhlqbwd6zh6trd7gx62tijviekwewd6zaogm4vzrh7m',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(angbBalance).toLocaleString('en-US', {maximumFractionDigits:4})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q"
                            width="20"
                            alt="$II"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: iiLab,
                                            symbol: 'TDM - II',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(iiBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "20px 10px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm"
                            width="20"
                            alt="$EE"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: dunEE,
                                            symbol: 'TDM-EE',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(eeBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "0px 10px 20px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4"
                            width="20"
                            alt="$GEAR"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: gearToken,
                                            symbol: 'GEAR',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(gearBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>

                    <div style={{width: "200px", minWidth: "200px", height: "55px", margin: "0px 10px 20px", fontSize: "15px", border: "1px solid #dddade", boxShadow: "3px 3px 0 #dddade"}} className="items">
                        <img
                            src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi"
                            width="20"
                            alt="$DOIJIB"
                            style={{cursor: "crosshair"}}
                            onClick={async () => {
                                await ethereum.request({
                                    method: 'wallet_watchAsset',
                                    params: {
                                        type: 'ERC20',
                                        options: {
                                            address: doijibToken,
                                            symbol: 'DOIJIB',
                                            decimals: 18,
                                            image: 'https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi',
                                        },
                                    },
                                })
                            }}
                        />
                        <div style={{marginLeft: "5px"}}>{Number(doijibBalance).toLocaleString('en-US', {maximumFractionDigits:0})}</div>
                    </div>
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Automated Market Maker NPC</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <Ammmerchant setisLoading={setisLoading} setTxupdate={setTxupdate} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20ABI={erc20ABI} ctunaBalance={ctunaBalance} sx31Balance={sx31Balance} bbqBalance={bbqBalance} pzaBalance={pzaBalance} woodBalance={woodBalance} cmjBalance={cmjBalance} />
                    <Ammmerchant2 setisLoading={setisLoading} setTxupdate={setTxupdate} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20ABI={erc20ABI} jdaoBalance={jdaoBalance} cuBalance={cuBalance} silBalance={silBalance} goldBalance={goldBalance} jaspBalance={jaspBalance} osBalance={osBalance} platBalance={platBalance} cmjBalance={cmjBalance} />
                    <Ammmerchant3 setisLoading={setisLoading} setTxupdate={setTxupdate} cmdaoAmmNpcABI={cmdaoAmmNpcABI} ammyStdABI={ammyStdABI} erc20ABI={erc20ABI} cmjBalance={cmjBalance} doijibBalance={doijibBalance} wjbcBalance={wjbcBalance} woodBalance={woodBalance} />
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <Ammmerchant4 setisLoading={setisLoading} setTxupdate={setTxupdate} angeloStdABI={angeloStdABI} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20ABI={erc20ABI} angbBalance={angbBalance} swarBalance={swarBalance} wjbcBalance={wjbcBalance} />
                    <Ammmerchant5 setisLoading={setisLoading} setTxupdate={setTxupdate} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20ABI={erc20ABI} iiBalance={iiBalance} eeBalance={eeBalance} jtaoBalance={jtaoBalance} />
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Another NPC</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                <div className="nftCard" style={{alignItems: "center", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                    <div style={{marginTop: "10px", width: "100%", maxHeight: "350px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>
                        <div style={{height: "160px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifid22c4xzlomymxik5kru5ymeunnd62rxkncrai7hnne7bnucuhi" width="220" alt="NPC_Gamy" />
                        </div>
                        <div style={{maxHeight: "95px"}}>
                            <div style={{fontSize: "20px", width: "380px"}} className="pixel">GAMY, THE PRESALE AGENT</div>
                            <div style={{fontSize: "10px", marginTop: "5px"}} className="light">"BRo, i seLL ${tokenselected}, giVE mE MONeY bRo!</div>
                            <div style={{fontSize: "10px"}} className="light">Presale Round 1: 2B / 100B, (2% of max supply); Pls DYOR."</div>
                            <div style={{marginTop: "5px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <div style={{width: "70%", display: "flex", flexDirection: "row"}}>
                                    <select style={{padding: "1px", border: "none", borderRadius: "8px", fontSize: "16px"}} className="pixel" value={tokenselected} onChange={(event) => {setTokenselected(event.target.value)}}>
                                        <option value="DOIJIB">DOIJIB</option>
                                    </select>
                                    <div style={{fontSize: "16px", marginLeft: "5px", display: "flex", alignItems: "center", letterSpacing: "1px"}} className="pixel">
                                        &nbsp;
                                        {tokenselected === "DOIJIB" && <>10,000.00&nbsp;<img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="22" alt="$DOIJIB"/> &nbsp;=&nbsp; <div className="emp">1</div></>}
                                        &nbsp;<img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="22" alt="$WJBC"/>
                                    </div>
                                </div>
                            </div>
                            <div style={{margin: "10px 0", fontSize: "10px"}} className="bold">Presale Round 1 Remaining: <span className='emp'>{Number(doijibRemain).toLocaleString('en-US', {maximumFractionDigits:4})}</span> / 2,000,000,000</div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "15px 0 10px 0"}}></div>
                        <div style={{width: "98%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <input
                                style={{width: "55%", padding: "5px 10px", border: "1px solid #dddade", fontSize: "18px"}}
                                className="bold"
                                type="number"
                                step="1"
                                min="1"
                                placeholder={"0 $WJBC"}
                                onChange={(event) => {
                                    setInputBuy(event.target.value)
                                }}
                                value={inputBuy}
                            ></input>
                            {tokenselected === "DOIJIB" && 
                                <div style={{width: "30%", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}} onClick={() => setInputBuy(wjbcBalance)}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" width="22" alt="$WJBC"/>
                                    <div style={{marginLeft: "5px"}}>{Number(wjbcBalance).toLocaleString('en-US', {maximumFractionDigits:2})}</div>
                                </div>
                            }
                        </div>
                        <div style={{width: "98%", maxHeight: "47px", marginTop: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                            {Number(doijibRemain) > 0 && address !== null && address !== undefined ?
                                <div style={{width: "30px"}} className="pixel button" onClick={
                                    () => {
                                        if (tokenselected === "DOIJIB") {
                                            buyPresaleHandle(1)
                                        }
                                    }
                                }>BUY</div> :
                                <div style={{width: "190px", fontSize: "14px", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">SOLD OUT</div>
                            }
                            <div style={{textAlign: "left", marginLeft: "20px", fontSize: "16px", color: "rgb(126, 128, 145)"}} className="pixel">Will get 
                                <div className="emp">
                                    {tokenselected === "DOIJIB" && Number(inputBuy * 10000).toLocaleString('en-US', {maximumFractionDigits:3})}
                                </div>
                                ${tokenselected}
                            </div>
                        </div>
                        <div style={{width: "100%", borderBottom: "1px solid #dddade", margin: "10px 0"}}></div>
                    </div>
                </div>
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommmuDAO NFTs Premium Store</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Songkran Splasher</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifz2fgy43d4qigdwp35r3izgyvwip2rugswdvkkcj4xl5cytxs5ti" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", height: "200px", fontSize: "15px", marginTop: "10px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll1Remain}</div>
                                    <div>/256 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>15</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll1Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(1)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Golden Dragon Armor </div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibgzv6zcq4yuj2n44dw6o7ydwllepwry5nulqzdx4s2c7poabxwxa" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll2Remain}</div>
                                    <div>/256 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>15</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll2Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(2)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>   

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Adventure's Muffler</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigeuohgaw2jvgromogakix34kit2ab6pclreddmbzubp22nkqmpma" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll3Remain}</div>
                                    <div>/256 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>15</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll3Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(3)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>                 
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Golden Dragon Boots</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif4fk7tqca2vdovvtwufxyx2snoolbwofvdvjoqi35y6mvaahhkve" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll4Remain}</div>
                                    <div>/256 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>15</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll4Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(4)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Golden Dragon Accessory</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiem7ixjm7xomcrhfkla73ye7ajah6d7xi7hw6a6seozclccaewipy" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll6Remain}</div>
                                    <div>/256 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>15</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll6Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(6)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Guardian's Helm</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigr33les3na44zns7nznxltedxluhor5klfsduzolpwinqzsrcc6q" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll7Remain}</div>
                                    <div>/256 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>N : 250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R : 550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR : 1050 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR : 2550 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>15</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll7Remain > 0 ?
                                    <>
                                        {canroll1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle2(7)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">SAPIENS #04</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4kwbvcyynfxu77fpguwoogfqqe45kktalxylnad4wivnhqjtt2m" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <div className="emp">{sell4Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>500 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell4Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle3(4)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Chō-Senjiryakketsu Vol.1</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifgwtom3va2wm4wdur4eupbnoxjfvxr3765ebkpisron73ydmq3sa" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <div className="emp">{sell6Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>100 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", fontSize: "14px", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="$JUSDT"/>
                                    <div style={{marginLeft: "7.5px"}}>1</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell6Remain > 0 ?
                                    <>
                                        {canbuy6 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle6}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>               
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Ecosystem NFTs Premium Store</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Angel Plus - Adventurer Card D +0 Vol.4</div>
                        <video muted loop width="175" style={{alignSelf: "flex-start", marginTop: "20px"}}>
                            <source src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeia2c5qcwshxdqw6gvvezehsnn5r7u5d2oxkduwzydbzxxu3hfzzze" type="video/mp4" />
                        </video>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell7Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>Staking in Fields: Eastern Front</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell7Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle4(2)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>    

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Hero (Character)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiafeumwvilddqiakxaabht5bcu2khkeyjr275jtbwyryd6upbh6bm" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell15Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>100 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell15Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(1)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Claymore (Sword)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigcv7pn4azsrjkzccyeyq6nkg6sntwnh3czrfth6ubwudo6imuhyu" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell16Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell16Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(2)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Shield (Shield)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreihdt2twkixgg27erb5rlawm37v4owvq2j5pq2753tmf55hhgjr7ia" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell17Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell17Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(3)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Full Plate (Armor)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiehp5d2ccxovqmb7qtriafsnku7xlifr345zlsrmane3fvwoskhle" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell19Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell19Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(4)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Helm (Helmet)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiepodq6oo7xlme6tjnjus3cberubwu4sfgdvbnou7tdtbrj4hzm2q" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell20Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell20Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(5)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div> 
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Crusader Boots (Boots)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreialnqwhhuikji7fov3tc73dv6qqb74okxkiihuogk3dekzotg3vni" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell21Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell21Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(6)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Imperium Ring (Ring)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiagnfkgkzdazovsfu33d2v22eyotizgy4zg66okkmwwt7unswungi" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell22Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>10</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell22Remain > 0 ?
                                    <>
                                        {canbuy7 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(7)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -20, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeibha4mwuymx4o5mp4n3hou3fryvka4wul53sawa4xtqvkrn32i7g4" width="30px" alt="AngelPlus" />
                            <div className='light' style={{marginLeft: "10px"}}>Angel Plus</div>
                        </div>
                        <div style={{position: "absolute", top: 40, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">Gashapon</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">Spirit of Rina (Fairy)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeien4iziizhs2xkaxsruphh5um7zvkuons2nj2bo775kckok2vyhey" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", height: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{roll101Remain}</div>
                                    <div>/200 EA</div>
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>R (HERO) : 2000 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SR (ANGEL) : 4000 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div style={{display: "flex", flexDirection: "row"}}>SSR (Daemon Prince) : 8000 Power</div>
                            </div>
                            <div style={{marginTop: "25px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div></div>
                                <div></div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {roll101Remain > 0 ?
                                    <>
                                        {canroll2 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => rollHandle3(101)}>ROLL</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel buttn">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Naruta (Main Char)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeih6lcghzq7kygz2uxpksueczcj36xptexylmyum5zwwx265h2222u" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell24Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell24Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(8)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - TD-88 Blaster (Weapon)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiglw3a5wuszv7zkmfw55e2bcaoxinsjwjinckccg4lxg2juoeegmu" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell25Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell25Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(9)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - X8 Haptic Bootsuit (Cloth)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeih5zbbv5tjdug5qbnzbmusaqwgy3z4ecs3uii7t6g7q7ynhnr3d5q" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell26Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell26Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(10)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Cosmo Crest (Hat)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeia3bm6ju5fhokrjnovbgbm3mw422jwxa72bnoo4ihgf2upsfrbmlm" height="150" alt='Can not load metadata.'/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell27Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell27Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(11)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Prism Propel Wings (Back)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfyxqmdjjz3xispk7vil22asr4wnzffxbuh47dy42qofy4zxnfb4" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell28Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell28Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(12)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Phoenix Phalanx Ring (Accessory)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifmkrjl457rtfkve2ktn3ynx4yev5oqygpsvppeo4csm26fqormha" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell29Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell29Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(13)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">NARUTA NFT - Galactic Walkers (Shoes)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicmgffdl5eb4op32ck2vvri5f4ruxzxk6nkmu6eqcxabu27glmvmu" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell30Remain}</div>
                                    /250 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>18800 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" height="18" alt="jusdt"/>
                                    <div style={{marginLeft: "7.5px"}}>20</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell30Remain > 0 ?
                                    <>
                                        {canbuy4 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle15(14)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeicfkse4uvkhhkrhfwtap4h3v5msef6lg3t3xvb2hspw3xd5wegzfi" width="30px" alt="DOIJIB" />
                            <div className='light' style={{marginLeft: "10px"}}>DOIJIB</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}} className="pixel">DOIJIB NFT - BB</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmZPNdmmD86o1VmQK4tpW952FH53LZbyngYrziCW4vwYXb" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell9Remain}</div>
                                    /1000 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>5000 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" height="18" alt="$JBC"/>
                                    <div style={{marginLeft: "7.5px"}}>500</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell9Remain > 0 ?
                                    <>
                                        {canbuy9 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle9(6)}>BUY</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>
                
                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">CommuDAO NFTs Redemption Store</div>
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">KYC Shop</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Multiverse Traveller Vol.4</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigc4ivgjqocp7dh7bh3upl4tidhpe2w76muckmzyvulevbkoxdnce" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell5Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>100 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                    <div style={{marginLeft: "7.5px"}}>40,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell5Remain > 0 ?
                                    <>
                                        {canbuy5 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle5}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: 20, right: 30, padding: "10px 20px", background: "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)", color: "#fff", fontSize: "14px", letterSpacing: 1, border: "1px solid #4637a9", boxShadow: "3px 3px 0 #0d0a1f"}} className="pixel">KYC Shop</div>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Novice Sword Vol.3</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiha7rbdsni6hvok2rs546zeowge2mwbfh3y75awlqv2u74zorltse" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell2Remain}</div>
                                    /100 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>250 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                    <div style={{marginLeft: "7.5px"}}>40,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell2Remain > 0 ?
                                    <>
                                        {canbuy2 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle2}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">TSW Valentine Ring</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiacm6fn5rjctuxyiirlmr7awp6ckesgffamingak4pif3kp6vgbri" height="160" alt="valentineringpic"/>
                        <div style={{alignSelf: "flex-start", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell1Remain}</div>
                                    /107 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>150 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" height="18" alt="$CTUNA"/>
                                    <div style={{marginLeft: "7.5px"}}>2500</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell1Remain > 0 ?
                                    <>
                                        {canbuy1 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Prophet of JBC</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreieoamtkrbgj3kd3cqrdcvwzoj7swmwegmoyvcs5gqv22psyzzhvre" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell8Remain}</div>
                                    /333 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>8,000 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" height="18" alt="$JDAO"/>
                                    <div style={{marginLeft: "7.5px"}}>1,000</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell8Remain > 0 ?
                                    <>
                                        {canbuy8 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle8}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">VK, King of Commu</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibl25he5u74rw2mi24xhjl4yurmhoe6upn4qcbi5kn75e5uaz2ksa" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell13Remain}</div>
                                    /333 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>4,500 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" height="18" alt="$OS"/>
                                    <div style={{marginLeft: "7.5px"}}>5,500</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell13Remain > 0 ?
                                    <>
                                        {canbuy13 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle13}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{alignSelf: "flex-start", fontSize: "16px", width: "380px"}}className="pixel">Chainsaw Pro Max</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibalc6if2y6qqp3kfxjkciabsdxxxpnx4djt6toap2c3n2bfcnfye" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell18Remain}</div>
                                    /300 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>10,000 CMPOW</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" height="18" alt="$BBQ"/>
                                    <div style={{marginLeft: "7.5px"}}>100M</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell18Remain > 0 ?
                                    <>
                                        {canbuy18 ?
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={buyHandle18}>REDEEM</div> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "97.5%", borderBottom: "1px solid #dddade", marginTop: "40px"}}></div>
                <div style={{width: "100%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px"}} className="bold">Ecosystem NFTs Redemption Store</div>
                
                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "14px", width: "380px"}} className="pixel">NARUTA NFT x Songkran 2024 - Water gun (Weapon)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeihsvjagwtvlduxlca4pkbyafl3wjqlpuur5hijy5apmdn4ldiohtq" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell31Remain}</div>
                                    /55 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>45555 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm" height="18" alt="$EE"/>
                                    <div style={{marginLeft: "7.5px"}}>444,444</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell31Remain > 0 ?
                                    <>
                                        {isWL6 ?
                                            <>
                                                {canbuy31 ?
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle31(1)}>BUY</div> :
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                                }
                                            </> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "14px", width: "380px"}} className="pixel">NARUTA NFT x Songkran 2024 - Raincoat (Cloth)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeica72eipqfvbs67exg7s3duzacdxrr35puexg7vfmbcmkdtw6xuku" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell32Remain}</div>
                                    /55 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>45555 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q" height="18" alt="$II"/>
                                    <div style={{marginLeft: "7.5px"}}>22,222</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell32Remain > 0 ?
                                    <>
                                        {isWL6 ?
                                            <>
                                                {canbuy32 ?
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle32(2)}>BUY</div> :
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                                }
                                            </> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "14px", width: "380px"}} className="pixel">NARUTA NFT x Songkran 2024 - Goggles (Hat)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeihcaime52xjf7b2ysgsfvsrg2jb5bmwa72grvnm5yqimaar44cnv4" height="150" alt='Can not load metadata.'/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell33Remain}</div>
                                    /55 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>45555 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" height="18" alt="$GEAR"/>
                                    <div style={{marginLeft: "7.5px"}}>999,999,999</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell33Remain > 0 ?
                                    <>
                                        {isWL6 ?
                                            <>
                                                {canbuy33 ?
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle33(3)}>BUY</div> :
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                                }
                                            </> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", overflow: "scroll", marginBottom: "80px"}} className="noscroll">
                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "14px", width: "380px"}} className="pixel">NARUTA NFT x Songkran 2024 - Ring (Accessory)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiftowtfdkgeriogbaaoj7dhgnx5hcx2izqla3f4vnwrwtifbu2yoa" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell34Remain}</div>
                                    /55 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>45555 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeihg7schl77eo7b4amo22htmuscipo4dfioxmajxr4feuqloz2dolm" height="18" alt="$EE"/>
                                    <div style={{marginLeft: "7.5px"}}>444,444</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell34Remain > 0 ?
                                    <>
                                        {isWL6 ?
                                            <>
                                                {canbuy31 ?
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle31(4)}>BUY</div> :
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                                }
                                            </> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "14px", width: "380px"}} className="pixel">NARUTA NFT x Songkran 2024 - Backpacks (ฺBack)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeihyxgadmjould366mopsqqypsvckajxp22lyjbeye3vwclngubqfu" height="150" alt="Can not load metadata."/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell35Remain}</div>
                                    /55 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>45555 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiffepxbrj2zq2mrlik47tonb2mpp22ymvqmv7o5vpy57fjre4qn6q" height="18" alt="$II"/>
                                    <div style={{marginLeft: "7.5px"}}>22,222</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell35Remain > 0 ?
                                    <>
                                        {isWL6 ?
                                            <>
                                                {canbuy32 ?
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle32(5)}>BUY</div> :
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                                }
                                            </> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>

                    <div className="nftCard" style={{position: "relative", justifyContent: "flex-start", height: "460px", margin: "20px", boxShadow: "6px 6px 0 #00000040", border: "1px solid rgb(227, 227, 227)"}}>
                        <div style={{position: "absolute", top: -25, right: -15, padding: "5px 20px", width: "150px", background: "#fff", letterSpacing: 1, border: "1px solid rgb(227, 227, 227)", boxShadow: "6px 6px 0 #00000040", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 1}} className="bold">
                            <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeifetzaiv2i5anifvhumtbnq6ayvyqvrjn6hmq63vggg3r26gvzxce" width="30px" alt="TAODUM-TAOMEME" />
                            <div className='light' style={{marginLeft: "10px"}}>TAODUM & TAOMEME</div>
                        </div>
                        <div style={{alignSelf: "flex-start", fontSize: "14px", width: "380px"}} className="pixel">NARUTA NFT x Songkran 2024 - Boots (ฺShoes)</div>
                        <img style={{alignSelf: "flex-start", marginTop: "20px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiajrhbrxzhfkcsb6pazkrvgxamoij3jnlvljggi27wbidavtsbese" height="150" alt='Can not load metadata.'/>
                        <div style={{alignSelf: "flex-start", marginTop: "10px", minHeight: "200px", fontSize: "15px"}} className="pixel">
                            <div style={{marginTop: "20px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Limited</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <div className="emp">{sell36Remain}</div>
                                    /55 EA
                                </div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Status</div>
                                <div style={{display: "flex", flexDirection: "row"}}>45555 Power</div>
                            </div>
                            <div style={{marginTop: "15px", width: "350px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d8df"}}>
                                <div>Price</div>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <img src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafybeiegwsyuqu5d47hobxpnuj5zdsy2fgzautcobr6imm3soc4r6uibg4" height="18" alt="$GEAR"/>
                                    <div style={{marginLeft: "7.5px"}}>999,999,999</div>
                                </div>
                            </div>
                        </div>
                        {address !== null && address !== undefined ?
                            <>
                                {sell36Remain > 0 ?
                                    <>
                                        {isWL6 ?
                                            <>
                                                {canbuy33 ?
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center"}} className="pixel button" onClick={() => buyHandle33(6)}>BUY</div> :
                                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">INADEQUATE BALANCE</div>
                                                }
                                            </> :
                                            <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">NOT ELIGIBLE TO REDEEM</div>
                                        }
                                    </> :
                                    <div style={{borderRadius: "12px", alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">OUT OF STOCK</div>
                                }                              
                            </> :
                            <div style={{borderRadius: "12px",alignSelf: "flex-start", padding: "15px", fontSize: "16px", marginTop: "25px", width: "180px", display: "flex", justifyContent: "center", background: "#e9eaeb", color: "#bdc2c4", cursor: "not-allowed"}} className="pixel button">Please connect wallet</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Mall