import base from './webpack.config.base'
// import meger from "webpack-co"
base.mode = "production";
//@ts-ignore
base.devServer.port++;
//@ts-ignore
base.devServer.open = true;
export default base;