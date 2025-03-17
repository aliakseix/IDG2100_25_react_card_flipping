import '../css/App.css';
import Board from "./Board";

export default function App() {
  return (
    <div className="main-container">
      <div className="centered-item">
        <h1>Find Matching Cards If You Can!</h1>
        <Board/>
      </div>
    </div>
  );
}
