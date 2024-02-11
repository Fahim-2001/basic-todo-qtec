import { Clock } from "./components/Clock";
import { Input } from "./components/Input";
import { Tasks } from "./components/Tasks";

function App() {
  
  return (
    <div className="App">
      <h1>Todo</h1>
      <Clock/>
      <Input/>
      <Tasks/>
    </div>
  );
}

export default App;
