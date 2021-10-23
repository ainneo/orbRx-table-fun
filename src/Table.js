import React from 'react';

function Table({
  renderRows,
  renderSortingIcon,
  sortDirection,
  setSortDirection,
  filter,
  filteredData,
}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Username</th>
            <th>
              Registration Date
              <span
                onClick={() => {
                  const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
                  setSortDirection(newDirection);
                }}
              >
                {renderSortingIcon}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filter && filteredData.length === 0 ? <p>no matches</p> : renderRows}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
