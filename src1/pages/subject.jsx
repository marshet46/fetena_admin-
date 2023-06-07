import React,{useEffect, useState} from 'react';
import {
  GridComponent, ColumnsDirective,
  ColumnDirective, Resize, Sort, ContextMenu,
  Filter, Page, ExcelExport, PdfExport, Edit, Inject, EditSettingsModel,
  Toolbar,

  EditSettings,
  toolbarClick,
  Search
} from '@syncfusion/ej2-react-grids';
// import {  DialogActionsBar } from '@syncfusion/ej2-react-buttons';
import { Popup } from '@syncfusion/ej2-popups';


import { contextMenuItems, subjectsGrid } from '../data/dummy';
import { Header, Loader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubjects, createSubject, updateSubject, deleteSubject } from '../redux/features/subject/subject-slice';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forms from './form';
import { imageUploading } from '@syncfusion/ej2-react-richtexteditor';

const Subjects = () => {


     const [isOpen, setIsOpen] = useState(false);

     const toggle = () => setIsOpen(!isOpen);


  const dispatch = useDispatch();

  const subjectList = useSelector((state) => state.subjects.subjects);
  const status = useSelector((state) => state.subjects.status);
  const error = useSelector((state) => state.subjects.error);



 function updateSubjectHandler(args) {
    if (args.requestType === 'save') {
      const newItem = args.data;
    dispatch(updateSubject(newItem ));

    }
 }


  const filterOptions = {
    ignoreAccent: true,
    type:"menu"
  }


   let gridInstance;

  const editClick=() =>{
    if (gridInstance.getSelectedRecords().length !== 1) {
      alert('Please select a single record to edit.');
      return;
    }
    const selectedData = gridInstance.getSelectedRecords()[0];
   const data= dispatch(updateSubject(selectedData[0]));
   console.log(selectedData[0]);
  }

  const deleteClick=() =>{
    const selectedData = gridInstance.getSelectedRecords();
  const id= dispatch(deleteSubject(selectedData[0].id))
   if(status==='succeeded')
   alert("Subject deleted successfully");
   else alert("subject not deleted ");

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
    dialogTemplate: '#dialogTemplate',
  };

   function toolbarClick(args) {
    if (args.item.id === 'Grid_excelexport') {
      // call your Excel export function
    }
    if (args.item.id === 'Grid_pdfexport') {
      // call your PDF export function
    }
  }
  useEffect(() => {
    dispatch(fetchSubjects());

  }, [dispatch]);
  if (status === 'loading') {
    return <Loader/>;
  }
  if (status === 'failed') {
    return <div className='bg-danger h2 text-white  p-3'>The server  responds: {error} please try again!!</div>;
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" >

      <Container>
      <Row>
        <Col xs={6}>
           <Header category="Page" title="Subjects" />
          </Col>
          <Col xs={6}>

      <Button className='btn-primary m-10 ' onClick={toggle} style={{float:'right'}}>Add subject</Button>
          </Col>
          </Row>
        {isOpen && <Forms isOpen={isOpen} toggle={toggle} style={{marginTop:"40px"}} />}
          </Container>

      <GridComponent
        id="gridcomp"
        ref={(grid) => (gridInstance = grid)}
        dataSource={subjectList}
        allowFiltering={true}
        filterSettings={filterOptions}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editSettings}
        toolbar={toolbar}
        actionBegin={updateSubjectHandler}
        toolbarClick={toolbarClick}

      >

        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {subjectsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar, Search]} />

      </GridComponent>
    </div>
  );
};
export default Subjects;
