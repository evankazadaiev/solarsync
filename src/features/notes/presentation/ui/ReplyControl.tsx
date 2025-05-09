import { useState } from "react";
import { Button } from "@/common/presentation/ui/button";
import { Textarea } from "@/common/presentation/ui/textarea";

type Props = {
    onSubmit: (text: string) => void;
    onCancel?: () => void;
};

export const ReplyControl = ({ onSubmit, onCancel }: Props) => {
    const [replyText, setReplyText] = useState("");

    const handleSubmit = () => {
        if (replyText.trim()) {
            onSubmit(replyText.trim());
            setReplyText("");
            onCancel?.();
        }
    };

    return (
        <div className="space-y-2 mt-2">
            <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                rows={2}
            />
            <div className="flex gap-2 justify-end">
                {onCancel && (
                    <Button variant="outline" size="sm" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button
                    size="sm"
                    className="bg-orange-500 text-white"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};
