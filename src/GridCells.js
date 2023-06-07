import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GridPage = (props) => {
  const [grid, setGrid] = useState(Array(6).fill(Array(6).fill('Orord')))
  const [cordinates, setCordinates] = useState([]);
  const [addCordinates, setAddCordinates] = useState(false);
  const [gridsId, setGridsId] = useState(props.GridId);
  const [state, setState] = useState();
  const [row, setRow] = useState();
  const [col, setCol] = useState();

  useEffect(() => {
    fetchCordinates();
  }, [gridsId]);

  useEffect(() => {
    if(addCoordinates){
        fetchCordinates();
    }
    setAddCordinates(false);

  }, [addCordinates]);

  useEffect(() => {
    if(state !== undefined && row !== undefined && col !== undefined){
        addCoordinates();
    }
    
  }, [state,row, col]);
  
    const tableStyle = {
   
        border: '1px solid black', // Set the border style for the table
        
    };
    const height  = 20;
    const length  = 85;
    const numRows = 6;
    const numCols = 6;

    const handleColumnClick = (rowIndex, colIndex) => {
        const isRed = cordinates.some(
            (coordinate) => coordinate.row === rowIndex && coordinate.col === colIndex && coordinate.status === "Error"
          );
          const isGrren = cordinates.some(
            (coordinate) => coordinate.row === rowIndex && coordinate.col === colIndex && coordinate.status === "OK"
          );
          const isGrren2 = cordinates.some(
            (coordinate) => coordinate.row === rowIndex && coordinate.col === colIndex && coordinate.status === "Ok"
          );
          const isGray= cordinates.some(
            (coordinate) => coordinate.row === rowIndex && coordinate.col === colIndex && coordinate.status === "Orord"
          );
          const isUndefined = cordinates.some(
            (coordinate) => coordinate.row === rowIndex && coordinate.col === colIndex && coordinate.status === undefined
          );
          
          if(isUndefined) 
          {
              setState("Orord")
          }
            if(isGray) 
            {
                setState("Error")
            }
            if(isRed)
            {
                setState("OK")
            }
            
            if(isGrren)
            {
                setState("Orord")
            }
            if(isGrren2)
            {
                setState("Orord")
            }
            
           
        setRow(rowIndex);
        setCol(colIndex);
      }
  
  const fetchCordinates = async () => {
    try {
      const response = await axios.get('https://localhost:49153/api/grids/'+ gridsId +'/cordinates');
      setCordinates(response.data);
    } catch (error) {
      console.error('Error fetching grids:', error);
    }
  };
  const addCoordinates = async () => {
    try {
       await axios.post('https://localhost:49153/api/grids/'+ gridsId +'/cordinates?status='+state+'&row='+row+'&col='+col);
       setAddCordinates(true);
    } catch (error) {
      console.error('Error fetching grids:', error);
    }
  };
  
  return (
    <div>
        <table style= {tableStyle}  >
            <tbody >
            {
            Array.from({ length: numRows }, (_, rowIndex) => ( 
                <tr key={rowIndex}>
                  {Array.from({ length: numCols }, (_, colIndex) => {
                    const isRed = cordinates.some(
                        (coordinate) => coordinate.row === rowIndex && coordinate.col === colIndex && coordinate.status === "Error"
                      );
                      const isGrren = cordinates.some(
                        (coordinate) => coordinate.row === rowIndex && coordinate.col === colIndex && coordinate.status === "OK"
                      );
                      const isGray= cordinates.some(
                        (coordinate) => coordinate.row === rowIndex && coordinate.col === colIndex && coordinate.status === "Orord"
                      );
                      let cellStyle = isRed ? { backgroundColor: 'red' } : {};
                        if(isRed)
                        {
                            cellStyle = { backgroundColor: 'red', width: `${length}px`, height: `${height}px`  }
                        }
                        
                        if(isGrren)
                        {
                            cellStyle = { backgroundColor: 'Green', width: `${length}px`, height: `${height}px` } 
                        }
                        
                        if(isGray) 
                        {
                            cellStyle = { backgroundColor: 'Gray', width: `${length}px`, height: `${height}px` }
                        }
                        
                      return (
                        <td key={`${rowIndex}-${colIndex}`} style={cellStyle} onClick={ () => handleColumnClick(rowIndex, colIndex)}>
                        </td>
                      );
                    })}
                </tr>
            ))}
            
            </tbody>
          </table>
    </div>
  );
};
export default GridPage;