import React, { useEffect } from 'react'
import { useAppContext } from '../../../AppContext'
//@ts-ignore
import css from "./index.css"
import Apps from "./Apps"
import TitleScreen from "./TitleScreen"
export default function () {

  const ctx = useAppContext()

  useEffect(() => {
    ctx.navbarVisible = false
    ctx.footbarVisible = false
    return () => {
      ctx.navbarVisible = true
      ctx.footbarVisible = true
    }
  }, [])

  return <div className={css["index"]}>
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }}>
      <TitleScreen />
    </div>

    <Apps />

  </div >
}

