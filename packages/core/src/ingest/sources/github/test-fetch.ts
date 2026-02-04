// test-fetch.ts
import { createGeminiEmbedder } from "../../../ai/embeddings/gemini.js";
import { chunkFiles } from "../../processing/chunk-files.js";
import { cleanFiles } from "./clean-files.js";
import { embedChunks } from "../../processing/embed-chunks.js";
import { fetchFileContent } from "./fetch-file-content.js";
import { fetchGitTree } from "./fetch-git-tree.js";
import { filterDocs } from "./filter-docs.js";
import octokitProvider from "./octokit-provider.js";
import { storeChunks } from "../../processing/store-chunks.js";


async function test() {
    const rate = await octokitProvider.rest.rateLimit.get();

    console.log("Rate limit:", rate.data.rate);

    const fetchres = await fetchGitTree("https://github.com/pedramamini/Maestro");

    console.log("Total files:", fetchres.tree.tree.length);

    const docs = filterDocs(fetchres.tree);

    console.log("Filtered docs:", docs.length);
    console.log("\nFiles:");
    
    
    // docs.map((d)=>{
    //     console.log("path: ",d.path)
    //     console.log(d)
    // })
    const rawFiles = await fetchFileContent(docs, fetchres.repository);
    // console.log("rawfile lentgt" ,rawFiles.length)
    // const readMe = rawFiles[0];
    // const rawContent = readMe?.content!
    // console.log(rawFiles[0]?.path)
    // console.log("RawCOntent: *** size: ", rawContent.length)
    // console.log(rawContent);
    // const trimReadme = cleanFiles(rawFiles);
    // console.log("Trim: ******: ")
    // console.log(trimReadme[0]?.content);
    // console.log("size of clean:: ", trimReadme[0]?.content!.length);




    // for (const file of rawFiles){
    //     console.log(file)
    // }
    const cleanFile = cleanFiles(rawFiles)
    console.log("cleanfiels ",cleanFile.length)
    // console.log(cleanFile[0]);
    const chunks = await chunkFiles(cleanFile)
   console.log("Chunks complete: ",chunks.length)
    const embed = createGeminiEmbedder(process.env.GEMINI_API_KEY!);
    const embeddedChunks = await embedChunks(chunks,embed,"gemini-embedding-001")
    await storeChunks(embeddedChunks)
}

test();