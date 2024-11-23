import React from 'react'

const Home = ({ callMode, navigate }) => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
    <>
        <div style={{overflow: "scroll", minHeight: "90vh", padding: 0, margin: "80px 0 20px 0", textAlign: "left", fontSize: "22px", flexFlow: "row wrap", alignItems: "flex-end", justifyContent: "flex-start", width: "98%", borderRadius: "15px"}} className="collection noscroll welcome pixel">
            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "50px"}}>
                <div style={{letterSpacing: "1.5px", color: "#fff"}} className="bold motto">Multiverse of crypto community</div>
                <div style={{padding: "5px 0", marginTop: "30px", flexDirection: "column"}} className="items" id="showoff">
                    <div style={{fontSize: "26px", backgroundImage: "linear-gradient(270deg, #ff0420, #d9029d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "1px"}} className="bold">140,000,000+</div>
                    <div style={{fontSize: "10px", marginTop: "10px", color: "#fff"}} className="light">Transactions on CommuDAO Ecosystem</div>
                </div>
                <div className='typed-out' style={{padding: "2px 8px"}}>Explore the CommuDAO Ecosystem!</div>
                <div style={{margin: "20px 0", maxWidth: "650px", display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap"}}>
                    <a className="hashtag" style={{margin: "2px", padding: "5px 10px", textDecoration: "none", color: "#fff"}} href="https://docs.google.com/spreadsheets/d/1S1AeshQmdQLFc4HhhNl1_Ut5F0FOEc9ixp_Is4lukig" target="_blank" rel="noreferrer">
                        <img src="../elements/proj1.png" height="25" alt="Can not load metadata."/>
                        &nbsp;CMDAO Alert
                    </a>
                    <a className="hashtag" style={{margin: "2px", padding: "5px 10px", textDecoration: "none", color: "#fff"}} href="https://cmdaa.lazyplayerone.xyz" target="_blank" rel="noreferrer">
                        <img src="../elements/proj2.png" height="30" alt="Can not load metadata."/>
                        &nbsp;Auto Web3 Tool
                    </a>
                    <a className="hashtag" style={{margin: "2px", padding: "5px 10px", textDecoration: "none", color: "#fff"}} href="https://daobuddy.xyz" target="_blank" rel="noreferrer">
                        <img src="../elements/proj3.png" height="30" alt="Can not load metadata."/>
                        &nbsp;DaoBuddy
                    </a>
                    <a className="hashtag" style={{margin: "2px", padding: "5px 10px", textDecoration: "none", color: "#fff"}} href="https://bunnybuddy.vercel.app" target="_blank" rel="noreferrer">
                        <img src="../elements/proj4.png" height="30" alt="Can not load metadata."/>
                        &nbsp;BunnyBuddy
                    </a>
                </div>
            </div>
        </div>
    </>
    )
}

export default Home