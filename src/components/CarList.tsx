import { useState, useEffect } from 'react';
import type { CarData } from "../types";
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

function CarList() {
  const [cars, setCars] = useState<CarData[] | null>();

  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', width: 200 },
    { field: 'model',  headerName: 'Model', width: 200 },
    { field: 'color',  headerName: 'Color' },
    { field: 'fuel',  headerName: 'Fuel' },
    { field: 'modelYear', headerName: 'Model year' },
    { field: 'price',  headerName: 'Price (€)' }
  ]

  useEffect(() => {
    fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error when fetching cars");
      }

      return response.json();
    })
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }, []);

  return(
    <div style={{ width: '90%', height: 500 }}>
      <DataGrid 
        rows={cars || []}
        columns={columns}
        getRowId={ row => row._links.self.href}
      />
    </ div>
  );
}

export default CarList
 