import {NgModule} from '@angular/core';

import {ActionColumnWidthPipe} from './action-column-width.pipe';
import {EntityValuePipe} from './entity-value.pipe';
import {JoinPipe} from './join.pipe';
import {FieldExistPipe} from "./field-exist.pipe";
import {ImportErrorsFieldsPipe} from "./import-errors-fields.pipe";
import {ArrayJoinPipe} from "./array-join.pipe";
import {ImportErrorsPipe} from "./import-errors.pipe";
import {ArrayObjectMapPipe} from "./array-object-map.pipe";
import {ObjectValuePipe} from "./object-value.pipe";
import {BoolPipe} from "./bool.pipe";


export const pipes: Required<NgModule>['declarations'] = [JoinPipe, EntityValuePipe, ActionColumnWidthPipe, FieldExistPipe, ImportErrorsFieldsPipe, ArrayJoinPipe, ImportErrorsPipe, ArrayObjectMapPipe, ObjectValuePipe, BoolPipe];
