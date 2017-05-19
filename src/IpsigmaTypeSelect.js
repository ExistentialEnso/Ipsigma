const React = require('react');

class IpsigmaTypeSelect extends React.Component {
    render() {
        // Build up our list of <options> for the dropdown
        let options = [];
        this.props.types.forEach((type) => {
            options.push(<option key={type.name} value={type.name}>{type.name}</option>)
        });

        return (
            <select className="form-control" onChange={this.typeChanged.bind(this)}>
                {options}
            </select>
        );
    }
    typeChanged(e) {
        let type = e.target.value;

        // Pass the type selected to the onChange function given to the component
        this.props.onChange(type);
    }
}

module.exports = IpsigmaTypeSelect;