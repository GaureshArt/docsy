import Firecrawl from '@mendable/firecrawl-js'
export default function fireCrawl() {
    return new Firecrawl({
        apiKey: process.env.FIRECRAWL_API_KEY
    })
}