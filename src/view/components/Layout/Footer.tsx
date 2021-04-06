import React from "react"
import debugMx from "../../../common/debug-mx";
import { IStdProps } from "sz-react-support";
export default function (props: IStdProps) {
    return <footer className={props.className}>
        Copyright © 2019 - {new Date().getFullYear()} {debugMx.AUTHOR},All Rights Reserved
    </footer>
}