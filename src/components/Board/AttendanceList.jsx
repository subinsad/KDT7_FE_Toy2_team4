import React from "react";
import { Badge, Button, Grid, GridColumnSpan, PagingItem, Table, TablePaging } from "../GlobalStyles";
import Dialog from "../Dialog";
import Input from "../Input";
import Radio, { RadioGroup } from "../Radio";

const AttendanceList = ({ ...props }) => {
  return (
    <>
      <Table {...props}>
        <colgroup>
          <col />
          <col style={{ width: "220px" }} />
          <col style={{ width: "150px" }} />
          <col style={{ width: "150px" }} />
          <col style={{ width: "100px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Category</th>
            <th>Status</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>휴가입니다.</td>
            <td>2024.02.20 ~ 2024.03.20</td>
            <td>
              <Badge $color="primary">휴가</Badge>
            </td>
            <td>
              <Badge $color="success">승인</Badge>
            </td>
            <td>
              <Button $color="primary" $size="xs" popovertarget="settings">
                설정
              </Button>
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
            <td>
              <Button $color="primary" $size="xs" popovertarget="settings">
                설정
              </Button>
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
            <td>
              <Button $color="primary" $size="xs" popovertarget="settings">
                설정
              </Button>
            </td>
          </tr>
          <tr>
            <td>신청합니다.</td>
            <td>2024.02.20 ~ 2024.03.20</td>
            <td>
              <Badge $color="secondary">기타</Badge>
            </td>
            <td>
              <Badge $color="danger">반려</Badge>
            </td>
            <td>
              <Button $color="primary" $size="xs" popovertarget="settings">
                설정
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

      <Dialog id={"settings"}>
        <div className="text-left">
          <RadioGroup title="Category">
            <Radio value="승인" checked={true} id="settingRadio1" name="settingRadio" color="success" />
            <Radio value="대기" id="settingRadio2" name="settingRadio" color="primary" />
            <Radio value="반려" id="settingRadio3" name="settingRadio" color="danger" />
          </RadioGroup>
        </div>
        <div>
          <Button $color="success" $size="sm" popovertarget="settings" popovertargetaction="hide" className="mr2">
            설정
          </Button>
          <Button $color="secondary" $size="sm" popovertarget="settings" popovertargetaction="hide">
            닫기
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default AttendanceList;
