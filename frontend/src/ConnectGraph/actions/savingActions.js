// @flow
import type { SavingAction } from "../constants/ConnectGraphTypes";

export function setSaving(isSaving: boolean): SavingAction {
  return { type: 'SAVING', isSaving };
}
