import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Не удалось обновить условия");
  }
  return data;
}

// Мы ожидаем получить объект newSetting, который выглядит как {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // Существует только ОДНА строка настроек, и она имеет ID=1, так что это обновленная строка
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Не удалось обновить условия");
  }
  return data;
}
