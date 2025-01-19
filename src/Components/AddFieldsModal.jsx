import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { MdOutlineEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addField } from '../Slices/FieldSlice';
import { useSelector } from 'react-redux';

const AddFieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

const FieldButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const AddFieldsModal = ({ show, onClose, addMenu }) => {
  const fields=useSelector(state=>state.field.fieldsToBeAdded)
  const dispatch=useDispatch();
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
              style={{
                backgroundColor: index % 2 === 0 ? '#10898F' : '#c72c88', 
              }}
              onClick={() => {
                if (field.type === 'Menu Bar') {
                  addMenu(field); 
                } else {
                  dispatch(addField(field));
                }
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
