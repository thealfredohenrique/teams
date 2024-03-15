import styled, { css } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: 32px 0;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.xl}px;
  `};
  text-align: center;
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray300};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.md}px;
  `};
  text-align: center;
`;
