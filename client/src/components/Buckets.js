import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Card, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { withRouter } from 'react-router'
import { fetchBuckets, createBuckets, updateBuckets, removeBuckets, updateTodoLists, removeTodoLists, fetchTodoLists } from "../actions";
import "./buckets.css";
import 'antd/dist/antd.css';
import bucketArr from "./bucketJson.json";
import { EditOutlined, FileAddOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';


const { Content } = Layout;


export class Buckets extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.props.fetchBucketsAction();
    }

    componentDidMount() {
        this.props.fetchBucketsAction();
    }
    componentWillUnmount() {
        this.props.fetchBucketsAction();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        const { updatedBucket, todoitemIndex, bucketUpdate, editBucketIndex } = this.state
        console.log(updatedBucket);
        this.setState({
            visible: false,
        });
        if (!bucketUpdate)
            this.props.updateTodoListAction({ updatedItem: { item: updatedBucket[0], updateListItemIndex: todoitemIndex, complete: false } });
        else
            this.props.updateBucketsAction({ updatedItem: { item: updatedBucket, editBucketIndex: editBucketIndex } });

        this.props.fetchBucketsAction();
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleDelete = (index) => {
        this.props.removeBucketsAction({ bucketItemIndex: index });
        this.props.fetchBucketsAction();
    }

    handleEdit = (index, editTodoItem = false) => {
        if (!editTodoItem)
            this.setState({ visible: true, editBucketIndex: index });
        else {
            this.setState({ visible: true, editTodoListItemIndex: index });
        }
    }

    handleAddTask = (index) => {
        let { allBuckets } = this.props;
        let buckets = allBuckets;
        if (buckets && buckets[index]) {
            this.props.history.push(`/todo/new/${buckets[index].title}`)
        }
    }

    handleEditTodoList = (item, todoitemIndex) => {
        let { allBuckets } = this.props;
        let filteredItem = allBuckets.filter(x => x === item);
        this.setState({ visible: true, filteredbucket: filteredItem, editTodoItemIndex: todoitemIndex })
        // console.log(item.TodoLists[todoitemIndex]);
        // this.props.updateTodoListAction({ updatedItem: { item: item, updateListItemIndex: todoitemIndex, complete: false } });

    }

    handleDeleteTodoList = (bucketItemIndex, todoItemIndex) => {
        this.props.removeTodoListsAction({ bucketItemIndex: bucketItemIndex, todoItemIndex: todoItemIndex });
        this.props.fetchBucketsAction();
    }

    handleCompleteTodoList = (item, todoitemIndex) => {
        // let { buckets } = this.state;
        item.TodoLists[todoitemIndex].completed = true;
        // this.setState({ buckets: buckets });
        this.props.updateTodoListAction({ updatedItem: { item: item, updateListItemIndex: todoitemIndex, complete: true } });
        // this.props.updateBucketsAction(item);
    }

    render() {
        let { buckets, visible, editBucketIndex, filteredbucket, editTodoItemIndex } = this.state;
        const { loading, allBuckets, addedBucket } = this.props;
        return (
            <Layout className="layout">
                <Content style={{ padding: '0 50px' }} className="site-layout-content">
                    {allBuckets ? (<List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={allBuckets}
                        renderItem={(item, index) => (
                            <List.Item >
                                <Card title={item.title} actions={[<Button key="list-loadmore-edit" icon={<EditOutlined />} onClick={() => { return this.handleEdit(index) }}>edit</Button>, <Button key="list-loadmore-more" icon={<DeleteOutlined />} onClick={() => { return this.handleDelete(index) }}>delete</Button>, <Button key="list-loadmore-more" icon={<FileAddOutlined />} onClick={() => { return this.handleAddTask(index) }}>Add Task</Button >]}>
                                    {
                                        item.TodoLists.length > 0 ? item.TodoLists.map((listitem, listindex) => {
                                            return (<List.Item style={{ display: "flex" }} actions={[<Button style={{ border: "none", background: "none" }} key="list-loadmore-edit" onClick={() => { return this.handleDeleteTodoList(index, listindex) }} icon={<DeleteOutlined />}></Button>, <Button key="list-loadmore-more" style={{ border: "none", background: "none" }} onClick={() => { return this.handleEditTodoList(item, listindex) }} icon={<EditOutlined />}></Button>, <Button key="list-loadmore-more" onClick={() => { return this.handleCompleteTodoList(item, listindex) }} style={{ border: "none", background: "none" }} icon={<CheckCircleOutlined />}></Button>]} key={listindex}>
                                                <List.Item.Meta
                                                    title={<text style={{ textDecorationLine: listitem.completed ? "line-through" : "" }}>{listitem.title}</text>}
                                                />
                                            </List.Item>)
                                        }) : null
                                    }
                                </Card>
                            </List.Item>
                        )}
                    />) : "null"}
                    {visible ? (<Modal
                        title="Edit Bucket"
                        visible={true}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okButtonProps={{ disabled: false }}
                        cancelButtonProps={{ disabled: false }}
                    >
                        {!filteredbucket && editBucketIndex ? (<form>
                            <input type="text" value={allBuckets[editBucketIndex].title} onChange={(e) => { allBuckets[editBucketIndex].title = e.target.value; this.setState({ buckets: allBuckets, updatedBucket: allBuckets[editBucketIndex], editBucketIndex: editBucketIndex, bucketUpdate: true }) }} />
                        </form>) : (<form>
                            <input type="text" value={filteredbucket[0].TodoLists[editTodoItemIndex].title} onChange={(e) => {
                                filteredbucket[0].TodoLists[editTodoItemIndex].title = e.target.value; this.setState({ buckets: allBuckets, updatedBucket: filteredbucket, todoitemIndex: editTodoItemIndex, bucketUpdate: false })
                            }} />
                        </form>)}
                    </Modal>) : null}
                </Content>
                <div className="fixed-action-btn space-top1">
                    <Link
                        style={{ position: 'absolute', bottom: '50px', right: '50px' }} to="/bucket/new" href="#" className="btn-floating btn-large red">
                        <i className="large material-icons">+</i>
                    </Link>
                </div>
            </Layout>);
    }
}


const mapStateToProps = (state) => ({
    allBuckets: state.appReducer.allBuckets,
    allTodoLists: state.appReducer.allTodoLists,
    addedTodoList: state.appReducer.addedTodoList,
    loading: state.appReducer.loading,
    addedBucket: state.appReducer.addedBucket
});

const mapDispatchToProps = (dispatch) => ({
    fetchBucketsAction: () => {
        dispatch(fetchBuckets());
    },
    createBucketsAction: (payload) => {
        dispatch(createBuckets(payload));
    },
    removeBucketsAction: (payload) => {
        dispatch(removeBuckets(payload));
    },
    removeTodoListsAction: (payload) => {
        dispatch(removeTodoLists(payload));
    },
    updateBucketsAction: (payload) => {
        dispatch(updateBuckets(payload));
    },
    updateTodoListAction: (payload) => {
        dispatch(updateTodoLists(payload));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buckets));