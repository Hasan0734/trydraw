import { nanoid } from "nanoid";
import { create } from "zustand";

export interface User {
    id: string;
    name: string;
    avatar?: string;
}
export interface TLPos {
    x: number;
    y: number
}
export interface CommentMessage {
    id: string;
    author: string;
    text: string;
    createdAt: number;
    updatedAt?: number;
    edited: boolean;
}

export interface CommentThread {
    id: string;
    pagePoint: TLPos;
    resolved: boolean;
    createdAt: number;
    updatedAt: number;
    createdBy: string;
    messages: CommentMessage[];
}

interface CommentStore {
    placing: boolean;
    // selectedThreadId: string | null;
    threads: CommentThread[];
    setPlacing: (placing: boolean) => void;
    // setSelectedThread: (
    //     threadId: string | null
    // ) => void;
    createThread: (pagePoint: TLPos, text: string, author: string) => void;
    updateThread: (threadId: string, text: string,) => void;
    addReply: (threadId: string, text: string, author: string) => void;
    editMessage: (threadId: string, messageId: string, text: string) => void;
    deleteMessage: (threadId: string, messageId: string) => void;
    updateThreadPosition: (threadId: string, pagePoint: TLPos) => void;
    resolveThread: (threadId: string) => void;
    reopenThread: (threadId: string) => void;
    deleteThread: (threadId: string) => void;
    clear: () => void;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
    placing: false,
    setPlacing: (placing: boolean) => {
        set({ placing })
    },
    threads: [],
    createThread: (
        pagePoint,
        text,
        author
    ) => {
        set((state) => {
            const now = Date.now();

            const thread: CommentThread = {
                id: nanoid(),
                pagePoint,
                resolved: false,
                createdBy: author,
                createdAt: now,
                updatedAt: now,
                messages: [
                    {
                        id: nanoid(),
                        author,
                        text,
                        createdAt: now,
                        edited: false,
                    },
                ],
            };

            return {
                threads: [
                    ...state.threads,
                    thread,
                ],
                placing: false,
                // selectedThreadId: thread.id,
            };
        })
    },
    updateThread: (
        threadId,
        text
    ) => {
        set((state) => ({
            threads: state.threads.map(
                (thread) =>
                    thread.id === threadId
                        ? {
                            ...thread,

                            messages: [
                                {
                                    ...thread.messages[0], text
                                }
                            ],
                        }
                        : thread
            ),
        }))
    },
    addReply: (
        threadId,
        text,
        author
    ) => {
        set((state) => ({
            threads: state.threads.map(
                (thread) => {
                    if (
                        thread.id !== threadId
                    )
                        return thread;

                    return {
                        ...thread,
                        updatedAt: Date.now(),
                        messages: [
                            ...thread.messages,
                            {
                                id: crypto.randomUUID(),
                                author,
                                text,
                                createdAt:
                                    Date.now(),
                                edited: false,
                            },
                        ],
                    };
                }
            ),
        }))
    },
    editMessage: (
        threadId,
        messageId,
        text
    ) => {
        set((state) => ({
            threads: state.threads.map(
                (thread) => {
                    if (
                        thread.id !== threadId
                    )
                        return thread;

                    return {
                        ...thread,

                        updatedAt: Date.now(),

                        messages:
                            thread.messages.map(
                                (message) =>
                                    message.id ===
                                        messageId
                                        ? {
                                            ...message,

                                            text,

                                            edited: true,

                                            updatedAt:
                                                Date.now(),
                                        }
                                        : message
                            ),
                    };
                }
            ),
        }))
    },
    deleteMessage: (
        threadId,
        messageId
    ) => {
        set((state) => ({
            threads: state.threads
                .map((thread) => {
                    if (
                        thread.id !== threadId
                    )
                        return thread;

                    return {
                        ...thread,

                        messages:
                            thread.messages.filter(
                                (m) =>
                                    m.id !==
                                    messageId
                            ),
                    };
                })
                .filter(
                    (thread) =>
                        thread.messages.length >
                        0
                ),
        }))
    },

    updateThreadPosition: (
        threadId,
        pagePoint
    ) => {
        set((state) => ({
            threads: state.threads.map(
                (thread) =>
                    thread.id === threadId
                        ? {
                            ...thread,

                            pagePoint,
                        }
                        : thread
            ),
        }))
    },

    resolveThread: (
        threadId
    ) => {
        set((state) => ({
            threads: state.threads.map(
                (thread) =>
                    thread.id === threadId
                        ? {
                            ...thread,

                            resolved: !thread.resolved,
                        }
                        : thread
            ),
        }))
    },

    reopenThread: (
        threadId
    ) => {
        set((state) => ({
            threads: state.threads.map(
                (thread) =>
                    thread.id === threadId
                        ? {
                            ...thread,

                            resolved: false,
                        }
                        : thread
            ),
        }))
    },

    deleteThread: (
        threadId
    ) => {
        set((state) => ({
            threads:
                state.threads.filter(
                    (thread) =>
                        thread.id !==
                        threadId
                ),

            // selectedThreadId:
            //     state.selectedThreadId ===
            //         threadId
            //         ? null
            //         : state.selectedThreadId,
        }))
    },

    clear: () => {
        set({
            threads: [],

            // selectedThreadId: null,

            placing: false,
        })
    },
}));



// updateThreadPosition: (threadId, pagePoint) =>
//     set((state) => ({
//         threads: state.threads.map((thread) =>
//             thread.id === threadId
//                 ? {
//                     ...thread,
//                     pagePoint,
//                 }
//                 : thread
//         ),
//     })),
