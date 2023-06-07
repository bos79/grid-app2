import React, { useEffect, useState } from 'react';
import GridPage from './GridCells';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function App() {
  const [grids, setGrids] = useState([]);
  const [cordinates, setCordinates] = useState([]);
  const [gridId, setGridId] = useState(2);
  const [name, setName] = useState();
  const [inputValue, setInputValue] = useState();
  const [deleteId, setDeleteID] = useState();
  const [isDeleteId, setIsDeleteID] = useState(false);
  const [inputIsDone, setInputIsDone] = useState(false);

  useEffect(() => {
    
    fetchGrids();
    
  }, []);

  useEffect(() => {
    if(isDeleteId){
      fetchGrids();
     
    }
    setIsDeleteID(false);
  }, [isDeleteId]);

  useEffect(() => {
    if(inputIsDone){
      fetchGrids();
      
    }
    setInputIsDone(false);
  }, [inputIsDone]);

  useEffect(() => {
    if(name !== undefined){
      addGrid();
    }
  }, [name]);
  useEffect(() => {
    if(deleteId !== undefined){
      deleteGrid();
    }
    
  }, [deleteId]);


  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };


  const fetchGrids = async () => {
    try {
      const response = await axios.get('https://localhost:49153/api/grids');
      setGrids(response.data);
    } catch (error) {
      console.error('Error fetching grids:', error);
    }
  };
  const addGrid = async () => {
    try {
      await axios.post('https://localhost:49153/api/grids/'+ name +'?gridId='+gridId );
      setInputIsDone(true);
    } catch (error) {
      console.error('Error fetching grids:', error);
    }
  };
  const deleteGrid = async () => {
    try {
      await axios.delete('https://localhost:49153/api/grids/'+ deleteId );
      setIsDeleteID(true);
    } catch (error) {
      console.error('Error fetching grids:', error);
    }
  };
 
  const handleGridClick = (gridId) => {
    setGridId(gridId);
  }
  const handleAddClick = () => {
    setName(inputValue);
    setInputValue('');
    fetchGrids();
    
  }
  const deleteClick = (id) => {
    setDeleteID(id);
    
  }
 
  return (
    <ThemeProvider theme={theme}>
    <div style={containerStyle}>
      <h2 >Status</h2>
     <GridPage key= {gridId}  GridId = {gridId} ></GridPage> 
     <TableContainer style={{ width: 530 }}>
      <Table  size="small" aria-label="grid table">
      <TableBody>
          <TableRow style={{width: 480}} >  
            <TableCell style={{width: 480}} align="right"><input
            type="text"
            width={300}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ></input></TableCell>
            <TableCell align="left"><button onClick={ () => handleAddClick()}>Save</button></TableCell>
            <TableCell align="right"></TableCell>
            
            
          </TableRow>
          </TableBody>
        <TableBody>
          {grids.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.name} {row.description}</TableCell>
              <TableCell align="right"><Button color='neutral' onClick={ () => handleGridClick(row.id)} size="small" variant="outlined" startIcon={<UploadOutlinedIcon />}> Activate</Button></TableCell>
              <TableCell align="left"> <Button color='neutral' onClick={ () => deleteClick(row.id)} size="small" variant="outlined" startIcon={<HighlightOffIcon />}> Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </ThemeProvider>
  );
}

export default App;

