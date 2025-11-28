import React, { useState, useEffect } from 'react';
import { Camera, Upload } from 'lucide-react';
import {
  validateMobileNumber,
  validateName,
  validateAge,
  validatePinCode,
  validateEmail,
  calculateDOBFromAge,
  calculateAgeFromDOB
} from '../utils/validation';

interface RegistrationFormProps {
  onSuccess: (uhid: string, billNo: string) => void;
}

interface UploadedFile {
  name: string;
  type: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [primaryNumber, setPrimaryNumber] = useState('');
  const [nextKinContact, setNextKinContact] = useState('');
  const [email, setEmail] = useState('');
  const [attendantName, setAttendantName] = useState('');
  const [attendantRelationship, setAttendantRelationship] = useState('');
  const [docType, setDocType] = useState('Aadhar Card');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [consentChecked, setConsentChecked] = useState(false);
  const [communicationPref, setCommunicationPref] = useState('');

  useEffect(() => {
    if (age && validateAge(age)) {
      const dob = calculateDOBFromAge(parseInt(age));
      setDobYear(dob.year);
      setDobMonth(dob.month);
      setDobDay(dob.day);
    }
  }, [age]);

  useEffect(() => {
    if (dobYear && dobMonth && dobDay) {
      const calculatedAge = calculateAgeFromDOB(dobYear, dobMonth, dobDay);
      if (calculatedAge >= 0 && calculatedAge <= 120) {
        setAge(calculatedAge.toString());
      }
    }
  }, [dobYear, dobMonth, dobDay]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'identity' | 'address') => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'pdf') {
        setUploadedFiles([...uploadedFiles, { name: file.name, type }]);
      } else {
        alert('Only JPG and PDF files are allowed');
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const isFormValid = () => {
    return (
      validateMobileNumber(mobileNumber) &&
      validateName(firstName) &&
      validateName(lastName) &&
      gender !== '' &&
      validateAge(age) &&
      dobYear && dobMonth && dobDay &&
      addressLine1.trim() !== '' &&
      validatePinCode(pinCode) &&
      area !== '' &&
      validateMobileNumber(nextKinContact) &&
      (email === '' || validateEmail(email)) &&
      uploadedFiles.length > 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      const uhid = 'IIGH-' + Math.floor(Math.random() * 9000000 + 1000000);
      const billNo = 'FB' + Math.floor(Math.random() * 9000000000 + 1000000000);
      onSuccess(uhid, billNo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="form-header">
        <div className="tabs">
          <button type="button" className="tab active">New Patient Registration</button>
          <button type="button" className="tab">
            <span className="notification-badge">1</span>
            Incoming ABHA Consent
          </button>
        </div>
        <button type="button" className="close-btn">×</button>
      </div>

      <div className="form-tabs">
        <button type="button" className="form-tab active">Regular</button>
        <button type="button" className="form-tab">Quick</button>
        <button type="button" className="form-tab">Import from ABHA</button>
        <button type="button" className="form-tab">Scan Documents</button>
      </div>

      <div className="form-content">
        <div className="section-title">Identification Details</div>

        <div className="form-row">
          <div className="profile-upload">
            <div className="profile-circle">
              <Camera size={24} color="#666" />
            </div>
          </div>

          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="Enter Mobile Number *"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className={`form-input ${mobileNumber && !validateMobileNumber(mobileNumber) ? 'error' : ''}`}
            />
          </div>

          <div className="form-group flex-1">
            <div className="gender-group">
              <label className="gender-label">Gender*</label>
              <div className="gender-buttons">
                <button
                  type="button"
                  className={`gender-btn ${gender === 'Female' ? 'active' : ''}`}
                  onClick={() => setGender('Female')}
                >
                  Female
                </button>
                <button
                  type="button"
                  className={`gender-btn ${gender === 'Male' ? 'active' : ''}`}
                  onClick={() => setGender('Male')}
                >
                  Male
                </button>
                <button
                  type="button"
                  className={`gender-btn ${gender === 'Others' ? 'active' : ''}`}
                  onClick={() => setGender('Others')}
                >
                  Others
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="age-dob-group">
              <label className="field-label">Age*</label>
              <div className="age-dob-inputs">
                <input
                  type="text"
                  placeholder="YY"
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className={`form-input small ${age && !validateAge(age) ? 'error' : ''}`}
                  maxLength={3}
                />
                <span className="separator">OR</span>
                <label className="field-label">Date of Birth*</label>
                <input
                  type="text"
                  placeholder="YY"
                  value={dobYear}
                  onChange={(e) => setDobYear(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  className="form-input small"
                  maxLength={2}
                />
                <input
                  type="text"
                  placeholder="MM"
                  value={dobMonth}
                  onChange={(e) => setDobMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  className="form-input small"
                  maxLength={2}
                />
                <input
                  type="text"
                  placeholder="DD"
                  value={dobDay}
                  onChange={(e) => setDobDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  className="form-input small"
                  maxLength={2}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="First Name*"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.replace(/[^A-Za-z]/g, ''))}
              className={`form-input ${firstName && !validateName(firstName) ? 'error' : ''}`}
            />
          </div>
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="Last Name*"
              value={lastName}
              onChange={(e) => setLastName(e.target.value.replace(/[^A-Za-z]/g, ''))}
              className={`form-input ${lastName && !validateName(lastName) ? 'error' : ''}`}
            />
          </div>
        </div>

        <div className="section-title">Contact Details</div>

        <div className="form-row">
          <div className="form-group flex-2">
            <input
              type="text"
              placeholder="Address Line 1 *"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group flex-2">
            <input
              type="text"
              placeholder="Address Line 2 *"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="PIN*"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className={`form-input ${pinCode && !validatePinCode(pinCode) ? 'error' : ''}`}
              maxLength={6}
            />
          </div>
          <div className="form-group flex-1">
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="form-input"
            >
              <option value="">Select Area*</option>
              <option value="Area 1">Area 1</option>
              <option value="Area 2">Area 2</option>
            </select>
          </div>
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="District*"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="State*"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="IN"
              disabled
              className="form-input"
              value="IN"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="Primary Registered Number*"
              value={primaryNumber}
              onChange={(e) => setPrimaryNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="form-input"
            />
          </div>
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="Next Kin Contact No. *"
              value={nextKinContact}
              onChange={(e) => setNextKinContact(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className={`form-input ${nextKinContact && !validateMobileNumber(nextKinContact) ? 'error' : ''}`}
            />
          </div>
          <div className="form-group flex-1">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input ${email && !validateEmail(email) ? 'error' : ''}`}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="Attendant Name"
              value={attendantName}
              onChange={(e) => setAttendantName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group flex-1">
            <input
              type="text"
              placeholder="Attendant Relationship"
              value={attendantRelationship}
              onChange={(e) => setAttendantRelationship(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="section-title">KYC Documents ( Optional )</div>

        <div className="form-row">
          <div className="form-group">
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="form-input doc-type-select"
            >
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="PAN Card">PAN Card</option>
              <option value="Driving Licence">Driving Licence</option>
              <option value="Passport">Passport</option>
            </select>
          </div>
          <div className="form-group">
            <label className="upload-btn">
              <Upload size={16} />
              Upload Identity Proof
              <input
                type="file"
                accept=".jpg,.jpeg,.pdf"
                onChange={(e) => handleFileUpload(e, 'identity')}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="upload-btn">
              <Upload size={16} />
              Upload Address Proof
              <input
                type="file"
                accept=".jpg,.jpeg,.pdf"
                onChange={(e) => handleFileUpload(e, 'address')}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" />
              KYC Verified
            </label>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="uploaded-file">
                <span className="file-icon">✓</span>
                <span className="file-name">{file.name}</span>
                <span className="file-status">Uploaded Successfully</span>
                <button
                  type="button"
                  className="remove-file"
                  onClick={() => removeFile(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="section-title">Preferences</div>

        <div className="form-row">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
              />
              Consent for Medical Research
            </label>
          </div>
          <div className="form-group">
            <select
              value={communicationPref}
              onChange={(e) => setCommunicationPref(e.target.value)}
              className="form-input"
            >
              <option value="">Communication Preferences</option>
              <option value="Odia">Odia</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid()}
          >
            Collect Payment & Register
          </button>
        </div>
      </div>
    </form>
  );
};
