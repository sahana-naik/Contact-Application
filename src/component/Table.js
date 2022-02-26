import React from "react";
import { useTable, usePagination, useFilters } from "react-table";
import './table.scss';

const defaultPropGetter = () => ({});

const Table = ({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  renderRowSubComponent,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    // state: { expanded },
    prepareRow,
  } = useTable(
    {
      columns: columns,
      data: data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination,
  );
  const { pageIndex, pageSize } = state;
  return (
    <>
      <div className="table-wrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th width={column.width} {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <div>
                      {column.canFilter && column.Filter
                        ? column.render("Filter")
                        : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <>
                {/* // <React.Fragment {...row.getRowProps()}> */}
                  <tr {...row.getRowProps(getRowProps(row))}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                  </>
                /* </React.Fragment> */
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="custom-pagination">
        <span className="pagination-number">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
       
        <span className="pagination-select">
          <select
            className="select-page"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </span>

        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="pagination-btn-arrow"
        >
          {"<<"}
        </button>

        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="custompage-number">
          <input
            className="custompage-number-input"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="pagination-btn"
        >
          Next
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="pagination-btn-arrow"
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default Table;
