import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StationValley } from 'src/shared/station-valley';

@Component({
  selector: 'ub-search-term',
  templateUrl: './search-term.component.html',
  styleUrls: ['./search-term.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class SearchTermComponent implements OnInit {
  @Input() stationValleys : StationValley[] = [];
  @Output('searchTerm') changeEvent: EventEmitter<StationValley[]>;
  resultCount : number | null = null;


  constructor() {
    this.changeEvent = new EventEmitter<StationValley[]>();
  }

  ngOnInit(): void {
    
  }
  
  emitSearchTermChange(searchTerm: string) {
    if (!searchTerm) {
      this.resultCount = null;
      this.changeEvent.emit(this.stationValleys);
      return;
    }
  
    const searchTermLower = searchTerm.toLowerCase();
    const searchedValleys = this.stationValleys.filter((valley: StationValley) => {
      return valley.name.toLowerCase().includes(searchTermLower);
    });
  
    this.resultCount = searchedValleys.length;

    this.changeEvent.emit(searchedValleys);
  }
}