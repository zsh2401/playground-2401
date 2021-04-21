import React, { useCallback, useState } from "react"
import { Vector2 } from "tdscore/lib/math"
import HWCenter from "../../../sz-ui/HWCenter"
import Graph2D from "../../components/Graph2D"
import LorentzTransformationXT from "tdscore/lib/math/martix/LorentzTransformationXT"
import { useWindowSize } from "react-use"
import { Slider } from "antd"
// import { Button, ButtonGroup, SelectPicker, Slider } from "rsuite"
interface Item {
    name: string;
    v: number;
    scale?: number;
}
const items: Item[] = [
    { name: "a", v: 0, scale: 100 },
    { name: "b", v: 0.1, scale: 100 },
    { name: "c", v: 0.3, scale: 100 },
    { name: "d", v: 0.5, scale: 100 },
    { name: "e", v: 0.9, scale: 200 }
];
const C = 1;
const T = 4;
const f = (t: number, v: number): Vector2 => {
    const r = (1 - (v ** 2 / C ** 2)) ** 0.5
    return new Vector2(v * t, t);
}
const light = (t: number): Vector2 => {
    return f(t, C)
}
export default function () {
    const { width, height } = useWindowSize()
    let [v, vSetter] = useState(0);
    const onChange = useCallback((value: string) => {
        const target: Item = items.find(item => item.name === value) ?? items[0];
        vSetter(target.v);
    }, []);

    return <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <p>对于静止物体以{v}%光速运动的物体的视角</p>
        <br />
        <Slider value={v} onChange={vSetter}></Slider>
        <HWCenter>
            <Graph2D
                scaleRatio={30}
                width={(width * 0.8).toString()}
                height={(height * 0.5).toString()}
                grid
                transformation={new LorentzTransformationXT(f(T, v / 100).x, T, C)}
                vectors={[
                    ...items.map(item => {
                        return { style: "green", fontStyle: "25px Arial", vector: f(T, item.v) };
                    }
                    ),
                    { style: "red", fontStyle: "25px Arial", name: "light", vector: light(T) }
                ]}

            >
            </Graph2D>
        </HWCenter>
    </div>
}