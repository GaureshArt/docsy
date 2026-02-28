import { QueryConfig } from "../retrieval/types.js";
import queryEnhance from "./query-enhance.js";
import queryExpansion from "./query-expansion.js";

export default function queryOptimizationRegistry(config: QueryConfig) {
    switch (config.queryOptimization.type) {
        case 'query-enhance':
            return queryEnhance(config.query, config.queryOptimization);
        case 'query-expansion':
            return queryExpansion(config.query, config.queryOptimization)
    }
}