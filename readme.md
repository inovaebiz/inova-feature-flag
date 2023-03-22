# Inova Feature Flag for React / React Native

inova-feature-flag em seu projeto React Native. Para isso, abra o terminal e navegue até a raiz do projeto. Em seguida, execute o seguinte comando:

```
npm install @inovaebiz/inova-feature-flag
```

ou, se preferir usar o yarn:

```
yarn add @inovaebiz/inova-feature-flag
```

Isso instalará o pacote inova-feature-flag e suas dependências em seu projeto.

## Configuração

Agora que o pacote inova-feature-flag está instalado, você precisa configurá-lo em seu aplicativo. Para fazer isso, você precisa:

Importar o InovaFeatureFlagProvider de inova-feature-flag e envolver seu aplicativo com ele, geralmente no nível mais alto do componente. Exemplo:

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

Chamar o método config no InovaFeatureFlagProvider para configurar a chave e as opções de configuração para acessar as flags de recursos. Exemplo:

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

## Uso

Agora que o InovaFeatureFlagProvider está configurado em seu aplicativo, você pode usar o hook useInovaFlag para acessar as flags de recursos em qualquer componente. Para fazer isso, importe o useInovaFlag de inova-feature-flag e chame-o com a chave da feature flag e o valor padrão, como no exemplo abaixo:

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

Observe que, por padrão, o valor de retorno do useInovaFlag é uma boolean. No entanto, você pode especificar um valor padrão que seja uma string para indicar que a flag de recurso deve ser interpretada como uma string. Por exemplo:

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

## Tipagem

Se você quiser ter a tipagem forte das chaves de feature flag e seus tipos de valor, você pode usar o recurso de tipagem genérica do useInovaFlag. Para fazer isso, primeiro defina um tipo que descreva as chaves de feature flag e seus tipos de valor, como no exemplo abaixo:

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

Neste exemplo, o tipo FeatureFlagsKeys define as chaves de feature flag e seus tipos de valor. Então, quando você usa o useInovaFlag, especifica FeatureFlagsKeys como o tipo genérico para ter a tipagem forte dessas chaves.

## Contribuindo

Este pacote é privado da organização Inovaebiz, mas adoraríamos ter sua contribuição! Se você deseja contribuir para este pacote, siga estas etapas:

- Faça um fork deste repositório em sua conta do GitHub.
- Crie um branch em seu fork para suas alterações.
- Faça suas alterações e testes.
- Envie um pull request para este repositório com suas alterações.
- Roadmap

##### Aqui estão algumas das próximas features planejadas para este pacote:

- Persistência de dados usando async storage ou MMKV, caso o usuário escolha a persistência em cache. O usuário poderá escolher que deseja persistência e inserir a instância dentro dos parâmetros personalizados do config. Exemplo:

```
inovaflag.config('sdk_key', {
  cacheEnabled: true,
  cacheInstance: mmkvStorage or asyncstorage,
});
```

Isso permitiria que o pacote use o mecanismo de armazenamento desejado para persistir os dados das flags de recurso em cache.

## Considerações finais

O pacote inova-feature-flag é uma maneira fácil de implementar as flags de recursos em seu projeto React Native. Seguindo as etapas de instalação e configuração, você pode acessar as flags de recurso em todo o seu aplicativo usando o useInovaFlag. Além disso, usando o recurso de tipagem genérica, você pode ter a tipagem forte das chaves de feature flag e seus tipos de valor, o que pode ajudar a evitar erros em tempo de execução.

## Autores

[Vinicius Petrachin](https://github.com/viniciuspetrachin)

## Licença

MIT
