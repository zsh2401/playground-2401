import "!!style-loader!css-loader?modules=false!nprogress/nprogress.css"

import "!!style-loader!css-loader?modules=false!antd/dist/antd.min.css"
import "./App.css"

import "nprogress"
import React, { useMemo, useState } from 'react';
import ReactDOM from "react-dom"
import Router from "./Router"
import AppContext from "./AppContext"
import { createHashHistory } from "history"
import { apps } from "./common/app-registration"
import "tdscore"

export default function () {
    ReactDOM.render(<App />
        , document.querySelector("#app"));
}

function App() {

    const history = useMemo(() => createHashHistory(), [])
    const [navbarVisible, setNavbarVisible] = useState(true)
    const [footbarVisible, setFootbarVisible] = useState(true)

    return <AppContext.Provider value={{
        history,
        apps,
        get footbarVisible(): boolean {
            return footbarVisible
        },
        set footbarVisible(value: boolean) {
            setFootbarVisible(value)
        },
        get navbarVisible(): boolean {
            return navbarVisible
        },
        set navbarVisible(value: boolean) {
            setNavbarVisible(value)
        },
    }}>
        <Router />
    </AppContext.Provider >
}