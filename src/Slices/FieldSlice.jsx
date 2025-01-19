import { createSlice } from "@reduxjs/toolkit";


function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

function isValidContact(phone) {
  const phonePattern = /^(\(\d{3}\)\s?|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/;
  return phonePattern.test(phone);
}

function checkValid(value, type) {
  if (type === 'Text Box' || type === 'Text Area' || type === 'Full Name' || type === 'Description Box') {
    return value && value.trim() !== '';
  }

  if (type === 'Email') {
    return value && isValidEmail(value); 
  }
  if (type === 'Checklist') {
    return Array.isArray(value) && value.length > 0;
  }
  

  if (type === 'Phone') {
    return value && isValidContact(value);
  }

  if (type === 'Dropdown' || type === 'Radio Button') {
    return value && value.trim() !== '' && value !== 'Select an option';
  }

  if (type === 'File' || type === 'Image') {
    return value && value !== '';
  }

  if (type === 'Time' || type === 'Date') {
    return value && value !== '';
  }

  return true;
}

const initialState = {
  fields: [
    { id: 'name', name: 'Name', value: '', type: 'Text Box', IsValid: false },
    { id: 'email', name: 'Email', value: '', type: 'Email', IsValid: false },
    { id: 'company-name', name: 'Company Name', value: '', type: 'Text Box', IsValid: false },
    { id: 'industry', name: 'Industry', value: '', type: 'Dropdown', options: ['Finance', 'Healthcare', 'Technology'], IsValid: false },
    { id: 'attach-files', name: 'Attach Files', value: '', type: 'File', IsValid: false },
    { id: 'status', name: 'Status', value: '', type: 'Dropdown', options: ['Active', 'Inactive', 'Pending'], IsValid: false },
    { id: 'label', name: 'Label', value: '', type: 'Dropdown', options: ['High Priority', 'Low Priority'], IsValid: false },
    { id: 'contact', name: 'Contact', value: '', type: 'Phone', IsValid: false },
    { id: 'size', name: 'Size', value: '', type: 'Dropdown', options: ['Small', 'Medium', 'Large'], IsValid: false },
  ],
  
  isValid: false,
  fieldsToBeAdded: [
    { name: 'Text Box', type: 'Text Box', value: '', IsValid: false },
    { name: 'Text Area', type: 'Text Area', value: '', IsValid: false },
    { name: 'Description Box', type: 'Description Box', value: '', IsValid: false },
    { name: 'Menu Bar', type: 'Menu Bar', value: '', IsValid: false },
    {
      name: 'Radio Button',
      type: 'Radio Button',
      options: ['Option 1', 'Option 2'],
      value: '',
      IsValid: false,
    },
    { name: 'Checklist', type: 'Checklist', options: ['Option 1', 'Option 2'], value: '', IsValid: false },
    { name: 'Full Name', type: 'Full Name', value: '', IsValid: false },
    { name: 'Email', type: 'Email', value: '', IsValid: false },
    { name: 'Phone', type: 'Phone', value: '', IsValid: false },
    { name: 'Address', type: 'Address', value: '', IsValid: false },
    { name: 'Time', type: 'Time', value: '', IsValid: false },
    { name: 'Date', type: 'Date', value: '', IsValid: false },
    { name: 'Files', type: 'File', value: '', IsValid: false },
    { name: 'Image', type: 'Image', value: '', IsValid: false },
    { name: 'Link Resource', type: 'Link Resource', value: '', IsValid: false },
    { name: 'Social Links', type: 'Social Links', value: '', IsValid: false },
    { name: 'Range', type: 'Range', min: 1, max: 100, value: 1, IsValid: true },
  ],
};

function generateFieldId() {
  return 'field-' + Math.random().toString(36).substr(2, 9);
}

const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {

    backToInitial(state) {
      state.fields = initialState.fields;
      state.isValid=false;
    },

    addField(state, action) {
      const newField = { ...action.payload, id: generateFieldId()};
      state.fields.push(newField);
    },

    
    handleInputChange(state, action) {
      const { id, newValue } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) {
        field.value = newValue;
        field.IsValid = checkValid(field.value, field.type);
      }
      const allFieldsValid = state.fields.every((field) => field.IsValid);
      state.isValid = allFieldsValid;
      
    },
    setFields(state,action){
      state.fields=action.payload;
    }
  },
});

export const { backToInitial, addField, handleInputChange,setFields } = fieldSlice.actions;
export const fieldReducer = fieldSlice.reducer;

