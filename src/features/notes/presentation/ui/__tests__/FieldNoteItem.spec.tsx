import { render, screen, fireEvent } from '@testing-library/react';
import { FieldNoteItem } from '../FieldNoteItem';
import { vi, expect, describe, it } from 'vitest';
import type { FieldNote } from '@/common/domain/fieldNote.ts';

const mockNote: FieldNote = {
    id: '1',
    parentNoteId: undefined,
    createdAt: Date.now(),
    note: 'This is a test note',
    author: {
        id: crypto.randomUUID(),
        name: 'John Doe',
        avatarUrl: undefined,
        initials: 'JD',
    },
    acknowledgements: 1,
    synced: false,
    updatedAt: Date.now(),
};

describe('FieldNoteItem', () => {
        it('renders the note content and author', () => {
            render(
                <FieldNoteItem
                    note={mockNote}
                    onReply={vi.fn()}
                    onDelete={vi.fn()}
                    onAcknowledge={vi.fn()}
                />
            );

            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('This is a test note')).toBeInTheDocument();
        });

        it('toggles reply mode when reply action is clicked', () => {
            render(
                <FieldNoteItem
                    note={mockNote}
                    onReply={vi.fn()}
                    onDelete={vi.fn()}
                    onAcknowledge={vi.fn()}
                />
            );

            fireEvent.click(screen.getByText(/reply/i));
            expect(screen.getByPlaceholderText(/write your reply/i)).toBeInTheDocument();

            fireEvent.click(screen.getByText(/cancel/i));
            expect(screen.queryByPlaceholderText(/write your reply/i)).not.toBeInTheDocument();
        });

        it('calls onReply with the correct text when reply is submitted', () => {
            const onReply = vi.fn();

            render(
                <FieldNoteItem
                    note={mockNote}
                    onReply={onReply}
                    onDelete={vi.fn()}
                    onAcknowledge={vi.fn()}
                />
            );

            fireEvent.click(screen.getByText(/reply/i));
            const input = screen.getByPlaceholderText(/write your reply/i);
            fireEvent.change(input, { target: { value: 'Test reply' } });
            fireEvent.click(screen.getByText(/submit/i));

            expect(onReply).toHaveBeenCalledWith('Test reply', mockNote.id);
        });

        it('renders children when provided', () => {
            render(
                <FieldNoteItem
                    note={mockNote}
                    onReply={vi.fn()}
                    onDelete={vi.fn()}
                    onAcknowledge={vi.fn()}
                >
                    <div>Child Note</div>
                </FieldNoteItem>
            );

            expect(screen.getByText('Child Note')).toBeInTheDocument();
        });
    });