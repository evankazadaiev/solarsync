import { render, screen, fireEvent } from '@testing-library/react';
import { ReplyControl } from '../ReplyControl';
import { vi, describe, it, expect } from 'vitest';

describe('ReplyControl', () => {
    const mockOnSubmit = vi.fn();
    const mockOnCancel = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the textarea and buttons correctly', () => {
        render(<ReplyControl onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

        expect(screen.getByPlaceholderText('Write your reply...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('calls onSubmit with the trimmed text when the submit button is clicked', () => {
        render(<ReplyControl onSubmit={mockOnSubmit} />);

        const textarea = screen.getByPlaceholderText('Write your reply...');
        fireEvent.change(textarea, { target: { value: '  Test reply  ' } });

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith('Test reply');
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it('does not call onSubmit if the textarea is empty or contains only whitespace', () => {
        render(<ReplyControl onSubmit={mockOnSubmit} />);

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('calls onCancel when the cancel button is clicked', () => {
        render(<ReplyControl onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('clears the textarea after submitting', () => {
        render(<ReplyControl onSubmit={mockOnSubmit} />);

        const textarea = screen.getByPlaceholderText('Write your reply...');
        fireEvent.change(textarea, { target: { value: 'Test reply' } });

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        expect(textarea).toHaveValue('');
    });
});