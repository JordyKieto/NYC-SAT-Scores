import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import React from 'react';

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
    render() {
        return (
            <BarChart
                width={400}
                height={300}
                data={this.state.active}
                margin={{
                    top:20, right: 30, left: 20, bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="school" />
                <YAxis domain={[0, 800]}/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="black" stackId="a" fill="#d8cb84"/>
                <Bar dataKey="asian" stackId="a" fill="#84ced8"/>
                <Bar dataKey="white" stackId="a" fill="#d884cb"/>
                <Bar dataKey="hispanic" stackId="a" fill="#f47142"/>
                <Bar dataKey="other" stackId="a" fill="#bab6ae"/>
            </BarChart>
        )
    }
};

export default DetailView;