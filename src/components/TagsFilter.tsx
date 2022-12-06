import { useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const TagsFilter = () => {
  const { notes, note, selectedTag, setSelectedTag, tags, setTags, tagsUpdated, setTagsUpdated } =
    useContext(Context);

  const tagsInNotes: string[] = [];

  useEffect(() => {
    notes.map((item) => {
      const tagInNotes = item.note.match(/(#[A-Za-z0-9]+)/g);
      if (tagInNotes) {
        tagInNotes.map((item) => {
          tagsInNotes.push(item);
          return item;
        });
      }
      return item;
    });

    const fetchTagsWithNotes = () => {
      if (tagsInNotes && tags) {
        tagsInNotes.map((obj) => {
          if (!tags.find((item) => item.tag === obj)) {
            axios.post(`https://62fd27316e617f88dea5d017.mockapi.io/tags`, {
              tag: obj,
            });
          }
          return obj;
        });
      }
    };
    setTagsUpdated(!tagsUpdated);
    fetchTagsWithNotes();
    // eslint-disable-next-line
  }, [note, notes, setTagsUpdated]);

  useEffect(() => {
    const getTags = async () => {
      const { data } = await axios.get(`https://62fd27316e617f88dea5d017.mockapi.io/tags`);
      setTags(data);
    };
    getTags();
  }, [note, notes, setTags, tagsUpdated]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Фильтр по тегу
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {tags &&
            tags.map((item, i) => (
              <Dropdown.Item
                key={i}
                style={{ color: 'red' }}
                onClick={() => setSelectedTag(item.tag)}
              >
                {item.tag}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      {selectedTag ? (
        <Button
          style={{ width: '150px', height: ' 60%' }}
          variant="danger"
          onClick={() => setSelectedTag('')}
        >
          Убрать фильтр
        </Button>
      ) : null}
    </div>
  );
};

export default TagsFilter;
