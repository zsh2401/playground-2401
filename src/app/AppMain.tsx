import "./init"
import React from 'react'
import ReactDOM from 'react-dom'
import historyManager from '../common/history-manager';
import { Router, Route, Switch } from 'react-router';
import {IndexPage, NotFoundPage} from '../view/pages';
//App容器
const APP_CONTAIINER = document.querySelector("#app");

// 应用路由器
const AppRouter = ()=>(
<Router history={historyManager()}>
    <Switch>
        <Route exact path="/" component={ IndexPage}></Route>
        <Route path="*" component={NotFoundPage}></Route>
    </Switch>
</Router>)
//此方法将渲染应用到DOM中
ReactDOM.render(<AppRouter/>,APP_CONTAIINER)