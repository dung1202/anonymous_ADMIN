import React from 'react'
import './home.css'
import {userData} from '../../data'
import WidgetSm from '../../component/widgetSm/WidgetSm'
import WidgetLg from "../../component/widgetLg/WidgetLg";
import FeaturedInfo from "../../component/featuredInfo/FeaturedInfo"
import Chart from "../../component/chart/Chart";
export default function Home() {
    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
            <div className ="homeWidgets">
                <WidgetLg/>
                <WidgetSm/>
            </div>
        </div>
    )
}
