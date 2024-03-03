import React from "react";
import { Badge, PagingItem, Table, TablePaging } from "../GlobalStyles";

const AttendanceList = ({ ...props }) => {
  return (
    <>
      <Table {...props}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>휴가입니다.</td>
            <td>2024.02.20 ~ 2024.03.20</td>
            <td>
              <Badge $color="success">휴가</Badge>
            </td>
            <td>
              <Badge $color="success">승인</Badge>
            </td>
          </tr>
          <tr>
            <td>신청합니다.</td>
            <td>2024.02.20</td>
            <td>
              <Badge $color="warning">조퇴</Badge>
            </td>
            <td>
              <Badge $color="primary">대기</Badge>
            </td>
          </tr>
          <tr>
            <td>신청합니다.</td>
            <td>2024.02.20 ~ 2024.03.20</td>
            <td>
              <Badge $color="danger">경조사</Badge>
            </td>
            <td>
              <Badge $color="danger">반려</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
      <TablePaging>
        <PagingItem>Previous</PagingItem>
        <PagingItem $active>1</PagingItem>
        <PagingItem>2</PagingItem>
        <PagingItem>3</PagingItem>
        <PagingItem>4</PagingItem>
        <PagingItem>5</PagingItem>
        <PagingItem>Next</PagingItem>
      </TablePaging>
    </>
  );
};

export default AttendanceList;
