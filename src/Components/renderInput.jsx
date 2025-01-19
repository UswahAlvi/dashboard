import styled from "styled-components";
import { handleInputChange } from "../Slices/FieldSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const FieldWrapper = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const FieldLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

const FieldInput = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({ isValid }) => (isValid ? "#ccc" : "red")};
  width: 100%;
`;

const SelectInput = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({ isValid }) => (isValid ? "#ccc" : "red")};
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({ isValid }) => (isValid ? "#ccc" : "red")};
  width: 100%;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;

const RadioButtonInput = styled.input`
  margin-right: 8px;
  accent-color: #4caf50;
`;

const ChecklistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #10898f;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 0.8rem;
  accent-color: var(--primary-color1);
`;

export default function RenderInput({ field, saveClicked }) {
  const [isInputFocused, setIsInputFocused] = useState(false); 
  const dispatch = useDispatch();
  const { id } = field;

  const handleFocus = () => setIsInputFocused(true); 
  const handleBlur = () => setIsInputFocused(false); 

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    disabled: isInputFocused,  
  });

  const styles = {
    transition,
    transform: transform ? CSS.Transform.toString(transform) : undefined,
  };
  
  const handleChange = (value) => {
    dispatch(handleInputChange({ id: field.id, newValue: value }));
  };

  const myField = useSelector((state) =>
    state.field.fields.find((i) => i.id === field.id)
  );

  const isValid = saveClicked ? myField.IsValid : true;
  const borderColor = isValid ? '#ccc' : 'red';

  const renderFieldInput = () => {
    switch (field.type) {
      case "Text Box":
      case "Full Name":
      case "Email":
      case "Phone":
      case "Link Resource":
      case "Social Links":
        return (
          <FieldInput
            id={field.id}
            type="text"
            value={field.value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Enter ${field.name}`}
            style={{ border: `1px solid ${borderColor}`}} 
          />
        );
      case "Text Area":
      case "Address":
      case "Description Box":
        return (
          <TextArea
            id={field.id}
            value={field.value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Enter ${field.name}`}
            style={{ border: `1px solid ${borderColor}`}}
            rows={4}
          />
        );
      case 'File':
      case 'Files':
      case 'Image':
        return (
          <FieldInput
            id={field.id}
            type="file"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value)}
            style={{ border: `1px solid ${borderColor}`}} 
          />
        );
      case "Dropdown":
        return (
          <SelectInput
            id={field.id}
            value={field.value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value)}
            style={{ border: `1px solid ${borderColor}`}} 
          >
            <option value="">Select {field.name}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        );
        case "Checklist":
          return (
            <ChecklistContainer
              style={{ border: saveClicked && !field.IsValid ? '1px solid red' : 'none' }} // Apply border to wrapper if invalid
            >
              {field.options.map((option, optIndex) => {
                const isChecked = field.value?.includes(option) || false;
                return (
                  <CheckboxLabel key={optIndex}>
                    <CheckboxInput
                      type="checkbox"
                      id={`checkbox-${field.id}-${optIndex}`} 
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      checked={isChecked} 
                      onChange={(e) => {
                        const newValue = field.value ? [...field.value] : [];
                        if (e.target.checked) {
                          // Add option if not already present
                          if (!newValue.includes(option)) {
                            newValue.push(option);
                          }
                        } else {
                          // Remove option if unchecked
                          const index = newValue.indexOf(option);
                          if (index > -1) {
                            newValue.splice(index, 1);
                          }
                        }
                        handleChange(newValue); 
                      }}
                    />
                    {option}
                  </CheckboxLabel>
                );
              })}
            </ChecklistContainer>
          );
        
        case "Radio Button":
          return (
            <div
              style={{
                border: saveClicked && !field.IsValid ? '2px solid red' : 'none', // Apply border to wrapper if invalid
                padding: '10px',
                borderRadius: '8px',
              }}
            >
              {field.options.map((option) => {
                const isChecked = field.value === option;
                return (
                  <RadioButtonLabel key={option}>
                    <RadioButtonInput
                      type="radio"
                      name={`radio-${field.id}`} 
                      value={option}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      checked={isChecked} 
                      onClick={(e) => e.stopPropagation()} 
                      onChange={(e) => handleChange(e.target.value)} 
                    />
                    {option}
                  </RadioButtonLabel>
                );
              })}
            </div>
          );
        
      case 'Range':
        return (
          <>
            <FieldInput
              id={field.id}
              type="range"
              value={field.value}
              min={field.min || 0}
              onFocus={handleFocus}
              onBlur={handleBlur}
              max={field.max || 100}
              step={field.step || 1}
              onChange={(e) => handleChange(e.target.value)}
              style={{ border: `1px solid ${borderColor}`}} 
            />
            <div>{field.value} / {field.max.toString()}</div>
          </>
        );
      case 'Time':
        return (
          <FieldInput
            ref={setNodeRef} {...attributes} {...listeners}  
            id={field.id}
            type="time"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={field.value}
            onChange={(e) => handleChange(e.target.value)}
            style={{ border: `1px solid ${borderColor}`}} 
          />
        );
      case 'Date':
        return (
          <FieldInput
            ref={setNodeRef} {...attributes} {...listeners}  
            id={field.id}
            type="date"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={field.value}
            onChange={(e) => handleChange(e.target.value)}
            style={{ border: `1px solid ${borderColor}`}} 
          />
        );
        
      default:
        return (
          <FieldInput
            id={field.id}
            type="text"
            value={field.value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Enter ${field.name}`}
            style={{ border: `1px solid ${borderColor}`}} 
          />
        );
    }
  };

  return (
    <FieldWrapper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
    >
      <FieldLabel>{field.name}</FieldLabel>
      {renderFieldInput()}
    </FieldWrapper>
  );
}
