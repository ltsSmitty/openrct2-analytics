import { analytics } from "../objects/analytics";
import hooks from "../hooks";

type GuestBindings<T> = Record<keyof typeof hooks.guest, () => void>;
type ParkChangeBindings = Record<keyof typeof hooks.parkChange, () => void>;
type ScenarioEditingBindings = Record<
  keyof typeof hooks.scenarioEditing,
  (args: any) => void
>;
