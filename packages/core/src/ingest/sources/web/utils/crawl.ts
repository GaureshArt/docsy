import fireCrawl from "./firecrawl.js";

export default async function crawl(url: string) {
    const crawller = fireCrawl();
    const docs = await crawller.crawl(url, {
        limit: 2,
    });
    console.log(docs);
    console.log("************************************************")
    console.log("************************************************")
    console.log("************************************************")
    console.log("************************************************")
    console.log(docs.data)
}

crawl('https://docs.docsy.live/');