import React from "react"
//import {CircularProgress} from "@material-ui/core"
import {toAbsoluteUrl} from "../../helpers"

const SplashScreen = () => {
  return (
    <>
      <div className="splash-screen">
        <img
          src={toAbsoluteUrl("/media/logos/logo-mini-md.png")}
          alt="Metronic logo"
        />
      </div>
    </>
  )
}


export default SplashScreen
