import { createAction, props } from '@ngrx/store';

export const deleteExample = createAction('[Example] Delete Example', props<{ id: string }>());
