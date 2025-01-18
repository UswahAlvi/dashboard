import { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlinePaperClip } from 'react-icons/ai';
import { FaSave, FaTimes } from 'react-icons/fa';
import { FaRegUserCircle } from "react-icons/fa";
import AddFieldsModal from './AddFieldsModal';

const ModalContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const FieldList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const FieldItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FieldLabel = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const FieldInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SelectInput = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddFieldsButton = styled.button`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #10898F;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0e6b70;
  }
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${(props) => (props.primary ? '#10898F' : 'white')};
  color: ${(props) => (props.primary ? 'white' : '#10898F')};
  padding: 0.7rem 1.5rem;
  border: ${(props) => (props.primary ? 'none' : '1px solid #10898F')};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0e6b70' : '#f8f9fa')};
  }
`;

const StyledIcon = styled(FaRegUserCircle)`
  font-size: 2rem; /* Adjust icon size */
  margin-right: 1rem; /* Add space between icon and title */
  color: #10898F;
`;

export default function ClientModal({ onClose }) {
  const [fields, setFields] = useState([
    { name: 'Name', value: '', type: 'Text Box' },
    { name: 'Email', value: '', type: 'Email' },
    { name: 'Company Name', value: '', type: 'Text Box' },
    { name: 'Industry', value: '', type: 'Dropdown', options: ['Finance', 'Healthcare', 'Technology'] },
    { name: 'Attach Files', value: '', type: 'File' },
    { name: 'Status', value: '', type: 'Dropdown', options: ['Active', 'Inactive', 'Pending'] },
    { name: 'Label', value: '', type: 'Dropdown', options: ['High Priority', 'Low Priority'] },
    { name: 'Contact', value: '', type: 'Text Box' },
    { name: 'Size', value: '', type: 'Dropdown', options: ['Small', 'Medium', 'Large'] },
  ]);

  const [isAddFieldsModalOpen, setAddFieldsModalOpen] = useState(false);

  const handleAddField = (fieldName, fieldType, options = []) => {
    setFields([...fields, { name: fieldName, value: '', type: fieldType, options }]);
  };

  const handleInputChange = (index, newValue) => {
    const updatedFields = [...fields];
    updatedFields[index].value = newValue;
    setFields(updatedFields);
  };

  const renderInput = (field, index) => {
    switch (field.type) {
      case 'Text Box':
      case 'Full Name':
      case 'Email':
      case 'Phone':
      case 'Address':
      case 'Link Resource':
      case 'Social Links':
        return (
          <FieldInput
            type="text"
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Enter ${field.name}`}
          />
        );
      case 'Text Area':
      case 'Description Box':
        return (
          <textarea
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Enter ${field.name}`}
            rows={4}
          />
        );
      case 'Time':
        return (
          <FieldInput
            type="time"
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        );
      case 'Date':
        return (
          <FieldInput
            type="date"
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        );
      case 'File':
      case 'Files':
      case 'Image':
        return (
          <FieldInput
            type="file"
            onChange={(e) => handleInputChange(index, e.target.files[0])}
          />
        );
      case 'Dropdown':
        return (
          <SelectInput
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          >
            <option value="">Select {field.name}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </SelectInput>
        );
      case 'Radio Button':
        return (
          <div>
            {field.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`radio-${index}`}
                  value={option}
                  checked={field.value === option}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'Checklist':
        return (
          <div>
            {field.options.map((option, optIndex) => (
              <label key={optIndex}>
                <input
                  type="checkbox"
                  value={option}
                  checked={field.value?.includes(option)}
                  onChange={(e) => {
                    const newValue = [...(field.value || [])];
                    if (e.target.checked) {
                      newValue.push(option);
                    } else {
                      newValue.splice(newValue.indexOf(option), 1);
                    }
                    handleInputChange(index, newValue);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'Range':
        return (
          <FieldInput
            type="range"
            value={field.value}
            min={field.min || 0}
            max={field.max || 100}
            step={field.step || 1}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        );
      case 'Menu Bar':
        return (
          <nav>
            {field.options.map((option, optIndex) => (
              <button
                key={optIndex}
                onClick={() => handleInputChange(index, option)}
              >
                {option}
              </button>
            ))}
          </nav>
        );
      default:
        return (
          <FieldInput
            type="text"
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Enter ${field.name}`}
          />
        );
    }
  };
  

  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <StyledIcon />
        <Modal.Title>New Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalContainer>
          <FieldList>
            {fields.map((field, index) => (
              <FieldItem key={field.name}>
                <FieldLabel>{field.name}</FieldLabel>
                {renderInput(field, index)}
              </FieldItem>
            ))}
          </FieldList>
          <AddFieldsButton onClick={() => setAddFieldsModalOpen(true)}>
            <AiOutlinePlus /> Add Fields
          </AddFieldsButton>
          <AddFieldsModal
            show={isAddFieldsModalOpen}
            onClose={() => setAddFieldsModalOpen(false)}
            addField={handleAddField}
          />
        </ModalContainer>
      </Modal.Body>
      <Modal.Footer>
        <FooterButton onClick={onClose}>
          <FaTimes /> Close
        </FooterButton>
        <FooterButton onClick={() => { console.log('Save client!', fields); onClose(); }} primary>
          <FaSave /> Save
        </FooterButton>
      </Modal.Footer>
    </Modal>
  );
}
