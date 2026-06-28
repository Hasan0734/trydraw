import { create } from "zustand";


export interface CommentPin {
    id: string;
    text: string,
    pagePoint: {
        x: number;
        y: number;
    }
}

interface CommentStore {
    placed: boolean;
    placing: boolean;
    setPlacing(v: boolean): void;
    comments: CommentPin[];
    addComment: (comment: CommentPin) => void;
    updateCommentPosition: (id: string, pos: { x: number, y: number }) => void;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
    placing: false,
    placed: false,
    setPlacing: (placing: boolean) => {
        set({ placing })
    },

    comments: [],

    addComment: (comment) => {

        set((state) => ({
            comments: [...state.comments, comment],
        }))
    },
    updateCommentPosition: (id, pos) => {
        const newArr = get().comments.map((c) => c.id === id ? { ...c, pagePoint: pos } : c)
        set({ comments: newArr })
    }

}));