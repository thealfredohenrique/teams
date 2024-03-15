import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyleProps, Title } from "./styles";

interface FilterProps extends TouchableOpacityProps, FilterStyleProps {
  title: string;
}

export function Filter({ title, isSelected = false, ...rest }: FilterProps) {
  return (
    <Container isSelected={isSelected} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
