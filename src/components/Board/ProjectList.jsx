import React from "react";
import { Badge, PagingItem, Table, TablePaging } from "../GlobalStyles";
import Avatar, { AvatarGroup } from "../Avatar";

const ProjectList = ({ ...props }) => {
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
            <td>Hoffman Website</td>
            <td>2024.02.20 ~ 2024.03.20</td>
            <td>
              <Badge $color="success">In progress</Badge>
            </td>
            <td>
              <AvatarGroup>
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
              </AvatarGroup>
            </td>
          </tr>
          <tr>
            <td>Hoffman Website</td>
            <td>2024.02.20 ~ 2024.03.20</td>
            <td>
              <Badge $color="danger">Completed</Badge>
            </td>
            <td>
              <AvatarGroup>
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
              </AvatarGroup>
            </td>
          </tr>
          <tr>
            <td>Hoffman Website</td>
            <td>2024.02.20 ~ 2024.03.20</td>
            <td>
              <Badge $color="primary">Pending</Badge>
            </td>
            <td>
              <AvatarGroup>
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} />
              </AvatarGroup>
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

export default ProjectList;
