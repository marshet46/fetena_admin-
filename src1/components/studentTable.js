
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


import axios from "axios";

function StudentTable() {
  const [users, setUsers] = useState([]);


  const columns = [
    { dataField: "id", text: "Id", sort: true },
    { dataField: "first_name", text: "First Name", sort: true },
    { dataField: "last_name", text: "Last Name", sort: true },
    { dataField: "phone", text: "Phone", sort: true },
    { dataField: "grade", text: "Grade", sort: true },
    { dataField: "goal", text: "Goal", sort: true },
    { dataField: "email", text: "Email", sort: true },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
        <div>
          <button
            className="btn btn-sm btn-primary mr-2"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const defaultSorted = [
    {
      dataField: "first_name",
      order: "desc",
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/user-list/").then((response) => {
      setUsers(response.data.data);
    });
  }, []);

  const handleEdit = (id) => {
    // Implement edit functionality
    // Make a PUT request to http://127.0.0.1:8000/users/user-update/
    // with the id of the user to be edited
    console.log("Edit user with id", id);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    // Make a DELETE request to http://127.0.0.1:8000/users/user-delete/
    // with the id of the user to be deleted
    console.log("Delete user with id", id);
  };

  return (
    <div className="App">
      <h5>
       List of students
      </h5>

      <BootstrapTable
        bootstrap4
        keyField="id"
        data={users}
        columns={columns}
        defaultSorted={defaultSorted}
        pagination={pagination}
      />
    </div>
  );
}

export default StudentTable;