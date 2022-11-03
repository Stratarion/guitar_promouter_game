import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Modal, Row, Input, Typography, Form as AForm, Upload } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MainLib } from 'lib';
import { createPost, updatePost } from 'actions/posts';
import { PlusOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => resolve(reader.result);

  reader.onerror = (error) => reject(error);
});

const Form = ({ currentId, setCurrentId, showForm }) => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
  };

  useEffect(() => {
    if (!post?.title) clear();
  }, [post]);

  const handleSubmit = async (values) => {
    console.log(fileList);
    const blobList = fileList.map(async (item) => {
      const base46item = await fetch(item.preview);
      return base46item.blob();
    });
    const postData = {
      title: values.title,
      message: values.message,
      tags: values.tags,
      selectedFile: blobList,
    };

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handlePreview = async (file) => {
    const fileCurrent = file;
    if (!fileCurrent.url && !fileCurrent.preview) {
      fileCurrent.preview = await getBase64(fileCurrent.originFileObj);
    }

    setPreviewImage(fileCurrent.url || fileCurrent.preview);
    setPreviewVisible(true);
    setPreviewTitle(fileCurrent.name || fileCurrent.url.substring(fileCurrent.url.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewVisible(false);

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  if (!user?.result?.name) {
    return (
      <Card bordered>
        <Text>{MainLib.posts.loginNotification}</Text>
      </Card>
    );
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <AForm onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Title level={5}>{currentId ? `${MainLib.posts.editing} "${post?.title}"` : MainLib.posts.createPost}</Title>
          </Col>
          <Col span={12}>
            <AForm.Item
              name="title"
            >
              <Input placeholder="title" />
            </AForm.Item>
          </Col>
          <Col span={12}>
            <AForm.Item
              name="message"
            >
              <Input placeholder="message" />
            </AForm.Item>
          </Col>
          <Col span={12}>
            <AForm.Item
              name="tags"
            >
              <Input placeholder="tags" />
            </AForm.Item>
          </Col>
          <Col span={24}>
            <Upload
              onRemove={props.onRemove}
              beforeUpload={props.beforeUpload}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Col>
          <Col>
            <Button onClick={() => showForm(false)}>{MainLib.buttons.cancel}</Button>
          </Col>
          <Col>
            <Button htmlType="submit" type="primary">{MainLib.buttons.accept}</Button>
          </Col>
        </Row>
      </AForm>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default Form;
