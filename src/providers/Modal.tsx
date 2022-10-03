import React, { useState, createContext, useContext } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface ShowModalInterface {
  msg?: string;
  onOk?: () => void;
  onCancel?: () => void;
  buttonText?: string;
}

interface ModalContextInterface {
  setShowModal: React.Dispatch<
    React.SetStateAction<ShowModalInterface | undefined>
  >;
}

interface Props {
  msg?: string;
  onOk?: () => void;
  onCancel?: () => void;
  buttonText?: string;
}

export const ModalContext = createContext<ModalContextInterface>(
  {} as ModalContextInterface
);

export const Alert = (props: Props) => {
  const { setShowModal } = useContext(ModalContext);
  const { msg, onOk, onCancel, buttonText } = props;

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        {msg && <Text style={styles.text}>{msg}</Text>}

        <View style={styles.buttons_container}>
          {onCancel && (
            <TouchableOpacity
              style={styles.button_cancel}
              onPress={() => {
                onCancel();
                return setShowModal(undefined);
              }}
            >
              <Text style={styles.button_text_cancel}>Cancelar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onOk && onOk();
              return setShowModal(undefined);
            }}
          >
            <Text style={styles.button_text}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    zIndex: 9,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },
  modal: {
    paddingTop: 30,
    paddingBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    maxHeight: '70%',
    minWidth: 200,

    backgroundColor: '#383838',
    borderRadius: 8,
  },
  text: {
    paddingHorizontal: 30,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    maxWidth: '70%',
    fontFamily: 'InterSemiBold',
  },
  button_text: {
    color: '#fff',
    fontFamily: 'InterSemiBold',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#19A0CB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  button_text_cancel: {
    color: '#fff',
    fontFamily: 'InterSemiBold',
    fontSize: 14,
  },
  button_cancel: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    marginRight: 5,
    paddingHorizontal: 25,
  },
  buttons_container: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState<ShowModalInterface | undefined>(
    undefined
  );

  return (
    <ModalContext.Provider value={{ setShowModal }}>
      {showModal && (
        <Alert
          msg={showModal.msg}
          onOk={showModal.onOk}
          onCancel={showModal.onCancel}
          buttonText={showModal.buttonText ?? 'Ok'}
        />
      )}

      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
