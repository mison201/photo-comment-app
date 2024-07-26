import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface UploadPhotoProps {
  handleUpload: (options: any) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ handleUpload }) => (
  <Upload customRequest={handleUpload} showUploadList={false}>
    <Button icon={<UploadOutlined />}>Upload Photo</Button>
  </Upload>
);

export default UploadPhoto;