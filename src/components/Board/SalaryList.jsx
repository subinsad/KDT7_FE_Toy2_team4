import React from "react";
import { Button, PagingItem, Table, TablePaging } from "../GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SalaryTd from "../salaryComponents/SalaryTd";
import { v4 as uuidv4 } from 'uuid';


const SalaryList = ({ ...props }) => {
  const { allSalaryInfo } = useSelector((state) => state.salaryAdminSlice)
  const navigate = useNavigate();
  const gotoWrite = () => {
    navigate("/salary/write");
  };

  return (
    <>
      <div className="align right mb3">
        <Button $color="primary" onClick={gotoWrite}>
          급여지급
        </Button>
      </div>
      <Table {...props}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Position</th>
            <th>Working Month</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Salary Type</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allSalaryInfo?.map((item) => {
            return (
              <SalaryTd
                key={uuidv4()}
                name={item.name}
                userImg={item.userImg}
                position={item.position}
                salary={item.salary}
                type={item.type}
                uid={item.uid}
                tdId={uuidv4()}
              />
            )
          })}
        </tbody>
      </Table>

      {/* <TablePaging>
        <PagingItem>Previous</PagingItem>
        <PagingItem $active>1</PagingItem>
        <PagingItem>2</PagingItem>
        <PagingItem>3</PagingItem>
        <PagingItem>4</PagingItem>
        <PagingItem>5</PagingItem>
        <PagingItem>Next</PagingItem>
      </TablePaging> */}
    </>
  );
};

export default SalaryList;
