/**
 * Retorna o valor de uma flag da Inova.
 * @params key A chave da flag.
 * @params defaultValue O valor padrão da flag.
 * @returns Retorna o valor da flag sendo um booleano ou uma string.
 * @example
 * const isFeatureEnabled = useInovaFlag('feature-key', false);
 * const featureValue = useInovaFlag('feature-key', 'default-value');
 */
export { useInovaFlag } from './hooks/useInovaFlag'
/**
 * Provedor de contexto para as flags do Inova.
 * @param props As propriedades do provedor.
 * @param props.children O componente filho.
 * @param props.sdkKey A chave do SDK.
 * @returns O componente do provedor.
 */
export { InovaFeatureFlagProvider } from './providers/InovaFeatureFlagProvider'
