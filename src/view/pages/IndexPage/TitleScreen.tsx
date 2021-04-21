import React from "react"
import { useWindowSize } from "react-use"
import { math } from "tdscore"
import { max, Vector2 } from "tdscore/lib/math"
import Graph2D from "../../components/Graph2D"
export default function () {
    const width = max(useWindowSize().width / 2, 300)

    return <div>
        <br/>
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        }}>

            <Graph2D
                mark="sin(x)"
                scaleRatio={50}
                vectors={[
                    new Vector2(-1.2, 1.3),
                    new Vector2(2.5, 2.5)
                ]}
                dx={0.001}
                fns={[
                    { name: "sin(x)", f: math.sin },
                    { name: "log10(x)", f: (x) => Math.log10(x) }
                ]}
                width={width + "px"} height="200px"
                grid
                specialPoints={
                    [
                    ]
                } />
        </div>
        <div style={{
            marginTop: "10px",
            textAlign: "center"
        }}>
            <h2>Seymour Zhang's <br />Computer Science Playground</h2>
            <p>Powered by TDSCore</p>
        </div>
    </div>
}