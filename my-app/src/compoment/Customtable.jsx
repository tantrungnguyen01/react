import {Pagination, Table} from 'antd'


export default function(props){
    return (<>
        <Table columns={props.columns}
            dataSource={props.dataSource}
            pagination={false}
        />
        <Pagination
        total={props.total}
        defaultPageSize={props.limit}
        onChange={props.handlechangpage}
        defaultCurrent={props.defaultpage}
        />
    
    </>)
}