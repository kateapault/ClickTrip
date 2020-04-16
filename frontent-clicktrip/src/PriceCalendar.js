import React from 'react'
import MonthPrice from './MonthPrice'
import { getJSON } from './Helper/HelperMethods'


const monthHash = {
    "01":"jan",
    '02':'feb',
    '03':'mar',
    '04':'apr',
    '05':'may',
    '06':'jun',
    '07':'jul',
    '08':'aug',
    '09':'sep',
    '10':'oct',
    '11':'nov',
    '12':'dec'
}
class PriceCalendar extends React.Component {
    state = {
        year: true,
        viewMonth: 'jan',
        jan: [],
        feb: [],
        mar: [],
        apr: [],
        may: [],
        jun: [],
        jul: [],
        aug: [],
        sep: [],
        oct: [],
        nov: [],
        dec: [],
    }

    componentDidMount() {
        let initial = getJSON('initial')
        let monthsOrder = initial[0]
        let monthsQuotes = initial.slice(1).map(month => JSON.parse(month)["Quotes"])
        for (let i=0; i<monthsQuotes.length;i++) {
            let monthQuoteList = monthsQuotes[i]
            let monthName = monthHash[`${monthsOrder[i]}`]
            let monthAvg = this.getAvgPriceForMonth(monthQuoteList)
            let monthNonstopAvg = this.getAvgPriceNonstop(monthQuoteList)
            let monthWithStopAvg = this.getAvgPriceWithStops(monthQuoteList)
            this.setState({
                [monthName]: [monthAvg,monthNonstopAvg,monthWithStopAvg]
            })
            window.sessionStorage.setItem(`${monthName}`,JSON.stringify([monthAvg,monthNonstopAvg,monthWithStopAvg]))
        }
    }

    getAvgPriceForMonth = (monthPriceList) => {
        let allPrices = monthPriceList.map(flight => flight["MinPrice"])
        let priceTot = allPrices.reduce((accum,price) => accum + price)
        let avg = parseFloat(priceTot) / parseFloat(allPrices.length)
        return avg
    }

    getAvgPriceNonstop = (month) => {
        let nonstops = month.filter(flight => flight["Direct"] === true)
        if (nonstops.length > 0) {
            return this.getAvgPriceForMonth(nonstops)
        } else {
            return 'none'
        }
    }

    getAvgPriceWithStops = (month) => {
        let withStops = month.filter(flight => flight["Direct"] === false)
        if (withStops.length > 0) {
            return this.getAvgPriceForMonth(withStops)
        } else {
            return 'none'
        }
    }   

    getFlightData = (flightJSON) => {
        let flight = {}
        flight.price = flightJSON["MinPrice"]
        flight.nonstop = flightJSON["Direct"]
        flight.carrierSkyID = flightJSON["OutboundLeg"]["CarrierIds"][0]
        flight.originSkyID = flightJSON["OutboundLeg"]["OriginId"]
        flight.destinationSkyID = flightJSON["OutboundLeg"]["DestinationId"]
        flight.departureDate = flightJSON["OutboundLeg"]["DepartureDate"].split('T')[0]
    }

    toggleCalendar = () => {
        this.setState({
            year: !this.state.year
        })
    }

    render() {
        if (this.state.year) {
            return(
                <div className="price-calendar">
                    <div className="year-calendar calendar">
                        <div className="y-row">
                            <div className="y-col"><MonthPrice month="January" prices={this.state.jan}/></div>
                            <div className="y-col"><MonthPrice month="February" prices={this.state.feb}/></div>
                            <div className="y-col"><MonthPrice month="March" prices={this.state.mar}/></div>
                            <div className="y-col"><MonthPrice month="April" prices={this.state.apr}/></div>
                        </div>
                        <div className="y-row">
                            <div className="y-col"><MonthPrice month="May" prices={this.state.may}/></div>
                            <div className="y-col"><MonthPrice month="June" prices={this.state.jun}/></div>
                            <div className="y-col"><MonthPrice month="July" prices={this.state.jul}/></div>
                            <div className="y-col"><MonthPrice month="August" prices={this.state.aug}/></div>
                        </div>
                        <div className="y-row">
                            <div className="y-col"><MonthPrice month="September" prices={this.state.sep}/></div>
                            <div className="y-col"><MonthPrice month="October" prices={this.state.oct}/></div>
                            <div className="y-col"><MonthPrice month="November" prices={this.state.nov}/></div>
                            <div className="y-col"><MonthPrice month="December" prices={this.state.dec}/></div>
                        </div>
                    </div>
                </div>
            )
        } else {
            let month = this.state.viewMonth
            let quotes = this.state[month]
            return (
            <div className="price-calendar">
                <div className="month-calendar">
                    {quotes.map(quote => {
                        "I'm a quote"
                    })}
                </div>
            </div>           
        )}
    }
}

export default PriceCalendar