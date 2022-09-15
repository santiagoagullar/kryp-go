import './App.css';
import { Navbar, Transfer, Services, Transactions } from '../src/components/container'
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Transfer title='transfer' />
      <Services title='services' />
      <Transactions title='transactions' />
    </div>
  );
}

export default App;
