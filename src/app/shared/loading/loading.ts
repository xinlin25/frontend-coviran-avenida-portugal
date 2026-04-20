import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [AsyncPipe],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {
  private loadingService = inject(LoadingService);
  loading$ = this.loadingService.loading$;
}
