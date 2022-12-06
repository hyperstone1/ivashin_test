import React from 'react';

export type Notes = {
  id: number;
  note: string;
};

export type Tags = {
  id: number;
  tag: string;
};

export type GlobalContext = {
  note: string;
  setNote: (value: string) => void;
  notes: Notes[];
  setNotes: (value: Notes[]) => void;
  selectedTag: string;
  setSelectedTag: (value: string) => void;
  tags: Tags[];
  setTags: (value: Tags[]) => void;
  tagsNotes: string[];
  setTagsNotes: (value: string[]) => void;
  tagsUpdated: boolean;
  setTagsUpdated: (value: boolean) => void;
};
export const Context = React.createContext<GlobalContext>({
  note: '',
  setNote: () => {},
  notes: [],
  setNotes: () => {},
  selectedTag: '',
  setSelectedTag: () => {},
  tags: [],
  setTags: () => {},
  tagsNotes: [],
  setTagsNotes: () => {},
  tagsUpdated: false,
  setTagsUpdated: () => {},
});
