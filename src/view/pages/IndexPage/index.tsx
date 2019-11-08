import * as React from 'react';
import { Template } from '../../components';

export interface IIndexPageProps {

}

export interface IIndexPageState {
}

export default class IndexPage extends React.Component<IIndexPageProps, IIndexPageState> {
  constructor(props: IIndexPageProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <Template>
          <div className="container">
              <img className="img-fluid d-block ml-auto mr-auto" src={require("../../../assets/public/icon.png")}></img>
              <h3 className="text-center">Seymour Zhang's React Application Template</h3>
              <p className="text-center">v{require("../../../../package.json").version} <br/>by zsh2401</p>
              <div className="mr-auto ml-auto" style={{maxWidth:'500px'}}>
                <img src="http://img.shields.io/travis/zsh2401/sz-rat.svg"/>
                <img src="https://img.shields.io/node/v/webpack"/>
                <img src="https://img.shields.io/github/languages/code-size/zsh2401/sz-rat"/>
                <img src="https://img.shields.io/badge/license-MIT-green"/>
                <img src="https://img.shields.io/github/package-json/v/zsh2401/sz-rat"/>
              </div>
          </div>
      </Template>
    );
  }
}
