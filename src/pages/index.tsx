import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Col, Row, Empty } from 'antd';
import UploadPhoto from '@photo/components/UploadPhoto';
import PhotoCard from '@photo/components/PhotoCard';
import { handleCommentChange, handleCommentSubmit } from '@photo/handlers/commentHandlers';
import { handleUpload } from '@photo/handlers/uploadHandlers';
import { getPhotos, Photo } from '@photo/services/photoService';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Home = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [comment, setComment] = useState<{ [key: number]: string }>({}); // Track comments for each photo

  useEffect(() => {
    getPhotos().then(response => {
      setPhotos(response.data);
    });
  }, []);

  return (
    <Layout className="min-h-screen bg-white">
      <Header className="bg-white border-b border-gray-300 flex items-center justify-between">
        <Title level={2} className="m-4">Photo Comment App</Title>
        <UploadPhoto handleUpload={(options) => handleUpload(options, setPhotos)} />
      </Header>
      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-132px)]">
          <Empty description="No data, Please upload first photo!" />
        </div>
      ) : (
        <Content className="px-12 mt-6">
          <div className="bg-white p-6 min-h-[380px]">
            <Space direction="vertical" size="large" className="w-full">
              <Row gutter={[16, 16]}>
                {photos.map(photo => (
                  <Col key={photo.id} xs={24} sm={12} md={8} lg={6}>
                    <PhotoCard
                      photo={photo}
                      comment={comment[photo.id] || ''}
                      onCommentChange={(photoId, value) => handleCommentChange(photoId, value, setComment)}
                      onCommentSubmit={() => handleCommentSubmit(photo.id, comment, setComment, setPhotos)}
                    />
                  </Col>
                ))}
              </Row>
            </Space>
          </div>
        </Content>
      )}
      <Footer className="text-center">Photo Comment App ©2024 Created by mison201</Footer>
    </Layout>
  );
};

export default Home;