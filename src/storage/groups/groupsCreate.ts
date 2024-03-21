import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupsCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll();
    const storage = [...storedGroups, newGroup];

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(storage));
  } catch (error) {
    throw error;
  }
}
