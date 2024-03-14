import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonTypeStyleProps = "primary" | "secondary";

interface ContainerProps {
  type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 56px;
  max-height: 56px;
  background-color: ${({ theme, type }) =>
    type === "primary" ? theme.colors.green700 : theme.colors.red700};
  border-radius: 6px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.bold};
  font-size: ${({ theme }) => theme.fontSize.md}px;
`;
