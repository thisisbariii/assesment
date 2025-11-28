import { useState } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessScreen } from './components/SuccessScreen';
import './App.css';

function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [uhid, setUhid] = useState('');
  const [billNo, setBillNo] = useState('');

  const handleSuccess = (generatedUhid: string, generatedBillNo: string) => {
    setUhid(generatedUhid);
    setBillNo(generatedBillNo);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setUhid('');
    setBillNo('');
  };

  return (
    <div className="app-container">
      {isSuccess ? (
        <SuccessScreen uhid={uhid} billNo={billNo} onReset={handleReset} />
      ) : (
        <RegistrationForm onSuccess={handleSuccess} />
      )}
    </div>
  );
}

export default App;
