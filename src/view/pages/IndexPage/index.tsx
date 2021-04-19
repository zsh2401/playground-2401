import React, { useEffect } from 'react'
import { Card } from 'antd'
import { useAppContext } from '../../../AppContext'
//@ts-ignore
import css from "./index.css"
import Meta from 'antd/lib/card/Meta'
import { Vector2 } from 'tdscore/lib/math'
import Graph2D from '../../components/Graph2D'
import { math as DSMath } from 'tdscore'
export default function () {

  const ctx = useAppContext()

  useEffect(() => {
    ctx.navbarVisible = false
    ctx.footbarVisible = false
    return () => {
      ctx.navbarVisible = true
      ctx.footbarVisible = true
    }
  }, [])

  return <div className={css["index"]}>
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
          { name: "sin(x)", f: DSMath.sin },
          { name: "log10(x)", f: (x) => Math.log10(x) }
        ]}
        width="600px" height="200px"
        grid
        specialPoints={
          [
          //   {
          //   pointName: "π/2",
          //   x: DSMath.PI / 2,
          //   y: 0
          // },
          // {
          //   pointName: "sin(π/2) = 1",
          //   x: DSMath.PI / 2,
          //   y: DSMath.sin(DSMath.PI / 2)
          // }
        ]
        }
      ></Graph2D>
    </div>


    <div style={{
      marginTop: "10px",
      textAlign: "center"
    }}>
      <h1>Seymour Zhang's <br/>Computer Science Playground</h1>
    </div>

    <p style={{ textAlign: "center" }}>目前已有 {ctx.apps.length} 个应用</p>
    
    <div style={{
      display: "flex",
      justifyContent: "center",
    }}>
      {
        ctx.apps.map(app => {
          return <Card onClick={() => {
            ctx.history.push(`/app/${app.id}`)
          }} bordered hoverable style={{
            borderRadius: "10px", width: "240", margin: "10px"
          }}
            cover={<img height="240" style={{
              borderRadius: "10px 10px 0px 0px"
            }} src={app.cover} />}>
            <Meta title={app.label} description={app.descrition}>
            </Meta>
          </Card>
        })
      }
    </div>

  </div >
}

