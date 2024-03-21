import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

interface InputProps extends TextInputProps {
  inputRef: React.RefObject<TextInput>;
}

export function Input({ inputRef, ...rest }: InputProps) {
  const { colors } = useTheme();

  return (
    <Container ref={inputRef} placeholderTextColor={colors.gray300} {...rest} />
  );
}
