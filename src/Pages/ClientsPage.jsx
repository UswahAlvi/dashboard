import styled from 'styled-components';
import { useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import ClientModal from '../Components/ClientModal';

const MainPageContainer = styled.div`
  background-color: rgb(248, 249, 250); /* Light gray background */
  height: 100vh;
  width: 100%;
  margin-inline-start: 180px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #343a40; /* Dark gray for contrast */
  margin-bottom: 1.5rem;
`;

const AddButton = styled.button`
  background-color: #10898F;
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  align-self: flex-start; /* Align button to the start of the container */
  width: fit-content; /* Button width matches content */

  &:hover {
    background-color: #0e6b70;
  }

  &:active {
    background-color: #10898F;
  }
`;

export default function ClientsPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddClientClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <MainPageContainer>
      <Header>Clients</Header>
      <AddButton onClick={handleAddClientClick}>
        <CiSquarePlus />
        Add Client
      </AddButton>
      {isModalOpen && <ClientModal onClose={handleCloseModal} />}
    </MainPageContainer>
  );
}
