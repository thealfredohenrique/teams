import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray600};
  padding: 24px;
`;

export const Form = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray700};
  border-radius: 6px;
`;

export const HeaderList = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 32px 0 12px;
`;

export const TeamsLength = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray200};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.sm}px;
  `}
`;
