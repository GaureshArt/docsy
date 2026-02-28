import { LlmConfig } from "../generation/types.js";


export interface QueryEnchanceConfig extends LlmConfig {
    type: 'query-enhance'

}

export interface QueryExpansionConfig extends LlmConfig {
    type: 'query-expansion',
    totalQueries?: number
}

export type QueryOptimizationConfig = QueryEnchanceConfig | QueryExpansionConfig