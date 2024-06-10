import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateEditListItemComponent } from './components/create-edit-list-item/create-edit-list-item.component';
import { ListFacade } from './state/list.facade';
import { CreateEditModalInput, ListItem } from './common/list.interface';

@Component({
  selector: 'pm-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  public listLoading$ = this.listFacade.loading$;
  public listItems$ = this.listFacade.list$;

  public readonly dateFormat = "dd/MM/yyyy 'at' HH:mm:ss";

  constructor(
      private readonly modalService: NgbModal,
      private readonly listFacade: ListFacade,
  ) {}

  public ngOnInit(): void {
    this.listFacade.loadItems();
  }

  public toggleTaskStatus(event: Event, item: ListItem): void {
    event.preventDefault();
    this.listFacade.toggleListItemStatus(item.id, item);
  }

  public onAdd(): void {
    this.modalService.open(CreateEditListItemComponent);
  }

  public onEdit(item: ListItem): void {
    const modalRef = this.modalService.open(CreateEditListItemComponent);

    const dataToModal: CreateEditModalInput = {
      item_id: item.id,
    }

    modalRef.componentInstance.fromParent = dataToModal
  }

  public onDelete(item: ListItem): void {
    this.listFacade.deleteItem(item.id);
  }

  public trackByFn(index: number, item: ListItem): string {
    return item.id;
  }
}
