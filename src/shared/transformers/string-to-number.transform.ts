import { TransformFnParams } from 'class-transformer';
import { StringToNumberConvert } from '../converters/string-to-number.convert';

export const StringToNumberTransform = (
  params: TransformFnParams,
): number | null => StringToNumberConvert(params.value);
