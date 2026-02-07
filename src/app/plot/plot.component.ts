import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { LmpService } from '../../services/lmp.service';
import { MyLmpDataModel, MyLmpModel } from '../../models/my-lmp.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
  imports: [FormsModule],
})
export class PlotComponent {
  private service = inject(LmpService);
  public height = 200;
  public width = 400;
  public data: MyLmpDataModel = {};
  public selectedCountry = '';
  public yLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  public xLabels: string[] = [];
  public countries: string[] = [];

  public constructor(private cdr: ChangeDetectorRef) {
    this.service.getLmpData().then((x) => {
      this.data = x.data;
      this.countries = x.countries;
      this.xLabels = x.xKeys;
      this.cdr.detectChanges();
    });
  }

  public onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCountry = target.value;
  }
}
