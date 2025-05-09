import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { FieldNoteForm } from '../FieldNoteForm';

describe('FieldNoteForm', () => {
    it('renders the textarea and submit button', () => {
        render(<FieldNoteForm onSubmit={() => {}} />);
        expect(screen.getByPlaceholderText(/add comment/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('does not call onSubmit with empty input', () => {
        const onSubmit = vi.fn();
        render(<FieldNoteForm onSubmit={onSubmit} />);
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('calls onSubmit with trimmed text and resets input', () => {
        const onSubmit = vi.fn();
        render(<FieldNoteForm onSubmit={onSubmit} />);
        const textarea = screen.getByPlaceholderText(/add comment/i);

        fireEvent.change(textarea, { target: { value: '  Hello world  ' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(onSubmit).toHaveBeenCalledWith('Hello world');
        expect((textarea as HTMLTextAreaElement).value).toBe('');
    });
});