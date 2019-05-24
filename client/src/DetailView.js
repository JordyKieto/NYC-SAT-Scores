import {
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    PieChart, 
    Pie, 
    Cell,
} from 'recharts';
import React from 'react';
import races from './jsCommon/races';

class DetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: []
        };
    };
    componentWillReceiveProps(nextProps){
        this.propsToState(nextProps);
    };
    propsToState(props){
        let {active} = props;
        this.setState({
            active: [{
                black: active.score * (active.black / 100),
                white: active.score * (active.white / 100),
                asian: active.score * (active.asian / 100),
                hispanic: active.score * (active.hispanic / 100),
                other: active.score * (active.other / 100),
                school: active.school,
            }]
        })
    };
    pieData(data){
        if(data.length === 1){
            return [
                { name: [data[0].black], value: data[0].black },
                { name: [data[0].white], value:  data[0].white },
                { name: [data[0].asian], value: data[0].asian },
                { name: [data[0].hispanic], value: data[0].hispanic },
                { name: [data[0].other], value: data[0].other },            
            ]
        }
    }
    render() {
        return (
            <>
                <BarChart
                    width={400}
                    height={275}
                    data={this.state.active}
                    margin={{
                        top:20, right: 30, left: 20, bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis/>
                    <YAxis domain={[0, 800]}/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="black" stackId="a" fill="#d8cb84"/>
                    <Bar dataKey="white" stackId="a" fill="#d884cb"/>
                    <Bar dataKey="asian" stackId="a" fill="#84ced8"/>
                    <Bar dataKey="hispanic" stackId="a" fill="#f47142"/>
                    <Bar dataKey="other" stackId="a" fill="#bab6ae"/>
                </BarChart>
                <PieChart className={`inner-pie`} width={200} height={200}>
                <Pie
                data={this.pieData(this.state.active)}
                cx={100}
                cy={100}
                labelLine={false}
                outerRadius={40}
                innerRadius={10}
                paddingAngle={3}
                fill="#8884d8"
                dataKey="value"
                >
                {races.map(([race, color]) => <Cell key={`cell-${race}`} fill={color} />)}
                </Pie>
            </PieChart>
            </>
        )
    }
};

export default DetailView;