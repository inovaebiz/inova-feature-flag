
/**
 * Retorna o valor de uma flag da Inova.
 * @params key A chave da flag.
 * @params defaultValue O valor padrão da flag.
 * @returns Retorna o valor da flag sendo um booleano ou uma string.
 * @example
 * const isFeatureEnabled = useInovaFlag('feature-key', false);
 * const featureValue = useInovaFlag('feature-key', 'default-value');
 */
export { useInovaFlag } from './src/hooks/useInovaFlag';
/**
 * Função para configurar o sdk key da biblioteca Inova Feature Flag.
 * @param key O sdk key da biblioteca Inova Feature Flag.
 * @param options As opções de configuração. Opcional. Como por exemplo url
 * diferente para o ambiente de desenvolvimento ou produção da feature flag.
 * @example
 * const config = useInovaFlagConfig();
 * config('sdk-key', { url: 'https://feature-flag-url.com', autoRefetch: 
 * true });
 */
export { useInovaFlagConfig } from './src/hooks/useInovaFlagConfig';
/**
 * Provedor de contexto para as flags do Inova.
 * @param props As propriedades do provedor.
 * @returns O componente do provedor.
 */
export { InovaFeatureFlagProvider } from './src/providers/InovaFeatureFlagProvider';
