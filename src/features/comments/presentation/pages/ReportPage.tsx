import { FieldNoteForm } from "@/features/comments/presentation/ui/FieldNoteForm.tsx";
import { useFieldNotes } from "@/features/comments/presentation/hooks/useFieldNotes.ts";
import { FieldNoteList } from "@/features/comments/presentation/ui/FieldNoteList.tsx";

import {FileText, Download, MapPin, Cloud, PenLine, FileQuestion} from "lucide-react";
import {MapPreview} from "@/features/comments/presentation/ui/MapPreview.tsx";

const ReportPage = () => {
    const { notes, addNote, deleteNote, acknowledgeNote } = useFieldNotes();

    return (
        <main className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 max-w-screen-xl mx-auto p-4 lg:p-6 lg:h-screen lg:overflow-hidden">
            <aside className="overflow-auto max-h-[calc(100vh-100px)] bg-card text-foreground p-6 rounded-xl border border-border space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Report #001 – Solar Inverter</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Completed
                    </span>
                </div>

                <div className="grid grid-cols-2 text-sm text-muted-foreground gap-y-1">
                    <div>
                        <span className="font-medium text-foreground">Location:</span> Berlin, Germany
                    </div>
                    <div>
                        <span className="font-medium text-foreground">Technician:</span> Noah Pierre
                    </div>
                    <div>
                        <span className="font-medium text-foreground">System:</span> AlphaFlex-3200
                    </div>
                    <div>
                        <span className="font-medium text-foreground">Date:</span> May 8, 2025
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium mb-2 text-foreground">Attachments</h3>
                    <div className="flex items-center justify-between bg-muted px-3 py-2 rounded-md border text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            <span>inverter-inspection-001.pdf</span>
                        </div>
                        <button
                            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                            onClick={() => window.open("/dummy-report.pdf", "_blank")}
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <MapPin className="w-4 h-4" />
                    Site Coordinates: <span className="ml-1 font-medium text-foreground">52.52, 13.40</span>
                </div>
                <MapPreview lat={52.52} lng={13.40} />

                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <Cloud className="w-4 h-4" />
                    Weather during inspection: <span className="ml-1 font-medium text-foreground">17°C, Wind 10 km/h</span>
                </div>

                <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                    <PenLine className="w-4 h-4" />
                    Technician Signature:
                    <span className="italic text-foreground">Noah Pierre</span>
                </div>
            </aside>

            <section className="flex flex-col max-h-[calc(100vh-48px)] overflow-hidden gap-6">
                <div className="shrink-0 sticky top-0 z-10 bg-background border-b p-4">
                    <FieldNoteForm onSubmit={addNote} />
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {notes.length > 0 ? (
                        <FieldNoteList
                            notes={notes}
                            onReply={addNote}
                            onDelete={deleteNote}
                            onAcknowledge={acknowledgeNote}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground h-full pb-6">
                            <FileQuestion className="w-10 h-10 mb-4 opacity-70" />
                            <p className="text-sm text-center max-w-xs">
                                No field notes yet. Use the form above to document your inspection findings.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default ReportPage;
