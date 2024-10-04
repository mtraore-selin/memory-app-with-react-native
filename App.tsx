import React from 'react'
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Board } from './src/component/Board'
import { GAP_SIZE, useCardSize } from './src/style/sizes'
import { game } from './src/game/Game'
import { observer } from 'mobx-react-lite'
import { WinOverlayTouch } from './src/component/WinOverlayTouch'
import { useIsPortrait } from './src/util/useIsPortrait'
import { Color } from './src/style/Color'
import { InfoModal } from './src/component/InfoModal'
import LinearGradient from 'react-native-linear-gradient'

const App = observer(() => {
  const isDarkMode = useColorScheme() === 'dark'
  const isPortrait = useIsPortrait()
  const { boardSize } = useCardSize()

  const [showInfoModal, setShowInfoModal] = React.useState(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const textStyleTop = { fontSize: isPortrait ? 22 : 18 }
  const textStyleBottom = { fontSize: isPortrait ? 24 : 20 }
  const row2Style = {
    marginTop: isPortrait ? 12 : 3,
    marginBottom: isPortrait ? 15 : 2,
  }

  React.useEffect(() => {
    game.startGame()
  }, [])

  return (
    <SafeAreaView style={[styles.fullHeight, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Memory Challenge</Text>
      </View>

      <LinearGradient
        colors={['#004d61', '#bb4d00']}
        useAngle={true}
        angle={145}
        style={[styles.container]}>
        <View style={styles.spaceTop} />
        <View style={[styles.row1, { width: boardSize }]}>
          <Text style={[styles.title, textStyleTop]}>Memory Game</Text>
          <Pressable
            style={({ pressed }) => [
              styles.restartPressable,
              { backgroundColor: pressed ? Color.blue : Color.blueLight },
            ]}
            onPress={() => game.startGame()}>
            <Text style={[styles.restartText, textStyleTop]}>Restart</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.infoPressable,
              { backgroundColor: pressed ? Color.teal : Color.tealLight },
            ]}
            onPress={() => {
              setShowInfoModal(true)
            }}>
            <Text style={[styles.infoText, textStyleTop]}>i</Text>
          </Pressable>
        </View>
        <View style={[styles.row2, row2Style, { width: boardSize }]}>
          <Text style={[styles.textBottom, textStyleBottom]}>
            {game.moves} moves
          </Text>
          <Text style={[styles.textBottom, textStyleBottom]}>
            {game.timer.seconds} s
          </Text>
        </View>
        <Board cards={game.cards} />
        <View style={styles.spaceBottom} />
      </LinearGradient>

      {game.isCompleted && (
        <WinOverlayTouch
          game={game}
          onClose={() => {
            game.startGame()
          }}
        />
      )}

      {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />}

      {/* Custom Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 Memory Challenge | All Rights Reserved
        </Text>
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  spaceTop: {
    flex: 1,
  },
  spaceBottom: {
    flex: 2,
  },
  header: {
    padding: 20,
    backgroundColor: '#004d61',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#bb4d00',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    color: 'white',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: GAP_SIZE,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: GAP_SIZE,
  },
  title: {
    textAlignVertical: 'center',
    color: '#222',
    fontWeight: 'bold',
  },
  textBottom: {
    fontWeight: 'bold',
    color: '#222',
  },
  infoPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: Color.teal,
  },
  infoText: {
    fontWeight: '600',
    color: Color.dark,
  },
  restartPressable: {
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingBottom: 5,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Color.blue,
  },
  restartText: {
    color: Color.dark,
  },
  footer: {
    padding: 15,
    backgroundColor: '#004d61',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#bb4d00',
  },
  footerText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
})

export default App
