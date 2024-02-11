import { Clock } from "./components/Clock";
import { Input } from "./components/Input";
import { Tasks } from "./components/Tasks";

function App() {
  
  return (
    <div className="pt-20 mx-5 lg:mx-10">
      <h1 className="text-center text-6xl font-bold overflow-y-hidden py-3">Todo</h1>
      <Clock/>
      <Input/>
      <Tasks/>
    </div>
  );
}

export default App;
