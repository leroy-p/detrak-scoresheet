import styled from "styled-components";

interface IProps {}

function TemplateComponent(props: IProps) {
  return <Container></Container>;
}

export default TemplateComponent;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
