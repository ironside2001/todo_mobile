import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { COLOR_CONSTANTS } from '../constants';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

@inject(STORE_NAME)
@observer
export class AddModal extends Component<IStoreInjectedProps> {
    private handleCancel = () => {
        this.props[STORE_NAME]!.modalStore.setModalInvisible();
    };

    private handleSave = () => {
        if (this.props[STORE_NAME]!.modalStore.content.length > 100) {
            this.openAlertFailed();
        } else {
            this.addTodo();
        }
        this.props[STORE_NAME]!.modalStore.setModalInvisible();
    };

    private openAlertFailed = () => {
        Alert.alert(
            '할 일 추가에 실패했습니다.',
            '할 일의 내용이 너무 깁니다. 100자 이내의 내용만 추가할 수 있습니다.',
            [{ text: '확인' }]
        );
    };

    private addTodo = async () => {
        try {
            this.props[STORE_NAME]!.loadingStore.startLoading();
            this.props[STORE_NAME]!.todoStore.addTodo();
            this.props[STORE_NAME]!.loadingStore.endLoading();
        } catch (error) {
            this.props[STORE_NAME]!.loadingStore.endLoading();
            console.log(error);
        }
    };

    private handleChangeContent = (value: string) => {
        this.props[STORE_NAME]!.modalStore.setContent(value);
    };

    public render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.rootStore!.modalStore.isModalVisible}
                onRequestClose={
                    this.props[STORE_NAME]!.modalStore.setModalInvisible
                }
            >
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.handleCancel}
                        >
                            <Text style={styles.navbarButton}>취소</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>할 일 추가</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.handleSave}
                        >
                            <Text style={styles.navbarButton}>저장</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <TextInput
                            style={styles.contentInput}
                            placeholder="내용"
                            placeholderTextColor={COLOR_CONSTANTS.purple}
                            underlineColorAndroid={COLOR_CONSTANTS.purple}
                            onChangeText={this.handleChangeContent}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        backgroundColor: COLOR_CONSTANTS.background
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        padding: 8,
        backgroundColor: COLOR_CONSTANTS.background
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    navbarButton: {
        color: COLOR_CONSTANTS.purple,
        padding: 4
    },
    title: {
        flexGrow: 1,
        color: COLOR_CONSTANTS.foreground,
        textAlign: 'center'
    },
    contentInput: {
        color: COLOR_CONSTANTS.purple,
        width: '96%'
    }
});
