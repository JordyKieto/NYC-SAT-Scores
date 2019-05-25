import React from 'react';
class Checkbox extends React.Component {
    handleChange(event){
        // console.log(Object.keys(event));
        this.props.getScores(event.target.value)
    };
    render() {
        return (
            <>
            <form className="subject-checkbox" onChange={this.handleChange.bind(this)}>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="subject-checkbox" id="math-checkbox" value="Math" defaultChecked/>
                        <label className="form-check-label" htmlFor="math-checkbox">
                            Math
                        </label>
                            </div>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="subject-checkbox" id="reading-checkbox" value="Reading"/>
                        <label className="form-check-label" htmlFor="reading-checkbox">
                            Reading
                        </label>
                </div>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="subject-checkbox" id="writing-checkbox" value="Writing"/>
                        <label className="form-check-label" htmlFor="writing-checkbox">
                            Writing
                        </label>
                </div>
            </form>
            </>
        )
    }
};
export default Checkbox;