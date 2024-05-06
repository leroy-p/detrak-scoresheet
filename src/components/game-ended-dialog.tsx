import styled from "styled-components";

interface IProps {
  score: number;
  visible: boolean;
  close: () => void;
}

function GameEndedDialog({ score, visible, close }: IProps) {
  return (
    <Container visible={visible} onClick={close}>
      <MainContainer onClick={(event) => event.stopPropagation()}>
        <p>Game over</p>
        <p>Score: {score}</p>
      </MainContainer>
    </Container>
  );
}

export default GameEndedDialog;

const Container = styled.div<{ visible: boolean }>`
  align-items: center;
  background-color: #000000c1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  position: fixed;
  top: 0;
  transition: opacity 200ms ease-in-out;
  width: 100vw;
`;

const MainContainer = styled.div`
  align-items: center;
  background-color: #000000;
  border: solid 1px #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 48px;
  padding: 48px;
  width: 380px;

  @media screen and (max-width: 820px) {
    width: calc(100% - 48px);
  }

  & > p:nth-child(1) {
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
  }

  & > p:nth-child(2) {
    font-size: 16px;
  }
`;
