import React from 'react';
import {text as requestText, json as requestJson} from 'd3-request';
import {addDataToMap} from 'kepler.gl/actions'
import Processors from 'kepler.gl/processors'
import {connect} from 'react-redux';

class DataPicker extends React.Component {

  constructor (props) {
    super(props)
    this.countries = []
    this.france = []
    this.options = [{name: 'Countries', checked: false, field: 'countries'}, {name: 'France', checked: false, field: 'france'}]
  }

  componentDidMount(){
    requestJson('https://restcountries.eu/rest/v2/all', (error, samples) => {
      if (error) {
        Console.warn(`Error loading sample configuration file ${MAP_CONFIG_URL}`);
      } else {
        this.countries = samples.map((s) => {return {lat: s.latlng[0], lng: s.latlng[1], name: s.name}})
      }
    })
    requestJson('https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port', (error, samples) => {
      if (error) {
        Console.warn(`Error loading sample configuration file ${MAP_CONFIG_URL}`);
      } else {
        this.france = samples.features.map((s) => {return {lat: s.geometry.coordinates[0], lng: s.geometry.coordinates[1], name: s.properties.name}})
      }
    })
  }

  handleBoxChange(event) {
    this.options.find((el) => el.name === event.target.value).checked = event.target.checked
  }

  createBoxes() {
    const elements = []
    this.options.forEach(element => {
      elements.push(<div key={element.name}>
        <input
          type="checkbox"
          name={`${element.name}`}
          value={`${element.name}`}
          onChange={this.handleBoxChange.bind(this)}
          /> {element.name}<br/></div>)
    });
    return elements
  }

  load() {
    this.options.filter((o) => o.checked).forEach((option) => {
      const data = Processors.processRowObject(this[option.field])
      const dataset = {
        data,
        info: {
          // `info` property are optional, adding an `id` associate with this dataset makes it easier
          // to replace it later
          id: option.name
        }
      };
      this.props.dispatch(addDataToMap({datasets: dataset}));
    })

  }

  render () {
    return (
      <div>
        <h3>Pick collection</h3>
        {this.createBoxes()}
        <button onClick={() => this.load()}>Click</button>
      </div>
    );
  }
}

// export default DataPicker;

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(
  mapStateToProps,
  dispatchToProps
)(DataPicker);
