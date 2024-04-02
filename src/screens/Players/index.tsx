import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";
import { PlayerCard } from "@components/PlayerCard";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import { Container, Form, HeaderList, TeamsLength } from "./styles";

interface RouteParams {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [team, setTeam] = useState("Time A");

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const route = useRoute();
  const navigation = useNavigation();
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

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Remover Participante",
        "Não foi possível remover o participante."
      );
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.error(error);
      Alert.alert("Remover Grupo", "Não foi possível remover o grupo.");
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover Grupo", "Deseja remover o grupo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => groupRemove() },
    ]);
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert(
        "Participantes",
        "Não foi possível carregar os participantes do time selecionado."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
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
      )}

      <Button
        title="Remover turma"
        type="secondary"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
