import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ListFacade } from '../../state/list.facade';
import { CreateEditModalInput, ListItem, ListItemFieldKeys, ListItemModel } from '../../common/list.interface';
import { AuthFacade } from '../../../auth/state/auth.facade';
import { filterNullish } from '../../../../core/common/utils/helper-functions';

enum FormType {
    CREATE = 'create',
    EDIT = 'edit',
}

@Component({
  selector: 'pm-create-edit-list-item',
  templateUrl: './create-edit-list-item.component.html',
  styleUrl: './create-edit-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditListItemComponent implements OnInit {
  @Input()
  private fromParent: CreateEditModalInput | undefined;

  public formFieldKeys = ListItemFieldKeys;
  public formType: FormType = FormType.CREATE;
  public submitForm: FormGroup = new FormGroup( {
    [ListItemFieldKeys.Title]: new FormControl<string>('', [Validators.required]),
    [ListItemFieldKeys.Completed]: new FormControl<boolean>(false, [Validators.required]),
    [ListItemFieldKeys.UserId]: new FormControl(''),
  });

  public readonly editItem$ = this.listFacade.editItem$;
  public readonly editItemLoading$ = this.listFacade.editItemLoading$;

  constructor(
      public readonly activeModal: NgbActiveModal,
      private readonly listFacade: ListFacade,
      private readonly authFacade: AuthFacade,
      private readonly cdr: ChangeDetectorRef,
  ) {
    this.authFacade.userId$.pipe(take(1), filter(Boolean)).subscribe({
      next: (userId: number): void => {
        this.submitForm.get(ListItemFieldKeys.UserId)?.setValue(userId, { emitEvent: false });
      }
    });
  }
  public ngOnInit(): void {
    this.formType = this.fromParent?.item_id ? FormType.EDIT : FormType.CREATE;

    if (this.formType === FormType.EDIT) {
      this.listFacade.loadOneItem(this.fromParent?.item_id as string);

      this.editItem$.pipe(filterNullish(), take(1)).subscribe({
        next: (item: ListItem): void => {
          this.submitForm.patchValue({
            [ListItemFieldKeys.Title]: item.title,
            [ListItemFieldKeys.Completed]: item.completed,
            [ListItemFieldKeys.UserId]: item.user,
          });
          this.cdr.markForCheck();
        }
      });
    }
  }

  public onSubmit(): void {
    if (this.submitForm.valid) {
      const data = this.getSubmitData();

      if (this.formType === FormType.CREATE) {
        this.listFacade.createListItem(data);
      } else {
        this.listFacade.updateListItem(this.fromParent?.item_id as string, data);
      }
    }
  }

  public get modalTitle(): string {
    return this.formType === FormType.CREATE ? 'Create a task' : 'Edit task';
  }

  public closeModal(): void {
    this.listFacade.deleteEditItem()
    this.activeModal.dismiss('cancel');
  }

  private getSubmitData(): ListItemModel {
    return {
      title: this.submitForm.get(ListItemFieldKeys.Title)?.value,
      completed: this.submitForm.get(ListItemFieldKeys.Completed)?.value,
      user: this.submitForm.get(ListItemFieldKeys.UserId)?.value,
    };
  }
}
