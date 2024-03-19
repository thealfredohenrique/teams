import { useNavigation } from "@react-navigation/native";
import logoImage from "@assets/logo.png";
import { BackButton, BackIcon, Container, Logo } from "./styles";

interface HeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate("groups");
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImage} />
    </Container>
  );
}
