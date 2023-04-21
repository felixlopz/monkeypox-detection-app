import { StyleSheet, Text, View } from 'react-native';
// import { locale } from 'expo-localization';
// import { I18n } from 'i18n-js';
// import { en, es } from './src/lang';

// const i18n = new I18n({ en, es });
// i18n.defaultLocale = 'es';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
