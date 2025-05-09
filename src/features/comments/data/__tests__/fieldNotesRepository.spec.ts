import { fieldNotesRepo } from '../fieldNotesRepository';
import { db } from '@/common/data/db/dexieClient';
import type { FieldNote } from '@/common/domain/fieldNote';
import { vi, type Mock } from 'vitest';

vi.mock('@/common/data/db/dexieClient', () => ({
    db: {
        fieldNotes: {
            add: vi.fn(),
            toArray: vi.fn(),
            delete: vi.fn(),
            where: vi.fn(() => ({
                equals: vi.fn(() => ({
                    toArray: vi.fn(),
                })),
            })),
            get: vi.fn(),
            update: vi.fn(),
        },
    },
}));


export const mockFieldNotes: FieldNote[] = [
    {
        id: '1',
        note: 'Root Note 1',
        parentNoteId: undefined,
        createdAt: Date.now(),
        acknowledgements: 2,
        synced: true,
        updatedAt: Date.now(),
        author: {
            id: 'author-1',
            name: 'Alice Johnson',
            initials: 'AJ',
            avatarUrl: 'https://example.com/avatar1.png',
        },
    },
    {
        id: '2',
        note: 'Root Note 2',
        parentNoteId: undefined,
        createdAt: Date.now(),
        acknowledgements: 0,
        synced: false,
        updatedAt: Date.now(),
        author: {
            id: 'author-2',
            name: 'Bob Smith',
            initials: 'BS',
            avatarUrl: 'https://example.com/avatar2.png',
        },
    },
    {
        id: '3',
        note: 'Child Note 1',
        parentNoteId: '1',
        createdAt: Date.now(),
        acknowledgements: 1,
        synced: true,
        updatedAt: Date.now(),
        author: {
            id: 'author-3',
            name: 'Charlie Brown',
            initials: 'CB',
            avatarUrl: 'https://example.com/avatar3.png',
        },
    },
];

describe('fieldNotesRepo', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('adds a note', async () => {
        await fieldNotesRepo.add(mockFieldNotes[0]);

        expect(db.fieldNotes.add).toHaveBeenCalledWith(mockFieldNotes[0]);
    });

    it('retrieves all notes', async () => {
        (db.fieldNotes.toArray as Mock).mockResolvedValue(mockFieldNotes);

        const result = await fieldNotesRepo.getAll();

        expect(result).toEqual(mockFieldNotes);
        expect(db.fieldNotes.toArray).toHaveBeenCalledTimes(1);
    });

    it('deletes a note by id', async () => {
        await fieldNotesRepo.deleteById('1');

        expect(db.fieldNotes.delete).toHaveBeenCalledWith('1');
    });

    it('retrieves children notes by parentNoteId', async () => {
        const mockChildren: FieldNote[] = mockFieldNotes.slice(-2);
        const mockWhere = vi.fn(() => ({
            equals: vi.fn(() => ({
                toArray: vi.fn().mockResolvedValue(mockChildren),
            })),
        }));
        (db.fieldNotes.where as Mock).mockImplementation(mockWhere);

        const result = await fieldNotesRepo.getChildren('1');

        expect(result).toEqual(mockChildren);
        expect(db.fieldNotes.where).toHaveBeenCalledWith('parentNoteId');
    });

    it('increments acknowledgements for a note', async () => {
        (db.fieldNotes.get as Mock).mockResolvedValue(mockFieldNotes[0]);

        await fieldNotesRepo.incrementAcknowledgement('1');

        expect(db.fieldNotes.get).toHaveBeenCalledWith('1');
        expect(db.fieldNotes.update).toHaveBeenCalledWith('1', { acknowledgements: 3 });
    });

    it('does not update acknowledgements if note is not found', async () => {
        (db.fieldNotes.get as Mock).mockResolvedValue(null);

        await fieldNotesRepo.incrementAcknowledgement('1');

        expect(db.fieldNotes.get).toHaveBeenCalledWith('1');
        expect(db.fieldNotes.update).not.toHaveBeenCalled();
    });
});