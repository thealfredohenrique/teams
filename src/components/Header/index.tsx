import logoImage from "@assets/logo.png";
import { BackButton, BackIcon, Container, Logo } from "./styles";

interface HeaderProps {
  showBackButton?: false;
}

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImage} />
    </Container>
  );
}
