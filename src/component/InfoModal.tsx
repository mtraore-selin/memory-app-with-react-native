import { Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { Color } from '../style/Color'
import React from 'react'

interface Props {
  /** Invoked when the close button is pressed. */
  onClose: () => void
}

export function InfoModal({ onClose }: Props) {
  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.closePressable,
              {
                backgroundColor: pressed ? Color.redLight : Color.red,
              },
            ]}
            onPress={onClose}>
            <Text style={styles.closeText} accessibilityHint="Close">
              ✕
            </Text>
          </Pressable>
          <View style={styles.textContainer}>
            <Text style={styles.title}>About This App</Text>
            <Text style={styles.text}>
              This app is built with React Native, TypeScript, and MobX for
              state management (Mohamed TRAORE).
            </Text>
            <Text style={styles.text}>
              Animations and gestures are implemented using Animated,
              Reanimated, and PanResponder libraries.
            </Text>
            <Text style={styles.text}>
              You can find the source code on GitHub at{' '}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL('https://github.com/mtraore-selin')
                }>
                mtraore-selin GitHub
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: Color.blueLight,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  closePressable: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  textContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.dark,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    color: Color.dark,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  link: {
    color: Color.purple,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
})
