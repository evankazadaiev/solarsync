import { Button } from "@/common/presentation/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from "@/common/presentation/ui/dropdown-menu";
import { MessageCircle, ThumbsUp, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

type Props = {
    onReplyToggle: () => void;
    onDelete: () => void;
    onAcknowledge: () => void;
    acknowledgements?: number;
};

export const NoteActions = ({ onReplyToggle, onDelete, onAcknowledge, acknowledgements = 0 }: Props) => {
    return (
        <div className="flex items-center gap-4 text-muted-foreground text-xs">
            <Button variant="ghost" size="sm" onClick={onAcknowledge} className="px-2">
                <ThumbsUp size={14} className="mr-1" />
                {acknowledgements}
            </Button>
            <Button aria-label="Reply" role="button" variant="ghost" size="sm" onClick={onReplyToggle} className="px-2">
                <MessageCircle size={14} className="mr-1" />
                <span>Reply</span>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost"
                                   size="icon"
                                   className="w-5 h-5 p-0"
                                   aria-label="More options">
                        <MoreHorizontal size={16} />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuPortal>
                    <DropdownMenuContent align="start" sideOffset={4}>
                        <DropdownMenuItem aria-label="edit" role="menuitem" disabled className="flex items-center gap-2 text-sm">
                            <Pencil size={14} />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            aria-label="Delete"
                            role="menuitem"
                            className="flex items-center gap-2 text-sm text-red-600"
                            onClick={onDelete}
                        >
                            <Trash2 size={14} />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenuPortal>
            </DropdownMenu>
        </div>
    );
};
