import { Button, Input, Space, Upload } from 'antd';
import styles from './index.module.less';
import { ChangeEvent, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CloudUploadOutlined } from '@ant-design/icons';

interface ListProps {
  value: string;
  keyParams: string;
  key: string;
}

const { TextArea } = Input;
const home = () => {
  const [list, setList] = useState<Array<ListProps>>([
    {
      value: '',
      keyParams: '',
      key: new Date().valueOf().toString() + Math.random(),
    },
  ]);
  // url
  const [url, setUrl] = useState('');

  const [batchFile, setBatchFile] = useState({} as any);

  // result
  const [result, setResult] = useState<any>();

  // 添加需要输入的字段
  const handleAddField = () => {
    setList((cur) => {
      cur.push({
        value: '',
        keyParams: '',
        key: new Date().valueOf().toString() + Math.random(),
      });
      return [...cur];
    });
  };

  // 删除字段
  const handleDeleteField = (index: number) => {
    setList((cur) => {
      return [...cur.filter((v, i) => i !== index)];
    });
  };

  // 获取改变值
  const handChangeValue = (e: ChangeEvent<HTMLTextAreaElement>, number: number) => {
    setList((cur) => {
      cur[number].value = e.target.value;
      return [...cur];
    });
  };

  // 输入字段名称
  const handleChangeKeyParams = (e: ChangeEvent<HTMLInputElement>, number: number) => {
    setList((cur) => {
      cur[number].keyParams = e.target.value;
      return [...cur];
    });
  };

  // 选择url
  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  // 提交
  const sumbit = () => {
    console.log(batchFile, 'batchFile');

    fetch('http://localhost:9000/get', {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({ batchFile: batchFile, source: list, url }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((v) => {
        console.log(v.data.slice(1, 10).toString());
        const fileReader = new FileReader();
        const blob = new Blob(v.data);
        fileReader.readAsArrayBuffer(blob);
        fileReader.onload = () => {
          if (fileReader.result) {
            console.log(new Blob([fileReader.result]));
          }
        };
        // const buf = new Buffer(v.data, 'base64');
        // console.log(buf, 'buf');

        // const value = new ArrayBuffer(v.data);
        // console.log(value);

        // const textReader = new FileReader();
        // // textReader.readAsArrayBuffer(value);
        // textReader.onload = (e) => {
        //   console.log(textReader.result);
        // };
        // setResult(v);
      });
  };

  // 上传表格
  const customRequest = useCallback(
    async ({ file, onSuccess, onError, onProgress }: { [key: string]: any }) => {
      const base64: any = await new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      });

      setBatchFile(new Blob([base64]));
      onSuccess();
    },
    [setBatchFile]
  );
  return (
    <div className={styles.wrap}>
      <Space align="center">
        {list.map((v, index) => (
          <div key={v.key}>
            <Input
              type="text"
              value={v.keyParams}
              onChange={(e) => {
                handleChangeKeyParams(e, index);
              }}
              placeholder="请输入字段名称"
              className={styles.input}
            />
            <TextArea
              value={v.value}
              rows={10}
              onChange={(e) => {
                handChangeValue(e, index);
              }}
              placeholder="请输入字段值 注意一行视为一个值 多个值请换行输入"
            />
            <Button
              type="primary"
              onClick={() => {
                handleDeleteField(index);
              }}
              className={styles.btn}
            >
              删除字段
            </Button>
          </div>
        ))}
      </Space>
      <div className={styles.btn}>
        <Button type="primary" onClick={handleAddField}>
          添加字段
        </Button>
      </div>
      <div className={styles.url}>
        <span>输入网址url：</span>
        <Input value={url} onChange={handleChangeUrl} className={styles.input} />
      </div>
      <Button onClick={sumbit}>submit</Button>
      <Upload accept=".xlsx, .xls" maxCount={1} customRequest={customRequest}>
        <span>
          <CloudUploadOutlined className={styles.stepBtn} />
          上传表格
        </span>
      </Upload>
      {result && <TextArea value={result} autoSize />}
    </div>
  );
};

export default home;
function classnames(stepBtn: string, uploadBtn: string): string | undefined {
  throw new Error('Function not implemented.');
}
