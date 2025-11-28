export const validateMobileNumber = (value: string): boolean => {
  return /^\d{10}$/.test(value);
};

export const validateName = (value: string): boolean => {
  return /^[A-Za-z]{2,}$/.test(value);
};

export const validateAge = (value: string): boolean => {
  const age = parseInt(value);
  return !isNaN(age) && age >= 0 && age <= 120;
};

export const validatePinCode = (value: string): boolean => {
  return /^\d{6}$/.test(value);
};

export const validateEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const calculateDOBFromAge = (age: number): { year: string; month: string; day: string } => {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  return {
    year: birthYear.toString().slice(-2),
    month: String(today.getMonth() + 1).padStart(2, '0'),
    day: String(today.getDate()).padStart(2, '0')
  };
};

export const calculateAgeFromDOB = (year: string, month: string, day: string): number => {
  if (!year || !month || !day) return 0;

  const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
  const birthDate = new Date(fullYear, parseInt(month) - 1, parseInt(day));
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const generateUHID = (): string => {
  return 'IIGH-' + Math.floor(Math.random() * 9000000 + 1000000);
};

export const generateBillNo = (): string => {
  return 'FB' + Math.floor(Math.random() * 9000000000 + 1000000000);
};
