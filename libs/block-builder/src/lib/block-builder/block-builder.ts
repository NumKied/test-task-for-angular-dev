import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    CdkDropList,
    CdkDrag,
  ],
})
export class BlockBuilder implements OnInit {
  @Input() public blockObject: { [key: string]: any } = {};

  public flatObject: FlatObject = {};
  public blocks: WritableSignal<Block[]> = signal([]);
  public keysArr: WritableSignal<string[]> = signal([]);
  public defaultBlock: WritableSignal<Block> = signal({ key: '', value: '' });

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
