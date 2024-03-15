import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray300};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.sm}px;
  `};
  text-align: center;
`;
