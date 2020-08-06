/* Pagination Component 
-------------------------------------------------*/
import React, { useState, useEffect } from "react";
import './pagination.css'
import Calendar from './Calendar';
// const propTypes = {
//     items: React.PropTypes.array.isRequired,
//     onChangePage: React.PropTypes.func.isRequired,
//     initialPage: React.PropTypes.number    
// }

const defaultProps = {
    initialPage: 1
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var items = this.props.items;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        // This needs to change to show the items on a page
        // for Mobile -- pageSize = pageSize || 1;
        pageSize = pageSize || 3;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination">

                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>

                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>

            </ul>
        );
    }
}

// Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;


/* App Component 
-------------------------------------------------*/

const Paginator = (props) => {
    // console.log(props.testResult)
    // const [initialCalenderItems, setInitialCalenderItems] = useState(props.result);
    const [initialCalenderItems, setInitialCalenderItems] = useState(props.testResult.monthList);
    const [pageOfItems, setPageOfItems] = useState([]);

    useEffect(() => {
        // setInitialCalenderItems(props.result)
        setInitialCalenderItems(props.testResult.monthList)
        // setPageOfItems(props.result)
    }, [props.result])

    // constructor(props) {
    //     super(props);

    //     // an example array of items to be paged
    //     // var exampleItems = [...Array(12).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
    //     var exampleItems = this.props.result;

    //     this.state = {
    //         exampleItems: exampleItems,
    //         pageOfItems: []
    //     };

    // }

    const onChangePage = (pageOfItems) => {
        // update state with new page of items
        setPageOfItems(pageOfItems)
        // this.setState({ pageOfItems: pageOfItems });
    }

    return (
        <div>
            <div className="container">
                <Pagination items={initialCalenderItems} onChangePage={onChangePage} />
                <div className="text-center">
                    {/* <h1>React - Pagination Example with logic like Google</h1> */}
                    {pageOfItems.map(item =>
                        // <Calendar key={item.startDate} selectedDate={item.startDate} />
                        <Calendar key={item.startDate} selectedDate={`${item.monthName} ${item.year}`} 
                        dateModel={item.dateModel}
                        />
                        // <div key={item.startDate}>{item.startDate}</div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Paginator;
