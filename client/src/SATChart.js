import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
import React from 'react';
class SATChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {'black': [], 'asian': [], 'white': []},
            showBlack: true,
            showHispanic: !true,
            showWhite: !true,
            showAsian: !true,
        }
    };
    async componentDidMount() {
        let data = await fetch('data');
        data = await data.json();
        this.setState({data: data});
    };

    filterData(props) {
        let race = `show${props.value}`
        this.setState({[race]: !this.state[race]});
    };

    renderTooltip(props) {
        if (props.active === true) {
            return (
                <div className="customToolTip">
                <b>{props.payload[0].payload.school}</b><br></br>
                <>Percentage of students {props.payload[0].value}%</><br></br>
                <>SAT Score {props.payload[1].value}</>
                </div>
               )
        }
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
            <XAxis type="number" dataKey="x" name="Percentage of Students" unit="%">
                <Label value="Percentage of Students" offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis type="number" dataKey="y" name="Average Score (SAT Math)">
                <Label value="Average Score (SAT Math)" angle={-90} position="insideBottomLeft" />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: '3 3'}} content={this.renderTooltip} />
            <Legend verticalAlign="top" height={50} onClick={this.filterData.bind(this)}/>
            <Scatter name="Black" data={this.state.data.black} fill="#d8cb84" className={this.state.showBlack? "": "hidden"}></Scatter>
            <Scatter name="Asian" data={this.state.data.asian} fill="#84ced8" className={this.state.showAsian? "": "hidden"}></Scatter>
            <Scatter name="White" data={this.state.data.white} fill="#d884cb" className={this.state.showWhite? "": "hidden"}></Scatter>
        </ScatterChart>
        )
    }
};

export default SATChart;