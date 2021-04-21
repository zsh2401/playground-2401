import React, { useMemo, useState } from 'react';
import { Router, Route, Switch } from 'react-router';
import IndexPage from './view/pages/IndexPage';
import NotFoundPage from './view/pages/NotFoundPage';
import Layout from './view/components/Layout';
import AppContext, { useAppContext } from "./AppContext"
import { createHashHistory } from "history"
import { apps } from "./common/app-registration"
import AppPage from "./view/pages/AppPage"
export default function AppRouter() {

    return <Router history={useAppContext().history}>
        <Layout>

            <Switch>
                <Route exact path="/" component={IndexPage}></Route>
                <Route exact path="/app/:aid" component={AppPage}></Route>
                <Route path="*" component={NotFoundPage}></Route>
            </Switch>

        </Layout>
    </Router>
}