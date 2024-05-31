import React from 'react'
import { readContract, readContracts, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core'
import { ethers } from 'ethers'

const providerJBC = new ethers.getDefaultProvider('https://rpc-l1.jibchain.net/')
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
   
const GameSwapFarm = ({ address, setisLoading, setTxupdate, txupdate, lpBalance, julpBalance, jbcPooled, cmjPooled, jbcjuPooled, jusdtjuPooled, jcExchange, exchangeABI, juExchange, exchangeJulpABI, cmjToken, erc20ABI, cmjBalance, jbcReserv, cmjReserv, jbcJuReserv, jusdtJuReserv, cmjBalanceFull, farmJdaoABI, priceTHB, cmdaoAmmNpcABI }) => {
    const [jbcJdaoStaked, setJbcJdaoStaked] = React.useState(0)
    const [cmjJdaoStaked, setCmjJdaoStaked] = React.useState(0)
    const [yourjbcJdaoStaked, setYourJbcJdaoStaked] = React.useState(0)
    const [yourcmjJdaoStaked, setYourCmjJdaoStaked] = React.useState(0)
    const [farmJdaoBalance, setFarmJdaoBalance] = React.useState(null)
    const [jdaoPending, setJdaoPending] = React.useState(<>0.000</>)

    const [cmjJdao202Staked, setCmjJdao202Staked] = React.useState(0)
    const [farmJdao202Balance, setFarmJdao202Balance] = React.useState(null)
    const [jdao202Pending, setJdao202Pending] = React.useState(<>0.000</>)

    const [jbcJdao3Staked, setJbcJdao3Staked] = React.useState(0)
    const [jusdtJdao3Staked, setJusdtJdao3Staked] = React.useState(0)
    const [yourjbcJdao3Staked, setYourJbcJdao3Staked] = React.useState(0)
    const [yourjusdtJdao3Staked, setYourJusdtJdao3Staked] = React.useState(0)
    const [farmJdao3Balance, setFarmJdao3Balance] = React.useState(null)
    const [jdao3Pending, setJdao3Pending] = React.useState(<>0.000</>)

    const [jaspCmjBalance, setJaspCmjBalance] = React.useState(null)
    const [reserveCmjJASP, setReserveCmjJASP] = React.useState("")
    const [reserveJASP, setReserveJASP] = React.useState("")
    const [cmjJaspStaked, setCmjJaspStaked] = React.useState(0)
    const [cmjJaspPooled, setCmjJaspPooled] = React.useState(0)
    const [yourcmjJaspStaked, setYourCmjJaspStaked] = React.useState(0)
    const [farmJdao4Balance, setFarmJdao4Balance] = React.useState(null)
    const [jdao4Pending, setJdao4Pending] = React.useState(<>0.000</>)
    const [lpJdao4Withdraw, setLpJdao4Withdraw] = React.useState("")
    const [lpJdao4Stake, setLpJdao4Stake] = React.useState("")

    const [jdaoCmjBalance, setJdaoCmjBalance] = React.useState(null)
    const [reserveCmjJDAO, setReserveCmjJDAO] = React.useState("")
    const [reserveJDAO, setReserveJDAO] = React.useState("")
    const [cmjJdaoLpStaked, setCmjJdaoLpStaked] = React.useState(0)
    const [cmjJdaoPooled, setCmjJdaoPooled] = React.useState(0)
    const [yourcmjJdaoLpStaked, setYourCmjJdaoLpStaked] = React.useState(0)
    const [farmJdao5Balance, setFarmJdao5Balance] = React.useState(null)
    const [jdao5Pending, setJdao5Pending] = React.useState(<>0.000</>)
    const [lpJdao5Withdraw, setLpJdao5Withdraw] = React.useState("")
    const [lpJdao5Stake, setLpJdao5Stake] = React.useState("")

    const [osCmjBalance, setOsCmjBalance] = React.useState(null)
    const [reserveCmjOS, setReserveCmjOS] = React.useState("")
    const [reserveOS, setReserveOS] = React.useState("")
    const [cmjOsStaked, setCmjOsStaked] = React.useState(0)
    const [cmjOsPooled, setCmjOsPooled] = React.useState(0)
    const [yourcmjOsStaked, setYourCmjOsStaked] = React.useState(0)
    const [farmJdao6Balance, setFarmJdao6Balance] = React.useState(null)
    const [jdao6Pending, setJdao6Pending] = React.useState(<>0.000</>)
    const [lpJdao6Withdraw, setLpJdao6Withdraw] = React.useState("")
    const [lpJdao6Stake, setLpJdao6Stake] = React.useState("")

    const [cuCmjBalance, setCuCmjBalance] = React.useState(null)
    const [reserveCmjCU, setReserveCmjCU] = React.useState("")
    const [reserveCU, setReserveCU] = React.useState("")
    const [cmjCuStaked, setCmjCuStaked] = React.useState(0)
    const [cmjCuPooled, setCmjCuPooled] = React.useState(0)
    const [yourcmjCuStaked, setYourCmjCuStaked] = React.useState(0)
    const [farmJdao7Balance, setFarmJdao7Balance] = React.useState(null)
    const [jdao7Pending, setJdao7Pending] = React.useState(<>0.000</>)
    const [lpJdao7Withdraw, setLpJdao7Withdraw] = React.useState("")
    const [lpJdao7Stake, setLpJdao7Stake] = React.useState("")

    const [silCmjBalance, setSilCmjBalance] = React.useState(null)
    const [reserveCmjSIL, setReserveCmjSIL] = React.useState("")
    const [reserveSIL, setReserveSIL] = React.useState("")
    const [cmjSilStaked, setCmjSilStaked] = React.useState(0)
    const [cmjSilPooled, setCmjSilPooled] = React.useState(0)
    const [yourcmjSilStaked, setYourCmjSilStaked] = React.useState(0)
    const [farmJdao8Balance, setFarmJdao8Balance] = React.useState(null)
    const [jdao8Pending, setJdao8Pending] = React.useState(<>0.000</>)
    const [lpJdao8Withdraw, setLpJdao8Withdraw] = React.useState("")
    const [lpJdao8Stake, setLpJdao8Stake] = React.useState("")

    const [goldCmjBalance, setGoldCmjBalance] = React.useState(null)
    const [reserveCmjGOLD, setReserveCmjGOLD] = React.useState("")
    const [reserveGOLD, setReserveGOLD] = React.useState("")
    const [cmjGoldStaked, setCmjGoldStaked] = React.useState(0)
    const [cmjGoldPooled, setCmjGoldPooled] = React.useState(0)
    const [yourcmjGoldStaked, setYourCmjGoldStaked] = React.useState(0)
    const [farmJdao9Balance, setFarmJdao9Balance] = React.useState(null)
    const [jdao9Pending, setJdao9Pending] = React.useState(<>0.000</>)
    const [lpJdao9Withdraw, setLpJdao9Withdraw] = React.useState("")
    const [lpJdao9Stake, setLpJdao9Stake] = React.useState("")

    const [platCmjBalance, setPlatCmjBalance] = React.useState(null)
    const [reserveCmjPLAT, setReserveCmjPLAT] = React.useState("")
    const [reservePLAT, setReservePLAT] = React.useState("")
    const [cmjPlatStaked, setCmjPlatStaked] = React.useState(0)
    const [cmjPlatPooled, setCmjPlatPooled] = React.useState(0)
    const [yourcmjPlatStaked, setYourCmjPlatStaked] = React.useState(0)
    const [farmJdao10Balance, setFarmJdao10Balance] = React.useState(null)
    const [jdao10Pending, setJdao10Pending] = React.useState(<>0.000</>)
    const [lpJdao10Withdraw, setLpJdao10Withdraw] = React.useState("")
    const [lpJdao10Stake, setLpJdao10Stake] = React.useState("")

    const [ctunaCmjBalance, setCtunaCmjBalance] = React.useState(null)
    const [reserveCmjCTUNA, setReserveCmjCTUNA] = React.useState("")
    const [reserveCTUNA, setReserveCTUNA] = React.useState("")
    const [cmjCtunaStaked, setCmjCtunaStaked] = React.useState(0)
    const [cmjCtunaPooled, setCmjCtunaPooled] = React.useState(0)
    const [yourcmjCtunaStaked, setYourCmjCtunaStaked] = React.useState(0)
    const [farmJdao11Balance, setFarmJdao11Balance] = React.useState(null)
    const [jdao11Pending, setJdao11Pending] = React.useState(<>0.000</>)
    const [lpJdao11Withdraw, setLpJdao11Withdraw] = React.useState("")
    const [lpJdao11Stake, setLpJdao11Stake] = React.useState("")

    const [sx31CmjBalance, setSx31CmjBalance] = React.useState(null)
    const [reserveCmjSX31, setReserveCmjSX31] = React.useState("")
    const [reserveSX31, setReserveSX31] = React.useState("")
    const [cmjSx31Staked, setCmjSx31Staked] = React.useState(0)
    const [cmjSx31Pooled, setCmjSx31Pooled] = React.useState(0)
    const [yourcmjSx31Staked, setYourCmjSx31Staked] = React.useState(0)
    const [farmJdao12Balance, setFarmJdao12Balance] = React.useState(null)
    const [jdao12Pending, setJdao12Pending] = React.useState(<>0.000</>)
    const [lpJdao12Withdraw, setLpJdao12Withdraw] = React.useState("")
    const [lpJdao12Stake, setLpJdao12Stake] = React.useState("")

    const [bbqCmjBalance, setBbqCmjBalance] = React.useState(null)
    const [reserveCmjBBQ, setReserveCmjBBQ] = React.useState("")
    const [reserveBBQ, setReserveBBQ] = React.useState("")
    const [cmjBbqStaked, setCmjBbqStaked] = React.useState(0)
    const [cmjBbqPooled, setCmjBbqPooled] = React.useState(0)
    const [yourcmjBbqStaked, setYourCmjBbqStaked] = React.useState(0)
    const [farmJdao13Balance, setFarmJdao13Balance] = React.useState(null)
    const [jdao13Pending, setJdao13Pending] = React.useState(<>0.000</>)
    const [lpJdao13Withdraw, setLpJdao13Withdraw] = React.useState("")
    const [lpJdao13Stake, setLpJdao13Stake] = React.useState("")

    const [pzaCmjBalance, setPzaCmjBalance] = React.useState(null)
    const [reserveCmjPZA, setReserveCmjPZA] = React.useState("")
    const [reservePZA, setReservePZA] = React.useState("")
    const [cmjPzaStaked, setCmjPzaStaked] = React.useState(0)
    const [cmjPzaPooled, setCmjPzaPooled] = React.useState(0)
    const [yourcmjPzaStaked, setYourCmjPzaStaked] = React.useState(0)
    const [farmJdao14Balance, setFarmJdao14Balance] = React.useState(null)
    const [jdao14Pending, setJdao14Pending] = React.useState(<>0.000</>)
    const [lpJdao14Withdraw, setLpJdao14Withdraw] = React.useState("")
    const [lpJdao14Stake, setLpJdao14Stake] = React.useState("")

    const [woodCmjBalance, setWoodCmjBalance] = React.useState(null)
    const [reserveCmjWOOD, setReserveCmjWOOD] = React.useState("")
    const [reserveWOOD, setReserveWOOD] = React.useState("")
    const [cmjWoodStaked, setCmjWoodStaked] = React.useState(0)
    const [cmjWoodPooled, setCmjWoodPooled] = React.useState(0)
    const [yourcmjWoodStaked, setYourCmjWoodStaked] = React.useState(0)
    const [farmJdao15Balance, setFarmJdao15Balance] = React.useState(null)
    const [jdao15Pending, setJdao15Pending] = React.useState(<>0.000</>)
    const [lpJdao15Withdraw, setLpJdao15Withdraw] = React.useState("")
    const [lpJdao15Stake, setLpJdao15Stake] = React.useState("")

    const [swapfee24hour1, setSwapfee24hour1] = React.useState("")
    const [swapfee24hour2, setSwapfee24hour2] = React.useState("")
    const [swapfee24hour3, setSwapfee24hour3] = React.useState("")
    const [swapfee24hour3_2, setSwapfee24hour3_2] = React.useState("")
    const [swapfee24hour4, setSwapfee24hour4] = React.useState("")
    const [swapfee24hour4_2, setSwapfee24hour4_2] = React.useState("")
    const [swapfee24hour5, setSwapfee24hour5] = React.useState("")
    const [swapfee24hour5_2, setSwapfee24hour5_2] = React.useState("")
    const [swapfee24hour6, setSwapfee24hour6] = React.useState("")
    const [swapfee24hour6_2, setSwapfee24hour6_2] = React.useState("")
    const [swapfee24hour7, setSwapfee24hour7] = React.useState("")
    const [swapfee24hour7_2, setSwapfee24hour7_2] = React.useState("")
    const [swapfee24hour8, setSwapfee24hour8] = React.useState("")
    const [swapfee24hour8_2, setSwapfee24hour8_2] = React.useState("")
    const [swapfee24hour9, setSwapfee24hour9] = React.useState("")
    const [swapfee24hour9_2, setSwapfee24hour9_2] = React.useState("")
    const [swapfee24hour10, setSwapfee24hour10] = React.useState("")
    const [swapfee24hour10_2, setSwapfee24hour10_2] = React.useState("")
    const [swapfee24hour11, setSwapfee24hour11] = React.useState("")
    const [swapfee24hour11_2, setSwapfee24hour11_2] = React.useState("")
    const [swapfee24hour12, setSwapfee24hour12] = React.useState("")
    const [swapfee24hour12_2, setSwapfee24hour12_2] = React.useState("")
    const [swapfee24hour13, setSwapfee24hour13] = React.useState("")
    const [swapfee24hour13_2, setSwapfee24hour13_2] = React.useState("")
    const [swapfee24hour14, setSwapfee24hour14] = React.useState("")
    const [swapfee24hour14_2, setSwapfee24hour14_2] = React.useState("")

    const harvestHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [1, 0],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const harvestHandle202 = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [2, 0],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const harvestHandle3 = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [3, 0],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const [lpJdaoWithdraw, setLpJdaoWithdraw] = React.useState("")
    const [lpJdao202Withdraw, setLpJdao202Withdraw] = React.useState("")
    const [lpJdao3Withdraw, setLpJdao3Withdraw] = React.useState("")
    const handleWithdraw = (event) => { setLpJdaoWithdraw(event.target.value) }
    const maxWithdrawHandle1 = async () => {
        const farmJdaoBal = address !== undefined ? await readContract({
            address: farmJdao,
            abi: farmJdaoABI,
            functionName: 'userInfo',
            args: [1, address],
        }) : 0
        setLpJdaoWithdraw(ethers.utils.formatEther(farmJdaoBal[0]))
    }
    const withdrawstakeHandle = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [1, ethers.utils.parseEther(lpJdaoWithdraw)],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const handleWithdraw202 = (event) => { setLpJdao202Withdraw(event.target.value) }
    const maxWithdrawHandle202 = async () => {
        const farmJdao202Bal = address !== undefined ? await readContract({
            address: farmJdao,
            abi: farmJdaoABI,
            functionName: 'userInfo',
            args: [2, address],
        }) : 0
        setLpJdao202Withdraw(ethers.utils.formatEther(farmJdao202Bal[0]))
    }
    const withdrawstakeHandle202 = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [2, ethers.utils.parseEther(lpJdao202Withdraw)],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const handleWithdraw3 = (event) => { setLpJdao3Withdraw(event.target.value) }
    const maxWithdrawHandle3 = async () => {
        const farmJdao3Bal = address !== undefined ? await readContract({
            address: farmJdao,
            abi: farmJdaoABI,
            functionName: 'userInfo',
            args: [3, address],
        }) : 0
        setLpJdao3Withdraw(ethers.utils.formatEther(farmJdao3Bal[0]))
    }
    const withdrawstakeHandle3 = async () => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [3, ethers.utils.parseEther(lpJdao3Withdraw)],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const [lpJdaoStake, setLpJdaoStake] = React.useState("")
    const [lpJdao3Stake, setLpJdao3Stake] = React.useState("")
    const handleStake = (event) => { setLpJdaoStake(event.target.value) }
    const maxAddHandle1 = async () => {
        const jclpBal = address !== undefined ? await readContract({
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'balanceOf',
            args: [address],
        }) : 0
        setLpJdaoStake(ethers.utils.formatEther(jclpBal))
    }
    const addstakeHandle = async () => {
        setisLoading(true)
        const lpAllow = await readContract({
            address: jcExchange,
            abi: exchangeABI,
            functionName: 'allowance',
            args: [address, farmJdao],
        })
        const bigValue = lpJdaoStake !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(lpJdaoStake)) : ethers.BigNumber.from(0)
        const Hex = ethers.BigNumber.from(10**8)
        const bigApprove = bigValue.mul(Hex)
        if (Number(lpJdaoStake) > Number(lpAllow) / (10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: jcExchange,
                    abi: exchangeABI,
                    functionName: 'approve',
                    args: [farmJdao, bigApprove],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'deposit',
                args: [1, ethers.utils.parseEther(lpJdaoStake)],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const handleStake3 = (event) => { setLpJdao3Stake(event.target.value) }
    const maxAddHandle3 = async () => {
        const julpBal = address !== undefined ? await readContract({
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'balanceOf',
            args: [address],
        }) : 0
        setLpJdao3Stake(ethers.utils.formatEther(julpBal))
    }
    const addstakeHandle3 = async () => {
        setisLoading(true)
        const lpAllow = await readContract({
            address: juExchange,
            abi: exchangeJulpABI,
            functionName: 'allowance',
            args: [address, farmJdao],
        })
        const bigValue = lpJdao3Stake !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(lpJdao3Stake)) : ethers.BigNumber.from(0)
        const Hex = ethers.BigNumber.from(10**8)
        const bigApprove = bigValue.mul(Hex)
        if (Number(lpJdao3Stake) > Number(lpAllow) / (10**18)) {
            try {
                const config = await prepareWriteContract({
                    address: juExchange,
                    abi: exchangeJulpABI,
                    functionName: 'approve',
                    args: [farmJdao, bigApprove],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            } catch {}
        }
        try {
            const config2 = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'deposit',
                args: [3, ethers.utils.parseEther(lpJdao3Stake)],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    const addstakeHandleAll = async (_index) => {
        setisLoading(true)
        let lp = '0x0000000000000000000000000000000000000000'
        let stake = ''
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
        }
        try {
            const lpAllow = await readContract({
                address: lp,
                abi: exchangeJulpABI,
                functionName: 'allowance',
                args: [address, farmJdao],
            })
            const bigValue = stake !== "" ? ethers.BigNumber.from(ethers.utils.parseEther(stake)) : ethers.BigNumber.from(0)
            const Hex = ethers.BigNumber.from(10**8)
            const bigApprove = bigValue.mul(Hex)
            if (Number(stake) > Number(lpAllow) / (10**18)) {
                const config = await prepareWriteContract({
                    address: lp,
                    abi: exchangeJulpABI,
                    functionName: 'approve',
                    args: [farmJdao, bigApprove],
                })
                const { hash: hash0 } = await writeContract(config)
                await waitForTransaction({ hash: hash0 })
            }
            const config2 = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'deposit',
                args: [_index, ethers.utils.parseEther(stake)],
            })
            const { hash: hash1 } = await writeContract(config2)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const withdrawstakeHandleAll = async (_index) => {
        setisLoading(true)
        let withdraw = ''
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
        }
        try {
            const config = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [_index, ethers.utils.parseEther(withdraw)],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }
    const harvestHandleAll = async (_index) => {
        setisLoading(true)
        try {
            const config = await prepareWriteContract({
                address: farmJdao,
                abi: farmJdaoABI,
                functionName: 'withdraw',
                args: [_index, 0],
            })
            const { hash: hash1 } = await writeContract(config)
            await waitForTransaction({ hash: hash1 })
            setTxupdate(hash1)
        } catch {}
        setisLoading(false)
    }

    React.useEffect(() => {
        console.log("Connected to " + address)
        const jusdtSC = new ethers.Contract(jusdtToken, erc20ABI, providerJBC)
        const cmjSC = new ethers.Contract(cmjToken, erc20ABI, providerJBC)
        const bbqSC = new ethers.Contract('0x7004757e595409568Bd728736e1b0c79FDc94e1c', erc20ABI, providerJBC)
        const pzaSC = new ethers.Contract('0x09DcdCFc6C48803681a3422997c679E773656763', erc20ABI, providerJBC)
        const woodSC = new ethers.Contract('0xc2744Ff255518a736505cF9aC1996D9adDec69Bd', erc20ABI, providerJBC)
        const sx31SC = new ethers.Contract('0xd431d826d7a4380b9259612176f00528b88840a7', erc20ABI, providerJBC)
        const ctunaSC = new ethers.Contract('0xD9Be0e64053c8E0A0F868577F379C0ced5A28aF0', erc20ABI, providerJBC)
        const platSC = new ethers.Contract('0x3Bd00B6cd18281E3Ef13Ba348ad2783794dcb2bD', erc20ABI, providerJBC)
        const goldSC = new ethers.Contract('0x7d5346E33889580528e6F79f48BdEE94D8A9E144', erc20ABI, providerJBC)
        const silSC = new ethers.Contract('0x2a081667587c35956d34A4cC3bf92b9CA0ef2C6f', erc20ABI, providerJBC)
        const cuSC = new ethers.Contract('0x42F5213C7b6281FC6fb2d6F10576F70DB0a4C841', erc20ABI, providerJBC)
        const osSC = new ethers.Contract('0xAc5299D92373E9352636559cca497d7683A47655', erc20ABI, providerJBC)
        const jdaoSC = new ethers.Contract('0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88', erc20ABI, providerJBC)
        const jaspSC = new ethers.Contract('0xe83567Cd0f3Ed2cca21BcE05DBab51707aff2860', erc20ABI, providerJBC)

        const thefetch = async () => {
            const blockNumber = await providerJBC.getBlockNumber()

            const fee1Filter = await jusdtSC.filters.Transfer(null, "0x280608DD7712a5675041b95d0000B9089903B569", null)
            const fee1Event = await jusdtSC.queryFilter(fee1Filter, blockNumber - 7200, 'latest')
            const fee1Map = await Promise.all(fee1Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * 0.01}))
            const fee2Filter = await jusdtSC.filters.Transfer("0x280608DD7712a5675041b95d0000B9089903B569", null, null)
            const fee2Event = await jusdtSC.queryFilter(fee2Filter, blockNumber - 7200, 'latest')
            const fee2Map = await Promise.all(fee2Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/99)}))
            const sumFee = fee1Map.concat(fee2Map).reduce((partialSum, a) => partialSum + a, 0)

            const fee3Filter = await cmjSC.filters.Transfer(null, "0x472d0e2E9839c140786D38110b3251d5ED08DF41", null)
            const fee3Event = await cmjSC.queryFilter(fee3Filter, blockNumber - 7200, 'latest')
            const fee3Map = await Promise.all(fee3Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * 0.01}))
            const fee4Filter = await cmjSC.filters.Transfer("0x472d0e2E9839c140786D38110b3251d5ED08DF41", null, null)
            const fee4Event = await cmjSC.queryFilter(fee4Filter, blockNumber - 7200, 'latest')
            const fee4Map = await Promise.all(fee4Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/99)}))
            const sumFee2 = fee3Map.concat(fee4Map).reduce((partialSum, a) => partialSum + a, 0)

            const fee5Filter = await cmjSC.filters.Transfer(jaspCmjLp, merchant, null)
            const fee5Event = await cmjSC.queryFilter(fee5Filter, blockNumber - 7200, 'latest')
            const fee5Map = await Promise.all(fee5Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee6Filter = await jaspSC.filters.Transfer(jaspCmjLp, merchant, null)
            const fee6Event = await jaspSC.queryFilter(fee6Filter, blockNumber - 7200, 'latest')
            const fee6Map = await Promise.all(fee6Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee3 = fee5Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee3_2 = fee6Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee7Filter = await cmjSC.filters.Transfer(jdaoCmjLp, merchant, null)
            const fee7Event = await cmjSC.queryFilter(fee7Filter, blockNumber - 7200, 'latest')
            const fee7Map = await Promise.all(fee7Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee8Filter = await jdaoSC.filters.Transfer(jdaoCmjLp, merchant, null)
            const fee8Event = await jdaoSC.queryFilter(fee8Filter, blockNumber - 7200, 'latest')
            const fee8Map = await Promise.all(fee8Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee4 = fee7Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee4_2 = fee8Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee9Filter = await cmjSC.filters.Transfer(osCmjLp, merchant, null)
            const fee9Event = await cmjSC.queryFilter(fee9Filter, blockNumber - 7200, 'latest')
            const fee9Map = await Promise.all(fee9Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee10Filter = await osSC.filters.Transfer(osCmjLp, merchant, null)
            const fee10Event = await osSC.queryFilter(fee10Filter, blockNumber - 7200, 'latest')
            const fee10Map = await Promise.all(fee10Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee5 = fee9Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee5_2 = fee10Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee11Filter = await cmjSC.filters.Transfer(cuCmjLp, merchant, null)
            const fee11Event = await cmjSC.queryFilter(fee11Filter, blockNumber - 7200, 'latest')
            const fee11Map = await Promise.all(fee11Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee12Filter = await cuSC.filters.Transfer(cuCmjLp, merchant, null)
            const fee12Event = await cuSC.queryFilter(fee12Filter, blockNumber - 7200, 'latest')
            const fee12Map = await Promise.all(fee12Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value))  * (1/4)}))
            const sumFee6 = fee11Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee6_2 = fee12Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee13Filter = await cmjSC.filters.Transfer(silCmjLp, merchant, null)
            const fee13Event = await cmjSC.queryFilter(fee13Filter, blockNumber - 7200, 'latest')
            const fee13Map = await Promise.all(fee13Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee14Filter = await silSC.filters.Transfer(silCmjLp, merchant, null)
            const fee14Event = await silSC.queryFilter(fee14Filter, blockNumber - 7200, 'latest')
            const fee14Map = await Promise.all(fee14Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee7 = fee13Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee7_2 = fee14Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee15Filter = await cmjSC.filters.Transfer(goldCmjLp, merchant, null)
            const fee15Event = await cmjSC.queryFilter(fee15Filter, blockNumber - 7200, 'latest')
            const fee15Map = await Promise.all(fee15Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee16Filter = await goldSC.filters.Transfer(goldCmjLp, merchant, null)
            const fee16Event = await goldSC.queryFilter(fee16Filter, blockNumber - 7200, 'latest')
            const fee16Map = await Promise.all(fee16Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee8 = fee15Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee8_2 = fee16Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee17Filter = await cmjSC.filters.Transfer(platCmjLp, merchant, null)
            const fee17Event = await cmjSC.queryFilter(fee17Filter, blockNumber - 7200, 'latest')
            const fee17Map = await Promise.all(fee17Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee18Filter = await platSC.filters.Transfer(platCmjLp, merchant, null)
            const fee18Event = await platSC.queryFilter(fee18Filter, blockNumber - 7200, 'latest')
            const fee18Map = await Promise.all(fee18Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee9 = fee17Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee9_2 = fee18Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee19Filter = await cmjSC.filters.Transfer(ctunaCmjLp, merchant, null)
            const fee19Event = await cmjSC.queryFilter(fee19Filter, blockNumber - 7200, 'latest')
            const fee19Map = await Promise.all(fee19Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee20Filter = await ctunaSC.filters.Transfer(ctunaCmjLp, merchant, null)
            const fee20Event = await ctunaSC.queryFilter(fee20Filter, blockNumber - 7200, 'latest')
            const fee20Map = await Promise.all(fee20Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee10 = fee19Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee10_2 = fee20Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee21Filter = await cmjSC.filters.Transfer(sx31CmjLp, merchant, null)
            const fee21Event = await cmjSC.queryFilter(fee21Filter, blockNumber - 7200, 'latest')
            const fee21Map = await Promise.all(fee21Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee22Filter = await sx31SC.filters.Transfer(sx31CmjLp, merchant, null)
            const fee22Event = await sx31SC.queryFilter(fee22Filter, blockNumber - 7200, 'latest')
            const fee22Map = await Promise.all(fee22Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee11 = fee21Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee11_2 = fee22Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee23Filter = await cmjSC.filters.Transfer(bbqCmjLp, merchant, null)
            const fee23Event = await cmjSC.queryFilter(fee23Filter, blockNumber - 7200, 'latest')
            const fee23Map = await Promise.all(fee23Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee24Filter = await bbqSC.filters.Transfer(bbqCmjLp, merchant, null)
            const fee24Event = await bbqSC.queryFilter(fee24Filter, blockNumber - 7200, 'latest')
            const fee24Map = await Promise.all(fee24Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee12 = fee23Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee12_2 = fee24Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee25Filter = await cmjSC.filters.Transfer(pzaCmjLp, merchant, null)
            const fee25Event = await cmjSC.queryFilter(fee25Filter, blockNumber - 7200, 'latest')
            const fee25Map = await Promise.all(fee25Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee26Filter = await pzaSC.filters.Transfer(pzaCmjLp, merchant, null)
            const fee26Event = await pzaSC.queryFilter(fee26Filter, blockNumber - 7200, 'latest')
            const fee26Map = await Promise.all(fee26Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee13 = fee25Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee13_2 = fee26Map.reduce((partialSum, a) => partialSum + a, 0)

            const fee27Filter = await cmjSC.filters.Transfer(woodCmjLp, merchant, null)
            const fee27Event = await cmjSC.queryFilter(fee27Filter, blockNumber - 7200, 'latest')
            const fee27Map = await Promise.all(fee27Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const fee28Filter = await woodSC.filters.Transfer(woodCmjLp, merchant, null)
            const fee28Event = await woodSC.queryFilter(fee28Filter, blockNumber - 7200, 'latest')
            const fee28Map = await Promise.all(fee28Event.map(async (obj) => {return Number(ethers.utils.formatEther(obj.args.value)) * (1/4)}))
            const sumFee14 = fee27Map.reduce((partialSum, a) => partialSum + a, 0)
            const sumFee14_2 = fee28Map.reduce((partialSum, a) => partialSum + a, 0)

            const data = address !== null && address !== undefined ? await readContracts({
                contracts: [
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [1, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [1, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [2, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [2, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [3, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [3, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [4, address],
                    },
                    {
                        address: jaspCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [4, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [5, address],
                    },
                    {
                        address: jdaoCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [5, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [6, address],
                    },
                    {
                        address: osCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [6, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [7, address],
                    },
                    {
                        address: cuCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [7, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [8, address],
                    },
                    {
                        address: silCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [8, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [9, address],
                    },
                    {
                        address: goldCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [9, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [10, address],
                    },
                    {
                        address: platCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [10, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [12, address],
                    },
                    {
                        address: ctunaCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [12, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [13, address],
                    },
                    {
                        address: sx31CmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [13, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [14, address],
                    },
                    {
                        address: bbqCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [14, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [15, address],
                    },
                    {
                        address: pzaCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [15, address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'userInfo',
                        args: [16, address],
                    },
                    {
                        address: woodCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [address],
                    },
                    {
                        address: farmJdao,
                        abi: farmJdaoABI,
                        functionName: 'pendingCake',
                        args: [16, address],
                    },
                ],
            }) : [{result: [0]}, {result: 0}, {result: [0]}, {result: 0}, {result: [0]}, {result: 0}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]}, {result: [0]},]

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

            const data2 = await readContracts({
                contracts: [
                    {
                        address: jcExchange,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: juExchange,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: jcExchange,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: cmjToken,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: juExchange,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: jaspCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: jaspCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: jaspCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: jdaoCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: jdaoCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: jdaoCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: osCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: osCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: osCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: jdaoCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: cuCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: cuCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: cuCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: silCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: silCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: silCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: goldCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: goldCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: goldCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: platCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: platCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: platCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: ctunaCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: ctunaCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: ctunaCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: sx31CmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: sx31CmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: sx31CmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: bbqCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: bbqCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: bbqCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: pzaCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: pzaCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: pzaCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: woodCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveCurrency',
                    },
                    {
                        address: woodCmjLp,
                        abi: erc20ABI,
                        functionName: 'totalSupply',
                    },
                    {
                        address: woodCmjLp,
                        abi: erc20ABI,
                        functionName: 'balanceOf',
                        args: [farmJdao],
                    },
                    {
                        address: bbqCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: pzaCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: woodCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: sx31CmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: ctunaCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: platCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: goldCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: silCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: cuCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: osCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
                    },
                    {
                        address: jaspCmjLp,
                        abi: cmdaoAmmNpcABI,
                        functionName: 'getReserveToken',
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
            
            return [
                jclpTotalSup, julpTotalSup, farmJdaoBal, farmJdaoTotalStake, jdaoPend, farmJdao202Bal, farmJdao202TotalStake, jdao202Pend, farmJdao3Bal, farmJdao3TotalStake, jdao3Pend,
                sumFee, sumFee2, farmJdao4Bal, jdao4Pend, jaspcmjbal, _reserveCmjJASP, jaspCmjTotalSup, farmJdao4TotalStake, sumFee3, 
                farmJdao5Bal, jdao5Pend, jdaocmjbal, _reserveCmjJDAO, jdaoCmjTotalSup, farmJdao5TotalStake, sumFee4, 
                farmJdao6Bal, jdao6Pend, oscmjbal, _reserveCmjOS, osCmjTotalSup, farmJdao6TotalStake, sumFee5, _reserveJDAO,
                farmJdao7Bal, jdao7Pend, cucmjbal, _reserveCmjCU, cuCmjTotalSup, farmJdao7TotalStake, sumFee6,
                farmJdao8Bal, jdao8Pend, silcmjbal, _reserveCmjSIL, silCmjTotalSup, farmJdao8TotalStake, sumFee7,
                farmJdao9Bal, jdao9Pend, goldcmjbal, _reserveCmjGOLD, goldCmjTotalSup, farmJdao9TotalStake, sumFee8,
                farmJdao10Bal, jdao10Pend, platcmjbal, _reserveCmjPLAT, platCmjTotalSup, farmJdao10TotalStake, sumFee9,
                farmJdao11Bal, jdao11Pend, ctunacmjbal, _reserveCmjCTUNA, ctunaCmjTotalSup, farmJdao11TotalStake, sumFee10,
                farmJdao12Bal, jdao12Pend, sx31cmjbal, _reserveCmjSX31, sx31CmjTotalSup, farmJdao12TotalStake, sumFee11,
                farmJdao13Bal, jdao13Pend, bbqcmjbal, _reserveCmjBBQ, bbqCmjTotalSup, farmJdao13TotalStake, sumFee12,
                farmJdao14Bal, jdao14Pend, pzacmjbal, _reserveCmjPZA, pzaCmjTotalSup, farmJdao14TotalStake, sumFee13,
                farmJdao15Bal, jdao15Pend, woodcmjbal, _reserveCmjWOOD, woodCmjTotalSup, farmJdao15TotalStake, sumFee14,
                _reserveBBQ, sumFee12_2, _reservePZA, sumFee13_2, _reserveWOOD, sumFee14_2, _reserveSX31, sumFee11_2, _reserveCTUNA, sumFee10_2, _reservePLAT, sumFee9_2, _reserveGOLD, sumFee8_2, _reserveSIL, sumFee7_2, _reserveCU, sumFee6_2,  _reserveOS, sumFee5_2,  sumFee4_2, _reserveJASP, sumFee3_2,
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
            const _lptotalsupply = ethers.utils.formatEther(result[0].result)
            const _julptotalsupply = ethers.utils.formatEther(result[1].result)
            const _farmjdaobalance = ethers.utils.formatEther(result[2].result[0])
            setFarmJdaoBalance(_farmjdaobalance)
            const _farmjdaototalstake = ethers.utils.formatEther(result[3].result)

            setJbcJdaoStaked((Number(jbcReserv) * Number(_farmjdaototalstake)) / Number(_lptotalsupply))
            setCmjJdaoStaked((Number(cmjReserv) * Number(_farmjdaototalstake)) / Number(_lptotalsupply))
            setYourJbcJdaoStaked((Number(jbcReserv) * Number(_farmjdaobalance)) / Number(_lptotalsupply))
            setYourCmjJdaoStaked((Number(cmjReserv) * Number(_farmjdaobalance)) / Number(_lptotalsupply))

            setJdaoPending(Number(ethers.utils.formatEther(result[4].result)).toFixed(4))

            setFarmJdao202Balance(Number(ethers.utils.formatEther(result[5].result[0])).toFixed(4))
            setCmjJdao202Staked(Number(ethers.utils.formatEther(result[6].result)).toFixed(4))
            setJdao202Pending(Number(ethers.utils.formatEther(result[7].result)).toFixed(4))

            const _farmjdao3balance = ethers.utils.formatEther(result[8].result[0])
            setFarmJdao3Balance(_farmjdao3balance)
            const _farmjdao3totalstake = ethers.utils.formatEther(result[9].result)

            setJbcJdao3Staked((Number(jbcJuReserv) * Number(_farmjdao3totalstake)) / Number(_julptotalsupply))
            setJusdtJdao3Staked((Number(jusdtJuReserv) * Number(_farmjdao3totalstake)) / Number(_julptotalsupply))
            setYourJbcJdao3Staked((Number(jbcJuReserv) * Number(_farmjdao3balance)) / Number(_julptotalsupply))
            setYourJusdtJdao3Staked((Number(jusdtJuReserv) * Number(_farmjdao3balance)) / Number(_julptotalsupply))

            setJdao3Pending(Number(ethers.utils.formatEther(result[10].result)).toFixed(4))

            setSwapfee24hour1(Number(result[11]).toFixed(0))
            setSwapfee24hour2(Number(result[12]).toFixed(0))

            const _farmjdao4balance = ethers.utils.formatEther(result[13].result[0])
            setFarmJdao4Balance(_farmjdao4balance)
            setJdao4Pending(Number(ethers.utils.formatEther(result[14].result)).toFixed(4))
            setJaspCmjBalance(ethers.utils.formatEther(result[15].result))
            const _cmjjaspreserve = ethers.utils.formatEther(result[16].result)
            setReserveCmjJASP(_cmjjaspreserve)
            const _jaspcmjtotalsupply = ethers.utils.formatEther(result[17].result)
            const _farmjdao4totalstake = ethers.utils.formatEther(result[18].result)
            setCmjJaspStaked((Number(_cmjjaspreserve) * Number(_farmjdao4totalstake)) / Number(_jaspcmjtotalsupply))
            setCmjJaspPooled((Number(_cmjjaspreserve) * Number(ethers.utils.formatEther(result[15].result))) / Number(_jaspcmjtotalsupply))
            setYourCmjJaspStaked((Number(_cmjjaspreserve) * Number(_farmjdao4balance)) / Number(_jaspcmjtotalsupply))
            setSwapfee24hour3(Number(result[19]).toFixed(0))
            setReserveJASP(ethers.utils.formatEther(result[119].result))
            setSwapfee24hour3_2(Number(result[120]).toFixed(0))

            const _farmjdao5balance = ethers.utils.formatEther(result[20].result[0])
            setFarmJdao5Balance(_farmjdao5balance)
            setJdao5Pending(Number(ethers.utils.formatEther(result[21].result)).toFixed(4))
            setJdaoCmjBalance(ethers.utils.formatEther(result[22].result))
            const _cmjjdaoreserve = ethers.utils.formatEther(result[23].result)
            setReserveCmjJDAO(_cmjjdaoreserve)
            const _jdaocmjtotalsupply = ethers.utils.formatEther(result[24].result)
            const _farmjdao5totalstake = ethers.utils.formatEther(result[25].result)
            setCmjJdaoLpStaked((Number(_cmjjdaoreserve) * Number(_farmjdao5totalstake)) / Number(_jdaocmjtotalsupply))
            setCmjJdaoPooled((Number(_cmjjdaoreserve) * Number(ethers.utils.formatEther(result[22].result))) / Number(_jdaocmjtotalsupply))
            setYourCmjJdaoLpStaked((Number(_cmjjdaoreserve) * Number(_farmjdao5balance)) / Number(_jdaocmjtotalsupply))
            setSwapfee24hour4(Number(result[26]).toFixed(0))
            setReserveJDAO(ethers.utils.formatEther(result[34].result))
            setSwapfee24hour4_2(Number(result[118]).toFixed(0))

            const _farmjdao6balance = ethers.utils.formatEther(result[27].result[0])
            setFarmJdao6Balance(_farmjdao6balance)
            setJdao6Pending(Number(ethers.utils.formatEther(result[28].result)).toFixed(4))
            setOsCmjBalance(ethers.utils.formatEther(result[29].result))
            const _cmjosreserve = ethers.utils.formatEther(result[30].result)
            setReserveCmjOS(_cmjosreserve)
            const _oscmjtotalsupply = ethers.utils.formatEther(result[31].result)
            const _farmjdao6totalstake = ethers.utils.formatEther(result[32].result)
            setCmjOsStaked((Number(_cmjosreserve) * Number(_farmjdao6totalstake)) / Number(_oscmjtotalsupply))
            setCmjOsPooled((Number(_cmjosreserve) * Number(ethers.utils.formatEther(result[29].result))) / Number(_oscmjtotalsupply))
            setYourCmjOsStaked((Number(_cmjosreserve) * Number(_farmjdao6balance)) / Number(_oscmjtotalsupply))
            setSwapfee24hour5(Number(result[33]).toFixed(0))
            setReserveOS(ethers.utils.formatEther(result[116].result))
            setSwapfee24hour5_2(Number(result[117]).toFixed(0))

            const _farmjdao7balance = ethers.utils.formatEther(result[35].result[0])
            setFarmJdao7Balance(_farmjdao7balance)
            setJdao7Pending(Number(ethers.utils.formatEther(result[36].result)).toFixed(4))
            setCuCmjBalance(ethers.utils.formatEther(result[37].result))
            const _cmjcureserve = ethers.utils.formatEther(result[38].result)
            setReserveCmjCU(_cmjcureserve)
            const _cucmjtotalsupply = ethers.utils.formatEther(result[39].result)
            const _farmjdao7totalstake = ethers.utils.formatEther(result[40].result)
            setCmjCuStaked((Number(_cmjcureserve) * Number(_farmjdao7totalstake)) / Number(_cucmjtotalsupply))
            setCmjCuPooled((Number(_cmjcureserve) * Number(ethers.utils.formatEther(result[37].result))) / Number(_cucmjtotalsupply))
            setYourCmjCuStaked((Number(_cmjcureserve) * Number(_farmjdao7balance)) / Number(_cucmjtotalsupply))
            setSwapfee24hour6(Number(result[41]).toFixed(0))
            setReserveCU(ethers.utils.formatEther(result[114].result))
            setSwapfee24hour6_2(Number(result[115]).toFixed(0))

            const _farmjdao8balance = ethers.utils.formatEther(result[42].result[0])
            setFarmJdao8Balance(_farmjdao8balance)
            setJdao8Pending(Number(ethers.utils.formatEther(result[43].result)).toFixed(4))
            setSilCmjBalance(ethers.utils.formatEther(result[44].result))
            const _cmjsilreserve = ethers.utils.formatEther(result[45].result)
            setReserveCmjSIL(_cmjsilreserve)
            const _silcmjtotalsupply = ethers.utils.formatEther(result[46].result)
            const _farmjdao8totalstake = ethers.utils.formatEther(result[47].result)
            setCmjSilStaked((Number(_cmjsilreserve) * Number(_farmjdao8totalstake)) / Number(_silcmjtotalsupply))
            setCmjSilPooled((Number(_cmjsilreserve) * Number(ethers.utils.formatEther(result[44].result))) / Number(_silcmjtotalsupply))
            setYourCmjSilStaked((Number(_cmjsilreserve) * Number(_farmjdao8balance)) / Number(_silcmjtotalsupply))
            setSwapfee24hour7(Number(result[48]).toFixed(0))
            setReserveSIL(ethers.utils.formatEther(result[112].result))
            setSwapfee24hour7_2(Number(result[113]).toFixed(0))

            const _farmjdao9balance = ethers.utils.formatEther(result[49].result[0])
            setFarmJdao9Balance(_farmjdao9balance)
            setJdao9Pending(Number(ethers.utils.formatEther(result[50].result)).toFixed(4))
            setGoldCmjBalance(ethers.utils.formatEther(result[51].result))
            const _cmjgoldreserve = ethers.utils.formatEther(result[52].result)
            setReserveCmjGOLD(_cmjgoldreserve)
            const _goldcmjtotalsupply = ethers.utils.formatEther(result[53].result)
            const _farmjdao9totalstake = ethers.utils.formatEther(result[54].result)
            setCmjGoldStaked((Number(_cmjgoldreserve) * Number(_farmjdao9totalstake)) / Number(_goldcmjtotalsupply))
            setCmjGoldPooled((Number(_cmjgoldreserve) * Number(ethers.utils.formatEther(result[51].result))) / Number(_goldcmjtotalsupply))
            setYourCmjGoldStaked((Number(_cmjgoldreserve) * Number(_farmjdao9balance)) / Number(_goldcmjtotalsupply))
            setSwapfee24hour8(Number(result[55]).toFixed(0))
            setReserveGOLD(ethers.utils.formatEther(result[110].result))
            setSwapfee24hour8_2(Number(result[111]).toFixed(0))

            const _farmjdao10balance = ethers.utils.formatEther(result[56].result[0])
            setFarmJdao10Balance(_farmjdao10balance)
            setJdao10Pending(Number(ethers.utils.formatEther(result[57].result)).toFixed(4))
            setPlatCmjBalance(ethers.utils.formatEther(result[58].result))
            const _cmjplatreserve = ethers.utils.formatEther(result[59].result)
            setReserveCmjPLAT(_cmjplatreserve)
            const _platcmjtotalsupply = ethers.utils.formatEther(result[60].result)
            const _farmjdao10totalstake = ethers.utils.formatEther(result[61].result)
            setCmjPlatStaked((Number(_cmjplatreserve) * Number(_farmjdao10totalstake)) / Number(_platcmjtotalsupply))
            setCmjPlatPooled((Number(_cmjplatreserve) * Number(ethers.utils.formatEther(result[58].result))) / Number(_platcmjtotalsupply))
            setYourCmjPlatStaked((Number(_cmjplatreserve) * Number(_farmjdao10balance)) / Number(_platcmjtotalsupply))
            setSwapfee24hour9(Number(result[62]).toFixed(0))
            setReservePLAT(ethers.utils.formatEther(result[108].result))
            setSwapfee24hour9_2(Number(result[109]).toFixed(0))

            const _farmjdao11balance = ethers.utils.formatEther(result[63].result[0])
            setFarmJdao11Balance(_farmjdao11balance)
            setJdao11Pending(Number(ethers.utils.formatEther(result[64].result)).toFixed(4))
            setCtunaCmjBalance(ethers.utils.formatEther(result[65].result))
            const _cmjctunareserve = ethers.utils.formatEther(result[66].result)
            setReserveCmjCTUNA(_cmjctunareserve)
            const _ctunacmjtotalsupply = ethers.utils.formatEther(result[67].result)
            const _farmjdao11totalstake = ethers.utils.formatEther(result[68].result)
            setCmjCtunaStaked((Number(_cmjctunareserve) * Number(_farmjdao11totalstake)) / Number(_ctunacmjtotalsupply))
            setCmjCtunaPooled((Number(_cmjctunareserve) * Number(ethers.utils.formatEther(result[65].result))) / Number(_ctunacmjtotalsupply))
            setYourCmjCtunaStaked((Number(_cmjctunareserve) * Number(_farmjdao11balance)) / Number(_ctunacmjtotalsupply))
            setSwapfee24hour10(Number(result[69]).toFixed(0))
            setReserveCTUNA(ethers.utils.formatEther(result[106].result))
            setSwapfee24hour10_2(Number(result[107]).toFixed(0))

            const _farmjdao12balance = ethers.utils.formatEther(result[70].result[0])
            setFarmJdao12Balance(_farmjdao12balance)
            setJdao12Pending(Number(ethers.utils.formatEther(result[71].result)).toFixed(4))
            setSx31CmjBalance(ethers.utils.formatEther(result[72].result))
            const _cmjsx31reserve = ethers.utils.formatEther(result[73].result)
            setReserveCmjSX31(_cmjsx31reserve)
            const _sx31cmjtotalsupply = ethers.utils.formatEther(result[74].result)
            const _farmjdao12totalstake = ethers.utils.formatEther(result[75].result)
            setCmjSx31Staked((Number(_cmjsx31reserve) * Number(_farmjdao12totalstake)) / Number(_sx31cmjtotalsupply))
            setCmjSx31Pooled((Number(_cmjsx31reserve) * Number(ethers.utils.formatEther(result[72].result))) / Number(_sx31cmjtotalsupply))
            setYourCmjSx31Staked((Number(_cmjsx31reserve) * Number(_farmjdao12balance)) / Number(_sx31cmjtotalsupply))
            setSwapfee24hour11(Number(result[76]).toFixed(0))
            setReserveSX31(ethers.utils.formatEther(result[104].result))
            setSwapfee24hour11_2(Number(result[105]).toFixed(0))

            const _farmjdao13balance = ethers.utils.formatEther(result[77].result[0])
            setFarmJdao13Balance(_farmjdao13balance)
            setJdao13Pending(Number(ethers.utils.formatEther(result[78].result)).toFixed(4))
            setBbqCmjBalance(ethers.utils.formatEther(result[79].result))
            const _cmjbbqreserve = ethers.utils.formatEther(result[80].result)
            setReserveCmjBBQ(_cmjbbqreserve)
            const _bbqcmjtotalsupply = ethers.utils.formatEther(result[81].result)
            const _farmjdao13totalstake = ethers.utils.formatEther(result[82].result)
            setCmjBbqStaked((Number(_cmjbbqreserve) * Number(_farmjdao13totalstake)) / Number(_bbqcmjtotalsupply))
            setCmjBbqPooled((Number(_cmjbbqreserve) * Number(ethers.utils.formatEther(result[79].result))) / Number(_bbqcmjtotalsupply))
            setYourCmjBbqStaked((Number(_cmjbbqreserve) * Number(_farmjdao13balance)) / Number(_bbqcmjtotalsupply))
            setSwapfee24hour12(Number(result[83]).toFixed(0))
            setReserveBBQ(ethers.utils.formatEther(result[98].result))
            setSwapfee24hour12_2(Number(result[99]).toFixed(0))

            const _farmjdao14balance = ethers.utils.formatEther(result[84].result[0])
            setFarmJdao14Balance(_farmjdao14balance)
            setJdao14Pending(Number(ethers.utils.formatEther(result[85].result)).toFixed(4))
            setPzaCmjBalance(ethers.utils.formatEther(result[86].result))
            const _cmjpzareserve = ethers.utils.formatEther(result[87].result)
            setReserveCmjPZA(_cmjpzareserve)
            const _pzacmjtotalsupply = ethers.utils.formatEther(result[88].result)
            const _farmjdao14totalstake = ethers.utils.formatEther(result[89].result)
            setCmjPzaStaked((Number(_cmjpzareserve) * Number(_farmjdao14totalstake)) / Number(_pzacmjtotalsupply))
            setCmjPzaPooled((Number(_cmjpzareserve) * Number(ethers.utils.formatEther(result[86].result))) / Number(_pzacmjtotalsupply))
            setYourCmjPzaStaked((Number(_cmjpzareserve) * Number(_farmjdao14balance)) / Number(_pzacmjtotalsupply))
            setSwapfee24hour13(Number(result[90]).toFixed(0))
            setReservePZA(ethers.utils.formatEther(result[100].result))
            setSwapfee24hour13_2(Number(result[101]).toFixed(0))

            const _farmjdao15balance = ethers.utils.formatEther(result[91].result[0])
            setFarmJdao15Balance(_farmjdao15balance)
            setJdao15Pending(Number(ethers.utils.formatEther(result[92].result)).toFixed(4))
            setWoodCmjBalance(ethers.utils.formatEther(result[93].result))
            const _cmjwoodreserve = ethers.utils.formatEther(result[94].result)
            setReserveCmjWOOD(_cmjwoodreserve)
            const _woodcmjtotalsupply = ethers.utils.formatEther(result[95].result)
            const _farmjdao15totalstake = ethers.utils.formatEther(result[96].result)
            setCmjWoodStaked((Number(_cmjwoodreserve) * Number(_farmjdao15totalstake)) / Number(_woodcmjtotalsupply))
            setCmjWoodPooled((Number(_cmjwoodreserve) * Number(ethers.utils.formatEther(result[93].result))) / Number(_woodcmjtotalsupply))
            setYourCmjWoodStaked((Number(_cmjwoodreserve) * Number(_farmjdao15balance)) / Number(_woodcmjtotalsupply))
            setSwapfee24hour14(Number(result[97]).toFixed(0))
            setReserveWOOD(ethers.utils.formatEther(result[102].result))
            setSwapfee24hour14_2(Number(result[103]).toFixed(0))
        })
    }, [address, txupdate, jbcReserv, cmjReserv, jbcJuReserv, jusdtJuReserv, cmjToken, jcExchange, juExchange, farmJdaoABI, erc20ABI, cmdaoAmmNpcABI])

    return (
        <>
            <div style={{margin: "20px 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x472d0e2E9839c140786D38110b3251d5ED08DF41" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" alt="$JBC" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor(((swapfee24hour2 * (jbcReserv/cmjReserv)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (1000/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / Number(((Number(jbcJdaoStaked) + Number(cmjJdaoStaked * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv)) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number(swapfee24hour2 * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div>
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (1000/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (1000/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {Number(jbcJdaoStaked) !== 0 ? <div>~฿{Number(((Number(jbcJdaoStaked) + Number(cmjJdaoStaked * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv)) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdaoPending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={harvestHandle}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdaoBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={maxWithdrawHandle1}>{Number(Math.floor(farmJdaoBalance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourjbcJdaoStaked + (yourcmjJdaoStaked * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={handleWithdraw}
                                value={lpJdaoWithdraw}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={withdrawstakeHandle}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {lpBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={maxAddHandle1}>{Number(Math.floor(lpBalance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((jbcPooled + (cmjPooled * (jbcReserv/cmjReserv))) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={handleStake}
                                value={lpJdaoStake}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={addstakeHandle}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x280608DD7712a5675041b95d0000B9089903B569" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "2.5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreih6o2px5oqockhsuer7wktcvoky36gpdhv7qjwn76enblpce6uokq" alt="$JBC" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreif3vllg6mwswlqypqgtsh7i7wwap7zgrkvtlhdjoc63zjm7uv6vvi" alt="$JUSDT" />
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour1) + (((231481480 * 100000000) / 10**18) * (86400/12) * (1200/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv))) * priceTHB * 1) / 1) * 365) / (Number(jbcJdaoStaked) + Number(((Number(jusdtJdao3Staked) + Number(jbcJdao3Staked * (jusdtJuReserv/jbcJuReserv))) * priceTHB))))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number(swapfee24hour1 * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div>
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (1200/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (1200/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {Number(jusdtJdao3Staked) !== 0 ? <div>~฿{((Number(jusdtJdao3Staked) + Number(jbcJdao3Staked * (jusdtJuReserv/jbcJuReserv))) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao3Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={harvestHandle3}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao3Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={maxWithdrawHandle3}>{Number(Math.floor(farmJdao3Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor(Number(yourjusdtJdao3Staked + Number(yourjbcJdao3Staked * (jusdtJuReserv/jbcJuReserv))) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={handleWithdraw3}
                                value={lpJdao3Withdraw}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={withdrawstakeHandle3}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {julpBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={maxAddHandle3}>{(Math.floor(Number(julpBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{(Math.floor((Number(jusdtjuPooled) + Number(jbcjuPooled * (jusdtJuReserv/jbcJuReserv))) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={handleStake3}
                                value={lpJdao3Stake}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={addstakeHandle3}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x3C061eEce15C539CaE99FbE75B3044236Fa2eff0" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour4) + (swapfee24hour4_2 * (reserveCmjJDAO/reserveJDAO)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjJdaoLpStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour4) + (swapfee24hour4_2 * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div>
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {Number(cmjJdaoLpStaked) !== 0 ? <div>~฿{Number(((Number(cmjJdaoLpStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao5Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(5)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao5Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao5Withdraw(farmJdao5Balance)}>{Number(Math.floor(farmJdao5Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjJdaoLpStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao5Withdraw}
                                onChange={(event) => setLpJdao5Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(5)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {jdaoCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao5Stake(jdaoCmjBalance)}>{(Math.floor(Number(jdaoCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjJdaoPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao5Stake}
                                onChange={(event) => setLpJdao5Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(5)}>Stake</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginBottom: "20px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x329889325A555b217C41A4c2EADD529a0CfA4231" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreico3y6ql5vudm35ttestwvffdacbp25h6t5ipbyncwr3qtzprrm5e" alt="$OS" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour5) + (swapfee24hour5_2 * (reserveCmjOS/reserveOS)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjOsStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour5) + (swapfee24hour5_2 * (reserveCmjOS/reserveOS))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div>
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {Number(cmjOsStaked) !== 0 ? <div>~฿{Number(((Number(cmjOsStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao6Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(6)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao6Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao6Withdraw(farmJdao6Balance)}>{Number(Math.floor(farmJdao6Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjOsStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao6Withdraw}
                                onChange={(event) => setLpJdao6Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(6)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {osCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao6Stake(osCmjBalance)}>{(Math.floor(Number(osCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjOsPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao6Stake}
                                onChange={(event) => setLpJdao6Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(6)}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x1b70c95fD4EbF8920A624bd2ce22b6905eFBdF60" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreidau3s66zmqwtyp2oimumulxeuw7qm6apcornbvxbqmafvq3nstiq" alt="$CU" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour6) + (swapfee24hour6_2 * (reserveCmjCU/reserveCU)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjCuStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour6) + (swapfee24hour6_2 * (reserveCmjCU/reserveCU))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {Number(cmjCuStaked) !== 0 ? <div>~฿{Number(((Number(cmjCuStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao7Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(7)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao7Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao7Withdraw(farmJdao7Balance)}>{Number(Math.floor(farmJdao7Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjCuStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao7Withdraw}
                                onChange={(event) => setLpJdao7Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(7)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {cuCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao7Stake(cuCmjBalance)}>{(Math.floor(Number(cuCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjCuPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao7Stake}
                                onChange={(event) => setLpJdao7Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(7)}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0xf189c5B03694b70e5DFD8e8CAE84118Ed7616F19" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreigld4xmmrmu763t2vsju3tqhcodgxxsrmgvrlfhdjktgujgcmpmde" alt="$SIL" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour7) + (swapfee24hour7_2 * (reserveCmjSIL/reserveSIL)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjSilStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour7) + (swapfee24hour7_2 * (reserveCmjSIL/reserveSIL))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {Number(cmjSilStaked) !== 0 ? <div>~฿{Number(((cmjSilStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao8Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(8)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao8Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao8Withdraw(farmJdao8Balance)}>{Number(Math.floor(farmJdao8Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjSilStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao8Withdraw}
                                onChange={(event) => setLpJdao8Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(8)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {cuCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao8Stake(silCmjBalance)}>{(Math.floor(Number(silCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjSilPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao8Stake}
                                onChange={(event) => setLpJdao8Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(8)}>Stake</div>
                        </div>
                    </div>
                </div>                
            </div>

            <div style={{marginBottom: "20px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x7086EC7ED5D94ef503bE324B0aE8A3748A15fAE5" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia4zjqhbo4sbvbkvlgnit6yhhjmvo7ny4ybobuee74vqlmziskosm" alt="$GOLD" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour8) + (swapfee24hour8_2 * (reserveCmjGOLD/reserveGOLD)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjGoldStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour8) + (swapfee24hour8_2 * (reserveCmjGOLD/reserveGOLD))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {Number(cmjGoldStaked) !== 0 ? <div>~฿{Number(((cmjGoldStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao9Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(9)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao9Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao9Withdraw(farmJdao9Balance)}>{Number(Math.floor(farmJdao9Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjGoldStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao9Withdraw}
                                onChange={(event) => setLpJdao9Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(9)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {goldCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao9Stake(goldCmjBalance)}>{(Math.floor(Number(goldCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjGoldPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao9Stake}
                                onChange={(event) => setLpJdao9Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(9)}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x78Ff63F4f91Ce56f72882ef9dbE3Be79fBF15044" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreibf7vowyqjrcaeyslflrxxchel3b4qdpwxcxb34js2otg35vjkcaa" alt="$PLAT" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour9) + (swapfee24hour9_2 * (reserveCmjPLAT/reservePLAT)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjPlatStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour9) + (swapfee24hour9_2 * (reserveCmjPLAT/reservePLAT))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {Number(cmjPlatStaked) !== 0 ? <div>~฿{Number(((cmjPlatStaked * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao10Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(10)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao10Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao10Withdraw(farmJdao10Balance)}>{Number(Math.floor(farmJdao10Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjPlatStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao10Withdraw}
                                onChange={(event) => setLpJdao10Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(10)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {platCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao10Stake(platCmjBalance)}>{(Math.floor(Number(platCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjPlatPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao10Stake}
                                onChange={(event) => setLpJdao10Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(10)}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0xc19DE37d5e14b387BCda8e62aB4934591315901D" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreidfl4mgyczqwl3gtunpherc5ri3qbfzm2vevdwcojmhpz3viubopy" alt="$JASP" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour3) + (swapfee24hour3_2 * (reserveCmjJASP/reserveJASP)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjJaspStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour3) + (swapfee24hour3_2 * (reserveCmjJASP/reserveJASP))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {Number(cmjJaspStaked) !== 0 ? <div>~฿{Number(((Number(cmjJaspStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao4Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(4)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao4Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao4Withdraw(farmJdao4Balance)}>{Number(Math.floor(farmJdao4Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjJaspStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao4Withdraw}
                                onChange={(event) => setLpJdao4Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(4)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {jaspCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao4Stake(jaspCmjBalance)}>{(Math.floor(Number(jaspCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjJaspPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao4Stake}
                                onChange={(event) => setLpJdao4Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(4)}>Stake</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginBottom: "20px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x7801F8cdBABE6999331d1Bf37d74aAf713C3722F" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreieyk6odnkrmghee3sc3nfnwxg7jhmyk2tgima3jkdmiy2oap2jc4i" alt="$CTUNA" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour10) + (swapfee24hour10_2 * (reserveCmjCTUNA/reserveCTUNA)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjCtunaStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour10) + (swapfee24hour10_2 * (reserveCmjCTUNA/reserveCTUNA)))  * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjCtunaStaked !== 0 ? <div>~฿{Number(((Number(cmjCtunaStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao11Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(12)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao11Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao11Withdraw(farmJdao11Balance)}>{Number(Math.floor(farmJdao11Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjCtunaStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao11Withdraw}
                                onChange={(event) => setLpJdao11Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(12)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {ctunaCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao11Stake(ctunaCmjBalance)}>{(Math.floor(Number(ctunaCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjCtunaPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao11Stake}
                                onChange={(event) => setLpJdao11Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(12)}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0xda558EE93B466aEb4F59fBf95D25d410318be43A" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreicldm4vbw2ywy7dyrsjbwd5mk6hno3pxpwggdvxjlocbneg5webx4" alt="$SX31" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour11) + (swapfee24hour11_2 * (reserveCmjSX31/reserveSX31)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjSx31Staked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour11) + (swapfee24hour11_2 * (reserveCmjSX31/reserveSX31))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjSx31Staked !== 0 ? <div>~฿{Number(((Number(cmjSx31Staked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao12Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(13)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao12Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao12Withdraw(farmJdao12Balance)}>{Number(Math.floor(farmJdao12Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjSx31Staked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao12Withdraw}
                                onChange={(event) => setLpJdao12Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(13)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {sx31CmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao12Stake(sx31CmjBalance)}>{(Math.floor(Number(sx31CmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjSx31Pooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao12Stake}
                                onChange={(event) => setLpJdao12Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(13)}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x466C3b32538eB0DB9f6c88ee2Fa9c72C495cE08F" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreidldk7skx44xwstwat2evjyp4u5oy5nmamnrhurqtjapnwqzwccd4" alt="$WOOD" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour14) + (swapfee24hour14_2 * (reserveCmjWOOD/reserveWOOD)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjWoodStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour14) + (swapfee24hour14_2 * (reserveCmjWOOD/reserveWOOD))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjWoodStaked !== 0 ? <div>~฿{Number(((Number(cmjWoodStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao15Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(16)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao15Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao15Withdraw(farmJdao15Balance)}>{Number(Math.floor(farmJdao15Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjWoodStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao15Withdraw}
                                onChange={(event) => setLpJdao15Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(16)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {woodCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao15Stake(woodCmjBalance)}>{(Math.floor(Number(woodCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjWoodPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao15Stake}
                                onChange={(event) => setLpJdao15Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(16)}>Stake</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginBottom: "80px", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}> 
                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x6F93F16cF86205C5BB9145078d584c354758D6DB" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreibs763pgx6caw3vaqtzv6b2fmkqpwwzvxwe647gywkn3fsydkjlyq" alt="$BBQ" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour12) + (swapfee24hour12_2 * (reserveCmjBBQ/reserveBBQ)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjBbqStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour12) + (swapfee24hour12_2 * (reserveCmjBBQ/reserveBBQ))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjBbqStaked !== 0 ? <div>~฿{Number(((Number(cmjBbqStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao13Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(14)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao13Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao13Withdraw(farmJdao13Balance)}>{Number(Math.floor(farmJdao13Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjBbqStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao13Withdraw}
                                onChange={(event) => setLpJdao13Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(14)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {bbqCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao13Stake(bbqCmjBalance)}>{(Math.floor(Number(bbqCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjBbqPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao13Stake}
                                onChange={(event) => setLpJdao13Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(14)}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a style={{display: "flex"}} href="https://exp-l1.jibchain.net/token/0x3161EE630bF36d2AB6333a9CfD22ebaa3e2D7C70" target="_blank" rel="noreferrer">
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreifq5hc6oprfye7ha3q5lhly545rx6c4idua7v6mrpz5nqxcrefluu" alt="$PZA" />
                            <img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" />            
                        </a>
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>APR:</div>
                        <div style={{textAlign: "right"}}>
                            <div className="bold" style={{padding: "2px 6px", background: "rgba(102, 204, 172, 0.2)", color: "rgb(102, 204, 172)"}}>
                                {Number(100 * (((Math.floor((Number(swapfee24hour13) + (swapfee24hour13_2 * (reserveCmjPZA/reservePZA)) + (((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1) * 365) / (((Number(cmjPzaStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB))).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div style={{textAlign: "right"}}>
                            <div>
                                ~฿{Number((Number(swapfee24hour13) + (swapfee24hour13_2 * (reserveCmjPZA/reservePZA))) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})} (24hr Fee)
                            </div> 
                            ~฿{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533) * (reserveCmjJDAO/reserveJDAO) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:2})}
                            &nbsp;({Number(((231481480 * 100000000) / 10**18) * (86400/12) * (100/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO)
                        </div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Liquidity Locked:</div>
                        {cmjPzaStaked !== 0 ? <div>~฿{Number(((Number(cmjPzaStaked) * 2) * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao14Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={() => harvestHandleAll(15)}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP STAKED</div>
                            {farmJdao14Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao14Withdraw(farmJdao14Balance)}>{Number(Math.floor(farmJdao14Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((yourcmjPzaStaked * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao14Withdraw}
                                onChange={(event) => setLpJdao14Withdraw(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => withdrawstakeHandleAll(15)}>Withdraw</div>
                        </div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>LP BALANCE</div>
                            {pzaCmjBalance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={() => setLpJdao14Stake(pzaCmjBalance)}>{(Math.floor(Number(pzaCmjBalance) * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor((cmjPzaPooled * 2) * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                value={lpJdao14Stake}
                                onChange={(event) => setLpJdao14Stake(event.target.value)}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={() => addstakeHandleAll(15)}>Stake</div>
                        </div>
                    </div>
                </div>

                <div style={{margin: "20px", padding: "20px 0", width: "400px", height: "450px", boxShadow: "6px 6px 0 #00000040"}} className="nftCard">
                    <div style={{width: "85%", display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <a href="https://exp-l1.jibchain.net/token/0xE67E280f5a354B4AcA15fA7f0ccbF667CF74F97b" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreiabbtn5pc6di4nwfgpqkk3ss6njgzkt2evilc5i2r754pgiru5x4u" alt="$CMJ" /></a>                       
                        <a href="https://exp-l1.jibchain.net/token/0x09bD3F5BFD9fA7dE25F7A2A75e1C317E4Df7Ef88" target="_blank" rel="noreferrer"><img style={{width: "38px", height: "38px", marginRight: "5px"}} src="https://cloudflare-ipfs.com/ipfs/bafkreia2bjrh7yw2vp23e5lnc6u75weg6nq7dzkyruggsnjxid6qtofeeq" alt="$JDAO" /></a>
                    </div>
                    <div style={{width: "100%", margin: "5px 0 10px 0", borderBottom: "2px solid #fff"}}></div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div className="bold" style={{padding: "2px 6px", background: "orange", color: "red"}}>[Deprecated]</div>
                        <div></div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Daily Yield:</div>
                        <div>{Number(((231481480 * 100000000) / 10**18) * (86400/12) * (0/4533)).toLocaleString('en-US', {maximumFractionDigits:0})} JDAO</div>
                    </div>
                    <div style={{width: "80%", display: "flex", justifyContent: "space-between", fontSize: "12px"}}>
                        <div>Total Value Locked:</div>
                        {jbcJuReserv !== 0 ? <div>~฿{Number((cmjJdao202Staked * (jbcReserv/cmjReserv)) * (jusdtJuReserv/jbcJuReserv) * priceTHB).toLocaleString('en-US', {maximumFractionDigits:0})}</div> : <>0.000</>}
                    </div>
                    <div style={{width: "75%", display: "flex", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "40%", fontSize: "11px",  display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-around"}}>
                            <div>JDAO EARNED:</div>
                            <div className="bold">{jdao202Pending}</div>
                        </div>
                        <div style={{letterSpacing: "1px", width: "80px", padding: "18px 20px", height: "fit-content", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", fontSize: "16px"}} className="bold" onClick={harvestHandle202}>Harvest</div>
                    </div>
                    <div style={{width: "75%", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "60px", border: "1px solid #fff", boxShadow: "inset -2px -2px 0px 0.25px rgba(0, 0, 0, 0.1)", padding: "15px"}}>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <div style={{textAlign: "left", fontSize: "14px"}}>STAKED</div>
                            {farmJdao202Balance !== null ? <div style={{textAlign: "left", fontSize: "14px"}}><span className="bold" style={{cursor: "pointer"}} onClick={maxWithdrawHandle202}>{Number(Math.floor(farmJdao202Balance * 1000) / 1000).toLocaleString('en-US', {minimumFractionDigits:3})}</span><span> (~฿{Number(Math.floor(farmJdao202Balance * (jbcReserv/cmjReserv) * (jusdtJuReserv/jbcJuReserv) * priceTHB * 1) / 1).toLocaleString('en-US', {minimumFractionDigits:0})})</span></div> : <>0.000</>}
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "7.5px"}}>
                            <input
                                placeholder="0.0"
                                className="bold"
                                style={{width: "120px", padding: "5px 20px", border: "1px solid #dddade"}}
                                onChange={handleWithdraw202}
                                value={lpJdao202Withdraw}
                            />
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", cursor: "pointer", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff"}} className="bold" onClick={withdrawstakeHandle202}>Withdraw</div>
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
                            <div style={{letterSpacing: "1px", width: "110px", padding: "10px", boxShadow: "inset -2px -2px 0px 0.25px #00000040", backgroundColor: "rgb(97, 218, 251)", color: "#fff", cursor: "not-allowed"}} className="bold">Stake</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameSwapFarm