import React from 'react';
import {text as requestText, json as requestJson} from 'd3-request';

class DataPicker extends React.Component {

  constructor () {
    super()
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


  render () {
    return (
      <div>
        <h3>TESTS !!1</h3>
        <button onClick={() => onLoadSampleData(this.countries)}>Click</button>
      </div>
    );
  }
}

export default DataPicker;
