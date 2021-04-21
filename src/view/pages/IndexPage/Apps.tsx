import { Card, Col, Grid, Row } from "antd"
import Meta from "antd/lib/card/Meta"
import React from "react"
import { useAppContext } from "../../../AppContext"
export default function () {
    const { apps, history } = useAppContext()
    return <>
        <p style={{ textAlign: "center" }}>目前已有 {apps.length} 个应用</p>
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>

            <Row justify="center">
                {
                    apps.map(app => {
                        return <Col key={app.id} md={8} sm={12}>
                            <Card onClick={() => {
                                history.push(`/app/${app.id}`)
                            }} bordered hoverable style={{
                                borderRadius: "10px", margin: "10px",
                                maxWidth: "240", minWidth: "240"
                            }}
                                cover={<img height="240" style={{
                                    borderRadius: "10px 10px 0px 0px"
                                }} src={app.cover} />}>
                                <Meta title={app.label} description={app.descrition} />
                            </Card>
                        </Col>
                    })
                }
            </Row>
        </div>
    </>
}