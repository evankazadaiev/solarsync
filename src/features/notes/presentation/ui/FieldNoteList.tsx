import type {FieldNote} from '@/common/domain/fieldNote.ts';
import {FieldNoteItem} from "@/features/notes/presentation/ui/FieldNoteItem.tsx";

type Props = {
    notes: FieldNote[];
    onReply: (text: string, parentNoteId?: string) => void;
    onDelete: (id: string) => void;
    onAcknowledge: (id: string) => void;
    parentNoteId?: string;
    depth?: number;
};

export const FieldNoteList = ({ notes, onReply, onDelete, onAcknowledge, parentNoteId, depth = 0 }: Props) => {
    const roots = notes.filter(n => n.parentNoteId === parentNoteId);

    return (
        <div className="space-y-6">
            {roots.map(note => (
                <FieldNoteItem
                    key={note.id}
                    note={note}
                    onReply={onReply}
                    onDelete={onDelete}
                    onAcknowledge={onAcknowledge}
                    depth={depth}
                >
                    <FieldNoteList
                        notes={notes}
                        onReply={onReply}
                        onDelete={onDelete}
                        onAcknowledge={onAcknowledge}
                        parentNoteId={note.id}
                        depth={depth + 1}
                    />
                </FieldNoteItem>
            ))}
        </div>
    );
};