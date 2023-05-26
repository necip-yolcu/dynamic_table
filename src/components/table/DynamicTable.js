import React, { useState, useEffect } from 'react';
import DynamicTableService from "../../services/DynamicTableServices"
import { FiPlus, FiX } from 'react-icons/fi';
import './DynamicTable.css';

const DynamicTable = () => {
  const [name, setName] = useState("");
  const [rowCount, setRowCount] = useState(3);
  const [colCount, setColCount] = useState(3);
  const [tableHeight, setTableHeight] = useState(50);
  const [tableWidth, setTableWidth] = useState(600);
  const initialWidth = tableWidth / colCount;
  const [tableWidths, setTableWidths] = useState(Array.from({ length: colCount }, () => initialWidth));
  const [tableHeights, setTableHeights] = useState(Array.from({ length: rowCount }, () => 45));
  const [cellImages, setCellImages] = useState(Array.from({ length: rowCount }, () =>
    Array.from({ length: colCount }, () => '')
  ));

  useEffect(() => {
    setCellImages(prevCellImages => {
      const updatedCellImages = [...prevCellImages];
      if (rowCount > prevCellImages.length) {
        for (let i = prevCellImages.length; i < rowCount; i++) {
          updatedCellImages.push(Array.from({ length: colCount }, () => ''));
        }
      }
      return updatedCellImages;
    });
  }, [rowCount, colCount]);

  const handleWidthChange = (index, value) => {
    const newWidths = [...tableWidths];
    newWidths[index] = parseInt(value);
    setTableWidths(newWidths);
    const sumWidth = newWidths.reduce((acc, curr) => acc + curr, 0);
    setTableWidth(sumWidth);
  };

  const handleHeightChange = (index, value) => {
    const newHeights = [...tableHeights];
    newHeights[index] = parseInt(value);
    setTableHeights(newHeights);
    const sumHeight = newHeights.reduce((acc, curr) => acc + curr, 0);
    setTableHeight(sumHeight);
  };

  const handleUploadImage = (colIndex, rowIndex, event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newCellImages = [...cellImages];
        newCellImages[rowIndex][colIndex] = reader.result;
        setCellImages(newCellImages);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log('cellImages:', cellImages);


  const handleSaveChanges = () => {
    // Performing the save operation here
    console.log('Saving changes...');
    console.log('Table Name:', name);
    console.log('Table Heights:', tableHeights);
    console.log('Table Widths:', tableWidths);
    console.log('Cell Images:', cellImages);
    console.log('rowCount Images:', rowCount);
    console.log('colCount Images:', colCount);
    console.log('tableHeight Images:', tableHeight);
    console.log('tableWidth Images:', tableWidth);
  };

  const a = async () => await DynamicTableService.getAllTableData();
  console.log('aaa', a);




  return (
    <div >
      <div style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "25px",
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: `50%`,
      }}>
        <h5>Enter Name Of the Table:</h5>
        <label>
          Name:{"\t"}
          <input
            type="text"
            className="header-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <hr class="solid"></hr>

        <h5>Enter The Table Width And Height:</h5>
        <label>
          Height:
          <input
            type="number"
            className="header-input"
            value={tableHeight}
            onChange={(e) => setTableHeight(parseInt(e.target.value))}
          />{" "}
          px
        </label>

        <label> | </label>

        <label>
          Width:
          <input
            type="number"
            className="header-input"
            value={tableWidth}
            onChange={(e) => setTableWidth(parseInt(e.target.value))}
          />{" "}
          px
        </label>

        <hr class="solid"></hr>

        <h5>Enter The Row And Columns:</h5>
        <label>
          Rows:
          <input
            type="number"
            className="header-input"
            value={rowCount}
            onChange={(e) => setRowCount(parseInt(e.target.value))}
          />
        </label>

        <label>
          Columns:
          <input
            type="number"
            className="header-input"
            value={colCount}
            onChange={(e) => setColCount(parseInt(e.target.value))}
          />
        </label>

        <br />

      </div>

      <div style={{
        marginLeft: "25px",
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        width: `${tableWidth + 150}px`,
      }}>
        <button className='save-button'

          onClick={handleSaveChanges}>
          Save Changes
        </button>

        <table
          style={{
            width: `${tableWidth}px`,
            height: `${tableHeight}px`,
            borderStyle: 'none',
            borderColor: 'black',
          }}
          className="card-table"
        >
          <thead>
            <tr>
              <th style={{ borderStyle: 'none' }}></th>
              {Array.from({ length: colCount }, (_, colIndex) => (
                <th key={colIndex} style={{ borderStyle: 'none', borderColor: 'black' }}>
                  <label>
                    y{colIndex + 1}
                    <input
                      type="number"
                      className="header-input"
                      value={tableWidths[colIndex]}
                      onChange={(e) => handleWidthChange(colIndex, e.target.value)}
                    />
                  </label>

                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowCount }, (_, rowIndex) => (
              <tr style={{ alignItems: 'center' }} key={rowIndex}>
                <th
                  style={{ borderStyle: 'none', borderColor: 'black' }}
                >
                  <label>
                    x{rowIndex + 1}
                    <input
                      type="number"
                      className="header-input"
                      style={{ width: "50px" }}
                      value={tableHeights[rowIndex]}
                      onChange={(e) => handleHeightChange(rowIndex, e.target.value)}
                    />
                  </label>
                </th>
                {Array.from({ length: colCount }, (_, colIndex) => (
                  <td
                    style={{
                      width: `${tableWidths[colIndex]}px`,
                      height: `${tableHeights[rowIndex]}px`,
                      borderStyle: 'none',
                      position: 'relative',
                      padding: '8px',
                    }}
                    key={colIndex}
                  >
                    <div
                      style={{
                        border: '1px solid black',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3s)',
                        width: `${tableWidths[colIndex]}px`,
                        height: `${tableHeights[rowIndex]}px`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >

                      <img
                        src={cellImages[rowIndex] && cellImages[rowIndex][colIndex]}
                        alt={`${rowIndex + 1}-${colIndex + 1}`}
                        style={{ width: '100%', height: '100%', borderRadius: '7px', }}
                      />

                      <input
                        type="file"
                        className="header-input"
                        id={`upload-button-${rowIndex}-${colIndex}`}
                        style={{ display: 'none' }}
                        onChange={(e) => handleUploadImage(colIndex, rowIndex, e)}
                      />

                      <div
                        className="w-full md:w-56 lg:w-56 xl:w-56"
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                        }}
                      >
                        <button
                          className='button1'
                          onClick={() => {
                            const fileInput = document.getElementById(`upload-button-${rowIndex}-${colIndex}`);
                            fileInput.click();
                          }}
                        >
                          <span className="mr-3">
                            <FiPlus />
                          </span>
                        </button>

                        {cellImages[rowIndex] && cellImages[rowIndex][colIndex] && (
                          <button
                            className='button2'
                            onClick={() => {
                              const newCellImages = [...cellImages];
                              newCellImages[rowIndex][colIndex] = '';
                              setCellImages(newCellImages);
                            }}
                          >
                            <span className="mr-3">
                              <FiX />
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </td>



                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
