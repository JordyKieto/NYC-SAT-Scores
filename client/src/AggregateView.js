import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, Dot} from 'recharts';
import React from 'react';
import DetailView from './DetailView';
import RangeSlider from './RangeSlider';
import Checkbox from './Checkbox';
import races from './jsCommon/races';

class AggregateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allScores: {},
            scores: {},
            schools: [],
            show: {
                black: true,
                hispanic: false,
                white: false,
                asian: false,
            },
            active: {},
            subject: 'Math',
        }
    
    };
    async getScores(subject){
        let res = await fetch(`scores?subject=${subject}`);
        res = await res.json();
        this.setState({
            scores: res.scores,
            schools: res.schools,
            allScores: res.scores
        });
    }
    componentWillMount() {
       this.getScores('Math');
    };
    filterByRace({value}) {
        this.setState({show: Object.assign({}, this.state.show, {[value]: !this.state.show[value]})});
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
            <h2 className={`graph-title`}>{`SAT Scores By Racial Makeup`}</h2>
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
                <Legend className={`race-legend`} verticalAlign="top" height={50} onClick={this.filterByRace.bind(this)}/>
                {races.map(([race, color])=>(
                    <Scatter
                        key={race}
                        name={race} 
                        data={this.state.scores[race]} 
                        fill={color}
                        className={this.state.show[race]? "": "hidden"} 
                        shape={<Dot r={5}/>}>
                    </Scatter>
                ))}
            </ScatterChart>
            <RangeSlider scores={this.state.allScores} setAggState={this.setState.bind(this)}></RangeSlider>
           <Checkbox getScores={this.getScores.bind(this)}></Checkbox>
        </>
        )
    }
};
export default AggregateView;