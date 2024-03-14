import { TouchableOpacity } from "react-native";
import { UsersThree } from "phosphor-react-native";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray500};
  border-radius: 6px;
  margin-bottom: 12px;
  padding: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray200};
  font-family: ${({ theme }) => theme.fontFamily.regular};
  font-size: ${({ theme }) => theme.fontSize.md}px;
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 32,
  color: theme.colors.green700,
  weight: "fill",
}))`
  margin-right: 20px;
`;
