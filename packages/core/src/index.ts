import advancedRag from './pattern/advanced.js';
import naiveRag from './pattern/naive.js';
import { QueryConfig } from './retrieval/types.js';

export * from './config/index.js';
export * from './ingest/orchestrator.js';
export default async function createDocsy(config: QueryConfig) {
    switch (config.pattern) {
        case 'naive':
            return naiveRag(config);
        case 'advanced':
            return advancedRag(config)
    }
}
