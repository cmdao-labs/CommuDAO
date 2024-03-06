import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Headbar from './Headbar'

import Home from './Home'
import Fields from './Fields'
import FieldsAncientForrest from './Fields-AncientForrest'
import FishingField from './Fields-TunaLake'
import RatHuntingField from './Fields-OldWarehouse'
import TheHeavenLand from './Fields-TheHeavenLand'
import EasternFront from './Fields-EasternFront'
import MechHarvestZone from './Fields-MechHarvestZone'
import Labs from './Labs'
import Dungeon from './Dungeon'
import Npcblacksmith from './Dungeon-Blacksmith'
import NpcEvolutionary from './Dungeon-Evolutionary'
import Coppermine from './Dungeon-CopperMine'
import Jaspercave from './Dungeon-JasperCave'
import Daemonworld from './Dungeon-DaemonWorld'
import CrypticCogs from './Dungeon-CrypticCogs'
import Community from './Community'
import CmCityCenter from './Community-CmCityCenter'
import QuesterOasis from './Community-QuesterOasis'
import DungeonArena from './Community-DungeonArena'
import DumpsterHill from './Community-DumpsterHill'
import CmCityLand from './Community-CmCityLand'
import Mall from './Mall'
import Mkp from  './Mkp'
import GameSwap from  './GameSwap'

import BKCFields from './BKC-Fields'
import BadMuseum from './BKC-Fields-BadMuseum'
import FraserRiver from './BKC-Fields-FraserRiver'
import BKCLabs from './BKC-Labs'
import BKCGameSwap from  './BKC-GameSwap'
import salmFieldABI from './jsons/salmFieldABI.json'
import stakerMachineABI from './jsons/stakerMachineABI.json'
import diamonLpABI from './jsons/diamonlpABI.json'
import farmCmosABI from './jsons/farmcmosABI.json'

import { jbcL1 } from './chains/jbcL1.ts'
import { bkc } from './chains/bkc.ts'
import { erc20ABI, erc721ABI } from 'wagmi'
import aurora721ABI from './jsons/aurora721ABI.json'
import tunaFieldABI from './jsons/tunaFieldABI.json'
import woodFieldABI from './jsons/woodFieldABI.json'
import thlFieldABI from './jsons/thlFieldABI.json'
import gearFieldABI from './jsons/gearFieldABI.json'
import taoPfpABI from './jsons/taoPfpABI.json'

import kycABI from './jsons/kycABI.json'
import ctunaLabABI from './jsons/ctunaLabABI.json'
import sx31LabABI from './jsons/sx31LabABI.json'
import bbqLab01ABI from './jsons/bbqLab01ABI.json'
import bbqLab02ABI from './jsons/bbqLab02ABI.json'
import pzaLabABI from './jsons/pzaLabABI.json'
import cmdao20lab01ABI from './jsons/cmdao20lab01ABI.json'
import goldMineABI from './jsons/goldMineABI.json'

import dunJasperABI from './jsons/dunJasperABI.json'
import dunJasperL2ABI from './jsons/dunJasperL2ABI.json'
import dunCopperABI from './jsons/dunCopperABI.json'
import mintStOPTABI from './jsons/mintStOPTABI.json'
import dunAngbABI from './jsons/dunAngbABI.json'
import dunEEABI from './jsons/dunEEABI.json'

import cmdaoMerchantABI from './jsons/cmdaoMerchantABI.json'
import cmdaoMerchantV2ABI from './jsons/cmdaoMerchantV2ABI.json'
import cmdaoMerchantKYCABI from './jsons/cmdaoMerchantKYCABI.json'
import cmdaoGasha02ABI from './jsons/cmdaoGasha02ABI.json'
import cmdaoMkpABI from './jsons/cmdaoMkpABI.json'
import wlMkpABI from './jsons/wlMkpABI.json'
import ammyABI from './jsons/ammyABI.json'
import ammyStdABI from './jsons/ammyStdABI.json'
import angeloStdABI from './jsons/angeloStdABI.json'
import cmdaoAmmNpcABI from './jsons/cmdaoAmmNpcABI.json'
import enchantNABI from './jsons/enchantNABI.json'
import enchantRABI from './jsons/enchantRABI.json'
import osABI from './jsons/osABI.json'
import evolutionaryABI from './jsons/evolutionaryABI.json'
import fusionABI from './jsons/fusionABI.json'
import salonABI from './jsons/salonABI.json'
import starterCMDSABI from './jsons/starterCMDSABI.json'
import uplevelCMDSABI from './jsons/uplevelCMDSABI.json'
import sx31voteABI from './jsons/sx31voteABI.json'
import faucetABI from './jsons/faucetABI.json'
import cmdaoNameABI from './jsons/cmdaoNameABI.json'
import pvp01ABI from './jsons/pvp01ABI.json'
import quest01ABI from './jsons/quest01ABI.json'
import questAmbassABI from './jsons/questAmbassABI.json'
import enderPotteryABI from './jsons/enderPotteryABI.json'

import slot1ABI from './jsons/slot1ABI.json'
import houseABI from './jsons/houseABI.json'
import houseStakingABI from './jsons/houseStakingABI.json'

import questBBQABI from './jsons/questBBQABI.json'
import dumpster1ABI from './jsons/dumpster1ABI.json'
import dumpster2ABI from './jsons/dumpster2ABI.json'

import exchangeABI from './jsons/exchangeABI.json'
import exchangeJulpABI from './jsons/exchangeJulpABI.json'
import swapABI from './jsons/swapcallABI.json'
import swapJulpABI from './jsons/swapcallJulpABI.json'
import farmJdaoABI from './jsons/masterchefJdaoABI.json'
import bkcOracleABI from './jsons/bkcOracleABI.json'

import tbridgeNFTABI from './jsons/tbridgeNFTABI.json'

import TBridge from './tBridge'

import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { bsc } from 'wagmi/chains'

const v = '0.2.26'

const Main = () => {
    const { chains, provider } = configureChains(
        [jbcL1, bkc, bsc],
        [publicProvider()]
    )

    const client = createClient({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({ chains }),
        ],
        provider
    })

    const navigate = useNavigate()
    const { modeText, subModeText, intrasubModetext } = useParams()
    let preset = 0
    if (modeText !== undefined) {
        if (modeText.toUpperCase() === "FIELDS") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "TUNA-LAKE") {
                    preset = 11
                    document.title = "Tuna Lake | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "OLD-WAREHOUSE") {
                    preset = 12
                    document.title = "Old Warehouse | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "ANCIENT-FORREST") {
                    preset = 13
                    document.title = "Ancient Forrest | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "THE-HEAVEN-LAND") {
                    preset = 17
                    document.title = "The Heaven Land | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "EASTERN-FRONT") {
                    preset = 19
                    document.title = "Eastern Front | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "MECH-HARVEST-ZONE") {
                    preset = 100
                    document.title = "Mech Harvest Zone | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "BKC") {
                    preset = 14
                    document.title = "Fields [BKC] | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "BKC-BAD-MUSEUM") {
                    preset = 15
                    document.title = "Bad Museum [BKC] | CommuDAO"
                } else if (modeText.toUpperCase() === "FIELDS" && subModeText.toUpperCase() === "BKC-FRASER-RIVER") {
                    preset = 16
                    document.title = "Fraser River [BKC] | CommuDAO"
                }
            } else {
                preset = 1
                document.title = "Fields | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "LABS") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "LABS" && subModeText.toUpperCase() === "BKC") {
                    preset = 200
                    document.title = "Labs [BKC] | CommuDAO"
                }
            } else {
                preset = 2
                document.title = "Labs | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "DUNGEON") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "JASPER-CAVE") {
                    preset = 31
                    document.title = "Jasper Cave | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "COPPER-MINE") {
                    preset = 33
                    document.title = "Copper Mine | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "BLACKSMITH-HOUSE") {
                    preset = 32
                    document.title = "Blacksmith House | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "EVOLUTIONARY-PLANET") {
                    preset = 34
                    document.title = "Evotionary Planet | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "DAEMON-WORLD") {
                    preset = 35
                    document.title = "Daemon World | CommuDAO"
                } else if (modeText.toUpperCase() === "DUNGEON" && subModeText.toUpperCase() === "CRYPTIC-COGS") {
                    preset = 36
                    document.title = "Cryptic Cogs | CommuDAO"
                }
            } else {
                preset = 3
                document.title = "Dungeon | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "COMMUNITY") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "CMCITY-CITYCENTER") {
                    preset = 41
                    document.title = "CM City - City Center | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "DUNGEON-ARENA") {
                    preset = 42
                    document.title = "Dungeon Arena | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "DUMPSTER-HILL") {
                    preset = 43
                    document.title = "Dumpster Hill | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "QUESTER-OASIS") {
                    preset = 44
                    document.title = "Quester Oasis | CommuDAO"
                } else if (modeText.toUpperCase() === "COMMUNITY" && subModeText.toUpperCase() === "CM-CITY") {
                    preset = 45
                    document.title = "CM CITY LAND | CommuDAO"
                }
            } else {
                preset = 4
                document.title = "Community | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "MALL") {
            preset = 5
            document.title = "Mall | CommuDAO"
        } else if (modeText.toUpperCase() === "MARKETPLACE") {
            preset = 6
            document.title = "Marketplace | CommuDAO"
        } else if (modeText.toUpperCase() === "GAMESWAP") {
            if (subModeText !== undefined) {
                if (modeText.toUpperCase() === "GAMESWAP" && subModeText.toUpperCase() === "BKC") {
                    preset = 700
                    document.title = "Gameswap [BKC] | CommuDAO"
                }
            } else {
                preset = 7
                document.title = "GameSwap | CommuDAO"
            }
        } else if (modeText.toUpperCase() === "TBRIDGE") {
            preset = 8
            document.title = "tBridge | CommuDAO"
        } else {
            preset = null
            document.title = "404 | CommuDAO"
        }
    } else {
        document.title = "Home | CommuDAO"
    }

    const [mode, setMode] = React.useState(preset) 
    const callMode = (_mode) => { setMode(_mode) }

    const [isLoading, setisLoading] = React.useState(false)
    const [isError, setisError] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState('')
    const [txupdate, setTxupdate] = React.useState(null)

    return (
        <>
            {isLoading &&
                <div className="centermodal">
                    <div className="wrapper">
                        <div className="bold" style={{fontSize: "40px", letterSpacing: "3px"}}>Waiting for confirmation...</div>
                    </div>
                </div>
            }
            {isError &&
                <div style={{zIndex: "999"}} className="centermodal">
                    <div className="wrapper">
                    <div className="pixel" style={{border: "1px solid rgb(70, 55, 169)", boxShadow: "6px 6px 0 #00000040", width: "500px", height: "300px", padding: "50px", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "40px", letterSpacing: "3px"}}>
                        <div style={{width: "90%", textAlign: "left", fontSize: "24px"}} className="emp">ERROR! [{'Alpha V. ' + v}]</div>
                        <div style={{marginTop: "20px", width: "90%", textAlign: "left", fontSize: "14px", height: "350px", overflow: "hidden", textOverflow: "ellipsis"}}>{errMsg}</div>
                        <div className="button" style={{marginTop: "40px", width: "50%"}} onClick={() => setisError(false)}>CLOSE</div>
                    </div>
                    </div>
                </div>
            }
            <WagmiConfig client={client}>
                <Headbar callMode={callMode} navigate={navigate} txupdate={txupdate} erc20ABI={erc20ABI} />
                {mode === 0 && <Home callMode={callMode} navigate={navigate} />}
                {mode === 1 && <Fields callMode={callMode} navigate={navigate} />}
                {mode === 11 ?
                    <FishingField setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} aurora721ABI={aurora721ABI} tunaFieldABI={tunaFieldABI} /> :
                    <></>
                }
                {mode === 12 ?
                    <RatHuntingField setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} aurora721ABI={aurora721ABI} tunaFieldABI={tunaFieldABI} /> :
                    <></>
                }
                {mode === 13 ?
                    <FieldsAncientForrest setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} aurora721ABI={aurora721ABI} starterCMDSABI={starterCMDSABI} uplevelCMDSABI={uplevelCMDSABI} woodFieldABI={woodFieldABI} /> :
                    <></>
                }
                {mode === 14 ?
                    <BKCFields callMode={callMode} navigate={navigate} /> :
                    <></>
                }
                {mode === 15 ?
                    <BadMuseum setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} tunaFieldABI={tunaFieldABI} /> :
                    <></>
                }
                {mode === 16 ?
                    <FraserRiver setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} erc721ABI={erc721ABI} salmFieldABI={salmFieldABI} /> :
                    <></>
                }
                {mode === 17 ?
                    <TheHeavenLand setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} erc721ABI={erc721ABI} thlFieldABI={thlFieldABI} /> :
                    <></>
                }
                {mode === 19 ?
                    <EasternFront setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} erc721ABI={erc721ABI} tunaFieldABI={tunaFieldABI} /> :
                    <></>
                }
                {mode === 100 && <MechHarvestZone setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20ABI={erc20ABI} erc721ABI={erc721ABI} gearFieldABI={gearFieldABI} taoPfpABI={taoPfpABI} />}
                {mode === 2 ?
                    <Labs setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} ctunaLabABI={ctunaLabABI} sx31LabABI={sx31LabABI} bbqLab01ABI={bbqLab01ABI} bbqLab02ABI={bbqLab02ABI} pzaLabABI={pzaLabABI} cmdao20lab01ABI={cmdao20lab01ABI} goldMineABI={goldMineABI} erc20ABI={erc20ABI} kycABI={kycABI} /> :
                    <></>
                }
                {mode === 200 ?
                    <BKCLabs setisLoading={setisLoading} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20ABI={erc20ABI} stakerMachineABI={stakerMachineABI} /> :
                    <></>
                }
                {mode === 3 ?
                    <Dungeon callMode={callMode} navigate={navigate} /> :
                    <></>
                }
                {mode === 33 ?
                    <Coppermine intrasubModetext={intrasubModetext} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} erc20ABI={erc20ABI} dunCopperABI={dunCopperABI} mintStOPTABI={mintStOPTABI} salonABI={salonABI} /> :
                    <></>
                }
                {mode === 31 ?
                    <Jaspercave intrasubModetext={intrasubModetext} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} erc20ABI={erc20ABI} dunJasperABI={dunJasperABI} dunJasperL2ABI={dunJasperL2ABI} mintStOPTABI={mintStOPTABI} salonABI={salonABI} /> :
                    <></>
                }
                {mode === 32 ?
                    <Npcblacksmith setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} enchantNABI={enchantNABI} enchantRABI={enchantRABI} osABI={osABI} erc721ABI={erc721ABI} erc20ABI={erc20ABI} /> :
                    <></>
                }
                {mode === 34 ?
                    <NpcEvolutionary setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} evolutionaryABI={evolutionaryABI} fusionABI={fusionABI} salonABI={salonABI} erc721ABI={erc721ABI} erc20ABI={erc20ABI} /> :
                    <></>
                }
                {mode === 35 && <Daemonworld intrasubModetext={intrasubModetext} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} erc20ABI={erc20ABI} dunAngbABI={dunAngbABI} />}
                {mode === 36 && <CrypticCogs intrasubModetext={intrasubModetext} navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} erc20ABI={erc20ABI} dunEEABI={dunEEABI} />}
                {mode === 4 ?
                    <Community callMode={callMode} navigate={navigate} erc721ABI={erc721ABI} cmdaoNameABI={cmdaoNameABI} slot1ABI={slot1ABI} /> :
                    <></>
                }
                {mode === 41 ?
                    <CmCityCenter setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} sx31voteABI={sx31voteABI} faucetABI={faucetABI} cmdaoNameABI={cmdaoNameABI} /> :
                    <></>
                }
                {mode === 42 ?
                    <DungeonArena navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} erc721ABI={erc721ABI} questAmbassABI={questAmbassABI} dunJasperABI={dunJasperABI} pvp01ABI={pvp01ABI} salonABI={salonABI} /> :
                    <></>
                }
                {mode === 43 ?
                    <DumpsterHill navigate={navigate} setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} erc721ABI={erc721ABI} dumpster1ABI={dumpster1ABI} dumpster2ABI={dumpster2ABI} /> :
                    <></>
                }
                {mode === 44 ?
                    <QuesterOasis setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} kycABI={kycABI} quest01ABI={quest01ABI} pvp01ABI={pvp01ABI} questBBQABI={questBBQABI} questAmbassABI={questAmbassABI} bbqLab01ABI={bbqLab01ABI} enderPotteryABI={enderPotteryABI} dunCopperABI={dunCopperABI} dunJasperABI={dunJasperABI} farmJdaoABI={farmJdaoABI} cmdaoNameABI={cmdaoNameABI} /> :
                    <></>
                }
                {mode === 45 && <CmCityLand setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} navigate={navigate} intrasubModetext={intrasubModetext} erc20ABI={erc20ABI} erc721ABI={erc721ABI} cmdaoNameABI={cmdaoNameABI} slot1ABI={slot1ABI} houseABI={houseABI} houseStakingABI={houseStakingABI} wlMkpABI={wlMkpABI} />}
                {mode === 5 ?
                    <Mall setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} kycABI={kycABI} ctunaLabABI={ctunaLabABI} cmdaoMerchantABI={cmdaoMerchantABI} cmdaoMerchantV2ABI={cmdaoMerchantV2ABI} cmdaoMerchantKYCABI={cmdaoMerchantKYCABI} cmdaoGasha02ABI={cmdaoGasha02ABI} ammyABI={ammyABI} ammyStdABI={ammyStdABI} angeloStdABI={angeloStdABI} cmdaoAmmNpcABI={cmdaoAmmNpcABI} erc20ABI={erc20ABI} /> :
                    <></>
                }
                {mode === 6 ?
                    <Mkp setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc721ABI={erc721ABI} erc20ABI={erc20ABI} aurora721ABI={aurora721ABI} cmdaoMkpABI={cmdaoMkpABI} /> :
                    <></>
                }
                {mode === 7 ?
                    <GameSwap setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} erc20ABI={erc20ABI} exchangeABI={exchangeABI} exchangeJulpABI={exchangeJulpABI} farmJdaoABI={farmJdaoABI} swapABI={swapABI} swapJulpABI={swapJulpABI} bkcOracleABI={bkcOracleABI} /> :
                    <></>
                }
                {mode === 700 ?
                    <BKCGameSwap setisLoading={setisLoading} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20ABI={erc20ABI} diamonLpABI={diamonLpABI} farmCmosABI={farmCmosABI} bkcOracleABI={bkcOracleABI} /> :
                    <></>
                }
                {mode === 8 ?
                    <TBridge setisLoading={setisLoading} txupdate={txupdate} setTxupdate={setTxupdate} setisError={setisError} setErrMsg={setErrMsg} erc20ABI={erc20ABI} erc721ABI={erc721ABI} tbridgeNFTABI={tbridgeNFTABI} /> :
                    <></>
                }
                {mode === null ?
                    <div style={{paddingTop: "100px"}} className="collection">
                        <div className="nftCard" style={{justifyContent: "center"}}>
                            <i style={{fontSize: "150px", marginBottom: "30px"}} className="fa fa-database"></i>
                            <div className="emp bold">404 not found</div>
                        </div>
                    </div> :
                    <></>
                }
            </WagmiConfig>
            <footer style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div className="inFooterLeft">
                    <div style={{marginBottom: "10px"}}><img src="https://flagcdn.com/16x12/sg.png" srcset="https://flagcdn.com/32x24/sg.png 2x, https://flagcdn.com/48x36/sg.png 3x" width="16" height="12" alt="Singapore" /> {'© CommuDAO 2023 - Alpha V. ' + v}</div>
                    <a style={{marginBottom: "10px", color: "#5f6476", textDecoration: "none"}} href="https://docs.commudao.xyz" target="_blank" rel="noreferrer">Docs</a>
                    <a style={{color: "#5f6476", textDecoration: "none"}} href="https://github.com/coshi-labs/CommuDAO" target="_blank" rel="noreferrer">Github</a>
                </div>
                <div className="inFooterRight">
                    <a style={{marginBottom: "10px", color: "#5f6476", textDecoration: "none"}} href="https://zealy.io/c/commudao/questboard" target="_blank" rel="noreferrer">Quests on Zealy</a>
                    <a style={{color: "#5f6476", textDecoration: "none"}} href="https://discord.gg/k92ReT5EYy" target="_blank" rel="noreferrer">Discord</a>
                </div>
            </footer>
        </>
    )
}

export default Main