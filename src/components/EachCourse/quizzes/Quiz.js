
import React from 'react';
import { Icon,Input, Form, Select, Button} from 'antd';
import { Box } from '@material-ui/core';
const { Option } = Select;

const mq = window.matchMedia("(max-width:480px)");
const FormItem = (props) => {
    const {newkeys, remove, add1, remove1, handleSelect, options,  getFieldDecorator, getFieldValue, isRightAnswerEmpty } = props;
    var answekeys = [];
    var correctAnswer = [];
    return(
        <>
    {newkeys.map((k, index) => {
        answekeys = getFieldValue("choicekey" + k);
        if (
          answekeys === undefined ||
          answekeys === null ||
          answekeys.length === 0
        )
          answekeys = [];
        return (
          <div
            key={index}
            style={{ border: "1px dotted black" }}
            className="m-1 p-5 bg-light"
          >
            {newkeys.length > 1 ? (
              <Icon
                style={{ color: "red" }}
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => remove(k)}
              />
            ) : null}
 
 <Form.Item  className="Quest" label={mq.matches ? null : "Question Mark"}>
              {getFieldDecorator(`grades[${k}]`, {
                validate: [
                  {
                    trigger: ["onBlur"],
                    rules: [
                      {
                        required: true,
                        message: "Please enter Question Mark",
                      },
                    ],
                  },
                ],
              })(
                <Input autoFocus={false} style={{width:'15%'}} type="number" placeholder="Enter Marks" />
              )}
            </Form.Item>
            <Form.Item className="Quest" label={mq.matches ? null : "Question"}>
              {getFieldDecorator(`question[${k}]`, {
                validate: [
                  {
                    trigger: ["onBlur"],
                    rules: [
                      {
                        required: true,
                        message: "Please enter your Question!",
                      },
                    ],
                  },
                ],
              })(
                <Input autoFocus={false}  type="" placeholder="Enter Question" />
              )}
            </Form.Item>
           
            <div>
              {answekeys &&
                answekeys.length > 0 &&
                answekeys.map((l, index1) => {
                  return (
                    <li
                      key={index1}
                      className={
                        correctAnswer && correctAnswer.indexOf(l) !== -1
                          ? "active"
                          : ""
                      }
                    >
                      <Form.Item
                        className="row"
                        label={mq.matches ? null : index1 + 1}
                      >
                        {getFieldDecorator(`questions[${k}]choice[${l}]`, {
                          validate: [
                            {
                              trigger: ["onBlur"],
                              rules: [
                                {
                                  required: true,
                                  message: "Please enter your Choice",
                                },
                              ],
                            },
                          ],
                        })(
                          <Input
                            autoFocus={false}
                            className="col-9 col-sm-10"
                            placeholder=" Enter Choices"
                          />
                        )}
                        {answekeys.length > 2 ? (
                          <span
                            className="col-3 col-sm-2"
                            onClick={() => remove1(k, l)}
                          >
                            <Icon type="delete"
                            style={{color: "red" , cursor: "pointer"}} />
                          </span>
                        ) : null}
                      </Form.Item>
                    </li>
                  );
                })}
              {answekeys &&
              answekeys.length > 0 &&
              isRightAnswerEmpty !== undefined &&
              isRightAnswerEmpty === k ? (
                <div style={{ color: "#f5222d", paddingLeft: "35px" }}>
                  Please select choice!
                </div>
              ) : (
                ""
              )}
              {answekeys.length < 5 ? (
                <div
                  onClick={() => add1(k)}
                  style={{ display: "flex", width: "100px" }}
                >
                  <Button type="dashed">+ Add Choice</Button>
                </div>
              ) : null}
            </div>
            <Form.Item
              onClick={() => handleSelect(k)}
              label={mq.matches ? null : "Answer"}
            >
              {getFieldDecorator(`answer[${k}]`, {
                rules: [{ required: true, message: "Please select answer!" }],
              })(
                <Select placeholder="Please select answer" showArrow={false}>
                  {options ? (
                      options.map((i, index) => {
                      return i !== undefined && i!=="" ? (
                        <Option key={index} value={i}>
                          {i}
                        </Option>
                      ) : null;
                    })
                  ) : (
                    <Option disabled value="none">
                      Enter Choices for Answer
                    </Option>
                  )}
                </Select>
              )}
            </Form.Item>
          </div>
        );
      })
    }
      </>
      )
    
}
 
export default FormItem;