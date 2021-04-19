import React from "react";
import Relativity from "../view/apps/Relativity";
import VectorsField from "../view/apps/VectorsField"
import ComplexPanel from "../view/apps/ComplexPanel"
export interface App {
    label: string
    descrition: string
    icon: string
    id: string
    component: React.ComponentType
}

export const apps: App[] = [
    {
        label: "广义相对论",
        descrition: "研究",
        icon: "",
        id: "relativity",
        component: Relativity
    },
    {
        label: "复平面",
        descrition: "研究",
        icon: "",
        id: "complex-panel",
        component: ComplexPanel
    },
    {
        label: "向量场",
        descrition: "研究",
        icon: "",
        id: "vectors-field",
        component: VectorsField
    },
];
export default apps