'use client'
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { Button } from 'rsuite';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

interface IMyProps {date: Date, show: boolean, func: (date: Date) => void, setShowFunc: (boolean: boolean) => void}
const PopOpen: React.FC<IMyProps> = (props: IMyProps)=>{
    // let time: string = props.date.getHours() + ':' + props.date.getMinutes();
    let [newTime, setNewTime] = React.useState<String>('');
    // conver to 12 hour format
    // let hours = props.date.getHours();
    // let minutes = props.date.getMinutes();
    // let ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // let strTime = hours + ':' + minutes + ' ' + ampm;
    // time = strTime;
    let [title , setTitle] = React.useState<string>('');
    // function handleNewDate(e: React.ChangeEvent<HTMLInputElement>){
    //     setNewTime(e.target.value);
    //     let hours = parseInt(e.target.value.split(':')[0]);
    //     let minutes = parseInt(e.target.value.split(':')[1]);
    //     let ampm = hours >= 12 ? 'pm' : 'am';
    //     hours = hours % 12;
    //     hours = hours ? hours : 12; // the hour '0' should be '12'
    //     let strTime = hours + ':' + minutes + ' ' + ampm;
    //     time = strTime;
    // }
    function handleSubmit(){
        // var Datecase = parseInt(props.date.toDateString().split(' ')[2]);
        var Datecase:any = props.date.getDate();
        todoListsByDay[Datecase] = todoListsByDay[Datecase] ? [...todoListsByDay[Datecase], {time: String(newTime) , title: title}]: [{time: String(newTime), title: title}];
        console.log(todoListsByDay); 
        setNewTime('');

    }
    return (
       <div
         style={{
                backgroundColor: 'white',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                borderRadius: '10px',
                width: 'fit-content',      
         }}
         >
            
            <Button style={{position:'absolute',top:0,right:'2px'}} onClick = {() => props.func(props.date)}><CloseIcon/></Button>
            <h3>{props.date.toDateString()}</h3>
            <h4>Todo List</h4>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'StaticTimePicker',
        ]}
      >
        
        <DemoItem label="Static variant">
          <StaticTimePicker defaultValue={dayjs(props.date)} onChange={(e)=>{setNewTime(`${e.$H}:${e.$m}`)}}
          onAccept={(e)=>{props.setShowFunc(!props.show)}}
        //   disablePast
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
            {/* <input type="time" value={time} onChange={(e)=>{handleNewDate(e)}}/> */}
            <input type="text" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}/>
            <Button onClick={handleSubmit}>Add</Button>
            <br/>
            <ul>
                {getTodoList(props.date).map((item, index) => (
                  <li key={index}>
                    <b>{item.time}</b> - {item.title}
                  </li>
                ))}
            </ul>

            
         </div>
    );

}
type TodoItem = {
    time: string;
    title: string;
  };
  
  type TodoListsByDay = {
    [day: string]: TodoItem[];
  };
  const todoListsByDay: TodoListsByDay = {
    // 10: [
    //   { time: '10:30 am', title: 'Meeting' },
    //   { time: '12:00 pm', title: 'Lunch' }
    // ],
    // 15: [
    //   { time: '09:30 pm', title: 'Products Introduction Meeting' },
    //   { time: '12:30 pm', title: 'Client entertaining' },
    //   { time: '02:00 pm', title: 'Product design discussion' },
    //   { time: '05:00 pm', title: 'Product test and acceptance' },
    //   { time: '06:30 pm', title: 'Reporting' },
    //   { time: '10:00 pm', title: 'Going home to walk the dog' }
    // ]
    // Add more entries as needed
  };
  function getTodoList(date: Date): TodoItem[] {
    const day = date.getDate();
    return todoListsByDay[day] || [];
  }
  

const CalendarComp = () => {
    let [show, setShow] = React.useState<boolean>(false);
    const setShowFunc = (show: boolean) => {
        setShow(!show);
    }
    let [date, setDate] = React.useState<Date>(new Date());
    function handleSelect(date: Date) {
        setShow(!show);
        setDate(date);
    }

  function renderCell(date: Date) {
    
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li >
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index} > index
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index} >
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return( <div><Calendar bordered renderCell={renderCell} 
  onSelect={(date) => {handleSelect(date)}}
  
  
  />
  {show ? <div >
    <PopOpen setShowFunc = {setShow} date = {date} show = {show} func = {handleSelect}/>
    
  </div> : null}
  </div>);
};
export default CalendarComp;