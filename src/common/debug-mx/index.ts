/**
 * Provides a serials of debug tools
 */
import packageInfo from "../../../package.json";

const DEV_STR = "development"
const PROD_STR = "production"
function isDev(): boolean {
    //@ts-ignore
    return process.env.NODE_ENV !== PROD_STR;
}
export function getRawPkgInfo(): any {
    return packageInfo;
}
export default {
    IS_DEV: isDev(),
    VERSION: packageInfo?.version,
    NAME: packageInfo?.name,
    DESC: packageInfo?.description,
    AUTHOR: packageInfo?.author,
}
