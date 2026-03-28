import { HttpParams } from '@angular/common/http';

export function createHttpParams(queryObj: Record<string, any>): HttpParams {
  let params = new HttpParams();

  Object.entries(queryObj).forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => (params = params.append(key, item)));

      return;
    }

    params = params.append(key, value);
  });

  return params;
}
