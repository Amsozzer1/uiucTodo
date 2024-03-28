import Menu from "./Menu";
import CalendarComp from "./calendar";

export default function Home() {
  return (
    <div>
      <Menu/>
      <div className="flex pt-20" 
      style={{justifyContent:'center',
      height:'calc(100vh - 50px)',
      overflow: 'hidden',
      alignContent: 'center',
      alignItems: 'center'
      }}>
      <CalendarComp/>
      </div>
    </div>
  );
}
