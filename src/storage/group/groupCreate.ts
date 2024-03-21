import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupGetAll();
    const isGroupAlreadyExists = storedGroups.includes(newGroup);

    if (isGroupAlreadyExists) {
      throw new AppError("Já existe uma turma cadastrada com esse nome.");
    }

    const storage = [...storedGroups, newGroup];

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(storage));
  } catch (error) {
    throw error;
  }
}
