import type {FieldNote} from '@/common/domain/fieldNote.ts';
import { Avatar, AvatarFallback } from '@/common/presentation/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import {ReplyControl} from "@/features/comments/presentation/ui/ReplyControl.tsx";
import {NoteActions} from "@/features/comments/presentation/ui/NoteActions.tsx";

type Props = {
    note: FieldNote;
    children?: React.ReactNode;
    onReply: (text: string, parentNoteId?: string) => void;
    onDelete: (id: string) => void;
    onAcknowledge: (id: string) => void;
    depth?: number;
};

const MAX_DEPTH = 4;

export const FieldNoteItem = ({ note, children, onReply, onDelete, onAcknowledge, depth = 0 }: Props) => {
    const [replyMode, setReplyMode] = useState(false);

    const effectiveDepth = Math.min(depth ?? 0, MAX_DEPTH);

    const timeAgo = formatDistanceToNow(new Date(note.createdAt), { addSuffix: true });

    return (
        <div className="flex gap-3 relative group">
            {note.parentNoteId && (
                <div className="absolute left-4 top-10 bottom-0 w-px bg-border/90"  />
            )}

            <div className="pt-1">
                <Avatar className="w-8 h-8">
                    {note.author.avatarUrl ? (
                        <img src={note.author.avatarUrl} alt={note.author.name} />
                    ) : (
                        <AvatarFallback>{note.author.initials}</AvatarFallback>
                    )}
                </Avatar>
            </div>

            <div className="flex-1 space-y-2">
                <div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span>{note.author.name}</span>
                        <span className="text-xs text-muted-foreground">{timeAgo}</span>
                    </div>
                    <p className="text-sm">{note.note}</p>
                </div>

                <NoteActions
                    onReplyToggle={() => setReplyMode(!replyMode)}
                    onDelete={() => {
                        if (confirm("Delete this comment?")) {
                            onDelete(note.id);
                        }
                    }}
                    onAcknowledge={() => onAcknowledge(note.id)}
                    acknowledgements={note.acknowledgements}
                />

                {replyMode && (
                    <ReplyControl
                        onSubmit={(text) => onReply(text, note.id)}
                        onCancel={() => setReplyMode(false)}
                    />
                )}

                {children && (
                    <div className={`pl-${Math.min(effectiveDepth * 2, 8)} border-l border-dashed border-border/30 mt-4`}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};
