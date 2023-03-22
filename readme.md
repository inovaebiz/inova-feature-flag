# Inova Feature Flag for React / React Native

Use inova-feature-flag in your React Native project. To do this, open the terminal and navigate to the root of your project. Then, execute the following command:

```
npm install @inovaebiz/inova-feature-flag
```

Or, if you prefer to use yarn:

```
yarn add @inovaebiz/inova-feature-flag
```

This will install the inova-feature-flag package and its dependencies in your project.

## Configuration

Now that the inova-feature-flag package is installed, you need to configure it in your app. To do this, you need to:

Import InovaFeatureFlagProvider from inova-feature-flag and wrap your app with it, usually at the highest level of the component. Example:

```
import { InovaFeatureFlagProvider } from '@inovaebiz/inova-feature-flag';
import App from './App';

const MyApp = () => (
  <InovaFeatureFlagProvider>
    <App />
  </InovaFeatureFlagProvider>
);

export default MyApp;
```

Call the config method on InovaFeatureFlagProvider to set the key and configuration options to access the feature flags. Example:

```
import { useInovaFlag } from '@inovaebiz/inova-feature-flag';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    inovaflag.config('your_sdk_key');
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null; // or a loading indicator
  }

  const servicesEnabled = useInovaFlag('app:services:enabled', false);

  return (
    <View>
      {servicesEnabled && (
        <Text>Services are enabled</Text>
      )}
    </View>
  );
}
```

## Usage

Now that InovaFeatureFlagProvider is configured in your app, you can use the useInovaFlag hook to access the feature flags in any component. To do this, import useInovaFlag from inova-feature-flag and call it with the feature flag key and default value, as shown in the example below:

```
import { useInovaFlag } from '@inovaebiz/inova-feature-flag';

const MyComponent = () => {
  const servicesEnabled = useInovaFlag('app:services:enabled', false);

  return (
    <View>
      {servicesEnabled && (
        <Text>Services are enabled</Text>
      )}
    </View>
  );
};
```

Note that by default, the return value of useInovaFlag is a boolean. However, you can specify a default value that is a string to indicate that the feature flag should be interpreted as a string. For example:

```
import { useInovaFlag } from '@inovaebiz/inova-feature-flag';

const MyComponent = () => {
  const theme = useInovaFlag('app:theme', 'light');

  return (
    <View>
      <Text>The current theme is {theme}</Text>
    </View>
    )
    }
```

## Typing

If you want to have strong typing for the feature flag keys and their value types, you can use the useInovaFlag generic typing feature. To do this, first define a type that describes the feature flag keys and their value types, as shown in the example below:

```
import { useInovaFlag } from '@inovaebiz/inova-feature-flag';

type FeatureFlagsKeys = {
  'app:services:enabled': boolean;
  'app:theme': string;
};

const MyComponent = () => {
  const servicesEnabled = useInovaFlag<FeatureFlagsKeys>('app:services:enabled', false);
  const theme = useInovaFlag<FeatureFlagsKeys>('app:theme', 'light');

  return (
    <View>
      {servicesEnabled && (
        <Text>Services are enabled</Text>
      )}
      <Text>The current theme is {theme}</Text>
    </View>
  );
};
```

In this example, the FeatureFlagsKeys type defines the feature flag keys and their value types. Then, when you use useInovaFlag, you specify FeatureFlagsKeys as the generic type to have strong typing for these keys.

## Contributing

This package is private to the Inovaebiz organization, but we would love to have your contribution! If you want to contribute to this package, follow these steps:

- Fork this repository to your GitHub account.
- Create a branch in your fork for your changes.
- Make your changes and tests.
- Submit a pull request to this repository with your changes.

## Roadmap

##### Here are some of the next planned features for this package:

- Data persistence using async storage or MMKV, if the user chooses caching persistence. The user will be able to choose that they want persistence and insert the instance within the customized parameters of the config. Example:

```
inovaflag.config('sdk_key', {
  cacheEnabled: true,
  cacheInstance: mmkvStorage or asyncstorage,
});
```

This would allow the package to use the desired storage engine to persist resource flag data in cache.

## Final considerations

The inova-feature-flag package is an easy way to implement feature flags in your React Native project. By following the installation and configuration steps, you can access feature flags throughout your app using useInovaFlag. Additionally, by using the generic typing feature, you can have strong typing for the feature flag keys and their value types, which can help prevent runtime errors.

## Authors

[Vinicius Petrachin](https://github.com/viniciuspetrachin)

## License

MIT
