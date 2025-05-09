import { faker } from '@faker-js/faker';

export type FieldNote = {
    id: string;
    note: string;
    parentNoteId?: string;
    createdAt: number;
    acknowledgements?: number;
    author: {
        id: string;
        name: string;
        initials?: string;
        avatarUrl?: string;
    };

    synced: boolean;
    updatedAt: number;
};

export const createFieldNote = (note: string, parentNoteId?: string): FieldNote => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;

    return {
        id: crypto.randomUUID(),
        note: note.trim(),
        parentNoteId,
        createdAt: Date.now(),
        acknowledgements: 0,
        synced: false,
        updatedAt: Date.now(),
        author: {
            id: faker.string.uuid(),
            name: fullName,
            initials: `${firstName[0]}${lastName[0]}`,
            avatarUrl: faker.image.avatar(),
        },
    };
};
