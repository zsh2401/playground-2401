import React from 'react'
import { IStdProps } from 'sz-react-support'
// import Header from "./Header"
// import Footer from "./Footer"
import { useAppContext } from '../../../AppContext'
export default function (props: IStdProps) {
    const ctx = useAppContext()

    return <div style={{
        display: "flex", flexDirection: "column",
        minHeight: "100%", minWidth: "100%"
    }}>

        {/* {ctx.navbarVisible && <Header />} */}

        <div style={{
            flexGrow: 1
        }}>
            {props.children}
        </div>


        {/* {ctx.footbarVisible && <Footer style={{
            width: "100%",
            textAlign: "center",
            flexGrow: 0
        }} />} */}
    </div>
}