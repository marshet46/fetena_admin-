import React, {useEffect} from 'react';
import {  GridComponent, ColumnsDirective,
  ColumnDirective, Resize, Sort, ContextMenu,
  Filter, Page, ExcelExport, PdfExport, Edit, Inject,
  Toolbar,

  EditSettings,
  toolbarClick,
  Search } from '@syncfusion/ej2-react-grids';

import { contextMenuItems, examGrid } from '../data/dummy';
import { Header,Loader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExam, fetchExams, updateExam } from '../redux/features/exam/exam-slice';
import 'bootstrap/dist/css/bootstrap.min.css';
const Exams = () => {
 
  const dispatch = useDispatch();
  const exams = useSelector(state => state.exams.exams);
  const status = useSelector(state => state.exams.status);
  const error = useSelector(state => state.exams.error);


  //grid
  let gridInstance;

    const filterOptions = {
    ignoreAccent: true,
    type:"menu"
  }
 function updateExamHandler(args) {
    if (args.requestType === 'save') {
      const newItem = args.data;    
    dispatch(updateExam(newItem ));
   
    }
 }
  
  const editClick=() =>{
    if (gridInstance.getSelectedRecords().length !== 1) {
      alert('Please select a single record to edit.');
      return;
    }
    const selectedData = gridInstance.getSelectedRecords()[0];
    dispatch(updateExam(selectedData[0]));
    
  }

  const deleteClick=() =>{
    const selectedData = gridInstance.getSelectedRecords();
   dispatch(deleteExam(selectedData[0].id))
  }

  const pdfExportClick=()=>{
    gridInstance.pdfExport();
  }

  const excelExportClick=()=> {
    gridInstance.excelExport();
  }

   const toolbar = [
     {
      text: 'Edit', id: 'Edit',
      prefixIcon: 'e-edit',
      tooltipText: 'Edit',
      click: () => editClick(),
     },
   
     {
      text: 'Delete', id: 'Delete',
      prefixIcon: 'e-delete',
      tooltipText: 'Delete',
      click: () => deleteClick(),
     },
     'Search',
    {
      text: 'ExcelExport', id: 'ExcelExport',
      prefixIcon: 'e-pdf-export',
      tooltipText: 'Export PDF',
     click: () => excelExportClick(),
    },
     {
      text: 'PdfExport', id: 'PdfExport' ,
      prefixIcon: 'e-excel-export',
       tooltipText: 'Export Excel',
       click: () => pdfExportClick(),
      
    },
  ];


  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog',
    
  };

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

   if (status === 'loading') {
    return <Loader/>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
               id="gridcomp"
        ref={(grid) => (gridInstance = grid)}
        dataSource={exams}
        allowFiltering={true}
        filterSettings={filterOptions}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editSettings}
        toolbar={toolbar}
        actionBegin={updateExamHandler}
        toolbarClick={toolbarClick}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {examGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar, Search]} />

      </GridComponent>
    </div>
  );
};
export default Exams;
