import React from 'react'
import { DSNumber, math as DSMath } from 'tdscore'
import { Vector2 } from 'tdscore/lib/math'
import Transformation from 'tdscore/lib/math/linear-algebra/Transformation'
import Graph2D from "../../components/Graph2D"
export default function () {

  return <div style={{ width: "100%", height: "100%" }}>
    
    <Graph2D
      mark="sin(x)"
      scaleRatio={150}
      vectors={[
        new Vector2(-1.2, 1.3),
        new Vector2(2.5, 2.5)
      ]}
      dx={0.001}
      fns={[
        { name: "sin(x)", f: DSMath.sin },
        { name: "log10(x)", f: (x) => Math.log10(x) }
      ]}
      transformation={
        new Transformation(new Vector2(1, 0), new Vector2(0.3, 0.5))
        // new Transformation2(
        //   cos(DSMath.ONE_DEGREE * 90),
        //   -sin(DSMath.ONE_DEGREE * 90),
        //   sin(DSMath.ONE_DEGREE * 90),
        //   cos(DSMath.ONE_DEGREE * 90)
        // )
      }
      width="1600px" height="500px"
      grid
      specialPoints={
        [{
          pointName: "π/2",
          x: DSMath.PI / 2,
          y: 0
        },
        {
          pointName: "sin(π/2) = 1",
          x: DSMath.PI / 2,
          y: DSMath.sin(DSMath.PI / 2)
        }]
      }
    ></Graph2D>
  </div >
}