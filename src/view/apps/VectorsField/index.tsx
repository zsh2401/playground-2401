import React from "react"
import { Vector2 } from "tdscore/lib/math"
import Graph2D from "../../components/Graph2D"
const vectors: Vector2[] = [];
(() => {
    const MAX_X = 10;
    const MAX_Y = 10;
    for (let i = -MAX_X; i < MAX_X; i++) {
        for (let j = -MAX_Y; j < MAX_Y; j++) {
            vectors.push(new Vector2(i, j));
        }
    }
})();
export default function () {
    return <Graph2D
        width="1200"
        height="600"
        grid
        scaleRatio={20}
        vectors={vectors}
    ></Graph2D>
}