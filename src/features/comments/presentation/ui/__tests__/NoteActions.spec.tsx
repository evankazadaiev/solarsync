import { render, screen, fireEvent } from '@testing-library/react';
import { NoteActions } from '../NoteActions';
import { vi, describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('NoteActions', () => {
        const mockOnReplyToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnAcknowledge = vi.fn();

        const defaultProps = {
            onReplyToggle: mockOnReplyToggle,
            onDelete: mockOnDelete,
            onAcknowledge: mockOnAcknowledge,
            acknowledgements: 5,
        };

        it('renders all actions correctly', () => {
            render(<NoteActions {...defaultProps} />);

            expect(screen.getByText('Reply')).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument(); // Acknowledgements count
            expect(screen.getByRole('button', { name: /more options/i })).toBeInTheDocument();
        });

        it('calls onAcknowledge when the acknowledge button is clicked', () => {
            render(<NoteActions {...defaultProps} />);

            fireEvent.click(screen.getByText('5'));
            expect(mockOnAcknowledge).toHaveBeenCalledTimes(1);
        });

        it('calls onReplyToggle when the reply button is clicked', () => {
            render(<NoteActions {...defaultProps} />);

            fireEvent.click(screen.getByText('Reply'));
            expect(mockOnReplyToggle).toHaveBeenCalledTimes(1);
        });

      it('calls onDelete when the delete option is clicked', async () => {
          render(<NoteActions {...defaultProps} />);

          await userEvent.click(screen.getByRole('button', { name: /more options/i }));

          expect(screen.getByText('Delete')).toBeInTheDocument();

          const deleteOption = screen.getByRole('menuitem', { name: /delete/i });
          fireEvent.click(deleteOption);

          expect(mockOnDelete).toHaveBeenCalledTimes(1);
      });

      it('disables the edit option in the dropdown', async () => {
          render(<NoteActions {...defaultProps} />);

          await userEvent.click(screen.getByRole('button', { name: /more options/i }));

          const editOption = screen.getByRole('menuitem', { name: /edit/i });
          expect(editOption).toHaveAttribute('aria-disabled', 'true');
      });
});