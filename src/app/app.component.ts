import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FilterExpression } from '@progress/kendo-angular-filter';
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
} from '@progress/kendo-data-query';

@Component({
  selector: 'my-app',
  template: `
        <kendo-filter #filter [filters]="filters" [value]="value" (valueChange)="onFilterChange($event)">
        </kendo-filter>

        <ng-template let-currentItem #template>
            <kendo-dropdownlist [data]="['foo', 'bar']" (valueChange)="editorValueChange($event, currentItem, filter.value)">
            </kendo-dropdownlist>
        </ng-template>
    `,
})
export class AppComponent {
  @ViewChild('template', { static: true })
  public template: TemplateRef<any>;

  public ngOnInit(): void {
    this.filters[0].editorTemplate = this.template;
  }

  public value: CompositeFilterDescriptor = {
    logic: 'or',
    filters: [
      { field: 'budget', operator: 'gt' },
      { field: 'country', operator: 'contains' },
      { field: 'discontinued', operator: 'eq', value: true },
      {
        logic: 'and',
        filters: [
          { field: 'ordered on', operator: 'gt', value: new Date(Date.now()) },
        ],
      },
    ],
  };

  public filters: FilterExpression[] = [
    {
      field: 'country',
      title: 'Country',
      editor: 'string',
      operators: ['neq', 'eq', 'contains'],
    },
    {
      field: 'budget',
      editor: 'number',
    },
    {
      field: 'discontinued',
      title: 'Discontinued',
      editor: 'boolean',
    },
    {
      field: 'ordered on',
      title: 'Ordered on',
      editor: 'date',
    },
  ];

  public onFilterChange(value: CompositeFilterDescriptor): void {
    console.log('FILTER CHANGE', value);
  }

  public editorValueChange(
    value,
    currentItem: FilterDescriptor,
    filterValue: CompositeFilterDescriptor
  ): void {
    currentItem.value = value;
    this.onFilterChange(filterValue);
    console.log(filterValue);
  }
}
