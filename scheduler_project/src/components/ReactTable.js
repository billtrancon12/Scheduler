import React, {useMemo} from "react";
import { useTable } from "react-table";
import '../pages/css/testTable.css'
import PropTypes from 'prop-types'

export const ReactTable = (props) =>{
  const columns = useMemo(() => props.columns, [props.columns]);    
  const data =  useMemo(() => props.data, [props.data]);

  const tableInstance = useTable({columns, data})
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance
    
	const getTag = function(value, tags){
		for(const x of tags){
			if(value === x.tag) return {color: x.color, tag: x.tag};
		}
		return "";
	}

  return(
    <table {...getTableProps()} className={props.className} id={props.id} >
      <thead>
        {
					headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')} 
                </th>
              ))}
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={cell.value === getTag(cell.value, props.style).tag ? {backgroundColor: getTag(cell.value, props.style).color} : {backgroundColor: null}}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })
      	}
      </tbody>
    </table>
  )
}

ReactTable.propTypes = {
	columns: PropTypes.array,
	data: PropTypes.array,
	className: PropTypes.string,
	id: PropTypes.string,
	style: PropTypes.array
}