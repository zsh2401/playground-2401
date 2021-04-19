import React, { useMemo } from "react"
import { Switch, useParams } from "react-router"
import { useAppContext } from "../../../AppContext"
import { Route } from "react-router"
import { App } from "../../../common/app-registration"
import { useWindowSize } from "react-use"
import { Card } from "antd"
export default function () {

    const { aid } = useParams<{ aid: string }>()

    const app = useMemo(() => {
        return useAppContext()
            .apps
            .find(app => app.id === aid)
    }, [aid])

    return <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }}>
        {app === undefined ? <NotFound /> : <Found app={app}></Found>}
    </div>
}
function Found(props: { app: App }) {
    const { app } = props
    return <div>
        <h1 style={{
            textAlign: "center",
        }}>
            {app.label}
        </h1>

        <app.component />

    </div>
}
function NotFound() {
    return <div>
        App not found!
    </div>
}