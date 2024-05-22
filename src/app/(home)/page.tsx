import classes from "./page.module.css";
import FirstHomeSegment from "./components/home-segment1";
import SecondHomeSegment from "./components/home-segment2";
import ThirdHomeSegment from "./components/home-segment3";
import FourthHomeSegment from "./components/home-segment4";

export default function Home() {
  return (
    <main className={classes.home}>
      <FirstHomeSegment></FirstHomeSegment>
      <SecondHomeSegment></SecondHomeSegment>
      <ThirdHomeSegment></ThirdHomeSegment>
      <FourthHomeSegment></FourthHomeSegment>
    </main>
  );
}
