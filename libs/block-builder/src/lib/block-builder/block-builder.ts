import { Component, Input, OnInit, signal, WritableSignal, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

interface Block {
  key: string;
  value: string | number;
}

interface FlatObject {
  [key: string]: string | number;
}

@Component({
  selector: 'lib-block-builder',
  templateUrl: './block-builder.html',
  styleUrl: './block-builder.scss',
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    CdkDropList,
    CdkDrag,
  ],
})
export class BlockBuilder implements OnInit {
  @Input() public blockObject: { [key: string]: any } | null = {};
  @ViewChildren('blockEl')
  public blockEls: QueryList<ElementRef> = new QueryList<ElementRef>();

  public isDisabled: boolean = false;
  public highlightedBlock: number = 0;
  public flatObject: FlatObject = {};
  public blocks: WritableSignal<Block[]> = signal([]);
  public keysArr: WritableSignal<string[]> = signal([]);
  public defaultBlock: WritableSignal<Block> = signal({ key: '', value: '' });

  constructor(private matSnackBar: MatSnackBar) {}

  public ngOnInit() {
    if (this.blockObject) {
      this.flatObject = this.formatObject(this.blockObject);

      const defaultPair = Object.entries(this.flatObject)[0];

      this.defaultBlock.set({ key: defaultPair[0], value: defaultPair[1] });
      this.keysArr.set(Object.keys(this.flatObject));
    }
  }

  public addBlock(): void {
    this.blocks.set([...this.blocks(), { ...this.defaultBlock() }]);
  }

  public updateBlock(newKey: string, blockIndex: number): void {
    const blocks = [...this.blocks()];

    blocks[blockIndex] = { key: newKey, value: this.flatObject[newKey] };
    this.blocks.set(blocks);

    if (this.isDisabled && this.highlightedBlock === blockIndex) {
      this.isDisabled = false;
      this.blockEls.map((block) => block)[blockIndex].nativeElement.classList.remove('highlighted');
      this.matSnackBar.dismiss();
    }
  }

  public deleteBlock(blockIndex: number): void {
    const blocks = [...this.blocks()];

    blocks.splice(blockIndex, 1);
    this.blocks.set(blocks);
  }

  public dropBlock(event: CdkDragDrop<Block[]>): void {
    const blocks = [...this.blocks()];

    moveItemInArray(blocks, event.previousIndex, event.currentIndex);
    this.blocks.set(blocks);
  }

  public startTimer(): void {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.blocks().length);

      this.isDisabled = true;
      this.highlightedBlock = randomIndex;
      this.blockEls.map((block) => block)[randomIndex].nativeElement.classList.add('highlighted');
      this.matSnackBar.open('Change highlighted block', 'Ok', { duration: 5000 });
    }, 5000);
  }

  private formatObject(incomingObject: { [key: string]: any }): FlatObject {
    const flatObject: FlatObject = {};

    Object.keys(incomingObject).forEach((key: string) => {
      if (typeof incomingObject[key] !== 'string' && typeof incomingObject[key] !== 'number') {
        return;
      }

      flatObject[key] = incomingObject[key];
    });

    return flatObject;
  }
}
