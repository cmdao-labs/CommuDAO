const Community = ({ callMode, navigate }) => {
    return (
    <>
        <div className="fieldBanner" style={{background: "#2b2268", borderBottom: "1px solid rgb(54, 77, 94)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", textAlign: "left", overflow: "scroll"}}>
            <div style={{flexDirection: "column", margin: "30px 100px", color: "#fff"}} className="pixel">
                <div style={{fontSize: "75px", width: "fit-content"}}>Community</div>
                <div style={{fontSize: "17px", width: "fit-content", marginTop: "30px"}}>Build our decentralized community with DAO token.</div>
            </div>
            <div style={{margin: "30px 100px"}}>
                <img src="../background/commulogo.png" width="150" alt="Community_Logo" />
            </div>
        </div>

        <div style={{background: "rgb(0, 19, 33)", margin: "0", padding: "75px 0", minHeight: "inherit"}} className="collection pixel">
            <div style={{width: "1216px", maxWidth: "78%", marginBottom: "30px", textAlign: "left", fontSize: "22.5px", color: "#fff"}}>CM CITY - Urban District</div>
            <div style={{padding: 0, borderRadius: 0, border: "none", background: "transparent", boxShadow: "none", width: "1216px", maxWidth: "78%", height: "1216px", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", overflow: "scroll"}} className="nftCard noscroll">
                <div id="tile1" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A01</div>
                </div>
                <div id="tile2" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A02</div>
                </div>
                <div id="tile3" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(41); navigate('/community/cmcity-citycenter');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeidtpeph5ix5phlf2et2i665lesc76pidjxiazlamumn6ncidpumle" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>City Center</div>
                </div>
                <div id="tile4" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z02 (Reserved)</div>
                </div>
                <div id="tile5" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z03 (Reserved)</div>
                </div>
                <div id="tile6" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z04 (Reserved)</div>
                </div>
                <div id="tile7" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A03</div>
                </div>
                <div id="tile8" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A04</div>
                </div>
                <div id="tile9" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A05</div>
                </div>
                <div id="tile10" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A06</div>
                </div>
                <div id="tile11" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z05 (Reserved)</div>
                </div>
                <div id="tile12" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A07</div>
                </div>
                <div id="tile13" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A08</div>
                </div>
                <div id="tile14" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A09</div>
                </div>
                <div id="tile15" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A10</div>
                </div>
                <div id="tile16" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land A11</div>
                </div>
                <div id="tile17" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B01</div>
                </div>
                <div id="tile18" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B02</div>
                </div>
                <div id="tile19" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z06 (Reserved)</div>
                </div>
                <div id="tile20" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B03</div>
                </div>
                <div id="tile21" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B04</div>
                </div>
                <div id="tile22" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B05</div>
                </div>
                <div id="tile23" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B06</div>
                </div>
                <div id="tile24" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B07</div>
                </div>
                <div id="tile25" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B08</div>
                </div>
                <div id="tile26" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B09</div>
                </div>
                <div id="tile27" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z07 (Reserved)</div>
                </div>
                <div id="tile28" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z08 (Reserved)</div>
                </div>
                <div id="tile29" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z09 (Reserved)</div>
                </div>
                <div id="tile30" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z10 (Reserved)</div>
                </div>
                <div id="tile31" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B10</div>
                </div>
                <div id="tile32" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land B11</div>
                </div>
                <div id="tile33" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C01</div>
                </div>
                <div id="tile34" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C02</div>
                </div>
                <div id="tile35" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C03</div>
                </div>
                <div id="tile36" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C04</div>
                </div>
                <div id="tile37" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C05</div>
                </div>
                <div id="tile38" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C06</div>
                </div>
                <div id="tile39" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C07</div>
                </div>
                <div id="tile40" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C08</div>
                </div>
                <div id="tile41" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C09</div>
                </div>
                <div id="tile42" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C10</div>
                </div>
                <div id="tile43" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z11 (Reserved)</div>
                </div>
                <div id="tile44" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(44); navigate('/community/quester-oasis');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeib2y7ckngdnsilvvgdix65v3l3bfejwc7zf4g5l46rsr7cgpalghy" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Quester Oasis</div>
                </div>
                <div id="tile45" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z13 (Reserved)</div>
                </div>
                <div id="tile46" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z14 (Reserved)</div>
                </div>
                <div id="tile47" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z15 (Reserved)</div>
                </div>
                <div id="tile48" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div></div>
                    <div style={{marginTop: "10px"}}>Land C11</div>
                </div>
                <div id="tile49" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C12</div>
                </div>
                <div id="tile50" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C13</div>
                </div>
                <div id="tile51" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z16 (Reserved)</div>
                </div>
                <div id="tile52" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C14</div>
                </div>
                <div id="tile53" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(42); navigate('/community/dungeon-arena');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibbhvrdk32e6locxnyi2twe7wmryouulbl6ehvprtzqtum24kxvae" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Dungeon Arena</div>
                </div>
                <div id="tile54" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C15</div>
                </div>
                <div id="tile55" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z18 (Reserved)</div>
                </div>
                <div id="tile56" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C16</div>
                </div>
                <div id="tile57" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C17</div>
                </div>
                <div id="tile58" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C18</div>
                </div>
                <div id="tile59" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeiecefc3xbwj7mjd5pkpf7vb3mzu2xmce5t2h7ch4fq3xnz6gojclu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px", fontSize: "12px"}}>Land Z19 (Reserved)</div>
                </div>
                <div id="tile60" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C19</div>
                </div>
                <div id="tile61" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C20</div>
                </div>
                <div id="tile62" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C21</div>
                </div>
                <div id="tile63" className="emp tile" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", color: "rgb(0, 227, 180)"}} onClick={() => {callMode(43); navigate('/community/dumpster-hill');}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeia7e5mzmszg7heigxfzthkmhnnk555hw35jygufvpomiolp5lab3i" width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Dumpster Hill</div>
                </div>
                <div id="tile64" style={{width: "150px", height: "150px", border: "1px solid rgb(54, 77, 94)", background: "rgb(0, 26, 44)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "not-allowed"}}>
                    <div style={{height: "80px", display: "flex", alignItems: "flex-end"}}><img src="https://nftstorage.link/ipfs/bafybeibx4jdpjujrjqbax7megps3n2ynkh2sxcbpuiyvme4xlcmrs5nvnu" style={{filter: "grayscale(1)"}} width="120" alt="Can't load metadata" /></div>
                    <div style={{marginTop: "10px"}}>Land C22</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Community