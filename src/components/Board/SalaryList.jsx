import React from "react";
import { Badge, Button, Grid, GridColumnSpan, PagingItem, Table, TablePaging } from "../GlobalStyles";
import Avatar from "../Avatar";
import styled from "styled-components";
import Dialog from "../Dialog";
import Input from "../Input";
import Radio, { RadioGroup } from "../Radio";
import { useLocation, useNavigate } from "react-router-dom";
const Name = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8rem;
`;
const SalaryList = ({ ...props }) => {
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
            <th>Category</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Name>
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} size={"xs"} />
                Mr. HA
              </Name>
            </td>
            <td>과장</td>
            <td>12</td>
            <td>1,000,000원</td>
            <td>
              <Badge $color="danger">퇴근</Badge>
            </td>
            <td>
              <Badge $color="danger">성과급</Badge>
            </td>
            <td>
              <Button $color="primary" $size="xs" popovertarget="modify">
                수정
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Name>
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} size={"xs"} />
                Mr. Kim
              </Name>
            </td>
            <td>과장</td>
            <td>12</td>
            <td>500,000원</td>
            <td>
              <Badge $color="secondary">휴가</Badge>
            </td>
            <td>
              <Badge $color="warning">특수보너스</Badge>
            </td>
            <td>
              <Button $color="primary" $size="xs" popovertarget="modify">
                수정
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Name>
                <Avatar src={"https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"} size={"xs"} />
                Mr. So
              </Name>
            </td>
            <td>과장</td>
            <td>10</td>
            <td>3,200,000원</td>
            <td>
              <Badge $color="success">근무중</Badge>
            </td>
            <td>
              <Badge $color="primary">급여</Badge>
            </td>
            <td>
              <Button $color="primary" $size="xs" popovertarget="modify">
                수정
              </Button>
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

      <Dialog id={"modify"}>
        <Grid $col="2" className="text-left">
          <div>
            <Input type="text" plainText label="name" labelText="Name" readOnly="readonly" value="Mr.HA" />
          </div>
          <div>
            <Input type="text" plainText label="job" labelText="Job Position" readOnly="readonly" value="과장" />
          </div>
          <GridColumnSpan $span="2">
            <RadioGroup title="Category">
              <Radio value="급여" checked={true} id="ra3_1" name="rag2_2" color="primary" />
              <Radio value="성과급" id="ra3_2" name="rag2_2" color="primary" />
              <Radio value="특수보너스" id="ra3_3" name="rag2_2" color="primary" />
            </RadioGroup>
          </GridColumnSpan>
          <GridColumnSpan $span="2">
            <Input type="text" label="cost" labelText="Salary" value="1,000,000" />
          </GridColumnSpan>
        </Grid>
        <div>
          <Button $color="success" $size="sm" popovertarget="modify" popovertargetaction="hide" className="mr2">
            Modify
          </Button>
          <Button $color="secondary" $size="sm" popovertarget="modify" popovertargetaction="hide">
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default SalaryList;
