import { DSNumber, DSObject } from "tdscore"
import MixedNumber from "tdscore/lib/MixedNumber";
import React from "react"
import { Complex, Vector2 } from "tdscore/lib/math";
import Graph2D from "../Graph2D"
import { useWindowSize } from "react-use";
export interface ComplexPanelProps {
    numbers: (MixedNumber | Complex)[];
}
const COMPLEX_INSTANCE = new Complex(0, 0);
export default function (props: ComplexPanelProps) {
    const { width, height } = useWindowSize()
    return <Graph2D width={(width / 3).toString()} height={(height / 2).toString()}
        scaleRatio={50}
        vectors={props.numbers.map(number => {
            let real = 0
            let img = 0
            if (DSObject.typeEquals(COMPLEX_INSTANCE, number)) {
                real = (number as Complex).real
                img = (number as Complex).imaginary
            } else {
                real = (number as DSNumber).toJSNumber()
            }
            return {
                name: `${real}+${img}i`,
                vector: new Vector2(real, img)
            };
        })}>

    </Graph2D>
}