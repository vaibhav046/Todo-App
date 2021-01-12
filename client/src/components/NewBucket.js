import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBuckets, createBuckets } from "../actions";
import { withRouter } from "react-router-dom";
import "./buckets.css";
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import bucketArr from "./bucketJson.json";
import { PlusOutlined } from '@ant-design/icons';


const { Content } = Layout;

class NewBucket extends Component {
    constructor(props) {
        super(props);
        this.state = { item: { title: "", TodoLists: [] } };
    }
    componentWillUnmount() {
        this.props.fetchBucketsAction();
    }
    handleSubmit = () => {
        let buckets = this.state.item;
        bucketArr.push(buckets);
        this.props.createBucketsAction(buckets);
        this.props.history.push({ pathname: "/", state: { added: true } });
    }

    handleUpdate = (e) => {
        let newBucketItem = e.target.value;
        this.setState({ item: { title: newBucketItem, TodoLists: [] } });
    }

    render() {
        const { item } = this.state;
        return (<Layout className="layout">
            <Content style={{ padding: '0 50px' }} className="site-layout-content">
                <form style={{ marginBottom: '5px', width: '50%', display: 'flex', flexDirection: 'row' }}>
                    <input style={{ marginBottom: '5px', width: '50%' }} type="text" value={item.title} placeholder="Enter new bucket name" onChange={(e) => { return this.handleUpdate(e) }} />
                    <Button key="submit" onClick={this.handleSubmit} icon={<PlusOutlined />}>Add</Button>
                </form>
            </Content>
        </Layout>)
    }
}
const mapStateToProps = (state) => ({
    allBuckets: state.appReducer.allBuckets,
    allTodoLists: state.appReducer.allTodoLists,
    addedTodoList: state.appReducer.addedTodoList,
    loading: state.appReducer.loading
});

const mapDispatchToProps = (dispatch) => ({
    fetchBucketsAction: () => {
        dispatch(fetchBuckets());
    },
    createBucketsAction: (buckets) => {
        dispatch(createBuckets(buckets));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBucket));