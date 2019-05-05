import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList} from 'recharts';
import React from 'react';
class SATChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { x: 100, y: 200, z: 200 },
                { x: 120, y: 100, z: 260 },
                { x: 170, y: 300, z: 400 },
                { x: 140, y: 250, z: 280 },
                { x: 150, y: 400, z: 500 },
                { x: 110, y: 280, z: 200 },
            ]
        }
    };
    async componentDidMount() {
        let data = await fetch('data');
        data = await data.json();
        this.setState({data: data});
    };

    renderTooltip() {
        return (
         <div>Custom content</div>
        )
    }
    render() {
        return (
        <ScatterChart
            width={400}
            height={400}
            margin={{
                top: 20, right:20, bottom:20, left: 20
            }}
        >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="Percent Black" unit="%" />
            <YAxis type="number" dataKey="y" name="Average Score (SAT Math)"/>
            <Tooltip cursor={{ strokeDasharray: '3 3'}} />
            <Scatter name="SAT and Blackness" data={this.state.data} fill="#8884d8">
            </Scatter>
        </ScatterChart>
        )
    }
};

export default SATChart;