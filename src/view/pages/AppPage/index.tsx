import React, { useMemo } from "react"
import { useParams } from "react-router"
import { useAppContext } from "../../../AppContext"
import { App } from "../../../common/app-registration"
import { PageHeader } from "antd"
import NotFoundPage from "../NotFoundPage"
export default function () {

    const { aid } = useParams<{ aid: string }>()
    const ctx = useAppContext()

    const app = useMemo(() => {
        return ctx
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
    const ctx = useAppContext()
    return <div style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        margin: "10px",
        padding: "20px"
    }}>
        <PageHeader onBack={
            () => ctx.history.goBack()
        } title={app?.label} subTitle={app?.descrition}
        />
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start"
        }}>
            <app.component />
        </div>

    </div>

}
function NotFound() {
    return <NotFoundPage />
}