import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { MdOutlineEdit } from 'react-icons/md';

const AddFieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

const FieldButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${(props) => props.bgColor || '#10898F'};
  color: white;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2),
                0 6px 20px rgba(0, 0, 0, 0.19);
  }
`;

const AddFieldsModal = ({ show, onClose, addField }) => {
  
  const fields = [
    { name: 'Text Box', type: 'Text Box' },
    { name: 'Text Area', type: 'Text Area' },
    { name: 'Description Box', type: 'Description Box' },
    { name: 'Menu Bar', type: 'Menu Bar' },
    { name: 'Radio Button', type: 'Radio Button' },
    { name: 'Checklist', type: 'Checklist' },
    { name: 'Full Name', type: 'Full Name' },
    { name: 'Email', type: 'Email' },
    { name: 'Phone', type: 'Phone' },
    { name: 'Address', type: 'Address' },
    { name: 'Time', type: 'Time' },
    { name: 'Date', type: 'Date' },
    { name: 'Files', type: 'File' },
    { name: 'Image', type: 'Image' },
    { name: 'Link Resource', type: 'Link Resource' },
    { name: 'Social Links', type: 'Social Links' },
    { name: 'Range', type: 'Range' },
  ];

  return (
    <StyledModal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> <Title>Select to Add Fields </Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddFieldsContainer>
          {fields.map((field, index) => (
            <FieldButton
              key={field.name}
              bgColor={index % 2 === 0 ? '#10898F' : '#c72c88'} 
              onClick={() => {
                addField(field.name, field.type);
                onClose();
              }}
            >
              <MdOutlineEdit />
              {field.name}
            </FieldButton>
          ))}
        </AddFieldsContainer>
      </Modal.Body>
    </StyledModal>
  );
};

export default AddFieldsModal;
