import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ModalContext } from '../providers/Modal';

interface Props {
  title: string;
  seeMore: () => void;
  deleteAction: () => void;
  editAction: () => void;
}

export const ListItem = (props: Props) => {
  const { setShowModal } = useContext(ModalContext);
  const { title, seeMore, deleteAction, editAction } = props;

  function handleDelete() {
    setShowModal({
      msg: `Tem certeza que deseja deletar o item: ${title} da lista?`,
      onOk: deleteAction,
      onCancel: () => {},
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={seeMore}>
          <Text style={styles.seeMoreText}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rightContent}>
        <TouchableOpacity
          onPress={editAction}
          style={styles.actionButtonContainer}
        >
          <Feather name='edit-2' size={22} color='#eee' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.actionButtonContainer}
        >
          <Feather name='trash-2' size={22} color='#E27F86' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  leftContent: {
    height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    marginBottom: 5,
  },
  seeMoreText: {
    color: '#fff',
    fontFamily: 'InterMedium',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});
