import React from 'react'

const OPLabs = () => {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="fieldBanner" style={{display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
                <div className="SubfieldBanner pixel" style={{flexDirection: "column"}}>
                    <div style={{fontSize: "75px", width: "fit-content"}}>Labs</div>
                    <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px", letterSpacing: "1px"}}>Craft, Await and Obtain!</div>
                </div>
                <div className="SubfieldBanner">
                    <img src="../background/labslogo.png" width="150" alt="Labs_Logo" />
                </div>
            </div>

            <div style={{width: "92.5%", borderBottom: "1px solid #dddade", marginTop: "60px"}}></div>
            <div style={{width: "95%", marginTop: "20px", textIndent: "20px", fontSize: "15px", letterSpacing: "1px", textAlign: "left"}} className="bold">Multichain Labs</div>
            <div style={{width: "95%", minHeight: 0,  marginBottom: "240px", justifyContent: "flex-start", flexWrap: "nowrap", overflow: "scroll"}} className="collection noscroll">
                <a style={{width: "380px", border: "1px solid #4637a9", padding: "20px 50px", borderRadius: "8px", justifyContent: "center", boxShadow: "3px 3px 0 #0d0a1f", textDecoration: "none"}} className="pixel hashtag" href="https://form.typeform.com/to/KLWfiSWa" target="_blank" rel="noreferrer">✏️&nbsp;Permissionless create your labs</a> 
            </div>
        </>
    )
}

export default OPLabs
