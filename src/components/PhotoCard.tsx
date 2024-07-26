import React from 'react';
import { Card, List, Form, Input } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Photo } from '@photo/services/photoService';

interface PhotoCardProps {
  photo: Photo;
  comment: string;
  onCommentChange: (photoId: number, value: string) => void;
  onCommentSubmit: (photoId: number) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, comment, onCommentChange, onCommentSubmit }) => (
  <Card
    hoverable
    className="flex flex-col relative"
    cover={
      <Image
        src={photo.url}
        alt="uploaded"
        width={400}
        height={300}
        className="object-cover w-full h-[300px]"
      />
    }
  >
    <div className="flex-1 min-h-[170px] max-h-[170px] overflow-auto">
      <List
        dataSource={photo.comments}
        renderItem={comment => <List.Item key={comment.id}>{comment.text}</List.Item>}
      />
    </div>
    <div className="relative bottom-0 w-full bg-white p-2 box-border">
      <Form layout="inline" className="flex justify-between w-full">
        <Form.Item className="flex-grow mr-2 w-full">
          <Input.Search
            value={comment}
            onChange={e => onCommentChange(photo.id, e.target.value)}
            placeholder="Add a comment"
            enterButton={<CommentOutlined />}
            onSearch={() => onCommentSubmit(photo.id)}
          />
        </Form.Item>
      </Form>
    </div>
  </Card>
);

export default PhotoCard;