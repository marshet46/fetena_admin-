import React,{useEffect,useState} from 'react';
import {   GridComponent, ColumnsDirective,
  ColumnDirective, Resize, Sort, ContextMenu,
  Filter, Page, ExcelExport, PdfExport, Edit, Inject,
  Toolbar,
  toolbarClick,
  Search} from '@syncfusion/ej2-react-grids';
import { Container, Row, Col } from 'react-bootstrap';
import {contextMenuItems, questionsGrid } from '../data/dummy';
import { Header, Loader } from '../components';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, createQuestion, updateQuestion, deleteQuestion } from '../redux/features/questions/question-slice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forms from './postData/addQuestion';

const Questions = () => {

  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  //redux
  const dispatch = useDispatch();

  const questions = useSelector(state => state.questions.questions);
  const status = useSelector(state => state.questions.status);
  const error = useSelector(state => state.questions.error);

  //grid
  let gridInstance;

    const filterOptions = {
    ignoreAccent: true,
    type:"menu"
  }

  const editClick=() =>{
    if (gridInstance.getSelectedRecords().length !== 1) {
      alert('Please select a single record to edit.');
      return;
    }
    const selectedData = gridInstance.getSelectedRecords()[0];
    dispatch(updateQuestion(selectedData[0]));

  }

  const deleteClick=() =>{
    if (gridInstance.getSelectedRecords().length !== 1) {
      alert('Please select a single record to delete.');
      return;
    }
    const selectedData = gridInstance.getSelectedRecords();
   dispatch(deleteQuestion(selectedData[0].id))
   if(status==='succeeded')
   alert("Question deleted successfully");
   else alert("Question not deleted ");

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
    mode: 'Batch',

  };

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (status === 'loading') {
    return <Loader/>;
  }

  if (status === 'failed') {
    return <div className='bg-danger h2 text-white  p-3'>The server  responds: {error} please try again!!</div>;
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
           <Container>
      <Row>
        <Col xs={6}>
           <Header category="Page" title="Questions" />
          </Col>
          <Col xs={6}>

      <Button className='btn-primary m-10 ' onClick={toggle} style={{float:'right'}}>Add Question</Button>
          </Col>
          </Row>
        {isOpen && <Forms isOpen={isOpen} toggle={toggle} style={{marginTop:"40px"}} />}

          </Container>

      <GridComponent
        id="gridcomp"
         ref={(grid) => (gridInstance = grid)}
        dataSource={questions}
        allowFiltering={true}
        filterSettings={filterOptions}
        allowPaging
        pageSettings={{pageCount:6}}
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editSettings}
        toolbar={toolbar}
        toolbarClick={toolbarClick}
              >

        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {questionsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar, Search]} />

      </GridComponent>
    </div>
  );
};
export default Questions;
