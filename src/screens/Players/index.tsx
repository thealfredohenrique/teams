import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import { Container, Form, HeaderList, TeamsLength } from "./styles";

interface RouteParams {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [team, setTeam] = useState("Time A");

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Novo Participante",
        "Informe o nome do participante para adicionar adicionar."
      );
    }

    const newPlayer = { name: newPlayerName, team };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Participante", error.message);
      } else {
        Alert.alert(
          "Novo Participante",
          "Não foi possível adicionar um novo participante."
        );
        console.error(error);
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert(
        "Participantes",
        "Não foi possível carregar os participantes do time selecionado."
      );
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome do participante"
          returnKeyType="done"
          autoCorrect={false}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há participantes nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover turma" type="secondary" />
    </Container>
  );
}
