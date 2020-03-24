import React, { Component } from 'react';
import { CardGroup } from 'react-bootstrap';
import axios from 'axios';
import BarChart from './BarChart';



class CountrySearch extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            selectedCountry: '',
            countries: [],
            usa: [],
            china: [],
            italy: [],
            germany: [],
            turkey: [],
            other: {country: '', name: '', chartData: []}
        }
    }

    componentDidMount() {
        axios
        .all([
            axios.get('https://covid19.mathdro.id/api/countries'),
            axios.get('https://covid19.mathdro.id/api/countries/USA'),
            axios.get('https://covid19.mathdro.id/api/countries/CHN'),
            axios.get('https://covid19.mathdro.id/api/countries/ITA'),
            axios.get('https://covid19.mathdro.id/api/countries/DEU'),
            axios.get('https://covid19.mathdro.id/api/countries/TUR')
        ])
        .then(axios.spread((countryList, usa, china, italy, germany, turkey) => {
            this.setState({
                countries: countryList.data.countries.map(item => [item.name, item.iso3]),
                usa: [usa.data.confirmed.value, usa.data.deaths.value, usa.data.lastUpdate],
                china: [china.data.confirmed.value, china.data.deaths.value, china.data.lastUpdate],
                italy: [italy.data.confirmed.value, italy.data.deaths.value, italy.data.lastUpdate],
                germany: [germany.data.confirmed.value, germany.data.deaths.value, germany.data.lastUpdate],
                turkey: [turkey.data.confirmed.value, turkey.data.deaths.value, turkey.data.lastUpdate],
                other: {country: this.state.selectedCountry}
            })
        }))
    }
    

    componentDidUpdate() {
        console.log('hlleo from component Did Update')
        if (this.state.selectedCountry !== this.state.other.country) {
            console.log('ulkeler farkli')
            const short = this.state.selectedCountry.slice(this.state.selectedCountry.length - 3); 
            console.log('short :', short)
            axios
                .get(`https://covid19.mathdro.id/api/countries/${short}`)
                .then( res => res.data)
                .then( data => {
                    console.log('data : ', data);
                    const chartData= [data.confirmed.value, data.deaths.value, data.lastUpdate];
                    const name = this.state.selectedCountry.split(',')[0];
                    const country = this.state.selectedCountry;
                    
                    this.setState({
                        other: {
                            country,
                            name,
                            chartData
                        }
                    })
                })
        }
    }

    render() {
        console.log('state : ', this.state)
        const { usa, china, italy, germany, turkey, other } = this.state;
        const barChartCountries = [
            {
                name: 'CHINA',
                chartData: china
            },
            {
                name: 'USA',
                chartData: usa
            },
            {
                name: 'ITALY',
                chartData: italy
            },
            {
                name: 'GERMANY',
                chartData: germany
            },
            {
                name: 'TURKEY',
                chartData: turkey
            }
        ]

        return (
            <div className="mb-5">
                <CardGroup>
                    {
                        barChartCountries.map( (item, index) => <div key={index} style={{width: '20%'}}>
                                                                    <div style={{margin: '20px'}}>
                                                                        <BarChart {...item} />
                                                                    </div>
                                                                </div>
                    )}
                </CardGroup>
                <hr/>
                <div className="container">
                    <div>Select a Country</div>
                    <select id="selected" style={{height: '40px'}} className="p-3" onChange={ e => this.setState({selectedCountry: e.target.value})}>
                        {
                            this.state.countries.map( (item, index) => <option key={index}>{item[0] +', ' + item[1]}</option>)
                        }
                    </select>
                    {
                        other.country ? <div className="px-3 mb-3">
                                            <BarChart {...this.state.other} /> 
                                        </div> 
                                        : null
                    } 
                </div>
            </div>
        )
    }
}

export default CountrySearch
