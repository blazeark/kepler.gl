import React from 'react';
import {text as requestText, json as requestJson} from 'd3-request';
import {addDataToMap} from 'kepler.gl/actions'
import Processors from 'kepler.gl/processors'
import {connect} from 'react-redux';

class DataPicker extends React.Component {

  constructor (props) {
    super(props)
    this.countries = []
  }

  componentDidMount(){
    requestJson('https://restcountries.eu/rest/v2/all', (error, samples) => {
      if (error) {
        Console.warn(`Error loading sample configuration file ${MAP_CONFIG_URL}`);
      } else {
        this.countries = samples.map((s) => {return {lat: s.latlng[0], lng: s.latlng[1], name: s.name}})
        console.log(this.countries)
      }
    })
  }

  load() {
    const data = Processors.processRowObject(this.countries)
    const dataset = {
      data,
      info: {
        // `info` property are optional, adding an `id` associate with this dataset makes it easier
        // to replace it later
        id: 'my_data'
      }
    };
    console.log(dataset)
    // addDataToMap action to inject dataset into kepler.gl instance
    console.log(this.props)
    this.props.dispatch(addDataToMap({datasets: dataset}));
  }

  render () {
    return (
      <div>
        <h3>TESTS !!1</h3>
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
