import { fieldNotesRepo } from '@/features/notes/data/fieldNotesRepository.ts';
import { createFieldNote } from '@/common/domain/fieldNote.ts';

import { useLiveQuery } from 'dexie-react-hooks';

export const useFieldNotes = () => {
    const notes = useLiveQuery(() => fieldNotesRepo.getAll(), []) ?? [];

    const addNote = async (text: string, parentNoteId?: string) => {
        const note = createFieldNote(text, parentNoteId);
        await fieldNotesRepo.add(note);
    };

    const deleteNote = async (id: string) => {
        const deleteWithChildren = async (noteId: string) => {
            const children = await fieldNotesRepo.getChildren(noteId);
            for (const child of children) {
                await deleteWithChildren(child.id);
            }
            await fieldNotesRepo.deleteById(noteId);
        };

        await deleteWithChildren(id);
    };

    const acknowledgeNote = async (id: string) => {
        await fieldNotesRepo.incrementAcknowledgement(id);
    };

    return {
        notes,
        addNote,
        deleteNote,
        acknowledgeNote,
    };
};