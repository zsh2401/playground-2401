import React from "react"
import { Complex } from "tdscore/lib/math"
import ComplexPanel from "../../components/ComplexPanel"
export default function () {
    return <ComplexPanel
        numbers={[1, -1, new Complex(1, 1)]}
    ></ComplexPanel>
}