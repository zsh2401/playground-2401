import React from "react";
import Relativity from "../view/apps/Relativity";
import VectorsField from "../view/apps/VectorsField"
import ComplexPanel from "../view/apps/ComplexPanel"
import { LiteralUnion } from "antd/lib/_util/type";
import { PresetColorType, PresetStatusColorType } from "antd/lib/_util/colors";
export interface App {
    label: string
    descrition: string
    cover: string
    id: string
    tags: string[],
    component: React.ComponentType
}
export const colorMap = new Map<string, (LiteralUnion<PresetColorType | PresetStatusColorType, string>)>();

(() => {
    colorMap.set("初等数学", "red")
    colorMap.set("物理", "cyan")
})()

export const apps: App[] = [
    {
        label: "洛伦兹变换",
        descrition: "狭义相对论的灵魂内容",
        cover: require("../view/apps/Relativity/cover.jpg").default,
        id: "relativity",
        component: Relativity,
        tags: ["物理", "相对论"],
    },
    {
        label: "复平面",
        descrition: "“想象中的数字”",
        cover: require("../view/apps/ComplexPanel/cover2.png").default,
        id: "complex-panel",
        component: ComplexPanel,
        tags: ["初等数学"],
    },
    {
        label: "向量场",
        descrition: "简单的线性向量场",
        cover: require("../view/apps/VectorsField/cover.png").default,
        id: "vectors-field",
        component: VectorsField,
        tags: ["初等数学"],
    },
];
export default apps