import { useState } from 'react';
import { Textarea } from '@/common/presentation/ui/textarea';
import { Button } from '@/common/presentation/ui/button';

type Props = {
    onSubmit: (text: string) => void;
};

export const FieldNoteForm = ({ onSubmit }: Props) => {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        const trimmedText = text.trim();
        if (!trimmedText.trim()) {
            return;
        }

        onSubmit(trimmedText);
        setText('');
    };

    return (
        <div className="bg-muted p-4 rounded-xl border space-y-2">
            <Textarea
                className="min-h-[80px] text-sm"
                placeholder="Add comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex items-center justify-between">
                <div className="flex gap-2 text-muted-foreground text-sm">
                    <span className="cursor-pointer">B</span>
                    <span className="cursor-pointer italic">I</span>
                    <span className="cursor-pointer underline">U</span>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white" size="sm" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
};
