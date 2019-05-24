import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
// const Handle = Slider.Handle;



class RangeSlider extends React.Component{
    handle(props) {
        let newScores = {}
        for (let race in this.props.scores){
                newScores[race] = this.props.scores[race].filter((e)=>{ return e.y <= props[1] && e.y >= props[0]})
        }
        this.props.setAggState({scores: newScores})
    };
    render(){
        return (
            <>
                <div className={"Range-Slider-Container"}>
                    <p>Score Range</p>
                    <Range 
                    pushable={1} 
                    min={0} 
                    max={800} 
                    vertical={true}
                    defaultValue={[400, 800]} 
                    onChange={this.handle.bind(this)}
                    />
                </div>
            </>
        )
    }
}
export default RangeSlider;
