import React, { useEffect } from 'react'
import { Button, Container, Content, Panel } from 'rsuite'
import { useAppContext } from '../../../AppContext'
import Footer from '../../components/Layout/Footer'
import Header from '../../components/Layout/Header'
//@ts-ignore
import css from "./index.css"

export default function () {

  const ctx = useAppContext()

  // useEffect(() => {
  //   ctx.navbarVisible = false
  //   return () => {
  //     ctx.navbarVisible = true
  //   }
  // }, [])

  return <div>
    {/* <div className={css["head-box"]}>
      <div>
        
      </div>
    </div> */}

    <div>
      <h3>Seymour Zhang's</h3>
      <h1>Computer Science <br />Playground</h1>
    </div>

    {
      ctx.apps.map(app => {
        return <Panel bordered shaded bodyFill style={{ margin: "10px", display: 'inline-block', width: 240 }}>
          <img src={app.icon} height="240" />
          <Panel header={app.label}>
            <p>
              <small>
                {app.descrition}
              </small>
            </p>
            <Button onClick={()=>{
              ctx.history.push(`/app/${app.id}`)
            }}>使用 Go </Button>
          </Panel>
        </Panel>
      })
    }

    {/* <div className={css["apps"]}>
      
    </div> */}
    {/* <div className={css["head-img"]} src=""></div> */}
    {/* <Graph2D
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
    ></Graph2D> */}
  </div >
}