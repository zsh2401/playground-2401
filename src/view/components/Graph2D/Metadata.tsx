import React from "react"
//@ts-ignore
import css from "./metadata.css"
import { math } from "tdscore";
import { Fn } from ".";
import { IStdProps } from "sz-react-support";
export interface Props {
    t: math.Martix
    fns: Fn[]
    vectors: math.Vector2[]
    scale: number;
}
export interface ColumnProps extends IStdProps {
    title: string;
}
function Column(props: ColumnProps) {
    return <div className={css["column"]} >
        {props.title}: <br />
        {props.children}
    </div>;
}
export default function (props: Props) {
    return <div className={css["metadata-wrapper"]}>
        <Column title="Scale">
            {props.scale}
        </Column>

        <Column title="Transformation">
            {`${props.t.at(0, 0)} ${props.t.at(0, 1)}`}<br />
            {`${props.t.at(1, 0)} ${props.t.at(1, 1)}`}
        </Column>

        <Column title="Functions">
            {props.fns.map(fn => <div key={fn.name}>
                {fn.name}
            </div>)}
        </Column>

        <Column title="Vectors">
            {props.vectors.map(v => <div key={v.x ^ v.y}>
                {`{${v.x} ${v.y}}`}
            </div>)}
        </Column>
    </div>
}