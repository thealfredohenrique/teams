import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export interface FilterStyleProps {
  isSelected?: boolean;
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  ${({ theme, isSelected }) =>
    isSelected &&
    css`
      border: 1px solid ${theme.colors.green700};
    `};

  border-radius: 4px;
  margin-right: 12px;
  height: 38px;
  width: 70px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  text-transform: uppercase;
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.sm}px;
  `};
`;
