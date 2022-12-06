import { useState, useEffect, useContext, useRef } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteForever, MdDone } from 'react-icons/md';
import { Context } from '../context/Context';

interface Item {
  item: {
    id: number;
    note: string;
  };
  deleteNote: (id: number) => Promise<void>;
  putNote: (id: number, title: string) => void;
}

const Note = ({ item, deleteNote, putNote }: Item) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(item.note);
  const [noteWithTag, setNoteWithTag] = useState<string[] | null>([]);
  const [res, setRes] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const { notes } = useContext(Context);

  const handleDeleteNote = async () => {
    deleteNote(item.id);
  };

  useEffect(() => {
    setNoteWithTag(item.note.match(/(#[A-Za-z0-9]+)/g));
    setRes(item.note.split(/(#[A-Za-z0-9]+)/g));
  }, [item, notes]);

  const setUpdateNote = async (id: number) => {
    if (ref.current !== null) {
      const { textContent } = ref.current;
      console.log('textContent: ', textContent);
      if (textContent) {
        setTitle(textContent);
        console.log('title: ', title);
        putNote(id, textContent);
      }
    }
    setEditMode(false);
  };

  const changeNotes = () => {
    if (ref.current) {
      ref.current.focus();
      setEditMode(!editMode);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div className={editMode ? 'note note_edit' : 'note'}>
      <div
        className={editMode ? 'edit-mode' : ''}
        style={{ position: 'relative' }}
        ref={ref}
        contentEditable={editMode ? true : false}
      >
        {noteWithTag
          ? res &&
            res.map((item, id) =>
              noteWithTag.includes(item) ? (
                <span key={id} style={{ color: 'red' }}>
                  {item}
                </span>
              ) : (
                item
              ),
            )
          : res.map((elem, id) => <span key={id}>{elem}</span>)}
      </div>
      <div className={editMode ? 'edit-buttons buttons' : 'buttons'}>
        <MdDone
          className={editMode ? 'visible' : 'invisible'}
          onClick={() => setUpdateNote(item.id)}
        />
        <BiEditAlt onClick={() => changeNotes()} className="edit" />
        <MdDeleteForever onClick={handleDeleteNote} className="delete" />
      </div>
    </div>
  );
};

export default Note;
