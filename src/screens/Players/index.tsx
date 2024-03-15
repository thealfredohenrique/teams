import { useState } from "react";
import { FlatList } from "react-native";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Form, HeaderList, TeamsLength } from "./styles";

export function Players() {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState("Time A");

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome do participante" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isSelected={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <TeamsLength>{players.length}</TeamsLength>
      </HeaderList>
    </Container>
  );
}
