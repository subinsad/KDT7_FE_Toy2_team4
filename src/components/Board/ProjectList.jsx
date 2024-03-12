import React from "react";
import { Badge, PagingItem, Table, TablePaging } from "../GlobalStyles";
import Avatar, { AvatarGroup } from "../Avatar";
import { useSelector } from "react-redux";

const ProjectList = ({ ...props }) => {
  const { myProjectInfo } = useSelector((state) => state.projectSlice);

  return (
    <>
      <Table {...props}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Date</th>
            <th>Status</th>
            <th>Member</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{myProjectInfo?.title}</td>
            <td>
              {myProjectInfo?.start} ~ {myProjectInfo?.end}
            </td>
            <td>
              <Badge $color="success">{myProjectInfo?.state === "" ? "in Prograss" : ""}</Badge>
            </td>
            <td>
              <AvatarGroup>
                {myProjectInfo.member?.map((user) => {
                  return <Avatar src={user.userImg} name={user.name} key={user.uid} />;
                })}
              </AvatarGroup>
            </td>
          </tr>
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

export default ProjectList;
