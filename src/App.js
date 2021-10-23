import './style.css';
import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Table from './Table';

// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function App() {
  //state
  const [data, setData] = useState(); //data from api
  const [filter, setFilter] = useState(); //input search value
  const [filteredData, setFilteredData] = useState([]); //display the search result
  const [sortDirection, setSortDirection] = useState('asc'); //sort direction

  // fetch data from randomuser.me
  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=50`)
      .then((response) => response.data)
      .then((d) => {
        setData(d.results);
        // const {results} = d
        // console.log(results)//[{},{},{}]
        setData(d.results);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    //filter function for name input values
    const filterData = (data) => {
      let filteredData = data; //re assign to a varible
      if (!!filter) {
        //the init filter value is set to empty - if is NOT empty....
        //then re assign filteredData variable to the filtered data
        filteredData = filteredData.filter(
          (d) =>
            d.name.first.toLowerCase().includes(filter.toLowerCase()) ||
            d.name.last.toLowerCase().includes(filter.toLowerCase())
        );
      }
      return filteredData;
    };
    //assigning a variable to the filterData call - when this gets involked it will return the matching inputs
    const filtered = filterData(data);
    //setting matched inputs to filteredData state to display the results
    setFilteredData(filtered);
  }, [data, filter]);
  // filter function ran when the data was fetched from the api, return the data to the filteredData state

  // const renderSortingIcon = () => {
  //   if (sortDirection === 'asc')
  //     return <ArrowDownwardIcon fontSize={'small'} />;
  //   if (sortDirection === 'desc') return <ArrowUpwardIcon fontSize={'small'} />;
  //   return null;
  // };
  const renderSortingIcon = () => {
    if (sortDirection === 'asc') return '+';
    if (sortDirection === 'desc') return '-';
    return null;
  };

  //renders the data
  //renders the matching searched inputs
  //and it renders the asending and desending sort....
  const renderRows = () => {
    const rows =
      filteredData &&
      filteredData.map((filteredData, id) => (
        <tr key={id}>
          <td>
            {filteredData.name.first} {filteredData.name.last}
          </td>
          <td>{filteredData.login.username}</td>
          <td>{filteredData.registered.date}</td>
        </tr>
      ));
    //add sorting by date
    if (sortDirection === 'asc') {
      filteredData?.sort((a, b) =>
        a.registered.date.localeCompare(b.registered.date)
      );
    } else if (sortDirection === 'desc') {
      filteredData?.sort(
        (a, b) => -a.registered.date.localeCompare(b.registered.date)
      );
    }
    return rows;
  };

  return (
    <div className="App">
      <h1>User info</h1>
      {/* search bar */}
      <div>
        <label>Search by name:</label>
        <input
          type="text"
          id="search"
          name="search"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {/* table headers */}
      <Table
        renderRows={renderRows()}
        renderSortingIcon={renderSortingIcon()}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        filter={filter}
        filteredData={filteredData}
      />
    </div>
  );
}

export default App;
