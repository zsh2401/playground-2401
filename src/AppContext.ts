import React, { useContext } from "react"
import { History } from 'history'
import { App } from "./common/app-registration"
export interface IAppContext {
    navbarVisible: boolean
    footbarVisible: boolean
    apps: App[]
    readonly history: History
}

//@ts-expect-error
const context: React.Context<IAppContext> = React.createContext<IAppContext>({});

export function useAppContext(): IAppContext {
    return useContext(context)
}
export default context;