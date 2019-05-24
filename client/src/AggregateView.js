import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, Dot} from 'recharts';
import React from 'react';
import DetailView from './DetailView';
import RangeSlider from './RangeSlider';

class AggregateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allScores: {},
            scores: {},
            schools: [],
            showBlack: true,
            showHispanic: false,
            showWhite: false,
            showAsian: false,
            active: {}
        }
    };
    async componentDidMount() {
        if (Object.keys(this.state.allScores).length === 0){
            let res = await fetch('data');
            res = await res.json();
            this.setState({
                scores: res.scores,
                schools: res.schools,
                allScores: res.scores
            });
        }
    };

    filterData(props) {
        let race = `show${props.value}`
        this.setState({[race]: !this.state[race]});
    };

    setActive(props){
        let index = props.payload[0].payload.index;
        let school = this.state.schools[index];
        let black = +this.state.allScores.black[index].x;
        let white = +this.state.allScores.white[index].x;
        let asian = +this.state.allScores.asian[index].x;
        let hispanic = +this.state.allScores.hispanic[index].x;
        let score = props.payload[0].payload.y;

        return {
                school,
                black,
                white,
                asian,
                hispanic,
                other: 100 - black - white - asian - hispanic,
                score,
        };
    };

    renderTooltip(props) {
        if (props.active === true) {
            let active = this.setActive(props);
            return (
                <div className="customToolTip">
                <b>{this.state.schools[props.payload[0].payload.index]}</b><br></br>
                <>Percentage of students {props.payload[0].value}%</><br></br>
                <>SAT Score {props.payload[1].value}</>
                <DetailView active={active}/>
                </div>
               )
        }
    }
    render() {
        return (
        <>
            <ScatterChart
                width={650}
                height={650}
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
                <Tooltip cursor={{ strokeDasharray: '3 3'}} content={this.renderTooltip.bind(this)} />
                <Legend verticalAlign="top" height={50} onClick={this.filterData.bind(this)}/>
                <Scatter name="Black" data={this.state.scores.black} fill="#d8cb84" className={this.state.showBlack? "": "hidden"} 
                    shape={<Dot onClick={this.setActive.bind(this)} r={5}/>}>
                </Scatter>
                <Scatter name="Asian" data={this.state.scores.asian} fill="#84ced8" className={this.state.showAsian? "": "hidden"}
                    shape={<Dot onClick={this.setActive.bind(this)} r={5}/>}>
                </Scatter>
                <Scatter name="White" data={this.state.scores.white} fill="#d884cb" className={this.state.showWhite? "": "hidden"}
                    shape={<Dot onClick={this.setActive.bind(this)} r={5}/>}>
                </Scatter>
                <Scatter name="Hispanic" data={this.state.scores.hispanic} fill="#f47142" className={this.state.showHispanic? "": "hidden"}
                    shape={<Dot onClick={this.setActive.bind(this)} r={5}/>}>
                </Scatter>
            </ScatterChart>
            <RangeSlider scores={this.state.allScores} setAggState={this.setState.bind(this)}></RangeSlider>
        </>
        )
    }
};
export default AggregateView;