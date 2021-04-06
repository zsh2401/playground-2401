import { DSNumber, DSObject } from "tdscore"
import MixedNumber from "tdscore/lib/MixedNumber";
import React from "react"
import { Complex, Vector2 } from "tdscore/lib/math";
import Graph2D from "../Graph2D"
export interface ComplexPanelProps {
    numbers: (MixedNumber | Complex)[];
}
const COMPLEX_INSTANCE = new Complex(0, 0);
export default function (props: ComplexPanelProps) {
    return <Graph2D width="700" height="700" grid vectors={props.numbers.map(number => {
        let real = 0;
        let img = 0;
        if (DSObject.isDSObject(number)) {
            if (DSObject.typeEquals(COMPLEX_INSTANCE, number)) {
                real = (number as Complex).real;
                img = (number as Complex).imaginary;
            } else {
                real = (number as DSNumber).toJSNumber();
            }
        } else {
            real = number;
        }
        return {
            name: `${real}+${img}i`,
            vector: new Vector2(real, img)
        };
    })}>

    </Graph2D>
}