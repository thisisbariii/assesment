import React from 'react';
import { Check, CreditCard, FileText, Printer } from 'lucide-react';

interface SuccessScreenProps {
  uhid: string;
  billNo: string;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ uhid, billNo, onReset }) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('en-US', { month: 'long' });
    const year = now.getFullYear();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    return `${day} ${month} ${year} ${time}`;
  };

  const getTransactionRef = () => {
    return '#' + Math.floor(Math.random() * 900000000000 + 100000000000);
  };

  return (
    <div className="success-screen">
      <div className="form-header">
        <div className="tabs">
          <button type="button" className="tab active">New Patient Registration</button>
          <button type="button" className="tab">
            <span className="notification-badge">1</span>
            Incoming ABHA Consent
          </button>
        </div>
        <button type="button" className="close-btn" onClick={onReset}>×</button>
      </div>

      <div className="success-content">
        <div className="success-status">Service Order Status</div>
        <div className="success-message">
          <span>Patient Registration Successful.</span>
          <div className="success-icon">
            <Check size={20} strokeWidth={3} />
          </div>
        </div>

        <div className="success-details">
          <div className="detail-row">
            <span className="detail-label">UHID No :</span>
            <span className="detail-value">{uhid}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Bill No :</span>
            <span className="detail-value">{billNo}</span>
          </div>
        </div>

        <div className="success-meta">
          <div className="meta-text">Created at {getCurrentDateTime()} by Abhijeet Das</div>
          <div className="meta-text">Transaction Ref No {getTransactionRef()}</div>
        </div>

        <div className="success-actions">
          <button className="action-btn primary">
            <CreditCard size={18} />
            View Profile
          </button>
          <button className="action-btn">
            <Printer size={18} />
            Print Receipt
          </button>
          <button className="action-btn">
            <FileText size={18} />
            Print UHID Card
          </button>
          <button className="action-btn">
            <FileText size={18} />
            Print UHID Card
          </button>
        </div>
      </div>
    </div>
  );
};
