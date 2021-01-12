import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBuckets, createTodoLists } from "../actions";
import { withRouter } from "react-router-dom";
import "./buckets.css";
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';
import bucketArr from "./bucketJson.json";
import { PlusOutlined } from '@ant-design/icons';


const { Content } = Layout;

export class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: { title: "", completed: false }
        };
    }

    componentWillUnmount() {
        this.props.fetchBucketsAction();
    }

    handleSubmit = () => {
        let listItem = this.state.item;
        let bucket = this.props.match.params.bucket;
        bucketArr.map(x => {
            if (x.title === bucket) {
                x.TodoLists.push(listItem);
            }
        })
        this.props.createTodoListsAction({ bucket: bucket, listItem: listItem });
        this.props.history.push("/");

        // this.props.createBucketsAction(buckets); -- to be included after backend
    }

    handleUpdate = (e) => {
        let newTodoItem = e.target.value;
        this.setState({ item: { title: newTodoItem, completed: false } });
    }

    render() {
        const { item } = this.state;
        return (<Layout className="layout">
            <Content style={{ padding: '0 50px' }} className="site-layout-content">
                <form style={{ marginBottom: '5px', width: '50%', display: 'flex', flexDirection: 'row' }}>
                    <input style={{ marginBottom: '5px', width: '50%' }} type="text" value={item.title} placeholder="Enter new list item" onChange={(e) => { return this.handleUpdate(e) }} />
                    <Button key="submit" onClick={this.handleSubmit} icon={<PlusOutlined />}>Add</Button>
                </form>
            </Content>
        </Layout>);
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchBucketsAction: () => {
        dispatch(fetchBuckets());
    },
    createTodoListsAction: (payload) => {
        dispatch(createTodoLists(payload));
    }
});




export default withRouter(connect(null, mapDispatchToProps)(NewTodo));