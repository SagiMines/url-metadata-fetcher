import express, { Request, Response } from 'express';
import { MetadataResult } from '../interfaces';
import * as cheerio from 'cheerio';
import axios from 'axios';

const router = express.Router();

/**
 * Handles POST requests to the "fetch-metadata" endpoint.
 */
router.post('/', async (req: Request, res: Response) => {
  const { urls } = req.body;

  // If the the 'urls' body array is empty or is not an array or contains less than 3 urls.
  if (!urls || !Array.isArray(urls) || urls.length < 3) {
    return res
      .status(400)
      .json({ error: 'Please provide at least 3 valid URLs' });
  }

  try {
    const results = await Promise.all(urls.map(fetchUrlMetadata));
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Handles each url provided in the POST request.
 * Returns the metadata if the url is valid or error
 * if the url is invalid.
 *
 * @param url `string` - The current url.
 * @returns `Promise<MetadataResult>`
 */
const fetchUrlMetadata = async (url: string): Promise<MetadataResult> => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title =
      $('title').text() || $('meta[property="og:title"]').attr('content') || '';
    const description =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      '';
    const image = $('meta[property="og:image"]').attr('content') || '';

    return { title, description, image };
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error);
    return { error: `Failed to fetch metadata for url: ${url}` };
  }
};

export { router as fetchMetadata };
