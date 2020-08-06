import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./components/Calendar";
import Paginator from './components/Paginator';
import MockedResult from "./components/result";

import changedMockedResult from "./components/changedResult";
import CustomDatePicker from "./components/CustomDatePicker";
import MobileCustomDatePicker from "./components/MobileCustomDatePicker";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

var currentMonthDate = new Date();
if (currentMonthDate.getMonth() == 11) {
    var nextMonthDate = new Date(currentMonthDate.getFullYear() + 1, 0, 1);
} else {
    var nextMonthDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1);
}

class App extends React.Component {

    
    state = {
        startDate: new Date(),
        date: new Date(),
        result: [
        ],
        showResult: false,
        value: 5,
        testResult: {},
        changedMockedResult: {},
        showCustomDatePicker: false,
        startMonth: currentMonthDate,
        nextMonth: nextMonthDate,
        fdlpDate: ''
    };

    handleDateChange = (date) => {
        this.setState({
            startDate: date,
        });
    };

    showResult = () => {
        this.setState({
            showResult: true,
            testResult: MockedResult,
            result: [
                { startDate: 'Aug 08 2020' },
                { startDate: 'Sep 09 2020' },
                { startDate: 'Oct 15 2020' },
                { startDate: 'Nov 16 2020' },
                { startDate: 'Dec 17 2020' },
                { startDate: 'Jan 18 2021' },
                { startDate: 'Feb 19 2021' },
                { startDate: 'Mar 21 2021' },
                { startDate: 'Apr 22 2021' },
                { startDate: 'May 23 2021' },
                { startDate: 'Jun 14 2021' },
                { startDate: 'Jul 16 2021' }
            ]
        })
    }
    showChangeResult = () => {
        this.setState({
            showResult: true,
            testResult: changedMockedResult,
            result: [
                { startDate: 'Aug 08 2022' },
                { startDate: 'Sep 09 2022' },
                { startDate: 'Oct 15 2022' },
                { startDate: 'Nov 16 2022' },
                { startDate: 'Dec 17 2022' },
                { startDate: 'Jan 18 2023' },
                { startDate: 'Feb 19 2023' },
                { startDate: 'Mar 21 2023' },
                { startDate: 'Apr 22 2023' },
                { startDate: 'May 23 2023' },
                { startDate: 'Jun 14 2023' },
                { startDate: 'Jul 16 2023' }
            ]
        })
    }
    onChange = (date) => this.setState({ date });
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    openCustomDatePicker = () => {
        this.setState({
            showCustomDatePicker: true
        })
    }

    closeDatePicker = (flag,dateObj) => {
        if(flag){
            this.setState({
                showCustomDatePicker: false,
                fdlpDate: `${dateObj.selectedDay}/${dateObj.selectedMonth}/${dateObj.selectedYear}`
            })
        }
    }
    sendLastPeriodData = (dateObj) => {
        console.log('Selected Date'+JSON.stringify(dateObj))
    }

    render() {
        return (
            <>
                <div>
                    <input type="text" onClick={this.openCustomDatePicker} 
                    value={this.state.fdlpDate} 
                    style={{backgroundColor: '#efefef'}} /> {this.state.fdlpDate}
                    {this.state.showCustomDatePicker &&
                        <div>
                            <MobileCustomDatePicker 
                            closeDatePicker={this.closeDatePicker}
                            startMonth={this.state.startMonth}
                            sendLastPeriodData={this.sendLastPeriodData}
                            />
                            {/* <CustomDatePicker 
                            closeDatePicker={this.closeDatePicker}
                            startMonth={this.state.startMonth}
                            sendLastPeriodData={this.sendLastPeriodData}
                            />
                            <CustomDatePicker 
                            closeDatePicker={this.closeDatePicker}
                            startMonth={this.state.nextMonth}
                            sendLastPeriodData={this.sendLastPeriodData}
                            /> */}
                        </div>}
                </div>
                <div >
                    {/* <DatePicker selected={this.state.startDate}
                        onChange={this.handleDateChange}
                        monthsShown={2}
                        minDate={new Date()}
                    /> */}
                    <div>
                        <button onClick={this.showResult}>Track Now </button>
                        <button onClick={this.showChangeResult}>Change Result Check </button>
                    </div>

                    <div>
                        <label htmlFor="vol">Volume (between 0 and 50):</label>
                        <input
                            id="typeinp"
                            type="range"
                            min="0" max="10"
                            value={this.state.value}
                            onChange={this.handleChange}
                            step="1" />
                    </div>
                </div>


                {/* <div style={{ position: 'absolute' }}>
                    {this.state.result && this.state.result.map((item) => {
                        return <Calendar selectedDate={item.startDate} />
                    })

                    }
                </div> */}
                {this.state.showResult &&
                    <Paginator result={this.state.result} testResult={this.state.testResult.Data} />
                }
            </>
        );
    }
}

export default App;