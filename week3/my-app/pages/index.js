import Clock from "../components/Clock";
import Hello from "../components/Hello";

export default function Home() {
  return (
    <>
    <Hello />  
    <Hello fName="David" lName="Nguyen" />  
    <Clock locale="en-CA" />
    </>
  )
}