import { db } from '@/common/data/db/dexieClient';
import type {FieldNote} from '@/common/domain/fieldNote.ts';

export const fieldNotesRepo = {
    async add(note: FieldNote): Promise<void> {
        await db.fieldNotes.add(note);
    },

    async getAll(): Promise<FieldNote[]> {
        return db.fieldNotes.toArray();
    },

    async deleteById(id: string): Promise<void> {
        await db.fieldNotes.delete(id);
    },

    async getChildren(parentNoteId: string): Promise<FieldNote[]> {
        return db.fieldNotes.where('parentNoteId').equals(parentNoteId).toArray();
    },

    async incrementAcknowledgement(id: string) {
        const note = await db.fieldNotes.get(id);
        if (note) {
            await db.fieldNotes.update(id, {
                acknowledgements: (note.acknowledgements || 0) + 1,
            });
        }
    }
};