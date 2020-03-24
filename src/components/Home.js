import React, { Component } from 'react'
import PieChart from './PieChart'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import DailyChart from './DailyChart';



class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmed: 0,
            recovered: 0,
            deaths: 0,
            lastUpdate: '',
            daily: false,
            totalConfirmed: [],
            totalDeaths: []
        }
    }

    componentDidMount() {
        const getData = () => {
            axios
            .get("https://covid19.mathdro.id/api")
            .then(res => res.data)
            .then(data => {
                            //console.log(data)
                            this.setState({
                            confirmed: data.confirmed.value,
                            recovered: data.recovered.value,
                            deaths: data.deaths.value,
                            lastUpdate: data.lastUpdate
                            }, () => console.log('data from state : ', this.state))
                        })
        }
        getData(); 

        this.interval = setInterval( () => {
            console.log('setInterval works again');
            getData();
        }, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    seeDailyReport = () => {
        this.setState({
            daily: true
        })
    }

    componentDidUpdate() {
       
        if (this.state.daily === true && this.state.totalConfirmed.length === 0 && this.state.totalDeaths.length === 0){
            axios
            .get("https://covid19.mathdro.id/api/daily")
            .then(res => res.data)
            .then(data => {
                            //console.log('daily data : ' , data)
                            let totalConfirmed = data.map(item => {
                                                                    return { x: new Date(item.reportDate),
                                                                             y: item.totalConfirmed }
                            }) 
                            //console.log(totalConfirmed);

                            let totalDeaths = data.map(item => {
                                return { x: new Date(item.reportDate),
                                         y: item.deaths.total }
                            }) 
                            //console.log(totalRecovered);

                            this.setState({
                                totalConfirmed,
                                totalDeaths
                            })
                            //console.log(this.state)
                        })
        }
        
    }
    
    render() {

        const { confirmed, recovered, deaths, lastUpdate, daily, totalConfirmed, totalDeaths } = this.state;
        const pieChartData =   [
                               { y:confirmed , label: "Confirmed" },
                               { y:recovered , label: "Recovered" },
                               { y:deaths , label: "Deaths" }
                            ] 
        //console.log('pieChartData : ', pieChartData)

        return (
            <div className="container text-center">
                <PieChart title= "COVID-19 LAST UPDATE OVER THE WORLD"
                                     chartData={pieChartData} 
                                     date= {new Date(lastUpdate).toLocaleString()}
                />
              
                
                <h3 className="text-center text-danger mt-5">Click for the Daily Report</h3>
                <Button className="mx-auto my-3" variant="outline-danger" onClick={this.seeDailyReport}>Click me</Button>
                <div>
                    {
                        daily ? <DailyChart totalConfirmed={totalConfirmed} totalDeaths={totalDeaths}  /> : null
                    }
                </div>
                <div>
                    {
                        daily ? <DailyChart totalConfirmed={totalConfirmed}  /> : null
                    }
                </div>
                <div>
                    {
                        daily ? <DailyChart totalDeaths={totalDeaths}  /> : null
                    }
                </div>
                
            </div>
        )
    }
}

export default Home
