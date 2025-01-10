import React from 'react'
import { readContract, readContracts, simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { ethers } from 'ethers'
import { createPublicClient, http, Filter } from 'viem'
import { jbc } from 'viem/chains' 

const merchant = '0xa4b53A4DD8277Dd2E506cb8692A492B1Dc6b255D'
const jusdtToken = '0x24599b658b57f91E7643f4F154B16bcd2884f9ac'
const farmJdao = "0x6B25033c2B4F5594809cBEf9F625771a2574C1a6"
const cuCmjLp = '0x1b70c95fD4EbF8920A624bd2ce22b6905eFBdF60'
const silCmjLp = '0xf189c5B03694b70e5DFD8e8CAE84118Ed7616F19'
const goldCmjLp = '0x7086EC7ED5D94ef503bE324B0aE8A3748A15fAE5'
const platCmjLp = '0x78Ff63F4f91Ce56f72882ef9dbE3Be79fBF15044'
const jaspCmjLp = '0xc19DE37d5e14b387BCda8e62aB4934591315901D'
const osCmjLp = '0x329889325A555b217C41A4c2EADD529a0CfA4231'
const jdaoCmjLp = '0x3C061eEce15C539CaE99FbE75B3044236Fa2eff0'
const ctunaCmjLp = '0x7801F8cdBABE6999331d1Bf37d74aAf713C3722F'
const sx31CmjLp = '0xda558EE93B466aEb4F59fBf95D25d410318be43A'
const woodCmjLp = '0x466C3b32538eB0DB9f6c88ee2Fa9c72C495cE08F'
const bbqCmjLp = '0x6F93F16cF86205C5BB9145078d584c354758D6DB'
const pzaCmjLp = '0x3161EE630bF36d2AB6333a9CfD22ebaa3e2D7C70'
const plutoCmjLp = '0xd3d493ac2c0dD08C814FbbFB5f8B4983a8a0921C'
const fbtcCmjLp = '0x4EF48881EFf572bBD636bcE736877881B9Ea17D5'
const x4CmjLp = '0xA7e55e89d6B0E81cCDB034a04Eb65A7aF16b697C'
const infpowCmjLp = '0x5E9C3A7E74a5865EC8eD3eaF6B1a4220D6E9A96b'
const publicClient = createPublicClient({ chain: jbc, transport: http() })
   
const GameSwapFarm = ({ config, address, setisLoading, setTxupdate, txupdate, setisError, setErrMsg, lpBalance, julpBalance, jbcPooled, cmjPooled, jbcjuPooled, jusdtjuPooled, jcExchange, exchangeABI, juExchange, exchangeJulpABI, cmjToken, erc20Abi, cmjBalance, jbcReserv, cmjReserv, jbcJuReserv, jusdtJuReserv, cmjBalanceFull, farmJdaoABI, priceTHB, cmdaoAmmNpcABI }) => {
    const [jbcJdaoStaked, setJbcJdaoStaked] = React.useState(0)
    const [cmjJdaoStaked, setCmjJdaoStaked] = React.useState(0)
    const [yourjbcJdaoStaked, setYourJbcJdaoStaked] = React.useState(0)
    const [yourcmjJdaoStaked, setYourCmjJdaoStaked] = React.useState(0)
    const [farmJdaoBalance, setFarmJdaoBalance] = React.useState(0)
    const [jdaoPending, setJdaoPending] = React.useState(0)
    const [cmjJdao202Staked, setCmjJdao202Staked] = React.useState(0)
    const [farmJdao202Balance, setFarmJdao202Balance] = React.useState(0)
    const [jdao202Pending, setJdao202Pending] = React.useState(0)
    const [jbcJdao3Staked, setJbcJdao3Staked] = React.useState(0)
    const [jusdtJdao3Staked, setJusdtJdao3Staked] = React.useState(0)
    const [yourjbcJdao3Staked, setYourJbcJdao3Staked] = React.useState(0)
    const [yourjusdtJdao3Staked, setYourJusdtJdao3Staked] = React.useState(0)
    const [farmJdao3Balance, setFarmJdao3Balance] = React.useState(0)
    const [jdao3Pending, setJdao3Pending] = React.useState(0)
    const [jaspCmjBalance, setJaspCmjBalance] = React.useState(0)
    const [reserveCmjJASP, setReserveCmjJASP] = React.useState(0)
    const [reserveJASP, setReserveJASP] = React.useState(0)
    const [cmjJaspStaked, setCmjJaspStaked] = React.useState(0)
    const [cmjJaspPooled, setCmjJaspPooled] = React.useState(0)
    const [yourcmjJaspStaked, setYourCmjJaspStaked] = React.useState(0)
    const [farmJdao4Balance, setFarmJdao4Balance] = React.useState(0)
    const [jdao4Pending, setJdao4Pending] = React.useState(0)
    const [lpJdao4Withdraw, setLpJdao4Withdraw] = React.useState(0)
    const [lpJdao4Stake, setLpJdao4Stake] = React.useState(0)
    const [jdaoCmjBalance, setJdaoCmjBalance] = React.useState(0)
    const [reserveCmjJDAO, setReserveCmjJDAO] = React.useState(0)
    const [reserveJDAO, setReserveJDAO] = React.useState(0)
    const [cmjJdaoLpStaked, setCmjJdaoLpStaked] = React.useState(0)
    const [cmjJdaoPooled, setCmjJdaoPooled] = React.useState(0)
    const [yourcmjJdaoLpStaked, setYourCmjJdaoLpStaked] = React.useState(0)
    const [farmJdao5Balance, setFarmJdao5Balance] = React.useState(0)
    const [jdao5Pending, setJdao5Pending] = React.useState(0)
    const [lpJdao5Withdraw, setLpJdao5Withdraw] = React.useState(0)
    const [lpJdao5Stake, setLpJdao5Stake] = React.useState(0)
    const [osCmjBalance, setOsCmjBalance] = React.useState(0)
    const [reserveCmjOS, setReserveCmjOS] = React.useState(0)
    const [reserveOS, setReserveOS] = React.useState(0)
    const [cmjOsStaked, setCmjOsStaked] = React.useState(0)
    const [cmjOsPooled, setCmjOsPooled] = React.useState(0)
    const [yourcmjOsStaked, setYourCmjOsStaked] = React.useState(0)
    const [farmJdao6Balance, setFarmJdao6Balance] = React.useState(0)
    const [jdao6Pending, setJdao6Pending] = React.useState(0)
    const [lpJdao6Withdraw, setLpJdao6Withdraw] = React.useState(0)
    const [lpJdao6Stake, setLpJdao6Stake] = React.useState(0)
    const [cuCmjBalance, setCuCmjBalance] = React.useState(0)
    const [reserveCmjCU, setReserveCmjCU] = React.useState(0)
    const [reserveCU, setReserveCU] = React.useState(0)
    const [cmjCuStaked, setCmjCuStaked] = React.useState(0)
    const [cmjCuPooled, setCmjCuPooled] = React.useState(0)
    const [yourcmjCuStaked, setYourCmjCuStaked] = React.useState(0)
    const [farmJdao7Balance, setFarmJdao7Balance] = React.useState(0)
    const [jdao7Pending, setJdao7Pending] = React.useState(0)
    const [lpJdao7Withdraw, setLpJdao7Withdraw] = React.useState(0)
    const [lpJdao7Stake, setLpJdao7Stake] = React.useState(0)
    const [silCmjBalance, setSilCmjBalance] = React.useState(0)
    const [reserveCmjSIL, setReserveCmjSIL] = React.useState(0)
    const [reserveSIL, setReserveSIL] = React.useState(0)
    const [cmjSilStaked, setCmjSilStaked] = React.useState(0)
    const [cmjSilPooled, setCmjSilPooled] = React.useState(0)
    const [yourcmjSilStaked, setYourCmjSilStaked] = React.useState(0)
    const [farmJdao8Balance, setFarmJdao8Balance] = React.useState(0)
    const [jdao8Pending, setJdao8Pending] = React.useState(0)
    const [lpJdao8Withdraw, setLpJdao8Withdraw] = React.useState(0)
    const [lpJdao8Stake, setLpJdao8Stake] = React.useState(0)
    const [goldCmjBalance, setGoldCmjBalance] = React.useState(0)
    const [reserveCmjGOLD, setReserveCmjGOLD] = React.useState(0)
    const [reserveGOLD, setReserveGOLD] = React.useState(0)
    const [cmjGoldStaked, setCmjGoldStaked] = React.useState(0)
    const [cmjGoldPooled, setCmjGoldPooled] = React.useState(0)
    const [yourcmjGoldStaked, setYourCmjGoldStaked] = React.useState(0)
    const [farmJdao9Balance, setFarmJdao9Balance] = React.useState(0)
    const [jdao9Pending, setJdao9Pending] = React.useState(0)
    const [lpJdao9Withdraw, setLpJdao9Withdraw] = React.useState(0)
    const [lpJdao9Stake, setLpJdao9Stake] = React.useState(0)
    const [platCmjBalance, setPlatCmjBalance] = React.useState(0)
    const [reserveCmjPLAT, setReserveCmjPLAT] = React.useState(0)
    const [reservePLAT, setReservePLAT] = React.useState(0)
    const [cmjPlatStaked, setCmjPlatStaked] = React.useState(0)
    const [cmjPlatPooled, setCmjPlatPooled] = React.useState(0)
    const [yourcmjPlatStaked, setYourCmjPlatStaked] = React.useState(0)
    const [farmJdao10Balance, setFarmJdao10Balance] = React.useState(0)
    const [jdao10Pending, setJdao10Pending] = React.useState(0)
    const [lpJdao10Withdraw, setLpJdao10Withdraw] = React.useState(0)
    const [lpJdao10Stake, setLpJdao10Stake] = React.useState(0)
    const [ctunaCmjBalance, setCtunaCmjBalance] = React.useState(0)
    const [reserveCmjCTUNA, setReserveCmjCTUNA] = React.useState(0)
    const [reserveCTUNA, setReserveCTUNA] = React.useState(0)
    const [cmjCtunaStaked, setCmjCtunaStaked] = React.useState(0)
    const [cmjCtunaPooled, setCmjCtunaPooled] = React.useState(0)
    const [yourcmjCtunaStaked, setYourCmjCtunaStaked] = React.useState(0)
    const [farmJdao11Balance, setFarmJdao11Balance] = React.useState(0)
    const [jdao11Pending, setJdao11Pending] = React.useState(0)
    const [lpJdao11Withdraw, setLpJdao11Withdraw] = React.useState(0)
    const [lpJdao11Stake, setLpJdao11Stake] = React.useState(0)
    const [sx31CmjBalance, setSx31CmjBalance] = React.useState(0)
    const [reserveCmjSX31, setReserveCmjSX31] = React.useState(0)
    const [reserveSX31, setReserveSX31] = React.useState(0)
    const [cmjSx31Staked, setCmjSx31Staked] = React.useState(0)
    const [cmjSx31Pooled, setCmjSx31Pooled] = React.useState(0)
    const [yourcmjSx31Staked, setYourCmjSx31Staked] = React.useState(0)
    const [farmJdao12Balance, setFarmJdao12Balance] = React.useState(0)
    const [jdao12Pending, setJdao12Pending] = React.useState(0)
    const [lpJdao12Withdraw, setLpJdao12Withdraw] = React.useState(0)
    const [lpJdao12Stake, setLpJdao12Stake] = React.useState(0)
    const [bbqCmjBalance, setBbqCmjBalance] = React.useState(0)
    const [reserveCmjBBQ, setReserveCmjBBQ] = React.useState(0)
    const [reserveBBQ, setReserveBBQ] = React.useState(0)
    const [cmjBbqStaked, setCmjBbqStaked] = React.useState(0)
    const [cmjBbqPooled, setCmjBbqPooled] = React.useState(0)
    const [yourcmjBbqStaked, setYourCmjBbqStaked] = React.useState(0)
    const [farmJdao13Balance, setFarmJdao13Balance] = React.useState(0)
    const [jdao13Pending, setJdao13Pending] = React.useState(0)
    const [lpJdao13Withdraw, setLpJdao13Withdraw] = React.useState(0)
    const [lpJdao13Stake, setLpJdao13Stake] = React.useState(0)
    const [pzaCmjBalance, setPzaCmjBalance] = React.useState(0)
    const [reserveCmjPZA, setReserveCmjPZA] = React.useState(0)
    const [reservePZA, setReservePZA] = React.useState(0)
    const [cmjPzaStaked, setCmjPzaStaked] = React.useState(0)
    const [cmjPzaPooled, setCmjPzaPooled] = React.useState(0)
    const [yourcmjPzaStaked, setYourCmjPzaStaked] = React.useState(0)
    const [farmJdao14Balance, setFarmJdao14Balance] = React.useState(0)
    const [jdao14Pending, setJdao14Pending] = React.useState(0)
    const [lpJdao14Withdraw, setLpJdao14Withdraw] = React.useState(0)
    const [lpJdao14Stake, setLpJdao14Stake] = React.useState(0)
    const [woodCmjBalance, setWoodCmjBalance] = React.useState(0)
    const [reserveCmjWOOD, setReserveCmjWOOD] = React.useState(0)
    const [reserveWOOD, setReserveWOOD] = React.useState(0)
    const [cmjWoodStaked, setCmjWoodStaked] = React.useState(0)
    const [cmjWoodPooled, setCmjWoodPooled] = React.useState(0)
    const [yourcmjWoodStaked, setYourCmjWoodStaked] = React.useState(0)
    const [farmJdao15Balance, setFarmJdao15Balance] = React.useState(0)
    const [jdao15Pending, setJdao15Pending] = React.useState(0)
    const [lpJdao15Withdraw, setLpJdao15Withdraw] = React.useState(0)
    const [lpJdao15Stake, setLpJdao15Stake] = React.useState(0)
    const [plutoCmjBalance, setPlutoCmjBalance] = React.useState(0)
    const [reserveCmjPLUTO, setReserveCmjPLUTO] = React.useState(0)
    const [reservePLUTO, setReservePLUTO] = React.useState(0)
    const [cmjPlutoStaked, setCmjPlutoStaked] = React.useState(0)
    const [cmjPlutoPooled, setCmjPlutoPooled] = React.useState(0)
    const [yourcmjPlutoStaked, setYourCmjPlutoStaked] = React.useState(0)
    const [farmJdao16Balance, setFarmJdao16Balance] = React.useState(0)
    const [jdao16Pending, setJdao16Pending] = React.useState(0)
    const [lpJdao16Withdraw, setLpJdao16Withdraw] = React.useState(0)
    const [lpJdao16Stake, setLpJdao16Stake] = React.useState(0)
    const [fbtcCmjBalance, setFbtcCmjBalance] = React.useState(0)
    const [reserveCmjFBTC, setReserveCmjFBTC] = React.useState(0)
    const [reserveFBTC, setReserveFBTC] = React.useState(0)
    const [cmjFbtcStaked, setCmjFbtcStaked] = React.useState(0)
    const [cmjFbtcPooled, setCmjFbtcPooled] = React.useState(0)
    const [yourcmjFbtcStaked, setYourCmjFbtcStaked] = React.useState(0)
    const [farmJdao17Balance, setFarmJdao17Balance] = React.useState(0)
    const [jdao17Pending, setJdao17Pending] = React.useState(0)
    const [lpJdao17Withdraw, setLpJdao17Withdraw] = React.useState(0)
    const [lpJdao17Stake, setLpJdao17Stake] = React.useState(0)
    const [x4CmjBalance, setX4CmjBalance] = React.useState(0)
    const [reserveCmjX4, setReserveCmjX4] = React.useState(0)
    const [reserveX4, setReserveX4] = React.useState(0)
    const [cmjX4Staked, setCmjX4Staked] = React.useState(0)
    const [cmjX4Pooled, setCmjX4Pooled] = React.useState(0)
    const [yourcmjX4Staked, setYourCmjX4Staked] = React.useState(0)
    const [farmJdao18Balance, setFarmJdao18Balance] = React.useState(0)
    const [jdao18Pending, setJdao18Pending] = React.useState(0)
    const [lpJdao18Withdraw, setLpJdao18Withdraw] = React.useState(0)
    const [lpJdao18Stake, setLpJdao18Stake] = React.useState(0)
    const [infpowCmjBalance, setInfpowCmjBalance] = React.useState(0)
    const [reserveCmjINFPOW, setReserveCmjINFPOW] = React.useState(0)
    const [reserveINFPOW, setReserveINFPOW] = React.useState(0)
    const [cmjInfpowStaked, setCmjInfpowStaked] = React.useState(0)
    const [cmjInfpowPooled, setCmjInfpowPooled] = React.useState(0)
    const [yourcmjInfpowStaked, setYourCmjInfpowStaked] = React.useState(0)
    const [farmJdao19Balance, setFarmJdao19Balance] = React.useState(0)
    const [jdao19Pending, setJdao19Pending] = React.useState(0)
    const [lpJdao19Withdraw, setLpJdao19Withdraw] = React.useState(0)
    const [lpJdao19Stake, setLpJdao19Stake] = React.useState(0)
    const [swapfee24hour1, setSwapfee24hour1] = React.useState(0)
    const [swapfee24hour2, setSwapfee24hour2] = React.useState(0)
    const [swapfee24hour3, setSwapfee24hour3] = React.useState(0)
    const [swapfee24hour3_2, setSwapfee24hour3_2] = React.useState(0)
    const [swapfee24hour4, setSwapfee24hour4] = React.useState(0)
    const [swapfee24hour4_2, setSwapfee24hour4_2] = React.useState(0)
    const [swapfee24hour5, setSwapfee24hour5] = React.useState(0)
    const [swapfee24hour5_2, setSwapfee24hour5_2] = React.useState(0)
    const [swapfee24hour6, setSwapfee24hour6] = React.useState(0)
    const [swapfee24hour6_2, setSwapfee24hour6_2] = React.useState(0)
    const [swapfee24hour7, setSwapfee24hour7] = React.useState(0)
    const [swapfee24hour7_2, setSwapfee24hour7_2] = React.useState(0)
    const [swapfee24hour8, setSwapfee24hour8] = React.useState(0)
    const [swapfee24hour8_2, setSwapfee24hour8_2] = React.useState(0)
    const [swapfee24hour9, setSwapfee24hour9] = React.useState(0)
    const [swapfee24hour9_2, setSwapfee24hour9_2] = React.useState(0)
    const [swapfee24hour10, setSwapfee24hour10] = React.useState(0)
    const [swapfee24hour10_2, setSwapfee24hour10_2] = React.useState(0)
    const [swapfee24hour11, setSwapfee24hour11] = React.useState(0)
    const [swapfee24hour11_2, setSwapfee24hour11_2] = React.useState(0)
    const [swapfee24hour12, setSwapfee24hour12] = React.useState(0)
    const [swapfee24hour12_2, setSwapfee24hour12_2] = React.useState(0)
    const [swapfee24hour13, setSwapfee24hour13] = React.useState(0)
    const [swapfee24hour13_2, setSwapfee24hour13_2] = React.useState(0)
    const [swapfee24hour14, setSwapfee24hour14] = React.useState(0)
    const [swapfee24hour14_2, setSwapfee24hour14_2] = React.useState(0)
    const [swapfee24hour15, setSwapfee24hour15] = React.useState(0)
    const [swapfee24hour15_2, setSwapfee24hour15_2] = React.useState(0)
    const [swapfee24hour16, setSwapfee24hour16] = React.useState(0)
    const [swapfee24hour16_2, setSwapfee24hour16_2] = React.useState(0)
    const [swapfee24hour17, setSwapfee24hour17] = React.useState(0)
    const [swapfee24hour17_2, setSwapfee24hour17_2] = React.useState(0)
    const [swapfee24hour18, setSwapfee24hour18] = React.useState(0)
    const [swapfee24hour18_2, setSwapfee24hour18_2] = React.useState(0)

    const harvestHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [1, 0],
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
    const harvestHandle202 = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [2, 0],
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
    const harvestHandle3 = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [3, 0],
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
    const [lpJdaoWithdraw, setLpJdaoWithdraw] = React.useState(0)
    const [lpJdao202Withdraw, setLpJdao202Withdraw] = React.useState(0)
    const [lpJdao3Withdraw, setLpJdao3Withdraw] = React.useState(0)
    const withdrawstakeHandle = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [1, ethers.utils.parseEther(String(lpJdaoWithdraw)).toString()],
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
    const handleWithdraw202 = (event) => { setLpJdao202Withdraw(event.target.value) }
    const withdrawstakeHandle202 = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [2, ethers.utils.parseEther(String(lpJdao202Withdraw)).toString()],
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
    const withdrawstakeHandle3 = async () => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [3, ethers.utils.parseEther(String(lpJdao3Withdraw)).toString()],
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
    const [lpJdaoStake, setLpJdaoStake] = React.useState(0)
    const [lpJdao3Stake, setLpJdao3Stake] = React.useState(0)
    const addstakeHandle = async () => {
        setisLoading(true)
        try {
            const lpAllow = await readContract(config, {
                address: jcExchange,
                abi: exchangeABI,
                functionName: 'allowance',
                args: [address, farmJdao],
            })
            if (Number(ethers.utils.formatEther(String(lpAllow))) < Number(lpJdaoStake)) {
                let { request } = await simulateContract(config, {
                    address: jcExchange,
                    abi: exchangeABI,
                    functionName: 'approve',
                    args: [farmJdao, ethers.constants.MaxUint256.toString()],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'deposit',
                args: [1, ethers.utils.parseEther(String(lpJdaoStake)).toString()],
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
    const addstakeHandle3 = async () => {
        setisLoading(true)
        try {
            const lpAllow = await readContract(config, {
                address: juExchange,
                abi: exchangeJulpABI,
                functionName: 'allowance',
                args: [address, farmJdao],
            })
            if (Number(ethers.utils.formatEther(String(lpAllow))) < Number(lpJdao3Stake)) {
                let { request } = await simulateContract(config, {
                    address: juExchange,
                    abi: exchangeJulpABI,
                    functionName: 'approve',
                    args: [farmJdao, ethers.constants.MaxUint256.toString()],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'deposit',
                args: [3, ethers.utils.parseEther(String(lpJdao3Stake)).toString()],
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

    const addstakeHandleAll = async (_index) => {
        setisLoading(true)
        let lp = '0x0000000000000000000000000000000000000000'
        let stake = 0
        if (_index === 4) {
            lp = jaspCmjLp
            stake = lpJdao4Stake 
        } else if (_index === 5) {
            lp = jdaoCmjLp
            stake = lpJdao5Stake 
        } else if (_index === 6) {
            lp = osCmjLp
            stake = lpJdao6Stake 
        } else if (_index === 7) {
            lp = cuCmjLp
            stake = lpJdao7Stake 
        } else if (_index === 8) {
            lp = silCmjLp
            stake = lpJdao8Stake 
        } else if (_index === 9) {
            lp = goldCmjLp
            stake = lpJdao9Stake 
        } else if (_index === 10) {
            lp = platCmjLp
            stake = lpJdao10Stake 
        } else if (_index === 12) {
            lp = ctunaCmjLp
            stake = lpJdao11Stake 
        } else if (_index === 13) {
            lp = sx31CmjLp
            stake = lpJdao12Stake 
        } else if (_index === 14) {
            lp = bbqCmjLp
            stake = lpJdao13Stake 
        } else if (_index === 15) {
            lp = pzaCmjLp
            stake = lpJdao14Stake 
        } else if (_index === 16) {
            lp = woodCmjLp
            stake = lpJdao15Stake 
        } else if (_index === 17) {
            lp = plutoCmjLp
            stake = lpJdao16Stake
        } else if (_index === 18) {
            lp = fbtcCmjLp
            stake = lpJdao17Stake
        } else if (_index === 19) {
            lp = x4CmjLp
            stake = lpJdao18Stake
        } else if (_index === 20) {
            lp = infpowCmjLp
            stake = lpJdao19Stake
        }
        try {
            const lpAllow = await readContract(config, {
                address: lp as `0x${string}`,
                abi: exchangeJulpABI,
                functionName: 'allowance',
                args: [address, farmJdao],
            })
            if (Number(ethers.utils.formatEther(String(lpAllow))) < stake) {
                let { request } = await simulateContract(config, {
                    address: lp as `0x${string}`,
                    abi: exchangeJulpABI,
                    functionName: 'approve',
                    args: [farmJdao, ethers.constants.MaxUint256.toString()],
                })
                let h = await writeContract(config, request)
                await waitForTransactionReceipt(config, { hash: h })
            }
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'deposit',
                args: [_index, ethers.utils.parseEther(String(stake)).toString()],
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
    const withdrawstakeHandleAll = async (_index) => {
        setisLoading(true)
        let withdraw = 0
        if (_index === 4) {
            withdraw = lpJdao4Withdraw 
        } else if (_index === 5) {
            withdraw = lpJdao5Withdraw 
        } else if (_index === 6) {
            withdraw = lpJdao6Withdraw 
        } else if (_index === 7) {
            withdraw = lpJdao7Withdraw 
        } else if (_index === 8) {
            withdraw = lpJdao8Withdraw 
        } else if (_index === 9) {
            withdraw = lpJdao9Withdraw 
        } else if (_index === 10) {
            withdraw = lpJdao10Withdraw 
        } else if (_index === 12) {
            withdraw = lpJdao11Withdraw 
        } else if (_index === 13) {
            withdraw = lpJdao12Withdraw 
        } else if (_index === 14) {
            withdraw = lpJdao13Withdraw 
        } else if (_index === 15) {
            withdraw = lpJdao14Withdraw 
        } else if (_index === 16) {
            withdraw = lpJdao15Withdraw 
        } else if (_index === 17) {
            withdraw = lpJdao16Withdraw 
        } else if (_index === 18) {
            withdraw = lpJdao17Withdraw 
        } else if (_index === 19) {
            withdraw = lpJdao18Withdraw 
        } else if (_index === 20) {
            withdraw = lpJdao19Withdraw 
        }
        try {
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [_index, ethers.utils.parseEther(String(withdraw)).toString()],
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
    const harvestHandleAll = async (_index) => {
        setisLoading(true)
        try {
            let { request } = await simulateContract(config, {
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [_index, 0],
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

    React.useEffect(() => {
        console.log("Connected to " + address)

        const thefetch = async () => {
            const data = address !== null ? await readContracts(config, {
                contracts: [
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [1, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [1, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [2, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [2, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [3, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [3, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [4, address],
                        chainId: 8899
                    },
                    {
                        address: jaspCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [4, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [5, address],
                        chainId: 8899
                    },
                    {
                        address: jdaoCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [5, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [6, address],
                        chainId: 8899
                    },
                    {
                        address: osCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [6, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [7, address],
                        chainId: 8899
                    },
                    {
                        address: cuCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [7, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [8, address],
                        chainId: 8899
                    },
                    {
                        address: silCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [8, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [9, address],
                        chainId: 8899
                    },
                    {
                        address: goldCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [9, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [10, address],
                        chainId: 8899
                    },
                    {
                        address: platCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [10, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [12, address],
                        chainId: 8899
                    },
                    {
                        address: ctunaCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [12, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [13, address],
                        chainId: 8899
                    },
                    {
                        address: sx31CmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [13, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [14, address],
                        chainId: 8899
                    },
                    {
                        address: bbqCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [14, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [15, address],
                        chainId: 8899
                    },
                    {
                        address: pzaCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [15, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [16, address],
                        chainId: 8899
                    },
                    {
                        address: woodCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [16, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [17, address],
                        chainId: 8899
                    },
                    {
                        address: plutoCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [17, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [18, address],
                        chainId: 8899
                    },
                    {
                        address: fbtcCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [18, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [19, address],
                        chainId: 8899
                    },
                    {
                        address: x4CmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [19, address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [20, address],
                        chainId: 8899
                    },
                    {
                        address: infpowCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [address],
                        chainId: 8899
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [20, address],
                        chainId: 8899
                    },
                ],
            }) : [
                {result: [0]}, {result: 0}, {result: [0]}, {result: 0}, {result: [0]}, {result: 0}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]},
                {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]},
                {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]},
                {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, 
                {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]},
                {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]},
            ]
            const farmJdaoBal = data[0]
            const jdaoPend = data[1]
            const farmJdao202Bal = data[2]
            const jdao202Pend = data[3]
            const farmJdao3Bal = data[4]
            const jdao3Pend = data[5]
            const farmJdao4Bal = data[6]
            const jaspcmjbal = data[7]
            const jdao4Pend = data[8]
            const farmJdao5Bal = data[9]
            const jdaocmjbal = data[10]
            const jdao5Pend = data[11]
            const farmJdao6Bal = data[12]
            const oscmjbal = data[13]
            const jdao6Pend = data[14]
            const farmJdao7Bal = data[15]
            const cucmjbal = data[16]
            const jdao7Pend = data[17]
            const farmJdao8Bal = data[18]
            const silcmjbal = data[19]
            const jdao8Pend = data[20]
            const farmJdao9Bal = data[21]
            const goldcmjbal = data[22]
            const jdao9Pend = data[23]
            const farmJdao10Bal = data[24]
            const platcmjbal = data[25]
            const jdao10Pend = data[26]
            const farmJdao11Bal = data[27]
            const ctunacmjbal = data[28]
            const jdao11Pend = data[29]
            const farmJdao12Bal = data[30]
            const sx31cmjbal = data[31]
            const jdao12Pend = data[32]
            const farmJdao13Bal = data[33]
            const bbqcmjbal = data[34]
            const jdao13Pend = data[35]
            const farmJdao14Bal = data[36]
            const pzacmjbal = data[37]
            const jdao14Pend = data[38]
            const farmJdao15Bal = data[39]
            const woodcmjbal = data[40]
            const jdao15Pend = data[41]
            const farmJdao16Bal = data[42]
            const plutocmjbal = data[43]
            const jdao16Pend = data[44]
            const farmJdao17Bal = data[45]
            const fbtccmjbal = data[46]
            const jdao17Pend = data[47]
            const farmJdao18Bal = data[48]
            const x4cmjbal = data[49]
            const jdao18Pend = data[50]
            const farmJdao19Bal = data[51]
            const infpowcmjbal = data[52]
            const jdao19Pend = data[53]

            const data2 = await readContracts(config, {
                contracts: [
                    {
                        address: jcExchange,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: juExchange,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: jcExchange,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: cmjToken,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: juExchange,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: jaspCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: jaspCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: jaspCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: jdaoCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: jdaoCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: jdaoCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: osCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: osCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: osCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: jdaoCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: cuCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: cuCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: cuCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: silCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: silCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: silCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: goldCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: goldCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: goldCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: platCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: platCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: platCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: ctunaCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: ctunaCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: ctunaCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: sx31CmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: sx31CmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: sx31CmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: bbqCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: bbqCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: bbqCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: pzaCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: pzaCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: pzaCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: woodCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: woodCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: woodCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: bbqCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: pzaCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: woodCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: sx31CmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: ctunaCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: platCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: goldCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: silCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: cuCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: osCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: jaspCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: plutoCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: plutoCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: plutoCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: plutoCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: fbtcCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: fbtcCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: fbtcCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: fbtcCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: x4CmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: x4CmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: x4CmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: x4CmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: infpowCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: infpowCmjLp,
                        abi: erc20Abi,
                        functionName: 'totalSupply',
                        args: [],
                        chainId: 8899
                    },
                    {
                        address: infpowCmjLp,
                        abi: erc20Abi,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                        chainId: 8899
                    },
                    {
                        address: infpowCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                        args: [],
                        chainId: 8899
                    },
                ],
            })
            const jclpTotalSup = data2[0]
            const julpTotalSup = data2[1]
            const farmJdaoTotalStake = data2[2]
            const farmJdao202TotalStake = data2[3]
            const farmJdao3TotalStake = data2[4]
            const _reserveCmjJASP = data2[5]
            const jaspCmjTotalSup = data2[6]
            const farmJdao4TotalStake = data2[7]
            const _reserveCmjJDAO = data2[8]
            const jdaoCmjTotalSup = data2[9]
            const farmJdao5TotalStake = data2[10]
            const _reserveCmjOS = data2[11]
            const osCmjTotalSup = data2[12]
            const farmJdao6TotalStake = data2[13]
            const _reserveJDAO = data2[14]
            const _reserveCmjCU = data2[15]
            const cuCmjTotalSup = data2[16]
            const farmJdao7TotalStake = data2[17]
            const _reserveCmjSIL = data2[18]
            const silCmjTotalSup = data2[19]
            const farmJdao8TotalStake = data2[20]
            const _reserveCmjGOLD = data2[21]
            const goldCmjTotalSup = data2[22]
            const farmJdao9TotalStake = data2[23]
            const _reserveCmjPLAT = data2[24]
            const platCmjTotalSup = data2[25]
            const farmJdao10TotalStake = data2[26]
            const _reserveCmjCTUNA = data2[27]
            const ctunaCmjTotalSup = data2[28]
            const farmJdao11TotalStake = data2[29]
            const _reserveCmjSX31 = data2[30]
            const sx31CmjTotalSup = data2[31]
            const farmJdao12TotalStake = data2[32]
            const _reserveCmjBBQ = data2[33]
            const bbqCmjTotalSup = data2[34]
            const farmJdao13TotalStake = data2[35]
            const _reserveCmjPZA = data2[36]
            const pzaCmjTotalSup = data2[37]
            const farmJdao14TotalStake = data2[38]
            const _reserveCmjWOOD = data2[39]
            const woodCmjTotalSup = data2[40]
            const farmJdao15TotalStake = data2[41]
            const _reserveBBQ = data2[42]
            const _reservePZA = data2[43]
            const _reserveWOOD = data2[44]
            const _reserveSX31 = data2[45]
            const _reserveCTUNA = data2[46]
            const _reservePLAT = data2[47]
            const _reserveGOLD = data2[48]
            const _reserveSIL = data2[49]
            const _reserveCU = data2[50]
            const _reserveOS = data2[51]
            const _reserveJASP = data2[52]
            const _reserveCmjPLUTO = data2[53]
            const plutoCmjTotalSup = data2[54]
            const farmJdao16TotalStake = data2[55]
            const _reservePLUTO = data2[56]
            const _reserveCmjFBTC = data2[57]
            const fbtcCmjTotalSup = data2[58]
            const farmJdao17TotalStake = data2[59]
            const _reserveFBTC = data2[60]
            const _reserveCmjX4 = data2[61]
            const x4CmjTotalSup = data2[62]
            const farmJdao18TotalStake = data2[63]
            const _reserveX4 = data2[64]
            const _reserveCmjINFPOW = data2[65]
            const infpowCmjTotalSup = data2[66]
            const farmJdao19TotalStake = data2[67]
            const _reserveINFPOW = data2[68]
            
            return [
                jclpTotalSup, julpTotalSup, farmJdaoBal, farmJdaoTotalStake, jdaoPend, farmJdao202Bal, farmJdao202TotalStake, jdao202Pend, farmJdao3Bal, farmJdao3TotalStake, jdao3Pend,
                null, null, farmJdao4Bal, jdao4Pend, jaspcmjbal, _reserveCmjJASP, jaspCmjTotalSup, farmJdao4TotalStake, null, 
                farmJdao5Bal, jdao5Pend, jdaocmjbal, _reserveCmjJDAO, jdaoCmjTotalSup, farmJdao5TotalStake, null, 
                farmJdao6Bal, jdao6Pend, oscmjbal, _reserveCmjOS, osCmjTotalSup, farmJdao6TotalStake, null, _reserveJDAO,
                farmJdao7Bal, jdao7Pend, cucmjbal, _reserveCmjCU, cuCmjTotalSup, farmJdao7TotalStake, null,
                farmJdao8Bal, jdao8Pend, silcmjbal, _reserveCmjSIL, silCmjTotalSup, farmJdao8TotalStake, null,
                farmJdao9Bal, jdao9Pend, goldcmjbal, _reserveCmjGOLD, goldCmjTotalSup, farmJdao9TotalStake, null,
                farmJdao10Bal, jdao10Pend, platcmjbal, _reserveCmjPLAT, platCmjTotalSup, farmJdao10TotalStake, null,
                farmJdao11Bal, jdao11Pend, ctunacmjbal, _reserveCmjCTUNA, ctunaCmjTotalSup, farmJdao11TotalStake, null,
                farmJdao12Bal, jdao12Pend, sx31cmjbal, _reserveCmjSX31, sx31CmjTotalSup, farmJdao12TotalStake, null,
                farmJdao13Bal, jdao13Pend, bbqcmjbal, _reserveCmjBBQ, bbqCmjTotalSup, farmJdao13TotalStake, null,
                farmJdao14Bal, jdao14Pend, pzacmjbal, _reserveCmjPZA, pzaCmjTotalSup, farmJdao14TotalStake, null,
                farmJdao15Bal, jdao15Pend, woodcmjbal, _reserveCmjWOOD, woodCmjTotalSup, farmJdao15TotalStake, null,
                _reserveBBQ, null, _reservePZA, null, _reserveWOOD, null, _reserveSX31, null, _reserveCTUNA, null, _reservePLAT, null, _reserveGOLD, null, _reserveSIL, null, _reserveCU, null,  _reserveOS, null,  null, _reserveJASP, null,
                farmJdao16Bal, jdao16Pend, plutocmjbal, _reserveCmjPLUTO, plutoCmjTotalSup, farmJdao16TotalStake, null, _reservePLUTO, null,
                farmJdao17Bal, jdao17Pend, fbtccmjbal, _reserveCmjFBTC, fbtcCmjTotalSup, farmJdao17TotalStake, null, _reserveFBTC, null,
                farmJdao18Bal, jdao18Pend, x4cmjbal, _reserveCmjX4, x4CmjTotalSup, farmJdao18TotalStake, null, _reserveX4, null,
                farmJdao19Bal, jdao19Pend, infpowcmjbal, _reserveCmjINFPOW, infpowCmjTotalSup, farmJdao19TotalStake, null, _reserveINFPOW, null,
            ]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then((result: any) => {
            const _lptotalsupply = Number(ethers.utils.formatEther(result[0].result))
            const _julptotalsupply = Number(ethers.utils.formatEther(result[1].result))
            const _farmjdaobalance = Number(ethers.utils.formatEther(result[2].result[0]))
            setFarmJdaoBalance(_farmjdaobalance)
            const _farmjdaototalstake = Number(ethers.utils.formatEther(result[3].result))
            setJbcJdaoStaked((Number(jbcReserv) * _farmjdaototalstake) / _lptotalsupply)
            setCmjJdaoStaked((Number(cmjReserv) * _farmjdaototalstake) / _lptotalsupply)
            setYourJbcJdaoStaked((Number(jbcReserv) * _farmjdaobalance) / _lptotalsupply)
            setYourCmjJdaoStaked((Number(cmjReserv) * _farmjdaobalance) / _lptotalsupply)
            setJdaoPending(Number(Number(ethers.utils.formatEther(result[4].result)).toFixed(4)))
            setFarmJdao202Balance(Number(Number(ethers.utils.formatEther(result[5].result[0])).toFixed(4)))
            setCmjJdao202Staked(Number(Number(ethers.utils.formatEther(result[6].result)).toFixed(4)))
            setJdao202Pending(Number(Number(ethers.utils.formatEther(result[7].result)).toFixed(4)))
            const _farmjdao3balance = Number(ethers.utils.formatEther(result[8].result[0]))
            setFarmJdao3Balance(_farmjdao3balance)
            const _farmjdao3totalstake = Number(ethers.utils.formatEther(result[9].result))
            setJbcJdao3Staked((Number(jbcJuReserv) * _farmjdao3totalstake) / _julptotalsupply)
            setJusdtJdao3Staked((Number(jusdtJuReserv) * _farmjdao3totalstake) / _julptotalsupply)
            setYourJbcJdao3Staked((Number(jbcJuReserv) * _farmjdao3balance) / _julptotalsupply)
            setYourJusdtJdao3Staked((Number(jusdtJuReserv) * _farmjdao3balance) / _julptotalsupply)
            setJdao3Pending(Number(Number(ethers.utils.formatEther(result[10].result)).toFixed(4)))
            const _farmjdao4balance = Number(ethers.utils.formatEther(result[13].result[0]))
            setFarmJdao4Balance(_farmjdao4balance)
            setJdao4Pending(Number(Number(ethers.utils.formatEther(result[14].result)).toFixed(4)))
            setJaspCmjBalance(Number(ethers.utils.formatEther(result[15].result)))
            const _cmjjaspreserve = Number(ethers.utils.formatEther(result[16].result))
            setReserveCmjJASP(_cmjjaspreserve)
            const _jaspcmjtotalsupply = Number(ethers.utils.formatEther(result[17].result))
            const _farmjdao4totalstake = Number(ethers.utils.formatEther(result[18].result))
            setCmjJaspStaked((_cmjjaspreserve * _farmjdao4totalstake) / _jaspcmjtotalsupply)
            setCmjJaspPooled((_cmjjaspreserve * Number(ethers.utils.formatEther(result[15].result))) / _jaspcmjtotalsupply)
            setYourCmjJaspStaked((_cmjjaspreserve * _farmjdao4balance) / _jaspcmjtotalsupply)
            setReserveJASP(Number(ethers.utils.formatEther(result[119].result)))
            const _farmjdao5balance = Number(ethers.utils.formatEther(result[20].result[0]))
            setFarmJdao5Balance(_farmjdao5balance)
            setJdao5Pending(Number(Number(ethers.utils.formatEther(result[21].result)).toFixed(4)))
            setJdaoCmjBalance(Number(ethers.utils.formatEther(result[22].result)))
            const _cmjjdaoreserve = Number(ethers.utils.formatEther(result[23].result))
            setReserveCmjJDAO(_cmjjdaoreserve)
            const _jdaocmjtotalsupply = Number(ethers.utils.formatEther(result[24].result))
            const _farmjdao5totalstake = Number(ethers.utils.formatEther(result[25].result))
            setCmjJdaoLpStaked((_cmjjdaoreserve * _farmjdao5totalstake) / _jdaocmjtotalsupply)
            setCmjJdaoPooled((_cmjjdaoreserve * Number(ethers.utils.formatEther(result[22].result))) / _jdaocmjtotalsupply)
            setYourCmjJdaoLpStaked((_cmjjdaoreserve * _farmjdao5balance) / _jdaocmjtotalsupply)
            setReserveJDAO(Number(ethers.utils.formatEther(result[34].result)))
            const _farmjdao6balance = Number(ethers.utils.formatEther(result[27].result[0]))
            setFarmJdao6Balance(_farmjdao6balance)
            setJdao6Pending(Number(Number(ethers.utils.formatEther(result[28].result)).toFixed(4)))
            setOsCmjBalance(Number(ethers.utils.formatEther(result[29].result)))
            const _cmjosreserve = Number(ethers.utils.formatEther(result[30].result))
            setReserveCmjOS(_cmjosreserve)
            const _oscmjtotalsupply = Number(ethers.utils.formatEther(result[31].result))
            const _farmjdao6totalstake = Number(ethers.utils.formatEther(result[32].result))
            setCmjOsStaked((_cmjosreserve * _farmjdao6totalstake) / _oscmjtotalsupply)
            setCmjOsPooled((_cmjosreserve * Number(ethers.utils.formatEther(result[29].result))) / _oscmjtotalsupply)
            setYourCmjOsStaked((_cmjosreserve * _farmjdao6balance) / _oscmjtotalsupply)
            setReserveOS(Number(ethers.utils.formatEther(result[116].result)))
            const _farmjdao7balance = Number(ethers.utils.formatEther(result[35].result[0]))
            setFarmJdao7Balance(_farmjdao7balance)
            setJdao7Pending(Number(Number(ethers.utils.formatEther(result[36].result)).toFixed(4)))
            setCuCmjBalance(Number(ethers.utils.formatEther(result[37].result)))
            const _cmjcureserve = Number(ethers.utils.formatEther(result[38].result))
            setReserveCmjCU(_cmjcureserve)
            const _cucmjtotalsupply = Number(ethers.utils.formatEther(result[39].result))
            const _farmjdao7totalstake = Number(ethers.utils.formatEther(result[40].result))
            setCmjCuStaked((_cmjcureserve * _farmjdao7totalstake) / _cucmjtotalsupply)
            setCmjCuPooled((_cmjcureserve * Number(ethers.utils.formatEther(result[37].result))) / _cucmjtotalsupply)
            setYourCmjCuStaked((_cmjcureserve * _farmjdao7balance) / _cucmjtotalsupply)
            setReserveCU(Number(ethers.utils.formatEther(result[114].result)))
            const _farmjdao8balance = Number(ethers.utils.formatEther(result[42].result[0]))
            setFarmJdao8Balance(_farmjdao8balance)
            setJdao8Pending(Number(Number(ethers.utils.formatEther(result[43].result)).toFixed(4)))
            setSilCmjBalance(Number(ethers.utils.formatEther(result[44].result)))
            const _cmjsilreserve = Number(ethers.utils.formatEther(result[45].result))
            setReserveCmjSIL(_cmjsilreserve)
            const _silcmjtotalsupply = Number(ethers.utils.formatEther(result[46].result))
            const _farmjdao8totalstake = Number(ethers.utils.formatEther(result[47].result))
            setCmjSilStaked((_cmjsilreserve * _farmjdao8totalstake) / _silcmjtotalsupply)
            setCmjSilPooled((_cmjsilreserve * Number(ethers.utils.formatEther(result[44].result))) / _silcmjtotalsupply)
            setYourCmjSilStaked((_cmjsilreserve * _farmjdao8balance) / _silcmjtotalsupply)
            setReserveSIL(Number(ethers.utils.formatEther(result[112].result)))
            const _farmjdao9balance = Number(ethers.utils.formatEther(result[49].result[0]))
            setFarmJdao9Balance(_farmjdao9balance)
            setJdao9Pending(Number(Number(ethers.utils.formatEther(result[50].result)).toFixed(4)))
            setGoldCmjBalance(Number(ethers.utils.formatEther(result[51].result)))
            const _cmjgoldreserve = Number(ethers.utils.formatEther(result[52].result))
            setReserveCmjGOLD(_cmjgoldreserve)
            const _goldcmjtotalsupply = Number(ethers.utils.formatEther(result[53].result))
            const _farmjdao9totalstake = Number(ethers.utils.formatEther(result[54].result))
            setCmjGoldStaked((_cmjgoldreserve * _farmjdao9totalstake) / _goldcmjtotalsupply)
            setCmjGoldPooled((_cmjgoldreserve * Number(ethers.utils.formatEther(result[51].result))) / _goldcmjtotalsupply)
            setYourCmjGoldStaked((_cmjgoldreserve * _farmjdao9balance) / _goldcmjtotalsupply)
            setReserveGOLD(Number(ethers.utils.formatEther(result[110].result)))
            const _farmjdao10balance = Number(ethers.utils.formatEther(result[56].result[0]))
            setFarmJdao10Balance(_farmjdao10balance)
            setJdao10Pending(Number(Number(ethers.utils.formatEther(result[57].result)).toFixed(4)))
            setPlatCmjBalance(Number(ethers.utils.formatEther(result[58].result)))
            const _cmjplatreserve = Number(ethers.utils.formatEther(result[59].result))
            setReserveCmjPLAT(_cmjplatreserve)
            const _platcmjtotalsupply = Number(ethers.utils.formatEther(result[60].result))
            const _farmjdao10totalstake = Number(ethers.utils.formatEther(result[61].result))
            setCmjPlatStaked((_cmjplatreserve * _farmjdao10totalstake) / _platcmjtotalsupply)
            setCmjPlatPooled((_cmjplatreserve * Number(ethers.utils.formatEther(result[58].result))) / _platcmjtotalsupply)
            setYourCmjPlatStaked((_cmjplatreserve * _farmjdao10balance) / _platcmjtotalsupply)
            setReservePLAT(Number(ethers.utils.formatEther(result[108].result)))
            const _farmjdao11balance = Number(ethers.utils.formatEther(result[63].result[0]))
            setFarmJdao11Balance(_farmjdao11balance)
            setJdao11Pending(Number(Number(ethers.utils.formatEther(result[64].result)).toFixed(4)))
            setCtunaCmjBalance(Number(ethers.utils.formatEther(result[65].result)))
            const _cmjctunareserve = Number(ethers.utils.formatEther(result[66].result))
            setReserveCmjCTUNA(_cmjctunareserve)
            const _ctunacmjtotalsupply = Number(ethers.utils.formatEther(result[67].result))
            const _farmjdao11totalstake = Number(ethers.utils.formatEther(result[68].result))
            setCmjCtunaStaked((_cmjctunareserve * _farmjdao11totalstake) / _ctunacmjtotalsupply)
            setCmjCtunaPooled((_cmjctunareserve * Number(ethers.utils.formatEther(result[65].result))) / _ctunacmjtotalsupply)
            setYourCmjCtunaStaked((_cmjctunareserve * _farmjdao11balance) / _ctunacmjtotalsupply)
            setReserveCTUNA(Number(ethers.utils.formatEther(result[106].result)))
            const _farmjdao12balance = Number(ethers.utils.formatEther(result[70].result[0]))
            setFarmJdao12Balance(_farmjdao12balance)
            setJdao12Pending(Number(Number(ethers.utils.formatEther(result[71].result)).toFixed(4)))
            setSx31CmjBalance(Number(ethers.utils.formatEther(result[72].result)))
            const _cmjsx31reserve = Number(ethers.utils.formatEther(result[73].result))
            setReserveCmjSX31(_cmjsx31reserve)
            const _sx31cmjtotalsupply = Number(ethers.utils.formatEther(result[74].result))
            const _farmjdao12totalstake = Number(ethers.utils.formatEther(result[75].result))
            setCmjSx31Staked((_cmjsx31reserve * _farmjdao12totalstake) / _sx31cmjtotalsupply)
            setCmjSx31Pooled((_cmjsx31reserve * Number(ethers.utils.formatEther(result[72].result))) / _sx31cmjtotalsupply)
            setYourCmjSx31Staked((_cmjsx31reserve * _farmjdao12balance) / _sx31cmjtotalsupply)
            setReserveSX31(Number(ethers.utils.formatEther(result[104].result)))
            const _farmjdao13balance = Number(ethers.utils.formatEther(result[77].result[0]))
            setFarmJdao13Balance(_farmjdao13balance)
            setJdao13Pending(Number(Number(ethers.utils.formatEther(result[78].result)).toFixed(4)))
            setBbqCmjBalance(Number(ethers.utils.formatEther(result[79].result)))
            const _cmjbbqreserve = Number(ethers.utils.formatEther(result[80].result))
            setReserveCmjBBQ(_cmjbbqreserve)
            const _bbqcmjtotalsupply = Number(ethers.utils.formatEther(result[81].result))
            const _farmjdao13totalstake = Number(ethers.utils.formatEther(result[82].result))
            setCmjBbqStaked((_cmjbbqreserve * _farmjdao13totalstake) / _bbqcmjtotalsupply)
            setCmjBbqPooled((_cmjbbqreserve * Number(ethers.utils.formatEther(result[79].result))) / _bbqcmjtotalsupply)
            setYourCmjBbqStaked((_cmjbbqreserve * Number(_farmjdao13balance)) / _bbqcmjtotalsupply)
            setReserveBBQ(Number(ethers.utils.formatEther(result[98].result)))
            const _farmjdao14balance = Number(ethers.utils.formatEther(result[84].result[0]))
            setFarmJdao14Balance(_farmjdao14balance)
            setJdao14Pending(Number(Number(ethers.utils.formatEther(result[85].result)).toFixed(4)))
            setPzaCmjBalance(Number(ethers.utils.formatEther(result[86].result)))
            const _cmjpzareserve = Number(ethers.utils.formatEther(result[87].result))
            setReserveCmjPZA(_cmjpzareserve)
            const _pzacmjtotalsupply = Number(ethers.utils.formatEther(result[88].result))
            const _farmjdao14totalstake = Number(ethers.utils.formatEther(result[89].result))
            setCmjPzaStaked((_cmjpzareserve * _farmjdao14totalstake) / _pzacmjtotalsupply)
            setCmjPzaPooled((_cmjpzareserve * Number(ethers.utils.formatEther(result[86].result))) / _pzacmjtotalsupply)
            setYourCmjPzaStaked((_cmjpzareserve * _farmjdao14balance) / _pzacmjtotalsupply)
            setReservePZA(Number(ethers.utils.formatEther(result[100].result)))
            const _farmjdao15balance = Number(ethers.utils.formatEther(result[91].result[0]))
            setFarmJdao15Balance(_farmjdao15balance)
            setJdao15Pending(Number(Number(ethers.utils.formatEther(result[92].result)).toFixed(4)))
            setWoodCmjBalance(Number(ethers.utils.formatEther(result[93].result)))
            const _cmjwoodreserve = Number(ethers.utils.formatEther(result[94].result))
            setReserveCmjWOOD(_cmjwoodreserve)
            const _woodcmjtotalsupply = Number(ethers.utils.formatEther(result[95].result))
            const _farmjdao15totalstake = Number(ethers.utils.formatEther(result[96].result))
            setCmjWoodStaked((_cmjwoodreserve * _farmjdao15totalstake) / _woodcmjtotalsupply)
            setCmjWoodPooled((_cmjwoodreserve * Number(ethers.utils.formatEther(result[93].result))) / _woodcmjtotalsupply)
            setYourCmjWoodStaked((_cmjwoodreserve * _farmjdao15balance) / _woodcmjtotalsupply)
            setReserveWOOD(Number(ethers.utils.formatEther(result[102].result)))
            const _farmjdao16balance = Number(ethers.utils.formatEther(result[121].result[0]))
            setFarmJdao16Balance(_farmjdao16balance)
            setJdao16Pending(Number(Number(ethers.utils.formatEther(result[122].result)).toFixed(4)))
            setPlutoCmjBalance(Number(ethers.utils.formatEther(result[123].result)))
            const _cmjplutoreserve = Number(ethers.utils.formatEther(result[124].result))
            setReserveCmjPLUTO(_cmjplutoreserve)
            const _plutocmjtotalsupply = Number(ethers.utils.formatEther(result[125].result))
            const _farmjdao16totalstake = Number(ethers.utils.formatEther(result[126].result))
            setCmjPlutoStaked((_cmjplutoreserve * _farmjdao16totalstake) / _plutocmjtotalsupply)
            setCmjPlutoPooled((_cmjplutoreserve * Number(ethers.utils.formatEther(result[123].result))) / _plutocmjtotalsupply)
            setYourCmjPlutoStaked((_cmjplutoreserve * _farmjdao16balance) / _plutocmjtotalsupply)
            setReservePLUTO(Number(ethers.utils.formatEther(result[128].result)))
            const _farmjdao17balance = Number(ethers.utils.formatEther(result[130].result[0]))
            setFarmJdao17Balance(_farmjdao17balance)
            setJdao17Pending(Number(Number(ethers.utils.formatEther(result[131].result)).toFixed(4)))
            setFbtcCmjBalance(Number(ethers.utils.formatEther(result[132].result)))
            const _cmjfbtcreserve = Number(ethers.utils.formatEther(result[133].result))
            setReserveCmjFBTC(_cmjfbtcreserve)
            const _fbtccmjtotalsupply = Number(ethers.utils.formatEther(result[134].result))
            const _farmjdao17totalstake = Number(ethers.utils.formatEther(result[135].result))
            setCmjFbtcStaked((_cmjfbtcreserve * _farmjdao17totalstake) / _fbtccmjtotalsupply)
            setCmjFbtcPooled((_cmjfbtcreserve * Number(ethers.utils.formatEther(result[132].result))) / _fbtccmjtotalsupply)
            setYourCmjFbtcStaked((_cmjfbtcreserve * _farmjdao17balance) / _fbtccmjtotalsupply)
            setReserveFBTC(Number(result[137].result))
            const _farmjdao18balance = Number(ethers.utils.formatEther(result[139].result[0]))
            setFarmJdao18Balance(_farmjdao18balance)
            setJdao18Pending(Number(Number(ethers.utils.formatEther(result[140].result)).toFixed(4)))
            setX4CmjBalance(Number(ethers.utils.formatEther(result[141].result)))
            const _cmjx4reserve = Number(ethers.utils.formatEther(result[142].result))
            setReserveCmjX4(_cmjx4reserve)
            const _x4cmjtotalsupply = Number(ethers.utils.formatEther(result[143].result))
            const _farmjdao18totalstake = Number(ethers.utils.formatEther(result[144].result))
            setCmjX4Staked((_cmjx4reserve * _farmjdao18totalstake) / _x4cmjtotalsupply)
            setCmjX4Pooled((_cmjx4reserve * Number(ethers.utils.formatEther(result[141].result))) / _x4cmjtotalsupply)
            setYourCmjX4Staked((_cmjx4reserve * Number(_farmjdao18balance)) / _x4cmjtotalsupply)
            setReserveX4(Number(ethers.utils.formatEther(result[146].result)))
            const _farmjdao19balance = Number(ethers.utils.formatEther(result[148].result[0]))
            setFarmJdao19Balance(_farmjdao19balance)
            setJdao19Pending(Number(Number(ethers.utils.formatEther(result[149].result)).toFixed(4)))
            setInfpowCmjBalance(Number(ethers.utils.formatEther(result[150].result)))
            const _cmjinfpowreserve = Number(ethers.utils.formatEther(result[151].result))
            setReserveCmjINFPOW(_cmjinfpowreserve)
            const _infpowcmjtotalsupply = Number(ethers.utils.formatEther(result[152].result))
            const _farmjdao19totalstake = Number(ethers.utils.formatEther(result[153].result))
            setCmjInfpowStaked((_cmjinfpowreserve * _farmjdao19totalstake) / _infpowcmjtotalsupply)
            setCmjInfpowPooled((_cmjinfpowreserve * Number(ethers.utils.formatEther(result[150].result))) / _infpowcmjtotalsupply)
            setYourCmjInfpowStaked((_cmjinfpowreserve * _farmjdao19balance) / _infpowcmjtotalsupply)
            setReserveINFPOW(Number(ethers.utils.formatEther(result[155].result)))
        })
    }, [config, address, txupdate, jbcReserv, cmjReserv, jbcJuReserv, jusdtJuReserv, cmjToken, jcExchange, juExchange, farmJdaoABI, erc20Abi, cmdaoAmmNpcABI])

    React.useEffect(() => {
        const thefetch = async () => {
            const blocknumber = await publicClient.getBlockNumber()
            const fee1filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jusdtToken, eventName: 'Transfer', args: { to: '0x280608DD7712a5675041b95d0000B9089903B569' }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee1log = publicClient.getFilterLogs({ filter: fee1filter })
            const fee2filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: jusdtToken, eventName: 'Transfer', args: { from: '0x280608DD7712a5675041b95d0000B9089903B569' }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee2log = publicClient.getFilterLogs({ filter: fee2filter })
            const fee3filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { to: '0x472d0e2E9839c140786D38110b3251d5ED08DF41' }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee3log = publicClient.getFilterLogs({ filter: fee3filter })
            const fee4filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: '0x472d0e2E9839c140786D38110b3251d5ED08DF41' }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee4log = publicClient.getFilterLogs({ filter: fee4filter })
            const fee5filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: jaspCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee5log = publicClient.getFilterLogs({ filter: fee5filter })
            const fee6filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860', eventName: 'Transfer', args: { from: jaspCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee6log = publicClient.getFilterLogs({ filter: fee6filter })
            const fee7filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: jdaoCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee7log = publicClient.getFilterLogs({ filter: fee7filter })
            const fee8filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88', eventName: 'Transfer', args: { from: jdaoCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee8log = publicClient.getFilterLogs({ filter: fee8filter })
            const fee9filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: osCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee9log = publicClient.getFilterLogs({ filter: fee9filter })
            const fee10filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0xAc5299D92373E9352636559cca497d7683A47655', eventName: 'Transfer', args: { from: osCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee10log = publicClient.getFilterLogs({ filter: fee10filter })
            const fee11filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: cuCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee11log = publicClient.getFilterLogs({ filter: fee11filter })
            const fee12filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841', eventName: 'Transfer', args: { from: cuCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee12log = publicClient.getFilterLogs({ filter: fee12filter })
            const fee13filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: silCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee13log = publicClient.getFilterLogs({ filter: fee13filter })
            const fee14filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f', eventName: 'Transfer', args: { from: silCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee14log = publicClient.getFilterLogs({ filter: fee14filter })
            const fee15filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: goldCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee15log = publicClient.getFilterLogs({ filter: fee15filter })
            const fee16filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x7d5346E33889580528e6F79f48BdEE94D8A9E144', eventName: 'Transfer', args: { from: goldCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee16log = publicClient.getFilterLogs({ filter: fee16filter })
            const fee17filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: platCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee17log = publicClient.getFilterLogs({ filter: fee17filter })
            const fee18filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD', eventName: 'Transfer', args: { from: platCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee18log = publicClient.getFilterLogs({ filter: fee18filter })
            const fee19filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: ctunaCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee19log = publicClient.getFilterLogs({ filter: fee19filter })
            const fee20filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0', eventName: 'Transfer', args: { from: ctunaCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee20log = publicClient.getFilterLogs({ filter: fee20filter })
            const fee21filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: sx31CmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee21log = publicClient.getFilterLogs({ filter: fee21filter })
            const fee22filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0xd431d826d7a4380b9259612176f00528b88840a7', eventName: 'Transfer', args: { from: sx31CmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter as Filter
            const fee22log = publicClient.getFilterLogs({ filter: fee22filter })
            const fee23filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: bbqCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee23log = publicClient.getFilterLogs({ filter: fee23filter })
            const fee24filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x7004757e595409568Bd728736e1b0c79FDc94e1c', eventName: 'Transfer', args: { from: bbqCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee24log = publicClient.getFilterLogs({ filter: fee24filter })
            const fee25filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: pzaCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee25log = publicClient.getFilterLogs({ filter: fee25filter })
            const fee26filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x09DcdCFc6C48803681a3422997c679E773656763', eventName: 'Transfer', args: { from: pzaCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee26log = publicClient.getFilterLogs({ filter: fee26filter })
            const fee27filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: woodCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee27log = publicClient.getFilterLogs({ filter: fee27filter })
            const fee28filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0xc2744Ff255518a736505cF9aC1996D9adDec69Bd', eventName: 'Transfer', args: { from: woodCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee28log = publicClient.getFilterLogs({ filter: fee28filter })
            const fee29filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: plutoCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee29log = publicClient.getFilterLogs({ filter: fee29filter })
            const fee30filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x70a74ec50bcceae43dd16f48492552a8b25403ea', eventName: 'Transfer', args: { from: plutoCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee30log = publicClient.getFilterLogs({ filter: fee30filter })
            const fee31filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: fbtcCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee31log = publicClient.getFilterLogs({ filter: fee31filter })
            const fee32filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x8656268C82cffda9062387F8F117166F01e8Ef2E', eventName: 'Transfer', args: { from: fbtcCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee32log = publicClient.getFilterLogs({ filter: fee32filter })
            const fee33filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: x4CmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee33log = publicClient.getFilterLogs({ filter: fee33filter })
            const fee34filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0x0DF9D160489440D630a247fBC830DA74779928b1', eventName: 'Transfer', args: { from: x4CmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee34log = publicClient.getFilterLogs({ filter: fee34filter })
            const fee35filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: cmjToken, eventName: 'Transfer', args: { from: infpowCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee35log = publicClient.getFilterLogs({ filter: fee35filter })
            const fee36filter = await publicClient.createContractEventFilter({ abi: erc20Abi, address: '0xCCbb477D6c28892d6311ebb729b4c242C92f70FD', eventName: 'Transfer', args: { from: infpowCmjLp, to: merchant }, fromBlock: blocknumber - 7200n, toBlock: "latest" }) as Filter
            const fee36log = publicClient.getFilterLogs({ filter: fee36filter })

            const fee1data = await fee1log
            const fee1map = await Promise.all(fee1data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * 0.01))
            const fee2data = await fee2log
            const fee2map = await Promise.all(fee2data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/99)))
            const sumFee = fee1map.concat(fee2map).reduce((partialSum, a) => partialSum + a, 0)
            const fee3data = await fee3log
            const fee3map = await Promise.all(fee3data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * 0.01))
            const fee4data = await fee4log
            const fee4map = await Promise.all(fee4data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/99)))
            const sumFee2 = fee3map.concat(fee4map).reduce((partialSum, a) => partialSum + a, 0)
            const fee5data = await fee5log
            const fee5map = await Promise.all(fee5data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee6data = await fee6log
            const fee6map = await Promise.all(fee6data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee3 = fee5map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee3_2 = fee6map.reduce((partialSum, a) => partialSum + a, 0)
            const fee7data = await fee7log
            const fee7map = await Promise.all(fee7data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee8data = await fee8log
            const fee8map = await Promise.all(fee8data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee4 = fee7map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee4_2 = fee8map.reduce((partialSum, a) => partialSum + a, 0)
            const fee9data = await fee9log
            const fee9map = await Promise.all(fee9data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee10data = await fee10log
            const fee10map = await Promise.all(fee10data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee5 = fee9map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee5_2 = fee10map.reduce((partialSum, a) => partialSum + a, 0)
            const fee11data = await fee11log
            const fee11map = await Promise.all(fee11data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee12data = await fee12log
            const fee12map = await Promise.all(fee12data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value))  * (1/4)))
            const sumFee6 = fee11map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee6_2 = fee12map.reduce((partialSum, a) => partialSum + a, 0)
            const fee13data = await fee13log
            const fee13Map = await Promise.all(fee13data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee14data = await fee14log
            const fee14Map = await Promise.all(fee14data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee7 = fee13Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee7_2 = fee14Map.reduce((partialSum, a) => partialSum + a, 0)
            const fee15data = await fee15log
            const fee15map = await Promise.all(fee15data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee16data = await fee16log
            const fee16map = await Promise.all(fee16data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee8 = fee15map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee8_2 = fee16map.reduce((partialSum, a) => partialSum + a, 0)
            const fee17data = await fee17log
            const fee17map = await Promise.all(fee17data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee18data = await fee18log
            const fee18map = await Promise.all(fee18data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee9 = fee17map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee9_2 = fee18map.reduce((partialSum, a) => partialSum + a, 0)
            const fee19data = await fee19log
            const fee19map = await Promise.all(fee19data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee20data = await fee20log
            const fee20map = await Promise.all(fee20data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee10 = fee19map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee10_2 = fee20map.reduce((partialSum, a) => partialSum + a, 0)
            const fee21data = await fee21log
            const fee21map = await Promise.all(fee21data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee22data = await fee22log
            const fee22map = await Promise.all(fee22data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee11 = fee21map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee11_2 = fee22map.reduce((partialSum, a) => partialSum + a, 0)
            const fee23data = await fee23log
            const fee23map = await Promise.all(fee23data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee24data = await fee24log
            const fee24map = await Promise.all(fee24data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee12 = fee23map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee12_2 = fee24map.reduce((partialSum, a) => partialSum + a, 0)
            const fee25data = await fee25log
            const fee25map = await Promise.all(fee25data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee26data = await fee26log
            const fee26map = await Promise.all(fee26data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee13 = fee25map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee13_2 = fee26map.reduce((partialSum, a) => partialSum + a, 0)
            const fee27data = await fee27log
            const fee27map = await Promise.all(fee27data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee28data = await fee28log
            const fee28map = await Promise.all(fee28data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee14 = fee27map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee14_2 = fee28map.reduce((partialSum, a) => partialSum + a, 0)
            const fee29data = await fee29log
            const fee29map = await Promise.all(fee29data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee30data = await fee30log
            const fee30map = await Promise.all(fee30data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee15 = fee29map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee15_2 = fee30map.reduce((partialSum, a) => partialSum + a, 0)
            const fee31data = await fee31log
            const fee31map = await Promise.all(fee31data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee32data = await fee32log
            const fee32map = await Promise.all(fee32data.map(async (obj: any) => Number(obj.args.value) * (1/4)))
            const sumFee16 = fee31map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee16_2 = fee32map.reduce((partialSum, a) => partialSum + a, 0)
            const fee33data = await fee33log
            const fee33map = await Promise.all(fee33data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee34data = await fee34log
            const fee34map = await Promise.all(fee34data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee17 = fee33map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee17_2 = fee34map.reduce((partialSum, a) => partialSum + a, 0)
            const fee35data = await fee35log
            const fee35map = await Promise.all(fee35data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const fee36data = await fee36log
            const fee36map = await Promise.all(fee36data.map(async (obj: any) => Number(ethers.utils.formatEther(obj.args.value)) * (1/4)))
            const sumFee18 = fee35map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee18_2 = fee36map.reduce((partialSum, a) => partialSum + a, 0)
            
            return [sumFee, sumFee2, sumFee3, sumFee3_2, sumFee4, sumFee4_2, sumFee5, sumFee5_2, sumFee6, sumFee6_2, sumFee7, sumFee7_2, sumFee8, sumFee8_2, sumFee9, sumFee9_2, sumFee10, sumFee10_2, sumFee11, sumFee11_2, sumFee12, sumFee12_2, sumFee13, sumFee13_2, sumFee14, sumFee14_2, sumFee15, sumFee15_2, sumFee16, sumFee16_2, sumFee17, sumFee17_2, sumFee18, sumFee18_2]
        }

        const promise = thefetch()

        const getAsync = () =>
            new Promise((resolve) => 
                setTimeout(
                    () => resolve(promise), 1000
                )
            )

        getAsync().then((result: any) => {
            setSwapfee24hour1(Number(result[0].toFixed(2)) + 0.01)
            setSwapfee24hour2(Number(result[1].toFixed(2)) + 0.01)
            setSwapfee24hour3(Number(result[2].toFixed(2)) + 0.01)
            setSwapfee24hour3_2(Number(result[3].toFixed(0)))
            setSwapfee24hour4(Number(result[4].toFixed(2)) + 0.01)
            setSwapfee24hour4_2(Number(result[5].toFixed(0)))
            setSwapfee24hour5(Number(result[6].toFixed(2)) + 0.01)
            setSwapfee24hour5_2(Number(result[7].toFixed(0)))
            setSwapfee24hour6(Number(result[8].toFixed(2)) + 0.01)
            setSwapfee24hour6_2(Number(result[9].toFixed(0)))
            setSwapfee24hour7(Number(result[10].toFixed(2)) + 0.01)
            setSwapfee24hour7_2(Number(result[11].toFixed(0)))
            setSwapfee24hour8(Number(result[12].toFixed(2)) + 0.01)
            setSwapfee24hour8_2(Number(result[13].toFixed(0)))
            setSwapfee24hour9(Number(result[14].toFixed(2)) + 0.01)
            setSwapfee24hour9_2(Number(result[15].toFixed(0)))
            setSwapfee24hour10(Number(result[16].toFixed(2)) + 0.01)
            setSwapfee24hour10_2(Number(result[17].toFixed(0)))
            setSwapfee24hour11(Number(result[18].toFixed(2)) + 0.01)
            setSwapfee24hour11_2(Number(result[19].toFixed(0)))
            setSwapfee24hour12(Number(result[20].toFixed(2)) + 0.01)
            setSwapfee24hour12_2(Number(result[21].toFixed(0)))
            setSwapfee24hour13(Number(result[22].toFixed(2)) + 0.01)
            setSwapfee24hour13_2(Number(result[23].toFixed(0)))
            setSwapfee24hour14(Number(result[24].toFixed(2)) + 0.01)
            setSwapfee24hour14_2(Number(result[25].toFixed(0)))
            setSwapfee24hour15(Number(result[26].toFixed(2)) + 0.01)
            setSwapfee24hour15_2(Number(result[27].toFixed(0)))
            setSwapfee24hour16(Number(result[28].toFixed(2)) + 0.01)
            setSwapfee24hour16_2(Number(result[29].toFixed(0)))
            setSwapfee24hour17(Number(result[30].toFixed(2)) + 0.01)
            setSwapfee24hour17_2(Number(result[31].toFixed(0)))
            setSwapfee24hour18(Number(result[32].toFixed(2)) + 0.01)
            setSwapfee24hour18_2(Number(result[33].toFixed(0)))
        })
    }, [config, address, txupdate, jbcReserv, cmjReserv, jbcJuReserv, jusdtJuReserv, cmjToken, jcExchange, juExchange, farmJdaoABI, erc20Abi, cmdaoAmmNpcABI])

    return (
        <>
            <div style={{margin: "20px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x472d0e2E9839c140786D38110b3251d5ED08DF41" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" alt="$JBC" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjJdaoStaked !== 0 ? Number(100 * (((Math.floor(((swapfee24hour2 * (jbcReserv/cmjReserv)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (1000/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / Number(((Number(jbcJdaoStaked) + Number(cmjJdaoStaked * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv)) * priceTHB))).toFixed(2) : 'Fetching'}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour2 !== 0 ? Number(swapfee24hour2 * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div>
                            ~฿{cmjJdaoStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (1000/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (1000/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjJdaoStaked !== 0 ? <div>~฿{Number(((jbcJdaoStaked + Number(cmjJdaoStaked * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv)) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdaoPending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={harvestHandle}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdaoWithdraw(farmJdaoBalance)}>{Number(Math.floor(farmJdaoBalance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span>{jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourjbcJdaoStaked + (yourcmjJdaoStaked * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={(event) => setLpJdaoWithdraw(Number(event.target.value))}
                                value={lpJdaoWithdraw||''}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={withdrawstakeHandle}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>  
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdaoStake(Number(lpBalance))}>{Number(Math.floor(lpBalance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((jbcPooled + (cmjPooled * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={(event) => setLpJdaoStake(Number(event.target.value))}
                                value={lpJdaoStake||''}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={addstakeHandle}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x280608DD7712a5675041b95d0000B9089903B569" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" alt="$JBC" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" alt="$JUSDT" />
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {jusdtJdao3Staked !== 0 ? Number(100 * (((Math.floor((swapfee24hour1 + (((231481480 * 100000000) / 10**18) * (86400/12) * (1200/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv))) * priceTHB * 1) / 1) * 365) / (Number(jbcJdaoStaked) + Number(((Number(jusdtJdao3Staked) + Number(jbcJdao3Staked * (jusdtJuReserv/jbcJuReserv))) * priceTHB))))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour1 !== 0 ? Number(swapfee24hour1 * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div>
                            ~฿{jusdtJdao3Staked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (1000/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (1000/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {jusdtJdao3Staked !== 0 ? <div>~฿{((jusdtJdao3Staked + Number(jbcJdao3Staked * (jusdtJuReserv/jbcJuReserv))) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao3Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={harvestHandle3}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao3Withdraw(farmJdao3Balance)}>{Number(Math.floor(farmJdao3Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor(Number(yourjusdtJdao3Staked + Number(yourjbcJdao3Staked * (jusdtJuReserv/jbcJuReserv))) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={(event) => setLpJdao3Withdraw(Number(event.target.value))}
                                value={lpJdao3Withdraw||''}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={withdrawstakeHandle3}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao3Stake(Number(julpBalance))}>{(Math.floor(Number(julpBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{(Math.floor((Number(jusdtjuPooled) + Number(jbcjuPooled * (jusdtJuReserv/jbcJuReserv))) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={(event) => setLpJdao3Stake(Number(event.target.value))}
                                value={lpJdao3Stake||''}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={addstakeHandle3}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x3C061eEce15C539CaE99FbE75B3044236Fa2eff0" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjJdaoLpStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour4 + (swapfee24hour4_2 * (reserveCmjJDAO/reserveJDAO)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjJdaoLpStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour4 + swapfee24hour4_2 !== 0 ? Number((swapfee24hour4 + (swapfee24hour4_2 * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div>
                            ~฿{cmjJdaoLpStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjJdaoLpStaked !== 0 ? <div>~฿{Number(((cmjJdaoLpStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao5Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(5)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao5Withdraw(farmJdao5Balance)}>{Number(Math.floor(farmJdao5Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjJdaoLpStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao5Withdraw||''}
                                onChange={(event) => setLpJdao5Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(5)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }  
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao5Stake(jdaoCmjBalance)}>{(Math.floor(Number(jdaoCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjJdaoPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao5Stake||''}
                                onChange={(event) => setLpJdao5Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(5)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginBottom: "20px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x329889325A555b217C41A4c2EADD529a0CfA4231" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" alt="$OS" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjOsStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour5 + (swapfee24hour5_2 * (reserveCmjOS/reserveOS)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjOsStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour5 + swapfee24hour5_2 !== 0 ? Number((swapfee24hour5 + (swapfee24hour5_2 * (reserveCmjOS/reserveOS))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div>
                            ~฿{cmjOsStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjOsStaked !== 0 ? <div>~฿{Number(((cmjOsStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao6Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(6)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao6Withdraw(farmJdao6Balance)}>{Number(Math.floor(farmJdao6Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjOsStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao6Withdraw||''}
                                onChange={(event) => setLpJdao6Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(6)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao6Stake(osCmjBalance)}>{(Math.floor(Number(osCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjOsPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao6Stake||''}
                                onChange={(event) => setLpJdao6Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(6)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x1b70c95fD4EbF8920A624bd2ce22b6905eFBdF60" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" alt="$CU" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(cmjCuStaked) !== 0 ? Number(100 * (((Math.floor((swapfee24hour6 + (swapfee24hour6_2 * (reserveCmjCU/reserveCU)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjCuStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour6 + swapfee24hour6_2 !== 0 ? Number((swapfee24hour6 + (swapfee24hour6_2 * (reserveCmjCU/reserveCU))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjCuStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjCuStaked !== 0 ? <div>~฿{Number(((cmjCuStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao7Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(7)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }  
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao7Withdraw(farmJdao7Balance)}>{Number(Math.floor(farmJdao7Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjCuStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao7Withdraw||''}
                                onChange={(event) => setLpJdao7Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(7)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao7Stake(cuCmjBalance)}>{(Math.floor(Number(cuCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjCuPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao7Stake||''}
                                onChange={(event) => setLpJdao7Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(7)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0xf189c5B03694b70e5DFD8e8CAE84118Ed7616F19" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" alt="$SIL" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjSilStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour7 + (swapfee24hour7_2 * (reserveCmjSIL/reserveSIL)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjSilStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour7 + swapfee24hour7_2 !== 0 ? Number((swapfee24hour7 + (swapfee24hour7_2 * (reserveCmjSIL/reserveSIL))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjSilStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjSilStaked !== 0 ? <div>~฿{Number(((cmjSilStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao8Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(8)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao8Withdraw(farmJdao8Balance)}>{Number(Math.floor(farmJdao8Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjSilStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao8Withdraw||''}
                                onChange={(event) => setLpJdao8Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(8)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao8Stake(silCmjBalance)}>{(Math.floor(silCmjBalance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjSilPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao8Stake||''}
                                onChange={(event) => setLpJdao8Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(8)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>                
            </div>
            <div style={{marginBottom: "20px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x7086EC7ED5D94ef503bE324B0aE8A3748A15fAE5" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" alt="$GOLD" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjGoldStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour8 + (swapfee24hour8_2 * (reserveCmjGOLD/reserveGOLD)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjGoldStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour8 + swapfee24hour8_2 !== 0 ? Number((swapfee24hour8 + (swapfee24hour8_2 * (reserveCmjGOLD/reserveGOLD))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjGoldStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjGoldStaked !== 0 ? <div>~฿{Number(((cmjGoldStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao9Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(9)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao9Withdraw(farmJdao9Balance)}>{Number(Math.floor(farmJdao9Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjGoldStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao9Withdraw||''}
                                onChange={(event) => setLpJdao9Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(9)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao9Stake(goldCmjBalance)}>{(Math.floor(Number(goldCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjGoldPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao9Stake||''}
                                onChange={(event) => setLpJdao9Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(9)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x78Ff63F4f91Ce56f72882ef9dbE3Be79fBF15044" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa" alt="$PLAT" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjPlatStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour9 + (swapfee24hour9_2 * (reserveCmjPLAT/reservePLAT)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjPlatStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour9 + swapfee24hour9_2 !== 0 ? Number((swapfee24hour9 + (swapfee24hour9_2 * (reserveCmjPLAT/reservePLAT))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjPlatStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjPlatStaked !== 0 ? <div>~฿{Number(((cmjPlatStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao10Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(10)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao10Withdraw(farmJdao10Balance)}>{Number(Math.floor(farmJdao10Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjPlatStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao10Withdraw||''}
                                onChange={(event) => setLpJdao10Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(10)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao10Stake(platCmjBalance)}>{(Math.floor(Number(platCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjPlatPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao10Stake||''}
                                onChange={(event) => setLpJdao10Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(10)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0xc19DE37d5e14b387BCda8e62aB4934591315901D" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" alt="$JASP" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjJaspStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour3 + (swapfee24hour3_2 * (reserveCmjJASP/reserveJASP)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjJaspStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour3 + swapfee24hour3_2 !== 0 ? Number((swapfee24hour3 + (swapfee24hour3_2 * (reserveCmjJASP/reserveJASP))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjJaspStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjJaspStaked !== 0 ? <div>~฿{Number(((cmjJaspStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao4Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(4)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao4Withdraw(farmJdao4Balance)}>{Number(Math.floor(farmJdao4Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjJaspStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao4Withdraw||''}
                                onChange={(event) => setLpJdao4Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(4)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao4Stake(jaspCmjBalance)}>{(Math.floor(Number(jaspCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjJaspPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao4Stake||''}
                                onChange={(event) => setLpJdao4Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(4)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginBottom: "20px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0xd3d493ac2c0dD08C814FbbFB5f8B4983a8a0921C" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmSd6B1WnUtzVqJPmEXqFSEudrdqCAE3LPkU64tttYeFPw" alt="$PLUTO" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjPlutoStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour15 + (swapfee24hour15_2 * (reserveCmjPLUTO/reservePLUTO)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjPlutoStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour15 + swapfee24hour15_2 !== 0 ? Number((swapfee24hour15 + (swapfee24hour15_2 * (reserveCmjPLUTO/reservePLUTO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjPlutoStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjPlutoStaked !== 0 ? <div>~฿{Number(((cmjPlutoStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao16Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(17)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao16Withdraw(farmJdao16Balance)}>{Number(Math.floor(farmJdao16Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjPlutoStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao16Withdraw||''}
                                onChange={(event) => setLpJdao16Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(17)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao16Stake(plutoCmjBalance)}>{(Math.floor(Number(plutoCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjPlutoPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao16Stake||''}
                                onChange={(event) => setLpJdao16Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(17)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x4EF48881EFf572bBD636bcE736877881B9Ea17D5" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmPieCpfHoce19DSB5Mv5GZmZeGHAUerJfgjX6NhgLYUVC" alt="$F.BTC" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjFbtcStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour16 + (swapfee24hour16_2 * (Number(reserveCmjFBTC)/Number(reserveFBTC))) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((cmjFbtcStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour16 + swapfee24hour16_2 !== 0 ? Number((swapfee24hour16 + (swapfee24hour16_2 * (Number(reserveCmjFBTC)/Number(reserveFBTC)))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjFbtcStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjFbtcStaked !== 0 ? <div>~฿{Number(((cmjFbtcStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao17Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(18)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao17Withdraw(farmJdao17Balance)}>{Number(Math.floor(farmJdao17Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjFbtcStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao17Withdraw||''}
                                onChange={(event) => setLpJdao17Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(18)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao17Stake(fbtcCmjBalance)}>{(Math.floor(Number(fbtcCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjFbtcPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao17Stake||''}
                                onChange={(event) => setLpJdao17Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(18)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0xA7e55e89d6B0E81cCDB034a04Eb65A7aF16b697C" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/Qma5JyeNz8ME6H1XFxJCF4HmduDSC8mqLqmUs3SaMJbwzh" alt="$X4" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjX4Staked !== 0 ? Number(100 * (((Math.floor((swapfee24hour17 + (swapfee24hour17_2 * (reserveCmjX4/reserveX4)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjX4Staked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour17 + swapfee24hour17_2 !== 0 ? Number((swapfee24hour17 + (swapfee24hour17_2 * (reserveCmjX4/reserveX4))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjX4Staked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjX4Staked !== 0 ? <div>~฿{Number(((cmjX4Staked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao18Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(19)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao18Withdraw(farmJdao18Balance)}>{Number(Math.floor(farmJdao18Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjX4Staked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao18Withdraw||''}
                                onChange={(event) => setLpJdao18Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(19)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao18Stake(x4CmjBalance)}>{(Math.floor(Number(x4CmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjX4Pooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao18Stake||''}
                                onChange={(event) => setLpJdao18Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(19)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginBottom: "20px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
            <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x5E9C3A7E74a5865EC8eD3eaF6B1a4220D6E9A96b" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/QmbEWVgF3ZRvmDEF3RLKf7XDFr4SE5q4VEWR7taCqNnbU6" alt="$INF.POW" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjInfpowStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour18 + (swapfee24hour18_2 * (reserveCmjINFPOW/reserveINFPOW)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((cmjInfpowStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour18 + swapfee24hour18_2 !== 0 ? Number((swapfee24hour18 + (swapfee24hour18_2 * (reserveCmjINFPOW/reserveINFPOW))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjInfpowStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjInfpowStaked !== 0 ? <div>~฿{Number(((cmjInfpowStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao19Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(20)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao19Withdraw(farmJdao19Balance)}>{Number(Math.floor(farmJdao19Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjInfpowStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao19Withdraw||''}
                                onChange={(event) => setLpJdao19Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(20)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao19Stake(infpowCmjBalance)}>{(Math.floor(Number(infpowCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjInfpowPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao19Stake||''}
                                onChange={(event) => setLpJdao19Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(20)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x7801F8cdBABE6999331d1Bf37d74aAf713C3722F" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" alt="$CTUNA" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjCtunaStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour10 + (swapfee24hour10_2 * (reserveCmjCTUNA/reserveCTUNA)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjCtunaStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour10 + swapfee24hour10_2 !== 0 ? Number((swapfee24hour10 + (swapfee24hour10_2 * (reserveCmjCTUNA/reserveCTUNA)))  * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjCtunaStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjCtunaStaked !== 0 ? <div>~฿{Number(((cmjCtunaStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao11Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(12)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }                        
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao11Withdraw(farmJdao11Balance)}>{Number(Math.floor(farmJdao11Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjCtunaStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao11Withdraw||''}
                                onChange={(event) => setLpJdao11Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(12)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao11Stake(ctunaCmjBalance)}>{(Math.floor(Number(ctunaCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjCtunaPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao11Stake||''}
                                onChange={(event) => setLpJdao11Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(12)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0xda558EE93B466aEb4F59fBf95D25d410318be43A" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" alt="$SX31" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjSx31Staked !== 0 ? Number(100 * (((Math.floor((swapfee24hour11 + (swapfee24hour11_2 * (reserveCmjSX31/reserveSX31)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjSx31Staked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour11 + swapfee24hour11_2 !== 0 ? Number((swapfee24hour11 + (swapfee24hour11_2 * (reserveCmjSX31/reserveSX31))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjSx31Staked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjSx31Staked !== 0 ? <div>~฿{Number(((cmjSx31Staked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao12Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(13)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }   
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao12Withdraw(farmJdao12Balance)}>{Number(Math.floor(farmJdao12Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjSx31Staked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao12Withdraw||''}
                                onChange={(event) => setLpJdao12Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(13)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao12Stake(sx31CmjBalance)}>{(Math.floor(Number(sx31CmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjSx31Pooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao12Stake||''}
                                onChange={(event) => setLpJdao12Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(13)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}> 
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x466C3b32538eB0DB9f6c88ee2Fa9c72C495cE08F" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" alt="$WOOD" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjWoodStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour14 + (swapfee24hour14_2 * (reserveCmjWOOD/reserveWOOD)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjWoodStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour14 + swapfee24hour14_2 !== 0 ? Number((swapfee24hour14 + (swapfee24hour14_2 * (reserveCmjWOOD/reserveWOOD))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjWoodStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjWoodStaked !== 0 ? <div>~฿{Number(((cmjWoodStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao15Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(16)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao15Withdraw(farmJdao15Balance)}>{Number(Math.floor(farmJdao15Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjWoodStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao15Withdraw||''}
                                onChange={(event) => setLpJdao15Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(16)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao15Stake(woodCmjBalance)}>{(Math.floor(Number(woodCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjWoodPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao15Stake||''}
                                onChange={(event) => setLpJdao15Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(16)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x6F93F16cF86205C5BB9145078d584c354758D6DB" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" alt="$BBQ" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjBbqStaked !== 0 ?  Number(100 * (((Math.floor((swapfee24hour12 + (swapfee24hour12_2 * (reserveCmjBBQ/reserveBBQ)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjBbqStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour12 + swapfee24hour12_2 !== 0 ? Number((swapfee24hour12 + (swapfee24hour12_2 * (reserveCmjBBQ/reserveBBQ))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjBbqStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjBbqStaked !== 0 ? <div>~฿{Number(((cmjBbqStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao13Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(14)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao13Withdraw(farmJdao13Balance)}>{Number(Math.floor(farmJdao13Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjBbqStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao13Withdraw||''}
                                onChange={(event) => setLpJdao13Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(14)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao13Stake(bbqCmjBalance)}>{(Math.floor(Number(bbqCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjBbqPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao13Stake||''}
                                onChange={(event) => setLpJdao13Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(14)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x3161EE630bF36d2AB6333a9CfD22ebaa3e2D7C70" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" alt="$PZA" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {cmjPzaStaked !== 0 ? Number(100 * (((Math.floor((swapfee24hour13 + (swapfee24hour13_2 * (reserveCmjPZA/reservePZA)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjPzaStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2) : "Fetching"}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{swapfee24hour13 + swapfee24hour13_2 !== 0 ? Number((swapfee24hour13 + (swapfee24hour13_2 * (reserveCmjPZA/reservePZA))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"} (24hr Fee)
                            </div> 
                            ~฿{cmjPzaStaked !== 0 ? Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2}) : "Fetching"}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4800)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjPzaStaked !== 0 ? <div>~฿{Number(((cmjPzaStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao14Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(15)}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao14Withdraw(farmJdao14Balance)}>{Number(Math.floor(farmJdao14Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((yourcmjPzaStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao14Withdraw||''}
                                onChange={(event) => setLpJdao14Withdraw(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(15)}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao14Stake(pzaCmjBalance)}>{(Math.floor(Number(pzaCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span> {jbcReserv !== 0 ? <span> (~฿{Number(Math.floor((cmjPzaPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span> : ' (Fetching)'}</div>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao14Stake||''}
                                onChange={(event) => setLpJdao14Stake(Number(event.target.value))}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(15)}>Stake</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}> 
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a href="https://exp-l1.jibchain.net/token/0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" /></a>                       
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://apricot-secure-ferret-190.mypinata.cloud/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div className="bold" style={{padding: "2px 6px", background: "orange", color: "red"}}>[Deprecated]</div>
                        <div></div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Value Locked:</div>
                        {Number(cmjJdao202Staked) !== 0 ? <div>~฿{Number((cmjJdao202Staked * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : "Fetching"}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao202Pending}</div>
                        </div>
                        {address !== null ?
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={harvestHandle202}>Harvest</div> :
                            <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)", fontSize: "16px"}} className="bold">Harvest</div>
                        }
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>STAKED</div>
                            {farmJdao202Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao202Withdraw(farmJdao202Balance)}>{Number(Math.floor(farmJdao202Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor(farmJdao202Balance * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                type='number'
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={handleWithdraw202}
                                value={lpJdao202Withdraw||''}
                            />
                            {address !== null ?
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={withdrawstakeHandle202}>Withdraw</div> :
                                <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Withdraw</div>
                            }
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>BALANCE</div>
                            {typeof(cmjBalance) !== "object" ?
                                <div style={{textAlign: "left", fontSize: "14px"}}>
                                    <span className="bold">{cmjBalance}</span>
                                    <span> (~฿{Number(Math.floor(cmjBalanceFull * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span>
                                </div> :
                                <>0.000</>
                            }
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value="Unable to stake"
                                disabled
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "not-allowed", boxShadow: "inset -2px -2px 0px 0.25px #00000040", background: "rgb(206, 208, 207)", textShadow: "rgb(255, 255, 255) 1px 1px", color: "rgb(136, 140, 143)"}} className="bold">Stake</div>
                        </div>
                    </div>
                </div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", border: "none", boxShadow: "none", background: "transparent"}} className="nftCard"></div>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", border: "none", boxShadow: "none", background: "transparent"}} className="nftCard"></div>
            </div>
        </>
    )
}

export default GameSwapFarm