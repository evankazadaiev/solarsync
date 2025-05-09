import Dexie, {type Table } from 'dexie';
import type {FieldNote} from '@/common/domain/fieldNote.ts';

export class AppDB extends Dexie {
    fieldNotes!: Table<FieldNote, string>;

    constructor() {
        super('AppDB');
        this.version(1).stores({
            fieldNotes: 'id, parentNoteId, createdAt',
        });
    }
}

export const db = new AppDB();
