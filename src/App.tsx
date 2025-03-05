import "./App.css";
import MyTldraw from "./component/MyTldraw";
import ImgList from "./component/ImgList";
import { Tldraw } from "tldraw";

function App() {
  return (
    <>
      <div className="content">
        <ImgList></ImgList>
        <div className="card" draggable='false'>
          <Tldraw persistenceKey="drawKey">
            <MyTldraw></MyTldraw>
          </Tldraw>
        </div>
      </div>
    </>
  );
}

export default App;
