import { Button, notification } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import Customtable from "../../../compoment/Customtable";
import appAxios from "../../../service/axios";

export const Productpages = () => {
  const [products, setProducts] = useState([]);
  const [page, setpages] = useState(1);
  let limit = 5;
  const [pagination, setpagination] = useState(null)
  const handlefecthproduct = async (page, limit) => {
    try {
      const products = await appAxios.get("./tantrung", {
        params: {
          page,
          limit,
        },
      });
      setProducts(products.data.body.data.tantrung);
      setpagination(products.data.body.data.pagination)
    } catch (error) {
      notification.error({
        title: "error",
        message: "error!!!",
      });
    }
  }
  useEffect(() => {
    handlefecthproduct(page, limit);
  }, [page])

  const handlechangpage = (page) => {
    setpages(page)
  }
  const handleDeletepage = async (id) => {
    try {
      await appAxios.delete(`/products/${id}`);
      handlefecthproduct(page, 20);
    } catch (error) {
      notification.error({
        title: "error",
        message: "test",
      });
    }
  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'image',
      render: (url) => {
        return <img src={url} style={{ width: "200px", height: "150px" }} />;
      }
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'price',
      render:(_id)=>{
        return<>
          <Button onClick={()=> handleDeletepage(_id)} type="primary" danger >Xóa</Button>
        
        </>
      }
    }
  ];

  return <div>
    <Customtable columns={columns}
      dataSource={products}
      limit={limit}
      total={pagination && pagination._total}
      defaultpage={page}
      handlechangpage={handlechangpage}
    />
  </div>
}
