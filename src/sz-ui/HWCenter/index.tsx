import React from 'react'
import { IStdProps } from "sz-react-support"
import css from "./index.css"
export interface Props extends IStdProps {

}
export default function (props: Props) {
    //@ts-ignore
    return <div style={props.style} className={props.className + " " + css.outer}>
        <div className={
            //@ts-ignore
            css.inner
            }>
            <div>
                {props.children}
            </div>
        </div>
    </div>
}