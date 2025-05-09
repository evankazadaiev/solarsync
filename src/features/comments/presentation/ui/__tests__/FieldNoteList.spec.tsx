import { render } from '@testing-library/react';
import { FieldNoteList } from '../FieldNoteList';
import type { FieldNote } from '@/common/domain/fieldNote';
import { screen } from '@testing-library/dom';

export const mockNotes: FieldNote[] = [
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
    {
        id: '4',
        note: 'Child Note 2',
        parentNoteId: '1',
        createdAt: Date.now(),
        acknowledgements: 3,
        synced: false,
        updatedAt: Date.now(),
        author: {
            id: 'author-4',
            name: 'Diana Prince',
            initials: 'DP',
            avatarUrl: 'https://example.com/avatar4.png',
        },
    },
];
const mockOnReply = vi.fn();
const mockOnDelete = vi.fn();
const mockOnAcknowledge = vi.fn();

describe('FieldNoteList', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders root notes', () => {
        render(
            <FieldNoteList
                notes={mockNotes}
                onReply={mockOnReply}
                onDelete={mockOnDelete}
                onAcknowledge={mockOnAcknowledge}
            />
        );

        expect(screen.queryByText((content) => content.includes('Root Note 1'))).toBeInTheDocument();
        expect(screen.queryByText((content) => content.includes('Root Note 2'))).toBeInTheDocument();
    });

    it('renders nested notes', () => {
        render(
            <FieldNoteList
                notes={mockNotes}
                onReply={mockOnReply}
                onDelete={mockOnDelete}
                onAcknowledge={mockOnAcknowledge}
            />
        );

        expect(screen.queryByText((content) => content.includes('Child Note 1'))).toBeInTheDocument();
        expect(screen.queryByText((content) => content.includes('Child Note 2'))).toBeInTheDocument();
    });
});