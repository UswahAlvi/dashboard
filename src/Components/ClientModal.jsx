import { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineMenu } from 'react-icons/ai';
import { FaSave, FaTimes } from 'react-icons/fa';
import { FaRegUserCircle } from "react-icons/fa";
import AddFieldsModal from './AddFieldsModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { backToInitial, setFields } from '../Slices/FieldSlice';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, rectSortingStrategy } from '@dnd-kit/sortable';
import RenderInput from './renderInput';

const ModalContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
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
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
`;

const StyledIcon = styled(FaRegUserCircle)`
  font-size: 2rem; 
  margin-right: 1rem; 
  color: #10898F;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  padding: 0.4rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const MenuIcon = styled(AiOutlineMenu)`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #10898F;
`;

export default function ClientModal({ onClose }) {
  const [isAddFieldsModalOpen, setAddFieldsModalOpen] = useState(false);
  const [isMenuAdded, setIsMenuAdded] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);
  const dispatch=useDispatch();
  const fields = useSelector((state) => state.field.fields || []);
  const isValid = useSelector((state) => state.field.isValid);

  function addMenu() {
    setIsMenuAdded(true);
  }

  function handleSave() {
    setSaveClicked(true);
    if (isValid) {
      console.log('Save client!', fields.map((field) => {
        return { name: field.name, value: field.value };
      }));
      dispatch(backToInitial());
      onClose();
    }
  }

  const getFieldPos=id=>fields.findIndex(fields=>fields.id===id);

  const handleDragEnd= event =>{
      const {active,over}=event;
      if(active.id===over.id) return;

      const originalPos=getFieldPos(active.id);
      const newPos=getFieldPos(over.id);

      const movedFields=arrayMove(fields,originalPos, newPos);

      dispatch(setFields(movedFields));

  }

  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <StyledIcon />
        <Modal.Title>New Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalContainer>
          {isMenuAdded && (
            <MenuContainer>
              <MenuItem>
                <MenuIcon />
              </MenuItem>
            </MenuContainer>
          )}
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} >
            <SortableContext items={fields} strategy={rectSortingStrategy}>
          <FieldList>
            {fields.map((field) => (
                <RenderInput field={field} key={field.id} saveClicked={saveClicked} />
            ))}
          </FieldList>
          </SortableContext>
          </DndContext>
          <AddFieldsButton onClick={() => setAddFieldsModalOpen(true)}>
            <AiOutlinePlus /> Add Fields
          </AddFieldsButton>
          <AddFieldsModal
            show={isAddFieldsModalOpen}
            onClose={() => setAddFieldsModalOpen(false)}
            addMenu={addMenu}
          />
        </ModalContainer>
      </Modal.Body>

      <Modal.Footer><FooterButton onClick={() => {  dispatch(backToInitial()); onClose(); }}>
          <FaTimes /> Close
        </FooterButton>
        <FooterButton
          style={{
            backgroundColor: '#10898F',
            color:'white',
            border:'none',
            cursor:'pointer',
          }}
          onClick={handleSave}
        >
          <FaSave /> Save
        </FooterButton>
      </Modal.Footer>
    </Modal>
  );
}
