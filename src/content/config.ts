import { defineCollection, z } from 'astro:content';

const journalCollection = defineCollection({
    type : "content",
    schema : z.object({
        title : z.string(),
        date : z.date(),
    })
});


export const collections = {
    'journals': journalCollection,
};