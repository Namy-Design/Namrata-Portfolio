import { Routes, Route } from 'react-router-dom';
import Home from './Home'; 
import MyBillBook from './MyBillBook';
import GoldSetu from './GoldSetu';
import GroupOrders from './GroupOrders';
import Resume from './Resume';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/mybillbook" element={<MyBillBook />} />
      <Route path="/goldsetu" element={<GoldSetu />} />
      <Route path="/group-orders" element={<GroupOrders />} />
    </Routes>
  );
}