import { useState, useContext } from 'react';
import { Context } from '../context/Context';
import { RxCross2 } from 'react-icons/rx';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const TagsList = () => {
  const { tags, setTags } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  const [tagValue, setTagValue] = useState('');

  const handleClose = async (id: number, tag: string) => {
    await axios.delete(`https://62fd27316e617f88dea5d017.mockapi.io/tags/${id}`);
    setTags(tags.filter((item) => item.tag !== tag));
  };

  const handleAddTag = async (tag: string) => {
    const { data } = await axios.post(`https://62fd27316e617f88dea5d017.mockapi.io/tags`, {
      tag: tag,
    });
    console.log(data);
    setTags([...tags, data]);
    setIsVisible(false);
  };

  return (
    <div className="tags">
      <h4>Все теги</h4>
      <div className="tags_list">
        {tags &&
          tags.map((item, i) => (
            <div key={i} className="tag">
              {item.tag}
              <RxCross2 onClick={() => handleClose(item.id, item.tag)} />
            </div>
          ))}
      </div>
      <div style={{ paddingTop: '20px', textAlign: 'center' }}>
        <input
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
          className={isVisible ? 'visible_textfield' : 'invisible'}
          type="text"
        />
        {!isVisible ? (
          <Button
            style={{ marginTop: '10px' }}
            onClick={() => setIsVisible(true)}
            variant={'primary'}
          >
            Добавить тег
          </Button>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              style={{ marginTop: '10px' }}
              onClick={() => handleAddTag(tagValue)}
              variant={'success'}
            >
              Добавить
            </Button>
            <Button
              style={{ marginTop: '10px' }}
              onClick={() => setIsVisible(false)}
              variant={'danger'}
            >
              Отмена
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsList;
