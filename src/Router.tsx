import React, { useContext, useMemo, useState } from 'react';
import { Router, Route, Switch } from 'react-router';
import IndexPage from './view/pages/IndexPage';
import VF from "./view/pages/VectorsField"
import ComplexPage from "./view/pages/ComplexPage"
import Relativity from "./view/pages/Relativity"
import NotFoundPage from './view/pages/NotFoundPage';
import Layout from './view/components/Layout';
import AppContext from "./AppContext"
import { createHashHistory } from "history"

export default function AppRouter() {

    const history = useMemo(() => createHashHistory(), []);
    const [navbarVisible, setNavbarVisible] = useState(true)
    const [footbarVisible, setFootbarVisible] = useState(true)

    return <AppContext.Provider value={{
        history,
        get footbarVisible(): boolean {
            return footbarVisible
        },
        set footbarVisible(value: boolean) {
            setFootbarVisible(value)
        },
        get navbarVisible(): boolean {
            return navbarVisible
        },
        set navbarVisible(value: boolean) {
            setNavbarVisible(value)
        },
    }}>
        <Router history={history}>
            <Layout>

                <Switch>
                    <Route exact path="/" component={IndexPage}></Route>
                    <Route exact path="/llz" component={Relativity}></Route>
                    <Route exact path="/v" component={VF}></Route>
                    <Route exact path="/c" component={ComplexPage}></Route>
                    <Route path="*" component={NotFoundPage}></Route>
                </Switch>

            </Layout>
        </Router>
    </AppContext.Provider >
}