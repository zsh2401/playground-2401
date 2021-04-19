import React, { useMemo, useState } from 'react';
import { Router, Route, Switch } from 'react-router';
import IndexPage from './view/pages/IndexPage';
import NotFoundPage from './view/pages/NotFoundPage';
import Layout from './view/components/Layout';
import AppContext from "./AppContext"
import { createHashHistory } from "history"
import { apps } from "./common/app-registration"
import AppPage from "./view/pages/AppPage"
export default function AppRouter() {

    const history = useMemo(() => createHashHistory(), []);
    const [navbarVisible, setNavbarVisible] = useState(true)
    const [footbarVisible, setFootbarVisible] = useState(true)

    return <AppContext.Provider value={{
        history,
        apps,
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
                    <Route exact path="/app/:aid" component={AppPage}></Route>
                    <Route path="*" component={NotFoundPage}></Route>
                </Switch>

            </Layout>
        </Router>
    </AppContext.Provider >
}