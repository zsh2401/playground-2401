import React, { useContext } from 'react'
import { IStdProps } from 'sz-react-support'
import Header from "./Header"
import Footer from "./Footer"
//@ts-expect-error
import css from "./index.css"
import { useAppContext } from '../../../AppContext'
import { Container, Header as RHeader, Footer as RFooter, Content } from 'rsuite'
export default function (props: IStdProps) {
    const ctx = useAppContext()

    return <Container style={{ minHeight: "100%", minWidth: "100%" }}>
        <RHeader>
            <Header></Header>
        </RHeader>

        <Content>
            {props.children}
        </Content>

        <Footer></Footer>

    </Container>
    // return <div>
    //     <div className={css.layout}>

    //         {
    //             ctx.navbarVisible && <Header className={css.header} />
    //         }


    //         <div className={css.body}>

    //         </div>

    //         <Footer className={css.footer} />
    //     </div>
    // </div>
}