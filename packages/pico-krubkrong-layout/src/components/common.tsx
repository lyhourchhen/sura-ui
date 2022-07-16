import styled from 'styled-components';

export const MainLayoutWrapper = styled.div.attrs(
  (props: { screenBreak?: boolean }) => props
)`
  padding-left: '100px';
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.screenBreak ? '100%' : '100vh')};
  justify-content: space-between;
  background-color: kSecondaryColor;
  padding: 30px 30px 10px 30px;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FlexDown = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const PaddingHeader = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;
