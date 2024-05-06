import styled from "styled-components";

interface IProps {
  visible: boolean;
  close: () => void;
  setValue: (value: number) => void;
}

function SelectorDialog({ visible, close, setValue }: IProps) {
  const values = [1, 2, 3, 4, 5, 6];

  return (
    <Container visible={visible} onClick={close}>
      <MainContainer onClick={(event) => event.stopPropagation()}>
        <p>Select value</p>
        <ValuesContainer>
          {values.map((value) => (
            <ValueButton key={value} onClick={() => setValue(value)}>
              <p>{value}</p>
            </ValueButton>
          ))}
        </ValuesContainer>
      </MainContainer>
    </Container>
  );
}

export default SelectorDialog;

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
  padding: 24px;
  width: 380px;

  @media screen and (max-width: 820px) {
    width: calc(100% - 48px);
  }

  & > p {
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const ValuesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  width: 300px;
`;

const ValueButton = styled.button`
  align-items: center;
  border: solid 1px #ffffff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 64px;
  justify-content: center;
  width: 64px;

  & > p {
    font-size: 24px;
    font-weight: bold;
  }

  :hover {
    opacity: 0.7;
  }
`;
