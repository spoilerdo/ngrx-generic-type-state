import { createAction, props } from '@ngrx/store';

export const deleteExample = createAction('[Example] Delete Example', props<{ id: string }>());
export const deleteExampleSuccess = createAction('[Example] Delete Example Success', props<{id: string}>());
export const deleteExampleFailure = createAction('[Example] Delete Example Failure', props<{ failure: Error }>())
