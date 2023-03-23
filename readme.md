# Inova Feature Flag for React / React Native

Use inova-feature-flag in your React Native project. To do this, open the terminal and navigate to the root of your project. Then, execute the following command:

```bash
npm install @inovaebiz/inova-feature-flag
```

Or, if you prefer to use yarn:

```bash
yarn add @inovaebiz/inova-feature-flag
```

This will install the inova-feature-flag package and its dependencies in your project.

## Configuration

Now that the inova-feature-flag package is installed, you need to configure it in your app. To do this, you need to:

Import InovaFeatureFlagProvider from inova-feature-flag and wrap your app with it, usually at the highest level of the component. Example:

```tsx
import { InovaFeatureFlagProvider } from '@inovaebiz/inova-feature-flag'
import App from './App'

const MyApp = () => (
  <InovaFeatureFlagProvider
    sdkKey='your_sdk_key'
    options={{
      url: 'your_custom_url',
    }}
  >
    <App />
  </InovaFeatureFlagProvider>
)

export default MyApp
```

Remembering that the custom url you place has to bring data in this format:

```json
{
  "success": true,
  "data": {
    "featureFlags": [
      {
        "key": "app:services",
        "value": true,
        "description": "Enable services"
      }
    ]
  }
}
```

And it also has to be an api in post that receives a bearer token in authorization by the header with the obligatory sdkKey inside the provider.

## Usage

Now that InovaFeatureFlagProvider is configured in your app, you can use the useInovaFlag hook to access the feature flags in any component. To do this, import useInovaFlag from inova-feature-flag and call it with the feature flag key and default value, as shown in the example below:

```tsx
import { useInovaFlag } from '@inovaebiz/inova-feature-flag'

const MyComponent = () => {
  const servicesEnabled = useInovaFlag('app:services:enabled', false)

  return <View>{servicesEnabled && <Text>Services are enabled</Text>}</View>
}
```

Note that by default, the return value of useInovaFlag is a boolean. However, you can specify a default value that is a string to indicate that the feature flag should be interpreted as a string. For example:

```tsx
import { useInovaFlag } from '@inovaebiz/inova-feature-flag'

const MyComponent = () => {
  const theme = useInovaFlag('app:theme', 'light')

  return (
    <View>
      <Text>The current theme is {theme}</Text>
    </View>
  )
}
```

## Typing

If you want to have strong typing for the feature flag keys and their value types, you can use the useInovaFlag generic typing feature. To do this, first define a type that describes the feature flag keys and their value types, as shown in the example below:

```tsx
import { useInovaFlag } from '@inovaebiz/inova-feature-flag'

type FeatureFlagsKeys = {
  'app:services:enabled': boolean
  'app:theme': string
}

const MyComponent = () => {
  const servicesEnabled = useInovaFlag<FeatureFlagsKeys>('app:services:enabled', false)
  const theme = useInovaFlag<FeatureFlagsKeys>('app:theme', 'light')

  return (
    <View>
      {servicesEnabled && <Text>Services are enabled</Text>}
      <Text>The current theme is {theme}</Text>
    </View>
  )
}
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

```typescript
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

## Sponsors

[Inova e-Business](https://www.inovaebiz.com.br/)

- Inova e-Business is a software factory that develops customized systems, apps and e-commerce. For more than 10 years delivering the most innovative technologies and solutions.

## License

MIT
