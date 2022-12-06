import React, { useState } from 'react';
import NoteField from '../components/NoteField';
import TextField from '../components/TextField';
import { Context } from '../context/Context';
import TagsFilter from '../components/TagsFilter';
import { Notes, Tags } from '../context/Context';
import TagsList from '../components/TagsList';

const Home = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<Notes[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [tagsNotes, setTagsNotes] = useState<string[]>([]);
  const [tagsUpdated, setTagsUpdated] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        note,
        setNote,
        notes,
        setNotes,
        selectedTag,
        setSelectedTag,
        tags,
        setTags,
        tagsNotes,
        setTagsNotes,
        tagsUpdated,
        setTagsUpdated,
      }}
    >
      <div className="container">
        <TagsFilter />
        <TagsList />
        <TextField />
        <NoteField />
      </div>
    </Context.Provider>
  );
};

export default Home;
