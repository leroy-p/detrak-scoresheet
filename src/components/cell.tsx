import styled from "styled-components";

interface IProps {
  index: number;
  value: number;
  diagonal: boolean;
  disabled: boolean;
  action: () => void;
}

function Cell({ index, value, diagonal, disabled, action }: IProps) {
  return (
    <Container
      disabled={disabled}
      filled={value > 0}
      highlighted={diagonal}
      index={index}
      onClick={value === 0 ? action : undefined}
    >
      <div>{value > 0 && <p>{value}</p>}</div>
    </Container>
  );
}

export default Cell;

const Container = styled.div<{
  index: number;
  filled: boolean;
  highlighted: boolean;
  disabled: boolean;
}>`
  background-color: #ffffff;
  height: 80px;
  opacity: ${({ disabled }) => (disabled ? "0.2" : "1")};
  pointer-events: ${({ disabled, filled }) =>
    disabled || filled ? "none" : "auto"};
  padding: 1px;
  width: 80px;

  @media screen and (max-width: 820px) {
    height: 48px;
    width: 48px;
  }

  & > div {
    align-items: center;
    background-color: ${({ highlighted }) =>
      highlighted ? "#ff0000aa" : "#000000aa"};
    cursor: ${({ filled }) => (filled ? "auto" : "pointer")};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100;

    & > p {
      font-size: 48px;
      font-weight: bold;

      @media screen and (max-width: 820px) {
        font-size: 24px;
      }
    }

    :hover {
      opacity: 0.7;
    }
  }
`;
