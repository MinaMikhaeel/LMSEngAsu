import React from 'react';
import {Form, Input, TimePicker, InputNumber, Button, Icon, Divider, message} from 'antd'
import 'antd/dist/antd.css';
import FormItem from './Quiz';
import axios from 'axios'
import { Fab, TextField, Tooltip } from '@material-ui/core';
import Titles from './quizTitles'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
let uuid = 1;
let uuid1 = 2;
class CreateQuiz extends React.Component {
  
        state = {
          options: null,
          submit: false,
          open: false,
          OpenQuiz:false,
          title: "",
          startDate: "",
          endDate: "",
          time: "",
          date: "",
          marks: '',
        };
        remove = (k) => {
            const { form } = this.props;
            // can use data-binding to get
            const keys = form.getFieldValue("newkeys");
            if (keys.length === 1) {
              return;
            }
        
            form.setFieldsValue({
              newkeys: keys.filter((key) => key !== k),
            });
          };
        
          add = () => {
            this.setState({ options: null });
            const { form } = this.props;
            const keys = form.getFieldValue("newkeys");
            const nextKeys = keys.concat(uuid);
            uuid++;
            form.setFieldsValue({
              newkeys: nextKeys,
            });
          };
        
          remove1 = (k, l) => {
            const { form } = this.props;
            const keys = form.getFieldValue("choicekey" + k);
            let newkeys = [];
            if (keys) {
              newkeys = keys;
            } else {
              newkeys = [];
            }
            if (newkeys.length === 1) {
              //return;
            }
            form.setFieldsValue({
              ["choicekey" + k]: newkeys.filter((key) => key !== l),
            });
          };
        
          add1 = (index) => {
            const { form } = this.props;
            const keys = form.getFieldValue("choicekey" + index);
            let newkeys = [];
            if (keys) {
              newkeys = keys;
            } else {
              newkeys = [];
            }
            const nextKeys = newkeys.concat(uuid1);
            uuid1++;
            form.setFieldsValue({
              ["choicekey" + index]: nextKeys,
            });
          };
          handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
              if (!err) {
                let time = this.state.time.split(":");
                console.log(time);
                const secs = time[0] + time[1];
                console.log(secs)
                const questions = [];
                let answer = [];
                let question = [];
                let grades=[];
                let questionss = [];
                for (let i = 0; i < values.newkeys.length; i += 1) {
                  answer.push(values.answer[values.newkeys[i]]);
                  question.push(values.question[values.newkeys[i]]);
                  grades.push(values.grades[values.newkeys[i]]);
                  questionss.push(values.questions[values.newkeys[i]]);
                }
                for (let i = 0; i < values.newkeys.length; i += 1) {
                  questions.push({
                    question: question[i].trim(),
                    grades: grades[i],
                    answer: answer[i],
                    choices: questionss[i].choice.filter((el) => el !== null),
                  });
                }
                const quz = {
                  title: this.state.title.trim(),
                  total_marks:  grades.reduce((result,number)=> Number(result)+Number(number)),
                  time: secs,
                  startDate: this.state.startDate,
                  endDate:this.state.endDate,
                  questions,
                  course_code:this.props.course.course.code,
                  instructor_code:this.props.instructor_code,
                }
                console.log(quz,quz.total_marks);
                axios
                .post('https://eng-asu-lms.herokuapp.com/create', quz, {
                  headers: {
                    "Authorization": `Bearer ${this.props.token}`,
                  },
                })
                .then((res) => {
                  this.setState({submit:true,open:false})
                  console.log(res)
              })
                .catch((err)=>{
                  message.error("Error in Quiz Submittion")})
  
                this.props.createQuiz(quz);
              }
            });

          };
        handleSelect = (k) => {
            this.setState({ options: null });
            var values = this.props.form.getFieldsValue();
            let choices = [];
            if (values.questions !== null && values.questions !== undefined) {
              if (values.questions[k] !== null && values.questions[k] !== undefined) {
                choices = values.questions[k].choice.filter((el) => el !== null);
                this.setState({ options: choices });
              }
            }
          };
        handleHidden=(toggle)=>{
          this.setState({OpenQuiz:toggle})
        }
        render(){
            var newkeys = [];
            const { marks, options, submit } = this.state
            const { getFieldDecorator, getFieldValue } = this.props.form;
            getFieldDecorator("newkeys", { initialValue: [0] });
            newkeys = getFieldValue("newkeys");
            newkeys.map((i) => {
            return getFieldDecorator("choicekey" + i, { initialValue: [0, 1] });
            });
            const formItemLayout = {
                labelCol: {
                  xs: { span: 12 },
                  sm: { span: 5 },
                },
                wrapperCol: {
                  xs: { span: 24 },
                  sm: { span: 19 },
                },
              };
 
    return ( 
<div>

<div style={{display:this.state.open?'none':'block'}}>
  <Titles submit={this.state.submit} hidden={this.handleHidden} />
</div>
<Button 
      type="primary"
      onClick={()=>this.setState({open:true,submit:false})}
      style={{display:this.state.open||this.state.OpenQuiz?'none':'block'}}
      >Create Quiz</Button>  
<div className="container py-5"  style={{ position:'relative' ,width: "93%", marginLeft: "21px",marginTop:"16px",display:!this.state.open?'none':'block'}}
    >
      <Tooltip color='primary' title= "close" style={{  fontSize:'16px'  ,position: "absolute",
    right: "5%",
    top: '0'}}
    onClick={()=>this.setState({open:false,submit:false})}>
        <Fab size='small'>
          x
        </Fab>
      </Tooltip>
  {/* {this.state.submit?message.success("Successfully created quiz"):null} */}
        <Form layout="inline">
            <h1 className="text-center" style={{textAlign:"center"}}>Quiz Create </h1>
            
            <Form.Item
              label="Title"
            >
              <Input
                placeholder="Quiz Title"
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Time">
            <TimePicker
                format={"mm:ss"}
                onChange={(time, timeString) =>
                  this.setState({ time: timeString })
                }
              />
            </Form.Item>
            <Form.Item label="Start Date">

            <TextField
    type="datetime-local"

    onChange={(date) => this.setState({ startDate: date.target.value  } )}
    />
            </Form.Item>

<Form.Item label="end Date">

         
<TextField
    type="datetime-local"

    onChange={(date) => this.setState({ endDate: date.target.value } )}
    />
            </Form.Item>

          </Form>
          <Form
            onSubmit={this.handleSubmit}
            layout="vertical"
            {...formItemLayout}
          >
            <Divider />
             
            <FormItem
            isRightAnswerEmpty={this.props.isRightAnswerEmpty}
            getFieldDecorator={getFieldDecorator}
            getFieldValue={getFieldValue}
            newkeys={newkeys}
            options={options}
            remove={this.remove}
            add1={this.add1}
            remove1={this.remove1}
            handleSelect={this.handleSelect}
            />
            
            <Form.Item className="text-center">
              <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                <Icon type="plus" /> Add Question
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.props.loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
    </div>
    );
}
}
const WrappedCreateQuiz = Form.create()(CreateQuiz);


export default WrappedCreateQuiz;