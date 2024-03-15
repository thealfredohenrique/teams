import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export type ButtonIconTypeStyleProps = "primary" | "secondary";

interface IconProps extends TouchableOpacityProps {
  type: ButtonIconTypeStyleProps;
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<IconProps>(
  ({ theme, type }) => ({
    size: 24,
    color: type === "primary" ? theme.colors.green700 : theme.colors.red500,
  })
)``;
