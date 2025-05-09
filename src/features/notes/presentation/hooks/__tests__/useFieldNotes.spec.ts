import { renderHook, act } from '@testing-library/react-hooks';
import { useFieldNotes } from '../useFieldNotes';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useLiveQuery } from 'dexie-react-hooks';
import { fieldNotesRepo } from '@/features/notes/data/fieldNotesRepository';

vi.mock('dexie-react-hooks', () => ({
    useLiveQuery: vi.fn(),
}));

vi.mock('@/features/notes/data/fieldNotesRepository', () => ({
    fieldNotesRepo: {
        getAll: vi.fn(),
        add: vi.fn(),
        deleteById: vi.fn(),
        getChildren: vi.fn(),
        incrementAcknowledgement: vi.fn(),
    },
}));

vi.mock('@/common/domain/fieldNote', () => ({
    createFieldNote: vi.fn((text: string, parentNoteId?: string) => ({
        id: 'mock-id',
        text,
        parentNoteId: parentNoteId || null,
        createdAt: Date.now(),
        acknowledgements: 0,
        author: {
            name: 'Test User',
            initials: 'TU',
            avatarUrl: '',
        },
    })),
}));

describe('useFieldNotes', () => {
    const mockNote = {
        id: '1',
        text: 'Test note',
        parentNoteId: null,
        acknowledgements: 0,
        createdAt: Date.now(),
        author: { name: 'Test User', initials: 'TU', avatarUrl: '' },
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useLiveQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue([mockNote]);
    });

    it('returns live notes from Dexie', () => {
        const { result } = renderHook(() => useFieldNotes());
        expect(result.current.notes).toEqual([mockNote]);
    });

    it('can add a new note', async () => {
        const { result } = renderHook(() => useFieldNotes());
        await act(async () => {
            await result.current.addNote('New Note');
        });
        expect(fieldNotesRepo.add).toHaveBeenCalledWith(expect.objectContaining({ text: 'New Note' }));
    });

    it('can acknowledge a note', async () => {
        const { result } = renderHook(() => useFieldNotes());
        await act(async () => {
            await result.current.acknowledgeNote('1');
        });
        expect(fieldNotesRepo.incrementAcknowledgement).toHaveBeenCalledWith('1');
    });

    it('can delete a note and its children recursively', async () => {
        (fieldNotesRepo.getChildren as ReturnType<typeof vi.fn>).mockResolvedValueOnce([{ id: '2' }]);
        (fieldNotesRepo.getChildren as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]);

        const { result } = renderHook(() => useFieldNotes());
        await act(async () => {
            await result.current.deleteNote('1');
        });

        expect(fieldNotesRepo.deleteById).toHaveBeenCalledWith('2');
        expect(fieldNotesRepo.deleteById).toHaveBeenCalledWith('1');
    });
});
