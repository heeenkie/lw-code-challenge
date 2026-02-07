import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LmpModel } from '../models/lmp.model';
import { firstValueFrom } from 'rxjs';
import { parseLmp } from '../parsers/lmp.parser';
import { MyLmpModel } from '../models/my-lmp.model';

@Injectable({ providedIn: 'root' })
export class LmpService {
  constructor(private http: HttpClient) {}

  public async getLmpData(): Promise<MyLmpModel> {
    const response = await firstValueFrom(this.http.get<LmpModel>('empl_lmp_ind_actru_en.json'));
    const parsedLmp = parseLmp(response);
    return parsedLmp;
  }
}
