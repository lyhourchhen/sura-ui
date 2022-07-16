# Logger

> return the safe logger for development and production env

## How to use ?

```ts
import { SuraLoggerFactory } from "@asurraa/sura-ui-modal";
const logger = SuraLoggerFactory.createLogger();

logger.debug("debug class log");
logger.error("debug class error");
logger.info("debug class info");
logger.warm("debug class warm");
```
