import { AxiosResponse } from 'axios';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLOR_CONSTANTS } from '../constants';
import { ITodoSerializer } from '../models';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

interface IProps extends IStoreInjectedProps {
    todo: ITodoSerializer;
}

@inject(STORE_NAME)
@observer
export class TodoItem extends Component<IProps> {
    private handleDelete = () => {
        Alert.alert(
            '할 일 삭제하기',
            '정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
            [
                { text: '취소', style: 'cancel' },
                { text: '확인', onPress: this.deleteTodo }
            ]
        );
    };

    private deleteTodo = async () => {
        try {
            this.props[STORE_NAME]!.loadingStore.startLoading();
            this.props[STORE_NAME]!.todoStore.deleteTodo(this.props.todo);
            this.props[STORE_NAME]!.loadingStore.endLoading();
        } catch (error) {
            this.props[STORE_NAME]!.loadingStore.endLoading();
            console.log(error);
        }
    };

    private handleComplete = () => {
        if (this.props.todo.isCompleted === false) {
            this.completeTodo();
        } else {
            this.revertTodo();
        }
    };

    @action
    private completeTodo = async () => {
        try {
            this.props[STORE_NAME]!.loadingStore.startLoading();
            this.props[STORE_NAME]!.todoStore.completeTodo(this.props.todo);
            this.props[STORE_NAME]!.loadingStore.endLoading();
        } catch (error) {
            this.props[STORE_NAME]!.loadingStore.endLoading();
            console.log(error);
        }
    };

    private revertTodo = async () => {
        try {
            this.props[STORE_NAME]!.loadingStore.startLoading();
            this.props[STORE_NAME]!.todoStore.revertTodo(this.props.todo);
            this.props[STORE_NAME]!.loadingStore.endLoading();
        } catch (error) {
            this.props[STORE_NAME]!.loadingStore.endLoading();
            console.log(error);
        }
    };

    private handleFavor = async () => {
        try {
            this.props[STORE_NAME]!.loadingStore.startLoading();
            this.props[STORE_NAME]!.todoStore.addLike(this.props.todo);
            this.props[STORE_NAME]!.loadingStore.endLoading();
        } catch (error) {
            this.props[STORE_NAME]!.loadingStore.endLoading();
            console.log(error);
        }
    };

    public render() {
        const created = new Date(this.props.todo.createdAt);
        const createdYear = created.getFullYear();
        const createdMonth = created.getMonth();
        const createdDate = created.getDate();
        const createdAmpm = created.getHours() < 12 ? '오전' : '오후';
        let createdHour = created.getHours();
        const createdMinute = created.getMinutes();
        const createdSecond = created.getSeconds();

        const completed = this.props.todo.isCompleted
            ? new Date(this.props.todo.completedAt)
            : null;
        const completedYear = completed ? completed.getFullYear() : null;
        const completedMonth = completed ? completed.getMonth() : null;
        const completedDate = completed ? completed.getDate() : null;
        const completedAmpm = completed
            ? completed.getHours() < 12
                ? '오전'
                : '오후'
            : null;
        let completedHour = completed ? completed.getHours() : null;
        const completedMinute = completed ? completed.getMinutes() : null;
        const completedSecond = completed ? completed.getSeconds() : null;

        if (createdHour > 12) {
            createdHour -= 12;
        }

        if (completedHour != null) {
            if (completedHour > 12) {
                completedHour -= 12;
            }
        }

        const createdText = `${createdYear}년 ${createdMonth}월 ${createdDate}일 ${createdAmpm} ${createdHour}시 ${createdMinute}분 ${createdSecond}초에 생성됨`;
        const completedText = `${completedYear}년 ${completedMonth}월 ${completedDate}일 ${completedAmpm} ${completedHour}시 ${completedMinute}분 ${completedSecond}초에 완료됨`;

        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.contentText}>
                        {this.props.todo.content}
                    </Text>
                    <Text style={styles.otherText}>
                        {this.props.todo.user.name}
                    </Text>
                    <Text style={styles.otherText}>{createdText}</Text>
                    <Text style={styles.otherText}>
                        {this.props.todo.isCompleted ? completedText : ''}
                    </Text>
                </View>
                <View style={styles.right}>
                    {this.props[STORE_NAME]!.deleteStore.isDeletable ? (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.handleDelete}
                        >
                            <Icon
                                name="check-box-outline-blank"
                                size={22}
                                color={COLOR_CONSTANTS.purple}
                            />
                        </TouchableOpacity>
                    ) : (
                        <React.Fragment>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this.handleComplete}
                            >
                                <Icon
                                    name={
                                        this.props.todo.isCompleted
                                            ? 'check-box'
                                            : 'check-box-outline-blank'
                                    }
                                    size={22}
                                    color={COLOR_CONSTANTS.purple}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this.handleFavor}
                            >
                                <Icon
                                    style={styles.favor}
                                    name={
                                        this.props.todo.like === 0
                                            ? 'favorite-border'
                                            : 'favorite'
                                    }
                                    size={22}
                                    color={COLOR_CONSTANTS.purple}
                                />
                            </TouchableOpacity>
                            <Text style={styles.favorCount}>
                                {this.props.todo.like}
                            </Text>
                        </React.Fragment>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 16
    },
    left: {
        maxWidth: '75%'
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexGrow: 1
    },
    contentText: {
        color: COLOR_CONSTANTS.foreground,
        fontSize: 16
    },
    otherText: {
        color: COLOR_CONSTANTS.foreground,
        fontSize: 12
    },
    favor: {
        padding: 4
    },
    favorCount: {
        color: COLOR_CONSTANTS.purple,
        padding: 4
    }
});
